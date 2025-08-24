import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, MessageCircle, Share, BookOpen, Users, Trophy } from 'lucide-react'

export default function CommunityPage() {
  const posts = [
    { title: 'Building a Multi-Agent RAG System', author: 'Alex Chen', likes: 42, comments: 8, tags: ['LangChain', 'RAG'] },
    { title: 'GPT-4 vs Claude-3: Performance Comparison', author: 'Sarah Kim', likes: 38, comments: 12, tags: ['Comparison', 'Models'] },
    { title: 'Automating Documentation with AI', author: 'Mike Johnson', likes: 29, comments: 5, tags: ['Documentation', 'Automation'] },
  ]

  const tutorials = [
    { title: 'Getting Started with CrewAI', difficulty: 'Beginner', duration: '15 min', rating: 4.8 },
    { title: 'Advanced LangChain Patterns', difficulty: 'Advanced', duration: '45 min', rating: 4.9 },
    { title: 'Model Fine-tuning Guide', difficulty: 'Intermediate', duration: '30 min', rating: 4.7 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <Button>Share Project</Button>
      </div>

      <Tabs defaultValue="discussions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-4">
          {posts.map((post, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">by {post.author}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.tags.map((tag, j) => (
                      <Badge key={j} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-4">
          <div className="grid gap-4">
            {tutorials.map((tutorial, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {tutorial.difficulty} • {tutorial.duration} • ⭐ {tutorial.rating}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Start Learning</Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Discover and contribute to open-source AI projects.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Recognition for active community members.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}