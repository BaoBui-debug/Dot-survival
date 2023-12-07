// enemt configs
const enemyConfig = {
    radiusMax: 30,
    radiusMin: 10,
    color: ['#9CFF88', '#00BB27', '#05E177', '#75DB1B', '#22EE5B'],
    speedMax: 2,
    speedMin: 1,
    maxSprintSpeed: 3,
    minSprintSpeed: 1.5
}

// define Enemy constructor
class Enemy {
    constructor(radius, color, speed, health, boost) {

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
            (this.speed = speed),
            (this.color = color),
            (this.health = health),
            (this.boost = boost);
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
        this.speed = this.boost;

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

// define spawn BigEnemy function
function spawnEnemy() {
    setInterval(() => {
        let enemySpawnChange = Math.floor(Math.random() * 2);
        const color = enemyConfig.color[Math.floor(Math.random() * enemyConfig.color.length)];
        const speed = Math.floor(Math.random() * (enemyConfig.speedMax - enemyConfig.speedMin) + enemyConfig.speedMin);
        const enemy = enemySpawnChange === 0 ? new Enemy(10, color, speed, 2, enemyConfig.maxSprintSpeed) : new Enemy(30, color, speed, 5, enemyConfig.minSprintSpeed);
        enemies.push(enemy);
    }, 1000);
}
