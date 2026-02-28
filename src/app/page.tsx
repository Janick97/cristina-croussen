import Hero from "@/components/Hero";
import PartnerLogos from "@/components/PartnerLogos";
import About from "@/components/About";
import Counter from "@/components/Counter";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import SchadenForm from "@/components/SchadenForm";
import Testimonials from "@/components/Testimonials";
import Terminbuchung from "@/components/Terminbuchung";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import FeedbackForm from "@/components/FeedbackForm";
import LifeJourney from "@/components/LifeJourney";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerLogos />
      <About />
      <LifeJourney />
      <Counter />
      <Services />
      <ProcessTimeline />
      <SchadenForm />
      <Testimonials />
      <Terminbuchung />
      <FAQ />
      <ContactForm />
      <FeedbackForm />
    </>
  );
}
