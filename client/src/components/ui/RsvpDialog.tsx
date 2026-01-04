import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/useLanguage";
import { useToast } from "@/hooks/use-toast";

interface RsvpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attending: boolean;
}

const RsvpDialog = ({ open, onOpenChange, attending }: RsvpDialogProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendingWedding: attending,
    attendingBoatTour: false,
    numberOfGuests: 1,
    dietaryRestrictions: ""
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, attendingWedding: attending }));
  }, [attending]);

  const checkExistingRsvp = async (email: string) => {
    if (!email || !email.includes("@")) return;
    try {
      const response = await fetch(`/api/rsvp/${encodeURIComponent(email)}`);
      if (response.ok) {
        const existingRsvp = await response.json();
        setFormData({
          name: existingRsvp.name,
          email: existingRsvp.email,
          attendingWedding: existingRsvp.attendingWedding,
          attendingBoatTour: existingRsvp.attendingBoatTour,
          numberOfGuests: existingRsvp.numberOfGuests || 1,
          dietaryRestrictions: existingRsvp.dietaryRestrictions || ""
        });
        setIsExistingUser(true);
      } else {
        setIsExistingUser(false);
      }
    } catch {
      setIsExistingUser(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      toast({
        title: isExistingUser ? "RSVP Updated!" : "RSVP Submitted!",
        description: formData.attendingWedding 
          ? "We can't wait to celebrate with you!" 
          : "We'll miss you! Thank you for letting us know."
      });

      onOpenChange(false);
      setFormData({
        name: "",
        email: "",
        attendingWedding: attending,
        attendingBoatTour: false,
        numberOfGuests: 1,
        dietaryRestrictions: ""
      });
      setIsExistingUser(false);
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit RSVP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const rsvpForm = {
    en: {
      title: attending ? "We're so happy you can make it!" : "We're sorry to hear that",
      subtitle: isExistingUser ? "Update your response below" : "Please fill in your details",
      name: "Your Name",
      email: "Email Address",
      emailHint: "We'll use this to manage your RSVP",
      attendingWedding: "I'll attend the wedding on June 26th",
      attendingBoatTour: "I'll join the sunset boat tour on June 27th",
      numberOfGuests: "Number of guests (including yourself)",
      dietaryRestrictions: "Dietary restrictions or special requests",
      dietaryPlaceholder: "Let us know about any allergies or dietary needs...",
      submit: isExistingUser ? "Update RSVP" : "Submit RSVP",
      submitting: "Submitting...",
      cancel: "Cancel"
    },
    it: {
      title: attending ? "Siamo felicissimi che tu possa venire!" : "Ci dispiace molto",
      subtitle: isExistingUser ? "Aggiorna la tua risposta qui sotto" : "Per favore compila i tuoi dati",
      name: "Il tuo nome",
      email: "Indirizzo email",
      emailHint: "Lo useremo per gestire la tua conferma",
      attendingWedding: "Parteciperò al matrimonio il 26 giugno",
      attendingBoatTour: "Parteciperò al tour in barca al tramonto il 27 giugno",
      numberOfGuests: "Numero di ospiti (incluso te stesso)",
      dietaryRestrictions: "Restrizioni alimentari o richieste speciali",
      dietaryPlaceholder: "Facci sapere di eventuali allergie o esigenze alimentari...",
      submit: isExistingUser ? "Aggiorna RSVP" : "Invia RSVP",
      submitting: "Invio in corso...",
      cancel: "Annulla"
    },
    es: {
      title: attending ? "¡Estamos muy felices de que puedas venir!" : "Sentimos mucho que no puedas venir",
      subtitle: isExistingUser ? "Actualiza tu respuesta abajo" : "Por favor completa tus datos",
      name: "Tu nombre",
      email: "Correo electrónico",
      emailHint: "Lo usaremos para gestionar tu confirmación",
      attendingWedding: "Asistiré a la boda el 26 de junio",
      attendingBoatTour: "Me uniré al tour en barco al atardecer el 27 de junio",
      numberOfGuests: "Número de invitados (incluyéndote)",
      dietaryRestrictions: "Restricciones dietéticas o solicitudes especiales",
      dietaryPlaceholder: "Déjanos saber sobre alergias o necesidades dietéticas...",
      submit: isExistingUser ? "Actualizar RSVP" : "Enviar RSVP",
      submitting: "Enviando...",
      cancel: "Cancelar"
    }
  };

  const { language } = useLanguage();
  const formText = rsvpForm[language as keyof typeof rsvpForm] || rsvpForm.en;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {formText.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{formText.subtitle}</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{formText.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              data-testid="input-rsvp-name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{formText.email}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={(e) => checkExistingRsvp(e.target.value)}
              required
              data-testid="input-rsvp-email"
            />
            <p className="text-xs text-muted-foreground">{formText.emailHint}</p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="attendingWedding"
                checked={formData.attendingWedding}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, attendingWedding: checked as boolean })
                }
                data-testid="checkbox-attending-wedding"
              />
              <Label htmlFor="attendingWedding" className="text-sm font-normal cursor-pointer">
                {formText.attendingWedding}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="attendingBoatTour"
                checked={formData.attendingBoatTour}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, attendingBoatTour: checked as boolean })
                }
                data-testid="checkbox-attending-boat-tour"
              />
              <Label htmlFor="attendingBoatTour" className="text-sm font-normal cursor-pointer">
                {formText.attendingBoatTour}
              </Label>
            </div>
          </div>

          {formData.attendingWedding && (
            <div className="space-y-2">
              <Label htmlFor="numberOfGuests">{formText.numberOfGuests}</Label>
              <Input
                id="numberOfGuests"
                type="number"
                min="1"
                max="10"
                value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                data-testid="input-number-of-guests"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">{formText.dietaryRestrictions}</Label>
            <Textarea
              id="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
              placeholder={formText.dietaryPlaceholder}
              rows={3}
              data-testid="textarea-dietary-restrictions"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                {formText.cancel}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? formText.submitting : formText.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RsvpDialog;
