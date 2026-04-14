import { useState, useEffect, useRef, useCallback } from "react";

// ─── Animated Ocean Background ───
const OceanBackground = () => (
  <div style={{position:'fixed',inset:0,zIndex:0,overflow:'hidden',pointerEvents:'none'}}>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 20%, #0a1628 0%, #050d1a 40%, #020810 100%)'}}/>
    {[...Array(5)].map((_,i)=>(
      <div key={i} style={{
        position:'absolute', bottom: `${-20 + i*8}%`, left:'-10%', width:'120%',
        height: `${180 + i*40}px`, opacity: 0.03 + i*0.008,
        background: `linear-gradient(180deg, transparent, rgba(${20+i*10},${100+i*20},${180+i*15},0.15), transparent)`,
        borderRadius:'45%', animation:`wave ${12+i*3}s ease-in-out infinite alternate`,
        animationDelay:`${i*-2}s`, transformOrigin:'center bottom'
      }}/>
    ))}
    {[...Array(30)].map((_,i)=>(
      <div key={`p${i}`} style={{
        position:'absolute', width: Math.random()*2+1, height: Math.random()*2+1,
        background:'rgba(100,180,255,0.15)', borderRadius:'50%',
        left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
        animation:`float ${8+Math.random()*12}s ease-in-out infinite`,
        animationDelay:`${Math.random()*-10}s`
      }}/>
    ))}
  </div>
);

// ─── Intersection Observer Hook ───
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

