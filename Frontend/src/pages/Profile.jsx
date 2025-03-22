import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonCircle } from 'react-bootstrap-icons';
import { FiPaperclip } from "react-icons/fi";
import { Link , useLocation , useNavigate  }from "react-router-dom";

const predefinedSkills = [
  "JavaScript", "React", "Node.js", "Python", "Java", "C#", "C++", "Ruby", "PHP", 
  "HTML", "CSS", "TypeScript", "Angular", "Vue.js", "Swift", "Kotlin", "Go", 
  "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Django", "Flask", 
  "Spring Boot", "Express.js"
];

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Guest";
  // Handlers for Experiences
  const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem("experiences");
    return savedExperiences ? JSON.parse(savedExperiences) : [];
  });
  const [currentExperience, setCurrentExperience] = useState({
    company: "",
    role: "",
    duration: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [experienceEditIndex, setExperienceEditIndex] = useState(null);

  // Save experiences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSaveExperience = () => {
    if (experienceEditIndex !== null) {
      // Update existing experience
      const updatedExperiences = [...experiences];
      updatedExperiences[experienceEditIndex] = currentExperience;
      setExperiences(updatedExperiences);
    } else {
      // Add new experience
      setExperiences((prev) => [...prev, currentExperience]);
    }
    setCurrentExperience({ company: "", role: "", duration: "", description: "" });
    setExperienceEditIndex(null);
    setIsEditing(false);
  };

  const handleEditExperience = (index) => {
    setCurrentExperience(experiences[index]);
    setExperienceEditIndex(index);
    setIsEditing(true);
  };

  const handleDeleteExperience = (index) => {
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };
  // Handlers for Education
  const [educations, setEducations] = useState(() => {
    const savedEducations = localStorage.getItem("educations");
    return savedEducations ? JSON.parse(savedEducations) : [];
  });

  const [currentEducation, setCurrentEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    duration: "",
    description: "",
  });
  const [educationEditIndex, setEducationEditIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Save educations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("educations", JSON.stringify(educations));
  }, [educations]);

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEducation = () => {
    if (educationEditIndex !== null) {
      setEducations((prev) =>
        prev.map((edu, index) =>
          index === educationEditIndex ? currentEducation : edu
        )
      );
      setEducationEditIndex(null);
    } else {
      setEducations((prev) => [...prev, currentEducation]);
    }

    setCurrentEducation({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      duration: "",
      description: "",
    });
    setIsFormVisible(false); // Hide form after saving
  };

  const handleEditEducation = (index) => {
    setEducationEditIndex(index);
    setCurrentEducation(educations[index]);
    setIsFormVisible(true); // Show form when editing
  };

  const handleDeleteEducation = (index) =>
    setEducations((prev) => prev.filter((_, i) => i !== index));

  // Handlers for Skills
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("skills");
    return savedSkills ? JSON.parse(savedSkills) : [];
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Save skills to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const handleToggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };
  return (
    <div className="container mt-5">
      {/* Profile Section */}
      <div className="container mt-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-8">
          <h1 className="profile-name">{username}</h1>
        </div>
        <div className="col-md-4 text-center">
          <div className="profile-pic-container">
            <PersonCircle size={100} />
          </div>
        </div>
      </div>
    </div>
   
      {/* Manage Experiences */}
      <div>
      {/* Manage Experiences */}
      <h2 className="d-flex align-items-center">
        Experiences
        <button
          className="btn btn-sm btn-light ms-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          Add
        </button>
      </h2>

      {isEditing && (
        <div className="card p-3 mb-4 bg-dark text-light">
          <input
            type="text"
            name="company"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Company Name"
            value={currentExperience.company}
            onChange={handleExperienceChange}
          />
          <input
            type="text"
            name="role"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Role/Title"
            value={currentExperience.role}
            onChange={handleExperienceChange}
          />
          <input
            type="text"
            name="duration"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
            value={currentExperience.duration}
            onChange={handleExperienceChange}
          />
          <textarea
            name="description"
            className="form-control mb-2 bg-secondary text-light"
            rows="3"
            placeholder="Description"
            value={currentExperience.description}
            onChange={handleExperienceChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleSaveExperience}
            disabled={
              !currentExperience.company.trim() ||
              !currentExperience.role.trim() ||
              !currentExperience.duration.trim()
            }
          >
            {experienceEditIndex !== null ? "Update Experience" : "Add Experience"}
          </button>
        </div>
      )}

      {/* Display Experiences */}
      <div className="experience-list">
        {experiences.length > 0 ? (
          <ul className="list-group bg-dark text-white">
            {experiences.map((exp, index) => (
              <li
                key={index}
                className="list-group-item bg-dark text-white border-secondary"
              >
                <h5>{exp.role}</h5>
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Duration:</strong> {exp.duration}
                </p>
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
                <button
                  className="btn btn-secondary btn-sm ms-3"
                  onClick={() => handleEditExperience(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteExperience(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-primary">No experiences added yet.</p>
        )}
      </div>
    </div>

    <div>
      {/* Manage Education */}
      <h2 className="d-flex align-items-center">
        Education
        <button
          className="btn btn-light btn-sm ms-2"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? "Close" : "Add Education"}
        </button>
      </h2>

      {isFormVisible && (
        <div className="card p-3 mb-4 bg-dark text-light">
          <input
            type="text"
            name="institution"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Institution Name"
            value={currentEducation.institution}
            onChange={handleEducationChange}
          />
          <input
            type="text"
            name="degree"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Degree"
            value={currentEducation.degree}
            onChange={handleEducationChange}
          />
          <input
            type="text"
            name="fieldOfStudy"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Field of Study"
            value={currentEducation.fieldOfStudy}
            onChange={handleEducationChange}
          />
          <input
            type="text"
            name="duration"
            className="form-control mb-2 bg-secondary text-light"
            placeholder="Duration (e.g., 2015 - 2019)"
            value={currentEducation.duration}
            onChange={handleEducationChange}
          />
          <textarea
            name="description"
            className="form-control mb-2 bg-secondary text-light"
            rows="3"
            placeholder="Description"
            value={currentEducation.description}
            onChange={handleEducationChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleSaveEducation}
            disabled={
              !currentEducation.institution.trim() ||
              !currentEducation.degree.trim() ||
              !currentEducation.duration.trim()
            }
          >
            {educationEditIndex !== null ? "Update Education" : "Add Education"}
          </button>
        </div>
      )}

      {/* Display Educations */}
      <div className="education-list">
        {educations.length > 0 ? (
          <ul className="list-group bg-dark text-white">
            {educations.map((edu, index) => (
              <li
                key={index}
                className="list-group-item bg-dark text-white border-secondary"
              >
                <h5>{edu.degree}</h5>
                <p>
                  <strong>Institution:</strong> {edu.institution}
                </p>
                <p>
                  <strong>Field of Study:</strong> {edu.fieldOfStudy}
                </p>
                <p>
                  <strong>Duration:</strong> {edu.duration}
                </p>
                <p>
                  <strong>Description:</strong> {edu.description}
                </p>
                <button
                  className="btn btn-secondary btn-sm ms-3"
                  onClick={() => handleEditEducation(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeleteEducation(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-primary">No education details added yet.</p>
        )}
      </div>
    </div>
    <div className="skills-section">
      {/* Skills Section */}
      <h2>Skills</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
      >
        {isDropdownVisible ? "Close Skill Selector" : "Add Skills"}
      </button>

      {isDropdownVisible && (
        <div className="dropdown bg-dark p-3 mb-3 text-light rounded">
          <h5>Select Skills</h5>
          <ul className="list-group">
            {predefinedSkills.map((skill, index) => (
              <li
                key={index}
                className="list-group-item bg-dark text-light border-secondary"
              >
                <input
                  type="checkbox"
                  id={`skill-${index}`}
                  checked={skills.includes(skill)}
                  onChange={() => handleToggleSkill(skill)}
                />
                <label className="ms-2" htmlFor={`skill-${index}`}>
                  {skill}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display Selected Skills */}
      <ul className="list-group bg-dark text-white">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary"
          >
            {skill}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleToggleSkill(skill)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
      <div className="createjob my-3">
        <div>
          <h4>Create employment</h4>
          <div className="btn btn-primary mx-2"><Link className='text-white text-decoration-none' to="/add-job">Create Job Listing</Link></div>
        </div>
        <hr />
        <div>
          <h4>Share post</h4>
          <div className="btn btn-primary mx-2"><Link className='text-white text-decoration-none' to="/create-post">Create Post</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
