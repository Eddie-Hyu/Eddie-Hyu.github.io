function change(str){
    document.getElementById('container').setAttribute('class',str);
}

// script.index.js
document.addEventListener('DOMContentLoaded', () => {
    const moon =  document.querySelector('.moon');
    const moon_box = document.querySelector('.moon_box');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const radius = Math.min(screenWidth, screenHeight) / 2;
    let angle = 0;
    const speed = 0.01;  // 调整移动速度

    function moveMoon() {
        // 计算球的位置，x从屏幕中心向左，y从屏幕中心向上
        const x = screenWidth / 2 - radius * Math.cos(angle);
        const y = screenHeight / 2 - radius * Math.sin(angle);
        ball.style.transform = `translate(${x}px, ${y}px)`;
        angle += speed;
        // 当球移出屏幕时停止动画
        if (angle <= Math.PI) {
            requestAnimationFrame(moveMoon);
        }
    }

    moveMoon();
});
