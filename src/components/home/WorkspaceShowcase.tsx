import { ArrowRight, Bot, LayoutGrid, Layers, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WorkspaceShowcase() {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-block bg-accent text-black font-bold py-1 px-3 neo-brutalism-shadow mb-4">
            <Bot className="w-4 h-4 inline-block mr-1" /> Agents Workspace
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Visual Workflow <span className="text-primary">Builder</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Design multi-agent systems with our visual workflow builder. Drag and drop components to create complex AI workflows.
          </p>
        </div>

        <div className="neo-brutalism-card bg-white p-0 overflow-hidden max-w-5xl mx-auto">
          {/* Workspace mockup header */}
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-destructive"></span>
              <span className="w-3 h-3 rounded-full bg-accent"></span>
              <span className="w-3 h-3 rounded-full bg-primary"></span>
            </div>
            <div className="text-xs">Market Research Workflow</div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <Settings className="w-3 h-3 mr-1" /> Settings
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                <Layers className="w-3 h-3 mr-1" /> Preview
              </Button>
            </div>
          </div>

          {/* Workspace mockup content */}
          <div className="p-4 bg-secondary flex gap-4">
            {/* Sidebar */}
            <div className="bg-card w-48 p-3 neo-brutalism-shadow border-2 border-black flex-shrink-0">
              <div className="font-bold mb-3">Components</div>
              <div className="space-y-2">
                {[
                  { name: "Text Input", icon: <LayoutGrid className="w-4 h-4" /> },
                  { name: "Analysis", icon: <Layers className="w-4 h-4" /> },
                  { name: "LLM Call", icon: <Bot className="w-4 h-4" /> },
                  { name: "Filter", icon: <Settings className="w-4 h-4" /> },
                  { name: "Output", icon: <ArrowRight className="w-4 h-4" /> },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-2 bg-background text-sm border border-border flex items-center gap-2 cursor-pointer hover:bg-muted transition-colors"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-white flex-1 border-2 border-black p-4 relative">
              {/* Input Node */}
              <div 
                className="absolute top-20 left-10 w-44 p-3 bg-card neo-brutalism-shadow border-2 border-black"
              >
                <div className="font-bold text-xs mb-1">Input</div>
                <div className="text-sm">Market Research Query</div>
                <div className="mt-2 p-1 bg-muted text-xs rounded">
                  Research AI market trends for 2025
                </div>
              </div>

              {/* Arrow from Input to Analysis */}
              <svg width="80" height="100" className="absolute top-36 left-56" viewBox="0 0 80 100" fill="none">
                <path d="M0 50H60L40 30M60 50L40 70" stroke="black" strokeWidth="2" />
              </svg>

              {/* Analysis Node */}
              <div 
                className="absolute top-20 left-64 w-44 p-3 bg-card neo-brutalism-shadow border-2 border-black"
              >
                <div className="font-bold text-xs mb-1">Topic Analysis</div>
                <div className="text-sm">Extract key topics</div>
                <div className="mt-2 p-1 bg-primary text-xs text-white rounded">
                  Claude 3 Agent
                </div>
              </div>

              {/* Arrow from Analysis to LLM */}
              <svg width="50" height="100" className="absolute top-70 left-85" viewBox="0 0 50 100" fill="none">
                <path d="M44 0V70H24M44 70L24 50M44 70L24 90" stroke="black" strokeWidth="2" />
              </svg>

              {/* LLM Node */}
              <div 
                className="absolute top-80 left-44 w-44 p-3 bg-card neo-brutalism-shadow border-2 border-black"
              >
                <div className="font-bold text-xs mb-1">Market Research</div>
                <div className="text-sm">Detailed analysis</div>
                <div className="mt-2 p-1 bg-accent text-xs rounded">
                  GPT-4 Agent
                </div>
              </div>

              {/* Arrow to Output */}
              <svg width="80" height="50" className="absolute top-95 left-90" viewBox="0 0 80 50" fill="none">
                <path d="M0 25H60L40 5M60 25L40 45" stroke="black" strokeWidth="2" />
              </svg>

              {/* Output Node */}
              <div 
                className="absolute top-80 left-150 w-44 p-3 bg-card neo-brutalism-shadow border-2 border-black"
              >
                <div className="font-bold text-xs mb-1">Output</div>
                <div className="text-sm">Final Report</div>
                <div className="mt-2 p-1 bg-muted text-xs rounded">
                  PDF + JSON
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="neo-brutalism-button">
            Try Workspace Builder <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}