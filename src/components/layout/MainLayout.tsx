import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Code, 
  Layers, 
  Lightbulb, 
  Menu, 
  User, 
  X, 
  Zap,
  BookOpen,
  Github,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  
  const navigationItems = [
    { name: 'Models', icon: <Zap className="w-5 h-5" />, href: '/models' },
    { name: 'Docs', icon: <BookOpen className="w-5 h-5" />, href: '/docs' },
    { name: 'Agents', icon: <Bot className="w-5 h-5" />, href: '/agents' },
    { name: 'Code', icon: <Code className="w-5 h-5" />, href: '/code' },
    { name: 'Community', icon: <Github className="w-5 h-5" />, href: '/community' },
  ];

  const Logo = () => (
    <Link to="/" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground font-black p-2">
        <span className="text-xl">Z</span>
      </div>
      <div className="flex flex-col">
        <span className="font-black text-lg leading-none">AI HUB</span>
        <span className="text-xs text-muted-foreground">Unified AI Platform</span>
      </div>
    </Link>
  );

  const NavLinks = ({ className = '', mobile = false }: { className?: string; mobile?: boolean }) => (
    <nav className={cn("flex gap-1", mobile ? "flex-col" : "", className)}>
      {navigationItems.map(item => (
        <Link 
          key={item.name} 
          to={item.href} 
          className={cn(
            "group flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-accent transition-colors",
            mobile ? "text-lg w-full" : ""
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-background border-r-4 border-black">
        <div className="py-4 space-y-6">
          <Logo />
          <NavLinks mobile className="mt-6" />
          <div className="mt-auto pt-6 border-t border-border">
            <Button variant="outline" className="w-full justify-start gap-2">
              <User className="w-5 h-5" />
              Sign In
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-black px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Logo />
            {!isMobile && <NavLinks />}
          </div>
          
          <div className="flex items-center gap-2">
            {!isMobile ? (
              <Button variant="default" className="neo-brutalism-button">
                Sign In
              </Button>
            ) : (
              <MobileMenu />
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t-2 border-black bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Logo />
              <p className="mt-4 text-gray-400">
                The unified platform for AI tools, models, and frameworks
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Platform</h3>
              <ul className="space-y-2">
                {navigationItems.map(item => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-gray-400 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Connect</h3>
              <p className="text-gray-400">
                Get in touch to learn more about Z-AIHub and how it can help your AI development workflow.
              </p>
              <Button variant="outline" className="neo-brutalism-button bg-accent text-black border-accent hover:border-accent">
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between">
            <p className="text-gray-500">© 2025 Z-AIHub. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}