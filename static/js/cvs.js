//--------------------------------------
// Load a JSON file and prefill the form
//--------------------------------------

function loadJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const jsonData = JSON.parse(e.target.result);
        prefillForm(jsonData);
    };
    reader.readAsText(file);
}

// Function to prefill the form with JSON data
function prefillForm(data) {
    // Personal Information
    document.getElementById('names').value = data.personal_information.names || '';
    document.getElementById('surnames').value = data.personal_information.surnames || '';
    document.getElementById('date_of_birth').value = data.personal_information.date_of_birth || '';
    document.getElementById('email').value = data.personal_information.contact.email || '';
    document.getElementById('phone').value = data.personal_information.contact.phone || '';
    document.getElementById('street').value = data.personal_information.contact.address.street || '';
    document.getElementById('city').value = data.personal_information.contact.address.city || '';
    document.getElementById('country').value = data.personal_information.contact.address.country || '';
    document.getElementById('postal_code').value = data.personal_information.contact.address.postal_code || '';

    // Nationalities
    const nationalitiesContainer = document.getElementById('nationalities_container');
    nationalitiesContainer.innerHTML = ''; // Clear existing nationalities
    data.personal_information.nationalities.forEach(nationality => {
        addNationality(); // Add a new nationality field
        const lastNationality = nationalitiesContainer.lastElementChild;
        const nationalityInput = lastNationality.querySelector('input[type="text"]');
        if (nationalityInput) {
            nationalityInput.value = nationality || '';
        }
    });

    // Online Profiles
    const onlineProfilesContainer = document.getElementById('online_profiles');
    onlineProfilesContainer.innerHTML = ''; // Clear existing profiles
    data.personal_information.online_profiles.forEach(profile => {
        addOnlineProfile(); // Add a new profile field
        const lastProfile = onlineProfilesContainer.lastElementChild;
        const platformInput = lastProfile.querySelector('input[type="text"]');
        const urlInput = lastProfile.querySelector('input[type="url"]');
        if (platformInput && urlInput) {
            platformInput.value = profile.platform || '';
            urlInput.value = profile.url || '';
        }
    });

    // Education
    const educationContainer = document.getElementById('education_fields');
    educationContainer.innerHTML = ''; // Clear existing education entries
    data.education.forEach(edu => {
        addEducation(); // Add a new education field
        const lastEducation = educationContainer.lastElementChild;
        const titleInput = lastEducation.querySelector('input[type="text"]');
        const institutionInput = lastEducation.querySelectorAll('input[type="text"]')[1];
        const countryInput = lastEducation.querySelectorAll('input[type="text"]')[2];
        const educationLevelSelect = lastEducation.querySelector('select');
        const startDateInput = lastEducation.querySelector('input[type="date"]');
        const endDateInput = lastEducation.querySelectorAll('input[type="date"]')[1];
        const completedCheckbox = lastEducation.querySelector('input[type="checkbox"]');
        const descriptionTextarea = lastEducation.querySelector('textarea');

        if (titleInput) titleInput.value = edu.title || '';
        if (institutionInput) institutionInput.value = edu.institution || '';
        if (countryInput) countryInput.value = edu.country || '';
        if (educationLevelSelect) educationLevelSelect.value = edu.education_level || '';
        if (edu.education_level === 'other') {
            const otherEducationLevelInput = lastEducation.querySelector('#other_education_level');
            if (otherEducationLevelInput) {
                otherEducationLevelInput.style.display = 'block';
                otherEducationLevelInput.value = edu.education_level || '';
            }
        }
        if (startDateInput) startDateInput.value = edu.start_date || '';
        if (endDateInput) endDateInput.value = edu.end_date || '';
        if (completedCheckbox) completedCheckbox.checked = edu.completed || false;
        if (descriptionTextarea) descriptionTextarea.value = edu.description || '';
    });

    // Employment History
    const employmentContainer = document.getElementById('employment_fields');
    employmentContainer.innerHTML = ''; // Clear existing employment entries
    data.employment_history.forEach(emp => {
        addEmployment(); // Add a new employment field
        const lastEmployment = employmentContainer.lastElementChild;
        const positionInput = lastEmployment.querySelector('input[type="text"]');
        const organizationInput = lastEmployment.querySelectorAll('input[type="text"]')[1];
        const locationInput = lastEmployment.querySelectorAll('input[type="text"]')[2];
        const startDateInput = lastEmployment.querySelector('input[type="date"]');
        const endDateInput = lastEmployment.querySelectorAll('input[type="date"]')[1];
        const currentlyWorkingCheckbox = lastEmployment.querySelector('input[type="checkbox"]');
        const employmentTypeSelect = lastEmployment.querySelector('select');
        const responsibilitiesTextarea = lastEmployment.querySelector('textarea');

        if (positionInput) positionInput.value = emp.position || '';
        if (organizationInput) organizationInput.value = emp.organization || '';
        if (locationInput) locationInput.value = emp.location || '';
        if (startDateInput) startDateInput.value = emp.start_date || '';
        if (endDateInput) endDateInput.value = emp.end_date || '';
        if (currentlyWorkingCheckbox) currentlyWorkingCheckbox.checked = emp.currently_working || false;
        if (employmentTypeSelect) employmentTypeSelect.value = emp.employment_type || '';
        if (responsibilitiesTextarea) responsibilitiesTextarea.value = emp.responsibilities || '';
    });

    // Skills
    const softSkillsInput = document.getElementById('soft_skills');
    if (softSkillsInput) softSkillsInput.value = data.skills.soft_skills.join(', ') || '';

    // Technical Skills
    const technicalSkillsContainer = document.getElementById('technical_skills');
    technicalSkillsContainer.innerHTML = ''; // Clear existing technical skills
    data.skills.technical.forEach(skill => {
        addTechnicalSkill(); // Add a new technical skill field
        const lastSkill = technicalSkillsContainer.lastElementChild;
        const nameInput = lastSkill.querySelector('input[type="text"]');
        const proficiencySelect = lastSkill.querySelector('select');
        const yearsExperienceInput = lastSkill.querySelector('input[type="number"]');

        if (nameInput) nameInput.value = skill.name || '';
        if (proficiencySelect) proficiencySelect.value = skill.proficiency || '';
        if (yearsExperienceInput) yearsExperienceInput.value = skill.years_experience || '';
    });

    // Languages
    const languagesContainer = document.getElementById('languages');
    languagesContainer.innerHTML = ''; // Clear existing languages
    data.skills.languages.forEach(lang => {
        addLanguage(); // Add a new language field
        const lastLanguage = languagesContainer.lastElementChild;
        const languageSelect = lastLanguage.querySelector('select');
        const readingSelect = lastLanguage.querySelectorAll('select')[1];
        const writingSelect = lastLanguage.querySelectorAll('select')[2];
        const speakingSelect = lastLanguage.querySelectorAll('select')[3];

        if (languageSelect) languageSelect.value = lang.language || '';
        if (readingSelect) readingSelect.value = lang.proficiency.reading || '';
        if (writingSelect) writingSelect.value = lang.proficiency.writing || '';
        if (speakingSelect) speakingSelect.value = lang.proficiency.speaking || '';

        // Language Certifications
        const certificationsContainer = lastLanguage.querySelector('#language_certifications');
        if (certificationsContainer) {
            certificationsContainer.innerHTML = ''; // Clear existing certifications
            lang.certifications.forEach(cert => {
                addLanguageCertification(lastLanguage.querySelector('button[onclick*="addLanguageCertification"]')); // Add a new certification field
                const lastCert = certificationsContainer.lastElementChild;
                const nameInput = lastCert.querySelector('input[type="text"]');
                const scoreInput = lastCert.querySelectorAll('input[type="text"]')[1];
                const dateInput = lastCert.querySelector('input[type="date"]');

                if (nameInput) nameInput.value = cert.name || '';
                if (scoreInput) scoreInput.value = cert.score || '';
                if (dateInput) dateInput.value = cert.date || '';
            });
        }
    });

    // Certifications
    const certificationsContainer = document.getElementById('certification_fields');
    certificationsContainer.innerHTML = ''; // Clear existing certifications
    data.certifications.forEach(cert => {
        addCertification(); // Add a new certification field
        const lastCert = certificationsContainer.lastElementChild;
        const nameInput = lastCert.querySelector('input[type="text"]');
        const issuingOrganizationInput = lastCert.querySelectorAll('input[type="text"]')[1];
        const issueDateInput = lastCert.querySelector('input[type="date"]');
        const expirationDateInput = lastCert.querySelectorAll('input[type="date"]')[1];
        const credentialIdInput = lastCert.querySelector('input[type="text"]');
        const credentialUrlInput = lastCert.querySelector('input[type="url"]');

        if (nameInput) nameInput.value = cert.name || '';
        if (issuingOrganizationInput) issuingOrganizationInput.value = cert.issuing_organization || '';
        if (issueDateInput) issueDateInput.value = cert.issue_date || '';
        if (expirationDateInput) expirationDateInput.value = cert.expiration_date || '';
        if (credentialIdInput) credentialIdInput.value = cert.credential_id || '';
        if (credentialUrlInput) credentialUrlInput.value = cert.credential_url || '';
    });

    // Events
    const eventsContainer = document.getElementById('event_fields');
    eventsContainer.innerHTML = ''; // Clear existing events
    data.events_participation.forEach(event => {
        addEvent(); // Add a new event field
        const lastEvent = eventsContainer.lastElementChild;
        const nameInput = lastEvent.querySelector('input[type="text"]');
        const roleSelect = lastEvent.querySelector('select');
        const dateInput = lastEvent.querySelector('input[type="date"]');
        const locationInput = lastEvent.querySelector('input[type="text"]');
        const descriptionTextarea = lastEvent.querySelector('textarea');

        if (nameInput) nameInput.value = event.name || '';
        if (roleSelect) roleSelect.value = event.role || '';
        if (dateInput) dateInput.value = event.date || '';
        if (locationInput) locationInput.value = event.location || '';
        if (descriptionTextarea) descriptionTextarea.value = event.description || '';
    });

    // Publications
    const publicationsContainer = document.getElementById('publication_fields');
    publicationsContainer.innerHTML = ''; // Clear existing publications
    data.publications_research.forEach(pub => {
        addPublication(); // Add a new publication field
        const lastPub = publicationsContainer.lastElementChild;
        const typeInput = lastPub.querySelector('input[type="text"]');
        const titleInput = lastPub.querySelectorAll('input[type="text"]')[1];
        const authorsInput = lastPub.querySelectorAll('input[type="text"]')[2];
        const publicationDateInput = lastPub.querySelector('input[type="date"]');
        const publisherInput = lastPub.querySelectorAll('input[type="text"]')[3];
        const doiInput = lastPub.querySelector('input[type="text"]');
        const urlInput = lastPub.querySelector('input[type="url"]');

        if (typeInput) typeInput.value = pub.type || '';
        if (titleInput) titleInput.value = pub.title || '';
        if (authorsInput) authorsInput.value = pub.authors.join(', ') || '';
        if (publicationDateInput) publicationDateInput.value = pub.publication_date || '';
        if (publisherInput) publisherInput.value = pub.publisher || '';
        if (doiInput) doiInput.value = pub.doi || '';
        if (urlInput) urlInput.value = pub.url || '';
    });

    // References
    const referencesContainer = document.getElementById('reference_fields');
    referencesContainer.innerHTML = ''; // Clear existing references
    data.references.forEach(ref => {
        addReference(); // Add a new reference field
        const lastRef = referencesContainer.lastElementChild;
        const nameInput = lastRef.querySelector('input[type="text"]');
        const positionInput = lastRef.querySelectorAll('input[type="text"]')[1];
        const organizationInput = lastRef.querySelectorAll('input[type="text"]')[2];
        const emailInput = lastRef.querySelector('input[type="email"]');
        const phoneInput = lastRef.querySelector('input[type="tel"]');
        const relationshipInput = lastRef.querySelector('input[type="text"]');

        if (nameInput) nameInput.value = ref.name || '';
        if (positionInput) positionInput.value = ref.position || '';
        if (organizationInput) organizationInput.value = ref.organization || '';
        if (emailInput) emailInput.value = ref.contact.email || '';
        if (phoneInput) phoneInput.value = ref.contact.phone || '';
        if (relationshipInput) relationshipInput.value = ref.relationship || '';
    });

    // Awards
    const awardsContainer = document.getElementById('awards');
    awardsContainer.innerHTML = ''; // Clear existing awards
    data.additional_sections.awards_honors.forEach(award => {
        addAward(); // Add a new award field
        const lastAward = awardsContainer.lastElementChild;
        const nameInput = lastAward.querySelector('input[type="text"]');
        const issuingOrganizationInput = lastAward.querySelectorAll('input[type="text"]')[1];
        const dateInput = lastAward.querySelector('input[type="date"]');
        const descriptionTextarea = lastAward.querySelector('textarea');

        if (nameInput) nameInput.value = award.name || '';
        if (issuingOrganizationInput) issuingOrganizationInput.value = award.issuing_organization || '';
        if (dateInput) dateInput.value = award.date || '';
        if (descriptionTextarea) descriptionTextarea.value = award.description || '';
    });

    // Volunteering
    const volunteeringContainer = document.getElementById('volunteering');
    volunteeringContainer.innerHTML = ''; // Clear existing volunteering entries
    data.additional_sections.volunteering.forEach(vol => {
        addVolunteering(); // Add a new volunteering field
        const lastVol = volunteeringContainer.lastElementChild;
        const roleInput = lastVol.querySelector('input[type="text"]');
        const organizationInput = lastVol.querySelectorAll('input[type="text"]')[1];
        const startDateInput = lastVol.querySelector('input[type="date"]');
        const endDateInput = lastVol.querySelectorAll('input[type="date"]')[1];
        const descriptionTextarea = lastVol.querySelector('textarea');

        if (roleInput) roleInput.value = vol.role || '';
        if (organizationInput) organizationInput.value = vol.organization || '';
        if (startDateInput) startDateInput.value = vol.start_date || '';
        if (endDateInput) endDateInput.value = vol.end_date || '';
        if (descriptionTextarea) descriptionTextarea.value = vol.description || '';
    });

    // Professional Affiliations
    const affiliationsContainer = document.getElementById('affiliations');
    affiliationsContainer.innerHTML = ''; // Clear existing affiliations
    data.additional_sections.professional_affiliations.forEach(aff => {
        addAffiliation(); // Add a new affiliation field
        const lastAff = affiliationsContainer.lastElementChild;
        const organizationInput = lastAff.querySelector('input[type="text"]');
        const roleInput = lastAff.querySelectorAll('input[type="text"]')[1];
        const startDateInput = lastAff.querySelector('input[type="date"]');
        const endDateInput = lastAff.querySelectorAll('input[type="date"]')[1];

        if (organizationInput) organizationInput.value = aff.organization || '';
        if (roleInput) roleInput.value = aff.role || '';
        if (startDateInput) startDateInput.value = aff.start_date || '';
        if (endDateInput) endDateInput.value = aff.end_date || '';
    });
}

