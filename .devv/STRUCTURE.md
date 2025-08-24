# This file is only for editing file nodes, do not break the structure
## Project Description
Z-AIHub is a unified platform for AI developers and enthusiasts to manage, test, and implement multiple AI tools and models in one place. It eliminates the complexity of switching between different platforms by integrating various AI capabilities including model testing, documentation generation, and intelligent agent workflow design. The platform features a striking Neo-Brutalism design aesthetic with bold geometry, high contrast elements, and a distinctive color scheme.

## Key Features
- Integrated Model Center - Connect and compare multiple AI models (OpenAI, Google Gemini, Anthropic Claude, etc.)
- Documentation Generator - Auto-generate documentation for code repositories
- Smart Agent Workspace - Visual workflow builder for LangChain, CrewAI and AutoGen
- Community & Knowledge Hub - Share projects, tutorials and best practices

## Devv SDK Integration
Built-in: auth (OTP), table (user_profiles, api_keys, projects, workflows), DevvAI, email, upload
External: OpenRouterAI (requires API key)

/src
├── assets/          # Static resources directory, storing static files like images and fonts
│
├── components/      # Components directory
│   ├── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook from shadcn (import { useIsMobile } from '@/hooks/use-mobile')
│   └── use-toast.ts  # Toast notification system hook for displaying toast messages (import { useToast } from '@/hooks/use-toast')
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── pages/          # Page components directory, based on React Router structure
│   ├── HomePage.tsx # Home page component, serving as the main entry point of the application
│   └── NotFoundPage.tsx # 404 error page component, displays when users access non-existent routes
│
├── App.tsx         # Root component, with React Router routing system configured
│                   # Add new route configurations in this file
│                   # Includes catch-all route (*) for 404 page handling
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file, containing Tailwind configuration and custom styles
│                   # Modify theme colors and design system variables in this file
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file
# Contains theme customization, plugins, and content paths
# Includes shadcn/ui theme configuration