var lt = Object.defineProperty;
var P = (r) => {
  throw TypeError(r);
};
var ut = (r, t, e) => t in r ? lt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var l = (r, t, e) => ut(r, typeof t != "symbol" ? t + "" : t, e), Z = (r, t, e) => t.has(r) || P("Cannot " + e);
var T = (r, t, e) => (Z(r, t, "read from private field"), e ? e.call(r) : t.get(r)), V = (r, t, e) => t.has(r) ? P("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), G = (r, t, e, i) => (Z(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e);
import * as O from "ol";
import * as rt from "ol/layer";
import * as st from "ol/source";
import * as B from "ol/proj";
import "ol/util";
function n(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function g(r) {
  throw new Error(`omap error ${r}`);
}
function _(r) {
  return (t, e) => `📦${r}【${t}】: ${e}`;
}
const ht = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function D(r) {
  return Array.isArray(r);
}
function a(r) {
  return typeof r == "number";
}
function p(r) {
  return typeof r == "string";
}
function ct(r) {
  return r === "";
}
function dt(r) {
  return typeof r == "boolean";
}
function nt(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function gt(r) {
  return D(r) && r.length === 2 && a(r[0]) && a(r[1]);
}
function L(r) {
  return D(r) && r.length === 3 && r.every((t) => a(t) && t >= 0 && t <= 255);
}
function _t(r) {
  return p(r) && ht.test(r);
}
function C(r) {
  return a(r) && r >= 0 && r <= 1;
}
function M(r) {
  let t = r.replace("#", "");
  return p(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function ft(r) {
  let t = r.replace("#", "");
  return p(r) && r.startsWith("#") && t.length === 8;
}
function z(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), e = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [t, e, i];
}
function S(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function pt(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function mt(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const yt = "Size", x = _(yt);
class Gt {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    l(this, "_size", []);
    (!a(t) || !a(e)) && g(x("constructor", "初始化参数有误")), this._size = [t, e];
  }
  _isInitialized(t) {
    return n(this._size) ? !0 : (o(x(t, "未正确实例化")), !1);
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
  setSize(t) {
    if (this._isInitialized("setSize")) {
      if (!a(t[0]) || !a(t[1])) {
        o(x("setSize", "参数格式有误"));
        return;
      }
      this._size = t;
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
  setWidth(t) {
    if (this._isInitialized("setWidth")) {
      if (!a(t)) {
        o(x("setWidth", "参数格式有误"));
        return;
      }
      this._size[0] = t;
    }
  }
  /**
   * 设置Size的height
   * @param {number} height
   */
  setHeight(t) {
    if (this._isInitialized("setHeight")) {
      if (!a(t)) {
        o(x("setHeight", "参数格式有误"));
        return;
      }
      this._size[1] = t;
    }
  }
  /**
   * 判断两个尺寸是否相等
   * @param {Size} size 
   * @returns {boolean} 判断结果
   */
  equals(t) {
    if (this._isInitialized("equals"))
      return this._size[0] === t._size[0] && this._size[1] === t._size[1];
  }
  /**
   * 以字符串的形式输出尺寸
   * @returns {string} sizeStr
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._size[0]}, ${this._size[1]}]` : "";
  }
}
const Ft = "Pixel", y = _(Ft);
class It {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    l(this, "_pixel", []);
    (!a(t) || !a(e)) && g(y("constructor", "初始化参数有误")), this._pixel = [t, e];
  }
  _isInitialized(t) {
    return n(this._pixel) ? !0 : (o(y(t, "未正确实例化")), !1);
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
  setPixel(t) {
    if (this._isInitialized("setPixel")) {
      if (!a(t[0]) || !a(t[1])) {
        o(y("setPixel", "参数格式有误"));
        return;
      }
      this._pixel = t;
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
  setX(t) {
    if (this._isInitialized("setX")) {
      if (!a(t)) {
        o(y("setX", "参数格式有误"));
        return;
      }
      this._pixel[0] = t;
    }
  }
  /**
   * 设置像素的 y 坐标
   * @param {number} y y 坐标
   */
  setY(t) {
    if (this._isInitialized("setY")) {
      if (!a(t)) {
        o(y("setY", "参数格式有误"));
        return;
      }
      this._pixel[1] = t;
    }
  }
  /**
   * 判断两个像素坐标是否相等
   * @param {Pixel} pixel 像素对象
   * @returns {boolean | undefined} 判断结果
   */
  equals(t) {
    if (!this._isInitialized("equals")) return;
    if (!n(t)) {
      o(y("equals", "参数未正确实例化"));
      return;
    }
    const e = t.getPixel();
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
const zt = "Lnglat", v = _(zt);
class d {
  constructor(t, e) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    l(this, "_lnglat");
    (!a(t) || !a(e)) && g(v("constructor", "传入经纬度格式错误")), this._lnglat = [t, e];
  }
  _isInitialized(t) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(v(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!a(t)) {
        o(v("setLng", "传入经度格式有误"));
        return;
      }
      this._lnglat[0] = t;
    }
  }
  /**
   * 设置纬度
   * @param {number} lat 纬度
   */
  setLat(t) {
    if (this._isInitialized("setLat")) {
      if (!a(t)) {
        o(v("setLat", "传入纬度格式有误"));
        return;
      }
      this._lnglat[1] = t;
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
  equals(t) {
    if (!this._isInitialized("equals")) return;
    if (!(t instanceof d)) {
      o(v("equals", "传入经纬度格式错误，必须为Lnglat类型"));
      return;
    }
    const e = t.getLng() !== void 0 && t.getLat() !== void 0 ? [t.getLng(), t.getLat()] : void 0;
    if (e)
      return this._lnglat[0] === e[0] && this._lnglat[1] === e[1];
  }
  /**
   * 以数组形式输出经纬度
   * @returns {LnglatType | undefined} 经纬度数组
   */
  toArray() {
    if (this._isInitialized("toArray"))
      return this._lnglat;
  }
  /**
   * 以字符串的形式输出经纬度
   * @param {number} place 保留的小数位数
   * @returns {string} 经纬度字符串
   */
  toString(t) {
    var e, i;
    return !this._isInitialized("toString") || !gt(this._lnglat) ? "" : `[${(e = this._lnglat[0]) == null ? void 0 : e.toFixed(t)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(t)}]`;
  }
}
const N = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000000",
  blanchedalmond: "#FFEBCD",
  blue: "#0000FF",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#00FFFF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#FF00FF",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#00FF00",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#FF00FF",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  red: "#FF0000",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFFFFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FFFF00",
  yellowgreen: "#9ACD32"
}, xt = "Color", w = _(xt);
class Ot {
  constructor(t) {
    l(this, "_color", "");
    this._initColor(t);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(t) {
    const e = () => {
      g(w("constructor", "初始化参数有误"));
    };
    if (D(t)) {
      let i = t;
      if (i.length === 3) {
        if (!L(t)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!L(i.slice(0, 3)) || !C(i[3])) {
          e();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!M(i[0]) || !C(i[1])) {
          e();
          return;
        }
        let s = z(t[0]);
        if (!n(s)) {
          e();
          return;
        }
        this._color = `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i[1]})`;
      } else {
        e();
        return;
      }
    }
    if (nt(t)) {
      let i = t;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        e();
        return;
      }
      if (n(i.color)) {
        if (M(i.color)) {
          let s = z(i.color);
          if (!n(s)) {
            e();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (_t(i.color)) {
          let s = S(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!L([i.r, i.g, i.b])) {
          e();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        e();
        return;
      }
    }
    if (p(t)) {
      if (ct(t)) {
        e();
        return;
      }
      if (M(t)) {
        let i = z(t);
        if (!n(i)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (ft(t)) {
        let i = z(t.slice(0, 7));
        if (!n(i)) {
          e();
          return;
        }
        let s = mt(t.slice(6));
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${s})`;
      } else
        this._color = t;
    }
  }
  getColor() {
    return this._color;
  }
  setColor(t) {
    this._initColor(t);
  }
  /**
   * 设置透明度
   * @param alpha {number} 透明度，范围0-1
   */
  withAlpha(t) {
    if (!C(t)) {
      g(w("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...S(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...pt(this._color), t]);
    else {
      if (!n(N[this._color])) {
        g(w("withAlpha", "颜色值有误"));
        return;
      }
      let e = z(N[this._color]);
      if (!n(e)) {
        g(w("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...e, t]);
    }
  }
}
const vt = "Extent", E = _(vt);
class I {
  constructor(t, e, i, s) {
    l(this, "_extent", []);
    if (!a(t) || !a(e) || !a(i) || !a(s)) {
      g(E("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < t || s < e) {
      g(E("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, e, i, s];
  }
  _isInitialized(t) {
    return !n(this._extent) || this._extent.length !== 4 ? (o(E(t, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft() {
    if (this._isInitialized("getTopLeft"))
      return new d(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new d(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new d(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new d(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new d(
        (this._extent[0] + this._extent[2]) / 2,
        (this._extent[1] + this._extent[3]) / 2
      );
  }
  // getWidth(): number | undefined {
  //     if (!this._isInitialized('getWidth')) return undefined;
  //     return getWidth(this._extent);
  // }
  /**
   * 以字符串的形式输出边界范围
   * @return {string} 边界范围（字符串）
   */
  toString(t) {
    if (this._isInitialized("toString"))
      return `[${this._extent[0].toFixed(t)}, ${this._extent[1].toFixed(t)}, ${this._extent[2].toFixed(t)}, ${this._extent[3].toFixed(t)}]`;
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param extent 范围
   * @param position 位置
   * @return 判断结果
   */
  static containsCoordinate(t, e) {
    if (!(t instanceof I) || !(e instanceof d)) {
      o(E("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!t._isInitialized("containsCoordinate") || !n(e.toArray())) return;
    const [i, s] = e.toArray();
    return i >= t._extent[0] && i <= t._extent[2] && t._extent[1] <= s && s <= t._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(t, e) {
    if (!(t instanceof I) || !(e instanceof I)) {
      o(E("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !e._isInitialized("containsExtent")))
      return t._extent[0] <= e._extent[0] && e._extent[2] <= t._extent[2] && t._extent[1] <= e._extent[1] && e._extent[3] <= t._extent[3];
  }
}
let R = "BaseLayer", h = _(R);
const j = 1, q = !0, U = 0, H = 22, W = 0, Y = 1 / 0, K = 1, X = {};
var A;
class k {
  // 图层所属组ID，默认null
  constructor(t, e) {
    /**
     * 图层类型
     */
    l(this, "type", null);
    /**
     * 图层实例（ol）
     */
    l(this, "_layer");
    // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    l(this, "id", null);
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    l(this, "name", "");
    l(this, "className", "");
    // 图层样式类名，用于自定义图层样式，默认无
    l(this, "opacity", j);
    // 图层透明度，默认1
    l(this, "visible", q);
    // 图层是否可见，默认true
    l(this, "extent", null);
    // 图层范围，默认全局
    l(this, "minZoom", U);
    // 最小缩放级别，默认0
    l(this, "maxZoom", H);
    // 最大缩放级别，默认22
    l(this, "minResolution", W);
    // 最小分辨率，默认0r
    l(this, "maxResolution", Y);
    // 最大分辨率，默认Infinity
    l(this, "zIndex", K);
    // 图层层级，默认0
    l(this, "properties", X);
    // 图层属性，用于存储图层相关信息
    V(this, A, null);
    let i = e || {};
    this.type = t, R = `${t}Layer`, h = _(R), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || j, this.visible = i.visible || q, this.extent = i.extent || null, this.minZoom = i.minZoom || U, this.maxZoom = i.maxZoom || H, this.minResolution = i.minResolution || W, this.maxResolution = i.maxResolution || Y, this.zIndex = i.zIndex || K, this.properties = i.properties || X;
  }
  _isInitialized(t) {
    return n(this._layer) ? !0 : (o(h(t, "未正确实例化")), !1);
  }
  _initLayerEvent() {
    this._layer.on([
      "propertychange"
    ], (t) => {
      t.key === "opacity" && (this.opacity = this.getOpacity());
    });
  }
  getId() {
    if (this._isInitialized("getId"))
      return this.id;
  }
  /**
   * 设置图层透明度
   * @param {number} opacity 透明度，0~1
   */
  setOpacity(t) {
    if (this._isInitialized("setOpacity")) {
      if (!n(t)) {
        o(h("setOpacity", "透明度不能为空"));
        return;
      }
      if (!C(t)) {
        o(h("setOpacity", "透明度必须为0~1的数字"));
        return;
      }
      this._layer.setOpacity(t);
    }
  }
  /**
   * 获取图层透明度
   * @returns {number} 透明度，0~1
   */
  getOpacity() {
    if (this._isInitialized("getOpacity"))
      return this._layer.getOpacity();
  }
  /**
   * 设置图层可见性
   * @param {boolean} visible 可见性，true/false
   */
  setVisible(t) {
    if (this._isInitialized("setVisible")) {
      if (!n(t)) {
        o(h("setVisible", "可见性不能为空"));
        return;
      }
      if (dt(t)) {
        o(h("setVisible", "可见性必须为boolean类型"));
        return;
      }
      this._layer.setVisible(t);
    }
  }
  /**
   * 获取图层可见性
   * @returns {boolean} 可见性，true/false
   */
  getVisible() {
    if (this._isInitialized("getVisible"))
      return this._layer.getVisible();
  }
  setExtent() {
  }
  getExtent() {
  }
  setMinZoom(t) {
    if (this._isInitialized("setMinZoom")) {
      if (!n(t)) {
        o(h("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!a(t)) {
        o(h("setMinZoom", "minZoom必须为number类型"));
        return;
      }
      this._layer.setMinZoom(t);
    }
  }
  getMinZoom() {
    if (this._isInitialized("getMinZoom"))
      return this._layer.getMinZoom();
  }
  setMaxZoom(t) {
    if (this._isInitialized("setMaxZoom")) {
      if (!n(t)) {
        o(h("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!a(t)) {
        o(h("setMaxZoom", "maxZoom必须为number类型"));
        return;
      }
      this._layer.setMaxZoom(t);
    }
  }
  getMaxZoom() {
    if (this._isInitialized("getMaxZoom"))
      return this._layer.getMaxZoom();
  }
  setMinResolution(t) {
    if (this._isInitialized("setMinResolution")) {
      if (!n(t)) {
        o(h("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!a(t)) {
        o(h("setMinResolution", "minResolution必须为number类型"));
        return;
      }
      this._layer.setMinResolution(t);
    }
  }
  getMinResolution() {
    if (this._isInitialized("getMinResolution"))
      return this._layer.getMinResolution();
  }
  setMaxResolution(t) {
    if (this._isInitialized("setMaxResolution")) {
      if (!n(t)) {
        o(h("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!a(t)) {
        o(h("setMaxResolution", "maxResolution必须为number类型"));
        return;
      }
      this._layer.setMaxResolution(t);
    }
  }
  getMaxResolution() {
    if (this._isInitialized("getMaxResolution"))
      return this._layer.getMaxResolution();
  }
  setZIndex(t) {
    if (this._isInitialized("setZIndex")) {
      if (!n(t)) {
        o(h("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!a(t)) {
        o(h("setZIndex", "zIndex必须为number类型"));
        return;
      }
      this._layer.setZIndex(t);
    }
  }
  getZIndex() {
    if (this._isInitialized("getZIndex"))
      return this._layer.getZIndex();
  }
  setProperties(t) {
    if (this._isInitialized("setProperties")) {
      if (!n(t)) {
        o(h("setProperties", "属性不能为空"));
        return;
      }
      if (nt(t)) {
        o(h("setProperties", "属性必须为object类型"));
        return;
      }
      this._layer.setProperties(t);
    }
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._layer.getProperties();
  }
  getGroupId() {
    if (this._isInitialized("getGroupId"))
      return T(this, A);
  }
  // TODO
  setGroupId(t) {
    G(this, A, t);
  }
}
A = new WeakMap();
const Et = "Event", J = _(Et);
class At {
  constructor(t) {
    l(this, "events", /* @__PURE__ */ new Map());
    l(this, "target", null);
    l(this, "total", 0);
    this.events.clear(), this.target = t;
  }
  on(t, e) {
    let i = this.events.get(t) || [], s = ++this.total;
    return i.push({
      id: s,
      target: this.target,
      type: t,
      callback: e
    }), this.events.set(t, i), s;
  }
  once(t, e) {
    const i = this.events.get(t) || [], s = ++this.total;
    return i.push({
      id: s,
      target: this.target,
      type: t,
      callback: e,
      once: !0
    }), this.events.set(t, i), s;
  }
  emit(t, ...e) {
    const i = this.events.get(t);
    if (!i || i.length === 0) return this;
    for (let s = 0; s < i.length; ) {
      const u = i[s];
      try {
        u.callback.call(u.target, ...e);
      } catch (m) {
        g(J("emit", `回调异常: ${String(m)}`));
      }
      u.once ? i.splice(s, 1) : s++;
    }
    return i.length === 0 && this.events.delete(t), this;
  }
  remove(t) {
    for (const [e, i] of this.events.entries()) {
      const s = i.findIndex((u) => u.id === t);
      if (s !== -1)
        return i.splice(s, 1), i.length === 0 && this.events.delete(e), this;
    }
    return o(J("remove", `未找到 id=${t} 的监听`)), this;
  }
  off(t) {
    return t === void 0 ? this.events.clear() : this.events.delete(t), this;
  }
  getEventById(t) {
    for (const e of this.events.values()) {
      const i = e.find((s) => s.id === t);
      if (i) return i;
    }
  }
  get(t) {
    return this.events.get(t) || [];
  }
  listenerCount(t) {
    var e;
    return ((e = this.events.get(t)) == null ? void 0 : e.length) || 0;
  }
}
function wt(r) {
  return r.startsWith("map:");
}
function Q(r, t, e) {
  let i = {
    target: r,
    type: t
  };
  switch (t) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      e.pixel && (i.pixel = new It(...e.pixel)), e.coordinate && (i.coordinate = new d(...e.coordinate));
      break;
    case "view:change:resolution":
      e.oldValue && (i.oldValue = e.oldValue), i.newValue = e.newValue || r.getResolution();
      break;
    case "view:change:center":
      e.oldValue && (i.oldValue = new d(...e.oldValue)), i.newValue = e.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      e.oldValue && (i.oldValue = e.oldValue), i.newValue = e.newValue || r.getRotation();
      break;
    case "view:propertychange":
      e.oldValue && (i.oldValue = e.key === "center" ? new d(...e.oldValue) : e.oldValue), e.key === "center" ? i.newValue = e.newValue || r.getCenter() : e.key === "rotation" ? i.newValue = e.newValue || r.getRotation() : e.key === "resolution" && (i.newValue = e.newValue || r.getResolution());
      break;
  }
  return i;
}
const bt = "Map", c = _(bt);
let St = class {
  constructor(t, e) {
    l(this, "_map", null);
    l(this, "_view", null);
    l(this, "layers", []);
    l(this, "events", null);
    const s = e.view;
    if (!n(s)) {
      g(c("constructor", "view参数不能为空"));
      return;
    }
    let u = s.projection || new F("EPSG:3857");
    p(u) && (u = new F(u));
    const m = {
      ...s,
      center: s.center instanceof d ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof I ? s.extent._extent : s.extent,
      projection: u._projection
    }, f = new O.View(m), at = new O.Map({
      target: t,
      view: f
    });
    this._view = f, this._map = at, this.events = new At(this);
  }
  _isInitialized(t) {
    return !n(this._map) || !n(this._view) ? (o(c(t, "未正确实例化")), !1) : !0;
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let t = this._view.getCenter();
    return new d(...t);
  }
  setCenter(t) {
    if (!this._isInitialized("setCenter")) return;
    if (!n(t)) {
      o(c("setCenter", "参数center不能为空"));
      return;
    }
    let e = t instanceof d ? t._lnglat : t;
    this._view.setCenter(e);
  }
  getZoom() {
    if (this._isInitialized("getZoom"))
      return this._view.getZoom();
  }
  setZoom(t) {
    if (this._isInitialized("setZoom")) {
      if (!n(t)) {
        o(c("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!a(t)) {
        o(c("setZoom", "参数zoom必须为number类型"));
        return;
      }
      this._view.setZoom(t);
    }
  }
  getResolution() {
    if (this._isInitialized("getResolution"))
      return this._view.getResolution();
  }
  setResolution(t) {
    if (this._isInitialized("setResolution")) {
      if (!n(t)) {
        o(c("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!a(t)) {
        o(c("setResolution", "参数resolution必须为number类型"));
        return;
      }
      this._view.setResolution(t);
    }
  }
  getRotation() {
    if (this._isInitialized("getRotation"))
      return this._view.getRotation();
  }
  setRotation(t) {
    if (this._isInitialized("setRotation")) {
      if (!n(t)) {
        o(c("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!a(t)) {
        o(c("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(t);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let t = this._view.calculateExtent(), [e, i, s, u] = t;
    return new I(e, i, s, u);
  }
  zoomIn(t = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(t) && !a(t)) {
        o(c("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(t);
    }
  }
  zoomOut(t = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(t) && !a(t)) {
        o(c("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(t);
    }
  }
  // 图层管理相关
  addLayer(t) {
    if (!this._isInitialized("addLayer")) return;
    if (!n(t)) {
      o(c("addLayer", "图层对象不能为空"));
      return;
    }
    if (t instanceof Zt)
      return t.getId(), t.getAll().forEach((i) => {
        this.layers.push(i), this._map.addLayer(i._layer);
      }), !1;
    const e = t.getId();
    if (n(e) && this.getLayerById(e)) {
      o(c("addLayer", "图层已存在"));
      return;
    }
    this.layers.push(t), this._map.addLayer(t._layer);
  }
  addLayers(t) {
  }
  getLayerById(t) {
    if (!n(t)) {
      o(c("getLayerById", "图层id不能为空"));
      return;
    }
    let e;
    return this.layers.forEach((i) => {
      i instanceof k && n(i.getId()) && i.getId() === t && (e = i);
    }), e;
  }
  removeLayer(t) {
    if (!this._isInitialized("removeLayer")) return;
    let e = this.layers.indexOf(t);
    e !== -1 && (this.layers.splice(e, 1), this._map.removeLayer(t._layer));
  }
  removeLayers(t) {
    this._isInitialized("removeLayers") && this.layers.forEach((e, i) => {
      t.includes(e) && (this.layers.splice(i, 1), this._map.removeLayer(e._layer));
    });
  }
  removeLayerById(t) {
    if (!this._isInitialized("removeLayerById")) return;
    if (!n(t)) {
      o(c("removeLayerById", "图层id不能为空"));
      return;
    }
    let e = this.getLayerById(t);
    if (!n(e))
      return o(c("removeLayerById", `找不到id为${t}(${p(t) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(e);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(t, e) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(e)) {
      o(c("on", "参数不能为空"));
      return;
    }
    let i = wt(t);
    const s = i ? this._map : this._view;
    let u = this.events.get(t);
    return console.log(u), (!n(u) || u.length === 0) && (i ? s.on(t.replace("map:", ""), (f) => {
      console.log(f), this.events.emit(t, Q(this, t, f));
    }) : s.on(t.replace("view:", ""), (f) => {
      console.log(f), this.events.emit(t, Q(this, t, f));
    })), this.events.on(t, e);
  }
  un() {
  }
  once() {
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._map.getProperties();
  }
  // 属性管理
  setProperties(t) {
    if (this._isInitialized("setProperties")) {
      if (!n(t)) {
        o(c("setProperties", "参数不能为空"));
        return;
      }
      this._map.setProperties(t);
    }
  }
};
const Ct = "Map", tt = _(Ct);
class F {
  constructor(t) {
    l(this, "_projection", null);
    l(this, "code", "");
    l(this, "units", "degrees");
    let e = "";
    if (p(t))
      e = t.startsWith("EPSG") ? t : "EPSG:" + t;
    else {
      let i = t;
      if (!n(i.code)) {
        g(tt("constructor", "初始化参数有误"));
        return;
      }
      e = i.code, e = e.startsWith("EPSG") ? e : "EPSG:" + e;
    }
    if (this.code = e, this._projection = B.get(e), !n(this._projection)) {
      o(tt("constructor", "坐标系不存在"));
      return;
    }
    this.units = this._projection.getUnits();
  }
  getCode() {
    return this.code;
  }
  getUnits() {
    return this.units;
  }
  getAxisOrientation() {
    return this._projection.getAxisOrientation();
  }
  getExtent() {
    return this._projection.getExtent();
  }
}
const Lt = {
  vec: [
    "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    "https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
  ],
  img: [
    "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    "http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    "http://webst03.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    "http://webst04.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}"
  ],
  road: [
    "http://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    "http://webst03.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    "http://webst04is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
  ]
};
class jt extends k {
  constructor(e, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    l(this, "gaodeType", null);
    this.gaodeType = e, this._layer = new rt.Tile({
      source: new st.XYZ({
        urls: Lt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const Mt = "ProjUtil", et = _(Mt);
class qt {
  static fromLonLat(t, e) {
    if (!n(t)) {
      o(et("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = t;
    t instanceof d && (i = t._lnglat);
    let s = n(e) ? p(e) ? new F(e) : e : new F("EPSG:3857"), u = B.fromLonLat(i, s._projection);
    return new d(u[0], u[1]);
  }
  static toLonLat(t, e) {
    if (!n(t)) {
      o(et("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = t;
    t instanceof d && (i = t._lnglat);
    let s = n(e) ? p(e) ? new F(e) : e : new F("EPSG:3857"), u = B.toLonLat(i, s._projection);
    return new d(u[0], u[1]);
  }
}
const $ = "OMapToken", $t = {
  tdt: null
};
function Bt(r, t) {
  window[$] || (window[$] = {}), window[$][r] = t;
}
const ot = new Proxy($t, {
  set: function(r, t, e, i) {
    return Bt(t, e), Reflect.set(r, t, e, i);
  }
}), Rt = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function Dt(r, t) {
  return Rt.replace(/\{T\}/g, r + "_" + t).replace(/\{tk\}/g, ot.tdt);
}
let kt = "TdtLayer", it = _(kt);
class Ut extends k {
  constructor(e, i) {
    var u, m, f;
    super("Tdt", i);
    /**
     * 图层类型
     */
    l(this, "tdtType", null);
    if (!n(ot.tdt)) {
      g(it("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(e)) {
      g(it("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    delete s.source, s.map, this.tdtType = e, this._layer = new rt.Tile({
      ...s,
      extent: n(s.extent) ? (u = s.extent) == null ? void 0 : u._extent : void 0,
      map: n(s.map) ? (m = s.map) == null ? void 0 : m._map : void 0,
      background: n(s.background) ? (f = s.background) == null ? void 0 : f._color : void 0,
      source: new st.XYZ({
        url: Dt(e, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let Pt = "LayerGroup", b = _(Pt);
class Zt {
  constructor(t, e) {
    l(this, "id", null);
    l(this, "layers", []);
    if (!n(t)) {
      g(b("constructor", "参数不能为空"));
      return;
    }
    let i, s = null;
    if (Array.isArray(t))
      i = t;
    else {
      if (s = t, !n(e)) {
        g(b("constructor", "layers 参数不能为空"));
        return;
      }
      i = e;
    }
    n(s) && (this.id = s), this.layers = i;
  }
  add(t) {
    if (!n(t)) {
      g(b("add", "图层不能为空"));
      return;
    }
    let e = t.getId();
    if (n(e) && this.layers.find((s) => s.getId() && s.getId() === e)) {
      o(b("add", "图层已存在"));
      return;
    }
    this.layers.push(t);
  }
  remove(t) {
    if (a(t)) {
      this.layers.splice(t, 1);
      return;
    }
    let e = t.getId();
    if (n(e)) {
      let i = this.layers.find((s) => s.getId() && s.getId() === e);
      i && this.layers.splice(this.layers.indexOf(i), 1);
    } else
      this.layers.splice(this.layers.indexOf(t), 1);
  }
  clear() {
    this.layers = [];
  }
  getAll() {
    return this.layers;
  }
  getId() {
    return this.id;
  }
}
export {
  Ot as Color,
  I as Extent,
  jt as GaodeLayer,
  Zt as LayerGroup,
  d as Lnglat,
  St as Map,
  ot as MapToken,
  It as Pixel,
  qt as ProjUtil,
  F as Projection,
  Gt as Size,
  Ut as TdtLayer
};
