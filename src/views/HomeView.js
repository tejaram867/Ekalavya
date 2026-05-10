export const HomeView = {
    render: () => `

        <!-- HERO -->
        <section class="hero-section container relative overflow-hidden" id="home">
            <div class="hero-mesh-gradient"></div>
            <div class="grid lg:grid-cols-[1.1fr,0.9fr] gap-6 items-center relative z-10">
                <div class="reveal flex flex-col justify-between pl-10 lg:pl-12" style="min-height: 480px;"> 
                    <div>
                        <h1 class="hero-title mb-6">
                            Empowering Every<br>
                            <span class="bg-gold-gradient text-transparent text-glow-gold">Student. Everywhere.</span>
                        </h1>
                        <p class="hero-subtitle mb-8 leading-relaxed" style="max-width: 540px; font-size: 1.25rem;">
                            Ekalavya is the all-in-one ecosystem for Class 6–12 and undergraduate students across India. Access exclusive scholarships, connect with expert mentors, and master your subjects with peer-led study sessions and premium notes—all designed to help you stay consistent and confident.
                        </p>
                    </div>
                    
                    <div class="flex flex-wrap gap-5 mt-auto">
                        <a href="scholarships.html" class="cta-primary hover-scale">
                            Get Started Free
                            <i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </a>
                        <button onclick="window.showAuthModal()" class="cta-outline hover-scale">
                            Join Ekalavya
                        </button>
                    </div>
                </div>
                <div class="reveal relative">
                    <div class="hero-card-3d" id="hero-card">
                        <div class="glass-card p-2 relative overflow-hidden group hero-card-content" style="z-index:1; border-radius: 28px;">
                            <div class="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity" style="background:var(--gold-gradient);"></div>
                            <img src="../public/hero-bg.png"
                                alt="Student using Ekalavya"
                                class="rounded-2xl w-full h-auto object-cover transition-all duration-700 group-hover:scale-105"
                                style="aspect-ratio: 4/3;" />
                            
                            <!-- Floating Info Chip (Top-Left) -->
                            <div class="absolute top-4 left-4 p-3 glass-card border-white/10 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" style="max-width: 170px;">
                                <div class="flex flex-col gap-1.5">
                                    <div class="flex items-center gap-1.5 leading-none">
                                        <span class="w-1.5 h-1.5 rounded-full bg-[#f4c430]"></span>
                                        <p class="text-[9px] uppercase font-bold tracking-widest text-[#f4c430]">Live Now</p>
                                    </div>
                                    <p class="text-white font-bold text-xs leading-tight">Scholarship Workshop</p>
                                    <div class="flex -space-x-1.5 mt-1">
                                        <img src="https://i.pravatar.cc/100?u=4" class="w-5 h-5 rounded-full border-2 border-black" />
                                        <img src="https://i.pravatar.cc/100?u=5" class="w-5 h-5 rounded-full border-2 border-black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Decorative elements -->
                    <div class="absolute rounded-full" style="top:-40px;right:-40px;width:200px;height:200px;background:rgba(244,196,48,0.06);filter:blur(60px);pointer-events:none;z-index:-1;"></div>
                </div>
            </div>
        </section>

        <!-- OUR ECOSYSTEM — BREATHTAKING BENTO GRID -->
        <section class="py-20 relative" id="ecosystem" style="background:var(--bg-black-dark); isolation: isolate;">
            <!-- Background glows -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full opacity-30" style="background: radial-gradient(circle, rgba(244,196,48,0.05) 0%, transparent 70%); filter:blur(100px); z-index:-1; pointer-events:none;"></div>

            <div class="container relative z-10">
                <div class="text-center mb-20" style="max-width:700px;margin-left:auto;margin-right:auto;">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style="background:rgba(244,196,48,0.1); border: 1px solid rgba(244,196,48,0.2);">
                        <span class="w-2 h-2 rounded-full" style="background:var(--primary-gold); box-shadow: 0 0 10px var(--primary-gold);"></span>
                        <span style="color:var(--primary-gold); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Our Ecosystem</span>
                    </div>
                    <h2 style="font-size:clamp(2.5rem, 5vw, 4rem); font-weight:800; line-height:1.1; color:#fff; letter-spacing:-0.03em;">
                        Everything you need.<br>
                        <span style="background:var(--gold-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">In one place.</span>
                    </h2>
                    <p class="mt-6" style="color:rgba(255,255,255,0.6); font-size: 1.15rem; line-height:1.7;">
                        Stop hunting across a dozen websites. Ekalavya brings scholarships, mentors, peers, notes, and progress tracking under one premium roof.
                    </p>
                </div>

                <!-- INTERACTIVE SHOWCASE STAGE -->
                <div class="showcase-container glass-card p-2 rounded-[40px] border border-white/5 bg-white/[0.02]" style="box-shadow: 0 40px 100px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.05); transform: translateZ(0);">
                    <div class="grid lg:grid-cols-12 gap-0 items-stretch bg-[#070707] rounded-[36px] overflow-hidden relative min-h-[580px] lg:min-h-[500px]">
                        
                        <!-- LEFT SIDE: Feature Tabs -->
                        <div class="lg:col-span-5 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center relative z-10">
                            <div class="feature-tabs flex flex-col gap-2 relative w-full">
                                <!-- Dynamic Highlight Tracker -->
                                <div class="active-tab-highlight absolute top-0 left-0 w-full bg-white/[0.04] border border-white/10 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" id="active-highlight" style="will-change: transform, height; transform: translateZ(0);"></div>
                                
                                <!-- Tab 1 -->
                                <div class="feature-tab active relative z-10 p-6 rounded-2xl cursor-pointer" data-target="scholarships">
                                    <div class="flex items-center gap-4 mb-1">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-12 !h-12 !rounded-xl bg-ekalavya-gold/10 text-ekalavya-gold border-ekalavya-gold/20 shadow-[inset_0_0_15px_rgba(244,196,48,0.2)]">
                                                <i data-lucide="award" class="w-6 h-6"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-xl font-bold text-white tab-title transition-colors duration-300">Scholarship Hub</h3>
                                    </div>
                                    <p class="text-white/50 text-sm ml-14 tab-desc transition-all duration-300 overflow-hidden" style="height: 60px; opacity: 1; margin-top: 0.25rem;">Direct access to India's largest verified scholarship database. Auto-match based on your profile and apply securely.</p>
                                </div>
                                
                                <!-- Tab 2 -->
                                <div class="feature-tab relative z-10 p-6 rounded-2xl cursor-pointer" data-target="mentors">
                                    <div class="flex items-center gap-4 mb-1">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-12 !h-12 !rounded-xl bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)]">
                                                <i data-lucide="users" class="w-6 h-6"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-xl font-bold text-white/40 tab-title transition-colors duration-300">Elite Mentoring</h3>
                                    </div>
                                    <p class="text-white/50 text-sm ml-14 tab-desc transition-all duration-300 overflow-hidden" style="height: 0px; opacity: 0; margin-top: 0px;">1-on-1 sessions with high achievers from IITs, AIIMS, and global firms. Get real career guidance, completely free.</p>
                                </div>

                                <!-- Tab 3 -->
                                <div class="feature-tab relative z-10 p-6 rounded-2xl cursor-pointer" data-target="community">
                                    <div class="flex items-center gap-4 mb-1">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-12 !h-12 !rounded-xl bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]">
                                                <i data-lucide="message-circle" class="w-6 h-6"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-xl font-bold text-white/40 tab-title transition-colors duration-300">Peer Connect</h3>
                                    </div>
                                    <p class="text-white/50 text-sm ml-14 tab-desc transition-all duration-300 overflow-hidden" style="height: 0px; opacity: 0; margin-top: 0px;">Live study rooms, doubts discussion, and peer-to-peer learning with ambitious students across the country.</p>
                                </div>

                                <!-- Tab 4 -->
                                <div class="feature-tab relative z-10 p-6 rounded-2xl cursor-pointer" data-target="library">
                                    <div class="flex items-center gap-4 mb-1">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-12 !h-12 !rounded-xl bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)]">
                                                <i data-lucide="book-open" class="w-6 h-6"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-xl font-bold text-white/40 tab-title transition-colors duration-300">Library & Tracker</h3>
                                    </div>
                                    <p class="text-white/50 text-sm ml-14 tab-desc transition-all duration-300 overflow-hidden" style="height: 0px; opacity: 0; margin-top: 0px;">Premium academic notes, past papers, and a dashboard that analyzes your daily learning consistency and growth.</p>
                                </div>
                            </div>
                        </div>

                        <!-- RIGHT SIDE: The Stage -->
                        <div class="lg:col-span-7 bg-[#050505] relative flex items-center justify-center showcase-stage" style="min-height: 480px;">
                            <!-- Glow Backdrop (Hardware Accelerated) -->
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full filter blur-[80px] opacity-70 transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] showcase-glow bg-ekalavya-gold/20" id="showcase-glow" style="will-change: background-color; transform: translate(-50%, -50%) translateZ(0);"></div>
                            
                            <!-- Grid Pattern Overlay -->
                            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>

                            <div class="relative w-full h-full p-8 lg:p-12 flex items-center justify-center perspective-[2000px]">
                                
                                <!-- Panel 1: Scholarships -->
                                <div class="showcase-panel active absolute w-[90%] lg:w-3/4 max-w-[800px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform translate-y-0 opacity-100 scale-100" id="panel-scholarships" style="will-change: transform, opacity;">
                                    <div class="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden">
                                        <div class="absolute -top-10 -right-10 p-3 opacity-10 rotate-12"><i data-lucide="award" class="w-40 h-40 text-ekalavya-gold"></i></div>
                                        <div class="flex justify-between items-start mb-6">
                                            <div class="flex gap-4 items-center">
                                                <div class="w-12 h-12 bg-ekalavya-gold/20 rounded-xl border border-ekalavya-gold/30 flex items-center justify-center shadow-[inset_0_0_15px_rgba(244,196,48,0.2)]"><i data-lucide="search" class="text-ekalavya-gold"></i></div>
                                                <div><div class="text-white font-bold tracking-tight text-lg mb-1 drop-shadow-lg">Match Generator</div><div class="h-1.5 w-16 bg-white/10 rounded-full"></div></div>
                                            </div>
                                        </div>
                                        <div class="space-y-3 relative z-10">
                                            <div class="w-full h-16 bg-[#0a0a0a]/80 border border-white/10 rounded-2xl flex items-center px-4 gap-4 shadow-xl">
                                                <div class="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center"><i data-lucide="graduation-cap" class="w-5 h-5 text-indigo-400"></i></div>
                                                <div class="flex-1">
                                                    <div class="h-2.5 w-1/2 bg-white/30 rounded-full mb-2"></div>
                                                    <div class="flex gap-2"><div class="h-1.5 w-8 bg-ekalavya-gold/40 rounded-full"></div><div class="h-1.5 w-12 bg-white/10 rounded-full"></div></div>
                                                </div>
                                                <div class="px-3 py-1 bg-ekalavya-gold/20 text-ekalavya-gold border border-ekalavya-gold/30 text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(244,196,48,0.2)]"><span class="w-1 h-1 rounded-full bg-ekalavya-gold"></span> 98% Match</div>
                                            </div>
                                            <div class="w-full h-16 bg-[#0a0a0a]/50 border border-white/5 rounded-2xl flex items-center px-4 gap-4">
                                                <div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center opacity-50"><i data-lucide="briefcase" class="w-5 h-5 text-emerald-400"></i></div>
                                                <div class="flex-1 opacity-50"><div class="h-2 w-2/3 bg-white/20 rounded-full mb-2"></div><div class="h-1.5 w-1/4 bg-white/10 rounded-full"></div></div>
                                                <div class="px-3 py-1 bg-white/5 text-white/40 border border-white/5 text-[10px] font-bold uppercase tracking-wider rounded-full">Saved</div>
                                            </div>
                                        </div>
                                        <div class="mt-6">
                                            <a href="scholarships.html" class="flex items-center justify-center w-full h-12 bg-ekalavya-gold text-black font-bold rounded-xl border border-[#ffe07a] shadow-[0_5px_15px_rgba(244,196,48,0.2)] transition-transform hover:-translate-y-1">Explore Data <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <!-- Panel 2: Mentors -->
                                <div class="showcase-panel absolute w-[90%] lg:w-3/4 max-w-[800px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform translate-y-12 opacity-0 rotate-x-12 scale-95 pointer-events-none" id="panel-mentors" style="will-change: transform, opacity;">
                                    <div class="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden">
                                        <div class="flex justify-between items-center mb-6"><div class="text-white font-bold tracking-tight text-lg drop-shadow-lg">Top Mentors Online</div><div class="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 rounded-md border border-blue-500/20"><span class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span><span class="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Live</span></div></div>
                                        <div class="grid grid-cols-2 gap-4">
                                            <div class="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-4 text-center shadow-xl">
                                                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 mb-3 flex items-center justify-center overflow-hidden"><img src="https://i.pravatar.cc/100?u=a1" class="w-full h-full object-cover"></div>
                                                <div class="text-white font-bold text-sm drop-shadow-lg">Aisha Sharma</div>
                                                <div class="text-blue-400/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">IIT Delhi</div>
                                            </div>
                                            <div class="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-4 text-center shadow-xl">
                                                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 mb-3 flex items-center justify-center overflow-hidden"><img src="https://i.pravatar.cc/100?u=b2" class="w-full h-full object-cover"></div>
                                                <div class="text-white font-bold text-sm drop-shadow-lg">Rahul Mehta</div>
                                                <div class="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">Google</div>
                                            </div>
                                        </div>
                                        <a href="mentors.html" class="mt-4 flex items-center justify-center w-full h-12 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 text-sm font-bold shadow-[0_5px_15px_rgba(59,130,246,0.15)] transition-all">Book Open Slot <i data-lucide="calendar" class="w-4 h-4 ml-2"></i></a>
                                    </div>
                                </div>

                                <!-- Panel 3: Community -->
                                <div class="showcase-panel absolute w-[90%] lg:w-3/4 max-w-[800px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform translate-y-12 opacity-0 rotate-x-12 scale-95 pointer-events-none" id="panel-community" style="will-change: transform, opacity;">
                                    <div class="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-0 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden flex flex-col">
                                        <div class="p-4 border-b border-white/10 flex justify-between items-center bg-black/40"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30"><i data-lucide="hash" class="w-4 h-4 text-purple-400"></i></div><div class="text-white font-bold text-sm drop-shadow-lg">JEE_Mains_2027</div></div><div class="flex -space-x-2"><img src="https://i.pravatar.cc/100?u=c3" class="w-6 h-6 rounded-full border border-black"><img src="https://i.pravatar.cc/100?u=d4" class="w-6 h-6 rounded-full border border-black"><div class="w-6 h-6 rounded-full bg-purple-600 border border-black flex items-center justify-center text-[8px] font-bold text-white">+24</div></div></div>
                                        
                                        <div class="p-5 flex flex-col gap-5">
                                            <div class="flex gap-3">
                                                <img src="https://i.pravatar.cc/100?u=c3" class="w-8 h-8 rounded-full border border-white/10 flex-shrink-0">
                                                <div class="bg-[#0a0a0a]/80 shadow-md border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[85%]">
                                                    <div class="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Priya</div>
                                                    <div class="text-white/90 text-sm">Can someone explain Rotational Mechanics question 42 from HC Verma? 😵‍💫</div>
                                                </div>
                                            </div>
                                            <div class="flex gap-3 flex-row-reverse">
                                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border border-purple-400 flex flex-shrink-0 items-center justify-center"><i data-lucide="user" class="w-4 h-4 text-white"></i></div>
                                                <div class="bg-purple-600/20 backdrop-blur-md shadow-[0_5px_15px_rgba(168,85,247,0.1)] border border-purple-500/30 rounded-2xl rounded-tr-none p-4 max-w-[85%]">
                                                    <div class="text-purple-300 text-[10px] font-bold uppercase tracking-wider mb-1">You</div>
                                                    <div class="text-white text-sm drop-shadow-sm">Yes, conserve angular momentum about the hinge point. I've uploaded the solution photo!</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Panel 4: Library -->
                                <div class="showcase-panel absolute w-[90%] lg:w-3/4 max-w-[800px] mx-auto transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] transform translate-y-12 opacity-0 rotate-x-12 scale-95 pointer-events-none" id="panel-library" style="will-change: transform, opacity;">
                                    <div class="w-full bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden">
                                        <div class="text-white font-bold tracking-tight text-lg mb-6 drop-shadow-lg flex items-center justify-between">Performance Tracker <i data-lucide="bar-chart-2" class="text-emerald-400"></i></div>
                                        <div class="flex gap-4 items-end mb-8 h-32 px-2 relative">
                                            <!-- Grid lines -->
                                            <div class="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none"><div class="border-t border-white border-dashed w-full h-0"></div><div class="border-t border-white border-dashed w-full h-0"></div><div class="border-t border-white border-dashed w-full h-0"></div></div>
                                            
                                            <div class="w-full rounded-t-xl bg-emerald-500/20 border-t border-l border-r border-emerald-500/30 relative h-[60%]"><div class="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-t-xl"></div></div>
                                            <div class="w-full rounded-t-xl bg-white/5 border-t border-l border-r border-white/10 relative h-[40%]"><div class="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-t-xl"></div></div>
                                            <div class="w-full rounded-t-xl bg-emerald-500/40 border-t border-l border-r border-emerald-500/50 h-[80%] relative"><div class="absolute inset-0 bg-gradient-to-t from-emerald-500/40 to-transparent rounded-t-xl"></div></div>
                                            <div class="w-full rounded-t-xl bg-white/5 border-t border-l border-r border-white/10 relative h-[25%]"><div class="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-t-xl"></div></div>
                                            <div class="w-full rounded-t-xl bg-ekalavya-gold/30 border-t border-l border-r border-ekalavya-gold/40 h-full relative group"><div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-ekalavya-gold text-black font-bold text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">100%</div><div class="absolute inset-0 bg-gradient-to-t from-ekalavya-gold/30 to-transparent rounded-t-xl"></div></div>
                                        </div>
                                        <div class="bg-[#0a0a0a]/80 shadow-inner border border-white/10 rounded-2xl p-4 flex justify-between items-center relative overflow-hidden">
                                            <div class="absolute top-0 right-0 w-32 h-32 bg-ekalavya-gold/10 rounded-full blur-[40px]"></div>
                                            <div class="flex items-center gap-4 relative z-10">
                                                <div class="w-12 h-12 flex items-center justify-center bg-ekalavya-gold/10 border border-ekalavya-gold/20 rounded-xl relative">
                                                    <i data-lucide="flame" class="w-6 h-6 text-ekalavya-gold filter drop-shadow-[0_0_5px_rgba(244,196,48,0.5)]"></i>
                                                    <span class="absolute -bottom-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md border border-red-400">HOT</span>
                                                </div>
                                                <div>
                                                    <div class="text-white font-bold text-lg drop-shadow-md">5 Day Streak</div>
                                                    <div class="text-xs text-emerald-400 font-bold tracking-wide mt-0.5 flex items-center gap-1"><i data-lucide="trending-up" class="w-3 h-3"></i> Top 5% Learner</div>
                                                </div>
                                            </div>
                                            <a href="dashboard.html" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors relative z-10 hover-scale"><i data-lucide="arrow-right" class="w-5 h-5 text-white"></i></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <!-- BREATHTAKING VISION & MISSION -->
        <section class="py-20 relative overflow-hidden" id="about" style="background:var(--bg-black-dark); isolation: isolate;">
            <!-- Large architectural background glow -->
            <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-ekalavya-gold/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" style="will-change: transform;"></div>
            <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" style="will-change: transform;"></div>

            <div class="container relative z-10">
                <div class="grid lg:grid-cols-12 gap-16 lg:gap-10 items-center">
                    
                    <!-- Left Side: Massive Typography Statement -->
                    <div class="lg:col-span-5 relative">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);">
                            <span class="w-2 h-2 rounded-full bg-ekalavya-gold animate-pulse"></span>
                            <span class="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">Our Purpose</span>
                        </div>
                        
                        <h2 class="text-4xl lg:text-5xl xl:text-[3.5rem] font-black text-white leading-[1.1] mb-8 tracking-tight drop-shadow-2xl">
                            We're building an <br>
                            <span class="relative inline-block mt-3 mb-2">
                                <span class="relative z-10 bg-gradient-to-r from-ekalavya-gold via-[#ffe07a] to-white bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(244,196,48,0.3)]">equal playing field</span>
                                <div class="absolute -bottom-2 left-0 w-full h-[50%] bg-ekalavya-gold/20 blur-xl"></div>
                            </span><br>
                            <span class="text-white/40">for every student.</span>
                        </h2>
                        
                        <p class="text-lg text-white/50 leading-relaxed max-w-md">
                            Talent is universal, but opportunity is not. Ekalavya exists to bridge the gap between ambition and resources by providing a world-class digital ecosystem, absolutely free.
                        </p>
                    </div>

                    <!-- Right Side: The overlapping 3D Glass Cards -->
                    <div class="lg:col-span-7 relative flex flex-col md:flex-row gap-6 lg:gap-8 lg:pl-10">
                        
                        <!-- Card 1: Vision (Equal Width) -->
                        <div class="flex-1 relative group mt-0">
                            <!-- Glow Backdrop -->
                            <div class="absolute inset-0 bg-ekalavya-gold/15 opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-[40px] blur-[40px] -rotate-6 scale-90 group-hover:scale-110"></div>
                            
                            <div class="relative h-full bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[32px] p-7 overflow-hidden transform transition-all duration-700 hover:-translate-y-4 hover:border-ekalavya-gold/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(244,196,48,0.3)] shadow-2xl group/card">
                                
                                <!-- Light Leak Border (Invisible until hover) -->
                                <div class="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700 p-[1px] -z-10"></div>

                                <!-- Background Abstract Pulse -->
                                <div class="absolute -right-16 -top-16 w-48 h-48 bg-ekalavya-gold/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000"></div>
                                
                                <!-- 3D Glass-on-Glass Icon Tile -->
                                <div class="icon-3d-wrapper mb-8">
                                    <div class="icon-3d !w-16 !h-16">
                                        <i data-lucide="eye" class="w-8 h-8 text-ekalavya-gold"></i>
                                    </div>
                                </div>
                                
                                <h3 class="text-2xl font-black text-white mb-4 relative z-10 tracking-tight group-hover:text-ekalavya-gold transition-colors">Our Vision</h3>
                                <p class="text-ekalavya-slate leading-[1.8] relative z-10 text-[0.95rem] font-medium">
                                    A world where every student — regardless of location or background — has <span class="text-white font-bold">equal access</span> to elite mentorship and the unwavering community support needed to excel.
                                </p>
                            </div>
                        </div>

                        <!-- Card 2: Mission (Staggered down, also gold for brand unity) -->
                        <div class="flex-1 relative group mt-0">
                            <!-- Glow Backdrop -->
                            <div class="absolute inset-0 bg-ekalavya-gold/15 opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-[40px] blur-[40px] rotate-6 scale-90 group-hover:scale-110"></div>
                            
                            <div class="relative h-full bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-[32px] p-7 overflow-hidden transform transition-all duration-700 hover:-translate-y-4 hover:border-ekalavya-gold/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(244,196,48,0.3)] shadow-2xl group/card">
                                
                                <!-- Light Leak Border -->
                                <div class="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-700 p-[1px] -z-10"></div>

                                <!-- Background Abstract Pulse -->
                                <div class="absolute -left-16 -bottom-16 w-48 h-48 bg-ekalavya-gold/5 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-1000"></div>
                                
                                <!-- 3D Glass-on-Glass Icon Tile -->
                                <div class="icon-3d-wrapper mb-8">
                                    <div class="icon-3d !w-16 !h-16">
                                        <i data-lucide="target" class="w-8 h-8 text-ekalavya-gold"></i>
                                    </div>
                                </div>
                                
                                <h3 class="text-2xl font-black text-white mb-4 relative z-10 tracking-tight group-hover:text-ekalavya-gold transition-colors">Our Mission</h3>
                                <p class="text-ekalavya-slate leading-[1.8] relative z-10 text-[0.95rem] font-medium">
                                    To engineer a <span class="text-white font-bold">free, high-performance</span> educational platform that democratizes opportunities and instills a powerful sense of independent learning in millions.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <!-- Decorative intricate tech line at bottom -->
            <div class="absolute bottom-0 left-0 w-full h-px" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent);"></div>
        </section>

        <!-- BREATHTAKING EXPANDING CORE VALUES -->
        <section class="py-20 relative overflow-hidden bg-[#050505]" id="values">
            <!-- Subtle Grid Background -->
            <div class="absolute inset-0 opacity-[0.02]" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 32px 32px;"></div>
            
            <div class="container relative z-10">
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 relative" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);">
                        <span class="w-2 h-2 rounded-full bg-white/50 relative z-10"></span>
                        <span class="text-white/70 text-xs font-bold uppercase tracking-[0.2em] relative z-10">Our DNA</span>
                    </div>
                    <h2 class="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-4">
                        What <span class="bg-gradient-to-r from-ekalavya-gold via-[#ffe07a] to-white bg-clip-text text-transparent">Drives Us</span>
                    </h2>
                    <p class="text-white/50 text-lg max-w-2xl mx-auto">The non-negotiable principles that shape every decision we make at Ekalavya.</p>
                </div>

                <!-- Expanding Accordion Grid -->
                <div class="flex flex-col lg:flex-row w-full h-[700px] lg:h-[550px] gap-4 lg:gap-3">
                    
                    <!-- Value 1: Consistency -->
                    <div class="value-accordion-panel bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                        <!-- Image at base -->
                        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                        
                        <!-- Overlays on top of image but below content -->
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 z-10 transition-colors duration-700"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-ekalavya-gold/60 via-ekalavya-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color"></div>

                        <div class="w-full h-full p-6 lg:p-8 flex items-center lg:items-start lg:flex-col justify-between relative z-20">
                            <!-- Icon -->
                            <div class="icon-3d-wrapper">
                                <div class="icon-3d !w-14 !h-14 !rounded-2xl group-hover:bg-ekalavya-gold group-hover:border-ekalavya-gold transition-all duration-500">
                                    <i data-lucide="flame" class="w-7 h-7 text-white group-hover:text-black transition-colors duration-500 icon-consistency"></i>
                                </div>
                            </div>
                            
                            <!-- Content Box -->
                            <div class="ml-4 lg:ml-0 flex-1 flex flex-col justify-end w-full">
                                <h3 class="text-white font-black text-2xl lg:text-[1.7rem] tracking-tight accordion-title drop-shadow-lg">Consistency</h3>
                                <p class="text-white/90 text-[0.95rem] leading-[1.7] accordion-desc drop-shadow-md font-medium">
                                    Flash-in-the-pan motivation fades. We engineer systems that reward daily learning habits, ensuring genuine long-term success.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Value 2: Accessibility -->
                    <div class="value-accordion-panel bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                        <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                        
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 z-10 transition-colors duration-700"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-emerald-500/60 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color"></div>

                        <div class="w-full h-full p-6 lg:p-8 flex items-center lg:items-start lg:flex-col justify-between relative z-20">
                            <div class="icon-3d-wrapper">
                                <div class="icon-3d !w-14 !h-14 !rounded-2xl group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500 relative">
                                    <i data-lucide="lock" class="w-7 h-7 text-white absolute group-hover:opacity-0 transition-opacity duration-300 icon-accessibility" style="top:50%;left:50%;transform:translate(-50%,-50%);"></i>
                                    <i data-lucide="unlock" class="w-7 h-7 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 icon-accessibility-open" style="top:50%;left:50%;transform:translate(-50%,-50%);"></i>
                                </div>
                            </div>
                            
                            <div class="ml-4 lg:ml-0 flex-1 flex flex-col justify-end w-full">
                                <h3 class="text-white font-black text-2xl lg:text-[1.7rem] tracking-tight accordion-title drop-shadow-lg">Accessibility</h3>
                                <p class="text-white/90 text-[0.95rem] leading-[1.7] accordion-desc drop-shadow-md font-medium">
                                    Knowledge should not be paywalled. Ekalavya is a 100% free platform, keeping doors open for every student.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Value 3: Community -->
                    <div class="value-accordion-panel bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                        
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 z-10 transition-colors duration-700"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-purple-500/60 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color"></div>

                        <div class="w-full h-full p-6 lg:p-8 flex items-center lg:items-start lg:flex-col justify-between relative z-20">
                            <div class="icon-3d-wrapper">
                                <div class="icon-3d !w-14 !h-14 !rounded-2xl group-hover:bg-purple-500 group-hover:border-purple-500 transition-all duration-500">
                                    <i data-lucide="users" class="w-7 h-7 text-white group-hover:text-black transition-colors duration-500 icon-community"></i>
                                </div>
                            </div>
                            
                            <div class="ml-4 lg:ml-0 flex-1 flex flex-col justify-end w-full">
                                <h3 class="text-white font-black text-2xl lg:text-[1.7rem] tracking-tight accordion-title drop-shadow-lg">Community</h3>
                                <p class="text-white/90 text-[0.95rem] leading-[1.7] accordion-desc drop-shadow-md font-medium">
                                    Learning in isolation is slow. We build profound peer-to-peer networks where motivated minds elevate each other.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Value 4: Skill Growth -->
                    <div class="value-accordion-panel bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                        
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 z-10 transition-colors duration-700"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-500/60 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color"></div>

                        <div class="w-full h-full p-6 lg:p-8 flex items-center lg:items-start lg:flex-col justify-between relative z-20">
                            <div class="icon-3d-wrapper">
                                <div class="icon-3d !w-14 !h-14 !rounded-2xl group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-500 relative">
                                    <i data-lucide="book" class="w-7 h-7 text-white absolute group-hover:opacity-0 transition-opacity duration-300 icon-skill-growth" style="top:50%;left:50%;transform:translate(-50%,-50%);"></i>
                                    <i data-lucide="book-open" class="w-7 h-7 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 icon-skill-growth-open" style="top:50%;left:50%;transform:translate(-50%,-50%);"></i>
                                </div>
                            </div>
                            
                            <div class="ml-4 lg:ml-0 flex-1 flex flex-col justify-end w-full">
                                <h3 class="text-white font-black text-2xl lg:text-[1.7rem] tracking-tight accordion-title drop-shadow-lg">Skill Growth</h3>
                                <p class="text-white/90 text-[0.95rem] leading-[1.7] accordion-desc drop-shadow-md font-medium">
                                    We move beyond pure academia. We train students in tangible skills crossing multiple domains of life.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Value 5: Radical Trust -->
                    <div class="value-accordion-panel bg-[#050505] border border-white/10 rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                        <div class="absolute inset-0 bg-[#050505]/50 group-hover:bg-[#050505]/10 z-10 transition-colors duration-700"></div>
                        <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] z-0" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-indigo-500/80 via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 mix-blend-color"></div>

                        <div class="w-full h-full p-6 lg:p-8 flex items-center lg:items-start lg:flex-col justify-between relative z-20">
                            <div class="icon-3d-wrapper">
                                <div class="icon-3d !w-14 !h-14 !rounded-2xl group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-500">
                                    <i data-lucide="shield-check" class="w-7 h-7 text-white group-hover:text-black transition-colors duration-500 icon-trust"></i>
                                </div>
                            </div>
                            
                            <div class="ml-4 lg:ml-0 flex-1 flex flex-col justify-end w-full">
                                <h3 class="text-white font-black text-2xl lg:text-[1.7rem] tracking-tight accordion-title drop-shadow-lg">Radical Trust</h3>
                                <p class="text-white/90 text-[0.95rem] leading-[1.7] accordion-desc drop-shadow-md font-medium">
                                    Every mentor is verified. Every scholarship is legitimate. We provide a spam-free, ultra-secure sanctuary.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- BREATHTAKING STICKY TIMELINE (PATH TO EXCELLENCE) -->
        <section class="pt-0 pb-20 relative bg-[#020202] overflow-hidden" id="path">
            <!-- Background Orbs -->
            <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-ekalavya-gold/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            
            <div class="container relative z-10">
                <div class="grid xl:grid-cols-2 gap-16 xl:gap-24 relative">
                    
                    <!-- Left Column: Sticky Heading -->
                    <div class="xl:col-start-1 relative">
                        <div class="xl:sticky xl:top-10 flex flex-col items-start -mt-4">
                            
                            <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 relative z-10 backdrop-blur-md" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(255,255,255,0.02);">
                                <span class="w-2.5 h-2.5 rounded-full bg-white opacity-60 animate-pulse shadow-[0_0_12px_#ffffff]"></span>
                                <span class="text-white text-xs font-black uppercase tracking-[0.25em]">Get started in minutes</span>
                            </div>
                            
                            <h2 class="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter mb-8 drop-shadow-2xl">
                                Your Path to <br>
                                <span class="text-transparent bg-clip-text bg-gradient-to-r from-ekalavya-gold via-white to-ekalavya-gold drop-shadow-[0_0_20px_rgba(244,196,48,0.4)]">Excellence</span>
                            </h2>
                            
                            <p class="text-xl text-white/50 leading-relaxed font-medium mb-10 max-w-lg">
                                Three simple, frictionless steps. We designed a clear pipeline that transforms raw ambition into professional mastery. No shortcuts. Just structured, unrelenting growth.
                            </p>
                            
                            <!-- Glowing Accent Line -->
                            <div class="w-24 h-1 bg-gradient-to-r from-ekalavya-gold to-transparent rounded-full shadow-[0_0_15px_rgba(244,196,48,0.5)] hidden xl:block"></div>
                        </div>
                    </div>

                    <!-- Right Column: Vertical Timeline Steps -->
                    <div class="xl:col-start-2 relative pl-8 md:pl-0 xl:border-none pt-10">
                        <!-- Full height line (mobile/tablet only) -->
                        <div class="absolute left-0 top-0 bottom-0 w-px bg-white/10 xl:hidden"></div>

                        <!-- Step 1 -->
                        <div class="relative w-full pb-12 xl:pl-20 xl:border-l xl:border-white/10 xl:-ml-px group path-step-card">
                            <!-- Timeline Node -->
                            <div class="absolute top-0 -left-[18px] w-9 h-9 bg-[#020202] border-[3px] border-white/20 rounded-full flex items-center justify-center group-hover:bg-ekalavya-gold/10 group-hover:border-ekalavya-gold group-hover:shadow-[0_0_30px_rgba(244,196,48,0.6)] transition-all duration-300 z-10">
                                <span class="text-xs font-black text-white/50 group-hover:text-ekalavya-gold transition-colors duration-300">01</span>
                            </div>
                            
                            <!-- Content Block -->
                            <div class="w-full min-h-[540px] bg-[#080808]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-700 hover:border-ekalavya-gold/30 hover:shadow-[0_20px_60px_rgba(244,196,48,0.1)] group-hover:-translate-y-2 flex flex-col">
                                
                                <div class="relative h-64 md:h-72 w-full overflow-hidden shrink-0">
                                    <div class="absolute inset-0 bg-[#050505]/40 z-10 group-hover:bg-[#050505]/10 transition-colors duration-700"></div>
                                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200" alt="Apply" class="w-full h-full object-cover grayscale opacity-70 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                                    <!-- Gradient Overlay -->
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent z-10"></div>
                                </div>
                                
                                <div class="px-8 pb-10 pt-4 relative z-20">
                                    <div class="mb-5 flex items-center gap-5">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-14 !h-14 bg-white/5 border-white/10 rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] group-hover:bg-ekalavya-gold/10 group-hover:border-ekalavya-gold/30 transition-all duration-500">
                                                <i data-lucide="user-plus" class="w-7 h-7 text-white/70 group-hover:text-ekalavya-gold"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-3xl font-black text-white tracking-tight">Create Your Profile</h3>
                                    </div>
                                    <p class="text-white/60 text-[1.1rem] leading-[1.8] min-h-[140px]">
                                        Sign up absolutely free. Enter your class, academic history, and distinct interests. Within seconds, your personalized digital dashboard is generated and ready to go.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 2 (Zig-Zag to Left) -->
                        <div class="relative w-full pb-8 xl:pr-20 xl:border-r xl:border-white/10 xl:relative xl:right-[calc(100%+6rem)] group path-step-card">
                            <!-- Timeline Node on the Right -->
                            <div class="absolute top-0 -right-[18px] left-auto w-9 h-9 bg-[#020202] border-[3px] border-white/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 z-10">
                                <span class="text-xs font-black text-white/50 group-hover:text-blue-500 transition-colors duration-300">02</span>
                            </div>
                            
                            <div class="w-full min-h-[540px] bg-[#080808]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-700 hover:border-blue-500/30 hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)] group-hover:-translate-y-2 flex flex-col">
                                
                                <div class="relative h-64 md:h-72 w-full overflow-hidden shrink-0">
                                    <div class="absolute inset-0 bg-[#050505]/40 z-10 group-hover:bg-[#050505]/10 transition-colors duration-700"></div>
                                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200" alt="Explore" class="w-full h-full object-cover grayscale opacity-70 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent z-10"></div>
                                </div>
                                
                                <div class="px-8 pb-10 pt-4 relative z-20">
                                    <div class="mb-5 flex items-center gap-5 xl:flex-row-reverse">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-14 !h-14 bg-white/5 border-white/10 rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                                                <i data-lucide="search" class="w-7 h-7 text-white/70 group-hover:text-blue-500"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-3xl font-black text-white tracking-tight xl:text-right">Explore & Enroll</h3>
                                    </div>
                                    <p class="text-white/60 text-[1.1rem] leading-[1.8] xl:text-right min-h-[140px]">
                                        Instantly browse highly curated scholarships, book 1-on-1 mentor sessions, join collaborative peer classes, and download top-tier study notes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div class="relative w-full xl:pl-20 xl:border-l xl:border-white/10 xl:-ml-px group path-step-card">
                            <!-- Transparent border stops the timeline line perfectly on desktop -->
                            <div class="absolute top-0 -left-[18px] w-9 h-9 bg-[#020202] border-[3px] border-white/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-300 z-10">
                                <span class="text-xs font-black text-white/50 group-hover:text-emerald-500 transition-colors duration-300">03</span>
                            </div>
                            
                            <div class="w-full min-h-[540px] bg-[#080808]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl transition-all duration-700 hover:border-emerald-500/30 hover:shadow-[0_20px_60px_rgba(16,185,129,0.1)] group-hover:-translate-y-2 flex flex-col">
                                
                                <div class="relative h-64 md:h-72 w-full overflow-hidden shrink-0">
                                    <div class="absolute inset-0 bg-[#050505]/40 z-10 group-hover:bg-[#050505]/10 transition-colors duration-700"></div>
                                    <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200" alt="Streak" class="w-full h-full object-cover grayscale opacity-70 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent z-10"></div>
                                </div>
                                
                                <div class="px-8 pb-10 pt-4 relative z-20">
                                    <div class="mb-5 flex items-center gap-5">
                                        <div class="icon-3d-wrapper">
                                            <div class="icon-3d !w-14 !h-14 bg-white/5 border-white/10 rounded-2xl shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-500">
                                                <i data-lucide="trending-up" class="w-7 h-7 text-white/70 group-hover:text-emerald-500"></i>
                                            </div>
                                        </div>
                                        <h3 class="text-3xl font-black text-white tracking-tight">Build Your Streak</h3>
                                    </div>
                                    <p class="text-white/60 text-[1.1rem] leading-[1.8] min-h-[140px]">
                                        Log in daily. The habit forms the master. Track your consistency, earn exclusive badges, and stay lightyears ahead of the competition.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>



        <!-- TEAM CAROUSEL -->
        <section class="py-12" style="overflow:hidden;" id="team">
            <div class="container">
                <div class="text-center mb-14">
                    <span class="section-tag" style="background:rgba(244,196,48,0.1); color:var(--primary-gold);">The people behind it</span>
                    <h2 class="section-title">Our <span style="color:#f4c430;">Beloved Team</span></h2>
                </div>
            </div>
            <div class="team-track-wrap">
                <div class="team-track" id="team-track">
                    ${['arjun', 'priya', 'rahul', 'sneha', 'karan', 'divya', 'aditya', 'meera'].map((s, i) => {
        const names = ['Arjun Sharma', 'Priya Nair', 'Rahul Verma', 'Sneha Reddy', 'Karan Mehta', 'Divya Iyer', 'Aditya Bose', 'Meera Pillai'];
        const roles = ['Founder & CEO', 'Head of Product', 'Lead Developer', 'Design Lead', 'Scholarship Curator', 'Community Manager', 'Backend Engineer', 'Content Strategist'];
        return `<div class="team-card"><img src="https://i.pravatar.cc/120?u=${s}" alt="${names[i]}" class="team-avatar"/><p class="team-name">${names[i]}</p><p class="team-role">${roles[i]}</p></div>`;
    }).join('')}
                    ${['arjun', 'priya', 'rahul', 'sneha'].map((s, i) => {
        const names = ['Arjun Sharma', 'Priya Nair', 'Rahul Verma', 'Sneha Reddy'];
        const roles = ['Founder & CEO', 'Head of Product', 'Lead Developer', 'Design Lead'];
        return `<div class="team-card"><img src="https://i.pravatar.cc/120?u=${s}" alt="${names[i]}" class="team-avatar"/><p class="team-name">${names[i]}</p><p class="team-role">${roles[i]}</p></div>`;
    }).join('')}
                </div>
            </div>
        </section>

        <!-- PREMIUM FAQ SECTION -->
        <section class="py-20 relative bg-[#020202] overflow-hidden" id="faq">
            <!-- Background glow -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ekalavya-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div class="container relative z-10 max-w-4xl mx-auto">
                <div class="text-center mb-20 space-y-6">
                    <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full relative z-10 backdrop-blur-md" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(255,255,255,0.02);">
                        <span class="w-2.5 h-2.5 rounded-full bg-white opacity-60 animate-pulse shadow-[0_0_12px_#ffffff]"></span>
                        <span class="text-white text-xs font-black uppercase tracking-[0.25em]">Got Questions?</span>
                    </div>
                    
                    <h2 class="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl">
                        Frequently Asked <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-ekalavya-gold via-white to-ekalavya-gold drop-shadow-[0_0_20px_rgba(244,196,48,0.4)]">Questions</span>
                    </h2>
                </div>

                <div class="flex flex-col gap-5">
                    ${[
                        { q: 'What is Ekalavya?', a: 'Ekalavya is a free all-in-one educational platform for school students (Class 6–12) and undergraduates in India. Named after the legendary self-taught archer, it connects students with scholarships, verified mentors, peer sessions, academic notes, and a consistency tracker.' },
                        { q: 'Is it completely free for students?', a: 'Yes. Every feature — scholarship search, mentor sessions, peer connect, library downloads, and the consistency dashboard — is 100% free for students. Always. There is zero friction and no hidden paywalls.' },
                        { q: 'How do I enroll in a mentoring session?', a: 'Create a free account, go to the Skill-Based Mentoring page, browse available sessions, and click "Enroll Free". You will receive a confirmation and the session link before it goes live.' },
                        { q: 'How are scholarships verified?', a: 'Each scholarship is reviewed and heavily vetted by the Ekalavya admin team before being listed. You will see a Verified badge (green), In Progress (orange), or Not Verified (red) tag on every single listing.' },
                        { q: 'Can I teach on Peer Connect?', a: 'Yes! Apply for Verified Teach access from your dashboard. Once approved, you can create and host peer learning sessions on any topic you have demonstrated mastery in.' },
                    ].map((f, i) => `
                        <div class="faq-item group relative bg-[#080808]/80 backdrop-blur-2xl border border-white/5 rounded-3xl cursor-pointer transition-all duration-500 hover:border-white/10 hover:bg-[#0f0f0f] shadow-lg" data-open="false">
                            
                            <!-- Animated Top Glow Line -->
                            <div class="faq-glow-bar absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-gradient-to-r from-transparent via-ekalavya-gold to-transparent opacity-0 transition-opacity duration-500"></div>

                            <div class="px-8 py-7 w-full flex justify-between items-center gap-6">
                                <h4 class="text-xl font-bold text-white/70 group-hover:text-white transition-colors duration-300 faq-question leading-snug">
                                    ${f.q}
                                </h4>
                                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 faq-icon-box transition-all duration-500 group-hover:bg-white/10">
                                    <i data-lucide="chevron-down" class="w-6 h-6 text-white/50 group-hover:text-ekalavya-gold transition-all duration-500 faq-chevron"></i>
                                </div>
                            </div>
                            
                            <div class="faq-answer-wrapper grid" style="grid-template-rows: 0fr; transition: grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1);">
                                <div class="overflow-hidden">
                                    <div class="px-8 pb-8 text-white/50 text-lg leading-relaxed border-t border-white/5 mt-2 pt-6">
                                        <p>${f.a}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- FINAL CTA with REACT BITS LIGHT RAYS -->
        <section class="py-20 relative overflow-hidden bg-[#020202]">
            <!-- THE VOLUMETRIC LIGHT RAYS -->
            <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                    const rotation = -50 + (i * 14.28); 
                    const duration = 15 + (i % 3) * 5;
                    const delay = (i * 2.5) % 10;
                    const width = 8 + (i % 4) * 2;
                    const blur = 30 + (i % 3) * 10;
                    return `
                    <div class="absolute top-[-10%] left-1/2 origin-top mix-blend-screen pointer-events-none"
                         style="
                            width: ${width}vw;
                            height: 140%;
                            background: linear-gradient(180deg, rgba(244,196,48,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 100%);
                            filter: blur(${blur}px);
                            --base-rotation: ${rotation}deg;
                            animation: premium-light-ray ${duration}s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
                            animation-delay: -${delay}s;
                         ">
                    </div>`;
                }).join('')}
            </div>

            <div class="container relative z-10">
                <div class="w-full max-w-5xl mx-auto bg-[#080808]/60 backdrop-blur-3xl border border-white/10 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(244,196,48,0.05)]">
                    <!-- Internal Card Glows -->
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-ekalavya-gold/50 to-transparent"></div>
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[200px] bg-ekalavya-gold/20 blur-[100px] pointer-events-none"></div>
                    
                    <div class="relative z-10">
                        <div class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 relative z-10 backdrop-blur-md" style="background:rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 0 30px rgba(255,255,255,0.02);">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-80 animate-pulse shadow-[0_0_12px_#34d399]"></span>
                            <span class="text-white text-xs font-black uppercase tracking-[0.25em]">Free forever for students</span>
                        </div>
                        
                        <h2 class="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.05] drop-shadow-2xl">
                            Ready to Start Your<br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-ekalavya-gold via-white to-ekalavya-gold drop-shadow-[0_0_20px_rgba(244,196,48,0.3)]">Journey?</span>
                        </h2>
                        
                        <p class="text-xl md:text-2xl text-white/50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
                            No cost. No catch. Just you, your goals, and a community pushing you forward.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button onclick="window.showAuthModal()" class="group relative px-8 py-5 bg-white text-black font-black text-lg rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 active:translate-x-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                                <span class="relative z-10 flex items-center gap-3">
                                    Join Ekalavya Now
                                    <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                                </span>
                                <div class="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                        
                        <p class="mt-8 text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Zero friction. Maximum impact.</p>
                    </div>
                </div>
            </div>
        </section>
    `,

    init: () => {
        // Premium FAQ Accordion Logic
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                const isOpen = item.dataset.open === 'true';
                
                // Close all others
                document.querySelectorAll('.faq-item').forEach(other => {
                    if (other !== item && other.dataset.open === 'true') {
                        other.dataset.open = 'false';
                        other.querySelector('.faq-answer-wrapper').style.gridTemplateRows = '0fr';
                        other.querySelector('.faq-glow-bar').classList.remove('opacity-100');
                        other.querySelector('.faq-question').classList.remove('text-white');
                        other.querySelector('.faq-icon-box').classList.remove('bg-ekalavya-gold/10', 'border-ekalavya-gold/30');
                        other.querySelector('.faq-chevron').style.transform = 'rotate(0deg)';
                        other.querySelector('.faq-chevron').classList.replace('text-ekalavya-gold', 'text-white/50');
                    }
                });

                // Toggle current
                if (isOpen) {
                    item.dataset.open = 'false';
                    item.querySelector('.faq-answer-wrapper').style.gridTemplateRows = '0fr';
                    item.querySelector('.faq-glow-bar').classList.remove('opacity-100');
                    item.querySelector('.faq-question').classList.remove('text-white');
                    item.querySelector('.faq-icon-box').classList.remove('bg-ekalavya-gold/10', 'border-ekalavya-gold/30');
                    item.querySelector('.faq-chevron').style.transform = 'rotate(0deg)';
                    item.querySelector('.faq-chevron').classList.replace('text-ekalavya-gold', 'text-white/50');
                } else {
                    item.dataset.open = 'true';
                    item.querySelector('.faq-answer-wrapper').style.gridTemplateRows = '1fr';
                    item.querySelector('.faq-glow-bar').classList.add('opacity-100');
                    item.querySelector('.faq-question').classList.add('text-white');
                    item.querySelector('.faq-icon-box').classList.add('bg-ekalavya-gold/10', 'border-ekalavya-gold/30');
                    item.querySelector('.faq-chevron').style.transform = 'rotate(180deg)';
                    item.querySelector('.faq-chevron').classList.replace('text-white/50', 'text-ekalavya-gold');
                }
            });
        });

        // Team carousel
        const track = document.getElementById('team-track');
        if (track) {
            let pos = 0;
            let paused = false;
            const halfWidth = track.scrollWidth / 2;
            track.parentElement.addEventListener('mouseenter', () => { paused = true; });
            track.parentElement.addEventListener('mouseleave', () => { paused = false; });
            const tick = () => {
                if (!paused) {
                    pos += 0.6;
                    if (pos >= halfWidth) pos = 0;
                    track.style.transform = 'translateX(-' + pos + 'px)';
                }
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }

        // Step Cards 3D Tilt Effect
        document.querySelectorAll('.step-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
            });
        });

        // Showcase Tab Logic
        const tabs = document.querySelectorAll('.feature-tab');
        const panels = document.querySelectorAll('.showcase-panel');
        const highlight = document.getElementById('active-highlight');
        const glow = document.getElementById('showcase-glow');
        
        const glows = {
            'scholarships': 'bg-ekalavya-gold/20',
            'mentors': 'bg-blue-500/20',
            'community': 'bg-purple-500/20',
            'library': 'bg-emerald-500/20'
        };

        // Function to update highlight position and height dynamically
        const updateHighlight = (tab) => {
            if (!highlight || !tab) return;
            
            // Use requestAnimationFrame to ensure DOM has updated
            requestAnimationFrame(() => {
                const rect = tab.getBoundingClientRect();
                const parentRect = tab.parentElement.getBoundingClientRect();
                const height = tab.offsetHeight;
                const top = tab.offsetTop;
                
                highlight.style.height = `${height}px`;
                highlight.style.transform = `translateY(${top}px)`;
            });
        };

        if (tabs.length > 0 && highlight) {
            // Init highlight position
            setTimeout(() => {
                const firstTab = tabs[0];
                updateHighlight(firstTab);
            }, 100);

            tabs.forEach((tab) => {
                tab.addEventListener('mouseenter', () => {
                    // Update active class
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Update Tabs Styling
                    tabs.forEach(t => {
                        const title = t.querySelector('.tab-title');
                        const desc = t.querySelector('.tab-desc');
                        if (t === tab) {
                            title.classList.add('text-white');
                            title.classList.remove('text-white/40', 'text-white/50');
                            desc.style.height = `${desc.scrollHeight}px`;
                            desc.style.opacity = '1';
                            desc.style.marginTop = '0.25rem';
                        } else {
                            title.classList.remove('text-white');
                            title.classList.add('text-white/40');
                            desc.style.height = '0px';
                            desc.style.opacity = '0';
                            desc.style.marginTop = '0px';
                        }
                    });

                    // Update highlight after description animation completes
                    setTimeout(() => {
                        updateHighlight(tab);
                    }, 50);

                    // Update Panels
                    const target = tab.getAttribute('data-target');
                    panels.forEach(panel => {
                        if (panel.id === `panel-${target}`) {
                            panel.classList.remove('is-inactive');
                            panel.classList.add('is-active');
                            // Also remove the raw tailwind classes that were on the initial HTML elements
                            panel.classList.remove('opacity-0', 'opacity-100', 'translate-y-12', 'translate-y-0', 'scale-95', 'scale-100', 'rotate-x-12', 'pointer-events-none');
                        } else {
                            panel.classList.remove('is-active');
                            panel.classList.add('is-inactive');
                            panel.classList.remove('opacity-0', 'opacity-100', 'translate-y-12', 'translate-y-0', 'scale-95', 'scale-100', 'rotate-x-12', 'pointer-events-none');
                        }
                    });

                    // Update Glow
                    if (glow) {
                        glow.className = `absolute top-1/2 left-1/2 rounded-full filter blur-[80px] opacity-70 transition-colors duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] showcase-glow w-[350px] h-[350px] ${glows[target]}`;
                    }
                });
            });

            // Add ResizeObserver to update highlight when tab content changes
            const resizeObserver = new ResizeObserver(() => {
                const activeTab = document.querySelector('.feature-tab.active');
                if (activeTab) {
                    updateHighlight(activeTab);
                }
            });

            tabs.forEach(tab => {
                resizeObserver.observe(tab);
            });

            // Update highlight on window resize
            window.addEventListener('resize', () => {
                const activeTab = document.querySelector('.feature-tab.active');
                if (activeTab) {
                    updateHighlight(activeTab);
                }
            });
        }

        // Navbar Scroll-Spy Logic
        const navLinks = document.querySelectorAll('#md-nav .nav-pill');
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Only update if the section has a corresponding nav link
                    const targetLink = document.querySelector(`#md-nav a[href="#${id}"]`);
                    if (targetLink) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        targetLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
        
        // --- NEW: Path Step Scroll-Glow Logic ---
        const stepCards = document.querySelectorAll('.path-step-card');
        const stepObserverOptions = {
            root: null,
            rootMargin: '0px 0px -25% 0px', // Activate when card is 25% from bottom
            threshold: 0.15 // 15% visibility
        };

        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    // Optional: remove if you want it to stop glowing when scrolling away
                    // entry.target.classList.remove('is-active');
                }
            });
        }, stepObserverOptions);

        stepCards.forEach(card => stepObserver.observe(card));

        if (window.lucide) window.lucide.createIcons();
    }
};