import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="font-poppins font-semibold text-foreground">Dengue AI System</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered dengue outbreak prediction and prevention for Malaysia
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-inter font-medium text-foreground">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Risk Map</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Report Site</p>
                <p className="text-muted-foreground hover:text-foreground cursor-pointer">Dashboard</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-inter font-medium text-foreground">Partners</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Ministry of Health Malaysia</p>
                <p className="text-muted-foreground">Malaysian Universities</p>
                <p className="text-muted-foreground">WHO Malaysia</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-inter font-medium text-foreground">Contact</h4>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">info@dengue-ai.my</p>
                <p className="text-muted-foreground">+60 3-XXXX XXXX</p>
                <p className="text-muted-foreground">Emergency: 999</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Malaysia Dengue AI System. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Privacy</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Terms</span>
              <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;