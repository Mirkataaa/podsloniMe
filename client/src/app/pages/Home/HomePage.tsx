import CtaComponent from './components/CallToActionSection';
import FeaturedProperty from './components/WhyChooseUsSection';
import HeroSection from './components/HeroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperty />
      <CtaComponent />
    </>
  );
}
