// JobDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="text-light">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card bg-light text-dark p-4">
        <h2>{job.jobName}</h2>
        <p>Company: {job.companyName}</p>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Description: {job.description}</p>
        <p>Skills: {job.skills}</p>
        <p>Perks: {job.perks}</p>
        <div className="btn btn-warning">Apply Now</div>
      </div>
    </div>
  );
};

export default JobDetail;
