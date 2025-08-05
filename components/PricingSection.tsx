"use client"
import { Check, Star, Shield, Users, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  return (
    <section id="pricing" className="min-h-screen px-4 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                <Star className="w-10 h-10 text-black" fill="currentColor" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Safety Should Be
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Free</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          At Hive, we believe safety is a fundamental right, not a privilege. That’s why our platform is completely free, now and always. We’re committed to keeping it that way by seeking sustainable support through future partnerships.          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <div className="relative max-w-2xl w-full">
            {/* Gradient Border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-3xl blur opacity-30"></div>
            
            <div className="relative bg-gray-900/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-gray-800/50">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 px-6 py-2 rounded-full text-black font-bold text-sm shadow-lg">
                  🎉 LIFETIME FREE
                </div>
              </div>

              {/* Plan Name */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Hive Community</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-6xl font-bold text-yellow-400">₹0</span>
                  <span className="text-gray-400 text-lg">/forever</span>
                </div>
                <p className="text-gray-300">Join the movement for safer communities</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Unlimited SOS alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Ripple effect community response</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Verified guardian network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Automatic emergency services backup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Real-time location tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">Privacy-first design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">24/7 community support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">No hidden fees, ever</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-yellow-500/25"
                  onClick={() => {
                    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" fill="currentColor" />
                    Join the Mission
                  </div>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm text-gray-400">Community Driven</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm text-gray-400">Privacy First</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <span className="text-sm text-gray-400">Instant Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Free Section */}
        {/* <div className="text-center space-y-8">
          <h3 className="text-3xl font-bold text-white">Why We're Committed to Being Free</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-black" fill="currentColor" />
              </div>
              <h4 className="text-xl font-bold text-white">Safety is a Right</h4>
              <p className="text-gray-300">Every woman deserves to feel safe without financial barriers. Safety shouldn't be a luxury.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-bold text-white">Community First</h4>
              <p className="text-gray-300">We believe in the power of community. The more people who join, the safer we all become.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-black" fill="currentColor" />
              </div>
              <h4 className="text-xl font-bold text-white">Mission Over Money</h4>
              <p className="text-gray-300">Our mission is to make communities safer, not to profit from people's safety concerns.</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default PricingSection; 