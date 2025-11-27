function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.width = `${Math.random() * 50 + 10}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
    document.body.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
        bubble.remove();
        createBubble();
    });
}

for (let i = 0; i < 20; i++) {
    createBubble();
}

const mouseFollower = document.getElementById('mouseFollower');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    mouseFollower.style.left = `${mouseX}px`;
    mouseFollower.style.top = `${mouseY}px`;

    document.querySelectorAll('.bubble').forEach(bubble => {
        const rect = bubble.getBoundingClientRect();
        const distance = Math.hypot(mouseX - rect.left - rect.width/2, mouseY - rect.top - rect.height/2);

        if (distance < 100) {
            const angle = Math.atan2(mouseY - rect.top - rect.height/2, mouseX - rect.left - rect.width/2);
            const push = (100 - distance) / 2;
            bubble.style.transform = `translate(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px)`;
            mouseFollower.style.width = '30px';
            mouseFollower.style.height = '30px';
        } else {
            bubble.style.transform = 'translate(0, 0)';
            mouseFollower.style.width = '20px';
            mouseFollower.style.height = '20px';
        }
    });
});