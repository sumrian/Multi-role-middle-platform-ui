import { BaseEntity, PageQuery } from '@/api/base';

export interface OaTaskScoreVO {
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

  /**
   * 执行人
   */
  EXECUTOR: string;

  /**
   * 复核人
   */
  REVIEWER: string;

  /**
   * 协助人
   */
  ASSISTANT: string;

  /**
   * 事项标题
   */
  TITLE: string;

  /**
   * 事项类型
   */
  TYPE: string;

  /**
   * 得分
   */
  SCORE: string;

  /**
   * 用户得分(评分)
   */
  userScore: string;

  /**
   * 事项描述
   */
  DESCRIPTION: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 跟踪时间
   */
  followUpTime: string;

  /**
   * 完成时间
   */
  completionTime: string;

  /**
   * 任务状态
   */
  STATUS: string;

  /**
   * 耗时 (以分钟计)
   */
  timeSpent: number;

  /**
   * 扩展信息
   */
  extJson: string;

}

export interface OaTaskScoreForm extends BaseEntity {
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

  /**
   * 执行人
   */
  EXECUTOR?: string;

  /**
   * 复核人
   */
  REVIEWER?: string;

  /**
   * 协助人
   */
  ASSISTANT?: string;

  /**
   * 事项标题
   */
  TITLE?: string;

  /**
   * 事项类型
   */
  TYPE?: string;

  /**
   * 得分
   */
  SCORE?: string;

  /**
   * 用户得分(评分)
   */
  userScore?: string;

  /**
   * 事项描述
   */
  DESCRIPTION?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 跟踪时间
   */
  followUpTime?: string;

  /**
   * 完成时间
   */
  completionTime?: string;

  /**
   * 任务状态
   */
  STATUS?: string;

  /**
   * 耗时 (以分钟计)
   */
  timeSpent?: number;

  /**
   * 扩展信息
   */
  extJson?: string;

}

export interface OaTaskScoreQuery extends PageQuery {
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
   * 执行人
   */
  EXECUTOR?: string;

  /**
   * 复核人
   */
  REVIEWER?: string;

  /**
   * 协助人
   */
  ASSISTANT?: string;

  /**
   * 事项标题
   */
  TITLE?: string;

  /**
   * 事项类型
   */
  TYPE?: string;

  /**
   * 得分
   */
  SCORE?: string;

  /**
   * 用户得分(评分)
   */
  userScore?: string;

  /**
   * 事项描述
   */
  DESCRIPTION?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 跟踪时间
   */
  followUpTime?: string;

  /**
   * 完成时间
   */
  completionTime?: string;

  /**
   * 任务状态
   */
  STATUS?: string;

  /**
   * 耗时 (以分钟计)
   */
  timeSpent?: number;

  /**
   * 扩展信息
   */
  extJson?: string;

  /**
    * 日期范围参数
    */
  params?: any;
}
