import type { BasicTableProps, TableActionType, FetchParams, BasicColumn } from '../types/table';
import type { PaginationProps } from '../types/pagination';
import type { DynamicProps } from '#/utils';
import type { FormActionType } from '@/components/Form';
import type { WatchStopHandle, ComputedRef } from 'vue';
import { getDynamicProps } from '@/utils';
import { ref, onUnmounted, unref, watch, toRaw, computed } from 'vue';
import { isProdMode } from '@/utils/env';
import { error } from '@/utils/log';
import type { Key } from 'ant-design-vue/lib/table/interface';
import { useMessage } from '@/hooks/web/useMessage';

type Props = Partial<DynamicProps<BasicTableProps>>;

type UseTableMethod = TableActionType & {
  getForm: () => FormActionType;
};

export function useTable(tableProps?: Props): [
  (instance: TableActionType, formInstance: UseTableMethod) => void,
  TableActionType & {
    getForm: () => FormActionType;
    selected: ComputedRef<boolean>;
    multipleRemove: (api: (...data: any) => Promise<any>) => Promise<void>;
  },
] {
  const tableRef = ref<Nullable<TableActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const formRef = ref<Nullable<UseTableMethod>>(null);

  let stopWatch: WatchStopHandle;

  function register(instance: TableActionType, formInstance: UseTableMethod) {
    isProdMode() &&
      onUnmounted(() => {
        tableRef.value = null;
        loadedRef.value = null;
      });

    if (unref(loadedRef) && isProdMode() && instance === unref(tableRef)) return;

    tableRef.value = instance;
    formRef.value = formInstance;
    tableProps && instance.setProps(getDynamicProps(tableProps));
    loadedRef.value = true;

    stopWatch?.();

    stopWatch = watch(
      () => tableProps,
      () => {
        tableProps && instance.setProps(getDynamicProps(tableProps));
      },
      {
        immediate: true,
        deep: true,
      },
    );
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      );
    }
    return table as TableActionType;
  }

  const { createConfirm } = useMessage();

  const methods: TableActionType & {
    getForm: () => FormActionType;
    selected: ComputedRef<boolean>;
    multipleRemove: (api: (...data: any) => Promise<any>) => Promise<void>;
  } = {
    reload: async (opt?: FetchParams) => {
      // 传递参数
      if (opt?.doNotClearSelectRows !== true) {
        // 刷新时候取消选中(默认)
        getTableInstance().clearSelectedRowKeys();
      }
      return await getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    redoHeight: () => {
      getTableInstance().redoHeight();
    },
    setSelectedRows: (rows: Recordable[]) => {
      return toRaw(getTableInstance().setSelectedRows(rows));
    },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    getDataSource: () => {
      return getTableInstance().getDataSource();
    },
    getRawDataSource: () => {
      return getTableInstance().getRawDataSource();
    },
    getSearchInfo: () => {
      return getTableInstance().getSearchInfo();
    },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return toRaw(columns);
    },
    setColumns: (columns: BasicColumn[] | string[]) => {
      getTableInstance().setColumns(columns);
    },
    setTableData: (values: any[]) => {
      return getTableInstance().setTableData(values);
    },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    deleteSelectRowByKey: (keyValue: Key) => {
      getTableInstance().deleteSelectRowByKey(keyValue);
    },
    getSelectRowKeys: () => {
      return toRaw(getTableInstance().getSelectRowKeys());
    },
    selected: computed<boolean>(() => {
      return getTableInstance().getSelectRowKeys().length > 0;
    }),
    // 多选删除
    multipleRemove: async (api: (...data: any) => Promise<any>) => {
      const instance = getTableInstance();
      const selectedRowKeys = instance.getSelectRowKeys();
      createConfirm({
        title: '提示',
        content: `是否删除这${selectedRowKeys.length}条数据?`,
        iconType: 'warning',
        okButtonProps: {
          danger: true,
        },
        onOk: async () => {
          console.log(selectedRowKeys);
          await api(selectedRowKeys);
          instance.clearSelectedRowKeys();
          await instance.reload();
        },
      });
    },
    getSelectRows: () => {
      return toRaw(getTableInstance().getSelectRows());
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    setSelectedRowKeys: (keyValues: Key[]) => {
      getTableInstance().setSelectedRowKeys(keyValues);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    getSize: () => {
      return toRaw(getTableInstance().getSize());
    },
    updateTableData: (index: number, key: string, value: any) => {
      return getTableInstance().updateTableData(index, key, value);
    },
    deleteTableDataRecord: (keyValues: Key | Key[]) => {
      return getTableInstance().deleteTableDataRecord(keyValues);
    },
    insertTableDataRecord: (record: Recordable | Recordable[], index?: number) => {
      return getTableInstance().insertTableDataRecord(record, index);
    },
    updateTableDataRecord: (keyValue: Key, record: Recordable) => {
      return getTableInstance().updateTableDataRecord(keyValue, record);
    },
    findTableDataRecord: (keyValue: Key) => {
      return getTableInstance().findTableDataRecord(keyValue);
    },
    getRowSelection: () => {
      return toRaw(getTableInstance().getRowSelection());
    },
    getCacheColumns: () => {
      return toRaw(getTableInstance().getCacheColumns());
    },
    getForm: () => {
      return unref(formRef) as unknown as FormActionType;
    },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show);
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination());
    },
    expandAll: () => {
      getTableInstance().expandAll();
    },
    collapseAll: () => {
      getTableInstance().collapseAll();
    },
    expandRows: (keyValues: Key[]) => {
      getTableInstance().expandRows(keyValues);
    },
    collapseRows: (keyValues: Key[]) => {
      getTableInstance().collapseRows(keyValues);
    },
    scrollTo: (pos: string) => {
      getTableInstance().scrollTo(pos);
    },
  };

  return [register, methods];
}
