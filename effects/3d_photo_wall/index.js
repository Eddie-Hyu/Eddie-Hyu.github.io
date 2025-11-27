// 加载图片并布局
function loadImagesAndLayout() {
    fetch('img.json')
        .then(response => response.json())
        .then(data => {
            // 插入背景图片
            const carouselList = document.getElementById('carouselList');
            data.images.forEach(url => {
                const img = document.createElement('img');
                img.className = 'carousel-item';
                img.src = url;
                img.alt = "";

                carouselList.appendChild(img);
            });

            // // 获取左右箭头图片
            // const prevArrow = document.getElementById('prevArrow');
            // const nextArrow = document.getElementById('nextArrow');
            //
            // const prevImg = document.createElement('img');
            // prevImg.src = data.icons.prev;
            // prevImg.alt = '';
            // prevArrow.appendChild(prevImg);
            //
            // const nextImg = document.createElement('img');
            // nextImg.src = data.icons.next;
            // nextImg.alt = '';
            // nextArrow.appendChild(nextImg);

            // 当图片加载完成后，执行布局

            // 实际图片
            const items = document.querySelectorAll('.carousel-item');
            let index = 3;

            // 布局函数
            function layout() {
                // 图片之间的间隔
                const xOffsetStep = 100;
                // 两张轮播图之间的递减缩放倍率
                const scaleStep = 0.6;
                // 两张轮播图之间的透明度递减倍率
                const opacityStep = 0.5;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    // 计算每张图片i距离当前图片index之间间隔几张
                    const dis = Math.abs(i - index);
                    // 返回1，-1，0，-0，当做一个正负号
                    const sign = Math.sign(i - index);

                    let xOffset = (i - index) * xOffsetStep;
                    // 每张图片的初始偏移量，解决初始偏移距离太小的问题
                    if (i !== index) {
                        // sign为正数，右边的每张图片加上100的偏移量；
                        // sign为负数，左边的每张图片减去100的偏移量。
                        xOffset += 100 * sign;
                    }
                    // 每张图片缩放倍数
                    const scale = scaleStep ** dis;
                    // 如果是当前的不旋转，否则左边旋转45度，右边旋转-45度
                    const rotateY = i === index ? 0 : 45 * -sign;
                    item.style.transform = `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)`;
                    // scale同理，每张图片的透明度，越远透明度越小
                    const opacity = opacityStep ** dis;
                    item.style.opacity = opacity;
                    // 设置每张图片的层级，距离当前index越远的，层级越低
                    const zIndex = items.length - dis;
                    item.style.zIndex = zIndex;

                }

            }


            // 初始布局
            layout();


            // 监听左右箭头的点击事件来更新布局
            prevArrow.addEventListener('click', () => {
                index = (index > 0) ? index - 1 : items.length - 1;
                layout();
            });

            nextArrow.addEventListener('click', () => {
                index = (index < items.length - 1) ? index + 1 : 0;
                layout();
            });


        })
        .catch(error => console.error('Error loading images or layout:', error));
}

// 当页面加载时，加载图片并执行布局
window.onload = loadImagesAndLayout;
