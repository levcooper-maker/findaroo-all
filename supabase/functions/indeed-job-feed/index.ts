import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Fetching active jobs for Indeed feed...');

    // Fetch all active jobs
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    console.log(`Found ${jobs?.length || 0} active jobs`);

    // Get the base URL from the request or environment
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // Generate Indeed-compatible XML feed
    const xmlContent = generateIndeedXML(jobs || [], baseUrl);

    return new Response(xmlContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error: unknown) {
    console.error('Error generating Indeed feed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generateIndeedXML(jobs: any[], baseUrl: string): string {
  const now = new Date().toISOString();
  
  const jobsXml = jobs.map(job => {
    const jobUrl = `${baseUrl}/jobs/${job.id}`;
    const postedDate = new Date(job.created_at).toISOString().split('T')[0];
    
    // Clean and escape text for XML
    const escapeXml = (text: string | null) => {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    // Build description with all relevant info
    const fullDescription = [
      job.description,
      job.responsibilities ? `\n\nResponsibilities:\n${job.responsibilities}` : '',
      job.requirements ? `\n\nRequirements:\n${job.requirements}` : '',
      job.benefits ? `\n\nBenefits:\n${job.benefits}` : '',
    ].join('');

    // Map job type to Indeed format
    const jobTypeMap: Record<string, string> = {
      'Full-time': 'fulltime',
      'Part-time': 'parttime',
      'Contract': 'contract',
      'Internship': 'internship',
      'Temporary': 'temporary',
    };
    const indeedJobType = jobTypeMap[job.job_type] || 'fulltime';

    // Map experience level to Indeed format
    const experienceMap: Record<string, string> = {
      'Entry-level': 'entry_level',
      'Mid-level': 'mid_level',
      'Senior': 'senior_level',
      'Executive': 'executive',
    };
    const indeedExperience = experienceMap[job.experience_level] || 'mid_level';

    return `
    <job>
      <title><![CDATA[${job.title}]]></title>
      <date>${postedDate}</date>
      <referencenumber>${job.id}</referencenumber>
      <url>${escapeXml(jobUrl)}</url>
      <company><![CDATA[${job.company}]]></company>
      <city><![CDATA[${job.location?.split(',')[0]?.trim() || 'Remote'}]]></city>
      <state><![CDATA[${job.location?.split(',')[1]?.trim() || ''}]]></state>
      <country>US</country>
      <description><![CDATA[${fullDescription}]]></description>
      <salary><![CDATA[${job.salary || 'Competitive'}]]></salary>
      <jobtype>${indeedJobType}</jobtype>
      <experience>${indeedExperience}</experience>
      <remotetype>${job.work_arrangement === 'Remote' ? 'fully_remote' : job.work_arrangement === 'Hybrid' ? 'hybrid' : 'in_person'}</remotetype>
      ${job.department ? `<category><![CDATA[${job.department}]]></category>` : ''}
    </job>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<source>
  <publisher>HireHub</publisher>
  <publisherurl>https://hirehub.app</publisherurl>
  <lastBuildDate>${now}</lastBuildDate>
${jobsXml}
</source>`;
}
