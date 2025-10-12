import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Wind,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Share2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface PredictionResults {
  riskLevel: "Low" | "Medium" | "High";
  riskScore: number;
  location: string;
  state: string;
  factors: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
  };
  environmentalImpacts?: {
    temperature_impact: number;
    humidity_impact: number;
    rainfall_impact: number;
    wind_impact: number;
  };
  predictedCases?: number;
  recommendations: string[];
  timestamp: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<PredictionResults | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("predictionResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Fallback demo data if no results found
      setResults({
        riskLevel: "Medium",
        riskScore: 65,
        location: "Petaling Jaya",
        state: "Selangor",
        factors: {
          temperature: 30,
          humidity: 75,
          rainfall: 15,
          windSpeed: 5,
        },
        recommendations: [
          "Check and empty water containers weekly",
          "Use mosquito nets while sleeping",
          "Apply repellent when in outdoor areas",
          "Monitor for fever symptoms and consult doctor if needed",
          "Keep surroundings clean and dry",
        ],
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading prediction results...</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "muted";
    }
  };

  const getRiskColorClasses = (risk: string) => {
    switch (risk) {
      case "High":
        return {
          border: "border-destructive/30",
          bg: "bg-destructive/5",
          text: "text-destructive",
          iconBg: "bg-destructive/20",
        };
      case "Medium":
        return {
          border: "border-warning/30",
          bg: "bg-warning/5",
          text: "text-warning",
          iconBg: "bg-warning/20",
        };
      case "Low":
        return {
          border: "border-success/30",
          bg: "bg-success/5",
          text: "text-success",
          iconBg: "bg-success/20",
        };
      default:
        return {
          border: "border-muted/30",
          bg: "bg-muted/5",
          text: "text-muted-foreground",
          iconBg: "bg-muted/20",
        };
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "High":
        return AlertTriangle;
      case "Medium":
        return Shield;
      case "Low":
        return CheckCircle;
      default:
        return Shield;
    }
  };

  // Generate trend data for the last 7 days
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      risk: Math.max(20, results.riskScore + (Math.random() - 0.5) * 20),
    };
  });

  // Environmental factors chart data
  const factorsData = [
    {
      factor: "Temperature",
      value: (results.factors.temperature / 40) * 100,
      optimal: 75,
    },
    { factor: "Humidity", value: results.factors.humidity, optimal: 60 },
    {
      factor: "Rainfall",
      value: Math.min((results.factors.rainfall / 30) * 100, 100),
      optimal: 30,
    },
    {
      factor: "Wind Speed",
      value: Math.max(0, 100 - (results.factors.windSpeed / 20) * 100),
      optimal: 70,
    },
  ];

  const RiskIcon = getRiskIcon(results.riskLevel);
  const riskColor = getRiskColor(results.riskLevel);
  const riskClasses = getRiskColorClasses(results.riskLevel);

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "Dengue Risk Prediction Results",
        text: `My dengue risk assessment for ${results.location}: ${results.riskLevel} Risk (${results.riskScore}%)`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground">
              Dengue Risk Assessment Results
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered prediction for {results.location}, {results.state}
            </p>
          </div>
          <Button variant="outline" onClick={shareResults} className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Level Card */}
            <Card className={`${riskClasses.border} ${riskClasses.bg}`}>
              <CardContent className="p-8">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 ${riskClasses.iconBg} rounded-full mb-4`}
                  >
                    <RiskIcon className={`w-10 h-10 ${riskClasses.text}`} />
                  </div>
                  <h2 className="text-3xl font-poppins font-bold text-foreground mb-2">
                    {results.riskLevel} Risk
                  </h2>
                  <div
                    className={`text-6xl font-bold ${riskClasses.text} mb-4`}
                  >
                    {results.riskScore}%
                  </div>
                  <p className="text-lg text-muted-foreground">
                    Dengue outbreak probability for your area
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Risk Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  7-Day Risk Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [
                        `${Math.round(value as number)}%`,
                        "Risk Level",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{
                        fill: "hsl(var(--primary))",
                        strokeWidth: 2,
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={factorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value) => [
                        `${Math.round(value as number)}%`,
                        "Risk Contribution",
                      ]}
                    />
                    <Bar
                      dataKey="value"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="optimal"
                      fill="hsl(var(--success))"
                      radius={[4, 4, 0, 0]}
                      opacity={0.3}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Current Conditions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success/30 rounded"></div>
                    <span>Optimal Range</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Prediction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{results.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {results.state}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm">
                    {new Date(results.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <Thermometer className="w-5 h-5 text-destructive mx-auto mb-1" />
                    <p className="text-sm font-medium">
                      {results.factors.temperature}°C
                    </p>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <Droplets className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm font-medium">
                      {results.factors.humidity}%
                    </p>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <div className="w-5 h-5 bg-primary rounded-full mx-auto mb-1"></div>
                    <p className="text-sm font-medium">
                      {results.factors.rainfall}mm
                    </p>
                    <p className="text-xs text-muted-foreground">Rainfall</p>
                  </div>
                  <div className="text-center p-3 bg-accent rounded-lg">
                    <Wind className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium">
                      {results.factors.windSpeed} km/h
                    </p>
                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20"
                    >
                      <div className="w-2 h-2 bg-success rounded-full mt-2 shrink-0"></div>
                      <p className="text-sm text-foreground leading-relaxed">
                        {recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/predict">
                <Button className="w-full" variant="outline">
                  New Prediction
                </Button>
              </Link>
              <Link to="/report">
                <Button className="w-full bg-gradient-to-r from-success to-success text-white hover:opacity-90">
                  Report Breeding Site
                </Button>
              </Link>
              <Link to="/map">
                <Button className="w-full" variant="secondary">
                  View Risk Map
                </Button>
              </Link>
            </div>

            {/* Emergency Contact */}
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-2">
                    Emergency Contact
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you experience dengue symptoms (fever, headache, body
                    aches), seek immediate medical attention.
                  </p>
                  <Badge className="bg-destructive text-white font-semibold px-4 py-2">
                    Emergency: 999
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
