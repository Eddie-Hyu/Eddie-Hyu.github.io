// 获取当前日期
const today = new Date();
const currentYear = today.getFullYear();
const lunarData = calendarFormatter.solar2lunar(today); // 使用 lunar.js 提供的 solar2lunar 函数

// 定义纪念日事件数组（包括公历和农历事件）
const memorialDays = [
    // 公历法定节假日
    {
        month: 1,
        day: 1,
        title: "元旦",
        message: "🎉新年快乐，万事如意🎉",
        isLunar: false
    },
    {
        month: 5,
        day: 1,
        title: "劳动节",
        message: "🛠️致敬每一位劳动者！🛠️",
        isLunar: false
    },
    {
        month: 10,
        day: 1,
        title: "国庆节",
        message: "🎉祝中华人民共和国繁荣昌盛🎉",
        isLunar: false
    },
    {
        month: 6,
        day: 1,
        title: "儿童节",
        message: "🎈祝小朋友们六一快乐🎈",
        isLunar: false
    },
    {
        month: 9,
        day: 10,
        title: "教师节",
        message: "👩‍🏫感谢老师的辛勤付出！👨‍🏫",
        isLunar: false
    },
    {
        month: 8,
        day: 1,
        title: "建军节",
        message: "🎖️致敬军人，保家卫国！🎖️",
        isLunar: false
    },
    // 农历法定节假日
    {
        lunarMonth: "正月",
        lunarDay: ["初一"],
        title: "春节",
        message: "🎊祝你新年快乐，万事如意🎊",
        isLunar: true
    },
    {
        lunarMonth: "正月",
        lunarDay: ["十五"],
        title: "元宵节",
        message: "🎉元宵节快乐，祝你团圆美满🎉",
        isLunar: true
    },
    {
        lunarMonth: "五月",
        lunarDay: ["初五"],
        title: "端午节",
        message: "🏮端午节安康，记得吃粽子🏮",
        isLunar: true
    },
    {
        lunarMonth: "八月",
        lunarDay: ["十五"],
        title: "中秋节",
        message: "🌕祝你中秋快乐，阖家团圆🌕",
        isLunar: true
    },
    {
        lunarMonth: "七月",
        lunarDay: ["初七"],
        title: "七夕节",
        message: "🌹祝你七夕快乐，心有所属🌹",
        isLunar: true
    },
    {
        lunarMonth: "九月",
        lunarDay: ["初九"],
        title: "重阳节",
        message: "🌼重阳节快乐，敬老爱老🌼",
        isLunar: true
    },
     // 特殊节假日和纪念日（部分按节气）
    {
        solarTerm: "清明",
        title: "清明节",
        message: "🕯️缅怀先人，寄托哀思🕯️",
        isLunar: false,
        isSolarTerm: true
    },
    // 特殊节日
    {
        month: 4,
        day: 1,
        title: "愚人节",
        message: "😂愚人节快乐，别被骗了！😂",
        year: null,
        getRandomMessage: function () {
            const l = [
                "非常抱歉，因为不可控原因，博客将于明天停止运营！",
                "好消息，日本没了！",
                "美国垮了，原因竟然是川普！",
                "微软垮了！",
                "你的电脑已经过载，建议立即关机！",
                "你知道吗？站长很喜欢你哦！",
                "一分钟有61秒哦",
                "你喜欢的人跟别人跑了！"
            ];
            return l[Math.floor(Math.random() * l.length)];
        },
        isLunar: false,
        isSpecial: true // 标识为特殊节日
    },
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
    // 重要纪念日
    {
        month: 4,
        day: 14,
        title: "青海玉树地震",
        year: 2010,
        message: "🪔全民哀悼🪔",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 5,
        day: 12,
        title: "四川汶川地震",
        year: 2008,
        message: "🪔全民哀悼🪔",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 7,
        day: 1,
        title: "中国共产党建党纪念日",
        message: "🎉庆祝中国共产党成立🎉",
        isLunar: false
    },
    {
        month: 7,
        day: 7,
        title: "卢沟桥事变",
        year: 1937,
        message: "🪔勿忘国耻，振兴中华🪔",
        isSadDay: true,
        isLunar: false
    },

    {
        month: 8,
        day: 1,
        title: "八一建军节",
        message: "🎉中国人民解放军建军纪念日🎉",
        isLunar: false
    },
    {
        month: 8,
        day: 14,
        title: "世界慰安妇纪念日",
        year: null,
        message: "🪔勿忘国耻，振兴中华🪔",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 9,
        day: 9,
        title: "毛主席逝世",
        year: 1976,
        message: "🪔全国哀悼🪔",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 9,
        day: 18,
        year: 1931,
        title: "九一八事变",
        message: "🪔勿忘国耻，振兴中华🪔",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 9,
        day: 30,
        title: "烈士纪念日",
        message: "🕯️缅怀烈士，永志不忘🕯️",
        isSadDay: true,
        isLunar: false
    },
    {
        month: 10,
        day: 25,
        year: 1950,
        title: "抗美援朝纪念日",
        message: "🎖️铭记历史，致敬英勇的战士🎖️",
        isLunar: false
    },
    {
        month: 12,
        day: 13,
        year: 1937,
        title: "南京大屠杀死难者国家公祭日",
        message: "🕯️缅怀南京大屠杀遇难者，铭记历史🕯️",
        isSadDay: true,
        isLunar: false
    },
     // 农历事件
    {
        lunarMonth: "正月",
        lunarDay: ["初一", "初二", "初三", "初四", "初五", "初六", "廿九", "三十"],
        title: "春节",
        message: "🎊祝你心想事成，诸事顺利🎊",
        isLunar: true
    },
    {
        lunarMonth: "正月",
        lunarDay: ["十五"],
        title: "元宵节",
        message: "送你一个大大的灯笼🧅",
        isLunar: true
    },
    // 二十四节气
    {
        solarTerm: "立春",
        title: "立春",
        message: "🍃立春，万物复苏🍃",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "雨水",
        title: "雨水",
        message: "🌧️雨水，降雨渐多，润物无声🌧️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "惊蛰",
        title: "惊蛰",
        message: "🌱惊蛰，春雷乍动，万物生长🌱",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "春分",
        title: "春分",
        message: "🌸春分，昼夜平分，春意盎然🌸",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "清明",
        title: "清明",
        message: "🌿清明，踏青扫墓，缅怀先人🌿",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "谷雨",
        title: "谷雨",
        message: "🌾谷雨，雨生百谷，播种好时节🌾",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "立夏",
        title: "立夏",
        message: "🌞立夏，夏日初始，万物繁茂🌞",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "小满",
        title: "小满",
        message: "🌿小满，麦穗渐满，农事正忙🌿",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "芒种",
        title: "芒种",
        message: "🌾芒种，播种收割，忙碌的时节🌾",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "夏至",
        title: "夏至",
        message: "☀️夏至，日长夜短，炎夏将至☀️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "小暑",
        title: "小暑",
        message: "🔥小暑，炎热渐临，暑气渐重🔥",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "大暑",
        title: "大暑",
        message: "🔥大暑，酷热难耐，盛夏之极🔥",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "立秋",
        title: "立秋",
        message: "🍂立秋，凉风渐起，秋意初显🍂",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "处暑",
        title: "处暑",
        message: "🍁处暑，暑气渐消，秋意渐浓🍁",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "白露",
        title: "白露",
        message: "🍂白露，秋凉初现，草木凝露🍂",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "秋分",
        title: "秋分",
        message: "🍁秋分，昼夜平分，秋意正浓🍁",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "寒露",
        title: "寒露",
        message: "🍂寒露，露气寒冷，秋高气爽🍂",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "霜降",
        title: "霜降",
        message: "❄️霜降，天气渐冷，霜叶红于二月花❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "立冬",
        title: "立冬",
        message: "❄️立冬，冬季来临，万物收藏❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "小雪",
        title: "小雪",
        message: "❄️小雪，初雪微落，寒气渐起❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "大雪",
        title: "大雪",
        message: "❄️大雪，雪量渐增，寒冬已至❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "冬至",
        title: "冬至",
        message: "❄️冬至，白昼最短，寒冬团圆❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "小寒",
        title: "小寒",
        message: "❄️小寒，寒冷渐重，料峭冬风❄️",
        isLunar: true,
        isSolarTerm: true
    },
    {
        solarTerm: "大寒",
        title: "大寒",
        message: "❄️大寒，寒冷至极，冬季的尾声❄️",
        isLunar: true,
        isSolarTerm: true
    }
];


