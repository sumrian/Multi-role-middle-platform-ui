<template>
  <PageWrapper dense>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          @click="downloadExcel(leaveExport, '请假申请数据', getForm().getFieldsValue())"
          v-auth="'works:leave:export'"
          >导出</a-button
        >
        <a-button
          type="primary"
          danger
          @click="multipleRemove(leaveRemove)"
          :disabled="!selected"
          v-auth="'works:leave:remove'"
          >删除</a-button
        >
        <a-button type="primary" @click="handleAdd" v-auth="'works:leave:add'">新增</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '审批',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: 'works:leave:remove',
                ifShow: () => record.status === null,
                popConfirm: {
                  placement: 'left',
                  title: '是否同意请假申请[' + record.id + ']?',
                  okText: '同意',
                  cancelText: '驳回',
                  confirm: handleSanction.bind(null, record, '1'),
                  cancel: handleSanction.bind(null, record, '-1'),
                },
              },
              {
                label: '修改',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: 'works:leave:edit',
                ifShow: () => record.status === null,
                onClick: handleEdit.bind(null, record),
              },
              {
                label: '删除',
                icon: IconEnum.DELETE,
                type: 'primary',
                danger: true,
                ghost: true,
                auth: 'works:leave:remove',
                popConfirm: {
                  placement: 'left',
                  title: '是否删除请假申请[' + record.id + ']?',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                label: '撤回',
                icon: IconEnum.EDIT,
                type: 'primary',
                ghost: true,
                auth: 'works:leave:remove',
                ifShow: () => record.status === null,
                popConfirm: {
                  placement: 'left',
                  title: '是否撤回请假申请[' + record.id + ']?',
                  okText: '同意',
                  cancelText: '取消',
                  confirm: handleSanction.bind(null, record, '2'),
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
  import { leaveList, leaveExport, leaveRemove, leaveUpdate } from '@/api/works/leave';
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
      width: 300,
      title: '操作',
      key: 'action',
      fixed: 'right',
    },
  });

  const [registerModal, { openModal }] = useModal();

  async function handleSanction(record: Recordable, status: '-1' | '1') {
    // openModal(true, { record, update: true });
    console.log(record);
    await leaveUpdate({ ...record, status });
    await reload();
  }
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
