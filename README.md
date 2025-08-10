# Modern Portfolio Website

A beautiful, responsive portfolio website built with React and Vite that showcases your projects with clickable links to their working URLs.

## ✨ Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Projects**: Click on any project to visit the live demo or GitHub repository
- **Smooth Navigation**: Smooth scrolling navigation with active section highlighting
- **Contact Form**: Built-in contact form for potential clients
- **Skills Section**: Visual representation of your technical skills
- **Mobile-Friendly**: Hamburger menu for mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 🎨 Customization

### 1. Personal Information

Update your personal information in `src/App.jsx`:

```jsx
// Replace "Your Name" with your actual name
<h1 className="hero-title">
  Hi, I'm <span className="highlight">Your Name</span>
</h1>

// Update your role/title
<h2 className="hero-subtitle">Full Stack Developer</h2>

// Update your description
<p className="hero-description">
  I create beautiful, functional, and user-friendly web applications 
  that solve real-world problems and deliver exceptional user experiences.
</p>
```

### 2. Profile Image

Replace the profile image URL in the hero section:

```jsx
<img 
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
  alt="Profile" 
/>
```

### 3. About Section

Update the about section with your personal story and statistics:

```jsx
// Update your experience description
<p>
  I'm a passionate full-stack developer with a love for creating 
  innovative web solutions...
</p>

// Update your statistics
<div className="about-stats">
  <div className="stat">
    <h3>3+</h3>
    <p>Years Experience</p>
  </div>
  <div className="stat">
    <h3>20+</h3>
    <p>Projects Completed</p>
  </div>
  <div className="stat">
    <h3>15+</h3>
    <p>Happy Clients</p>
  </div>
</div>
```

### 4. Projects Section

Replace the sample projects with your actual projects in the `projects` array:

```jsx
const projects = [
  {
    id: 1,
    title: "Your Project Name",
    description: "A detailed description of your project and what it does.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "https://your-project-image-url.com/image.jpg",
    liveUrl: "https://your-project-live-url.com",
    githubUrl: "https://github.com/yourusername/your-project",
    category: "web"
  },
  // Add more projects...
]
```

**Important**: Make sure to replace the `liveUrl` with the actual working URL of your deployed project!

### 5. Skills Section

Update the skills array with your actual skills and proficiency levels:

```jsx
const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "CSS3", level: 88 },
  { name: "MongoDB", level: 75 },
  { name: "Git", level: 82 }
  // Add more skills...
]
```

### 6. Contact Information

Update your contact details:

```jsx
<div className="contact-details">
  <div className="contact-item">
    <span className="contact-icon">📧</span>
    <span>your.actual.email@example.com</span>
  </div>
  <div className="contact-item">
    <span className="contact-icon">📱</span>
    <span>+1 (555) 123-4567</span>
  </div>
  <div className="contact-item">
    <span className="contact-icon">📍</span>
    <span>Your City, Country</span>
  </div>
</div>
```

### 7. Social Links

Update the footer social links:

```jsx
<div className="footer-social">
  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a>
</div>
```

## 🎯 Project Structure

```
src/
├── App.jsx          # Main component with all sections
├── App.css          # Styles for the portfolio
├── index.css        # Global styles
└── main.jsx         # Entry point
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Add this to your `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## 🎨 Customization Tips

### Colors

The main color scheme uses a purple gradient. You can customize it in `src/App.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Secondary colors */
--primary-color: #667eea;
--secondary-color: #764ba2;
```

### Fonts

The website uses Inter font. You can change it by updating the font import in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700;800&display=swap');
```

### Animations

The website includes smooth animations. You can adjust them in `src/App.css`:

```css
/* Animation duration */
transition: all 0.3s ease;

/* Hover effects */
transform: translateY(-10px);
```

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile hamburger menu
- Responsive grid layouts
- Touch-friendly buttons
- Optimized typography for mobile

## 🔧 Technologies Used

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider sharing them with the community!

## 📞 Support

If you need help customizing your portfolio or have questions, feel free to reach out!

---

**Happy coding! 🚀** 
