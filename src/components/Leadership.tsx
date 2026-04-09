import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Users, Megaphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadershipRoles = [
    {
        id: 1,
        role: "Head of PR & Marketing",
        organization: "CICE",
        description: "Led the public relations and marketing strategies. Managed technical event promotions and maximized student engagement across campus.",
        icon: <Megaphone className="w-8 h-8 text-pink-400" />
    },
    {
        id: 2,
        role: "Project Management Intern",
        organization: "Pawzz Foundation (NGO)",
        description: "Coordinated volunteer efforts and managed impactful community projects out for animal welfare, ensuring efficient workflow and execution.",
        icon: <Users className="w-8 h-8 text-orange-400" />
    }
];

export default function Leadership() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".lead-header",
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
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
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
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#030303] text-white w-full relative z-30">
            <div className="flex flex-col items-center text-center mb-12 md:mb-24 lead-header">
                <p className="text-pink-400 uppercase tracking-widest text-sm mb-4 font-semibold">Initiative</p>
                <h2 className="text-4xl md:text-7xl font-bold font-serif italic max-w-3xl">Leadership</h2>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {leadershipRoles.map((role) => (
                    <div
                        key={role.id}
                        className="interactable bg-gradient-to-br from-[#111] to-[#0a0a0a] p-10 rounded-[2rem] border border-gray-800 hover:border-pink-500/30 transition-all duration-500 group relative"
                    >
                        <div className="mb-6">
                            {role.icon}
                        </div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-pink-300 transition-colors">{role.role}</h3>
                        <p className="text-xl text-gray-400 mb-6 font-serif italic">{role.organization}</p>
                        <p className="text-gray-500 leading-relaxed">
                            {role.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
