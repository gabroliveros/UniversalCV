# -*- coding: utf-8 -*-
"""
Created on Mon Mar 17 12:33:47 2025

@author: ACER
"""

import json
from datetime import datetime

def add_education():
    education = []
    while True:
        if input("\n¿Agregar educación? (s/n): ").lower() != 's':
            break
        education.append({
            "degree": input("Título obtenido: "),
            "field_of_study": input("Área de estudio: "),
            "institution": input("Institución: "),
            "start_date": input("Fecha de inicio (YYYY-MM-DD): "),
            "end_date": input("Fecha de finalización (YYYY-MM-DD): "),
            "currently_studying": input("¿Actualmente estudiando? (s/n): ").lower() == 's',
            "description": input("Descripción (opcional): "),
            "honors": input("Honores (separados por comas): ").split(',')
        })
    return education

def add_employment():
    employment = []
    while True:
        if input("\n¿Agregar experiencia laboral? (s/n): ").lower() != 's':
            break
        
        projects = []
        while True:
            if input("¿Agregar proyecto a esta posición? (s/n): ").lower() != 's':
                break
            projects.append({
                "name": input("Nombre del proyecto: "),
                "description": input("Descripción: "),
                "technologies": input("Tecnologías usadas (separadas por comas): ").split(','),
                "outcomes": input("Resultados obtenidos: ")
            })
        
        employment.append({
            "position": input("Puesto: "),
            "organization": input("Organización: "),
            "location": input("Ubicación: "),
            "start_date": input("Fecha de inicio (YYYY-MM-DD): "),
            "end_date": input("Fecha de finalización (YYYY-MM-DD): "),
            "currently_working": input("¿Actualmente trabajando aquí? (s/n): ").lower() == 's',
            "employment_type": input("Tipo de empleo (full-time/part-time/contract/etc): "),
            "responsibilities": input("Responsabilidades (separadas por comas): ").split(','),
            "projects": projects
        })
    return employment

def add_skills():
    skills = {"technical": [], "languages": [], "soft_skills": []}
    
    # Habilidades técnicas
    print("\n--- Habilidades Técnicas ---")
    while True:
        if input("¿Agregar habilidad técnica? (s/n): ").lower() != 's':
            break
        skills["technical"].append({
            "name": input("Nombre de la habilidad: "),
            "category": input("Categoría (Programming Languages/Databases/etc): "),
            "proficiency": input("Nivel (Basic/Intermediate/Advanced): "),
            "years_experience": float(input("Años de experiencia: "))
        })
    
    # Idiomas
    print("\n--- Idiomas ---")
    while True:
        if input("¿Agregar idioma? (s/n): ").lower() != 's':
            break
        
        certifications = []
        if input("¿Tiene certificaciones para este idioma? (s/n): ").lower() == 's':
            certifications.append({
                "name": input("Nombre de la certificación: "),
                "score": input("Puntaje obtenido: "),
                "date": input("Fecha de obtención (YYYY-MM-DD): ")
            })
        
        skills["languages"].append({
            "language": input("Idioma (código ISO 639-1): "),
            "proficiency": {
                "reading": input("Nivel de lectura (A1-C2): "),
                "writing": input("Nivel de escritura (A1-C2): "),
                "speaking": input("Nivel de habla (A1-C2): ")
            },
            "certifications": certifications
        })
    
    # Habilidades blandas
    print("\n--- Habilidades Blandas ---")
    skills["soft_skills"] = input("Habilidades blandas (separadas por comas): ").split(',')
    
    return skills

def add_certifications():
    certifications = []
    while True:
        if input("\n¿Agregar certificación? (s/n): ").lower() != 's':
            break
        certifications.append({
            "name": input("Nombre de la certificación: "),
            "issuing_organization": input("Organización emisora: "),
            "issue_date": input("Fecha de emisión (YYYY-MM-DD): "),
            "expiration_date": input("Fecha de expiración (opcional, YYYY-MM-DD): "),
            "credential_id": input("ID de la credencial (opcional): "),
            "credential_url": input("URL de verificación (opcional): ")
        })
    return certifications

def add_events():
    events = []
    while True:
        if input("\n¿Agregar participación en evento? (s/n): ").lower() != 's':
            break
        events.append({
            "type": input("Tipo de evento (Conference/Workshop/etc): "),
            "name": input("Nombre del evento: "),
            "role": input("Rol (Attendee/Speaker/etc): "),
            "date": input("Fecha del evento (YYYY-MM-DD): "),
            "location": input("Ubicación: "),
            "description": input("Descripción: ")
        })
    return events

