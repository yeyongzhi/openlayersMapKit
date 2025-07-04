var f = Object.defineProperty;
var d = (t, i, e) => i in t ? f(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var a = (t, i, e) => d(t, typeof i != "symbol" ? i + "" : i, e);
function o(t) {
  return t != null;
}
function s(t) {
  console.warn("omap warn", t);
}
function _(t) {
  throw new Error(`omap error ${t}`);
}
function h(t) {
  return (i, e) => `📦${t}【${i}】: ${e}`;
}
function z(t) {
  return Array.isArray(t);
}
function r(t) {
  return typeof t == "number";
}
function c(t) {
  return z(t) && t.length === 2 && r(t[0]) && r(t[1]);
}
const I = "Size", u = h(I);
class $ {
  constructor(i, e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    a(this, "_size", []);
    (!r(i) || !r(e)) && _(u("constructor", "初始化参数有误")), this._size = [i, e];
  }
  _isInitialized(i) {
    return o(this._size) ? !0 : (s(u(i, "未正确实例化")), !1);
  }
  /**
   * 获取size
   * @returns {number[] | undefined} size
   */
  getSize() {
    if (this._isInitialized("getSize"))
      return this._size;
  }
  /**
   * 设置size
   * @param {number[]} size
   */
  setSize(i) {
    if (this._isInitialized("setSize")) {
      if (!r(i[0]) || !r(i[1])) {
        s(u("setSize", "参数格式有误"));
        return;
      }
      this._size = i;
    }
  }
  /**
   * 获取Size的width
   * @returns {number | undefined} width
   */
  getWidth() {
    if (this._isInitialized("getWidth"))
      return this._size[0];
  }
  /**
   * 获取Size的height
   * @returns {number} height
   */
  getHeight() {
    if (this._isInitialized("getHeight"))
      return this._size[1];
  }
  /**
   * 设置Size的width
   * @param {number} width
   */
  setWidth(i) {
    if (this._isInitialized("setWidth")) {
      if (!r(i)) {
        s(u("setWidth", "参数格式有误"));
        return;
      }
      this._size[0] = i;
    }
  }
  /**
   * 设置Size的height
   * @param {number} height
   */
  setHeight(i) {
    if (this._isInitialized("setHeight")) {
      if (!r(i)) {
        s(u("setHeight", "参数格式有误"));
        return;
      }
      this._size[1] = i;
    }
  }
  /**
   * 判断两个尺寸是否相等
   * @param {Size} size 
   * @returns {boolean} 判断结果
   */
  equals(i) {
    if (this._isInitialized("equals"))
      return this._size[0] === i._size[0] && this._size[1] === i._size[1];
  }
  /**
   * 以字符串的形式输出尺寸
   * @returns {string} sizeStr
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._size[0]}, ${this._size[1]}]` : "";
  }
}
const x = "Pixel", n = h(x);
class A {
  constructor(i, e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    a(this, "_pixel", []);
    (!r(i) || !r(e)) && _(n("constructor", "初始化参数有误")), this._pixel = [i, e];
  }
  _isInitialized(i) {
    return o(this._pixel) ? !0 : (s(n(i, "未正确实例化")), !1);
  }
  /**
   * 获取像素坐标
   * @returns {number[] | undefined} 像素坐标
   */
  getPixel() {
    if (this._isInitialized("getPixel"))
      return this._pixel;
  }
  /**
   * 设置像素坐标
   * @param {number[]} pixel 像素坐标
   */
  setPixel(i) {
    if (this._isInitialized("setPixel")) {
      if (!r(i[0]) || !r(i[1])) {
        s(n("setPixel", "参数格式有误"));
        return;
      }
      this._pixel = i;
    }
  }
  /**
   * 获取像素的 x 坐标
   * @returns {number | undefined} x 坐标
   */
  getX() {
    if (this._isInitialized("getX"))
      return this._pixel[0];
  }
  /**
   * 获取像素的 y 坐标
   * @returns {number | undefined} y 坐标
   */
  getY() {
    if (this._isInitialized("getY"))
      return this._pixel[1];
  }
  /**
   * 设置像素的 x 坐标
   * @param {number} x x 坐标
   */
  setX(i) {
    if (this._isInitialized("setX")) {
      if (!r(i)) {
        s(n("setX", "参数格式有误"));
        return;
      }
      this._pixel[0] = i;
    }
  }
  /**
   * 设置像素的 y 坐标
   * @param {number} y y 坐标
   */
  setY(i) {
    if (this._isInitialized("setY")) {
      if (!r(i)) {
        s(n("setY", "参数格式有误"));
        return;
      }
      this._pixel[1] = i;
    }
  }
  /**
   * 判断两个像素坐标是否相等
   * @param {Pixel} pixel 像素对象
   * @returns {boolean | undefined} 判断结果
   */
  equals(i) {
    if (!this._isInitialized("equals")) return;
    if (!o(i)) {
      s(n("equals", "参数未正确实例化"));
      return;
    }
    const e = i.getPixel();
    if (e)
      return this._pixel[0] === e[0] && this._pixel[1] === e[1];
  }
  /**
   * 以字符串的形式输出像素坐标
   * @returns {string} 像素坐标字符串
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._pixel[0]}, ${this._pixel[1]}]` : "";
  }
}
const v = "Lnglat", l = h(v);
class g {
  constructor(i, e) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    a(this, "_lnglat", []);
    (!r(i) || !r(e)) && _(l("constructor", "传入经纬度格式错误")), this._lnglat = [i, e];
  }
  _isInitialized(i) {
    return !o(this._lnglat) || !c(this._lnglat) ? (s(l(i, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(i) {
    if (this._isInitialized("setLng")) {
      if (!r(i)) {
        s(l("setLng", "传入经度格式有误"));
        return;
      }
      this._lnglat[0] = i;
    }
  }
  /**
   * 设置纬度
   * @param {number} lat 纬度
   */
  setLat(i) {
    if (this._isInitialized("setLat")) {
      if (!r(i)) {
        s(l("setLat", "传入纬度格式有误"));
        return;
      }
      this._lnglat[1] = i;
    }
  }
  /**
   * 获取经度
   * @returns {number | undefined} 经度
   */
  getLng() {
    if (this._isInitialized("getLng"))
      return this._lnglat[0];
  }
  /**
   * 获取纬度
   * @returns {number | undefined} 纬度
   */
  getLat() {
    if (this._isInitialized("getLat"))
      return this._lnglat[1];
  }
  /**
   * 判断两个经纬度是否相等
   * @param {Lnglat} lnglat 经纬度对象
   * @returns {boolean | undefined} 判断结果
   */
  equals(i) {
    if (!this._isInitialized("equals")) return;
    if (!(i instanceof g)) {
      s(l("equals", "传入经纬度格式错误，必须为Lnglat类型"));
      return;
    }
    const e = i.getLng() !== void 0 && i.getLat() !== void 0 ? [i.getLng(), i.getLat()] : void 0;
    if (e)
      return this._lnglat[0] === e[0] && this._lnglat[1] === e[1];
  }
  /**
   * 以数组形式输出经纬度
   * @returns {number[] | undefined} 经纬度数组
   */
  toArray() {
    if (this._isInitialized("toArray"))
      return [...this._lnglat];
  }
  /**
   * 以字符串的形式输出经纬度
   * @param {number} place 保留的小数位数
   * @returns {string | undefined} 经纬度字符串
   */
  toString(i) {
    if (this._isInitialized("toString"))
      return i ? `[${this._lnglat[0].toFixed(i)}, ${this._lnglat[1].toFixed(i)}]` : `[${this._lnglat[0]}, ${this._lnglat[1]}]`;
  }
}
class p {
}
class P {
}
export {
  p as Color,
  P as Extent,
  g as Lnglat,
  A as Pixel,
  $ as Size
};
