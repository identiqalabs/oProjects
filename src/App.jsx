import React, { useState, useEffect } from 'react'
import './App.css'
import NetworkingLab from './NetworkingLab'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  // Company tools data with their respective URLs
  const companyTools = [
    {
      id: 1,
      name: "NMS",
      description: "Identiqa NMS provides real-time network monitoring, device control, and performance optimization in a centralized dashboard.",
      icon: "🌐", // Network icon
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
              <div className="identiqa-logo">
                <img src="/LOGO.png" alt="Identiqa Labs Logo" className="logo-img" />
              </div>
              <span className="logo-text">Identiqa Labs</span>
            </div>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => scrollToSection('home')}
            >
              Home
            </a>
            <a 
              href="#tools" 
              className={`nav-link ${activeSection === 'tools' ? 'active' : ''}`}
              onClick={() => scrollToSection('tools')}
            >
              Tools
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

      {/* Hero Section */}
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
              Comprehensive suite of tools for managing your IT infrastructure, 
              services, and data governance needs.
        </p>
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
                  <span className="icon">{tool.icon}</span>
                </div>
                <div className="tool-content">
                  <h3 className="tool-name">{tool.name}</h3>
                  <div className="tool-button-container">
                    <a 
                      href={tool.mainUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tool-button"
                    >
                      {tool.buttonText}
                    </a>
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

      {/* Tool Modal */}
      {selectedTool && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{selectedTool.icon}</span>
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