"use client"
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Sparkles } from "@/components/ui/sparkles";
import { MovingBorder } from "@/components/ui/moving-border";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { NavbarDemo } from "./navbar";
import FormSection from "@/components/FormSection";
import AppFlowSection from "@/components/AppFlowSection";

export default function Home() {
  return (
    <div className="min-h-screen   text-white relative overflow-hidden">
      {/* Navigation */}
      <NavbarDemo/>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <BackgroundBeams className="opacity-30" />
        <div className="text-center max-w-4xl mx-auto relative z-10 px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Neighborhood
            <Sparkles className="inline-block ml-2">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> HIVE</span>
            </Sparkles>
          </h1>
          <p className="text-3xl md:text-4xl text-gray-300 mb-4 font-semibold">
            Where neighbors become first responders
          </p>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            When seconds matter, your community responds faster than police. Hive creates a ripple effect - starting with your closest neighbors and expanding outward until help arrives.
          </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Sparkles>
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all">
                  Join the Movement
                </button>
              </Sparkles>
              <button className="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-500 hover:text-black transition-all">
                See How It Works
              </button>
            </div>
        </div>
      </section>

      {/* Vision Section */}
      {/* <section id="vision" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Sparkles>
            <h2 className="text-4xl font-bold text-white mb-4">Our Vision</h2>
          </Sparkles>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We believe every woman deserves to feel safe and empowered. Hive is more than just an app – it's a movement towards creating safer communities and stronger support networks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">The Problem We're Solving</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Women often feel unsafe walking alone, especially at night</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Existing safety apps are clunky and not user-friendly</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Lack of real-time communication with trusted contacts</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">No seamless integration between safety and daily life</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">Our Solution</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Intuitive, beautiful interface that feels natural to use</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">One-tap emergency alerts with instant location sharing</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Smart safety network with trusted friends and family</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <p className="text-gray-300">Seamless integration with daily routines and activities</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Sparkles>
            <h2 className="text-4xl font-bold text-white mb-4">Hyperlocal Safety Features</h2>
          </Sparkles>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where neighbors become first responders - faster than traditional emergency services
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Ripple Effect SOS</h3>
            <p className="text-gray-300">
              Instantly alert your closest neighbors first, then expand outward in a ripple effect until responders are found. Your community becomes your first line of defense.
            </p>
            </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Community Response Network</h3>
            <p className="text-gray-300">
              Real-time coordination between nearby residents, shop owners, and passersby. Multiple responders can approach from different directions simultaneously.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Neighbor Verification</h3>
            <p className="text-gray-300">
              Verified community members with background checks. Know that your nearby responders are trusted neighbors, not strangers.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Dynamic Range Response</h3>
            <p className="text-gray-300">
              Watch the ripple expand in real-time as Hive finds the closest available responders. See exactly how many people are responding and their arrival times.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Backup Emergency Services</h3>
            <p className="text-gray-300">
              While neighbors respond immediately, Hive automatically contacts police and emergency services as backup support.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-800">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Privacy First</h3>
            <p className="text-gray-300">
              Complete control over your data with end-to-end encryption and customizable privacy settings for ultimate peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Join Waitlist Section */}
      <section id="join" className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-3xl p-12 text-center text-black relative overflow-hidden">
          <BackgroundBeams className="opacity-20" />
          <div className="relative z-10">
            <Sparkles>
              <h2 className="text-4xl font-bold mb-6">Be Part of the Movement</h2>
            </Sparkles>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our waitlist to be among the first to experience Hive when we launch. Help us shape the future of women's safety technology.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="bg-black text-yellow-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-900 transition-colors whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
              <p className="text-sm mt-4 opacity-90">
                We'll notify you when Hive is ready and keep you updated on our progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <FormSection />

      {/* App Flow Section */}
      <AppFlowSection />

      {/* Footer */}
      <footer id="contact" className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-white">Hive</span>
          </div>
          <p className="text-gray-300 mb-6">
            Empowering women with safety and connection
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">About Us</a>
            <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a>
            <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
