// projectiles configs
var projectileConfig = {
    radius: 7,
    color: 'white',
    speed: 6
}
// define Projectile constructor

class Projectile {
    constructor(x, y, velocity, engine) {
        (this.x = x),
            (this.y = y),
            (this.velx = velocity.x),
            (this.vely = velocity.y),
            (this.radius = projectileConfig.radius),
            (this.color = projectileConfig.color),
            (this.speed = projectileConfig.speed),
            (this.engine = engine);
    }
    render() {
        this.engine.beginPath();
        this.engine.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        this.engine.fillStyle = this.color;
        this.engine.closePath();
        this.engine.fill();
    }
    update() {
        this.x = this.x + this.velx * this.speed;
        this.y = this.y + this.vely * this.speed;
        this.render();
    }
}
export { Projectile }
