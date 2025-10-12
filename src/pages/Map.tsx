import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  HeatmapLayer,
} from "@react-google-maps/api";
import { MapPin, Filter, Info, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const libraries: "visualization"[] = ["visualization"];

const Map = () => {
  const [selectedFilter, setSelectedFilter] = useState("risk");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const filters = [
    { id: "risk", label: "Risk Level", icon: AlertTriangle },
    { id: "cases", label: "Active Cases", icon: TrendingUp },
    { id: "reports", label: "Citizen Reports", icon: MapPin },
  ];

  const riskData = {
    Selangor: {
      risk: "High",
      cases: 156,
      reports: 23,
      color: "alert-red",
      lat: 3.0738,
      lng: 101.5183,
    },
    "Kuala Lumpur": {
      risk: "High",
      cases: 89,
      reports: 15,
      color: "alert-red",
      lat: 3.139,
      lng: 101.6869,
    },
    Johor: {
      risk: "Medium",
      cases: 67,
      reports: 12,
      color: "warning",
      lat: 1.4927,
      lng: 103.7414,
    },
    Penang: {
      risk: "Medium",
      cases: 45,
      reports: 8,
      color: "warning",
      lat: 5.4164,
      lng: 100.3327,
    },
    Perak: {
      risk: "Low",
      cases: 23,
      reports: 5,
      color: "eco-green",
      lat: 4.5975,
      lng: 101.0901,
    },
    Sabah: {
      risk: "Low",
      cases: 18,
      reports: 3,
      color: "eco-green",
      lat: 5.9804,
      lng: 116.0735,
    },
    Sarawak: {
      risk: "Low",
      cases: 15,
      reports: 2,
      color: "eco-green",
      lat: 1.5533,
      lng: 110.3592,
    },
  };

  // Generate heatmap data points based on risk levels
  const generateHeatmapData = () => {
    const heatmapData: google.maps.LatLng[] = [];

    Object.entries(riskData).forEach(([state, data]) => {
      const weight = data.risk === "High" ? 5 : data.risk === "Medium" ? 3 : 1;
      const basePoints = data.cases / 10; // Base number of points

      // Create multiple points around each state center with some randomization
      for (let i = 0; i < basePoints * weight; i++) {
        const lat = data.lat + (Math.random() - 0.5) * 0.5; // ±0.25 degrees
        const lng = data.lng + (Math.random() - 0.5) * 0.5; // ±0.25 degrees
        heatmapData.push(new google.maps.LatLng(lat, lng));
      }
    });

    return heatmapData;
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 4.2105, // Malaysia center
    lng: 101.9758,
  };

  const mapOptions = {
    zoom: 6,
    center: center,
    mapTypeId: "roadmap" as google.maps.MapTypeId,
    styles: [
      {
        featureType: "all",
        stylers: [{ saturation: -20 }],
      },
    ],
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

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

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-4">
            Malaysia Dengue Risk Map
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Real-time dengue risk assessment across Malaysian states and
            territories
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => setSelectedFilter(filter.id)}
                className="flex items-center gap-2"
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="h-[600px] shadow-md border-2">
              <CardHeader className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-healthcare-blue" />
                  Interactive Malaysia Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-4rem)] p-0">
                {/* Google Maps with Heatmap */}
                <div className="w-full h-full">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={6}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                      options={mapOptions}
                    >
                      <HeatmapLayer
                        data={generateHeatmapData()}
                        options={{
                          radius: 50,
                          opacity: 0.8,
                          gradient: [
                            "rgba(0, 255, 0, 0)",
                            "rgba(255, 255, 0, 1)",
                            "rgba(255, 165, 0, 1)",
                            "rgba(255, 0, 0, 1)",
                          ],
                        }}
                      />
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4 p-6">
                        <MapPin className="w-16 h-16 text-healthcare-blue/60 mx-auto animate-pulse" />
                        <div className="max-w-md">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            Loading Google Maps...
                          </h3>
                          <p className="text-muted-foreground">
                            Setting up interactive heatmap visualization
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-sm border-2">
              <CardHeader className="pb-3 border-b">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Info className="w-4 h-4 text-healthcare-blue" />
                  Risk Level Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-alert-red/5 p-3 rounded-lg">
                    <div className="w-4 h-4 bg-alert-red rounded-sm shadow-sm"></div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      High Risk (&gt;100 cases)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-warning/5 p-3 rounded-lg">
                    <div className="w-4 h-4 bg-warning rounded-sm shadow-sm"></div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      Medium Risk (25-100)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-eco-green/5 p-3 rounded-lg">
                    <div className="w-4 h-4 bg-eco-green rounded-sm shadow-sm"></div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      Low Risk (&lt;25)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* State Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  State Risk Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(riskData).map(([state, data]) => (
                  <div
                    key={state}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedState === state
                        ? "ring-2 ring-primary"
                        : "hover:border-primary/20"
                    }`}
                    onClick={() =>
                      setSelectedState(selectedState === state ? null : state)
                    }
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-foreground">{state}</h4>
                      <Badge className={getRiskColor(data.risk)}>
                        {data.risk}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cases:</span>
                        <span className="ml-1 font-medium">{data.cases}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reports:</span>
                        <span className="ml-1 font-medium">{data.reports}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-alert-red mb-1">
                      ↑ 12%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cases increased from last week
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>High Risk States</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medium Risk States</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Low Risk States</span>
                      <span className="font-medium">9</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
