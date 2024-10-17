import { BaseEntity, PageQuery } from '@/api/base';

export interface EfficiencyVO {
  /**
   * 主键
   */
  id: string | number;

  /**
   * 部门id
   */
  deptId: string | number;

  /**
   * 用户id
   */
  userId: string | number;

  /**
   * 排序号
   */
  orderNum: number;

  /**
   * key键
   */
  testKey: string;

  /**
   * 值
   */
  value: string;

}

export interface EfficiencyForm extends BaseEntity {
  /**
   * 主键
   */
  id?: string | number;

  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 用户id
   */
  userId?: string | number;

  /**
   * 排序号
   */
  orderNum?: number;

  /**
   * key键
   */
  testKey?: string;

  /**
   * 值
   */
  value?: string;

}

export interface EfficiencyQuery extends PageQuery {
  /**
   * 部门id
   */
  deptId?: string | number;

  /**
   * 用户id
   */
  userId?: string | number;

  /**
   * 排序号
   */
  orderNum?: number;

  /**
   * key键
   */
  testKey?: string;

  /**
   * 值
   */
  value?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
