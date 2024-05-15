---
title: 背景壁纸
date: 2024-04-27 21:20:18
aside: false
comments: false
---
{% note info  %}
温馨提示：点击可以查看图片，`电脑端拖动图片/手机端长按图片` 可以实现切换壁纸哦~
{% endnote %}

{% gallery %}
![](https://img.vm.laomishuo.com/image/2021/05/2021053107390019.jpeg)
{% endgallery %}

<script>
let time = ''
let imgbox = document.querySelector('.fj-gallery')
imgbox.addEventListener('contextmenu', e => e.preventDefault())
imgbox.addEventListener('dragend', e => { changeBg('url(' + e.target.src + ')'); })
imgbox.addEventListener('touchstart', e => { time = setTimeout(() => { changeBg('url(' + e.target.src + ')'); }, 500); })
imgbox.addEventListener('touchend', ()=>{clearTimeout(time)})
</script>