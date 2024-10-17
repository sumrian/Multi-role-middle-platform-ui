import { defHttp } from '@/utils/http/axios';
import { ID, IDS, commonExport } from '@/api/base';
import { EfficiencyVO, EfficiencyForm, EfficiencyQuery } from './model';

/**
 * 查询测试单列表
 * @param params
 * @returns
 */
export function efficiencyList(params?: EfficiencyQuery) {
  return defHttp.get<EfficiencyVO[]>({ url: '/works/efficiency/list', params });
}

/**
 * 导出测试单列表
 * @param params
 * @returns
 */
export function efficiencyExport(params?: EfficiencyQuery) {
  return commonExport('/works/efficiency/export', params ?? {});
}

/**
 * 查询测试单详细
 * @param id id
 * @returns
 */
export function efficiencyInfo(id: ID) {
  return defHttp.get<EfficiencyVO>({ url: '/works/efficiency/' + id });
}

/**
 * 新增测试单
 * @param data
 * @returns
 */
export function efficiencyAdd(data: EfficiencyForm) {
  return defHttp.postWithMsg<void>({ url: '/works/efficiency', data });
}

/**
 * 更新测试单
 * @param data
 * @returns
 */
export function efficiencyUpdate(data: EfficiencyForm) {
  return defHttp.putWithMsg<void>({ url: '/works/efficiency', data });
}

/**
 * 删除测试单
 * @param id id
 * @returns
 */
export function efficiencyRemove(id: ID | IDS) {
  return defHttp.deleteWithMsg<void>({ url: '/works/efficiency/' + id });
}
