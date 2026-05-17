import {motion} from "framer-motion"
import Spline from "@splinetool/react-spline"

const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-violet-900 to-black relative overflow-hidden flex items-center">

      {/* Left Section — always visible, positioned from left */}
      <div className="relative z-40 lg:px-24 md:px-16 px-8 max-w-2xl">
        <motion.p
          initial={{opacity: 0, y: 80}}
          animate={{opacity: 1, y: 0}}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 0.8, duration: 1.5 }}
          className="text-violet-400 font-semibold tracking-widest uppercase text-sm mb-4"
        >
          Full Stack Web Developer · Delhi, India
        </motion.p>

        <motion.h1
          initial={{opacity: 0, y: 80}}
          animate={{opacity: 1, y: 0}}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 1.3, duration: 1.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold z-10 mb-6 leading-tight"
        >
          Building Real Things <br />That Matter
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 80}}
          animate={{opacity: 1, y: 0}}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 1.8, duration: 1.5 }}
          className="text-lg md:text-xl lg:text-2xl text-purple-200 max-w-xl"
        >
          2nd year CSE student turning ideas into deployed products — AI integrations, real-time systems, and production-ready backends.
        </motion.p>
      </div>

      {/* Right Section — Spline 3D globe, absolutely positioned */}
      {/* On xl: right edge bleeds off screen (matches your screenshot)        */}
      {/* On lg/md: scaled/shifted so globe stays visible but doesn't overlap text */}
      {/* On sm and below: hidden entirely                                      */}
      <div className="
        absolute pointer-events-none
        hidden sm:block
        top-1/2 -translate-y-1/2
        sm:right-[-38%]  sm:w-[80%]
        md:right-[-32%]  md:w-[74%]
        lg:right-[-26%]  lg:w-[66%]
        xl:right-[-28%]  xl:w-[62%]
      ">
        <Spline scene="https://prod.spline.design/ZH0N0X5EF3nNQdC1/scene.splinecode"/>
      </div>

    </section>
  )
}

export default HeroSection