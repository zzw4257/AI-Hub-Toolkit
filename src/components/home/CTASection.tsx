import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="neo-brutalism-card bg-white max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Ready to Streamline Your AI Workflow?
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                Join thousands of developers already using Z-AIHub to build better AI applications faster.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="neo-brutalism-button">
                  Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-background neo-brutalism-shadow"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center font-bold">1</div>
                <p><strong>Sign up</strong> for a free account</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center font-bold">2</div>
                <p><strong>Connect</strong> your AI model API keys</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center font-bold">3</div>
                <p><strong>Build</strong> projects in our visual workspace</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center font-bold">4</div>
                <p><strong>Deploy</strong> or export your creations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}