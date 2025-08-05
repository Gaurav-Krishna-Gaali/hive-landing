"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, User, Phone, Mail, Heart, Shield, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackFormSubmission, trackButtonClick, identifyUser } from "@/lib/posthog";

const FormSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: null as Date | null,
    gender: '',
    pincode: '',
    role: '',
    email: '',
    opinion: ''
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    // Clear previous validation errors
    setValidationErrors({});
    
    // Form validation
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      errors.pincode = "Please enter a valid 6-digit pincode";
    }
    
    if (!formData.role) {
      errors.role = "Please select your role";
    }
    
    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast({
        title: "Please fix the errors below",
        description: "Please fill in all required fields correctly.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const insertData = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        date_of_birth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null,
        gender: formData.gender || null,
        pincode: formData.pincode || null,
        role: formData.role || null,
        email: formData.email || null,
        opinion: formData.opinion || null
      };
      
      console.log('Attempting to insert data:', insertData);
      
      const { data, error } = await supabase.from('form_responses').insert([insertData]).select();

      if (error) {
        console.error('Error inserting data:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        toast({
          title: "Error submitting form",
          description: `Error: ${error.message || 'Unknown error occurred'}`,
          variant: "destructive"
        });
        return;
      }

      // Track successful form submission
      trackFormSubmission('hive_signup', {
        role: formData.role,
        pincode: formData.pincode,
        gender: formData.gender,
        has_email: !!formData.email,
        has_opinion: !!formData.opinion
      });

      // Identify user if they provided an email
      if (formData.email) {
        identifyUser(formData.email, {
          name: formData.fullName,
          phone: formData.phoneNumber,
          role: formData.role,
          pincode: formData.pincode,
          gender: formData.gender
        });
      }

      setIsSubmitted(true);
      toast({
        title: "Thank you for joining the movement!",
        description: "We'll be in touch with updates about Hive."
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error submitting form",
        description: "There was an unexpected error. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pincode validation function
  const validatePincode = (pincode: string) => {
    // Remove any non-digit characters
    const cleanPincode = pincode.replace(/\D/g, '');
    
    // Check if it's exactly 6 digits
    if (cleanPincode.length > 6) {
      return cleanPincode.slice(0, 6);
    }
    
    return cleanPincode;
  };

  const handleInputChange = (field: string, value: any) => {
    // Clear validation error for this field when user starts typing/selecting
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Special handling for pincode validation
    if (field === 'pincode') {
      const validatedPincode = validatePincode(value);
      setFormData(prev => ({
        ...prev,
        [field]: validatedPincode
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (isSubmitted) {
    return (
      <section id="form-section" className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            {/* <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full opacity-20 animate-ping"></div> */}
          </div>
          <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Welcome to the Movement!
              </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Thank you for joining Hive. Together, we're building a safer world for all women.
            </p>
            <p className="text-lg text-yellow-400 font-medium">
              We'll keep you updated on our progress and notify you when early access is available.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-1 rounded-full">
              <div className="bg-black px-8 py-3 rounded-full">
                <span className="text-yellow-400 font-semibold">You're now part of the Hive! 🐝</span>
              </div>
            </div>
            
            <a 
              href="https://chat.whatsapp.com/Frl06gV8N8W2UTGhhJwZfc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-600/25"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Join our WhatsApp Community
            </a>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">Share with others:</p>
              <div className="flex gap-3 justify-center">
                <a 
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://joinhive.app&title=Just%20joined%20Hive!%20🐝%20Where%20neighbors%20become%20first%20responders&summary=Join%20the%20movement%20for%20safer%20communities.%20Every%20step%20should%20feel%20safe.%20%23HiveCommunity%20%23SafetyForAll%20%23WomenSafety"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-600/25"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
                
                <a 
                  href="https://twitter.com/intent/tweet?text=Just%20joined%20Hive!%20🐝%20Where%20neighbors%20become%20first%20responders.%20Join%20the%20movement%20for%20safer%20communities.%20Every%20step%20should%20feel%20safe.%20Check%20it%20out:%20https://joinhive.app%20%23HiveCommunity%20%23SafetyForAll%20%23WomenSafety" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-white gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-gray-800/25"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="form-section" className="min-h-screen px-4 py-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl">
                <Heart className="w-10 h-10 text-black" fill="currentColor" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Every Step Should Feel 
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"> Safe</span>
            </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            If you'd like to be a part of this movement — as a supporter, volunteer, or early community member — fill in your details below.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Gradient Border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-3xl blur opacity-30"></div>
          
          <form onSubmit={handleSubmit} className="relative bg-gray-900/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-800/50">
            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-3 group">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-yellow-400" />
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Input 
                      id="fullName" 
                      type="text" 
                      value={formData.fullName} 
                      onChange={e => handleInputChange('fullName', e.target.value)} 
                      className={cn(
                        "bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300",
                        validationErrors.fullName && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      )}
                      required 
                      disabled={isSubmitting} 
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                  {validationErrors.fullName && (
                    <p className="text-red-400 text-xs">{validationErrors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-3 group">
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    Phone Number <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Input 
                      id="phoneNumber" 
                      type="tel" 
                      value={formData.phoneNumber} 
                      onChange={e => handleInputChange('phoneNumber', e.target.value)} 
                      className={cn(
                        "bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300",
                        validationErrors.phoneNumber && "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                      )}
                      required 
                      disabled={isSubmitting} 
                      placeholder="Enter your phone number"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                  {validationErrors.phoneNumber && (
                    <p className="text-red-400 text-xs">{validationErrors.phoneNumber}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-3 group">
                  <Label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-yellow-400" />
                    Date of Birth
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full justify-start text-left font-normal bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300", 
                          !formData.dateOfBirth && "text-gray-400"
                        )} 
                        disabled={isSubmitting}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar 
                        mode="single" 
                        selected={formData.dateOfBirth || undefined} 
                        onSelect={date => handleInputChange('dateOfBirth', date)} 
                        initialFocus 
                        disabled={{ after: new Date() }}
                        captionLayout="dropdown"
                        fromYear={1970}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Gender */}
                <div className="space-y-3 group">
                  <Label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-yellow-400" />
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={value => handleInputChange('gender', value)} disabled={isSubmitting}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600 rounded-xl">
                      <SelectItem value="female" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Female</SelectItem>
                      <SelectItem value="male" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Male</SelectItem>
                      <SelectItem value="non-binary" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pincode */}
                <div className="space-y-3 group">
                  <Label htmlFor="pincode" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-yellow-400" />
                    Pincode <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Input 
                      id="pincode" 
                      type="text" 
                      placeholder="Enter 6-digit pincode" 
                      value={formData.pincode} 
                      onChange={e => handleInputChange('pincode', e.target.value)} 
                      className={cn(
                        "bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300",
                        (formData.pincode.length > 0 && formData.pincode.length !== 6) || validationErrors.pincode ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                      )}
                      disabled={isSubmitting}
                      maxLength={6}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                  {(formData.pincode.length > 0 && formData.pincode.length !== 6) || validationErrors.pincode ? (
                    <p className="text-red-400 text-xs">{validationErrors.pincode || "Please enter a valid 6-digit pincode"}</p>
                  ) : null}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Role */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    How would you like to join? <span className="text-red-400">*</span>
                  </Label>
                  <RadioGroup value={formData.role} onValueChange={value => handleInputChange('role', value)} disabled={isSubmitting} className="space-y-3">
                    <div className={cn(
                      "flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300",
                      validationErrors.role && "border-red-400"
                    )}>
                      <RadioGroupItem value="user" id="user" className="text-yellow-400" />
                      <Label htmlFor="user" className="text-gray-300 cursor-pointer">Join the Women's Safety Circle</Label>
                    </div>
                    <div className={cn(
                      "flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300",
                      validationErrors.role && "border-red-400"
                    )}>
                      <RadioGroupItem value="volunteer" id="volunteer" className="text-yellow-400" />
                      <Label htmlFor="volunteer" className="text-gray-300 cursor-pointer">Step up as a Guardian</Label>
                    </div>
                    <div className={cn(
                      "flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300",
                      validationErrors.role && "border-red-400"
                    )}>
                      <RadioGroupItem value="both" id="both" className="text-yellow-400" />
                      <Label htmlFor="both" className="text-gray-300 cursor-pointer">Both</Label>
                    </div>
                  </RadioGroup>
                  {validationErrors.role && (
                    <p className="text-red-400 text-xs">{validationErrors.role}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-3 group">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-yellow-400" />
                    Would you like early access to the app?
                  </Label>
                  <div className="relative">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={e => handleInputChange('email', e.target.value)} 
                      className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300" 
                      disabled={isSubmitting} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Opinion */}
                <div className="space-y-3 group">
                  <Label htmlFor="opinion" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-yellow-400" />
                    Why do you want to join? :)
                  </Label>
                  <div className="relative">
                    <Textarea 
                      id="opinion" 
                      placeholder="Tell us your thoughts, experiences, or why you want to join the mission..." 
                      value={formData.opinion} 
                      onChange={e => handleInputChange('opinion', e.target.value)} 
                      className="bg-gray-800/50 border-gray-600 text-white min-h-[120px] rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none" 
                      disabled={isSubmitting} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-10 pt-8 border-t border-gray-800">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black py-6 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                disabled={isSubmitting}
                onClick={() => trackButtonClick('join_movement_button')}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Join the Mission
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection; 