// ─── Reveal Wrapper ───
const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ${delay}s cubic-bezier(.16,1,.3,1), transform 0.7s ${delay}s cubic-bezier(.16,1,.3,1)`,
      ...style
    }}>{children}</div>
  );
};

// ─── Sea Creature SVGs ───
const TurtleSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" style={{width:56,height:56}}>
    <ellipse cx="40" cy="44" rx="22" ry="18" fill="#0e6655" opacity="0.9"/>
    <ellipse cx="40" cy="44" rx="16" ry="13" fill="#148f77"/>
    <path d="M32 44 L28 38 Q24 34 20 38 L24 44Z" fill="#0e6655"/>
    <path d="M48 44 L52 38 Q56 34 60 38 L56 44Z" fill="#0e6655"/>
    <path d="M34 56 L30 64 Q32 66 36 62Z" fill="#0e6655"/>
    <path d="M46 56 L50 64 Q48 66 44 62Z" fill="#0e6655"/>
    <circle cx="40" cy="30" r="8" fill="#0e6655"/>
    <circle cx="37" cy="28" r="1.5" fill="#fff"/>
    <circle cx="43" cy="28" r="1.5" fill="#fff"/>
    <line x1="33" y1="40" x2="47" y2="40" stroke="#0a5c47" strokeWidth="1"/>
    <line x1="34" y1="44" x2="46" y2="44" stroke="#0a5c47" strokeWidth="1"/>
    <line x1="35" y1="48" x2="45" y2="48" stroke="#0a5c47" strokeWidth="1"/>
    <line x1="40" y1="32" x2="40" y2="56" stroke="#0a5c47" strokeWidth="1"/>
  </svg>
);

const DolphinSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" style={{width:56,height:56}}>
    <path d="M12 42 Q20 28 40 32 Q56 34 68 42 Q72 46 66 48 Q56 52 40 50 Q24 48 16 46 Q10 45 12 42Z" fill="#2980b9"/>
    <path d="M68 42 L74 36 Q72 40 68 42Z" fill="#2980b9"/>
    <path d="M40 32 L38 22 Q42 24 44 30Z" fill="#2471a3"/>
    <path d="M16 46 L10 50 Q8 46 12 42Z" fill="#2980b9"/>
    <circle cx="20" cy="40" r="2" fill="#fff"/>
    <path d="M12 42 Q20 36 40 38 Q56 40 66 44" fill="none" stroke="#1a6da0" strokeWidth="0.8"/>
  </svg>
);

const SharkSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" style={{width:56,height:56}}>
    <path d="M8 44 Q14 32 36 34 Q54 35 72 44 Q76 48 70 50 Q54 54 36 52 Q18 50 10 47 Q6 46 8 44Z" fill="#5d6d7e"/>
    <path d="M36 34 L34 20 Q38 26 40 34Z" fill="#515a5a"/>
    <path d="M72 44 L78 40 Q76 44 72 44Z" fill="#5d6d7e"/>
    <path d="M10 47 L4 52 Q6 48 8 44Z" fill="#5d6d7e"/>
    <circle cx="16" cy="42" r="2" fill="#1a1a2e" />
    <circle cx="16" cy="42" r="0.8" fill="#c0392b" opacity="0.6"/>
    <path d="M8 44 Q14 38 36 40 Q54 42 70 46" fill="none" stroke="#4a5568" strokeWidth="0.8"/>
    <path d="M4 45 L8 44 L5 47Z" fill="#515a5a"/>
  </svg>
);

const WhaleSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" style={{width:56,height:56}}>
    <ellipse cx="36" cy="44" rx="28" ry="16" fill="#1a5276"/>
    <path d="M64 44 Q72 36 76 28 Q74 38 72 44 Q74 50 76 60 Q72 52 64 44Z" fill="#154360"/>
    <circle cx="18" cy="40" r="2.5" fill="#fff" opacity="0.9"/>
    <circle cx="18" cy="40" r="1" fill="#0a2540"/>
    <path d="M10 48 Q16 52 24 50" fill="none" stroke="#12405a" strokeWidth="1.2"/>
    <path d="M30 28 Q28 20 32 22 Q34 24 32 28" fill="#1a5276" opacity="0.5"/>
    <path d="M36 28 Q34 18 38 20 Q40 22 38 28" fill="#1a5276" opacity="0.5"/>
    <path d="M8 44 Q20 36 36 38 Q52 40 64 44" fill="none" stroke="#12405a" strokeWidth="0.8"/>
  </svg>
);

// ─── Icon Components ───
const CheckIcon = () => <svg viewBox="0 0 20 20" fill="currentColor" style={{width:16,height:16,flexShrink:0}}><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"/></svg>;
const ArrowIcon = () => <svg viewBox="0 0 20 20" fill="currentColor" style={{width:18,height:18}}><path fillRule="evenodd" d="M10.3 3.3a1 1 0 011.4 0l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4-1.4L14.6 11H3a1 1 0 010-2h11.6l-4.3-4.3a1 1 0 010-1.4z"/></svg>;

const EngineIcon = ({icon}) => {
  const icons = {
    social: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round"/>,
    blog: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></>,
    press: <><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6z"/></>,
    gmb: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    ai: <><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>,
    seo: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
    rep: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    kpi: <><path d="M18 20V10M12 20V4M6 20v-6"/></>
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{width:28,height:28,color:'#3498db'}}>
      {icons[icon]}
    </svg>
  );
};

// ─── Pricing Tiers ───
const tiers = [
  { name:'Sea Turtle', icon:<TurtleSVG/>, tier:'Tier 1', tagline:'Entry Visibility', price:'$97', setup:'$297', period:'/mo', label:'SELF-GUIDED', best:false,
    features:['Monthly AI visibility report across ChatGPT, Gemini, Grok & Google AI','Step-by-step fix guide with prioritized action items','Citation tracking — see where you\'re cited and where you\'re missing','Competitor snapshot comparing your AI visibility','Platform coverage across all major AI engines','Delivered to your inbox every 30 days'] },
  { name:'Dolphin', icon:<DolphinSVG/>, tier:'Tier 2', tagline:'Citation Authority', price:'$497', setup:'$1,497', period:'/mo', label:'DONE-FOR-YOU', best:false,
    features:['Everything in Sea Turtle, plus:','Active AI citation campaigns across all major platforms','90-day measurable visibility goal','Citation monitoring and month-over-month tracking','AI-optimized content crafted to earn citations','Continuous citation building — every month'] },
  { name:'Shark', icon:<SharkSVG/>, tier:'Tier 3', tagline:'Strategy & Execution', price:'$997', setup:'$2,997', period:'/mo', label:'★ BEST VALUE', best:true,
    features:['Everything in Dolphin, plus:','Complete AI roadmap & blueprint — fully mapped','Full implementation — we execute every step','Website updates & AI-ready content optimization','Visibility across every major AI search platform','Custom strategy built for your market and goals','60–90 day path to measurable AI citation improvements'] },
  { name:'Whale', icon:<WhaleSVG/>, tier:'Tier 4', tagline:'Complete Domination', price:'$2,997', setup:'$4,997', period:'/mo', label:'WHITE GLOVE', best:false,
    features:['Everything in Shark, plus:','Full AI citation campaigns at scale','Complete website optimization for AI search','Full Google My Business optimization','Articles, press releases & authority content at full scale','Become THE AI-recommended choice in 30–90 days','Priority white-glove execution','Quarterly strategy refresh with on-call access'] }
];

// ─── 8 Engines Data ───
const engines = [
  { icon:'social', name:'Social Media Engine', desc:'30–45 branded posts/mo across LinkedIn, Facebook, Instagram & X' },
  { icon:'blog', name:'Blog & Content Engine', desc:'Long-form authority articles & pillar pages built to earn AI citations' },
  { icon:'press', name:'Press Release Engine', desc:'AP-style distribution across 400+ outlets with AI-pickup syndication' },
  { icon:'gmb', name:'GMB Engine', desc:'Google Business Profile optimization & AI-ready response frameworks' },
  { icon:'ai', name:'AI Authority Engine', desc:'Entity building so ChatGPT, Grok & Gemini cite you by name' },
  { icon:'seo', name:'SEO Engine', desc:'Meta architecture & technical SEO for traditional + AI search' },
  { icon:'rep', name:'Reputation Engine', desc:'Review automation, monitoring, mitigation & sentiment recovery' },
  { icon:'kpi', name:'KPI Engine', desc:'Executive narrative reports, visibility scores & ROI storytelling' }
];

// ─── Main App ───
export default function BluOceanSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name:'', email:'', company:'', phone:'', message:'' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navLinks = [
    {label:'Problem', id:'problem'}, {label:'Strategy', id:'strategy'}, {label:'Engines', id:'engines'},
    {label:'Pricing', id:'pricing'}, {label:'Contact', id:'contact'}
  ];

  const faqs = [
    { q:'How quickly will I see results?', a:'Most clients achieve full AI citation presence across major platforms within 60–90 days of activation. The Sea Turtle tier provides immediate visibility insights, while Shark and Whale tiers include active execution for faster results.' },
    { q:'What makes this different from traditional SEO?', a:'Traditional SEO optimizes for Google\'s link-based algorithm. Our system optimizes for how AI models like ChatGPT, Gemini, and Grok select and cite sources. These are fundamentally different systems requiring different strategies — entity building, structured authority signals, and citation-optimized content.' },
    { q:'Do I need to create content myself?', a:'Only on the Sea Turtle tier, which provides a self-guided fix plan. Dolphin tier and above are fully done-for-you — we handle all content creation, optimization, and distribution.' },
    { q:'What AI platforms do you cover?', a:'We build visibility across ChatGPT (OpenAI), Google Gemini, Google AI Overviews, Grok (xAI), Perplexity, and all major AI-assisted search and discovery platforms — plus emerging ones as they launch.' },
    { q:'How does this replace my current marketing stack?', a:'Most businesses pay $13,000–$42,000/month across separate SEO agencies, social media managers, content writers, PR firms, reputation tools, and GMB services. Our unified system runs all 8 engines in concert from a single platform, eliminating vendor fragmentation while adding AI-native strategy that no traditional stack includes.' },
    { q:'Can I upgrade my tier later?', a:'Absolutely. Your citation history and authority signals carry forward. Many clients start with Dolphin or Shark and upgrade to Whale as they see compounding results.' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { font-family: 'DM Sans', sans-serif; background: #050d1a; color: #c8d8e8; overflow-x: hidden; }

        @keyframes wave {
          0% { transform: translateX(-4%) rotate(-1deg); }
          100% { transform: translateX(4%) rotate(1deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.3); opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(52,152,219,0.2), 0 0 60px rgba(52,152,219,0.05); }
          50% { box-shadow: 0 0 30px rgba(52,152,219,0.35), 0 0 80px rgba(52,152,219,0.1); }
        }
        @keyframes bubbleRise {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }

        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.4s ease; }
        .nav-scrolled { background: rgba(5,13,26,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(52,152,219,0.1); }

        .section { position: relative; z-index: 1; padding: 120px 24px; max-width: 1280px; margin: 0 auto; }
        .section-sm { padding: 80px 24px; }

        .h-display {
          font-family: 'Outfit', sans-serif; font-weight: 800; line-height: 1.05;
          background: linear-gradient(135deg, #fff 0%, #a8d4f0 50%, #3498db 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .h-section {
          font-family: 'Outfit', sans-serif; font-weight: 700; line-height: 1.15;
          color: #e8f4ff;
        }
        .label-tag {
          font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 13px;
          letter-spacing: 2.5px; text-transform: uppercase; color: #3498db;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px; font-family: 'Outfit', sans-serif; font-weight: 600;
          font-size: 16px; color: #fff; border: none; cursor: pointer;
          background: linear-gradient(135deg, #1a6eb5 0%, #2980b9 50%, #1abc9c 100%);
          border-radius: 12px; text-decoration: none; transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(26,188,156,0.2), 0 0 0 0 rgba(26,188,156,0);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(26,188,156,0.3), 0 0 0 4px rgba(26,188,156,0.1); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 32px; font-family: 'Outfit', sans-serif; font-weight: 600;
          font-size: 15px; color: #a8d4f0; background: transparent;
          border: 1.5px solid rgba(52,152,219,0.3); border-radius: 12px;
          cursor: pointer; text-decoration: none; transition: all 0.3s ease;
        }
        .btn-outline:hover { border-color: #3498db; color: #fff; background: rgba(52,152,219,0.08); }

        .card {
          background: linear-gradient(145deg, rgba(10,22,40,0.8), rgba(8,18,35,0.9));
          border: 1px solid rgba(52,152,219,0.08); border-radius: 20px;
          padding: 40px; transition: all 0.4s ease;
        }
        .card:hover { border-color: rgba(52,152,219,0.2); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }

        .pricing-card {
          background: linear-gradient(170deg, rgba(10,22,40,0.9) 0%, rgba(5,13,26,0.95) 100%);
          border: 1px solid rgba(52,152,219,0.1); border-radius: 24px;
          padding: 40px 32px; position: relative; overflow: hidden; transition: all 0.4s ease;
        }
        .pricing-card:hover { border-color: rgba(52,152,219,0.25); transform: translateY(-6px); box-shadow: 0 24px 80px rgba(0,0,0,0.35); }
        .pricing-best { border-color: rgba(26,188,156,0.3); animation: pulseGlow 4s ease-in-out infinite; }
        .pricing-best::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #1abc9c, #3498db, #1abc9c);
        }

        .engine-card {
          background: rgba(10,22,40,0.6); border: 1px solid rgba(52,152,219,0.06);
          border-radius: 16px; padding: 28px; transition: all 0.3s ease;
          display: flex; gap: 20px; align-items: flex-start;
        }
        .engine-card:hover { background: rgba(15,30,55,0.7); border-color: rgba(52,152,219,0.15); }

        .faq-item {
          border-bottom: 1px solid rgba(52,152,219,0.08); overflow: hidden;
        }
        .faq-q {
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 0; cursor: pointer; font-family: 'Outfit', sans-serif;
          font-weight: 600; font-size: 18px; color: #e0ecf5; transition: color 0.3s;
          background: none; border: none; width: 100%; text-align: left;
        }
        .faq-q:hover { color: #3498db; }

        .input-field {
          width: 100%; padding: 16px 20px; font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: #e0ecf5; background: rgba(10,22,40,0.7);
          border: 1px solid rgba(52,152,219,0.12); border-radius: 12px;
          outline: none; transition: all 0.3s;
        }
        .input-field:focus { border-color: #3498db; box-shadow: 0 0 0 3px rgba(52,152,219,0.1); }
        .input-field::placeholder { color: rgba(168,212,240,0.3); }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 8px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: #a8d4f0; margin: 5px 0; transition: all 0.3s; border-radius: 2px; }

        @media (max-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hamburger { display: block; }
          .nav-links { display: none; }
          .nav-links.open {
            display: flex; flex-direction: column; position: absolute;
            top: 100%; left: 0; right: 0; padding: 24px;
            background: rgba(5,13,26,0.97); backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(52,152,219,0.1);
          }
          .section { padding: 80px 20px; }
          .hero-heading { font-size: 42px !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .engine-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .hero-heading { font-size: 32px !important; }
          .section { padding: 64px 16px; }
        }
      `}</style>

      <OceanBackground />

      {/* ═══ JSON-LD Structured Data for AI Visibility ═══ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Blu Ocean Innovations",
        "alternateName": "Blu Ocean AI",
        "url": "https://bluocean.ai",
        "description": "Blu Ocean Innovations is an AI-first digital authority agency that controls what the internet and AI say about your business. Specializing in AI visibility, AI citation building, and digital authority infrastructure across ChatGPT, Google Gemini, Grok, and all major AI platforms.",
        "slogan": "Own the AI Conversation",
        "knowsAbout": ["AI Visibility","AI Citation Building","AI Search Optimization","Digital Authority","AI-First Marketing","Entity Building for AI","ChatGPT Optimization","Google Gemini Optimization","Grok Optimization","AI Overviews Optimization","SEO","Reputation Management","Content Marketing","Press Release Distribution","Social Media Marketing","Google Business Profile Optimization"],
        "serviceType": ["AI Visibility Consulting","AI Citation Campaigns","Digital Authority Building","AI Search Optimization","SEO Services","Content Marketing","Reputation Management","Press Release Distribution","Social Media Management","Google Business Profile Optimization"],
        "areaServed": {"@type":"Country","name":"United States"},
        "priceRange": "$97 - $2,997/month",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "AI Visibility & Authority Plans",
          "itemListElement": [
            {"@type":"Offer","name":"Sea Turtle – Entry Visibility","price":"97","priceCurrency":"USD","description":"Monthly AI visibility report, step-by-step fix guide, citation tracking, and competitor snapshot across all major AI platforms."},
            {"@type":"Offer","name":"Dolphin – Citation Authority","price":"497","priceCurrency":"USD","description":"Active AI citation campaigns, 90-day visibility goals, citation monitoring, and AI-optimized content creation."},
            {"@type":"Offer","name":"Shark – Strategy & Execution","price":"997","priceCurrency":"USD","description":"Complete AI roadmap, full implementation, website optimization, and custom strategy with 60-90 day results path."},
            {"@type":"Offer","name":"Whale – Complete Domination","price":"2997","priceCurrency":"USD","description":"Full-scale AI citation campaigns, complete website optimization, GMB optimization, content at scale, and white-glove quarterly strategy."}
          ]
        },
        "sameAs": ["https://bluoceaninnovations.com"]
      })}}/>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"FAQPage",
        "mainEntity": faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))
      })}}/>

      {/* ═══ Navigation ═══ */}
      <nav className={`nav ${scrollY > 60 ? 'nav-scrolled' : ''}`}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="#" onClick={(e) => {e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'})}} style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
            <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,#1a6eb5,#1abc9c)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg viewBox="0 0 24 24" fill="none" style={{width:22,height:22}}>
                <path d="M4 16c2-3 6-5 8-3s4 1 8-3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M4 12c2-3 6-5 8-3s4 1 8-3" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{fontFamily:'Outfit',fontWeight:700,fontSize:20,color:'#fff',letterSpacing:'-0.5px'}}>Blu Ocean</span>
          </a>
          <div className="nav-links" style={{display:'flex',alignItems:'center',gap:8}}>
            {navLinks.map(l => (
              <button key={l.id} onClick={()=>scrollTo(l.id)} style={{
                background:'none',border:'none',padding:'8px 16px',fontFamily:'DM Sans',
                fontSize:14,fontWeight:500,color:'#8ba8c4',cursor:'pointer',transition:'color 0.3s',borderRadius:8
              }} onMouseEnter={e=>e.target.style.color='#e0ecf5'} onMouseLeave={e=>e.target.style.color='#8ba8c4'}>
                {l.label}
              </button>
            ))}
            <button onClick={()=>scrollTo('contact')} className="btn-primary" style={{padding:'10px 24px',fontSize:14,marginLeft:8}}>
              Book Discovery Call
            </button>
          </div>
          <button className="hamburger" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span style={{transform:menuOpen?'rotate(45deg) translate(5px,5px)':''}}/>
            <span style={{opacity:menuOpen?0:1}}/>
            <span style={{transform:menuOpen?'rotate(-45deg) translate(5px,-5px)':''}}/>
          </button>
        </div>
        {menuOpen && (
          <div className="nav-links open">
            {navLinks.map(l => (
              <button key={l.id} onClick={()=>scrollTo(l.id)} style={{
                background:'none',border:'none',padding:'12px 0',fontFamily:'DM Sans',
                fontSize:16,color:'#a8d4f0',cursor:'pointer',textAlign:'left'
              }}>{l.label}</button>
            ))}
            <button onClick={()=>scrollTo('contact')} className="btn-primary" style={{marginTop:12,justifyContent:'center'}}>
              Book Discovery Call
            </button>
          </div>
        )}
      </nav>

      {/* ═══ Hero Section ═══ */}
      <header style={{position:'relative',zIndex:1,minHeight:'100vh',display:'flex',alignItems:'center'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'140px 24px 120px',width:'100%'}}>
          <Reveal>
            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:32}}>
              {['AI-FIRST','AUTHORITY-DRIVEN','RESULTS-PROVEN'].map((t,i)=>(
                <span key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                  {i>0 && <span style={{width:4,height:4,borderRadius:'50%',background:'#3498db',opacity:0.5}}/>}
                  <span className="label-tag">{t}</span>
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display hero-heading" style={{fontSize:72,maxWidth:800,marginBottom:28}}>
              Own the AI<br/>Conversation.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:20,lineHeight:1.7,maxWidth:620,color:'#8ba8c4',marginBottom:48}}>
              We don't do marketing. We control what the internet and AI say about your business — across every platform, every search, every conversation your customers are having right now.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
              <button onClick={()=>scrollTo('contact')} className="btn-primary" style={{fontSize:17,padding:'18px 40px'}}>
                Book Your Discovery Call <ArrowIcon/>
              </button>
              <button onClick={()=>scrollTo('pricing')} className="btn-outline">
                View Tier Pricing
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="stats-row" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:40,marginTop:80,paddingTop:48,borderTop:'1px solid rgba(52,152,219,0.08)'}}>
              {[
                {n:'8',l:'Synchronized Engines'},
                {n:'60–90',l:'Days to Citation Presence'},
                {n:'400+',l:'PR Outlet Distribution'},
                {n:'24/7',l:'Always-On Authority Building'}
              ].map((s,i)=>(
                <div key={i}>
                  <div style={{fontFamily:'Outfit',fontWeight:800,fontSize:36,color:'#fff',lineHeight:1,marginBottom:8,
                    background:'linear-gradient(135deg,#fff,#3498db)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{s.n}</div>
                  <div style={{fontSize:14,color:'#6b8eaa',fontWeight:500}}>{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      {/* ═══ Problem / Solution Section ═══ */}
      <section id="problem" className="section">
        <Reveal>
          <span className="label-tag" style={{display:'block',marginBottom:16}}>THE LANDSCAPE HAS CHANGED</span>
          <h2 className="h-section" style={{fontSize:48,maxWidth:700,marginBottom:24}}>The Reality Check</h2>
          <p style={{fontSize:18,color:'#7a9ab8',maxWidth:700,marginBottom:64,lineHeight:1.7}}>
            Every day your business is absent from AI-driven search, qualified buyers are being handed to your competitors at the moment trust is formed.
          </p>
        </Reveal>
        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
          <Reveal delay={0.1}>
            <div className="card" style={{borderColor:'rgba(231,76,60,0.15)',height:'100%'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
                <div style={{width:36,height:36,borderRadius:10,background:'rgba(231,76,60,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{color:'#e74c3c',fontSize:18,fontWeight:700}}>⚠</span>
                </div>
                <span style={{fontFamily:'Outfit',fontWeight:700,fontSize:18,color:'#e74c3c'}}>THE PROBLEM</span>
              </div>
              {[
                'Google AI Overviews, ChatGPT, Gemini, and Grok are now the first touch-point for high-intent buyers',
                'If you are not cited, referenced, or recommended — you are invisible at the exact moment trust is formed',
                'AI-assisted discovery is reshaping how buyers evaluate options',
                'Without AI citation, visibility drops quietly and consistently',
                'Competitors are already positioning for this next era'
              ].map((t,i) => (
                <div key={i} style={{display:'flex',gap:12,marginBottom:16,alignItems:'flex-start'}}>
                  <span style={{color:'#e74c3c',marginTop:2,fontSize:14,flexShrink:0}}>×</span>
                  <span style={{fontSize:15,lineHeight:1.6,color:'#8ba8c4'}}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="card" style={{borderColor:'rgba(26,188,156,0.15)',height:'100%'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
                <div style={{width:36,height:36,borderRadius:10,background:'rgba(26,188,156,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <span style={{color:'#1abc9c',fontSize:18}}>✓</span>
                </div>
                <span style={{fontFamily:'Outfit',fontWeight:700,fontSize:18,color:'#1abc9c'}}>THE SOLUTION</span>
              </div>
              {[
                'The AI Visibility & Authority System builds a digital presence AI systems recognize as credible and authoritative',
                'Trusted across Google, ChatGPT, Gemini, Grok & emerging platforms',
                'Structured to increase citation, recognition, and authority signals',
                'Positioned to make your business the clear choice in your niche',
                'A permanent authority infrastructure — not a campaign'
              ].map((t,i) => (
                <div key={i} style={{display:'flex',gap:12,marginBottom:16,alignItems:'flex-start'}}>
                  <span style={{color:'#1abc9c',marginTop:1}}><CheckIcon/></span>
                  <span style={{fontSize:15,lineHeight:1.6,color:'#8ba8c4'}}>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ The Tide Strategy ═══ */}
      <section id="strategy" className="section">
        <Reveal>
          <span className="label-tag" style={{display:'block',marginBottom:16}}>THREE PHASES — ONE OCEAN</span>
          <h2 className="h-section" style={{fontSize:48,maxWidth:700,marginBottom:24}}>The Tide Strategy</h2>
          <p style={{fontSize:18,color:'#7a9ab8',maxWidth:700,marginBottom:64,lineHeight:1.7}}>
            A permanent authority infrastructure that builds, compounds, and becomes more dominant with every passing month.
          </p>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:24}} className="two-col">
          {[
            { num:'01', phase:'Discovery & Mapping', title:'Chart the Waters', color:'#3498db',
              desc:'A structured diagnostic of your brand, market position, and citation landscape. We chart exactly where your authority stands, where the gaps are, and where the highest-value opportunities live.',
              tags:['Authority baseline','Competitive gap analysis','AI visibility audit'] },
            { num:'02', phase:'Activation & Flow', title:'Ride the Current', color:'#1abc9c',
              desc:'Activate your full visibility system across every channel that matters. Content, profile signals, press, and earned credibility — all flowing in concert so AI platforms confidently cite you by name.',
              tags:['8-engine activation','Content deployment','Signal alignment'] },
            { num:'03', phase:'Expansion & Domination', title:'Command the Ocean', color:'#9b59b6',
              desc:'Authority compounds month over month, citation by citation, until you are not just visible — you are the answer. Your position becomes increasingly difficult for any competitor to displace.',
              tags:['Compounding authority','Citation dominance','Market ownership'] }
          ].map((p,i) => (
            <Reveal key={i} delay={i*0.12}>
              <div className="card" style={{height:'100%',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-20,right:-10,fontFamily:'Outfit',fontWeight:900,fontSize:120,color:p.color,opacity:0.04,lineHeight:1}}>{p.num}</div>
                <div style={{fontFamily:'Outfit',fontWeight:800,fontSize:48,color:p.color,opacity:0.3,marginBottom:12}}>{p.num}</div>
                <div style={{fontFamily:'Outfit',fontWeight:600,fontSize:12,letterSpacing:2,textTransform:'uppercase',color:p.color,marginBottom:8}}>{p.phase}</div>
                <h3 style={{fontFamily:'Outfit',fontWeight:700,fontSize:24,color:'#e8f4ff',marginBottom:16}}>{p.title}</h3>
                <p style={{fontSize:15,lineHeight:1.7,color:'#7a9ab8',marginBottom:24}}>{p.desc}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {p.tags.map((t,j)=>(
                    <span key={j} style={{fontSize:12,padding:'6px 12px',borderRadius:20,background:`rgba(${p.color==='#3498db'?'52,152,219':p.color==='#1abc9c'?'26,188,156':'155,89,182'},0.1)`,color:p.color,fontWeight:500}}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div style={{marginTop:40,padding:'20px 28px',borderRadius:14,background:'rgba(26,188,156,0.06)',border:'1px solid rgba(26,188,156,0.12)',display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontSize:20}}>⚡</span>
            <span style={{fontSize:15,color:'#8ec6b8'}}>Most clients achieve full AI citation presence across major platforms within <strong style={{color:'#1abc9c'}}>60–90 days</strong> of activation.</span>
          </div>
        </Reveal>
      </section>

      {/* ═══ 8 Engines Section ═══ */}
      <section id="engines" className="section">
        <Reveal>
          <span className="label-tag" style={{display:'block',marginBottom:16}}>POWERED BY 8 ENGINES · RUNNING 24/7</span>
          <h2 className="h-section" style={{fontSize:48,maxWidth:700,marginBottom:24}}>8 Relentless AI Engines</h2>
          <p style={{fontSize:18,color:'#7a9ab8',maxWidth:700,marginBottom:64,lineHeight:1.7}}>
            Every engine synchronized, every channel covered. No agency matches this level of AI-native execution under one roof.
          </p>
        </Reveal>
        <div className="engine-grid" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {engines.map((e,i) => (
            <Reveal key={i} delay={i*0.06}>
              <div className="engine-card">
                <div style={{width:52,height:52,borderRadius:14,background:'rgba(52,152,219,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <EngineIcon icon={e.icon}/>
                </div>
                <div>
                  <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:17,color:'#e0ecf5',marginBottom:6}}>{e.name}</h4>
                  <p style={{fontSize:14,lineHeight:1.6,color:'#7a9ab8'}}>{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ What This Replaces ═══ */}
      <section className="section section-sm">
        <Reveal>
          <div style={{background:'linear-gradient(135deg, rgba(10,22,40,0.9), rgba(15,30,55,0.8))',borderRadius:28,padding:'60px 48px',border:'1px solid rgba(52,152,219,0.08)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,right:0,width:'50%',height:'100%',background:'radial-gradient(ellipse at 80% 50%, rgba(26,188,156,0.04), transparent)',pointerEvents:'none'}}/>
            <span className="label-tag" style={{display:'block',marginBottom:16}}>ONE SYSTEM · ZERO FRAGMENTATION</span>
            <h2 className="h-section" style={{fontSize:36,marginBottom:12}}>What This Replaces</h2>
            <p style={{fontSize:16,color:'#7a9ab8',maxWidth:600,marginBottom:40}}>
              Most businesses pay for a fragmented stack that costs more, delivers less, and has no AI-native strategy.
            </p>
            <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:32,alignItems:'center'}}>
              <div>
                <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#e74c3c',letterSpacing:1,marginBottom:20}}>TRADITIONAL STACK</div>
                <div style={{fontFamily:'Outfit',fontWeight:800,fontSize:28,color:'#e74c3c',marginBottom:24}}>$13,000 – $42,000<span style={{fontSize:14,fontWeight:500,color:'#7a6a6a'}}>/month</span></div>
                {['SEO Agency · $2k–$8k/mo','Social Media Manager · $2.5k–$5k/mo','Content Writer(s) · $1.5k–$4k/mo','PR Firm · $3k–$10k/mo','Reputation Tool · $300–$1.5k/mo','GMB Service · $500–$2k/mo','AI Visibility Consultant · $3k–$10k/mo'].map((t,i)=>(
                  <div key={i} style={{fontSize:14,color:'#6b7a8a',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.03)',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{color:'#e74c3c',fontSize:12}}>×</span> {t}
                  </div>
                ))}
                <p style={{fontSize:13,color:'#6b5a5a',marginTop:16,fontStyle:'italic'}}>Fragmented. Expensive. Hard to coordinate.</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
                <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#1a6eb5,#1abc9c)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit',fontWeight:800,fontSize:16,color:'#fff'}}>VS</div>
              </div>
              <div>
                <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#1abc9c',letterSpacing:1,marginBottom:20}}>BLU OCEAN UNIFIED SYSTEM</div>
                <div style={{fontFamily:'Outfit',fontWeight:800,fontSize:28,color:'#1abc9c',marginBottom:24}}>From $97<span style={{fontSize:14,fontWeight:500,color:'#6b8a7a'}}>/month</span></div>
                {['All 8 engines running in concert','Single point of accountability','AI citation strategy in every deliverable','No vendor management, no gaps','Scales with your ambition'].map((t,i)=>(
                  <div key={i} style={{fontSize:14,color:'#8ec6b8',padding:'8px 0',borderBottom:'1px solid rgba(26,188,156,0.06)',display:'flex',alignItems:'center',gap:8}}>
                    <span style={{color:'#1abc9c'}}><CheckIcon/></span> {t}
                  </div>
                ))}
                <p style={{fontSize:13,color:'#6b8a7a',marginTop:16,fontStyle:'italic'}}>Unified. AI-native. Built for this era.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ Pricing Section ═══ */}
      <section id="pricing" className="section">
        <Reveal>
          <div style={{textAlign:'center',marginBottom:64}}>
            <span className="label-tag" style={{display:'block',marginBottom:16}}>CHOOSE YOUR DEPTH</span>
            <h2 className="h-section" style={{fontSize:48,marginBottom:16}}>Tier Pricing</h2>
            <p style={{fontSize:18,color:'#7a9ab8',maxWidth:600,margin:'0 auto'}}>
              Every tier stands strong on its own. Start where you are, scale as authority compounds.
            </p>
          </div>
        </Reveal>
        <div className="pricing-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20}}>
          {tiers.map((t,i) => (
            <Reveal key={i} delay={i*0.1}>
              <div className={`pricing-card ${t.best?'pricing-best':''}`} style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:20}}>
                  <span style={{fontSize:11,fontFamily:'Outfit',fontWeight:600,letterSpacing:1.5,color:t.best?'#1abc9c':'#5a7a94',textTransform:'uppercase'}}>{t.label}</span>
                  {t.icon}
                </div>
                <h3 style={{fontFamily:'Outfit',fontWeight:800,fontSize:24,color:'#e8f4ff',marginBottom:4}}>{t.name}</h3>
                <p style={{fontSize:13,color:'#5a7a94',marginBottom:20,fontWeight:500}}>{t.tagline}</p>
                <div style={{marginBottom:8}}>
                  <span style={{fontFamily:'Outfit',fontWeight:800,fontSize:40,color:'#fff'}}>{t.price}</span>
                  <span style={{fontSize:15,color:'#5a7a94',fontWeight:500}}>{t.period}</span>
                </div>
                <div style={{fontSize:13,color:'#4a6a84',marginBottom:28}}>{t.setup} setup</div>
                <div style={{flex:1}}>
                  {t.features.map((f,j) => (
                    <div key={j} style={{display:'flex',gap:10,marginBottom:12,alignItems:'flex-start'}}>
                      {f.includes('Everything in') ? (
                        <span style={{fontSize:13,color:'#3498db',fontWeight:600,fontStyle:'italic',lineHeight:1.5}}>{f}</span>
                      ) : (
                        <>
                          <span style={{color:t.best?'#1abc9c':'#3498db',marginTop:2,flexShrink:0}}><CheckIcon/></span>
                          <span style={{fontSize:13,lineHeight:1.5,color:'#7a9ab8'}}>{f}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <button onClick={()=>scrollTo('contact')} className={t.best ? 'btn-primary' : 'btn-outline'} style={{width:'100%',justifyContent:'center',marginTop:28,padding:'14px 24px',fontSize:14}}>
                  {t.best ? 'Get Started' : 'Learn More'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ Add-Ons ═══ */}
      <section className="section section-sm">
        <Reveal>
          <span className="label-tag" style={{display:'block',marginBottom:16}}>ACCELERATE FURTHER</span>
          <h2 className="h-section" style={{fontSize:36,marginBottom:48}}>Stackable Add-Ons</h2>
        </Reveal>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}} className="pricing-grid">
          {[
            {icon:'🎬',name:'Video Content Engine',price:'$2,000–$5,000/mo',desc:'Premium video, scripting, short-form editing, YouTube optimization & multi-platform distribution.'},
            {icon:'📡',name:'PR Blast Packs',price:'$1,000–$3,000/release',desc:'Additional AP-style press releases with 400+ outlet distribution for launches and announcements.'},
            {icon:'💰',name:'Paid Ads Scaling',price:'% of ad spend',desc:'Performance-focused paid media across Google, Meta & LinkedIn aligned with organic authority.'},
            {icon:'🌐',name:'Website Rebuild',price:'$5,000–$15,000',desc:'Strategic rebuild optimized for AI crawlability, Core Web Vitals, structured data & conversion.'}
          ].map((a,i) => (
            <Reveal key={i} delay={i*0.08}>
              <div className="card" style={{padding:28,height:'100%'}}>
                <span style={{fontSize:28,display:'block',marginBottom:16}}>{a.icon}</span>
                <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:16,color:'#e0ecf5',marginBottom:6}}>{a.name}</h4>
                <div style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#3498db',marginBottom:12}}>{a.price}</div>
                <p style={{fontSize:13,lineHeight:1.6,color:'#6b8eaa'}}>{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ How It Works (CTA) ═══ */}
      <section className="section section-sm">
        <Reveal>
          <div style={{textAlign:'center',padding:'80px 40px',borderRadius:28,background:'linear-gradient(135deg, rgba(26,110,181,0.08), rgba(26,188,156,0.06))',border:'1px solid rgba(52,152,219,0.1)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 0%, rgba(52,152,219,0.06), transparent 60%)',pointerEvents:'none'}}/>
            <span className="label-tag" style={{display:'block',marginBottom:16}}>THREE STEPS TO AUTHORITY</span>
            <h2 className="h-section" style={{fontSize:42,marginBottom:48}}>The Tide is Moving.</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:40,maxWidth:800,margin:'0 auto 48px'}} className="two-col">
              {[
                {n:'1',title:'Discovery Call',desc:'15 min to map visibility gaps, AI citation footprint & fastest path to authority.'},
                {n:'2',title:'Live Demo',desc:'See your business profiled and activated in real time. Exactly how the system works.'},
                {n:'3',title:'Activate Same Day',desc:'System goes live immediately. No ramp-up. Just a fast launch into results.'}
              ].map((s,i)=>(
                <div key={i}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#1a6eb5,#1abc9c)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Outfit',fontWeight:800,fontSize:20,color:'#fff',margin:'0 auto 16px'}}>{s.n}</div>
                  <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:18,color:'#e8f4ff',marginBottom:8}}>{s.title}</h4>
                  <p style={{fontSize:14,lineHeight:1.6,color:'#7a9ab8'}}>{s.desc}</p>
                </div>
              ))}
            </div>
            <button onClick={()=>scrollTo('contact')} className="btn-primary" style={{fontSize:17,padding:'18px 44px'}}>
              Book Your Discovery Call <ArrowIcon/>
            </button>
          </div>
        </Reveal>
      </section>

      {/* ═══ FAQ Section ═══ */}
      <section className="section section-sm">
        <Reveal>
          <div style={{maxWidth:760,margin:'0 auto'}}>
            <span className="label-tag" style={{display:'block',marginBottom:16}}>QUESTIONS & ANSWERS</span>
            <h2 className="h-section" style={{fontSize:36,marginBottom:48}}>Frequently Asked</h2>
            {faqs.map((f,i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={()=>setActiveFaq(activeFaq===i?null:i)}>
                  <span>{f.q}</span>
                  <span style={{fontSize:24,fontWeight:300,color:'#3498db',transition:'transform 0.3s',transform:activeFaq===i?'rotate(45deg)':'',flexShrink:0,marginLeft:16}}>+</span>
                </button>
                <div style={{maxHeight:activeFaq===i?400:0,overflow:'hidden',transition:'max-height 0.4s ease'}}>
                  <p style={{paddingBottom:24,fontSize:15,lineHeight:1.7,color:'#7a9ab8'}}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ Contact / Lead Gen Section ═══ */}
      <section id="contact" className="section">
        <div className="two-col" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'start'}}>
          <Reveal>
            <span className="label-tag" style={{display:'block',marginBottom:16}}>READY TO OWN YOUR MARKET?</span>
            <h2 className="h-section" style={{fontSize:42,marginBottom:20}}>Book Your Discovery Call</h2>
            <p style={{fontSize:17,lineHeight:1.7,color:'#7a9ab8',marginBottom:40}}>
              15 minutes to map your visibility gaps, AI citation footprint, and fastest path to authority. Leave with total clarity — whether you work with us or not.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {[
                {icon:'⚡',text:'Same-day activation available'},
                {icon:'🎯',text:'Custom strategy for your market and goals'},
                {icon:'📊',text:'Free AI visibility snapshot included'},
                {icon:'🔒',text:'No commitment required'}
              ].map((b,i) => (
                <div key={i} style={{display:'flex',gap:14,alignItems:'center'}}>
                  <span style={{fontSize:20}}>{b.icon}</span>
                  <span style={{fontSize:15,color:'#8ec6b8'}}>{b.text}</span>
                </div>
              ))}
            </div>
            <div style={{marginTop:48,padding:28,borderRadius:16,background:'rgba(10,22,40,0.5)',border:'1px solid rgba(52,152,219,0.06)'}}>
              <div style={{fontFamily:'Outfit',fontWeight:600,fontSize:14,color:'#5a7a94',marginBottom:12}}>Or reach us directly</div>
              <a href="mailto:hello@bluocean.ai" style={{color:'#3498db',textDecoration:'none',fontSize:16,fontWeight:500}}>hello@bluocean.ai</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            {formSubmitted ? (
              <div className="card" style={{textAlign:'center',padding:'60px 40px'}}>
                <div style={{width:64,height:64,borderRadius:'50%',background:'rgba(26,188,156,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px'}}>
                  <span style={{color:'#1abc9c',fontSize:28}}>✓</span>
                </div>
                <h3 style={{fontFamily:'Outfit',fontWeight:700,fontSize:24,color:'#e8f4ff',marginBottom:12}}>We'll be in touch!</h3>
                <p style={{fontSize:15,color:'#7a9ab8',lineHeight:1.6}}>Thank you for reaching out. A member of our team will contact you within 24 hours to schedule your discovery call.</p>
              </div>
            ) : (
              <div className="card">
                <h3 style={{fontFamily:'Outfit',fontWeight:700,fontSize:20,color:'#e8f4ff',marginBottom:28}}>Start your discovery</h3>
                <div onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:16}}>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                    <input className="input-field" placeholder="Full name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} aria-label="Full name"/>
                    <input className="input-field" placeholder="Email" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} aria-label="Email"/>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                    <input className="input-field" placeholder="Company" value={formData.company} onChange={e=>setFormData({...formData,company:e.target.value})} aria-label="Company"/>
                    <input className="input-field" placeholder="Phone (optional)" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})} aria-label="Phone"/>
                  </div>
                  <textarea className="input-field" placeholder="Tell us about your business and goals..." rows={4} value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{resize:'vertical',minHeight:100}} aria-label="Message"/>
                  <button type="button" onClick={handleSubmit} className="btn-primary" style={{width:'100%',justifyContent:'center',padding:'16px 32px',fontSize:16}}>
                    Book Discovery Call <ArrowIcon/>
                  </button>
                  <p style={{fontSize:12,color:'#4a6a84',textAlign:'center'}}>No spam. No obligation. Just clarity on your AI visibility.</p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer style={{position:'relative',zIndex:1,borderTop:'1px solid rgba(52,152,219,0.06)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'64px 24px 40px'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:48,marginBottom:48}} className="pricing-grid">
            <div>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
                <div style={{width:36,height:36,borderRadius:8,background:'linear-gradient(135deg,#1a6eb5,#1abc9c)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <svg viewBox="0 0 24 24" fill="none" style={{width:20,height:20}}>
                    <path d="M4 16c2-3 6-5 8-3s4 1 8-3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span style={{fontFamily:'Outfit',fontWeight:700,fontSize:18,color:'#e0ecf5'}}>Blu Ocean</span>
              </div>
              <p style={{fontSize:14,lineHeight:1.7,color:'#5a7a94',maxWidth:300}}>
                We control what the internet and AI say about your business. Permanent authority infrastructure for the AI era.
              </p>
            </div>
            <div>
              <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#8ba8c4',marginBottom:20,letterSpacing:1,textTransform:'uppercase'}}>Company</h4>
              {['About','Case Studies','Blog','Careers'].map(l=>(
                <a key={l} href="#" style={{display:'block',fontSize:14,color:'#5a7a94',textDecoration:'none',marginBottom:12,transition:'color 0.3s'}} onMouseEnter={e=>e.target.style.color='#a8d4f0'} onMouseLeave={e=>e.target.style.color='#5a7a94'}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#8ba8c4',marginBottom:20,letterSpacing:1,textTransform:'uppercase'}}>Services</h4>
              {['AI Visibility','Citation Building','SEO Engine','Reputation'].map(l=>(
                <a key={l} href="#" style={{display:'block',fontSize:14,color:'#5a7a94',textDecoration:'none',marginBottom:12,transition:'color 0.3s'}} onMouseEnter={e=>e.target.style.color='#a8d4f0'} onMouseLeave={e=>e.target.style.color='#5a7a94'}>{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{fontFamily:'Outfit',fontWeight:700,fontSize:14,color:'#8ba8c4',marginBottom:20,letterSpacing:1,textTransform:'uppercase'}}>Legal</h4>
              {['Privacy Policy','Terms of Service','Cookie Policy'].map(l=>(
                <a key={l} href="#" style={{display:'block',fontSize:14,color:'#5a7a94',textDecoration:'none',marginBottom:12,transition:'color 0.3s'}} onMouseEnter={e=>e.target.style.color='#a8d4f0'} onMouseLeave={e=>e.target.style.color='#5a7a94'}>{l}</a>
              ))}
            </div>
          </div>
          <div style={{borderTop:'1px solid rgba(52,152,219,0.06)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
            <span style={{fontSize:13,color:'#3a5a74'}}>© {new Date().getFullYear()} Blu Ocean Innovations. All rights reserved.</span>
            <span style={{fontSize:13,color:'#3a5a74'}}>AI-First · Authority-Driven · Results-Proven</span>
          </div>
        </div>
      </footer>
    </>
  );
}
