import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      toast.success('Welcome back!');
      const { role } = res.data;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/my-trips');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans flex flex-col items-center justify-center p-4 z-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(66,153,132,0.25),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(190,242,100,0.15),_transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10 lg:flex-row lg:px-10 lg:py-12">
        {/* Left story / hero */}
        <section className="flex-1 space-y-6">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200/80">
            <span className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">Sri Lanka Escapes</span>
            <span className="hidden h-px w-16 bg-lime-200/40 lg:block" />
            <span className="hidden lg:block text-slate-400">Curated by SmartTrip</span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-lime-100/15 bg-slate-900/70 shadow-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(7,16,22,0.9) 70%), url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative flex h-full flex-col justify-between gap-6 p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 text-white/90">
                  <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-lime-200/80">SmartTrip</p>
                    <p className="text-lg font-semibold leading-none">Adventure</p>
                  </div>
                </Link>
                <div className="hidden items-center gap-3 text-[11px] text-lime-100/90 sm:flex">
                  <span className="h-px w-10 bg-lime-100/40" />
                  <span>Wild routes</span>
                  <span className="h-px w-10 bg-lime-100/40" />
                  <span>Waterfalls</span>
                  <span className="h-px w-10 bg-lime-100/40" />
                  <span>Sunrise peaks</span>
                </div>
              </div>

              <div className="space-y-4 sm:max-w-2xl">
                <h1 className="text-3xl leading-tight sm:text-4xl lg:text-5xl font-gotham">
                  Adventure begins where maps end. Discover Sri Lanka with us.
                </h1>
                <p className="max-w-xl text-sm text-slate-200/80 sm:text-base">
                  From misty tea trails to hidden beaches and rainforest canopies, we orchestrate seamless trips that feel cinematic, safe, and deeply personal.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[{ label: 'Curated routes', value: '120+' }, { label: 'Travel partners', value: '80+' }, { label: 'Traveler trust', value: '10k+' }].map((item) => (
                  <div key={item.label} className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">
                    <p className="text-sm uppercase tracking-[0.12em] text-lime-100/80">{item.label}</p>
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[{ icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Tailored itineraries', copy: 'Design routes that match your pace, budget, and mood.' }, { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Live status', copy: 'Track bookings, transfers, and guides in real time.' }, { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Secure payments', copy: 'Transparent pricing, receipts, and vendor protection.' }].map((item) => (
              <div key={item.title} className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-300/15 text-lime-100">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-300/80">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right form */}
        <section className="flex w-full max-w-xl flex-1 items-center">
          <div className="w-full rounded-3xl border border-lime-100/15 bg-slate-900/70 p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-9">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-lime-200/80">Sign in</p>
                <h2 className="text-2xl font-semibold text-white sm:text-3xl">Welcome back, explorer</h2>
                <p className="text-sm text-slate-400">Access your saved trips, vendors, and live bookings.</p>
              </div>
              <Link to="/" className="hidden text-xs font-semibold text-lime-100 hover:text-lime-50 sm:inline-flex">
                Home
              </Link>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-200">Email</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-200">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-lime-100"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-300">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="h-1 w-1 rounded-full bg-lime-200" />
                  <span>Encrypted session</span>
                </div>
                <Link to="/forgot-password" className="font-semibold text-lime-100 hover:text-lime-50">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-lime-300 to-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-10" style={{ backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)', transform: 'translateX(-100%)' }} />
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Enter the wild
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-lime-100/80">Vendors</p>
                <Link to="/vendor-login" className="flex items-center gap-2 font-semibold text-lime-100 hover:text-lime-50">
                  Login as a vendor
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-lime-100/80">New here?</p>
                <Link to="/register" className="font-semibold text-lime-100 hover:text-lime-50">Create your account</Link>
                <p className="text-xs text-slate-400">Save favorite trails, boats, and boutique stays.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
