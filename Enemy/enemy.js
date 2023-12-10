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
    constructor(radius, color, speed, health, boost, value, player, engine) {

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
            (this.velocity = { x: undefined, y: undefined }),
            (this.health = health),
            (this.boost = boost),
            (this.value = value),
            (this.engine = engine),
            (this.player = player);
    }

    render(hit) {
        this.engine.beginPath();
        this.engine.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        this.engine.fillStyle = hit === false ? this.color : 'white';
        this.engine.closePath();
        this.engine.fill();
    }
    takeDamage() {
        this.health -= 1;
        this.render(true);
    }
    sprint() {
        this.color = 'red';
        this.speed = this.boost;
    }
    update() {
        const angle = Math.atan2(
            this.player.y - this.y,
            this.player.x - this.x
        );
        this.velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };

        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
        this.render(false);
    }
}

// define spawn BigEnemy function
function spawnEnemy(enemyArray, player, engine) {
    setInterval(() => {
        // randomize change of spawing big & small enemy
        let enemySpawnChange = Math.floor(Math.random() * 2);
        // 
        const color = enemyConfig.color[Math.floor(Math.random() * enemyConfig.color.length)];
        const speed = Math.floor(Math.random() * (enemyConfig.speedMax - enemyConfig.speedMin) + enemyConfig.speedMin);
        if (enemySpawnChange === 0) {
            enemyArray.push(new Enemy(10, color, speed, 2, enemyConfig.maxSprintSpeed, 2, player, engine))
        }
        else {
            enemyArray.push(new Enemy(30, color, speed, 5, enemyConfig.minSprintSpeed, 10, player, engine))
        }
    }, 1000);
}

export { spawnEnemy };