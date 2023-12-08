var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var projectiles = [];
var enemies = [];
var particles = [];
var VFXs = [];

// start game

function start(callback) {

    function animate() {
        requestAnimationFrame(animate);
        c.fillStyle = 'rgba(0 , 0, 0, 0.1)';
        c.fillRect(0, 0, canvas.width, canvas.height);
        //render player
        player.update();

        //render particles
        particles.forEach((particle, particleIndex) => {
            if (particle.alpha <= 0) {
                setTimeout(() => {
                    particles.splice(particleIndex, 1)
                }, 0)
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
                setTimeout(() => {
                    projectiles.splice(projectileIndex, 1)
                }, 0)
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
        })
        // render VFX 
        VFXs.forEach((vfx, vfxIndex) => {
            if (vfx.alpha < 0) {
                setTimeout(() => {
                    VFXs.splice(vfxIndex, 1)
                }, 0)
            } else {
                vfx.update();
            }
        })
    }
    animate()
    callback()
}
//start(spawnEnemy);