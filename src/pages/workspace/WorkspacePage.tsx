import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Play, Square, Settings, Plus, Workflow, Zap, Users } from 'lucide-react'

export default function WorkspacePage() {
  const workflows = [
    { name: 'Customer Support Bot', framework: 'LangChain', status: 'Running', nodes: 8, lastRun: '5 min ago' },
    { name: 'Content Generator', framework: 'CrewAI', status: 'Stopped', nodes: 12, lastRun: '2 hours ago' },
    { name: 'Data Analysis Pipeline', framework: 'AutoGen', status: 'Running', nodes: 6, lastRun: '1 min ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Smart Agent Workspace</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Workflow
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Workflow className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                    <h3 className="font-medium">LangChain</h3>
                    <p className="text-xs text-muted-foreground">Chain-based workflows</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                    <h3 className="font-medium">CrewAI</h3>
                    <p className="text-xs text-muted-foreground">Multi-agent systems</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                    <h3 className="font-medium">AutoGen</h3>
                    <p className="text-xs text-muted-foreground">Automated agents</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="designer">Visual Designer</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <div className="grid gap-4">
            {workflows.map((workflow, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{workflow.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {workflow.framework} • {workflow.nodes} nodes • Last run {workflow.lastRun}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={workflow.status === 'Running' ? 'default' : 'secondary'}>
                      {workflow.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {workflow.status === 'Running' ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="designer" className="space-y-4">
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Visual Workflow Designer</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Workflow className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Drag and drop components to build your workflow</p>
                <Button className="mt-4">Open Designer</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Chatbot Template', framework: 'LangChain', description: 'Basic conversational AI' },
              { name: 'Content Pipeline', framework: 'CrewAI', description: 'Multi-step content creation' },
              { name: 'Data Processor', framework: 'AutoGen', description: 'Automated data analysis' },
            ].map((template, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">{template.framework}</Badge>
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

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monitor workflow performance, logs, and metrics in real-time.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}