import yaml
import os
import datetime
import re

# 处理yml文件
class LinkManager:
    def __init__(self, file_path, backup_dir="./"):
        self.file_path = file_path
        self.backup_dir = backup_dir
        self.content = self.read_link_file()
        self.WebsiteManager = WebsiteManager(self.content)

    # 读取link.yml文件
    def read_link_file(self):
        with open(self.file_path, "r", encoding="utf-8") as file:
            content = yaml.safe_load(file)
        return content

    # 根据大类名称获取小类内容
    def get_links_by_class_name(self, class_name):
        for item in self.content:
            if item['class_name'] == class_name:
                return item
        return None

    # 备份link.yml内容
    def backup_file(self):
        backup_file = os.path.join(self.backup_dir, f"link_backup_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.yml")

        if not os.path.exists(self.backup_dir):
            os.makedirs(self.backup_dir)

        with open(backup_file, "w", encoding="utf-8") as backup:
            yaml.dump(self.content, backup, allow_unicode=True)

    # 更新link.yml内容
    def update_link_file(self):
        self.backup_file()

        with open(self.file_path, "w", encoding="utf-8") as file:
            yaml.dump(self.content, file, allow_unicode=True)

    # 增加链接到指定的大类中
    def add_link_to_class(self, class_name, name, link, avatar=None, descr=None):
        class_item = self.get_links_by_class_name(class_name)
        if class_item:
            new_link = {'name': name, 'link': link}
            if avatar:
                new_link['avatar'] = avatar
            if descr:
                new_link['descr'] = descr
            class_item['link_list'].append(new_link)
            self.update_link_file()
            print(f"成功添加链接到大类: {class_name}")
        else:
            print(f"未找到大类: {class_name}")


    # 获取所有大类名称的文本部分
    def get_all_class_names(self):
        class_names = []
        for item in self.content:
            class_name_text = re.sub(r'<[^>]+>', '', item['class_name'])  # 去除HTML标签
            class_names.append(class_name_text)
        return class_names

class MaterialWebsite:
    def __init__(self, name, link, avatar, descr):
        self.name = name
        self.link = link
        self.avatar = avatar
        self.descr = descr

    def update(self, name=None, link=None, avatar=None, descr=None):
        if name:
            self.name = name
        if link:
            self.link = link
        if avatar:
            self.avatar = avatar
        if descr:
            self.descr = descr

    def __repr__(self):
        return f"{self.name}: {self.descr} ({self.link})"




class WebsiteCollection:
    def __init__(self, class_name_text, class_desc_text, icon_class, style_color):
        self.class_name_text = class_name_text
        self.class_desc_text = class_desc_text
        self.icon_class = icon_class
        self.style_color = style_color
        self.link_list = []

    def add_website(self, name, link, avatar, descr):
        new_website = MaterialWebsite(name, link, avatar, descr)
        self.link_list.append(new_website)

    def remove_website(self, name):
        self.link_list = [site for site in self.link_list if site.name != name]

    def update_website(self, name, new_name=None, new_link=None, new_avatar=None, new_descr=None):
        for site in self.link_list:
            if site.name == name:
                site.update(new_name, new_link, new_avatar, new_descr)
                break

    def update_style(self, new_icon_class=None, new_style_color=None):
        if new_icon_class:
            self.icon_class = new_icon_class
        if new_style_color:
            self.style_color = new_style_color

    def list_websites(self):
        for site in self.link_list:
            print(site)

    def __repr__(self):
        return (f"<i class=\"{self.icon_class}\" style=\"color:{self.style_color};padding-right: 0.4rem\"></i>"
                f"{self.class_name_text} - <span style=\"font-style: italic;\">{self.class_desc_text}</span>")


