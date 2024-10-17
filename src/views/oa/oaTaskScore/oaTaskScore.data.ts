import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';

export const formSchemas: FormSchema[] = [
  {
    label: '部门id',
    field: 'deptId',
    component: 'Input',
  },
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
  },
  {
    label: '排序号',
    field: 'orderNum',
    component: 'Input',
  },
  {
    label: 'key键',
    field: 'testKey',
    component: 'Input',
  },
  {
    label: '值',
    field: 'value',
    component: 'Input',
  },
  {
    label: '执行人',
    field: 'EXECUTOR',
    component: 'Input',
  },
  {
    label: '复核人',
    field: 'REVIEWER',
    component: 'Input',
  },
  {
    label: '协助人',
    field: 'ASSISTANT',
    component: 'Input',
  },
  {
    label: '事项标题',
    field: 'TITLE',
    component: 'Input',
  },
  {
    label: '事项类型',
    field: 'type',
    component: 'Input',
  },
  {
    label: '得分',
    field: 'SCORE',
    component: 'Input',
  },
  {
    label: '用户得分(评分)',
    field: 'userScore',
    component: 'Input',
  },
  {
    label: '事项描述',
    field: 'DESCRIPTION',
    component: 'InputTextArea',
  },
  {
    label: '开始时间',
    field: 'startTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '跟踪时间',
    field: 'followUpTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '完成时间',
    field: 'completionTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '任务状态',
    field: 'STATUS',
    component: 'Input',
  },
  {
    label: '耗时 (以分钟计)',
    field: 'timeSpent',
    component: 'Input',
  },
  {
    label: '扩展信息',
    field: 'extJson',
    component: 'InputTextArea',
  },
];

export const columns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'id',
  },
  {
    title: '部门id',
    dataIndex: 'deptId',
  },
  {
    title: '用户id',
    dataIndex: 'userId',
  },
  {
    title: '排序号',
    dataIndex: 'orderNum',
  },
  {
    title: 'key键',
    dataIndex: 'testKey',
  },
  {
    title: '值',
    dataIndex: 'value',
  },
  {
    title: '执行人',
    dataIndex: 'EXECUTOR',
  },
  {
    title: '复核人',
    dataIndex: 'REVIEWER',
  },
  {
    title: '协助人',
    dataIndex: 'ASSISTANT',
  },
  {
    title: '事项标题',
    dataIndex: 'TITLE',
  },
  {
    title: '事项类型',
    dataIndex: 'TYPE',
  },
  {
    title: '得分',
    dataIndex: 'SCORE',
  },
  {
    title: '用户得分(评分)',
    dataIndex: 'userScore',
  },
  {
    title: '事项描述',
    dataIndex: 'DESCRIPTION',
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
  },
  {
    title: '跟踪时间',
    dataIndex: 'followUpTime',
  },
  {
    title: '完成时间',
    dataIndex: 'completionTime',
  },
  {
    title: '任务状态',
    dataIndex: 'STATUS',
  },
  {
    title: '耗时 (以分钟计)',
    dataIndex: 'timeSpent',
  },
  {
    title: '扩展信息',
    dataIndex: 'extJson',
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
    label: '部门id',
    field: 'deptId',
    required: true,
    component: 'Input',
  },
  {
    label: '用户id',
    field: 'userId',
    required: true,
    component: 'Input',
  },
  {
    label: '排序号',
    field: 'orderNum',
    required: true,
    component: 'Input',
  },
  {
    label: 'key键',
    field: 'testKey',
    required: true,
    component: 'Input',
  },
  {
    label: '值',
    field: 'value',
    required: true,
    component: 'Input',
  },
  {
    label: '执行人',
    field: 'EXECUTOR',
    required: true,
    component: 'Input',
  },
  {
    label: '复核人',
    field: 'REVIEWER',
    required: true,
    component: 'Input',
  },
  {
    label: '协助人',
    field: 'ASSISTANT',
    required: true,
    component: 'Input',
  },
  {
    label: '事项标题',
    field: 'TITLE',
    required: true,
    component: 'Input',
  },
  {
    label: '事项类型',
    field: 'TYPE',
    required: true,
    component: 'Input',
  },
  {
    label: '得分',
    field: 'SCORE',
    required: true,
    component: 'Input',
  },
  {
    label: '用户得分(评分)',
    field: 'userScore',
    required: true,
    component: 'Input',
  },
  {
    label: '事项描述',
    field: 'DESCRIPTION',
    required: true,
    component: 'InputTextArea',
  },
  {
    label: '开始时间',
    field: 'startTime',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '跟踪时间',
    field: 'followUpTime',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '完成时间',
    field: 'completionTime',
    required: true,
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '任务状态',
    field: 'STATUS',
    required: true,
    component: 'Input',
  },
  {
    label: '耗时 (以分钟计)',
    field: 'timeSpent',
    required: true,
    component: 'Input',
  },
  {
    label: '扩展信息',
    field: 'extJson',
    required: true,
    component: 'InputTextArea',
  },
];
