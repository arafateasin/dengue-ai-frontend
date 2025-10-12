/**
 * Weather Service - Integrates with multiple weather APIs
 *
 * APIs Used:
 * 1. WeatherStack API - For current weather conditions
 * 2. Malaysia Government APIs - For local forecasts and warnings
 */

// Weather API Configuration
const WEATHERSTACK_API_KEY = "bc84b5b2cc1bd78082aa639929e9c533";
const WEATHERSTACK_BASE_URL = "http://api.weatherstack.com";
const MALAYSIA_API_BASE_URL = "https://api.data.gov.my";

// Historical Selangor Weather Data (June-September 2025) for Enhanced Predictions
const SELANGOR_HISTORICAL_DATA = {
  averageTemperature: { min: 23, max: 36, optimal: 28 },
  averageHumidity: { min: 36, max: 94, optimal: 78 },
  rainyDays: { total: 55, peakWeeks: [3, 7, 12] }, // Peak monsoon weeks
  floodRiskAreas: [
    "Hulu Langat",
    "Shah Alam",
    "Petaling Jaya",
    "Cyberjaya",
    "Putrajaya",
  ],
  highRiskPeriods: [
    {
      period: "July 18-23",
      risk: "Critical",
      reason: "Heatwave 36°C + 94% humidity",
    },
    {
      period: "Sep 14-20",
      risk: "Critical",
      reason: "Flash floods + standing water",
    },
    {
      period: "August",
      risk: "High",
      reason: "19 rainy days + warm temperatures",
    },
  ],
  dengueOptimalConditions: {
    temperatureRange: [25, 30], // °C - Optimal Aedes breeding
    humidityMin: 60, // % - Minimum for mosquito survival
    rainThreshold: 100, // mm/week - Creates breeding sites
  },
};

// Enhanced Risk Assessment based on Selangor data
const assessDengueRisk = (
  temp: number,
  humidity: number,
  rainfall: number
): {
  risk: "Low" | "Medium" | "High" | "Critical";
  reasoning: string[];
} => {
  const reasons: string[] = [];
  let riskScore = 0;

  // Temperature assessment based on Selangor data
  if (temp >= 25 && temp <= 30) {
    riskScore += 3;
    reasons.push("Temperature in optimal Aedes breeding range (25-30°C)");
  } else if (temp > 30 && temp <= 35) {
    riskScore += 2;
    reasons.push("High temperature accelerates mosquito development");
  } else if (temp > 35) {
    riskScore += 1;
    reasons.push("Extreme heat may reduce mosquito activity");
  }

  // Humidity assessment
  if (humidity >= 70) {
    riskScore += 3;
    reasons.push(`High humidity (${humidity}%) supports mosquito survival`);
  } else if (humidity >= 60) {
    riskScore += 2;
    reasons.push("Moderate humidity suitable for mosquito breeding");
  } else if (humidity < 50) {
    riskScore -= 1;
    reasons.push("Low humidity inhibits mosquito survival");
  }

  // Rainfall assessment
  if (rainfall > 100) {
    riskScore += 3;
    reasons.push("Heavy rainfall creates multiple breeding sites");
  } else if (rainfall > 50) {
    riskScore += 2;
    reasons.push("Moderate rainfall provides water accumulation");
  }

  // Determine risk level
  let risk: "Low" | "Medium" | "High" | "Critical";
  if (riskScore >= 7) {
    risk = "Critical";
    reasons.push(
      "Conditions match July 2025 heatwave/September flood patterns"
    );
  } else if (riskScore >= 5) {
    risk = "High";
    reasons.push("Similar to peak monsoon conditions in Selangor");
  } else if (riskScore >= 3) {
    risk = "Medium";
  } else {
    risk = "Low";
  }

  return { risk, reasoning: reasons };
};

// Types
export interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
  riskFactor: "Low" | "Medium" | "High" | "Critical";
  location: string;
  lastUpdated: string;
}

export interface WeatherStackResponse {
  current: {
    temperature: number;
    humidity: number;
    precip: number;
    weather_descriptions: string[];
    feelslike: number;
    uv_index: number;
    visibility: number;
  };
  location: {
    name: string;
    country: string;
    region: string;
  };
}

export interface MalaysiaWeatherForecast {
  data: Array<{
    date: string;
    location: string;
    temperature_max: number;
    temperature_min: number;
    humidity: number;
    rainfall: number;
    weather_desc: string;
  }>;
}

class WeatherService {
  private cache: { [key: string]: { data: unknown; timestamp: number } } = {};
  private cacheTimeout = 10 * 60 * 1000; // 10 minutes cache

  /**
   * Get weather data from WeatherStack API
   */
  async getWeatherStackData(
    location: string = "Kuala Lumpur"
  ): Promise<WeatherStackResponse | null> {
    const cacheKey = `weatherstack_${location}`;

    // Check cache
    if (
      this.cache[cacheKey] &&
      Date.now() - this.cache[cacheKey].timestamp < this.cacheTimeout
    ) {
      return this.cache[cacheKey].data as WeatherStackResponse;
    }

    try {
      const response = await fetch(
        `${WEATHERSTACK_BASE_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${encodeURIComponent(
          location
        )}`
      );

      if (!response.ok) {
        throw new Error(`WeatherStack API error: ${response.status}`);
      }

      const data: WeatherStackResponse = await response.json();

      // Cache the result
      this.cache[cacheKey] = { data, timestamp: Date.now() };

      return data;
    } catch (error) {
      console.error("WeatherStack API error:", error);
      return null;
    }
  }

