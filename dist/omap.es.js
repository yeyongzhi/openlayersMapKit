var Wt = Object.defineProperty;
var Yt = (n, e, t) => e in n ? Wt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => Yt(n, typeof e != "symbol" ? e + "" : e, t);
import * as Qe from "ol";
import * as te from "ol/layer";
import * as ee from "ol/source";
import * as Be from "ol/proj";
import * as S from "ol/interaction";
import * as _ from "ol/util";
import O from "ol/Feature";
import Ht from "ol/Overlay";
import * as z from "ol/geom";
import * as R from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import * as et from "ol/sphere";
import { createBox as Xt } from "ol/interaction/Draw";
import * as Me from "ol/tilegrid";
import * as tt from "ol/extent";
import * as it from "ol/Observable";
function r(n) {
  return n != null;
}
function y(n, e) {
  return r(n) ? n : e;
}
function l(n) {
  console.warn("omap warn", n);
}
function f(n) {
  throw new Error(`omap error ${n}`);
}
function p(n) {
  return (e, t) => `📦${n}【${e}】: ${t}`;
}
const qt = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function Ce(n) {
  return typeof n == "function";
}
function A(n) {
  return Array.isArray(n);
}
function nt(n) {
  return Array.isArray(n) && n.length === 0;
}
function g(n) {
  return typeof n == "number";
}
function w(n) {
  return typeof n == "string";
}
function Jt(n) {
  return n === "";
}
function Dt(n) {
  return typeof n == "boolean";
}
function Ye(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function P(n) {
  return A(n) && n.length === 2 && g(n[0]) && g(n[1]);
}
function be(n) {
  return A(n) && n.length === 4 && g(n[0]) && g(n[1]) && g(n[2]) && g(n[3]);
}
function ke(n) {
  return A(n) && n.length === 3 && n.every((e) => g(e) && e >= 0 && e <= 255);
}
function Qt(n) {
  return w(n) && qt.test(n);
}
function we(n) {
  return g(n) && n >= 0 && n <= 1;
}
function Ge(n) {
  let e = n.replace("#", "");
  return w(n) && n.startsWith("#") && (e.length === 6 || e.length === 3);
}
function ei(n) {
  let e = n.replace("#", "");
  return w(n) && n.startsWith("#") && e.length === 8;
}
function le(n) {
  if (n.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (n = n.slice(1), n.length === 3)
    n = n.split("").map((s) => s + s).join("");
  else if (n.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(n.slice(0, 2), 16), t = parseInt(n.slice(2, 4), 16), i = parseInt(n.slice(4, 6), 16);
  return [e, t, i];
}
function rt(n) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = n.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function ti(n) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = n.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function ii(n) {
  return (parseInt(n, 16) / 255).toPrecision(2);
}
function st() {
  const n = /* @__PURE__ */ new Date(), e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), i = String(n.getDate()).padStart(2, "0"), s = String(n.getHours()).padStart(2, "0"), o = String(n.getMinutes()).padStart(2, "0"), a = String(n.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${s}:${o}:${a}`;
}
function ni() {
  return y(window.devicePixelRatio, 1);
}
const ri = "Size", ue = p(ri);
class L {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size");
    (!g(e) || !g(t)) && f(ue("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return r(this._size) ? !0 : (l(ue(e, "未正确实例化")), !1);
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
        l(ue("setSize", "参数格式有误"));
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
        l(ue("setWidth", "参数格式有误"));
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
        l(ue("setHeight", "参数格式有误"));
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
const si = "Pixel", ie = p(si);
class $ {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    (!g(e) || !g(t)) && f(ie("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return r(this._pixel) ? !0 : (l(ie(e, "未正确实例化")), !1);
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
        l(ie("setPixel", "参数格式有误"));
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
        l(ie("setX", "参数格式有误"));
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
        l(ie("setY", "参数格式有误"));
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
    if (!r(e)) {
      l(ie("equals", "参数未正确实例化"));
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
const oi = "Lnglat", ce = p(oi);
class u {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    c(this, "_lnglat");
    (!g(e) || !g(t)) && f(ce("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !r(this._lnglat) || r(this._lnglat) && this._lnglat.length !== 2 ? (l(ce(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!g(e)) {
        l(ce("setLng", "传入经度格式有误"));
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
        l(ce("setLat", "传入纬度格式有误"));
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
      l(ce("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !P(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const ot = {
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
}, ai = "Color", pe = p(ai);
class Z {
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
      f(pe("constructor", "初始化参数有误"));
    };
    if (A(e)) {
      let i = e;
      if (i.length === 3) {
        if (!ke(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!ke(i.slice(0, 3)) || !we(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!Ge(i[0]) || !we(i[1])) {
          t();
          return;
        }
        let s = le(e[0]);
        if (!r(s)) {
          t();
          return;
        }
        this._color = `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i[1]})`;
      } else {
        t();
        return;
      }
    }
    if (Ye(e)) {
      let i = e;
      if (!r(i.color) && !(r(i.r) && r(i.g) && r(i.b))) {
        t();
        return;
      }
      if (r(i.color)) {
        if (Ge(i.color)) {
          let s = le(i.color);
          if (!r(s)) {
            t();
            return;
          }
          this._color = r(i.alpha) || r(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (Qt(i.color)) {
          let s = rt(i.color).join(", ");
          this._color = r(i.alpha) || r(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (r(i.r) && r(i.g) && r(i.b)) {
        if (!ke([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = r(i.alpha) || r(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (w(e)) {
      if (Jt(e)) {
        t();
        return;
      }
      if (Ge(e)) {
        let i = le(e);
        if (!r(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (ei(e)) {
        let i = le(e.slice(0, 7));
        if (!r(i)) {
          t();
          return;
        }
        let s = ii(e.slice(6));
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
    if (!we(e)) {
      f(pe("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...rt(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...ti(this._color), e]);
    else {
      if (!r(ot[this._color])) {
        f(pe("withAlpha", "颜色值有误"));
        return;
      }
      let t = le(ot[this._color]);
      if (!r(t)) {
        f(pe("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const li = "Extent", H = p(li);
class E {
  constructor(...e) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    let t = [];
    if (e.length === 1 && A(e[0]))
      t = e[0];
    else if (e.length === 4 && e.every(g))
      t = e;
    else {
      f(H("constructor", "初始化参数格式有误"));
      return;
    }
    this._extent = t;
  }
  _isInitialized(e) {
    return !r(this._extent) || this._extent.length !== 4 ? (l(H(e, "未正确实例化")), !1) : !0;
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
      return new u(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new u(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new u(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new u(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new u(
        (this._extent[0] + this._extent[2]) / 2,
        (this._extent[1] + this._extent[3]) / 2
      );
  }
  getWidth() {
    if (this._isInitialized("getWidth"))
      return tt.getWidth(this._extent);
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
    if (!r(e)) {
      f(H("boundingExtent", "参数coordinates不能为空"));
      return;
    }
    if (!A(e)) {
      f(H("boundingExtent", "参数coordinates格式错误，必须为数组"));
      return;
    }
    let t = e.filter((o) => o instanceof u || P(o));
    t.length < e.length && l(H("boundingExtent", "参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型"));
    let i = t.map((o) => o instanceof u ? o.toArray() : o), s = tt.boundingExtent(i);
    return new E(...s);
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param extent 范围
   * @param position 位置
   * @return 判断结果
   */
  static containsCoordinate(e, t) {
    if (!(e instanceof E) || !(t instanceof u)) {
      l(H("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!e._isInitialized("containsCoordinate") || !r(t.toArray())) return;
    const [i, s] = t.toArray();
    return i >= e._extent[0] && i <= e._extent[2] && e._extent[1] <= s && s <= e._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(e, t) {
    if (!(e instanceof E) || !(t instanceof E)) {
      l(H("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function ui(n) {
  if (!r(n))
    return;
  const { color: e } = n;
  if (r(e))
    return new R.Fill({
      ...n,
      color: e instanceof Z ? e.getColor() : e
    });
}
function ci(n) {
  if (!r(n))
    return;
  const { color: e } = n;
  if (r(e))
    return new R.Stroke({
      ...n,
      color: e instanceof Z ? e.getColor() : e
    });
}
function di(n) {
  if (!r(n))
    return;
  const { fill: e, stroke: t } = n;
  let i = new R.Circle({
    ...n,
    fill: void 0,
    stroke: void 0
  });
  return r(e) && i.setFill(new R.Fill({
    color: e.color instanceof Z ? e.color.getColor() : e.color
  })), r(t) && i.setStroke(new R.Stroke({
    color: t.color instanceof Z ? t.color.getColor() : t.color
  })), i;
}
function fi(n) {
  return r(n) ? new R.Icon({
    ...n,
    color: n.color ? n.color instanceof Z ? n.color.getColor() : n.color : void 0,
    offset: r(n.offset) ? n.offset.getPixel() : [0, 0],
    size: r(n.size) ? n.size.getSize() : void 0
  }) : void 0;
}
function hi(n) {
  if (!r(n))
    return;
  let e = new R.RegularShape({
    ...n,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = n;
  return r(t) && e.setFill(new R.Fill({
    color: t.color instanceof Z ? t.color.getColor() : t.color
  })), r(i) && e.setStroke(new R.Stroke({
    color: i.color instanceof Z ? i.color.getColor() : i.color
  })), e;
}
const Rt = (n, e) => {
  if (r(n)) {
    if (n.getType() === "Point")
      return new J({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (n.getType() === "LineString")
      return new J({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (n.getType() === "Polygon" || n.getType() === "Circle")
      return new J({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new Z({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
class J {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: s, circle: o, icon: a, regularShape: h } = e;
    let d;
    o ? d = di(o) : a ? d = fi(a) : h && (d = hi(h)), this._style = new R.Style({
      fill: ui(t),
      stroke: ci(i),
      image: d
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const gi = "Event", at = p(gi);
class he {
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
        f(at("emit", `回调异常: ${String(a)}`));
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
    return l(at("remove", `未找到 id=${e} 的监听`)), this;
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
function _i(n) {
  return g(n) && n > 0;
}
const $t = {
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
function pi(n) {
  return Object.values($t).includes(n);
}
const yi = {
  offset: new $(0, 0),
  positioning: $t.bottomCenter,
  stopEvent: !0,
  insertFirst: !0,
  autoPan: !1,
  className: "omap-popup-element"
};
function mi(n) {
  return ["change:position", "change:positioning", "change:element", "change:offset"].includes(n);
}
function lt(n) {
  let e = document.createElement("div");
  return e.className = "omap-popup-default-element", e.innerHTML = n, e;
}
function De(n, e, t) {
  const { oldValue: i, key: s, newValue: o } = t;
  let a = {
    target: n,
    type: e,
    key: s
  };
  switch (e) {
    case "change:position":
      a.oldValue = new u(i[0], i[1]), a.newValue = n.getPosition();
      break;
    case "change:positioning":
      a.oldValue = i, a.newValue = n.getPositioning();
      break;
    case "change:element":
      a.oldValue = i, a.newValue = n.getElement();
      break;
    case "change:offset":
      a.oldValue = new $(i[0], i[1]), a.newValue = n.getOffset();
      break;
    case "change:properties":
    case "change:content":
      a.oldValue = i, a.newValue = o;
      break;
  }
  return a;
}
const vi = "Popup", ne = p(vi);
class Tt {
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
    c(this, "events", new he());
    var i;
    r(e.id) && (this.id = e.id);
    let t = Object.assign({}, yi, e);
    delete t.id, r(t.content) && w(t.content) && !r(t.element) && (this.content = t.content, t.element = lt(t.content)), this._popup = new Ht({
      ...t,
      offset: (i = t.offset) == null ? void 0 : i.toArray(),
      position: r(t.position) ? t.position instanceof u ? t.position.toArray() : t.position : void 0
    }), this.events = new he(this);
  }
  _isInitialized(e) {
    return r(this._popup) ? !0 : (l(ne(e, "未正确实例化")), !1);
  }
  /**
   * 获取弹窗位置
   * @returns {Lnglat | undefined} 弹窗位置
   */
  getPosition() {
    if (!this._isInitialized("getPosition")) return;
    let e = this._popup.getPosition();
    return r(e) ? new u(e[0], e[1]) : void 0;
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
      if (!pi(e)) {
        l(ne("setPositioning", "参数positioning值有误"));
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
      if (!r(e)) {
        l(ne("setProperties", "参数不能为空"));
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
    if (this._isInitialized("getElement"))
      return this._popup.setElement(e);
  }
  getContent() {
    return this._isInitialized("getContent") ? this.content : "";
  }
  setContent(e) {
    this._isInitialized("setContent") && (this.events.emit("change:content", De(this, "change:content", {
      oldValue: this.getContent(),
      key: "content",
      newValue: e
    })), this.content = e, this.setElement(lt(e)));
  }
  getOffset() {
    if (!this._isInitialized("getOffset")) return;
    let e = this._popup.getOffset();
    return new $(e[0], e[1]);
  }
  setOffset(e) {
    if (!this._isInitialized("setOffset")) return;
    let t = e instanceof $ ? e.toArray() : e;
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
    if (!r(e) || !r(t)) {
      l(ne("on", "参数不能为空"));
      return;
    }
    if (mi(e)) {
      let s = this.events.get(e);
      (!r(s) || s.length === 0) && this._popup.on(e, (o) => {
        console.log(o), this.events.emit(e, De(this, e, o));
      });
    }
    return this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!r(e)) {
        l(ne("un", "参数不能为空"));
        return;
      }
      if (!_i(e)) {
        l(ne("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once() {
  }
}
let Ve = "BaseLayer", x = p(Ve);
const ut = 1, ct = !0, dt = 0, ft = 22, ht = 0, gt = 1 / 0, _t = 1, pt = {};
class U {
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
    c(this, "opacity", ut);
    // 图层透明度，默认1
    c(this, "visible", ct);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", dt);
    // 最小缩放级别，默认0
    c(this, "maxZoom", ft);
    // 最大缩放级别，默认22
    c(this, "minResolution", ht);
    // 最小分辨率，默认0r
    c(this, "maxResolution", gt);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", _t);
    // 图层层级，默认0
    c(this, "properties", pt);
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
    this.type = e, Ve = `${e}Layer`, x = p(Ve), this.id = y(i.id, null), this.name = y(i.name, ""), this.className = y(i.className, ""), this.opacity = y(i.opacity, ut), this.visible = y(i.visible, ct), this.extent = y(i.extent, null), this.minZoom = y(i.minZoom, dt), this.maxZoom = y(i.maxZoom, ft), this.minResolution = y(i.minResolution, ht), this.maxResolution = y(i.maxResolution, gt), this.zIndex = y(i.zIndex, _t), this.properties = y(i.properties, pt), this.map = y(i.map, null);
  }
  _isInitialized(e) {
    return r(this._layer) ? !0 : (l(x(e, "未正确实例化")), !1);
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
      if (!r(e)) {
        l(x("setOpacity", "透明度不能为空"));
        return;
      }
      if (!we(e)) {
        l(x("setOpacity", "透明度必须为0~1的数字"));
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
      if (!r(e)) {
        l(x("setVisible", "可见性不能为空"));
        return;
      }
      if (Dt(e)) {
        l(x("setVisible", "可见性必须为boolean类型"));
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
      return new E(e[0], e[1], e[2], e[3]);
  }
  /**
   * 设置图层的范围
   */
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof E ? e.getExtent() : e;
    this._layer.setExtent(t);
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!r(e)) {
        l(x("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(x("setMinZoom", "minZoom必须为number类型"));
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
      if (!r(e)) {
        l(x("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(x("setMaxZoom", "maxZoom必须为number类型"));
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
      if (!r(e)) {
        l(x("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(x("setMinResolution", "minResolution必须为number类型"));
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
      if (!r(e)) {
        l(x("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(x("setMaxResolution", "maxResolution必须为number类型"));
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
      if (!r(e)) {
        l(x("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!g(e)) {
        l(x("setZIndex", "zIndex必须为number类型"));
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
    if (!r(e)) {
      l(x("setProperties", "属性不能为空"));
      return;
    }
    if (Ye(e)) {
      l(x("setProperties", "属性必须为object类型"));
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
    if (r(this.target))
      return this.target;
  }
}
const Ei = "Interaction", Ii = p(Ei);
class M {
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
    c(this, "events", new he());
    c(this, "map", null);
    this.type = e;
  }
  initInteractionEvent() {
    this._isInitialized("initInteractionEvent") && this._interaction.on("change:active", (e) => {
      e.type === "change:active" && (this.active = this.getActive());
    });
  }
  _isInitialized(e) {
    return r(this._interaction) ? !0 : (l(Ii(e, "未正确实例化")), !1);
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
const Fi = "Feature", de = p(Fi);
class ge {
  constructor(e, t, i) {
    c(this, "id");
    c(this, "type");
    c(this, "_feature");
    c(this, "_geometry");
    this.type = e, t instanceof O ? this._initByFeature(t) : this._init(t, i);
  }
  _init(e, t) {
    switch (this.type) {
      case "Point":
        let i = e;
        this._geometry = new z.Point(i instanceof u ? i._lnglat : i);
        break;
      case "LineString":
        let s = e.map((d) => d instanceof u ? d._lnglat : d);
        this._geometry = new z.LineString(s);
        break;
      case "Polygon":
        let o = e.map((d) => d.map((m) => m instanceof u ? m._lnglat : m));
        this._geometry = new z.Polygon(o);
        break;
      case "LinearRing":
        let a = e.map((d) => d instanceof u ? d._lnglat : d);
        this._geometry = new z.LinearRing(a);
        break;
      case "Circle":
        let h = e;
        this._geometry = new z.Circle(h instanceof u ? h._lnglat : h, t);
        break;
    }
    this._feature = new O({
      geometry: this._geometry
    });
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return this._feature == null ? (l(de(e, "未正确实例化")), !1) : !0;
  }
  getFeature() {
    if (this._isInitialized("getFeature"))
      return this._feature;
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._feature.getProperties();
  }
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!r(e)) {
        l(de("setProperties", "参数不能为空"));
        return;
      }
      if (!Ye(e)) {
        l(de("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!r(e)) {
        l(de("setId", "参数id不能为空"));
        return;
      }
      if (!g(e) && !w(e)) {
        l(de("setId", "参数id格式有误"));
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
  getGeometry() {
    return this._geometry;
  }
  getCoordinates() {
  }
  setCoordinates(e) {
  }
}
const xi = "Point", re = p(xi);
class Bt extends ge {
  constructor(e, t) {
    if (!r(e)) {
      f(re("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof O)
      super("Point", e);
    else {
      if (!(e instanceof u) && !P(e)) {
        f(re("constructor", "坐标格式有误"));
        return;
      }
      super("Point", e), t && this.setProperties(t);
    }
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
    if (!r(e)) {
      f(re("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !P(e)) {
      f(re("setCoordinates", "坐标格式有误"));
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
    if (!r(e)) {
      f(re("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof E) && !be(e)) {
      f(re("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof E ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function yt(n) {
  let e = !0;
  return A(n) || (e = !1), n.some((i) => !(i instanceof u) && !P(i)) && (e = !1), e;
}
const zi = "Point", k = p(zi);
class He extends ge {
  constructor(e, t) {
    if (!r(e)) {
      f(k("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof O)
      super("LineString", e);
    else {
      if (!yt(e)) {
        f(k("constructor", "坐标格式有误"));
        return;
      }
      super("LineString", e), t && this.setProperties(t);
    }
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
    if (!r(e)) {
      f(k("setCoordinates", "参数不能为空"));
      return;
    }
    if (!yt(e)) {
      f(k("setCoordinates", "坐标格式有误"));
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
    if (!r(e)) {
      f(k("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !P(e)) {
      f(k("setCoordinates", "坐标格式有误"));
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
    return new E(e[0], e[1], e[2], e[3]);
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
    if (!r(e)) {
      f(k("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(g(e) && e >= 0 && e <= 1)) {
      f(k("getCoordinateAt", "参数格式有误"));
      return;
    }
    let i = [], s = this._geometry.getCoordinateAt(e, i);
    return r(t) && (t instanceof u ? (t.setLng(i[0]), t.setLat(i[1])) : (t[0] = i[0], t[1] = i[1])), new u(s[0], s[1]);
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
    if (!r(e)) {
      f(k("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof E) && !be(e)) {
      f(k("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof E ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function mt(n) {
  let e = !0;
  return A(n) || (e = !1), n.some((i) => !A(i)) && (e = !1), n.forEach((i) => {
    i.forEach((s) => {
      !(s instanceof u) && !P(s) && (e = !1);
    });
  }), e;
}
function Oe(n) {
  let e = !0;
  return A(n) || (e = !1), n.some((i) => !(i instanceof u) && !P(i)) && (e = !1), e;
}
const Ai = "Point", T = p(Ai);
class Vt extends ge {
  constructor(e, t) {
    if (!r(e)) {
      f(T("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof O)
      super("Polygon", e);
    else {
      if (!mt(e)) {
        f(T("constructor", "坐标格式有误"));
        return;
      }
      super("Polygon", e), t && this.setProperties(t);
    }
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
    if (!r(e)) {
      f(T("setCoordinates", "参数不能为空"));
      return;
    }
    if (!mt(e)) {
      f(T("setCoordinates", "坐标格式有误"));
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
    if (!r(e)) {
      f(T("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof $e) && !Oe(e)) {
      f(T("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof $e)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof u ? i.toArray() : i);
      this._geometry.appendLinearRing(new $e(t)._geometry);
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
    return new E(e[0], e[1], e[2], e[3]);
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
    return new Bt(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!r(e)) {
      f(T("intersectsCoordinate", "参数coordinates不能为空"));
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
    if (!r(e)) {
      f(T("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof E) && !be(e)) {
      f(T("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof E ? e.getExtent() : e;
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
const wi = "Circle", ye = p(wi);
class Ci extends ge {
  constructor(e, t, i) {
    if (!r(e)) {
      f(ye("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof O)
      super("Circle", e);
    else {
      if (!(e instanceof u) && !P(e)) {
        f(ye("constructor", "坐标格式有误"));
        return;
      }
      if (!r(t)) {
        f(ye("constructor", "radius参数不能为空"));
        return;
      }
      if (!g(t)) {
        f(ye("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
}
const me = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function Ot(n) {
  let e = null, t = n.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case me.Point:
      e = new Bt(n);
      break;
    case me.LineString:
      e = new He(n);
      break;
    case me.Polygon:
      e = new Vt(n);
      break;
    case me.Circle:
      e = new Ci(n);
      break;
  }
  return e;
}
const V = {
  Distance: "Distance",
  Area: "Area"
}, Pi = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, ve = {
  measureStart: "measure:start",
  measureEnd: "measure:end"
}, Ze = {
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
}, Li = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, Xe = "omap-measure-marker", Ue = "omap-measure-marker-index";
function Si(n) {
  let e = "Point", t = null;
  switch (n) {
    case V.Distance:
      e = Ze.LineString;
      break;
    case V.Area:
      e = Ze.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
let G = null, D = null, ae = null, qe = null, oe = null, Q = [], B = [];
function Mi(n, e, t) {
  n === V.Distance ? ae = e : n === V.Area && (qe = e), oe = t;
}
function Zt(n) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = n, e;
}
function bi(n, e) {
  if (G)
    if (G.children[0].innerHTML = Pe("总长", n), !e || e === "")
      G.children.length > 1 && G.removeChild(G.children[1]);
    else if (G.children.length > 1)
      G.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, G.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Pe("总长", n), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    G = t;
  }
  return G;
}
function vt(n, e) {
  if (D)
    if (D.children[0].innerHTML = Pe("面积", n), !e || e === "")
      D.children.length > 1 && D.removeChild(D.children[1]);
    else if (D.children.length > 1)
      D.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, D.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Pe("总长", n), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    D = t;
  }
  return D;
}
function ki(n) {
  let e = document.createElement("span");
  return e.title = "删除", e.innerHTML = "×", e.style.color = "#FFFFFF", e.style.cursor = "pointer", e.addEventListener("click", (t) => {
    r(n) && n();
  }), e;
}
function Et(n) {
  let e = new Tt(n);
  return B.push(e), e;
}
function It(n, e) {
  let t = document.createElement("div");
  t.className = `${Xe}-${e}`, t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(255, 255, 255, 0.8)", t.style.color = "#000000", t.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  let i = document.createElement("span");
  if (i.style.color = "var(--omap-primary-color)", i.style.margin = "0 5px", i.innerHTML = n, t.appendChild(i), e !== 0) {
    let s = document.createElement("span");
    s.title = "删除", s.innerHTML = "×", s.style.color = "#000000", s.style.cursor = "pointer", t.setAttribute(Ue, e.toString()), s.addEventListener("click", (o) => {
      console.log("点击删除");
      let a = t.getAttribute(Ue);
      console.log(a), r(a) && Gi(Number(a));
    }), t.appendChild(s);
  }
  return Q.push(t), t;
}
function Gi(n) {
  if (B.length === 2)
    return xt(), Q = [], B.forEach((e, t) => {
      Ft(t), t === B.length - 1 && (B = []);
    }), !1;
  xt(n), Q.splice(n, 1), Q.forEach((e, t) => {
    e.className = `${Xe}-${t}`, e.setAttribute(Ue, t.toString());
  }), Ft(n), B.splice(n, 1), B.forEach((e, t) => {
    e.id = Ne(t);
  }), Di();
}
function Ft(n) {
  if (r(oe)) {
    let e = oe.getPopupById(`omap-measure-marker-${n}`);
    r(e) && oe.removePopup(e);
  }
}
function xt(n) {
  let e = ae || qe;
  if (r(e)) {
    let t = e.getGeometry();
    if (r(t))
      if (r(n)) {
        let i = [];
        (t instanceof z.LineString || t instanceof z.Polygon) && (i = t.getCoordinates()), i.splice(n, 1), (t instanceof z.LineString || t instanceof z.Polygon) && t.setCoordinates(i);
      } else
        t instanceof z.LineString ? t.setCoordinates([]) : t instanceof z.Polygon && t.setCoordinates([]);
  }
}
function Di() {
  if (ae) {
    let n = ae.getGeometry().getCoordinates();
    Q.forEach((e, t) => {
      if (t > 0) {
        let i = new He(n.slice(0, t + 1)), s = oe.getLength(i);
        e.children[0].innerHTML = r(s) ? je(s) : "-";
      }
    });
  }
}
function je(n) {
  return (n / 1e3).toFixed(2) + " km";
}
function zt(n) {
  return (n / 1e6).toFixed(2) + " km²";
}
function Ne(n) {
  return `${Xe}-${n}`;
}
function Pe(n, e) {
  return `${n}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${e || "-"}</span>`;
}
function Ri() {
  Q.forEach((n) => {
    n.remove();
  }), B.forEach((n) => {
    oe.removePopup(n);
  }), ae = null, qe = null, setTimeout(() => {
    Q = [], B = [];
  }, 200);
}
class Ut {
  constructor(e) {
    c(this, "popup");
    this.initPopup(e || "");
  }
  _isInitialized() {
    return !!r(this.popup);
  }
  initPopup(e) {
    let t = Zt(e);
    this.popup = new Tt({
      id: "omap-measure-popup",
      element: t,
      offset: new $(0, -10)
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
const K = new Ut("单击地图开始测量"), se = new Ut(""), $i = "Measure", At = p($i);
let wt = null, X = null;
class Ke extends M {
  constructor(t, i) {
    if (!Object.values(V).includes(t)) {
      f(At("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    c(this, "mode", null);
    c(this, "result", {
      value: 0,
      unit: ""
    });
    let s = null;
    this.layer = new Le({
      style: Rt
    }), s = this.layer.getSource();
    let o = Object.assign({}, Pi, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: s,
      features: void 0,
      style: void 0
    });
    this._interaction = new S.Draw({
      ...Si(t),
      ...o
    }), this.mode = t, t === V.Distance ? this.result.unit = "km" : t === V.Area && (this.result.unit = "km²"), this.initInteractionEvent(), this.initMeasureEvent();
  }
  /**
   * 初始化 测量事件
   */
  initMeasureEvent() {
    this._isInitialized("initMeasureEvent") && (this._interaction.on("change:active", (t) => {
      this._interaction.getActive() ? this.onMeasureActive() : this.onMeasureInActive();
    }), this._interaction.on("drawstart", (t) => {
      this.events.emit(ve.measureStart, {
        target: this,
        type: ve.measureStart
      }), this.onMeasureStart(t.feature);
    }), this._interaction.on("drawend", (t) => {
      this.onMeasureEnd();
    }));
  }
  onMeasureActive() {
    r(this.map) && (X || (X = this.map._map.on("pointermove", (t) => {
      K.updatePosition(t.coordinate);
    }))), this.result.value = 0;
  }
  onMeasureInActive() {
    X && (it.unByKey(X), X = null);
  }
  /**
   * 测量开始
   * @param feature 测量开始的feature
   */
  onMeasureStart(t) {
    var i;
    if (r(t)) {
      wt = t, Mi(this.mode, t, this.map);
      let s = 0;
      (i = wt.getGeometry()) == null || i.on("change", (o) => {
        var h, d;
        const { target: a } = o;
        if (r(a)) {
          let m = a instanceof z.LineString ? a.getCoordinates().length : a.getCoordinates()[0].length;
          if (s === 0 && (s = m, a instanceof z.LineString)) {
            let b = It("起点", 0), N = Et({
              id: Ne(0),
              element: b,
              offset: new $(0, -10)
            });
            N.setPosition(a.getCoordinates()[0]), this.map.addPopup(N);
          }
          let F;
          if (a instanceof z.LineString ? F = (h = this.map) == null ? void 0 : h.getLength(new He(new O({
            geometry: a
          }))) : a instanceof z.Polygon && (F = (d = this.map) == null ? void 0 : d.getArea(new Vt(new O({
            geometry: a
          })))), r(F) && g(F) && (this.result.value = F), r(F) && g(F) && a instanceof z.LineString) {
            let b = m >= 2 ? bi(je(F), F === 0 ? "" : "单击继续，双击结束测量") : Zt("单击地图开始测量");
            K.setElement(b);
          }
          if (a instanceof z.LineString) {
            if (m > s) {
              let b = m - 1 - 1, N = It(je(F), b), Je = Et({
                id: Ne(b),
                element: N,
                offset: new $(0, -10)
              });
              Je.setPosition(a.getCoordinates()[a.getCoordinates().length - 1]), this.map.addPopup(Je), s = m;
            }
          } else a instanceof z.Polygon && m >= 4 && (this.map.addPopup(se.getPopup()), se.setElement(vt(zt(F), "单击继续，双击结束测量")), se.updatePosition(a.getInteriorPoint().getCoordinates()), K.setElement(void 0), K.updatePosition(void 0));
        } else
          l("target is undefined");
      });
    }
  }
  /**
   * 测量结束
   */
  onMeasureEnd() {
    if (this.setActive(!1), r(X) && it.unByKey(X), this.mode, V.Distance, this.mode === V.Area) {
      const t = vt(zt(this.result.value));
      t.style.display = "flex", t.style.alignItems = "center", t.appendChild(ki(() => {
        var i;
        se.updatePosition(void 0), se.setElement(void 0), (i = this.layer) == null || i.clear();
      })), se.setElement(t);
    }
    K.updatePosition(void 0), K.setElement(void 0), this.events.emit(ve.measureEnd, {
      target: this,
      type: ve.measureEnd
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
    this.map = t, this.map.addPopup(K.getPopup()), this.onMeasureActive();
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!r(t) || !r(i)) {
      l(At("on", "参数不能为空"));
      return;
    }
    return this.events.on(t, i);
  }
  /**
   * 该移除的都移除掉
   */
  destroy() {
    K.updatePosition(void 0), this.setActive(!1), r(this.layer) && this.layer.clear(), Ri();
  }
}
let Ti = "VectorLayer", I = p(Ti);
class Le extends U {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = r(t.source) ? t.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((o) => o.getFeature()) : []
    };
    this._layer = new te.Vector({
      source: new ee.Vector(s)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (l(I(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (r(i) && (this.target instanceof We || this.target instanceof Ke)) {
        let s = Ot(i);
        s ? this.features.push(s) : l(I("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
    r(t) && (t instanceof J ? i = t.getStyle() : A(t) && t.every((s) => s instanceof J) ? i = t.map((s) => s.getStyle()) : Ce(t) ? i = (s, o) => {
      let a = _.getUid(s), h = this.features.findIndex((m) => _.getUid(m.getFeature()) === a), d = t(h !== -1 ? this.features[h] : null, o);
      return d ? d.getStyle() : void 0;
    } : l(I("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!r(t)) {
      l(I("setId", "参数id不能为空"));
      return;
    }
    if (!g(t) && !w(t)) {
      l(I("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((s) => r(s.getId()) && s.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!r(t)) {
      l(I("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof E) && !be(t)) {
      l(I("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let s = t instanceof E ? t.getExtent() : t, o = this._layer.getSource().getFeaturesInExtent(s), a = [];
    return o.forEach((h) => {
      let d = _.getUid(h), m = this.features.findIndex((F) => _.getUid(F.getFeature()) === d);
      m !== -1 && a.push(this.features[m]);
    }), a;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!r(t)) {
      l(I("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !P(t)) {
      l(I("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof u ? t._lnglat : t;
    const s = this._layer.getSource().getFeaturesAtCoordinate(i);
    let o = [];
    return s.forEach((a) => {
      let h = _.getUid(a), d = this.features.findIndex((m) => _.getUid(m.getFeature()) === h);
      d !== -1 && o.push(this.features[d]);
    }), o;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!r(t)) {
        l(I("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!r(t) || !A(t)) {
        l(I("addFeatures", "参数格式有误不能为空"));
        return;
      }
      nt(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!r(t)) {
        l(I("removeFeature", "参数不能为空"));
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
      if (!r(t) || !A(t)) {
        l(I("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      nt(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!r(t) || !Ce(t)) {
        l(I("forEachFeature", "参数格式有误"));
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
      if (!r(i)) {
        l(I("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (s) => {
        let o = _.getUid(s), a = this.features.findIndex((h) => _.getUid(h.getFeature()) === o);
        r(a) && a !== -1 && i(this.features[a], 0);
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
      if (!r(i)) {
        l(I("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (s) => {
        let o = _.getUid(s), a = this.features.findIndex((h) => _.getUid(h.getFeature()) === o);
        r(a) && a !== -1 && i(this.features[a], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!r(t)) {
      l(I("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !P(t)) {
      l(I("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let s = t instanceof u ? t._lnglat : t, o = i ? (d) => {
      let m = _.getUid(d), F = this.features.findIndex((b) => _.getUid(b.getFeature()) === m);
      return i(this.features[F]);
    } : void 0;
    const a = this._layer.getSource().getClosestFeatureToCoordinate(s, o);
    let h = this.features.findIndex((d) => _.getUid(d.getFeature()) === _.getUid(a));
    if (h !== -1)
      return this.features[h];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new E(t[0], t[1], t[2], t[3]);
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
      if (!r(t)) {
        l(I("setStyle", "style参数不能为空"));
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
function Bi(n) {
  let e = "Point", t = null;
  switch (n) {
    case "Point":
    case "LineString":
    case "Polygon":
      e = n;
      break;
    case "Circle":
      e = "Circle";
      break;
    case "Rectangle":
      e = "Circle", t = Xt();
      break;
  }
  return { type: e, geometryFunction: t };
}
const Vi = "Draw", Ee = p(Vi);
class We extends M {
  constructor(e, t) {
    if (!Object.values(Ze).includes(e)) {
      f(Ee("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof Le ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : l(Ee("init", "layer参数不属于VectorLayer类型"))), r(i) || (this.layer = new Le({
      style: Rt
    }), i = this.layer.getSource());
    let s = Object.assign({}, Li, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new S.Draw({
      ...Bi(e),
      ...s
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, s;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), r(t)) {
        let o = Ot(t);
        o ? (this.layer.addFeature(o), console.log((s = this.layer) == null ? void 0 : s.getFeatures())) : l(Ee("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
      }
    });
  }
  /**
   * 追加坐标
   * @param coordinates 坐标
   */
  appendCoordinates(e) {
    if (!this._isInitialized("appendCoordinates")) return;
    if (!r(e)) {
      l(Ee("appendCoordinates", "coordinates参数不能为空"));
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
const Oi = {
  onFocusOnly: !1,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: !0,
  constrainResolution: !1
};
class Zi extends M {
  constructor(e) {
    super("MouseWheelZoom"), this._interaction = new S.MouseWheelZoom(Object.assign({}, Oi, e || {})), this.initInteractionEvent();
  }
}
const Ui = {
  duration: 250,
  delta: 1
};
class ji extends M {
  constructor(e) {
    super("DoubleClickZoom"), this._interaction = new S.DoubleClickZoom(Object.assign({}, Ui, e || {})), this.initInteractionEvent();
  }
}
const Ni = {
  onFocusOnly: !1,
  kinetic: void 0
};
class Ki extends M {
  constructor(e) {
    super("DragPan"), this._interaction = new S.DragPan(Object.assign({}, Ni, e || {})), this.initInteractionEvent();
  }
}
const Wi = [
  new Zi(),
  new ji(),
  new Ki()
], Yi = [], Re = {
  pixelRatio: ni(),
  layers: [],
  controls: [],
  interactions: Wi,
  popups: Yi
};
function Ct(n) {
  return n.startsWith("map:");
}
function Ie(n, e, t) {
  let i = {
    target: n,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new $(...t.pixel)), t.coordinate && (i.coordinate = new u(...t.coordinate));
      break;
    case "map:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new u(...t.oldValue) : t.oldValue), t.key === "size" ? i.newValue = t.newValue || n.getSize() : i.newValue = t.newValue, i.key = t.key;
      break;
    case "view:change:resolution":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || n.getResolution();
      break;
    case "view:change:center":
      t.oldValue && (i.oldValue = new u(...t.oldValue)), i.newValue = t.newValue || n.getCenter();
      break;
    case "view:change:rotation":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || n.getRotation();
      break;
    case "view:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new u(...t.oldValue) : t.oldValue), t.key === "center" ? i.newValue = t.newValue || n.getCenter() : t.key === "rotation" ? i.newValue = t.newValue || n.getRotation() : t.key === "resolution" ? i.newValue = t.newValue || n.getResolution() : i.newValue = t.newValue, i.key = t.key;
      break;
  }
  return i;
}
const Hi = "Map", v = p(Hi);
let Un = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "layers", []);
    c(this, "interactions", []);
    c(this, "events", null);
    c(this, "popups", []);
    let i = t;
    const s = i.view;
    if (!r(s)) {
      f(v("constructor", "view参数不能为空"));
      return;
    }
    let o = s.projection || new q("EPSG:3857");
    w(o) && (o = new q(o));
    const a = {
      ...s,
      center: s.center instanceof u ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof E ? s.extent._extent : s.extent,
      projection: o._projection
    }, h = new Qe.View(a);
    let d = y(i.interactions, Re.interactions), m = y(i.popups, Re.popups), F = Object.assign({}, Re, {
      ...i,
      interactions: [],
      overlays: [],
      view: h
    });
    F.target = e;
    const b = new Qe.Map(F);
    this._view = h, this._map = b, r(d) && d.length > 0 && d.forEach((N) => {
      this.addInteraction(N);
    }), r(m) && m.length > 0 && m.forEach((N) => {
      this.addPopup(N);
    }), this.events = new he(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (l(v(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new L(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof L ? e._size : e;
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
    if (!r(e)) {
      l(v("setCenter", "参数center不能为空"));
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
      if (!r(e)) {
        l(v("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!g(e)) {
        l(v("setZoom", "参数zoom必须为number类型"));
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
      if (!r(e)) {
        l(v("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!g(e)) {
        l(v("setResolution", "参数resolution必须为number类型"));
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
      if (!r(e)) {
        l(v("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!g(e)) {
        l(v("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, s, o] = e;
    return new E(t, i, s, o);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (r(e) && !g(e)) {
        l(v("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (r(e) && !g(e)) {
        l(v("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!r(e)) {
      l(v("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof mn)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (r(t) && this.getLayerById(t)) {
      l(v("addLayer", "图层已存在"));
      return;
    }
    r(e._layer) && (this.layers.push(e), e instanceof U && (r(e.getTarget()) || e.setTarget(this)), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!r(e)) {
      l(v("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof U && r(i.getId()) && i.getId() === e && (t = i);
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
    if (!r(e)) {
      l(v("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!r(t))
      return l(v("removeLayerById", `找不到id为${e}(${w(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!r(e) || !r(t)) {
      l(v("on", "参数不能为空"));
      return;
    }
    let i = Ct(e);
    const s = i ? this._map : this._view;
    let o = this.events.get(e);
    return (!r(o) || o.length === 0) && (i ? s.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, Ie(this, e, h));
    }) : s.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, Ie(this, e, h));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!r(e)) {
        l(v("un", "参数不能为空"));
        return;
      }
      if (!g(e)) {
        l(v("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!r(e) || !r(t)) {
      l(v("on", "参数不能为空"));
      return;
    }
    let i = Ct(e);
    const s = i ? this._map : this._view;
    let o = this.events.get(e);
    return (!r(o) || o.length === 0) && (i ? s.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, Ie(this, e, h));
    }) : s.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, Ie(this, e, h));
    })), this.events.once(e, t);
  }
  // 属性管理
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._map.getProperties() || {};
  }
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!r(e)) {
        l(v("setProperties", "参数不能为空"));
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
      l(v("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof We || e instanceof Ke) {
      const s = e.getLayer();
      r(s) && (s.setTarget(e), this.addLayer(s));
    }
    r(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction), e.setMap && e.setMap(this), e.setActive(!0));
  }
  getInteractions() {
    if (this._isInitialized("setProperties"))
      return this.interactions;
  }
  removeInteraction(e) {
    var i;
    let t = this.interactions.findIndex((s) => _.getUid(s._interaction) === _.getUid(e._interaction));
    if (t === -1) {
      l(v("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (r(e._interaction)) {
      if (this.interactions.splice(t, 1), (i = this._map) == null || i.removeInteraction(e._interaction), e instanceof We || e instanceof Ke) {
        const s = e.getLayer();
        r(s) && this.removeLayer(s);
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
      l(v("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    r(e._popup) && (this.popups.push(e), this._map.addOverlay(e._popup));
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
    return this._isInitialized("getLength") ? et.getLength(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  getArea(e) {
    return this._isInitialized("getArea") ? et.getArea(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
};
const Xi = "Map", Pt = p(Xi);
class q {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (w(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!r(i.code)) {
        f(Pt("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = Be.get(t), !r(this._projection)) {
      l(Pt("constructor", "坐标系不存在"));
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
const qi = "LinearRing", Fe = p(qi);
class $e extends ge {
  constructor(e, t) {
    if (!r(e)) {
      f(Fe("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof O)
      super("LinearRing", e);
    else {
      if (!Oe(e)) {
        f(Fe("constructor", "坐标格式有误"));
        return;
      }
      super("LinearRing", e), t && this.setProperties(t);
    }
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
    if (!r(e)) {
      f(Fe("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Oe(e)) {
      f(Fe("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
function C(n) {
  if (r(n))
    return n instanceof L ? n.toArray() : n;
}
function j(n) {
  if (r(n))
    return n instanceof E ? n.getExtent() : n;
}
function Y(n) {
  if (r(n))
    return n instanceof u ? n.toArray() : n;
}
function _e(n) {
  if (r(n))
    return n instanceof Z ? n.getColor() : n;
}
const Nn = {
  Vec: "vec",
  Img: "img",
  Road: "road"
}, Ji = {
  preload: 0,
  cacheSize: 512
}, Qi = {
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
}, en = {
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
function Lt(n) {
  return en[n];
}
let tn = "GaodeLayer", nn = p(tn);
class Kn extends U {
  constructor(t, i) {
    super("Gaode", y(i, {}));
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    if (!r(t)) {
      f(nn("GaodeLayer", "type参数不能为空"));
      return;
    }
    let s = Object.assign({}, Ji, {
      ...y(i, {}),
      source: void 0,
      map: void 0
    });
    this.gaodeType = t;
    let o = Object.assign({}, Qi, {
      ...y(i == null ? void 0 : i.source, {})
    }), a;
    if (r(i) && r(i.source)) {
      let h;
      r(o.tileGrid) && (h = new Me.TileGrid({
        ...o.tileGrid,
        extent: j(o.tileGrid.extent),
        origin: Y(o.tileGrid.origin),
        origins: r(o.tileGrid.origins) ? o.tileGrid.origins.map((d) => d instanceof u ? Y(d) : d) : void 0,
        sizes: r(o.tileGrid.sizes) ? o.tileGrid.sizes.map((d) => d instanceof L ? C(d) : d) : void 0,
        tileSize: r(o.tileGrid.tileSize) ? g(o.tileGrid.tileSize) ? o.tileGrid.tileSize : C(o.tileGrid.tileSize) : void 0,
        tileSizes: r(o.tileGrid.tileSizes) ? o.tileGrid.tileSizes.map((d) => d instanceof L ? C(d) : d) : void 0
      })), a = new ee.XYZ({
        ...o,
        urls: Lt(this.gaodeType),
        tileGrid: h
      });
    } else
      a = new ee.XYZ({
        ...o,
        urls: Lt(this.gaodeType)
      });
    this._layer = new te.Tile({
      ...s,
      extent: r(s.extent) ? j(s.extent) : void 0,
      background: r(s.background) ? _e(s.background) : void 0,
      source: a
    }), this._initLayerEvent();
  }
}
const rn = "ProjUtil", St = p(rn);
class Wn {
  static fromLonLat(e, t) {
    if (!r(e)) {
      l(St("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = r(t) ? w(t) ? new q(t) : t : new q("EPSG:3857"), o = Be.fromLonLat(i, s._projection);
    return new u(o[0], o[1]);
  }
  static toLonLat(e, t) {
    if (!r(e)) {
      l(St("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = r(t) ? w(t) ? new q(t) : t : new q("EPSG:3857"), o = Be.toLonLat(i, s._projection);
    return new u(o[0], o[1]);
  }
}
const Te = "OMapToken", sn = {
  tdt: null
};
function on(n, e) {
  window[Te] || (window[Te] = {}), window[Te][n] = e;
}
const jt = new Proxy(sn, {
  set: function(n, e, t, i) {
    return on(e, t), Reflect.set(n, e, t, i);
  }
}), an = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function ln(n, e) {
  return an.replace(/\{T\}/g, n + "_" + e).replace(/\{tk\}/g, jt.tdt);
}
let un = "TdtLayer", Mt = p(un);
class Yn extends U {
  constructor(t, i) {
    var o, a, h;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!r(jt.tdt)) {
      l(Mt("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!r(t)) {
      f(Mt("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    delete s.source, this.tdtType = t, this._layer = new te.Tile({
      ...s,
      extent: r(s.extent) ? (o = s.extent) == null ? void 0 : o._extent : void 0,
      map: r(s.map) ? (a = s.map) == null ? void 0 : a._map : void 0,
      background: r(s.background) ? (h = s.background) == null ? void 0 : h._color : void 0,
      source: new ee.XYZ({
        url: ln(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
const cn = {
  preload: 0,
  useInterimTilesOnError: !0,
  cacheSize: 512
};
let dn = "TileLayer", fn = p(dn);
class Hn extends U {
  constructor(e) {
    if (super("Tile", y(e, {})), !r(e.source)) {
      f(fn("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, {
      ...cn
    }, {
      ...e,
      source: void 0,
      map: void 0
    });
    y(e.source, {}), this._layer = new te.Tile({
      // 以下这些是基础属性赋值
      ...t,
      extent: r(t.extent) ? j(t.extent) : void 0,
      background: r(t.background) ? _e(t.background) : void 0
    }), this._initLayerEvent();
  }
}
const hn = {
  preload: 0,
  cacheSize: 512
}, gn = {
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
let _n = "TileLayer", pn = p(_n);
class Xn extends U {
  constructor(e) {
    if (super("XYZ", y(e, {})), !r(e.source)) {
      f(pn("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, hn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, gn, {
      ...y(e.source, {})
    }), s;
    if (r(e.source)) {
      let o;
      r(i.tileGrid) && (o = new Me.TileGrid({
        ...i.tileGrid,
        extent: j(i.tileGrid.extent),
        origin: Y(i.tileGrid.origin),
        origins: r(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? Y(a) : a) : void 0,
        sizes: r(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof L ? C(a) : a) : void 0,
        tileSize: r(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : C(i.tileGrid.tileSize) : void 0,
        tileSizes: r(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof L ? C(a) : a) : void 0
      })), s = new ee.XYZ({
        ...i,
        tileGrid: o
      });
    }
    this._layer = new te.Tile({
      ...t,
      extent: r(t.extent) ? j(t.extent) : void 0,
      background: r(t.background) ? _e(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
let yn = "LayerGroup", xe = p(yn);
class mn {
  constructor(e, t) {
    c(this, "id", null);
    c(this, "layers", []);
    if (!r(e)) {
      f(xe("constructor", "参数不能为空"));
      return;
    }
    let i, s = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (s = e, !r(t)) {
        f(xe("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    r(s) && (this.id = s), this.layers = i;
  }
  add(e) {
    if (!r(e)) {
      f(xe("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (r(t) && this.layers.find((s) => s.getId() && s.getId() === t)) {
      l(xe("add", "图层已存在"));
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
    if (r(t)) {
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
function Nt(n) {
  if (r(n))
    return n instanceof q ? n.getProjection() : n;
}
const vn = {
  preload: 0,
  cacheSize: 512
}, En = {
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
let In = "WMTSLayer", Fn = p(In);
class qn extends U {
  constructor(e) {
    if (super("WMS", y(e, {})), !r(e.source)) {
      l(Fn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, vn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, En, {
      ...y(e.source, {})
    });
    console.log("_sourceParams"), console.log(i);
    let s;
    if (r(e.source)) {
      let o;
      r(i.tileGrid) && (o = new Me.WMTS({
        ...i.tileGrid,
        extent: j(i.tileGrid.extent),
        origin: Y(i.tileGrid.origin),
        origins: r(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? Y(a) : a) : void 0,
        sizes: r(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof L ? C(a) : a) : void 0,
        tileSize: r(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : C(i.tileGrid.tileSize) : void 0,
        tileSizes: r(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof L ? C(a) : a) : void 0
      })), s = new ee.WMTS({
        ...i,
        projection: Nt(i.projection),
        tileGrid: o
      });
    }
    this._layer = new te.Tile({
      ...t,
      extent: r(t.extent) ? j(t.extent) : void 0,
      background: r(t.background) ? _e(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const xn = {
  preload: 0,
  cacheSize: 512
}, zn = {
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
let An = "WMSLayer", wn = p(An);
class Jn extends U {
  constructor(e) {
    if (super("WMS", y(e, {})), !r(e.source)) {
      l(wn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, xn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, zn, {
      ...y(e.source, {})
    }), s;
    if (r(e.source)) {
      let o;
      r(i.tileGrid) && (o = new Me.TileGrid({
        ...i.tileGrid,
        extent: j(i.tileGrid.extent),
        origin: Y(i.tileGrid.origin),
        origins: r(i.tileGrid.origins) ? i.tileGrid.origins.map((a) => a instanceof u ? Y(a) : a) : void 0,
        sizes: r(i.tileGrid.sizes) ? i.tileGrid.sizes.map((a) => a instanceof L ? C(a) : a) : void 0,
        tileSize: r(i.tileGrid.tileSize) ? g(i.tileGrid.tileSize) ? i.tileGrid.tileSize : C(i.tileGrid.tileSize) : void 0,
        tileSizes: r(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((a) => a instanceof L ? C(a) : a) : void 0
      })), s = new ee.TileWMS({
        ...i,
        projection: Nt(i.projection),
        tileGrid: o
      });
    }
    this._layer = new te.Tile({
      ...t,
      extent: r(t.extent) ? j(t.extent) : void 0,
      background: r(t.background) ? _e(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
function bt(n, e, t) {
  return {
    target: n,
    type: e,
    pixel: new $(t.pixel[0], t.pixel[1]),
    coordinate: new u(t.coordinate[0], t.coordinate[1])
  };
}
const Cn = "DragBox", ze = p(Cn);
class Qn extends M {
  constructor(e) {
    super("DragBox"), this._interaction = new S.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && Ce(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new u(t.coordinate[0], t.coordinate[1]),
          pixel: new $(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new he(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!r(e) || !r(t)) {
      l(ze("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!r(i) || i.length === 0) && this._interaction.on(e, (o) => {
      this.events.emit(e, bt(this, e, o));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!r(e)) {
        l(ze("un", "参数不能为空"));
        return;
      }
      if (!g(e)) {
        l(ze("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!r(e) || !r(t)) {
      l(ze("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!r(i) || i.length === 0) && this._interaction.on(e, (o) => {
      this.events.emit(e, bt(this, e, o));
    }), this.events.once(e, t);
  }
}
const Pn = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class er extends M {
  constructor(e) {
    super("Extent"), this._interaction = new S.Extent(Object.assign({}, Pn, e || {})), this.initInteractionEvent();
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._interaction.getExtent();
    return e ? new E(e[0], e[1], e[2], e[3]) : void 0;
  }
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof E ? e.toArray() : e;
    this._interaction.setExtent(t);
  }
}
function kt(n, e, t) {
  return {
    target: n,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const Ln = "Modify", W = p(Ln), Sn = {
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
let tr = class extends M {
  constructor(t) {
    super("Modify");
    c(this, "records", []);
    let i = null;
    r(t.layer) || f(W("init", "layer参数不能为空")), r(t.layer) && !(t.layer instanceof Le) && f(W("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let s = Object.assign({}, Sn, {
      ...t,
      source: i
    });
    this._interaction = new S.Modify(s), this.initInteractionEvent(), this.initModifyEvent();
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
      time: st(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (s) => {
      let o = s.features.getArray(), a = [];
      o.forEach((h) => {
        let d = this.layer.getFeatures().find((m) => _.getUid(m._feature) === _.getUid(h));
        d && a.push({
          id: d.id,
          originFeatureId: _.getUid(d._feature),
          type: d.type,
          coordinates: d.getCoordinates()
        });
      }), this.records.push({
        time: st(),
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
    if (!r(t)) {
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
    if (!r(t)) {
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
      let h = this.layer.getFeatures().find((d) => a.id ? a.id === d.id : _.getUid(d._feature) === a.originFeatureId);
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
    if (!r(t) || !r(i)) {
      l(W("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!r(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, kt(this, t, a));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!r(t)) {
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
    if (!r(t) || !r(i)) {
      l(W("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!r(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, kt(this, t, a));
    }), this.events.once(t, i);
  }
}, Se = [], Kt = [];
function Mn(n) {
  Se = n;
}
function bn(n) {
  Kt = n, Se = [];
}
function Ae(n) {
  let e = null;
  if (Se.length)
    for (const t of Se) {
      let i = t.getFeatures().find((s) => _.getUid(s._feature) === n);
      i && (e = i);
    }
  else
    e = Kt.find((t) => _.getUid(t._feature) === n);
  return e;
}
function Gt(n, e, t) {
  return {
    target: n,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const kn = "Select", fe = p(kn), Gn = {
  layers: void 0,
  style: void 0,
  multi: !1,
  // 当为true的时候，支持一次选择n个重叠的要素
  features: void 0,
  filter: void 0,
  hitTolerance: 0
};
class nr extends M {
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
    r(t == null ? void 0 : t.layers) && (Mn(t.layers), i = t.layers.map((s) => s._layer)), r(t == null ? void 0 : t.features) && bn(t.features), this._interaction = new S.Select(Object.assign({}, Gn, {
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
    return r(t) && (t instanceof J ? i = t.getStyle() : A(t) && t.every((s) => s instanceof J) ? i = t.map((s) => s.getStyle()) : Ce(t) ? i = (s, o) => {
      let a = _.getUid(s), h = Ae(a), d = t(h, o);
      return d ? d.getStyle() : void 0;
    } : l(fe("initStyle", "style格式有误"))), i;
  }
  initFilter(t) {
    if (r(t))
      return (i, s) => {
        var h;
        let o = Ae(_.getUid(i)), a = (h = this.map) == null ? void 0 : h.getAllLayers().find((d) => _.getUid(d._layer) === _.getUid(s));
        return t(o, a);
      };
  }
  /**
   * 初始化Select事件
   */
  initSelectEvent() {
    this._isInitialized("initSelectEvent") && this._interaction.on("select", (t) => {
      const { selected: i, deselected: s } = t;
      this.selected = i.map((o) => Ae(_.getUid(o))).filter((o) => o !== null), this.deselected = s.map((o) => Ae(_.getUid(o))).filter((o) => o !== null);
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
    if (!r(t) || !r(i)) {
      l(fe("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!r(s) || s.length === 0) && this._interaction.on(t, (a) => {
      console.log("select", a), this.events.emit(t, Object.assign({}, Gt(this, t, a), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!r(t)) {
        l(fe("un", "参数不能为空"));
        return;
      }
      if (!g(t) && !w(t)) {
        l(fe("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!r(t) || !r(i)) {
      l(fe("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!r(s) || s.length === 0) && this._interaction.on(t, (a) => {
      this.events.emit(t, Object.assign({}, Gt(this, t, a), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.once(t, i);
  }
}
const Dn = {
  animate: !0,
  params: ["x", "y", "z", "r", "l"],
  replace: !1,
  prefix: ""
};
class rr extends M {
  constructor(e) {
    super("Link");
    let t = {
      ...e,
      animate: r(e == null ? void 0 : e.animate) && !Dt(e == null ? void 0 : e.animate) ? {
        ...e.animate,
        center: e.animate.center instanceof u ? e.animate.center.toArray() : e.animate.center
      } : y(e == null ? void 0 : e.animate, !0)
    };
    this._interaction = new S.Link(Object.assign({}, Dn, t)), this.initInteractionEvent();
  }
}
const Rn = {
  duration: 100,
  delta: 1
};
class sr extends M {
  constructor(e) {
    super("KeyboardZoom"), this._interaction = new S.KeyboardZoom(Object.assign({}, Rn, e || {})), this.initInteractionEvent();
  }
}
class or {
  constructor() {
  }
}
export {
  Z as Color,
  ji as DoubleClickZoom,
  Qn as DragBox,
  Ki as DragPan,
  or as DragZoom,
  We as Draw,
  Ze as DrawMode,
  E as Extent,
  Kn as GaodeLayer,
  Nn as GaodeLayerType,
  er as InteractionExtent,
  sr as KeyboardZoom,
  mn as LayerGroup,
  He as LineString,
  $e as LinearRing,
  rr as Link,
  u as Lnglat,
  Un as Map,
  jt as MapToken,
  Ke as Measure,
  V as MeasureMode,
  tr as Modify,
  Zi as MouseWheelZoom,
  $ as Pixel,
  Bt as Point,
  Vt as Polygon,
  Tt as Popup,
  $t as PopupPositioning,
  Wn as ProjUtil,
  q as Projection,
  nr as Select,
  L as Size,
  J as Style,
  Yn as TdtLayer,
  Hn as TileLayer,
  Le as VectorLayer,
  Jn as WMSLayer,
  qn as WMTSLayer,
  Xn as XYZLayer
};
