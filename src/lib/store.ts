import { Provider, ValidationResult } from './types';

class ProviderStore {
  private providers: Provider[] = [];
  private validationResults: ValidationResult[] = [];

  setProviders(providers: Provider[]): void {
    this.providers = providers;
  }

  getProviders(): Provider[] {
    return this.providers;
  }

  addProvider(provider: Provider): void {
    this.providers.push(provider);
  }

  updateProvider(npi: string, updates: Partial<Provider>): void {
    const index = this.providers.findIndex(p => p.npi === npi);
    if (index !== -1) {
      this.providers[index] = { ...this.providers[index], ...updates };
    }
  }

  deleteProvider(npi: string): void {
    this.providers = this.providers.filter(p => p.npi !== npi);
  }

  setValidationResults(results: ValidationResult[]): void {
    this.validationResults = results;
  }

  getValidationResults(): ValidationResult[] {
    return this.validationResults;
  }

  addValidationResult(result: ValidationResult): void {
    this.validationResults.push(result);
  }

  clearAll(): void {
    this.providers = [];
    this.validationResults = [];
  }
}

export const providerStore = new ProviderStore();
