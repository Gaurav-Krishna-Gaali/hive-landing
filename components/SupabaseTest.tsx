"use client"
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export default function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult("Testing connection...");
    
    try {
      // Check if environment variables are set
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        setTestResult("❌ Environment variables not found! Please create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
        return;
      }
      
      // Test 1: Check if we can connect
      const { data, error } = await supabase.from('form_responses').select('count').limit(1);
      
      if (error) {
        setTestResult(`Connection Error: ${error.message}`);
        console.error('Supabase connection error:', error);
      } else {
        setTestResult("✅ Connection successful! Database is accessible.");
        console.log('Supabase connection successful:', data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('ERR_NAME_NOT_RESOLVED')) {
        setTestResult("❌ Network Error: Unable to reach Supabase. Please check your NEXT_PUBLIC_SUPABASE_URL in .env.local");
      } else {
        setTestResult(`Unexpected Error: ${errorMessage}`);
      }
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const testInsert = async () => {
    setIsLoading(true);
    setTestResult("Testing insert...");
    
    try {
      // Check if environment variables are set
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        setTestResult("❌ Environment variables not found! Please create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
        return;
      }
      
      const testData = {
        full_name: "Test User",
        phone_number: "1234567890",
        date_of_birth: null,
        gender: null,
        occupation: null,
        role: "user",
        email: "test@example.com",
        opinion: "Test submission"
      };
      
      console.log('Testing insert with data:', testData);
      
      const { data, error } = await supabase.from('form_responses').insert([testData]).select();
      
      if (error) {
        setTestResult(`Insert Error: ${error.message}`);
        console.error('Insert error:', error);
      } else {
        setTestResult("✅ Insert successful! Test record created.");
        console.log('Insert successful:', data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('ERR_NAME_NOT_RESOLVED')) {
        setTestResult("❌ Network Error: Unable to reach Supabase. Please check your NEXT_PUBLIC_SUPABASE_URL in .env.local");
      } else {
        setTestResult(`Unexpected Error: ${errorMessage}`);
      }
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg border border-gray-700 z-50 max-w-sm">
      <h3 className="text-white font-semibold mb-2">Supabase Test</h3>
      <div className="space-y-2">
        <Button 
          onClick={testConnection} 
          disabled={isLoading}
          size="sm"
          className="w-full"
        >
          Test Connection
        </Button>
        <Button 
          onClick={testInsert} 
          disabled={isLoading}
          size="sm"
          variant="outline"
          className="w-full"
        >
          Test Insert
        </Button>
      </div>
      {testResult && (
        <div className="mt-2 p-2 bg-gray-800 rounded text-xs text-gray-300">
          {testResult}
        </div>
      )}
      <div className="mt-2 p-2 bg-blue-900/20 rounded text-xs text-blue-300 border border-blue-700/30">
        <strong>Setup Required:</strong> Create a .env.local file with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
      </div>
    </div>
  );
} 