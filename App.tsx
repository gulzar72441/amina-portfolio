
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
  Linkedin, 
  Mail, 
  Video, 
  Palette, 
  X, 
  Menu, 
  ArrowUpRight, 
  Target, 
  Zap, 
  Cpu, 
  BarChart3, 
  Calendar, 
  ExternalLink, 
  Send 
} from 'lucide-react';
import { RESUME_DATA } from './constants';

// --- Subcomponents ---

const TOOLS = [
  { name: "Canva Pro", url: "https://www.canva.com", icon: "https://images.sftcdn.net/images/t_app-icon-m/p/0d61ca58-d5b4-11e7-b068-8365acd4fedb/2977679774/canva-logo" },
  { name: "Photoshop", url: "https://www.adobe.com/products/photoshop.html", icon: "https://images.sftcdn.net/images/t_app-icon-s/p/f2e0513a-96d1-11e6-a06e-00163ed833e7/2426110186/adobe-photoshop-download-adobe-photoshop-for-Mac.jpg" },
  { name: "CapCut", url: "https://www.capcut.com", icon: "https://images.sftcdn.net/images/t_app-icon-s/p/08f8e5f7-71f4-47b8-a5b9-9dea214fe514/136387540/capcut-logo" },
  { name: "Meta Business", url: "https://business.facebook.com", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1280px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Buffer", url: "https://buffer.com", icon: "https://images.sftcdn.net/images/t_app-icon-m/p/9f01fe41-99bf-11e6-81dc-676fb6608552/918875735/buffer-logo" },
  { name: "Semrush", url: "https://www.semrush.com", icon: "https://images.sftcdn.net/images/t_app-icon-m/p/f864be29-6bb5-4d0a-bc2d-193dabde71dc/3894279410/semrush-logo" },
  { name: "Waalaxy", url: "https://www.waalaxy.com", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuoQJsR__3o2z2YKGhFst6B61eIMXz4TDmOj7zv8rVnw&s" },
  { name: "Metricool", url: "https://metricool.com", icon: "https://images.sftcdn.net/images/t_app-icon-m/p/8fa69212-c211-47f1-a71c-db0f916d1c21/3534936370/metricool-for-social-media-logo" },
  { name: "InVideo", url: "https://invideo.io", icon: "https://images.sftcdn.net/images/t_app-icon-m/p/77f5a6f8-bc42-4d0c-948e-600e5ad1d778/3793440189/invideo-ai-video-generator-logo" },
  { name: "Publer", url: "https://publer.io", icon: "https://framerusercontent.com/images/KChJVsxXQ4QhKetaHLiOo0HadM.svg?width=123&height=40" },
  { name: "WhatsApp", url: "https://www.whatsapp.com", icon: "https://images.sftcdn.net/images/t_app-icon-s/p/07774824-96d7-11e6-89f7-00163ec9f5fa/118211825/whatsapp-download-whatsapp.jpg" },
  { name: "LinkedIn", url: "https://www.linkedin.com", icon: "https://img.utdstc.com/icon/1ce/63c/1ce63cbbb88df4a4beda4536aa387ff7616ff9b4972d11134903d57398d4bd7e:200" },
  { name: "YouTube", url: "https://www.youtube.com", icon: "https://img.utdstc.com/icon/367/c07/367c07a62d78fa7d0253ec501c789b8251ac8fb62e2d0185ed38c9417af1bed0:200" },
  { name: "Instagram", url: "https://www.instagram.com", icon: "https://img.utdstc.com/icon/847/f33/847f33af27bea889ccaa9b1d25135b42ff5bb590297182d0983afb7304d96884:200" },
  { name: "Facebook", url: "https://www.facebook.com", icon: "https://img.utdstc.com/icon/1b4/fca/1b4fca156c1b0ecaa72a636dffbb7611e22f4ee93a076306e367733181746752:200" },
  { name: "Twitter", url: "https://www.twitter.com", icon: "https://img.utdstc.com/icon/214/6a9/2146a9129bd9efb14667937bc7f8dc216c095c2a18214c8bb1031dd11e8dcce0:200" },

];

const ToolSlider: React.FC = () => {
  return (
    <div className="py-12 overflow-hidden relative bg-slate-50 border-y border-slate-100">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
      <div className="marquee-container gap-8">
        {[...TOOLS, ...TOOLS].map((tool, idx) => (
          <a
            key={idx}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-6 group min-w-max no-underline flex-shrink-0 mx-10"
          >
            <div className="w-20 h-20 glass-card rounded-[2rem] flex items-center justify-center p-4 group-hover:scale-110 group-hover:bg-white transition-all duration-500 bg-white shadow-xl shadow-lime-400/5 relative overflow-hidden">
               <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-200 group-hover:text-lime-500 transition-all duration-500 tracking-tighter uppercase italic leading-none">{tool.name}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 mt-1">
                <span className="text-[9px] font-black text-lime-600 uppercase tracking-[0.2em]">Open Tool</span>
                <ExternalLink size={10} className="text-lime-600" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  const reset = () => setPosition({ x: 0, y: 0 });
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset} animate={{ x: position.x, y: position.y }} transition={{ type: "spring", stiffness: 150, damping: 15 }} className={className} onClick={onClick}>
      {children}
    </motion.div>
  );
};

const SkillCard = ({ cat, index }: { cat: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const IconComponent = useMemo(() => {
    if (cat.title.includes('Strategies')) return Target;
    if (cat.title.includes('Design')) return Palette;
    if (cat.title.includes('Video')) return Video;
    if (cat.title.includes('Marketing')) return BarChart3;
    if (cat.title.includes('Scheduling')) return Calendar;
    return Cpu;
  }, [cat.title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full perspective-1000"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-sky-400 rounded-[3.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700"></div>
      
      <div className="relative h-full bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] group-hover:shadow-[0_40px_80px_-20px_rgba(163,230,53,0.2)] transition-all duration-500 flex flex-col p-10 md:p-12">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <div className="flex justify-between items-center mb-10" style={{ transform: "translateZ(50px)" }}>
          <div className="w-16 h-16 parrot-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-lime-400/30 group-hover:rotate-12 transition-all duration-700">
            <IconComponent className="text-lime-950" size={32} />
          </div>
          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">0{index + 1} // STACK</div>
        </div>

        <div style={{ transform: "translateZ(70px)" }}>
          <h3 className="text-4xl font-black mb-10 leading-none tracking-tighter uppercase italic text-slate-900 group-hover:text-lime-600 transition-colors">
            {cat.title.split(' ')[0]} <br />
            <span className="text-slate-200 group-hover:text-lime-100 transition-colors">{cat.title.split(' ').slice(1).join(' ')}</span>
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(40px)" }}>
          {cat.skills.map((skill: string, si: number) => (
            <div key={si} className="group/skill flex items-center gap-2.5 px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-lime-300 hover:shadow-xl hover:shadow-lime-400/5 transition-all duration-300">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-lime-400 rounded-full animate-ping opacity-40"></div>
                <div className="relative w-2 h-2 bg-lime-500 rounded-full"></div>
              </div>
              <span className="text-[10.5px] font-black uppercase tracking-widest text-slate-500 group-hover/skill:text-slate-900">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Strategy', id: 'strategy' },
    { name: 'Expertise', id: 'expertise' },
    { name: 'Experience', id: 'projects' },
    { name: 'Connect', id: 'connect' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white text-slate-900 selection:bg-lime-200">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-lime-100/15 blur-[180px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-sky-100/15 blur-[180px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#84cc16 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] h-24 flex items-center justify-center px-6">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-7xl glass-card rounded-[2.5rem] h-16 px-10 flex items-center justify-between border-white/50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 parrot-gradient rounded-xl rotate-6 flex items-center justify-center font-black text-slate-900 shadow-lg shadow-lime-400/20">AG</div>
            <span className="font-extrabold tracking-tighter text-2xl uppercase italic">Visionary<span className="text-lime-500">.</span></span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)} className="hover:text-lime-600 transition-colors relative group">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-lime-400 rounded-full transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <MagneticButton>
              <a href="#connect" onClick={(e) => handleNavClick(e, 'connect')} className="px-8 py-3 bg-slate-900 text-lime-400 text-[10px] font-black rounded-full hover:scale-105 transition-all uppercase tracking-[0.1em] shadow-2xl shadow-slate-900/20">Hire Me</a>
            </MagneticButton>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-slate-900 p-2"><Menu size={24} /></button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-12 px-6 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="lg:col-span-7 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-lime-100 border border-lime-200 rounded-full text-lime-700 text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-sm">
              <Zap size={14} fill="currentColor" />
              SMM Strategy & Automation Specialist
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.7] tracking-tighter mb-14 text-slate-900 uppercase italic">
              DIGITAL <br />
              <span className="parrot-text-gradient">GROWTH</span><br />
              ENGINE.
            </h1>
            <p className="text-2xl text-slate-500 max-w-xl font-semibold leading-tight mb-16 opacity-80">
              Pioneering high-frequency content ecosystems through LinkedIn automation, Canva Pro artistry, and multi-channel campaign dominance.
            </p>
            <div className="flex flex-wrap gap-8">
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="px-14 py-8 bg-lime-400 text-slate-900 rounded-[3rem] font-black text-2xl shadow-[0_20px_50px_rgba(163,230,53,0.4)] hover:bg-lime-300 hover:-translate-y-2 transition-all flex items-center gap-5 group">
                EXPLORE WORK
                <ArrowUpRight size={32} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <div className="flex items-center gap-5">
                <a href={`https://${RESUME_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-[2rem] border-2 border-slate-100 flex items-center justify-center hover:bg-lime-400 hover:border-lime-400 transition-all cursor-pointer shadow-sm"><Linkedin size={28} /></a>
                <a href={`mailto:${RESUME_DATA.contact.email}`} className="w-16 h-16 rounded-[2rem] border-2 border-slate-100 flex items-center justify-center hover:bg-lime-400 hover:border-lime-400 transition-all cursor-pointer shadow-sm"><Mail size={28} /></a>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="lg:col-span-5 relative">
            <div className="relative z-10 w-full aspect-[4/5] rounded-[7rem] overflow-hidden group shadow-[80px_80px_160px_rgba(163,230,53,0.15)] bg-slate-100">
              <img src="/Image.png" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" alt="Amina Gulzar" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-12 right-12 p-14 glass-card rounded-[5rem] border-lime-200 shadow-3xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-lime-600">ROI Architect</span>
                  <BarChart3 size={28} className="text-lime-600" />
                </div>
                <div className="text-7xl font-black tracking-tighter italic">+150K <span className="text-xl text-slate-400 not-italic uppercase tracking-[0.4em] font-black">Reach</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Slider */}
      <ToolSlider />

      {/* EXPERTISE SECTION */}
      <section id="expertise" className="py-48 bg-[#fcfcfc] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.05),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-40">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-lime-400"></div>
                <span className="text-[12px] font-black uppercase tracking-[0.7em] text-lime-600">PROFESSIONAL ECOSYSTEM</span>
              </div>
              <h2 className="text-8xl md:text-[11.5rem] font-black italic tracking-tighter uppercase leading-[0.7] mb-8">
                EXPERT <br />
                <span className="parrot-text-gradient">TOOLKIT.</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-md">
              <p className="text-3xl text-slate-400 font-bold uppercase tracking-tighter leading-none italic mb-10">
                A multi-layered stack for high-frequency digital expansion.
              </p>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100"></div>)}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">+5 Years Expertise</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {RESUME_DATA.skills.map((cat, idx) => (
              <SkillCard key={idx} cat={cat} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Pathway / Career */}
      <section id="projects" className="py-48 px-6 max-w-7xl mx-auto">
        <h2 className="text-8xl md:text-[10rem] font-black mb-32 italic tracking-tighter uppercase leading-[0.8]">CAREER.</h2>
        <div className="space-y-12">
          {RESUME_DATA.experiences.map((exp, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="group grid grid-cols-1 lg:grid-cols-12 gap-16 p-20 glass-card rounded-[6rem] hover:border-lime-400 transition-all border-slate-100 duration-700">
              <div className="lg:col-span-3">
                <div className="text-4xl font-black text-lime-600 mb-6 italic tracking-tighter uppercase leading-none">{exp.period}</div>
                <div className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300">{exp.location || 'Remote Base'}</div>
              </div>
              <div className="lg:col-span-9">
                <div className="mb-14">
                  <h3 className="text-6xl font-black mb-4 italic tracking-tighter uppercase leading-none">{exp.role}</h3>
                  <div className="text-3xl font-bold text-slate-400 italic">@ {exp.company}</div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-6 text-slate-500 text-xl font-semibold leading-relaxed group-hover:text-slate-800 transition-colors">
                      <div className="w-4 h-4 bg-lime-400 rounded-full mt-2.5 flex-shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.8)]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="connect" className="py-48 px-6">
        <div className="max-w-7xl mx-auto parrot-gradient rounded-[7rem] p-20 md:p-32 shadow-[0_100px_200px_rgba(163,230,53,0.25)] grid grid-cols-1 lg:grid-cols-2 gap-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-10 rotate-12 group-hover:rotate-[120deg] transition-transform duration-[3000ms]">
            <Send size={600} strokeWidth={0.3} />
          </div>
          <div className="relative z-10">
            <h2 className="text-8xl md:text-[10rem] font-black leading-[0.8] tracking-tighter mb-24 text-lime-950 uppercase italic">LET'S <br />GROW.</h2>
            <p className="text-4xl text-lime-900 font-bold mb-28 max-w-md italic leading-tight">
              Amina Gulzar is currently securing brand partnerships. Reach out to deploy.
            </p>
            <div className="space-y-14">
              <a href={`mailto:${RESUME_DATA.contact.email}`} className="flex items-center gap-10 group no-underline">
                <div className="w-28 h-28 rounded-[3rem] bg-lime-950 text-lime-400 flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-4xl"><Mail size={52} /></div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.6em] text-lime-900 mb-4">Official Channel</div>
                  <div className="text-4xl font-black text-lime-950 italic tracking-tight underline decoration-lime-900/30 underline-offset-8 group-hover:decoration-lime-950 transition-all duration-500">{RESUME_DATA.contact.email}</div>
                </div>
              </a>
              <a href={`https://${RESUME_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-10 group no-underline">
                <div className="w-28 h-28 rounded-[3rem] bg-lime-950 text-lime-400 flex items-center justify-center group-hover:scale-110 transition-all duration-700 shadow-4xl"><Linkedin size={52} /></div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.6em] text-lime-900 mb-4">Professional Network</div>
                  <div className="text-4xl font-black text-lime-950 italic tracking-tight">View Profile</div>
                </div>
              </a>
            </div>
          </div>
          {/* <div className="bg-white/95 backdrop-blur-3xl p-24 rounded-[6rem] shadow-[0_60px_120px_rgba(0,0,0,0.12)] relative z-10 border border-white">
            <h3 className="text-5xl font-black mb-20 italic uppercase tracking-tighter leading-none">STRATEGY BRIEF</h3>
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-5">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Full Entity Name</label>
                <input type="text" placeholder="Organization / Personal Brand" className="w-full bg-slate-50 border-none rounded-[2.5rem] p-9 focus:ring-4 focus:ring-lime-400 outline-none text-slate-900 font-bold text-2xl transition-all" />
              </div>
              <div className="space-y-5">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Growth Metrics Desired</label>
                <textarea rows={4} placeholder="Describe your expansion goals..." className="w-full bg-slate-50 border-none rounded-[2.5rem] p-9 focus:ring-4 focus:ring-lime-400 outline-none text-slate-900 font-bold text-2xl transition-all"></textarea>
              </div>
              <button className="w-full py-12 bg-slate-900 text-lime-400 rounded-[3rem] font-black text-3xl hover:scale-[1.04] transition-all shadow-4xl shadow-slate-900/30 active:scale-95 uppercase italic tracking-tighter">INITIATE DEPLOYMENT</button>
            </form>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 border-t border-slate-100">
        <div className="text-7xl font-black italic tracking-tighter uppercase leading-none">AG<span className="text-lime-500">.</span>G</div>
        <div className="flex gap-16 text-[11px] font-black uppercase tracking-[0.6em] text-slate-300">
           <a href={`https://${RESUME_DATA.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-lime-600 transition-colors duration-500">LinkedIn</a>
           <a href="#" className="hover:text-lime-600 transition-colors duration-500">Instagram</a>
        </div>
        <div className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-300 text-center">© 2025 AMINA GULZAR</div>
      </footer>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 z-[200] bg-white p-16 flex flex-col justify-center items-center gap-20">
            <button className="absolute top-16 right-16 text-slate-900 p-6 active:scale-75 transition-all" onClick={() => setIsMenuOpen(false)}><X size={64} /></button>
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => handleNavClick(e, item.id)} className="text-8xl font-black text-slate-900 hover:text-lime-500 transition-all uppercase italic tracking-tighter leading-none">{item.name}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