// 遍历纪念日事件数组，匹配农历节日、节气、公历节日以及特殊节日
memorialDays.forEach(event => {
    let match = false;
    event.message = `今天是${event.title}\n${event.message}`;
    // 节气匹配
    if (event.isLunar && event.isSolarTerm && lunarData.Term === event.solarTerm) {
        match = true;
    }
    // 农历节日匹配
    else if (event.isLunar &&
         lunarData.lMonth === event.lunarMonth &&
         Array.isArray(event.lunarDay) &&
         lunarDay.IDayCn &&
         event.lunarDay.includes(lunarDay.IDayCn)) {
    match = true;
    }
    // 公历事件匹配
    else if (!event.isLunar && !event.isSpecial && today.getMonth() + 1 === event.month && today.getDate() === event.day) {
        match = true;
    }
    // 有年份的计算周年
    else if (event.year  && today.getMonth() + 1 === event.month && today.getDate() === event.day) {
        event.message = `${event.title}${currentYear - event.year}周年，${event.message}`;
        match = true;
    }
    // 特殊节日匹配（如愚人节）
    else if (event.isSpecial && today.getMonth() + 1 === event.month && today.getDate() === event.day) {
        match = true;
    }

    // 如果有匹配，调用显示函数
    if (match) {
        displayMemorialDay(event);
    }
});

// 函数来匹配和显示节日信息
function displayMemorialDay(event) {
    if (event.isSadDay) {
            document.documentElement.style.filter = "grayscale(90%)";
        }

    if (sessionStorage.getItem("isPopupWindow") !== "1") {
        Swal.fire(event.message); // 使用 Swal 弹窗显示节日信息
        sessionStorage.setItem("isPopupWindow", "1");
    }

    // 在页面中添加事件通知
    const annoElement = document.querySelector('.announcement_content');
    if (annoElement) {
        annoElement.innerText += `${event.message}`;
        console.log("add note:", `${event.message}`);
    }
}
