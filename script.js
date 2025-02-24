function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0, 0, 0, 10); // Semi-transparent background for trailing effect

  // Simulate gravitational lensing with p5.js
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      let dx = x - width / 2;
      let dy = y - height / 2;
      let distance = sqrt(dx * dx + dy * dy);

      if (distance > 50) {
        let distortion = 1000 / distance; // Simple distortion formula
        let newX = x + dx * distortion;
        let newY = y + dy * distortion;

        // Draw distorted light
        fill(255, 100);
        ellipse(newX, newY, 5, 5);
      }
    }
  }
}
