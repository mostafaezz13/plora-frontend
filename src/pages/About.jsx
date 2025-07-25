import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Truck, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500 dark:text-pink-400" />,
      title: "Trendy Styles",
      desc: "We keep things fresh and totally on point.",
    },
    {
      icon: <Truck className="w-8 h-8 text-pink-500 dark:text-pink-400" />,
      title: "Fast Shipping",
      desc: "Your pieces, delivered quick & safe across Egypt.",
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500 dark:text-pink-400" />,
      title: "Made with Love",
      desc: "Every piece is picked with care, just for you.",
    },
  ];

  return (
    <section
      className="md:h-screen transition-colors duration-500 bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-950 py-10 px-6 sm:px-12"
      id="about"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight transition-colors duration-500"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About{" "}
          <span className="text-pink-500 dark:text-pink-400 transition-colors duration-500">
            PLORA
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          At PLORA, we believe jewelry should be fun, bold, and totally you.
          From cute rings to classy earrings, We've got the pieces that complete
          your vibe. Whether you're dressing up or keeping it casual, we've got
          your sparkle covered ✨
        </motion.p>

        <motion.div
          className="mt-10 space-y-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>📦 Ships anywhere in Egypt</p>
          <p>📲 DM us anytime for help or custom orders</p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3 text-left">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-pink-50 dark:hover:bg-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
            >
              {feature.icon}
              <h4 className="text-xl font-semibold mt-4 text-gray-800 dark:text-white transition-colors duration-500">
                {feature.title}
              </h4>
              <p className="text-gray-500 dark:text-gray-300 mt-2 transition-colors duration-500">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
