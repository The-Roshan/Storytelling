// script.js

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create the background with animated bubbles
const bubbleCount = 100;
const bubbles = [];

const bubbleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const bubbleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true,
    blending: THREE.AdditiveBlending
});

for (let i = 0; i < bubbleCount; i++) {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.set(
        Math.random() * 200 - 100,
        Math.random() * 200 - 100,
        Math.random() * 200 - 100
    );
    bubble.scale.setScalar(Math.random() * 2 + 0.5);
    scene.add(bubble);
    bubbles.push(bubble);
}

// Add a point light for better visibility of bubbles
const pointLight = new THREE.PointLight(0xffffff, 1, 500);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Position the camera
camera.position.z = 50;

// Animation function
function animate() {
    requestAnimationFrame(animate);

    // Animate bubbles
    bubbles.forEach(bubble => {
        bubble.position.y += 0.1;
        if (bubble.position.y > 100) bubble.position.y = -100;
    });

    renderer.render(scene, camera);
}

// Adjust the canvas size when the window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Start the animation
animate();
