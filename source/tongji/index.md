---
title: 统计
date: 2024-04-01 00:00:00
comments: false
description: tongji
top_img: https://jsd.012700.xyz/gh/jerryc127/CDN@latest/Photo/messageboard.jpg
---

***
<h1>基础图表测试</h1>
<h4>饼图</h4>
{% mermaid %}
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{% endmermaid %}

<h4>流程图</h4>
{% mermaid %}
flowchart LR
    A[Hard] -->|Text| B(Round)
    B --> C{Decision}
    C -->|One| D[Result 1]
    C -->|Two| E[Result 2]
{% endmermaid %}

<h4>状态图</h4>
{% mermaid %}
stateDiagram-v2
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
{% endmermaid %}