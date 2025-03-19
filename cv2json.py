# -*- coding: utf-8 -*-
"""
Created on Mon Mar 17 13:11:06 2025

@author: gabroliveros
"""

from flask import Flask, request, jsonify, render_template
from datetime import datetime
import re

app = Flask(__name__)


def validate_date(date_str):
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def validate_iso_code(code, iso_type):
    if iso_type == 'language' and not re.match(r'^[a-z]{2}$', code):
        return False
    if iso_type == 'country' and not re.match(r'^[A-Z]{2}$', code):
        return False
    return True

def generate_cv_json(data):
    return {
        "metadata": {
            "schema_version": "1.0",
            "last_updated": datetime.now().strftime("%Y-%m-%d"),
            "document_language": data.get('document_language', 'en')  # Default to English
        },
        "personal_information": {
            "names": data.get('names', ''),
            "surnames": data.get('surnames', ''),
            "date_of_birth": data.get('date_of_birth', ''),
            "nationalities": data.get('nationalities', []),  # Lista de nacionalidades
            "contact": {
                "email": data.get('email', ''),
                "phone": data.get('phone', ''),
                "address": {
                    "street": data.get('street', ''),
                    "city": data.get('city', ''),
                    "country": data.get('country', ''),
                    "postal_code": data.get('postal_code', '')
                }
            },
            "online_profiles": [
                {
                    "platform": profile.get('platform', ''),
                    "url": profile.get('url', '')
                }
                for profile in data.get('online_profiles', [])
            ]
        },
        "education": [
            {
                "title": edu.get('title', ''),  # Cambiado de "degree" a "title"
                "institution": edu.get('institution', ''),
                "country": edu.get('country', ''),  # Nuevo campo
                "education_level": edu.get('education_level', ''),  # Nuevo campo
                "start_date": edu.get('start_date', ''),
                "end_date": edu.get('end_date', ''),
                "completed": edu.get('completed', False),  # Cambiado de "currently_studying" a "completed"
                "description": edu.get('description', '')
            }
            for edu in data.get('education', [])
        ],
        "employment_history": [
            {
                "position": emp.get('position', ''),
                "organization": emp.get('organization', ''),
                "location": emp.get('location', ''),
                "start_date": emp.get('start_date', ''),
                "end_date": emp.get('end_date', ''),
                "currently_working": emp.get('currently_working', False),
                "employment_type": emp.get('employment_type', ''),
                "responsibilities": emp.get('responsibilities', '').split(','),
            }
            for emp in data.get('employment_history', [])
        ],
        "skills": {
            "technical": [
                {
                    "name": skill.get('name', ''),
                    "proficiency": skill.get('proficiency', ''),  # Cambiado de "category" a "proficiency"
                    "years_experience": float(skill.get('years_experience', 0))
                }
                for skill in data.get('technical_skills', [])
            ],
            "languages": [
                {
                    "language": lang.get('language', ''),
                    "proficiency": {
                        "reading": lang.get('reading', ''),
                        "writing": lang.get('writing', ''),
                        "speaking": lang.get('speaking', '')
                    },
                    "certifications": [
                        {
                            "name": cert.get('name', ''),
                            "score": cert.get('score', ''),
                            "date": cert.get('date', '')
                        }
                        for cert in lang.get('certifications', [])
                    ]
                }
                for lang in data.get('languages', [])
            ],
            "soft_skills": data.get('soft_skills', '').split(',')
        },
        "certifications": [
            {
                "name": cert.get('name', ''),
                "issuing_organization": cert.get('issuing_organization', ''),
                "issue_date": cert.get('issue_date', ''),
                "expiration_date": cert.get('expiration_date', ''),
                "credential_id": cert.get('credential_id', ''),
                "credential_url": cert.get('credential_url', '')
            }
            for cert in data.get('certifications', [])
        ],
        "events_participation": [
            {
                "name": event.get('name', ''),  # Cambiado de "type" a "name"
                "role": event.get('role', ''),
                "date": event.get('date', ''),
                "location": event.get('location', ''),
                "description": event.get('description', '')
            }
            for event in data.get('events_participation', [])
        ],
        "publications_research": [
            {
                "type": pub.get('type', ''),
                "title": pub.get('title', ''),
                "authors": pub.get('authors', '').split(','),
                "publication_date": pub.get('publication_date', ''),
                "publisher": pub.get('publisher', ''),
                "doi": pub.get('doi', ''),
                "url": pub.get('url', '')
            }
            for pub in data.get('publications_research', [])
        ],
        "references": [
            {
                "name": ref.get('name', ''),
                "position": ref.get('position', ''),
                "organization": ref.get('organization', ''),
                "contact": {
                    "email": ref.get('email', ''),
                    "phone": ref.get('phone', '')
                },
                "relationship": ref.get('relationship', '')
            }
            for ref in data.get('references', [])
        ],
        "additional_sections": {
            "awards_honors": [
                {
                    "name": award.get('name', ''),
                    "issuing_organization": award.get('issuing_organization', ''),
                    "date": award.get('date', ''),
                    "description": award.get('description', '')
                }
                for award in data.get('awards_honors', [])
            ],
            "volunteering": [
                {
                    "role": vol.get('role', ''),
                    "organization": vol.get('organization', ''),
                    "start_date": vol.get('start_date', ''),
                    "end_date": vol.get('end_date', ''),
                    "description": vol.get('description', '')
                }
                for vol in data.get('volunteering', [])
            ],
            "professional_affiliations": [
                {
                    "organization": aff.get('organization', ''),
                    "role": aff.get('role', ''),
                    "start_date": aff.get('start_date', ''),
                    "end_date": aff.get('end_date', '')
                }
                for aff in data.get('professional_affiliations', [])
            ]
        }
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_cv', methods=['POST'])
def generate_cv():
    try:
        data = request.get_json()
        
        # Validaciones básicas
        if not validate_date(data['date_of_birth']):
            return jsonify({"error": "Formato de fecha inválido (YYYY-MM-DD)"}), 400
        
        if not validate_iso_code(data['document_language'], 'language'):
            return jsonify({"error": "Código de idioma inválido (ISO 639-1)"}), 400
            
        cv_json = generate_cv_json(data)
        return jsonify(cv_json)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=False)