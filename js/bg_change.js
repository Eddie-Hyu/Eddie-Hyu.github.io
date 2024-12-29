// 存数据
// name：命名 data：数据
function saveData(name, data) {
    localStorage.setItem(name, JSON.stringify({ 'time': Date.now(), 'data': data }))
}

// 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
function loadData(name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
        let t = Date.now() - d.time
        if (t < (time * 60 * 1000) && t > -1) return d.data;
    }
    return 0;
}

// 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取背景
try {
    let data = loadData('blogbg', 1440)
    if (data) changeBg(data, 1)
    else localStorage.removeItem('blogbg');
} catch (error) { localStorage.removeItem('blogbg'); }

// 切换背景函数
function changeBg(input) {
    const container = document.getElementById('web_bg');

    // Trim the input to remove unnecessary whitespace
    input = input.trim();

    // Handle URL input for images
    if (input.startsWith('http') && (input.match(/\.(jpeg|jpg|gif|png|webp)$/) != null)) {
        container.style.backgroundImage = `url(${input})`;
    }
    else if (input.startsWith('url') ) {
        container.style.backgroundImage = `${input}` ;
    }
    // Handle linear-gradient input
    else if (input.startsWith('linear-gradient')) {
        container.style.backgroundImage = input;
    }
    // Handle plain color input
    else if (/^#([0-9A-F]{3}){1,2}$/i.test(input) || input.match(/^rgba?\(/)) {
        container.style.backgroundColor = input;
        container.style.backgroundImage = 'none'; // Remove any existing background image
    } else {
        alert('Invalid input! Please enter a valid URL, color, or gradient.');
    }
    if (!flag) { saveData('blogbg', input) }
}

// 以下为2.0新增内容
// 背景图片设置
const data = {
    singleColor: [      // Single color
        "#5d8351",
        "#b1d5c8",
        "#ee7959",
        "#a9be7b",
        "#9d9d82",
        "#bfa782",
    ],
    gradientColor: [    // Gradient color
        "#eecda3, #ef629f",
        "#fce38a, #f38181",
        "#abdcff, #0396ff",
        "#fff6b7, #f6416c",
        "#fad7a1, #e96d71",
        "#eece13, #b210ff",
        ],
    PCurl: [
        "https://static.simpledesktops.com/uploads/desktops/2020/11/21/low-poly-ice-cream.png",
        "http://static.simpledesktops.com/uploads/desktops/2014/04/24/rainyDay_2880x1800.png",
        "http://static.simpledesktops.com/uploads/desktops/2014/05/27/diamantenherz_2880x1800.png",
        "http://static.simpledesktops.com/uploads/desktops/2014/03/05/dark_deer.png",
        "http://static.simpledesktops.com/uploads/desktops/2013/06/13/Unlucky_1.png",
        "http://static.simpledesktops.com/uploads/desktops/2013/02/14/grid.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/10/14/Iron_Man.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/10/10/icescream.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/09/23/owlsimple.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/09/14/jerrygarcia_2880x1800.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/06/12/Mountain.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/04/12/Caminhada.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/04/03/day_by_day.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/03/30/Pollution.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/03/30/Tarmac.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/02/16/desktop.png",
        "http://static.simpledesktops.com/uploads/desktops/2012/01/25/tetris.png",
    ],
    Mobileurl: [
        "https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg",
    ]
};

// 创建窗口
var winbox = ''

function createWinbox() {
    let div = document.createElement('div')
    document.body.appendChild(div)
    winbox = WinBox({
        id: 'changeBgBox',
        index: 999,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: '300px',
        height: "60%",
        background: '#49b1f5',
        onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>` },
        onrestore: () => { div.innerHTML = '' }
    });
    winResize();
    window.addEventListener('resize', winResize)

    // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义
    // 生成图片盒子
    function generateHTMLContent(data) {
        let htmlContent = `
            <div id="article-container" style="padding:10px;">
            
            <p><button onclick="localStorage.removeItem('blogbg');location.reload();" style="background:${data.singleColor[0]};display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>
            <h2 style="text-align: left;">输入链接/颜色直接改变</h2>
            <p><input id="bgUrlInput" type="text" placeholder="输入图片链接或颜色代码" style="width: 100%; padding: 10px; margin-bottom: 10px;" /></p>
            <p><button onclick="changeBg(document.getElementById('bgUrlInput').value);" style="background:#4CAF50;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;">应用背景</button></p>
            <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>
            <div class="bgbox">`;

        data.PCurl.forEach(url => {
            htmlContent += `<a href="javascript:;" rel="noopener external nofollow" class="imgbox" style="background-image:url(${url})" onclick="changeBg(this.style.backgroundImage)"></a>`;
        });

        htmlContent += `
            </div>
    
            <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>
            <div class="bgbox">`;

        data.gradientColor.forEach(gradient => {
            htmlContent += `<a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right,${gradient});" onclick="changeBg(this.style.background)"></a>`;
        });

        htmlContent += `
            </div>
            
            <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>
            <div class="bgbox">`;

        data.singleColor.forEach(color => {
            htmlContent += `<a href="javascript:;" rel="noopener external nofollow" class="box" style="background: ${color};" onclick="changeBg(this.style.background)"></a>`;
        });

        htmlContent += `
            </div>
        `;
        return htmlContent;
    }
    // Example of how to use the function:
    winbox.body.innerHTML = generateHTMLContent(data);

    document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        winbox.close();
    }});

}



// 适应窗口大小
function winResize() {
    let box = document.querySelector('#changeBgBox')
    if (!box || box.classList.contains('min') || box.classList.contains('max')) return // 2023-02-10更新
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
        winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
        winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
    if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');
    else createWinbox();
}







