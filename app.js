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

// create player
let player = new Player(window.innerWidth, window.innerHeight, playerConfig.radius, playerConfig.speed, playerConfig.color, playerConfig.health);

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
                || projectile.y - projectile.radius > canvas.height) {
                projectiles.splice(projectileIndex, 1)
            } else {
                projectile.update();
            }
        })
        // render enemies
        enemies.forEach((enemy, enemyIndex) => {
            enemy.update();
            // check collision with projectile
            projectileCheck(enemy, enemyIndex);
            // collide with player
            playerCheck(enemy);
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
     player = new Player(window.innerWidth, window.innerHeight, playerConfig.radius, playerConfig.speed, playerConfig.color, playerConfig.health);
}

startGameBtn.addEventListener("click", () => {
    init();
    start();
    spawnEnemy();
    gameModal.style.display = 'none';
});
