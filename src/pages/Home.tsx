import { ArrowRight, Brain, Users, Bell, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-dengue-ai.png";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Prediction",
      description: "Advanced machine learning algorithms predict dengue outbreaks 2-3 weeks in advance using weather patterns and historical data."
    },
    {
      icon: Users,
      title: "Citizen Reporting",
      description: "Community-powered surveillance system where citizens can report potential breeding sites using their mobile devices."
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Multilingual early warning system delivering targeted alerts to communities, healthcare workers, and authorities."
    }
  ];

  const stats = [
    { number: "85%", label: "Prediction Accuracy" },
    { number: "50K+", label: "Community Reports" },
    { number: "14", label: "States Covered" },
    { number: "72hr", label: "Alert Response Time" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden bg-gradient-to-br from-healthcare-blue via-primary to-eco-green"
        style={{
          backgroundImage: `linear-gradient(rgba(52, 152, 219, 0.8), rgba(39, 174, 96, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
              Malaysia's AI Dengue
              <br />
              <span className="text-yellow-300">Early Warning System</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-poppins font-medium text-white/90 mb-4">
              Predict. Prevent. Protect.
            </p>
            
            <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
              Combining artificial intelligence, community engagement, and real-time data to predict and prevent dengue outbreaks across Malaysia before they happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              <Link to="/predict">
                <Button size="lg" className="bg-white text-healthcare-blue hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-lg">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Get AI Prediction
                </Button>
              </Link>
              
              <Link to="/report">
                <Button size="lg" className="bg-alert-red text-white hover:bg-alert-red-dark font-semibold px-8 py-3 text-lg shadow-lg transition-colors">
                  <Shield className="mr-2 h-5 w-5" />
                  Report Breeding Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-4">
              Powered by AI, Driven by Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive system combines cutting-edge artificial intelligence with community participation to create Malaysia's most effective dengue prevention network.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-smooth border-border hover:border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-smooth">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Making a Real Impact
            </h2>
            <p className="text-lg text-muted-foreground">
              Our system is already protecting communities across Malaysia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-poppins font-bold text-primary mb-2 group-hover:scale-110 transition-smooth">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-inter font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-eco-green to-healthcare-blue">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <Zap className="w-16 h-16 text-white mx-auto mb-6 animate-pulse-slow" />
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-6">
              Join the Fight Against Dengue
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Every report matters. Every prediction saves lives. Be part of Malaysia's most advanced dengue prevention network.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/report">
                <Button size="lg" className="bg-white text-healthcare-blue hover:bg-white/90 font-semibold px-8 py-3">
                  Start Reporting Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button size="lg" className="bg-healthcare-blue text-white hover:bg-healthcare-blue-dark font-semibold px-8 py-3 shadow-lg transition-colors">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;