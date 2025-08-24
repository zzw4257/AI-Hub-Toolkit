import { useState, useEffect } from 'react'
import { getModels, addModel as addModelApi, deleteModel as deleteModelApi, testModel } from '@/api/models'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Plus, Settings, TestTube, BarChart3, Trash2 } from 'lucide-react'
import { useModelsStore } from '@/store/models'
import { useToast } from '@/hooks/use-toast'

export default function ModelsPage() {
  const [provider, setProvider] = useState('')
  const [name, setName] = useState('')
  const [apiKey, setApiKey] = useState('')
  const { models, setModels, addModel, removeModel } = useModelsStore()
  const { toast } = useToast()

  // State for model testing
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const [testResult, setTestResult] = useState<string>('')
  const [isLoadingTest, setIsLoadingTest] = useState(false)


  useEffect(() => {
    const fetchModels = async () => {
      try {
        const serverModels = await getModels();
        setModels(serverModels);
      } catch (error) {
        toast({ title: 'Failed to fetch models', variant: 'destructive' });
      }
    };
    fetchModels();
  }, [setModels, toast]);

  const handleAddModel = async () => {
    if (!provider || !apiKey || !name) {
      toast({ title: 'Please fill all fields', variant: 'destructive' });
      return;
    }
    try {
      const result = await addModelApi({ name, provider, apiKey });
      if (result.success) {
        addModel(result.model);
        toast({ title: 'Model connected successfully!' });
        setProvider('');
        setApiKey('');
        setName('');
      } else {
        toast({ title: result.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Failed to add model', variant: 'destructive' });
    }
  }

  const handleDeleteModel = async (id: string) => {
    try {
      const result = await deleteModelApi(id);
      if (result.success) {
        removeModel(id);
        toast({ title: 'Model deleted successfully!' });
      } else {
        toast({ title: result.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Failed to delete model', variant: 'destructive' });
    }
  }

  const handleRunTest = async () => {
    setIsLoadingTest(true);
    setTestResult('');
    try {
      const result = await testModel(selectedModel, prompt);
      if (result.success) {
        setTestResult(result.response);
      } else {
        toast({ title: result.message, variant: 'destructive' });
      }
    } catch (error) {
      toast({ title: 'Failed to run test', variant: 'destructive' });
    } finally {
      setIsLoadingTest(false);
    }
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
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., GPT-4, Claude-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the model connection.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteModel(model.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Select Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a model to test" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.filter(m => m.status === 'connected').map(m => (
                          <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="prompt">Test Prompt</Label>
                  <Input
                    id="prompt"
                    placeholder="Enter your test prompt..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                <Button onClick={handleRunTest} disabled={isLoadingTest || !selectedModel || !prompt}>
                  {isLoadingTest ? 'Testing...' : 'Run Test'}
                </Button>
                {testResult && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-2">Test Result:</h4>
                    <p className="text-sm whitespace-pre-wrap">{testResult}</p>
                  </div>
                )}
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