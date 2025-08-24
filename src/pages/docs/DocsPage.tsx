import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FileText, Github, Download, Eye, Plus } from 'lucide-react'

export default function DocsPage() {
  const [repoUrl, setRepoUrl] = useState('')

  const documents = [
    { name: 'React Components API', repo: 'my-react-app', status: 'Generated', size: '2.3 MB', created: '2 days ago' },
    { name: 'Backend API Documentation', repo: 'api-server', status: 'Processing', size: '1.8 MB', created: '1 hour ago' },
    { name: 'Database Schema Guide', repo: 'db-migrations', status: 'Generated', size: '856 KB', created: '1 week ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Documentation Generator</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Generate Docs
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Documentation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="repo">Repository URL</Label>
                <Input 
                  id="repo" 
                  placeholder="https://github.com/username/repo" 
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description">Project Description (Optional)</Label>
                <Textarea id="description" placeholder="Brief description of your project..." />
              </div>
              <div>
                <Label>Documentation Type</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">API Reference</Button>
                  <Button variant="outline" size="sm">User Guide</Button>
                  <Button variant="outline" size="sm">Developer Docs</Button>
                </div>
              </div>
              <Button className="w-full">
                <Github className="w-4 h-4 mr-2" />
                Generate Documentation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {documents.map((doc, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{doc.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {doc.repo} • {doc.size} • Created {doc.created}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={doc.status === 'Generated' ? 'default' : 'secondary'}>
                      {doc.status}
                    </Badge>
                    {doc.status === 'Generated' && (
                      <>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'API Reference', description: 'Complete API documentation with examples' },
              { name: 'User Manual', description: 'End-user documentation and guides' },
              { name: 'Developer Guide', description: 'Technical documentation for developers' },
              { name: 'README Generator', description: 'Auto-generate comprehensive README files' },
            ].map((template, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="style">Documentation Style</Label>
                <Input id="style" placeholder="e.g., GitBook, Sphinx, Custom" />
              </div>
              <div>
                <Label htmlFor="language">Default Language</Label>
                <Input id="language" placeholder="English" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}