 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/profile/头像2.jpeg");
         document.title = '看不见我🙈~看不见我🙈~';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/img/profile/头像2.jpeg");
         document.title = ' ( ๑•̀ㅂ•́) ✧被发现了～';
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });
