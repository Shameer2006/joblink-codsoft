import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context for global state like user and jobs
const AppContext = createContext();

// Mock Data (replace with API calls in a real application)
const initialJobs = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    description: 'We are looking for a highly skilled Senior Frontend Developer to join our dynamic team. You will be responsible for leading the development of our user-facing applications using React and TypeScript.',
    requirements: ['5+ years React experience', 'JavaScript, TypeScript, HTML, CSS', 'State management (Redux/Zustand)', 'API integration', 'Unit testing'],
    salary: '$120,000 - $150,000',
    postedDate: '2024-06-15',
    employerId: 'employer1'
  },
  {
    id: 'job2',
    title: 'Backend Engineer (Node.js)',
    company: 'DataCorp LLC',
    location: 'New York, NY',
    description: 'Join our backend team to build scalable and robust APIs using Node.js and Express. Experience with MongoDB or PostgreSQL is a plus.',
    requirements: ['3+ years Node.js experience', 'Express.js', 'RESTful API design', 'Database knowledge (SQL/NoSQL)', 'Version control (Git)'],
    salary: '$100,000 - $130,000',
    postedDate: '2024-06-18',
    employerId: 'employer2'
  },
  {
    id: 'job3',
    title: 'UI/UX Designer',
    company: 'Creative Minds Agency',
    location: 'San Francisco, CA',
    description: 'We need a talented UI/UX Designer to create intuitive and aesthetically pleasing user interfaces for our web and mobile applications.',
    requirements: ['Portfolio showcasing design projects', 'Proficiency in Figma/Sketch/Adobe XD', 'User research and wireframing', 'Prototyping skills'],
    salary: '$90,000 - $110,000',
    postedDate: '2024-06-20',
    employerId: 'employer1'
  },
  {
    id: 'job4',
    title: 'DevOps Engineer',
    company: 'Cloud Innovators',
    location: 'Remote',
    description: 'Help us build and maintain our infrastructure, CI/CD pipelines, and cloud deployments using AWS, Docker, and Kubernetes.',
    requirements: ['Experience with AWS/Azure/GCP', 'Docker, Kubernetes', 'CI/CD tools (Jenkins, GitLab CI)', 'Scripting (Python/Bash)'],
    salary: '$115,000 - $140,000',
    postedDate: '2024-06-22',
    employerId: 'employer2'
  }
];

// Dummy user data for authentication simulation
const mockUsers = {
  'candidate@example.com': { password: 'password', role: 'candidate', name: 'Jane Doe', appliedJobs: [] },
  'employer@example.com': { password: 'password', role: 'employer', name: 'Acme Corp', postedJobs: [] },
};

// Utility function to generate unique IDs
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

// Notification component
const Notification = ({ message, type, onClose }) => {
  if (!message) return null;
  const bgColor = type === 'success' ? 'green' : 'red';
  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', backgroundColor: bgColor, color: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ marginLeft: '1rem', fontWeight: 'bold', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>&times;</button>
    </div>
  );
};

