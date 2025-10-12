import { useState } from "react";
import { Bell, Globe, Smartphone, Volume2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Alerts = () => {
  const [selectedLang, setSelectedLang] = useState("english");

  const languages = {
    english: { name: "English", code: "EN" },
    malay: { name: "Bahasa Malaysia", code: "MY" },
    tamil: { name: "தமிழ்", code: "TA" },
    chinese: { name: "中文", code: "ZH" }
  };

  const alerts = {
    english: [
      {
        id: 1,
        level: "high",
        title: "HIGH DENGUE RISK ALERT - SELANGOR",
        message: "⚠️ High dengue risk detected in Petaling Jaya and Shah Alam areas. 23 new cases reported this week. Remove stagnant water immediately. Seek medical attention for fever symptoms.",
        area: "Selangor",
        timestamp: "2 hours ago",
        type: "outbreak"
      },
      {
        id: 2,
        level: "medium",
        title: "Weather Alert - Breeding Conditions",
        message: "🌧️ Heavy rainfall expected in Klang Valley. High humidity and standing water create ideal breeding conditions. Check your surroundings for potential sites.",
        area: "Kuala Lumpur",
        timestamp: "6 hours ago",
        type: "weather"
      },
      {
        id: 3,
        level: "low",
        title: "Community Action Success",
        message: "✅ Great work! Citizen reports led to elimination of 15 breeding sites in Johor Bahru this week. Keep reporting suspicious areas!",
        area: "Johor",
        timestamp: "1 day ago",
        type: "success"
      }
    ],
    malay: [
      {
        id: 1,
        level: "high",
        title: "AMARAN RISIKO DENGGI TINGGI - SELANGOR",
        message: "⚠️ Risiko denggi tinggi dikesan di kawasan Petaling Jaya dan Shah Alam. 23 kes baru dilaporkan minggu ini. Buang air bertakung serta-merta. Dapatkan rawatan perubatan untuk gejala demam.",
        area: "Selangor",
        timestamp: "2 jam lalu",
        type: "outbreak"
      },
      {
        id: 2,
        level: "medium",
        title: "Amaran Cuaca - Keadaan Pembiakan",
        message: "🌧️ Hujan lebat dijangka di Lembah Klang. Kelembapan tinggi dan air bertakung mewujudkan keadaan pembiakan ideal. Periksa persekitaran anda untuk tapak berpotensi.",
        area: "Kuala Lumpur",
        timestamp: "6 jam lalu",
        type: "weather"
      }
    ],
    tamil: [
      {
        id: 1,
        level: "high",
        title: "உயர் டெங்கு அபாய எச்சரிக்கை - செலாங்கூர்",
        message: "⚠️ பெதலிங் ஜெயா மற்றும் ஷா ஆலம் பகுதிகளில் உயர் டெங்கு அபாயம் கண்டறியப்பட்டது. இந்த வாரம் 23 புதிய வழக்குகள் பதிவாகியுள்ளன. உடனடியாக தேங்கிய நீரை அகற்றவும்.",
        area: "செலாங்கூர்",
        timestamp: "2 மணிநேரம் முன்பு",
        type: "outbreak"
      }
    ],
    chinese: [
      {
        id: 1,
        level: "high", 
        title: "登革热高风险警报 - 雪兰莪",
        message: "⚠️ 在八打灵再也和莎阿南地区检测到登革热高风险。本周报告了23个新病例。请立即清除积水。如有发烧症状请寻求医疗援助。",
        area: "雪兰莪",
        timestamp: "2小时前",
        type: "outbreak"
      }
    ]
  };

  const alertChannels = [
    {
      name: "SMS Alerts",
      icon: Smartphone,
      description: "Instant SMS notifications to registered mobile numbers",
      coverage: "Statewide",
      active: true
    },
    {
      name: "Public Broadcasting",
      icon: Volume2,
      description: "Radio and TV announcements during peak hours",
      coverage: "National",
      active: true
    },
    {
      name: "Mobile App Push",
      icon: Bell,
      description: "Push notifications through MySejahtera and health apps",
      coverage: "App Users",
      active: true
    },
    {
      name: "Community Speakers",
      icon: Volume2,
      description: "Local community center announcements",
      coverage: "Local Areas",
      active: false
    }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case "high": return "border-l-alert-red bg-alert-red/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-eco-green bg-eco-green/5";
      default: return "border-l-gray-300";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "outbreak": return AlertTriangle;
      case "weather": return Info;
      case "success": return CheckCircle;
      default: return Bell;
    }
  };

  const getAlertBadge = (level: string) => {
    switch (level) {
      case "high": return "bg-alert-red text-white";
      case "medium": return "bg-warning text-white";
      case "low": return "bg-eco-green text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-4">
            Community Alerts System
          </h1>
          <p className="text-lg text-muted-foreground">
            Multilingual early warning system delivering targeted alerts across Malaysia
          </p>
        </div>

        {/* Language Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Multilingual Alert Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedLang} onValueChange={setSelectedLang}>
              <TabsList className="grid w-full grid-cols-4">
                {Object.entries(languages).map(([key, lang]) => (
                  <TabsTrigger key={key} value={key}>
                    {lang.code}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(languages).map(([key, lang]) => (
                <TabsContent key={key} value={key} className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="font-medium">Active Alerts in {lang.name}</span>
                    </div>

                    {alerts[key as keyof typeof alerts]?.map((alert) => {
                      const IconComponent = getAlertIcon(alert.type);
                      return (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.level)} transition-smooth hover:shadow-md`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-5 h-5" />
                              <h3 className="font-semibold text-foreground">
                                {alert.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getAlertBadge(alert.level)}>
                                {alert.level.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-foreground mb-3 leading-relaxed">
                            {alert.message}
                          </p>
                          
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>📍 {alert.area}</span>
                            <span>🕒 {alert.timestamp}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Alert Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Alert Distribution Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {alertChannels.map((channel, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-smooth ${
                    channel.active 
                      ? "border-eco-green/30 bg-eco-green/5" 
                      : "border-gray-200 bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        channel.active ? "bg-eco-green/20" : "bg-gray-200 dark:bg-gray-700"
                      }`}>
                        <channel.icon className={`w-5 h-5 ${
                          channel.active ? "text-eco-green" : "text-gray-500"
                        }`} />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {channel.name}
                      </h3>
                    </div>
                    <Badge variant={channel.active ? "default" : "secondary"}>
                      {channel.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {channel.description}
                  </p>
                  
                  <div className="text-xs text-muted-foreground">
                    Coverage: {channel.coverage}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SMS Demo */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                SMS Alert Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-eco-green">MOH Malaysia</span>
                  <span className="text-gray-400">Now</span>
                </div>
                <p className="leading-relaxed">
                  🚨 DENGUE ALERT: High risk detected in your area (Selangor). 
                  Remove stagnant water from containers, flower pots & drains. 
                  Report breeding sites: bit.ly/dengue-report 
                  Emergency: 999
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Alerts Sent Today</span>
                  <span className="font-bold text-foreground">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">SMS Delivery Rate</span>
                  <span className="font-bold text-eco-green">99.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Response Rate</span>
                  <span className="font-bold text-healthcare-blue">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Languages Active</span>
                  <span className="font-bold text-foreground">4</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;