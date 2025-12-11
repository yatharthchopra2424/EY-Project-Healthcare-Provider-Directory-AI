import axios from 'axios';

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const INVOKE_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface NvidiaAPIResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class NvidiaClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || NVIDIA_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('NVIDIA API key is required');
    }
  }

  async chat(messages: Message[], temperature: number = 0.15): Promise<string> {
    try {
      const headers = {
        "Authorization": `Bearer ${this.apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      };

      const payload = {
        model: "mistralai/mistral-large-3-675b-instruct-2512",
        messages,
        max_tokens: 2048,
        temperature,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stream: false
      };

      const response = await axios.post<NvidiaAPIResponse>(INVOKE_URL, payload, { headers });
      
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      }
      
      throw new Error('No response from API');
    } catch (error) {
      console.error('NVIDIA API Error:', error);
      throw error;
    }
  }

  async analyzeProviderData(providerData: any): Promise<any> {
    const systemPrompt = `You are an expert healthcare provider data validation agent. 
    Analyze the provider information and extract key details including name, specialties, 
    contact information, licenses, and identify any potential data quality issues.
    Return your analysis in valid JSON format.`;

    const userPrompt = `Analyze this provider data: ${JSON.stringify(providerData)}
    
    Return a JSON object with:
    {
      "confidence_score": number (0-100),
      "extracted_data": {
        "name": string,
        "specialty": string[],
        "phone": string,
        "address": string,
        "license": string
      },
      "issues": string[],
      "recommendations": string[]
    }`;

    const response = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    try {
      return JSON.parse(response);
    } catch {
      return { raw_response: response };
    }
  }

  async validateContactInfo(name: string, phone: string, address: string): Promise<any> {
    const prompt = `Validate this healthcare provider contact information:
    Name: ${name}
    Phone: ${phone}
    Address: ${address}
    
    Return JSON with validation results:
    {
      "phone_valid": boolean,
      "address_valid": boolean,
      "confidence": number,
      "issues": string[]
    }`;

    const response = await this.chat([{ role: 'user', content: prompt }], 0.1);
    
    try {
      return JSON.parse(response);
    } catch {
      return { raw_response: response };
    }
  }

  async enrichProviderInfo(providerName: string, npi?: string): Promise<any> {
    const prompt = `Research and enrich information for healthcare provider: ${providerName}${npi ? ` (NPI: ${npi})` : ''}
    
    Provide additional details that would typically be found in public sources:
    - Board certifications
    - Education background
    - Hospital affiliations
    - Years of experience
    
    Return as JSON.`;

    const response = await this.chat([{ role: 'user', content: prompt }], 0.2);
    
    try {
      return JSON.parse(response);
    } catch {
      return { raw_response: response };
    }
  }
}

export const nvidiaClient = new NvidiaClient();
