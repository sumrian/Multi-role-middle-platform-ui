import { defHttp } from '@/utils/http/axios';
import { ID, IDS, commonExport } from '@/api/base';
import { LeaveVO, LeaveForm, LeaveQuery } from './model';

/**
 * 查询请假申请列表
 * @param params
 * @returns
 */
export function leaveList(params?: LeaveQuery) {
  return defHttp.get<LeaveVO[]>({ url: '/system/leave/list', params });
}

/**
 * 导出请假申请列表
 * @param params
 * @returns
 */
export function leaveExport(params?: LeaveQuery) {
  return commonExport('/system/leave/export', params ?? {});
}

/**
 * 查询请假申请详细
 * @param id id
 * @returns
 */
export function leaveInfo(id: ID) {
  return defHttp.get<LeaveVO>({ url: '/system/leave/' + id });
}

/**
 * 新增请假申请
 * @param data
 * @returns
 */
export function leaveAdd(data: LeaveForm) {
  return defHttp.postWithMsg<void>({ url: '/system/leave', data });
}

/**
 * 更新请假申请
 * @param data
 * @returns
 */
export function leaveUpdate(data: LeaveForm) {
  return defHttp.putWithMsg<void>({ url: '/system/leave', data });
}

/**
 * 删除请假申请
 * @param id id
 * @returns
 */
export function leaveRemove(id: ID | IDS) {
  return defHttp.deleteWithMsg<void>({ url: '/system/leave/' + id });
}
