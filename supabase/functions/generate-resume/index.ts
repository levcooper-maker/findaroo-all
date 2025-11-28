import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resumeSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  location: z.string().trim().max(200).optional(),
  targetRole: z.string().trim().max(200).optional(),
  experience: z.string().trim().max(10000).optional(),
  education: z.string().trim().max(5000).optional(),
  skills: z.string().trim().max(2000).optional(),
  achievements: z.string().trim().max(5000).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const validationResult = resumeSchema.safeParse(body);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input", details: validationResult.error.format() }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { 
      fullName, 
      email, 
      phone, 
      location, 
      targetRole, 
      experience, 
      education, 
      skills, 
      achievements 
    } = validationResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Resume generation request received");

    const systemPrompt = `You are an expert career coach and resume writer with years of experience crafting ATS-optimized resumes. Create professional resumes that:
- Use action verbs and quantifiable achievements
- Are optimized for applicant tracking systems (ATS)
- Highlight relevant skills and experiences
- Use industry-standard formatting
- Include keywords relevant to the target role
- Are concise yet impactful (1-2 pages)
- Follow modern resume best practices
- Showcase unique value propositions`;

    const userPrompt = `Create a professional resume with the following information:

CONTACT INFORMATION:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Location: ${location}

TARGET ROLE: ${targetRole}

WORK EXPERIENCE:
${experience}

EDUCATION:
${education}

SKILLS:
${skills}

${achievements ? `KEY ACHIEVEMENTS:\n${achievements}` : ''}

Please structure the resume with:
1. Professional Summary (2-3 sentences highlighting key qualifications)
2. Core Competencies (skills relevant to the target role)
3. Professional Experience (with bullet points using STAR method where possible)
4. Education
5. Technical Skills & Certifications

Use professional formatting with clear section headers. Focus on achievements and impact, not just responsibilities.`;

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
    const generatedResume = data.choices[0].message.content;

    console.log("Successfully generated resume");

    return new Response(
      JSON.stringify({ resume: generatedResume }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in generate-resume:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
