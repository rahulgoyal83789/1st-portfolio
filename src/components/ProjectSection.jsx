import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";

const projectImages = [
    { id: 1, title: "Nestique - Property Rental Platform",              imageSrc: "/images/Nestique_image.png",     link: "https://nestique.onrender.com/" },
    { id: 2, title: "BrainDrift - AI-Powered Interview Prep Platform",  imageSrc: "/images/Braindrift_image.png",   link: "https://braindrift.vercel.app/" },
    { id: 3, title: "MergeConflict - Live Code Collaboration Tool",     imageSrc: "/images/MergeConflict_image.png",link: "https://github.com/rahulgoyal83789/mergeconflict" },
    { id: 4, title: "CloudJar - React based basic weather app",         imageSrc: "/images/CloudJar_image.png",     link: "https://cloudjar.vercel.app/" },
];

const ProjectSection = () => {
    const sectionRef    = useRef(null);
    const titleRef      = useRef(null);
    const titleLineRef  = useRef(null);
    const triggerRef    = useRef(null);
    const horizontalRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {

            // Title + line — same on all screen sizes
            gsap.fromTo(titleRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                  scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } }
            );
            gsap.fromTo(titleLineRef.current,
                { width: "0%", opacity: 0 },
                { width: "100%", opacity: 1, duration: 1.5, ease: "power3.inOut", delay: 0.3,
                  scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" } }
            );

            if (isMobile) {
                // ── Mobile: just fade each card in on scroll, no horizontal pin ──
                gsap.set(triggerRef.current, { opacity: 1 });
                const cards = gsap.utils.toArray(".mobile-project-card", triggerRef.current);
                cards.forEach((card) => {
                    gsap.fromTo(card,
                        { y: 60, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
                          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" } }
                    );
                });

            } else {
                // ── Desktop: horizontal scroll with pin ──
                gsap.set(triggerRef.current, { opacity: 1 });
                const panels = gsap.utils.toArray(".project-panel", horizontalRef.current);

                const horizontalScroll = gsap.to(panels, {
                    xPercent: -100 * (panels.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalRef.current,
                        start: "top top",
                        end: () => `+=${(panels.length - 1) * window.innerWidth}`,
                        scrub: 1,
                        pin: true,
                        snap: { snapTo: 1 / (panels.length - 1), duration: { min: 0.2, max: 0.3 }, delay: 0.1 },
                        invalidateOnRefresh: true,
                    }
                });

                panels.forEach((panel) => {
                    const image      = panel.querySelector(".project-image");
                    const imageTitle = panel.querySelector(".project-title");
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalScroll,
                            start: "left center",
                            end: "center center",
                            scrub: true,
                        }
                    });
                    tl.fromTo(image,      { scale: 0.7, rotate: -15, opacity: 0 }, { scale: 1, rotate: -5, opacity: 1, duration: 0.5 });
                    if (imageTitle) {
                        tl.fromTo(imageTitle, { y: 30, rotate: -15, opacity: 0 }, { y: 0, rotate: -5, opacity: 1, duration: 0.3 }, 0.2);
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const isMobileRender = typeof window !== "undefined" && window.innerWidth < 768;

    return (
        <section ref={sectionRef} id="horizontal-section" className="relative bg-[#f6f6f6]">

            {/* Title — always visible */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0">
                    Featured Projects
                </h2>
                <div ref={titleLineRef} className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0" style={{ width: 0 }} />
            </div>

            <div ref={triggerRef} style={{ opacity: 0 }}>

                {/* ── MOBILE: vertical card grid ── */}
                <div className="md:hidden flex flex-col gap-10 px-5 pb-16">
                    {projectImages.map((project) => (
                        <div key={project.id} className="mobile-project-card flex flex-col items-center gap-4">
                            <img
                                src={project.imageSrc}
                                alt={project.title}
                                className="w-full rounded-2xl object-cover shadow-lg"
                            />
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-bold text-black hover:text-gray-500 transition-colors duration-300 text-center"
                            >
                                {project.title} <SlShareAlt />
                            </a>
                        </div>
                    ))}
                </div>

                {/* ── DESKTOP: horizontal scroll ── */}
                <div
                    ref={horizontalRef}
                    className="hidden md:flex h-screen"
                    style={{ width: `${projectImages.length * 100}vw` }}
                >
                    {projectImages.map((project) => (
                        <div
                            key={project.id}
                            className="project-panel relative flex items-center justify-center h-screen flex-shrink-0"
                            style={{ width: "100vw" }}
                        >
                            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
                                <img
                                    src={project.imageSrc}
                                    alt={project.title}
                                    className="project-image max-w-full max-h-[65vh] rounded-2xl object-cover"
                                />
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-title flex items-center gap-3 md:text-3xl text-sm md:font-bold text-black mt-6 z-50 text-nowrap hover:text-gray-400 transition-colors duration-300"
                                >
                                    {project.title} <SlShareAlt />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
};

export default ProjectSection;