//--------------------------------------
// CV to JSON
//--------------------------------------

const jsonFileInput = document.getElementById('jsonFileInput');
jsonFileInput.addEventListener('change', loadJSON);

// List of codes (ISO 3166-1 alpha-2)
const countryCodes = [
    { code: "VE", name: "Venezuela" },
    { code: "US", name: "United States" },
    { code: "ES", name: "Spain" },
    { code: "MX", name: "Mexico" },
    { code: "CO", name: "Colombia" },
    { code: "AR", name: "Argentina" },
    { code: "BR", name: "Brazil" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" }
    // Agrega más países según sea necesario
];

// Add nacionalities
function addNationality() {
    const container = document.getElementById('nationalities_container');
    const div = document.createElement('div');
    div.className = 'nationality-entry';
    
    // Selector
    const select = document.createElement('select');
    select.className = 'nationality';
    select.required = true;

    // Add option by default
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select Nationality";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);

    // Add country's options
    countryCodes.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.name} (${country.code})`;
        select.appendChild(option);
    });

    // Add selector and remove button
    div.innerHTML = `
        ${select.outerHTML}
        <button type="button" onclick="removeNationality(this)">-</button>
    `;

    container.appendChild(div);
}

function removeNationality(button) {
    button.parentElement.remove();
}

// Add online profiles (social networks)
function addOnlineProfile() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Platform (LinkedIn/GitHub/etc)" required>
        <input type="url" placeholder="URL" required>
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('online_profiles').appendChild(div);
}

// Add education
function addEducation() {
    const div = document.createElement('div');
    div.className = 'education-entry';
    div.innerHTML = `
        <input type="text" placeholder="Title/Certification Name" required>
        <input type="text" placeholder="Institution" required>
        <input type="text" placeholder="Country of Institution" required>
        <select>
            <option value="">Select Education Level</option>
            <option value="high_school">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="other">Other</option>
        </select>
        <input type="text" id="other_education_level" placeholder="Specify Education Level" style="display: none;">
        <div class="date-container">
            <label>Start:</label>
            <input type="date" placeholder="Start Date" required>
        </div>
        <div class="date-container">
            <label>End:</label>
            <input type="date" placeholder="End Date">
        </div>
        <label style="display: flex; justify-content: flex-start;">
            <input type="checkbox" class="completed"> Studies Completed
        </label>
        <textarea placeholder="Projects, achievements, etc. (not mandatory)"></textarea>
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('education_fields').appendChild(div);

    // Mostrar campo "Other" si se selecciona "Other"
    const select = div.querySelector('select');
    const otherInput = div.querySelector('#other_education_level');
    select.addEventListener('change', function () {
        if (this.value === 'other') {
            otherInput.style.display = 'block';
        } else {
            otherInput.style.display = 'none';
        }
    });
}

