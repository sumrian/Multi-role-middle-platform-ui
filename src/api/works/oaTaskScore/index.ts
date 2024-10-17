import { defHttp } from '@/utils/http/axios';
import { ID, IDS, commonExport } from '@/api/base';
import { OaTaskScoreVO, OaTaskScoreForm, OaTaskScoreQuery } from './model';

/**
 * 查询OA效率管理列表
 * @param params
 * @returns
 */
export function oaTaskScoreList(params?: OaTaskScoreQuery) {
  return defHttp.get<OaTaskScoreVO[]>({ url: '/works/oaTaskScore/list', params });
}

/**
 * 导出OA效率管理列表
 * @param params
 * @returns
 */
export function oaTaskScoreExport(params?: OaTaskScoreQuery) {
  return commonExport('/works/oaTaskScore/export', params ?? {});
}

/**
 * 查询OA效率管理详细
 * @param id id
 * @returns
 */
export function oaTaskScoreInfo(id: ID) {
  return defHttp.get<OaTaskScoreVO>({ url: '/works/oaTaskScore/' + id });
}

/**
 * 新增OA效率管理
 * @param data
 * @returns
 */
export function oaTaskScoreAdd(data: OaTaskScoreForm) {
  return defHttp.postWithMsg<void>({ url: '/works/oaTaskScore', data });
}

/**
 * 更新OA效率管理
 * @param data
 * @returns
 */
export function oaTaskScoreUpdate(data: OaTaskScoreForm) {
  return defHttp.putWithMsg<void>({ url: '/works/oaTaskScore', data });
}

/**
 * 删除OA效率管理
 * @param id id
 * @returns
 */
export function oaTaskScoreRemove(id: ID | IDS) {
  return defHttp.deleteWithMsg<void>({ url: '/works/oaTaskScore/' + id });
}
