import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState('')

  // Company tools data with their respective URLs
  const companyTools = [
    {
      id: 1,
      name: "NMS",
      description: "Identiqa NMS provides real-time network monitoring, device control, and performance optimization in a centralized dashboard.",
      icon: "/Nms_logo.png", // Uses image from public folder
      buttonText: "Access NMS",
      mainUrl: "http://192.168.1.25/zabbix/", // Primary URL for the main button
      links: [
        { name: "Zabbix", url: "http://192.168.1.25/zabbix/", icon: "📊" },
        { name: "Grafana", url: "http://192.168.1.17:3000", icon: "📈" },
        { name: "Nagios", url: "http://your-nagios-url.com", icon: "🖥️" }
      ]
    },
    {
      id: 2,
      name: "ITSM",
      description: "IT Service Management",
      icon: "🛠️", // Service management icon
      buttonText: "Access ITSM",
      mainUrl: "https://your-itsm-tool.com", // Primary URL for the main button
      links: [
        { name: "Service Desk", url: "https://your-itsm-tool.com", icon: "🎫" },
        { name: "Incident Management", url: "https://your-incident-tool.com", icon: "🚨" }
      ]
    },
    {
      id: 3,
      name: "Data Governance",
      description: "Data Management & Governance",
      icon: "📋", // Data governance icon
      buttonText: "Access Data Governance",
      mainUrl: "https://your-data-catalog.com", // Primary URL for the main button
      links: [
        { name: "Data Catalog", url: "https://your-data-catalog.com", icon: "📚" },
        { name: "Compliance", url: "https://your-compliance-tool.com", icon: "✅" }
      ]
    },
    {
      id: 4,
      name: "Networking Lab",
      description: "PNET Lab for practical networking simulations and exercises.",
      icon: "🧑‍💻", // Networking icon
      buttonText: "Open Networking Lab",
      links: [
        { name: "PNET Lab", url: "https://192.168.1.2/store/public/auth/login/offline?link=https%3A%2F%2F192.168.1.2%2Fstore%2Fpublic%2Fadmin%2Fmain%2Fview&error=&success=", icon: "🧪" }
      ]
    },
    {
      id: 5,
      name: "VAPT",
      description: "Vulnerability Assessment and Penetration Testing dashboard.",
      icon: "/Vapt_logo.png", // Uses image from public folder
      buttonText: "Access VAPT",
      mainUrl: "http://192.168.1.11:9392",
      links: [
        { name: "VAPT Dashboard", url: "http://192.168.1.11:9392", icon: "🛡️" }
      ]
    }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const openToolModal = (tool) => {
    setSelectedTool(tool)
  }

  const closeToolModal = () => {
    setSelectedTool(null)
  }

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeToolModal()
    }
  }

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeToolModal()
      }
    }

    if (selectedTool) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedTool])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'tools']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load/save announcements to localStorage and seed test items once
  useEffect(() => {
    try {
      const saved = localStorage.getItem('identiqa_announcements')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setAnnouncements(parsed)
          return
        }
      }
    } catch {}
    // Seed test announcements if none exist
    const seed = [
      { id: `a-${Date.now()-300000}`, text: 'APM portal 1.1 released with improved dashboards', ts: Date.now() - 300000 },
      { id: `a-${Date.now()-180000}`, text: 'NMS: new SNMP templates for edge routers', ts: Date.now() - 180000 },
      { id: `a-${Date.now()-60000}`, text: 'Networking Lab: fresh PNETLab practice set published', ts: Date.now() - 60000 }
    ]
    setAnnouncements(seed)
    try { localStorage.setItem('identiqa_announcements', JSON.stringify(seed)) } catch {}
  }, [])

  useEffect(() => {
    try { localStorage.setItem('identiqa_announcements', JSON.stringify(announcements)) } catch {}
  }, [announcements])

  const addAnnouncement = (text) => {
    if (!text || !text.trim()) return
    const item = { id: `a-${Date.now()}`, text: text.trim(), ts: Date.now() }
    setAnnouncements((prev) => [item, ...prev])
  }

  const formatTs = (t) => new Date(t).toLocaleString()

  const isImageIcon = (icon) => {
    return typeof icon === 'string' && /\.(png|jpe?g|gif|svg)$/i.test(icon)
  }

  useEffect(() => {
    // Apply theme to body
    if (isDarkMode) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [isDarkMode])

  return (
    <div className={`App ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-container">
              <img src="/identiqa_logo.png" alt="identiqa logo" className="identiqa-navbar-logo" />
            </div>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              About Identiqa Labs
            </a>
            <a 
              href="#tools" 
              className={`nav-link ${activeSection === 'tools' ? 'active' : ''}`}
              onClick={() => scrollToSection('tools')}
            >
              Tools
            </a>
            <a 
              href="#changelogs" 
              className={`nav-link ${activeSection === 'changelogs' ? 'active' : ''}`}
              onClick={() => scrollToSection('changelogs')}
            >
              Change Logs
            </a>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section (About Identiqa Labs) */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="company-branding">
            <div className="company-logo">
              <div className="identiqa-logo-large">
                <img src="/LOGO.png" alt="Identiqa Labs Logo" className="logo-img-large" />
              </div>
              <h1 className="company-name">Identiqa Labs</h1>
            </div>
            <h2 className="application-title">Application Portfolio Management</h2>
            <p className="hero-description">
              Identiqa Labs is a research-and-delivery unit focused on building reliable, open‑source platforms for IT operations and data teams. We design, implement, and support solutions that help you observe, govern, and secure critical infrastructure at scale.
            </p>
            <p className="hero-description">
              Our portfolio spans network monitoring and observability (Zabbix, Grafana, Nagios), IT service management, data governance and lineage, hands‑on networking labs with PNETLab, and vulnerability assessment workflows. We standardize on proven tools, wrap them with opinionated best practices, and tailor them to your environment.
            </p>
            <p className="hero-description">
              We work outcome‑first: rapid discovery, architecture and hardening, automated deployments, and clear documentation with knowledge transfer. Whether on‑premises or cloud, we emphasize security, compliance, maintainability, and measurable performance improvements.
            </p>
            <p className="hero-description">
              From CIOs aligning roadmaps to SRE/NOC/SOC and data platform teams running day‑to‑day operations, Identiqa Labs helps reduce meantime‑to‑detect, accelerate incident response, and unlock data‑driven decisions—while keeping total cost of ownership predictable.
            </p>
            <div className="opensource-slider-container">
              <div className="opensource-slider">
                <div className="opensource-slide"><img src="/zabbix.png" alt="Zabbix" className="opensource-logo" /><span>Zabbix</span></div>
                <div className="opensource-slide"><img src="/putty.png" alt="PuTTY" className="opensource-logo" /><span>PuTTY</span></div>
                <div className="opensource-slide"><img src="/grafana.png" alt="Grafana" className="opensource-logo" /><span>Grafana</span></div>
                <div className="opensource-slide"><img src="/nagios.png" alt="Nagios" className="opensource-logo" /><span>Nagios</span></div>
                <div className="opensource-slide"><img src="/pnet.png" alt="PNETLab" className="opensource-logo" /><span>PNETLab</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="tools">
        <div className="container">
          <h2 className="section-title">Our Tools</h2>
          <p className="section-subtitle">
            Access our comprehensive suite of management tools
          </p>
          <div className="tools-grid">
            {companyTools.map((tool) => (
              <div key={tool.id} className="tool-card">
                <div className="tool-icon">
                  {isImageIcon(tool.icon) ? (
                    <img
                      src={tool.icon}
                      alt={`${tool.name} logo`}
                      className={`icon-img ${tool.name === 'NMS' || tool.name === 'VAPT' ? 'icon-img--large' : ''}`}
                    />
                  ) : (
                    <span className="icon">{tool.icon}</span>
                  )}
                </div>
                <div className="tool-content">
                  {!(tool && (tool.name === 'NMS' || tool.name === 'VAPT')) && (
                    <h3 className="tool-name">{tool.name}</h3>
                  )}
                  <div className="tool-button-container">
                    <button 
                      className="tool-info-button"
                      onClick={() => openToolModal(tool)}
                    >
                      ℹ️ Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Change Logs Section */}
      <section id="changelogs" className="changelogs-section">
        <div className="changelogs-content">
          <h2 className="changelogs-title">Change Logs</h2>
          {/* Announcements ticker */}
          {announcements.length > 0 && (
            <div className="announcements-ticker">
              <div className="announcements-ticker-header">Latest announcements</div>
              <div className="announcements-ticker-track">
                {[...announcements, ...announcements].map((a, idx) => (
                  <div key={`${a.id}-${idx}`} className="announcements-ticker-item">
                    <span>🗞️ {a.text}</span>
                    <span className="announcements-timestamp">{formatTs(a.ts)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Quick add (for testing/demo) */}
          <ul className="changelog-list">
            <li className="changelog-item">[13/08/2025 13:09] Lauching NMS tool soon.</li>
            <li className="changelog-item">[Date] Test Case.</li>
            <li className="changelog-item">[Date] Test Case.</li>
            <li className="changelog-item">[Date] Test Case.</li>
          </ul>
        </div>
      </section>

      {/* Tool Modal */}
      {selectedTool && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                {isImageIcon(selectedTool.icon) ? (
                  <img src={selectedTool.icon} alt={`${selectedTool.name} logo`} className="modal-icon-img" />
                ) : (
                  <span className="modal-icon">{selectedTool.icon}</span>
                )}
                <h2>{selectedTool.name}</h2>
              </div>
              <button className="modal-close" onClick={closeToolModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedTool.description}</p>
              <div className="modal-links">
                {selectedTool.links.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-name">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">
              <p>&copy; 2024 Identiqa Labs. All rights reserved.</p>
            </div>
            <div className="footer-social">
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App 