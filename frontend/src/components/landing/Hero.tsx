import { Button } from "@/components/ui/button";;
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10">
      <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="container mx-auto px-4 py-20 relative mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Beautiful Products & 
              <span className="block text-primary">Sustainable</span>
              Solutions.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl animate-fade-in delay-100">
              Connect with Self-Help Groups and discover a world of sustainable products. 
              Our platform enables efficient inventory management and seamless bulk ordering.
            </p>
            <div className="flex gap-4 animate-fade-in delay-200">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-light text-white transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in delay-300">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img
                src="./public/shgimage.png"
                alt="Platform Preview"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-3xl -z-10 transform -rotate-6 scale-95" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;