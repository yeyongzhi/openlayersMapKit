var Xt = Object.defineProperty;
var qt = (r, e, t) => e in r ? Xt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => qt(r, typeof e != "symbol" ? e + "" : e, t);
import * as rt from "ol";
import * as re from "ol/layer";
import * as ie from "ol/source";
import * as je from "ol/proj";
import * as D from "ol/interaction";
import * as _ from "ol/util";
import L from "ol/Feature";
import Jt from "ol/Overlay";
import * as F from "ol/geom";
import * as O from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import * as nt from "ol/sphere";
import { createBox as Qt } from "ol/interaction/Draw";
import * as De from "ol/tilegrid";
import * as w from "ol/extent";
import * as st from "ol/Observable";
function n(r) {
  return r != null;
}
function y(r, e) {
  return n(r) ? r : e;
}
function l(r) {
  console.warn("omap warn", r);
}
function d(r) {
  throw new Error(`omap error ${r}`);
}
function p(r) {
  return (e, t) => `📦${r}【${e}】: ${t}`;
}
const ei = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function Me(r) {
  return typeof r == "function";
}
function z(r) {
  return Array.isArray(r);
}
function ot(r) {
  return Array.isArray(r) && r.length === 0;
}
function g(r) {
  return typeof r == "number";
}
function M(r) {
  return typeof r == "string";
}
function ti(r) {
  return r === "";
}
function Bt(r) {
  return typeof r == "boolean";
}
function ve(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function S(r) {
  return z(r) && r.length === 2 && g(r[0]) && g(r[1]);
}
function Re(r) {
  return z(r) && r.length === 4 && g(r[0]) && g(r[1]) && g(r[2]) && g(r[3]);
}
function Te(r) {
  return z(r) && r.length === 3 && r.every((e) => g(e) && e >= 0 && e <= 255);
}
function ii(r) {
  return M(r) && ei.test(r);
}
function Se(r) {
  return g(r) && r >= 0 && r <= 1;
}
function Be(r) {
  let e = r.replace("#", "");
  return M(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function ri(r) {
  let e = r.replace("#", "");
  return M(r) && r.startsWith("#") && e.length === 8;
}
function $e(r) {
  const e = r.every((t) => g(t));
  return z(r) && e;
}
function ce(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function at(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function ni(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function si(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
function lt() {
  const r = /* @__PURE__ */ new Date(), e = r.getFullYear(), t = String(r.getMonth() + 1).padStart(2, "0"), i = String(r.getDate()).padStart(2, "0"), s = String(r.getHours()).padStart(2, "0"), o = String(r.getMinutes()).padStart(2, "0"), a = String(r.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${s}:${o}:${a}`;
}
function oi() {
  return y(window.devicePixelRatio, 1);
}
const ai = "Size", de = p(ai);
class k {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size", [0, 0]);
    let t = [0, 0];
    if (e.length === 1 && z(e[0]))
      t = e[0];
    else if (e.length === 2 && $e(e))
      t = [e[0], e[1]];
    else {
      d(de("constructor", "初始化参数格式有误"));
      return;
    }
    this._size = t;
  }
  _isInitialized(e) {
    return n(this._size) ? !0 : (l(de(e, "未正确实例化")), !1);
  }
  /**
   * 获取size
   * @returns {OlSizeType | undefined} size
   */
  getSize() {
    if (this._isInitialized("getSize"))
      return this._size;
  }
  /**
   * 设置size
   * @param {OlSizeType} size
   */
  setSize(e) {
    if (this._isInitialized("setSize")) {
      if (!g(e[0]) || !g(e[1])) {
        l(de("setSize", "参数格式有误"));
        return;
      }
      this._size = e;
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
  setWidth(e) {
    if (this._isInitialized("setWidth")) {
      if (!g(e)) {
        l(de("setWidth", "参数格式有误"));
        return;
      }
      this._size[0] = e;
    }
  }
  /**
   * 设置Size的height
   * @param {number} height
   */
  setHeight(e) {
    if (this._isInitialized("setHeight")) {
      if (!g(e)) {
        l(de("setHeight", "参数格式有误"));
        return;
      }
      this._size[1] = e;
    }
  }
  /**
   * 判断两个尺寸是否相等
   * @param {Size} size 
   * @returns {boolean} 判断结果
   */
  equals(e) {
    if (this._isInitialized("equals"))
      return this._size[0] === e._size[0] && this._size[1] === e._size[1];
  }
  /**
   * 转换为数组
   * @returns {OlSizeType | undefined} size
   */
  toArray() {
    if (this._isInitialized("toArray"))
      return this._size;
  }
  /**
   * 以字符串的形式输出尺寸
   * @returns {string} sizeStr
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._size[0]}, ${this._size[1]}]` : "";
  }
}
const li = "Pixel", ne = p(li);
class Z {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    let t = [0, 0];
    if (e.length === 1 && z(e[0]))
      t = e[0];
    else if (e.length === 2 && $e(e))
      t = [e[0], e[1]];
    else {
      d(ne("constructor", "初始化参数格式有误"));
      return;
    }
    this._pixel = t;
  }
  _isInitialized(e) {
    return n(this._pixel) ? !0 : (l(ne(e, "未正确实例化")), !1);
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
  setPixel(e) {
    if (this._isInitialized("setPixel")) {
      if (!g(e[0]) || !g(e[1])) {
        l(ne("setPixel", "参数格式有误"));
        return;
      }
      this._pixel = e;
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
  setX(e) {
    if (this._isInitialized("setX")) {
      if (!g(e)) {
        l(ne("setX", "参数格式有误"));
        return;
      }
      this._pixel[0] = e;
    }
  }
  /**
   * 设置像素的 y 坐标
   * @param {number} y y 坐标
   */
  setY(e) {
    if (this._isInitialized("setY")) {
      if (!g(e)) {
        l(ne("setY", "参数格式有误"));
        return;
      }
      this._pixel[1] = e;
    }
  }
  /**
   * 判断两个像素坐标是否相等
   * @param {Pixel} pixel 像素对象
   * @returns {boolean | undefined} 判断结果
   */
  equals(e) {
    if (!this._isInitialized("equals")) return;
    if (!n(e)) {
      l(ne("equals", "参数未正确实例化"));
      return;
    }
    const t = e.getPixel();
    if (t)
      return this._pixel[0] === t[0] && this._pixel[1] === t[1];
  }
  toArray() {
    if (this._isInitialized("toArray"))
      return this._pixel;
  }
  /**
   * 以字符串的形式输出像素坐标
   * @returns {string} 像素坐标字符串
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._pixel[0]}, ${this._pixel[1]}]` : "";
  }
}
const ui = "Lnglat", fe = p(ui);
class u {
  constructor(...e) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    c(this, "_lnglat", []);
    let t = [];
    if (e.length === 1 && z(e[0]))
      t = e[0];
    else if (e.length === 2 && $e(e))
      t = e;
    else {
      d(fe("constructor", "初始化参数格式有误"));
      return;
    }
    this._lnglat = t;
  }
  _isInitialized(e) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (l(fe(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!g(e)) {
        l(fe("setLng", "传入经度格式有误"));
        return;
      }
      this._lnglat[0] = e;
    }
  }
  /**
   * 设置纬度
   * @param {number} lat 纬度
   */
  setLat(e) {
    if (this._isInitialized("setLat")) {
      if (!g(e)) {
        l(fe("setLat", "传入纬度格式有误"));
        return;
      }
      this._lnglat[1] = e;
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
  equals(e) {
    if (!this._isInitialized("equals")) return;
    if (!(e instanceof u)) {
      l(fe("equals", "传入经纬度格式错误，必须为Lnglat类型"));
      return;
    }
    const t = e.getLng() !== void 0 && e.getLat() !== void 0 ? [e.getLng(), e.getLat()] : void 0;
    if (t)
      return this._lnglat[0] === t[0] && this._lnglat[1] === t[1];
  }
  /**
   * 以数组形式输出经纬度
   * @returns {OlCoordinateType | undefined} 经纬度数组
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
  toString(e) {
    var t, i;
    return !this._isInitialized("toString") || !S(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const ut = {
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
}, ci = "Color", Ie = p(ci);
class N {
  constructor(e) {
    c(this, "_color", "");
    this._initColor(e);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(e) {
    const t = () => {
      d(Ie("constructor", "初始化参数有误"));
    };
    if (z(e)) {
      let i = e;
      if (i.length === 3) {
        if (!Te(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!Te(i.slice(0, 3)) || !Se(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!Be(i[0]) || !Se(i[1])) {
          t();
          return;
        }
        let s = ce(e[0]);
        if (!n(s)) {
          t();
          return;
        }
        this._color = `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i[1]})`;
      } else {
        t();
        return;
      }
    }
    if (ve(e)) {
      let i = e;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        t();
        return;
      }
      if (n(i.color)) {
        if (Be(i.color)) {
          let s = ce(i.color);
          if (!n(s)) {
            t();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (ii(i.color)) {
          let s = at(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!Te([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (M(e)) {
      if (ti(e)) {
        t();
        return;
      }
      if (Be(e)) {
        let i = ce(e);
        if (!n(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (ri(e)) {
        let i = ce(e.slice(0, 7));
        if (!n(i)) {
          t();
          return;
        }
        let s = si(e.slice(6));
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${s})`;
      } else
        this._color = e;
    }
  }
  getColor() {
    return this._color;
  }
  setColor(e) {
    this._initColor(e);
  }
  /**
   * 设置透明度
   * @param alpha {number} 透明度，范围0-1
   */
  withAlpha(e) {
    if (!Se(e)) {
      d(Ie("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...at(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...ni(this._color), e]);
    else {
      if (!n(ut[this._color])) {
        d(Ie("withAlpha", "颜色值有误"));
        return;
      }
      let t = ce(ut[this._color]);
      if (!n(t)) {
        d(Ie("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
function E(r) {
  if (n(r))
    return r instanceof v ? r.getExtent() : r;
}
function P(r) {
  if (n(r))
    return r instanceof u ? r.toArray() : r;
}
const di = "Extent", he = p(di);
class v {
  constructor(...e) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    let t = [];
    if (e.length === 1 && z(e[0]))
      t = e[0];
    else if (e.length === 4 && $e(e))
      t = e;
    else {
      d(he("constructor", "初始化参数格式有误"));
      return;
    }
    this._extent = t;
  }
  _isInitialized(e) {
    return !n(this._extent) || this._extent.length !== 4 ? (l(he(e, "未正确实例化")), !1) : !0;
  }
  getExtent() {
    if (this._isInitialized("getExtent"))
      return this._extent;
  }
  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft() {
    if (this._isInitialized("getTopLeft"))
      return new u(...w.getTopLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new u(...w.getTopRight(this._extent));
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new u(...w.getBottomLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new u(...w.getBottomRight(this._extent));
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new u(...w.getCenter(this._extent));
  }
  /**
   * 获取宽度信息
   * @returns {number} 宽度
   */
  getWidth() {
    if (this._isInitialized("getWidth"))
      return w.getWidth(this._extent);
  }
  /**
   * 获取高度信息
   * @returns {number} 高度
   */
  getHeight() {
    if (this._isInitialized("getHeight"))
      return w.getHeight(this._extent);
  }
  getSize() {
    if (this._isInitialized("getHeight"))
      return new k(...w.getSize(this._extent));
  }
  /**
   * 以字符串的形式输出边界范围
   * @return {string} 边界范围（字符串）
   */
  toString(e) {
    if (this._isInitialized("toString"))
      return `[${this._extent[0].toFixed(e)}, ${this._extent[1].toFixed(e)}, ${this._extent[2].toFixed(e)}, ${this._extent[3].toFixed(e)}]`;
  }
  toArray() {
    if (this._isInitialized("toString"))
      return this._extent;
  }
  /**
   * 构建包含所有给定坐标的范围
   * @param {OMapCoordinateType} coordinates 坐标数组
   * @return {Extent} 边界范围
   */
  static boundingExtent(e) {
    if (!n(e)) {
      d(he("boundingExtent", "参数coordinates不能为空"));
      return;
    }
    if (!z(e)) {
      d(he("boundingExtent", "参数coordinates格式错误，必须为数组"));
      return;
    }
    let t = e.filter((o) => o instanceof u || S(o));
    t.length < e.length && l(he("boundingExtent", "参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型"));
    let i = t.map((o) => o instanceof u ? o.toArray() : o), s = w.boundingExtent(i);
    return new v(...s);
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param {OMapExtentType} extent 范围
   * @param {OMapCoordinateType} coordinate 位置
   * @return {boolean} 判断结果
   */
  static containsCoordinate(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = P(t);
    if (!(!n(i) || !n(s)))
      return w.containsCoordinate(i, s);
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param {OMapExtentType} extent1 范围1
   * @param {OMapExtentType} extent2 范围2
   * @return 判断结果
   */
  static containsExtent(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return w.containsExtent(i, s);
  }
  static containsXY(e, t, i) {
    if (!n(e) || !n(t) || !n(i)) return;
    let s = E(e);
    if (n(s))
      return w.containsXY(s, t, i);
  }
  static createEmpty() {
    return new v(...w.createEmpty());
  }
  static equals(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return w.equals(i, s);
  }
  static extend(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return new v(...w.extend(i, s));
  }
  static getArea(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return w.getArea(t);
  }
  /**
   * 确定一个范围是否与另一个范围相交
   * @param {OMapExtentType} extent1 
   * @param {OMapExtentType}extent2 
   * @returns {boolean} 判断结果
   */
  static intersects(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return w.intersects(i, s);
  }
  static isEmpty(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return w.isEmpty(t);
  }
}
function fi(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new O.Fill({
      ...r,
      color: e instanceof N ? e.getColor() : e
    });
}
function hi(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new O.Stroke({
      ...r,
      color: e instanceof N ? e.getColor() : e
    });
}
function gi(r) {
  if (!n(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new O.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return n(e) && i.setFill(new O.Fill({
    color: e.color instanceof N ? e.color.getColor() : e.color
  })), n(t) && i.setStroke(new O.Stroke({
    color: t.color instanceof N ? t.color.getColor() : t.color
  })), i;
}
function _i(r) {
  return n(r) ? new O.Icon({
    ...r,
    color: r.color ? r.color instanceof N ? r.color.getColor() : r.color : void 0,
    offset: n(r.offset) ? r.offset.getPixel() : [0, 0],
    size: n(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function pi(r) {
  if (!n(r))
    return;
  let e = new O.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return n(t) && e.setFill(new O.Fill({
    color: t.color instanceof N ? t.color.getColor() : t.color
  })), n(i) && e.setStroke(new O.Stroke({
    color: i.color instanceof N ? i.color.getColor() : i.color
  })), e;
}
const Vt = (r, e) => {
  if (n(r)) {
    if (r.getType() === "Point")
      return new ee({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (r.getType() === "LineString")
      return new ee({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (r.getType() === "Polygon" || r.getType() === "Circle")
      return new ee({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new N({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
class ee {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: s, circle: o, icon: a, regularShape: h } = e;
    let f;
    o ? f = gi(o) : a ? f = _i(a) : h && (f = pi(h)), this._style = new O.Style({
      fill: fi(t),
      stroke: hi(i),
      image: f
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const yi = "Event", ct = p(yi);
class me {
  constructor(e) {
    c(this, "events", /* @__PURE__ */ new Map());
    c(this, "target", null);
    c(this, "total", 0);
    this.events.clear(), this.target = e;
  }
  on(e, t) {
    let i = this.events.get(e) || [], s = ++this.total;
    return i.push({
      id: s,
      target: this.target,
      type: e,
      callback: t
    }), this.events.set(e, i), s;
  }
  once(e, t) {
    const i = this.events.get(e) || [], s = ++this.total;
    return i.push({
      id: s,
      target: this.target,
      type: e,
      callback: t,
      once: !0
    }), this.events.set(e, i), s;
  }
  emit(e, ...t) {
    const i = this.events.get(e);
    if (!i || i.length === 0) return this;
    for (let s = 0; s < i.length; ) {
      const o = i[s];
      try {
        o.callback.call(o.target, ...t);
      } catch (a) {
        d(ct("emit", `回调异常: ${String(a)}`));
      }
      o.once ? i.splice(s, 1) : s++;
    }
    return i.length === 0 && this.events.delete(e), this;
  }
  remove(e) {
    for (const [t, i] of this.events.entries()) {
      const s = i.findIndex((o) => o.id === e);
      if (s !== -1)
        return i.splice(s, 1), i.length === 0 && this.events.delete(t), this;
    }
    return l(ct("remove", `未找到 id=${e} 的监听`)), this;
  }
  off(e) {
    return e === void 0 ? this.events.clear() : this.events.delete(e), this;
  }
  getEventById(e) {
    for (const t of this.events.values()) {
      const i = t.find((s) => s.id === e);
      if (i) return i;
    }
  }
  get(e) {
    return this.events.get(e) || [];
  }
  listenerCount(e) {
    var t;
    return ((t = this.events.get(e)) == null ? void 0 : t.length) || 0;
  }
}
function mi(r) {
  return g(r) && r > 0;
}
const Ot = {
  bottomLeft: "bottom-left",
  bottomCenter: "bottom-center",
  bottomRight: "bottom-right",
  centerLeft: "center-left",
  centerCenter: "center-center",
  centerRight: "center-right",
  topLeft: "top-left",
  topCenter: "top-center",
  topRight: "top-right"
};
function vi(r) {
  return Object.values(Ot).includes(r);
}
const Ei = {
  offset: new Z(0, 0),
  positioning: Ot.bottomCenter,
  stopEvent: !0,
  insertFirst: !0,
  autoPan: !1,
  className: "omap-popup-element"
};
function Ii(r) {
  return ["change:position", "change:positioning", "change:element", "change:offset"].includes(r);
}
function dt(r) {
  let e = document.createElement("div");
  return e.className = "omap-popup-default-element", e.innerHTML = r, e;
}
function Ve(r, e, t) {
  const { oldValue: i, key: s, newValue: o } = t;
  let a = {
    target: r,
    type: e,
    key: s
  };
  switch (e) {
    case "change:position":
      a.oldValue = new u(i[0], i[1]), a.newValue = r.getPosition();
      break;
    case "change:positioning":
      a.oldValue = i, a.newValue = r.getPositioning();
      break;
    case "change:element":
      a.oldValue = i, a.newValue = r.getElement();
      break;
    case "change:offset":
      a.oldValue = new Z(i[0], i[1]), a.newValue = r.getOffset();
      break;
    case "change:properties":
    case "change:content":
      a.oldValue = i, a.newValue = o;
      break;
  }
  return a;
}
const Fi = "Popup", se = p(Fi);
class Zt {
  constructor(e) {
    c(this, "_popup");
    /**
     * Popup 的唯一ID
     */
    c(this, "id", null);
    /**
     * 弹窗内容(不一定有)
     */
    c(this, "content", "");
    /**
     * 弹窗属性
     */
    c(this, "properties", {});
    /**
     * 事件对象
     */
    c(this, "events", new me());
    var i;
    n(e.id) && (this.id = e.id);
    let t = Object.assign({}, Ei, e);
    delete t.id, n(t.content) && M(t.content) && !n(t.element) && (this.content = t.content, t.element = dt(t.content)), this._popup = new Jt({
      ...t,
      offset: (i = t.offset) == null ? void 0 : i.toArray(),
      position: n(t.position) ? t.position instanceof u ? t.position.toArray() : t.position : void 0
    }), this.events = new me(this);
  }
  _isInitialized(e) {
    return n(this._popup) ? !0 : (l(se(e, "未正确实例化")), !1);
  }
  /**
   * 获取弹窗位置
   * @returns {Lnglat | undefined} 弹窗位置
   */
  getPosition() {
    if (!this._isInitialized("getPosition")) return;
    let e = this._popup.getPosition();
    return n(e) ? new u(e[0], e[1]) : void 0;
  }
  /**
   * 设置弹窗位置
   * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
   */
  setPosition(e) {
    if (!this._isInitialized("setPosition")) return;
    let t = e instanceof u ? e.toArray() : e;
    this._popup.setPosition(t);
  }
  getPositioning() {
    if (this._isInitialized("getPositioning"))
      return this._popup.getPositioning();
  }
  setPositioning(e) {
    if (this._isInitialized("setPositioning")) {
      if (!vi(e)) {
        l(se("setPositioning", "参数positioning值有误"));
        return;
      }
      this._popup.setPositioning(e);
    }
  }
  /**
   * 获取弹窗属性
   * @returns {Record<string, any> | undefined} 弹窗属性
   */
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this.properties;
  }
  /**
   * 设置弹窗属性
   * @param {Record<string, any>} properties 弹窗属性
   */
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!n(e)) {
        l(se("setProperties", "参数不能为空"));
        return;
      }
      this.events.emit("change:properties", Ve(this, "change:properties", {
        oldValue: this.getProperties(),
        key: "properties",
        newValue: Object.assign({}, this.properties, e)
      })), this.properties = Object.assign({}, this.properties, e);
    }
  }
  getElement() {
    if (this._isInitialized("getElement"))
      return this._popup.getElement();
  }
  setElement(e) {
    if (this._isInitialized("getElement"))
      return this._popup.setElement(e);
  }
  getContent() {
    return this._isInitialized("getContent") ? this.content : "";
  }
  setContent(e) {
    this._isInitialized("setContent") && (this.events.emit("change:content", Ve(this, "change:content", {
      oldValue: this.getContent(),
      key: "content",
      newValue: e
    })), this.content = e, this.setElement(dt(e)));
  }
  getOffset() {
    if (!this._isInitialized("getOffset")) return;
    let e = this._popup.getOffset();
    return new Z(e[0], e[1]);
  }
  setOffset(e) {
    if (!this._isInitialized("setOffset")) return;
    let t = e instanceof Z ? e.toArray() : e;
    this._popup.setOffset(t);
  }
  getId() {
    if (this._isInitialized("getId"))
      return this.id;
  }
  setId(e) {
    this.id = e;
  }
  getPopup() {
    return this._popup;
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      l(se("on", "参数不能为空"));
      return;
    }
    if (Ii(e)) {
      let s = this.events.get(e);
      (!n(s) || s.length === 0) && this._popup.on(e, (o) => {
        console.log(o), this.events.emit(e, Ve(this, e, o));
      });
    }
    return this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        l(se("un", "参数不能为空"));
        return;
      }
      if (!mi(e)) {
        l(se("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once() {
  }
}
let Ne = "BaseLayer", C = p(Ne);
const ft = 1, ht = !0, gt = 0, _t = 22, pt = 0, yt = 1 / 0, mt = 1, vt = {};
class K {
  constructor(e, t) {
    /**
     * 图层类型
     */
    c(this, "type", null);
    /**
     * 图层实例（ol）
     */
    c(this, "_layer");
    // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    c(this, "id", null);
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    c(this, "name", "");
    c(this, "className", "");
    // 图层样式类名，用于自定义图层样式，默认无
    c(this, "opacity", ft);
    // 图层透明度，默认1
    c(this, "visible", ht);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", gt);
    // 最小缩放级别，默认0
    c(this, "maxZoom", _t);
    // 最大缩放级别，默认22
    c(this, "minResolution", pt);
    // 最小分辨率，默认0r
    c(this, "maxResolution", yt);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", mt);
    // 图层层级，默认0
    c(this, "properties", vt);
    // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的地图对象
     */
    c(this, "map", null);
    /**
     * 图层所属的对象
     */
    c(this, "target", null);
    let i = y(t, {});
    this.type = e, Ne = `${e}Layer`, C = p(Ne), this.id = y(i.id, null), this.name = y(i.name, ""), this.className = y(i.className, ""), this.opacity = y(i.opacity, ft), this.visible = y(i.visible, ht), this.extent = y(i.extent, null), this.minZoom = y(i.minZoom, gt), this.maxZoom = y(i.maxZoom, _t), this.minResolution = y(i.minResolution, pt), this.maxResolution = y(i.maxResolution, yt), this.zIndex = y(i.zIndex, mt), this.properties = y(i.properties, vt), this.map = y(i.map, null);
  }
  _isInitialized(e) {
    return n(this._layer) ? !0 : (l(C(e, "未正确实例化")), !1);
  }
  _initLayerEvent() {
    this._isInitialized("_initLayerEvent") && this._layer.on([
      "propertychange"
    ], (e) => {
      e.key === "opacity" ? this.opacity = this.getOpacity() : e.key === "visible" ? this.visible = this.getVisible() : e.key === "extent" ? this.extent = this.getExtent() : e.key === "minZoom" ? this.minZoom = this.getMinZoom() : e.key === "maxZoom" ? this.maxZoom = this.getMaxZoom() : e.key === "minResolution" ? this.minResolution = this.getMinResolution() : e.key === "maxResolution" ? this.maxResolution = this.getMaxResolution() : e.key === "zIndex" && (this.zIndex = this.getZIndex());
    });
  }
  getId() {
    if (this._isInitialized("getId"))
      return this.id;
  }
  setId(e) {
    this._isInitialized("setId") && (this.id = e);
  }
  /**
   * 获取图层数据源
   */
  getSource() {
    if (this._isInitialized("getSource"))
      return this._layer.getSource();
  }
  /**
   * 设置图层透明度
   * @param {number} opacity 透明度，0~1
   */
  setOpacity(e) {
    if (this._isInitialized("setOpacity")) {
      if (!n(e)) {
        l(C("setOpacity", "透明度不能为空"));
        return;
      }
      if (!Se(e)) {
        l(C("setOpacity", "透明度必须为0~1的数字"));
        return;
      }
      this._layer.setOpacity(e);
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
  setVisible(e) {
    if (this._isInitialized("setVisible")) {
      if (!n(e)) {
        l(C("setVisible", "可见性不能为空"));
        return;
      }
      if (Bt(e)) {
        l(C("setVisible", "可见性必须为boolean类型"));
        return;
      }
      this._layer.setVisible(e);
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
  /**
   * 获取图层的范围
   */
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._layer.getExtent();
    if (e)
      return new v(e[0], e[1], e[2], e[3]);
  }
  /**
   * 设置图层的范围
   */
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof v ? e.getExtent() : e;
    this._layer.setExtent(t);
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!n(e)) {
        l(C("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(C("setMinZoom", "minZoom必须为number类型"));
        return;
      }
      this._layer.setMinZoom(e);
    }
  }
  getMinZoom() {
    if (this._isInitialized("getMinZoom"))
      return this._layer.getMinZoom();
  }
  setMaxZoom(e) {
    if (this._isInitialized("setMaxZoom")) {
      if (!n(e)) {
        l(C("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(C("setMaxZoom", "maxZoom必须为number类型"));
        return;
      }
      this._layer.setMaxZoom(e);
    }
  }
  getMaxZoom() {
    if (this._isInitialized("getMaxZoom"))
      return this._layer.getMaxZoom();
  }
  setMinResolution(e) {
    if (this._isInitialized("setMinResolution")) {
      if (!n(e)) {
        l(C("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(C("setMinResolution", "minResolution必须为number类型"));
        return;
      }
      this._layer.setMinResolution(e);
    }
  }
  getMinResolution() {
    if (this._isInitialized("getMinResolution"))
      return this._layer.getMinResolution();
  }
  setMaxResolution(e) {
    if (this._isInitialized("setMaxResolution")) {
      if (!n(e)) {
        l(C("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(C("setMaxResolution", "maxResolution必须为number类型"));
        return;
      }
      this._layer.setMaxResolution(e);
    }
  }
  getMaxResolution() {
    if (this._isInitialized("getMaxResolution"))
      return this._layer.getMaxResolution();
  }
  setZIndex(e) {
    if (this._isInitialized("setZIndex")) {
      if (!n(e)) {
        l(C("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!g(e)) {
        l(C("setZIndex", "zIndex必须为number类型"));
        return;
      }
      this._layer.setZIndex(e);
    }
  }
  getZIndex() {
    if (this._isInitialized("getZIndex"))
      return this._layer.getZIndex();
  }
  setProperties(e) {
    if (!this._isInitialized("setProperties")) return;
    if (!n(e)) {
      l(C("setProperties", "属性不能为空"));
      return;
    }
    if (ve(e)) {
      l(C("setProperties", "属性必须为object类型"));
      return;
    }
    let t = this.getProperties() || {}, i = Object.assign({}, t, e);
    this._layer.setProperties(i), this.properties = i;
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._layer.getProperties();
  }
  /**
   * 设置图层当前的对象
   * @param {Map | Draw | Modify | Measure} target 图层所属的对象
   */
  setTarget(e) {
    this.target = e;
  }
  getTarget() {
    if (n(this.target))
      return this.target;
  }
}
const xi = "Interaction", zi = p(xi);
class R {
  constructor(e) {
    /**
     * 交互类型
     * @type {OMapInteractionType | null}
     */
    c(this, "type", null);
    /**
     * 交互实例
     * @type {OlInteractionInstanceType}
     */
    c(this, "_interaction");
    /**
     * 交互所需要的图层
     * @type {VectorLayer} layer
     */
    c(this, "layer", null);
    /**
     * 交互属性
     * @type {Record<string, any>} 
     */
    c(this, "properties", {});
    /**
     * 交互是否激活
     * @param type 
     */
    c(this, "active", !1);
    /**
     * 交互事件
     * @type {Event}
     */
    c(this, "events", new me());
    c(this, "map", null);
    this.type = e;
  }
  initInteractionEvent() {
    this._isInitialized("initInteractionEvent") && this._interaction.on("change:active", (e) => {
      e.type === "change:active" && (this.active = this.getActive());
    });
  }
  _isInitialized(e) {
    return n(this._interaction) ? !0 : (l(zi(e, "未正确实例化")), !1);
  }
  /**
   * 返回当前交互是否处于激活状态
   * @returns 激活状态
   */
  getActive() {
    if (this._isInitialized("getActive"))
      return this._interaction.getActive();
  }
  /**
   * 设置当前交互是否处于激活状态
   * @param active 激活状态
   */
  setActive(e) {
    this._isInitialized("setActive") && this._interaction.setActive(e);
  }
  /**
   * 获取交互实例
   * @returns 
   */
  getInteraction() {
    if (this._isInitialized("getInteraction"))
      return this._interaction;
  }
  /**
   * 获取交互属性
   * @returns {Record<string, any>} 交互属性
   */
  getProperties() {
    return this.properties;
  }
  /**
   * 设置交互属性
   * @param properties 交互属性
   */
  setProperties(e) {
    this._isInitialized("getInteraction") && (this._interaction.setProperties(e), this.properties = e);
  }
  /**
   * 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。
   * @returns {number | undefined} 指针数
   */
  getPointerCount() {
    if (this._isInitialized("getInteraction"))
      return this._interaction.getPointerCount();
  }
  getLayer() {
    if (this._isInitialized("getInteraction"))
      return this.layer;
  }
  setMap(e) {
    this.map = e;
  }
}
const Ai = "BasicFeature", Fe = p(Ai);
class ue {
  constructor(e, t, i) {
    c(this, "id");
    c(this, "type");
    c(this, "_feature");
    c(this, "_geometry");
    this.type = e, t instanceof L ? this._initByFeature(t) : this._init(t, i);
  }
  getFeature() {
    if (this._isInitialized("getFeature"))
      return this._feature;
  }
  getGeometry() {
    return this._geometry;
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._feature.getProperties();
  }
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!n(e)) {
        l(Fe("setProperties", "参数不能为空"));
        return;
      }
      if (!ve(e)) {
        l(Fe("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!n(e)) {
        l(Fe("setId", "参数id不能为空"));
        return;
      }
      if (!g(e) && !M(e)) {
        l(Fe("setId", "参数id格式有误"));
        return;
      }
      this.id = e;
    }
  }
  getId() {
    if (this._isInitialized("getId"))
      return this.id;
  }
  getType() {
    return this.type;
  }
}
const wi = "Point", X = p(wi);
class ye extends ue {
  constructor(e, t) {
    if (!n(e)) {
      d(X("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("Point", e);
    else {
      if (!(e instanceof u) && !S(e)) {
        d(X("constructor", "坐标格式有误"));
        return;
      }
      super("Point", e);
    }
    n(t) && ve(t) && this.setProperties(t);
  }
  _init(e, t) {
    let i = P(e);
    i && (this._geometry = new F.Point(i), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(X(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取点的坐标
   * @returns {Lnglat} 点的坐标
   */
  getCoordinates() {
    let e = this._geometry.getCoordinates();
    return new u(e[0], e[1]);
  }
  /**
   * 设置点的坐标
   * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!n(e)) {
      d(X("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !S(e)) {
      d(X("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof u ? e.toArray() : e;
    this._geometry.setCoordinates(t);
  }
  /**
   * 获取点的第一个坐标
   * @returns {Lnglat} 点的第一个坐标
   */
  getFirstCoordinate() {
    return this.getCoordinates();
  }
  /**
   * 获取点的最后一个坐标
   * @returns {Lnglat} 点的最后一个坐标
   */
  getLastCoordinate() {
    return this.getCoordinates();
  }
  intersectsCoordinate() {
  }
  /**
   * 点是否在extent范围内
   * @param {Extent | OlExtentType} extent 
   * @returns {boolean | undefined}
   */
  intersectsExtent(e) {
    if (!n(e)) {
      d(X("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !Re(e)) {
      d(X("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof v ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Et(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !(i instanceof u) && !S(i)) && (e = !1), e;
}
const Ci = "Point", G = p(Ci);
class Qe extends ue {
  constructor(e, t) {
    if (!n(e)) {
      d(G("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("LineString", e);
    else {
      if (!Et(e)) {
        d(G("constructor", "坐标格式有误"));
        return;
      }
      super("LineString", e), t && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => P(s));
    i && (this._geometry = new F.LineString(i), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(G(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取线的坐标
   * @returns {Lnglat[]} 线的坐标
   */
  getCoordinates() {
    return this._geometry.getCoordinates().map((t) => new u(t[0], t[1]));
  }
  /**
   * 设置线的坐标
   * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!n(e)) {
      d(G("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Et(e)) {
      d(G("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  /**
   * 追加坐标
   * @param {Lnglat | OlCoordinateType} coordinates 坐标
   * @returns 
   */
  appendCoordinate(e) {
    if (!n(e)) {
      d(G("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !S(e)) {
      d(G("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof u ? e.toArray() : e;
    this._geometry.appendCoordinate(t);
  }
  /**
   * 获取线的第一个坐标
   * @returns {Lnglat} 线的第一个坐标
   */
  getFirstCoordinate() {
    let e = this._geometry.getFirstCoordinate();
    return new u(e[0], e[1]);
  }
  /**
   * 获取线的最后一个坐标
   * @returns {Lnglat} 线的最后一个坐标
   */
  getLastCoordinate() {
    let e = this._geometry.getLastCoordinate();
    return new u(e[0], e[1]);
  }
  /**
   * 获取线的范围
   * @returns {Extent} 线的范围
   */
  getExtent() {
    let e = this._geometry.getExtent();
    return new v(e[0], e[1], e[2], e[3]);
  }
  getLength() {
    return this._geometry.getLength();
  }
  /**
   * 获取线段指定位置的坐标点
   * @param {number} fraction 比例
   * @param dest 目标坐标点
   * @returns {Lnglat} 线的坐标点
   */
  getCoordinateAt(e, t) {
    if (!n(e)) {
      d(G("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(g(e) && e >= 0 && e <= 1)) {
      d(G("getCoordinateAt", "参数格式有误"));
      return;
    }
    let i = [], s = this._geometry.getCoordinateAt(e, i);
    return n(t) && (t instanceof u ? (t.setLng(i[0]), t.setLat(i[1])) : (t[0] = i[0], t[1] = i[1])), new u(s[0], s[1]);
  }
  getCoordinateAtM() {
    return null;
  }
  translate(e = 0, t = 0) {
    this._geometry.translate(e, t);
  }
  transform() {
  }
  simplify(e = 0) {
    this._geometry.simplify(e);
  }
  intersectsCoordinate() {
  }
  /**
   * 线是否在extent范围内
   * @param {Extent | OlExtentType} extent 
   * @returns {boolean | undefined}
   */
  intersectsExtent(e) {
    if (!n(e)) {
      d(G("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !Re(e)) {
      d(G("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof v ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function It(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !z(i)) && (e = !1), r.forEach((i) => {
    i.forEach((s) => {
      !(s instanceof u) && !S(s) && (e = !1);
    });
  }), e;
}
function Ke(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !(i instanceof u) && !S(i)) && (e = !1), e;
}
const Pi = "LinearRing", ge = p(Pi);
class Oe extends ue {
  constructor(e, t) {
    if (!n(e)) {
      d(ge("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("LinearRing", e);
    else {
      if (!Ke(e)) {
        d(ge("constructor", "坐标格式有误"));
        return;
      }
      super("LinearRing", e), t && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => P(s));
    i && (this._geometry = new F.LinearRing(i), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(ge(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取LinearRing的坐标
   * @returns {Array<Lnglat>} LinearRing的坐标
   */
  getCoordinates() {
    return this._geometry.getCoordinates().map((i) => new u(i[0], i[1]));
  }
  /**
   * 设置LinearRing的坐标
   * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
   */
  setCoordinates(e) {
    if (!n(e)) {
      d(ge("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Ke(e)) {
      d(ge("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const Li = "Point", T = p(Li);
class Ut extends ue {
  constructor(e, t) {
    if (!n(e)) {
      d(T("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("Polygon", e);
    else {
      if (!It(e)) {
        d(T("constructor", "坐标格式有误"));
        return;
      }
      super("Polygon", e), t && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => s.map((o) => P(o)));
    i && (this._geometry = new F.Polygon(i), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(T(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取多边形的坐标
   * @param {boolean | undefined} rightHanded 是否右手坐标系
   * @returns {Array<Array<Lnglat>>} 多边形的坐标
   */
  getCoordinates(e = void 0) {
    return this._geometry.getCoordinates(e).map((s) => s.map((o) => new u(o[0], o[1])));
  }
  /**
   * 设置多边形的坐标
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(e) {
    if (!n(e)) {
      d(T("setCoordinates", "参数不能为空"));
      return;
    }
    if (!It(e)) {
      d(T("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i.map((s) => s instanceof u ? s.toArray() : s));
    this._geometry.setCoordinates(t);
  }
  /**
   * 向Polygon中添加LinearRing（内环）
   * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
   */
  appendLinearRing(e) {
    if (!n(e)) {
      d(T("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof Oe) && !Ke(e)) {
      d(T("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof Oe)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof u ? i.toArray() : i);
      this._geometry.appendLinearRing(new Oe(t)._geometry);
    }
  }
  /**
   * 获取多边形的第一个坐标（包含内环）
   * @returns {Lnglat} 多边形的第一个坐标
   */
  getFirstCoordinate() {
    let e = this._geometry.getFirstCoordinate();
    return new u(e[0], e[1]);
  }
  /**
   * 获取多边形的最后一个坐标（包含内环）
   * @returns {Lnglat} 多边形的最后一个坐标
   */
  getLastCoordinate() {
    let e = this._geometry.getLastCoordinate();
    return new u(e[0], e[1]);
  }
  /**
   * 获取多边形的范围
   * @returns {Extent} 多边形的范围
   */
  getExtent() {
    let e = this._geometry.getExtent();
    return new v(e[0], e[1], e[2], e[3]);
  }
  /**
   * 返回投影平面上多边形的面积
   * @returns {number} 投影平面上多边形的面积
   */
  getArea() {
    return this._geometry.getArea();
  }
  /**
   * 将几何图形中距离传递点最近的点作为坐标返回
   * @param {Lnglat | OlCoordinateType} point 传递点
   * @param {*} closestPoint 最近点
   * @returns {Lnglat} 最近点
   */
  getClosestPoint(e, t) {
    let i = e instanceof u ? e.toArray() : e, s = this._geometry.getClosestPoint(i);
    return new u(s[0], s[1]);
  }
  /**
   * 返回多边形的内点
   * @returns {Point} 多边形的内点
   */
  getInteriorPoint() {
    let e = this._geometry.getInteriorPoint().getCoordinates();
    return new ye(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!n(e)) {
      d(T("intersectsCoordinate", "参数coordinates不能为空"));
      return;
    }
    let t = e instanceof u ? e.toArray() : e;
    return this._geometry.intersectsCoordinate(t);
  }
  /**
   * 线是否在extent范围内
   * @param {Extent | OlExtentType} extent 
   * @returns {boolean | undefined}
   */
  intersectsExtent(e) {
    if (!n(e)) {
      d(T("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !Re(e)) {
      d(T("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof v ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
  simplify(e = 0) {
    this._geometry.simplify(e);
  }
  transform() {
  }
  translate(e = 0, t = 0) {
    this._geometry.translate(e, t);
  }
}
const Si = "Circle", _e = p(Si);
class Mi extends ue {
  constructor(e, t, i) {
    if (!n(e)) {
      d(_e("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("Circle", e);
    else {
      if (!(e instanceof u) && !S(e)) {
        d(_e("constructor", "坐标格式有误"));
        return;
      }
      if (!n(t)) {
        d(_e("constructor", "radius参数不能为空"));
        return;
      }
      if (!g(t)) {
        d(_e("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
  _init(e, t) {
    let i = P(e);
    i && (this._geometry = new F.Circle(i, t), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(_e(e, "未正确实例化")), !1) : !0;
  }
}
const xe = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function jt(r) {
  let e = null, t = r.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case xe.Point:
      e = new ye(r);
      break;
    case xe.LineString:
      e = new Qe(r);
      break;
    case xe.Polygon:
      e = new Ut(r);
      break;
    case xe.Circle:
      e = new Mi(r);
      break;
  }
  return e;
}
const j = {
  Distance: "Distance",
  Area: "Area"
}, bi = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, ze = {
  measureStart: "measure:start",
  measureEnd: "measure:end"
}, Ye = {
  /** 点 */
  Point: "Point",
  /** 线 */
  LineString: "LineString",
  /** 面 */
  Polygon: "Polygon",
  /** 矩形 */
  Rectangle: "Rectangle",
  /** 圆 */
  Circle: "Circle"
}, ki = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, et = "omap-measure-marker", He = "omap-measure-marker-index";
function Gi(r) {
  let e = "Point", t = null;
  switch (r) {
    case j.Distance:
      e = Ye.LineString;
      break;
    case j.Area:
      e = Ye.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
let B = null, V = null, le = null, tt = null, ae = null, te = [], U = [];
function Di(r, e, t) {
  r === j.Distance ? le = e : r === j.Area && (tt = e), ae = t;
}
function Nt(r) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = r, e;
}
function Ri(r, e) {
  if (B)
    if (B.children[0].innerHTML = be("总长", r), !e || e === "")
      B.children.length > 1 && B.removeChild(B.children[1]);
    else if (B.children.length > 1)
      B.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, B.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = be("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    B = t;
  }
  return B;
}
function Ft(r, e) {
  if (V)
    if (V.children[0].innerHTML = be("面积", r), !e || e === "")
      V.children.length > 1 && V.removeChild(V.children[1]);
    else if (V.children.length > 1)
      V.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, V.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = be("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    V = t;
  }
  return V;
}
function $i(r) {
  let e = document.createElement("span");
  return e.title = "删除", e.innerHTML = "×", e.style.color = "#FFFFFF", e.style.cursor = "pointer", e.addEventListener("click", (t) => {
    n(r) && r();
  }), e;
}
function xt(r) {
  let e = new Zt(r);
  return U.push(e), e;
}
function zt(r, e) {
  let t = document.createElement("div");
  t.className = `${et}-${e}`, t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(255, 255, 255, 0.8)", t.style.color = "#000000", t.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  let i = document.createElement("span");
  if (i.style.color = "var(--omap-primary-color)", i.style.margin = "0 5px", i.innerHTML = r, t.appendChild(i), e !== 0) {
    let s = document.createElement("span");
    s.title = "删除", s.innerHTML = "×", s.style.color = "#000000", s.style.cursor = "pointer", t.setAttribute(He, e.toString()), s.addEventListener("click", (o) => {
      console.log("点击删除");
      let a = t.getAttribute(He);
      console.log(a), n(a) && Ti(Number(a));
    }), t.appendChild(s);
  }
  return te.push(t), t;
}
function Ti(r) {
  if (U.length === 2)
    return wt(), te = [], U.forEach((e, t) => {
      At(t), t === U.length - 1 && (U = []);
    }), !1;
  wt(r), te.splice(r, 1), te.forEach((e, t) => {
    e.className = `${et}-${t}`, e.setAttribute(He, t.toString());
  }), At(r), U.splice(r, 1), U.forEach((e, t) => {
    e.id = Xe(t);
  }), Bi();
}
function At(r) {
  if (n(ae)) {
    let e = ae.getPopupById(`omap-measure-marker-${r}`);
    n(e) && ae.removePopup(e);
  }
}
function wt(r) {
  let e = le || tt;
  if (n(e)) {
    let t = e.getGeometry();
    if (n(t))
      if (n(r)) {
        let i = [];
        (t instanceof F.LineString || t instanceof F.Polygon) && (i = t.getCoordinates()), i.splice(r, 1), (t instanceof F.LineString || t instanceof F.Polygon) && t.setCoordinates(i);
      } else
        t instanceof F.LineString ? t.setCoordinates([]) : t instanceof F.Polygon && t.setCoordinates([]);
  }
}
function Bi() {
  if (le) {
    let r = le.getGeometry().getCoordinates();
    te.forEach((e, t) => {
      if (t > 0) {
        let i = new Qe(r.slice(0, t + 1)), s = ae.getLength(i);
        e.children[0].innerHTML = n(s) ? We(s) : "-";
      }
    });
  }
}
function We(r) {
  return (r / 1e3).toFixed(2) + " km";
}
function Ct(r) {
  return (r / 1e6).toFixed(2) + " km²";
}
function Xe(r) {
  return `${et}-${r}`;
}
function be(r, e) {
  return `${r}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${e || "-"}</span>`;
}
function Vi() {
  te.forEach((r) => {
    r.remove();
  }), U.forEach((r) => {
    ae.removePopup(r);
  }), le = null, tt = null, setTimeout(() => {
    te = [], U = [];
  }, 200);
}
class Kt {
  constructor(e) {
    c(this, "popup");
    this.initPopup(e || "");
  }
  _isInitialized() {
    return !!n(this.popup);
  }
  initPopup(e) {
    let t = Nt(e);
    this.popup = new Zt({
      id: "omap-measure-popup",
      element: t,
      offset: new Z(0, -10)
    });
  }
  getPopup() {
    return this.popup;
  }
  updatePosition(e) {
    this._isInitialized() && this.popup.setPosition(e);
  }
  setElement(e) {
    this._isInitialized() && this.popup.setElement(e);
  }
  getElement() {
    if (this._isInitialized())
      return this.popup.getElement();
  }
}
const H = new Kt("单击地图开始测量"), oe = new Kt(""), Oi = "Measure", Pt = p(Oi);
let Lt = null, q = null;
class qe extends R {
  constructor(t, i) {
    if (!Object.values(j).includes(t)) {
      d(Pt("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    c(this, "mode", null);
    c(this, "result", {
      value: 0,
      unit: ""
    });
    let s = null;
    this.layer = new ke({
      style: Vt
    }), s = this.layer.getSource();
    let o = Object.assign({}, bi, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: s,
      features: void 0,
      style: void 0
    });
    this._interaction = new D.Draw({
      ...Gi(t),
      ...o
    }), this.mode = t, t === j.Distance ? this.result.unit = "km" : t === j.Area && (this.result.unit = "km²"), this.initInteractionEvent(), this.initMeasureEvent();
  }
  /**
   * 初始化 测量事件
   */
  initMeasureEvent() {
    this._isInitialized("initMeasureEvent") && (this._interaction.on("change:active", (t) => {
      this._interaction.getActive() ? this.onMeasureActive() : this.onMeasureInActive();
    }), this._interaction.on("drawstart", (t) => {
      this.events.emit(ze.measureStart, {
        target: this,
        type: ze.measureStart
      }), this.onMeasureStart(t.feature);
    }), this._interaction.on("drawend", (t) => {
      this.onMeasureEnd();
    }));
  }
  onMeasureActive() {
    n(this.map) && (q || (q = this.map._map.on("pointermove", (t) => {
      H.updatePosition(t.coordinate);
    }))), this.result.value = 0;
  }
  onMeasureInActive() {
    q && (st.unByKey(q), q = null);
  }
  /**
   * 测量开始
   * @param feature 测量开始的feature
   */
  onMeasureStart(t) {
    var i;
    if (n(t)) {
      Lt = t, Di(this.mode, t, this.map);
      let s = 0;
      (i = Lt.getGeometry()) == null || i.on("change", (o) => {
        var h, f;
        const { target: a } = o;
        if (n(a)) {
          let I = a instanceof F.LineString ? a.getCoordinates().length : a.getCoordinates()[0].length;
          if (s === 0 && (s = I, a instanceof F.LineString)) {
            let $ = zt("起点", 0), Y = xt({
              id: Xe(0),
              element: $,
              offset: new Z(0, -10)
            });
            Y.setPosition(a.getCoordinates()[0]), this.map.addPopup(Y);
          }
          let A;
          if (a instanceof F.LineString ? A = (h = this.map) == null ? void 0 : h.getLength(new Qe(new L({
            geometry: a
          }))) : a instanceof F.Polygon && (A = (f = this.map) == null ? void 0 : f.getArea(new Ut(new L({
            geometry: a
          })))), n(A) && g(A) && (this.result.value = A), n(A) && g(A) && a instanceof F.LineString) {
            let $ = I >= 2 ? Ri(We(A), A === 0 ? "" : "单击继续，双击结束测量") : Nt("单击地图开始测量");
            H.setElement($);
          }
          if (a instanceof F.LineString) {
            if (I > s) {
              let $ = I - 1 - 1, Y = zt(We(A), $), it = xt({
                id: Xe($),
                element: Y,
                offset: new Z(0, -10)
              });
              it.setPosition(a.getCoordinates()[a.getCoordinates().length - 1]), this.map.addPopup(it), s = I;
            }
          } else a instanceof F.Polygon && I >= 4 && (this.map.addPopup(oe.getPopup()), oe.setElement(Ft(Ct(A), "单击继续，双击结束测量")), oe.updatePosition(a.getInteriorPoint().getCoordinates()), H.setElement(void 0), H.updatePosition(void 0));
        } else
          l("target is undefined");
      });
    }
  }
  /**
   * 测量结束
   */
  onMeasureEnd() {
    if (this.setActive(!1), n(q) && st.unByKey(q), this.mode, j.Distance, this.mode === j.Area) {
      const t = Ft(Ct(this.result.value));
      t.style.display = "flex", t.style.alignItems = "center", t.appendChild($i(() => {
        var i;
        oe.updatePosition(void 0), oe.setElement(void 0), (i = this.layer) == null || i.clear();
      })), oe.setElement(t);
    }
    H.updatePosition(void 0), H.setElement(void 0), this.events.emit(ze.measureEnd, {
      target: this,
      type: ze.measureEnd
    });
  }
  /**
   * 取消绘制，并结束当前未完成的绘制
   */
  cancel() {
    this._isInitialized("cancel") && this._interaction.abortDrawing();
  }
  /**
   * 删除最后一个点
   */
  revoke() {
    this._isInitialized("revoke") && this._interaction.removeLastPoint();
  }
  /**
   * 结束当前未完成的绘制
   */
  finish() {
    this._isInitialized("finish") && this._interaction.finishDrawing();
  }
  setMap(t) {
    this.map = t, this.map.addPopup(H.getPopup()), this.onMeasureActive();
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      l(Pt("on", "参数不能为空"));
      return;
    }
    return this.events.on(t, i);
  }
  /**
   * 该移除的都移除掉
   */
  destroy() {
    H.updatePosition(void 0), this.setActive(!1), n(this.layer) && this.layer.clear(), Vi();
  }
}
let Zi = "VectorLayer", x = p(Zi);
class ke extends K {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = n(t.source) ? t.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((o) => o.getFeature()) : []
    };
    this._layer = new re.Vector({
      source: new ie.Vector(s)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (l(x(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (n(i) && (this.target instanceof Je || this.target instanceof qe)) {
        let s = jt(i);
        s ? this.features.push(s) : l(x("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
      }
    });
  }
  /**
   * 初始化样式
   * @param {OMapStyleLike | undefined} style 样式
   */
  initStyle(t) {
    if (!this._isInitializedLayer("initStyle")) return;
    let i;
    n(t) && (t instanceof ee ? i = t.getStyle() : z(t) && t.every((s) => s instanceof ee) ? i = t.map((s) => s.getStyle()) : Me(t) ? i = (s, o) => {
      let a = _.getUid(s), h = this.features.findIndex((I) => _.getUid(I.getFeature()) === a), f = t(h !== -1 ? this.features[h] : null, o);
      return f ? f.getStyle() : void 0;
    } : l(x("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!n(t)) {
      l(x("setId", "参数id不能为空"));
      return;
    }
    if (!g(t) && !M(t)) {
      l(x("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((s) => n(s.getId()) && s.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!n(t)) {
      l(x("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof v) && !Re(t)) {
      l(x("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let s = t instanceof v ? t.getExtent() : t, o = this._layer.getSource().getFeaturesInExtent(s), a = [];
    return o.forEach((h) => {
      let f = _.getUid(h), I = this.features.findIndex((A) => _.getUid(A.getFeature()) === f);
      I !== -1 && a.push(this.features[I]);
    }), a;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!n(t)) {
      l(x("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !S(t)) {
      l(x("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof u ? t._lnglat : t;
    const s = this._layer.getSource().getFeaturesAtCoordinate(i);
    let o = [];
    return s.forEach((a) => {
      let h = _.getUid(a), f = this.features.findIndex((I) => _.getUid(I.getFeature()) === h);
      f !== -1 && o.push(this.features[f]);
    }), o;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!n(t)) {
        l(x("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!n(t) || !z(t)) {
        l(x("addFeatures", "参数格式有误不能为空"));
        return;
      }
      ot(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!n(t)) {
        l(x("removeFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        let i = this.features.indexOf(t);
        this._layer.getSource().removeFeature(t.getFeature()), this.features.splice(i, 1);
      }
    }
  }
  removeFeatures(t) {
    if (this._isInitializedLayer("removeFeatures")) {
      if (!n(t) || !z(t)) {
        l(x("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      ot(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!n(t) || !Me(t)) {
        l(x("forEachFeature", "参数格式有误"));
        return;
      }
      this.features.forEach((i, s) => {
        t(i, s);
      });
    }
  }
  /**
   * 遍历指定范围的特征
   * @param {Extent} extent 范围
   * @param {Function} callback 回调函数
   * @returns {void}
   */
  forEachFeatureInExtent(t, i) {
    if (this._isInitializedLayer("forEachFeatureInExtent")) {
      if (!n(i)) {
        l(x("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (s) => {
        let o = _.getUid(s), a = this.features.findIndex((h) => _.getUid(h.getFeature()) === o);
        n(a) && a !== -1 && i(this.features[a], 0);
      });
    }
  }
  /**
   * 遍历与指定范围相交的特征
   * @param {Extent} extent 范围
   * @param {Function} callback 回调函数
   * @returns {void}
   */
  forEachFeatureIntersectingExtent(t, i) {
    if (this._isInitializedLayer("forEachFeatureIntersectingExtent")) {
      if (!n(i)) {
        l(x("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (s) => {
        let o = _.getUid(s), a = this.features.findIndex((h) => _.getUid(h.getFeature()) === o);
        n(a) && a !== -1 && i(this.features[a], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!n(t)) {
      l(x("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !S(t)) {
      l(x("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let s = t instanceof u ? t._lnglat : t, o = i ? (f) => {
      let I = _.getUid(f), A = this.features.findIndex(($) => _.getUid($.getFeature()) === I);
      return i(this.features[A]);
    } : void 0;
    const a = this._layer.getSource().getClosestFeatureToCoordinate(s, o);
    let h = this.features.findIndex((f) => _.getUid(f.getFeature()) === _.getUid(a));
    if (h !== -1)
      return this.features[h];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new v(t[0], t[1], t[2], t[3]);
  }
  // 样式管理
  /**
   * 获取样式
   * @returns {OMapStyleLike | undefined} style 样式
   */
  getStyle() {
    if (this._isInitializedLayer("getStyle"))
      return this.style;
  }
  /**
   * 设置图层样式
   * @param {OMapStyleLike} style 新样式
   */
  setStyle(t) {
    if (this._isInitializedLayer("setStyle")) {
      if (!n(t)) {
        l(x("setStyle", "style参数不能为空"));
        return;
      }
      this.initStyle(t);
    }
  }
  /**
   * 设置去重叠功能
   * @param declutter 
   * @returns 
   */
  setDeclutter(t) {
    this._isInitializedLayer("setDeclutter") && this._layer.setDeclutter(t);
  }
}
function Ui(r) {
  let e = "Point", t = null;
  switch (r) {
    case "Point":
    case "LineString":
    case "Polygon":
      e = r;
      break;
    case "Circle":
      e = "Circle";
      break;
    case "Rectangle":
      e = "Circle", t = Qt();
      break;
  }
  return { type: e, geometryFunction: t };
}
const ji = "Draw", Ae = p(ji);
class Je extends R {
  constructor(e, t) {
    if (!Object.values(Ye).includes(e)) {
      d(Ae("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof ke ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : l(Ae("init", "layer参数不属于VectorLayer类型"))), n(i) || (this.layer = new ke({
      style: Vt
    }), i = this.layer.getSource());
    let s = Object.assign({}, ki, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new D.Draw({
      ...Ui(e),
      ...s
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, s;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), n(t)) {
        let o = jt(t);
        o ? (this.layer.addFeature(o), console.log((s = this.layer) == null ? void 0 : s.getFeatures())) : l(Ae("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
      }
    });
  }
  /**
   * 追加坐标
   * @param coordinates 坐标
   */
  appendCoordinates(e) {
    if (!this._isInitialized("appendCoordinates")) return;
    if (!n(e)) {
      l(Ae("appendCoordinates", "coordinates参数不能为空"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._interaction.appendCoordinates(t);
  }
  /**
   * 取消绘制，并结束当前未完成的绘制
   */
  cancel() {
    this._isInitialized("cancel") && this._interaction.abortDrawing();
  }
  /**
   * 删除最后一个点
   */
  revoke() {
    this._isInitialized("revoke") && this._interaction.removeLastPoint();
  }
  /**
   * 结束当前未完成的绘制
   */
  finish() {
    this._isInitialized("finish") && this._interaction.finishDrawing();
  }
}
const Ni = {
  onFocusOnly: !1,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: !0,
  constrainResolution: !1
};
class Ki extends R {
  constructor(e) {
    super("MouseWheelZoom"), this._interaction = new D.MouseWheelZoom(Object.assign({}, Ni, e || {})), this.initInteractionEvent();
  }
}
const Yi = {
  duration: 250,
  delta: 1
};
class Hi extends R {
  constructor(e) {
    super("DoubleClickZoom"), this._interaction = new D.DoubleClickZoom(Object.assign({}, Yi, e || {})), this.initInteractionEvent();
  }
}
const Wi = {
  onFocusOnly: !1,
  kinetic: void 0
};
class Xi extends R {
  constructor(e) {
    super("DragPan"), this._interaction = new D.DragPan(Object.assign({}, Wi, e || {})), this.initInteractionEvent();
  }
}
const qi = [
  new Ki(),
  new Hi(),
  new Xi()
], Ji = [], Ze = {
  pixelRatio: oi(),
  layers: [],
  controls: [],
  interactions: qi,
  popups: Ji
};
function St(r) {
  return r.startsWith("map:");
}
function we(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new Z(...t.pixel)), t.coordinate && (i.coordinate = new u(...t.coordinate));
      break;
    case "map:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new u(...t.oldValue) : t.oldValue), t.key === "size" ? i.newValue = t.newValue || r.getSize() : i.newValue = t.newValue, i.key = t.key;
      break;
    case "view:change:resolution":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getResolution();
      break;
    case "view:change:center":
      t.oldValue && (i.oldValue = new u(...t.oldValue)), i.newValue = t.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getRotation();
      break;
    case "view:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new u(...t.oldValue) : t.oldValue), t.key === "center" ? i.newValue = t.newValue || r.getCenter() : t.key === "rotation" ? i.newValue = t.newValue || r.getRotation() : t.key === "resolution" ? i.newValue = t.newValue || r.getResolution() : i.newValue = t.newValue, i.key = t.key;
      break;
  }
  return i;
}
const Qi = "Map", m = p(Qi);
let Kr = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "layers", []);
    c(this, "interactions", []);
    c(this, "events", null);
    c(this, "popups", []);
    let i = t;
    const s = i.view;
    if (!n(s)) {
      d(m("constructor", "view参数不能为空"));
      return;
    }
    let o = s.projection || new Q("EPSG:3857");
    M(o) && (o = new Q(o));
    const a = {
      ...s,
      center: s.center instanceof u ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof v ? s.extent._extent : s.extent,
      projection: o._projection
    }, h = new rt.View(a);
    let f = y(i.interactions, Ze.interactions), I = y(i.popups, Ze.popups), A = Object.assign({}, Ze, {
      ...i,
      interactions: [],
      overlays: [],
      view: h
    });
    A.target = e;
    const $ = new rt.Map(A);
    this._view = h, this._map = $, n(f) && f.length > 0 && f.forEach((Y) => {
      this.addInteraction(Y);
    }), n(I) && I.length > 0 && I.forEach((Y) => {
      this.addPopup(Y);
    }), this.events = new me(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (l(m(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new k(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof k ? e._size : e;
    this._map.setSize(t);
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let e = this._view.getCenter();
    if (e)
      return new u(e[0], e[1]);
  }
  setCenter(e) {
    if (!this._isInitialized("setCenter")) return;
    if (!n(e)) {
      l(m("setCenter", "参数center不能为空"));
      return;
    }
    let t = e instanceof u ? e._lnglat : e;
    this._view.setCenter(t);
  }
  getZoom() {
    if (this._isInitialized("getZoom"))
      return this._view.getZoom();
  }
  setZoom(e) {
    if (this._isInitialized("setZoom")) {
      if (!n(e)) {
        l(m("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(m("setZoom", "参数zoom必须为number类型"));
        return;
      }
      this._view.setZoom(e);
    }
  }
  getResolution() {
    if (this._isInitialized("getResolution"))
      return this._view.getResolution();
  }
  setResolution(e) {
    if (this._isInitialized("setResolution")) {
      if (!n(e)) {
        l(m("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(m("setResolution", "参数resolution必须为number类型"));
        return;
      }
      this._view.setResolution(e);
    }
  }
  getRotation() {
    if (this._isInitialized("getRotation"))
      return this._view.getRotation();
  }
  setRotation(e) {
    if (this._isInitialized("setRotation")) {
      if (!n(e)) {
        l(m("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!g(e)) {
        l(m("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, s, o] = e;
    return new v(t, i, s, o);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !g(e)) {
        l(m("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !g(e)) {
        l(m("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!n(e)) {
      l(m("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof Ir)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (n(t) && this.getLayerById(t)) {
      l(m("addLayer", "图层已存在"));
      return;
    }
    n(e._layer) && (this.layers.push(e), e instanceof K && (n(e.getTarget()) || e.setTarget(this)), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!n(e)) {
      l(m("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof K && n(i.getId()) && i.getId() === e && (t = i);
    }), t;
  }
  removeLayer(e) {
    if (!this._isInitialized("removeLayer")) return;
    let t = this.layers.indexOf(e);
    t !== -1 && e._layer && (this.layers.splice(t, 1), this._map.removeLayer(e._layer));
  }
  removeLayers(e) {
    this._isInitialized("removeLayers") && this.layers.forEach((t, i) => {
      e.includes(t) && t._layer && (this.layers.splice(i, 1), this._map.removeLayer(t._layer));
    });
  }
  removeLayerById(e) {
    if (!this._isInitialized("removeLayerById")) return;
    if (!n(e)) {
      l(m("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!n(t))
      return l(m("removeLayerById", `找不到id为${e}(${M(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      l(m("on", "参数不能为空"));
      return;
    }
    let i = St(e);
    const s = i ? this._map : this._view;
    let o = this.events.get(e);
    return (!n(o) || o.length === 0) && (i ? s.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, we(this, e, h));
    }) : s.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, we(this, e, h));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        l(m("un", "参数不能为空"));
        return;
      }
      if (!g(e)) {
        l(m("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      l(m("on", "参数不能为空"));
      return;
    }
    let i = St(e);
    const s = i ? this._map : this._view;
    let o = this.events.get(e);
    return (!n(o) || o.length === 0) && (i ? s.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, we(this, e, h));
    }) : s.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, we(this, e, h));
    })), this.events.once(e, t);
  }
  // 属性管理
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._map.getProperties() || {};
  }
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!n(e)) {
        l(m("setProperties", "参数不能为空"));
        return;
      }
      this._map.setProperties(e);
    }
  }
  /** 交互管理 */
  /**
   * 添加交互
   */
  addInteraction(e) {
    var i;
    if (this.interactions.findIndex((s) => _.getUid(s._interaction) === _.getUid(e._interaction)) !== -1) {
      l(m("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof Je || e instanceof qe) {
      const s = e.getLayer();
      n(s) && (s.setTarget(e), this.addLayer(s));
    }
    n(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction), e.setMap && e.setMap(this), e.setActive(!0));
  }
  getInteractions() {
    if (this._isInitialized("setProperties"))
      return this.interactions;
  }
  removeInteraction(e) {
    var i;
    let t = this.interactions.findIndex((s) => _.getUid(s._interaction) === _.getUid(e._interaction));
    if (t === -1) {
      l(m("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (n(e._interaction)) {
      if (this.interactions.splice(t, 1), (i = this._map) == null || i.removeInteraction(e._interaction), e instanceof Je || e instanceof qe) {
        const s = e.getLayer();
        n(s) && this.removeLayer(s);
      }
      e.setMap && e.setMap(null);
    }
  }
  // 弹窗管理
  /**
   * 添加弹窗
   * @param popup 
   * @returns 
   */
  addPopup(e) {
    if (!this._isInitialized("addPopup")) return;
    if (this.popups.findIndex((i) => _.getUid(i._popup) === _.getUid(e._popup)) !== -1) {
      l(m("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    n(e._popup) && (this.popups.push(e), this._map.addOverlay(e._popup));
  }
  getPopupById(e) {
    return this.popups.find((i) => i.id === e);
  }
  getPopups() {
    if (this._isInitialized("getPopups"))
      return this.popups;
  }
  removePopup(e) {
    let t = this.popups.findIndex((i) => _.getUid(i._popup) === _.getUid(e._popup));
    t !== -1 && (this.popups.splice(t, 1), this._map.removeOverlay(e._popup));
  }
  // 几何图形计算
  getLength(e) {
    return this._isInitialized("getLength") ? nt.getLength(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  getArea(e) {
    return this._isInitialized("getArea") ? nt.getArea(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
};
const er = "Map", Mt = p(er);
class Q {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (M(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!n(i.code)) {
        d(Mt("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = je.get(t), !n(this._projection)) {
      l(Mt("constructor", "坐标系不存在"));
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
  getProjection() {
    return this._projection;
  }
}
function bt(r) {
  let e = r.some((t) => !(t instanceof u) && !S(t));
  return z(r) && !e;
}
const tr = "MultiPoint", J = p(tr);
class Hr extends ue {
  constructor(e, t) {
    if (!n(e)) {
      d(J("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof L)
      super("MultiPoint", e);
    else {
      if (!bt(e)) {
        d(J("constructor", "坐标格式有误"));
        return;
      }
      super("MultiPoint", e);
    }
    n(t) && ve(t) && this.setProperties(t);
  }
  _init(e, t) {
    let i = e.map((s) => P(s));
    i && (this._geometry = new F.MultiPoint(i), this._feature = new L({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (l(J(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取点的坐标
   * @returns {Lnglat[]} 点的坐标
   */
  getCoordinates() {
    return this._isInitialized("getCoordinates") ? this._geometry.getCoordinates().map((i) => new u(...i)) : void 0;
  }
  /**
   * 设置点的坐标
   * @param {OMapMultiPointGeometryCoordinatesType} coordinates 点的坐标
   */
  setCoordinates(e) {
    if (!this._isInitialized("setCoordinates")) return;
    if (!n(e)) {
      d(J("setCoordinates", "参数不能为空"));
      return;
    }
    if (!bt(e)) {
      d(J("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  appendPoint(e) {
    if (!this._isInitialized("appendPoint") || !n(e)) return;
    let t = null;
    if (e instanceof ye ? t = e.getGeometry() : e instanceof u ? t = new F.Point(e.toArray()) : S(e) && (t = new F.Point(e)), !n(t)) {
      d(J("appendPoint", "参数格式有误"));
      return;
    }
    this._geometry.appendPoint(t);
  }
  getClosestPoint(e) {
    if (!this._isInitialized("getClosestPoint") || !n(e)) return;
    let t = null;
    if (e instanceof ye ? t = e.getCoordinates().toArray() : e instanceof u ? t = e.toArray() : S(e) && (t = e), !n(t)) return;
    let i = this._geometry.getClosestPoint(t);
    return new u(...i);
  }
  getExtent() {
    if (this._isInitialized("getExtent"))
      return new v(...this._geometry.getExtent());
  }
  getFirstCoordinate() {
    if (this._isInitialized("getFirstCoordinate"))
      return new u(...this._geometry.getFirstCoordinate());
  }
  getLastCoordinate() {
    if (this._isInitialized("getLastCoordinate"))
      return new u(...this._geometry.getLastCoordinate());
  }
  getPoint(e) {
    if (!this._isInitialized("getPoint") || !n(e)) return;
    if (!g(e)) {
      l(J("getPoint", "参数index格式有误"));
      return;
    }
    let t = this._geometry.getPoint(e);
    return new ye(t.getCoordinates());
  }
  intersectsCoordinate(e) {
    if (!this._isInitialized("intersectsCoordinate") || !n(e)) return;
    let t = P(e);
    if (n(t))
      return this._geometry.intersectsCoordinate(t);
  }
  intersectsExtent(e) {
    if (!this._isInitialized("intersectsExtent") || !n(e)) return;
    let t = E(e);
    if (n(t))
      return this._geometry.intersectsExtent(t);
  }
}
function b(r) {
  if (n(r))
    return r instanceof k ? r.toArray() : r;
}
function Ee(r) {
  if (n(r))
    return r instanceof N ? r.getColor() : r;
}
const Wr = {
  Vec: "vec",
  Img: "img",
  Road: "road"
}, ir = {
  preload: 0,
  cacheSize: 512
}, rr = {
  attributionsCollapsible: !0,
  interpolate: !0,
  projection: "EPSG:3857",
  reprojectionErrorThreshold: 0.5,
  maxZoom: 42,
  minZoom: 0,
  tilePixelRatio: 1,
  tileSize: [256, 256],
  gutter: 0,
  wrapX: !0,
  transition: 250,
  zDirection: 0
}, nr = {
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
function kt(r) {
  return nr[r];
}
let sr = "GaodeLayer", or = p(sr);
class Xr extends K {
  constructor(t, i) {
    super("Gaode", y(i, {}));
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    if (!n(t)) {
      d(or("GaodeLayer", "type参数不能为空"));
      return;
    }
    let s = Object.assign({}, ir, {
      ...y(i, {}),
      source: void 0,
      map: void 0
    });
    this.gaodeType = t;
    let o = Object.assign({}, rr, {
      ...y(i == null ? void 0 : i.source, {})
    }), a;
    if (n(i) && n(i.source)) {
      let h;
      n(o.tileGrid) && (h = new De.TileGrid({
        ...o.tileGrid,
        extent: E(o.tileGrid.extent),
        origin: P(o.tileGrid.origin),
        origins: n(o.tileGrid.origins) ? o.tileGrid.origins.map((f) => f instanceof u ? P(f) : f) : void 0,
        sizes: n(o.tileGrid.sizes) ? o.tileGrid.sizes.map((f) => f instanceof k ? b(f) : f) : void 0,
        tileSize: n(o.tileGrid.tileSize) ? g(o.tileGrid.tileSize) ? o.tileGrid.tileSize : b(o.tileGrid.tileSize) : void 0,
        tileSizes: n(o.tileGrid.tileSizes) ? o.tileGrid.tileSizes.map((f) => f instanceof k ? b(f) : f) : void 0
      })), a = new ie.XYZ({
        ...o,
        urls: kt(this.gaodeType),
        tileGrid: h
      });
    } else
      a = new ie.XYZ({
        ...o,
        urls: kt(this.gaodeType)
      });
    this._layer = new re.Tile({
      ...s,
      extent: n(s.extent) ? E(s.extent) : void 0,
      background: n(s.background) ? Ee(s.background) : void 0,
      source: a
    }), this._initLayerEvent();
  }
}
const ar = "ProjUtil", Gt = p(ar);
class qr {
  static fromLonLat(e, t) {
    if (!n(e)) {
      l(Gt("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? M(t) ? new Q(t) : t : new Q("EPSG:3857"), o = je.fromLonLat(i, s._projection);
    return new u(o[0], o[1]);
  }
  static toLonLat(e, t) {
    if (!n(e)) {
      l(Gt("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? M(t) ? new Q(t) : t : new Q("EPSG:3857"), o = je.toLonLat(i, s._projection);
    return new u(o[0], o[1]);
  }
}
const Ue = "OMapToken", lr = {
  tdt: null
};
function ur(r, e) {
  window[Ue] || (window[Ue] = {}), window[Ue][r] = e;
}
const Yt = new Proxy(lr, {
  set: function(r, e, t, i) {
    return ur(e, t), Reflect.set(r, e, t, i);
  }
}), cr = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function dr(r, e) {
  return cr.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, Yt.tdt);
}
let fr = "TdtLayer", Dt = p(fr);
class Jr extends K {
  constructor(t, i) {
    var o, a, h;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!n(Yt.tdt)) {
      l(Dt("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(t)) {
      d(Dt("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    delete s.source, this.tdtType = t, this._layer = new re.Tile({
      ...s,
      extent: n(s.extent) ? (o = s.extent) == null ? void 0 : o._extent : void 0,
      map: n(s.map) ? (a = s.map) == null ? void 0 : a._map : void 0,
      background: n(s.background) ? (h = s.background) == null ? void 0 : h._color : void 0,
      source: new ie.XYZ({
        url: dr(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
const hr = {
  preload: 0,
  useInterimTilesOnError: !0,
  cacheSize: 512
};
let gr = "TileLayer", _r = p(gr);
class Qr extends K {
  constructor(e) {
    if (super("Tile", y(e, {})), !n(e.source)) {
      d(_r("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, {
      ...hr
    }, {
      ...e,
      source: void 0,
      map: void 0
    });
    y(e.source, {}), this._layer = new re.Tile({
      // 以下这些是基础属性赋值
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ee(t.background) : void 0
    }), this._initLayerEvent();
  }
}
const pr = {
  preload: 0,
  cacheSize: 512
}, yr = {
  attributionsCollapsible: !0,
  interpolate: !0,
  projection: "EPSG:3857",
  reprojectionErrorThreshold: 0.5,
  maxZoom: 42,
  minZoom: 0,
  tilePixelRatio: 1,
  tileSize: [256, 256],
  gutter: 0,
  wrapX: !0,
  transition: 250,
  zDirection: 0
};
let mr = "TileLayer", vr = p(mr);
class en extends K {
  constructor(e) {
    if (super("XYZ", y(e, {})), !n(e.source)) {
      d(vr("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, pr, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, yr, {
      ...y(e.source, {})
    }), s;
    if (n(e.source)) {
      let o;
      n(i.tileGrid) && (o = new De.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: P(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? P(a) : a) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof k ? b(a) : a) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof k ? b(a) : a) : void 0
      })), s = new ie.XYZ({
        ...i,
        tileGrid: o
      });
    }
    this._layer = new re.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ee(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
let Er = "LayerGroup", Ce = p(Er);
class Ir {
  constructor(e, t) {
    c(this, "id", null);
    c(this, "layers", []);
    if (!n(e)) {
      d(Ce("constructor", "参数不能为空"));
      return;
    }
    let i, s = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (s = e, !n(t)) {
        d(Ce("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    n(s) && (this.id = s), this.layers = i;
  }
  add(e) {
    if (!n(e)) {
      d(Ce("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (n(t) && this.layers.find((s) => s.getId() && s.getId() === t)) {
      l(Ce("add", "图层已存在"));
      return;
    }
    this.layers.push(e);
  }
  remove(e) {
    if (g(e)) {
      this.layers.splice(e, 1);
      return;
    }
    let t = e.getId();
    if (n(t)) {
      let i = this.layers.find((s) => s.getId() && s.getId() === t);
      i && this.layers.splice(this.layers.indexOf(i), 1);
    } else
      this.layers.splice(this.layers.indexOf(e), 1);
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
function Ht(r) {
  if (n(r))
    return r instanceof Q ? r.getProjection() : r;
}
const Fr = {
  preload: 0,
  cacheSize: 512
}, xr = {
  attributionsCollapsible: !0,
  interpolate: !0,
  projection: "EPSG:3857",
  reprojectionErrorThreshold: 0.5,
  requestEncoding: "KVP",
  layer: "",
  style: "",
  tilePixelRatio: 1,
  format: "image/jpeg",
  version: "1.0.0",
  matrixSet: "EPSG:3857",
  wrapX: !0,
  transition: 250,
  zDirection: 0
};
let zr = "WMTSLayer", Ar = p(zr);
class tn extends K {
  constructor(e) {
    if (super("WMS", y(e, {})), !n(e.source)) {
      l(Ar("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, Fr, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, xr, {
      ...y(e.source, {})
    });
    console.log("_sourceParams"), console.log(i);
    let s;
    if (n(e.source)) {
      let o;
      n(i.tileGrid) && (o = new De.WMTS({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: P(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? P(a) : a) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof k ? b(a) : a) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof k ? b(a) : a) : void 0
      })), s = new ie.WMTS({
        ...i,
        projection: Ht(i.projection),
        tileGrid: o
      });
    }
    this._layer = new re.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ee(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const wr = {
  preload: 0,
  cacheSize: 512
}, Cr = {
  attributionsCollapsible: !0,
  interpolate: !0,
  params: {},
  hidpi: !0,
  projection: "EPSG:3857",
  reprojectionErrorThreshold: 0.5,
  gutter: 0,
  wrapX: !0,
  transition: 250,
  zDirection: 0
};
let Pr = "WMSLayer", Lr = p(Pr);
class rn extends K {
  constructor(e) {
    if (super("WMS", y(e, {})), !n(e.source)) {
      l(Lr("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, wr, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, Cr, {
      ...y(e.source, {})
    }), s;
    if (n(e.source)) {
      let o;
      n(i.tileGrid) && (o = new De.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: P(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? P(a) : a) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof k ? b(a) : a) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof k ? b(a) : a) : void 0
      })), s = new ie.TileWMS({
        ...i,
        projection: Ht(i.projection),
        tileGrid: o
      });
    }
    this._layer = new re.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ee(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
function Rt(r, e, t) {
  return {
    target: r,
    type: e,
    pixel: new Z(t.pixel[0], t.pixel[1]),
    coordinate: new u(t.coordinate[0], t.coordinate[1])
  };
}
const Sr = "DragBox", Pe = p(Sr);
class nn extends R {
  constructor(e) {
    super("DragBox"), this._interaction = new D.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && Me(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new u(t.coordinate[0], t.coordinate[1]),
          pixel: new Z(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new me(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      l(Pe("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (o) => {
      this.events.emit(e, Rt(this, e, o));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        l(Pe("un", "参数不能为空"));
        return;
      }
      if (!g(e)) {
        l(Pe("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      l(Pe("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (o) => {
      this.events.emit(e, Rt(this, e, o));
    }), this.events.once(e, t);
  }
}
const Mr = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class sn extends R {
  constructor(e) {
    super("Extent"), this._interaction = new D.Extent(Object.assign({}, Mr, e || {})), this.initInteractionEvent();
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._interaction.getExtent();
    return e ? new v(e[0], e[1], e[2], e[3]) : void 0;
  }
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof v ? e.toArray() : e;
    this._interaction.setExtent(t);
  }
}
function $t(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const br = "Modify", W = p(br), kr = {
  condition: void 0,
  deleteCondition: void 0,
  insertVertexCondition: void 0,
  pixelTolerance: 10,
  style: void 0,
  source: void 0,
  hitDetection: void 0,
  features: void 0,
  wrapX: !1,
  snapToPointer: !1
};
let on = class extends R {
  constructor(t) {
    super("Modify");
    c(this, "records", []);
    let i = null;
    n(t.layer) || d(W("init", "layer参数不能为空")), n(t.layer) && !(t.layer instanceof ke) && d(W("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let s = Object.assign({}, kr, {
      ...t,
      source: i
    });
    this._interaction = new D.Modify(s), this.initInteractionEvent(), this.initModifyEvent();
  }
  initModifyEvent() {
    if (!this._isInitialized("initModifyEvent")) return;
    let i = (this.layer.getFeatures() || []).map((s) => ({
      id: s.id,
      originFeatureId: _.getUid(s._feature),
      type: s.type,
      coordinates: s.getCoordinates()
    }));
    this.records.push({
      time: lt(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (s) => {
      let o = s.features.getArray(), a = [];
      o.forEach((h) => {
        let f = this.layer.getFeatures().find((I) => _.getUid(I._feature) === _.getUid(h));
        f && a.push({
          id: f.id,
          originFeatureId: _.getUid(f._feature),
          type: f.type,
          coordinates: f.getCoordinates()
        });
      }), this.records.push({
        time: lt(),
        features: a,
        version: this.records.length + 1
      });
    });
  }
  canInsertPoint() {
    if (this._isInitialized("canInsertPoint"))
      return this._interaction.canInsertPoint();
  }
  canRemovePoint() {
    if (this._isInitialized("canRemovePoint"))
      return this._interaction.canRemovePoint();
  }
  /**
   * 插入一个点
   * @param {Lnglat | OlCoordinateType} coordinates 点的坐标
   */
  insertPoint(t) {
    if (!this._isInitialized("insertPoint")) return;
    if (!n(t)) {
      l(W("insertPoint", "coordinates参数不能为空"));
      return;
    }
    let i = t instanceof u ? t.toArray() : t;
    return this._interaction.insertPoint(i);
  }
  /**
   * 删除一个点
   * @param {Lnglat | OlCoordinateType} coordinates 点的坐标
   */
  removePoint(t) {
    if (!this._isInitialized("removePoint")) return;
    if (!n(t)) {
      l(W("removePoint", "coordinates参数不能为空"));
      return;
    }
    let i = t instanceof u ? t.toArray() : t;
    return this._interaction.removePoint(i);
  }
  /**
   * 撤销修改
   */
  revoke(t = 1) {
    if (!this._isInitialized("revoke")) return;
    if (this.records.length === 1) return !1;
    let s = this.records.length - 1 - t;
    if (s === 0)
      return this.cancel(), !1;
    const { features: o } = this.records[s];
    return o.forEach((a) => {
      let h = this.layer.getFeatures().find((f) => a.id ? a.id === f.id : _.getUid(f._feature) === a.originFeatureId);
      h && h.setCoordinates(a.coordinates);
    }), this.records.splice(s + 1), !0;
  }
  /**
   * 取消当前全部修改，也就是回到初始状态
   */
  cancel() {
    const { features: t } = this.records[0];
    t.forEach((i) => {
      let s = this.layer.getFeatures().find((o) => i.id ? i.id === o.id : _.getUid(o._feature) === i.originFeatureId);
      s && s.setCoordinates(i.coordinates);
    }), this.records = [
      this.records[0]
    ];
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      l(W("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, $t(this, t, a));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        l(W("un", "参数不能为空"));
        return;
      }
      if (!g(t)) {
        l(W("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      l(W("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, $t(this, t, a));
    }), this.events.once(t, i);
  }
}, Ge = [], Wt = [];
function Gr(r) {
  Ge = r;
}
function Dr(r) {
  Wt = r, Ge = [];
}
function Le(r) {
  let e = null;
  if (Ge.length)
    for (const t of Ge) {
      let i = t.getFeatures().find((s) => _.getUid(s._feature) === r);
      i && (e = i);
    }
  else
    e = Wt.find((t) => _.getUid(t._feature) === r);
  return e;
}
function Tt(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const Rr = "Select", pe = p(Rr), $r = {
  layers: void 0,
  style: void 0,
  multi: !1,
  // 当为true的时候，支持一次选择n个重叠的要素
  features: void 0,
  filter: void 0,
  hitTolerance: 0
};
class ln extends R {
  constructor(t) {
    super("Select");
    /**
     * 当前选择的要素
     */
    c(this, "selected", []);
    /**
     * 当前未选择的要素
     */
    c(this, "deselected", []);
    let i = [];
    n(t == null ? void 0 : t.layers) && (Gr(t.layers), i = t.layers.map((s) => s._layer)), n(t == null ? void 0 : t.features) && Dr(t.features), this._interaction = new D.Select(Object.assign({}, $r, {
      ...t,
      layers: i,
      style: this.initStyle(t == null ? void 0 : t.style),
      filter: this.initFilter(t == null ? void 0 : t.filter)
    })), this.initInteractionEvent(), this.initSelectEvent();
  }
  /**
   * 初始化样式
   * @param {OMapStyleLike | undefined} style 样式
   */
  initStyle(t) {
    let i;
    return n(t) && (t instanceof ee ? i = t.getStyle() : z(t) && t.every((s) => s instanceof ee) ? i = t.map((s) => s.getStyle()) : Me(t) ? i = (s, o) => {
      let a = _.getUid(s), h = Le(a), f = t(h, o);
      return f ? f.getStyle() : void 0;
    } : l(pe("initStyle", "style格式有误"))), i;
  }
  initFilter(t) {
    if (n(t))
      return (i, s) => {
        var h;
        let o = Le(_.getUid(i)), a = (h = this.map) == null ? void 0 : h.getAllLayers().find((f) => _.getUid(f._layer) === _.getUid(s));
        return t(o, a);
      };
  }
  /**
   * 初始化Select事件
   */
  initSelectEvent() {
    this._isInitialized("initSelectEvent") && this._interaction.on("select", (t) => {
      const { selected: i, deselected: s } = t;
      this.selected = i.map((o) => Le(_.getUid(o))).filter((o) => o !== null), this.deselected = s.map((o) => Le(_.getUid(o))).filter((o) => o !== null);
    });
  }
  getSelected() {
    return this.selected;
  }
  getDeselected() {
    return this.deselected;
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      l(pe("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (a) => {
      console.log("select", a), this.events.emit(t, Object.assign({}, Tt(this, t, a), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        l(pe("un", "参数不能为空"));
        return;
      }
      if (!g(t) && !M(t)) {
        l(pe("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      l(pe("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, Object.assign({}, Tt(this, t, a), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.once(t, i);
  }
}
const Tr = {
  animate: !0,
  params: ["x", "y", "z", "r", "l"],
  replace: !1,
  prefix: ""
};
class un extends R {
  constructor(e) {
    super("Link");
    let t = {
      ...e,
      animate: n(e == null ? void 0 : e.animate) && !Bt(e == null ? void 0 : e.animate) ? {
        ...e.animate,
        center: e.animate.center instanceof u ? e.animate.center.toArray() : e.animate.center
      } : y(e == null ? void 0 : e.animate, !0)
    };
    this._interaction = new D.Link(Object.assign({}, Tr, t)), this.initInteractionEvent();
  }
}
const Br = {
  duration: 100,
  delta: 1
};
class cn extends R {
  constructor(e) {
    super("KeyboardZoom"), this._interaction = new D.KeyboardZoom(Object.assign({}, Br, e || {})), this.initInteractionEvent();
  }
}
class dn {
  constructor() {
  }
}
export {
  Mi as Circle,
  N as Color,
  Hi as DoubleClickZoom,
  nn as DragBox,
  Xi as DragPan,
  dn as DragZoom,
  Je as Draw,
  Ye as DrawMode,
  v as Extent,
  Xr as GaodeLayer,
  Wr as GaodeLayerType,
  sn as InteractionExtent,
  cn as KeyboardZoom,
  Ir as LayerGroup,
  Qe as LineString,
  Oe as LinearRing,
  un as Link,
  u as Lnglat,
  Kr as Map,
  Yt as MapToken,
  qe as Measure,
  j as MeasureMode,
  on as Modify,
  Ki as MouseWheelZoom,
  Hr as MultiPoint,
  Z as Pixel,
  ye as Point,
  Ut as Polygon,
  Zt as Popup,
  Ot as PopupPositioning,
  qr as ProjUtil,
  Q as Projection,
  ln as Select,
  k as Size,
  ee as Style,
  Jr as TdtLayer,
  Qr as TileLayer,
  ke as VectorLayer,
  rn as WMSLayer,
  tn as WMTSLayer,
  en as XYZLayer
};
