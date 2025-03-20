# CV to JSON

Este proyecto tiene como objetivo crear un formato estandarizado de currículum vitae (CV) en JSON que pueda ser utilizado en múltiples plataformas de empleo y sectores. Inspirado en estándares internacionales (como los de organizaciones afiliadas a la ONU, Europass y LinkedIn), busca definir los campos necesarios para un CV universal y fácil de procesar.

## Beneficios del formato JSON para CV

### Para el solicitante de empleo

- **Ahorro de tiempo**: Completa tu CV una sola vez en una página web, conviértelo a un archivo JSON y descárgalo. Cada vez que te postules a un empleo, carga tu archivo JSON y ¡listo! Te ahorras horas llenando formularios y evitas el cansancio, molestias y posibles frustraciones.
- **Flexibilidad**: Puedes seguir utilizando un archivo PDF para destacar visualmente ante los reclutadores, pero con la comodidad de tener un JSON actualizable.
- **Actualización sencilla**: Crea y actualiza tu archivo JSON y PDF cuando lo necesites, sin perder información.
- **Evita errores**: Evita la pérdida de información común al cargar PDFs en plataformas que no reconocen correctamente los campos.

### Para las organizaciones

- **Mejora de imagen**: Garantizan una experiencia ágil para los solicitantes de empleo brindándoles todos los beneficios del apartado anterior.
- **Retención de talento**: Evitan la pérdida de candidatos al facilitar la carga de información, reduciendo la deserción en procesos de solicitud.
- **Optimización de almacenamiento**: Almacenan archivos JSON en lugar de PDFs, lo que reduce costos de almacenamiento y mejora la eficiencia.
- **Ahorro de energía y tiempo**: Evitan el escaneo de PDFs o DOCX, formatos con una tasa de éxito inferior al 50% en la asignación correcta de datos.
- **Integración sencilla**: Los archivos JSON se integran fácilmente con sistemas de bases de datos, APIs y herramientas de análisis.
- **Clasificación eficiente**: La estructura clara y organizada de JSON facilita la clasificación, búsqueda y filtrado de candidatos.
- **Escalabilidad**: JSON es ideal para manejar grandes volúmenes de datos, crucial para plataformas con miles o millones de usuarios.

## Cómo puedes participar

Puedes contribuir de varias maneras, incluso si no tienes conocimientos de programación:

- **Recomendaciones y correcciones**: Sugiere mejoras para el esquema o la estructura del archivo JSON.
- **Desarrollo**: Si eres desarrollador, puedes contribuir para que la estructura del JSON sea más sencilla o útil.
- **Enfoque universal**: Al realizar tus sugerencias, piensa en un formato de campos amplio y universal que cualquier plataforma pueda procesar.
- **En GitHub**: Abre un **issue** y escribe tus sugerencias, recomendaciones y los errores por corregir.

## Estructura del archivo JSON propuesto

{
  "metadata": {
    "schema_version": "1.0",
    "last_updated": "YYYY-MM-DD",
    "document_language": "ISO 639-1"
  },
  "personal_information": {
    "full_name": "",
    "date_of_birth": "YYYY-MM-DD",
    "nationalities": [],
    "contact": {
      "email": "",
      "phone": "",
      "address": {
        "street": "",
        "city": "",
        "country": "ISO 3166-1 alpha-2",
        "postal_code": ""
      }
    },
    "online_profiles": [
      {
        "platform": "LinkedIn/GitHub/Portfolio/etc",
        "url": ""
      }
    ]
  },
  "education": [
    {
      "degree": "",
      "field_of_study": "",
      "institution": "",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD",
      "currently_studying": false,
      "description": "",
      "honors": ["cum laude", "GPA 4.0", "..."]
    }
  ],
  "employment_history": [
    {
      "position": "",
      "organization": "",
      "location": "",
      "start_date": "YYYY-MM-DD",
      "end_date": "YYYY-MM-DD",
      "currently_working": false,
      "employment_type": "full-time/part-time/contract/etc",
      "responsibilities": [],
      "projects": [
        {
          "name": "",
          "description": "",
          "technologies": [],
          "outcomes": ""
        }
      ]
    }
  ],
  "skills": {
    "technical": [
      {
        "name": "",
        "category": "Programming Languages/Databases/DevOps/etc",
        "proficiency": "Basic/Intermediate/Advanced",
        "years_experience": 0
      }
    ],
    "languages": [
      {
        "language": "ISO 639-1",
        "proficiency": {
          "reading": "A1-C2",
          "writing": "A1-C2",
          "speaking": "A1-C2"
        },
        "certifications": [
          {
            "name": "TOEFL/DELE/etc",
            "score": "",
            "date": "YYYY-MM-DD"
          }
        ]
      }
    ],
    "soft_skills": []
  },
  "certifications": [
    {
      "name": "",
      "issuing_organization": "",
      "issue_date": "YYYY-MM-DD",
      "expiration_date": "YYYY-MM-DD",
      "credential_id": "",
      "credential_url": ""
    }
  ],
  "events_participation": [
    {
      "type": "Conference/Workshop/Symposium",
      "name": "",
      "role": "Attendee/Speaker/Panelist",
      "date": "YYYY-MM-DD",
      "location": "",
      "description": ""
    }
  ],
  "publications_research": [
    {
      "type": "Journal Article/Book/Conference Paper",
      "title": "",
      "authors": [],
      "publication_date": "YYYY-MM-DD",
      "publisher": "",
      "doi": "",
      "url": ""
    }
  ],
  "references": [
    {
      "name": "",
      "position": "",
      "organization": "",
      "contact": {
        "email": "",
        "phone": ""
      },
      "relationship": "Supervisor/Colleague/Professor"
    }
  ],
  "additional_sections": {
    "awards_honors": [
      {
        "name": "",
        "issuing_organization": "",
        "date": "YYYY-MM-DD",
        "description": ""
      }
    ],
    "volunteering": [
      {
        "role": "",
        "organization": "",
        "start_date": "YYYY-MM-DD",
        "end_date": "YYYY-MM-DD",
        "description": ""
      }
    ],
    "professional_affiliations": [
      {
        "organization": "",
        "role": "Member/Board Member/etc",
        "start_date": "YYYY-MM-DD",
        "end_date": "YYYY-MM-DD"
      }
    ]
  },
  "custom_fields": {}
}

## Sobre el convertidor

El proyecto incluye un script en Python para crear un CV estandarizado en formato JSON. Este script es un ejemplo que puede servir como punto de partida para que las organizaciones desarrollen sus propias soluciones.

### Requisitos

- Python 3.x
- Flask 3.1.0

### Cómo usar el script

1. Clona el repositorio.
2. Ejecuta el script para evaluar la conversión de datos.
3. Personaliza el script según las necesidades de tu organización.

### Contribuciones

Tus comentarios y contribuciones son valiosos. Si deseas mejorar el proyecto:

- Abre un **issue** para reportar errores y sugerir mejoras o
- Envía un **pull request** con tus aportes.

Trabajemos para sumar beneficios en lugar de obstáculos y facilitemos la búsqueda de trabajo en lugar de complicarla. Esta propuesta es una solución ganar-ganar con requerimientos de adaptación bajos, altamente razonables y con un presupuesto insignificante.

Adoptemos mejores prácticas para beneficio de todos.
