// player configs
const playerConfig = {
    radius: 10,
    color: 'white',
    speed: 2,
    health: 3
}
// define Player constructor
class Player {
    constructor(x, y, radius, speed, color, health) {
        (this.x = x / 2),
            (this.y = y / 2),
            (this.velx = 0),
            (this.vely = 0),
            (this.speed = speed),
            (this.radius = radius),
            (this.color = color),
            (this.health = health)
    }
    takeDamage() {
        this.health -= 1;
    }
    render() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        c.fillStyle = this.color;
        c.closePath();
        c.fill();
    }
    update() {
        /* 
        prevent player from going off screen
        X axis
        */
        if (this.x - this.radius + this.velx <= 0) { this.velx = 0 }
        if (this.x + this.radius + this.velx > canvas.width) { this.velx = 0 }
        /* 
        prevent player from going off screen
        Y axis
        */
        if (this.y - this.radius + this.vely <= 0) { this.vely = 0 }
        if (this.y + this.radius + this.vely > canvas.height) { this.vely = 0 }

        this.x += this.velx;
        this.y += this.vely;
        this.render();
    }
}
// create player
 var player = new Player(window.innerWidth, window.innerHeight, playerConfig.radius, playerConfig.speed, playerConfig.color, playerConfig.health);

//keydown check
document.addEventListener('keydown', (event) => {
    if (event.key == 'w') {
        player.vely = -player.speed;
    }
    if (event.key == 's') {
        player.vely = player.speed;
    }
    if (event.key == 'a') {
        player.velx = -player.speed;
    }
    if (event.key == 'd') {
        player.velx = player.speed;
    }
});

// keyup check
document.addEventListener('keyup', (event) => {
    if (event.key == 'w') {
        if (player.vely != player.speed) {
            player.vely = 0;
        } else {
            player.vely = player.speed;
        }
    }
    if (event.key == 's') {
        if (player.vely != -player.speed) {
            player.vely = 0;
        } else {
            player.vely = -player.speed;
        }
    }
    if (event.key == 'a') {
        if (player.velx != player.speed) {
            player.velx = 0;
        } else {
            player.velx = player.speed;
        }
    }
    if (event.key == 'd') {
        if (player.velx != -player.speed) {
            player.velx = 0;
        } else {
            player.velx = -player.speed;
        }
    }
});
