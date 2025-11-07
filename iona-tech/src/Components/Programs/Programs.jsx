import React, { useState } from 'react'
import './Programs.css'
import coda from '../../assets/coda.jpg'
import mobile from '../../assets/mobile.jpeg'
import graphics from '../../assets/graphics.jpeg'
import Pc from '../../assets/Pc.jpg'
import AppDev from '../../assets/AppDev.png'
import phoneApp from '../../assets/phoneApp.png'
import ManDesk from '../../assets/ManDesk.png'
import { Code, Smartphone, Palette, Monitor, ArrowRight, X, CheckCircle, Star, Users, Clock, Award } from 'lucide-react'

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState(null)

  const programs = [
    {
      id: 1,
      image: coda,
      icon: AppDev,
      title: "Web Development",
      description: "Modern, responsive websites and web applications built with cutting-edge technologies",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"],
      iconComponent: <Code className="w-8 h-8" />,
      details: {
        overview: "Transform your digital presence with our comprehensive web development services. We create modern, scalable, and user-friendly web applications that drive business growth.",
        technologies: ["React.js", "Next.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "TypeScript", "Tailwind CSS"],
        services: [
          "Custom Website Development",
          "E-commerce Solutions",
          "Web Application Development",
          "API Development & Integration",
          "Database Design & Optimization",
          "Performance Optimization",
          "SEO Optimization",
          "Maintenance & Support"
        ],
        projects: [
          {
            name: "E-commerce Platform",
            description: "Full-stack e-commerce solution with payment integration",
            tech: ["React", "Node.js", "Stripe", "MongoDB"],
            image: coda
          },
          {
            name: "Corporate Website",
            description: "Modern corporate website with CMS integration",
            tech: ["Next.js", "Contentful", "Tailwind CSS"],
            image: mobile
          },
          {
            name: "Dashboard Application",
            description: "Real-time dashboard with data visualization",
            tech: ["React", "Socket.io", "Chart.js", "Express"],
            image: graphics
          }
        ],
        benefits: [
          "Responsive Design for All Devices",
          "Fast Loading Times",
          "SEO Optimized",
          "Scalable Architecture",
          "24/7 Support",
          "Regular Updates"
        ]
      }
    },
    {
      id: 2,
      image: mobile,
      icon: phoneApp,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications for iOS and Android platforms",
      features: ["React Native", "Flutter", "Native Development", "App Store Deployment"],
      iconComponent: <Smartphone className="w-8 h-8" />,
      details: {
        overview: "Build powerful mobile applications that engage users and drive business results. Our mobile development expertise spans both native and cross-platform solutions.",
        technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux", "TypeScript", "Expo"],
        services: [
          "Cross-Platform App Development",
          "Native iOS Development",
          "Native Android Development",
          "App Store Optimization",
          "Push Notification Integration",
          "Offline Functionality",
          "App Testing & QA",
          "App Maintenance & Updates"
        ],
        projects: [
          {
            name: "Food Delivery App",
            description: "Complete food delivery solution with real-time tracking",
            tech: ["React Native", "Firebase", "Google Maps", "Stripe"],
            image: phoneApp
          },
          {
            name: "Fitness Tracking App",
            description: "Health and fitness app with wearable integration",
            tech: ["Flutter", "HealthKit", "Google Fit", "Bluetooth"],
            image: AppDev
          },
          {
            name: "Social Media App",
            description: "Social networking app with real-time messaging",
            tech: ["React Native", "Socket.io", "AWS S3", "Redis"],
            image: ManDesk
          }
        ],
        benefits: [
          "Cross-Platform Compatibility",
          "Native Performance",
          "App Store Optimization",
          "Real-time Updates",
          "Offline Capabilities",
          "Security & Privacy"
        ]
      }
    },
    {
      id: 3,
      image: graphics,
      icon: ManDesk,
      title: "Graphics Design",
      description: "Creative visual solutions including branding, UI/UX design, and digital art",
      features: ["Brand Identity", "UI/UX Design", "Print Design", "Digital Marketing"],
      iconComponent: <Palette className="w-8 h-8" />,
      details: {
        overview: "Create stunning visual experiences that captivate your audience and strengthen your brand identity. Our design services cover everything from branding to user interface design.",
        technologies: ["Adobe Creative Suite", "Figma", "Sketch", "InVision", "Procreate", "Blender", "Canva Pro", "Principle"],
        services: [
          "Brand Identity Design",
          "Logo Design & Branding",
          "UI/UX Design",
          "Website Design",
          "Mobile App Design",
          "Print Design",
          "Digital Marketing Assets",
          "Social Media Graphics"
        ],
        projects: [
          {
            name: "Brand Identity Package",
            description: "Complete brand identity including logo, colors, and guidelines",
            tech: ["Adobe Illustrator", "Photoshop", "InDesign"],
            image: graphics
          },
          {
            name: "E-commerce UI Design",
            description: "Modern e-commerce interface with user experience focus",
            tech: ["Figma", "Adobe XD", "Principle"],
            image: coda
          },
          {
            name: "Marketing Campaign Design",
            description: "Comprehensive marketing materials for digital campaigns",
            tech: ["Photoshop", "Illustrator", "After Effects"],
            image: mobile
          }
        ],
        benefits: [
          "Professional Quality",
          "Brand Consistency",
          "User-Centered Design",
          "Scalable Assets",
          "Multiple Formats",
          "Design System Creation"
        ]
      }
    },
    {
      id: 4,
      image: Pc,
      icon: ManDesk,
      title: "Desktop Applications",
      description: "Powerful desktop software solutions for Windows, macOS, and Linux platforms",
      features: ["Cross-Platform", "Native Performance", "Database Integration", "System Integration"],
      iconComponent: <Monitor className="w-8 h-8" />,
      details: {
        overview: "Develop robust desktop applications that provide powerful functionality and seamless user experience across all major operating systems. Our desktop solutions are built for performance, reliability, and scalability.",
        technologies: ["Electron", "React", "Node.js", "Python", "C#", ".NET", "Java", "SQLite", "PostgreSQL", "Tauri"],
        services: [
          "Cross-Platform Desktop Apps",
          "Windows Application Development",
          "macOS Application Development",
          "Linux Application Development",
          "Database Integration",
          "System Integration",
          "Performance Optimization",
          "Application Deployment"
        ],
        projects: [
          {
            name: "Inventory Management System",
            description: "Comprehensive inventory tracking and management solution",
            tech: ["Electron", "React", "SQLite", "Node.js"],
            image: Pc
          },
          {
            name: "Financial Analysis Tool",
            description: "Advanced financial data analysis and reporting application",
            tech: ["Python", "Tkinter", "Pandas", "Matplotlib"],
            image: coda
          },
          {
            name: "Project Management Suite",
            description: "Complete project management and team collaboration platform",
            tech: ["C#", ".NET", "WPF", "SQL Server"],
            image: mobile
          }
        ],
        benefits: [
          "Cross-Platform Compatibility",
          "Native Performance",
          "Offline Functionality",
          "System Integration",
          "Data Security",
          "Scalable Architecture"
        ]
      }
    }
  ]

  const openProgramDetails = (program) => {
    setSelectedProgram(program)
    document.body.style.overflow = 'hidden'
  }

  const closeProgramDetails = () => {
    setSelectedProgram(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <section className="programs-section">
        <div className="programs-container">
          {/* Header */}
          <div className="programs-header">
            <h2 className="programs-title">Our Programs</h2>
            <p className="programs-subtitle">
              Comprehensive development services tailored to your business needs
            </p>
          </div>

          {/* Programs Grid */}
          <div className="programs-grid">
            {programs.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-image-container">
                  <img src={program.image} alt={program.title} className="program-image" />
                  <div className="program-overlay">
                    <div className="program-icon-container">
                      {program.iconComponent}
                    </div>
        </div>
      </div>

                <div className="program-content">
                  <div className="program-header">
                    <img src={program.icon} alt="" className="program-icon-small" />
                    <h3 className="program-title">{program.title}</h3>
                  </div>
                  
                  <p className="program-description">{program.description}</p>
                  
                  <div className="program-features">
                    {program.features.map((feature, index) => (
                      <div key={index} className="program-feature">
                        <div className="feature-dot"></div>
                        <span>{feature}</span>
        </div>
                    ))}
      </div>

                  <button 
                    className="program-button"
                    onClick={() => openProgramDetails(program)}
                  >
                    <span>Explore Program</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="program-modal-overlay" onClick={closeProgramDetails}>
          <div className="program-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeProgramDetails}>
              <X className="w-6 h-6" />
            </button>
            
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <div className="modal-icon">
                  {selectedProgram.iconComponent}
                </div>
                <div>
                  <h2 className="modal-title">{selectedProgram.title}</h2>
                  <p className="modal-subtitle">{selectedProgram.description}</p>
                </div>
              </div>

              {/* Overview */}
              <div className="modal-section">
                <h3 className="section-title">Overview</h3>
                <p className="section-content">{selectedProgram.details.overview}</p>
              </div>

              {/* Technologies */}
              <div className="modal-section">
                <h3 className="section-title">Technologies We Use</h3>
                <div className="technologies-grid">
                  {selectedProgram.details.technologies.map((tech, index) => (
                    <div key={index} className="technology-item">
                      <CheckCircle className="w-4 h-4" />
                      <span>{tech}</span>
                    </div>
                  ))}
        </div>
      </div>

              {/* Services */}
              <div className="modal-section">
                <h3 className="section-title">Our Services</h3>
                <div className="services-grid">
                  {selectedProgram.details.services.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-icon">
                        <Star className="w-4 h-4" />
                      </div>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="modal-section">
                <h3 className="section-title">Featured Projects</h3>
                <div className="projects-grid">
                  {selectedProgram.details.projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <img src={project.image} alt={project.name} className="project-image" />
                      <div className="project-content">
                        <h4 className="project-title">{project.name}</h4>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tech">
                          {project.tech.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="modal-section">
                <h3 className="section-title">Why Choose Us</h3>
                <div className="benefits-grid">
                  {selectedProgram.details.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      <Award className="w-5 h-5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="modal-cta">
                <button className="cta-button">
                  <span>Start Your Project</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="cta-info">
                  <div className="info-item">
                    <Users className="w-4 h-4" />
                    <span>Expert Team</span>
                  </div>
                  <div className="info-item">
                    <Clock className="w-4 h-4" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="info-item">
                    <Award className="w-4 h-4" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
      )}
    </>
  )
}

export default Programs
