import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Database, Code2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    {
        title: "Languages",
        skills: ["C++", "Python", "JavaScript", "SQL"],
        icon: <Code2 className="w-8 h-8 text-purple-400" />
    },
    {
        title: "Web Technologies",
        skills: ["React.js", "Next.js", "Node.js", "HTML", "CSS", "Tailwind CSS"],
        icon: <Globe className="w-8 h-8 text-cyan-400" />
    },
    {
        title: "Tools & Databases",
        skills: ["MongoDB", "MySQL", "Git", "REST APIs", "WebSockets"],
        icon: <Database className="w-8 h-8 text-emerald-400" />
    }
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".skills-header",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current.children,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white w-full relative z-30 border-t border-gray-900">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24 skills-header">
                <p className="text-purple-400 uppercase tracking-widest text-sm mb-4 font-semibold">Expertise</p>
                <h2 className="text-5xl md:text-7xl font-bold font-serif italic max-w-3xl">Technical Skills</h2>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => (
                    <div
                        key={index}
                        className="interactable bg-[#0a0a0a] p-10 rounded-[2rem] border border-gray-800 hover:border-gray-500 transition-colors duration-500 relative overflow-hidden group"
                    >
                        <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform scale-150 rotate-12">
                            {category.icon}
                        </div>
                        <div className="mb-8 p-4 bg-white/5 rounded-2xl inline-block">
                            {category.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6 font-serif italic">{category.title}</h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, sfIndex) => (
                                <span key={sfIndex} className="px-4 py-2 bg-[#1a1a1a] border border-gray-800 text-gray-300 rounded-full text-sm hover:text-white hover:border-gray-600 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
