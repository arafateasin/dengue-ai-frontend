import { toast } from "@/hooks/use-toast";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
}

class WeatherService {
  private readonly baseUrl: string = "/api/v1";

  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}/weather/current/${encodeURIComponent(location)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      return {
        temperature: data.temperature,
        humidity: data.humidity,
        rainfall: data.rainfall,
        windSpeed: data.wind_speed
      };
    } catch (error) {
      console.error("Weather fetch error:", error);
      toast({
        title: "Weather Data Error",
        description: "Could not fetch current weather data. Using default values.",
        variant: "destructive"
      });
      
      // Return default values if weather fetch fails
      return {
        temperature: 30,
        humidity: 75,
        rainfall: 15,
        windSpeed: 5
      };
    }
  }
}

export const weatherService = new WeatherService();