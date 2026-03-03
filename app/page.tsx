import About from "@/components/About";
import Contact from "@/components/Contact";
import Equipment from "@/components/Equipment";
import FeaturedProduct from "@/components/FeaturedProduct";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Services from "@/components/Services";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <Equipment />
        <Gallery />
        <FeaturedProduct />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
