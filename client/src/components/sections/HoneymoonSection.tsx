import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { HoneymoonGiftCard } from "@/components/ui/HoneymoonGiftCard";
import { insertContributionSchema } from "@/shared/schema";
import { useContributions } from "@/hooks/use-contributions";
import { useToast } from "@/hooks/use-toast";
import { BANKING_INFO } from "@/lib/constants";
import { useLanguage } from "@/lib/useLanguage";

// Icons
import { SiJapan } from "react-icons/si";
import { FaPlaneDeparture, FaUtensils, FaMountain, FaUmbrellaBeach, FaHotel, FaCamera, FaGift, FaApple, FaGooglePay } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";

const honeymoonExperiences = [
  {
    id: "tokyo-hotel",
    title: "Luxury Hotel in Tokyo",
    description: "5-star accommodations in the heart of Tokyo with stunning city views",
    icon: "FaHotel",
    amount: 200
  },
  {
    id: "kyoto-tour",
    title: "Kyoto Temple Tour",
    description: "Guided tour of Kyoto's historic temples and gardens",
    icon: "FaMountain",
    amount: 100
  },
  {
    id: "sushi-class",
    title: "Sushi Making Class",
    description: "Learn to make authentic sushi from a master chef in Osaka",
    icon: "FaUtensils",
    amount: 150
  },
  {
    id: "mt-fuji",
    title: "Mount Fuji Day Trip",
    description: "Day trip to see iconic Mount Fuji with professional photo session",
    icon: "FaCamera",
    amount: 175
  },
  {
    id: "okinawa-beach",
    title: "Okinawa Beach Day",
    description: "Relaxing day at a private beach in beautiful Okinawa",
    icon: "FaUmbrellaBeach",
    amount: 125
  },
  {
    id: "bullet-train",
    title: "Bullet Train Pass",
    description: "High-speed train tickets to explore multiple cities",
    icon: "FaPlaneDeparture",
    amount: 180
  }
];

