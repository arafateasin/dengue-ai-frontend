import { Target, Zap, Users, Globe, Award, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const problems = [
    {
      title: "Rising Dengue Cases",
      description: "Malaysia reports over 80,000 dengue cases annually with increasing severity",
      stat: "80K+ cases/year"
    },
    {
      title: "Late Detection", 
      description: "Current reactive approach leads to outbreak spread before intervention",
      stat: "2-3 week delay"
    },
    {
      title: "Limited Resources",
      description: "Healthcare system overwhelmed during peak outbreak seasons",
      stat: "150% capacity"
    },
    {
      title: "Community Gaps",
      description: "Inconsistent public awareness and community participation in prevention",
      stat: "40% participation"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Predictive AI Models",
      description: "Machine learning algorithms analyze weather patterns, historical data, and real-time inputs to predict outbreaks 2-3 weeks in advance with 85% accuracy."
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Citizen reporting system empowers communities to identify and report breeding sites, creating a comprehensive surveillance network."
    },
    {
      icon: Globe,
      title: "Multilingual Alerts",
      description: "Early warning system delivers targeted alerts in Malay, English, Tamil, and Chinese through multiple channels including SMS, apps, and broadcasts."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Insights",
      description: "Real-time dashboard provides authorities with actionable insights for resource allocation and targeted interventions."
    }
  ];

  const benefits = {
    government: [
      "Reduce healthcare costs by 40% through early intervention",
      "Optimize resource allocation with predictive insights", 
      "Improve public health response coordination",
      "Evidence-based policy making with real-time data"
    ],
    community: [
      "Receive early warnings to protect families",
      "Easy reporting tools for community action",
      "Multilingual access ensuring inclusivity",
      "Reduced disease burden and hospital visits"
    ]
  };

  const partners = [
    { name: "Ministry of Health Malaysia", role: "Healthcare Policy & Implementation" },
    { name: "Malaysian Meteorological Department", role: "Weather Data Integration" },
    { name: "Universiti Malaya", role: "Research & AI Development" },
    { name: "WHO Malaysia", role: "International Health Standards" },
    { name: "MySejahtera", role: "Digital Health Platform" },
    { name: "Local NGOs", role: "Community Outreach" }
  ];

  const futureScope = [
    {
      title: "Multi-Disease Prediction",
      description: "Expand AI models to predict Zika, Malaria, and other vector-borne diseases"
    },
    {
      title: "Smart City Integration", 
      description: "Integrate with IoT sensors and urban planning for comprehensive health monitoring"
    },
    {
      title: "Regional Expansion",
      description: "Scale the system across Southeast Asia with country-specific adaptations"
    },
    {
      title: "Advanced Analytics",
      description: "Incorporate social media sentiment, mobility data, and satellite imagery"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-healthcare-blue to-eco-green text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-6">
            Revolutionizing Dengue Prevention in Malaysia
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Combining artificial intelligence, community participation, and real-time data to create Malaysia's most advanced dengue outbreak prediction and prevention system.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Problem Statement */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dengue fever poses a significant public health challenge in Malaysia, requiring innovative solutions for effective prevention and control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
              <Card key={index} className="text-center border-alert-red/20">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-alert-red mb-2">
                    {problem.stat}
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Solution Overview */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Our AI-Powered Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A comprehensive system that predicts, prevents, and protects communities from dengue outbreaks through advanced technology and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-foreground">
                      {solution.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-card rounded-xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Benefits for Malaysia
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-healthcare-blue" />
                <h3 className="text-xl font-poppins font-semibold text-foreground">
                  Government & Authorities
                </h3>
              </div>
              <div className="space-y-3">
                {benefits.government.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-healthcare-blue rounded-full mt-2 shrink-0"></div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-eco-green" />
                <h3 className="text-xl font-poppins font-semibold text-foreground">
                  Communities & Citizens
                </h3>
              </div>
              <div className="space-y-3">
                {benefits.community.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-eco-green rounded-full mt-2 shrink-0"></div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Strategic Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              Collaborating with leading institutions to ensure comprehensive and effective implementation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <Card key={index} className="hover:shadow-md transition-smooth">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">
                    {partner.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {partner.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Scope */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Future Expansion
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our vision extends beyond dengue to create a comprehensive public health surveillance and prediction platform for Malaysia and the region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {futureScope.map((scope, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">
                      {scope.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {scope.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-eco-green to-healthcare-blue rounded-xl p-12 text-white">
          <h2 className="text-3xl font-poppins font-bold mb-4">
            Join the Fight Against Dengue
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Together, we can create a dengue-free Malaysia through the power of AI, community action, and innovative technology.
          </p>
          <div className="space-y-2">
            <p className="text-lg font-medium">Ready to make a difference?</p>
            <p className="opacity-90">Contact us: info@dengue-ai.my | +60 3-XXXX XXXX</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;