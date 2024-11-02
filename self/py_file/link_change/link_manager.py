import yaml
import os
import datetime
from typing import Optional, Dict, List

class LinkManager:
    def __init__(self, file_path: str, backup_dir: str = "./"):
        self.file_path = file_path
        self.backup_dir = backup_dir
        self.content = self.read_link_file()
        # print(self.content)
        self.new_content = self.parse_content(self.content.copy())  # 用于存储解析后的内容
        self.classlist = ""
        self.get_classlist()

    # 读取文件
    def read_link_file(self) -> List[Dict]:
        with open(self.file_path, "r", encoding="utf-8") as file:
            return yaml.safe_load(file)

    # 备份文件
    def backup_file(self):
        backup_file = os.path.join(self.backup_dir, f"link_backup_{datetime.datetime.now().strftime('%Y%m%d')}.yml")
        os.makedirs(self.backup_dir, exist_ok=True)
        iltered_content = self.filter_null_values(self.content)
        with open(backup_file, "w", encoding="utf-8") as backup:
            yaml.dump(iltered_content, backup, allow_unicode=True, sort_keys=False, default_flow_style=False)

    # 更新文件
    def update_link_file(self):
        self.backup_file()
        filtered_content = self.filter_null_values(self.new_content)
        with open(self.file_path, "w", encoding="utf-8") as file:
            # 将 new_content 转换回原始格式以保存
            yaml.dump(self.reformat_content(filtered_content), file, allow_unicode=True, sort_keys=False, default_flow_style=False)

    # 递归过滤掉 null 值
    def filter_null_values(self, data):
        if isinstance(data, dict):
            return {k: self.filter_null_values(v) for k, v in data.items() if v is not None}
        elif isinstance(data, list):
            return [self.filter_null_values(v) for v in data if v is not None]
        else:
            return data

    def parse_content(self, content: List[Dict]) -> List[Dict]:
        for item in content:
            if 'class_name' in item and 'class_desc' in item:
                # 解析出 class_name_text 和 class_desc_text
                item['class_name_text'] = self.extract_class_name_text(item['class_name'])
                item['class_icon'] = self.extract_class_icon(item['class_name'])
                item['style_color'] = self.extract_style_color(item['class_name'])
                item['class_desc_text'] = self.extract_class_desc_text(item['class_desc'])
        return content

    def extract_class_name_text(self, class_name: str) -> str:
        # 从 class_name 中提取 class_name_text
        class_name_text = class_name.split('>')[-1] if '>' in class_name else class_name
        # print(class_name_text)
        return class_name_text


    def extract_class_icon(self, class_name: str) -> str:
        # 从 class_name 中提取 class_icon
        class_icon = class_name.split('"')[1] if '"' in class_name else class_name
        # print(class_icon)
        return class_icon

    def extract_style_color(self, class_name: str) -> str:
        # 从 class_name 中提取 style_color
        style_color = class_name.split('color:')[-1].split(';')[0].strip() if 'color:' in class_name else class_name
        # print(style_color)
        return style_color

    def extract_class_desc_text(self, class_desc: str) -> str:
        # 从 class_desc 中提取 class_desc_text
        class_desc_text = class_desc.split(';">')[-1].split('</span>')[0] if ';">' in class_desc else class_desc
        # print(class_desc_text)
        return class_desc_text


    def reformat_content(self, content: List[Dict]) -> List[Dict]:
        new_content = []
        # 重新构建 class_name 和 class_desc
        for item in content:
            new_item = {key: value for key, value in item.items() if key not in ['class_name_text','class_icon','style_color','class_desc_text']}
            new_content.append(new_item)
        return new_content

    def format_class_name(self, class_icon: str, style_color: str, class_name_text: str) -> str:
        return f'<i class="{class_icon}" style="color:{style_color};padding-right: 0.4rem"></i>{class_name_text}'

    def format_class_desc(self, class_desc_text: str) -> str:
        return f'<span style="font-style: italic;">{class_desc_text}</span>'

    def get_class_names(self) -> List[str]:
        return [item['class_name_text'] for item in self.new_content]

    def get_class(self, class_name_text: str) -> Optional[Dict]:
        for item in self.new_content:
            if item['class_name_text'] == class_name_text:
                return item
        if self.new_content[int(class_name_text)-1]:
            item = self.new_content[int(class_name_text)-1]
            return item
        return None

    def get_class_by_num(self, class_name_text_num: str) -> Optional[Dict]:
        if self.new_content[int(class_name_text_num)-1]:
            item = self.new_content[int(class_name_text_num)-1]
            return item
        return None

    def get_subclass(self, class_name: str, subclass_name: str) -> Optional[Dict]:
        class_item = self.get_class(class_name)
        if not class_item:
            class_item = self.get_class(class_name)
        if class_item:
            for link in class_item['link_list']:
                if link['name'] == subclass_name:
                    return link
            if class_item['link_list'][int(subclass_name)]:
                link = class_item['link_list'][(subclass_name)]
                return link
        return None

    def get_subclass_by_num(self, class_name_text_num: str, subclass_name_num: str) -> Optional[Dict]:
        class_item = self.get_class(class_name_text_num)
        if not class_item:
            class_item = self.get_class(class_name_text_num)
        if class_item:
            if class_item['link_list'][subclass_name_num]:
                link = class_item['link_list'][subclass_name_num]
                return link
        return None

    def add_class(self, class_icon: str, style_color: str, class_name_text: str, class_desc_text: str,
                  links: [List[Dict]] = None):

        try:
            if self.get_class(class_name_text):
                print(f"大类 '{class_name_text}' 已存在。")
                return
        except:
            print(f"准备增加新大类 '{class_name_text}'。")
        new_class = {
            'class_name_text': class_name_text,
            'class_desc_text': class_desc_text,
            'style_color': style_color,
            'class_icon': class_icon,
            'link_list': links or [],
            'class_name' : self.format_class_name(class_icon,style_color,class_name_text),
            'class_desc': self.format_class_desc(class_desc_text),
        }

        if class_name_text and class_desc_text and style_color and class_icon:
            self.new_content.append(new_class)
            self.update_link_file()
            print(f"成功添加大类: {class_name_text}")
            self.classes[str(len(self.classes))] = class_name_text

    def add_subclass(self, class_name: str, name: str, link: str, avatar: str = "", descr: str = "", name_new: str = ""):
        class_item = self.get_class(class_name)
        if not class_item:
            print(f"未找到大类: {class_name}")
            if link is not None or link!='':
                # 增加大类时，未指定大类名称则加入 "其他" 类
                other_class = self.find_or_create_other_class()
                class_item = other_class
                print(f"因未输入大类名称，默认加入到 '{class_item['class_name_text']}' 类中。")

        link_names = []
        for ls in class_item['link_list']:
            link_names.append(ls['name'])
        print('已有小类：',link_names)
        if (name not in link_names) and link!="" and link is not None and name!="":
            new_link = {'name': name, 'link': link, 'avatar': avatar, 'descr': descr}
            class_item['link_list'].append(new_link)
            self.update_link_file()
            print(f"成功添加链接到大类: {class_name}")
            print(f"成功增加链接：\n'name': {name},\n'link': {link},\n'avatar': {avatar},\n'descr': {descr}")

        elif name in link_names:
            print(f"已有该链接: {name}，已经跳转小类修改命令")
            self.update_subclass(class_name,name,name_new,link,avatar,descr)
        elif link!="" and link is None:
            print(f"链接为空，不录入: {name}")
            print(f"已输入基础信息：\n'name': {name},\n'link': {link},\n'avatar': {avatar},\n'descr': {descr}")
        else:
            print(f"未成功增加链接，请确认原因：\n'class_name': {class_name} \n'name': {name},\n'link': {link},\n'avatar': {avatar},\n'descr': {descr}")

    def change_subclass_class(self, old_class_name: str, new_class_name: str, subclass_name: str):
        old_class = self.get_class(old_class_name)
        new_class = self.get_class(new_class_name)
        if not old_class or not new_class:
            print(f"未找到大类: {old_class_name} 或 {new_class_name}")
            return
        subclass = self.get_subclass(old_class_name, subclass_name)
        if not subclass:
            print(f"未找到小类: {subclass_name} 在大类: {old_class_name}")
            return
        old_class['link_list'].remove(subclass)
        new_class['link_list'].append(subclass)
        self.update_link_file()
        print(f"成功将小类 '{subclass_name}' 从大类 '{old_class_name}' 移动到大类 '{new_class_name}'")

    def remove_class(self, class_name: str):
        confirm = input(f"确认删除大类 '{class_name}' 及其所有小类？(y/n): ")
        if confirm.lower() == 'y':
            self.new_content = [item for item in self.new_content if item['class_name'] != class_name]
            self.update_link_file()
            print(f"成功删除大类: {class_name}")
        else:
            print("删除操作已取消。")

    def remove_subclass(self, class_name: str, subclass_name: str):
        class_item = self.get_class(class_name)
        if not class_item:
            print(f"未找到大类: {class_name}")
            return
        confirm = input(f"确认删除小类 '{subclass_name}'？(y/n): ")
        if confirm.lower() == 'y':
            class_item['link_list'] = [link for link in class_item['link_list'] if link['name'] != subclass_name]
            self.update_link_file()
            print(f"成功删除小类 '{subclass_name}' 从大类 '{class_name}'")
        else:
            print("删除操作已取消。")

    def update_class(self, current_class_name_text: str, class_icon: Optional[str] = None, style_color: Optional[str] = None, class_name_text: Optional[str] = None, class_desc_text: Optional[str] = None):
        current_class_name_text = self.deal_class_input(current_class_name_text)
        class_item = self.get_class(current_class_name_text)
        if not class_item:
            print(f"未找到大类: {current_class_name_text}")
            return
        class_item_backup = class_item.copy()
        if class_icon:
            class_item['class_icon'] = class_icon
        if style_color:
            class_item['style_color'] = style_color
        if class_name_text:
            class_item['class_name_text'] = class_name_text
        if class_desc_text:
            class_item['class_desc_text'] = class_desc_text
        print(f"更新前的内容为：\n", '\n'.join(key + ':' + values for key, values in class_item_backup.items()))
        print(f"更新后的内容为：\n", '\n'.join(key + ':' + values for key, values in class_item.items()))
        confirm = input(f"是否确认更新？")
        if confirm not in ["N", "n", 'no', 'No', 'NO']:
            self.update_link_file()
            print(f"成功更新大类: {current_class_name_text}")
        else:
            print(f"取消更新")

    def update_subclass(self, class_name: str, subclass_name: str, subclass_name_new: Optional[str] = None, link: Optional[str] = None, avatar: Optional[str] = None, descr: Optional[str] = None):
        # class_name = self.deal_class_input(inputs=class_name)
        # subclass_name = self.deal_subclass_input(inputs=subclass_name)
        try:
            subclass = self.get_subclass(class_name, subclass_name)
        except:
            subclass = self.get_subclass(class_name, subclass_name)
        if not subclass:
            print(f"未找到小类: {subclass_name} 在大类: {class_name}")
            return
        subclass_backup = subclass.copy()
        if subclass_name and subclass_name_new:
            subclass['name'] = subclass_name_new
        if link:
            subclass['link'] = link
        if avatar:
            subclass['avatar'] = avatar
        if descr:
            subclass['descr'] = descr
        print(f"更新前的内容：\n", '\n'.join(key + ':' + str(values) for key, values in subclass_backup.items()))
        print(f"准备更新的内容：\n", '\n'.join(str(key) + ':' + str(values) for key, values in subclass.items()))
        if input("是否确认更新？") not in ["N","n",'no','No','NO']:
            self.update_link_file()
            print(f"在大类: {class_name} 中，成功更新小类: {subclass_name} ")
            # print(f"更新内容：\n",'\n'.join(key+':'+values for key,values in  subclass.items()))
        else:
            print(f"取消更新")

    # 提供的API接口函数
    def get_all_classes(self) -> List[Dict]:
        return self.new_content

    def get_class_info(self, class_name_text: str,print_info: bool=False) -> Optional[Dict]:
        class_item = self.get_class(class_name_text)
        if not class_item:
            class_item = self.get_class(class_name_text)
            if not class_item:
                print(f"未找到大类: {class_name_text}")
                return None
        if print_info:
            print(f"大类名称: {class_item['class_name_text']}")
            print(f"大类描述: {class_item['class_desc_text']}")
            self.subclass_backup={}
            if 'link_list' in class_item and class_item['link_list']:
                print("链接:")
                for j, link in enumerate(class_item['link_list'], start=1):
                    self.subclass_backup[str(j)] = link['name']
                    print(f"{j}. name: {link['name']}；url: {link['link']}")
            else:
                print("链接: 无")

        return class_item

    def get_subclass_info(self, class_name_text: str, subclass_name: str,print_info: bool =False) -> Optional[Dict]:
        class_item = self.get_class(class_name_text)
        if not class_item:
            class_item = self.get_class(class_name_text)
            if not class_item:
                print(f"未找到大类: {class_name_text}")
                return None

        subclass = self.get_subclass(class_item['class_name_text'], subclass_name)
        if not subclass:
            subclass = self.get_subclass(class_name_text, subclass_name)
            if not subclass:
                print(f"未找到小类: {subclass_name} 在大类: {class_name_text}")
                return None

        if print_info:
            print(f"大类名称: {class_item['class_name_text']}")
            print(f"小类名称: {subclass['name']}")
            print(f"小类链接: {subclass['link']}")
            if 'avatar' in subclass:
                print(f"小类头像: {subclass['avatar']}")
            if 'descr' in subclass:
                print(f"小类描述: {subclass['descr']}")

        return subclass

    def find_or_create_other_class(self):
        # 查找 "其他" 类，如果不存在则创建
        other_class = self.get_class("其他")
        if not other_class:
            self.add_class("", "#000000", "其他", "备用分类")
            other_class = self.get_class("其他")
        return other_class

    def convert_text_to_format(self,input_text: str) -> Dict[str, str]:
        # 解析输入的文本，将输入格式转换为字典
        input_text = input_text.replace('；', ';').replace('\n', ';').replace('\r', ';')  # 将不同的分隔符统一替换为英文分号 ';'
        input_text = input_text.replace('：', ':')
        lines = [line.strip() for line in input_text.strip().split(';')]  # 统一使用英文分号进行分割
        data = {}
        for line in lines:
            if line.startswith(("类名", "大类", "class_name","cn","class",'cl',"CN","CL")):
                input_class_name = line.split(":", 1)[-1].strip()
                input_class_name = self.deal_class_input(inputs=input_class_name)
                data['class_name_text'] = input_class_name
            elif line.startswith(("新类名", "新大类", "class_name_new",'cnn',"class_new","CNN")):
                data['class_name_text_new'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("类描述", "class_descr","cd","CD")):
                data['class_desc_text'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("图标", "icon","i","I","ci","CI")):
                data['class_icon'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("颜色", "color","c","C","CC","cc","sc","SC")):
                data['style_color'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("新名称", "name_new","nn","NN")):
                data['name_new'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("名称", "name","n","N")):
                input_subclass_name = line.split(":", 1)[-1].strip()
                class_name,subclass_name = self.deal_subclass_input(inputs=input_subclass_name)
                if class_name!='':
                    print(class_name)
                    data['class_name_text'] = class_name
                data['name'] = subclass_name
            elif line.startswith(("URL", "url", "link","l","u","U","L")):
                data['link'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("头像", "avatar","a","A")):
                data['avatar'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("描述", "descr","d","D")):
                data['descr'] = line.split(":", 1)[-1].strip()
            elif line.startswith(("截图", "screenshot","ss","s","S","SS")):
                data['screenshot'] = line.split(":", 1)[-1].strip()
            else:
                print("特殊处理中...",line)
                if line.isdigit():
                    print("处理大类中...")
                    input_class_name = line.strip()
                    input_class_name = self.deal_class_input(inputs=input_class_name)
                    print(input_class_name)
                    data['class_name_text'] = input_class_name
                elif len(line.split('.'))==2 and line.split('.')[1].isdigit():
                    print("处理大类与链接名...")
                    class_name, subclass_name = self.deal_subclass_input(inputs=str(line))
                    if class_name!='':
                        data['class_name_text'] = class_name
                    data['name'] = subclass_name
                elif line.startswith("http") and line.endswith((".ico",".svg",".jpg",".jpeg",".webp","png")):
                    print("处理头像中...")
                    data['avatar'] = line.strip()
                elif line.startswith("http"):
                    print("处理链接...")
                    data['link'] = line.strip()
        return data

    def deal_class_input(self, text="请输入大类名称/数字", inputs=''):
        if inputs:
            try:
                # 尝试从字典中获取对应的类别名称
                return self.classes[inputs]
            except KeyError:
                class_lists = self.classes.values()
                print(class_lists)
                if inputs in class_lists:
                    return class_lists
                else:
                    print("找不到该大类,准备新增：", inputs)
                    # # 捕获 KeyError 后，提示用户手动输入
                    # input_class_name = input(text)
                    return inputs
            except Exception as e:
                # 捕获其他异常并打印
                print(f"未知错误: {e}")
                return inputs
        else:
            print("输入内容为空：", inputs)
            return inputs


    def deal_subclass_input(self,text="请输入小类名称/数字",inputs=''):
        if inputs!='':
            try:
                # print("当前：", inputs)
                class_name = self.classes[inputs.split('.')[0]]
                subclass_name = self.subclasses[inputs]
                return class_name,subclass_name
            except:
                print("找不到该小类：", inputs)
                return '',inputs
        else:
            input_subclass = input(text)
            try:
                class_name = self.classes[inputs.split('.')[0]]
                subclass_name = self.subclasses[input_subclass]
            except:
                subclass_name = input_subclass
                class_name = ''
            return class_name,subclass_name

    def get_classlist(self):
        self.classes = {}
        self.subclasses = {}
        for i, class_name_text in enumerate(self.get_class_names(), start=1):
            self.classes[str(i)] = class_name_text
            subclasses = self.get_class_info(class_name_text)
            for j, link_lists in enumerate(subclasses['link_list'], start=1):
                self.subclasses[str(i) + '.' + str(j)] = link_lists['name']
                # print(f"{i}.{j} {class_name_text},{link_lists['name']}", end="; ")
            self.classlist += f"{i}. {class_name_text}; "

    def interactive_mode(self):
        while True:
            # 输出所有大类名称

            print("\n当前所有大类名称:",end=' ')
            print(self.classlist)
            print()  # 在所有输出完成后再换行

            print("\n操作选项:1. 查询信息;2. 添加大类;3. 添加小类;4. 修改大类;5. 修改小类;6. 更换小类到其他大类;0. 退出;(注：输入'.X(.X)'，可直接查询大(小)类)")
            # print("7. 删除大类")
            # print("8. 删除小类")

            choice = input("请选择一个操作: ")
            if choice == '1' or choice == '1' :
                class_name_text = self.deal_class_input("查询信息：请先输入大类名称/数字: ")
                class_infos = self.get_class_info(class_name_text,True)
                input_subclass_name = input("查询信息：请输入小类名称/数字: ")
                if not input_subclass_name or input_subclass_name in ['0',''] :
                    print("返回顶层菜单...")
                    continue
                else:
                    subclass_name = self.subclass_backup[input_subclass_name]
                    subclass_infos = self.get_subclass_info(class_name_text, subclass_name,True)
            elif choice == '2':
                input_text = input("增加大类：输入大类信息(格式: 大类名称；大类描述；图标类名；图标颜色；): ")
                data = self.convert_text_to_format(input_text)
                self.add_class(data.get('class_icon',None), data.get('style_color','#FF6666'), data.get('class_name_text',None ),
                               data.get('class_desc_text', ))
            elif choice == '3':
                input_text = input("增加小类：输入相关信息(格式: 大类；名称；URL；头像；描述): ")
                data = self.convert_text_to_format(input_text)
                self.add_subclass(data.get('class_name_text', None), data.get('name', None), data.get('link', None), data.get('avatar','/img/friend_404.gif'),
                                  data.get('descr', None))
            elif choice == '4':
                input_text = input("修改大类：输入新的大类信息(格式: 大类名称；大类描述；图标类名；图标颜色；，留空则不修改): ")
                if input_text != "" and len(input_text.replace("；", ";").split(';')) >= 2:
                    data = self.convert_text_to_format(input_text)
                    self.update_class(data.get('class_name_text', None), data.get('class_icon', None), data.get('style_color', None),
                                      data.get('class_name_text_new', None), data.get('class_desc_text', None))
                else:
                    if input_text != "":
                        class_name_text = input_text
                        print(f"修改大类：{self.classes[class_name_text]}")
                    else:
                        class_name_text = input(f"修改哪一个大类：{self.classlist}")
                    input_text = input("修改大类：输入新的大类信息(格式: 大类名称；大类描述；图标类名；图标颜色；，留空则不修改): ")
                    data = self.convert_text_to_format(input_text)
                    self.update_class(data.get('class_name_text', self.classes[class_name_text]), data.get('class_icon', None),
                                      data.get('style_color', None),
                                      data.get('class_name_text_new', None), data.get('class_desc_text', None))
            elif choice == '5':
                input_text = input("修改小类：输入新的小类信息(格式：大类.小类；名称；URL；头像；描述;留空则不修改): ")
                if input_text!="" and len(input_text.replace("；",";").split(';'))>=2:
                    data = self.convert_text_to_format(input_text)
                    self.update_subclass(data.get('class_name', None), data.get('name', None), data.get('name_new', None), data.get('link', None),
                                         data.get('avatar', None), data.get('descr', None))
                else:
                    if input_text!="":
                        class_name_text = input_text
                        print(f"查询大类：{self.classes[class_name_text]}")
                    else:
                        class_name_text = input(f"查询哪一个大类：{self.classlist}")
                    class_infos = self.get_class_info(class_name_text, True)
                    input_subclass_name = input("查询信息：请输入小类名称/数字: ")
                    if not input_subclass_name or input_subclass_name in ['0', '']:
                        print("返回顶层菜单...")
                        continue
                    else:
                        subclass_name = self.subclass_backup[input_subclass_name]
                        subclass_infos = self.get_subclass_info(class_name_text, subclass_name, True)
                        input_text = input("修改小类：输入新的小类信息(格式：名称；URL；头像；描述;留空则不修改): ")
                        data = self.convert_text_to_format(input_text)
                        print(data)
                        self.update_subclass(data.get('class_name', class_infos['class_name_text']), data.get('name', subclass_infos['name']),
                                             data.get('name_new', None), data.get('link', None),
                                             data.get('avatar', None), data.get('descr', None))


            elif choice == '6':
                old_class_name = self.deal_class_input("输入当前小类所在的大类名称: ")
                if not old_class_name or old_class_name in ['0',''] :
                    print("返回顶层菜单...")
                    continue
                subclass_name = input("输入要移动的小类名称: ")
                new_class_name = input("输入新的大类名称: ")
                self.change_subclass_class(old_class_name, new_class_name, subclass_name)
            elif choice == '7':
                class_name_text = self.deal_class_input("输入要删除的大类名称: ")
                self.remove_class(class_name_text)
            elif choice == '8':
                class_name_text = self.deal_class_input("输入大类名称: ")
                class_infos = self.get_class_info(class_name_text,True)
                subclass_name = input("输入要删除的小类名称: ")
                self.remove_subclass(class_name_text, subclass_name)

            elif choice == '0':
                print("退出程序。")
                break
            # Handle direct category selection like 1.X
            elif choice.startswith('.'):
                if len(choice.split('.'))==2:
                    class_name_text = self.deal_class_input(inputs=choice.split('.')[1])
                    class_infos = self.get_class_info(class_name_text,True)
                elif len(choice.split('.'))==3:
                    class_name_text,subclass_name = self.deal_subclass_input(inputs=choice.split('.',1)[1])
                    class_infos = self.get_subclass_info(class_name_text,subclass_name, True)
            elif choice=='':
                continue
            else:
                print("选择直接输出小类增加。")
                data = self.convert_text_to_format(choice)
                self.add_subclass(data.get('class_name_text',), data.get('name',), data.get('link',), data.get('avatar','/img/friend_404.gif'),data.get('descr',))

# 测试函数
if __name__ == "__main__":
    # 目录位置
    link_file_path = "../../../_data/link.yml"
    # 定义备份文件路径
    backup_dir = "./link_backup"

    manager = LinkManager(link_file_path,backup_dir)

    # 启动交互模式
    manager.interactive_mode()


