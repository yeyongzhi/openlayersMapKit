var hi = Object.defineProperty;
var gi = (r, e, t) => e in r ? hi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => gi(r, typeof e != "symbol" ? e + "" : e, t);
import * as _t from "ol";
import * as he from "ol/layer";
import * as fe from "ol/source";
import * as it from "ol/proj";
import * as O from "ol/interaction";
import * as g from "ol/util";
import M from "ol/Feature";
import _i from "ol/Overlay";
import * as z from "ol/geom";
import * as W from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import * as pt from "ol/sphere";
import { createBox as pi } from "ol/interaction/Draw";
import * as He from "ol/tilegrid";
import * as qe from "ol/format";
import * as Ze from "ol/control";
import * as L from "ol/extent";
import * as mt from "ol/Observable";
function n(r) {
  return r != null;
}
function _(r, e) {
  return n(r) ? r : e;
}
function o(r) {
  console.warn("omap warn", r);
}
function d(r) {
  throw new Error(`omap error ${r}`);
}
function y(r) {
  return (e, t) => `📦${r}【${e}】: ${t}`;
}
function mi(r) {
  return `参数${r}不能为空`;
}
function yi(r, e) {
  return `参数${r}格式错误` + (e ? `，正确格式为${e}` : "");
}
function vi(r) {
  return `参数${r}中存在无效数据，已过滤`;
}
const A = {
  paramsNotDefined: mi,
  paramsInvaildFormat: yi,
  haveInvaildDataItem: vi
}, Ii = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function ye(r) {
  return typeof r == "function";
}
function w(r) {
  return Array.isArray(r);
}
function yt(r) {
  return Array.isArray(r) && r.length === 0;
}
function p(r) {
  return typeof r == "number";
}
function C(r) {
  return typeof r == "string";
}
function Ei(r) {
  return r === "";
}
function ii(r) {
  return typeof r == "boolean";
}
function ie(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function G(r) {
  return w(r) && r.length === 2 && p(r[0]) && p(r[1]);
}
function be(r) {
  return w(r) && r.length === 4 && p(r[0]) && p(r[1]) && p(r[2]) && p(r[3]);
}
function Je(r) {
  return w(r) && r.length === 3 && r.every((e) => p(e) && e >= 0 && e <= 255);
}
function Fi(r) {
  return C(r) && Ii.test(r);
}
function Ne(r) {
  return p(r) && r >= 0 && r <= 1;
}
function Qe(r) {
  let e = r.replace("#", "");
  return C(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function zi(r) {
  let e = r.replace("#", "");
  return C(r) && r.startsWith("#") && e.length === 8;
}
function Xe(r) {
  const e = r.every((t) => p(t));
  return w(r) && e;
}
function xe(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function vt(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function xi(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Ai(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
function It() {
  const r = /* @__PURE__ */ new Date(), e = r.getFullYear(), t = String(r.getMonth() + 1).padStart(2, "0"), i = String(r.getDate()).padStart(2, "0"), s = String(r.getHours()).padStart(2, "0"), a = String(r.getMinutes()).padStart(2, "0"), l = String(r.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${s}:${a}:${l}`;
}
function wi() {
  return _(window.devicePixelRatio, 1);
}
const Pi = "Size", Ae = y(Pi);
class R {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size", [0, 0]);
    let t = [0, 0];
    if (e.length === 1 && w(e[0]))
      t = e[0];
    else if (e.length === 2 && Xe(e))
      t = [e[0], e[1]];
    else {
      d(Ae("constructor", "初始化参数格式有误"));
      return;
    }
    this._size = t;
  }
  _isInitialized(e) {
    return n(this._size) ? !0 : (o(Ae(e, "未正确实例化")), !1);
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
      if (!p(e[0]) || !p(e[1])) {
        o(Ae("setSize", "参数格式有误"));
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
      if (!p(e)) {
        o(Ae("setWidth", "参数格式有误"));
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
      if (!p(e)) {
        o(Ae("setHeight", "参数格式有误"));
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
const Ci = "Pixel", ge = y(Ci);
class D {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    let t = [0, 0];
    if (e.length === 1 && w(e[0]))
      t = e[0];
    else if (e.length === 2 && Xe(e))
      t = [e[0], e[1]];
    else {
      d(ge("constructor", "初始化参数格式有误"));
      return;
    }
    this._pixel = t;
  }
  _isInitialized(e) {
    return n(this._pixel) ? !0 : (o(ge(e, "未正确实例化")), !1);
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
      if (!p(e[0]) || !p(e[1])) {
        o(ge("setPixel", "参数格式有误"));
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
      if (!p(e)) {
        o(ge("setX", "参数格式有误"));
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
      if (!p(e)) {
        o(ge("setY", "参数格式有误"));
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
      o(ge("equals", "参数未正确实例化"));
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
const Li = "Lnglat", we = y(Li);
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
    if (e.length === 1 && w(e[0]))
      t = e[0];
    else if (e.length === 2 && Xe(e))
      t = e;
    else {
      d(we("constructor", "初始化参数格式有误"));
      return;
    }
    this._lnglat = t;
  }
  _isInitialized(e) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(we(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!p(e)) {
        o(we("setLng", "传入经度格式有误"));
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
      if (!p(e)) {
        o(we("setLat", "传入纬度格式有误"));
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
      o(we("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !G(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const Et = {
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
}, Si = "Color", Te = y(Si);
class q {
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
      d(Te("constructor", "初始化参数有误"));
    };
    if (w(e)) {
      let i = e;
      if (i.length === 3) {
        if (!Je(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!Je(i.slice(0, 3)) || !Ne(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!Qe(i[0]) || !Ne(i[1])) {
          t();
          return;
        }
        let s = xe(e[0]);
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
    if (ie(e)) {
      let i = e;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        t();
        return;
      }
      if (n(i.color)) {
        if (Qe(i.color)) {
          let s = xe(i.color);
          if (!n(s)) {
            t();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (Fi(i.color)) {
          let s = vt(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!Je([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (C(e)) {
      if (Ei(e)) {
        t();
        return;
      }
      if (Qe(e)) {
        let i = xe(e);
        if (!n(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (zi(e)) {
        let i = xe(e.slice(0, 7));
        if (!n(i)) {
          t();
          return;
        }
        let s = Ai(e.slice(6));
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
    if (!Ne(e)) {
      d(Te("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...vt(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...xi(this._color), e]);
    else {
      if (!n(Et[this._color])) {
        d(Te("withAlpha", "颜色值有误"));
        return;
      }
      let t = xe(Et[this._color]);
      if (!n(t)) {
        d(Te("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
function E(r) {
  if (n(r))
    return r instanceof F ? r.getExtent() : r;
}
function S(r) {
  if (n(r))
    return r instanceof u ? r.toArray() : r;
}
const Mi = "Extent", Pe = y(Mi);
class F {
  constructor(...e) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    let t = [];
    if (e.length === 1 && w(e[0]))
      t = e[0];
    else if (e.length === 4 && Xe(e))
      t = e;
    else {
      d(Pe("constructor", "初始化参数格式有误"));
      return;
    }
    this._extent = t;
  }
  _isInitialized(e) {
    return !n(this._extent) || this._extent.length !== 4 ? (o(Pe(e, "未正确实例化")), !1) : !0;
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
      return new u(...L.getTopLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new u(...L.getTopRight(this._extent));
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new u(...L.getBottomLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new u(...L.getBottomRight(this._extent));
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new u(...L.getCenter(this._extent));
  }
  /**
   * 获取宽度信息
   * @returns {number} 宽度
   */
  getWidth() {
    if (this._isInitialized("getWidth"))
      return L.getWidth(this._extent);
  }
  /**
   * 获取高度信息
   * @returns {number} 高度
   */
  getHeight() {
    if (this._isInitialized("getHeight"))
      return L.getHeight(this._extent);
  }
  getSize() {
    if (this._isInitialized("getHeight"))
      return new R(...L.getSize(this._extent));
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
      d(Pe("boundingExtent", "参数coordinates不能为空"));
      return;
    }
    if (!w(e)) {
      d(Pe("boundingExtent", "参数coordinates格式错误，必须为数组"));
      return;
    }
    let t = e.filter((a) => a instanceof u || G(a));
    t.length < e.length && o(Pe("boundingExtent", "参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型"));
    let i = t.map((a) => a instanceof u ? a.toArray() : a), s = L.boundingExtent(i);
    return new F(...s);
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param {OMapExtentType} extent 范围
   * @param {OMapCoordinateType} coordinate 位置
   * @return {boolean} 判断结果
   */
  static containsCoordinate(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = S(t);
    if (!(!n(i) || !n(s)))
      return L.containsCoordinate(i, s);
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
      return L.containsExtent(i, s);
  }
  static containsXY(e, t, i) {
    if (!n(e) || !n(t) || !n(i)) return;
    let s = E(e);
    if (n(s))
      return L.containsXY(s, t, i);
  }
  static createEmpty() {
    return new F(...L.createEmpty());
  }
  static equals(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return L.equals(i, s);
  }
  static extend(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return new F(...L.extend(i, s));
  }
  static getArea(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return L.getArea(t);
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
      return L.intersects(i, s);
  }
  static isEmpty(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return L.isEmpty(t);
  }
}
function bi(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new W.Fill({
      ...r,
      color: e instanceof q ? e.getColor() : e
    });
}
function Gi(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new W.Stroke({
      ...r,
      color: e instanceof q ? e.getColor() : e
    });
}
function Ti(r) {
  if (!n(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new W.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return n(e) && i.setFill(new W.Fill({
    color: e.color instanceof q ? e.color.getColor() : e.color
  })), n(t) && i.setStroke(new W.Stroke({
    color: t.color instanceof q ? t.color.getColor() : t.color
  })), i;
}
function Di(r) {
  return n(r) ? new W.Icon({
    ...r,
    color: r.color ? r.color instanceof q ? r.color.getColor() : r.color : void 0,
    offset: n(r.offset) ? r.offset.getPixel() : [0, 0],
    size: n(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function ki(r) {
  if (!n(r))
    return;
  let e = new W.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return n(t) && e.setFill(new W.Fill({
    color: t.color instanceof q ? t.color.getColor() : t.color
  })), n(i) && e.setStroke(new W.Stroke({
    color: i.color instanceof q ? i.color.getColor() : i.color
  })), e;
}
const ri = (r, e) => {
  if (n(r)) {
    if (r.getType() === "Point")
      return new te({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (r.getType() === "LineString")
      return new te({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (r.getType() === "Polygon" || r.getType() === "Circle")
      return new te({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new q({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
function $i(r) {
  if (n(r)) {
    if (r instanceof te)
      return r.getStyle();
    if (Array.isArray(r))
      return r.map((e) => e.getStyle());
    if (ye(r))
      return;
  }
}
class te {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: s, circle: a, icon: l, regularShape: f } = e;
    let h;
    a ? h = Ti(a) : l ? h = Di(l) : f && (h = ki(f)), this._style = new W.Style({
      fill: bi(t),
      stroke: Gi(i),
      image: h
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const Ri = "Event", Ft = y(Ri);
class ve {
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
      const a = i[s];
      try {
        a.callback.call(a.target, ...t);
      } catch (l) {
        d(Ft("emit", `回调异常: ${String(l)}`));
      }
      a.once ? i.splice(s, 1) : s++;
    }
    return i.length === 0 && this.events.delete(e), this;
  }
  remove(e) {
    for (const [t, i] of this.events.entries()) {
      const s = i.findIndex((a) => a.id === e);
      if (s !== -1)
        return i.splice(s, 1), i.length === 0 && this.events.delete(t), this;
    }
    return o(Ft("remove", `未找到 id=${e} 的监听`)), this;
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
function Bi(r) {
  return p(r) && r > 0;
}
const ni = {
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
function Oi(r) {
  return Object.values(ni).includes(r);
}
const ji = {
  offset: new D(0, 0),
  positioning: ni.bottomCenter,
  stopEvent: !0,
  insertFirst: !0,
  autoPan: !1,
  className: "omap-popup-element"
};
function zt(r) {
  return ["change:position", "change:positioning", "change:element", "change:offset"].includes(r);
}
function xt(r) {
  let e = document.createElement("div");
  return e.className = "omap-popup-default-element", e.innerHTML = r, e;
}
function De(r, e, t) {
  const { oldValue: i, key: s, newValue: a } = t;
  let l = {
    target: r,
    type: e,
    key: s
  };
  switch (e) {
    case "change:position":
      l.oldValue = new u(i[0], i[1]), l.newValue = r.getPosition();
      break;
    case "change:positioning":
      l.oldValue = i, l.newValue = r.getPositioning();
      break;
    case "change:element":
      l.oldValue = i, l.newValue = r.getElement();
      break;
    case "change:offset":
      l.oldValue = new D(i[0], i[1]), l.newValue = r.getOffset();
      break;
    case "change:properties":
    case "change:content":
      l.oldValue = i, l.newValue = a;
      break;
  }
  return l;
}
const Vi = "Popup", se = y(Vi);
class si {
  constructor(e) {
    c(this, "_popup");
    /**
     * Popup 的唯一ID
     */
    c(this, "id", null);
    /**
     * 弹窗所属地图
     */
    c(this, "map", null);
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
    c(this, "events", new ve());
    var i;
    n(e.id) && (this.id = e.id);
    let t = Object.assign({}, ji, e);
    delete t.id, n(t.content) && C(t.content) && !n(t.element) && (this.content = t.content, t.element = xt(t.content)), n(t.element) && t.element.classList.add("omap-popup-selectable"), this._popup = new _i({
      ...t,
      offset: (i = t.offset) == null ? void 0 : i.toArray(),
      position: n(t.position) ? t.position instanceof u ? t.position.toArray() : t.position : void 0
    }), this.events = new ve(this);
  }
  /**
   * 初始化弹窗元素事件
   * @todo 暂不需要
   */
  _initElementEvent() {
  }
  _isInitialized(e) {
    return n(this._popup) ? !0 : (o(se(e, "未正确实例化")), !1);
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
      if (!Oi(e)) {
        o(se("setPositioning", "参数positioning值有误"));
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
        o(se("setProperties", "参数不能为空"));
        return;
      }
      this.events.emit("change:properties", De(this, "change:properties", {
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
    if (this._isInitialized("getElement") && n(e))
      return e.classList.add("omap-popup-selectable"), this._popup.setElement(e);
  }
  getContent() {
    return this._isInitialized("getContent") ? this.content : "";
  }
  setContent(e) {
    this._isInitialized("setContent") && (this.events.emit("change:content", De(this, "change:content", {
      oldValue: this.getContent(),
      key: "content",
      newValue: e
    })), this.content = e, this.setElement(xt(e)));
  }
  getOffset() {
    if (!this._isInitialized("getOffset")) return;
    let e = this._popup.getOffset();
    return new D(e[0], e[1]);
  }
  setOffset(e) {
    if (!this._isInitialized("setOffset")) return;
    let t = e instanceof D ? e.toArray() : e;
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
      o(se("on", "参数不能为空"));
      return;
    }
    if (zt(e)) {
      let s = this.events.get(e);
      (!n(s) || s.length === 0) && this._popup.on(e, (a) => {
        console.log(a), this.events.emit(e, De(this, e, a));
      });
    }
    return this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(se("un", "参数不能为空"));
        return;
      }
      if (!Bi(e)) {
        o(se("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(se("on", "参数不能为空"));
      return;
    }
    if (zt(e)) {
      let s = this.events.get(e);
      (!n(s) || s.length === 0) && this._popup.on(e, (a) => {
        console.log(a), this.events.emit(e, De(this, e, a));
      });
    }
    return this.events.once(e, t);
  }
  setMap(e) {
    this.map = e, n(e) && this._initElementEvent();
  }
}
function _e(r) {
  if (n(r))
    return r instanceof D ? r.toArray() : r;
}
const Ui = "Map", At = y(Ui);
class ce {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (C(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!n(i.code)) {
        d(At("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = it.get(t), !n(this._projection)) {
      o(At("constructor", "坐标系不存在"));
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
const ue = /* @__PURE__ */ new WeakMap();
let rt = "BaseLayer", x = y(rt);
const wt = 1, Pt = !0, Ct = 0, Lt = 22, St = 0, Mt = 1 / 0, bt = 1, Gt = {};
class k {
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
    c(this, "opacity", wt);
    // 图层透明度，默认1
    c(this, "visible", Pt);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", Ct);
    // 最小缩放级别，默认0
    c(this, "maxZoom", Lt);
    // 最大缩放级别，默认22
    c(this, "minResolution", St);
    // 最小分辨率，默认0r
    c(this, "maxResolution", Mt);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", bt);
    // 图层层级，默认0
    c(this, "properties", Gt);
    // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的地图对象
     */
    c(this, "map", null);
    /**
     * 图层所属的对象
     */
    c(this, "target", null);
    let i = _(t, {});
    this.type = e, rt = `${e}Layer`, x = y(rt), this.id = _(i.id, null), this.name = _(i.name, ""), this.className = _(i.className, ""), this.opacity = _(i.opacity, wt), this.visible = _(i.visible, Pt), this.extent = _(i.extent, null), this.minZoom = _(i.minZoom, Ct), this.maxZoom = _(i.maxZoom, Lt), this.minResolution = _(i.minResolution, St), this.maxResolution = _(i.maxResolution, Mt), this.zIndex = _(i.zIndex, bt), this.properties = _(i.properties, Gt), this.map = _(i.map, null), ue.set(this, {
      groupId: null
    });
  }
  _isInitialized(e) {
    return n(this._layer) ? !0 : (o(x(e, "未正确实例化")), !1);
  }
  _initLayerEvent() {
    this._isInitialized("_initLayerEvent") && this._layer.on([
      "propertychange"
    ], (e) => {
      e.key === "opacity" ? this.opacity = this.getOpacity() : e.key === "visible" ? this.visible = this.getVisible() : e.key === "extent" ? this.extent = this.getExtent() : e.key === "minZoom" ? this.minZoom = this.getMinZoom() : e.key === "maxZoom" ? this.maxZoom = this.getMaxZoom() : e.key === "minResolution" ? this.minResolution = this.getMinResolution() : e.key === "maxResolution" ? this.maxResolution = this.getMaxResolution() : e.key === "zIndex" && (this.zIndex = this.getZIndex());
    });
  }
  getId() {
    return this._isInitialized("getId") ? this.id : null;
  }
  setId(e) {
    this._isInitialized("setId") && (this.id = e);
  }
  getLayer() {
    return this._layer;
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
        o(x("setOpacity", A.paramsNotDefined("opacity")));
        return;
      }
      if (!Ne(e)) {
        o(x("setOpacity", A.paramsInvaildFormat("opacity", "0~1的数字")));
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
        o(x("setVisible", A.paramsNotDefined("visible")));
        return;
      }
      if (!ii(e)) {
        o(x("setVisible", A.paramsInvaildFormat("visible", "boolean类型")));
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
   * @returns {Extent | undefined} 范围
   */
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._layer.getExtent();
    return n(e) ? new F(...e) : void 0;
  }
  /**
   * 设置图层的范围
   * @param {OMapExtentType} extent 范围
   */
  setExtent(e) {
    if (this._isInitialized("setExtent")) {
      if (!n(e)) {
        o(x("setExtent", A.paramsNotDefined("extent")));
        return;
      }
      if (!(e instanceof F) && !be(e)) {
        o(x("setExtent", A.paramsInvaildFormat("extent", "Extent类型")));
        return;
      }
      this._layer.setExtent(E(e));
    }
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!n(e)) {
        o(x("setMinZoom", A.paramsNotDefined("minZoom")));
        return;
      }
      if (!p(e)) {
        o(x("setMinZoom", A.paramsInvaildFormat("minZoom", "number类型")));
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
        o(x("setMaxZoom", A.paramsNotDefined("maxZoom")));
        return;
      }
      if (!p(e)) {
        o(x("setMaxZoom", A.paramsInvaildFormat("maxZoom", "number类型")));
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
        o(x("setMinResolution", A.paramsNotDefined("minResolution")));
        return;
      }
      if (!p(e)) {
        o(x("setMinResolution", A.paramsInvaildFormat("minResolution", "number类型")));
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
        o(x("setMaxResolution", A.paramsNotDefined("maxResolution")));
        return;
      }
      if (!p(e)) {
        o(x("setMaxResolution", A.paramsInvaildFormat("maxResolution", "number类型")));
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
        o(x("setZIndex", A.paramsNotDefined("zIndex")));
        return;
      }
      if (!p(e)) {
        o(x("setZIndex", A.paramsInvaildFormat("zIndex", "number类型")));
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
      o(x("setProperties", A.paramsNotDefined("properties")));
      return;
    }
    if (ie(e)) {
      o(x("setProperties", A.paramsInvaildFormat("properties", "object类型")));
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
  get groupId() {
    var e;
    return ((e = ue.get(this)) == null ? void 0 : e.groupId) || null;
  }
  getGroupId() {
    return this.groupId;
  }
}
const Ni = "Interaction", Zi = y(Ni);
class j {
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
    c(this, "events", new ve());
    c(this, "map", null);
    this.type = e;
  }
  initInteractionEvent() {
    this._isInitialized("initInteractionEvent") && this._interaction.on("change:active", (e) => {
      e.type === "change:active" && (this.active = this.getActive());
    });
  }
  _isInitialized(e) {
    return n(this._interaction) ? !0 : (o(Zi(e, "未正确实例化")), !1);
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
const Ki = "BasicFeature", ke = y(Ki);
class Fe {
  constructor(e, t, i) {
    c(this, "id");
    c(this, "type");
    c(this, "_feature");
    c(this, "_geometry");
    this.type = e, t instanceof M ? this._initByFeature(t) : this._init(t, i);
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
        o(ke("setProperties", "参数不能为空"));
        return;
      }
      if (!ie(e)) {
        o(ke("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!n(e)) {
        o(ke("setId", "参数id不能为空"));
        return;
      }
      if (!p(e) && !C(e)) {
        o(ke("setId", "参数id格式有误"));
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
const Wi = "Point", oe = y(Wi);
class Me extends Fe {
  constructor(e, t) {
    if (!n(e)) {
      d(oe("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Point", e);
    else {
      if (!(e instanceof u) && !G(e)) {
        d(oe("constructor", "坐标格式有误"));
        return;
      }
      super("Point", e), n(t) && ie(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = S(e);
    i && (this._geometry = new z.Point(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(oe(e, "未正确实例化")), !1) : !0;
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
      d(oe("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !G(e)) {
      d(oe("setCoordinates", "坐标格式有误"));
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
      d(oe("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof F) && !be(e)) {
      d(oe("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof F ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Tt(r) {
  let e = !0;
  return w(r) || (e = !1), r.some((i) => !(i instanceof u) && !G(i)) && (e = !1), e;
}
const Yi = "LineString", B = y(Yi);
class ft extends Fe {
  constructor(e, t) {
    if (!n(e)) {
      d(B("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("LineString", e);
    else {
      if (!Tt(e)) {
        d(B("constructor", "坐标格式有误"));
        return;
      }
      super("LineString", e), n(t) && ie(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => S(s));
    i && (this._geometry = new z.LineString(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(B(e, "未正确实例化")), !1) : !0;
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
      d(B("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Tt(e)) {
      d(B("setCoordinates", "坐标格式有误"));
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
      d(B("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !G(e)) {
      d(B("setCoordinates", "坐标格式有误"));
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
    return new F(e[0], e[1], e[2], e[3]);
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
      d(B("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(p(e) && e >= 0 && e <= 1)) {
      d(B("getCoordinateAt", "参数格式有误"));
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
      d(B("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof F) && !be(e)) {
      d(B("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof F ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Dt(r) {
  let e = !0;
  return w(r) || (e = !1), r.some((i) => !w(i)) && (e = !1), r.forEach((i) => {
    i.forEach((s) => {
      !(s instanceof u) && !G(s) && (e = !1);
    });
  }), e;
}
function nt(r) {
  let e = !0;
  return w(r) || (e = !1), r.some((i) => !(i instanceof u) && !G(i)) && (e = !1), e;
}
const Hi = "LinearRing", Ce = y(Hi);
class et extends Fe {
  constructor(e, t) {
    if (!n(e)) {
      d(Ce("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("LinearRing", e);
    else {
      if (!nt(e)) {
        d(Ce("constructor", "坐标格式有误"));
        return;
      }
      super("LinearRing", e), t && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => S(s));
    i && (this._geometry = new z.LinearRing(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(Ce(e, "未正确实例化")), !1) : !0;
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
      d(Ce("setCoordinates", "参数不能为空"));
      return;
    }
    if (!nt(e)) {
      d(Ce("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const Xi = "Polygon", U = y(Xi);
class oi extends Fe {
  constructor(e, t) {
    if (!n(e)) {
      d(U("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Polygon", e);
    else {
      if (!Dt(e)) {
        d(U("constructor", "坐标格式有误"));
        return;
      }
      super("Polygon", e), n(t) && ie(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => s.map((a) => S(a)));
    i && (this._geometry = new z.Polygon(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(U(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取多边形的坐标
   * @param {boolean | undefined} rightHanded 是否右手坐标系
   * @returns {Array<Array<Lnglat>>} 多边形的坐标
   */
  getCoordinates(e = void 0) {
    return this._geometry.getCoordinates(e).map((s) => s.map((a) => new u(a[0], a[1])));
  }
  /**
   * 设置多边形的坐标
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(e) {
    if (!n(e)) {
      d(U("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Dt(e)) {
      d(U("setCoordinates", "坐标格式有误"));
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
      d(U("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof et) && !nt(e)) {
      d(U("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof et)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof u ? i.toArray() : i);
      this._geometry.appendLinearRing(new et(t)._geometry);
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
    return new F(e[0], e[1], e[2], e[3]);
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
    return new Me(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!n(e)) {
      d(U("intersectsCoordinate", "参数coordinates不能为空"));
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
      d(U("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof F) && !be(e)) {
      d(U("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof F ? e.getExtent() : e;
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
const qi = "Circle", Le = y(qi);
class Ji extends Fe {
  constructor(e, t, i) {
    if (!n(e)) {
      d(Le("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Circle", e);
    else {
      if (!(e instanceof u) && !G(e)) {
        d(Le("constructor", "坐标格式有误"));
        return;
      }
      if (!n(t)) {
        d(Le("constructor", "radius参数不能为空"));
        return;
      }
      if (!p(t)) {
        d(Le("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
  _init(e, t) {
    let i = S(e);
    i && (this._geometry = new z.Circle(i, t), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(Le(e, "未正确实例化")), !1) : !0;
  }
}
const $e = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function re(r) {
  let e = null, t = r.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case $e.Point:
      e = new Me(r);
      break;
    case $e.LineString:
      e = new ft(r);
      break;
    case $e.Polygon:
      e = new oi(r);
      break;
    case $e.Circle:
      e = new Ji(r);
      break;
  }
  return e;
}
const X = {
  Distance: "Distance",
  Area: "Area"
}, Qi = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, Re = {
  measureStart: "measure:start",
  measureEnd: "measure:end"
}, st = {
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
}, er = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, ht = "omap-measure-marker", ot = "omap-measure-marker-index";
function tr(r) {
  let e = "Point", t = null;
  switch (r) {
    case X.Distance:
      e = st.LineString;
      break;
    case X.Area:
      e = st.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
let N = null, Z = null, Ie = null, gt = null, me = null, de = [], H = [];
function ir(r, e, t) {
  r === X.Distance ? Ie = e : r === X.Area && (gt = e), me = t;
}
function ai(r) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = r, e;
}
function rr(r, e) {
  if (N)
    if (N.children[0].innerHTML = Ke("总长", r), !e || e === "")
      N.children.length > 1 && N.removeChild(N.children[1]);
    else if (N.children.length > 1)
      N.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, N.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Ke("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    N = t;
  }
  return N;
}
function kt(r, e) {
  if (Z)
    if (Z.children[0].innerHTML = Ke("面积", r), !e || e === "")
      Z.children.length > 1 && Z.removeChild(Z.children[1]);
    else if (Z.children.length > 1)
      Z.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, Z.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Ke("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    Z = t;
  }
  return Z;
}
function nr(r) {
  let e = document.createElement("span");
  return e.title = "删除", e.innerHTML = "×", e.style.color = "#FFFFFF", e.style.cursor = "pointer", e.addEventListener("click", (t) => {
    n(r) && r();
  }), e;
}
function $t(r) {
  let e = new si(r);
  return H.push(e), e;
}
function Rt(r, e) {
  let t = document.createElement("div");
  t.className = `${ht}-${e}`, t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(255, 255, 255, 0.8)", t.style.color = "#000000", t.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  let i = document.createElement("span");
  if (i.style.color = "var(--omap-primary-color)", i.style.margin = "0 5px", i.innerHTML = r, t.appendChild(i), e !== 0) {
    let s = document.createElement("span");
    s.title = "删除", s.innerHTML = "×", s.style.color = "#000000", s.style.cursor = "pointer", t.setAttribute(ot, e.toString()), s.addEventListener("click", (a) => {
      console.log("点击删除");
      let l = t.getAttribute(ot);
      console.log(l), n(l) && sr(Number(l));
    }), t.appendChild(s);
  }
  return de.push(t), t;
}
function sr(r) {
  if (H.length === 2)
    return Ot(), de = [], H.forEach((e, t) => {
      Bt(t), t === H.length - 1 && (H = []);
    }), !1;
  Ot(r), de.splice(r, 1), de.forEach((e, t) => {
    e.className = `${ht}-${t}`, e.setAttribute(ot, t.toString());
  }), Bt(r), H.splice(r, 1), H.forEach((e, t) => {
    e.id = lt(t);
  }), or();
}
function Bt(r) {
  if (n(me)) {
    let e = me.getPopupById(`omap-measure-marker-${r}`);
    n(e) && me.removePopup(e);
  }
}
function Ot(r) {
  let e = Ie || gt;
  if (n(e)) {
    let t = e.getGeometry();
    if (n(t))
      if (n(r)) {
        let i = [];
        (t instanceof z.LineString || t instanceof z.Polygon) && (i = t.getCoordinates()), i.splice(r, 1), (t instanceof z.LineString || t instanceof z.Polygon) && t.setCoordinates(i);
      } else
        t instanceof z.LineString ? t.setCoordinates([]) : t instanceof z.Polygon && t.setCoordinates([]);
  }
}
function or() {
  if (Ie) {
    let r = Ie.getGeometry().getCoordinates();
    de.forEach((e, t) => {
      if (t > 0) {
        let i = new ft(r.slice(0, t + 1)), s = me.getLength(i);
        e.children[0].innerHTML = n(s) ? at(s) : "-";
      }
    });
  }
}
function at(r) {
  return (r / 1e3).toFixed(2) + " km";
}
function jt(r) {
  return (r / 1e6).toFixed(2) + " km²";
}
function lt(r) {
  return `${ht}-${r}`;
}
function Ke(r, e) {
  return `${r}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${e || "-"}</span>`;
}
function ar() {
  de.forEach((r) => {
    r.remove();
  }), H.forEach((r) => {
    me.removePopup(r);
  }), Ie = null, gt = null, setTimeout(() => {
    de = [], H = [];
  }, 200);
}
class li {
  constructor(e) {
    c(this, "popup");
    this.initPopup(e || "");
  }
  _isInitialized() {
    return !!n(this.popup);
  }
  initPopup(e) {
    let t = ai(e);
    this.popup = new si({
      id: "omap-measure-popup",
      element: t,
      offset: new D(0, -10)
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
const Q = new li("单击地图开始测量"), pe = new li(""), lr = "Measure", Vt = y(lr);
let Ut = null, ae = null;
class ut extends j {
  constructor(t, i) {
    if (!Object.values(X).includes(t)) {
      d(Vt("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    c(this, "mode", null);
    c(this, "result", {
      value: 0,
      unit: ""
    });
    let s = null;
    this.layer = new Ee({
      style: ri
    }), s = this.layer.getSource();
    let a = Object.assign({}, Qi, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: s,
      features: void 0,
      style: void 0
    });
    this._interaction = new O.Draw({
      ...tr(t),
      ...a
    }), this.mode = t, t === X.Distance ? this.result.unit = "km" : t === X.Area && (this.result.unit = "km²"), this.initInteractionEvent(), this.initMeasureEvent();
  }
  /**
   * 初始化 测量事件
   */
  initMeasureEvent() {
    this._isInitialized("initMeasureEvent") && (this._interaction.on("change:active", (t) => {
      this._interaction.getActive() ? this.onMeasureActive() : this.onMeasureInActive();
    }), this._interaction.on("drawstart", (t) => {
      this.events.emit(Re.measureStart, {
        target: this,
        type: Re.measureStart
      }), this.onMeasureStart(t.feature);
    }), this._interaction.on("drawend", (t) => {
      this.onMeasureEnd();
    }));
  }
  onMeasureActive() {
    n(this.map) && (ae || (ae = this.map._map.on("pointermove", (t) => {
      Q.updatePosition(t.coordinate);
    }))), this.result.value = 0;
  }
  onMeasureInActive() {
    ae && (mt.unByKey(ae), ae = null);
  }
  /**
   * 测量开始
   * @param feature 测量开始的feature
   */
  onMeasureStart(t) {
    var i;
    if (n(t)) {
      Ut = t, ir(this.mode, t, this.map);
      let s = 0;
      (i = Ut.getGeometry()) == null || i.on("change", (a) => {
        var f, h;
        const { target: l } = a;
        if (n(l)) {
          let v = l instanceof z.LineString ? l.getCoordinates().length : l.getCoordinates()[0].length;
          if (s === 0 && (s = v, l instanceof z.LineString)) {
            let b = Rt("起点", 0), V = $t({
              id: lt(0),
              element: b,
              offset: new D(0, -10)
            });
            V.setPosition(l.getCoordinates()[0]), this.map.addPopup(V);
          }
          let I;
          if (l instanceof z.LineString ? I = (f = this.map) == null ? void 0 : f.getLength(new ft(new M({
            geometry: l
          }))) : l instanceof z.Polygon && (I = (h = this.map) == null ? void 0 : h.getArea(new oi(new M({
            geometry: l
          })))), n(I) && p(I) && (this.result.value = I), n(I) && p(I) && l instanceof z.LineString) {
            let b = v >= 2 ? rr(at(I), I === 0 ? "" : "单击继续，双击结束测量") : ai("单击地图开始测量");
            Q.setElement(b);
          }
          if (l instanceof z.LineString) {
            if (v > s) {
              let b = v - 1 - 1, V = Rt(at(I), b), J = $t({
                id: lt(b),
                element: V,
                offset: new D(0, -10)
              });
              J.setPosition(l.getCoordinates()[l.getCoordinates().length - 1]), this.map.addPopup(J), s = v;
            }
          } else l instanceof z.Polygon && v >= 4 && (this.map.addPopup(pe.getPopup()), pe.setElement(kt(jt(I), "单击继续，双击结束测量")), pe.updatePosition(l.getInteriorPoint().getCoordinates()), Q.setElement(void 0), Q.updatePosition(void 0));
        } else
          o("target is undefined");
      });
    }
  }
  /**
   * 测量结束
   */
  onMeasureEnd() {
    if (this.setActive(!1), n(ae) && mt.unByKey(ae), this.mode, X.Distance, this.mode === X.Area) {
      const t = kt(jt(this.result.value));
      t.style.display = "flex", t.style.alignItems = "center", t.appendChild(nr(() => {
        var i;
        pe.updatePosition(void 0), pe.setElement(void 0), (i = this.layer) == null || i.clear();
      })), pe.setElement(t);
    }
    Q.updatePosition(void 0), Q.setElement(void 0), this.events.emit(Re.measureEnd, {
      target: this,
      type: Re.measureEnd
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
    this.map = t, this.map.addPopup(Q.getPopup()), this.onMeasureActive();
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(Vt("on", "参数不能为空"));
      return;
    }
    return this.events.on(t, i);
  }
  /**
   * 该移除的都移除掉
   */
  destroy() {
    Q.updatePosition(void 0), this.setActive(!1), n(this.layer) && this.layer.clear(), ar();
  }
}
let ur = "VectorLayer", P = y(ur);
class Ee extends k {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = n(t.source) ? t.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((a) => a.getFeature()) : []
    };
    this._layer = new he.Vector({
      source: new fe.Vector(s)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(P(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (n(i) && (this.target instanceof ct || this.target instanceof ut)) {
        let s = re(i);
        s ? this.features.push(s) : o(P("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
    n(t) && (t instanceof te ? i = t.getStyle() : w(t) && t.every((s) => s instanceof te) ? i = t.map((s) => s.getStyle()) : ye(t) ? i = (s, a) => {
      let l = g.getUid(s), f = this.features.findIndex((v) => g.getUid(v.getFeature()) === l), h = t(f !== -1 ? this.features[f] : null, a);
      return h ? h.getStyle() : void 0;
    } : o(P("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!n(t)) {
      o(P("setId", "参数id不能为空"));
      return;
    }
    if (!p(t) && !C(t)) {
      o(P("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((s) => n(s.getId()) && s.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!n(t)) {
      o(P("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof F) && !be(t)) {
      o(P("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let s = t instanceof F ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(s), l = [];
    return a.forEach((f) => {
      let h = g.getUid(f), v = this.features.findIndex((I) => g.getUid(I.getFeature()) === h);
      v !== -1 && l.push(this.features[v]);
    }), l;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!n(t)) {
      o(P("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !G(t)) {
      o(P("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof u ? t._lnglat : t;
    const s = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return s.forEach((l) => {
      let f = g.getUid(l), h = this.features.findIndex((v) => g.getUid(v.getFeature()) === f);
      h !== -1 && a.push(this.features[h]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!n(t)) {
        o(P("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!n(t) || !w(t)) {
        o(P("addFeatures", "参数格式有误不能为空"));
        return;
      }
      yt(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!n(t)) {
        o(P("removeFeature", "参数不能为空"));
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
      if (!n(t) || !w(t)) {
        o(P("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      yt(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!n(t) || !ye(t)) {
        o(P("forEachFeature", "参数格式有误"));
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
        o(P("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (s) => {
        let a = g.getUid(s), l = this.features.findIndex((f) => g.getUid(f.getFeature()) === a);
        n(l) && l !== -1 && i(this.features[l], 0);
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
        o(P("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (s) => {
        let a = g.getUid(s), l = this.features.findIndex((f) => g.getUid(f.getFeature()) === a);
        n(l) && l !== -1 && i(this.features[l], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!n(t)) {
      o(P("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !G(t)) {
      o(P("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let s = t instanceof u ? t._lnglat : t, a = i ? (h) => {
      let v = g.getUid(h), I = this.features.findIndex((b) => g.getUid(b.getFeature()) === v);
      return i(this.features[I]);
    } : void 0;
    const l = this._layer.getSource().getClosestFeatureToCoordinate(s, a);
    let f = this.features.findIndex((h) => g.getUid(h.getFeature()) === g.getUid(l));
    if (f !== -1)
      return this.features[f];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new F(t[0], t[1], t[2], t[3]);
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
        o(P("setStyle", "style参数不能为空"));
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
function cr(r) {
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
      e = "Circle", t = pi();
      break;
  }
  return { type: e, geometryFunction: t };
}
const dr = "Draw", Be = y(dr);
class ct extends j {
  constructor(e, t) {
    if (!Object.values(st).includes(e)) {
      d(Be("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof Ee ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : o(Be("init", "layer参数不属于VectorLayer类型"))), n(i) || (this.layer = new Ee({
      style: ri
    }), i = this.layer.getSource());
    let s = Object.assign({}, er, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new O.Draw({
      ...cr(e),
      ...s
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, s;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), n(t)) {
        let a = re(t);
        a ? (this.layer.addFeature(a), console.log((s = this.layer) == null ? void 0 : s.getFeatures())) : o(Be("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
      o(Be("appendCoordinates", "coordinates参数不能为空"));
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
let fr = "LayerGroup", K = y(fr);
class Nt {
  constructor(e, t) {
    /**
     * 图层组id
     * @type {IdType}
     */
    c(this, "id", null);
    c(this, "layers", []);
    c(this, "map", null);
    if (!n(e)) {
      d(K("constructor", "参数不能为空"));
      return;
    }
    let i = _(t, []);
    p(e) || C(e) ? this.id = e : i = e, console.log(i);
    const s = i.filter((a) => n(a) && n(a.getLayer()) && a instanceof k);
    s.length !== i.length && o(K("constructor", "图层参数错误，必须为BaseLayer实例，已进行过滤")), s.forEach((a) => {
      ue.set(a, {
        groupId: this.id
      });
    }), this.layers = s, s.forEach((a) => {
      ue.set(a, {
        groupId: this.id
      });
    });
  }
  /**
   * 添加图层
   * @param {BaseLayer} layer 图层实例
   */
  add(e) {
    if (!n(e)) {
      o(K("add", "参数layer不能为空"));
      return;
    }
    if (!(e instanceof k)) {
      o(K("add", "参数layer必须为BaseLayer实例"));
      return;
    }
    if (this.layers.some((i) => g.getUid(i.getLayer()) === g.getUid(e.getLayer()))) {
      o(K("add", "图层已存在"));
      return;
    }
    this.layers.push(e), ue.set(e, {
      groupId: this.id
    }), n(this.map) && this.map.addLayer(e);
  }
  remove(e) {
    if (!n(e)) {
      o(K("add", "参数layer不能为空"));
      return;
    }
    if (!(e instanceof k)) {
      o(K("add", "参数layer必须为BaseLayer实例"));
      return;
    }
    let t = this.layers.findIndex((i) => g.getUid(i.getLayer()) === g.getUid(e.getLayer()));
    if (t === -1) {
      o(K("remove", "图层不存在"));
      return;
    }
    this.layers.splice(t, 1), ue.set(e, {
      groupId: null
    }), n(this.map) && this.map.removeLayer(e);
  }
  removeById(e) {
    if (!n(e)) {
      o(K("removeById", "参数id不能为空"));
      return;
    }
    let t = this.layers.findIndex((s) => n(s.getId()) && s.getId() === e);
    if (t === -1) {
      o(K("remove", "图层不存在"));
      return;
    }
    let i = this.layers[t];
    ue.set(i, {
      groupId: null
    }), n(this.map) && this.map.removeLayer(i), this.layers.splice(t, 1);
  }
  clear() {
    n(this.map) && this.map.removeLayers(this.layers), setTimeout(() => {
      this.layers = [];
    }, 300);
  }
  getAllLayers() {
    return this.layers;
  }
  getAll() {
    return this.layers;
  }
  getId() {
    return this.id;
  }
  setMap(e) {
    this.map = e;
  }
}
const hr = {
  onFocusOnly: !1,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: !0,
  constrainResolution: !1
};
class gr extends j {
  constructor(e) {
    super("MouseWheelZoom"), this._interaction = new O.MouseWheelZoom(Object.assign({}, hr, e || {})), this.initInteractionEvent();
  }
}
const _r = {
  duration: 250,
  delta: 1
};
class pr extends j {
  constructor(e) {
    super("DoubleClickZoom"), this._interaction = new O.DoubleClickZoom(Object.assign({}, _r, e || {})), this.initInteractionEvent();
  }
}
const mr = {
  onFocusOnly: !1,
  kinetic: void 0
};
class yr extends j {
  constructor(e) {
    super("DragPan"), this._interaction = new O.DragPan(Object.assign({}, mr, e || {})), this.initInteractionEvent();
  }
}
const vr = [
  new gr(),
  new pr(),
  new yr()
], Ir = [], Oe = {
  pixelRatio: wi(),
  layers: [],
  controls: [],
  interactions: vr,
  popups: Ir
}, Zt = {
  hitTolerance: 0,
  checkWrapped: !0
};
function Kt(r) {
  return r.startsWith("map:");
}
function je(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new D(...t.pixel)), t.coordinate && (i.coordinate = new u(...t.coordinate));
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
const Er = "Map", m = y(Er);
let qn = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "layers", []);
    c(this, "layerGroups", []);
    c(this, "interactions", []);
    c(this, "controls", []);
    c(this, "events", null);
    c(this, "popups", []);
    let i = t;
    const s = i.view;
    if (!n(s)) {
      d(m("constructor", "view参数不能为空"));
      return;
    }
    let a = s.projection || new ce("EPSG:3857");
    C(a) && (a = new ce(a));
    const l = {
      ...s,
      center: s.center instanceof u ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof F ? s.extent._extent : s.extent,
      projection: a._projection
    }, f = new _t.View(l);
    let h = _(i.interactions, Oe.interactions), v = _(i.controls, Oe.controls), I = _(i.popups, Oe.popups), b = Object.assign({}, Oe, {
      ...i,
      interactions: [],
      overlays: [],
      view: f
    });
    b.target = e;
    const V = new _t.Map(b);
    this._view = f, this._map = V, n(h) && h.length > 0 && h.forEach((J) => {
      this.addInteraction(J);
    }), n(v) && v.length > 0 && v.forEach((J) => {
      this.addControl(J);
    }), n(I) && I.length > 0 && I.forEach((J) => {
      this.addPopup(J);
    }), this.events = new ve(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(m(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new R(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof R ? e._size : e;
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
      o(m("setCenter", "参数center不能为空"));
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
        o(m("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!p(e)) {
        o(m("setZoom", "参数zoom必须为number类型"));
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
        o(m("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!p(e)) {
        o(m("setResolution", "参数resolution必须为number类型"));
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
        o(m("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!p(e)) {
        o(m("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, s, a] = e;
    return new F(t, i, s, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !p(e)) {
        o(m("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !p(e)) {
        o(m("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  /** 图层管理相关 */
  /**
   * 添加图层
   * @param {BaseLayer} layer 图层对象
   */
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!n(e)) {
      o(m("addLayer", "图层对象不能为空"));
      return;
    }
    if (!(e instanceof k)) {
      o(m("addLayer", "图层对象必须为BaseLayer类型"));
      return;
    }
    const t = e.getId();
    let i = !1;
    if (n(t) ? i = this.getLayerById(t) !== void 0 : i = this.layers.some((s) => g.getUid(s.getLayer()) === g.getUid(e.getLayer())), i) {
      o(m("addLayer", "图层已存在"));
      return;
    }
    n(e.getLayer()) && (this.layers.push(e), e.setTarget(this), this._map.addLayer(e.getLayer()));
  }
  /**
   * 添加多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  addLayers(e) {
    if (this._isInitialized("addLayer")) {
      if (!n(e)) {
        o(m("addLayer", "参数layers不能为空"));
        return;
      }
      if (!w(e)) {
        o(m("addLayers", "参数layers必须为数组类型"));
        return;
      }
      e.forEach((t) => {
        this.addLayer(t);
      });
    }
  }
  /**
   * 根据id获取图层
   * @param {BaseLayerIdType} id 图层id
   * @returns {BaseLayer | undefined} 图层对象
   */
  getLayerById(e) {
    if (!n(e)) {
      o(m("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof k && n(i.getId()) && i.getId() === e && (t = i);
    }), t;
  }
  /**
   * 移除图层
   * @param {BaseLayer} layer 图层对象
   */
  removeLayer(e) {
    if (!this._isInitialized("removeLayer")) return;
    let t = this.layers.indexOf(e);
    t !== -1 && e._layer && (this.layers.splice(t, 1), this._map.removeLayer(e._layer));
  }
  /**
   * 移除多个图层
   * @param {Array<BaseLayer>} layers 图层数组
   */
  removeLayers(e) {
    this._isInitialized("removeLayers") && this.layers.forEach((t, i) => {
      e.includes(t) && t._layer && (this.layers.splice(i, 1), this._map.removeLayer(t._layer));
    });
  }
  /**
   * 根据id移除图层
   * @param {BaseLayerIdType} id 图层id
   */
  removeLayerById(e) {
    if (!this._isInitialized("removeLayerById")) return;
    if (!n(e)) {
      o(m("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!n(t))
      return o(m("removeLayerById", `找不到id为${e}(${C(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  /**
   * 获取所有图层
   * @returns {Array<BaseLayer>} 图层数组
   */
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  /** 图层组管理 */
  /**
   * 添加图层组
   * @param {LayerGroup} group 图层组实例
   */
  addLayerGroup(e) {
    if (!this._isInitialized("addLayerGroup")) return;
    if (!n(e)) {
      o(m("addLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(e instanceof Nt)) {
      o(m("addLayerGroup", "参数layerGroup必须为LayerGroup实例"));
      return;
    }
    let t = !1;
    e.getId() && (t = this.layerGroups.some((i) => n(i.getId()) && i.getId() === e.getId())), t || (e.setMap(this), this.layerGroups.push(e), this.addLayers(e.getAllLayers()));
  }
  /**
   * 移除图层组
   * @param {LayerGroup} group 图层组实例
   */
  removeLayerGroup(e) {
    if (!this._isInitialized("removeLayerGroup")) return;
    if (!n(e)) {
      o(m("removeLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(e instanceof Nt)) {
      o(m("removeLayerGroup", "参数layerGroup必须为LayerGroup实例"));
      return;
    }
    let t = -1;
    e.getId() && (t = this.layerGroups.findIndex((i) => n(i.getId()) && i.getId() === e.getId())), t !== -1 && (e.setMap(null), this.removeLayers(e.getAllLayers()), this.layerGroups = this.layerGroups.splice(t, 1));
  }
  /**
   * 移除图层组
   * @param {LayerGroupIdType} groupId 图层组id
   */
  removeLayerGroupById(e) {
    if (!this._isInitialized("removeLayerGroupById")) return;
    if (!n(e)) {
      o(m("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!p(e) && !C(e)) {
      o(m("removeLayerGroupById", "参数groupId必须为number或string类型"));
      return;
    }
    let t = this.layerGroups.findIndex((i) => n(i.getId()) && i.getId() === e);
    t !== -1 && (this.layerGroups[t].setMap(null), this.removeLayers(this.layerGroups[t].getAllLayers()), this.layerGroups = this.layerGroups.splice(t, 1));
  }
  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getAllLayerGroups() {
    if (this._isInitialized("getAllLayerGroups"))
      return this.layerGroups;
  }
  /**
   * 获取所有图层组
   * @returns {LayerGroup[]} 所有图层组
   */
  getLayerGroups() {
    return this.getAllLayerGroups();
  }
  getLayerGroupById(e) {
    if (!this._isInitialized("getLayerGroupById")) return;
    if (!n(e)) {
      o(m("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!p(e) && !C(e)) {
      o(m("removeLayerGroupById", "参数groupId必须为number或string类型"));
      return;
    }
    let t = this.layerGroups.findIndex((i) => n(i.getId()) && i.getId() === e);
    if (t === -1) {
      o(m("getLayerGroupById", "未找到图层组"));
      return;
    }
    return this.layerGroups[t];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(m("on", "参数不能为空"));
      return;
    }
    let i = Kt(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || a.length === 0) && (i ? s.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, je(this, e, f));
    }) : s.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, je(this, e, f));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(m("un", "参数不能为空"));
        return;
      }
      if (!p(e)) {
        o(m("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(m("on", "参数不能为空"));
      return;
    }
    let i = Kt(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || a.length === 0) && (i ? s.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, je(this, e, f));
    }) : s.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, je(this, e, f));
    })), this.events.once(e, t);
  }
  /** 属性管理 */
  getProperties() {
    if (this._isInitialized("getProperties"))
      return _(this._map.getProperties(), {});
  }
  setProperties(e) {
    if (!this._isInitialized("setProperties")) return;
    if (!n(e)) {
      o(m("setProperties", A.paramsNotDefined("properties")));
      return;
    }
    if (!ie(e)) {
      o(m("setProperties", A.paramsInvaildFormat("properties", "object类型")));
      return;
    }
    const t = Object.assign({}, _(this.getProperties(), {}), e);
    this._map.setProperties(t);
  }
  /** 交互管理 */
  /**
   * 添加交互
   * @param {Interaction} interaction 交互对象
   */
  addInteraction(e) {
    var i;
    if (this.interactions.findIndex((s) => g.getUid(s._interaction) === g.getUid(e._interaction)) !== -1) {
      o(m("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof ct || e instanceof ut) {
      const s = e.getLayer();
      n(s) && (s.setTarget(e), this.addLayer(s));
    }
    n(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction), e.setMap && e.setMap(this), e.setActive(!0));
  }
  /**
   * 获取所有交互
   * @returns {Interaction[] | undefined} 交互数组
   */
  getInteractions() {
    if (this._isInitialized("getInteractions"))
      return this.interactions;
  }
  /**
   * 移除交互
   * @param {Interaction} interaction 交互对象
   */
  removeInteraction(e) {
    var i;
    let t = this.interactions.findIndex((s) => g.getUid(s._interaction) === g.getUid(e._interaction));
    if (t === -1) {
      o(m("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (n(e._interaction)) {
      if (this.interactions.splice(t, 1), (i = this._map) == null || i.removeInteraction(e._interaction), e instanceof ct || e instanceof ut) {
        const s = e.getLayer();
        n(s) && this.removeLayer(s);
      }
      e.setMap && e.setMap(null);
    }
  }
  /**
   * 控件管理
   */
  /**
   * 添加控件
   * @param {Control} control 控件对象
   */
  addControl(e) {
    if (!this._isInitialized("addControl")) return;
    if (this.controls.findIndex((i) => g.getUid(i.getControl()) === g.getUid(e.getControl())) !== -1) {
      o(m("addControl", "该控件已添加到地图中"));
      return;
    }
    n(e.getControl()) && (this.controls.push(e), this._map.addControl(e.getControl()));
  }
  /**
   * 获取所有控件
   * @returns {Control[] | undefined} 控件数组
   */
  getControls() {
    if (this._isInitialized("getControls"))
      return this.controls;
  }
  /**
   * 根据ID获取控件
   * @param {number | string} id 控件ID
   * @returns {Control | undefined} 控件对象
   */
  getControlById(e) {
    return this._isInitialized("getControlById") ? this.controls.find((i) => i.getId() === e) : void 0;
  }
  /**
   * 移除控件
   * @param {Control} control 控件对象
   */
  removeControl(e) {
    if (!this._isInitialized("removeControl")) return;
    let t = this.controls.findIndex((i) => g.getUid(i.getControl()) === g.getUid(e.getControl()));
    if (t === -1) {
      o(m("removeControl", "该控件未添加到地图中"));
      return;
    }
    n(e.getControl()) && (this.controls.splice(t, 1), this._map.removeControl(e.getControl()));
  }
  // 弹窗管理
  /**
   * 添加弹窗
   * @param popup 
   */
  addPopup(e) {
    if (!this._isInitialized("addPopup") || !n(e)) return;
    if (this.popups.findIndex((i) => g.getUid(i.getPopup()) === g.getUid(e.getPopup())) !== -1) {
      o(m("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    n(e.getPopup()) && (this.popups.push(e), e.setMap && e.setMap(this), this._map.addOverlay(e.getPopup()));
  }
  /**
   * 根据ID获取弹窗
   * @param {number | string} id 弹窗ID
   * @returns {Popup} 弹窗对象
   */
  getPopupById(e) {
    if (!this._isInitialized("getPopupById")) return;
    if (!n(e)) {
      o(m("getPopupById", "参数不能为空"));
      return;
    }
    if (!p(e) && !C(e)) {
      o(m("getPopupById", "参数必须为数字或字符串"));
      return;
    }
    return this.popups.find((i) => n(i.getId()) && i.getId() === e);
  }
  getPopupByProperties(e) {
    if (!this._isInitialized("getPopupByProperties")) return;
    if (!n(e)) {
      o(m("getPopupById", "参数不能为空"));
      return;
    }
    if (!ye(e)) {
      o(m("getPopupById", "参数必须为数字或字符串"));
      return;
    }
    return this.popups.filter((i) => n(i.getProperties()) ? e(i.getProperties()) : !1);
  }
  /**
   * 获取所有弹窗
   * @returns {Popup[]} 弹窗数组
   */
  getPopups() {
    if (this._isInitialized("getPopups"))
      return this.popups;
  }
  /**
   * 删除弹窗
   * @param {Popup} popup 弹窗对象
   */
  removePopup(e) {
    if (!this._isInitialized("removePopup") || !n(e)) return;
    let t = this.popups.findIndex((i) => g.getUid(i.getPopup()) === g.getUid(e.getPopup()));
    if (t == -1) {
      o(m("removePopup", "该弹窗未添加到地图中"));
      return;
    }
    n(e.getPopup()) && (this.popups.splice(t, 1), e.setMap && e.setMap(null), this._map.removeOverlay(e.getPopup()));
  }
  /** 几何图形计算 */
  getLength(e) {
    return this._isInitialized("getLength") ? pt.getLength(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  getArea(e) {
    return this._isInitialized("getArea") ? pt.getArea(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  /**
   * @TODO
   * 遍历地图上指定像素位置的所有特征
   * @param pixel 像素位置
   * @param callback 回调函数
   */
  forEachFeatureAtPixel(e, t, i) {
    if (!this._isInitialized("forEachFeatureAtPixel") || !_e(e)) return;
    const s = Object.assign({}, Zt, i), a = this._map.forEachFeatureAtPixel(_e(e), (l, f) => {
      console.log(l, f);
      let h = null, v = null;
      return this.layers.forEach((I) => {
        if (g.getUid(I.getLayer()) === g.getUid(f) && (v = I), I instanceof Ee) {
          let b = _(I.getFeatures(), []);
          console.log(b), b.forEach((V) => {
            console.log("目标uid" + g.getUid(l)), console.log("当前uid" + g.getUid(V.getFeature())), g.getUid(l) === g.getUid(V.getFeature()) && (h = V);
          });
        }
      }), t(h, v);
    }, {
      ...s,
      layerFilter: (l) => {
        if (!n(s.layerFilter)) return !0;
        const f = this.layers.find((h) => g.getUid(h) === g.getUid(l));
        return n(f) ? s.layerFilter(f) : !1;
      }
    });
    return console.log(a), a;
  }
  getCoordinateFromPixel(e) {
    if (!this._isInitialized("getCoordinateFromPixel") || !_e(e)) return;
    const t = this._map.getCoordinateFromPixel(_e(e));
    return new u(...t);
  }
  getPixelFromCoordinate(e) {
    if (!this._isInitialized("getPixelFromCoordinate") || !S(e)) return;
    const t = this._map.getPixelFromCoordinate(S(e));
    return new D(...t);
  }
  getEventCoordinate(e) {
    if (this._isInitialized("getEventCoordinate"))
      return new u(...this._map.getEventCoordinate(e));
  }
  getEventPixel(e) {
    if (this._isInitialized("getEventPixel"))
      return new D(...this._map.getEventPixel(e));
  }
  getFeaturesAtPixel(e, t) {
    if (!this._isInitialized("getFeaturesAtPixel") || !_e(e)) return;
    const i = Object.assign({}, Zt, t);
    let s = this._map.getFeaturesAtPixel(_e(e), {
      ...i,
      layerFilter: (f) => {
        if (!n(i.layerFilter)) return !0;
        const h = this.layers.find((v) => g.getUid(v) === g.getUid(f));
        return n(h) ? i.layerFilter(h) : !1;
      }
    }), a = s.map((f) => g.getUid(f));
    if (!n(s)) return [];
    const l = [];
    return this.layers.forEach((f) => {
      f instanceof Ee && _(f.getFeatures(), []).forEach((v) => {
        a.includes(g.getUid(v.getFeature())) && l.push(v);
      });
    }), l;
  }
  hasFeatureAtPixel(e, t) {
    const i = this.getFeaturesAtPixel(e, t);
    return n(i) && i.length > 0;
  }
  render() {
    this._isInitialized("render") && this._map.render();
  }
  renderSync() {
    this._isInitialized("renderSync") && this._map.renderSync();
  }
  updateSize() {
    this._isInitialized("updateSize") && this._map.updateSize();
  }
};
function Wt(r) {
  let e = r.some((t) => !(t instanceof u) && !G(t));
  return w(r) && !e;
}
const Fr = "MultiPoint", le = y(Fr);
class Qn extends Fe {
  constructor(e, t) {
    if (!n(e)) {
      d(le("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("MultiPoint", e);
    else {
      if (!Wt(e)) {
        d(le("constructor", "坐标格式有误"));
        return;
      }
      super("MultiPoint", e), n(t) && ie(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => S(s));
    i && (this._geometry = new z.MultiPoint(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(le(e, "未正确实例化")), !1) : !0;
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
      d(le("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Wt(e)) {
      d(le("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  appendPoint(e) {
    if (!this._isInitialized("appendPoint") || !n(e)) return;
    let t = null;
    if (e instanceof Me ? t = e.getGeometry() : e instanceof u ? t = new z.Point(e.toArray()) : G(e) && (t = new z.Point(e)), !n(t)) {
      d(le("appendPoint", "参数格式有误"));
      return;
    }
    this._geometry.appendPoint(t);
  }
  getClosestPoint(e) {
    if (!this._isInitialized("getClosestPoint") || !n(e)) return;
    let t = null;
    if (e instanceof Me ? t = e.getCoordinates().toArray() : e instanceof u ? t = e.toArray() : G(e) && (t = e), !n(t)) return;
    let i = this._geometry.getClosestPoint(t);
    return new u(...i);
  }
  getExtent() {
    if (this._isInitialized("getExtent"))
      return new F(...this._geometry.getExtent());
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
    if (!p(e)) {
      o(le("getPoint", "参数index格式有误"));
      return;
    }
    let t = this._geometry.getPoint(e);
    return new Me(t.getCoordinates());
  }
  intersectsCoordinate(e) {
    if (!this._isInitialized("intersectsCoordinate") || !n(e)) return;
    let t = S(e);
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
function $(r) {
  if (n(r))
    return r instanceof R ? r.toArray() : r;
}
function Ge(r) {
  if (n(r))
    return r instanceof q ? r.getColor() : r;
}
const es = {
  Vec: "vec",
  Img: "img",
  Road: "road"
}, zr = {
  preload: 0,
  cacheSize: 512
}, xr = {
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
}, Ar = {
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
function Yt(r) {
  return Ar[r];
}
let wr = "GaodeLayer", Pr = y(wr);
class ts extends k {
  constructor(t, i) {
    super("Gaode", _(i, {}));
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    if (!n(t)) {
      d(Pr("GaodeLayer", "type参数不能为空"));
      return;
    }
    let s = Object.assign({}, zr, {
      ..._(i, {}),
      source: void 0,
      map: void 0
    });
    this.gaodeType = t;
    let a = Object.assign({}, xr, {
      ..._(i == null ? void 0 : i.source, {})
    }), l;
    if (n(i) && n(i.source)) {
      let f;
      n(a.tileGrid) && (f = new He.TileGrid({
        ...a.tileGrid,
        extent: E(a.tileGrid.extent),
        origin: S(a.tileGrid.origin),
        origins: n(a.tileGrid.origins) ? a.tileGrid.origins.map((h) => h instanceof u ? S(h) : h) : void 0,
        sizes: n(a.tileGrid.sizes) ? a.tileGrid.sizes.map((h) => h instanceof R ? $(h) : h) : void 0,
        tileSize: n(a.tileGrid.tileSize) ? p(a.tileGrid.tileSize) ? a.tileGrid.tileSize : $(a.tileGrid.tileSize) : void 0,
        tileSizes: n(a.tileGrid.tileSizes) ? a.tileGrid.tileSizes.map((h) => h instanceof R ? $(h) : h) : void 0
      })), l = new fe.XYZ({
        ...a,
        urls: Yt(this.gaodeType),
        tileGrid: f
      });
    } else
      l = new fe.XYZ({
        ...a,
        urls: Yt(this.gaodeType)
      });
    this._layer = new he.Tile({
      ...s,
      extent: n(s.extent) ? E(s.extent) : void 0,
      background: n(s.background) ? Ge(s.background) : void 0,
      source: l
    }), this._initLayerEvent();
  }
}
const Cr = "ProjUtil", Ht = y(Cr);
class is {
  static fromLonLat(e, t) {
    if (!n(e)) {
      o(Ht("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? C(t) ? new ce(t) : t : new ce("EPSG:3857"), a = it.fromLonLat(i, s._projection);
    return new u(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!n(e)) {
      o(Ht("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? C(t) ? new ce(t) : t : new ce("EPSG:3857"), a = it.toLonLat(i, s._projection);
    return new u(a[0], a[1]);
  }
}
const tt = "OMapToken", Lr = {
  tdt: null
};
function Sr(r, e) {
  window[tt] || (window[tt] = {}), window[tt][r] = e;
}
const ui = new Proxy(Lr, {
  set: function(r, e, t, i) {
    return Sr(e, t), Reflect.set(r, e, t, i);
  }
}), Y = {
  GeoJSON: "GeoJSON",
  WKT: "WKT",
  KML: "KML"
}, ne = {};
function Mr(r) {
  return Object.values(Y).includes(r);
}
function br() {
  return {
    dataProjection: "EPSG:4326",
    extractGeometryName: !1
  };
}
function Gr() {
  return {
    splitCollection: !1
  };
}
function Tr() {
  return {
    extractStyles: !1,
    showPointNames: !1,
    writeStyles: !1,
    crossOrigin: null
  };
}
function Dr(r) {
  switch (r) {
    case Y.GeoJSON:
      return br();
    case Y.WKT:
      return Gr();
    case Y.KML:
      return Tr();
    default:
      return {};
  }
}
function We(r) {
  if (n(r))
    return r instanceof ce ? r.getProjection() : r;
}
function kr(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return re(i);
}
function $r(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => re(a));
}
function Rr(r, e) {
  return T().writeFeature(r.getFeature(), Object.assign({}, ne, _(e, {})));
}
function Br(r, e) {
  return T().writeFeatureObject(r.getFeature(), Object.assign({}, ne, _(e, {})));
}
function Or(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ne, _(e, {})));
}
function jr(r, e) {
  return T().writeFeaturesObject(r.map((s) => s.getFeature()), Object.assign({}, ne, _(e, {})));
}
const Vr = {
  readFeature: kr,
  readFeatures: $r,
  writeFeature: Rr,
  writeFeatureObject: Br,
  writeFeatures: Or,
  writeFeaturesObject: jr
};
function Ur(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return re(i);
}
function Nr(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => re(a));
}
function Zr(r, e) {
  return T().writeFeature(r.getFeature(), Object.assign({}, ne, _(e, {})));
}
function Kr(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ne, _(e, {})));
}
const Wr = {
  readFeature: Ur,
  readFeatures: Nr,
  writeFeature: Zr,
  writeFeatures: Kr
}, Yr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wr
}, Symbol.toStringTag, { value: "Module" }));
function Hr(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return re(i);
}
function Xr(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => re(a));
}
function qr(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ne, _(e, {})));
}
function Jr(r, e) {
  return T().writeFeaturesObject(r.map((s) => s.getFeature()), Object.assign({}, ne, _(e, {})));
}
const Qr = {
  readFeature: Hr,
  readFeatures: Xr,
  writeFeatures: qr,
  writeFeaturesNode: Jr
}, en = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Qr
}, Symbol.toStringTag, { value: "Module" }));
let ci = null;
function tn(r) {
  ci = r;
}
function T() {
  return ci;
}
function rn(r) {
  let e = null;
  switch (r) {
    case Y.GeoJSON:
      e = Vr;
      break;
    case Y.WKT:
      e = Yr;
      break;
    case Y.KML:
      e = en;
      break;
  }
  return e;
}
function ze(r, e, ...t) {
  const i = rn(r);
  if (n(i) && n(i[e]))
    return i[e](...t);
  d(dt(e, `当前格式化工具不支持${e}方法`));
}
function nn(r, e, t) {
  return ze(r, "readFeature", e, t);
}
function sn(r, e, t) {
  return ze(r, "readFeatures", e, t);
}
function on(r, e, t) {
  return ze(r, "writeFeature", e, t);
}
function an(r, e, t) {
  return ze(r, "writeFeatureObject", e, t);
}
function ln(r, e, t) {
  return ze(r, "writeFeatures", e, t);
}
function un(r, e, t) {
  return ze(r, "writeFeaturesObject", e, t);
}
const cn = "Format", dt = y(cn);
class rs {
  constructor(e, t) {
    c(this, "type");
    c(this, "options");
    c(this, "_format");
    if (!n(e)) {
      d(dt("constructor", "初始化参数有误"));
      return;
    }
    if (!Mr(e)) {
      d(dt("constructor", "初始化参数有误"));
      return;
    }
    this.type = e, this.options = _(Object.assign({}, Dr(e), t), {}), this._initFormat();
  }
  /**
   * 初始化
   */
  _initFormat() {
    switch (this.type) {
      case Y.GeoJSON:
        this._format = new qe.GeoJSON({
          ...this.options,
          dataProjection: We(this.options.dataProjection),
          featureProjection: We(this.options.featureProjection)
        });
        break;
      case Y.WKT:
        this._format = new qe.WKT({
          ...this.options
        });
        break;
      case Y.KML:
        this._format = new qe.KML({
          ...this.options,
          defaultStyle: _($i(this.options.defaultStyle), void 0)
        });
        break;
    }
    tn(this._format);
  }
  readFeature(e, t) {
    return nn(this.type, e, t);
  }
  readFeatures(e, t) {
    return sn(this.type, e, t);
  }
  writeFeature(e, t) {
    return on(this.type, e, t);
  }
  writeFeatureObject(e, t) {
    return an(this.type, e, t);
  }
  writeFeatures(e, t) {
    return ln(this.type, e, t);
  }
  writeFeaturesObject(e, t) {
    return un(this.type, e, t);
  }
}
const dn = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function fn(r, e) {
  return dn.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, ui.tdt);
}
let hn = "TdtLayer", Xt = y(hn);
class ns extends k {
  constructor(t, i) {
    var a, l, f;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!n(ui.tdt)) {
      o(Xt("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(t)) {
      d(Xt("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    this.tdtType = t, this._layer = new he.Tile({
      ...s,
      extent: n(s.extent) ? (a = s.extent) == null ? void 0 : a._extent : void 0,
      map: n(s.map) ? (l = s.map) == null ? void 0 : l._map : void 0,
      background: n(s.background) ? (f = s.background) == null ? void 0 : f._color : void 0,
      source: new fe.XYZ({
        url: fn(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
const ss = {
  Vec: "vec",
  // 矢量底图
  Img: "img",
  // 影像底图
  Ter: "ter",
  // 地形底图
  Cva: "cva",
  // 矢量注记
  Cia: "cia",
  // 影像注记
  Cta: "cta"
  // 地形注记
}, gn = {
  preload: 0,
  useInterimTilesOnError: !0,
  cacheSize: 512
};
let _n = "TileLayer", pn = y(_n);
class os extends k {
  constructor(e) {
    if (super("Tile", _(e, {})), !n(e.source)) {
      d(pn("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, {
      ...gn
    }, {
      ...e,
      source: void 0,
      map: void 0
    });
    _(e.source, {}), this._layer = new he.Tile({
      // 以下这些是基础属性赋值
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ge(t.background) : void 0
    }), this._initLayerEvent();
  }
}
const mn = {
  preload: 0,
  cacheSize: 512
}, yn = {
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
let vn = "TileLayer", In = y(vn);
class as extends k {
  constructor(e) {
    if (super("XYZ", _(e, {})), !n(e.source)) {
      d(In("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, mn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, yn, {
      ..._(e.source, {})
    }), s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new He.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: S(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? S(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof R ? $(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? p(i.tileGrid.tileSize) ? i.tileGrid.tileSize : $(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof R ? $(l) : l) : void 0
      })), s = new fe.XYZ({
        ...i,
        tileGrid: a
      });
    }
    this._layer = new he.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ge(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const En = {
  preload: 0,
  cacheSize: 512
}, Fn = {
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
let zn = "WMTSLayer", xn = y(zn);
class ls extends k {
  constructor(e) {
    if (super("WMS", _(e, {})), !n(e.source)) {
      o(xn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, En, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, Fn, {
      ..._(e.source, {})
    });
    console.log("_sourceParams"), console.log(i);
    let s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new He.WMTS({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: S(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? S(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof R ? $(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? p(i.tileGrid.tileSize) ? i.tileGrid.tileSize : $(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof R ? $(l) : l) : void 0
      })), s = new fe.WMTS({
        ...i,
        projection: We(i.projection),
        tileGrid: a
      });
    }
    this._layer = new he.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ge(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const An = {
  preload: 0,
  cacheSize: 512
}, wn = {
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
let Pn = "WMSLayer", Cn = y(Pn);
class us extends k {
  constructor(e) {
    if (super("WMS", _(e, {})), !n(e.source)) {
      o(Cn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, An, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, wn, {
      ..._(e.source, {})
    }), s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new He.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: S(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? S(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof R ? $(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? p(i.tileGrid.tileSize) ? i.tileGrid.tileSize : $(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof R ? $(l) : l) : void 0
      })), s = new fe.TileWMS({
        ...i,
        projection: We(i.projection),
        tileGrid: a
      });
    }
    this._layer = new he.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? Ge(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
function qt(r, e, t) {
  return {
    target: r,
    type: e,
    pixel: new D(t.pixel[0], t.pixel[1]),
    coordinate: new u(t.coordinate[0], t.coordinate[1])
  };
}
const Ln = "DragBox", Ve = y(Ln);
class cs extends j {
  constructor(e) {
    super("DragBox"), this._interaction = new O.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && ye(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new u(t.coordinate[0], t.coordinate[1]),
          pixel: new D(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new ve(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(Ve("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, qt(this, e, a));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(Ve("un", "参数不能为空"));
        return;
      }
      if (!p(e)) {
        o(Ve("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(Ve("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, qt(this, e, a));
    }), this.events.once(e, t);
  }
}
const Sn = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class ds extends j {
  constructor(e) {
    super("Extent"), this._interaction = new O.Extent(Object.assign({}, Sn, e || {})), this.initInteractionEvent();
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._interaction.getExtent();
    return e ? new F(e[0], e[1], e[2], e[3]) : void 0;
  }
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof F ? e.toArray() : e;
    this._interaction.setExtent(t);
  }
}
function Jt(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const Mn = "Modify", ee = y(Mn), bn = {
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
let fs = class extends j {
  constructor(t) {
    super("Modify");
    c(this, "records", []);
    let i = null;
    n(t.layer) || d(ee("init", "layer参数不能为空")), n(t.layer) && !(t.layer instanceof Ee) && d(ee("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let s = Object.assign({}, bn, {
      ...t,
      source: i
    });
    this._interaction = new O.Modify(s), this.initInteractionEvent(), this.initModifyEvent();
  }
  initModifyEvent() {
    if (!this._isInitialized("initModifyEvent")) return;
    let i = (this.layer.getFeatures() || []).map((s) => ({
      id: s.id,
      originFeatureId: g.getUid(s._feature),
      type: s.type,
      coordinates: s.getCoordinates()
    }));
    this.records.push({
      time: It(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (s) => {
      let a = s.features.getArray(), l = [];
      a.forEach((f) => {
        let h = this.layer.getFeatures().find((v) => g.getUid(v._feature) === g.getUid(f));
        h && l.push({
          id: h.id,
          originFeatureId: g.getUid(h._feature),
          type: h.type,
          coordinates: h.getCoordinates()
        });
      }), this.records.push({
        time: It(),
        features: l,
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
      o(ee("insertPoint", "coordinates参数不能为空"));
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
      o(ee("removePoint", "coordinates参数不能为空"));
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
    const { features: a } = this.records[s];
    return a.forEach((l) => {
      let f = this.layer.getFeatures().find((h) => l.id ? l.id === h.id : g.getUid(h._feature) === l.originFeatureId);
      f && f.setCoordinates(l.coordinates);
    }), this.records.splice(s + 1), !0;
  }
  /**
   * 取消当前全部修改，也就是回到初始状态
   */
  cancel() {
    const { features: t } = this.records[0];
    t.forEach((i) => {
      let s = this.layer.getFeatures().find((a) => i.id ? i.id === a.id : g.getUid(a._feature) === i.originFeatureId);
      s && s.setCoordinates(i.coordinates);
    }), this.records = [
      this.records[0]
    ];
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(ee("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Jt(this, t, l));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        o(ee("un", "参数不能为空"));
        return;
      }
      if (!p(t)) {
        o(ee("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(ee("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Jt(this, t, l));
    }), this.events.once(t, i);
  }
}, Ye = [], di = [];
function Gn(r) {
  Ye = r;
}
function Tn(r) {
  di = r, Ye = [];
}
function Ue(r) {
  let e = null;
  if (Ye.length)
    for (const t of Ye) {
      let i = t.getFeatures().find((s) => g.getUid(s._feature) === r);
      i && (e = i);
    }
  else
    e = di.find((t) => g.getUid(t._feature) === r);
  return e;
}
function Qt(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const Dn = "Select", Se = y(Dn), kn = {
  layers: void 0,
  style: void 0,
  multi: !1,
  // 当为true的时候，支持一次选择n个重叠的要素
  features: void 0,
  filter: void 0,
  hitTolerance: 0
};
class gs extends j {
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
    n(t == null ? void 0 : t.layers) && (Gn(t.layers), i = t.layers.map((s) => s._layer)), n(t == null ? void 0 : t.features) && Tn(t.features), this._interaction = new O.Select(Object.assign({}, kn, {
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
    return n(t) && (t instanceof te ? i = t.getStyle() : w(t) && t.every((s) => s instanceof te) ? i = t.map((s) => s.getStyle()) : ye(t) ? i = (s, a) => {
      let l = g.getUid(s), f = Ue(l), h = t(f, a);
      return h ? h.getStyle() : void 0;
    } : o(Se("initStyle", "style格式有误"))), i;
  }
  initFilter(t) {
    if (n(t))
      return (i, s) => {
        var f;
        let a = Ue(g.getUid(i)), l = (f = this.map) == null ? void 0 : f.getAllLayers().find((h) => g.getUid(h._layer) === g.getUid(s));
        return t(a, l);
      };
  }
  /**
   * 初始化Select事件
   */
  initSelectEvent() {
    this._isInitialized("initSelectEvent") && this._interaction.on("select", (t) => {
      const { selected: i, deselected: s } = t;
      this.selected = i.map((a) => Ue(g.getUid(a))).filter((a) => a !== null), this.deselected = s.map((a) => Ue(g.getUid(a))).filter((a) => a !== null);
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
      o(Se("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      console.log("select", l), this.events.emit(t, Object.assign({}, Qt(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        o(Se("un", "参数不能为空"));
        return;
      }
      if (!p(t) && !C(t)) {
        o(Se("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(Se("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Object.assign({}, Qt(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.once(t, i);
  }
}
const $n = {
  animate: !0,
  params: ["x", "y", "z", "r", "l"],
  replace: !1,
  prefix: ""
};
class _s extends j {
  constructor(e) {
    super("Link");
    let t = {
      ...e,
      animate: n(e == null ? void 0 : e.animate) && !ii(e == null ? void 0 : e.animate) ? {
        ...e.animate,
        center: e.animate.center instanceof u ? e.animate.center.toArray() : e.animate.center
      } : _(e == null ? void 0 : e.animate, !0)
    };
    this._interaction = new O.Link(Object.assign({}, $n, t)), this.initInteractionEvent();
  }
}
const Rn = {
  duration: 100,
  delta: 1
};
class ps extends j {
  constructor(e) {
    super("KeyboardZoom"), this._interaction = new O.KeyboardZoom(Object.assign({}, Rn, e || {})), this.initInteractionEvent();
  }
}
class ms {
  constructor() {
  }
}
const ei = {
  className: "ol-full-screen",
  activeClassName: "ol-full-screen-true",
  inactiveClassName: "ol-full-screen-false",
  tipLabel: "全屏",
  keys: !1
}, Bn = "Control", On = y(Bn);
class fi {
  // map: Map | null = null;
  constructor(e) {
    c(this, "id", null);
    /**
     * 交互类型
     * @type {OMapControlType | null}
     */
    c(this, "type", null);
    /**
     * 交互实例
     * @type {OlInteractionInstanceType}
     */
    c(this, "_control");
    /**
     * 交互事件
     * @type {Event}
     */
    c(this, "events", new ve());
    this.type = e;
  }
  _isInitialized(e) {
    return n(this._control) ? !0 : (o(On(e, "未正确实例化")), !1);
  }
  /**
   * 获取控制实例
   */
  getControl() {
    return this._control;
  }
  /**
   * 获取控制ID
   * @returns {number | string | null} 控制ID
   */
  getId() {
    return this.id;
  }
  /**
   * 获取控制属性
   * @returns {Record<string, any>} 控制属性
   */
  getProperties() {
    return this._control.getProperties();
  }
  /**
   * 设置控制属性
   * @param properties 控制属性
   */
  setProperties(e) {
    this._control.setProperties(e);
  }
}
const jn = "FullScreen", Vn = y(jn);
class ys extends fi {
  constructor(e, t) {
    super("FullScreen"), n(e) && (p(e) || C(e)) ? (this.id = e, this._control = new Ze.FullScreen(Object.assign({}, ei, t))) : this._control = new Ze.FullScreen(Object.assign({}, ei, e));
  }
  _isInitialized(e) {
    return n(this._control) ? !0 : (o(Vn(e, "未正确实例化")), !1);
  }
}
const ti = {
  duration: 250,
  className: "ol-zoom",
  zoomInLabel: "+",
  zoomOutLabel: "-",
  zoomInTipLabel: "放大",
  zoomOutTipLabel: "缩小",
  zoomInClassName: "ol-zoom-in",
  zoomOutClassName: "ol-zoom-out",
  delta: 1
}, Un = "Zoom", Nn = y(Un);
class vs extends fi {
  constructor(e, t) {
    super("Zoom"), n(e) && (p(e) || C(e)) ? (this.id = e, this._control = new Ze.Zoom(Object.assign({}, ti, t))) : this._control = new Ze.Zoom(Object.assign({}, ti, e));
  }
  _isInitialized(e) {
    return n(this._control) ? !0 : (o(Nn(e, "未正确实例化")), !1);
  }
}
export {
  Ji as Circle,
  q as Color,
  pr as DoubleClickZoom,
  cs as DragBox,
  yr as DragPan,
  ms as DragZoom,
  ct as Draw,
  st as DrawMode,
  F as Extent,
  rs as Format,
  Y as FormatType,
  vs as FullScreen,
  ts as GaodeLayer,
  es as GaodeLayerType,
  ds as InteractionExtent,
  ps as KeyboardZoom,
  Nt as LayerGroup,
  ft as LineString,
  et as LinearRing,
  _s as Link,
  u as Lnglat,
  qn as Map,
  ui as MapToken,
  ut as Measure,
  X as MeasureMode,
  fs as Modify,
  gr as MouseWheelZoom,
  Qn as MultiPoint,
  D as Pixel,
  Me as Point,
  oi as Polygon,
  si as Popup,
  ni as PopupPositioning,
  is as ProjUtil,
  ce as Projection,
  gs as Select,
  R as Size,
  te as Style,
  ns as TdtLayer,
  ss as TdtLayerType,
  os as TileLayer,
  Ee as VectorLayer,
  us as WMSLayer,
  ls as WMTSLayer,
  as as XYZLayer,
  ys as Zoom
};
