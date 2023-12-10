// define Particle constructor
class Particle {
    constructor(x, y, radius, color, velocity, engine) {
        (this.x = x),
        (this.y = y),
        (this.radius = radius),
        (this.color = color),
        (this.velocity = velocity),
        (this.speed = Math.random() * (5 - 2) + 2),
        (this.alpha = 1),
        (this.engine = engine);
    }
    render() {
        this.engine.save();
        this.engine.globalAlpha = this.alpha;
        this.engine.beginPath();
        this.engine.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        this.engine.fillStyle = this.color;
        this.engine.closePath();
        this.engine.fill();
        this.engine.restore();
    }
    update() {
        this.render();
        this.x = this.x + this.velocity.x * this.speed;
        this.y = this.y + this.velocity.y * this.speed;
        this.alpha -= 0.01;
    }
}
export { Particle };