def add_publications():
    publications = []
    while True:
        if input("\n¿Agregar publicación? (s/n): ").lower() != 's':
            break
        publications.append({
            "type": input("Tipo (Journal Article/Book/etc): "),
            "title": input("Título: "),
            "authors": input("Autores (separados por comas): ").split(','),
            "publication_date": input("Fecha de publicación (YYYY-MM-DD): "),
            "publisher": input("Editorial: "),
            "doi": input("DOI (opcional): "),
            "url": input("URL de acceso (opcional): ")
        })
    return publications

def add_references():
    references = []
    while True:
        if input("\n¿Agregar referencia? (s/n): ").lower() != 's':
            break
        references.append({
            "name": input("Nombre del referente: "),
            "position": input("Posición: "),
            "organization": input("Organización: "),
            "contact": {
                "email": input("Email: "),
                "phone": input("Teléfono: ")
            },
            "relationship": input("Relación (Supervisor/Colleague/etc): ")
        })
    return references

def add_additional_sections():
    additional = {
        "awards_honors": [],
        "volunteering": [],
        "professional_affiliations": []
    }
    
    # Premios y honores
    print("\n--- Premios y Honores ---")
    while True:
        if input("¿Agregar premio? (s/n): ").lower() != 's':
            break
        additional["awards_honors"].append({
            "name": input("Nombre del premio: "),
            "issuing_organization": input("Organización que lo otorga: "),
            "date": input("Fecha (YYYY-MM-DD): "),
            "description": input("Descripción: ")
        })
    
    # Voluntariado
    print("\n--- Voluntariado ---")
    while True:
        if input("¿Agregar experiencia de voluntariado? (s/n): ").lower() != 's':
            break
        additional["volunteering"].append({
            "role": input("Rol: "),
            "organization": input("Organización: "),
            "start_date": input("Fecha de inicio (YYYY-MM-DD): "),
            "end_date": input("Fecha de finalización (YYYY-MM-DD): "),
            "description": input("Descripción: ")
        })
    
    # Afiliaciones profesionales
    print("\n--- Afiliaciones Profesionales ---")
    while True:
        if input("¿Agregar afiliación profesional? (s/n): ").lower() != 's':
            break
        additional["professional_affiliations"].append({
            "organization": input("Organización: "),
            "role": input("Rol (Member/Board Member/etc): "),
            "start_date": input("Fecha de inicio (YYYY-MM-DD): "),
            "end_date": input("Fecha de finalización (YYYY-MM-DD): ")
        })
    
    return additional

# ------------------------- FUNCIÓN PRINCIPAL -------------------------
def create_cv_template():
    template = {
        "metadata": {
            "schema_version": "1.0",
            "last_updated": datetime.now().strftime("%Y-%m-%d"),
            "document_language": input("Idioma del documento (código ISO 639-1): ")
        },
        "personal_information": {
            "full_name": input("\nNombre completo: "),
            "date_of_birth": input("Fecha de nacimiento (YYYY-MM-DD): "),
            "nationalities": input("Nacionalidades (separadas por comas): ").split(','),
            "contact": {
                "email": input("Email: "),
                "phone": input("Teléfono: "),
                "address": {
                    "street": input("Calle: "),
                    "city": input("Ciudad: "),
                    "country": input("País (ISO 3166-1 alpha-2): "),
                    "postal_code": input("Código postal: ")
                }
            },
            "online_profiles": []
        },
        "education": add_education(),
        "employment_history": add_employment(),
        "skills": add_skills(),
        "certifications": add_certifications(),
        "events_participation": add_events(),
        "publications_research": add_publications(),
        "references": add_references(),
        "additional_sections": add_additional_sections(),
        "custom_fields": {}
    }
    
    # Perfiles en línea
    print("\n--- Perfiles en Línea ---")
    while True:
        if input("¿Agregar perfil en línea? (s/n): ").lower() != 's':
            break
        template["personal_information"]["online_profiles"].append({
            "platform": input("Plataforma (LinkedIn/GitHub/etc): "),
            "url": input("URL: ")
        })
    
    return template

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("¡Generador de CV en formato JSON!")
    print("Por favor complete la siguiente información:\n")
    cv_data = create_cv_template()
    save_to_json(cv_data, "my_cv.json")
    print("\n¡CV generado exitosamente en 'curriculum.json'!")