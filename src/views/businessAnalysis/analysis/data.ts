export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数量',
    icon: 'visit-count|svg',
    value: 2897,
    total: 129945,
    color: 'orange',

    action: '月',
  },
  {
    title: '成交金额',
    icon: 'total-sales|svg',
    value: 25092,
    total: 598038,
    color: 'blue',
    action: '月',
  },
  {
    title: '下载数量',
    icon: 'download-count|svg',
    value: 693,
    total: 12769,
    color: 'purple',

    action: '周',
  },
  {
    title: '成交数量',
    icon: 'transaction|svg',
    value: 2394,
    total: 89963,
    color: 'green',

    action: '年',
  },
];
