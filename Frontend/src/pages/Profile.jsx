import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const predefinedSkills = [
  "JavaScript", "React", "Node.js", "Python", "Java", "C#", "C++", "Ruby", "PHP",
  "HTML", "CSS", "TypeScript", "Angular", "Vue.js", "Swift", "Kotlin", "Go",
  "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Django", "Flask",
  "Spring Boot", "Express.js"
];

const Profile = () => {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const userId = location.state?.userId; // Ensure userId is passed after login

  const [profile, setProfile] = useState({
    experiences: [],
    educations: [],
    skills: [],
  });

  const [currentExperience, setCurrentExperience] = useState({ company: "", role: "", duration: "", description: "" });
  const [experienceEditIndex, setExperienceEditIndex] = useState(null);

  const [currentEducation, setCurrentEducation] = useState({ institution: "", degree: "", fieldOfStudy: "", duration: "", description: "" });
  const [educationEditIndex, setEducationEditIndex] = useState(null);

  const [skills, setSkills] = useState(profile.skills || []);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch profile data using the userId
  useEffect(() => {
    if (userId) {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/profile/${userId}`);
          setProfile(res.data);
        } catch (err) {
          console.log("No profile found yet. Will create one upon save.");
        }
      };
      fetchProfile();
    }
  }, [userId]);

  // Save Profile and update the backend
  const saveProfile = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/profile", {
        ...profile,
        userId,  // Send the userId along with the profile data
      });
      setProfile(res.data.profile); // Save the profile response back to state
      alert('Profile saved successfully!');
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  };

  // Handle Experience Input Changes
  const handleExperienceChange = (e) => {
    setCurrentExperience({ ...currentExperience, [e.target.name]: e.target.value });
  };

  // Handle Education Input Changes
  const handleEducationChange = (e) => {
    setCurrentEducation({ ...currentEducation, [e.target.name]: e.target.value });
  };

  // Handle Add Experience
  const handleAddExperience = () => {
    const updatedExperiences = [...profile.experiences, currentExperience];
    setProfile({ ...profile, experiences: updatedExperiences });
    setCurrentExperience({ company: "", role: "", duration: "", description: "" }); // Reset form fields
  };

  // Handle Add Education
  const handleAddEducation = () => {
    const updatedEducations = [...profile.educations, currentEducation];
    setProfile({ ...profile, educations: updatedEducations });
    setCurrentEducation({ institution: "", degree: "", fieldOfStudy: "", duration: "", description: "" }); // Reset form fields
  };

  // Handle Skill toggle
  const handleToggleSkill = (skill) => {
    const updatedSkills = skills.includes(skill) ? skills.filter((s) => s !== skill) : [...skills, skill];
    setSkills(updatedSkills);
  };

  return (
    <div className="container mt-5">
      {/* Header */}
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

      {/* Experiences */}
      <h2>Experiences</h2>
      <button className="btn btn-sm btn-light ms-2" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Close Form" : "Add Experience"}
      </button>
      {isFormVisible && (
        <div className="card p-3 mb-4 bg-dark text-light">
          <input name="company" className="form-control mb-2 bg-secondary text-light" placeholder="Company" value={currentExperience.company} onChange={handleExperienceChange} />
          <input name="role" className="form-control mb-2 bg-secondary text-light" placeholder="Role" value={currentExperience.role} onChange={handleExperienceChange} />
          <input name="duration" className="form-control mb-2 bg-secondary text-light" placeholder="Duration" value={currentExperience.duration} onChange={handleExperienceChange} />
          <textarea name="description" className="form-control mb-2 bg-secondary text-light" placeholder="Description" rows="3" value={currentExperience.description} onChange={handleExperienceChange} />
          <button className="btn btn-primary mt-2" onClick={handleAddExperience}>
            Add Experience
          </button>
        </div>
      )}
      <div>
        {profile.experiences.length > 0 ? (
          profile.experiences.map((exp, i) => (
            <div key={i} className="card p-3 mb-3 bg-dark text-white">
              <h5>{exp.role}</h5>
              <p><strong>Company:</strong> {exp.company}</p>
              <p><strong>Duration:</strong> {exp.duration}</p>
              <p><strong>Description:</strong> {exp.description}</p>
            </div>
          ))
        ) : (
          <p>No experiences added yet.</p>
        )}
      </div>

      {/* Education */}
      <h2 className="mt-5">Education</h2>
      <button className="btn btn-light btn-sm ms-2" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? "Close Form" : "Add Education"}
      </button>
      {isFormVisible && (
        <div className="card p-3 mb-4 bg-dark text-light">
          <input name="institution" className="form-control mb-2 bg-secondary text-light" placeholder="Institution" value={currentEducation.institution} onChange={handleEducationChange} />
          <input name="degree" className="form-control mb-2 bg-secondary text-light" placeholder="Degree" value={currentEducation.degree} onChange={handleEducationChange} />
          <input name="fieldOfStudy" className="form-control mb-2 bg-secondary text-light" placeholder="Field of Study" value={currentEducation.fieldOfStudy} onChange={handleEducationChange} />
          <input name="duration" className="form-control mb-2 bg-secondary text-light" placeholder="Duration" value={currentEducation.duration} onChange={handleEducationChange} />
          <textarea name="description" className="form-control mb-2 bg-secondary text-light" placeholder="Description" rows="3" value={currentEducation.description} onChange={handleEducationChange} />
          <button className="btn btn-primary mt-2" onClick={handleAddEducation}>
            Add Education
          </button>
        </div>
      )}
      <div>
        {profile.educations.length > 0 ? (
          profile.educations.map((edu, i) => (
            <div key={i} className="card p-3 mb-3 bg-dark text-white">
              <h5>{edu.degree}</h5>
              <p><strong>Institution:</strong> {edu.institution}</p>
              <p><strong>Field of Study:</strong> {edu.fieldOfStudy}</p>
              <p><strong>Duration:</strong> {edu.duration}</p>
            </div>
          ))
        ) : (
          <p>No education added yet.</p>
        )}
      </div>

      {/* Skills */}
      <h2 className="mt-5">Skills</h2>
      <button className="btn btn-primary mb-3" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
        {isDropdownVisible ? "Close" : "Add Skills"}
      </button>
      {isDropdownVisible && (
        <div className="dropdown bg-dark p-3 mb-3 text-light rounded">
          <h5>Select Skills</h5>
          <ul className="list-group">
            {predefinedSkills.map((skill, index) => (
              <li key={index} className="list-group-item bg-dark text-light border-secondary">
                <input type="checkbox" id={`skill-${index}`} checked={skills.includes(skill)} onChange={() => handleToggleSkill(skill)} />
                <label className="ms-2" htmlFor={`skill-${index}`}>{skill}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul className="list-group bg-dark text-white">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white border-secondary">
              {skill}
              <button className="btn btn-danger btn-sm" onClick={() => handleToggleSkill(skill)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No skills added yet</p>
        )}
      </ul>

      {/* Save Button */}
      <button className="btn btn-success mt-4" onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  );
};

export default Profile;
