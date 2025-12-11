import { nvidiaClient } from './nvidia-client';
import { Provider, ValidationResult } from './types';

export class DataValidationAgent {
  async validate(provider: Provider): Promise<ValidationResult> {
    const startTime = Date.now();
    const findings: string[] = [];
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    try {
      // Validate contact information
      const contactValidation = await nvidiaClient.validateContactInfo(
        provider.name,
        provider.phone,
        provider.address
      );

      if (contactValidation.phone_valid) {
        findings.push('Phone number format validated');
      } else {
        issues.push('Phone number appears invalid');
        recommendations.push('Verify phone number with provider');
      }

      if (contactValidation.address_valid) {
        findings.push('Address format validated');
      } else {
        issues.push('Address may be incomplete or invalid');
        recommendations.push('Request updated address from provider');
      }

      // Analyze provider data comprehensively
      const analysis = await nvidiaClient.analyzeProviderData(provider);
      
      if (analysis.issues) {
        issues.push(...analysis.issues);
      }

      if (analysis.recommendations) {
        recommendations.push(...analysis.recommendations);
      }

      const confidence_score = analysis.confidence_score || contactValidation.confidence || 75;

      return {
        provider_id: provider.id,
        agent_type: 'data_validation',
        timestamp: new Date(),
        confidence_score,
        findings,
        issues,
        recommendations,
        data_changes: analysis.extracted_data
      };
    } catch (error) {
      console.error('Data validation error:', error);
      return {
        provider_id: provider.id,
        agent_type: 'data_validation',
        timestamp: new Date(),
        confidence_score: 0,
        findings: [],
        issues: ['Failed to validate provider data'],
        recommendations: ['Manual review required']
      };
    }
  }

  async batchValidate(providers: Provider[]): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    
    for (const provider of providers) {
      const result = await this.validate(provider);
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    return results;
  }
}

export class InformationEnrichmentAgent {
  async enrich(provider: Provider): Promise<ValidationResult> {
    const findings: string[] = [];
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    try {
      const enrichedData = await nvidiaClient.enrichProviderInfo(
        provider.name,
        provider.npi
      );

      if (enrichedData.raw_response) {
        findings.push('Additional provider information retrieved');
      }

      if (!provider.npi) {
        issues.push('NPI number missing');
        recommendations.push('Obtain NPI from provider or NPI registry');
      }

      if (!provider.email) {
        issues.push('Email address not provided');
        recommendations.push('Request email address for better communication');
      }

      return {
        provider_id: provider.id,
        agent_type: 'enrichment',
        timestamp: new Date(),
        confidence_score: 80,
        findings,
        issues,
        recommendations,
        data_changes: enrichedData
      };
    } catch (error) {
      console.error('Enrichment error:', error);
      return {
        provider_id: provider.id,
        agent_type: 'enrichment',
        timestamp: new Date(),
        confidence_score: 50,
        findings: [],
        issues: ['Failed to enrich provider data'],
        recommendations: ['Retry enrichment process']
      };
    }
  }
}

export class QualityAssuranceAgent {
  async assess(provider: Provider, validationResults: ValidationResult[]): Promise<ValidationResult> {
    const allIssues: string[] = [];
    const allFindings: string[] = [];
    const recommendations: string[] = [];
    
    // Aggregate results from other agents
    validationResults.forEach(result => {
      allIssues.push(...result.issues);
      allFindings.push(...result.findings);
    });

    // Calculate overall confidence
    const avgConfidence = validationResults.reduce((sum, r) => sum + r.confidence_score, 0) / validationResults.length;

    // Quality checks
    if (allIssues.length > 3) {
      recommendations.push('High number of issues - prioritize for manual review');
    }

    if (avgConfidence < 60) {
      recommendations.push('Low confidence score - requires human verification');
    }

    if (!provider.license) {
      allIssues.push('Medical license information missing');
      recommendations.push('Verify medical license with state board');
    }

    return {
      provider_id: provider.id,
      agent_type: 'quality_assurance',
      timestamp: new Date(),
      confidence_score: avgConfidence,
      findings: allFindings,
      issues: allIssues,
      recommendations
    };
  }
}

export class DirectoryManagementAgent {
  async generateReport(validationResults: ValidationResult[]): Promise<any> {
    const summary = {
      total_processed: validationResults.length,
      successful: validationResults.filter(r => r.confidence_score >= 80).length,
      needs_review: validationResults.filter(r => r.confidence_score < 80 && r.confidence_score >= 50).length,
      failed: validationResults.filter(r => r.confidence_score < 50).length,
      avg_confidence: validationResults.reduce((sum, r) => sum + r.confidence_score, 0) / validationResults.length,
      timestamp: new Date()
    };

    return summary;
  }

  async prioritizeForReview(validationResults: ValidationResult[]): Promise<ValidationResult[]> {
    return validationResults
      .filter(r => r.issues.length > 0)
      .sort((a, b) => a.confidence_score - b.confidence_score);
  }

  async generateCommunicationEmail(provider: Provider, issues: string[]): Promise<string> {
    const prompt = `Generate a professional email to healthcare provider ${provider.name} 
    requesting updated information. Issues found: ${issues.join(', ')}
    
    The email should be polite, professional, and clearly list what information needs to be updated.`;

    const email = await nvidiaClient.chat([{ role: 'user', content: prompt }]);
    return email;
  }
}

export class AgentOrchestrator {
  private dataValidationAgent = new DataValidationAgent();
  private enrichmentAgent = new InformationEnrichmentAgent();
  private qaAgent = new QualityAssuranceAgent();
  private directoryAgent = new DirectoryManagementAgent();

  async processProvider(provider: Provider): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    // Step 1: Data Validation
    const validationResult = await this.dataValidationAgent.validate(provider);
    results.push(validationResult);

    // Step 2: Information Enrichment
    const enrichmentResult = await this.enrichmentAgent.enrich(provider);
    results.push(enrichmentResult);

    // Step 3: Quality Assurance
    const qaResult = await this.qaAgent.assess(provider, results);
    results.push(qaResult);

    return results;
  }

  async processBatch(providers: Provider[]): Promise<{
    results: ValidationResult[];
    report: any;
    prioritized: ValidationResult[];
  }> {
    const allResults: ValidationResult[] = [];

    for (const provider of providers) {
      const providerResults = await this.processProvider(provider);
      allResults.push(...providerResults);
    }

    const report = await this.directoryAgent.generateReport(allResults);
    const prioritized = await this.directoryAgent.prioritizeForReview(allResults);

    return {
      results: allResults,
      report,
      prioritized
    };
  }
}
