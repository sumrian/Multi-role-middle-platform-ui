<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          @click="downloadExcel(oaTaskScoreExport, 'OA效率管理数据', getForm().getFieldsValue())"
          v-auth="'works:oaTaskScore:export'"
          >导出</a-button
        >
        <a-button
          type="primary"
          danger
          @click="multipleRemove(oaTaskScoreRemove)"
          :disabled="!selected"
          v-auth="'works:oaTaskScore:remove'"
          >删除</a-button
        >
        <a-button
          type="primary"
          @click="handleAdd"
          v-auth="'works:oaTaskScore:add'"
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
                auth: 'works:oaTaskScore:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: 'works:oaTaskScore:remove',
                popConfirm: {
                  placement: 'left',
                  title: '是否删除OA效率管理[' + record.id + ']?',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <OaTaskScoreModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { oaTaskScoreList, oaTaskScoreExport, oaTaskScoreRemove } from '@/api/works/oaTaskScore';
  import { downloadExcel } from '@/utils/file/download';
  import { useModal } from '@/components/Modal';
  import OaTaskScoreModal from './OaTaskScoreModal.vue';
  import { formSchemas, columns } from './oaTaskScore.data';
  import { IconEnum } from '@/enums/appEnum';

  defineOptions({ name: 'OaTaskScore' });

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: 'OA效率管理列表',
    api: oaTaskScoreList,
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
    await oaTaskScoreRemove([record.id]);
    await reload();
  }
</script>

<style scoped></style>
