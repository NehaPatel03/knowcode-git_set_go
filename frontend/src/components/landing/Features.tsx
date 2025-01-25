import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faChartLine, faUsers, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const companyFeatures = [
  {
    icon: faBuilding,
    title: "Access to Diverse Sustainable Products",
    description:
      "Companies can browse and procure a variety of eco-friendly and handcrafted products from SHGs, making it easier to align their procurement practices with sustainability goals.",
  },
  {
    icon: faChartLine,
    title: "Streamlined Bulk Ordering",
    description:
      "The platform simplifies the bulk ordering process by facilitating direct communication and coordination between companies and SHGs, ensuring seamless collaboration",
  },
  {
    icon: faChartLine,
    title: "Corporate Social Responsibility (CSR) Integration",
    description:
      "Partnering with SHGs through the platform allows companies to directly contribute to grassroots-level empowerment, enhancing their CSR initiatives and brand image.",
  },
];

const shgFeatures = [
  {
    icon: faUsers,
    title: "Collaboration Opportunities",
    description:
      "Connect seamlessly with companies and other SHGs to foster partnerships that drive sustainable economic growth.",
  },
  {
    icon: faChartLine,
    title: "Microfinance Integration",
    description:
      "Access microfinance options directly through the platform to grow your operations and manage financial needs.",
  },
  {
    icon: faChartLine,
    title: "Enhanced Market Access",
    description:
      "SHGs can showcase their products on a dedicated platform, reaching a broader audience, including corporate buyers, who are more likely to place bulk orders. This helps in scaling their business beyond local markets.",
  },
];

const Features = () => {
  const [activeSection, setActiveSection] = useState<"companies" | "shgs" | null>(null);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = {
    initial: { scale: 1 },
    expanded: { scale: 1.05 },
    collapsed: { scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-primary via-secondary to-accent relative">
      <div className="absolute inset-0 bg-pattern bg-opacity-10" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
          <p className="text-white/80 text-lg">Everything you need to succeed in sustainable commerce</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Companies Section */}
          <motion.div
            className="group relative p-8 bg-white rounded-xl shadow-lg transition-all transform cursor-pointer h-full"
            variants={containerVariants}
            initial="initial"
            animate={activeSection === "companies" ? "expanded" : "collapsed"}
            onMouseEnter={() => setActiveSection("companies")}
            onMouseLeave={() => setActiveSection(null)}
          >
            <h3 className="text-4xl font-bold text-primary text-center mb-4 group-hover:text-gradient-primary transition-colors">
              <FontAwesomeIcon icon={faBuilding} className="mr-5" />
              For Companies
            </h3>
            {activeSection === "shgs" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              >
                <img
                  src="./public/companyimg.png"
                  alt="SHG"
                  className="h-48 w-48 object-cover rounded-full shadow-lg"
                />
              </motion.div>
            )}
            {activeSection === "companies" && (
              <motion.div
                className="grid grid-cols-1 gap-4 mt-4 z-20 relative"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.2 }}
              >
                {companyFeatures.map((feature, index) => (
                  <motion.div key={index} variants={fadeInUpVariants}>
                    <Card className="border-none shadow-md bg-white/90">
                      <CardContent className="flex items-center p-4">
                        <FontAwesomeIcon icon={feature.icon} className="h-8 w-8 text-primary mr-4" />
                        <div>
                          <h4 className="font-semibold text-primary">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* SHGs Section */}
          <motion.div
            className="group relative p-8 bg-white rounded-xl shadow-lg transition-all transform cursor-pointer h-full"
            variants={containerVariants}
            initial="initial"
            animate={activeSection === "shgs" ? "expanded" : "collapsed"}
            onMouseEnter={() => setActiveSection("shgs")}
            onMouseLeave={() => setActiveSection(null)}
          >
            <h3 className="text-4xl font-bold text-primary text-center mb-4 ml-5 group-hover:text-gradient-primary transition-colors">
              <FontAwesomeIcon icon={faUserGroup} className="mr-5" />
              For SHGs
            </h3>
            {activeSection === "companies" && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5 }}
              >
                <img
                  src="./public/shgimg.png"
                  alt="Company"
                  className="h-48 w-48 object-cover rounded-full shadow-lg"
                />
              </motion.div>
            )}
            {activeSection === "shgs" && (
              <motion.div
                className="grid grid-cols-1 gap-4 mt-4 z-20 relative"
                variants={fadeInUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.2 }}
              >
                {shgFeatures.map((feature, index) => (
                  <motion.div key={index} variants={fadeInUpVariants}>
                    <Card className="border-none shadow-md bg-white/90">
                      <CardContent className="flex items-center p-4">
                        <FontAwesomeIcon icon={feature.icon} className="h-8 w-8 text-primary mr-4" />
                        <div>
                          <h4 className="font-semibold text-primary">{feature.title}</h4>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
