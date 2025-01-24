import { Card, CardContent } from "@/components/ui/card";
import { Star, User } from "lucide-react";

const testimonials = [
  {
    name: "Rina Patel",
    role: "Self-Help Group Leader",
    content:
      "Drishti has transformed our outreach. The seamless integration of inventory management and bulk order capabilities has made it easier for us to connect with companies committed to sustainability. Our sales analytics have been a game-changer for decision-making!",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    role: "Operations Manager",
    content:
      "The Drishti platform has empowered our business to scale sustainably. By connecting us with Self-Help Groups, we are able to source eco-friendly products while supporting local communities. It's a win-win!",
    rating: 5,
  },
  {
    name: "Sita Verma",
    role: "Social Enterprise Founder",
    content:
      "Working with Drishti has been a revelation. The platform's microfinance features and emphasis on analytics have helped us to not only grow but to do so in a way that respects our environmental commitments. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Client Experiences with Drishti
          </h2>
          <p className="text-gray-600">Hear from our partners</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-3">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;