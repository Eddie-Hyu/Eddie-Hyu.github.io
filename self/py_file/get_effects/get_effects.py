import os
import re
from datetime import datetime



# 备份旧文件
def backup_file(file_path):
    # Create a backup of the file with a timestamp, once per day
    backup_dir = "./backups"
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    today = datetime.now().strftime('%Y%m%d')
    backup_file_name = f"bak_{os.path.basename(file_path)}.{today}"
    backup_file_path = os.path.join(backup_dir, backup_file_name)

    if not os.path.exists(backup_file_path):
        with open(file_path, 'r', encoding='utf-8') as original_file:
            content = original_file.read()
        with open(backup_file_path, 'w', encoding='utf-8') as backup_file:
            backup_file.write(content)
    return backup_file_path

# 更新Index.md
def update_markdown(effect_path, final_output):
    # Read the content of the markdown file
    with open(effect_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Backup the original file
    # backup_file(effect_path)
    backup_file(source_markdown)

    # Find the existing gallery group div
    gallery_group_div = re.findall(r'<div[^>]*>(.*?)</div>', content, re.DOTALL)

    if gallery_group_div:
        # Replace the content within the gallery group div with final_output
        part_content = gallery_group_div[0]
        # print('final_output',final_output)
        updated_content = content.replace(part_content, '\n'+final_output+'\n')
        # print(updated_content)
        # Write the updated content back to the markdown file
        with open(effect_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(effect_path,' updated')

    else:
        print("No matching gallery group div found in the markdown file.")

# 输出已有的特效
def get_existing_output(effect_path):
    # 1. Read existing output file if it exists
    if os.path.exists(effect_path):
        with open(effect_path, 'r', encoding='utf-8') as file:
            existing_content = file.read()
        # Find the existing gallery group div
        gallery_group_div = re.findall(r'<div[^>]*>(.*?)</div>', existing_content, re.DOTALL)
        existing_output = gallery_group_div[0]
        # print(existing_output)
    else:
        existing_output = ""
    return existing_output

# 从已有的md中找到所有已有的
def extract_existing_data(content):
    existing_data = []
    # Match galleryGroup with or without the URL part
    matches = re.findall(r"'/effects/[^']+'", content)
    for path in matches:
        existing_data.append(os.path.basename(path).strip("'"))
    return existing_data


# 从html文件中获取名称
def extract_title(folder):
    index_file = os.path.join(effects_dir, folder, "index.html")
    if os.path.exists(effect_path):
        with open(index_file, 'r', encoding='utf-8') as file:
            content = file.read()
            match = re.search(r'<title>(.*?)</title>', content)
            if match:
                return match.group(1)
    return folder  # Default to folder name if <title> is not found


# 找图片
def find_url(title, markdown_file,gallery_path):
    if os.path.exists(markdown_file):
        # print("finding in ",markdown_file)
        with open(markdown_file, 'r', encoding='utf-8') as file:
            content = file.read()
            pattern = rf"(?:(?:\['{re.escape(title)}'\]\(.*?\))|(?:'{re.escape(title)}'))\s*!\[\]\((https?://[^\)]+)\)"
            match = re.search(pattern, content)
            # print(match)
            if match:
                matched_text = match.group(0)
                name = match.group(1)
                if f"['{title}']" not in matched_text and f"'{title}'" in matched_text:
                    # 更新url_name
                    new_content = add_link_2_pic_md(f"'{title}'", content, gallery_path)
                    # print(new_content)
                    with open(markdown_file, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                return name
    else:
        print("Can't find ",markdown_file)
    return None  # Return empty if URL is not found

# 替换图片库中的链接
def add_link_2_pic_md(name, content,gallery_path):
    url_name = "["+name+"]("+gallery_path+")"
    new_content = content.replace(name,url_name)
    return new_content


# 整理所有特效
def get_effects(existing_data,existing_content):

    # 2. Get folder names and process only new ones
    folder_names = [f for f in os.listdir(effects_dir) if os.path.isdir(os.path.join(effects_dir, f))]
    print("Finding ",len(folder_names)," effects")
    # print(folder_names)
    new_gallery_groups = []
    erro_gallery = []
    a = 0
    for folder in folder_names:
        # print(folder)
        if folder not in existing_data:
            # Extract Chinese name from index.html
            chinese_name = extract_title(folder)

            # Format path for the gallery group
            gallery_path = f"/effects/{folder}"

            # Find the URL from the markdown file
            image_url = find_url(chinese_name, source_markdown,gallery_path)

            if image_url!=None or image_url is not None:
                # Add to new gallery groups
                a += 1
                # print(chinese_name," added")
                new_gallery_groups.append(f"{{% galleryGroup '{chinese_name}' '特效' '{gallery_path}' {image_url} %}}")
            else:
                # print(chinese_name, " error")
                erro_gallery.append(f"{{% galleryGroup '{chinese_name}' '特效' '{gallery_path}' {image_url} %}}")
    print('已有',len(new_gallery_groups),'特效')
    print('未加入的特效：\n',',\n'.join(erro_gallery))

    print(a," effects added")
    # 5. Combine existing and new gallery groups
    final_output = existing_content.strip()+'\n'
    # print('final_output:',final_output)
    # print('new_gallery_groups:',new_gallery_groups)
    if new_gallery_groups:
        final_output += '\n'.join(new_gallery_groups)
    # print(final_output)
    return final_output


if __name__=="__main__":
    # 获取初始目录
    import sys
    parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../', '../../'))
    # 将上上级目录添加到 sys.path 中
    sys.path.append(parent_dir)

    os.chdir(parent_dir)
    # Define paths
    effects_dir = "./source/effects"
    source_markdown = "./source/_posts/HTML+CSS+JS特效合集.md"
    # output_file = "./source/self/py_file/get_effects/gallery_output.txt"
    effect_path = "./source/effect/index.md"

    # 获取已有的内容
    gallery_group_div = get_existing_output(effect_path)
    # 获取其中的effect地址(用于去重比对)
    existing_data = extract_existing_data(gallery_group_div)

    # 获取新增特效
    final_output = get_effects(existing_data, gallery_group_div)

    # print(final_output)
    # 备份并更新
    update_markdown(effect_path,final_output)