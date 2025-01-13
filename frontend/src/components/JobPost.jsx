import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");
  const nichesArray = [
    "Software Development",
    "Web Development",
    "IT and Networking",
    "Cybersecurity",
    "Data Analysis",
    "Artificial Intelligence",
    "Cloud Services",
    "DevOps and Automation",
    "Mobile App Development",
    "Blockchain Technology",
    "Database Management",
    "Network Administration",
    "Design and Creative Services",
    "Game Development",
    "Internet of Things (IoT)",
    "Big Data Solutions",
    "Machine Learning",
    "Project Management",
    "Technical Support",
    "Systems Administration",
    "Consulting Services",
    "Accounting and Finance",
    "Business Strategy and Planning",
    "Human Resources",
    "Marketing and Advertising",
    "Writing and Editing",
    "Visual Arts and Design",
    "Video Production",
    "Photography and Videography",
    "E-commerce and Retail",
    "Sales and Client Relations",
    "Customer Support",
    "Legal and Compliance",
    "Public Relations and Communications",
    "Logistics and Supply Chain",
    "Real Estate Services",
    "Health and Wellness",
    "Nutrition and Dietetics",
    "Education and Training",
    "Translation and Language Services",
    "Event Management",
    "Interior and Exterior Design",
    "Architecture and Planning",
    "Engineering and Construction",
    "Research and Development",
    "Social Media Management",
    "Virtual Assistance",
    "Administrative Services",
    "Content Creation",
    "Community Management",
    "Sustainability and Environmental Services",
    "Healthcare and Medical Services",
    "Technical Writing",
    "Travel and Tourism",
    "Music and Audio Production",
  ];
  

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Hyderabad",
    "Quetta",
    "Peshawar",
    "Sialkot",
    "Gujranwala",
    "Sargodha",
    "Bahawalpur",
    "Sukkur",
    "Mardan",
    "Mingora",
    "Sheikhupura",
    "Mandi Bahauddin",
    "Larkana",
    "Nawabshah",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="account_components">
      <h3>Post A Job</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
      </div>
      <div>
        <label>Job Type</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
      <div>
        <label>Location (City)</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Job Type</option>
          {cities.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div>
        <label>Company/Job Introduction</label>
        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Company / Job Introduction"
          rows={7}
        />
      </div>
      <div>
        <label>Responsibilities</label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder="Job Responsibilities"
          rows={7}
        />
      </div>
      <div>
        <label>Qualifications</label>
        <textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder="Required Qualifications For Job"
          rows={7}
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>What We Offer</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <textarea
          value={offers}
          onChange={(e) => setOffers(e.target.value)}
          placeholder="What are we offering in return!"
          rows={7}
        />
      </div>
      <div>
        <label>Job Niche</label>
        <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
          <option value="">Select Job Niche</option>
          {nichesArray.map((element) => {
            return <option value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Hiring Multiple Candidates?</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Name</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteTitle}
          onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
          placeholder="Peronsal Website Name/Title"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Link (URL)</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={personalWebsiteUrl}
          onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
          placeholder="Peronsal Website Link (URL)"
        />
      </div>
      <div>
        <button
          style={{ margin: "0 auto" }}
          className="btn"
          onClick={handlePostJob}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
};

export default JobPost;
