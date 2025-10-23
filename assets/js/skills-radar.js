/*===== INTERACTIVE SKILLS RADAR CHART =====*/
class SkillsRadarChart {
    constructor(containerId, skillsData) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.skillsData = skillsData;
        this.centerX = 0;
        this.centerY = 0;
        this.radius = 150;
        this.animationProgress = 0;
        this.targetProgress = 1;
        this.isAnimating = false;
        this.hoveredSkill = null;
        
        this.colors = {
            primary: '#3b82f6',
            secondary: '#10b981',
            accent: '#f59e0b',
            danger: '#ef4444',
            purple: '#8b5cf6',
            pink: '#ec4899',
            cyan: '#06b6d4',
            orange: '#f97316'
        };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.startAnimation();
    }
    
    createCanvas() {
        this.container.innerHTML = `
            <div class="radar-chart-container">
                <canvas id="skills-radar-canvas" class="radar-canvas"></canvas>
                <div class="radar-legend" id="radar-legend"></div>
                <div class="radar-tooltip" id="radar-tooltip" style="display: none;"></div>
            </div>
        `;
        
        this.canvas = document.getElementById('skills-radar-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.createLegend();
    }
    
    resizeCanvas() {
        const containerRect = this.container.getBoundingClientRect();
        const size = Math.min(containerRect.width, 400);
        
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
        
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = Math.min(size / 2 - 50, 150);
    }
    
    createLegend() {
        const legend = document.getElementById('radar-legend');
        const colorKeys = Object.keys(this.colors);
        
        legend.innerHTML = this.skillsData.map((skill, index) => {
            const colorKey = colorKeys[index % colorKeys.length];
            return `
                <div class="legend-item" data-skill="${index}">
                    <div class="legend-color" style="background-color: ${this.colors[colorKey]}"></div>
                    <span class="legend-label">${skill.name}</span>
                    <span class="legend-value">${skill.level}%</span>
                </div>
            `;
        }).join('');
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.draw();
        });
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.handleMouseMove(e);
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredSkill = null;
            this.draw();
            this.hideTooltip();
        });
        
        // Legend hover effects
        const legendItems = document.querySelectorAll('.legend-item');
        legendItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.hoveredSkill = index;
                this.draw();
            });
            
            item.addEventListener('mouseleave', () => {
                this.hoveredSkill = null;
                this.draw();
            });
        });
    }
    
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const dx = x - this.centerX;
        const dy = y - this.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= this.radius) {
            const angle = Math.atan2(dy, dx);
            const normalizedAngle = (angle + Math.PI * 2) % (Math.PI * 2);
            const skillAngle = (Math.PI * 2) / this.skillsData.length;
            
            let hoveredIndex = Math.round(normalizedAngle / skillAngle) % this.skillsData.length;
            
            // Adjust for the starting angle (top of the circle)
            hoveredIndex = (hoveredIndex + Math.floor(this.skillsData.length * 3/4)) % this.skillsData.length;
            
            if (hoveredIndex !== this.hoveredSkill) {
                this.hoveredSkill = hoveredIndex;
                this.draw();
                this.showTooltip(e, this.skillsData[hoveredIndex]);
            }
        } else {
            if (this.hoveredSkill !== null) {
                this.hoveredSkill = null;
                this.draw();
                this.hideTooltip();
            }
        }
    }
    
    showTooltip(e, skill) {
        const tooltip = document.getElementById('radar-tooltip');
        tooltip.innerHTML = `
            <div class="tooltip-skill">${skill.name}</div>
            <div class="tooltip-level">Level: ${skill.level}%</div>
            <div class="tooltip-description">${skill.description || 'Professional experience with this technology'}</div>
        `;
        
        tooltip.style.display = 'block';
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY - 10 + 'px';
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('radar-tooltip');
        tooltip.style.display = 'none';
    }
    
    startAnimation() {
        this.isAnimating = true;
        this.animationProgress = 0;
        this.animate();
    }
    
    animate() {
        if (this.animationProgress < this.targetProgress) {
            this.animationProgress += 0.02;
            if (this.animationProgress > this.targetProgress) {
                this.animationProgress = this.targetProgress;
                this.isAnimating = false;
            }
            
            this.draw();
            requestAnimationFrame(() => this.animate());
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        this.drawSkillsData();
        this.drawLabels();
    }
    
    drawGrid() {
        const steps = 5;
        
        // Draw concentric circles
        for (let i = 1; i <= steps; i++) {
            const r = (this.radius / steps) * i;
            
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, r, 0, Math.PI * 2);
            this.ctx.strokeStyle = i === steps ? 'rgba(59, 130, 246, 0.3)' : 'rgba(100, 116, 139, 0.2)';
            this.ctx.lineWidth = i === steps ? 2 : 1;
            this.ctx.stroke();
            
            // Draw percentage labels
            if (i < steps) {
                const percentage = (i / steps) * 100;
                this.ctx.fillStyle = 'rgba(100, 116, 139, 0.6)';
                this.ctx.font = '10px monospace';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`${percentage}%`, this.centerX, this.centerY - r + 15);
            }
        }
        
        // Draw radial lines
        const angleStep = (Math.PI * 2) / this.skillsData.length;
        for (let i = 0; i < this.skillsData.length; i++) {
            const angle = i * angleStep - Math.PI / 2; // Start from top
            const x = this.centerX + Math.cos(angle) * this.radius;
            const y = this.centerY + Math.sin(angle) * this.radius;
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.centerX, this.centerY);
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    
    drawSkillsData() {
        const angleStep = (Math.PI * 2) / this.skillsData.length;
        const points = [];
        const colorKeys = Object.keys(this.colors);
        
        // Calculate points
        for (let i = 0; i < this.skillsData.length; i++) {
            const skill = this.skillsData[i];
            const angle = i * angleStep - Math.PI / 2;
            const skillRadius = (skill.level / 100) * this.radius * this.animationProgress;
            
            const x = this.centerX + Math.cos(angle) * skillRadius;
            const y = this.centerY + Math.sin(angle) * skillRadius;
            
            points.push({ x, y, skill, index: i });
        }
        
        // Draw filled area
        if (points.length > 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                this.ctx.lineTo(points[i].x, points[i].y);
            }
            
            this.ctx.closePath();
            
            // Create gradient
            const gradient = this.ctx.createRadialGradient(
                this.centerX, this.centerY, 0,
                this.centerX, this.centerY, this.radius
            );
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
            gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.2)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Draw border
            this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
        
        // Draw individual skill points
        points.forEach((point, index) => {
            const colorKey = colorKeys[index % colorKeys.length];
            const isHovered = this.hoveredSkill === index;
            const pointSize = isHovered ? 8 : 5;
            
            // Draw glow effect for hovered point
            if (isHovered) {
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, pointSize + 5, 0, Math.PI * 2);
                this.ctx.fillStyle = this.colors[colorKey] + '30';
                this.ctx.fill();
            }
            
            // Draw main point
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
            this.ctx.fillStyle = this.colors[colorKey];
            this.ctx.fill();
            
            // Add white border
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
    }
    
    drawLabels() {
        const angleStep = (Math.PI * 2) / this.skillsData.length;
        
        this.skillsData.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const labelRadius = this.radius + 30;
            const x = this.centerX + Math.cos(angle) * labelRadius;
            const y = this.centerY + Math.sin(angle) * labelRadius;
            
            const isHovered = this.hoveredSkill === index;
            
            this.ctx.fillStyle = isHovered ? '#3b82f6' : '#64748b';
            this.ctx.font = isHovered ? 'bold 12px sans-serif' : '11px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Add background for better readability
            const textMetrics = this.ctx.measureText(skill.name);
            const textWidth = textMetrics.width;
            const textHeight = 16;
            
            this.ctx.fillStyle = isHovered ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(x - textWidth/2 - 4, y - textHeight/2, textWidth + 8, textHeight);
            
            this.ctx.fillStyle = isHovered ? '#3b82f6' : '#e2e8f0';
            this.ctx.fillText(skill.name, x, y);
        });
    }
    
    // Public method to update skills data
    updateSkills(newSkillsData) {
        this.skillsData = newSkillsData;
        this.createLegend();
        this.startAnimation();
    }
    
    // Public method to restart animation
    restartAnimation() {
        this.startAnimation();
    }
}

// Initialize skills radar chart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Sample skills data - replace with your actual skills
    const skillsData = [
        { name: 'C# / .NET', level: 95, description: '3+ years of professional experience with ASP.NET Core, Entity Framework, and enterprise applications' },
        { name: 'JavaScript', level: 90, description: 'Advanced proficiency in modern JavaScript, ES6+, and asynchronous programming' },
        { name: 'React.js', level: 85, description: 'Building responsive, interactive user interfaces with hooks, context, and modern patterns' },
        { name: 'SQL Server', level: 90, description: 'Database design, complex queries, stored procedures, and performance optimization' },
        { name: 'Azure Cloud', level: 80, description: 'Cloud deployment, serverless functions, and Azure services integration' },
        { name: 'Python', level: 75, description: 'Data analysis, automation scripts, and machine learning projects' },
        { name: 'Docker', level: 70, description: 'Containerization, deployment automation, and DevOps practices' },
        { name: 'Git/GitHub', level: 95, description: 'Version control, collaborative development, and open source contributions' }
    ];
    
    const skillsRadar = new SkillsRadarChart('skills-radar-container', skillsData);
    
    // Intersection Observer to restart animation when section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsRadar.restartAnimation();
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});