# 基本的一些 form 表单封装

## kInput

| 属性        | 类型    | 说明                   |
| ----------- | ------- | ---------------------- |
| type        | String  | 原生 input type 类型   |
| label       | String  | 标签名                 |
| value       | String  | 值                     |
| placeholder | String  | 原生 placeholder       |
| hasCode     | Boolean | 是否拥有发送验证码按钮 |
| disabled    | Boolean | 是否只读               |

---

| 事件     | 说明           |
| -------- | -------------- |
| blur     | 失焦事件       |
| input    | 输入事件       |
| sendCode | 发送验证码事件 |

-   `sendCode`事件 返回两个参数：  
    `{Function} stop(msg:String)`：立即停止倒计时并且替换倒计时按钮上的文字  
    `{Function} run`：开始倒计时

## KSelect

| 属性        | 类型                 | 说明         |
| ----------- | -------------------- | ------------ |
| label       | String               | label 标签   |
| options     | Array<Object/String> | 数据数组     |
| placeholder | String               | 占位符       |
| zIndex      | Number               | zIndex，层级 |
| viewKey     | String               | 要展示的键名 |
| selectIndex | Number               | 选中的索引   |

---

| 事件   | 说明     |
| ------ | -------- |
| change | 改变事件 |

