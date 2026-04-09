import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
    {
        id: 1,
        title: "B.Tech Information Technology",
        institution: "Jaypee Institute of Information Technology, Noida",
        year: "2023 - 2027",
        description: "Focusing on core software engineering, data structures, and web technologies. Active in various tech clubs.",
        metric: "CGPA: 7.2",
        icon: <GraduationCap className="w-6 h-6" />
    },
    {
        id: 2,
        title: "High School (12th Grade)",
        institution: "Senior Secondary",
        year: "Completed",
        description: "Strong foundation in Mathematics and Sciences, setting the stage for an engineering career.",
        metric: "Score: >92%",
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Secondary School (10th Grade)",
        institution: "High School",
        year: "Completed",
        description: "Consistent academic excellence during early educational years.",
        metric: "Score: >92%",
        icon: <Award className="w-6 h-6" />
    }
];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
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

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#050505] text-white w-full relative z-30">
            <div className="text-center mb-12 md:mb-24 qual-header">
                <p className="text-purple-400 uppercase tracking-widest text-sm mb-4 font-semibold">Education Context</p>
                <h2 className="text-4xl md:text-6xl font-bold font-serif italic">Academics</h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualifications.map((item) => (
                    <div
                        key={item.id}
                        className="interactable bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors duration-500 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic border-b border-gray-800 pb-4">
                            <span className="text-gray-400 pr-2">{item.institution}</span>
                            <span className="text-purple-500/80 whitespace-nowrap">{item.year}</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm mb-6 flex-grow">
                            {item.description}
                        </p>
                        <div className="inline-block px-3 py-1 bg-purple-500/10 text-purple-300 text-xs font-bold rounded-full">
                            {item.metric}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
