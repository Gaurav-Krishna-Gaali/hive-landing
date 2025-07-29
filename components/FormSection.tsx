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
    occupation: '',
    role: '',
    email: '',
    opinion: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const insertData = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        date_of_birth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null,
        gender: formData.gender || null,
        occupation: formData.occupation || null,
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
        occupation: formData.occupation,
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
          occupation: formData.occupation,
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="form-section" className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full opacity-20 animate-ping"></div>
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
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-1 rounded-full">
              <div className="bg-black px-8 py-3 rounded-full">
                <span className="text-yellow-400 font-semibold">You're now part of the Hive! 🐝</span>
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
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input 
                      id="fullName" 
                      type="text" 
                      value={formData.fullName} 
                      onChange={e => handleInputChange('fullName', e.target.value)} 
                      className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300" 
                      required 
                      disabled={isSubmitting} 
                      placeholder="Enter your full name"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-3 group">
                  <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Input 
                      id="phoneNumber" 
                      type="tel" 
                      value={formData.phoneNumber} 
                      onChange={e => handleInputChange('phoneNumber', e.target.value)} 
                      className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300" 
                      required 
                      disabled={isSubmitting} 
                      placeholder="Enter your phone number"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-400/0 rounded-xl transition-all duration-300 group-hover:from-yellow-500/10 group-hover:to-yellow-400/10 pointer-events-none"></div>
                  </div>
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

                {/* Occupation */}
                <div className="space-y-3 group">
                  <Label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-yellow-400" />
                    Occupation
                  </Label>
                  <Select value={formData.occupation} onValueChange={value => handleInputChange('occupation', value)} disabled={isSubmitting}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white h-12 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300">
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600 rounded-xl">
                      <SelectItem value="student" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Student</SelectItem>
                      <SelectItem value="working-professional" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Working Professional</SelectItem>
                      <SelectItem value="homemaker" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Homemaker</SelectItem>
                      <SelectItem value="self-employed" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Self-Employed</SelectItem>
                      <SelectItem value="retired" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Retired</SelectItem>
                      <SelectItem value="other" className="text-white hover:bg-gray-800 focus:bg-gray-800 hover:text-white focus:text-white data-[highlighted]:text-white data-[highlighted]:bg-gray-800">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Role */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    Your Role
                  </Label>
                  <RadioGroup value={formData.role} onValueChange={value => handleInputChange('role', value)} disabled={isSubmitting} className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                      <RadioGroupItem value="user" id="user" className="text-yellow-400" />
                      <Label htmlFor="user" className="text-gray-300 cursor-pointer">I want to use the App for help</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                      <RadioGroupItem value="volunteer" id="volunteer" className="text-yellow-400" />
                      <Label htmlFor="volunteer" className="text-gray-300 cursor-pointer">I want to be a volunteer to help</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                      <RadioGroupItem value="both" id="both" className="text-yellow-400" />
                      <Label htmlFor="both" className="text-gray-300 cursor-pointer">Both</Label>
                    </div>
                  </RadioGroup>
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
                    Share your story :)
                  </Label>
                  <div className="relative">
                    <Textarea 
                      id="opinion" 
                      placeholder="Tell us your thoughts, experiences, or why you want to join the movement..." 
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
                // onClick={() => trackButtonClick('join_movement_button')}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" fill="currentColor" />
                    Join the Movement
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