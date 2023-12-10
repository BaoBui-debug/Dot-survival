var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
let projectiles = [];
let enemies = [];
let particles = [];
let VFXs = [];
var scoreUI = document.getElementById('scoreEl');
var startGameBtn = document.getElementById('startGameBtn');
var gameModal = document.getElementById('gameModal');
var scoreModal = document.getElementById('scoreModal');
let scoreVal = 0;
let animationId = undefined;

// import Player module
import { Player } from "./Player/player.js";
// import Enemy module
import { spawnEnemy } from "./Enemy/enemy.js";
// import Projectile module
import { Projectile } from "./Projectile/projectile.js";
// import Particle module
import { Particle } from "./Particle/particle.js";

// create player
let player = new Player(window.innerWidth, window.innerHeight, c);

function projectileImpact(enemy) {
    projectiles.forEach((projectile, projectileIndex) => {
        const distant = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y)
        if (distant - projectile.radius - enemy.radius < 1) {
            enemy.takeDamage();
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    particles.push(new Particle(projectile.x, projectile.y, 2, enemy.color, { x: Math.random() - 0.5, y: Math.random() - 0.5 }, enemy.engine))
                }, 0)
            }
            setTimeout(() => {
                projectiles.splice(projectileIndex, 1);
            }, 0)
        }
    })
}
//check for mousedown action
document.addEventListener('mousedown', (event) => {
    const angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x
    );
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
    };
    projectiles.push(new Projectile(player.x, player.y, velocity, c))
});

// define start function
function start() {

    function animate() {
        animationId = requestAnimationFrame(animate);
        c.fillStyle = 'rgba(0 , 0, 0, 0.1)';
        c.fillRect(0, 0, canvas.width, canvas.height);

        //render player
        if (player.health > 0) {
            player.update();
        } else {
            cancelAnimationFrame(animationId);
            gameModal.style.display = 'flex';
            scoreModal.innerText = scoreVal;
        }
        //render particles
        particles.forEach((particle, particleIndex) => {
            if (particle.alpha <= 0) {
                particles.splice(particleIndex, 1)
            } else {
                particle.update();
            }
        })
        // render projectiles
        projectiles.forEach((projectile, projectileIndex) => {
            // if projectiles off screen, remove
            if (projectile.x + projectile.radius < 0
                || projectile.x - projectile.radius > canvas.width
                || projectile.y + projectile.radius < 0
                || projectile.y - projectile.radius > canvas.height) { projectiles.splice(projectileIndex, 1) }

            else {
                projectile.update();
            }
        })
        // render enemies
        enemies.forEach((enemy, enemyIndex) => {
            if (enemy.health < 2) {
                enemies.splice(enemyIndex, 1)
                // update score
                scoreVal += enemy.value;
                scoreUI.innerHTML = scoreVal;
            } else {
                enemy.update();
                projectileImpact(enemy);
            }
            // collide with player
            player.collisionCheck(enemy)
            // if enemy and player reach a certain distant, enemy become faster
            const distant = Math.hypot(enemy.x - player.x, enemy.y - player.y)
            if (distant - enemy.radius - player.radius < 300) {
                enemy.sprint();
            }
        })
        // render VFX 
        VFXs.forEach((vfx, vfxIndex) => {
            if (vfx.alpha < 0) {
                VFXs.splice(vfxIndex, 1)
            } else {
                vfx.update();
            }
        })
    }
    animate()
}

// define init function => restart everything 
function init() {
    projectiles = [];
    enemies = [];
    particles = [];
    VFXs = [];
    scoreVal = 0;
    scoreUI.innerText = 0;
    player = new Player(window.innerWidth, window.innerHeight, c);
    gameModal.style.display = 'none';
    spawnEnemy(enemies, player, c);
    start();
}
startGameBtn.addEventListener("click", () => {
    init();
});
