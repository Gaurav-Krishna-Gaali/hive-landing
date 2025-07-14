"use client"
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const SupabaseTest = () => {
  const [status, setStatus] = useState<string>("Testing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log("Testing Supabase connection...");
        console.log("Environment variables:");
        console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log("Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
        
        // Test basic connection
        const { data, error } = await supabase.from('form_responses').select('count').limit(1);
        
        if (error) {
          setError(`Connection failed: ${error.message}`);
          console.error("Supabase connection error:", error);
        } else {
          setStatus("✅ Supabase connection successful!");
          console.log("Supabase connection successful:", data);
        }
      } catch (err) {
        setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error("Unexpected error:", err);
      }
    };

    testConnection();
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm z-50 max-w-sm">
      <h3 className="font-semibold text-white mb-2">Supabase Test</h3>
      <p className="text-gray-300 mb-2">{status}</p>
      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
      <div className="text-xs text-gray-400 mt-2">
        <div>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</div>
        <div>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</div>
      </div>
    </div>
  );
};

export default SupabaseTest; 