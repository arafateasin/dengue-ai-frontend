import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  AlertTriangle,
  Cloud,
  Droplets,
  Thermometer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { weatherService, type WeatherData } from "@/services/weatherService";

const Dashboard = () => {
  // Weather state
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: "Loading...",
    humidity: "Loading...",
    rainfall: "Loading...",
    riskFactor: "Medium",
    location: "Malaysia",
    lastUpdated: "",
  });
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  // Load weather data on component mount
  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setIsLoadingWeather(true);
        const data = await weatherService.getWeatherWithRisk("Kuala Lumpur");
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to load weather data:", error);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    loadWeatherData();

    // Refresh weather data every 10 minutes
    const interval = setInterval(loadWeatherData, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: "Total Cases This Week",
      value: "423",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "alert-red",
    },
    {
      title: "High Risk Zones",
      value: "8",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "warning",
    },
    {
      title: "Citizen Reports",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: Users,
      color: "eco-green",
    },
    {
      title: "AI Predictions",
      value: "85%",
      change: "Accuracy",
      trend: "stable",
      icon: BarChart3,
      color: "healthcare-blue",
    },
  ];

  const predictions = [
    { week: "Week 1", predicted: 120, actual: 115 },
    { week: "Week 2", predicted: 140, actual: 138 },
    { week: "Week 3", predicted: 165, actual: 162 },
    { week: "Current", predicted: 180, actual: null },
  ];

  const hotspots = [
    { area: "Mont Kiara, KL", cases: 23, risk: "High" },
    { area: "Petaling Jaya, Selangor", cases: 19, risk: "High" },
    { area: "Johor Bahru, Johor", cases: 15, risk: "Medium" },
    { area: "Georgetown, Penang", cases: 12, risk: "Medium" },
    { area: "Kota Kinabalu, Sabah", cases: 8, risk: "Low" },
  ];

  const recentReports = [
    {
      id: 1,
      location: "Jalan Ampang, KL",
      type: "Stagnant Water",
      status: "Verified",
      time: "2 hours ago",
    },
    {
      id: 2,
      location: "Bangsar, KL",
      type: "Blocked Drain",
      status: "Investigating",
      time: "4 hours ago",
    },
    {
      id: 3,
      location: "Shah Alam, Selangor",
      type: "Construction Site",
      status: "Resolved",
      time: "6 hours ago",
    },
    {
      id: 4,
      location: "Cyberjaya, Selangor",
      type: "Water Container",
      status: "Verified",
      time: "8 hours ago",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-alert-red bg-alert-red/10 border-alert-red/20";
      case "Medium":
        return "text-warning bg-warning/10 border-warning/20";
      case "Low":
        return "text-eco-green bg-eco-green/10 border-eco-green/20";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "text-alert-red bg-alert-red/10";
      case "Investigating":
        return "text-warning bg-warning/10";
      case "Resolved":
        return "text-eco-green bg-eco-green/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-2">
            Authority Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring and AI predictions for dengue outbreak
            management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.trend === "up"
                          ? "text-alert-red"
                          : stat.trend === "down"
                          ? "text-eco-green"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}/10`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* AI Predictions Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  AI Prediction vs Actual Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {predictions.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">
                          {item.week}
                        </span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-healthcare-blue">
                            Predicted: {item.predicted}
                          </span>
                          {item.actual && (
                            <span className="text-eco-green">
                              Actual: {item.actual}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-healthcare-blue h-2 rounded-full relative"
                          style={{
                            width: `${Math.min(
                              (item.predicted / 200) * 100,
                              100
                            )}%`,
                          }}
                        >
                          {item.actual && (
                            <div
                              className="absolute top-0 h-2 bg-eco-green rounded-full"
                              style={{
                                width: `${Math.min(
                                  (item.actual / item.predicted) * 100,
                                  100
                                )}%`,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-primary" />
                Weather Conditions
                {!isLoadingWeather && weatherData.lastUpdated && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    Updated: {weatherData.lastUpdated}
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingWeather ? (
                <div className="text-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">
                    Loading weather data...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent rounded-lg">
                      <Thermometer className="w-6 h-6 text-alert-red mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.temperature}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Temperature
                      </p>
                    </div>

                    <div className="text-center p-3 bg-accent rounded-lg">
                      <Droplets className="w-6 h-6 text-healthcare-blue mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">
                        {weatherData.humidity}
                      </p>
                      <p className="text-xs text-muted-foreground">Humidity</p>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-accent rounded-lg">
                    <p className="text-lg font-semibold text-foreground mb-1">
                      {weatherData.rainfall}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Rainfall (24h)
                    </p>
                  </div>

                  <div className="text-center">
                    <Badge className={getRiskColor(weatherData.riskFactor)}>
                      Breeding Risk: {weatherData.riskFactor}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Location: {weatherData.location}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hotspots */}
          <Card>
            <CardHeader>
              <CardTitle>Current Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {hotspots.map((hotspot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-accent rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {hotspot.area}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {hotspot.cases} cases reported
                      </p>
                    </div>
                    <Badge className={getRiskColor(hotspot.risk)}>
                      {hotspot.risk}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Citizen Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-start justify-between p-3 bg-accent rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {report.location}
                      </p>
                      <p className="text-xs text-muted-foreground mb-1">
                        {report.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.time}
                      </p>
                    </div>
                    <Badge
                      className={getStatusColor(report.status)}
                      variant="secondary"
                    >
                      {report.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
