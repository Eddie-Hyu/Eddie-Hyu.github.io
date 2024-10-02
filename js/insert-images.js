const fs = require('fs');
const path = require('path');

hexo.extend.tag.register('insert_images', function(args) {
  // 读取 img.json 文件的路径
  const jsonPath = path.join(hexo.source_dir, args[0] || 'img.json');
  let data;

  try {
    data = JSON.parse(fs.readFileSync(jsonPath));
  } catch (error) {
    hexo.log.error('Failed to read or parse img.json:', error);
    return '';
  }

  // 基础 HTML 模板
  const htmlTemplate = `
    <section data-role="outer" class="article135" label="edit by 135editor">
        <section class="_135editor" data-tools="135编辑器" data-id="91332">
            <section style="margin: 1em auto; padding: 5px; border-width: 1px; border-style: solid; border-color: rgb(221, 221, 221);">
                <section data-role="animate" style="display: inline-block; width: 100%; vertical-align: top; overflow-x: auto;" class="" data-width="100%">
                    <section data-divisor="1" style="overflow: hidden; width: 600%; display: flex; flex-flow: row; max-width: 600% !important;" data-width="600%">
                        {{images_html}}
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
  `;

  // 生成每个图片的 HTML 片段
  const imageTemplate = `
    <section class="box-edit" style="display: inline-block; vertical-align: middle; width: {{width}}; max-width: {{width}} !important;" data-width="{{width}}">
        <section style="text-align: left; line-height: 0;">
            <section style="vertical-align: middle; display: inline-block; line-height: 0; width: 100%; height: auto;" data-width="100%">
                <img src="{{src}}" style="vertical-align: middle; width: 100%;" data-width="100%" data-ratio="1" class="rich_pages wxw-img">
            </section>
        </section>
    </section>
  `;

  // 组合生成的图片 HTML
  const imagesHtml = data.images.map(img => {
    return imageTemplate.replace('{{src}}', img.src).replace(/{{width}}/g, img.width);
  }).join('');

  // 生成最终的 HTML
  const finalHtml = htmlTemplate.replace('{{images_html}}', imagesHtml);

  return finalHtml;
}, { ends: false });
