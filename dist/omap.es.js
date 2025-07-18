var gt = Object.defineProperty;
var S = (r) => {
  throw TypeError(r);
};
var _t = (r, t, e) => t in r ? gt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => _t(r, typeof t != "symbol" ? t + "" : t, e), N = (r, t, e) => t.has(r) || S("Cannot " + e);
var j = (r, t, e) => (N(r, t, "read from private field"), e ? e.call(r) : t.get(r)), q = (r, t, e) => t.has(r) ? S("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), U = (r, t, e, i) => (N(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e);
import * as K from "ol";
import * as G from "ol/layer";
import * as T from "ol/source";
import * as D from "ol/proj";
import "ol/util";
import ft from "ol/Feature";
import * as $ from "ol/geom";
import "ol/style";
function n(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function d(r) {
  throw new Error(`omap error ${r}`);
}
function _(r) {
  return (t, e) => `📦${r}【${t}】: ${e}`;
}
const pt = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function Z(r) {
  return Array.isArray(r);
}
function l(r) {
  return typeof r == "number";
}
function m(r) {
  return typeof r == "string";
}
function mt(r) {
  return r === "";
}
function yt(r) {
  return typeof r == "boolean";
}
function O(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function ht(r) {
  return Z(r) && r.length === 2 && l(r[0]) && l(r[1]);
}
function B(r) {
  return Z(r) && r.length === 3 && r.every((t) => l(t) && t >= 0 && t <= 255);
}
function Ft(r) {
  return m(r) && pt.test(r);
}
function L(r) {
  return l(r) && r >= 0 && r <= 1;
}
function P(r) {
  let t = r.replace("#", "");
  return m(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function It(r) {
  let t = r.replace("#", "");
  return m(r) && r.startsWith("#") && t.length === 8;
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
function H(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function zt(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function vt(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const xt = "Size", v = _(xt);
class Xt {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    a(this, "_size", []);
    (!l(t) || !l(e)) && d(v("constructor", "初始化参数有误")), this._size = [t, e];
  }
  _isInitialized(t) {
    return n(this._size) ? !0 : (o(v(t, "未正确实例化")), !1);
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
      if (!l(t[0]) || !l(t[1])) {
        o(v("setSize", "参数格式有误"));
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
      if (!l(t)) {
        o(v("setWidth", "参数格式有误"));
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
      if (!l(t)) {
        o(v("setHeight", "参数格式有误"));
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
const Et = "Pixel", y = _(Et);
class At {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    a(this, "_pixel", []);
    (!l(t) || !l(e)) && d(y("constructor", "初始化参数有误")), this._pixel = [t, e];
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
      if (!l(t[0]) || !l(t[1])) {
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
      if (!l(t)) {
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
      if (!l(t)) {
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
const wt = "Lnglat", x = _(wt);
class h {
  constructor(t, e) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    a(this, "_lnglat");
    (!l(t) || !l(e)) && d(x("constructor", "传入经纬度格式错误")), this._lnglat = [t, e];
  }
  _isInitialized(t) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(x(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!l(t)) {
        o(x("setLng", "传入经度格式有误"));
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
      if (!l(t)) {
        o(x("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof h)) {
      o(x("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !ht(this._lnglat) ? "" : `[${(e = this._lnglat[0]) == null ? void 0 : e.toFixed(t)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(t)}]`;
  }
}
const W = {
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
}, bt = "Color", w = _(bt);
class Jt {
  constructor(t) {
    a(this, "_color", "");
    this._initColor(t);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(t) {
    const e = () => {
      d(w("constructor", "初始化参数有误"));
    };
    if (Z(t)) {
      let i = t;
      if (i.length === 3) {
        if (!B(t)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!B(i.slice(0, 3)) || !L(i[3])) {
          e();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!P(i[0]) || !L(i[1])) {
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
    if (O(t)) {
      let i = t;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        e();
        return;
      }
      if (n(i.color)) {
        if (P(i.color)) {
          let s = z(i.color);
          if (!n(s)) {
            e();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (Ft(i.color)) {
          let s = H(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!B([i.r, i.g, i.b])) {
          e();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        e();
        return;
      }
    }
    if (m(t)) {
      if (mt(t)) {
        e();
        return;
      }
      if (P(t)) {
        let i = z(t);
        if (!n(i)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (It(t)) {
        let i = z(t.slice(0, 7));
        if (!n(i)) {
          e();
          return;
        }
        let s = vt(t.slice(6));
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
    if (!L(t)) {
      d(w("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...H(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...zt(this._color), t]);
    else {
      if (!n(W[this._color])) {
        d(w("withAlpha", "颜色值有误"));
        return;
      }
      let e = z(W[this._color]);
      if (!n(e)) {
        d(w("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...e, t]);
    }
  }
}
const Ct = "Extent", E = _(Ct);
class I {
  constructor(t, e, i, s) {
    a(this, "_extent", []);
    if (!l(t) || !l(e) || !l(i) || !l(s)) {
      d(E("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < t || s < e) {
      d(E("constructor", "初始化参数有误"));
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
      return new h(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new h(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new h(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new h(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new h(
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
    if (!(t instanceof I) || !(e instanceof h)) {
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
let V = "BaseLayer", g = _(V);
const Y = 1, X = !0, J = 0, Q = 22, tt = 0, et = 1 / 0, it = 1, rt = {};
var A;
class M {
  // 图层所属组ID，默认null
  constructor(t, e) {
    /**
     * 图层类型
     */
    a(this, "type", null);
    /**
     * 图层实例（ol）
     */
    a(this, "_layer");
    // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    a(this, "id", null);
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    a(this, "name", "");
    a(this, "className", "");
    // 图层样式类名，用于自定义图层样式，默认无
    a(this, "opacity", Y);
    // 图层透明度，默认1
    a(this, "visible", X);
    // 图层是否可见，默认true
    a(this, "extent", null);
    // 图层范围，默认全局
    a(this, "minZoom", J);
    // 最小缩放级别，默认0
    a(this, "maxZoom", Q);
    // 最大缩放级别，默认22
    a(this, "minResolution", tt);
    // 最小分辨率，默认0r
    a(this, "maxResolution", et);
    // 最大分辨率，默认Infinity
    a(this, "zIndex", it);
    // 图层层级，默认0
    a(this, "properties", rt);
    // 图层属性，用于存储图层相关信息
    q(this, A, null);
    let i = e || {};
    this.type = t, V = `${t}Layer`, g = _(V), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || Y, this.visible = i.visible || X, this.extent = i.extent || null, this.minZoom = i.minZoom || J, this.maxZoom = i.maxZoom || Q, this.minResolution = i.minResolution || tt, this.maxResolution = i.maxResolution || et, this.zIndex = i.zIndex || it, this.properties = i.properties || rt;
  }
  _isInitialized(t) {
    return n(this._layer) ? !0 : (o(g(t, "未正确实例化")), !1);
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
        o(g("setOpacity", "透明度不能为空"));
        return;
      }
      if (!L(t)) {
        o(g("setOpacity", "透明度必须为0~1的数字"));
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
        o(g("setVisible", "可见性不能为空"));
        return;
      }
      if (yt(t)) {
        o(g("setVisible", "可见性必须为boolean类型"));
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
        o(g("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!l(t)) {
        o(g("setMinZoom", "minZoom必须为number类型"));
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
        o(g("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!l(t)) {
        o(g("setMaxZoom", "maxZoom必须为number类型"));
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
        o(g("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!l(t)) {
        o(g("setMinResolution", "minResolution必须为number类型"));
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
        o(g("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!l(t)) {
        o(g("setMaxResolution", "maxResolution必须为number类型"));
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
        o(g("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!l(t)) {
        o(g("setZIndex", "zIndex必须为number类型"));
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
        o(g("setProperties", "属性不能为空"));
        return;
      }
      if (O(t)) {
        o(g("setProperties", "属性必须为object类型"));
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
      return j(this, A);
  }
  // TODO
  setGroupId(t) {
    U(this, A, t);
  }
}
A = new WeakMap();
const Lt = "Event", st = _(Lt);
class Mt {
  constructor(t) {
    a(this, "events", /* @__PURE__ */ new Map());
    a(this, "target", null);
    a(this, "total", 0);
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
      } catch (p) {
        d(st("emit", `回调异常: ${String(p)}`));
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
    return o(st("remove", `未找到 id=${t} 的监听`)), this;
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
function nt(r) {
  return r.startsWith("map:");
}
function b(r, t, e) {
  let i = {
    target: r,
    type: t
  };
  switch (t) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      e.pixel && (i.pixel = new At(...e.pixel)), e.coordinate && (i.coordinate = new h(...e.coordinate));
      break;
    case "map:propertychange":
      i.key = e.key, i.oldValue = e.oldValue;
      let s = r.getProperties();
      i.newValue = n(s) ? s[e.key] : void 0;
      break;
    case "view:change:resolution":
      e.oldValue && (i.oldValue = e.oldValue), i.newValue = e.newValue || r.getResolution();
      break;
    case "view:change:center":
      e.oldValue && (i.oldValue = new h(...e.oldValue)), i.newValue = e.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      e.oldValue && (i.oldValue = e.oldValue), i.newValue = e.newValue || r.getRotation();
      break;
    case "view:propertychange":
      e.oldValue && (i.oldValue = e.key === "center" ? new h(...e.oldValue) : e.oldValue), e.key === "center" ? i.newValue = e.newValue || r.getCenter() : e.key === "rotation" ? i.newValue = e.newValue || r.getRotation() : e.key === "resolution" && (i.newValue = e.newValue || r.getResolution());
      break;
  }
  return i;
}
const $t = "Map", c = _($t);
let Qt = class {
  constructor(t, e) {
    a(this, "_map");
    a(this, "_view");
    a(this, "layers", []);
    a(this, "events", null);
    const s = e.view;
    if (!n(s)) {
      d(c("constructor", "view参数不能为空"));
      return;
    }
    let u = s.projection || new F("EPSG:3857");
    m(u) && (u = new F(u));
    const p = {
      ...s,
      center: s.center instanceof h ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof I ? s.extent._extent : s.extent,
      projection: u._projection
    }, f = new K.View(p), dt = new K.Map({
      target: t,
      view: f
    });
    this._view = f, this._map = dt, this.events = new Mt(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(t) {
    return this._map == null || this._view == null ? (o(c(t, "未正确实例化")), !1) : !0;
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let t = this._view.getCenter();
    return new h(...t);
  }
  setCenter(t) {
    if (!this._isInitialized("setCenter")) return;
    if (!n(t)) {
      o(c("setCenter", "参数center不能为空"));
      return;
    }
    let e = t instanceof h ? t._lnglat : t;
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
      if (!l(t)) {
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
      if (!l(t)) {
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
      if (!l(t)) {
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
      if (n(t) && !l(t)) {
        o(c("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(t);
    }
  }
  zoomOut(t = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(t) && !l(t)) {
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
    if (t instanceof Ut)
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
      i instanceof M && n(i.getId()) && i.getId() === t && (e = i);
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
      return o(c("removeLayerById", `找不到id为${t}(${m(t) ? "string" : "number"})的图层`)), !1;
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
    let i = nt(t);
    const s = i ? this._map : this._view;
    let u = this.events.get(t);
    return (!n(u) || u.length === 0) && (i ? s.on(t.replace("map:", ""), (f) => {
      this.events.emit(t, b(this, t, f));
    }) : s.on(t.replace("view:", ""), (f) => {
      this.events.emit(t, b(this, t, f));
    })), this.events.on(t, e);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        o(c("un", "参数不能为空"));
        return;
      }
      if (!l(t)) {
        o(c("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, e) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(e)) {
      o(c("on", "参数不能为空"));
      return;
    }
    let i = nt(t);
    const s = i ? this._map : this._view;
    let u = this.events.get(t);
    return (!n(u) || u.length === 0) && (i ? s.on(t.replace("map:", ""), (f) => {
      this.events.emit(t, b(this, t, f));
    }) : s.on(t.replace("view:", ""), (f) => {
      this.events.emit(t, b(this, t, f));
    })), this.events.once(t, e);
  }
  // 属性管理
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._map.getProperties() || {};
  }
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
const Bt = "Map", ot = _(Bt);
class F {
  constructor(t) {
    a(this, "_projection", null);
    a(this, "code", "");
    a(this, "units", "degrees");
    let e = "";
    if (m(t))
      e = t.startsWith("EPSG") ? t : "EPSG:" + t;
    else {
      let i = t;
      if (!n(i.code)) {
        d(ot("constructor", "初始化参数有误"));
        return;
      }
      e = i.code, e = e.startsWith("EPSG") ? e : "EPSG:" + e;
    }
    if (this.code = e, this._projection = D.get(e), !n(this._projection)) {
      o(ot("constructor", "坐标系不存在"));
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
const Pt = "Feature", R = _(Pt);
class Rt {
  constructor(t, e) {
    a(this, "type");
    a(this, "_feature");
    a(this, "_geometry");
    this.type = t, this._init(e);
  }
  _init(t) {
    switch (this.type) {
      case "Point":
        let e = t;
        this._geometry = new $.Point(e instanceof h ? e._lnglat : e);
        break;
      case "LineString":
        let i = t.map((u) => u instanceof h ? u._lnglat : u);
        this._geometry = new $.LineString(i);
        break;
      case "Polygon":
        let s = t.map((u) => u.map((p) => p instanceof h ? p._lnglat : p));
        this._geometry = new $.Polygon(s);
        break;
    }
    this._feature = new ft({
      geometry: this._geometry
    });
  }
  _isInitialized(t) {
    return this._feature == null ? (o(R(t, "未正确实例化")), !1) : !0;
  }
  getFeature() {
    if (this._isInitialized("getFeature"))
      return this._feature;
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._feature.getProperties();
  }
  setProperties(t) {
    if (this._isInitialized("setProperties")) {
      if (!n(t)) {
        o(R("setProperties", "参数不能为空"));
        return;
      }
      if (!O(t)) {
        o(R("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(t || {});
    }
  }
}
const kt = "Point", at = _(kt);
class ee extends Rt {
  constructor(t, e) {
    if (!n(t)) {
      d(at("constructor", "参数不能为空"));
      return;
    }
    if (!(t instanceof h) && !ht(t)) {
      d(at("constructor", "坐标格式有误"));
      return;
    }
    super("Point", t), e && this.setProperties(e);
  }
}
const Dt = {
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
class ie extends M {
  constructor(e, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    a(this, "gaodeType", null);
    this.gaodeType = e, this._layer = new G.Tile({
      source: new T.XYZ({
        urls: Dt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const Vt = "ProjUtil", lt = _(Vt);
class re {
  static fromLonLat(t, e) {
    if (!n(t)) {
      o(lt("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = t;
    t instanceof h && (i = t._lnglat);
    let s = n(e) ? m(e) ? new F(e) : e : new F("EPSG:3857"), u = D.fromLonLat(i, s._projection);
    return new h(u[0], u[1]);
  }
  static toLonLat(t, e) {
    if (!n(t)) {
      o(lt("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = t;
    t instanceof h && (i = t._lnglat);
    let s = n(e) ? m(e) ? new F(e) : e : new F("EPSG:3857"), u = D.toLonLat(i, s._projection);
    return new h(u[0], u[1]);
  }
}
const k = "OMapToken", Gt = {
  tdt: null
};
function Tt(r, t) {
  window[k] || (window[k] = {}), window[k][r] = t;
}
const ct = new Proxy(Gt, {
  set: function(r, t, e, i) {
    return Tt(t, e), Reflect.set(r, t, e, i);
  }
}), Zt = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function Ot(r, t) {
  return Zt.replace(/\{T\}/g, r + "_" + t).replace(/\{tk\}/g, ct.tdt);
}
let St = "TdtLayer", ut = _(St);
class se extends M {
  constructor(e, i) {
    var u, p, f;
    super("Tdt", i);
    /**
     * 图层类型
     */
    a(this, "tdtType", null);
    if (!n(ct.tdt)) {
      d(ut("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(e)) {
      d(ut("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    delete s.source, s.map, this.tdtType = e, this._layer = new G.Tile({
      ...s,
      extent: n(s.extent) ? (u = s.extent) == null ? void 0 : u._extent : void 0,
      map: n(s.map) ? (p = s.map) == null ? void 0 : p._map : void 0,
      background: n(s.background) ? (f = s.background) == null ? void 0 : f._color : void 0,
      source: new T.XYZ({
        url: Ot(e, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let Nt = "VectorLayer", jt = _(Nt);
class ne extends M {
  constructor(e = {}) {
    super("Vector", e);
    a(this, "features", []);
    let i = n(e.source) ? e.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((u) => u.getFeature()) : []
    };
    this._layer = new G.Vector({
      source: new T.Vector(s)
    }), this._initLayerEvent();
  }
  addFeature(e) {
    if (!n(e)) {
      o(jt("addFeature", "参数不能为空"));
      return;
    }
    this.features.push(e), this._layer.getSource().addFeature(e.getFeature());
  }
  addFeatures() {
  }
}
let qt = "LayerGroup", C = _(qt);
class Ut {
  constructor(t, e) {
    a(this, "id", null);
    a(this, "layers", []);
    if (!n(t)) {
      d(C("constructor", "参数不能为空"));
      return;
    }
    let i, s = null;
    if (Array.isArray(t))
      i = t;
    else {
      if (s = t, !n(e)) {
        d(C("constructor", "layers 参数不能为空"));
        return;
      }
      i = e;
    }
    n(s) && (this.id = s), this.layers = i;
  }
  add(t) {
    if (!n(t)) {
      d(C("add", "图层不能为空"));
      return;
    }
    let e = t.getId();
    if (n(e) && this.layers.find((s) => s.getId() && s.getId() === e)) {
      o(C("add", "图层已存在"));
      return;
    }
    this.layers.push(t);
  }
  remove(t) {
    if (l(t)) {
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
  Jt as Color,
  I as Extent,
  ie as GaodeLayer,
  Ut as LayerGroup,
  h as Lnglat,
  Qt as Map,
  ct as MapToken,
  At as Pixel,
  ee as Point,
  re as ProjUtil,
  F as Projection,
  Xt as Size,
  se as TdtLayer,
  ne as VectorLayer
};
