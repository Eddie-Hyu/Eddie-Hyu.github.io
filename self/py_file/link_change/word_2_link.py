def convert_text_to_format(input_text: str) -> str:
    # 解析输入的文本
    input_text = input_text.replace('；', ';').replace('\n', ';').replace('\r', ';')  # 将不同的分隔符统一替换为英文分号 ';'
    input_text = input_text.replace('：', ':')
    lines = [line.strip() for line in input_text.strip().split(';')]  # 统一使用英文分号进行分割
    data = {}
    print(lines)
    for line in lines:
        if line.startswith(("名称", "name")):
            data['name'] = line.split(":", 1)[-1].strip()
        elif line.startswith(("URL", "url","link")):
            data['link'] = line.split(":", 1)[-1].strip()
        elif line.startswith(("头像","avatar")):
            data['avatar'] = line.split(":", 1)[-1].strip()
        elif line.startswith(("描述","descr")) :
            data['descr'] = line.split(":", 1)[-1].strip()

    # 构造输出格式
    output = f"""    - name: {data.get('name', '')}
      link: {data.get('link', '')}
      avatar: {data.get('avatar', '')}
      descr: {data.get('descr', '')}
    """

    return output


if __name__=="__main__":
    # 示例输入
    input_text = input("""
    样例如下：
    名称：PDF24 Tools；URL：https://tools.pdf24.org/zh/；头像：https://tools.pdf24.org/zh/static/img/appIcons/v3/icon_192.png；描述：PDF24 Tools 是一个免费的在线PDF编辑处理工具。
    请输入：
    """)

    # 调用函数并输出结果
    formatted_text = convert_text_to_format(input_text)
    print(formatted_text)

