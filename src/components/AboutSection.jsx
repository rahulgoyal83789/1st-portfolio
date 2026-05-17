import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STAR_DATA = [...Array(10)].map((_, i) => ({
    id: i,
    size: 10 + i * 3,
    left: (i * 11 + 7) % 100,
    top:  (i * 17 + 13) % 100,
    opacity: 0.25 + (i % 4) * 0.1,
}));

const BIO = `Hi, I'm Rahul, a Full Stack Developer and 2nd year CSE student at Bharati
Vidyapeeth's College of Engineering, New Delhi. I build complete web applications
from RESTful backends with Node.js and Express, to modern React frontends, to
AI-powered features using the Gemini API. My projects include Nestique (an
Airbnb-inspired rental platform), BrainDrift (an AI career prep tool with resume
analysis and ATS generation), and MergeConflict (a real-time collaborative code
editor with Docker and Socket.io). When I'm not writing code, I'm playing chess,
reading tech blogs, or grinding DSA on LeetCode.`;

const AboutSection = () => {
    const sectionRef    = useRef(null);
    const starRef       = useRef([]);
    // Desktop-only animated refs
    const dtTitleRef    = useRef(null);
    const dtContentRef  = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {

            // Only animate desktop elements (they are display:none on mobile so refs are null-safe)
            if (dtTitleRef.current) {
                gsap.fromTo(dtTitleRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9,
                      scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" } }
                );
            }
            if (dtContentRef.current) {
                gsap.fromTo(dtContentRef.current,
                    { y: 80, opacity: 0, filter: "blur(12px)" },
                    { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.3, delay: 0.2,
                      scrollTrigger: { trigger: sectionRef.current, start: "top 55%", toggleActions: "play none none reverse" } }
                );
            }

            // Stars parallax
            starRef.current.forEach((star, i) => {
                if (!star) return;
                const dir = i % 2 === 0 ? 1 : -1;
                gsap.to(star, {
                    x: dir * (80 + i * 15), y: dir * -40 - i * 8, rotation: dir * 360, ease: "none",
                    scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.5 + (i % 3) * 0.3 }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const addToStars = (el) => {
        if (el && !starRef.current.includes(el)) starRef.current.push(el);
    };

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50]">

            {/* Stars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {STAR_DATA.map((s) => (
                    <div ref={addToStars} key={`star-${s.id}`} className="absolute rounded-full bg-white"
                        style={{ width: s.size, height: s.size, opacity: s.opacity, left: `${s.left}%`, top: `${s.top}%` }}
                    />
                ))}
            </div>

            {/* ── MOBILE (< md): no GSAP, always visible, stacked ── */}
            <div className="md:hidden flex flex-col items-center px-6 pt-16 pb-10 gap-6">
                <h1 className="text-4xl font-bold text-center text-white">About Me</h1>
                <img
                    src="images/my_image.png"
                    alt="Rahul Goyal"
                    className="mix-blend-lighten object-contain h-56 w-auto"
                />
                <p className="font-bold text-purple-200 tracking-wider leading-relaxed text-sm text-left">
                    {BIO}
                </p>
            </div>

            {/* ── DESKTOP (md+): GSAP animated, h-screen, side-by-side ── */}
            <div className="hidden md:flex h-screen flex-col">

                {/* Title */}
                <div className="w-full flex justify-center items-center pt-16 shrink-0">
                    <h1 ref={dtTitleRef} className="text-5xl md:text-6xl font-bold text-center text-white" style={{ opacity: 0 }}>
                        About Me
                    </h1>
                </div>

                {/* Text + Photo */}
                <div ref={dtContentRef} className="flex-1 flex flex-row items-end justify-between lg:px-24 md:px-12 overflow-hidden" style={{ opacity: 0 }}>
                    <div className="flex items-center pb-16 lg:pb-24 w-[55%]">
                        <p className="font-bold text-purple-200 tracking-wider leading-relaxed md:text-lg lg:text-xl xl:text-2xl">
                            {BIO}
                        </p>
                    </div>
                    <div className="flex items-end justify-end shrink-0 w-[42%] h-full">
                        <img
                            src="images/my_image.png"
                            alt="Rahul Goyal"
                            className="mix-blend-lighten object-contain object-bottom w-full"
                            style={{ maxHeight: "92%" }}
                        />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default AboutSection;