from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
from typing import Dict, List, Any
import json
from dotenv import load_dotenv
load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")  # Make sure to set this environment variable
)

def create_medical_analysis_prompt(patient_info: Dict[str, Any], records: List[Dict[str, Any]]) -> str:
    """Create a comprehensive medical analysis prompt for ChatGPT"""
    
    # Extract patient demographics
    name = patient_info.get('name', 'Patient')
    age = patient_info.get('age', 'Unknown')
    gender = patient_info.get('gender', 'Unknown')
    blood_group = patient_info.get('bloodGroup', 'Unknown')
    
    # Build medical history from records
    medical_history = []
    for record in records:
        date = record.get('date', 'Date not specified')
        title = record.get('title', record.get('type', 'Medical Record'))
        description = record.get('description', record.get('notes', 'No details provided'))
        doctor = record.get('doctor', '')
        
        record_text = f"Date: {date}\nType: {title}\nDetails: {description}"
        if doctor:
            record_text += f"\nAttending Physician: Dr. {doctor}"
        
        medical_history.append(record_text)
    
    prompt = f"""You are a medical AI assistant providing analysis of patient records. Please analyze the following patient information and medical history, then provide a comprehensive medical summary.

PATIENT INFORMATION:
- Name: {name}
- Age: {age}
- Gender: {gender}
- Blood Group: {blood_group}

MEDICAL HISTORY:
{chr(10).join([f"{i+1}. {record}" for i, record in enumerate(medical_history)])}

Please provide a structured analysis including:

1. PATIENT OVERVIEW: Brief demographic summary

2. MEDICAL HISTORY SUMMARY: Key findings and patterns from the medical records

3. CURRENT HEALTH STATUS: Assessment based on recent records

4. POTENTIAL CONCERNS: Any red flags or areas requiring attention

5. RECOMMENDATIONS: Suggested follow-up care, tests, or specialist referrals

6. CONTINUITY OF CARE: Important considerations for ongoing treatment

Please ensure your analysis is:
- Professional and clinical in tone
- Based only on the provided information
- Includes appropriate medical disclaimers
- Highlights any gaps in the medical record
- Provides actionable insights for healthcare providers

Note: This analysis is for informational purposes only and should not replace professional medical judgment or direct patient examination."""

    return prompt

@app.post("/analyze")
async def analyze_medical_data(request: Request):
    try:
        body = await request.json()
        patient_info = body.get("patient_info", {})
        records = body.get("records", [])
        
        if not patient_info and not records:
            raise HTTPException(status_code=400, detail="No patient information or records provided")
        
        # Create the medical analysis prompt
        prompt = create_medical_analysis_prompt(patient_info, records)
        
        # Call ChatGPT API
        response = client.chat.completions.create(
            model="gpt-4",  # or "gpt-3.5-turbo" for faster/cheaper option
            messages=[
                {
                    "role": "system", 
                    "content": "You are a medical AI assistant specializing in clinical data analysis. Provide thorough, professional medical analysis while emphasizing that your recommendations should be validated by qualified healthcare professionals."
                },
                {
                    "role": "user", 
                    "content": prompt
                }
            ],
            max_tokens=1500,
            temperature=0.3,  # Lower temperature for more consistent medical analysis
            top_p=0.9,
            frequency_penalty=0.1,
            presence_penalty=0.1
        )
        
        # Extract the analysis from the response
        analysis = response.choices[0].message.content
        
        # Add metadata about the analysis
        metadata = {
            "model_used": response.model,
            "tokens_used": response.usage.total_tokens,
            "analysis_timestamp": str(response.created),
            "patient_id": patient_info.get('id'),
            "records_analyzed": len(records)
        }
        
        return {
            "success": True,
            "summary": analysis,
            "metadata": metadata,
            "disclaimer": "This AI-generated analysis is for informational purposes only and should not replace professional medical advice, diagnosis, or treatment."
        }
        
    except Exception as e:
        print(f"Error during analysis: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/analyze-biogpt")
async def analyze_with_biogpt(request: Request):
    """Alternative endpoint using BioGPT for medical analysis"""
    try:
        from transformers import AutoTokenizer, AutoModelForCausalLM
        import torch
        
        body = await request.json()
        patient_info = body.get("patient_info", {})
        records = body.get("records", [])
        
        # Load BioGPT model and tokenizer (you might want to do this at startup)
        tokenizer = AutoTokenizer.from_pretrained("microsoft/biogpt")
        model = AutoModelForCausalLM.from_pretrained("microsoft/biogpt")
        
        # Build a prompt more suitable for BioGPT
        prompt = f"""Patient medical history summary:

Name: {patient_info.get('name', 'Patient')}
Age: {patient_info.get('age', 'Unknown')}
Gender: {patient_info.get('gender', 'Unknown')}

Medical Records:
"""
        
        for i, record in enumerate(records, 1):
            prompt += f"{i}. {record.get('date', '')}: {record.get('title', record.get('type', ''))} — {record.get('description', record.get('notes', ''))}\n"
        
        prompt += "\nClinical Assessment and Recommendations:"
        
        # Generate response
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        with torch.no_grad():
            outputs = model.generate(
                **inputs, 
                max_new_tokens=300, 
                do_sample=True, 
                temperature=0.7,
                pad_token_id=tokenizer.eos_token_id
            )
        
        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return {
            "success": True,
            "summary": result,
            "model": "BioGPT",
            "disclaimer": "This AI-generated analysis is for informational purposes only."
        }
        
    except ImportError:
        raise HTTPException(status_code=500, detail="BioGPT dependencies not installed. Use 'pip install transformers torch' to install.")
    except Exception as e:
        print(f"BioGPT Analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"BioGPT analysis failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Medical Analysis API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)