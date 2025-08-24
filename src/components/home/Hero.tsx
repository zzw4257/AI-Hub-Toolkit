import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

export function Hero() {
  const isMobile = useIsMobile();

  return (
    <div className="relative overflow-hidden bg-background pt-12 md:pt-20">
      {/* Background abstract shapes */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-sm rotate-12 neo-brutalism-shadow opacity-70" />
      <div className="absolute top-40 -left-10 w-20 h-20 bg-primary rounded-sm -rotate-12 neo-brutalism-shadow opacity-70" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-block bg-accent text-black font-bold py-1 px-3 neo-brutalism-shadow mb-4">
                <span>New: OpenRouter Integration</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                One Platform <br />
                <span className="text-primary">All AI Tools</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl max-w-md text-muted-foreground">
                Build, test, and deploy AI applications with Z-AIHub's unified platform for developers and creators.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="neo-brutalism-button">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-background neo-brutalism-shadow">
                Explore Features
              </Button>
            </div>
            
            <div className="pt-4 border-t border-muted">
              <p className="text-muted-foreground font-medium">
                Trusted by developers at companies like:
              </p>
              <div className="mt-4 flex gap-8">
                <div className="font-bold text-lg">Acme Inc.</div>
                <div className="font-bold text-lg">TechCorp</div>
                <div className="font-bold text-lg">DevLabs</div>
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="flex-1">
            <div className="relative neo-brutalism-card bg-white border-4 border-black overflow-hidden p-0">
              <div className="absolute top-0 left-0 right-0 bg-black text-white p-2 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive"></span>
                  <span className="w-3 h-3 rounded-full bg-accent"></span>
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                </div>
                <div className="text-xs">model-test.js</div>
              </div>
              
              <div className="pt-10 p-4">
                <pre className="text-xs md:text-sm overflow-x-auto bg-black text-green-500 p-4 rounded-none">
{`// Z-AIHub Model Comparison
import { compareModels } from 'z-aihub';

const results = await compareModels({
  prompt: "Explain quantum computing",
  models: [
    "openai/gpt-4",
    "anthropic/claude-3",
    "google/gemini-pro"
  ]
});

console.log(results.fastest); // anthropic/claude-3
console.log(results.mostDetailed); // openai/gpt-4`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { number: "100+", label: "AI Models" },
            { number: "50k+", label: "Developers" },
            { number: "3x", label: "Faster Development" },
            { number: "24/7", label: "AI Support" },
          ].map((stat, index) => (
            <div key={index} className="neo-brutalism-card">
              <div className="text-3xl md:text-4xl font-black">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}