class WebsiteManager:
    def __init__(self,content):
        self.content = content
        self.categories = self.get_category()

    def get_category(self):
        categories = {}
        for categorie in self.content:
            categories[class_name] = categorie

    def add_category(self, class_name_text, class_desc_text, icon_class, style_color):
        if class_name_text not in self.categories:
            self.categories[class_name_text] = WebsiteCollection(class_name_text, class_desc_text, icon_class, style_color)

    def remove_category(self, class_name_text):
        if class_name_text in self.categories:
            del self.categories[class_name_text]

    def update_category(self, old_class_name_text, new_class_name_text=None, new_class_desc_text=None, new_icon_class=None, new_style_color=None):
        if old_class_name_text in self.categories:
            collection = self.categories.pop(old_class_name_text)
            if new_class_name_text:
                collection.class_name_text = new_class_name_text
            if new_class_desc_text:
                collection.class_desc_text = new_class_desc_text
            collection.update_style(new_icon_class, new_style_color)
            self.categories[new_class_name_text or old_class_name_text] = collection

    def add_website_to_category(self, class_name_text, name, link, avatar, descr):
        if class_name_text in self.categories:
            self.categories[class_name_text].add_website(name, link, avatar, descr)

    def remove_website_from_category(self, class_name_text, name):
        if class_name_text in self.categories:
            self.categories[class_name_text].remove_website(name)

    def update_website_in_category(self, class_name_text, name, new_name=None, new_link=None, new_avatar=None, new_descr=None):
        if class_name_text in self.categories:
            self.categories[class_name_text].update_website(name, new_name, new_link, new_avatar, new_descr)

    def list_all_categories(self):
        for category in self.categories.values():
            print(category)
            category.list_websites()

    def __repr__(self):
        return "\n".join([f"{class_name_text}: {category}" for class_name_text, category in self.categories.items()])



def input_type():
    manager = WebsiteManager()

    def deal_input(input_text):
        input_text = input_text.replace('；', ';').replace('\n', ';').replace('\r', ';')  # 将不同的分隔符统一替换为英文分号 ';'
        input_text = input_text.replace('：', ':')
        input_text = tuple(input_text.split(';'))
        return input_text

    def manage_category(sub_type):
        if sub_type == "1.1":
            manager.add_category(deal_input("""示例如下：
                '素材网站';
                '素材网站合集';
                'fa-solid fa-pic';
                '#00cccc'
            """))
        elif sub_type == "1.2":
            manager.update_category(deal_input("""示例如下：
                '素材网站',
                new_class_name_text='更新后的素材网站';
                new_class_desc_text='更新后的素材网站合集描述';
                new_icon_class='fa fa-icon';
                new_style_color='#ff00ff';
            """))
        elif sub_type == "1.3":
            manager.remove_category(deal_input("""示例如下：'素材网站'"""))
        else:
            print("无效的分类管理选项，请重新输入。")

    def manage_website(sub_type):
        if sub_type == "2.1":
            manager.add_website_to_category(deal_input("""示例如下：
                '素材网站';
                "404 Illustrations（需要魔法）";
                "https://error404.fun/";
                "https://error404.fun/img/apple-icon-180x180.png";
                "免费提供404错误页面素材的网站"
            """))
        elif sub_type == "2.2":
            manager.update_website_in_category(deal_input("""示例如下：
                '素材网站';
                "网站名称";
                new_descr="更新后的描述信息"
            """))
        elif sub_type == "2.3":
            manager.remove_website_from_category(deal_input("""示例如下：
                '更新后的素材网站';
                "404 Illustrations（需要魔法）"
            """))
        else:
            print("无效的网站管理选项，请重新输入。")

    itype = input("""输入对应文字进行对应管理：
        1、对大分类进行管理；2、对网站进行管理；0、查看所有分类""")

    if itype == "1":
        sub_type = input("""输入对应文字进行管理：
            1.1、增加大分类；1.2、修改大分类；1.3、删除大分类""")
        manage_category(sub_type)
    elif itype == "2":
        sub_type = input("""输入对应文字进行管理：
            2.1、增加网站；2.2、修改网站；2.3、删除网站""")
        manage_website(sub_type)
    elif itype == "0":
        manager.list_all_categories()
    elif itype.startswith("1."):
        manage_category(itype)
    elif itype.startswith("2."):
        manage_website(itype)
    else:
        print("无效的输入，请重新输入。")


# 获取用户输入并验证
def get_user_input():
    class_name = input("请输入class_name: ")
    name = input("请输入name: ")
    link = input("请输入link: ")

    if not class_name or not name or not link:
        print("class_name, name和link为必填项，请重新输入。")
        return get_user_input()

    avatar = input("请输入avatar（可选）: ")
    descr = input("请输入descr（可选）: ")

    return class_name, name, link, avatar, descr

# 测试函数
if __name__ == "__main__":
    # 目录位置
    link_file_path = "../../../_data/link.yml"
    # 定义备份文件路径
    backup_dir = "./"

    # 读取文件内容
    manager = LinkManager(link_file_path)

    # 显示所有大类的文本名称
    manager.get_all_class_names()

    # 添加新链接
    class_name, name, link, avatar, descr = get_user_input()
    manager.add_link_to_class(class_name, name, link, avatar, descr)