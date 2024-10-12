<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          @click="downloadExcel(leaveExport, '请假申请数据', getForm().getFieldsValue())"
          v-auth="'system:leave:export'"
          >导出</a-button
        >
        <a-button
          type="primary"
          danger
          @click="multipleRemove(leaveRemove)"
          :disabled="!selected"
          v-auth="'system:leave:remove'"
          >删除</a-button
        >
        <a-button
          type="primary"
          @click="handleAdd"
          v-auth="'system:leave:add'"
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
                auth: 'system:leave:edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: 'system:leave:remove',
                popConfirm: {
                  placement: 'left',
                  title: '是否删除请假申请[' + record.id + ']?',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <LeaveModal @register="registerModal" @reload="reload" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { leaveList, leaveExport, leaveRemove } from '@/api/system/leave';
  import { downloadExcel } from '@/utils/file/download';
  import { useModal } from '@/components/Modal';
  import LeaveModal from './LeaveModal.vue';
  import { formSchemas, columns } from './leave.data';
  import { IconEnum } from '@/enums/appEnum';

  defineOptions({ name: 'Leave' });

  const [registerTable, { reload, multipleRemove, selected, getForm }] = useTable({
    rowSelection: {
      type: 'checkbox',
    },
    title: '请假申请列表',
    api: leaveList,
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
    await leaveRemove([record.id]);
    await reload();
  }
</script>

<style scoped></style>
