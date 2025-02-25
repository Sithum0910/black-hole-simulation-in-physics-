const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Black hole properties
const blackHole = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  mass: 10000, // Arbitrary mass value
  radius: 20, // Visual radius
  schwarzschildRadius: 50 // Event horizon
};

// Object properties
const objects = [];
for (let i = 0; i < 10; i++) {
  objects.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    mass: 1,
    radius: 5
  });
}

// Gravity function
function gravity(object, blackHole) {
  const dx = blackHole.x - object.x;
  const dy = blackHole.y - object.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const force = (blackHole.mass * object.mass) / (distance * distance);
  const angle = Math.atan2(dy, dx);
  return {
    fx: force * Math.cos(angle),
    fy: force * Math.sin(angle)
  };
}

// Update and render
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw black hole
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
  ctx.fill();

  // Draw event horizon
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.arc(blackHole.x, blackHole.y, blackHole.schwarzschildRadius, 0, Math.PI * 2);
  ctx.stroke();

  // Update objects
  objects.forEach((obj, index) => {
    const force = gravity(obj, blackHole);
    obj.vx += force.fx / obj.mass;
    obj.vy += force.fy / obj.mass;
    obj.x += obj.vx;
    obj.y += obj.vy;

    // Check if object is inside event horizon
    const dx = obj.x - blackHole.x;
    const dy = obj.y - blackHole.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < blackHole.schwarzschildRadius) {
      objects.splice(index, 1); // Remove object
    }

    // Draw object
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(update);
}

update();
