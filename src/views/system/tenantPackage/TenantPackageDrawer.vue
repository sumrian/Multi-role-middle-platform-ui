<template>
  <BasicDrawer
    v-bind="$attrs"
    :title="title"
    :width="drawerWidth"
    :show-footer="true"
    @register="registerModal"
    @ok="handleSubmit"
    @close="resetFormFields"
  >
    <BasicForm @register="registerForm">
      <template #menuIds="{ model, field }">
        <FormItemRest>
          <Card :body-style="{ padding: 0 }">
            <BasicTree
              ref="menuTreeRef"
              v-if="menuTree.length"
              title="菜单分配"
              :tree-data="menuTree"
              :fieldNames="{ title: 'label', key: 'menuId' }"
              :checkable="true"
              :selectable="false"
              :enableCustomTool="true"
              v-model:checkStrictly="menuCheckStrictly"
              v-model:checkedKeys="model[field]"
              @check="handleChecked"
              @change="handleChange"
            >
              <template #title="data">
                <TreeItem :data="data" />
              </template>
            </BasicTree>
          </Card>
        </FormItemRest>
      </template>
    </BasicForm>
  </BasicDrawer>
</template>

<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref, unref, computed, nextTick } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { modalSchemas, excludeIds } from './tenantPackage.data';
  import { packageAdd, packageUpdate, packageInfo } from '@/api/system/tenantPackage';
  import { Card, FormItemRest } from 'ant-design-vue';
  import { BasicTree } from '@/components/Tree';
  import { tenantPackageMenuTreeSelect, menuList } from '@/api/system/menu';
  import type { Menu } from '@/api/system/menu/model';
  import { CheckInfo } from 'ant-design-vue/es/vc-tree/props';
  import { findAllIds, filter, listToTree } from '@/utils/helper/treeHelper';
  import { useMaxWidthOrDefault } from '@/hooks/web/useSize';
  import { DataNode } from 'ant-design-vue/lib/tree';
  import TreeItem from './TreeItem';

  defineOptions({ name: 'TenantPackageDrawer' });

  const emit = defineEmits(['register', 'reload']);
  const isUpdate = ref<boolean>(false);
  const title = computed(() => {
    return isUpdate.value ? '编辑租户套餐' : '新增租户套餐';
  });
  const drawerWidth = useMaxWidthOrDefault(700);

  const menuTreeRef = ref();
  const menuTree = ref<DataNode[]>([]);
  /** 默认展开层级 */
  const defaultExpandLevel = 1;

  // checkable 状态下节点选择完全受控（父子节点选中状态不再关联）
  const menuCheckStrictly = ref<boolean>(false);

  const [registerModal, { closeDrawer, drawerLoading }] = useDrawerInner(
    async (data: { record?: Recordable; update: boolean }) => {
      drawerLoading(true);

      // 加载菜单要放在前面执行
      await initMenuTree();

      // 先默认给一个节点关联 update的话自己会对应修改
      menuCheckStrictly.value = false;
      const { record, update } = data;
      isUpdate.value = update;
      if (update && record) {
        const ret = await packageInfo(record.packageId);

        // 用于未操作菜单(即没有触发handleChecked)直接点击确定的情况
        // 直接点击确定是不带父节点的  在这里保存所有节点的ID
        // 这里用于提交
        const allNodeIds = transformIdStr(ret.menuIds as string);
        checkedMenuKeys.value = allNodeIds;
        // 是否节点独立/关联  后台返回的字段和antd是反的
        menuCheckStrictly.value = !ret.menuCheckStrictly;

        // tree
        const { checkedKeys } = await tenantPackageMenuTreeSelect(record.packageId);

        // 已经选择的菜单 这里是不带父节点的  只用于显示
        ret.menuIds = checkedKeys;

        await setFieldsValue(ret);
      }

      /** 默认展开defaultExpandLevel层 */
      nextTick(() => {
        if (unref(menuTreeRef)) {
          unref(menuTreeRef).filterByLevel(defaultExpandLevel);
        }
      });

      drawerLoading(false);
    },
  );

  /**
   * 加载可选择菜单
   */
  async function initMenuTree() {
    const resp = await menuList();
    const excludeIconMenu = resp.map((item) => {
      // 按钮不显示图标
      if (item.menuType === 'F') {
        item.icon = '';
      }
      return item;
    });
    // 去除租户相关菜单(分配了也无权限)
    const afterTransform = transformMenu(excludeIconMenu);
    const tree = listToTree(afterTransform, { id: 'menuId' });
    menuTree.value = tree;
  }

  /**
   * 不显示租户相关菜单  分配了也没法使用
   * @param menuTree menus
   */
  function transformMenu(menuTree: Menu[]) {
    return filter(
      menuTree,
      (item) => {
        if (excludeIds.includes(item.menuId)) {
          return false;
        }
        return true;
      },
      { id: 'menuId', pid: 'parentId', children: 'children' },
    );
  }
  /**
   * 后端返回的string类型的字符串转为number类型的数组
   *
   * @bugfix 自定义菜单ID数值为字符串 不能转换会精度丢失
   * @param idStr id字符串 如"1, 2, 3, 4"
   * @returns 转换后的数组 [1, 2, 3, 4]
   */
  function transformIdStr(idStr: string): string[] {
    if (!idStr) {
      return [];
    }
    return idStr.split(', ');
  }

  const [registerForm, { setFieldsValue, validate, resetForm }] = useForm({
    layout: 'vertical',
    labelWidth: 80,
    name: 'tenant_package_drawer',
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    schemas: modalSchemas,
  });

  /** 已经选择的所有节点  包括子/父节点 */
  const checkedMenuKeys = ref<(number | string)[]>([]);
  /**
   *
   * @param checkedKeys 已经选中的子节点的ID
   * @param info info.halfCheckedKeys为父节点的ID
   */
  type CheckedState<T = number> = T[] | { checked: T[]; halfChecked: T[] };
  function handleChecked(checkedKeys: CheckedState, info: CheckInfo) {
    // 数组的话为节点关联
    if (checkedKeys instanceof Array) {
      const halfCheckedKeys: number[] = (info.halfCheckedKeys || []) as number[];
      checkedMenuKeys.value = [...halfCheckedKeys, ...checkedKeys];
    } else {
      checkedMenuKeys.value = [...checkedKeys.checked];
    }
  }

  /**
   * 选择/取消全部只会触发change事件
   * 回调参数在选择/取消 事件时只会是数组  忽略menuCheckStrictly
   * @param checkedKeys
   */
  function handleChange(checkedKeys: CheckedState) {
    if (checkedKeys instanceof Array) {
      const menuIds = findAllIds(menuTree.value, {
        id: 'menuId',
        children: 'children',
        pid: 'parentId',
      });
      // 取消全部
      if (checkedKeys.length === 0) {
        console.log('取消全部');
        checkedMenuKeys.value = [];
      }
      // 选择全部
      if (checkedKeys.length === menuIds.length) {
        console.log('选择全部');
        checkedMenuKeys.value = menuIds;
      }
    }
  }

  async function handleSubmit() {
    try {
      drawerLoading(true);
      const formData = await validate();
      // 这里是已经保存的节点
      formData.menuIds = checkedMenuKeys.value.sort();
      formData.menuCheckStrictly = !unref(menuCheckStrictly);
      if (unref(isUpdate)) {
        await packageUpdate(formData);
      } else {
        await packageAdd(formData);
      }
      emit('reload');
      closeDrawer();
      await resetFormFields();
    } catch (e) {
      console.warn(e);
    } finally {
      drawerLoading(false);
    }
  }

  async function resetFormFields() {
    await resetForm();
    checkedMenuKeys.value = [];
  }
</script>

<style scoped></style>
