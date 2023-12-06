// define Particle constructor
class Particle {
    constructor(x, y, radius, color, velocity) {
        (this.x = x),
        (this.y = y),
        (this.radius = radius),
        (this.color = color),
        (this.velocity = velocity),
        (this.speed = Math.random() * (5 - 2) + 2),
        (this.alpha = 1)
    }
    render() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        c.fillStyle = this.color;
        c.closePath();
        c.fill();
        c.restore();
    }
    update() {
        this.render();
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
        this.alpha -= 0.01;
    }
}