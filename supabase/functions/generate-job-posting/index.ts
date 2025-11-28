import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jobPostingSchema = z.object({
  jobTitle: z.string().trim().min(1, "Job title is required").max(200),
  company: z.string().trim().min(1, "Company name is required").max(200),
  location: z.string().trim().max(200).default(""),
  jobType: z.string().trim().max(100).default("Full-time"),
  department: z.string().trim().max(200).default(""),
  salary: z.string().trim().max(200).optional(),
  requirements: z.string().trim().min(1, "Requirements are required").max(5000),
  responsibilities: z.string().trim().min(1, "Responsibilities are required").max(5000),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validationResult = jobPostingSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: validationResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { jobTitle, company, location, jobType, department, salary, requirements, responsibilities } = validationResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Job posting generation request received");

    const systemPrompt = `You are an expert HR professional and copywriter specializing in creating compelling job postings. Create engaging, professional job descriptions that:
- Highlight the company's unique value proposition
- Use inclusive language and avoid biased terminology
- Include clear responsibilities and requirements
- Showcase company culture and benefits
- Follow best practices for SEO and applicant tracking systems
- Are concise yet comprehensive (400-600 words)
- Use bullet points for clarity
- End with a strong call-to-action`;

    const userPrompt = `Create a compelling job posting with the following details:

Job Title: ${jobTitle}
Company: ${company}
Location: ${location}
Job Type: ${jobType}
Department: ${department}
${salary ? `Salary Range: ${salary}` : ''}

Key Requirements:
${requirements}

Main Responsibilities:
${responsibilities}

Please structure the posting with:
1. An engaging opening paragraph about the role and company
2. "What You'll Do" section with responsibilities
3. "What We're Looking For" section with requirements
4. "Why Join Us" section highlighting benefits and culture
5. Application instructions

Use professional yet approachable language that attracts top talent.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const generatedPosting = data.choices[0].message.content;

    console.log("Successfully generated job posting");

    return new Response(
      JSON.stringify({ posting: generatedPosting }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-job-posting:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
