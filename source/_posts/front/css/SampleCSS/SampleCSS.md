---
title: 简单的CSS
date: 2022-05-08 08:57:59
tags:
cover:
---

## 一、什么是 CSS?
- CSS 指层叠样式表 (Cascading Style Sheets)
- 样式定义如何显示 HTML 元素
- 样式通常存储在样式表中
- 把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题
- 外部样式表可以极大提高工作效率
- 外部样式表通常存储在 CSS 文件中
- 多个样式定义可层叠为一个
### 代码演示

<script>
import { h, ref } from 'vue'

const StyleDiv = (_, ctx) => h(
  'div',
  {
    class: 'sample-css-test',
  },
  ctx.slots.default()
)

export default {
  components: {
    StyleDiv,
  },

  setup() {
  }
}
</script>
<style>
	.sample-css-test p {
	color:red;
	text-align:center;
	} 
</style>
```html  
<style>
p {
	color:red;
	text-align:center;
} 
</style>
<p>Hello World!</p>
<p>这个段落采用CSS样式化。</p>
```



