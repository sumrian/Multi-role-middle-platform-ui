<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { getDatabaseTables, getTableStructure } from '@/api/works/tables';
  import type { ECharts } from 'echarts';
  import * as echarts from 'echarts';

  type TableStructure = Record<string, string[]>;
  type TablesStructure = TableStructure[];

  // 全部表数据
  const tableData = ref<TablesStructure>([]);

  // 获取表结构
  const getStructure = async (tableNames: string[]) => {
    const str = tableNames.join(',');
    const { rows } = await getTableStructure(str);
    return rows;
  };

  // 获取全部表数据
  const getAllTableData = async () => {
    const { rows: tableNames } = await getDatabaseTables();
    tableData.value = await getStructure(tableNames);
  };

  // 图表数据转换
  const seriesData = computed(() =>
    tableData.value.map((table) => {
      const [tableName, columns] = Object.entries(table)[0];
      return { value: columns.length, name: tableName };
    }),
  );

  // ECharts 相关逻辑
  const chartRef = ref<HTMLElement | null>(null);
  let chartInstance: ECharts | null = null;

  // 初始化/更新图表
  const updateChart = () => {
    if (!chartInstance || !seriesData.value.length) return;

    const option = {
      title: {
        text: '数据库表字段分布',
        subtext: '基于表结构分析',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}个字段 ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: seriesData.value.map((item) => item.name),
      },
      series: [
        {
          name: '表字段数量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: seriesData.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    chartInstance.setOption(option);
  };

  // 初始化图表实例
  const initChart = () => {
    if (!chartRef.value) return;

    chartInstance?.dispose();
    chartInstance = echarts.init(chartRef.value);
    updateChart();
  };

  // 响应数据变化
  watch(seriesData, () => {
    updateChart();
  });

  // 生命周期
  onMounted(async () => {
    await getAllTableData();
    initChart();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    chartInstance?.dispose();
    window.removeEventListener('resize', handleResize);
  });

  // 响应式调整
  const handleResize = () => {
    chartInstance?.resize();
  };

  function arrayToTree(arr) {
    const result = [];

    // 创建一个映射，用于存储根节点
    const rootMap = {};

    for (const obj of arr) {
      for (const key in obj) {
        const keys = key.split('_');
        const rootKey = keys[0]; // 获取根节点（如 'a'）

        // 如果根节点不存在，则创建一个
        if (!rootMap[rootKey]) {
          rootMap[rootKey] = {
            name: rootKey,
            children: [],
          };
          result.push(rootMap[rootKey]);
        }

        // 检查是否需要拆分
        let shouldSplit = false;
        for (let i = 1; i < keys.length; i++) {
          const currentKey = keys.slice(0, i + 1).join('_');
          const isShared = arr.some((item) => {
            const otherKey = Object.keys(item)[0];
            return otherKey.startsWith(currentKey + '_') && otherKey !== key;
          });
          if (isShared) {
            shouldSplit = true;
            break;
          }
        }

        if (shouldSplit) {
          // 如果需要拆分，则按层级嵌套
          let currentLevel = rootMap[rootKey].children;
          for (let i = 1; i < keys.length; i++) {
            const currentKey = keys.slice(0, i + 1).join('_');
            let found = currentLevel.find((item) => item.name === currentKey);

            if (!found) {
              found = {
                name: currentKey,
                children: [],
              };
              currentLevel.push(found);
            }

            if (i === keys.length - 1) {
              found.children = obj[key];
            } else {
              currentLevel = found.children;
            }
          }
        } else {
          // 如果不需要拆分，则直接作为根节点的子节点
          rootMap[rootKey].children.push({
            name: key,
            children: obj[key],
          });
        }
      }
    }

    // 处理没有共享前缀的键（如 'b_b_c_k_e_f'）
    for (const obj of arr) {
      for (const key in obj) {
        const keys = key.split('_');
        const rootKey = keys[0];

        // 如果根节点只有一个子节点且子节点的 name 等于 key，则直接作为顶级节点
        if (rootMap[rootKey].children.length === 1 && rootMap[rootKey].children[0].name === key) {
          const node = rootMap[rootKey];
          delete rootMap[rootKey];
          result.push(node);
        }
      }
    }

    return result;
  }

  // 测试用例
  const input = [
    { a_b_c_d_e_f: ['1', '2'] },
    { a_b_c_d_e_e: ['1', '2'] },
    { a_b_c_d_e_a: ['1', '2'] },
    { a_b_c_d_e: ['1', '2'] },
    { a_b_c_d: ['1', '2'] },
    { a_b_c: ['1', '2'] },
    { a_b: ['1', '2'] },
    { a: ['1', '2'] },
    { a_b_u_d_e_f: ['1', '2'] },
    { a_d_c_d_e_f: ['1', '2'] },
    { a_b_c_k_e_f: ['1', '2'] },
    { b_b_c_k_e_f: ['1', '2'] },
    { d_b_c_k_e_f: ['1', '2'] },
    { g_g_g_h: ['1', '2'] },
  ];

  // console.log(JSON.stringify(transformData(input), null, 2));

  console.log(arrayToTree(input));
</script>

<template>
  <div>
    <div ref="chartRef" style="width: 100%; height: 600px"></div>
    <a-button @click="getAllTableData">刷新数据</a-button>
  </div>
</template>
