var oBox = document.getElementById("layout"),
    oScore = document.getElementById("score"),
    oRe = document.getElementById("restart"),
    oLevel = document.getElementById("level"),
    oMap = document.getElementById("map"),
    oBiuAll = document.getElementById("BiuAll"),
    oLevelUp =  document.getElementById("levelUp")
    olevelDown =  document.getElementById("levelDown")
    oStart = document.getElementById("start")
    oExit = document.getElementById("exit")
    allBiu = oBiuAll.children,
    allReChild = oRe.children,
    boxOffsetTop = oBox.offsetTop,
    boxOffsetLeft = oBox.offsetLeft;
let currentLevel = 1;

// exe();
level_cg();

function exe() {

    var aP = oLevel.getElementsByTagName("p");
    for (var i = 0,length=aP.length; i < length; i++) {
        (function(i){
            aP[i].onclick = function (e) {
                e = e || window.event;
                startGame(i , {
                    x : e.clientX - boxOffsetLeft,
                    y : e.clientY - boxOffsetTop
                });
            }
        })(i);
    }

    allReChild[1].onclick = function (ev) {
        cancelAnimationFrame(oMap.bgTimer);
        oRe.style.display = "none";
        oLevel.style.display = "block";
        oScore.innerHTML = 0;
        oMap.innerHTML = "<div id='BiuAll'></div>";
        oBiuAll = document.getElementById("BiuAll");
        allBiu = oBiuAll.children;
    };
}

function level_cg() {

    // const levelDisplay = document.getElementById("currentLevel");
    // const updateLevelDisplay = () => levelDisplay.innerText = currentLevel;
    //
    // oLevelUp.onclick = function(e) {
    //     currentLevel++;
    //     updateLevelDisplay();
    // };
    //
    // olevelDown.onclick = function(e) {
    //     if (currentLevel > 1) {
    //         currentLevel--;
    //         updateLevelDisplay();
    //     }
    // };

    allReChild[1].onclick = function () {
        resetGame();
    };


     oStart.onclick  = function(e) {
         e = e || window.event;
        startGame(currentLevel, {
            x: e.clientX - boxOffsetLeft,
            y: e.clientY - boxOffsetTop });
    };

    oExit.onclick  = function(e) {
        window.history.back();
    };

    updateLevelDisplay();
}

function resetGame() {
    cancelAnimationFrame(oMap.bgTimer);
    oRe.style.display = "none";
    oLevel.style.display = "block";
    oScore.innerHTML = 0;
    oMap.innerHTML = "<div id='BiuAll'></div>";
    oBiuAll = document.getElementById("BiuAll");
    allBiu = oBiuAll.children;
}

function startGame(level, pos) {
    clearMap();
    MapBg(level);

    var p = plane(level, pos);
    enemy(level, p);

    oBox.score = 0;

}

function clearMap() {
    oScore.style.display = "block";
    oLevel.style.display = "none";
}

function MapBg(level) {
    // oMap.style.backgroundImage = "url('images/bg_"+(level+1)+".png')";
    oMap.style.backgroundImage = "url('images/bg_1.png')";
    (function m(){
        oMap.bgPosY = oMap.bgPosY || 0;
        oMap.bgPosY ++;
        oMap.style.backgroundPositionY = oMap.bgPosY + 'px';
        oMap.bgTimer = requestAnimationFrame(m);
    })();
}


function plane(level , pos) {
    var oImg = new Image();
    oImg.src = "images/myplane.png";
    oImg.width = 100;
    oImg.height = 100;
    oImg.className = "plane";
    oImg.style.left = pos.x - oImg.width/2 + 'px';
    oImg.style.top = pos.y - oImg.height/2 + 'px';
    oMap.appendChild(oImg);

    var leftMin = -oImg.width/2,
        leftMax = oMap.clientWidth - oImg.width/2,
        topMin = 0,
        topMax = oMap.clientHeight - oImg.height/2;

    document.onmousemove = function (ev) {
        ev = ev || window.event;
        var left = ev.clientX  - oImg.width/2;
        var top = ev.clientY  - oImg.height/2;
        left = Math.max(leftMin,left);
        left = Math.min(leftMax,left);
        top = Math.max(topMin,top);
        top = Math.min(topMax,top);
        oImg.style.left = left + 'px';
        oImg.style.top = top + 'px';
    };

    fire(oImg,level);

    return oImg;
}

