import React, { useState, useEffect, useRef } from 'react';

// --- HELPER HOOK for animations ---
const useOnScreen = (options) => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// --- SVG & ICONS ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-orange-500 mb-4">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-orange-500 mb-4">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />
    </svg>
);

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);
const AnimatedSection = ({ children, className, delay = 0 }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-16 skew-y-2'}`}
        >
            {children}
        </div>
    );
};


// --- HEADER ---
const Header = ({ navigateTo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks = [
        { name: 'Home', path: 'home' },
        { name: 'About Us', path: 'about' },
        { name: 'Products & Services', path: 'services' },
        { name: 'Our Team', path: 'more-about' },
        { name: 'Company Structure', path: 'structure' },
    ];

    const handleNavClick = (path) => {
        navigateTo(path);
        setIsOpen(false);
    };

    return (
        <header className="bg-navy-blue/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-navy-blue/20">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-700 flex items-center justify-center rounded-md">
                        <span className="text-xs font-bold text-light-blue">LOGO</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-wider hidden sm:block">STANHOLE</span>
                </div>
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map(link => (
                         <button key={link.name} onClick={() => handleNavClick(link.path)} className="text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium relative group">
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    ))}
                </nav>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <nav className="px-6 pb-4 flex flex-col space-y-2">
                    {navLinks.map(link => (
                        <button key={link.name} onClick={() => handleNavClick(link.path)} className="text-gray-300 hover:text-orange-500 text-left py-2 transition-colors duration-300">
                            {link.name}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};


// --- FOOTER ---
const Footer = ({ currentPage }) => {
    return (
        <footer className="bg-navy-blue text-gray-300">
            <div className="container mx-auto px-6 pt-12 pb-8">
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">Stanhole Trading & Projects</h3>
                        <p className="max-w-md">
                            Your trusted partner in Electrical & Mechanical Solutions. We are committed to providing the highest level of services and ensuring every client is well served.
                        </p>
                         <div className="mt-6">
                            <h4 className="text-lg font-semibold text-white">Head Office</h4>
                            <p className="flex items-start mt-2"><MapPinIcon />61 Bergrivier Drive, Terenure, Kempton Park, 1619</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Contact Info</h3>
                        <div className="space-y-3">
                           <p className="flex items-center"><PhoneIcon /><a href="tel:+27837360290" className="hover:text-orange-500">+27 83 736 0290</a></p>
                           <p className="flex items-center"><MailIcon /><a href="mailto:info@stanhole.co.za" className="hover:text-orange-500">info@stanhole.co.za</a></p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Our Branches</h3>
                        <ul className="space-y-2 text-sm">
                            <li><strong>Polokwane:</strong> Stand No. 902 Makgodu, Moletji</li>
                            <li><strong>Lephalale:</strong> 10074 Ditloung, Abbotspoort</li>
                            <li><strong>Pretoria:</strong> 8989 Tamboville, Temba</li>
                        </ul>
                    </div>
                </div>

                {(currentPage === 'home' || currentPage === 'about') && (
                    <AnimatedSection className="mt-12 rounded-lg overflow-hidden border-2 border-light-blue/20 shadow-2xl">
                       <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.504286161952!2d28.188849675971485!3d-26.082260959449836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951508825c0e7f%3A0x449852899451991a!2s61%20Bergrivier%20Dr%2C%20Terenure%2C%20Kempton%20Park%2C%201619%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1714574945417!5m2!1sen!2sus"
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </AnimatedSection>
                )}
            </div>
            <div className="bg-gray-900 py-4 mt-8">
                 <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                    <div className="h-1.5 w-full flex mb-4">
                        <div className="w-1/3 bg-navy-blue"></div>
                        <div className="w-1/3 bg-orange-500"></div>
                        <div className="w-1/3 bg-gray-600"></div>
                    </div>
                    <p>&copy; {new Date().getFullYear()} Stanhole Trading and Projects (Pty) Ltd. All Rights Reserved.</p>
                 </div>
            </div>
        </footer>
    );
};

// --- PAGES ---

// --- Home Page ---
const HomePage = ({ navigateTo }) => {
    const heroImage = 'https://placehold.co/1920x1080/001f3f/75E6DA?text=Industrial+Site'; // using placeholder
    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center text-white py-32 md:py-48"
                style={{ backgroundImage: `linear-gradient(rgba(0, 31, 63, 0.8), rgba(0, 31, 63, 0.8)), url(${heroImage})` }}
            >
                <div className="absolute inset-0 bg-navy-blue/80"></div>
                 <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 animate-fade-in-down-slow">
                        Powering Progress, Engineering the Future.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up-slow">
                        Specializing in low, medium, and high voltage systems for industrial, commercial, and residential sectors across South Africa.
                    </p>
                    <button onClick={() => navigateTo('services')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 group animate-fade-in-up-slow delay-500">
                        Explore Our Services <ArrowRightIcon />
                    </button>
                </div>
            </section>
            
            {/* Introduction Section */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-6">
                    <AnimatedSection className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-light-blue font-semibold tracking-widest">WHO WE ARE</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-6">A 100% Black-Owned Company Delivering Excellence</h2>
                            <p className="text-gray-400 mb-4 text-lg">
                                Stanhole Trading and Projects (Pty) Ltd is a South African based company which specializes almost exclusively in the installations of electrical cabling, stringing, earthing and electrical equipment.
                            </p>
                             <p className="text-gray-400 text-lg">
                                The involvement of the principals in each project from inception to completion ensures that their experience and expertise is channeled to achieve the client's objective in the most expedient and cost effective manner.
                            </p>
                        </div>
                        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl group">
                           <img src="https://placehold.co/600x400/333333/FFFFFF?text=Team+at+Work" alt="Stanhole Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                           <div className="absolute inset-0 bg-gradient-to-t from-navy-blue/50 to-transparent"></div>
                           <div className="absolute inset-0 border-4 border-light-blue/0 group-hover:border-light-blue/50 transition-all duration-500 rounded-lg"></div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
             {/* Core Services Preview */}
            <section className="py-20 bg-navy-blue">
                <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                         <span className="text-orange-500 font-semibold tracking-widest">WHAT WE DO</span>
                         <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-12">Our Core Expertise</h2>
                    </AnimatedSection>
                    <div className="grid md:grid-cols-2 gap-8">
                        <AnimatedSection className="bg-gray-800/50 p-8 rounded-lg text-left transition-all duration-300 shadow-lg hover:shadow-light-blue/20 hover:bg-gray-800/80 hover:-translate-y-2">
                            <ZapIcon />
                            <h3 className="text-2xl font-bold text-white mb-4">Electrical & Instrumentation</h3>
                            <p className="text-gray-400 mb-6">Comprehensive solutions including PLC Programming, Transformer Maintenance, Substation Construction, and Electrification projects.</p>
                            <button onClick={() => navigateTo('services')} className="font-semibold text-orange-500 hover:text-orange-400 transition-colors group flex items-center">
                                Learn More <ArrowRightIcon />
                            </button>
                        </AnimatedSection>
                        <AnimatedSection delay={200} className="bg-gray-800/50 p-8 rounded-lg text-left transition-all duration-300 shadow-lg hover:shadow-light-blue/20 hover:bg-gray-800/80 hover:-translate-y-2">
                            <SettingsIcon />
                            <h3 className="text-2xl font-bold text-white mb-4">Mechanical Services</h3>
                            <p className="text-gray-400 mb-6">Expert supply, maintenance, and installation for HVAC, Pumps, Motors, Crushers, and Ventilation Systems.</p>
                             <button onClick={() => navigateTo('services')} className="font-semibold text-orange-500 hover:text-orange-400 transition-colors group flex items-center">
                                Learn More <ArrowRightIcon />
                            </button>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
};


// --- About Page ---
const AboutPage = () => {
    const values = ["Honesty", "Respect", "Trust", "Client Satisfaction", "Equal Opportunities", "Integrity"];

    return (
        <div className="py-20 bg-gray-800 text-white">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Stanhole Trading & Projects</h1>
                    <p className="text-lg text-light-blue max-w-3xl mx-auto font-semibold">
                        Our commitment to quality, safety, and customer satisfaction is the foundation of our success.
                    </p>
                </AnimatedSection>
                
                <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
                    <AnimatedSection className="group">
                        <img src="https://placehold.co/800x600/001f3f/AAAAAA?text=Substation" alt="Electrical Substation" className="rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-500"/>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h2 className="text-3xl font-bold mb-4 text-orange-500">Our Introduction</h2>
                        <p className="text-gray-300 mb-4 text-lg">
                            Stanhole Trading and Projects (Pty) Ltd is a 100% black-owned South African company with a sharp focus on providing products and services for low, medium, and high voltage systems. We specialize in the installation of electrical cabling, stringing, earthing, and advanced electrical equipment.
                        </p>
                        <p className="text-gray-300 text-lg">
                             Our company employs experienced staff qualified to work with electricity and operates a quality system based on ISO 9000, ensuring excellence and reliability in every project we undertake.
                        </p>
                    </AnimatedSection>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <AnimatedSection className="bg-navy-blue text-white p-8 rounded-lg shadow-lg hover:shadow-light-blue/30 hover:-translate-y-2 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-3 text-orange-500">Our Mission</h3>
                        <p className="text-gray-300">To be one of the most popular energy generation and maintenance service providers, offering services to every sector. We leverage the experience of our highly professional staff to meet the holistic electrical requirements of both industrial and corporate clients.</p>
                    </AnimatedSection>
                    <AnimatedSection delay={200} className="bg-navy-blue text-white p-8 rounded-lg shadow-lg hover:shadow-light-blue/30 hover:-translate-y-2 transition-all duration-300">
                         <h3 className="text-2xl font-bold mb-3 text-orange-500">Our Vision</h3>
                        <p className="text-gray-300">To provide the best possible customer satisfaction and exceed expectations through our occupational experience. We are committed to providing the highest level of service and sustaining long-term relationships with our job suppliers.</p>
                    </AnimatedSection>
                </div>

                 <AnimatedSection className="text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {values.map((value, i) => (
                            <AnimatedSection key={value} delay={i * 100} className="bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:bg-orange-500 hover:scale-105 shadow-md">
                                {value}
                            </AnimatedSection>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};


// --- Services Page ---
const ServicesPage = () => {
    const electricalServices = [
        "PLC Programming (SIEMANS, SCHNIEDER, ALLEN BRADLEY, ABB ETC)", "VSD and Soft Starter Programming and Installation", "Sensors, flow meters, scales Installation etc.", "Network Communication and Automation", "Transformer Service, maintenance, and installation", "Plant Maintenance and Repairs", "Switchgear services, inspection, and installation", "Building new Substation up to 11Kv and commission", "Installation and repair of MV and LV cables", "Termination and Jointing cables", "MCC and Substations refurbishment", "Installation of Substation fence", "Electrification of Rural and Urban areas", "Connection of prepaid and Conventional meters", "Issue Electrical COC single phase and three phase", "Air conditioner Service, Maintenance, Repairs and Installation",
    ];
    const mechanicalServices = [
        "HVAC", "Air Conditioning", "Heat and Ventilation", "Fluid Mechanics", "Pumps and motors", "Crushers and Feeders", "Vibrating Screens and Screen Panels",
    ];
    const industries = ["Mining", "Quarries", "Cement", "Ready Mix", "Commercial", "Industrial", "Residential"];

    return (
        <div className="py-20 bg-gray-800 text-white">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Products & Services</h1>
                    <p className="text-lg text-light-blue max-w-3xl mx-auto font-semibold">
                        Delivering a comprehensive range of expert electrical and mechanical services tailored to your needs.
                    </p>
                </AnimatedSection>

                <div className="grid lg:grid-cols-2 gap-12">
                    <AnimatedSection>
                        <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center"><ZapIcon /> Electrical & Instrumentation</h2>
                        <div className="bg-navy-blue p-8 rounded-lg shadow-lg">
                            <ul className="space-y-4">
                                {electricalServices.map(service => (
                                    <li key={service} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        <span className="text-gray-300">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={200}>
                        <h2 className="text-3xl font-bold text-orange-500 mb-6 flex items-center"><SettingsIcon /> Mechanical Services</h2>
                         <div className="bg-navy-blue p-8 rounded-lg shadow-lg">
                             <ul className="space-y-4">
                                {mechanicalServices.map(service => (
                                    <li key={service} className="flex items-start">
                                        <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        <span className="text-gray-300">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mt-12">
                             <h3 className="text-2xl font-bold text-white mb-6">Industries We Serve</h3>
                             <div className="flex flex-wrap gap-3">
                                {industries.map(industry => (
                                    <span key={industry} className="bg-navy-blue text-white py-2 px-4 rounded-md font-medium shadow-md">{industry}</span>
                                ))}
                             </div>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    );
};


// --- More About Us Page (Team) ---
const MoreAboutPage = () => {
    return (
         <div className="py-20 bg-gray-800 text-white">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Professional Team</h1>
                    <p className="text-lg text-light-blue max-w-3xl mx-auto font-semibold">
                        The experienced and qualified individuals driving our success.
                    </p>
                </AnimatedSection>
                
                <AnimatedSection className="bg-navy-blue text-white rounded-lg shadow-2xl p-8 md:p-12 mb-16 transition-all duration-500 hover:shadow-light-blue/40">
                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-1 flex justify-center">
                            <div className="w-48 h-48 rounded-full bg-gray-700 border-4 border-orange-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24 text-gray-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                        </div>
                        <div className="md:col-span-2">
                             <h2 className="text-3xl font-bold text-white">Stanley Maphuti Mashita</h2>
                             <p className="text-orange-500 font-semibold text-lg mb-4">Director</p>
                             <div className="border-t border-gray-700 pt-4 mt-4">
                                <h3 className="font-semibold text-light-blue mb-2">Qualifications:</h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-1">
                                    <li>National Diploma: Electrical Engineering (VUT)</li>
                                    <li>N4 Mechanical Engineering</li>
                                    <li>Section 13 Trade certificate (MQA)-Electrician</li>
                                    <li>Wireman's License (Installation Electrician - Three Phase)</li>
                                    <li>HT (Medium Voltage) certificate</li>
                                    <li>PLC Maintenance service 1,2&3</li>
                                </ul>
                             </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Human Resource Plan</h2>
                     <div className="bg-navy-blue rounded-lg shadow-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900/50">
                                <tr>
                                    <th className="p-4 font-semibold">Role</th>
                                    <th className="p-4 font-semibold">Males</th>
                                    <th className="p-4 font-semibold">Females</th>
                                    <th className="p-4 font-semibold">Age Group</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-700">
                                    <td className="p-4">Senior Member</td><td className="p-4">2</td><td className="p-4">1</td><td className="p-4">30-35</td>
                                </tr>
                                 <tr className="border-b border-gray-700">
                                    <td className="p-4">Professionals</td><td className="p-4">2</td><td className="p-4">1</td><td className="p-4">25-45</td>
                                </tr>
                                <tr className="border-b border-gray-700">
                                    <td className="p-4">Technician</td><td className="p-4">2</td><td className="p-4">-</td><td className="p-4">18-45</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Assistant</td><td className="p-4">4</td><td className="p-4">-</td><td className="p-4">18-40</td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                </AnimatedSection>
            </div>
        </div>
    );
};


// --- Structure Page ---
const StructurePage = () => {
    const Card = ({ title, name, className, level, children }) => (
        <div className={`flex flex-col items-center ${className}`}>
            <div className={`bg-navy-blue border-2 ${level === 1 ? 'border-orange-500' : 'border-light-blue/50'} rounded-lg shadow-lg p-4 text-center min-w-[180px] hover:shadow-light-blue/40 hover:-translate-y-1 transition-all`}>
                <h4 className="font-bold text-white">{title}</h4>
                {name && <p className="text-sm text-gray-400">{name}</p>}
            </div>
            {children && <div className="flex justify-center mt-4">{children}</div>}
        </div>
    );
    
    const Connector = () => <div className="w-px h-8 bg-gray-600"></div>;

    return (
        <div className="py-20 bg-gray-800 text-white min-h-screen">
            <div className="container mx-auto px-6">
                <AnimatedSection className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Company Structure</h1>
                    <p className="text-lg text-light-blue max-w-3xl mx-auto font-semibold">
                        A clear and effective organizational structure that drives our operations.
                    </p>
                </AnimatedSection>
                
                <AnimatedSection className="flex flex-col items-center space-y-2">
                    <Card title="Managing Member" name="Stanhole Trading & Projects (Pty) Ltd" level={1} />
                    <Connector />
                    <Card title="Chief Operations Officer" name="(SM Mashita)" level={1} />

                    {/* Horizontal Connector */}
                    <div className="w-full flex justify-center items-center my-4">
                        <div className="w-px h-8 bg-gray-600 -mt-8"></div>
                        <div className="w-4/5 h-px bg-gray-600 absolute"></div>
                    </div>
                    
                    <div className="w-full flex justify-around relative">
                        {/* Vertical connectors from horizontal line */}
                        <div className="absolute top-0 left-[12.5%] w-px h-4 bg-gray-600"></div>
                        <div className="absolute top-0 left-[37.5%] w-px h-4 bg-gray-600"></div>
                        <div className="absolute top-0 left-[62.5%] w-px h-4 bg-gray-600"></div>
                        <div className="absolute top-0 left-[87.5%] w-px h-4 bg-gray-600"></div>
                    
                        <Card title="Marketing Manager" name="(S Moloto)" />
                        <Card title="General Manager" name="(M Mokoena)">
                             <div className="relative flex flex-col items-center mt-4">
                                <Connector />
                                <div className="absolute top-8 w-px h-24 bg-gray-600"></div>
                                <div className="absolute top-8 w-48 h-px bg-gray-600"></div>
                                <div className="absolute top-8 left-0 w-px h-4 bg-gray-600"></div>
                                <div className="absolute top-8 right-0 w-px h-4 bg-gray-600"></div>
                                
                                <div className="absolute top-12 flex w-64 justify-around">
                                    <Card title="Administration" name="(K Setho)" className="transform scale-90"/>
                                    <Card title="Electricians & Tech" name="(Multiple)" className="transform scale-90"/>
                                </div>
                            </div>
                        </Card>
                        <Card title="Safety Officer" name="(H Mphahlele)" />
                        <Card title="Managing Director" name="(T Rasekganya)">
                             <div className="relative flex flex-col items-center mt-4">
                                <Connector />
                                 <Card title="Assistant" name="(Multiple)" className="transform scale-90"/>
                            </div>
                        </Card>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [page, setPage] = useState('home');

    const navigateTo = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'about':
                return <AboutPage />;
            case 'services':
                return <ServicesPage />;
            case 'more-about':
                return <MoreAboutPage />;
            case 'structure':
                return <StructurePage />;
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };
    
    // Custom styles for the app
    const AppStyles = () => (
        <style>{`
            :root {
                --navy-blue: #001f3f;
                --light-blue: #00A9E0; /* Brighter light blue */
                --orange: #FF851B;
                --grey: #AAAAAA;
                --dark-grey: #333333;
                --white: #ffffff;
                --off-white: #f8f9fa;
            }
            body {
                background-color: var(--dark-grey);
                color: var(--grey);
                font-family: 'Inter', sans-serif;
            }
            .bg-navy-blue { background-color: var(--navy-blue); }
            .text-light-blue { color: var(--light-blue); }
            .bg-orange-500 { background-color: var(--orange); }
            .text-orange-500 { color: var(--orange); }
            .border-orange-500 { border-color: var(--orange); }
            .hover\\:bg-orange-600:hover { background-color: #E67817; }
            .bg-gray-800 { background-color: #1F2937; }
            .bg-gray-900 { background-color: #111827; }
            .shadow-light-blue\\/20 { box-shadow: 0 10px 15px -3px rgba(0, 169, 224, 0.1), 0 4px 6px -2px rgba(0, 169, 224, 0.05); }
            .shadow-light-blue\\/30 { box-shadow: 0 10px 20px -5px rgba(0, 169, 224, 0.2), 0 5px 10px -5px rgba(0, 169, 224, 0.1); }
             .shadow-light-blue\\/40 { box-shadow: 0 15px 30px -5px rgba(0, 169, 224, 0.3), 0 8px 15px -5px rgba(0, 169, 224, 0.2); }
            
            @keyframes fade-in-down-slow {
                0% { opacity: 0; transform: translateY(-30px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in-up-slow {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-down-slow { animation: fade-in-down-slow 1s ease-out forwards; }
            .animate-fade-in-up-slow { animation: fade-in-up-slow 1s ease-out 0.3s forwards; }
            .delay-500 { animation-delay: 0.5s; }
        `}</style>
    );

    return (
        <>
            <AppStyles />
            <div className="bg-gray-900">
                <Header navigateTo={navigateTo} />
                <main>
                   {renderPage()}
                </main>
                <Footer currentPage={page} />
            </div>
        </>
    );
}

