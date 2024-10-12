import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';

export const formSchemas: FormSchema[] = [
  {
    label: '请假类型',
    field: 'leaveType',
    component: 'Select',
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
  },
  {
    label: '状态',
    field: 'status',
    component: 'RadioButtonGroup',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'id',
  },
  {
    title: '请假类型',
    dataIndex: 'leaveType',
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
  },
  {
    title: '请假原因',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

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
  },
  {
    label: '开始时间',
    field: 'startDate',
    required: true,
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
    required: true,
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
    required: true,
    component: 'Input',
  },
  {
    label: '请假原因',
    field: 'remark',
    required: true,
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    required: true,
    component: 'RadioButtonGroup',
  },
];
