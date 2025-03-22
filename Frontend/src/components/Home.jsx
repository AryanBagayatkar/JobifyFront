import React from "react";
import { Link } from "react-router-dom";
import homedisk from "../../public/vecteezy_isometric-illustration-concept-of-a-couple-analyzing_9160218.svg"

const Home = () => {
  return (
    <>
    <div className="sect1">
      <div className="part">
        <h1>Welcome To Jobify</h1>
        <button className="bho1"><Link to="/login" className="partl">login</Link></button>
        <p>New to Jobify</p>
        <button className="bho2"><Link to="/register" className="partl text-dark">Register</Link></button>
      </div>
      <div className="part">
        <img src={homedisk} alt="An image" className="himg"/>
      </div>
    </div>
    <div className="sect2">
      <div className="part">
      <h1>Get Hire</h1>
      <button className="bho1"><Link to="/job" className="partl">Find Jobs</Link></button>
      </div>
      <div className="part">
      <h1>Explore Community</h1>
      <button className="bho2"><Link to="/posts" className="partl text-dark">Share Achivements</Link></button>
      </div>
    </div>
    </>
  );
};

export default Home;
