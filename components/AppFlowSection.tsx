import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    img: "/flow1.png",
    caption: "User feels unsafe and opens the Hive app to send an SOS alert.",
  },
  {
    img: "/flow2.png",
    caption: "The Hive network is instantly notified and nearby users are alerted.",
  },
  {
    img: "/flow3.png",
    caption: "Community members respond and help is coordinated in real time.",
  },
  {
    img: "/flow4.png",
    caption: "The user can see help approaching and feels safer with Hive.",
  },
  {
    img: "/flow5.png",
    caption: "Hive keeps everyone connected and protected in the community.",
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