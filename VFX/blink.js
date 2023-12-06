// define Particle constructor
class VFX {
    constructor(x, y, radius, velocity, speed) {
        (this.x = x),
        (this.y = y),
        (this.radius = radius),
        (this.color = "white"),
        (this.alpha = 2),
        (this.velocity = velocity),
        (this.speed = speed)
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
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
        this.alpha -= 0.2;
    }
}