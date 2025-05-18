
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Shield, ShieldCheck, CreditCard } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const Checkout = () => {
  const { t, dir } = useLanguage();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState<'contact' | 'shipping' | 'payment'>('contact');

  // Form validation schema
  const formSchema = z.object({
    firstName: z.string().min(2, { message: t('checkout.validation.firstName') }),
    lastName: z.string().min(2, { message: t('checkout.validation.lastName') }),
    email: z.string().email({ message: t('checkout.validation.email') }),
    phone: z.string().min(8, { message: t('checkout.validation.phone') }),
    address: z.string().min(5, { message: t('checkout.validation.address') }),
    city: z.string().min(2, { message: t('checkout.validation.city') }),
    postalCode: z.string().min(4, { message: t('checkout.validation.postalCode') }),
    cardHolder: z.string().min(3, { message: t('checkout.validation.cardHolder') }),
    cardNumber: z.string().min(16, { message: t('checkout.validation.cardNumber') }),
    expiry: z.string().min(5, { message: t('checkout.validation.expiry') }),
    cvv: z.string().min(3, { message: t('checkout.validation.cvv') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      cardHolder: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Simulate order processing
    toast({
      title: t('checkout.orderSuccess'),
      description: t('checkout.orderConfirmation'),
    });
    
    // Clear cart and redirect to home
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  // Progress to next step
  const nextStep = () => {
    if (step === 'contact') {
      const { firstName, lastName, email, phone } = form.getValues();
      if (!firstName || !lastName || !email || !phone) {
        form.trigger(['firstName', 'lastName', 'email', 'phone']);
        return;
      }
      setStep('shipping');
    } else if (step === 'shipping') {
      const { address, city, postalCode } = form.getValues();
      if (!address || !city || !postalCode) {
        form.trigger(['address', 'city', 'postalCode']);
        return;
      }
      setStep('payment');
    }
  };

  // Go back to previous step
  const prevStep = () => {
    if (step === 'shipping') setStep('contact');
    if (step === 'payment') setStep('shipping');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-6">{t('checkout.title')}</h1>
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-xl mb-6">{t('cart.empty')}</p>
            <Button onClick={() => navigate('/shop')}>
              {t('cart.continue')}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto py-12 px-4" dir={dir}>
        <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>
        
        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${step === 'contact' ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === 'contact' ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
              <span className="text-sm">{t('checkout.contact')}</span>
            </div>
            <div className={`flex flex-col items-center ${step === 'shipping' ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === 'shipping' ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
              <span className="text-sm">{t('checkout.shipping')}</span>
            </div>
            <div className={`flex flex-col items-center ${step === 'payment' ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step === 'payment' ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
              <span className="text-sm">{t('checkout.payment')}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Contact Information */}
                  {step === 'contact' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-4">{t('checkout.contact')}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.firstName')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('checkout.firstNamePlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.lastName')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('checkout.lastNamePlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('checkout.email')}</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder={t('checkout.emailPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('checkout.phone')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('checkout.phonePlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button type="button" onClick={nextStep}>
                          {t('checkout.nextStep')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Shipping Address */}
                  {step === 'shipping' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-4">{t('checkout.shipping')}</h2>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('checkout.address')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('checkout.addressPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.city')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('checkout.cityPlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.postalCode')}</FormLabel>
                              <FormControl>
                                <Input placeholder={t('checkout.postalCodePlaceholder')} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          {t('checkout.prevStep')}
                        </Button>
                        <Button type="button" onClick={nextStep}>
                          {t('checkout.nextStep')}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Method */}
                  {step === 'payment' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-4">{t('checkout.payment')}</h2>
                      
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <ShieldCheck className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-600">{t('checkout.securePayment')}</span>
                        </div>
                        <p className="text-sm text-gray-500">{t('checkout.secureInfo')}</p>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="cardHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('checkout.cardHolder')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('checkout.cardHolderPlaceholder')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('checkout.cardNumber')}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.expiry')}</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('checkout.cvv')}</FormLabel>
                              <FormControl>
                                <Input placeholder="123" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          {t('checkout.prevStep')}
                        </Button>
                        <Button type="submit" className="flex-1">
                          {t('checkout.placeOrder')} - {total.toFixed(2)} TND
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white shadow rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">{t('checkout.orderSummary')}</h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">{t('checkout.quantity')}: {item.quantity}</p>
                      <p className="font-medium">{(item.product.price * item.quantity).toFixed(2)} TND</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span>{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.tax')}</span>
                  <span>{tax.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span>{shipping.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>{t('cart.total')}</span>
                  <span>{total.toFixed(2)} TND</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
