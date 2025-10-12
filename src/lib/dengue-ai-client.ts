// API client for communicating with the Dengue AI backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8002";

export interface AnalysisResult {
  is_breeding_site: boolean;
  confidence: number;
  class_prediction: string;
  analysis: {
    risk_level: "Low" | "Medium" | "High";
    description: string;
    recommendations: string[];
  };
  image_filename?: string;
  upload_time?: string;
  error?: string;
}

export interface OutbreakPrediction {
  outbreak_probability: number;
  risk_level: "Low" | "Medium" | "High";
  predicted_cases: number;
  environmental_factors: {
    temperature_impact: number;
    humidity_impact: number;
    rainfall_impact: number;
    wind_impact: number;
  };
  recommendations: string[];
  location: string;
  prediction_time?: string;
  error?: string;
}

export interface LocationData {
  location: string;
  temperature: number;
  humidity: number;
  rainfall?: number;
  wind_speed?: number;
  population?: number;
}

export interface ModelInfo {
  cnn_model: {
    loaded: boolean;
    classes: string[];
    description: string;
  };
  lstm_model: {
    loaded: boolean;
    description: string;
  };
  api_version: string;
  last_updated: string;
}

class DengueAIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Check if the AI API is healthy and running
   */
  async healthCheck(): Promise<{
    status: string;
    message: string;
    timestamp: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to connect to AI API: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Analyze an uploaded image for dengue breeding sites
   */
  async analyzeImage(imageFile: File): Promise<AnalysisResult> {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${this.baseUrl}/api/analyze-image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: response.statusText }));
        throw new Error(
          errorData.error || `Analysis failed: ${response.statusText}`
        );
      }

      const result = await response.json();
      return result as AnalysisResult;
    } catch (error) {
      return {
        is_breeding_site: false,
        confidence: 0,
        class_prediction: "Error",
        analysis: {
          risk_level: "Low",
          description: "Analysis failed",
          recommendations: ["Please try again with a different image"],
        },
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Predict dengue outbreak probability based on environmental data
   */
  async predictOutbreak(
    locationData: LocationData
  ): Promise<OutbreakPrediction> {
    try {
      const response = await fetch(`${this.baseUrl}/api/predict-outbreak`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: response.statusText }));
        throw new Error(
          errorData.error || `Prediction failed: ${response.statusText}`
        );
      }

      const result = await response.json();
      return result as OutbreakPrediction;
    } catch (error) {
      return {
        outbreak_probability: 0,
        risk_level: "Low",
        predicted_cases: 0,
        environmental_factors: {
          temperature_impact: 0,
          humidity_impact: 0,
          rainfall_impact: 0,
          wind_impact: 0,
        },
        recommendations: ["Unable to generate predictions at this time"],
        location: locationData.location,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Get batch predictions for multiple locations
   */
  async batchPredict(locations: LocationData[]): Promise<{
    predictions: OutbreakPrediction[];
    batch_size: number;
    prediction_time: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/batch-predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locations }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: response.statusText }));
        throw new Error(
          errorData.error || `Batch prediction failed: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(
        `Batch prediction failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Get information about the loaded AI models
   */
  async getModelInfo(): Promise<ModelInfo> {
    try {
      const response = await fetch(`${this.baseUrl}/api/model-info`);
      if (!response.ok) {
        throw new Error(`Failed to get model info: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to get model info: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Utility function to validate image file before upload
   */
  validateImageFile(file: File): { valid: boolean; error?: string } {
    const allowedTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 16 * 1024 * 1024; // 16MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error:
          "Invalid file type. Please upload PNG, JPG, JPEG, GIF, or WebP images.",
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File too large. Please upload an image smaller than 16MB.",
      };
    }

    return { valid: true };
  }
}

// Create and export a default instance
export const dengueAI = new DengueAIClient();

// Also export the class for custom instances
export default DengueAIClient;
