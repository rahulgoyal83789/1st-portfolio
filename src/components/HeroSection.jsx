import {motion} from "framer-motion"
const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-violet-900 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
      {/*Left Section */}
      <div>
        <motion.h1 
        initial={{opacity: 0,y: 80}}
        animate={{opacity: 1,y: 0}}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 25,
          delay: 1.3,
          duration: 1.5
        }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold z-10 mb-6">Building Fast <br /> Reliable Results</motion.h1>
        <p>
          I'm Rahul - a 2nd year CS student at BVP Delhi who builds
          full-stack web apps that actually ship. From AI-powered career tools
          to real-time collaborative editors, I turn ideas into deployed
          products.
        </p>
      </div>
    </section>
  )
}

export default HeroSection