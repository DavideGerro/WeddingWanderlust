import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";
import RsvpDialog from "@/components/ui/RsvpDialog";

const RsvpSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  
  const [rsvpDialogOpen, setRsvpDialogOpen] = useState(false);
  const [isAttending, setIsAttending] = useState(true);

  return (
    <section id="rsvp" ref={ref} className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="text-5xl">💌</span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-4 text-gray-800">
            {t.rsvp.title}
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            {t.rsvp.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg shadow-md hover:shadow-lg transition-shadow"
              onClick={() => {
                setIsAttending(true);
                setRsvpDialogOpen(true);
              }}
              data-testid="button-attending-rsvp"
            >
              {t.rsvp.attending}
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-gray-400 text-gray-700 hover:bg-white/80 px-8 py-6 text-lg bg-white/50"
              onClick={() => {
                setIsAttending(false);
                setRsvpDialogOpen(true);
              }}
              data-testid="button-not-attending-rsvp"
            >
              {t.rsvp.notAttending}
            </Button>
          </div>
          
          <RsvpDialog 
            open={rsvpDialogOpen} 
            onOpenChange={setRsvpDialogOpen} 
            attending={isAttending} 
          />
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;
