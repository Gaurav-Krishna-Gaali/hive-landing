import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    img: "/flow1.png",
    caption: "Sarah was returning late from her night shift at the hospital when she noticed someone following her through a dark alley. She quickly pulled out her phone and opened the Hive app.",
  },
  {
    img: "/flow2.png",
    caption: "With trembling fingers, Sarah sent an SOS distress signal through the Hive app. Within seconds, the network sprang into action!",
  },
  {
    img: "/flow3.png",
    caption: "The hyperlocal community rallied together - nearby residents, shop owners, and passersby coordinated the response. Some started walking toward Sarah while others called emergency services as backup.",
  },
  {
    img: "/flow4.png",
    caption: "Sarah could see on her app that help was approaching from multiple directions - her actual neighbors who live just blocks away. The hyperlocal response made her feel instantly safer.",
  },
  {
    img: "/flow5.png",
    caption: "Thanks to Hive's hyperlocal approach, Sarah made it home safely. The community proved that nearby neighbors are often the fastest first responders when seconds matter most.",
  },
];

export default function AppFlowSection() {
  return (
    <section className="w-full max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">How Hive Works</h2>
      <div className="relative flex flex-col items-center">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 -translate-x-1/2 z-0" style={{ minHeight: steps.length * 220 }} />
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="relative z-10 flex flex-col items-center mb-16 last:mb-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center w-full max-w-md">
              <div className="w-full h-64 relative mb-4">
                <Image
                  src={step.img}
                  alt={step.caption}
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={idx === 0}
                />
              </div>
              <p className="text-lg text-center font-medium text-gray-800">{step.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 