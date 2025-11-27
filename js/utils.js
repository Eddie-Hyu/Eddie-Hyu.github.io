const ldd = {
  debounce: (func, wait = 0, immediate = false) => {
    let timeout
    return (...args) => {
      const later = () => {
        timeout = null
        if (!immediate) func(...args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func(...args)
    }
  },

  throttle: function (func, wait, options = {}) {
    let timeout, context, args
    let previous = 0

    const later = () => {
      previous = options.leading === false ? 0 : new Date().getTime()
      timeout = null
      func.apply(context, args)
      if (!timeout) context = args = null
    }

    const throttled = (...params) => {
      const now = new Date().getTime()
      if (!previous && options.leading === false) previous = now
      const remaining = wait - (now - previous)
      context = this
      args = params
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        func.apply(context, args)
        if (!timeout) context = args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
    }

    return throttled
  },

  sidebarPaddingR: () => {
    const innerWidth = window.innerWidth
    const clientWidth = document.body.clientWidth
    const paddingRight = innerWidth - clientWidth
    if (innerWidth !== clientWidth) {
      document.body.style.paddingRight = paddingRight + 'px'
    }
  },

  snackbarShow: (text, showAction = false, duration = 2000) => {
    const { position, bgLight, bgDark } = GLOBAL_CONFIG.Snackbar
    const bg = document.documentElement.getAttribute('data-theme') === 'light' ? bgLight : bgDark
    Snackbar.show({
      text: text,
      backgroundColor: bg,
      onActionClick: showActionFunction,
      actionText: actionText,
      showAction: actionText,
      duration: duration,
      pos: position,
      customClass: "snackbar-css",
    });
  },

  diffDate: (d, more = false) => {
    const dateNow = new Date()
    const datePost = new Date(d)
    const dateDiff = dateNow.getTime() - datePost.getTime()
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const { dateSuffix } = GLOBAL_CONFIG

    if (!more) return parseInt(dateDiff / day)

    const monthCount = dateDiff / month
    const dayCount = dateDiff / day
    const hourCount = dateDiff / hour
    const minuteCount = dateDiff / minute

    if (monthCount > 12) return datePost.toISOString().slice(0, 10)
    if (monthCount >= 1) return `${parseInt(monthCount)} ${dateSuffix.month}`
    if (dayCount >= 1) return `${parseInt(dayCount)} ${dateSuffix.day}`
    if (hourCount >= 1) return `${parseInt(hourCount)} ${dateSuffix.hour}`
    if (minuteCount >= 1) return `${parseInt(minuteCount)} ${dateSuffix.min}`
    return dateSuffix.just
  },

  loadComment: (dom, callback) => {
    if ('IntersectionObserver' in window) {
      const observerItem = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback()
          observerItem.disconnect()
        }
      }, { threshold: [0] })
      observerItem.observe(dom)
    } else {
      callback()
    }
  },

  scrollToDest: (pos, time = 500) => {
    const currentPos = window.pageYOffset
    const isNavFixed = document.getElementById('page-header').classList.contains('fixed')
    if (currentPos > pos || isNavFixed) pos = pos - 70

    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: pos,
        behavior: 'smooth'
      })
      return
    }

    let start = null
    pos = +pos
    window.requestAnimationFrame(function step (currentTime) {
      start = !start ? currentTime : start
      const progress = currentTime - start
      if (currentPos < pos) {
        window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos)
      } else {
        window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time))
      }
      if (progress < time) {
        window.requestAnimationFrame(step)
      } else {
        window.scrollTo(0, pos)
      }
    })
  },

  animateIn: (ele, text) => {
    ele.style.display = 'block'
    ele.style.animation = text
  },

  animateOut: (ele, text) => {
    ele.addEventListener('animationend', function f () {
      ele.style.display = ''
      ele.style.animation = ''
      ele.removeEventListener('animationend', f)
    })
    ele.style.animation = text
  },

  wrap: (selector, eleType, options) => {
    const createEle = document.createElement(eleType)
    for (const [key, value] of Object.entries(options)) {
      createEle.setAttribute(key, value)
    }
    selector.parentNode.insertBefore(createEle, selector)
    createEle.appendChild(selector)
  },

  isHidden: ele => ele.offsetHeight === 0 && ele.offsetWidth === 0,

  getEleTop: ele => {
    let actualTop = ele.offsetTop
    let current = ele.offsetParent

    while (current !== null) {
      actualTop += current.offsetTop
      current = current.offsetParent
    }

    return actualTop
  },

  loadLightbox: ele => {
    const service = GLOBAL_CONFIG.lightbox

    if (service === 'mediumZoom') {
      mediumZoom(ele, { background: 'var(--zoom-bg)' })
    }

    if (service === 'fancybox') {
      Array.from(ele).forEach(i => {
        if (i.parentNode.tagName !== 'A') {
          const dataSrc = i.dataset.lazySrc || i.src
          const dataCaption = i.title || i.alt || ''
          ldd.wrap(i, 'a', { href: dataSrc, 'data-fancybox': 'gallery', 'data-caption': dataCaption, 'data-thumb': dataSrc })
        }
      })

      if (!window.fancyboxRun) {
        Fancybox.bind('[data-fancybox]', {
          Hash: false,
          Thumbs: {
            showOnStart: false
          },
          Images: {
            Panzoom: {
              maxScale: 4
            }
          },
          Carousel: {
            transition: 'slide'
          },
          Toolbar: {
            display: {
              left: ['infobar'],
              middle: [
                'zoomIn',
                'zoomOut',
                'toggle1to1',
                'rotateCCW',
                'rotateCW',
                'flipX',
                'flipY'
              ],
              right: ['slideshow', 'thumbs', 'close']
            }
          }
        })
        window.fancyboxRun = true
      }
    }
  },

  setLoading: {
    add: ele => {
      const html = `
        <div class="loading-container">
          <div class="loading-item">
            <div></div><div></div><div></div><div></div><div></div>
          </div>
        </div>
      `
      ele.insertAdjacentHTML('afterend', html)
    },
    remove: ele => {
      ele.nextElementSibling.remove()
    }
  },

  updateAnchor: (anchor) => {
    if (anchor !== window.location.hash) {
      if (!anchor) anchor = location.pathname
      const title = GLOBAL_CONFIG_SITE.title
      window.history.replaceState({
        url: location.href,
        title
      }, title, anchor)
    }
  },

  getScrollPercent: (currentTop, ele) => {
    const docHeight = ele.clientHeight
    const winHeight = document.documentElement.clientHeight
    const headerHeight = ele.offsetTop
    const contentMath = (docHeight > winHeight) ? (docHeight - winHeight) : (document.documentElement.scrollHeight - winHeight)
    const scrollPercent = (currentTop - headerHeight) / (contentMath)
    const scrollPercentRounded = Math.round(scrollPercent * 100)
    const percentage = (scrollPercentRounded > 100) ? 100 : (scrollPercentRounded <= 0) ? 0 : scrollPercentRounded
    return percentage
  },

  addGlobalFn: (key, fn, name = false, parent = window) => {
    const globalFn = parent.globalFn || {}
    const keyObj = globalFn[key] || {}

    if (name && keyObj[name]) return

    name = name || Object.keys(keyObj).length
    keyObj[name] = fn
    globalFn[key] = keyObj
    parent.globalFn = globalFn
  },

  addEventListenerPjax: (ele, event, fn, option = false) => {
    ele.addEventListener(event, fn, option)
    ldd.addGlobalFn('pjax', () => {
      ele.removeEventListener(event, fn, option)
    })
  },

  removeGlobalFnEvent: (key, parent = window) => {
    const { globalFn = {} } = parent
    const keyObj = globalFn[key] || {}
    const keyArr = Object.keys(keyObj)
    if (!keyArr.length) return
    keyArr.forEach(i => {
      keyObj[i]()
    })
    delete parent.globalFn[key]
  },

  //隐藏侧边栏
  hideAsideBtn: () => {
    // Hide aside
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("aside-status", "show", 2)
      : saveToLocal.set("aside-status", "hide", 2);
    $htmlDom.toggle("hide-aside");
    $htmlDom.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");
  },
  //切换音乐播放状态
  azy_musicToggle: function (changePaly = true) {
    if (!anzhiyu_musicFirst) {
      ldd.musicBindEvent();
      anzhiyu_musicFirst = true;
    }
    let msgPlay = '<i class="lddfont ldd-icon-play"></i><span>播放音乐</span>';
    let msgPause = '<i class="lddfont ldd-icon-pause"></i><span>暂停音乐</span>';
    if (anzhiyu_musicPlaying) {
      navMusicEl.classList.remove("playing");
      // 修改右键菜单文案为播放
      document.getElementById("menu-music-play").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "播放音乐";
      document.querySelector("#consoleMusic").classList.remove("on");
      ldd_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.remove("playing");
      // 修改右键菜单文案为暂停
      document.getElementById("menu-music-play").innerHTML = msgPause;
      document.getElementById("nav-music-hoverTips").innerHTML = "暂停音乐";
      document.querySelector("#consoleMusic").classList.add("on");
      anzhiyu_musicPlaying = true;
      navMusicEl.classList.remove("stretch");
    }
    if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
    rm && rm.hideRightMenu();
  },
  // 音乐伸缩
  azy_musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.add("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  azy_musicSkipBack: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipBack();
    rm && rm.hideRightMenu();
  },

  //音乐下一曲
  azy_musicSkipForward: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipForward();
    rm && rm.hideRightMenu();
  },

  //获取音乐中的名称
  azy_musicGetName: function () {
    var x = document.querySelector(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
  //初始化console图标
  initConsoleState: function () {
    //初始化隐藏边栏
    const $htmlDomClassList = document.documentElement.classList;
    $htmlDomClassList.contains("hide-aside")
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on");
  },

  // 显示打赏中控台
  rewardShowConsole: function () {
    // 判断是否为赞赏打开控制台
    consoleEl.classList.add("reward-show");
    ldd.initConsoleState();
  },
  // 显示中控台
  showConsole: function () {
    consoleEl.classList.add("show");
    ldd.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function () {
    if (consoleEl.classList.contains("show")) {
      // 如果是一般控制台，就关闭一般控制台
      consoleEl.classList.remove("show");
    } else if (consoleEl.classList.contains("reward-show")) {
      // 如果是打赏控制台，就关闭打赏控制台
      consoleEl.classList.remove("reward-show");
    }
    // 获取center-console元素
    const centerConsole = document.getElementById("center-console");

    // 检查center-console是否被选中
    if (centerConsole.checked) {
      // 取消选中状态
      centerConsole.checked = false;
    }
  },
  // 播放音乐
  playMusic(songs) {
    const anMusicPage = document.getElementById("anMusic-page");
    const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    const allAudios = metingAplayer.list.audios;
    if (!selectRandomSong.includes(randomSong.name)) {
      // 如果随机到的歌曲已经未被随机到过，就添加进metingAplayer.list
      metingAplayer.list.add([randomSong]);
      // 播放最后一首(因为是添加到了最后)
      metingAplayer.list.switch(allAudios.length);
      // 添加到已被随机的歌曲列表
      selectRandomSong.push(randomSong.name);
    } else {
      // 随机到的歌曲已经在播放列表中了
      // 直接继续随机直到随机到没有随机过的歌曲，如果全部随机过了就切换到对应的歌曲播放即可
      let songFound = false;
      while (!songFound) {
        const newRandomIndex = Math.floor(Math.random() * songs.length);
        const newRandomSong = songs[newRandomIndex];
        if (!selectRandomSong.includes(newRandomSong.name)) {
          metingAplayer.list.add([newRandomSong]);
          metingAplayer.list.switch(allAudios.length);
          selectRandomSong.push(newRandomSong.name);
          songFound = true;
        }
        // 如果全部歌曲都已被随机过，跳出循环
        if (selectRandomSong.length === songs.length) {
          break;
        }
      }
      if (!songFound) {
        // 如果全部歌曲都已被随机过，切换到对应的歌曲播放
        const palyMusicIndex = allAudios.findIndex(song => song.name === randomSong.name);
        if (palyMusicIndex != -1) metingAplayer.list.switch(palyMusicIndex);
      }
    }

    console.info("已随机歌曲：", selectRandomSong, "本次随机歌曲：", randomSong.name);
  },

  // 监听音乐背景改变
  addEventListenerMusic: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    const anMusicBtnGetSong = anMusicPage.querySelector("#anMusicBtnGetSong");
    const anMusicRefreshBtn = anMusicPage.querySelector("#anMusicRefreshBtn");
    const anMusicSwitchingBtn = anMusicPage.querySelector("#anMusicSwitching");
    const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
    //初始化音量
    metingAplayer.volume(0.8, true);
    metingAplayer.on("loadeddata", function () {
      ldd.changeMusicBg();
    });

    aplayerIconMenu.addEventListener("click", function () {
      document.getElementById("menu-mask").style.display = "block";
      document.getElementById("menu-mask").style.animation = "0.5s ease 0s 1 normal none running to_show";
      anMusicPage.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity = "1";
    });

    function anMusicPageMenuAask() {
      if (window.location.pathname != "/entertain/music/") {
        document.getElementById("menu-mask").removeEventListener("click", anMusicPageMenuAask);
        return;
      }

      anMusicPage.querySelector(".aplayer-list").classList.remove("aplayer-list-hide");
    }

    document.getElementById("menu-mask").addEventListener("click", anMusicPageMenuAask);

    // 监听增加单曲按钮
    anMusicBtnGetSong.addEventListener("click", () => {
      if (changeMusicListFlag) {
        const anMusicPage = document.getElementById("anMusic-page");
        const metingAplayer = anMusicPage.querySelector("meting-js").aplayer;
        const allAudios = metingAplayer.list.audios;
        const randomIndex = Math.floor(Math.random() * allAudios.length);
        // 随机播放一首
        metingAplayer.list.switch(randomIndex);
      } else {
        ldd.cacheAndPlayMusic();
      }
    });
    anMusicRefreshBtn.addEventListener("click", () => {
      localStorage.removeItem("musicData");
      ldd.snackbarShow("已移除相关缓存歌曲");
    });
    anMusicSwitchingBtn.addEventListener("click", () => {
      ldd.changeMusicList();
    });

    // 默认加载的歌单
    if (GLOBAL_CONFIG.music_page_default === "custom") {
      ldd.changeMusicList();
    }

    // 监听键盘事件
    //空格控制音乐
    document.addEventListener("keydown", function (event) {
      //暂停开启音乐
      if (event.code === "Space") {
        event.preventDefault();
        metingAplayer.toggle();
      }
      //切换下一曲
      if (event.keyCode === 39) {
        event.preventDefault();
        metingAplayer.skipForward();
      }
      //切换上一曲
      if (event.keyCode === 37) {
        event.preventDefault();
        metingAplayer.skipBack();
      }
      //增加音量
      if (event.keyCode === 38) {
        if (musicVolume <= 1) {
          musicVolume += 0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
      //减小音量
      if (event.keyCode === 40) {
        if (musicVolume >= 0) {
          musicVolume += -0.1;
          metingAplayer.volume(musicVolume, true);
        }
      }
    });
  },
  //匿名评论
  addRandomCommentInfo: function () {
    // 从形容词数组中随机取一个值
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    // 从蔬菜水果动物名字数组中随机取一个值
    const randomName = vegetablesAndFruits[Math.floor(Math.random() * vegetablesAndFruits.length)];

    // 将两个值组合成一个字符串
    const name = `${randomAdjective}${randomName}`;

    function dr_js_autofill_commentinfos() {
      var lauthor = [
          "#author",
          "input[name='comname']",
          "#inpName",
          "input[name='author']",
          "#ds-dialog-name",
          "#name",
          "input[name='nick']",
          "#comment_author",
        ],
        lmail = [
          "#mail",
          "#email",
          "input[name='commail']",
          "#inpEmail",
          "input[name='email']",
          "#ds-dialog-email",
          "input[name='mail']",
          "#comment_email",
        ],
        lurl = [
          "#url",
          "input[name='comurl']",
          "#inpHomePage",
          "#ds-dialog-url",
          "input[name='url']",
          "input[name='website']",
          "#website",
          "input[name='link']",
          "#comment_url",
        ];
      for (var i = 0; i < lauthor.length; i++) {
        var author = document.querySelector(lauthor[i]);
        if (author != null) {
          author.value = name;
          author.dispatchEvent(new Event("input"));
          author.dispatchEvent(new Event("change"));
          break;
        }
      }
      for (var j = 0; j < lmail.length; j++) {
        var mail = document.querySelector(lmail[j]);
        if (mail != null) {
          mail.value = visitorMail;
          mail.dispatchEvent(new Event("input"));
          mail.dispatchEvent(new Event("change"));
          break;
        }
      }
      return !1;
    }

    dr_js_autofill_commentinfos();
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    input.focus();
    input.setSelectionRange(-1, -1);
  },
  // 音乐绑定事件
  musicBindEvent: function () {
    document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
      ldd.musicTelescopic();
    });
    document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
      ldd.musicToggle(false);
    });
  },
  // 判断是否是移动端
  hasMobile: function () {
    let isMobile = false;
    if (
      navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      ) ||
      document.body.clientWidth < 800
    ) {
      // 移动端
      isMobile = true;
    }
    return isMobile;
  },

  // 创建二维码
  qrcodeCreate: function () {
    if (document.getElementById("qrcode")) {
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark: "#000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  },
  //添加赞赏蒙版
  addRewardMask: function () {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "flex";
    document.querySelector(".reward-main").style.zIndex = "102";
    document.getElementById("quit-box").style.display = "flex";
  },
  // 移除赞赏蒙版
  removeRewardMask: function () {
    if (!document.querySelector(".reward-main")) return;
    document.querySelector(".reward-main").style.display = "none";
    document.getElementById("quit-box").style.display = "none";
  },
}