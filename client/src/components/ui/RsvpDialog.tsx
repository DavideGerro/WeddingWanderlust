import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/useLanguage";
import { apiRequest } from "@/lib/queryClient";

interface RsvpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attending: boolean;
}

const RsvpDialog = ({ open, onOpenChange, attending }: RsvpDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/rsvp", {
        name: name.trim(),
        email: email.trim(),
        attending
      });
      
      toast({
        title: "Success!",
        description: "Your RSVP has been recorded. Thank you!",
      });
      
      setName("");
      setEmail("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {attending ? t.postWedding.attending : t.postWedding.notAttending}
          </DialogTitle>
          <DialogDescription>
            {attending 
              ? "Please provide your details to confirm your attendance."
              : "Please let us know who won't be able to make it."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your full name"
              required
              data-testid="input-rsvp-name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your.email@example.com"
              required
              data-testid="input-rsvp-email"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold-dark text-white"
              data-testid="button-submit-rsvp"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RsvpDialog;