// Header Component
const Header = () => {
  const { currentPage, setCurrentPage, isLoggedIn, userRole, logout } = useContext(AppContext);

  return (
    <header style={{ background: 'linear-gradient(to right, #2563EB, #4F46E5)', color: 'white', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '0 0 0.5rem 0.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', transition: 'color 0.3s' }}>
            JobLink
          </button>
        </h1>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontSize: '1.125rem' }}>
          <button onClick={() => setCurrentPage('job-listings')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: currentPage === 'job-listings' ? '600' : 'normal', transition: 'color 0.3s' }}>
            Job Listings
          </button>
          {isLoggedIn ? (
            <>
              {userRole === 'employer' && (
                <button onClick={() => setCurrentPage('employer-dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: currentPage === 'employer-dashboard' ? '600' : 'normal', transition: 'color 0.3s' }}>
                  Employer Dashboard
                </button>
              )}
              {userRole === 'candidate' && (
                <button onClick={() => setCurrentPage('candidate-dashboard')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: currentPage === 'candidate-dashboard' ? '600' : 'normal', transition: 'color 0.3s' }}>
                  Candidate Dashboard
                </button>
              )}
              <button onClick={logout} style={{ background: '#EF4444', border: 'none', color: 'white', padding: '0.25rem 1rem', borderRadius: '9999px', cursor: 'pointer', transition: 'background 0.3s' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setCurrentPage('login')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: currentPage === 'login' ? '600' : 'normal', transition: 'color 0.3s' }}>
                Login
              </button>
              <button onClick={() => setCurrentPage('register')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontWeight: currentPage === 'register' ? '600' : 'normal', transition: 'color 0.3s' }}>
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => (
  <footer style={{ background: '#1F2937', color: 'white', padding: '1.5rem', marginTop: '2.5rem', borderRadius: '0.5rem 0.5rem 0 0', boxShadow: '0 -2px 4px rgba(0,0,0,0.1)' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '0.875rem' }}>
      <p>&copy; {new Date().getFullYear()} JobLink. All rights reserved.</p>
      <p>Designed with ❤️ for job seekers and employers.</p>
    </div>
  </footer>
);

// Home Page Component
const HomePage = () => {
  const { jobs, setCurrentPage, setSelectedJobId } = useContext(AppContext);
  const featuredJobs = jobs.slice(0, 3); // Display top 3 as featured

  const handleViewJob = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-detail');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: '2rem', lineHeight: '1.25' }}>
        Your Dream Job Awaits!
      </h2>
      <p style={{ fontSize: '1.25rem', textAlign: 'center', color: '#4B5563', marginBottom: '3rem', maxWidth: '42rem', margin: '0 auto 3rem auto' }}>
        Discover exciting career opportunities from top companies and apply with ease.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1.5rem', borderBottom: '2px solid #E5E7EB', paddingBottom: '0.5rem' }}>Featured Job Listings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {featuredJobs.map(job => (
            <div
              key={job.id}
              className="job-card-animation" // Class for hover animation
              style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', transition: 'all 0.3s ease-in-out', transform: 'translateY(0)' }}
            >
              <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1D4ED8', marginBottom: '0.5rem' }}>{job.title}</h4>
              <p style={{ color: '#374151', marginBottom: '0.25rem' }}><strong>Company:</strong> {job.company}</p>
              <p style={{ color: '#4B5563', marginBottom: '0.75rem' }}><strong>Location:</strong> {job.location}</p>
              <button
                onClick={() => handleViewJob(job.id)}
                className="button-hover-effect" // Class for button hover
                style={{ width: '100%', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => setCurrentPage('job-listings')}
            className="button-hover-effect" // Class for button hover
            style={{ display: 'inline-block', backgroundColor: '#4F46E5', color: 'white', fontWeight: 'bold', padding: '0.75rem 2rem', borderRadius: '9999px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
          >
            Browse All Jobs
          </button>
        </div>
      </section>

      <section style={{ textAlign: 'center', backgroundColor: '#EFF6FF', padding: '2rem', borderRadius: '0.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>Ready to find your next adventure?</h3>
        <p style={{ color: '#374151', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Whether you're an employer looking for talent or a candidate seeking a new opportunity, JobLink is here to help.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={() => setCurrentPage('register')}
            className="button-hover-effect" // Class for button hover
            style={{ backgroundColor: '#22C55E', color: 'white', fontWeight: 'bold', padding: '0.5rem 1.5rem', borderRadius: '9999px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
          >
            Join as a Candidate
          </button>
          <button
            onClick={() => setCurrentPage('register')}
            className="button-hover-effect" // Class for button hover
            style={{ backgroundColor: '#9333EA', color: 'white', fontWeight: 'bold', padding: '0.5rem 1.5rem', borderRadius: '9999px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
          >
            Join as an Employer
          </button>
        </div>
      </section>
    </div>
  );
};

// Job Listings Page Component
const JobListingsPage = () => {
  const { jobs, setCurrentPage, setSelectedJobId } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const result = jobs.filter(job =>
      job.title.toLowerCase().includes(lowercasedSearchTerm) ||
      job.company.toLowerCase().includes(lowercasedSearchTerm) ||
      job.location.toLowerCase().includes(lowercasedSearchTerm) ||
      job.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredJobs(result);
  }, [searchTerm, jobs]);

  const handleViewJob = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-detail');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>All Job Listings</h2>
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#F3F4F6', borderRadius: '0.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
        <input
          type="text"
          placeholder="Search jobs by title, company, or location..."
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '0.5rem', outline: 'none' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '1.25rem', padding: '2.5rem 0' }}>No jobs found matching your search criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {filteredJobs.map(job => (
            <div
              key={job.id}
              className="job-card-animation" // Class for hover animation
              style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', transition: 'all 0.3s ease-in-out', transform: 'translateY(0)' }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1D4ED8', marginBottom: '0.5rem' }}>{job.title}</h3>
              <p style={{ color: '#374151', marginBottom: '0.25rem' }}><strong>Company:</strong> {job.company}</p>
              <p style={{ color: '#4B5563', marginBottom: '0.75rem' }}><strong>Location:</strong> {job.location}</p>
              <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>Posted: {job.postedDate}</p>
              <button
                onClick={() => handleViewJob(job.id)}
                className="button-hover-effect" // Class for button hover
                style={{ width: '100%', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Job Detail Page Component
const JobDetailPage = () => {
  const { jobs, selectedJobId, setCurrentPage, isLoggedIn, userRole, showNotification } = useContext(AppContext);
  const job = jobs.find(j => j.id === selectedJobId);

  if (!job) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem', textAlign: 'center', color: '#DC2626' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Job not found.</p>
        <button onClick={() => setCurrentPage('job-listings')} style={{ color: '#2563EB', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Go back to job listings
        </button>
      </div>
    );
  }

  const handleApplyNow = () => {
    if (!isLoggedIn) {
      showNotification('Please log in to apply for jobs.', 'error');
      setCurrentPage('login');
      return;
    }
    if (userRole === 'employer') {
      showNotification('Employers cannot apply for jobs.', 'error');
      return;
    }
    setCurrentPage('job-application');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <button
        onClick={() => setCurrentPage('job-listings')}
        className="button-hover-effect" // Class for button hover
        style={{ color: '#2563EB', textDecoration: 'underline', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.25rem' }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Listings
      </button>

      <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>{job.title}</h2>
      <p style={{ fontSize: '1.5rem', color: '#1D4ED8', marginBottom: '0.5rem' }}>{job.company}</p>
      <p style={{ fontSize: '1.25rem', color: '#4B5563', marginBottom: '1rem' }}>{job.location}</p>
      <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1.5rem' }}><strong>Salary:</strong> {job.salary}</p>
      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem' }}>Posted: {job.postedDate}</p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.75rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Job Description</h3>
        <p style={{ color: '#374151', lineHeight: '1.6' }}>{job.description}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '0.75rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Requirements</h3>
        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#374151', lineHeight: '1.5', paddingLeft: '1rem' }}>
          {job.requirements.map((req, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>{req}</li>
          ))}
        </ul>
      </section>

      <button
        onClick={handleApplyNow}
        className="button-hover-effect" // Class for button hover
        style={{ width: '100%', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
      >
        Apply Now
      </button>
    </div>
  );
};

// Job Application Form Component
const JobApplicationForm = () => {
  const { selectedJobId, jobs, setCurrentPage, addAppliedJob, showNotification } = useContext(AppContext);
  const job = jobs.find(j => j.id === selectedJobId);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeText, setResumeText] = useState(''); // Simulate resume upload with text area
  const [coverLetter, setCoverLetter] = useState('');

  if (!job) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem', textAlign: 'center', color: '#DC2626' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Job not found for application.</p>
        <button onClick={() => setCurrentPage('job-listings')} style={{ color: '#2563EB', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Go back to job listings
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log('Application submitted:', { fullName, email, phone, resumeText, coverLetter, jobId: job.id });
    addAppliedJob(job); // Add to mock applied jobs
    showNotification(`Successfully applied for ${job.title}!`, 'success');
    setCurrentPage('candidate-dashboard'); // Redirect to candidate dashboard
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>Apply for: {job.title}</h2>
      <p style={{ textAlign: 'center', color: '#4B5563', marginBottom: '2rem' }}>
        Please fill out the form below to submit your application.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="fullName" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            required
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Phone (Optional):</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
          />
        </div>
        <div>
          <label htmlFor="resume" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Resume (Text/Link):</label>
          <textarea
            id="resume"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows="6"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            placeholder="Paste your resume content or a link to your online resume (e.g., LinkedIn profile, personal website, or a cloud storage link like Google Drive/Dropbox)."
            required
          ></textarea>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.25rem' }}>
            In a real application, this would be a file upload. For this demo, please provide text or a link.
          </p>
        </div>
        <div>
          <label htmlFor="coverLetter" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Cover Letter (Optional):</label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows="6"
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            placeholder="Tell us why you're a great fit for this role..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="button-hover-effect" // Class for button hover
          style={{ width: '100%', backgroundColor: '#2563EB', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};


// Auth Form Component (Login/Register)
const AuthForm = ({ type }) => {
  const { login, register, showNotification, setCurrentPage } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate'); // Default role for registration

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      const success = login(email, password);
      if (success) {
        showNotification('Login successful!', 'success');
        setCurrentPage('home'); // Redirect to home or dashboard after login
      } else {
        showNotification('Invalid email or password.', 'error');
      }
    } else { // register
      const success = register(email, password, role);
      if (success) {
        showNotification('Registration successful! Please log in.', 'success');
        setCurrentPage('login');
      } else {
        showNotification('User with this email already exists.', 'error');
      }
    }
  };

  return (
    <div style={{ maxWidth: '40rem', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>{type === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            required
          />
        </div>
        {type === 'register' && (
          <div>
            <label htmlFor="role" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Register as:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }}
            >
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </select>
          </div>
        )}
        <button
          type="submit"
          className="button-hover-effect" // Class for button hover
          style={{ width: '100%', backgroundColor: '#2563EB', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

// Employer Dashboard Component
const EmployerDashboard = () => {
  const { currentUser, jobs, addJob, showNotification, setCurrentPage } = useContext(AppContext);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState(currentUser?.name || '');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false); // New state for loading indicator

  const postedJobs = jobs.filter(job => job.employerId === currentUser?.id);

  const handleSubmitJob = (e) => {
    e.preventDefault();
    if (!currentUser || currentUser.role !== 'employer') {
      showNotification('You must be logged in as an employer to post jobs.', 'error');
      return;
    }

    const newJob = {
      id: generateUniqueId(),
      title: jobTitle,
      company: company,
      location: location,
      description: description,
      requirements: requirements.split(',').map(req => req.trim()).filter(req => req !== ''),
      salary: salary,
      postedDate: new Date().toISOString().slice(0, 10), //YYYY-MM-DD
      employerId: currentUser.id,
    };
    addJob(newJob);
    showNotification('Job posted successfully!', 'success');
    // Clear form
    setJobTitle('');
    setCompany(currentUser.name || '');
    setLocation('');
    setDescription('');
    setRequirements('');
    setSalary('');
    setCurrentPage('employer-dashboard'); // Stay on dashboard
  };

  // Function to call Gemini API for description enhancement
  const handleEnhanceDescription = async () => {
    if (!description.trim()) {
      showNotification('Please enter a description to enhance.', 'error');
      return;
    }
    setIsEnhancing(true);
    showNotification('Enhancing description...', 'info');

    try {
      const prompt = `Enhance the following job description to be more engaging, professional, and comprehensive. Keep it concise while adding value. Make sure to include a clear call to action. Return only the enhanced description, no conversational text:\n\n"${description}"`;
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will automatically provide the API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json(); // Await the JSON parsing

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const enhancedText = result.candidates[0].content.parts[0].text;
        setDescription(enhancedText);
        showNotification('Description enhanced successfully!', 'success');
      } else {
        showNotification('Failed to enhance description. No valid response from AI.', 'error');
        console.error('Gemini API returned unexpected structure:', result);
      }
    } catch (error) {
      showNotification('Error enhancing description. Please try again.', 'error');
      console.error('Error calling Gemini API:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  if (!currentUser || currentUser.role !== 'employer') {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem', textAlign: 'center', color: '#DC2626' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Access Denied: Please log in as an employer to view this dashboard.</p>
        <button onClick={() => setCurrentPage('login')} style={{ color: '#2563EB', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '2rem', textAlign: 'center' }}>Employer Dashboard - {currentUser.name}</h2>

      <section style={{ marginBottom: '2.5rem', padding: '1.5rem', backgroundColor: '#EFF6FF', borderRadius: '0.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Post a New Job</h3>
        <form onSubmit={handleSubmitJob} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="jobTitle" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Job Title:</label>
            <input type="text" id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} required />
          </div>
          <div>
            <label htmlFor="company" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Company Name:</label>
            <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} required />
          </div>
          <div>
            <label htmlFor="location" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Location:</label>
            <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} required />
          </div>
          <div>
            <label htmlFor="description" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Job Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="6"
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} required></textarea>
            {/* ✨ New LLM-powered button ✨ */}
            <button
              type="button"
              onClick={handleEnhanceDescription}
              disabled={isEnhancing}
              className="button-hover-effect" // Class for button hover
              style={{ marginTop: '0.5rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#9333EA', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: isEnhancing ? 'not-allowed' : 'pointer', opacity: isEnhancing ? 0.5 : 1 }}
            >
              {isEnhancing ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite', marginRight: '0.75rem', height: '1.25rem', width: '1.25rem', color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enhancing...
                </>
              ) : (
                '✨ Enhance Description'
              )}
            </button>
          </div>
          <div>
            <label htmlFor="requirements" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Requirements (comma-separated):</label>
            <input type="text" id="requirements" value={requirements} onChange={(e) => setRequirements(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} placeholder="e.g., React, JavaScript, API integration" />
          </div>
          <div>
            <label htmlFor="salary" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Salary (e.g., $80,000 - $100,000):</label>
            <input type="text" id="salary" value={salary} onChange={(e) => setSalary(e.target.value)}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)', border: '1px solid #D1D5DB', borderRadius: '0.5rem', width: '100%', padding: '0.75rem 1rem', color: '#374151', outline: 'none' }} />
          </div>
          <button
            type="submit"
            className="button-hover-effect" // Class for button hover
            style={{ width: '100%', backgroundColor: '#10B981', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
          >
            Post Job
          </button>
        </form>
      </section>

      <section>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Your Posted Jobs</h3>
        {postedJobs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '1.125rem', padding: '1.25rem 0' }}>You haven't posted any jobs yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {postedJobs.map(job => (
              <div key={job.id} style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1D4ED8', marginBottom: '0.5rem' }}>{job.title}</h4>
                <p style={{ color: '#374151', marginBottom: '0.25rem' }}><strong>Location:</strong> {job.location}</p>
                <p style={{ color: '#4B5563', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Posted: {job.postedDate}</p>
                {/* Add actions like Edit/Delete in a real app */}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Candidate Dashboard Component
const CandidateDashboard = () => {
  const { currentUser, setCurrentPage, setSelectedJobId } = useContext(AppContext);

  const handleViewJob = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentPage('job-detail');
  };

  if (!currentUser || currentUser.role !== 'candidate') {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem', textAlign: 'center', color: '#DC2626' }}>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Access Denied: Please log in as a candidate to view this dashboard.</p>
        <button onClick={() => setCurrentPage('login')} style={{ color: '#2563EB', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '0.5rem', marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '2rem', textAlign: 'center' }}>Candidate Dashboard - {currentUser.name}</h2>

      <section>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.5rem' }}>Your Applications</h3>
        {currentUser.appliedJobs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#4B5563', fontSize: '1.125rem', padding: '1.25rem 0' }}>You haven't applied for any jobs yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {currentUser.appliedJobs.map(job => (
              <div
                key={job.id}
                className="job-card-animation" // Class for hover animation
                style={{ backgroundColor: '#F9FAFB', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB', transition: 'all 0.3s ease-in-out', transform: 'translateY(0)' }}
              >
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1D4ED8', marginBottom: '0.5rem' }}>{job.title}</h4>
                <p style={{ color: '#374151', marginBottom: '0.25rem' }}><strong>Company:</strong> {job.company}</p>
                <p style={{ color: '#4B5563', marginBottom: '0.75rem' }}><strong>Location:</strong> {job.location}</p>
                <button
                  onClick={() => handleViewJob(job.id)}
                  className="button-hover-effect" // Class for button hover
                  style={{ width: '100%', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.5rem', transition: 'all 0.3s ease-in-out', border: 'none', cursor: 'pointer' }}
                >
                  View Job Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add sections for Profile Management in a real app */}
      <section style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: '#F9FAFB', borderRadius: '0.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' }}>Profile Management (Future Feature)</h3>
        <p style={{ color: '#374151' }}>
          In a full application, you would manage your profile, resume, and application history here.
        </p>
      </section>
    </div>
  );
};


// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'candidate' or 'employer'
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobs, setJobs] = useState(initialJobs); // State for job listings
  const [users, setUsers] = useState(mockUsers); // State for mock user data

  const [notification, setNotification] = useState({ message: '', type: '' });

  // Function to show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    const timer = setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000); // Notification disappears after 3 seconds
    return () => clearTimeout(timer);
  };

  // Login function
  const login = (email, password) => {
    const user = users[email];
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      setCurrentUserEmail(email);
      return true;
    }
    return false;
  };

  // Register function
  const register = (email, password, role) => {
    if (users[email]) {
      return false; // User already exists
    }
    setUsers(prevUsers => ({
      ...prevUsers,
      [email]: {
        password: password,
        role: role,
        name: email.split('@')[0], // Simple name from email for demo
        appliedJobs: role === 'candidate' ? [] : undefined,
        postedJobs: role === 'employer' ? [] : undefined,
        id: generateUniqueId() // Assign a unique ID
      },
    }));
    return true;
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUserEmail(null);
    setSelectedJobId(null);
    showNotification('Logged out successfully.', 'success');
    setCurrentPage('home'); // Redirect to home after logout
  };

  // Add a new job (for employer dashboard)
  const addJob = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
    // Also, update the employer's posted jobs in mock user data
    setUsers(prevUsers => {
        const updatedEmployer = { ...prevUsers[currentUserEmail] };
        if (updatedEmployer.postedJobs) {
            updatedEmployer.postedJobs.push(newJob.id); // Store job ID in employer's data
        }
        return { ...prevUsers, [currentUserEmail]: updatedEmployer };
    });
  };

  // Add job to candidate's applied jobs
  const addAppliedJob = (job) => {
    setUsers(prevUsers => {
      const updatedCandidate = { ...prevUsers[currentUserEmail] };
      if (updatedCandidate.appliedJobs) {
        updatedCandidate.appliedJobs.push(job); // Store the entire job object
      }
      return { ...prevUsers, [currentUserEmail]: updatedCandidate };
    });
  };

  // Get current user details from mockUsers state
  const currentUser = currentUserEmail ? { ...users[currentUserEmail], email: currentUserEmail, id: users[currentUserEmail]?.id } : null;

  // Context value
  const contextValue = {
    currentPage,
    setCurrentPage,
    isLoggedIn,
    userRole,
    currentUser,
    jobs,
    selectedJobId,
    setSelectedJobId,
    login,
    register,
    logout,
    addJob,
    addAppliedJob,
    showNotification,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ minHeight: '100vh', backgroundColor: '#F3F4F6', fontFamily: 'sans-serif', color: '#1F2937', display: 'flex', flexDirection: 'column' }}>
        <style>
          {`
            /* Basic resets and body styles */
            body {
              margin: 0;
              font-family: 'Inter', sans-serif; /* Fallback to sans-serif if Inter is not available */
            }
            button {
              cursor: pointer;
            }
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

            /* Animations */
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Page fade-in effect */
            .page-fade-in {
              animation: fadeIn 0.5s ease-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }

            /* Button hover effect */
            .button-hover-effect:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(0,0,0,0.2);
            }

            /* Job Card hover effect */
            .job-card-animation:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 16px rgba(0,0,0,0.15);
            }
          `}
        </style>

        <Header />

        <main style={{ flexGrow: 1, padding: '1rem' }}>
          {/* Conditional rendering based on currentPage with page transition */}
          <div className="page-fade-in">
            {(() => {
              switch (currentPage) {
                case 'home':
                  return <HomePage />;
                case 'job-listings':
                  return <JobListingsPage />;
                case 'job-detail':
                  return <JobDetailPage />;
                case 'employer-dashboard':
                  return <EmployerDashboard />;
                case 'candidate-dashboard':
                  return <CandidateDashboard />;
                case 'job-application':
                  return <JobApplicationForm />;
                case 'login':
                  return <AuthForm type="login" />;
                case 'register':
                  return <AuthForm type="register" />;
                default:
                  return <HomePage />;
              }
            })()}
          </div>
        </main>

        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: '', type: '' })} />

        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
