import { defHttp } from '@/utils/http/axios';

/**
 * 查询数据库全部表
 * @returns
 */
type TableDataType<T> = {
  code: number;
  msg: string;
  rows: Array<T>;
  total: number;
};
type TableStructure = Record<string, string[]>;
export function getDatabaseTables() {
  return defHttp.get<TableDataType<string>>({ url: '/works/tables' });
}

export function getTableStructure(tables: string) {
  return defHttp.get<TableDataType<TableStructure>>({
    url: '/works/tables/structure',
    params: { tableNames: tables },
  });
}
