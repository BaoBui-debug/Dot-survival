// enemt configs
const enemyConfig = {
    radiusMax: 30,
    radiusMin: 10,
    color: ['#9CFF88', '#00BB27', '#05E177', '#75DB1B', '#22EE5B'],
    speedMax: 2,
    speedMin: 1,
    maxSprintSpeed: 3,
    minSprintSpeed: 2
}

// define Enemy constructor
class Enemy {
    constructor(radius, color, speed, health) {
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        (this.x = x),
            (this.y = y),
            (this.radius = radius),
            (this.color = color),
            (this.speed = speed),
            (this.health = health)
    }

    render() {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        c.fillStyle = this.color;
        c.closePath();
        c.fill();
    }
    
    takeDamage() {
        this.health -= 1;
        // Add blinking white upons hit
        const blink = new VFX(this.x, this.y, this.radius, this.velocity, this.speed);
        VFXs.push(blink);
    }
    
    sprint() {
        this.color = 'red';
        if (this.radius >= 20) {
            this.speed = enemyConfig.minSprintSpeed;
        } else {
            this.speed = enemyConfig.maxSprintSpeed;
        }
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

        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
        this.render();
    }
}

// define spawn Enemy function
function spawnEnemy() {

    setInterval(() => {
        const radius = Math.floor(Math.random() * (enemyConfig.radiusMax - enemyConfig.radiusMin) + enemyConfig.radiusMin);
        const color = enemyConfig.color[Math.floor(Math.random() * enemyConfig.color.length)];
        const speed = radius >= 20 ? 1 : Math.floor(Math.random() * (enemyConfig.speedMax - enemyConfig.speedMin) + enemyConfig.speedMin);
        const health = radius >= 20 ? 5 : Math.floor(Math.random() * (3 - 1) + 1);
        const enemy = new Enemy(radius, color, speed, health);
        enemies.push(enemy);
    }, 1000);
}
