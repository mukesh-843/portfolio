/*===== INTERACTIVE 3D CODE CUBE =====*/
class CodeCube {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.isMouseDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;
        
        this.codeSnippets = [
            // Front Face - C#/.NET
            `// C# - ASP.NET Core API
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user == null ? NotFound() : Ok(user);
    }
}`,
            // Back Face - JavaScript/React
            `// React - Functional Component with Hooks
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(\`/api/users/\${userId}\`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};`,
            // Left Face - SQL
            `-- SQL - Complex Query with CTEs
WITH UserStats AS (
    SELECT 
        u.UserId,
        u.Name,
        COUNT(p.ProjectId) as ProjectCount,
        AVG(p.Rating) as AvgRating
    FROM Users u
    LEFT JOIN Projects p ON u.UserId = p.UserId
    WHERE u.IsActive = 1
    GROUP BY u.UserId, u.Name
),
TopUsers AS (
    SELECT 
        UserId,
        Name,
        ProjectCount,
        AvgRating,
        ROW_NUMBER() OVER (ORDER BY ProjectCount DESC, AvgRating DESC) as Rank
    FROM UserStats
    WHERE ProjectCount > 0
)
SELECT * FROM TopUsers
WHERE Rank <= 10;`,
            // Right Face - Python
            `# Python - Machine Learning with Pandas & Scikit-learn
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

class MLModelTrainer:
    def __init__(self, data_path):
        self.data = pd.read_csv(data_path)
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        
    def preprocess_data(self):
        # Handle missing values
        self.data = self.data.fillna(self.data.mean())
        
        # Feature engineering
        X = self.data.drop('target', axis=1)
        y = self.data['target']
        
        return train_test_split(X, y, test_size=0.2, random_state=42)
    
    def train_and_evaluate(self):
        X_train, X_test, y_train, y_test = self.preprocess_data()
        
        self.model.fit(X_train, y_train)
        predictions = self.model.predict(X_test)
        
        accuracy = accuracy_score(y_test, predictions)
        print(f"Model Accuracy: {accuracy:.2f}")
        
        return self.model`,
            // Top Face - Azure/Cloud
            `// Azure Functions - Serverless API
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

public class WeatherFunction
{
    private readonly ILogger _logger;
    private readonly IWeatherService _weatherService;

    public WeatherFunction(ILoggerFactory loggerFactory, IWeatherService weatherService)
    {
        _logger = loggerFactory.CreateLogger<WeatherFunction>();
        _weatherService = weatherService;
    }

    [Function("GetWeather")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req)
    {
        _logger.LogInformation("Weather API called");

        var city = req.Query["city"];
        if (string.IsNullOrEmpty(city))
        {
            var badResponse = req.CreateResponse(HttpStatusCode.BadRequest);
            await badResponse.WriteStringAsync("City parameter is required");
            return badResponse;
        }

        var weather = await _weatherService.GetWeatherAsync(city);
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(weather);
        
        return response;
    }
}`,
            // Bottom Face - Docker/DevOps
            `# Dockerfile - Multi-stage .NET Application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy source code and build
COPY . ./
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/out ./

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:80/health || exit 1

EXPOSE 80
ENTRYPOINT ["dotnet", "MyApp.dll"]

# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8080:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    depends_on:
      - database
  
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123`
        ];
        
        this.init();
    }
    
    init() {
        this.createScene();
        this.createCube();
        this.setupEventListeners();
        this.animate();
    }
    
    createScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f172a);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.camera.position.z = 4;
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    createCube() {
        const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
        
        // Create materials for each face
        const materials = this.codeSnippets.map((code, index) => {
            // Create canvas for code text
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 512;
            canvas.height = 512;
            
            // Background
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Code text
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '11px "Fira Code", monospace';
            
            const lines = code.split('\n');
            const lineHeight = 14;
            let y = 20;
            
            lines.forEach(line => {
                if (y < canvas.height - 10) {
                    // Syntax highlighting colors
                    if (line.includes('//') || line.includes('#') || line.includes('--')) {
                        ctx.fillStyle = '#64748b'; // Comments
                    } else if (line.includes('public') || line.includes('class') || line.includes('function') || line.includes('const') || line.includes('import') || line.includes('FROM') || line.includes('SELECT')) {
                        ctx.fillStyle = '#3b82f6'; // Keywords
                    } else if (line.includes('"') || line.includes("'")) {
                        ctx.fillStyle = '#10b981'; // Strings
                    } else {
                        ctx.fillStyle = '#e2e8f0'; // Default
                    }
                    
                    ctx.fillText(line.substring(0, 60), 10, y);
                    y += lineHeight;
                }
            });
            
            // Language label
            const languages = ['C#/.NET', 'React/JS', 'SQL', 'Python', 'Azure', 'Docker'];
            ctx.fillStyle = '#2563eb';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(languages[index], 10, canvas.height - 20);
            
            const texture = new THREE.CanvasTexture(canvas);
            return new THREE.MeshLambertMaterial({ map: texture });
        });
        
        this.cube = new THREE.Mesh(geometry, materials);
        this.scene.add(this.cube);
    }
    
    setupEventListeners() {
        const canvas = this.renderer.domElement;
        
        canvas.addEventListener('mousedown', (event) => {
            this.isMouseDown = true;
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            canvas.style.cursor = 'grabbing';
        });
        
        canvas.addEventListener('mousemove', (event) => {
            if (this.isMouseDown) {
                const deltaX = event.clientX - this.mouseX;
                const deltaY = event.clientY - this.mouseY;
                
                this.targetRotationY += deltaX * 0.01;
                this.targetRotationX += deltaY * 0.01;
                
                this.mouseX = event.clientX;
                this.mouseY = event.clientY;
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
            canvas.style.cursor = 'grab';
        });
        
        canvas.addEventListener('mouseleave', () => {
            this.isMouseDown = false;
            canvas.style.cursor = 'grab';
        });
        
        // Auto-rotate when not interacting
        canvas.addEventListener('mouseenter', () => {
            this.autoRotate = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!this.isMouseDown) {
                    this.autoRotate = true;
                }
            }, 2000);
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        });
        
        // Initial cursor style
        canvas.style.cursor = 'grab';
        this.autoRotate = true;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth rotation interpolation
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;
        
        // Auto-rotate
        if (this.autoRotate && !this.isMouseDown) {
            this.targetRotationY += 0.005;
        }
        
        this.cube.rotation.x = this.currentRotationX;
        this.cube.rotation.y = this.currentRotationY;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        const codeCube = new CodeCube('code-cube-container');
    } else {
        console.error('Three.js not loaded');
    }
});