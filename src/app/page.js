import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";


export default function Home() {
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div>
      <Features/>
    </div>
    <div>
      <Showcase/>
    </div>
    <div>
      <WhyChoose/>
    </div>
    <div>
      <HowItWorks/>
    </div>
    <div>
      <Pricing/>
    </div>
    <div>
      <Testimonials/>
    </div>
    <div>
      <FAQ/>
    </div>
    
    
    </>
  )
}
