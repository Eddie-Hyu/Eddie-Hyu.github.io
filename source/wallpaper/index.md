---
title: wallpaper
date: 2024-04-27 08:45:15
comments: false
description:
top_img: 
type: galleryGroup
---


<div class="gallery-group-main">
{% galleryGroup '电脑壁纸' '一些高端大气上档次的电脑壁纸' '/wallpaper/pc/' 'https://cn.bing.com/th?id=OHR.MonfragueNationalPark_ZH-CN5421553314_1920x1080.jpg' %}
{% galleryGroup '手机壁纸' '一些个人比较喜欢的手机壁纸' '/wallpaper/ph/' 'https://img.vm.laomishuo.com/image/2021/04/2021040311203011.jpeg' %}
{% galleryGroup '美女壁纸' '最好的当然要单独建一个相册' '/wallpaper/girl/' 'https://img.vm.laomishuo.com/image/2021/11/2021111016525829.jpeg' %}
</div>

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

> 格式是：`{% galleryGroup name description link img-url %}`
> name：图库名字
> description：图库描述
> link：连接到对应相册的地址
> img-url：图库封面的地址