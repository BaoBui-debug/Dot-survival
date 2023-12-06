// player configs
const playerConfig = {
    radius: 10,
    color: 'white',
    speed: 2
}
// define Player constructor
class Player {
    constructor(x, y, radius, speed, color) {
        (this.x = x / 2),
            (this.y = y / 2),
            (this.velx = 0),
            (this.vely = 0),
            (this.speed = speed),
            (this.radius = radius),
            (this.color = color);
    }
    render() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
        c.fillStyle = this.color;
        c.closePath();
        c.fill();
    }
    update() {
        this.x += this.velx;
        this.y += this.vely;
        this.render();
    }
}
// create player
var player = new Player(window.innerWidth, window.innerHeight, playerConfig.radius, playerConfig.speed, playerConfig.color);

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
