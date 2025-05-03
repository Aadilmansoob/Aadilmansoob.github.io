// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  currentTheme = newTheme;
});

// ===== GitHub Projects Fetch =====
// Modified fetchGitHubProjects function with image support
// Updated with better error handling and logging
const fetchGitHubProjects = async () => {
    const projectGrid = document.querySelector('.project-grid');
    
    try {
      console.log('Fetching GitHub projects...');
      const response = await fetch('https://api.github.com/users/YOUR_GITHUB_USERNAME/repos');
      
      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status}`);
      }
      
      const repos = await response.json();
      console.log('Found repositories:', repos);
  
      // Clear loading state
      projectGrid.innerHTML = '';
  
      // Add projects to DOM
      repos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
          <img src="assets/images/project-placeholder.jpg" alt="${repo.name}" loading="lazy">
          <div class="project-card-content">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available'}</p>
            <div class="project-links">
              <a href="${repo.html_url}" target="_blank" class="btn">View Code</a>
            </div>
          </div>
        `;
        projectGrid.appendChild(projectCard);
      });
  
    } catch (error) {
      console.error('Error:', error.message);
      projectGrid.innerHTML = `
        <div class="error-message">
          <p>⚠️ Projects failed to load. Showing demo projects instead.</p>
          ${getManualProjects()}
        </div>
      `;
    }
  };
  
  // Manual projects fallback
  const getManualProjects = () => {
    const manualProjects = [
      {
        name: "E-Commerce Platform",
        description: "Online shopping website with React",
        image: "assets/images/project1.jpg",
        url: "#"
      },
      {
        name: "Portfolio Website",
        description: "Responsive personal portfolio",
        image: "assets/images/project2.jpg",
        url: "#"
      }
    ];
  
    return manualProjects.map(project => `
      <div class="project-card">
        <img src="${project.image}" alt="${project.name}">
        <div class="project-card-content">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
          <a href="${project.url}" class="btn">View Project</a>
        </div>
      </div>
    `).join('');
  };
// ===== Skills Render =====
const skills = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Git', 'Responsive Design'];
const skillsContainer = document.querySelector('.skills-container');

skills.forEach(skill => {
  const skillElement = document.createElement('div');
  skillElement.className = 'skill';
  skillElement.textContent = skill;
  skillsContainer.appendChild(skillElement);
});

// ===== Three.js Scene =====
const initThreeJS = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  const container = document.getElementById('threejs-container');

  // Set renderer size
  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);

  // Create geometry
  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0x009FFD,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 5;

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;
    renderer.render(scene, camera);
  };

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  });

  animate();
};

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  AOS.init();
  fetchGitHubProjects();
  initThreeJS();
});

// ===== Form Submission =====
document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Add your form submission logic here
  // Example: Netlify form handling or Formspree
  alert('Thank you for your message! I\'ll respond shortly.');
  e.target.reset();
});