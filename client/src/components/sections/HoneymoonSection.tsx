import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HoneymoonGiftCard from "@/components/ui/HoneymoonGiftCard";
import { useContributions } from "@/hooks/use-contributions";

// Japan destinations for honeymoon
const japanDestinations = [
  {
    name: "Kyoto",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    description: "Exploring ancient temples, traditional tea ceremonies, and serene bamboo forests."
  },
  {
    name: "Tokyo",
    image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    description: "Diving into the vibrant city life, visiting Shibuya Crossing, and enjoying world-class cuisine."
  },
  {
    name: "Mount Fuji",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    description: "Hiking and taking in the breathtaking views of Japan's most iconic mountain."
  },
  {
    name: "Hakone",
    image: "https://pixabay.com/get/g328d80cf6376a20a33a97f925ccca141942b69a1cdf0acb853609f390eb949a965129d810536465f25e0889d5432316d7416a5cef50dc5118e625633f401a228_1280.jpg",
    description: "Relaxing in hot springs with views of Mount Fuji and staying in a traditional ryokan."
  }
];

// Honeymoon gift options
const honeymoonGifts = [
  {
    id: "ryokan",
    title: "Romantic Ryokan Stay",
    description: "Traditional Japanese inn experience",
    icon: "hotel-bed",
    amount: 150
  },
  {
    id: "dinner",
    title: "Kaiseki Dinner",
    description: "Multi-course traditional meal",
    icon: "restaurant",
    amount: 100
  },
  {
    id: "train",
    title: "Bullet Train Tickets",
    description: "High-speed travel between cities",
    icon: "train",
    amount: 75
  }
];

// Form schema for contribution
const contributionSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  amount: z.number().min(1, { message: "Amount must be at least 1€" }),
  message: z.string().optional(),
  giftType: z.string().optional(),
  paymentMethod: z.enum(["applepay", "googlepay", "card", "bank"], {
    required_error: "Please select a payment method",
  }),
});

type ContributionFormValues = z.infer<typeof contributionSchema>;

const HoneymoonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { toast } = useToast();
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const { createContribution, isPending } = useContributions();
  
  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: {
      name: "",
      amount: 50,
      message: "",
      giftType: "",
      paymentMethod: "bank",
    },
  });

  const handleGiftSelect = (giftId: string, amount: number) => {
    setSelectedGift(giftId);
    form.setValue("giftType", giftId);
    form.setValue("amount", amount);
  };

  const handleCustomAmount = () => {
    setSelectedGift(null);
    form.setValue("giftType", "custom");
  };

  const copyIBAN = () => {
    navigator.clipboard.writeText("ES91 2100 0418 4502 0005 1332");
    toast({
      title: "IBAN Copied!",
      description: "Bank details copied to clipboard",
    });
  };

  const onSubmit = async (data: ContributionFormValues) => {
    try {
      await createContribution(data);
      toast({
        title: "Thank you for your contribution!",
        description: "Your gift will help make our honeymoon special.",
      });
      form.reset();
      setSelectedGift(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="honeymoon" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center font-display text-4xl md:text-5xl mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">Sara & Devid's Honeymoon in Japan</span>
          <span className="absolute w-24 h-2 bg-gold-light bottom-0 left-1/2 transform -translate-x-1/2"></span>
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600 leading-relaxed text-lg">
            Instead of a traditional registry, we would love for you to contribute to our dream honeymoon in Japan. Any gift, big or small, will help make our adventure more memorable!
          </p>
        </motion.div>
        
        {/* Japan Honeymoon Destinations */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-6">Our Dream Itinerary</h3>
            
            <div className="space-y-6">
              {japanDestinations.map((destination, index) => (
                <motion.div 
                  key={destination.name} 
                  className="flex"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-24 h-24 object-cover rounded-lg shadow-md mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{destination.name}</h4>
                    <p className="text-gray-600">{destination.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Japan travel landscape" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
        
        {/* Honeymoon Fund */}
        <motion.div 
          className="bg-offwhite rounded-lg shadow-lg p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display text-3xl text-center mb-8">Honeymoon Fund</h3>
          
          <div className="max-w-xl mx-auto">
            <p className="text-center text-gray-600 mb-10">
              Your presence at our wedding is the greatest gift. However, if you'd like to contribute to our honeymoon adventure, we've created a few fun ways you can help make our trip to Japan even more special.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {honeymoonGifts.map((gift) => (
                <HoneymoonGiftCard
                  key={gift.id}
                  id={gift.id}
                  title={gift.title}
                  description={gift.description}
                  icon={gift.icon}
                  amount={gift.amount}
                  isSelected={selectedGift === gift.id}
                  onSelect={() => handleGiftSelect(gift.id, gift.amount)}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 mb-4 w-full md:w-auto"
                onClick={handleCustomAmount}
              >
                Choose a Custom Amount
              </Button>
              <p className="text-sm text-gray-500">Enter a custom amount in the form below</p>
            </div>
          </div>
        </motion.div>
        
        {/* Contribution Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-display text-2xl text-center mb-8">Contribute to Our Honeymoon</h3>
          
          <Card className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 font-medium mb-2">Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John & Jane Doe" 
                          {...field} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
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
                      <FormLabel className="block text-gray-700 font-medium mb-2">Contribution Amount (€)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50" 
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
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
                      <FormLabel className="block text-gray-700 font-medium mb-2">Personal Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Add a personal note..." 
                          {...field} 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent h-24"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <h4 className="font-medium text-lg mb-4">Payment Method</h4>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          <Button
                            type="button"
                            className={`${
                              field.value === "applepay" 
                                ? "bg-black text-white" 
                                : "bg-white border border-gray-300 text-gray-700"
                            } font-medium py-3 px-4 rounded-lg flex items-center justify-center`}
                            onClick={() => field.onChange("applepay")}
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.0382 12.7952C17.0659 15.0834 18.963 16.0267 19 16.0434C18.9796 16.1067 18.639 17.3292 17.7537 18.583C16.9854 19.654 16.1827 20.7169 14.9684 20.7419C13.7835 20.7669 13.4078 20.0355 12.0417 20.0355C10.6756 20.0355 10.2589 20.7169 9.14048 20.7669C7.98729 20.8168 7.02552 19.6196 6.24427 18.5571C4.64303 16.3773 3.4061 12.4952 5.05285 9.79741C5.87173 8.45771 7.30407 7.60033 8.85132 7.57533C9.98283 7.55033 11.0459 8.35774 11.7305 8.35774C12.4151 8.35774 13.7131 7.37438 15.0809 7.52605C15.6383 7.55105 17.1922 7.75272 18.2063 9.14742C18.1211 9.19742 17.0153 9.82246 17.0382 12.7952ZM14.2789 5.9937C14.9381 5.17795 15.3756 4.04297 15.2531 2.9177C14.2891 2.95937 13.1272 3.54694 12.4387 4.33768C11.8285 5.03601 11.2982 6.21098 11.4412 7.29264C12.5183 7.37764 13.5903 6.78429 14.2789 5.9937Z" />
                            </svg>
                            Apple Pay
                          </Button>
                          
                          <Button
                            type="button"
                            className={`${
                              field.value === "googlepay" 
                                ? "bg-black text-white" 
                                : "bg-white border border-gray-300 text-gray-700"
                            } font-medium py-3 px-4 rounded-lg flex items-center justify-center`}
                            onClick={() => field.onChange("googlepay")}
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                              <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#FAB908"/>
                              <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
                              <path d="M12.0003 4.8C13.6003 4.8 15.0723 5.3604 16.2783 6.348L19.8243 2.802C17.7483 1.0704 15.0483 0 12.0003 0C7.3083 0 3.27231 2.6844 1.27231 6.5724L5.27231 9.6C6.25231 6.8568 8.91231 4.8 12.0003 4.8Z" fill="#EA4335"/>
                              <path d="M22.8 12C22.8 11.1312 22.704 10.2888 22.524 9.48L12 9.6V14.4H18.06C17.7672 16.0512 16.9272 17.196 15.6 17.9364L19.5492 21.006C21.744 18.906 22.8 15.6468 22.8 12Z" fill="#4285F4"/>
                              <path d="M5.28 14.4C5.03033 13.6464 4.8 12.8394 4.8 12C4.8 11.1606 5.03033 10.3536 5.28 9.6L1.28033 6.5724C0.463659 8.2278 0 10.0674 0 12C0 13.9326 0.463659 15.7722 1.28033 17.4276L5.28 14.4Z" fill="#FBBC05"/>
                              <path d="M12.0003 24C15.0483 24 17.7483 22.992 19.5503 21.006L15.6003 17.9364C14.4003 18.7164 13.2003 19.2 12.0003 19.2C8.91231 19.2 6.25231 17.1432 5.27231 14.4L1.27231 17.4276C3.27231 21.3156 7.3083 24 12.0003 24Z" fill="#34A853"/>
                            </svg>
                            Google Pay
                          </Button>
                          
                          <Button
                            type="button"
                            className={`${
                              field.value === "card" 
                                ? "bg-black text-white" 
                                : "bg-white border border-gray-300 text-gray-700"
                            } font-medium py-3 px-4 rounded-lg flex items-center justify-center`}
                            onClick={() => field.onChange("card")}
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Card
                          </Button>
                        </div>
                        
                        <div 
                          className={`bg-offwhite rounded-lg p-4 mb-6 ${field.value === "bank" ? "border-2 border-gold" : ""}`}
                          onClick={() => field.onChange("bank")}
                        >
                          <h4 className="font-medium mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                            Bank Transfer
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">You can also contribute directly to our bank account:</p>
                          <div className="flex items-center justify-between bg-white rounded p-2">
                            <code className="text-sm">ES91 2100 0418 4502 0005 1332</code>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="text-gold hover:text-gold-dark"
                              onClick={copyIBAN}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="text-center">
                  <Button 
                    type="submit"
                    disabled={isPending}
                    className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
                  >
                    {isPending ? "Processing..." : "Complete Contribution"}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HoneymoonSection;
