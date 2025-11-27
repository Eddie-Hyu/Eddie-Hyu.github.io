checkTransform = -15;
let wiggleTime = null;

function flyFunc() {
  // Disable wiggleFunc after flying starts
  clearTimeout(wiggleTime);
  wiggleFunc();
  // const bodyWrap = document.getElementById("body-wrap");
  const butterWrapper = document.getElementById("butterWrapper");

  // 获取屏幕宽度和高度
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // 计算 hh 和 ww，使它们限制在可见屏幕区域
  hh = Math.random() * (screenHeight - butterWrapper.offsetHeight);
  ww = Math.random() * (screenWidth - butterWrapper.offsetWidth);


  // 加上页面的滚动偏移量
  hh += window.scrollY;
  ww += window.scrollX;

  checkTransform = Math.atan2(hh - butterWrapper.offsetTop, ww - butterWrapper.offsetLeft) * (180 / Math.PI);
  butterWrapper.style.transform = "rotate(" + (checkTransform + 80) + "deg)";
  butterWrapper.style.top = hh + "px";
  butterWrapper.style.left = ww + "px";
  butterWrapper.style.pointerEvents = "none";

  document.getElementsByClassName("shade")[0].style.animationName = "none";
  document.getElementsByClassName("shade")[0].style.animationPlayState = "running";

  var x = document.getElementsByClassName("wing");
  var i;
  for (i = 0; i < x.length; i++) {
    x[i].style.animationName = "none";
    x[i].style.animationPlayState = "running";
  }

  setTimeout(function() {
    document.getElementsByClassName("shade")[0].style.animationName = "shadeAnim";
    var x = document.getElementsByClassName("wing");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].style.animationName = "wingAnim";
    }
  }, 50);

  setTimeout(function() {
    clearTimeout(wiggleTime);
    butterWrapper.style.pointerEvents = "all";
  }, 1500);
}

function wiggleFunc() {
  rl = Math.random() * 40;
  rt = Math.random() * 40;
  document.getElementById("innerWrapper").style.left = rl + "px";
  document.getElementById("innerWrapper").style.top = rt + "px";
  wiggleTime = setTimeout(function() {
    wiggleFunc();
  }, 200);
}

// 在页面滚动时触发飞行动画并移动到一个随机位置
window.addEventListener('scroll', function() {
  flyFunc();
});