import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "NeuroSWAY",
        category: "AI / Python",
        image: "/neurosway.png",
        year: "2024",
        desc: "AI-based fall detection system using MediaPipe and OpenCV with reduced false alerts.",
        link: "https://github.com/KritiPuri/NeuroSWAY_Real_Time_Fall_Detection_System_Using_Pose_Estimation"
    },
    {
        id: 2,
        title: "PyMeet",
        category: "Networking / React",
        image: "/pymeet.png",
        year: "2023",
        desc: "Real-time meeting app supporting chat, voice, and video using TCP/UDP for efficient communication.",
        link: "https://github.com/KritiPuri/PyMeet_Real_time_Online_Meeting_App"
    },
    {
        id: 3,
        title: "MediTrack",
        category: "Full-Stack Web App",
        image: "/meditrack.png",
        year: "2023",
        desc: "Full-stack healthcare management system with REST APIs and database integration.",
        link: "https://github.com/KritiPuri/MediTrack_Healthcare_Management_System"
    },
    {
        id: 4,
        title: "Bookstore System",
        category: "C++ / Algorithms",
        image: "/bookstore.png",
        year: "2022",
        desc: "C++ app using AVL trees and graph algorithms for optimized order processing and delivery.",
        link: "https://github.com/KritiPuri/Bookstore_ordering_system"
    }
];

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
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

            if (projectsRef.current) {
                const cards = projectsRef.current.children;
                gsap.fromTo(cards,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: projectsRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#030303] text-white w-full relative z-30">
            <div ref={headerRef} className="flex flex-col items-center text-center mb-12 md:mb-24">
                <div className="flex flex-col items-center">
                    <p className="text-purple-400 uppercase tracking-widest text-sm mb-4 font-semibold">Development</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold italic font-serif tracking-tight">Key Projects</h2>
                </div>
                <a href="https://github.com/KritiPuri" target="_blank" rel="noopener noreferrer" className="interactable mt-8 group flex items-center gap-3 text-lg border-b border-purple-500/50 pb-1 hover:text-purple-300 transition-colors">
                    View GitHub
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
            </div>

            <div ref={projectsRef} className="flex flex-col gap-16 md:gap-32">
                {projects.map((project, index) => (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-col-reverse lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group interactable cursor-pointer`}>
                        <div className="w-full lg:w-3/5 overflow-hidden rounded-xl border border-gray-800">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-64 sm:h-80 md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                            />
                        </div>
                        <div className="w-full lg:w-2/5 flex flex-col justify-center">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-purple-400/80 tracking-wider text-sm font-semibold">{project.category}</span>
                                <span className="text-gray-500 font-serif italic">{project.year}</span>
                            </div>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:text-purple-300 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">{project.desc}</p>
                            <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-500 group-hover:text-white transition-all">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
