<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    @register="registerInnerModal"
    @ok="handleSubmit"
    @cancel="resetForm"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import { leaveInfo, leaveAdd, leaveUpdate } from '@/api/system/leave';
  import { modalSchemas } from './leave.data';

  defineOptions({ name: 'LeaveModal' });

  const emit = defineEmits(['register', 'reload']);

  const isUpdate = ref<boolean>(false);
  const title = computed<string>(() => {
    return isUpdate.value ? '编辑请假申请' : '新增请假申请';
  });

  const [registerInnerModal, { modalLoading, closeModal }] = useModalInner(
    async (data: { record?: Recordable; update: boolean }) => {
      modalLoading(true);
      const { record, update } = data;
      isUpdate.value = update;
      if (update && record) {
        const ret = await leaveInfo(record.id);
        await setFieldsValue(ret);
      }
      modalLoading(false);
    },
  );

  const [registerForm, { setFieldsValue, resetForm, validate }] = useForm({
    labelWidth: 100,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: modalSchemas,
  });

  async function handleSubmit() {
    try {
      modalLoading(true);
      const data = await validate();
      if (unref(isUpdate)) {
        await leaveUpdate(data);
      } else {
        await leaveAdd(data);
      }
      emit('reload');
      closeModal();
      await resetForm();
    } catch (e) {
      console.warn(e);
    } finally {
      modalLoading(false);
    }
  }
</script>

<style scoped></style>