// Add employment history
function addEmployment() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Position" required>
        <input type="text" placeholder="Organization" required>
        <input type="text" placeholder="Location" required>
        <input type="date" placeholder="Start Date (YYYY-MM-DD)" required>
        <input type="date" placeholder="End Date (YYYY-MM-DD)">
        <input type="checkbox" id="currently_working"> Currently Working
        <select required>
            <option value="" disabled selected>Select Employment Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
            <option value="temporary">Temporary</option>
            <option value="self-employed">Self-employed</option>
            <option value="other">Other</option>
        </select>
        <textarea placeholder="Responsibilities (comma-separated)"></textarea>
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('employment_fields').appendChild(div);
}

// Add technical skills
function addTechnicalSkill() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center;">
            <input type="text" placeholder="Skill Name" required>
            <select class="skill-select" required>
                <option value="" disabled selected>Select Proficiency</option>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <input type="number" placeholder="Years of Experience" required>
            <button type="button" class="remove-button" onclick="this.parentElement.remove()">-</button>
        </div>
    `;
    document.getElementById('technical_skills').appendChild(div);
}

// Add languages
function addLanguage() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 10px;">
            <select class="language-select" required>
                <option value="" disabled selected>Select Language</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="de">Portuguese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="de">Italian</option>
            </select>
            <select class="proficiency-select" required>
                <option value="" disabled selected>Reading Proficiency</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>
            <select class="proficiency-select" required>
                <option value="" disabled selected>Writing Proficiency</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>
            <select class="proficiency-select" required>
                <option value="" disabled selected>Speaking Proficiency</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>
            <button type="button" class="remove-button" onclick="this.parentElement.remove()">-</button>
        </div>
        <div id="language_certifications"></div>
    `;
    document.getElementById('languages').appendChild(div);
}

