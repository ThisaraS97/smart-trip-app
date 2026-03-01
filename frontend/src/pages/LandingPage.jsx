import React from 'react';
import { Link } from 'react-router-dom';
import sigiriyaImg from '../images/sigiriya.jpg';
import galleImg from '../images/galle.jpg';
import yalaImg from '../images/yala.jpg';
import ellaImg from '../images/ella.jpg';
import bluebeachImg from '../images/Vacation/bluebeach.jpg';
import bundalaImg from '../images/Vacation/bundala.jpg';
import daladhaImg from '../images/Vacation/daladha.jpg';
import ruwanweliseyaImg from '../images/Vacation/ruwanweliseya.jpg';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(66,153,132,0.15),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(190,242,100,0.05),_transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Hero Section */}
      <div className="relative w-full p-4 sm:p-6 lg:p-8">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl min-h-[90vh] 2xl:max-w-[1920px] 2xl:mx-auto">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.8) 100%), url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center 30%',
            }}
          />
          
          {/* Header */}
          <header className="relative z-10 flex items-center justify-between p-6 sm:px-10 sm:py-8">
            <Link to="/" className="flex items-center gap-3 text-white/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <svg className="h-5 w-5 text-lime-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </Link>

            <div className="hidden items-center gap-8 rounded-full bg-white/5 border border-white/10 px-8 py-3 backdrop-blur-md md:flex">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-24 focus:w-32 transition-all placeholder:text-slate-500" />
              </div>
              <span className="h-4 w-px bg-white/20"></span>
              {['How it Works', 'Destinations', 'About', 'Blogs'].map((item) => {
                const isAnchor = ['How it Works', 'Destinations', 'About'].includes(item);
                const target = item.toLowerCase().replace(/\s+/g, '-');
                return isAnchor
                  ? <a key={item} href={`#${target}`} className="text-sm font-medium text-slate-200 hover:text-lime-300 transition-colors">{item}</a>
                  : <Link key={item} to="#" className="text-sm font-medium text-slate-200 hover:text-lime-300 transition-colors">{item}</Link>;
              })}
              <span className="h-4 w-px bg-white/20"></span>
              <a href="#book-now" className="text-sm font-medium text-slate-200 hover:text-lime-300 transition-colors">Book Now</a>
            </div>

            <Link to="/login" className="rounded-full border border-lime-200/40 px-6 py-2.5 text-sm font-medium text-lime-100 backdrop-blur-md transition-colors hover:bg-lime-200/10 hover:text-white">
              Login
            </Link>
          </header>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-end pb-12 sm:pb-20">
            <h1 className="text-[15vw] sm:text-[12vw] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 uppercase pointer-events-none font-gotham">
              Adventure
            </h1>
            <div className="absolute bottom-8 flex flex-col items-center gap-2 text-lime-200/60 animate-bounce">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 lg:py-28 scroll-mt-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-gotham font-medium text-white">How SmartTRIP Works</h2>
          <p className="text-slate-400 text-sm sm:text-base">Four simple steps to your perfect vacation</p>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10"></div>
          
          {[
            { 
              step: '1', 
              title: 'Share Your Preferences', 
              desc: 'Tell us your destination, budget, dates, and what you love to do', 
              icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
              color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20'
            },
            { 
              step: '2', 
              title: 'Get AI Recommendations', 
              desc: 'Our AI creates personalized itineraries matching your needs and budget', 
              icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
              color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20'
            },
            { 
              step: '3', 
              title: 'Customize Your Trip', 
              desc: 'Adjust hotels, activities, and services while tracking your budget', 
              icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
              color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20'
            },
            { 
              step: '4', 
              title: 'Confirm & Travel', 
              desc: 'Vendors confirm availability, you pay, and we handle the rest', 
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
              color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20'
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className={`flex h-[88px] w-[88px] items-center justify-center rounded-2xl ${item.bg} ${item.border} border bg-slate-900/80 backdrop-blur shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-transform group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)] mb-6 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} opacity-50`}></div>
                <svg className={`w-10 h-10 ${item.color} relative z-10`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                </svg>
              </div>
              
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-slate-950/20 text-lime-200 font-bold text-sm mb-5 border border-lime-500/30">
                {item.step}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-[260px]">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Wonders of Nature Section */}
      <section className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-medium text-white">The Wonders Of Nature</h2>
            <p className="text-sm text-slate-400 max-w-md">We seek to provide the authentic contact for travel far around the world.</p>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400/20 text-lime-300 hover:bg-lime-400 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { img: sigiriyaImg, title: 'Sigiriya Rock', label: 'Ancient' },
            { img: galleImg, title: 'Galle Fort', label: 'Coastal' },
            { img: yalaImg, title: 'Yala National Park', label: 'Safari' },
            { img: ellaImg, title: 'Ella Mountains', label: 'Hills' },
          ].map((card, i) => (
            <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-800">
              <img src={card.img} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-lime-400"></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-lime-200">{card.label}</span>
                </div>
                <h3 className="text-lg font-medium text-white">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section id="destinations" className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 scroll-mt-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-gotham font-medium text-white">Popular Destinations</h2>
          <p className="text-slate-400 text-sm sm:text-base">Explore Sri Lanka's most loved destinations with AI-powered itineraries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Kandy', desc: 'Cultural capital with ancient temples', rating: '4.8', days: '3 Days', price: '45,000', color: 'from-[#4F46E5] to-[#3730A3]' },
            { name: 'Galle', desc: 'Colonial fort and pristine beaches', rating: '4.9', days: '4 Days', price: '55,000', color: 'from-[#0284C7] to-[#075985]' },
            { name: 'Ella', desc: 'Scenic hill country paradise', rating: '4.7', days: '3 Days', price: '40,000', color: 'from-[#16A34A] to-[#166534]' },
            { name: 'Sigiriya', desc: 'Ancient rock fortress wonder', rating: '4.9', days: '2 Days', price: '50,000', color: 'from-[#D97706] to-[#92400E]' },
            { name: 'Yala', desc: 'Premier wildlife safari experience', rating: '4.8', days: '2 Days', price: '60,000', color: 'from-[#DC2626] to-[#991B1B]' },
            { name: 'Nuwara Eliya', desc: 'Tea country and cool climate', rating: '4.6', days: '3 Days', price: '48,000', color: 'from-[#7C3AED] to-[#5B21B6]' },
          ].map((dest, i) => (
            <div key={i} className="flex flex-col bg-slate-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {/* Card Header Color Block */}
              <div className={`h-40 bg-gradient-to-br ${dest.color} relative p-6 flex items-end opacity-95`}>
                <h3 className="text-2xl font-bold text-white tracking-wide">{dest.name}</h3>
              </div>
              
              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 gap-5">
                <p className="text-slate-400 text-sm flex-1">{dest.desc}</p>
                
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-300">
                    <svg className="w-4 h-4 text-yellow-500 fill-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {dest.rating}
                  </div>
                  <span className="text-slate-500">{dest.days}</span>
                </div>
                
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-semibold text-lime-300">From LKR {dest.price}</span>
                  <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 flex justify-center">
          <button className="border border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/10 text-[#A78BFA] px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            View All Destinations <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </section>

      {/* Reasons to Choose Us (About Section) */}
      <section id="about" className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 scroll-mt-20">
        <div className="mb-16 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-gotham font-semibold text-white">Why Choose SmartTRIP?</h2>
          <p className="text-slate-400 text-sm sm:text-base">Intelligent features designed for hassle-free travel planning</p>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            { title: 'AI-Powered Planning', text: 'Smart algorithms create optimal itineraries based on your preferences', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', glow: 'from-purple-500/20 to-transparent' },
            { title: 'Budget Control', text: 'Real-time tracking ensures you never exceed your budget', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', glow: 'from-blue-500/20 to-transparent' },
            { title: 'Verified Vendors', text: 'All partners are vetted for quality and reliability', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', glow: 'from-indigo-500/20 to-transparent' },
            { title: 'Flexible Booking', text: 'Soft-booking process with no payment until confirmation', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', glow: 'from-violet-500/20 to-transparent' },
          ].map((feat, i) => (
            <div key={i} className="group relative flex flex-col bg-slate-900 border border-white/5 rounded-3xl p-8 hover:bg-slate-800/80 transition-colors">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feat.glow} rounded-bl-full opacity-50`}></div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-500 text-slate-950/10 text-lime-300 mb-6 border border-lime-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feat.icon} />
                </svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vacation Perfect Section */}
      <section id="book-now" className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 scroll-mt-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Collage */}
          <div className="w-full max-w-xl grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6 pt-12">
              <img src={bluebeachImg} alt="Vacation 1" className="rounded-2xl rounded-tr-[40px] aspect-[4/5] object-cover border border-white/10 shadow-xl" />
              <img src={bundalaImg} alt="Vacation 2" className="rounded-2xl aspect-video object-cover border border-white/10 shadow-xl" />
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <img src={daladhaImg} alt="Vacation 3" className="rounded-2xl aspect-square object-cover border border-white/10 shadow-xl" />
              <img src={ruwanweliseyaImg} alt="Vacation 4" className="rounded-2xl rounded-bl-[40px] aspect-[4/5] object-cover border border-white/10 shadow-xl" />
            </div>
          </div>
          
          {/* Right Text */}
          <div className="w-full max-w-xl space-y-8">
            <h2 className="text-3xl sm:text-4xl font-medium text-white leading-snug">
              Here's makes a vacation <br className="hidden sm:block"/> perfect for you!
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether you're planning a family vacation with your pet, a relaxing weekend getaway, or an adventurous excursion, vacation rentals are ideal for trips of all types. You can find everything from charming mountain cabins and lakeside lodges to breathtaking city apartments.
            </p>
            <button className="bg-lime-400 hover:bg-lime-300 text-slate-950 px-8 py-3.5 rounded-full font-semibold transition-transform hover:scale-105 inline-block">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-20 pb-4 mb-0">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-2xl font-medium text-white">Explore The Nature With Us</h2>
            <div className="absolute -bottom-3 right-0 w-2/3 h-px bg-lime-400"></div>
          </div>
        </div>
        
        <div className="relative rounded-3xl border border-lime-100/15 overflow-hidden bg-slate-900 md:aspect-[21/9] flex flex-col md:flex-row justify-between" style={{
            backgroundImage: 'linear-gradient(90deg, rgba(7,16,22,0.95) 0%, rgba(7,16,22,0.4) 100%), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
         }}>
           <div className="max-w-xs space-y-6 self-start p-8 md:p-12 md:pt-20">
             {[
               "Whether you're planning a family vacation with your pet, a relaxing weekend getaway. 2 million trys.",
               "Whether you're planning a family vacation with your pet, a relaxing",
               "Vacation with your pet, a relaxing weekend"
             ].map((text, idx) => (
                <div key={idx} className="relative group">
                  <p className="text-sm text-slate-300/80 leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm relative z-10 w-[280px]">
                    {text}
                  </p>
                  {/* Visual connector lines for desktop */}
                  <svg className="hidden md:block absolute top-1/2 left-[280px] w-[300px] h-[150px] -z-10 overflow-visible" style={{ transform: 'translateY(-50%)' }}>
                    <path 
                      d={`M 0 75 L 100 75 L 200 ${idx === 0 ? 0 : idx === 1 ? 75 : 150} L 280 ${idx === 0 ? 0 : idx === 1 ? 75 : 150}`} 
                      fill="none" 
                      stroke="rgba(255,255,255,0.3)" 
                      strokeWidth="1.5"
                    />
                    <circle 
                      cx="280" 
                      cy={idx === 0 ? 0 : idx === 1 ? 75 : 150} 
                      r="4" 
                      fill="white" 
                    />
                  </svg>
                </div>
             ))}
           </div>
           
           <div className="hidden md:block self-center relative rounded-sm overflow-hidden border-[3px] border-lime-400/80 w-[400px] aspect-[16/9] mr-12 transform -translate-y-12">
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" alt="Featured Nature" className="w-full h-full object-cover"/>
           </div>

           {/* In-Panel Footer integrated as an overlay at the bottom */}
           <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950/95 via-slate-900/80 to-transparent pt-20">
             <div className="w-full max-w-7xl mx-auto px-10 pb-8 flex flex-wrap justify-between items-start text-sm border-b border-white/10 pb-6 mb-6">
                <div className="space-y-3">
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">Book Now</Link>
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">About</Link>
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">Blogs</Link>
                </div>
                <div className="space-y-3">
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">Supports</Link>
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">Privacy</Link>
                  <Link to="#" className="block text-slate-300 hover:text-lime-300 transition">Affiliates</Link>
                </div>
                <div className="space-y-3">
                  <p className="text-slate-300">008-557-990; 008-557-900</p>
                  <p className="text-slate-300">adventure@gmail.com</p>
                </div>
             </div>
             
             <div className="flex justify-between items-center px-10 pb-6 text-xs text-lime-400/80 w-full max-w-7xl mx-auto font-medium tracking-wide">
                <p>&#169; 2026, All Right Reserve</p>
                <Link to="#" className="hover:text-lime-300 transition">Privacy Policy</Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}







