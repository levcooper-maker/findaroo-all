-- Create jobs table
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  department TEXT,
  location TEXT,
  work_arrangement TEXT DEFAULT 'Remote',
  job_type TEXT DEFAULT 'Full-time',
  experience_level TEXT DEFAULT 'Mid-level',
  salary TEXT,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  benefits TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  applicants_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all active jobs"
ON public.jobs
FOR SELECT
USING (status = 'active' OR auth.uid() = user_id);

CREATE POLICY "Users can create their own jobs"
ON public.jobs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
ON public.jobs
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
ON public.jobs
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW
EXECUTE FUNCTION public.update_jobs_updated_at();