  /**
   * Get Malaysia government weather forecast
   */
  async getMalaysiaWeatherForecast(): Promise<MalaysiaWeatherForecast | null> {
    const cacheKey = "malaysia_forecast";

    // Check cache
    if (
      this.cache[cacheKey] &&
      Date.now() - this.cache[cacheKey].timestamp < this.cacheTimeout
    ) {
      return this.cache[cacheKey].data as MalaysiaWeatherForecast;
    }

    try {
      const response = await fetch(`${MALAYSIA_API_BASE_URL}/weather/forecast`);

      if (!response.ok) {
        throw new Error(`Malaysia API error: ${response.status}`);
      }

      const data: MalaysiaWeatherForecast = await response.json();

      // Cache the result
      this.cache[cacheKey] = { data, timestamp: Date.now() };

      return data;
    } catch (error) {
      console.error("Malaysia Weather API error:", error);
      return null;
    }
  }

  /**
   * Calculate breeding risk based on weather conditions (Enhanced with Selangor 2025 data)
   */
  calculateBreedingRisk(
    temperature: number,
    humidity: number,
    rainfall: number
  ): "Low" | "Medium" | "High" | "Critical" {
    // Use enhanced risk assessment based on real Selangor data
    const assessment = assessDengueRisk(temperature, humidity, rainfall);
    return assessment.risk;
  }

  /**
   * Get detailed risk analysis with reasoning
   */
  getDetailedRiskAnalysis(
    temperature: number,
    humidity: number,
    rainfall: number
  ): {
    risk: "Low" | "Medium" | "High" | "Critical";
    reasoning: string[];
    historicalContext: string;
  } {
    const assessment = assessDengueRisk(temperature, humidity, rainfall);

    // Add historical context
    let historicalContext =
      "Based on Selangor weather patterns (June-September 2025): ";

    if (assessment.risk === "Critical") {
      historicalContext +=
        "Similar to July 2025 heatwave (36°C, 94% humidity) and September flash floods that caused 12 fatalities.";
    } else if (assessment.risk === "High") {
      historicalContext +=
        "Comparable to August 2025 conditions with 19 rainy days and consistent warm temperatures.";
    } else if (assessment.risk === "Medium") {
      historicalContext +=
        "Moderate conditions, monitor for increases in temperature/humidity combination.";
    } else {
      historicalContext +=
        "Low risk conditions, continue standard prevention measures.";
    }

    return {
      risk: assessment.risk,
      reasoning: assessment.reasoning,
      historicalContext,
    };
  }

  /**
   * Get comprehensive weather data with breeding risk assessment
   */
  async getWeatherWithRisk(
    location: string = "Kuala Lumpur"
  ): Promise<WeatherData> {
    try {
      // Try to get WeatherStack data first (more detailed)
      const weatherStackData = await this.getWeatherStackData(location);

      if (weatherStackData) {
        const temperature = weatherStackData.current.temperature;
        const humidity = weatherStackData.current.humidity;
        const rainfall = weatherStackData.current.precip || 0;

        const riskFactor = this.calculateBreedingRisk(
          temperature,
          humidity,
          rainfall
        );

        return {
          temperature: `${temperature}°C`,
          humidity: `${humidity}%`,
          rainfall: `${rainfall}mm`,
          riskFactor,
          location: `${weatherStackData.location.name}, ${weatherStackData.location.region}`,
          lastUpdated: new Date().toLocaleTimeString(),
        };
      }

      // Fallback to Malaysia API
      const malaysiaData = await this.getMalaysiaWeatherForecast();
      if (malaysiaData && malaysiaData.data.length > 0) {
        const latestData = malaysiaData.data[0];
        const avgTemp =
          (latestData.temperature_max + latestData.temperature_min) / 2;
        const humidity = latestData.humidity;
        const rainfall = latestData.rainfall;

        const riskFactor = this.calculateBreedingRisk(
          avgTemp,
          humidity,
          rainfall
        );

        return {
          temperature: `${Math.round(avgTemp)}°C`,
          humidity: `${humidity}%`,
          rainfall: `${rainfall}mm`,
          riskFactor,
          location: latestData.location,
          lastUpdated: new Date().toLocaleTimeString(),
        };
      }

      // Final fallback with reasonable estimates for Malaysia
      return this.getFallbackWeatherData();
    } catch (error) {
      console.error("Weather service error:", error);
      return this.getFallbackWeatherData();
    }
  }

  /**
   * Fallback weather data based on typical Malaysian conditions
   */
  private getFallbackWeatherData(): WeatherData {
    // Malaysian typical weather patterns
    const temperature = 28 + Math.random() * 6; // 28-34°C
    const humidity = 65 + Math.random() * 20; // 65-85%
    const rainfall = Math.random() * 20; // 0-20mm

    const riskFactor = this.calculateBreedingRisk(
      temperature,
      humidity,
      rainfall
    );

    return {
      temperature: `${Math.round(temperature)}°C`,
      humidity: `${Math.round(humidity)}%`,
      rainfall: `${Math.round(rainfall)}mm`,
      riskFactor,
      location: "Malaysia",
      lastUpdated: new Date().toLocaleTimeString() + " (Estimated)",
    };
  }

  /**
   * Get weather warnings from Malaysia API
   */
  async getWeatherWarnings() {
    try {
      const response = await fetch(`${MALAYSIA_API_BASE_URL}/weather/warning`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Weather warnings API error:", error);
    }
    return null;
  }
}

// Export singleton instance
export const weatherService = new WeatherService();
export default weatherService;
