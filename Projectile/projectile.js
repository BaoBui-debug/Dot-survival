// projectiles configs
const projectileConfig = {
    radius: 7,
    color: 'white',
    speed: 6
}
// define Projectile constructor

class Projectile {
    constructor(x, y, velocity, radius, color, speed) {
        (this.x = x),
            (this.y = y),
            (this.velx = velocity.x),
            (this.vely = velocity.y),
            (this.radius = radius),
            (this.color = color),
            (this.speed = speed);
    }
    render() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        c.fillStyle = this.color;
        c.closePath();
        c.fill();
    }
    update() {
        this.x = this.x + this.velx * this.speed;
        this.y = this.y + this.vely * this.speed;
        this.render();
    }

}

//mouse down check
document.addEventListener('mousedown', (event) => {
    const angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x
    );

    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    };
        var projectile = new Projectile(player.x, player.y, velocity, projectileConfig.radius, projectileConfig.color, projectileConfig.speed);
        projectiles.push(projectile)
});

// collision detection
function collisionCheck(enemy, enemyIndex) {
    // collision checking 
    projectiles.forEach((projectile, projectileIndex) => {
        const distant = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y)
        // once collided
        if (distant - projectile.radius - enemy.radius < 1) {
            // subtract enemy health by one
            if (enemy.health < 2) {
                setTimeout(() => {
                    enemies.splice(enemyIndex, 1)    
                }, 0)
            } else {
                enemy.takeDamage();
            }
            // push particle
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    particles.push(new Particle(projectile.x, projectile.y, 2, enemy.color, { x: Math.random() - 0.5, y: Math.random() - 0.5 }))
                }, 0)
            }
            // prevent rerendering removed objects
            setTimeout(() => {
                projectiles.splice(projectileIndex, 1)
            }, 0)
        }
    })
}
