var posts=["2020/05/28/Butterfly-安裝文檔-一-快速開始/","2020/05/28/Butterfly-安裝文檔-三-主題配置-1/","2020/05/28/Butterfly-安裝文檔-二-主題頁面/","2020/05/28/Butterfly-安裝文檔-六-進階教程/","2020/05/28/Butterfly-安裝文檔-五-主題問答/","2020/05/28/Butterfly-安裝文檔-四-主題配置-2/","2020/07/31/Butterfly添加Aplayer教程/","2024/04/19/hexo魔改汇总/","2018/07/24/markdown/","2024/04/10/作品集/","2020/10/28/when-set-the-top-img-to-false/","2020/01/05/標籤外掛-Tag-Plugins/","2024/04/10/正则表达式常用/","2020/06/13/自定義代碼配色/","2024/04/10/猫狗英文汇总/","2020/12/30/自定義側邊欄/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};