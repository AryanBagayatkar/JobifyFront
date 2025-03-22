import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: "",
    pdf: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/posts/create", formData);
      alert(response.data.message); // Show success message
      setFormData({
        title: "",
        description: "",
        photo: "",
        pdf: "",
      });
    } catch (error) {
      alert("Error creating post: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Photo (URL)</label>
          <input
            type="text"
            className="form-control"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />
        </div>
       
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