// Add language certifications
function addLanguageCertification(button) {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Certification Name (TOEFL/DELE/etc)" required>
        <input type="text" placeholder="Score" required>
        <input type="date" placeholder="Date (YYYY-MM-DD)" required>
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    button.parentElement.querySelector('#language_certifications').appendChild(div);
}

// Add certifications
function addCertification() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Certification Name" required>
        <input type="text" placeholder="Issuing Organization" required>
        <input type="date" placeholder="Issue Date (YYYY-MM-DD)" required>
        <input type="date" placeholder="Expiration Date (YYYY-MM-DD)">
        <input type="text" placeholder="Credential ID">
        <input type="url" placeholder="Credential URL">
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('certification_fields').appendChild(div);
}

// Add events
function addEvent() {
    const div = document.createElement('div');
    div.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 10px;">
            <input type="text" placeholder="Event Name" required>
            <select required>
                <option value="" disabled selected>Select Role</option>
                <option value="attendee">Attendee</option>
                <option value="speaker">Speaker</option>
                <option value="organizer">Organizer</option>
                <option value="panelist">Panelist</option>
                <option value="other">Other</option>
            </select>
            <input type="date" placeholder="Date (YYYY-MM-DD)" required>
            <input type="text" placeholder="Location" required>
            <textarea placeholder="Description"></textarea>
            <button type="button" class="remove-button" style="align-self: flex-start; onclick="this.parentElement.remove()">-</button>
        </div>
    `;
    document.getElementById('event_fields').appendChild(div);
}

// Add publications
function addPublication() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Publication Type (Journal Article/Book/etc)" required>
        <input type="text" placeholder="Title" required>
        <input type="text" placeholder="Authors (comma-separated)" required>
        <input type="date" placeholder="Publication Date (YYYY-MM-DD)" required>
        <input type="text" placeholder="Publisher" required>
        <input type="text" placeholder="DOI">
        <input type="url" placeholder="URL">
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('publication_fields').appendChild(div);
}

// Add references
function addReference() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Name" required>
        <input type="text" placeholder="Position" required>
        <input type="text" placeholder="Organization" required>
        <input type="email" placeholder="Email" required>
        <input type="tel" placeholder="Phone Number" required>
        <input type="text" placeholder="Relationship (Supervisor/Colleague/etc)" required>
        <button type="button" onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('reference_fields').appendChild(div);
}

// Add awards/honors
function addAward() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Award Name" required>
        <input type="text" placeholder="Issuing Organization" required>
        <input type="date" placeholder="Date (YYYY-MM-DD)" required>
        <textarea placeholder="Description"></textarea>
        <button type="button" class="remove-button" style="align-self: flex-start; onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('awards').appendChild(div);
}

// Add volunteering
function addVolunteering() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Role" required>
        <input type="text" placeholder="Organization" required>
        <input type="date" placeholder="Start Date (YYYY-MM-DD)" required>
        <input type="date" placeholder="End Date (YYYY-MM-DD)">
        <textarea placeholder="Description"></textarea>
        <button type="button" class="remove-button" style="align-self: flex-start; onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('volunteering').appendChild(div);
}

// Add professional affiliations
function addAffiliation() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" placeholder="Organization" required>
        <input type="text" placeholder="Role (Member/Board Member/etc)" required>
        <input type="date" placeholder="Start Date (YYYY-MM-DD)" required>
        <input type="date" placeholder="End Date (YYYY-MM-DD)">
        <button type="button" class="remove-button" style="align-self: flex-start; onclick="this.parentElement.remove()">-</button>
    `;
    document.getElementById('affiliations').appendChild(div);
}

