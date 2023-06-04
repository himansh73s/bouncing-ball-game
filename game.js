// Get the game canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball class
class Ball {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

        // Add click event listener to the ball
        canvas.addEventListener('click', () => {
            this.changeColor();
        });
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Reverse ball direction if it reaches canvas boundaries
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y + this.radius > canvas.height ) {
            this.velocity.y = -this.velocity.y;
            this.changeColor();
        }
        if ( this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
           // this.changeColor();
        }
    }

    changeColor() {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Generates a random hex color code
        this.color = randomColor;
    }
}

// Create the balls
const ball1 = new Ball(100, 100, 30, 'red', { x: 2, y: 2 });
const ball2 = new Ball(200, 200, 40, 'blue', { x: -2, y: -2 });
const ball3 = new Ball(300, 300, 50, 'green', { x: 2, y: -2 });

// Animation loop
function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the balls
    ball1.update();
    ball2.update();
    ball3.update();

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Start the game
animate();
