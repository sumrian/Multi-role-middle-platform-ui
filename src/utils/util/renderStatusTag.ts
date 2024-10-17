import { h } from 'vue';
import { Tag } from 'ant-design-vue';

// 使用数字作为键，字符串数组作为值
const statusDict: Map<number | string, [string, string]> = new Map([
  ['-1', ['error', '已驳回']],
  ['0', ['default', '待审批']],
  ['1', ['success', '已通过']],
  ['2', ['warning', '已撤回']],
]);

export default (value) => {
  // 如果 value 是数字，但 Map 的键是字符串形式的数字，这里需要转换
  const key = value.value || '0';
  const [color, text] = statusDict.get(key) || ['', '']; // 提供默认值以防 Map 中没有对应的键
  return h(Tag, { color }, text);
};
