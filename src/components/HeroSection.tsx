import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            syncTouch: true,
        });

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);

        // Animations
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-text", 
                { opacity: 0, y: 100 }, 
                { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power4.out" }
            );
            gsap.fromTo(".hero-sub", 
                { opacity: 0 }, 
                { opacity: 1, duration: 2, delay: 1, ease: "power2.out" }
            );
            gsap.to(".scroll-indicator", {
                y: 15,
                repeat: -1,
                yoyo: true,
                duration: 1,
                ease: "power1.inOut"
            });
        });

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-screen bg-black flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>
            
            {/* Video Overlay Gradient for seamless transition */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black pointer-events-none"></div>
            
            <div className="z-10 mt-16">
                <p className="hero-sub text-purple-400 font-mono tracking-widest uppercase mb-6 text-sm md:text-base">Hello, I'm</p>
                <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-white">
                    Kriti Puri
                </h1>
                <h2 className="hero-text text-2xl md:text-4xl text-gray-400 font-serif italic mb-8">
                    Frontend & Full-Stack Developer
                </h2>
                <div className="hero-sub flex gap-6 justify-center mt-8">
                    <a  target = "_blank" href="https://github.com/KritiPuri" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-purple-400 transition-colors border border-white/10 hover:scale-110 transform duration-300">
                        <Github className="w-6 h-6" />
                    </a>
                    <a target = "_blank" href="https://www.linkedin.com/in/kriti-puri-b38bab26b/" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-purple-400 transition-colors border border-white/10 hover:scale-110 transform duration-300">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a  target = "_blank" href="mailto:kritipuri28@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-purple-400 transition-colors border border-white/10 hover:scale-110 transform duration-300">
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-sub flex flex-col items-center gap-4 text-gray-500">
                <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
                <ArrowDown className="w-5 h-5 scroll-indicator" />
            </div>
        </div>
    );
}