function fire(oImg , level){
    oBox.biuInterval = setInterval(function () {
        if ( oBox.score >= 500 ){
            createBiu(true , -1);
            createBiu(true , 1);
        }else{
            createBiu();
        }
    } , 600/(level+1));
    // [100 , 200 , 200 , 15][level])

    function createBiu(index , d){
        var oBiu = new Image();
        oBiu.src = "images/fire.png";
        oBiu.width = 50;
        oBiu.height = 50;
        oBiu.className = "biu";

        var left = oImg.offsetLeft + oImg.width/2 - oBiu.width/2;
        var top = oImg.offsetTop - oBiu.height + 5;

        if ( index ){
            left += oBiu.width*d
        }

        oBiu.style.left = left + "px";
        oBiu.style.top = top + 'px';


        oBiuAll.appendChild(oBiu);

        function m() {
            if ( oBiu.parentNode ){
                var top = oBiu.offsetTop - 20;
                if ( top < -oBiu.height ){
                    oBiuAll.removeChild(oBiu);
                }else{
                    oBiu.style.top = top + 'px';
                    requestAnimationFrame(m);
                }
            }
        }
        setTimeout(function(){
            requestAnimationFrame(m);
        },50);
    }
}


function enemy(level , oPlane) {
    var w = oMap.clientWidth,
        h = oMap.clientHeight;

    var speed = 2*(level+1);
        // [5,6,8,8][level];

    var num = 1;
    oBox.enemyIntetval = setInterval(function () {
        var index = num%30?1:0;

        var oEnemy = new Image();
        oEnemy.index = index;
        oEnemy.HP = [20,1][index];
        oEnemy.speed = speed + (Math.random()*0.6 - 0.3)*speed;
        oEnemy.speed *= index?1:0.5;
        oEnemy.src = "images/enemy_"+["big","small"][index]+".png";
        oEnemy.className = "enemy";
        oEnemy.width = [200,100][index];
        oEnemy.height = [120,80][index];
        oEnemy.style.left = Math.random()*w - oEnemy.width/2 + 'px';
        oEnemy.style.top = -oEnemy.height + 'px';
        oMap.appendChild(oEnemy);
        num ++;
        setTimeout(function() {
            function m(){
                if ( oEnemy.parentNode ){
                    var top = oEnemy.offsetTop;
                    top += oEnemy.speed;
                    if ( top >= h ){
                        oBox.score --;
                        oScore.innerHTML = oBox.score;
                        oMap.removeChild(oEnemy);
                    }else{
                        oEnemy.style.top = top + 'px';
                        for (var i = allBiu.length - 1 ; i >= 0; i--) {
                            var objBiu = allBiu[i];
                            if ( coll(oEnemy , objBiu) ){
                                oBiuAll.removeChild(objBiu);
                                oEnemy.HP --;
                                if ( !oEnemy.HP ){
                                    oBox.score += oEnemy.index?2:20;
                                    oScore.innerHTML = oBox.score;
                                    boom(oEnemy.offsetLeft,oEnemy.offsetTop,oEnemy.width,oEnemy.height,index?0:2);
                                    oMap.removeChild(oEnemy);
                                    return;
                                }
                            }
                        }
                        if ( oPlane.parentNode && coll(oEnemy,oPlane) ){
                            boom(oEnemy.offsetLeft,oEnemy.offsetTop,oEnemy.width,oEnemy.height,index?0:2);
                            boom(oPlane.offsetLeft,oPlane.offsetTop,oPlane.width,oPlane.height,1);
                            oMap.removeChild(oEnemy);
                            oMap.removeChild(oPlane);
                            GameOver();
                            return;
                        }
                        requestAnimationFrame(m);
                    }
                }
            }
            requestAnimationFrame(m);
            }, 2500); // 等待 2 秒后再开始移动
        },1200/(level+1));
            // [350,150,120,40][level]);
}


function boom(l,t,w,h,i){
    var oBoom = new Image();
    oBoom.src = "images/"+["boom_small","myplane","boom_big"][i]+".png";
    oBoom.className = 'boom'+["","2",""][i];
    oBoom.width = w;
    oBoom.height = h;
    oBoom.style.left = l + "px";
    oBoom.style.top = t + 'px';
    oMap.appendChild(oBoom);
    setTimeout(function(){
        oBoom.parentNode && oMap.removeChild(oBoom);
    },[1200,2500,1200][i]);
}

function coll( obj1 , obj2 ){
    var T1 = obj1.offsetTop,
        B1 = T1+obj1.clientHeight,
        L1 = obj1.offsetLeft,
        R1 = L1+obj1.clientWidth;

    var T2 = obj2.offsetTop,
        B2 = T2+obj2.clientHeight,
        L2 = obj2.offsetLeft,
        R2 = L2+obj2.clientWidth;

    return !( B1 < T2 || R1 < L2 || T1 > B2 || L1 > R2 );
}


function GameOver(){
    document.onmousemove = null;
    clearInterval(oBox.biuInterval);
    clearInterval(oBox.enemyIntetval);
    restart();
}

function restart() {
    oScore.style.display = "none"; // 隐藏得分显示
    var s = oBox.score; // 获取当前得分
    oRe.style.display = "block"; // 显示结果面板
    allReChild[0].children[0].innerHTML = s; // 更新得分显示

}