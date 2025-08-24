import MainLayout from '@/components/layout/MainLayout'
import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { ModelShowcase } from '@/components/home/ModelShowcase'
import { WorkspaceShowcase } from '@/components/home/WorkspaceShowcase'
import { CTASection } from '@/components/home/CTASection'

function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <ModelShowcase />
      <WorkspaceShowcase />
      <CTASection />
    </MainLayout>
  )
}

export default HomePage