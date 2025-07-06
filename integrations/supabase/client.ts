// Simple Supabase client for demo purposes
// In a real app, you would use the actual Supabase client

export const supabase = {
  from: (table: string) => ({
    insert: (data: any[]) => ({
      select: async () => {
        // Simulate successful insertion
        console.log('Simulated Supabase insert:', { table, data });
        return {
          data: data,
          error: null
        };
      }
    })
  })
}; 