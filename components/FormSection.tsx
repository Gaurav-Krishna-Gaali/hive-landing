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
import { CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundBeams } from "@/components/ui/background-beams";

const FormSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dateOfBirth: null as Date | null,
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
      console.log('Submitting form data:', formData);
      const { data, error } = await supabase.from('form_responses').insert([{
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        date_of_birth: formData.dateOfBirth ? format(formData.dateOfBirth, 'yyyy-MM-dd') : null,
        occupation: formData.occupation || null,
        role: formData.role || null,
        email: formData.email || null,
        opinion: formData.opinion || null
      }]).select();

      if (error) {
        console.error('Error inserting data:', error);
        toast({
          title: "Error submitting form",
          description: "There was an error submitting your form. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Form submitted successfully:', data);
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
      <section id="form-section" className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <BackgroundBeams className="opacity-30" />
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-4xl font-bold text-white">Welcome to the Movement!</h2>
          <p className="text-xl text-gray-300">
            Thank you for joining Hive. Together, we're building a safer world for all women.
          </p>
                      <p className="text-lg text-yellow-400">
              We'll keep you updated on our progress and notify you when early access is available.
            </p>
        </div>
      </section>
    );
  }

  return (
    <section id="form-section" className="min-h-screen bg-zinc-950 px-4 py-12 relative overflow-hidden">
      <BackgroundBeams className="opacity-30" />
      <div className="max-w-2xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white md:text-4xl">Every Step Should Feel Safe</h2>
          <p className="text-gray-300 text-base">
            If you'd like to be a part of this movement — as a supporter, volunteer, or early community member - fill in your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 relative z-10">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-300">Full Name</Label>
            <Input 
              id="fullName" 
              type="text" 
              value={formData.fullName} 
              onChange={e => handleInputChange('fullName', e.target.value)} 
              className="bg-gray-800 border-gray-600 text-white" 
              required 
              disabled={isSubmitting} 
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-300">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              type="tel" 
              value={formData.phoneNumber} 
              onChange={e => handleInputChange('phoneNumber', e.target.value)} 
              className="bg-gray-800 border-gray-600 text-white" 
              required 
              disabled={isSubmitting} 
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-300">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start text-left font-normal bg-gray-800 border-gray-600 text-white hover:bg-gray-700", 
                    !formData.dateOfBirth && "text-gray-400"
                  )} 
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-600" align="start">
                <Calendar 
                  mode="single" 
                  selected={formData.dateOfBirth || undefined} 
                  onSelect={date => handleInputChange('dateOfBirth', date)} 
                  initialFocus 
                  className="pointer-events-auto" 
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-300">Occupation</Label>
            <Select value={formData.occupation} onValueChange={value => handleInputChange('occupation', value)} disabled={isSubmitting}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-600">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="working-professional">Working Professional</SelectItem>
                <SelectItem value="homemaker">Homemaker</SelectItem>
                <SelectItem value="self-employed">Self-Employed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Role */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-300">Your Role</Label>
            <RadioGroup value={formData.role} onValueChange={value => handleInputChange('role', value)} disabled={isSubmitting}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user" className="text-gray-300">I want to use the App for help</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="volunteer" id="volunteer" />
                <Label htmlFor="volunteer" className="text-gray-300">I want to be a volunteer to help</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="text-gray-300">Both</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-300">Would you like early access to the app?</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email} 
              onChange={e => handleInputChange('email', e.target.value)} 
              className="bg-gray-800 border-gray-600 text-white" 
              disabled={isSubmitting} 
            />
          </div>

          {/* Opinion */}
          <div className="space-y-2">
            <Label htmlFor="opinion" className="text-sm font-medium text-gray-300">Share your story :)</Label>
            <Textarea 
              id="opinion" 
              placeholder="Tell us your thoughts..." 
              value={formData.opinion} 
              onChange={e => handleInputChange('opinion', e.target.value)} 
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]" 
              disabled={isSubmitting} 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-black py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FormSection; 