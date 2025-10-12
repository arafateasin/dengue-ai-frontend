import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Shield,
  Users,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';

interface PredictionResults {
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  riskScore: number;
  location: string;
  state: string;
  factors: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed?: number;
    populationDensity?: number;
  };
  environmentalImpacts?: {
    temperature_impact: number;
    humidity_impact: number;
    rainfall_impact: number;
    wind_impact?: number;
  };
  predictedCases?: number;
  recommendations: string[];
  timestamp: string;
  weatherData?: {
    temperature: number;
    humidity: number;
    rainfall: number;
    weather_description: string;
    breeding_risk_score: number;
  };
  prediction?: {
    predicted_cases: number[];
    confidence: number;
  };
}

const PredictionReport: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as PredictionResults;

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="max-w-md mx-auto mt-20 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Prediction Data</h2>
          <p className="text-gray-600 mb-6">Please run a prediction first to view the report.</p>
          <Button onClick={() => navigate('/predict')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prediction
          </Button>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'High':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'High':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'Medium':
        return <Activity className="w-5 h-5 text-yellow-600" />;
      case 'Low':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/predict')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Prediction
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dengue Risk Assessment Report</h1>
                <p className="text-gray-600 mt-1">Comprehensive analysis and recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Assessment Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Risk Assessment</CardTitle>
                    <CardDescription className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {results.location}, {results.state}
                      <Calendar className="w-4 h-4 ml-4 mr-1" />
                      {format(new Date(results.timestamp), 'MMM dd, yyyy HH:mm')}
                    </CardDescription>
                  </div>
                  <Badge className={`${getRiskColor(results.riskLevel)} px-4 py-2 text-lg font-semibold`}>
                    {getRiskIcon(results.riskLevel)}
                    <span className="ml-2">{results.riskLevel} Risk</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Risk Score</span>
                      <span className="text-lg font-bold">{results.riskScore}%</span>
                    </div>
                    <Progress 
                      value={results.riskScore} 
                      className="h-3"
                      style={{'--progress-background': getProgressColor(results.riskScore)} as React.CSSProperties}
                    />
                  </div>
                  
                  {results.predictedCases && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-900">Predicted Cases</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 mt-1">{results.predictedCases}</p>
                      <p className="text-sm text-blue-600">Expected cases in the next 2 weeks</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Analysis</CardTitle>
                <CardDescription>Current weather conditions and their impact on dengue risk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-lg font-bold text-orange-700">{results.factors.temperature}°C</p>
                    {results.environmentalImpacts?.temperature_impact && (
                      <p className="text-xs text-orange-600">Impact: {(results.environmentalImpacts.temperature_impact * 100).toFixed(0)}%</p>
                    )}
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-lg font-bold text-blue-700">{results.factors.humidity}%</p>
                    {results.environmentalImpacts?.humidity_impact && (
                      <p className="text-xs text-blue-600">Impact: {(results.environmentalImpacts.humidity_impact * 100).toFixed(0)}%</p>
                    )}
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Cloud className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Rainfall</p>
                    <p className="text-lg font-bold text-green-700">{results.factors.rainfall}mm</p>
                    {results.environmentalImpacts?.rainfall_impact && (
                      <p className="text-xs text-green-600">Impact: {(results.environmentalImpacts.rainfall_impact * 100).toFixed(0)}%</p>
                    )}
                  </div>
                  
                  {results.factors.windSpeed && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Wind className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Wind Speed</p>
                      <p className="text-lg font-bold text-purple-700">{results.factors.windSpeed}km/h</p>
                      {results.environmentalImpacts?.wind_impact && (
                        <p className="text-xs text-purple-600">Impact: {(results.environmentalImpacts.wind_impact * 100).toFixed(0)}%</p>
                      )}
                    </div>
                  )}
                </div>

                {results.weatherData && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Real Weather Data</h4>
                    <p className="text-sm text-gray-600 mb-2">{results.weatherData.weather_description}</p>
                    <div className="flex justify-between">
                      <span className="text-sm">Breeding Risk Score:</span>
                      <span className="font-semibold">{(results.weatherData.breeding_risk_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Model Insights */}
            {results.prediction && (
              <Card>
                <CardHeader>
                  <CardTitle>AI Model Predictions</CardTitle>
                  <CardDescription>2-week forecast based on weather patterns and historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 font-medium">Model Confidence</p>
                        <p className="text-2xl font-bold text-blue-800">{(results.prediction.confidence * 100).toFixed(1)}%</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Average Weekly Cases</p>
                        <p className="text-2xl font-bold text-green-800">
                          {(results.prediction.predicted_cases.reduce((a, b) => a + b, 0) / results.prediction.predicted_cases.length).toFixed(0)}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Weekly Case Predictions</h4>
                      <div className="space-y-2">
                        {results.prediction.predicted_cases.map((cases, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">Week {index + 1}</span>
                            <span className="font-semibold">{cases} cases</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Recommendations
                </CardTitle>
                <CardDescription>Immediate actions based on your risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-800">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Report Breeding Site
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Share with Community
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Track Risk Over Time
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {(results.riskLevel === 'High' || results.riskLevel === 'Critical') && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-3">
                    Due to {results.riskLevel.toLowerCase()} risk level, consider contacting local health authorities.
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Contact Health Department
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionReport;