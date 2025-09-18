#!/usr/bin/env python3

import json
import PyPDF2
import re
from typing import Dict, List, Any

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text content from PDF file."""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def extract_email(text: str) -> str:
    """Extract email address from text."""
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails[0] if emails else ""

def extract_phone(text: str) -> str:
    """Extract phone number from text."""
    phone_patterns = [
        r'\+91[\s-]?[6-9]\d{9}',
        r'[6-9]\d{9}',
        r'\(\d{3}\)[\s-]?\d{3}[\s-]?\d{4}',
    ]
    
    for pattern in phone_patterns:
        phones = re.findall(pattern, text)
        if phones:
            return phones[0]
    return ""

def extract_skills(text: str) -> List[str]:
    """Extract skills from text based on common technical keywords."""
    common_skills = [
        'Python', 'Java', 'JavaScript', 'C++', 'C', 'R', 'SQL', 'HTML', 'CSS',
        'React', 'Node.js', 'Django', 'Flask', 'FastAPI', 'MongoDB', 'MySQL',
        'PostgreSQL', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
        'Git', 'Linux', 'Machine Learning', 'Deep Learning', 'TensorFlow',
        'PyTorch', 'Pandas', 'NumPy', 'Scikit-learn', 'OpenCV', 'YOLO',
        'Tableau', 'Power BI', 'Streamlit', 'APIs', 'REST', 'GraphQL'
    ]
    
    found_skills = []
    text_upper = text.upper()
    
    for skill in common_skills:
        if skill.upper() in text_upper:
            found_skills.append(skill)
    
    return found_skills

def parse_resume(pdf_path: str) -> Dict[str, Any]:
    """Parse resume PDF and return structured data."""
    text = extract_text_from_pdf(pdf_path)
    
    if not text:
        print("Could not extract text from PDF")
        return {}
    
    parsed_data = {
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "raw_text": text[:500] + "..." if len(text) > 500 else text
    }
    
    return parsed_data

def update_data_json(parsed_data: Dict[str, Any], data_json_path: str = "data.json"):
    """Update data.json with parsed resume information."""
    try:
        with open(data_json_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        if parsed_data.get("email"):
            data["profile"]["email"] = parsed_data["email"]
        
        if parsed_data.get("phone"):
            data["profile"]["phone"] = parsed_data["phone"]
        
        if parsed_data.get("skills"):
            existing_skills = set(data.get("skills", []))
            new_skills = set(parsed_data["skills"])
            data["skills"] = list(existing_skills.union(new_skills))
        
        with open(data_json_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)
        
        print("Successfully updated data.json with parsed resume information")
        return True
        
    except Exception as e:
        print(f"Error updating data.json: {e}")
        return False

def main():
    """Main function to run the resume parser."""
    resume_path = "resume.pdf"
    
    print("Parsing resume...")
    parsed_data = parse_resume(resume_path)
    
    if parsed_data:
        print("Parsed data:")
        print(f"Email: {parsed_data.get('email', 'Not found')}")
        print(f"Phone: {parsed_data.get('phone', 'Not found')}")
        print(f"Skills found: {len(parsed_data.get('skills', []))}")
        
        update_choice = input("\nUpdate data.json with this information? (y/n): ")
        if update_choice.lower() == 'y':
            update_data_json(parsed_data)
        else:
            print("Skipped updating data.json")
    else:
        print("Failed to parse resume")

if __name__ == "__main__":
    main()
