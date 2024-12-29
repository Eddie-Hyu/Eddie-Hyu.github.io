# 定义宫位详细信息
palace_info = {
    "大安": "木；正东；长期、缓慢，稳定；通常代表安稳、吉祥、顺利的状态，是比较好的一个宫位。如果所问之事落在大安宫，预示着事情会有一个较为稳定、顺利的发展，比如出行平安、工作顺利等。",
    "留连": "木；西南；停止、反复、复杂；意味着事情进展缓慢、有阻碍、停滞不前或者有拖延的情况。此宫位表示事情可能会遇到一些困难或波折，需要花费更多的时间和精力去解决，比如合作项目进展缓慢、感情关系出现纠葛等。",
    "速喜": "火；正南；惊喜、快速、突然；代表着喜事即将来临、快速有结果、进展顺利等。如果占得速喜宫，可能预示着会有好消息传来，事情会很快有一个积极的结果，比如考试顺利通过、求职成功等。",
    "赤口": "金；正西；争斗、凶恶、伤害；有争吵、冲突、不和谐的含义，可能表示会遇到一些口舌是非、矛盾冲突或者不太顺利的情况，比如与人发生争执、谈判不顺利等。",
    "小吉": "水；正北；起步、不多、尚可；表示事情有小的吉利、顺利，是一个相对较好的宫位，但吉利程度可能不如大安和速喜。比如在一些小的决策上会比较顺利，或者会有一些小的收获。",
    "空亡": "土；内；失去、虚伪、空想；代表着不吉、无结果、空虚、失落等。此宫位表示事情可能没有结果，或者处于一种不确定、空虚的状态，比如投资没有回报、计划落空等。",
    "病符": "金；西南；病态、异常、治疗；通常与疾病、健康问题相关，也可能表示事情存在一些隐患或问题。如果占到此宫，需要注意身体健康方面的问题，或者在做事情时要谨慎，避免出现意外情况。",
    "桃花": "土；东北；欲望、牵绊、异性；与感情、人际关系、人缘等方面有关。如果落在桃花宫，可能表示在感情方面会有新的机会或者人缘较好，但桃花也有好坏之分，需要具体情况具体分析。",
    "天德": "金；西北；贵人、上司、高远；代表着福德、贵人相助、好运等。占得此宫位，可能会有贵人相助，或者在某些事情上会有好的运气和福报。"
}


def get_elements(inputlist):
    n1, n2, n3 = inputlist
    n1, n2, n3 = int(n1),int(n2),int(n3)
    # print(n1, n2, n3)
    elements = ["大安", "留连", "速喜", "赤口", "小吉", "空亡", "病符", "桃花", "天德"]

    # 获取宫位对应的索引
    first_index = (n1 - 1) % len(elements)
    second_index = (n1 + n2 - 2) % len(elements)
    third_index = (n1 + n2 + n3 - 3) % len(elements)

    # 获取宫位及其详细信息
    first_element = elements[first_index]
    second_element = elements[second_index]
    third_element = elements[third_index]
    print("第一个宫位：",first_element)
    print("第一个宫位详情：",palace_info[first_element])
    print("第二个宫位：",second_element)
    print("第二个宫位详情：",palace_info[second_element])
    print("第三个宫位：",third_element)
    print("第三个宫位详情：",palace_info[third_element])

    return palace_info[first_element], palace_info[second_element], palace_info[third_element]

def deal_input(inputs):
    inputs = inputs.replace("，",",").replace("；",",").replace(";",",").replace(" ",",")
    inputlist = inputs.split(",")[0:3]
    return inputlist

if __name__=="__main__":
    inputs = input("输入三个数字：")
    inputlist = deal_input(inputs)
    # print(inputlist)
    f,s,t = get_elements(inputlist)
