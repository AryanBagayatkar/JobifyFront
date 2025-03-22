import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch job data from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = jobs.filter(
      (job) =>
        job.jobName.toLowerCase().includes(query) ||
        job.companyName.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by job name, company, or location..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Job Cards */}
      <div className="d-flex flex-column align-items-stretch">
  {filteredJobs.length > 0 ? (
    filteredJobs.map((job) => (
      <div className="mb-4" key={job._id}>
        <div className="card text-dark bg-light shadow-sm">
          <div className="card-body d-flex justify-content-between">
          <div>
            <h5 className="card-title">{job.jobName}</h5>
            <p className="card-text">Company: {job.companyName}</p>
            <p className="card-text">Salary: {job.salary}</p>
            </div>
            <div>
            <Link to={`/job/${job._id}`} className="btn btn-warning">
              Details
            </Link>
            </div>
          </div>
        </div>
      </div>
          ))
        ) : (
          <p>No jobs found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
