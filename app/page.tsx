"use client"
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { NavbarDemo } from "./navbar";
import FormSection from "@/components/FormSection";
import AppFlowSection from "@/components/AppFlowSection";

export default function Home() {
  return (
    <div className="min-h-screen   text-white relative overflow-hidden">
      {/* Navigation */}
      <NavbarDemo/>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <BackgroundBeams className="opacity-20 md:opacity-40" />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"></div> */}
        <div className="text-center max-w-6xl mx-auto relative z-10 px-6">
                    <h1 className="hero-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6 md:mb-8">
            Your Neighborhood
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-300 bg-clip-text text-transparent animate-pulse"> HIVE</span>
          </h1>
          <p className="hero-subheading text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-200 mb-4 md:mb-6">
            Where neighbors become <span className="text-yellow-400">first responders</span>
          </p>
          <p className="hero-description text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed">
            When seconds matter, your community responds faster than police. Hive creates a ripple effect - starting with your closest neighbors and expanding outward until help arrives.
          </p>
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="#join" className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 text-black px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 shadow-lg inline-block">
                  Join the Movement
                </a>
                <a href="#how-it-works" className="border-2 border-yellow-500 text-yellow-500 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/5 inline-block">
                  See How It Works
                </a>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-4">Hyperlocal Safety Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where neighbors become first responders - faster than traditional emergency services
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Ripple Effect SOS</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Instantly alert your closest neighbors first, then expand outward in a ripple effect until responders are found. Your community becomes your first line of defense.
            </p>
            </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Community Response Network</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Real-time coordination between nearby residents, shop owners, and passersby. Multiple responders can approach from different directions simultaneously.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Neighbor Verification</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Verified community members with background checks. Know that your nearby responders are trusted neighbors, not strangers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Dynamic Range Response</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Watch the ripple expand in real-time as Hive finds the closest available responders. See exactly how many people are responding and their arrival times.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Backup Emergency Services</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              While neighbors respond immediately, Hive automatically contacts police and emergency services as backup support.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700/50 backdrop-blur-sm hover:border-yellow-500/30 hover:scale-105">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
              <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Privacy First</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Complete control over your data with end-to-end encryption and customizable privacy settings for ultimate peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* App Flow Section */}
      <div id="how-it-works">
        <AppFlowSection />
      </div>

      {/* Form Section */}
      <div id="join">
      <FormSection />
      </div>

            {/* Join Waitlist Section */}
            <section  className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-3xl p-12 text-center text-black relative overflow-hidden">
          <BackgroundBeams className="opacity-10 md:opacity-20" />
          <div className="relative z-10">
            <h2 className="font-heading text-4xl font-bold mb-6">Meet the Team</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              The passionate people behind Hive
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              {/* Team Member 1 */}
              <div className="flex flex-col items-center">
                <img src="https://i.pravatar.cc/150?img=1" alt="Jane Doe" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-yellow-400" />
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Jane Doe
                  <a href="https://linkedin.com/in/janedoe" target="_blank" rel="noopener noreferrer" aria-label="Jane Doe LinkedIn">
                    <svg className="w-5 h-5 text-blue-700 hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                  </a>
                </h3>
                <p className="text-yellow-600 mb-2">Founder & CEO</p>
              </div>
              {/* Team Member 2 */}
              <div className="flex flex-col items-center">
                <img src="https://i.pravatar.cc/150?img=2" alt="John Smith" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-yellow-400" />
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  John Smith
                  <a href="https://linkedin.com/in/johnsmith" target="_blank" rel="noopener noreferrer" aria-label="John Smith LinkedIn">
                    <svg className="w-5 h-5 text-blue-700 hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                  </a>
                </h3>
                <p className="text-yellow-600 mb-2">CTO</p>
              </div>
              {/* Team Member 3 */}
              <div className="flex flex-col items-center">
                <img src="https://i.pravatar.cc/150?img=3" alt="Priya Patel" className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-yellow-400" />
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Priya Patel
                  <a href="https://linkedin.com/in/priyapatel" target="_blank" rel="noopener noreferrer" aria-label="Priya Patel LinkedIn">
                    <svg className="w-5 h-5 text-blue-700 hover:text-blue-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
                  </a>
                </h3>
                <p className="text-yellow-600 mb-2">Head of Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
