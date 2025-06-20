
-- Enable Row Level Security for reminders
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own reminders
CREATE POLICY "Users can view their own reminders" 
ON public.reminders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to create their own reminders
CREATE POLICY "Users can create their own reminders" 
ON public.reminders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own reminders
CREATE POLICY "Users can update their own reminders" 
ON public.reminders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow users to delete their own reminders
CREATE POLICY "Users can delete their own reminders" 
ON public.reminders 
FOR DELETE 
USING (auth.uid() = user_id);
