import requests
from bs4 import BeautifulSoup
import re
from PIL import Image
import os
from fake_useragent import UserAgent

def download_web_content(url):
    # 生成随机的用户代理头
    ua = UserAgent()
    headers = {"User-Agent": ua.random}
    # 发送HTTP请求并获取网页内容
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.content
    else:
        print(response.content)
        print("Failed to download web content")
        return None


def extract_text_and_images(html_content):
    # 使用Beautiful Soup解析HTML
    soup = BeautifulSoup(html_content, 'html.parser')

    # 提取文字内容
    text_content = soup.get_text()

    # 提取图片链接
    img_tags = soup.find_all('img')
    image_urls = []
    for tag in img_tags:
        if 'src' in tag.attrs and tag['src'].startswith('http'):
            image_urls.append(tag['src'])
        elif 'data-original-src' in tag.attrs and tag['data-original-src'].startswith('//'):
            image_urls.append('https:' + tag['data-original-src'])
        elif 'data-original-src' in tag.attrs and not tag['data-original-src'].startswith('http'):
            image_urls.append(urljoin(base_url, tag['data-original-src']))

    return text_content, image_urls


def download_images(image_urls, save_dir):
    # 创建保存图片的文件夹
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    for i, url in enumerate(image_urls):
        try:
            # 下载图片
            response = requests.get(url)
            if response.status_code == 200:
                # 保存图片
                with open(os.path.join(save_dir, f"image_{i}.jpg"), 'wb') as f:
                    f.write(response.content)
        except Exception as e:
            print(f"Failed to download image from {url}: {e}")


def generate_markdown(text_content, image_urls, save_dir):
    # 合并文字内容和图片链接成一个列表
    combined_content = [item for pair in zip(text_content.splitlines(), image_urls) for item in pair]
    if len(text_content) > len(image_urls):
        combined_content.append(text_content.splitlines()[-1])

    # 生成md格式文本
    md_content = f"# Web Content\n\n"

    # 插入文字内容和图片链接交替
    for content in combined_content:
        if content.startswith('http'):
            md_content += f"![Image](images/image_{image_urls.index(content)}.jpg)\n\n"
        else:
            md_content += f"{content}\n\n"

    # 将md内容保存到文件
    with open(os.path.join(save_dir, 'web_content.md'), 'w', encoding='utf-8') as f:
        f.write(md_content)


import os

import shutil

# 正则表达式用于匹配文件名
pattern = re.compile(r'image_(\d+)\.jpg')

def change_filename(pathname):
    pathname2 = os.join(pathname,'new')
    if not os.exists(pathname2):
        os.mkdir(pathname2)
    for a, b, filenames in os.walk('./'):
        for filename in filenames:
            match = pattern.match(filename)
            if match:
                old_number = int(match.group(1))
                new_filename = f'image_{old_number - 2}.jpg'
                os.rename(os.path.join(pathname, filename), os.path.join(pathname2, new_filename))
    for filename in os.listdir(pathname2):
        path1 = os.path.join(pathname, filename)
        path2 = os.path.join(pathname2, filename)
        shutil.move(path1, path2)


if __name__ == "__main__":
    # 输入要下载的网址
    url = "https://www.jianshu.com/p/673e0e4c3dde"#input("Enter the URL to download content from: ")

    # 下载网页内容
    web_content = download_web_content(url)

    if web_content:
        # 提取文字和图片内容
        text_content, image_urls = extract_text_and_images(web_content)

        # 创建保存图片的文件夹
        save_dir = 'downloaded_content'
        download_images(image_urls, os.path.join(save_dir, 'images'))

        # 生成markdown文件
        generate_markdown(text_content, image_urls, save_dir)

        print("Web content downloaded and saved successfully!")
