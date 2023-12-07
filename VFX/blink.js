// define Particle constructor
class VFX {
    constructor(x, y, radius, speed) {
        (this.x = x),
            (this.y = y),
            (this.radius = radius),
            (this.color = "white"),
            (this.alpha = 2),
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
        const angle = Math.atan2(
            player.y - this.y,
            player.x - this.x
        );
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };

        this.render();
        this.x += this.velocity.x * (this.speed + 2) ;
        this.y += this.velocity.y * (this.speed + 2);
        this.alpha -= 0.01;
    }
}