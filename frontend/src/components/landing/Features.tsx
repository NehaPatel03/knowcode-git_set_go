import { Box, BarChart3, Users, TrendingUp, ArrowBigUp, PlusCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState, useRef } from "react";

const features = [
  {
    icon: Box,
    title: "Product Display & Management",
    description:
      "Showcase sustainable products with an intuitive interface. Manage inventory effectively and track stock levels in real-time.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with comprehensive sales analytics. Make data-driven decisions to optimize your operations.",
  },
  {
    icon: Users,
    title: "SHG Collaboration",
    description:
      "Connect with Self-Help Groups seamlessly. Foster partnerships that drive sustainable economic growth.",
  },
];

const Features = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateNumbers();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000;
    const interval = 20;
    
    const animate = (start: number, end: number, setter: (value: number) => void) => {
      const steps = duration / interval;
      const increment = (end - start) / steps;
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setter(end);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, interval);
    };

    animate(0, 2000, setCount1);
    animate(0, 500, setCount2);
    animate(0, 150, setCount3);
  };

  return (
    <>
      <section id="features" className="py-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
              Platform Features
            </h2>
            <p className="text-white/80 text-lg animate-fade-in delay-100">
              Everything you need to succeed in sustainable commerce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm overflow-hidden"
              >
                <CardContent className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  <div className="relative z-10">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-secondary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div ref={statsRef} className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: count1, label: "Active Users", suffix: "+", icon: Users },
              { number: count2, label: "Products Listed", suffix: "+", icon: TrendingUp },
              { number: count3, label: "Partner Companies", suffix: "+", icon: PlusCircle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <stat.icon className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-gray-600 group-hover:text-primary transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;