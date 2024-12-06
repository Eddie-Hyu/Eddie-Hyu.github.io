import json

# 读取 img.json 文件
with open('img.json', 'r') as file:
    data = json.load(file)

# 基础 HTML 模板
html_template = '''
<section data-role="outer" class="article135" label="edit by 135editor">
    <section class="_135editor" data-tools="135编辑器" data-id="91332">
        <section style="margin: 1em auto; padding: 5px; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221);">
            <section data-role="animate" style="display: inline-block; width: 100%; vertical-align: top; overflow-x: auto;" class="" data-width="100%">
                <section data-divisor="1" style="overflow: hidden; width: 600%; display: flex; flex-flow: row; max-width: 600% !important;" data-width="600%">
                    {images_html}
                </section>
            </section>
            <section>
                <p style="text-align:center;line-height:32px;margin: 10px;">
                    <span style="font-size: 12px;">左右滑动查看更多</span>
                </p>
            </section>
        </section>
    </section>
</section>
'''

# 生成每个图片的 HTML 片段
image_template = '''
<section class="box-edit" style="display: inline-block; vertical-align: middle; width: {width}; max-width: {width} !important;" data-width="{width}">
    <section style="text-align: left; line-height: 0;">
        <section style="vertical-align: middle; display: inline-block; line-height: 0; width: 100%; height: auto;" data-width="100%">
            <img src="{src}" style="vertical-align: middle; width: 100%;" data-width="100%" data-ratio="1" class="rich_pages wxw-img">
        </section>
    </section>
</section>
'''

# 组合生成的图片 HTML
images_html = ''.join([image_template.format(src=img['src'], width=img['width']) for img in data['images']])

# 生成最终的 HTML
final_html = html_template.format(images_html=images_html)

# 输出或保存最终的 HTML
with open('output.html', 'w') as output_file:
    output_file.write(final_html)

print("HTML 已生成并保存为 output.html")


urls ="""
    

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211059306.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211059539.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211100097.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211100558.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211101670.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211101640.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211101989.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211111763.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211112131.png)

![](https://jsd.cdn.zzko.cn/gh/Eddie-Hyu/picx-images-hosting@master/poster/202408211112225.png)

![](https://heishenhua.com/img/Wallpaper/Wallpaper7.jpg)

![](https://heishenhua.com/img/Concept/Concept_wukong.jpg)

"""
