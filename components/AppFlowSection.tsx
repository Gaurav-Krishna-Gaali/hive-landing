import Image from "next/image";
import { motion } from "framer-motion";
import { trackVideoInteraction } from "@/lib/posthog";

const steps = [
  {
    type: "video",
    src: "videos/sarah_walking.mp4",
    caption: "Shreya was returning late from her night shift at the hospital when she noticed someone following her through a dark alley. She quickly pulled out her phone and opened the Hive app.",
  },
  {
    type: "video",
    src: "videos/sarah_button_press.mp4",
    caption: "With trembling fingers, Shreya sent an SOS distress signal through the Hive app. The ripple effect began - starting with her closest volunteers and expanding outward.",
  },
  {
    type: "video",
    src: "videos/sarah_ripples.mp4",
    caption: "The alert reached nearby guardians. Within moments, three verified responders were by her side. Shreya wasn’t alone. Residents and passersby coordinated while others called for backup",
  },
  {
    type: "video",
    src: "videos/sarah_community.mp4",
    caption: "Shreya could see on her app that help was approaching from multiple directions. The hyperlocal response made her feel instantly safer.",
  },
  {
    type: "video",
    src: "videos/hive_app.mp4",
    caption: "Shreya made it home safely. Thanks to the guardians who got there faster, just when it mattered.",
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
                {step.type === 'video' ? (
                  <video
                    src={step.src}
                    className="w-full h-full object-contain rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onPlay={() => trackVideoInteraction(step.src, 'play', { step_index: idx, step_caption: step.caption })}
                    onPause={() => trackVideoInteraction(step.src, 'pause', { step_index: idx, step_caption: step.caption })}
                    onEnded={() => trackVideoInteraction(step.src, 'complete', { step_index: idx, step_caption: step.caption })}
                  />
                ) : (
                  <Image
                    src={step.src}
                    alt={step.caption}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority={idx === 0}
                  />
                )}
              </div>
              <p className="text-lg text-center font-medium text-gray-800">{step.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}