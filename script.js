let blackHole;
let particles = [];
let objects = []; // Array to hold stars, galaxies, etc.
let photonSphereRadius;
let eventHorizonRadius;

function setup() {
  createCanvas(800, 600);

  // Initialize black hole
  blackHole = {
    x: width / 2,
    y: height / 2,
    mass: 10000,
    radius: 30
  };

  // Calculate radii for photon sphere and event horizon
  photonSphereRadius = blackHole.radius * 1.5;
  eventHorizonRadius = blackHole.radius;

  // Create particles for accretion disk
  for (let i = 0; i < 200; i++) {
    let angle = random(TWO_PI);
    let radius = random(eventHorizonRadius + 50, width / 2);
    particles.push({
      x: blackHole.x + radius * cos(angle),
      y: blackHole.y + radius * sin(angle),
      vx: random(-1, 1),
      vy: random(-1, 1),
      mass: random(1, 3)
    });
  }

  // Add event listeners for buttons
  document.getElementById('add-star').addEventListener('click', addStar);
  document.getElementById('add-galaxy').addEventListener('click', addGalaxy);
}

function draw() {
  background(0);

  // Draw black hole
  drawBlackHole();

  // Draw accretion disk
  drawAccretionDisk();

  // Draw photon sphere
  drawPhotonSphere();

  // Draw objects (stars, galaxies, etc.)
  drawObjects();

  // Simulate gravitational lensing
  drawGravitationalLensing();
}

function drawBlackHole() {
  // Event horizon
  noStroke();
  fill(0);
  ellipse(blackHole.x, blackHole.y, eventHorizonRadius * 2, eventHorizonRadius * 2);

  // Glow effect
  for (let i = 0; i < 10; i++) {
    let alpha = map(i, 0, 10, 50, 0);
    let radius = map(i, 0, 10, eventHorizonRadius * 2, eventHorizonRadius * 3);
    fill(255, 0, 0, alpha);
    ellipse(blackHole.x, blackHole.y, radius, radius);
  }
}

function drawAccretionDisk() {
  for (let particle of particles) {
    // Calculate gravitational force
    let dx = blackHole.x - particle.x;
    let dy = blackHole.y - particle.y;
    let distance = sqrt(dx * dx + dy * dy);
    let force = (blackHole.mass * particle.mass) / (distance * distance);

    // Apply force
    particle.vx += (force * dx / distance) * 0.01;
    particle.vy += (force * dy / distance) * 0.01;

    // Update position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Draw particle
    fill(100, 150, 255, 150);
    noStroke();
    ellipse(particle.x, particle.y, particle.mass, particle.mass);

    // Remove particles that get too close to the black hole
    if (distance < eventHorizonRadius) {
      particles.splice(particles.indexOf(particle), 1);
    }
  }

  // Add new particles to simulate continuous accretion
  if (frameCount % 10 === 0) {
    let angle = random(TWO_PI);
    let radius = random(eventHorizonRadius + 50, width / 2);
    particles.push({
      x: blackHole.x + radius * cos(angle),
      y: blackHole.y + radius * sin(angle),
      vx: random(-1, 1),
      vy: random(-1, 1),
      mass: random(1, 3)
    });
  }
}

function drawPhotonSphere() {
  // Photon sphere
  noFill();
  stroke(255, 255, 0, 100);
  strokeWeight(2);
  ellipse(blackHole.x, blackHole.y, photonSphereRadius * 2, photonSphereRadius * 2);
}

function drawObjects() {
  for (let obj of objects) {
    // Calculate gravitational force
    let dx = blackHole.x - obj.x;
    let dy = blackHole.y - obj.y;
    let distance = sqrt(dx * dx + dy * dy);
    let force = (blackHole.mass * obj.mass) / (distance * distance);

    // Apply force
    obj.vx += (force * dx / distance) * 0.01;
    obj.vy += (force * dy / distance) * 0.01;

    // Update position
    obj.x += obj.vx;
    obj.y += obj.vy;

    // Simulate spaghettification (stretching effect)
    let stretch = map(distance, 0, width / 2, 5, 1);
    let stretchX = obj.width * stretch;
    let stretchY = obj.height / stretch;

    // Draw object
    fill(obj.color);
    noStroke();
    ellipse(obj.x, obj.y, stretchX, stretchY);

    // Remove objects that get too close to the black hole
    if (distance < eventHorizonRadius) {
      objects.splice(objects.indexOf(obj), 1);
    }
  }
}

function drawGravitationalLensing() {
  // Simulate light bending around the black hole
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      let dx = x - blackHole.x;
      let dy = y - blackHole.y;
      let distance = sqrt(dx * dx + dy * dy);

      if (distance > eventHorizonRadius) {
        let distortion = 1000 / distance; // Simple distortion formula
        let newX = x + dx * distortion;
        let newY = y + dy * distortion;

        // Draw distorted light
        stroke(255, 100);
        point(newX, newY);
      }
    }
  }
}

function addStar() {
  objects.push({
    x: random(width),
    y: random(height),
    vx: random(-1, 1),
    vy: random(-1, 1),
    mass: random(50, 100),
    width: 20,
    height: 20,
    color: [255, 255, 0] // Yellow
  });
}

function addGalaxy() {
  objects.push({
    x: random(width),
    y: random(height),
    vx: random(-1, 1),
    vy: random(-1, 1),
    mass: random(200, 500),
    width: 50,
    height: 50,
    color: [100, 100, 255] // Blue
  });
}

function mousePressed() {
  // Allow users to adjust black hole mass
  blackHole.mass += 5000;
  photonSphereRadius = blackHole.radius * 1.5;
  eventHorizonRadius = blackHole.radius;
}
