const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

// Logical (CSS pixel) size
let width, height;
let dpr = 1;

let snowflakes = [];

// Tweak these
const snowflakeCount = 260;
const minFallSpeed = 1.8;
const maxFallSpeed = 5.2;
const minSize = 1.0;
const maxSize = 3.2;
const windStrength = 0.25; // overall horizontal push
const swayStrength = 0.55; // per-flake left/right sway
const swaySpeed = 0.012;   // how fast the sway oscillates

let t = 0;

function resize() {
    // Use devicePixelRatio so the canvas covers the full viewport and stays crisp
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener('resize', resize);
resize();

function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < snowflakeCount; i++) {
        const r = Math.random() * (maxSize - minSize) + minSize;
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: r,
            // Faster + more varied fall speeds
            speedY: Math.random() * (maxFallSpeed - minFallSpeed) + minFallSpeed,
            // Small base drift, plus a per-flake sway
            speedX: (Math.random() * 0.6 - 0.3),
            phase: Math.random() * Math.PI * 2
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateSnowflakes() {
    t += 1;
    const wind = Math.sin(t * 0.003) * windStrength;

    for (const flake of snowflakes) {
        const sway = Math.sin((t * swaySpeed) + flake.phase) * swayStrength;

        flake.y += flake.speedY;
        flake.x += flake.speedX + wind + sway * 0.12;

        // Respawn from top when it reaches the bottom
        if (flake.y > height + flake.radius) {
            flake.y = -flake.radius;
            flake.x = Math.random() * width;
            flake.phase = Math.random() * Math.PI * 2;
            flake.speedY = Math.random() * (maxFallSpeed - minFallSpeed) + minFallSpeed;
        }

        // Smooth wrap (no snapping to exact 0/width, which causes edge clumps)
        if (flake.x > width + flake.radius) flake.x = -flake.radius;
        if (flake.x < -flake.radius) flake.x = width + flake.radius;
    }
}

function animate() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animate);
}

createSnowflakes();
animate();