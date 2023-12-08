var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var projectiles = [];
var enemies = [];
var particles = [];
var VFXs = [];
var scoreUI = document.getElementById('scoreEl');
let scoreVal = 0;
let state = 'vulnerable';

// start game

function start(callback) {

    function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = 'rgba(0 , 0, 0, 0.1)';
        c.fillRect(0, 0, canvas.width, canvas.height);

        //render player
        if (player.health < 2) {
            console.log("game over")
        } else {
            player.update();
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
            collisionCheck(enemy, enemyIndex);
            // if enemy and player reach a certain distant, enemy become faster
            const distant = Math.hypot(enemy.x - player.x, enemy.y - player.y)
            if (distant - enemy.radius - player.radius < 300) {
                enemy.sprint();
            }
            // collide with player
            if(distant -enemy.radius - player.radius < 1) {
                player.takeDamage(false);
                
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
    callback()
}

//start(spawnEnemy);