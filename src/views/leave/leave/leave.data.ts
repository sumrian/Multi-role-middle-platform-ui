import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { DictEnum } from '@/enums/dictEnum';
import { getDictOptions } from '@/utils/dict';
import { renderDict } from '@/views/system/config/config.data';

import renderStatusTag from '@/utils/util/renderStatusTag';
import dayjs, { Dayjs } from 'dayjs';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const formSchemas: FormSchema[] = [
  {
    label: '请假类型',
    field: 'leaveType',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.S_LEAVE_TYPE),
    },
  },
  {
    label: '开始时间',
    field: 'startDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '结束时间',
    field: 'endDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '请假天数',
    field: 'leaveDays',
    component: 'Input',
    // componentProps: {
    //   disabled: true,
    // },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'id',
    ifShow: () => false,
  },
  {
    title: '请假类型',
    dataIndex: 'leaveType',
    customRender({ value }) {
      return h(Tag, { color: 'success' }, renderDict(value, DictEnum.S_LEAVE_TYPE));
    },
  },
  {
    title: '开始时间',
    dataIndex: 'startDate',
  },
  {
    title: '结束时间',
    dataIndex: 'endDate',
  },
  {
    title: '请假天数',
    dataIndex: 'leaveDays',
    customRender({ value }) {
      return h(Tag, { color: 'processing' }, value + '天');
    },
  },
  {
    title: '请假原因',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: renderStatusTag,
  },
];

let flag = true;
export const modalSchemas: FormSchema[] = [
  {
    label: '主键',
    field: 'id',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    label: '请假类型',
    field: 'leaveType',
    required: true,
    component: 'Select',
    componentProps: {
      options: getDictOptions(DictEnum.S_LEAVE_TYPE),
    },
  },
  {
    label: '开始时间',
    field: 'startDate',
    required: true,
    component: 'DatePicker',
    componentProps({ formModel }) {
      return {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        // 当日期范围清空时
        onChange() {
          flag = !formModel.startDate;
          if (!formModel.startDate || !formModel.endDate) {
            // 将leaveDays设置为undefined或null，表示没有选择日期范围
            formModel.leaveDays = undefined;
            return;
          }
          // 假设dateUtil是一个将日期字符串或DayJs对象转换为DayJs对象的函数
          const dateUtil = (dateStr: string): Dayjs => dayjs(dateStr);

          const date = [formModel.startDate, formModel.endDate];

          const start = typeof date[0] === 'string' ? dateUtil(date[0]) : date[0];
          const end = typeof date[1] === 'string' ? dateUtil(date[1]) : date[1];

          // 计算两个日期之间的毫秒差
          const diffInMilliseconds = end.valueOf() - start.valueOf();

          // 将毫秒差转换为天数，并保留一位小数
          const diffInDays = (diffInMilliseconds / (1000 * 60 * 60 * 24)).toFixed(1);

          // 更新formModel中的leaveDays
          formModel.leaveDays = parseFloat(diffInDays);
        },
        // 禁用早于当前日期
        disabledDate(current: Dayjs) {
          // 禁用早于当前日期
          return current.isBefore(dayjs().format('YYYY-MM-DD'));
        },
      };
    },
  },
  {
    label: '结束时间',
    field: 'endDate',
    required: true,
    component: 'DatePicker',
    dynamicDisabled: () => flag,
    componentProps({ formModel }) {
      return {
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        // 当日期范围清空时
        onChange() {
          if (!formModel.startDate || !formModel.endDate) {
            // 将leaveDays设置为undefined或null，表示没有选择日期范围
            formModel.leaveDays = undefined;
            return;
          }
          // 假设dateUtil是一个将日期字符串或DayJs对象转换为DayJs对象的函数
          const dateUtil = (dateStr: string): Dayjs => dayjs(dateStr);

          const date = [formModel.startDate, formModel.endDate];

          const start = typeof date[0] === 'string' ? dateUtil(date[0]) : date[0];
          const end = typeof date[1] === 'string' ? dateUtil(date[1]) : date[1];

          // 计算两个日期之间的毫秒差
          const diffInMilliseconds = end.valueOf() - start.valueOf();

          // 将毫秒差转换为天数，并保留一位小数
          const diffInDays = (diffInMilliseconds / (1000 * 60 * 60 * 24)).toFixed(1);

          // 更新formModel中的leaveDays
          formModel.leaveDays = parseFloat(diffInDays);
        },
        // 禁用早于当前日期
        disabledDate(current: Dayjs) {
          // 禁用早于当前日期
          return current.isBefore(dayjs());
        },
      };
    },
  },
  {
    label: '请假天数',
    field: 'leaveDays',
    required: true,
    component: 'Input',
    dynamicDisabled: () => true,
    suffix: '天',
  },
  {
    label: '请假原因',
    field: 'remark',
    required: true,
    component: 'Input',
  },
];
