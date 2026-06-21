import React, { useState } from 'react';

// --- BULLETPROOF ICONS ---
const Icons = {
  Github: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.35-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 12c0 5.6 3.36 6.65 6.5 7a4.8 4.8 0 0 0-1 3.02v4"></path></svg>,
  Linkedin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  ExternalLink: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
};

// --- GLOBAL STYLES ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg-main: #1c1917;      
    --bg-card: #292524;      
    --bg-card-hover: #44403c;
    --text-primary: #fafaf9; 
    --text-secondary: #a8a29e;
    --accent-main: #d4a373;  
    --accent-hover: #e8b887; 
    --border-light: rgba(255, 255, 255, 0.05);
    --section-pad: 100px 0;
    --card-pad: 36px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px; /* Ensures the sticky nav doesn't cover section titles */
  }

  body { background-color: var(--bg-main); color: var(--text-primary); font-family: 'Inter', sans-serif; line-height: 1.7; overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-in { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  h1, h2, h3, h4 { line-height: 1.3; color: var(--text-primary); }
  .title-hero { font-size: clamp(3.5rem, 8vw, 5.5rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.25rem; line-height: 1.1; }
  .hero-subtitle { font-size: clamp(1.25rem, 3vw, 1.75rem); color: var(--accent-main); font-weight: 600; margin-bottom: 1.5rem; }
  .title-section { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; letter-spacing: -0.01em; margin-bottom: 3rem; }

  /* NAVIGATION STYLES */
  .navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(28, 25, 23, 0.85); /* Matches bg-main with slight transparency */
    backdrop-filter: blur(10px); /* Frosted glass effect */
    border-bottom: 1px solid var(--border-light);
    padding: 1rem 0;
  }

  .nav-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .nav-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: var(--accent-main);
  }

  .container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  .section-wrapper { padding: var(--section-pad); border-bottom: 1px solid var(--border-light); }
  .grid-layout { display: grid; gap: 24px; }
  .hero-layout { display: flex; flex-direction: column-reverse; align-items: center; gap: 3rem; text-align: center; }

  .hero-photo-wrapper { width: 240px; height: 240px; border-radius: 16px; overflow: hidden; border: 4px solid var(--bg-card); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25); background-color: var(--bg-card); flex-shrink: 0; }
  .hero-photo { width: 100%; height: 100%; object-fit: cover; transform: scale(1.15); display: block; transition: transform 0.4s ease; }
  .hero-photo-wrapper:hover .hero-photo { transform: scale(1.25); }

  .btn-group { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 2.5rem; justify-content: center; }
  
  @media (min-width: 768px) {
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .hero-layout { flex-direction: row; text-align: left; justify-content: space-between; }
    .hero-content { flex: 1; padding-right: 2rem; }
    .btn-group { justify-content: flex-start; }
  }

  .tech-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 12px; padding: var(--card-pad); transition: all 0.3s ease; position: relative; display: flex; flex-direction: column; }
  .tech-card:hover { transform: translateY(-4px); background: var(--bg-card-hover); border-color: rgba(212, 163, 115, 0.2); }

  .credential-link { display: inline-flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 1.5rem; font-size: 0.85rem; font-weight: 600; color: var(--accent-main); text-decoration: none; transition: all 0.3s ease; }
  .credential-link:hover { color: var(--accent-hover); gap: 10px; }
  .credential-link svg { width: 16px; height: 16px; }

  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 12px 26px; border-radius: 8px; font-weight: 500; font-size: 0.95rem; text-decoration: none; transition: all 0.2s ease; cursor: pointer; border: none; }
  .btn-primary { background: var(--accent-main); color: var(--bg-main); font-weight: 600; }
  .btn-primary:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-2px); }
  .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
  .btn-outline { background: transparent; color: var(--text-primary); border: 1px solid var(--border-light); }
  .btn-outline:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.3); }

  .badge-container { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-light); }
  .badge { font-size: 0.75rem; font-weight: 500; padding: 6px 12px; background: rgba(212, 163, 115, 0.1); color: var(--accent-main); border-radius: 20px; border: 1px solid rgba(212, 163, 115, 0.2); }

  .timeline-item { position: relative; padding-left: 32px; border-left: 2px solid var(--border-light); padding-bottom: 40px; }
  .timeline-item::before { content: ''; position: absolute; left: -6px; top: 8px; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-main); }
  .timeline-item:last-child { border-left-color: transparent; padding-bottom: 0; }

  /* FORM STYLES */
  .contact-form { display: flex; flex-direction: column; gap: 16px; max-width: 500px; margin: 0 auto 2rem auto; text-align: left; }
  .form-input { width: 100%; padding: 14px 16px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-light); border-radius: 8px; color: var(--text-primary); font-family: inherit; font-size: 0.95rem; transition: border-color 0.3s; }
  .form-input:focus { outline: none; border-color: var(--accent-main); }
  textarea.form-input { min-height: 120px; resize: vertical; }
  .form-message { text-align: center; font-size: 0.9rem; margin-top: 10px; font-weight: 500; }
  .msg-success { color: #4ade80; }
  .msg-error { color: #f87171; }
`;

// --- DATA CONFIGURATION ---
const USER = {
  name: "MANYA",
  role: "Final Year B.Tech Undergraduate", 
  linkedin: "https://www.linkedin.com/in/manya-507313297", 
  github: "https://github.com/ManyaB2005", 
  photo: "/manya profile.png",
  about: "I am a final-year Information Science student who loves building full-stack web applications. I specialize in the MERN stack and enjoy turning complex ideas into simple, user-friendly designs. As I prepare to graduate, I am actively looking for opportunities to join a great team and build products that make a real impact.",
  
  education: [
    { school: "UVCE Bengaluru", degree: "B.Tech in Information Science", year: "2023 - 2027", gpa: "9.51 CGPA" },
    { school: "SVPUC Kundapura", degree: "PCMB", year: "2021 - 2023", gpa: "97%" }
  ],

  skills: [
    { category: "Frontend", items: "HTML, CSS, JavaScript, React, Tailwind" },
    { category: "Backend", items: "Node.js, Express.js" },
    { category: "Database", items: "MongoDB, MySQL" },
    { category: "Languages", items: "C, C++, Python" },
    { category: "Tools", items: "Git, GitHub, Postman" }
  ],

  projects: [
    { 
      title: "Fake News Detection System", 
      desc: "Developed an AI-powered web application that detects and verifies fake news using NLP and a fine-tuned BERT model. The system performs linguistic analysis, fact-checking through external APIs, and contextual validation to classify news articles as real or fake.", 
      tech: ["React", "Flask","Python","TensorFlow","Google Fact Check API","Wikipedia API","BERT","NLP","Sequence Classification","Binary Classification"]
    },
    { 
      title: "NGO Educational Program and Team Database Management System", 
      desc: "Designed and managed a SQL-based database system for storing and organizing student, volunteer, program, and team information. Implemented database operations, data retrieval, and record management to improve data accessibility and administrative efficiency.", 
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"]
    },
    { 
      title: "FCI-Event-Resource-Requirement-Planner", 
      desc: "Designed and managed a SQL-based database system for storing and organizing student, volunteer, program, and team information. Implemented database operations, data retrieval, and record management to improve data accessibility and administrative efficiency.", 
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"]
    },
    { 
      title: "Fake Certificate Detection System using Blockchain", 
      desc: "Developed a decentralized web application to securely issue and verify tamper-proof academic credentials. Engineered a dual-key cryptographic architecture and implemented client-side SHA-256 hashing alongside a Bloom filter to optimize Ethereum gas costs, ensure zero-knowledge data privacy, and anchor immutable records to the blockchain.", 
      tech: ["React.js", "Node.js", "Solidity", "Ethereum(Sepolia Testnet)", "Ethers.js", "MetaMask", "SHA-256 Hashing", "Bloom Filter", "RSA-2048 (Digital Signatures)"]
    }
  ],

  volunteering: [
    { 
      title: "Draw Your Dreams (2024 & 2025)", 
      role: "Fund a Child in India", 
      desc: "Volunteered in Draw Your Dreams, an annual Children's Day initiative conducted around November 14th. Supported event coordination and participant engagement, and served on the Social Media Team in 2025, managing real-time event updates and content posting.", 
      link: "/certificates/DYD2024.jpg"
    },
    { 
      title: "Impetus 25.0", 
      role: "IEEE UVCE", 
      desc: "Volunteered for the mock placement events at IMPETUS 25.0, assisting in event coordination and ensuring the smooth conduct of activities.", 
      link: "/certificates/Impetus volunteer.jpg" 
    }
  ],

  achievements: [
    { 
      title: "Summit : Impetus 24.0", 
      role: "IEEE UVCE", 
      desc: "Attended and participated in sessions focused on learning, innovation, and professional growth.", 
      link: "/certificates/Summit.pdf" 
    },
    { 
      title: "Bit N Build Hackathon", 
      role: "GDG UVCE", 
      desc: "Competed in a high-intensity hackathon focused on building scalable web solutions via GDG UVCE.", 
      link: "/certificates/BitNBuild.pdf" 
    },
    { 
      title: "Kagada 20 : Poster Presentation", 
      role: "IEEE UVCE", 
      desc: "Presented the project Smart Waste Sorting Bin as part of a team at KAGADA 20, showcasing an innovative solution for automated waste segregation.", 
      link: "/certificates/Kagada.pdf" 
    },
    { 
      title: "Tech Fest Competition", 
      role: "FCI", 
      desc: "Earned recognition for technical communication and the clear presentation of complex engineering concepts.", 
      link: "/certificates/tech-fest-fci.pdf" 
    }
  ],

  certifications: [
    { 
      title: "Summer Internship - 1", 
      role: "Campus Champ", 
      desc: "Participated in aptitude training and Shark Tank-style entrepreneurial activities, enhancing analytical and presentation skills.", 
      link: "/certificates/SI1.jpg"
    },
    { 
      title: "Summer Internship - 2", 
      role: "Campus Champ", 
      desc: "Gained hands-on experience in MERN Stack development, building web applications using MongoDB, Express.js, React, and Node.js.", 
      link: "/certificates/SI2.jpg"
    },
    { 
      title: "Git", 
      role: "Udemy", 
      desc: "Completed certification in Git and GitHub, covering version control, branching, merging, collaboration, and repository management.", 
      link: "/certificates/Git.pdf"
    },
    { 
      title: "Python", 
      role: "Udemy", 
      desc: "Completed certification in Python programming, covering core concepts, data structures, functions, object-oriented programming, and problem-solving.", 
      link: "https://www.udemy.com/certificate/UC-python-example-link/" 
    }
  ]
};

// Updated Section component to accept an 'id' prop for linking
const Section = ({ title, id, children }) => (
  <section id={id} className="section-wrapper animate-in">
    <div><h2 className="title-section">{title}</h2></div>
    {children}
  </section>
);

const App = () => {
  // --- CONTACT FORM STATE ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      // Connect to your local backend API
      const response = await fetch('https://manya-portfolio.onrender.com/api/contact', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, success: false, error: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: 'Failed to connect to the server. Is it running?' });
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* NAVIGATION BAR */}
      <nav className="navbar animate-in">
        <div className="nav-container">
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#education" className="nav-link">Education</a>
          <a href="#volunteering" className="nav-link">Volunteering</a>
          <a href="#achievements" className="nav-link">Achievements</a>
          <a href="#certifications" className="nav-link">Certifications</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      <div className="container">
        {/* 1. HERO SECTION */}
        <section className="animate-in" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="hero-layout">
            <div className="hero-content">
              <h1 className="title-hero">{USER.name}</h1>
              <h2 className="hero-subtitle">{USER.role}</h2>
              {/* Text justified and updated */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '400', marginBottom: '2rem', lineHeight: '1.8', maxWidth: '600px', textAlign: 'justify' }}>
                {USER.about}
              </p>
            </div>
            <div className="hero-photo-wrapper">
              <img src={USER.photo} alt={USER.name} className="hero-photo" />
            </div>
          </div>
        </section>

        {/* 2. TECHNICAL SKILLS */}
        <Section id="skills" title="Technical Skills">
          <div className="grid-layout grid-2">
            {USER.skills.map((skill, i) => (
              <div key={i} className="tech-card">
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: '600' }}>{skill.category}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{skill.items}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 3. FEATURED PROJECTS */}
        <Section id="projects" title="Projects">
          <div className="grid-layout">
            {USER.projects.map((p, i) => (
              <div key={i} className="tech-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{p.title}</h3>
                  <a href={USER.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', cursor: 'pointer', transition: 'color 0.2s' }}>
                    <Icons.ExternalLink />
                  </a> 
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: '1.7', textAlign: 'justify' }}>{p.desc}</p>
                <div className="badge-container">
                  {p.tech.map(t => <span key={t} className="badge">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. EDUCATION & TIMELINE */}
        <Section id="education" title="Education">
          <div className="tech-card">
            {USER.education.map((edu, i) => (
              <div key={i} className="timeline-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '600' }}>{edu.school}</h3>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>{edu.year}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>{edu.degree}</p>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}>
                  Result: {edu.gpa}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. VOLUNTEERING */}
        <Section id="volunteering" title="Volunteering">
          <div className="grid-layout grid-2">
            {USER.volunteering.map((vol, i) => (
              <div key={i} className="tech-card">
                <h4 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.25rem' }}>{vol.title}</h4>
                <p style={{ color: 'var(--accent-main)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '1rem' }}>{vol.role}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>{vol.desc}</p>
                {vol.link && (
                  <a href={vol.link} target="_blank" rel="noreferrer" className="credential-link">
                    View Credential <Icons.ExternalLink />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 6. ACHIEVEMENTS */}
        <Section id="achievements" title="Achievements">
          <div className="grid-layout grid-2">
            {USER.achievements.map((achieve, i) => (
              <div key={i} className="tech-card">
                <h4 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.25rem' }}>{achieve.title}</h4>
                <p style={{ color: 'var(--accent-main)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '1rem' }}>{achieve.role}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>{achieve.desc}</p>
                {achieve.link && (
                  <a href={achieve.link} target="_blank" rel="noreferrer" className="credential-link">
                    View Credential <Icons.ExternalLink />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 7. CERTIFICATIONS */}
        <Section id="certifications" title="Certifications">
          <div className="grid-layout grid-2">
            {USER.certifications.map((cert, i) => (
              <div key={i} className="tech-card">
                <h4 style={{ fontSize: '1.15rem', fontWeight: '600', marginBottom: '0.25rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--accent-main)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '1rem' }}>{cert.role}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', textAlign: 'justify' }}>{cert.desc}</p>
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noreferrer" className="credential-link">
                    View Certificate <Icons.ExternalLink />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* 8. CONTACT FOOTER WITH FULL STACK FORM */}
        <section id="contact" className="section-wrapper animate-in" style={{ borderBottom: 'none', textAlign: 'center', paddingBottom: '80px', paddingTop: '60px' }}>
          <h2 className="title-section" style={{ marginBottom: '1.5rem' }}>Let's Connect</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0 auto 2.5rem auto', maxWidth: '450px', fontSize: '1.1rem', lineHeight: '1.7' }}>
            I am currently open to new opportunities. Send me a message and I'll get back to you!
          </p>
          
          <form className="contact-form" onSubmit={handleFormSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              className="form-input" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              className="form-input" 
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              className="form-input" 
              value={formData.message}
              onChange={handleInputChange}
              required 
            />
            
            <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ width: '100%', marginTop: '10px' }}>
              {status.loading ? 'Sending Transmission...' : <><Icons.Send /> Send Message</>}
            </button>

            {status.success && <p className="form-message msg-success">Message securely delivered to database!</p>}
            {status.error && <p className="form-message msg-error">{status.error}</p>}
          </form>
          
          <div className="btn-group" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <a href={USER.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              <Icons.Github /> GitHub
            </a>
            <a href={USER.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              <Icons.Linkedin /> LinkedIn
            </a>
          </div>
        </section>

      </div>
    </>
  );
};

export default App;