<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          @click="downloadExcel(efficiencyExport, '测试单数据', getForm().getFieldsValue())"
          v-auth="'works:efficiency:export'"
          >导出</a-button
        >
        <a-button
          type="primary"
          danger
          @click="multipleRemove(efficiencyRemove)"
          :disabled="!selected"
          v-auth="'works:efficiency:remove'"
          >删除</a-button
        >
        <a-button
          type="primary"
          @click="handleAdd"
          v-auth="'works:efficiency:add'"
          >新增</a-button
        >
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
                auth: 'works:efficiency:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: 'works:efficiency:remove',
                popConfirm: {
                  placement: 'left',
                  title: '是否删除测试单[' + record.id + ']?',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <EfficiencyModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { efficiencyList, efficiencyExport, efficiencyRemove } from '@/api/works/efficiency';
  import { downloadExcel } from '@/utils/file/download';
  import { useModal } from '@/components/Modal';
  import EfficiencyModal from './EfficiencyModal.vue';
  import { formSchemas, columns } from './efficiency.data';
  import { IconEnum } from '@/enums/appEnum';

  defineOptions({ name: 'Efficiency' });

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: '测试单列表',
    api: efficiencyList,
    showIndexColumn: false,
    rowKey: 'id',
    useSearchForm: true,
    formConfig: {
      schemas: formSchemas,
      baseColProps: {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 6,
      },
    },
    columns: columns,
    actionColumn: {
      width: 200,
      title: '操作',
      key: 'action',
      fixed: 'right',
    },
  });

  const [registerModal, { openModal }] = useModal();

  function handleEdit(record: Recordable) {
    openModal(true, { record, update: true });
  }

  function handleAdd() {
    openModal(true, { update: false });
  }

  async function handleDelete(record: Recordable) {
    await efficiencyRemove([record.id]);
    await reload();
  }
</script>

<style scoped></style>
