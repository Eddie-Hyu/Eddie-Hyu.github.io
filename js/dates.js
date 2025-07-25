var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

//2020年4月4日 新冠肺炎哀悼日，清明节
//2010年4月14日，青海玉树地震
//2008年5月12日，四川汶川地震
//1937年7月7日,七七事变 又称卢沟桥事变
//2010年8月7日，甘肃舟曲特大泥石流
//8月14日，世界慰安妇纪念日
//1976年9月9日，毛主席逝世
//1931年9月18日，九一八事变
//烈士纪念日为每年9月30日
//1950年10月25日，抗美援朝纪念日
//1937年12月13日，南京大屠杀

// 公祭日
if (m == 5 && dd == 12) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        const  memorialText  = "今天是四川汶川地震" + (y - 2008).toString() + "周年纪念日\n🪔全民哀悼🪔"
        Swal.fire(memorialText );
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}

if (m == 7 && dd == 7) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        const  memorialText="今天是卢沟桥事变" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}


if (m == 8 && dd == 14) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;

}

if (m == 9 && dd == 9) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    const memorialText  = "今天是毛主席逝世" + (y - 1976).toString() + "周年纪念日\n🪔全国哀悼🪔"
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        Swal.fire(memorialText );
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}

if (m == 9 && dd == 18) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "今天是九一八事变" + (y - 1931).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;

}

if (m == 12 && dd == 13) {
    document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(90%);");
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "今天是南京大屠杀" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;

}

// 节假日
if (m == 10 && dd <= 3) {//国庆节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "祝祖国" + (y - 1949).toString() + "岁生日快乐！"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;

}
if (m == 8 && dd == 15) {//搞来玩的，小日子投降
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "小日子已经投降" + (y - 1945).toString() + "年了😃"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;

}
if (m == 1 && dd == 1) {//元旦节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = y.toString() + "年元旦快乐！🎉"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 3 && dd == 8) {//妇女节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "各位女神们，妇女节快乐！👩"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
l = ["非常抱歉，因为不可控原因，博客将于明天停止运营！", "好消息，日本没了！", "美国垮了，原因竟然是川普！", "微软垮了！", "你的电脑已经过载，建议立即关机！", "你知道吗？站长很喜欢你哦！", "一分钟有61秒哦", "你喜欢的人跟别人跑了！"]
if (m == 4 && dd == 1) {//愚人节，随机谎话
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = l[Math.floor(Math.random() * l.length)]
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 5 && dd == 1) {//劳动节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "劳动节快乐\n为各行各业辛勤工作的人们致敬！"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 5 && dd == 4) {//青年节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "青年节快乐\n青春不是回忆逝去,而是把握现在！"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 5 && dd == 20) {//520
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "今年是520情人节\n快和你喜欢的人一起过吧！💑"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 7 && dd == 1) {//建党节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "祝中国共产党" + (y - 1921).toString() + "岁生日快乐！"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 9 && dd == 10) {//教师节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "各位老师们教师节快乐！👩‍🏫"
        Swal.fire(memorialText); 
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if (m == 12 && dd == 25) {//圣诞节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "圣诞节快乐！🎄"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}

//传统节日部分

if ((y == 2023 && m == 4 && dd == 5) || (y == 2024 && m == 4 && dd == 4) || (y == 2025 && m == 4 && dd == 4)) {//清明节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "清明时节雨纷纷,一束鲜花祭故人💐"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((y == 2023 && m == 12 && dd == 22) || (y == 2024 && m == 12 && dd == 21) || (y == 2025 && m == 12 && dd == 21)) {//冬至
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")) {
    //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五")) {
    //元宵节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "元宵节快乐\n送你一个大大的灯笼🧅"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五")) {
    //端午节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "端午节快乐\n请你吃一条粽子🍙"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七")) {
    //七夕节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五")) {
    //中秋节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "中秋节快乐\n请你吃一块月饼🍪"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}
if ((lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九")) {
    //重阳节
    if (sessionStorage.getItem("isPopupWindow") != "1") {
        memorialText = "重阳节快乐\n独在异乡为异客，每逢佳节倍思亲"
        Swal.fire(memorialText);
        sessionStorage.setItem("isPopupWindow", "1");
    }
    // 选择 class 为 "announcement_content" 的元素
    var annoElement = document.querySelector('.announcement_content');
    console.log("add note:",memorialText)
    // 修改该元素中的文本内容
    annoElement.innerText += '\n'+memorialText;
}

// 切换主题提醒
// if (y == 2022 && m == 12 && (dd >= 18 && dd <= 20)) {
//     if (sessionStorage.getItem("isPopupWindow") != "1") {
//         Swal.fire("网站换成冬日限定主题啦⛄");
//         sessionStorage.setItem("isPopupWindow", "1");
//     }
// }
