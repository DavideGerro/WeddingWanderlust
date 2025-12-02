import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/useLanguage";

interface RsvpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attending: boolean;
}

const RsvpDialog = ({ open, onOpenChange, attending }: RsvpDialogProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">
            {attending ? t.postWedding.attending : t.postWedding.notAttending}
          </DialogTitle>
        </DialogHeader>
        
        <div className="w-full">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSfIPOa-HhOS8RqBvtFIwF9iKnS0nKKEsj6V96XUUssYTsujvw/viewform?embedded=true" 
            width="100%" 
            height="760" 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="rounded"
            data-testid="iframe-rsvp-form"
          >
            Loading…
          </iframe>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RsvpDialog;
