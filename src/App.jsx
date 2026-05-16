import { use, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "./components/Header"
import HeroSection from "./components/HeroSection"
import CustomCursor from "./components/CustomCursor"
import AboutSection from "./components/AboutSection"
import ProjectSection from "./components/ProjectSection"
import ContactSection from "./components/ContactSection"

function App() {
  useEffect(()=>{
    //Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    //Refresh scroll triggers when the page is fully loaded
    ScrollTrigger.refresh();
    // cleanup scroll triggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }

  },[])
  return (
    <>
      <Header />
      <HeroSection />
      <CustomCursor />
      <AboutSection />
      <ProjectSection />
      <ContactSection />
    </>
  )
}
export default App
