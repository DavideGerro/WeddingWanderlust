import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  time: string;
  description: string;
  isEven: boolean;
  delay?: number;
}

const TimelineItem = ({ title, time, description, isEven, delay = 0 }: TimelineItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div ref={ref} className="timeline-item mb-16 md:mb-0 relative">
      <div className="timeline-dot" style={{ top: "40px" }}></div>
      
      <div className="md:grid md:grid-cols-2 md:gap-8 relative z-10">
        <motion.div 
          className={`md:text-right p-4 ${isEven ? "md:pr-16" : "md:pr-16 md:order-1"}`}
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
          transition={{ duration: 0.6, delay: 0.2 + delay }}
        >
          <h4 className="font-display text-xl text-gold">{title}</h4>
          <span className="font-medium">{time}</span>
        </motion.div>
        
        <motion.div 
          className={`${isEven ? "bg-white p-4 rounded-lg shadow-md md:ml-16 mb-8 md:mb-16" : "bg-white p-4 rounded-lg shadow-md mb-8 md:mb-16 md:order-0"}`}
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 30 : -30 }}
          transition={{ duration: 0.6, delay: 0.4 + delay }}
        >
          <p className="text-gray-600">
            {description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineItem;
