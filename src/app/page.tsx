import { type NextPage } from 'next'
import { ContactSection } from '@/components/dream-nails/landing-page/ContactSection'
import { CoursesSection } from '@/components/dream-nails/landing-page/CoursesSection'
import { FacilitiesSection } from '@/components/dream-nails/landing-page/FacilitiesSection'
import { HeroSection } from '@/components/dream-nails/landing-page/HeroSection'
import { ServicesSection } from '@/components/dream-nails/landing-page/ServicesSection'
import { TestimonialsSection } from '@/components/dream-nails/landing-page/TestimonialsSection'
import { Footer } from '@/components/dream-nails/landing-page/ui-custom/Footer'
import { Header } from '@/components/dream-nails/landing-page/ui-custom/Header'
import { WelcomeSection } from '@/components/dream-nails/landing-page/WelcomeSection'
import { WorkshopsSection } from '@/components/dream-nails/landing-page/WorkshopsSection'

const HomePage: NextPage = async () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <WelcomeSection />
        <ServicesSection />
        <CoursesSection />
        <WorkshopsSection />
        <FacilitiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
