import { 
  Zap, 
  FileText, 
  Code, 
  Bot, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="neo-brutalism-card h-full flex flex-col">
      <div className="p-3 bg-primary text-white w-fit rounded-sm mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground flex-1">{description}</p>
      <Button variant="link" className="mt-4 p-0 flex items-center gap-1 font-bold text-primary">
        Learn more <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export function Features() {
  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Model Integration Center",
      description: "Connect and compare multiple AI models with a unified API. Test performance, costs, and capabilities."
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Documentation Generator",
      description: "Auto-generate comprehensive documentation for your code repositories with one click."
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "Agent Workflows",
      description: "Build and deploy multi-agent systems with our visual workflow designer for LangChain, CrewAI and AutoGen."
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Code Showcase",
      description: "Share, test and export code snippets for different AI frameworks and models."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Community Hub",
      description: "Connect with AI developers, share projects and learn from experts in our growing community."
    }
  ];

  return (
    <div className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">All-in-One AI Development Platform</h2>
          <p className="text-lg text-muted-foreground">
            Z-AIHub combines essential AI tools in one platform, streamlining your development workflow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}