import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, ArrowRight } from "lucide-react";

export function ModelShowcase() {
  return (
    <div className="py-20 container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-block bg-primary text-white font-bold py-1 px-3 neo-brutalism-shadow mb-4">
          <Zap className="w-4 h-4 inline-block mr-1" /> Model Hub
        </div>
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          One Platform, <span className="text-primary">100+ AI Models</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Connect your API keys once and test different models side by side. Compare performance, costs and capabilities.
        </p>
      </div>

      <Tabs defaultValue="openai" className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <TabsList className="neo-brutalism-shadow border-2 border-black">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
            <TabsTrigger value="openrouter">OpenRouter</TabsTrigger>
          </TabsList>
        </div>

        <div className="neo-brutalism-card">
          <TabsContent value="openai" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">OpenAI Models</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your OpenAI API key to access GPT-3.5, GPT-4 and other models.
                </p>
                <ul className="space-y-3 mb-6">
                  {["GPT-4 Turbo", "GPT-3.5 Turbo", "DALL-E 3", "Whisper"].map((model) => (
                    <li key={model} className="flex items-center gap-2">
                      <div className="bg-primary w-2 h-2 rounded-full"></div>
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
                <Button className="neo-brutalism-button">
                  Connect OpenAI <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="bg-black text-white p-4 rounded-sm border-2 border-black h-full">
                  <div className="flex gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-destructive"></span>
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                  </div>
                  <pre className="text-sm text-green-400">
{`// OpenAI API Integration
import { z-aihub } from 'z-aihub';

const ai = new z-aihub.OpenAI(apiKey);
const response = await ai.createCompletion({
  model: "gpt-4-turbo",
  prompt: "Explain quantum computing",
  temperature: 0.7
});

console.log(response.text);`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anthropic" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Anthropic Claude Models</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your Anthropic API key to access Claude models.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku", "Claude 2.1"].map((model) => (
                    <li key={model} className="flex items-center gap-2">
                      <div className="bg-primary w-2 h-2 rounded-full"></div>
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
                <Button className="neo-brutalism-button">
                  Connect Anthropic <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="bg-black text-white p-4 rounded-sm border-2 border-black h-full">
                  <div className="flex gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-destructive"></span>
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                  </div>
                  <pre className="text-sm text-green-400">
{`// Anthropic API Integration
import { z-aihub } from 'z-aihub';

const ai = new z-aihub.Anthropic(apiKey);
const response = await ai.createMessage({
  model: "claude-3-opus-20240229",
  system: "You are a helpful assistant",
  messages: [
    { role: "user", content: "Explain AI agents" }
  ]
});

console.log(response.content);`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="google" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Google Models</h3>
                <p className="text-muted-foreground mb-4">
                  Connect your Google AI API key to access Gemini models.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Gemini Pro", "Gemini Flash", "PaLM 2", "Embeddings"].map((model) => (
                    <li key={model} className="flex items-center gap-2">
                      <div className="bg-primary w-2 h-2 rounded-full"></div>
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
                <Button className="neo-brutalism-button">
                  Connect Google <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="bg-black text-white p-4 rounded-sm border-2 border-black h-full">
                  <div className="flex gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-destructive"></span>
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                  </div>
                  <pre className="text-sm text-green-400">
{`// Google AI Integration
import { z-aihub } from 'z-aihub';

const ai = new z-aihub.Google(apiKey);
const response = await ai.generateContent({
  model: "gemini-pro",
  contents: [
    { role: "user", parts: [{ text: "Explain neural networks" }] }
  ]
});

console.log(response.text);`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="openrouter" className="mt-0">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">OpenRouter Models</h3>
                <p className="text-muted-foreground mb-4">
                  Access 100+ models from different providers with a single API key.
                </p>
                <ul className="space-y-3 mb-6">
                  {["Anthropic Models", "OpenAI Models", "Meta Models", "Open Source Models"].map((category) => (
                    <li key={category} className="flex items-center gap-2">
                      <div className="bg-primary w-2 h-2 rounded-full"></div>
                      <span>{category}</span>
                    </li>
                  ))}
                </ul>
                <Button className="neo-brutalism-button">
                  Connect OpenRouter <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="bg-black text-white p-4 rounded-sm border-2 border-black h-full">
                  <div className="flex gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-destructive"></span>
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                  </div>
                  <pre className="text-sm text-green-400">
{`// OpenRouter Integration
import { z-aihub } from 'z-aihub';

const ai = new z-aihub.OpenRouter(apiKey);
const response = await ai.chat.completions.create({
  model: "anthropic/claude-3-opus",
  messages: [
    { role: "user", content: "Explain large language models" }
  ]
});

console.log(response.choices[0].message.content);`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}