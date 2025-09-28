var Zt = Object.defineProperty;
var Ke = (n) => {
  throw TypeError(n);
};
var Ut = (n, e, t) => e in n ? Zt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => Ut(n, typeof e != "symbol" ? e + "" : e, t), He = (n, e, t) => e.has(n) || Ke("Cannot " + t);
var We = (n, e, t) => (He(n, e, "read from private field"), t ? t.call(n) : e.get(n)), qe = (n, e, t) => e.has(n) ? Ke("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), Ye = (n, e, t, i) => (He(n, e, "write to private field"), i ? i.call(n, t) : e.set(n, t), t);
import * as Xe from "ol";
import * as xe from "ol/layer";
import * as we from "ol/source";
import * as be from "ol/proj";
import * as A from "ol/interaction";
import * as _ from "ol/util";
import T from "ol/Feature";
import jt from "ol/Overlay";
import * as x from "ol/geom";
import * as S from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import * as Je from "ol/sphere";
import { createBox as Nt } from "ol/interaction/Draw";
import * as Qe from "ol/Observable";
function s(n) {
  return n != null;
}
function me(n, e) {
  return s(n) ? n : e;
}
function o(n) {
  console.warn("omap warn", n);
}
function d(n) {
  throw new Error(`omap error ${n}`);
}
function p(n) {
  return (e, t) => `📦${n}【${e}】: ${t}`;
}
const Kt = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function ve(n) {
  return typeof n == "function";
}
function z(n) {
  return Array.isArray(n);
}
function et(n) {
  return Array.isArray(n) && n.length === 0;
}
function f(n) {
  return typeof n == "number";
}
function w(n) {
  return typeof n == "string";
}
function Ht(n) {
  return n === "";
}
function St(n) {
  return typeof n == "boolean";
}
function Oe(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function k(n) {
  return z(n) && n.length === 2 && f(n[0]) && f(n[1]);
}
function ze(n) {
  return z(n) && n.length === 4 && f(n[0]) && f(n[1]) && f(n[2]) && f(n[3]);
}
function Ae(n) {
  return z(n) && n.length === 3 && n.every((e) => f(e) && e >= 0 && e <= 255);
}
function Wt(n) {
  return w(n) && Kt.test(n);
}
function ye(n) {
  return f(n) && n >= 0 && n <= 1;
}
function Ce(n) {
  let e = n.replace("#", "");
  return w(n) && n.startsWith("#") && (e.length === 6 || e.length === 3);
}
function qt(n) {
  let e = n.replace("#", "");
  return w(n) && n.startsWith("#") && e.length === 8;
}
function Q(n) {
  if (n.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (n = n.slice(1), n.length === 3)
    n = n.split("").map((r) => r + r).join("");
  else if (n.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(n.slice(0, 2), 16), t = parseInt(n.slice(2, 4), 16), i = parseInt(n.slice(4, 6), 16);
  return [e, t, i];
}
function tt(n) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = n.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Yt(n) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = n.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Xt(n) {
  return (parseInt(n, 16) / 255).toPrecision(2);
}
function it() {
  const n = /* @__PURE__ */ new Date(), e = n.getFullYear(), t = String(n.getMonth() + 1).padStart(2, "0"), i = String(n.getDate()).padStart(2, "0"), r = String(n.getHours()).padStart(2, "0"), a = String(n.getMinutes()).padStart(2, "0"), l = String(n.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${r}:${a}:${l}`;
}
function Jt() {
  return me(window.devicePixelRatio, 1);
}
const Qt = "Size", ee = p(Qt);
class nt {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size");
    (!f(e) || !f(t)) && d(ee("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return s(this._size) ? !0 : (o(ee(e, "未正确实例化")), !1);
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
      if (!f(e[0]) || !f(e[1])) {
        o(ee("setSize", "参数格式有误"));
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
      if (!f(e)) {
        o(ee("setWidth", "参数格式有误"));
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
      if (!f(e)) {
        o(ee("setHeight", "参数格式有误"));
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
   * 以字符串的形式输出尺寸
   * @returns {string} sizeStr
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._size[0]}, ${this._size[1]}]` : "";
  }
}
const ei = "Pixel", H = p(ei);
class V {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    (!f(e) || !f(t)) && d(H("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return s(this._pixel) ? !0 : (o(H(e, "未正确实例化")), !1);
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
      if (!f(e[0]) || !f(e[1])) {
        o(H("setPixel", "参数格式有误"));
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
      if (!f(e)) {
        o(H("setX", "参数格式有误"));
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
      if (!f(e)) {
        o(H("setY", "参数格式有误"));
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
    if (!s(e)) {
      o(H("equals", "参数未正确实例化"));
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
const ti = "Lnglat", te = p(ti);
class u {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    c(this, "_lnglat");
    (!f(e) || !f(t)) && d(te("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (o(te(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!f(e)) {
        o(te("setLng", "传入经度格式有误"));
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
      if (!f(e)) {
        o(te("setLat", "传入纬度格式有误"));
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
      o(te("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !k(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const rt = {
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
}, ii = "Color", ae = p(ii);
class U {
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
      d(ae("constructor", "初始化参数有误"));
    };
    if (z(e)) {
      let i = e;
      if (i.length === 3) {
        if (!Ae(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!Ae(i.slice(0, 3)) || !ye(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!Ce(i[0]) || !ye(i[1])) {
          t();
          return;
        }
        let r = Q(e[0]);
        if (!s(r)) {
          t();
          return;
        }
        this._color = `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${i[1]})`;
      } else {
        t();
        return;
      }
    }
    if (Oe(e)) {
      let i = e;
      if (!s(i.color) && !(s(i.r) && s(i.g) && s(i.b))) {
        t();
        return;
      }
      if (s(i.color)) {
        if (Ce(i.color)) {
          let r = Q(i.color);
          if (!s(r)) {
            t();
            return;
          }
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${i.alpha || i.opacity})` : `rgb(${r[0]}, ${r[1]}, ${r[2]})`;
        }
        if (Wt(i.color)) {
          let r = tt(i.color).join(", ");
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${r}, ${i.alpha || i.opacity})` : `rgb(${r})`;
        }
      } else if (s(i.r) && s(i.g) && s(i.b)) {
        if (!Ae([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = s(i.alpha) || s(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (w(e)) {
      if (Ht(e)) {
        t();
        return;
      }
      if (Ce(e)) {
        let i = Q(e);
        if (!s(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (qt(e)) {
        let i = Q(e.slice(0, 7));
        if (!s(i)) {
          t();
          return;
        }
        let r = Xt(e.slice(6));
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${r})`;
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
    if (!ye(e)) {
      d(ae("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...tt(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...Yt(this._color), e]);
    else {
      if (!s(rt[this._color])) {
        d(ae("withAlpha", "颜色值有误"));
        return;
      }
      let t = Q(rt[this._color]);
      if (!s(t)) {
        d(ae("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const ni = "Extent", ie = p(ni);
class v {
  constructor(e, t, i, r) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    if (!f(e) || !f(t) || !f(i) || !f(r)) {
      d(ie("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < e || r < t) {
      d(ie("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [e, t, i, r];
  }
  _isInitialized(e) {
    return !s(this._extent) || this._extent.length !== 4 ? (o(ie(e, "未正确实例化")), !1) : !0;
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
  // getWidth(): number | undefined {
  //     if (!this._isInitialized('getWidth')) return undefined;
  //     return getWidth(this._extent);
  // }
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
   * 判断边界范围Extent是否包含某个点
   * @param extent 范围
   * @param position 位置
   * @return 判断结果
   */
  static containsCoordinate(e, t) {
    if (!(e instanceof v) || !(t instanceof u)) {
      o(ie("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!e._isInitialized("containsCoordinate") || !s(t.toArray())) return;
    const [i, r] = t.toArray();
    return i >= e._extent[0] && i <= e._extent[2] && e._extent[1] <= r && r <= e._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(e, t) {
    if (!(e instanceof v) || !(t instanceof v)) {
      o(ie("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function ri(n) {
  if (!s(n))
    return;
  const { color: e } = n;
  if (s(e))
    return new S.Fill({
      ...n,
      color: e instanceof U ? e.getColor() : e
    });
}
function si(n) {
  if (!s(n))
    return;
  const { color: e } = n;
  if (s(e))
    return new S.Stroke({
      ...n,
      color: e instanceof U ? e.getColor() : e
    });
}
function oi(n) {
  if (!s(n))
    return;
  const { fill: e, stroke: t } = n;
  let i = new S.Circle({
    ...n,
    fill: void 0,
    stroke: void 0
  });
  return s(e) && i.setFill(new S.Fill({
    color: e.color instanceof U ? e.color.getColor() : e.color
  })), s(t) && i.setStroke(new S.Stroke({
    color: t.color instanceof U ? t.color.getColor() : t.color
  })), i;
}
function ai(n) {
  return s(n) ? new S.Icon({
    ...n,
    color: n.color ? n.color instanceof U ? n.color.getColor() : n.color : void 0,
    offset: s(n.offset) ? n.offset.getPixel() : [0, 0],
    size: s(n.size) ? n.size.getSize() : void 0
  }) : void 0;
}
function li(n) {
  if (!s(n))
    return;
  let e = new S.RegularShape({
    ...n,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = n;
  return s(t) && e.setFill(new S.Fill({
    color: t.color instanceof U ? t.color.getColor() : t.color
  })), s(i) && e.setStroke(new S.Stroke({
    color: i.color instanceof U ? i.color.getColor() : i.color
  })), e;
}
const kt = (n, e) => {
  if (s(n)) {
    if (n.getType() === "Point")
      return new N({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (n.getType() === "LineString")
      return new N({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (n.getType() === "Polygon" || n.getType() === "Circle")
      return new N({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new U({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
class N {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: r, circle: a, icon: l, regularShape: h } = e;
    let g;
    a ? g = oi(a) : l ? g = ai(l) : h && (g = li(h)), this._style = new S.Style({
      fill: ri(t),
      stroke: si(i),
      image: g
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const ui = {
  bottomCenter: "bottom-center"
}, ci = "Popup", st = p(ci), di = {
  offset: new V(0, 0),
  position: void 0,
  positioning: ui.bottomCenter,
  stopEvent: !0,
  autoPan: !1,
  className: "ol-overlay-container ol-selectable"
};
class Dt {
  constructor(e) {
    c(this, "_popup");
    /**
     * Popup 的唯一ID
     */
    c(this, "id", null);
    var i;
    s(e.id) && (this.id = e.id);
    let t = Object.assign({}, di, e);
    delete t.id, this._popup = new jt({
      ...t,
      offset: (i = t.offset) == null ? void 0 : i.toArray(),
      position: s(t.position) ? t.position instanceof u ? t.position.toArray() : t.position : void 0
    });
  }
  _isInitialized(e) {
    return s(this._popup) ? !0 : (o(st(e, "未正确实例化")), !1);
  }
  /**
   * 获取弹窗位置
   * @returns {Lnglat | undefined} 弹窗位置
   */
  getPosition() {
    if (!this._isInitialized("getPosition")) return;
    let e = this._popup.getPosition();
    return s(e) ? new u(e[0], e[1]) : void 0;
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
  /**
   * 设置弹窗属性
   * @param {Record<string, any>} properties 弹窗属性
   */
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!s(e)) {
        o(st("setProperties", "参数不能为空"));
        return;
      }
      return this._popup.setProperties(e);
    }
  }
  /**
   * 获取弹窗属性
   * @returns {Record<string, any> | undefined} 弹窗属性
   */
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._popup.getProperties();
  }
  getElement() {
    if (this._isInitialized("getElement"))
      return this._popup.getElement();
  }
  setElement(e) {
    if (this._isInitialized("getElement"))
      return this._popup.setElement(e);
  }
  getOffset() {
    if (!this._isInitialized("getOffset")) return;
    let e = this._popup.getOffset();
    return new V(e[0], e[1]);
  }
  setOffset(e) {
    if (!this._isInitialized("setOffset")) return;
    let t = e instanceof V ? e.toArray() : e;
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
}
let Se = "BaseLayer", F = p(Se);
const ot = 1, at = !0, lt = 0, ut = 22, ct = 0, dt = 1 / 0, ft = 1, ht = {};
var se;
class X {
  // 图层所属组ID，默认null
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
    c(this, "opacity", ot);
    // 图层透明度，默认1
    c(this, "visible", at);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", lt);
    // 最小缩放级别，默认0
    c(this, "maxZoom", ut);
    // 最大缩放级别，默认22
    c(this, "minResolution", ct);
    // 最小分辨率，默认0r
    c(this, "maxResolution", dt);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", ft);
    // 图层层级，默认0
    c(this, "properties", ht);
    // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的对象
     */
    c(this, "target", null);
    qe(this, se, null);
    let i = t || {};
    this.type = e, Se = `${e}Layer`, F = p(Se), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || ot, this.visible = i.visible || at, this.extent = i.extent || null, this.minZoom = i.minZoom || lt, this.maxZoom = i.maxZoom || ut, this.minResolution = i.minResolution || ct, this.maxResolution = i.maxResolution || dt, this.zIndex = i.zIndex || ft, this.properties = i.properties || ht;
  }
  _isInitialized(e) {
    return s(this._layer) ? !0 : (o(F(e, "未正确实例化")), !1);
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
  /**
   * 获取图层数据源
   * @returns 
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
      if (!s(e)) {
        o(F("setOpacity", "透明度不能为空"));
        return;
      }
      if (!ye(e)) {
        o(F("setOpacity", "透明度必须为0~1的数字"));
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
      if (!s(e)) {
        o(F("setVisible", "可见性不能为空"));
        return;
      }
      if (St(e)) {
        o(F("setVisible", "可见性必须为boolean类型"));
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
   * 设置图层的范围
   */
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof v ? e.getExtent() : e;
    this._layer.setExtent(t);
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
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!s(e)) {
        o(F("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!f(e)) {
        o(F("setMinZoom", "minZoom必须为number类型"));
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
      if (!s(e)) {
        o(F("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!f(e)) {
        o(F("setMaxZoom", "maxZoom必须为number类型"));
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
      if (!s(e)) {
        o(F("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!f(e)) {
        o(F("setMinResolution", "minResolution必须为number类型"));
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
      if (!s(e)) {
        o(F("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!f(e)) {
        o(F("setMaxResolution", "maxResolution必须为number类型"));
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
      if (!s(e)) {
        o(F("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!f(e)) {
        o(F("setZIndex", "zIndex必须为number类型"));
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
    if (this._isInitialized("setProperties")) {
      if (!s(e)) {
        o(F("setProperties", "属性不能为空"));
        return;
      }
      if (Oe(e)) {
        o(F("setProperties", "属性必须为object类型"));
        return;
      }
      this._layer.setProperties(e);
    }
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._layer.getProperties();
  }
  getGroupId() {
    if (this._isInitialized("getGroupId"))
      return We(this, se);
  }
  // TODO
  setGroupId(e) {
    Ye(this, se, e);
  }
  /**
   * 设置图层当前的对象
   * @param {Map | Draw | Modify | Measure} target 图层所属的对象
   */
  setTarget(e) {
    this.target = e;
  }
  getTarget() {
    if (s(this.target))
      return this.target;
  }
}
se = new WeakMap();
const fi = "Event", gt = p(fi);
class Ge {
  constructor(e) {
    c(this, "events", /* @__PURE__ */ new Map());
    c(this, "target", null);
    c(this, "total", 0);
    this.events.clear(), this.target = e;
  }
  on(e, t) {
    let i = this.events.get(e) || [], r = ++this.total;
    return i.push({
      id: r,
      target: this.target,
      type: e,
      callback: t
    }), this.events.set(e, i), r;
  }
  once(e, t) {
    const i = this.events.get(e) || [], r = ++this.total;
    return i.push({
      id: r,
      target: this.target,
      type: e,
      callback: t,
      once: !0
    }), this.events.set(e, i), r;
  }
  emit(e, ...t) {
    const i = this.events.get(e);
    if (!i || i.length === 0) return this;
    for (let r = 0; r < i.length; ) {
      const a = i[r];
      try {
        a.callback.call(a.target, ...t);
      } catch (l) {
        d(gt("emit", `回调异常: ${String(l)}`));
      }
      a.once ? i.splice(r, 1) : r++;
    }
    return i.length === 0 && this.events.delete(e), this;
  }
  remove(e) {
    for (const [t, i] of this.events.entries()) {
      const r = i.findIndex((a) => a.id === e);
      if (r !== -1)
        return i.splice(r, 1), i.length === 0 && this.events.delete(t), this;
    }
    return o(gt("remove", `未找到 id=${e} 的监听`)), this;
  }
  off(e) {
    return e === void 0 ? this.events.clear() : this.events.delete(e), this;
  }
  getEventById(e) {
    for (const t of this.events.values()) {
      const i = t.find((r) => r.id === e);
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
const hi = "Interaction", gi = p(hi);
class C {
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
    c(this, "events", new Ge());
    c(this, "map", null);
    this.type = e;
  }
  initInteractionEvent() {
    this._isInitialized("initInteractionEvent") && this._interaction.on("change:active", (e) => {
      e.type === "change:active" && (this.active = this.getActive());
    });
  }
  _isInitialized(e) {
    return s(this._interaction) ? !0 : (o(gi(e, "未正确实例化")), !1);
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
const _i = "Feature", ne = p(_i);
class oe {
  constructor(e, t, i) {
    c(this, "id");
    c(this, "type");
    c(this, "_feature");
    c(this, "_geometry");
    this.type = e, t instanceof T ? this._initByFeature(t) : this._init(t, i);
  }
  _init(e, t) {
    switch (this.type) {
      case "Point":
        let i = e;
        this._geometry = new x.Point(i instanceof u ? i._lnglat : i);
        break;
      case "LineString":
        let r = e.map((g) => g instanceof u ? g._lnglat : g);
        this._geometry = new x.LineString(r);
        break;
      case "Polygon":
        let a = e.map((g) => g.map((m) => m instanceof u ? m._lnglat : m));
        this._geometry = new x.Polygon(a);
        break;
      case "LinearRing":
        let l = e.map((g) => g instanceof u ? g._lnglat : g);
        this._geometry = new x.LinearRing(l);
        break;
      case "Circle":
        let h = e;
        this._geometry = new x.Circle(h instanceof u ? h._lnglat : h, t);
        break;
    }
    this._feature = new T({
      geometry: this._geometry
    });
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return this._feature == null ? (o(ne(e, "未正确实例化")), !1) : !0;
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
      if (!s(e)) {
        o(ne("setProperties", "参数不能为空"));
        return;
      }
      if (!Oe(e)) {
        o(ne("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!s(e)) {
        o(ne("setId", "参数id不能为空"));
        return;
      }
      if (!f(e) && !w(e)) {
        o(ne("setId", "参数id格式有误"));
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
const pi = "Point", W = p(pi);
class $t extends oe {
  constructor(e, t) {
    if (!s(e)) {
      d(W("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof T)
      super("Point", e);
    else {
      if (!(e instanceof u) && !k(e)) {
        d(W("constructor", "坐标格式有误"));
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
    if (!s(e)) {
      d(W("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !k(e)) {
      d(W("setCoordinates", "坐标格式有误"));
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
    if (!s(e)) {
      d(W("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !ze(e)) {
      d(W("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof v ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function _t(n) {
  let e = !0;
  return z(n) || (e = !1), n.some((i) => !(i instanceof u) && !k(i)) && (e = !1), e;
}
const yi = "Point", L = p(yi);
class Ze extends oe {
  constructor(e, t) {
    if (!s(e)) {
      d(L("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof T)
      super("LineString", e);
    else {
      if (!_t(e)) {
        d(L("constructor", "坐标格式有误"));
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
    if (!s(e)) {
      d(L("setCoordinates", "参数不能为空"));
      return;
    }
    if (!_t(e)) {
      d(L("setCoordinates", "坐标格式有误"));
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
    if (!s(e)) {
      d(L("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !k(e)) {
      d(L("setCoordinates", "坐标格式有误"));
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
    if (!s(e)) {
      d(L("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(f(e) && e >= 0 && e <= 1)) {
      d(L("getCoordinateAt", "参数格式有误"));
      return;
    }
    let i = [], r = this._geometry.getCoordinateAt(e, i);
    return s(t) && (t instanceof u ? (t.setLng(i[0]), t.setLat(i[1])) : (t[0] = i[0], t[1] = i[1])), new u(r[0], r[1]);
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
    if (!s(e)) {
      d(L("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !ze(e)) {
      d(L("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof v ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function pt(n) {
  let e = !0;
  return z(n) || (e = !1), n.some((i) => !z(i)) && (e = !1), n.forEach((i) => {
    i.forEach((r) => {
      !(r instanceof u) && !k(r) && (e = !1);
    });
  }), e;
}
function ke(n) {
  let e = !0;
  return z(n) || (e = !1), n.some((i) => !(i instanceof u) && !k(i)) && (e = !1), e;
}
const mi = "Point", D = p(mi);
class Rt extends oe {
  constructor(e, t) {
    if (!s(e)) {
      d(D("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof T)
      super("Polygon", e);
    else {
      if (!pt(e)) {
        d(D("constructor", "坐标格式有误"));
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
    return this._geometry.getCoordinates(e).map((r) => r.map((a) => new u(a[0], a[1])));
  }
  /**
   * 设置多边形的坐标
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(e) {
    if (!s(e)) {
      d(D("setCoordinates", "参数不能为空"));
      return;
    }
    if (!pt(e)) {
      d(D("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i.map((r) => r instanceof u ? r.toArray() : r));
    this._geometry.setCoordinates(t);
  }
  /**
   * 向Polygon中添加LinearRing（内环）
   * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
   */
  appendLinearRing(e) {
    if (!s(e)) {
      d(D("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof Le) && !ke(e)) {
      d(D("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof Le)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof u ? i.toArray() : i);
      this._geometry.appendLinearRing(new Le(t)._geometry);
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
    let i = e instanceof u ? e.toArray() : e, r = this._geometry.getClosestPoint(i);
    return new u(r[0], r[1]);
  }
  /**
   * 返回多边形的内点
   * @returns {Point} 多边形的内点
   */
  getInteriorPoint() {
    let e = this._geometry.getInteriorPoint().getCoordinates();
    return new $t(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!s(e)) {
      d(D("intersectsCoordinate", "参数coordinates不能为空"));
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
    if (!s(e)) {
      d(D("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof v) && !ze(e)) {
      d(D("intersectsExtent", "坐标格式有误"));
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
const vi = "Circle", le = p(vi);
class Ei extends oe {
  constructor(e, t, i) {
    if (!s(e)) {
      d(le("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof T)
      super("Circle", e);
    else {
      if (!(e instanceof u) && !k(e)) {
        d(le("constructor", "坐标格式有误"));
        return;
      }
      if (!s(t)) {
        d(le("constructor", "radius参数不能为空"));
        return;
      }
      if (!f(t)) {
        d(le("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
}
const ue = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function Bt(n) {
  let e = null, t = n.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case ue.Point:
      e = new $t(n);
      break;
    case ue.LineString:
      e = new Ze(n);
      break;
    case ue.Polygon:
      e = new Rt(n);
      break;
    case ue.Circle:
      e = new Ei(n);
      break;
  }
  return e;
}
const R = {
  Distance: "Distance",
  Area: "Area"
}, Ii = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, ce = {
  measureStart: "measure:start",
  measureEnd: "measure:end"
}, De = {
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
}, Fi = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, Ue = "omap-measure-marker", $e = "omap-measure-marker-index";
function xi(n) {
  let e = "Point", t = null;
  switch (n) {
    case R.Distance:
      e = De.LineString;
      break;
    case R.Area:
      e = De.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
let M = null, b = null, J = null, je = null, Y = null, K = [], $ = [];
function wi(n, e, t) {
  n === R.Distance ? J = e : n === R.Area && (je = e), Y = t;
}
function Tt(n) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = n, e;
}
function zi(n, e) {
  if (M)
    if (M.children[0].innerHTML = Ee("总长", n), !e || e === "")
      M.children.length > 1 && M.removeChild(M.children[1]);
    else if (M.children.length > 1)
      M.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, M.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Ee("总长", n), t.appendChild(i), e && e !== "") {
      let r = document.createElement("p");
      r.className = "omap-measure-tooltip-text", r.innerHTML = e, t.appendChild(r);
    }
    M = t;
  }
  return M;
}
function yt(n, e) {
  if (b)
    if (b.children[0].innerHTML = Ee("面积", n), !e || e === "")
      b.children.length > 1 && b.removeChild(b.children[1]);
    else if (b.children.length > 1)
      b.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, b.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Ee("总长", n), t.appendChild(i), e && e !== "") {
      let r = document.createElement("p");
      r.className = "omap-measure-tooltip-text", r.innerHTML = e, t.appendChild(r);
    }
    b = t;
  }
  return b;
}
function Ai(n) {
  let e = document.createElement("span");
  return e.title = "删除", e.innerHTML = "×", e.style.color = "#FFFFFF", e.style.cursor = "pointer", e.addEventListener("click", (t) => {
    s(n) && n();
  }), e;
}
function mt(n) {
  let e = new Dt(n);
  return $.push(e), e;
}
function vt(n, e) {
  let t = document.createElement("div");
  t.className = `${Ue}-${e}`, t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(255, 255, 255, 0.8)", t.style.color = "#000000", t.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  let i = document.createElement("span");
  if (i.style.color = "var(--omap-primary-color)", i.style.margin = "0 5px", i.innerHTML = n, t.appendChild(i), e !== 0) {
    let r = document.createElement("span");
    r.title = "删除", r.innerHTML = "×", r.style.color = "#000000", r.style.cursor = "pointer", t.setAttribute($e, e.toString()), r.addEventListener("click", (a) => {
      console.log("点击删除");
      let l = t.getAttribute($e);
      console.log(l), s(l) && Ci(Number(l));
    }), t.appendChild(r);
  }
  return K.push(t), t;
}
function Ci(n) {
  if ($.length === 2)
    return It(), K = [], $.forEach((e, t) => {
      Et(t), t === $.length - 1 && ($ = []);
    }), !1;
  It(n), K.splice(n, 1), K.forEach((e, t) => {
    e.className = `${Ue}-${t}`, e.setAttribute($e, t.toString());
  }), Et(n), $.splice(n, 1), $.forEach((e, t) => {
    e.id = Be(t);
  }), Pi();
}
function Et(n) {
  if (s(Y)) {
    let e = Y.getPopupById(`omap-measure-marker-${n}`);
    s(e) && Y.removePopup(e);
  }
}
function It(n) {
  let e = J || je;
  if (s(e)) {
    let t = e.getGeometry();
    if (s(t))
      if (s(n)) {
        let i = [];
        (t instanceof x.LineString || t instanceof x.Polygon) && (i = t.getCoordinates()), i.splice(n, 1), (t instanceof x.LineString || t instanceof x.Polygon) && t.setCoordinates(i);
      } else
        t instanceof x.LineString ? t.setCoordinates([]) : t instanceof x.Polygon && t.setCoordinates([]);
  }
}
function Pi() {
  if (J) {
    let n = J.getGeometry().getCoordinates();
    K.forEach((e, t) => {
      if (t > 0) {
        let i = new Ze(n.slice(0, t + 1)), r = Y.getLength(i);
        e.children[0].innerHTML = s(r) ? Re(r) : "-";
      }
    });
  }
}
function Re(n) {
  return (n / 1e3).toFixed(2) + " km";
}
function Ft(n) {
  return (n / 1e6).toFixed(2) + " km²";
}
function Be(n) {
  return `${Ue}-${n}`;
}
function Ee(n, e) {
  return `${n}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${e || "-"}</span>`;
}
function Li() {
  K.forEach((n) => {
    n.remove();
  }), $.forEach((n) => {
    Y.removePopup(n);
  }), J = null, je = null, setTimeout(() => {
    K = [], $ = [];
  }, 200);
}
class Vt {
  constructor(e) {
    c(this, "popup");
    this.initPopup(e || "");
  }
  _isInitialized() {
    return !!s(this.popup);
  }
  initPopup(e) {
    let t = Tt(e);
    this.popup = new Dt({
      id: "omap-measure-popup",
      element: t,
      offset: new V(0, -10)
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
const G = new Vt("单击地图开始测量"), q = new Vt(""), Mi = "Measure", xt = p(Mi);
let wt = null, j = null;
class Te extends C {
  constructor(t, i) {
    if (!Object.values(R).includes(t)) {
      d(xt("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    c(this, "mode", null);
    c(this, "result", {
      value: 0,
      unit: ""
    });
    let r = null;
    this.layer = new Ie({
      style: kt
    }), r = this.layer.getSource();
    let a = Object.assign({}, Ii, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: r,
      features: void 0,
      style: void 0
    });
    this._interaction = new A.Draw({
      ...xi(t),
      ...a
    }), this.mode = t, t === R.Distance ? this.result.unit = "km" : t === R.Area && (this.result.unit = "km²"), this.initInteractionEvent(), this.initMeasureEvent();
  }
  /**
   * 初始化 测量事件
   */
  initMeasureEvent() {
    this._isInitialized("initMeasureEvent") && (this._interaction.on("change:active", (t) => {
      this._interaction.getActive() ? this.onMeasureActive() : this.onMeasureInActive();
    }), this._interaction.on("drawstart", (t) => {
      this.events.emit(ce.measureStart, {
        target: this,
        type: ce.measureStart
      }), this.onMeasureStart(t.feature);
    }), this._interaction.on("drawend", (t) => {
      this.onMeasureEnd();
    }));
  }
  onMeasureActive() {
    s(this.map) && (j || (j = this.map._map.on("pointermove", (t) => {
      G.updatePosition(t.coordinate);
    }))), this.result.value = 0;
  }
  onMeasureInActive() {
    j && (Qe.unByKey(j), j = null);
  }
  /**
   * 测量开始
   * @param feature 测量开始的feature
   */
  onMeasureStart(t) {
    var i;
    if (s(t)) {
      wt = t, wi(this.mode, t, this.map);
      let r = 0;
      (i = wt.getGeometry()) == null || i.on("change", (a) => {
        var h, g;
        const { target: l } = a;
        if (s(l)) {
          let m = l instanceof x.LineString ? l.getCoordinates().length : l.getCoordinates()[0].length;
          if (r === 0 && (r = m, l instanceof x.LineString)) {
            let P = vt("起点", 0), O = mt({
              id: Be(0),
              element: P,
              offset: new V(0, -10)
            });
            O.setPosition(l.getCoordinates()[0]), this.map.addPopup(O);
          }
          let I;
          if (l instanceof x.LineString ? I = (h = this.map) == null ? void 0 : h.getLength(new Ze(new T({
            geometry: l
          }))) : l instanceof x.Polygon && (I = (g = this.map) == null ? void 0 : g.getArea(new Rt(new T({
            geometry: l
          })))), s(I) && f(I) && (this.result.value = I), s(I) && f(I) && l instanceof x.LineString) {
            let P = m >= 2 ? zi(Re(I), I === 0 ? "" : "单击继续，双击结束测量") : Tt("单击地图开始测量");
            G.setElement(P);
          }
          if (l instanceof x.LineString) {
            if (m > r) {
              let P = m - 1 - 1, O = vt(Re(I), P), Ne = mt({
                id: Be(P),
                element: O,
                offset: new V(0, -10)
              });
              Ne.setPosition(l.getCoordinates()[l.getCoordinates().length - 1]), this.map.addPopup(Ne), r = m;
            }
          } else l instanceof x.Polygon && m >= 4 && (this.map.addPopup(q.getPopup()), q.setElement(yt(Ft(I), "单击继续，双击结束测量")), q.updatePosition(l.getInteriorPoint().getCoordinates()), G.setElement(void 0), G.updatePosition(void 0));
        } else
          o("target is undefined");
      });
    }
  }
  /**
   * 测量结束
   */
  onMeasureEnd() {
    if (this.setActive(!1), s(j) && Qe.unByKey(j), this.mode, R.Distance, this.mode === R.Area) {
      const t = yt(Ft(this.result.value));
      t.style.display = "flex", t.style.alignItems = "center", t.appendChild(Ai(() => {
        var i;
        q.updatePosition(void 0), q.setElement(void 0), (i = this.layer) == null || i.clear();
      })), q.setElement(t);
    }
    G.updatePosition(void 0), G.setElement(void 0), this.events.emit(ce.measureEnd, {
      target: this,
      type: ce.measureEnd
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
    this.map = t, this.map.addPopup(G.getPopup()), this.onMeasureActive();
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(xt("on", "参数不能为空"));
      return;
    }
    return this.events.on(t, i);
  }
  /**
   * 该移除的都移除掉
   */
  destroy() {
    G.updatePosition(void 0), this.setActive(!1), s(this.layer) && this.layer.clear(), Li();
  }
}
let bi = "VectorLayer", E = p(bi);
class Ie extends X {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = s(t.source) ? t.source : {}, r = {
      ...i,
      features: i.features ? i.features.map((a) => a.getFeature()) : []
    };
    this._layer = new xe.Vector({
      source: new we.Vector(r)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(E(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (s(i) && (this.target instanceof Ve || this.target instanceof Te)) {
        let r = Bt(i);
        r ? this.features.push(r) : o(E("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
    s(t) && (t instanceof N ? i = t.getStyle() : z(t) && t.every((r) => r instanceof N) ? i = t.map((r) => r.getStyle()) : ve(t) ? i = (r, a) => {
      let l = _.getUid(r), h = this.features.findIndex((m) => _.getUid(m.getFeature()) === l), g = t(h !== -1 ? this.features[h] : null, a);
      return g ? g.getStyle() : void 0;
    } : o(E("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!s(t)) {
      o(E("setId", "参数id不能为空"));
      return;
    }
    if (!f(t) && !w(t)) {
      o(E("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((r) => s(r.getId()) && r.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!s(t)) {
      o(E("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof v) && !ze(t)) {
      o(E("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let r = t instanceof v ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(r), l = [];
    return a.forEach((h) => {
      let g = _.getUid(h), m = this.features.findIndex((I) => _.getUid(I.getFeature()) === g);
      m !== -1 && l.push(this.features[m]);
    }), l;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!s(t)) {
      o(E("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !k(t)) {
      o(E("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof u ? t._lnglat : t;
    const r = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return r.forEach((l) => {
      let h = _.getUid(l), g = this.features.findIndex((m) => _.getUid(m.getFeature()) === h);
      g !== -1 && a.push(this.features[g]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!s(t)) {
        o(E("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!s(t) || !z(t)) {
        o(E("addFeatures", "参数格式有误不能为空"));
        return;
      }
      et(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!s(t)) {
        o(E("removeFeature", "参数不能为空"));
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
      if (!s(t) || !z(t)) {
        o(E("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      et(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!s(t) || !ve(t)) {
        o(E("forEachFeature", "参数格式有误"));
        return;
      }
      this.features.forEach((i, r) => {
        t(i, r);
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
      if (!s(i)) {
        o(E("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (r) => {
        let a = _.getUid(r), l = this.features.findIndex((h) => _.getUid(h.getFeature()) === a);
        s(l) && l !== -1 && i(this.features[l], 0);
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
      if (!s(i)) {
        o(E("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (r) => {
        let a = _.getUid(r), l = this.features.findIndex((h) => _.getUid(h.getFeature()) === a);
        s(l) && l !== -1 && i(this.features[l], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!s(t)) {
      o(E("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !k(t)) {
      o(E("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let r = t instanceof u ? t._lnglat : t, a = i ? (g) => {
      let m = _.getUid(g), I = this.features.findIndex((P) => _.getUid(P.getFeature()) === m);
      return i(this.features[I]);
    } : void 0;
    const l = this._layer.getSource().getClosestFeatureToCoordinate(r, a);
    let h = this.features.findIndex((g) => _.getUid(g.getFeature()) === _.getUid(l));
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
      if (!s(t)) {
        o(E("setStyle", "style参数不能为空"));
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
function Si(n) {
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
      e = "Circle", t = Nt();
      break;
  }
  return { type: e, geometryFunction: t };
}
const ki = "Draw", de = p(ki);
class Ve extends C {
  constructor(e, t) {
    if (!Object.values(De).includes(e)) {
      d(de("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof Ie ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : o(de("init", "layer参数不属于VectorLayer类型"))), s(i) || (this.layer = new Ie({
      style: kt
    }), i = this.layer.getSource());
    let r = Object.assign({}, Fi, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new A.Draw({
      ...Si(e),
      ...r
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, r;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), s(t)) {
        let a = Bt(t);
        a ? (this.layer.addFeature(a), console.log((r = this.layer) == null ? void 0 : r.getFeatures())) : o(de("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
      }
    });
  }
  /**
   * 追加坐标
   * @param coordinates 坐标
   */
  appendCoordinates(e) {
    if (!this._isInitialized("appendCoordinates")) return;
    if (!s(e)) {
      o(de("appendCoordinates", "coordinates参数不能为空"));
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
const Di = {
  onFocusOnly: !1,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: !0,
  constrainResolution: !1
};
class $i extends C {
  constructor(e) {
    super("MouseWheelZoom"), this._interaction = new A.MouseWheelZoom(Object.assign({}, Di, e || {})), this.initInteractionEvent();
  }
}
const Ri = {
  duration: 250,
  delta: 1
};
class Bi extends C {
  constructor(e) {
    super("DoubleClickZoom"), this._interaction = new A.DoubleClickZoom(Object.assign({}, Ri, e || {})), this.initInteractionEvent();
  }
}
const Ti = {
  onFocusOnly: !1,
  kinetic: void 0
};
class Vi extends C {
  constructor(e) {
    super("DragPan"), this._interaction = new A.DragPan(Object.assign({}, Ti, e || {})), this.initInteractionEvent();
  }
}
const Oi = [
  new $i(),
  new Bi(),
  new Vi()
], Pe = {
  pixelRatio: Jt(),
  layers: [],
  controls: [],
  interactions: Oi,
  popups: []
};
function zt(n) {
  return n.startsWith("map:");
}
function fe(n, e, t) {
  let i = {
    target: n,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new V(...t.pixel)), t.coordinate && (i.coordinate = new u(...t.coordinate));
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
const Gi = "Map", y = p(Gi);
let mn = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "layers", []);
    c(this, "interactions", []);
    c(this, "events", null);
    c(this, "popups", []);
    let i = t;
    const r = i.view;
    if (!s(r)) {
      d(y("constructor", "view参数不能为空"));
      return;
    }
    let a = r.projection || new B("EPSG:3857");
    w(a) && (a = new B(a));
    const l = {
      ...r,
      center: r.center instanceof u ? r.center._lnglat : r.center,
      // 中心点坐标
      extent: r.extent instanceof v ? r.extent._extent : r.extent,
      projection: a._projection
    }, h = new Xe.View(l);
    let g = me(i.interactions, Pe.interactions), m = me(i.popups, Pe.popups), I = Object.assign({}, Pe, {
      ...i,
      interactions: [],
      // interactions: mapInteractions.map(interaction => {
      //     return interaction.getInteraction() as OlInteractionInstanceType;
      // }),
      overlays: m.map((O) => O.getPopup()),
      view: h
    });
    I.target = e;
    const P = new Xe.Map(I);
    this._view = h, this._map = P, s(g) && g.length > 0 && g.forEach((O) => {
      this.addInteraction(O);
    }), this.events = new Ge(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(y(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new nt(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof nt ? e._size : e;
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
    if (!s(e)) {
      o(y("setCenter", "参数center不能为空"));
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
      if (!s(e)) {
        o(y("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!f(e)) {
        o(y("setZoom", "参数zoom必须为number类型"));
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
      if (!s(e)) {
        o(y("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!f(e)) {
        o(y("setResolution", "参数resolution必须为number类型"));
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
      if (!s(e)) {
        o(y("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!f(e)) {
        o(y("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, r, a] = e;
    return new v(t, i, r, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !f(e)) {
        o(y("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !f(e)) {
        o(y("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(e)) {
      o(y("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof en)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (s(t) && this.getLayerById(t)) {
      o(y("addLayer", "图层已存在"));
      return;
    }
    s(e._layer) && (this.layers.push(e), e instanceof X && (s(e.getTarget()) || e.setTarget(this)), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!s(e)) {
      o(y("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof X && s(i.getId()) && i.getId() === e && (t = i);
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
    if (!s(e)) {
      o(y("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!s(t))
      return o(y("removeLayerById", `找不到id为${e}(${w(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(y("on", "参数不能为空"));
      return;
    }
    let i = zt(e);
    const r = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? r.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, fe(this, e, h));
    }) : r.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, fe(this, e, h));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(y("un", "参数不能为空"));
        return;
      }
      if (!f(e)) {
        o(y("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(y("on", "参数不能为空"));
      return;
    }
    let i = zt(e);
    const r = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? r.on(e.replace("map:", ""), (h) => {
      this.events.emit(e, fe(this, e, h));
    }) : r.on(e.replace("view:", ""), (h) => {
      this.events.emit(e, fe(this, e, h));
    })), this.events.once(e, t);
  }
  // 属性管理
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._map.getProperties() || {};
  }
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!s(e)) {
        o(y("setProperties", "参数不能为空"));
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
    if (this.interactions.findIndex((r) => _.getUid(r._interaction) === _.getUid(e._interaction)) !== -1) {
      o(y("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof Ve || e instanceof Te) {
      const r = e.getLayer();
      s(r) && (r.setTarget(e), this.addLayer(r));
    }
    s(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction), e.setMap && e.setMap(this), e.setActive(!0));
  }
  getInteractions() {
    if (this._isInitialized("setProperties"))
      return this.interactions;
  }
  removeInteraction(e) {
    var i;
    let t = this.interactions.findIndex((r) => _.getUid(r._interaction) === _.getUid(e._interaction));
    if (t === -1) {
      o(y("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (s(e._interaction)) {
      if (this.interactions.splice(t, 1), (i = this._map) == null || i.removeInteraction(e._interaction), e instanceof Ve || e instanceof Te) {
        const r = e.getLayer();
        s(r) && this.removeLayer(r);
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
      o(y("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    s(e._popup) && (this.popups.push(e), this._map.addOverlay(e._popup));
  }
  getPopupById(e) {
    return this.popups.find((i) => i.id === e);
  }
  removePopup(e) {
    let t = this.popups.findIndex((i) => _.getUid(i._popup) === _.getUid(e._popup));
    t !== -1 && (this.popups.splice(t, 1), this._map.removeOverlay(e._popup));
  }
  // 几何图形计算
  getLength(e) {
    return this._isInitialized("getLength") ? Je.getLength(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  getArea(e) {
    return this._isInitialized("getArea") ? Je.getArea(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
};
const Zi = "Map", At = p(Zi);
class B {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (w(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!s(i.code)) {
        d(At("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = be.get(t), !s(this._projection)) {
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
}
const Ui = "LinearRing", he = p(Ui);
class Le extends oe {
  constructor(e, t) {
    if (!s(e)) {
      d(he("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof T)
      super("LinearRing", e);
    else {
      if (!ke(e)) {
        d(he("constructor", "坐标格式有误"));
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
    if (!s(e)) {
      d(he("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ke(e)) {
      d(he("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const ji = {
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
class En extends X {
  constructor(t, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    this.gaodeType = t, this._layer = new xe.Tile({
      source: new we.XYZ({
        urls: ji[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const Ni = "ProjUtil", Ct = p(Ni);
class In {
  static fromLonLat(e, t) {
    if (!s(e)) {
      o(Ct("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let r = s(t) ? w(t) ? new B(t) : t : new B("EPSG:3857"), a = be.fromLonLat(i, r._projection);
    return new u(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!s(e)) {
      o(Ct("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let r = s(t) ? w(t) ? new B(t) : t : new B("EPSG:3857"), a = be.toLonLat(i, r._projection);
    return new u(a[0], a[1]);
  }
}
const Me = "OMapToken", Ki = {
  tdt: null
};
function Hi(n, e) {
  window[Me] || (window[Me] = {}), window[Me][n] = e;
}
const Ot = new Proxy(Ki, {
  set: function(n, e, t, i) {
    return Hi(e, t), Reflect.set(n, e, t, i);
  }
}), Wi = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function qi(n, e) {
  return Wi.replace(/\{T\}/g, n + "_" + e).replace(/\{tk\}/g, Ot.tdt);
}
let Yi = "TdtLayer", Pt = p(Yi);
class Fn extends X {
  constructor(t, i) {
    var a, l, h;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!s(Ot.tdt)) {
      d(Pt("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(t)) {
      d(Pt("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let r = i || {};
    delete r.source, r.map, this.tdtType = t, this._layer = new xe.Tile({
      ...r,
      extent: s(r.extent) ? (a = r.extent) == null ? void 0 : a._extent : void 0,
      map: s(r.map) ? (l = r.map) == null ? void 0 : l._map : void 0,
      background: s(r.background) ? (h = r.background) == null ? void 0 : h._color : void 0,
      source: new we.XYZ({
        url: qi(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let Xi = "TileLayer", Ji = p(Xi);
class xn extends X {
  constructor(e) {
    super("Tile", e);
    let t = s(e.source) ? e.source : {}, i = new B("EPSG:3857"), r = t.projection;
    s(r) && (r instanceof B ? i = r : w(r) ? i = new B(r) : o(Ji("constructor", "未知的投影类型")));
    let a = {
      ...t,
      projection: i._projection
    };
    this._layer = new xe.Tile({
      // TODO 这里不一定是XYZ
      source: new we.XYZ({
        ...a
      })
    }), this._initLayerEvent();
  }
}
let Qi = "LayerGroup", ge = p(Qi);
class en {
  constructor(e, t) {
    c(this, "id", null);
    c(this, "layers", []);
    if (!s(e)) {
      d(ge("constructor", "参数不能为空"));
      return;
    }
    let i, r = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (r = e, !s(t)) {
        d(ge("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    s(r) && (this.id = r), this.layers = i;
  }
  add(e) {
    if (!s(e)) {
      d(ge("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (s(t) && this.layers.find((r) => r.getId() && r.getId() === t)) {
      o(ge("add", "图层已存在"));
      return;
    }
    this.layers.push(e);
  }
  remove(e) {
    if (f(e)) {
      this.layers.splice(e, 1);
      return;
    }
    let t = e.getId();
    if (s(t)) {
      let i = this.layers.find((r) => r.getId() && r.getId() === t);
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
function Lt(n, e, t) {
  return {
    target: n,
    type: e,
    pixel: new V(t.pixel[0], t.pixel[1]),
    coordinate: new u(t.coordinate[0], t.coordinate[1])
  };
}
const tn = "DragBox", _e = p(tn);
class wn extends C {
  constructor(e) {
    super("DragBox"), this._interaction = new A.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && ve(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new u(t.coordinate[0], t.coordinate[1]),
          pixel: new V(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new Ge(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(_e("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!s(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, Lt(this, e, a));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(_e("un", "参数不能为空"));
        return;
      }
      if (!f(e)) {
        o(_e("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(_e("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!s(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, Lt(this, e, a));
    }), this.events.once(e, t);
  }
}
const nn = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class zn extends C {
  constructor(e) {
    super("Extent"), this._interaction = new A.Extent(Object.assign({}, nn, e || {})), this.initInteractionEvent();
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
function Mt(n, e, t) {
  return {
    target: n,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const rn = "Modify", Z = p(rn), sn = {
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
let An = class extends C {
  constructor(t) {
    super("Modify");
    c(this, "records", []);
    let i = null;
    s(t.layer) || d(Z("init", "layer参数不能为空")), s(t.layer) && !(t.layer instanceof Ie) && d(Z("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let r = Object.assign({}, sn, {
      ...t,
      source: i
    });
    this._interaction = new A.Modify(r), this.initInteractionEvent(), this.initModifyEvent();
  }
  initModifyEvent() {
    if (!this._isInitialized("initModifyEvent")) return;
    let i = (this.layer.getFeatures() || []).map((r) => ({
      id: r.id,
      originFeatureId: _.getUid(r._feature),
      type: r.type,
      coordinates: r.getCoordinates()
    }));
    this.records.push({
      time: it(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (r) => {
      let a = r.features.getArray(), l = [];
      a.forEach((h) => {
        let g = this.layer.getFeatures().find((m) => _.getUid(m._feature) === _.getUid(h));
        g && l.push({
          id: g.id,
          originFeatureId: _.getUid(g._feature),
          type: g.type,
          coordinates: g.getCoordinates()
        });
      }), this.records.push({
        time: it(),
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
    if (!s(t)) {
      o(Z("insertPoint", "coordinates参数不能为空"));
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
    if (!s(t)) {
      o(Z("removePoint", "coordinates参数不能为空"));
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
    let r = this.records.length - 1 - t;
    if (r === 0)
      return this.cancel(), !1;
    const { features: a } = this.records[r];
    return a.forEach((l) => {
      let h = this.layer.getFeatures().find((g) => l.id ? l.id === g.id : _.getUid(g._feature) === l.originFeatureId);
      h && h.setCoordinates(l.coordinates);
    }), this.records.splice(r + 1), !0;
  }
  /**
   * 取消当前全部修改，也就是回到初始状态
   */
  cancel() {
    const { features: t } = this.records[0];
    t.forEach((i) => {
      let r = this.layer.getFeatures().find((a) => i.id ? i.id === a.id : _.getUid(a._feature) === i.originFeatureId);
      r && r.setCoordinates(i.coordinates);
    }), this.records = [
      this.records[0]
    ];
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(Z("on", "参数不能为空"));
      return;
    }
    let r = this.events.get(t);
    return (!s(r) || r.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Mt(this, t, l));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!s(t)) {
        o(Z("un", "参数不能为空"));
        return;
      }
      if (!f(t)) {
        o(Z("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(Z("on", "参数不能为空"));
      return;
    }
    let r = this.events.get(t);
    return (!s(r) || r.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Mt(this, t, l));
    }), this.events.once(t, i);
  }
}, Fe = [], Gt = [];
function on(n) {
  Fe = n;
}
function an(n) {
  Gt = n, Fe = [];
}
function pe(n) {
  let e = null;
  if (Fe.length)
    for (const t of Fe) {
      let i = t.getFeatures().find((r) => _.getUid(r._feature) === n);
      i && (e = i);
    }
  else
    e = Gt.find((t) => _.getUid(t._feature) === n);
  return e;
}
function bt(n, e, t) {
  return {
    target: n,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const ln = "Select", re = p(ln), un = {
  layers: void 0,
  style: void 0,
  multi: !1,
  // 当为true的时候，支持一次选择n个重叠的要素
  features: void 0,
  filter: void 0,
  hitTolerance: 0
};
class Pn extends C {
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
    s(t == null ? void 0 : t.layers) && (on(t.layers), i = t.layers.map((r) => r._layer)), s(t == null ? void 0 : t.features) && an(t.features), this._interaction = new A.Select(Object.assign({}, un, {
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
    return s(t) && (t instanceof N ? i = t.getStyle() : z(t) && t.every((r) => r instanceof N) ? i = t.map((r) => r.getStyle()) : ve(t) ? i = (r, a) => {
      let l = _.getUid(r), h = pe(l), g = t(h, a);
      return g ? g.getStyle() : void 0;
    } : o(re("initStyle", "style格式有误"))), i;
  }
  initFilter(t) {
    if (s(t))
      return (i, r) => {
        var h;
        let a = pe(_.getUid(i)), l = (h = this.map) == null ? void 0 : h.getAllLayers().find((g) => _.getUid(g._layer) === _.getUid(r));
        return t(a, l);
      };
  }
  /**
   * 初始化Select事件
   */
  initSelectEvent() {
    this._isInitialized("initSelectEvent") && this._interaction.on("select", (t) => {
      const { selected: i, deselected: r } = t;
      this.selected = i.map((a) => pe(_.getUid(a))).filter((a) => a !== null), this.deselected = r.map((a) => pe(_.getUid(a))).filter((a) => a !== null);
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
    if (!s(t) || !s(i)) {
      o(re("on", "参数不能为空"));
      return;
    }
    let r = this.events.get(t);
    return (!s(r) || r.length === 0) && this._interaction.on(t, (l) => {
      console.log("select", l), this.events.emit(t, Object.assign({}, bt(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!s(t)) {
        o(re("un", "参数不能为空"));
        return;
      }
      if (!f(t) && !w(t)) {
        o(re("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(re("on", "参数不能为空"));
      return;
    }
    let r = this.events.get(t);
    return (!s(r) || r.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Object.assign({}, bt(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.once(t, i);
  }
}
const cn = {
  animate: !0,
  params: ["x", "y", "z", "r", "l"],
  replace: !1,
  prefix: ""
};
class Ln extends C {
  constructor(e) {
    super("Link");
    let t = {
      ...e,
      animate: s(e == null ? void 0 : e.animate) && !St(e == null ? void 0 : e.animate) ? {
        ...e.animate,
        center: e.animate.center instanceof u ? e.animate.center.toArray() : e.animate.center
      } : me(e == null ? void 0 : e.animate, !0)
    };
    this._interaction = new A.Link(Object.assign({}, cn, t)), this.initInteractionEvent();
  }
}
const dn = {
  duration: 100,
  delta: 1
};
class Mn extends C {
  constructor(e) {
    super("KeyboardZoom"), this._interaction = new A.KeyboardZoom(Object.assign({}, dn, e || {})), this.initInteractionEvent();
  }
}
class bn {
  constructor() {
  }
}
export {
  U as Color,
  Bi as DoubleClickZoom,
  wn as DragBox,
  Vi as DragPan,
  bn as DragZoom,
  Ve as Draw,
  De as DrawMode,
  v as Extent,
  En as GaodeLayer,
  zn as InteractionExtent,
  Mn as KeyboardZoom,
  en as LayerGroup,
  Ze as LineString,
  Le as LinearRing,
  Ln as Link,
  u as Lnglat,
  mn as Map,
  Ot as MapToken,
  Te as Measure,
  R as MeasureMode,
  An as Modify,
  $i as MouseWheelZoom,
  V as Pixel,
  $t as Point,
  Rt as Polygon,
  Dt as Popup,
  In as ProjUtil,
  B as Projection,
  Pn as Select,
  nt as Size,
  N as Style,
  Fn as TdtLayer,
  xn as TileLayer,
  Ie as VectorLayer
};
