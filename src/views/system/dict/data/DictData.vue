<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Space>
          <a-button
            class="<sm:hidden"
            v-auth="'system:dict:export'"
            @click="downloadExcel(dictDataExport, '字典数据', getForm().getFieldsValue())"
            >导出</a-button
          >
          <a-button
            class="<sm:hidden"
            type="primary"
            danger
            @click="multipleRemove(dictDataRemove)"
            :disabled="!selected"
            v-auth="'system:dict:remove'"
            >删除</a-button
          >
          <a-button
            type="primary"
            :disabled="addBtnDisabled"
            @click="handleAdd"
            v-auth="'system:dict:add'"
            >新增</a-button
          >
        </Space>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '修改',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: 'system:dict:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                ghost: true,
                danger: true,
                auth: 'system:dict:remove',
                popConfirm: {
                  placement: 'left',
                  title: `是否删除字典[${record.dictLabel}]?`,
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <unocss />
    <DictDataDrawer @register="registerDrawer" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Space } from 'ant-design-vue';
  import { dictDataList, dictDataExport, dictDataRemove } from '@/api/system/dict/dictData';
  import { downloadExcel } from '@/utils/file/download';
  import { useDrawer } from '@/components/Drawer';
  import DictDataDrawer from './DictDataDrawer.vue';
  import { columns, formSchemas } from './dictData.data';
  import { IconEnum } from '@/enums/appEnum';
  import { watch, computed, ref } from 'vue';
  import unocss from './unocss.vue';

  const dictType = defineModel('dictType', {
    type: String,
    default: '',
  });

  /**
   * 判断是表单点击查询还是dict点击行
   * 由于点击提交时 watch也会触发 会请求两次接口 造成一些问题
   */
  const isSearchClick = ref(false);

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: '字典项列表',
    showIndexColumn: false,
    api: dictDataList,
    rowKey: 'dictCode',
    useSearchForm: true,
    formConfig: {
      schemas: formSchemas,
      labelWidth: 80,
      name: 'dict_data',
      baseColProps: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 8,
      },
      async resetFunc() {
        // 这里也需要清空
        const { setFieldsValue } = getForm();
        await setFieldsValue({ dictType: '' });
        dictType.value = '';
      },
      async submitFunc() {
        isSearchClick.value = true;

        const { getFieldsValue } = getForm();
        // 查询时设置为相应的dictType
        dictType.value = getFieldsValue().dictType;
        await reload();

        isSearchClick.value = false;
      },
    },
    columns,
    actionColumn: {
      width: 200,
      title: '操作',
      key: 'action',
      fixed: 'right',
    },
  });

  watch(dictType, async (dictType) => {
    /**
     * 判断是否为空 或者 为点击'查询' 防止重复请求
     */
    if (!dictType || isSearchClick.value) return;
    await getForm().setFieldsValue({ dictType });
    await reload({ searchInfo: { dictType } });
  });

  const addBtnDisabled = computed(() => {
    return !dictType.value;
  });

  const [registerDrawer, { openDrawer }] = useDrawer();

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      update: true,
      dictType: dictType.value,
    });
  }

  function handleAdd() {
    openDrawer(true, {
      update: false,
      dictType: dictType.value,
    });
  }

  async function handleDelete(record: Recordable) {
    await dictDataRemove([record.dictCode]);
    await reload();
  }
</script>

<style scoped></style>
