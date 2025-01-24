import Contact from "@/components/landing/Contact";
import Features from "@/components/landing/Features";
import FooterSec from "@/components/landing/FooterSec";
import Hero from "@/components/landing/Hero";
import Navigation from "@/components/landing/Navigation";
import Testimonials from "@/components/landing/Testimonials";


const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-light/30 to-white">
      <Navigation/>
      <div className="pt-16"></div>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Contact/>
      <FooterSec/>
    </div>
  );
};

export default Index;