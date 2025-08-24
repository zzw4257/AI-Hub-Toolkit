import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Settings, TestTube, BarChart3 } from 'lucide-react'
import { useModelsStore } from '@/store/models'
import { useToast } from '@/hooks/use-toast'

export default function ModelsPage() {
  const [provider, setProvider] = useState('')
  const [apiKey, setApiKey] = useState('')
  const { models, addModel, updateModel } = useModelsStore()
  const { toast } = useToast()

  const handleAddModel = () => {
    if (!provider || !apiKey) return
    addModel({
      name: provider,
      provider,
      apiKey,
      status: 'connected'
    })
    toast({ title: 'Model connected successfully!' })
    setProvider('')
    setApiKey('')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Model Center</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Model
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Model</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="provider">Provider</Label>
                <Input 
                  id="provider" 
                  placeholder="e.g., OpenAI, Anthropic" 
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="apikey">API Key</Label>
                <Input 
                  id="apikey" 
                  type="password" 
                  placeholder="Enter API key" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleAddModel}>
                Connect Model
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{model.provider}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={model.status === 'connected' ? 'default' : 'secondary'}>
                      {model.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{model.usage.toLocaleString()} requests</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                Model Testing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Test Prompt</Label>
                  <Input id="prompt" placeholder="Enter your test prompt..." />
                </div>
                <Button>Run Test</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Model Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Compare model performance, speed, and cost metrics.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor your API usage and costs across all connected models.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}