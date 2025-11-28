-- Create applications table to track job applications
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT NOT NULL DEFAULT 'review',
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interviews table to manage interview scheduling
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_name TEXT NOT NULL,
  candidate_email TEXT NOT NULL,
  interviewer_name TEXT NOT NULL,
  interview_date DATE NOT NULL,
  interview_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 45,
  interview_type TEXT NOT NULL DEFAULT 'zoom',
  meeting_link TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on applications table
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for applications
CREATE POLICY "Users can view applications for their jobs"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = applications.job_id
      AND jobs.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Job owners can update applications"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = applications.job_id
      AND jobs.user_id = auth.uid()
    )
  );

CREATE POLICY "Job owners can delete applications"
  ON public.applications FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = applications.job_id
      AND jobs.user_id = auth.uid()
    )
  );

-- Enable RLS on interviews table
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for interviews
CREATE POLICY "Users can view interviews for their jobs"
  ON public.interviews FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = interviews.job_id
      AND jobs.user_id = auth.uid()
    )
  );

CREATE POLICY "Job owners can create interviews"
  ON public.interviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = job_id
      AND jobs.user_id = auth.uid()
    )
  );

CREATE POLICY "Job owners can update interviews"
  ON public.interviews FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = interviews.job_id
      AND jobs.user_id = auth.uid()
    )
  );

CREATE POLICY "Job owners can delete interviews"
  ON public.interviews FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = interviews.job_id
      AND jobs.user_id = auth.uid()
    )
  );

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_interviews_updated_at
  BEFORE UPDATE ON public.interviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();