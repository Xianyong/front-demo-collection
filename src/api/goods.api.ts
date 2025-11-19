import request from "@/utils/request";

const API_URL = '/api/shopping/goods'

const GoodsAPI = {
  /**
   * 获取商品列表
   *
   * @param queryParams 查询参数（可选）
   * @returns 商品列表数据
   */
  getList(queryParams?: GoodsQuery) {
    return request<any, GoodsVO[]>({
      url: `${API_URL}`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取商品详情
   *
   * @param id 商品ID
   * @returns 商品详情
   */
  getDetail(id: string) {
    return request<any, GoodsVO>({
      url: `${API_URL}/${id}`,
      method: "get",
    });
  },

  /**
   * 添加商品
   *
   * @param data 商品表单数据
   * @returns 添加结果
   */
  add(data: GoodsForm) {
    return request<any, void>({
      url: `${API_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 更新商品
   *
   * @param id 商品ID
   * @param data 商品表单数据
   * @returns 更新结果
   */
  update(id: string, data: GoodsForm) {
    return request<any, void>({
      url: `${API_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除商品
   *
   * @param id 商品ID
   * @returns 删除结果
   */
  delete(id: string) {
    return request<any, void>({
      url: `${API_URL}/${id}`,
      method: "delete",
    });
  },

  /**
   * 批量删除商品
   *
   * @param ids 商品ID数组
   * @returns 删除结果
   */
  deleteBatch(ids: string[]) {
    return request<any, void>({
      url: `${API_URL}/batch`,
      method: "delete",
      data: ids,
    });
  }
};

export default GoodsAPI;

/** 商品查询参数 */
export interface GoodsQuery {
  /** 搜索关键字 */
  keywords?: string;
  /** 状态 */
  status?: number;
}

/** 商品视图对象 */
export interface GoodsVO {
  /** 商品ID */
  id?: string;
  /** 商品名称 */
  name?: string;
  /** 产地 */
  madeAddress?: string;
  /** 单价 */
  price?: number;
  /** 订单数量 */
  orderCount?: number;
  /** 分类 */
  category?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 商品表单对象 */
export interface GoodsForm {
  /** 商品ID（更新时需要） */
  id?: string;
  /** 商品名称 */
  name: string;
  /** 产地 */
  madeAddress: string;
  /** 单价 */
  price: number;
  /** 订单数量 */
  orderCount?: number;
  /** 分类 */
  category: string;
}