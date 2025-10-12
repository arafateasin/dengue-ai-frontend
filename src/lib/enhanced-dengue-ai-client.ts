// Advanced API client for the Dengue Guard AI FastAPI backend

const API_BASE_URL = "http://localhost:8002";

// Advanced AI Analysis Result Types
export interface AdvancedAnalysisResult {
  status: string;
  classification: {
    category: "Hotspot" | "Potential" | "Not Hotspot" | "Invalid";
    confidence: number;
    description: string;
    risk_level: "Critical" | "High" | "Low";
  };
  ai_analysis: {
    efficientnet_prediction: string;
    confidence_score: number;
    feature_analysis: string[];
    recommendations: string[];
  };
  timestamp: string;
  image_id: string;
}

export interface AdvancedOutbreakPrediction {
  status: string;
  prediction: {
    outbreak_probability: number;
    risk_level: "Critical" | "High" | "Low";
    predicted_cases: number;
    confidence: number;
  };
  real_ai_analysis: {
    model_used: "RandomForest" | "GradientBoosting" | "LSTM" | "GRU";
    feature_importance: Record<string, number>;
    accuracy_score: number;
    data_source: string;
  };
  environmental_factors: {
    temperature_impact: number;
    humidity_impact: number;
    rainfall_impact: number;
    population_density_impact: number;
  };
  quantum_insights?: {
    optimal_response_strategy: string;
    resource_allocation: Record<string, unknown>;
  };
  recommendations: string[];
  timestamp: string;
}

// Backend PredictionResponse interface (actual response from FastAPI)
export interface BackendPredictionResponse {
  prediction_id: string;
  location: string;
  state: string;
  risk_level: "Low" | "Medium" | "High" | "Critical";
  predicted_cases: number;
  confidence: number;
  prediction_date: string;
  weather_factors: Record<string, unknown>;
  risk_factors: string[];
  recommendations: string[];
  created_at: string;
}

export interface OutbreakPredictionRequest {
  location: string;
  state: string;
  temperature?: number;
  humidity?: number;
  rainfall?: number;
  wind_speed?: number;
  description?: string;
  date?: string;
}

class AdvancedDengueAIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the advanced AI API is healthy and running
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Predict outbreak risk using enhanced AI model
   */
  async predictOutbreak(
    data: OutbreakPredictionRequest
  ): Promise<BackendPredictionResponse> {
    try {
      // First check if the API is available
      const isHealthy = await this.healthCheck();
      if (!isHealthy) {
        throw new Error("AI service is currently unavailable. Please try again later.");
      }

      const response = await fetch(`${this.baseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          detail: response.statusText || "Unknown error occurred"
        }));
        
        throw new Error(
          errorData.detail || "Failed to get prediction from AI model"
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Prediction error:", error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred while making the prediction"
      );
    }
  }
}

export const advancedAiClient = new AdvancedDengueAIClient();