// player configs
const playerConfig = {
    radius: 10,
    color: 'white',
    speed: 2,
    health: 1
}
// define Player constructor
class Player {
    constructor(x, y, engine) {
        (this.x = x / 2),
            (this.y = y / 2),
            (this.velx = 0),
            (this.vely = 0),
            (this.speed = playerConfig.speed),
            (this.radius = playerConfig.radius),
            (this.color = playerConfig.color),
            (this.health = playerConfig.health),
            (this.engine = engine)
    }
    checkMovementInput() {
        //keydown check
        document.addEventListener('keydown', (event) => {
            if (event.key == 'w') {
                this.vely = -this.speed;
            }
            if (event.key == 's') {
                this.vely = this.speed;
            }
            if (event.key == 'a') {
                this.velx = -this.speed;
            }
            if (event.key == 'd') {
                this.velx = this.speed;
            }
        });
        // keyup check
        document.addEventListener('keyup', (event) => {
            if (event.key == 'w') {
                if (this.vely != this.speed) {
                    this.vely = 0;
                } else {
                    this.vely = this.speed;
                }
            }
            if (event.key == 's') {
                if (this.vely != -this.speed) {
                    this.vely = 0;
                } else {
                    this.vely = -this.speed;
                }
            }
            if (event.key == 'a') {
                if (this.velx != this.speed) {
                    this.velx = 0;
                } else {
                    this.velx = this.speed;
                }
            }
            if (event.key == 'd') {
                if (this.velx != -this.speed) {
                    this.velx = 0;
                } else {
                    this.velx = -this.speed;
                }
            }
        });
    }
    collisionCheck(enemy) {
        const distant = Math.hypot(enemy.x - this.x, enemy.y - this.y)
        if (distant - enemy.radius - this.radius < 1) {
            this.health -= 1;
        }
    }
    preventOfScreen() {
        // X axis
        if (this.x - this.radius + this.velx <= 0) { this.velx = 0 }
        if (this.x + this.radius + this.velx > canvas.width) { this.velx = 0 }
        // Y axis
        if (this.y - this.radius + this.vely <= 0) { this.vely = 0 }
        if (this.y + this.radius + this.vely > canvas.height) { this.vely = 0 }
    }
    render() {
        this.engine.beginPath();
        this.engine.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        this.engine.fillStyle = this.color;
        this.engine.closePath();
        this.engine.fill();
    }
    update() {
        this.x += this.velx;
        this.y += this.vely;
        this.preventOfScreen();
        this.checkMovementInput();
        this.render();
    }
}
export { Player };