// Collect all data and generate JSON
async function generateCV() {
    const data = {
        metadata: {
            schema_version: "1.0",
            last_updated: new Date().toISOString().split('T')[0],
            document_language: "en"
        },
        personal_information: {
            names: document.getElementById('names').value,
            surnames: document.getElementById('surnames').value,
            date_of_birth: document.getElementById('date_of_birth').value,
            nationalities: Array.from(document.querySelectorAll('.nationality')).map(input => input.value.trim().toUpperCase()),
            contact: {
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: {
                    street: document.getElementById('street').value,
                    city: document.getElementById('city').value,
                    country: document.getElementById('country').value,
                    postal_code: document.getElementById('postal_code').value
                }
            },
            online_profiles: []
        },
        education: [],
        employment_history: [],
        skills: {
            technical: [],
            languages: [],
            soft_skills: document.getElementById('soft_skills').value.split(',')
        },
        certifications: [],
        events_participation: [],
        publications_research: [],
        references: [],
        additional_sections: {
            awards_honors: [],
            volunteering: [],
            professional_affiliations: []
        }
    };

    // Validar nacionalidades (ISO 3166-1 alpha-2)
    const invalidNationalities = data.personal_information.nationalities.filter(
        nationality => !/^[A-Z]{2}$/.test(nationality)
    );
    if (invalidNationalities.length > 0) {
        alert(`Invalid nationalities: ${invalidNationalities.join(', ')}. Please use ISO 3166-1 alpha-2 codes.`);
        return;
    }

    // Recolectar perfiles en línea
    document.querySelectorAll('#online_profiles div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        data.personal_information.online_profiles.push({
            platform: inputs[0].value,
            url: inputs[1].value
        });
    });

    // Recolectar educación
    document.querySelectorAll('#education_fields .education-entry').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const select = div.querySelector('select');
        const textarea = div.querySelector('textarea');
        const completedCheckbox = div.querySelector('.completed');
        const educationLevel = select.value === 'other' ? div.querySelector('#other_education_level').value : select.value;

        data.education.push({
            title: inputs[0].value,
            institution: inputs[1].value,
            country: inputs[2].value,
            education_level: educationLevel,
            start_date: inputs[3].value,
            end_date: inputs[4].value,
            completed: completedCheckbox.checked,
            description: textarea.value
        });
    });

    // Recolectar historial laboral
    document.querySelectorAll('#employment_fields div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const textarea = div.querySelector('textarea');
        const select = div.querySelector('select');
        const employmentType = select ? select.value : '';
        
        data.employment_history.push({
            position: inputs[0].value,
            organization: inputs[1].value,
            location: inputs[2].value,
            start_date: inputs[3].value,
            end_date: inputs[4].value,
            currently_working: inputs[5].checked,
            employment_type: select.value,
            responsibilities: textarea.value.split(',')
        });
    });

    // Recolectar habilidades técnicas
    document.querySelectorAll('#technical_skills div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const select = div.querySelector('select');
        data.skills.technical.push({
            name: inputs[0].value,
            proficiency: select.value,
            years_experience: parseFloat(inputs[1].value)
        });
    });

    // Recolectar idiomas
    document.querySelectorAll('#languages div').forEach(div => {
        const selects = div.querySelectorAll('select');
        const certifications = [];
    
        // Verificar si hay suficientes elementos <select>
        if (selects.length >= 4) {
            // Recolectar certificaciones de idiomas
            const certContainer = div.querySelector('#language_certifications');
            if (certContainer) {
                certContainer.querySelectorAll('div').forEach(certDiv => {
                    const certInputs = certDiv.querySelectorAll('input');
                    if (certInputs.length >= 3) {
                        certifications.push({
                            name: certInputs[0].value,
                            score: certInputs[1].value,
                            date: certInputs[2].value
                        });
                    }
                });
            }
    
            // Agregar el idioma al array de habilidades
            data.skills.languages.push({
                language: selects[0].value,
                proficiency: {
                    reading: selects[1].value,
                    writing: selects[2].value,
                    speaking: selects[3].value
                },
                certifications: certifications
            });
        }
    });

    // Recolectar certificaciones
    document.querySelectorAll('#certification_fields div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        data.certifications.push({
            name: inputs[0].value,
            issuing_organization: inputs[1].value,
            issue_date: inputs[2].value,
            expiration_date: inputs[3].value,
            credential_id: inputs[4].value,
            credential_url: inputs[5].value
        });
    });

    // Recolectar eventos
    document.querySelectorAll('#event_fields div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const textarea = div.querySelector('textarea');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 4 && textarea) {
            data.events_participation.push({
                name: inputs[0].value,
                role: inputs[1].value,
                date: inputs[2].value,
                location: inputs[3].value,
                description: textarea.value
            });
        }
    });
    
    // Recolectar publicaciones
    document.querySelectorAll('#publication_fields div').forEach(div => {
        const inputs = div.querySelectorAll('input');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 7) {
            data.publications_research.push({
                type: inputs[0].value,
                title: inputs[1].value,
                authors: inputs[2].value.split(','),
                publication_date: inputs[3].value,
                publisher: inputs[4].value,
                doi: inputs[5].value,
                url: inputs[6].value
            });
        }
    });
    
    // Recolectar referencias
    document.querySelectorAll('#reference_fields div').forEach(div => {
        const inputs = div.querySelectorAll('input');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 6) {
            data.references.push({
                name: inputs[0].value,
                position: inputs[1].value,
                organization: inputs[2].value,
                contact: {
                    email: inputs[3].value,
                    phone: inputs[4].value
                },
                relationship: inputs[5].value
            });
        }
    });
    
    // Recolectar premios/honores
    document.querySelectorAll('#awards div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const textarea = div.querySelector('textarea');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 3 && textarea) {
            data.additional_sections.awards_honors.push({
                name: inputs[0].value,
                issuing_organization: inputs[1].value,
                date: inputs[2].value,
                description: textarea.value
            });
        }
    });
    
    // Recolectar voluntariado
    document.querySelectorAll('#volunteering div').forEach(div => {
        const inputs = div.querySelectorAll('input');
        const textarea = div.querySelector('textarea');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 4 && textarea) {
            data.additional_sections.volunteering.push({
                role: inputs[0].value,
                organization: inputs[1].value,
                start_date: inputs[2].value,
                end_date: inputs[3].value,
                description: textarea.value
            });
        }
    });
    
    // Recolectar afiliaciones profesionales
    document.querySelectorAll('#affiliations div').forEach(div => {
        const inputs = div.querySelectorAll('input');
    
        // Verificar que los elementos existan antes de acceder a sus valores
        if (inputs.length >= 4) {
            data.additional_sections.professional_affiliations.push({
                organization: inputs[0].value,
                role: inputs[1].value,
                start_date: inputs[2].value,
                end_date: inputs[3].value
            });
        }
    });
    // Mostrar el JSON en la salida
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);

    // Habilitar el enlace de descarga
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById('downloadLink');
    const downloadButton = document.getElementById('downloadButton');

    // Asignar la URL y habilitar el botón de descarga
    downloadLink.href = url;
    downloadLink.download = 'cv.json';
    downloadButton.disabled = false; // Habilitar el botón
    downloadButton.style.opacity = 1; // Quitar la opacidad

    // Agregar evento de clic para descargar el archivo
    downloadLink.onclick = () => {
        // Liberar la URL del objeto después de la descarga
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };
}
