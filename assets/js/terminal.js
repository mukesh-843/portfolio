/*===== INTERACTIVE TERMINAL =====*/
class InteractiveTerminal {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.terminalBody = null;
        this.input = null;
        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentDirectory = '~';
        this.username = 'visitor';
        this.hostname = 'mukesh-portfolio';
        
        this.commands = {
            help: {
                description: 'Show available commands',
                execute: () => {
                    return `
<span class="terminal-info">Available commands:</span>

<span class="terminal-command">help</span>        - Show this help message
<span class="terminal-command">about</span>       - Learn about Mukesh Gautam
<span class="terminal-command">skills</span>      - View technical skills and expertise
<span class="terminal-command">projects</span>    - Browse portfolio projects
<span class="terminal-command">experience</span>  - Show work experience and internships
<span class="terminal-command">education</span>   - Display educational background
<span class="terminal-command">contact</span>     - Get contact information
<span class="terminal-command">social</span>      - Show social media links
<span class="terminal-command">blog</span>        - Visit personal blog
<span class="terminal-command">resume</span>      - Download CV/Resume
<span class="terminal-command">clear</span>       - Clear terminal screen
<span class="terminal-command">whoami</span>      - Display current user
<span class="terminal-command">date</span>        - Show current date and time
<span class="terminal-command">cat &lt;file&gt;</span> - Display file contents (try: readme.txt, skills.json)
<span class="terminal-command">ls</span>          - List available files
<span class="terminal-command">pwd</span>         - Show current directory
<span class="terminal-command">joke</span>        - Get a programming joke
<span class="terminal-command">quote</span>       - Get an inspirational quote

<span class="terminal-success">Tip: Use ↑/↓ arrow keys to navigate command history</span>`;
                }
            },
            
            about: {
                description: 'Information about Mukesh Gautam',
                execute: () => {
                    return `
<span class="terminal-info">About Mukesh Gautam</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-success">👨‍💻 .NET Full Stack Developer</span>
<span class="terminal-text">🎓 Computer Science & Engineering Graduate from SMIT</span>
<span class="terminal-text">🚀 Passionate about creating innovative web solutions</span>
<span class="terminal-text">💡 Experienced in modern web technologies and cloud platforms</span>

<span class="terminal-highlight">Core Expertise:</span>
• Full-stack web development with .NET and React
• Cloud development with Microsoft Azure
• Database design and optimization
• API development and integration
• Modern frontend frameworks and responsive design

<span class="terminal-highlight">Current Focus:</span>
• Building scalable web applications
• Exploring AI/ML integration in web apps
• Contributing to open-source projects
• Writing technical blogs and tutorials

<span class="terminal-command">Type 'experience' to see work history or 'skills' for technical expertise</span>`;
                }
            },
            
            skills: {
                description: 'Technical skills and expertise',
                execute: () => {
                    return `
<span class="terminal-info">Technical Skills & Expertise</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">💻 Programming Languages:</span>
  C# ████████████████████ 95%
  JavaScript ██████████████████ 90%
  Python ████████████████ 80%
  SQL ██████████████████ 90%
  TypeScript ███████████████ 75%

<span class="terminal-highlight">🌐 Web Technologies:</span>
  ASP.NET Core ████████████████████ 95%
  React.js ██████████████████ 90%
  HTML5/CSS3 ████████████████████ 95%
  Bootstrap ██████████████████ 90%
  jQuery ███████████████ 75%

<span class="terminal-highlight">☁️ Cloud & DevOps:</span>
  Microsoft Azure ██████████████████ 90%
  Docker ███████████████ 75%
  Git/GitHub ████████████████████ 95%
  CI/CD ██████████████ 70%

<span class="terminal-highlight">🗄️ Databases:</span>
  SQL Server ██████████████████ 90%
  MySQL ███████████████ 75%
  MongoDB ██████████████ 70%

<span class="terminal-success">Total Projects Completed: 50+</span>
<span class="terminal-success">Years of Experience: 2+</span>

<span class="terminal-command">Type 'projects' to see portfolio work</span>`;
                }
            },
            
            projects: {
                description: 'Portfolio projects',
                execute: () => {
                    return `
<span class="terminal-info">Portfolio Projects</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">🚀 Featured Projects:</span>

<span class="terminal-success">1. E-Commerce Web Application</span>
   ├── Tech Stack: ASP.NET Core, React, SQL Server
   ├── Features: Payment gateway, inventory management
   └── Status: Live & Deployed ✅

<span class="terminal-success">2. Task Management System</span>
   ├── Tech Stack: .NET, Entity Framework, Bootstrap
   ├── Features: Real-time updates, team collaboration
   └── Status: Completed ✅

<span class="terminal-success">3. Weather Forecast App</span>
   ├── Tech Stack: React, REST APIs, Chart.js
   ├── Features: Real-time weather, data visualization
   └── Status: Open Source 🌟

<span class="terminal-success">4. Inventory Management System</span>
   ├── Tech Stack: ASP.NET MVC, SQL Server
   ├── Features: CRUD operations, reporting
   └── Status: Enterprise Ready 💼

<span class="terminal-success">5. Personal Blog Platform</span>
   ├── Tech Stack: .NET Core, Razor Pages
   ├── Features: CMS, SEO optimization
   └── Status: Live Blog 📝

<span class="terminal-text">📊 GitHub Stats: 100+ commits this year</span>
<span class="terminal-text">⭐ Public Repositories: 25+</span>

<span class="terminal-command">Visit GitHub: https://github.com/mukesh-843</span>`;
                }
            },
            
            experience: {
                description: 'Work experience and internships',
                execute: () => {
                    return `
<span class="terminal-info">Professional Experience</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">💼 Current Position:</span>
<span class="terminal-success">Project Engineer</span> | Wipro Limited
📅 Duration: 2022 - Present
🎯 Focus: .NET Development, Cloud Solutions, Team Leadership

<span class="terminal-text">Key Achievements:</span>
• Led development of enterprise web applications
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored junior developers and conducted code reviews
• Collaborated with cross-functional teams on critical projects

<span class="terminal-highlight">🎓 Academic Projects & Internships:</span>
• Software Development Intern - Various Projects
• Final Year Project: Advanced Web Application Development
• Technical Lead in multiple college projects
• Active participation in coding competitions

<span class="terminal-highlight">🏆 Certifications & Training:</span>
• Microsoft Azure Fundamentals
• .NET Core Development Certification
• React.js Professional Development
• Agile & Scrum Methodologies

<span class="terminal-command">Type 'education' for academic background</span>`;
                }
            },
            
            education: {
                description: 'Educational background',
                execute: () => {
                    return `
<span class="terminal-info">Educational Background</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">🎓 Bachelor of Technology</span>
<span class="terminal-success">Computer Science & Engineering</span>
🏫 Sikkim Manipal Institute Of Technology (SMIT)
📅 2018 - 2022
🎯 Grade: First Class with Distinction

<span class="terminal-text">Relevant Coursework:</span>
• Data Structures & Algorithms
• Object-Oriented Programming
• Database Management Systems
• Software Engineering
• Web Technologies
• Computer Networks
• Machine Learning Fundamentals

<span class="terminal-highlight">🏆 Academic Achievements:</span>
• Consistent academic performance throughout the program
• Active member of coding club and technical societies
• Participated in inter-college programming competitions
• Led team projects and technical presentations

<span class="terminal-highlight">📚 Continuous Learning:</span>
• Online courses in modern web frameworks
• Cloud computing certifications
• Open source contributions
• Technical blog writing

<span class="terminal-command">Type 'skills' to see technical expertise gained</span>`;
                }
            },
            
            contact: {
                description: 'Contact information',
                execute: () => {
                    return `
<span class="terminal-info">Contact Information</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">📧 Email:</span>
<span class="terminal-success">mukeshgautam.dev@gmail.com</span>

<span class="terminal-highlight">💼 LinkedIn:</span>
<span class="terminal-link">https://www.linkedin.com/in/mukesh-gautam-a9a79820a/</span>

<span class="terminal-highlight">🐙 GitHub:</span>
<span class="terminal-link">https://github.com/mukesh-843</span>

<span class="terminal-highlight">📝 Personal Blog:</span>
<span class="terminal-link">https://musingwithmukesh.blogspot.com/</span>

<span class="terminal-highlight">📍 Location:</span>
<span class="terminal-text">India (Open for Remote Opportunities)</span>

<span class="terminal-highlight">⏰ Response Time:</span>
<span class="terminal-success">Usually within 24 hours</span>

<span class="terminal-text">Feel free to reach out for:</span>
• Job opportunities and collaborations
• Technical discussions and consultations
• Open source contributions
• Mentorship and knowledge sharing

<span class="terminal-command">Type 'social' for more social links</span>`;
                }
            },
            
            social: {
                description: 'Social media and online presence',
                execute: () => {
                    return `
<span class="terminal-info">Social Media & Online Presence</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-highlight">🔗 Professional Networks:</span>
<span class="terminal-link">LinkedIn</span> → https://www.linkedin.com/in/mukesh-gautam-a9a79820a/
<span class="terminal-link">GitHub</span>   → https://github.com/mukesh-843

<span class="terminal-highlight">📝 Content & Blogs:</span>
<span class="terminal-link">Personal Blog</span> → https://musingwithmukesh.blogspot.com/
<span class="terminal-text">Topics: Web Development, .NET, Tech Tutorials</span>

<span class="terminal-highlight">💻 Code Repositories:</span>
<span class="terminal-success">Public Repos:</span> 25+ projects
<span class="terminal-success">Languages:</span> C#, JavaScript, Python, SQL
<span class="terminal-success">Contributions:</span> Open source projects

<span class="terminal-highlight">🎯 Professional Focus:</span>
• Sharing knowledge through technical blogs
• Contributing to developer community
• Collaborating on innovative projects
• Building meaningful professional connections

<span class="terminal-command">Type 'blog' to visit the personal blog</span>`;
                }
            },
            
            blog: {
                description: 'Visit personal blog',
                execute: () => {
                    setTimeout(() => {
                        window.open('https://musingwithmukesh.blogspot.com/', '_blank');
                    }, 1000);
                    return `
<span class="terminal-info">Opening Personal Blog...</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-success">🚀 Launching: Musing with Mukesh</span>

<span class="terminal-text">Blog Features:</span>
• In-depth tutorials on web development
• .NET Core and React.js guides
• Cloud computing insights
• Programming best practices
• Career advice for developers

<span class="terminal-text">Recent Topics:</span>
• Building Scalable APIs with ASP.NET Core
• React Hooks: Advanced Patterns
• Azure Deployment Strategies
• Database Optimization Techniques

<span class="terminal-highlight">Opening in new tab...</span> 🌐`;
                }
            },
            
            resume: {
                description: 'Download CV/Resume',
                execute: () => {
                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.href = 'Mukesh_Gautam_C.pdf';
                        link.download = 'Mukesh_Gautam_Resume.pdf';
                        link.click();
                    }, 1000);
                    return `
<span class="terminal-info">Downloading Resume...</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-success">📄 Mukesh Gautam - Resume.pdf</span>

<span class="terminal-text">Document includes:</span>
• Professional summary and objectives
• Technical skills and competencies
• Work experience and achievements
• Educational background
• Project portfolio highlights
• Certifications and training

<span class="terminal-highlight">Download starting...</span> ⬇️

<span class="terminal-text">File format: PDF</span>
<span class="terminal-text">Last updated: 2025</span>`;
                }
            },
            
            clear: {
                description: 'Clear terminal screen',
                execute: () => {
                    this.clearTerminal();
                    return '';
                }
            },
            
            whoami: {
                description: 'Display current user',
                execute: () => `<span class="terminal-success">${this.username}</span>`
            },
            
            date: {
                description: 'Show current date and time',
                execute: () => {
                    const now = new Date();
                    return `<span class="terminal-text">${now.toLocaleString()}</span>`;
                }
            },
            
            pwd: {
                description: 'Show current directory',
                execute: () => `<span class="terminal-text">${this.currentDirectory}</span>`
            },
            
            ls: {
                description: 'List available files',
                execute: () => {
                    return `
<span class="terminal-info">Available files:</span>

<span class="terminal-file">readme.txt</span>      - About this portfolio
<span class="terminal-file">skills.json</span>    - Technical skills data
<span class="terminal-file">projects.md</span>    - Project documentation
<span class="terminal-file">contact.info</span>   - Contact details
<span class="terminal-file">resume.pdf</span>     - CV/Resume document

<span class="terminal-text">Use 'cat &lt;filename&gt;' to view file contents</span>`;
                }
            },
            
            cat: {
                description: 'Display file contents',
                execute: (args) => {
                    const filename = args[0];
                    const files = {
                        'readme.txt': `
<span class="terminal-info">README - Mukesh Gautam Portfolio</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Welcome to my interactive portfolio terminal!

This portfolio showcases my journey as a .NET Full Stack Developer
with expertise in modern web technologies and cloud platforms.

<span class="terminal-highlight">Features:</span>
• Interactive 3D code visualization
• Real-time GitHub integration
• Responsive design and animations
• Terminal-based navigation
• Live project demos

<span class="terminal-highlight">Technologies Used:</span>
Frontend: HTML5, CSS3, JavaScript, Three.js
Backend: ASP.NET Core, Entity Framework
Database: SQL Server, MySQL
Cloud: Microsoft Azure
Tools: Git, Docker, VS Code

<span class="terminal-success">Thanks for visiting! Type 'help' for available commands.</span>`,
                        
                        'skills.json': `
<span class="terminal-info">skills.json</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "programming_languages": {
    "C#": { "level": 95, "experience": "3+ years" },
    "JavaScript": { "level": 90, "experience": "3+ years" },
    "Python": { "level": 80, "experience": "2+ years" },
    "SQL": { "level": 90, "experience": "3+ years" },
    "TypeScript": { "level": 75, "experience": "1+ years" }
  },
  "frameworks": {
    "ASP.NET Core": { "level": 95, "projects": 15 },
    "React.js": { "level": 90, "projects": 12 },
    "Entity Framework": { "level": 90, "projects": 20 },
    "Bootstrap": { "level": 90, "projects": 25 }
  },
  "tools": {
    "Visual Studio": { "level": 95 },
    "VS Code": { "level": 95 },
    "Git": { "level": 95 },
    "Docker": { "level": 75 },
    "Azure": { "level": 90 }
  },
  "soft_skills": [
    "Problem Solving",
    "Team Leadership",
    "Communication",
    "Project Management",
    "Mentoring"
  ]
}`,
                        
                        'projects.md': `
<span class="terminal-info">projects.md - Project Portfolio</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Featured Projects

## 🛒 E-Commerce Platform
**Tech Stack:** ASP.NET Core, React, SQL Server, Azure
**Description:** Full-featured online shopping platform
**Features:** Payment integration, inventory management, admin panel
**Status:** Production-ready ✅

## 📋 Task Management System  
**Tech Stack:** .NET MVC, Entity Framework, Bootstrap
**Description:** Collaborative project management tool
**Features:** Real-time updates, team collaboration, reporting
**Status:** Enterprise deployment ✅

## 🌤️ Weather Forecast App
**Tech Stack:** React, REST APIs, Chart.js
**Description:** Real-time weather application
**Features:** Location-based forecasts, data visualization
**Status:** Open source 🌟

## 📦 Inventory Management
**Tech Stack:** ASP.NET MVC, SQL Server, Crystal Reports
**Description:** Enterprise inventory tracking system
**Features:** CRUD operations, automated reporting, analytics
**Status:** Live production system 💼

<span class="terminal-success">View all projects: github.com/mukesh-843</span>`,
                        
                        'contact.info': `
<span class="terminal-info">contact.info</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAME: Mukesh Gautam
TITLE: .NET Full Stack Developer
EMAIL: mukeshgautam.dev@gmail.com

PROFESSIONAL:
LinkedIn: https://www.linkedin.com/in/mukesh-gautam-a9a79820a/
GitHub: https://github.com/mukesh-843
Blog: https://musingwithmukesh.blogspot.com/

LOCATION: India
TIMEZONE: IST (UTC+5:30)
AVAILABILITY: Open for opportunities

EXPERTISE:
- Full Stack Web Development
- Cloud Solutions (Azure)
- API Design & Development
- Database Management
- Team Leadership

INTERESTS:
- Open Source Contributions
- Technical Writing
- Mentoring Developers
- Learning New Technologies

<span class="terminal-success">Response time: Usually within 24 hours</span>`
                    };
                    
                    return files[filename] || `<span class="terminal-error">cat: ${filename}: No such file or directory</span>`;
                }
            },
            
            joke: {
                description: 'Get a programming joke',
                execute: () => {
                    const jokes = [
                        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
                        "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                        "Why do Java developers wear glasses? Because they can't C# 👓",
                        "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?' 🍺",
                        "Why don't programmers like nature? It has too many bugs! 🌿🐛",
                        "What's a programmer's favorite hangout place? Foo Bar! 🍻",
                        "Why did the developer go broke? Because he used up all his cache! 💸",
                        "How do you comfort a JavaScript bug? You console it! 🤗"
                    ];
                    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                    return `<span class="terminal-success">${randomJoke}</span>`;
                }
            },
            
            quote: {
                description: 'Get an inspirational quote',
                execute: () => {
                    const quotes = [
                        "\"Code is like humor. When you have to explain it, it's bad.\" - Cory House",
                        "\"First, solve the problem. Then, write the code.\" - John Johnson",
                        "\"Experience is the name everyone gives to their mistakes.\" - Oscar Wilde",
                        "\"The best error message is the one that never shows up.\" - Thomas Fuchs",
                        "\"Simplicity is the soul of efficiency.\" - Austin Freeman",
                        "\"Make it work, make it right, make it fast.\" - Kent Beck",
                        "\"Clean code always looks like it was written by someone who cares.\" - Robert C. Martin",
                        "\"The only way to learn a new programming language is by writing programs in it.\" - Dennis Ritchie"
                    ];
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    return `<span class="terminal-text">${randomQuote}</span>`;
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.createTerminal();
        this.setupEventListeners();
        this.showWelcomeMessage();
    }
    
    createTerminal() {
        this.container.innerHTML = `
            <div class="terminal-header">
                <div class="terminal-controls">
                    <span class="terminal-button terminal-close"></span>
                    <span class="terminal-button terminal-minimize"></span>
                    <span class="terminal-button terminal-maximize"></span>
                </div>
                <div class="terminal-title">mukesh@portfolio:~$</div>
            </div>
            <div class="terminal-body" id="terminal-body">
                <div class="terminal-output" id="terminal-output"></div>
                <div class="terminal-input-line">
                    <span class="terminal-prompt">${this.username}@${this.hostname}:${this.currentDirectory}$ </span>
                    <input type="text" class="terminal-input" id="terminal-input" autocomplete="off" autofocus>
                </div>
            </div>
        `;
        
        this.terminalBody = document.getElementById('terminal-body');
        this.input = document.getElementById('terminal-input');
    }
    
    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });
        
        // Focus input when clicking on terminal
        this.container.addEventListener('click', () => {
            this.input.focus();
        });
        
        // Auto-focus when scrolling into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.input.focus();
                }
            });
        });
        observer.observe(this.container);
    }
    
    processCommand(command) {
        if (!command) return;
        
        // Add to history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        // Display command
        this.addOutput(`<span class="terminal-prompt">${this.username}@${this.hostname}:${this.currentDirectory}$ </span><span class="terminal-input-echo">${command}</span>`);
        
        // Parse command and arguments
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Execute command
        if (this.commands[cmd]) {
            const output = this.commands[cmd].execute(args);
            if (output) {
                this.addOutput(output);
            }
        } else {
            this.addOutput(`<span class="terminal-error">Command not found: ${cmd}. Type 'help' for available commands.</span>`);
        }
        
        this.scrollToBottom();
    }
    
    addOutput(content) {
        const output = document.getElementById('terminal-output');
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = content;
        output.appendChild(line);
    }
    
    clearTerminal() {
        document.getElementById('terminal-output').innerHTML = '';
        this.showWelcomeMessage();
    }
    
    showWelcomeMessage() {
        const welcomeMessage = `
<span class="terminal-info">Welcome to Mukesh Gautam's Interactive Portfolio Terminal!</span>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<span class="terminal-success">System initialized successfully ✅</span>
<span class="terminal-text">Version: 1.0.0 | Last updated: ${new Date().toDateString()}</span>

<span class="terminal-highlight">👋 Hello! I'm Mukesh Gautam</span>
<span class="terminal-text">  .NET Full Stack Developer | Cloud Enthusiast | Tech Blogger</span>

<span class="terminal-command">Type 'help' to see available commands or 'about' to learn more about me.</span>
<span class="terminal-text">Use ↑/↓ arrow keys to navigate through command history.</span>

<span class="terminal-info">Ready for your commands...</span>`;
        
        this.addOutput(welcomeMessage);
    }
    
    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = '';
        }
    }
    
    scrollToBottom() {
        this.terminalBody.scrollTop = this.terminalBody.scrollHeight;
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new InteractiveTerminal('interactive-terminal');
});