const contributionSchema = insertContributionSchema.extend({
  paymentMethod: z.enum(["apple_pay", "google_pay", "bank_transfer"])
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

const HoneymoonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState(true);
  const { toast } = useToast();
  const { createContribution, totalContributions } = useContributions();
  
  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      name: "",
      amount: 50,
      message: "",
      giftType: null,
      paymentMethod: "bank_transfer"
    }
  });
  
  const handleGiftSelect = (id: string, amount: number) => {
    setSelectedGift(id);
    setCustomAmount(false);
    form.setValue("amount", amount);
    form.setValue("giftType", id);
  };
  
  const handleCustomAmountClick = () => {
    setSelectedGift(null);
    setCustomAmount(true);
    form.setValue("giftType", null);
  };
  
  const onSubmit = async (data: ContributionFormValues) => {
    try {
      await createContribution.mutateAsync(data);
      
      toast({
        title: t.honeymoon.thankYou,
        description: t.honeymoon.thankYouDesc,
        duration: 5000
      });
      
      form.reset();
      setSelectedGift(null);
      setCustomAmount(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FaHotel": return <FaHotel className="text-gold h-6 w-6" />;
      case "FaMountain": return <FaMountain className="text-gold h-6 w-6" />;
      case "FaUtensils": return <FaUtensils className="text-gold h-6 w-6" />;
      case "FaCamera": return <FaCamera className="text-gold h-6 w-6" />;
      case "FaUmbrellaBeach": return <FaUmbrellaBeach className="text-gold h-6 w-6" />;
      case "FaPlaneDeparture": return <FaPlaneDeparture className="text-gold h-6 w-6" />;
      default: return <FaGift className="text-gold h-6 w-6" />;
    }
  };
  
  return (
    <section id="honeymoon" ref={ref} className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center mb-6">
          <SiJapan className="text-red-500 h-8 w-8 mr-3" />
          <h2 className="text-4xl font-display font-bold text-center">
            {t.honeymoon.title}
          </h2>
        </div>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {t.honeymoon.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Tokyo skyline with Mount Fuji in the background" 
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            />
            
            <h3 className="font-display text-2xl mb-4">{t.honeymoon.itinerary}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">Tokyo</h4>
                <p className="text-sm text-gray-600 mb-2">4 Nights</p>
                <p className="text-xs text-gray-500">Exploring Shinjuku, Shibuya, and Tokyo Disneyland</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">Kyoto</h4>
                <p className="text-sm text-gray-600 mb-2">3 Nights</p>
                <p className="text-xs text-gray-500">Traditional temples, geisha district, and bamboo forests</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">Osaka</h4>
                <p className="text-sm text-gray-600 mb-2">2 Nights</p>
                <p className="text-xs text-gray-500">Street food, Osaka Castle, and Universal Studios</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">Okinawa</h4>
                <p className="text-sm text-gray-600 mb-2">3 Nights</p>
                <p className="text-xs text-gray-500">Beach relaxation and snorkeling in crystal blue waters</p>
              </Card>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-4">{t.honeymoon.fund}</h3>
            <p className="text-gray-600 mb-6">
              {t.honeymoon.fundDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {honeymoonExperiences.map((gift) => (
                <HoneymoonGiftCard
                  key={gift.id}
                  id={gift.id}
                  title={gift.title}
                  description={gift.description}
                  icon={getIconComponent(gift.icon)}
                  amount={gift.amount}
                  isSelected={selectedGift === gift.id}
                  onSelect={() => handleGiftSelect(gift.id, gift.amount)}
                />
              ))}
              
              <div 
                className={`
                  rounded-lg border p-4 cursor-pointer transition-all duration-200
                  ${customAmount 
                    ? 'border-gold bg-gold/5 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }
                `}
                onClick={handleCustomAmountClick}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{t.honeymoon.customAmount}</h4>
                    <p className="text-sm text-gray-600">{t.honeymoon.customAmountDesc}</p>
                  </div>
                  <FaGift className="text-gold h-6 w-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-display text-xl mb-6">{t.honeymoon.contributeTitle}</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.honeymoon.yourName}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.honeymoon.amount}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={10} 
                            {...field} 
                            disabled={!customAmount} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.honeymoon.message}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t.honeymoon.messageDesc}
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>{t.honeymoon.paymentMethod}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="apple_pay" id="apple_pay" />
                              <FaApple className="h-5 w-5 mr-1" />
                              <label htmlFor="apple_pay" className="font-medium cursor-pointer">Apple Pay</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="google_pay" id="google_pay" />
                              <FaGooglePay className="h-5 w-5 mr-1" />
                              <label htmlFor="google_pay" className="font-medium cursor-pointer">Google Pay</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                              <TbBuildingBank className="h-5 w-5 mr-1" />
                              <label htmlFor="bank_transfer" className="font-medium cursor-pointer">Bank Transfer (IBAN)</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("paymentMethod") === "bank_transfer" && (
                    <div className="p-4 bg-gray-50 rounded-md text-sm">
                      <p className="font-medium mb-2">IBAN Details:</p>
                      <p>Account Name: {BANKING_INFO.accountName}</p>
                      <p>IBAN: {BANKING_INFO.iban}</p>
                      <p>BIC/SWIFT: {BANKING_INFO.bic}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        Please include your name and "Wedding Gift" in the reference
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark text-white"
                    disabled={createContribution.isPending}
                  >
                    {createContribution.isPending ? "Processing..." : "Contribute"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100"
        >
          <h3 className="font-display text-xl mb-3">Honeymoon Fund Progress</h3>
          <div className="text-4xl font-bold text-gold mb-2">
            €{totalContributions.data?.total || 0}
          </div>
          <p className="text-gray-600">raised so far</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div 
              className="bg-gold h-2.5 rounded-full" 
              style={{ 
                width: `${Math.min(((totalContributions.data?.total || 0) / 3000) * 100, 100)}%` 
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Goal: €3,000</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HoneymoonSection;