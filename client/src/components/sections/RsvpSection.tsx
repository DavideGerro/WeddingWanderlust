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
    <section id="rsvp" ref={ref} className="py-16 bg-white">
      <div className="container px-4 mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            {t.rsvp.title}
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            {t.rsvp.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white"
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
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
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
