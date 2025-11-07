var vi = Object.defineProperty;
var Ei = (r, e, t) => e in r ? vi(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => Ei(r, typeof e != "symbol" ? e + "" : e, t);
import * as zt from "ol";
import * as se from "ol/layer";
import * as ne from "ol/source";
import * as at from "ol/proj";
import * as O from "ol/interaction";
import * as g from "ol/util";
import M from "ol/Feature";
import Fi from "ol/Overlay";
import * as w from "ol/geom";
import * as K from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import * as xt from "ol/sphere";
import { createBox as zi } from "ol/interaction/Draw";
import * as Je from "ol/tilegrid";
import * as et from "ol/format";
import * as Ye from "ol/control";
import * as xe from "ol/easing";
import * as S from "ol/extent";
import * as At from "ol/Observable";
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
function xi(r) {
  return `参数${r}不能为空`;
}
function Ai(...r) {
  return `参数${r.join("、")}均不能为空`;
}
function wi(r, e) {
  return `参数${r}格式错误` + (e ? `，正确格式为${e}` : "");
}
function Pi(...r) {
  return `参数${r.join("、")}格式错误`;
}
function Ci(r) {
  return `参数${r}中存在无效数据，已过滤`;
}
const A = {
  paramsNotDefined: xi,
  paramsListHaveNotDefined: Ai,
  paramsInvaildFormat: wi,
  paramsListInvaildFormat: Pi,
  haveInvaildDataItem: Ci
}, Li = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function Ie(r) {
  return typeof r == "function";
}
function F(r) {
  return Array.isArray(r);
}
function wt(r) {
  return Array.isArray(r) && r.length === 0;
}
function m(r) {
  return typeof r == "number";
}
function L(r) {
  return typeof r == "string";
}
function Mi(r) {
  return r === "";
}
function It(r) {
  return typeof r == "boolean";
}
function Y(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function G(r) {
  return F(r) && r.length === 2 && m(r[0]) && m(r[1]);
}
function De(r) {
  return F(r) && r.length === 4 && m(r[0]) && m(r[1]) && m(r[2]) && m(r[3]);
}
function tt(r) {
  return F(r) && r.length === 3 && r.every((e) => m(e) && e >= 0 && e <= 255);
}
function Si(r) {
  return L(r) && Li.test(r);
}
function He(r) {
  return m(r) && r >= 0 && r <= 1;
}
function it(r) {
  let e = r.replace("#", "");
  return L(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function bi(r) {
  let e = r.replace("#", "");
  return L(r) && r.startsWith("#") && e.length === 8;
}
function Qe(r) {
  const e = r.every((t) => m(t));
  return F(r) && e;
}
function Ae(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function Pt(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Gi(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Ti(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
function Ct() {
  const r = /* @__PURE__ */ new Date(), e = r.getFullYear(), t = String(r.getMonth() + 1).padStart(2, "0"), i = String(r.getDate()).padStart(2, "0"), s = String(r.getHours()).padStart(2, "0"), a = String(r.getMinutes()).padStart(2, "0"), l = String(r.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${s}:${a}:${l}`;
}
function Ri() {
  return _(window.devicePixelRatio, 1);
}
const Di = "Size", we = y(Di);
class $ {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size", [0, 0]);
    let t = [0, 0];
    if (e.length === 1 && F(e[0]))
      t = e[0];
    else if (e.length === 2 && Qe(e))
      t = [e[0], e[1]];
    else {
      d(we("constructor", "初始化参数格式有误"));
      return;
    }
    this._size = t;
  }
  _isInitialized(e) {
    return n(this._size) ? !0 : (o(we(e, "未正确实例化")), !1);
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
      if (!m(e[0]) || !m(e[1])) {
        o(we("setSize", "参数格式有误"));
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
      if (!m(e)) {
        o(we("setWidth", "参数格式有误"));
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
      if (!m(e)) {
        o(we("setHeight", "参数格式有误"));
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
const ki = "Pixel", me = y(ki);
class D {
  constructor(...e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    let t = [0, 0];
    if (e.length === 1 && F(e[0]))
      t = e[0];
    else if (e.length === 2 && Qe(e))
      t = [e[0], e[1]];
    else {
      d(me("constructor", "初始化参数格式有误"));
      return;
    }
    this._pixel = t;
  }
  _isInitialized(e) {
    return n(this._pixel) ? !0 : (o(me(e, "未正确实例化")), !1);
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
      if (!m(e[0]) || !m(e[1])) {
        o(me("setPixel", "参数格式有误"));
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
      if (!m(e)) {
        o(me("setX", "参数格式有误"));
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
      if (!m(e)) {
        o(me("setY", "参数格式有误"));
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
      o(me("equals", "参数未正确实例化"));
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
const $i = "Lnglat", Pe = y($i);
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
    if (e.length === 1 && F(e[0]))
      t = e[0];
    else if (e.length === 2 && Qe(e))
      t = e;
    else {
      d(Pe("constructor", "初始化参数格式有误"));
      return;
    }
    this._lnglat = t;
  }
  _isInitialized(e) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(Pe(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!m(e)) {
        o(Pe("setLng", "传入经度格式有误"));
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
      if (!m(e)) {
        o(Pe("setLat", "传入纬度格式有误"));
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
      o(Pe("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
const Lt = {
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
}, Bi = "Color", $e = y(Bi);
class Q {
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
      d($e("constructor", "初始化参数有误"));
    };
    if (F(e)) {
      let i = e;
      if (i.length === 3) {
        if (!tt(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!tt(i.slice(0, 3)) || !He(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!it(i[0]) || !He(i[1])) {
          t();
          return;
        }
        let s = Ae(e[0]);
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
    if (Y(e)) {
      let i = e;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        t();
        return;
      }
      if (n(i.color)) {
        if (it(i.color)) {
          let s = Ae(i.color);
          if (!n(s)) {
            t();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (Si(i.color)) {
          let s = Pt(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!tt([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (L(e)) {
      if (Mi(e)) {
        t();
        return;
      }
      if (it(e)) {
        let i = Ae(e);
        if (!n(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (bi(e)) {
        let i = Ae(e.slice(0, 7));
        if (!n(i)) {
          t();
          return;
        }
        let s = Ti(e.slice(6));
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
    if (!He(e)) {
      d($e("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...Pt(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...Gi(this._color), e]);
    else {
      if (!n(Lt[this._color])) {
        d($e("withAlpha", "颜色值有误"));
        return;
      }
      let t = Ae(Lt[this._color]);
      if (!n(t)) {
        d($e("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
function E(r) {
  if (n(r))
    return r instanceof z ? r.getExtent() : r;
}
function v(r) {
  if (n(r))
    return r instanceof u ? r.toArray() : r;
}
const Oi = "Extent", Ce = y(Oi);
class z {
  constructor(...e) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    let t = [];
    if (e.length === 1 && F(e[0]))
      t = e[0];
    else if (e.length === 4 && Qe(e))
      t = e;
    else {
      d(Ce("constructor", "初始化参数格式有误"));
      return;
    }
    this._extent = t;
  }
  _isInitialized(e) {
    return !n(this._extent) || this._extent.length !== 4 ? (o(Ce(e, "未正确实例化")), !1) : !0;
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
      return new u(...S.getTopLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new u(...S.getTopRight(this._extent));
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new u(...S.getBottomLeft(this._extent));
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new u(...S.getBottomRight(this._extent));
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new u(...S.getCenter(this._extent));
  }
  /**
   * 获取宽度信息
   * @returns {number} 宽度
   */
  getWidth() {
    if (this._isInitialized("getWidth"))
      return S.getWidth(this._extent);
  }
  /**
   * 获取高度信息
   * @returns {number} 高度
   */
  getHeight() {
    if (this._isInitialized("getHeight"))
      return S.getHeight(this._extent);
  }
  getSize() {
    if (this._isInitialized("getHeight"))
      return new $(...S.getSize(this._extent));
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
      d(Ce("boundingExtent", "参数coordinates不能为空"));
      return;
    }
    if (!F(e)) {
      d(Ce("boundingExtent", "参数coordinates格式错误，必须为数组"));
      return;
    }
    let t = e.filter((a) => a instanceof u || G(a));
    t.length < e.length && o(Ce("boundingExtent", "参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型"));
    let i = t.map((a) => a instanceof u ? a.toArray() : a), s = S.boundingExtent(i);
    return new z(...s);
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param {OMapExtentType} extent 范围
   * @param {OMapCoordinateType} coordinate 位置
   * @return {boolean} 判断结果
   */
  static containsCoordinate(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = v(t);
    if (!(!n(i) || !n(s)))
      return S.containsCoordinate(i, s);
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
      return S.containsExtent(i, s);
  }
  static containsXY(e, t, i) {
    if (!n(e) || !n(t) || !n(i)) return;
    let s = E(e);
    if (n(s))
      return S.containsXY(s, t, i);
  }
  static createEmpty() {
    return new z(...S.createEmpty());
  }
  static equals(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return S.equals(i, s);
  }
  static extend(e, t) {
    if (!n(e) || !n(t)) return;
    let i = E(e), s = E(t);
    if (!(!n(i) || !n(s)))
      return new z(...S.extend(i, s));
  }
  static getArea(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return S.getArea(t);
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
      return S.intersects(i, s);
  }
  static isEmpty(e) {
    if (!n(e)) return;
    let t = E(e);
    if (n(t))
      return S.isEmpty(t);
  }
}
function ji(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new K.Fill({
      ...r,
      color: e instanceof Q ? e.getColor() : e
    });
}
function Vi(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new K.Stroke({
      ...r,
      color: e instanceof Q ? e.getColor() : e
    });
}
function Ui(r) {
  if (!n(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new K.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return n(e) && i.setFill(new K.Fill({
    color: e.color instanceof Q ? e.color.getColor() : e.color
  })), n(t) && i.setStroke(new K.Stroke({
    color: t.color instanceof Q ? t.color.getColor() : t.color
  })), i;
}
function Ni(r) {
  return n(r) ? new K.Icon({
    ...r,
    color: r.color ? r.color instanceof Q ? r.color.getColor() : r.color : void 0,
    offset: n(r.offset) ? r.offset.getPixel() : [0, 0],
    size: n(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function Zi(r) {
  if (!n(r))
    return;
  let e = new K.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return n(t) && e.setFill(new K.Fill({
    color: t.color instanceof Q ? t.color.getColor() : t.color
  })), n(i) && e.setStroke(new K.Stroke({
    color: i.color instanceof Q ? i.color.getColor() : i.color
  })), e;
}
const ci = (r, e) => {
  if (n(r)) {
    if (r.getType() === "Point")
      return new re({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (r.getType() === "LineString")
      return new re({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (r.getType() === "Polygon" || r.getType() === "Circle")
      return new re({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new Q({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
function Ki(r) {
  if (n(r)) {
    if (r instanceof re)
      return r.getStyle();
    if (Array.isArray(r))
      return r.map((e) => e.getStyle());
    if (Ie(r))
      return;
  }
}
class re {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: s, circle: a, icon: l, regularShape: f } = e;
    let h;
    a ? h = Ui(a) : l ? h = Ni(l) : f && (h = Zi(f)), this._style = new K.Style({
      fill: ji(t),
      stroke: Vi(i),
      image: h
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const Wi = "Event", Mt = y(Wi);
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
        d(Mt("emit", `回调异常: ${String(l)}`));
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
    return o(Mt("remove", `未找到 id=${e} 的监听`)), this;
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
function Hi(r) {
  return m(r) && r > 0;
}
const di = {
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
function Yi(r) {
  return Object.values(di).includes(r);
}
const Xi = {
  offset: new D(0, 0),
  positioning: di.bottomCenter,
  stopEvent: !0,
  insertFirst: !0,
  autoPan: !1,
  className: "omap-popup-element"
};
function St(r) {
  return ["change:position", "change:positioning", "change:element", "change:offset"].includes(r);
}
function bt(r) {
  let e = document.createElement("div");
  return e.className = "omap-popup-default-element", e.innerHTML = r, e;
}
function Be(r, e, t) {
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
const qi = "Popup", le = y(qi);
class fi {
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
    let t = Object.assign({}, Xi, e);
    delete t.id, n(t.content) && L(t.content) && !n(t.element) && (this.content = t.content, t.element = bt(t.content)), n(t.element) && t.element.classList.add("omap-popup-selectable"), this._popup = new Fi({
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
    return n(this._popup) ? !0 : (o(le(e, "未正确实例化")), !1);
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
      if (!Yi(e)) {
        o(le("setPositioning", "参数positioning值有误"));
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
        o(le("setProperties", "参数不能为空"));
        return;
      }
      this.events.emit("change:properties", Be(this, "change:properties", {
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
    this._isInitialized("setContent") && (this.events.emit("change:content", Be(this, "change:content", {
      oldValue: this.getContent(),
      key: "content",
      newValue: e
    })), this.content = e, this.setElement(bt(e)));
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
      o(le("on", "参数不能为空"));
      return;
    }
    if (St(e)) {
      let s = this.events.get(e);
      (!n(s) || s.length === 0) && this._popup.on(e, (a) => {
        console.log(a), this.events.emit(e, Be(this, e, a));
      });
    }
    return this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(le("un", "参数不能为空"));
        return;
      }
      if (!Hi(e)) {
        o(le("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(le("on", "参数不能为空"));
      return;
    }
    if (St(e)) {
      let s = this.events.get(e);
      (!n(s) || s.length === 0) && this._popup.on(e, (a) => {
        console.log(a), this.events.emit(e, Be(this, e, a));
      });
    }
    return this.events.once(e, t);
  }
  setMap(e) {
    this.map = e, n(e) && this._initElementEvent();
  }
}
function b(r) {
  if (n(r))
    return r instanceof $ ? r.toArray() : r;
}
function ue(r) {
  if (n(r))
    return r instanceof D ? r.toArray() : r;
}
const Ji = "Map", Gt = y(Ji);
class ge {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (L(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!n(i.code)) {
        d(Gt("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = at.get(t), !n(this._projection)) {
      o(Gt("constructor", "坐标系不存在"));
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
const he = /* @__PURE__ */ new WeakMap();
let lt = "BaseLayer", P = y(lt);
const Tt = 1, Rt = !0, Dt = 0, kt = 22, $t = 0, Bt = 1 / 0, Ot = 1, jt = {};
class R {
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
    c(this, "opacity", Tt);
    // 图层透明度，默认1
    c(this, "visible", Rt);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", Dt);
    // 最小缩放级别，默认0
    c(this, "maxZoom", kt);
    // 最大缩放级别，默认22
    c(this, "minResolution", $t);
    // 最小分辨率，默认0r
    c(this, "maxResolution", Bt);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", Ot);
    // 图层层级，默认0
    c(this, "properties", jt);
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
    this.type = e, lt = `${e}Layer`, P = y(lt), this.id = _(i.id, null), this.name = _(i.name, ""), this.className = _(i.className, ""), this.opacity = _(i.opacity, Tt), this.visible = _(i.visible, Rt), this.extent = _(i.extent, null), this.minZoom = _(i.minZoom, Dt), this.maxZoom = _(i.maxZoom, kt), this.minResolution = _(i.minResolution, $t), this.maxResolution = _(i.maxResolution, Bt), this.zIndex = _(i.zIndex, Ot), this.properties = _(i.properties, jt), this.map = _(i.map, null), he.set(this, {
      groupId: null
    });
  }
  _isInitialized(e) {
    return n(this._layer) ? !0 : (o(P(e, "未正确实例化")), !1);
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
        o(P("setOpacity", A.paramsNotDefined("opacity")));
        return;
      }
      if (!He(e)) {
        o(P("setOpacity", A.paramsInvaildFormat("opacity", "0~1的数字")));
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
        o(P("setVisible", A.paramsNotDefined("visible")));
        return;
      }
      if (!It(e)) {
        o(P("setVisible", A.paramsInvaildFormat("visible", "boolean类型")));
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
    return n(e) ? new z(...e) : void 0;
  }
  /**
   * 设置图层的范围
   * @param {OMapExtentType} extent 范围
   */
  setExtent(e) {
    if (this._isInitialized("setExtent")) {
      if (!n(e)) {
        o(P("setExtent", A.paramsNotDefined("extent")));
        return;
      }
      if (!(e instanceof z) && !De(e)) {
        o(P("setExtent", A.paramsInvaildFormat("extent", "Extent类型")));
        return;
      }
      this._layer.setExtent(E(e));
    }
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!n(e)) {
        o(P("setMinZoom", A.paramsNotDefined("minZoom")));
        return;
      }
      if (!m(e)) {
        o(P("setMinZoom", A.paramsInvaildFormat("minZoom", "number类型")));
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
        o(P("setMaxZoom", A.paramsNotDefined("maxZoom")));
        return;
      }
      if (!m(e)) {
        o(P("setMaxZoom", A.paramsInvaildFormat("maxZoom", "number类型")));
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
        o(P("setMinResolution", A.paramsNotDefined("minResolution")));
        return;
      }
      if (!m(e)) {
        o(P("setMinResolution", A.paramsInvaildFormat("minResolution", "number类型")));
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
        o(P("setMaxResolution", A.paramsNotDefined("maxResolution")));
        return;
      }
      if (!m(e)) {
        o(P("setMaxResolution", A.paramsInvaildFormat("maxResolution", "number类型")));
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
        o(P("setZIndex", A.paramsNotDefined("zIndex")));
        return;
      }
      if (!m(e)) {
        o(P("setZIndex", A.paramsInvaildFormat("zIndex", "number类型")));
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
      o(P("setProperties", A.paramsNotDefined("properties")));
      return;
    }
    if (Y(e)) {
      o(P("setProperties", A.paramsInvaildFormat("properties", "object类型")));
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
    return ((e = he.get(this)) == null ? void 0 : e.groupId) || null;
  }
  getGroupId() {
    return this.groupId;
  }
}
const Qi = "BasicFeature", Oe = y(Qi);
class H {
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
        o(Oe("setProperties", "参数不能为空"));
        return;
      }
      if (!Y(e)) {
        o(Oe("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!n(e)) {
        o(Oe("setId", "参数id不能为空"));
        return;
      }
      if (!m(e) && !L(e)) {
        o(Oe("setId", "参数id格式有误"));
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
const er = "Interaction", tr = y(er);
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
    return n(this._interaction) ? !0 : (o(tr(e, "未正确实例化")), !1);
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
const ir = "Point", ce = y(ir);
class Te extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(ce("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Point", e);
    else {
      if (!(e instanceof u) && !G(e)) {
        d(ce("constructor", "坐标格式有误"));
        return;
      }
      super("Point", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = v(e);
    i && (this._geometry = new w.Point(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(ce(e, "未正确实例化")), !1) : !0;
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
      d(ce("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof u) && !G(e)) {
      d(ce("setCoordinates", "坐标格式有误"));
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
      d(ce("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof z) && !De(e)) {
      d(ce("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof z ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function ut(r) {
  let e = !0;
  return F(r) || (e = !1), r.some((i) => !(i instanceof u) && !G(i)) && (e = !1), e;
}
const rr = "LineString", B = y(rr);
class vt extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(B("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("LineString", e);
    else {
      if (!ut(e)) {
        d(B("constructor", "坐标格式有误"));
        return;
      }
      super("LineString", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => v(s));
    i && (this._geometry = new w.LineString(i), this._feature = new M({
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
    if (!ut(e)) {
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
    return new z(e[0], e[1], e[2], e[3]);
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
    if (!(m(e) && e >= 0 && e <= 1)) {
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
    if (!(e instanceof z) && !De(e)) {
      d(B("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof z ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function ct(r) {
  let e = !0;
  return F(r) || (e = !1), r.some((i) => !F(i)) && (e = !1), r.forEach((i) => {
    i.forEach((s) => {
      !(s instanceof u) && !G(s) && (e = !1);
    });
  }), e;
}
function dt(r) {
  let e = !0;
  return F(r) || (e = !1), r.some((i) => !(i instanceof u) && !G(i)) && (e = !1), e;
}
const nr = "LinearRing", Le = y(nr);
class rt extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(Le("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("LinearRing", e);
    else {
      if (!dt(e)) {
        d(Le("constructor", "坐标格式有误"));
        return;
      }
      super("LinearRing", e), t && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => v(s));
    i && (this._geometry = new w.LinearRing(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(Le(e, "未正确实例化")), !1) : !0;
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
      d(Le("setCoordinates", "参数不能为空"));
      return;
    }
    if (!dt(e)) {
      d(Le("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const sr = "Polygon", V = y(sr);
class hi extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(V("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Polygon", e);
    else {
      if (!ct(e)) {
        d(V("constructor", "坐标格式有误"));
        return;
      }
      super("Polygon", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => s.map((a) => v(a)));
    i && (this._geometry = new w.Polygon(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(V(e, "未正确实例化")), !1) : !0;
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
      d(V("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ct(e)) {
      d(V("setCoordinates", "坐标格式有误"));
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
      d(V("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof rt) && !dt(e)) {
      d(V("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof rt)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof u ? i.toArray() : i);
      this._geometry.appendLinearRing(new rt(t)._geometry);
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
    return new z(e[0], e[1], e[2], e[3]);
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
    return new Te(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!n(e)) {
      d(V("intersectsCoordinate", "参数coordinates不能为空"));
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
      d(V("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof z) && !De(e)) {
      d(V("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof z ? e.getExtent() : e;
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
const or = "Circle", Me = y(or);
class ar extends H {
  constructor(e, t, i) {
    if (!n(e)) {
      d(Me("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("Circle", e);
    else {
      if (!(e instanceof u) && !G(e)) {
        d(Me("constructor", "坐标格式有误"));
        return;
      }
      if (!n(t)) {
        d(Me("constructor", "radius参数不能为空"));
        return;
      }
      if (!m(t)) {
        d(Me("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
  _init(e, t) {
    let i = v(e);
    i && (this._geometry = new w.Circle(i, t), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(Me(e, "未正确实例化")), !1) : !0;
  }
}
const je = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function oe(r) {
  let e = null, t = r.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case je.Point:
      e = new Te(r);
      break;
    case je.LineString:
      e = new vt(r);
      break;
    case je.Polygon:
      e = new hi(r);
      break;
    case je.Circle:
      e = new ar(r);
      break;
  }
  return e;
}
const J = {
  Distance: "Distance",
  Area: "Area"
}, lr = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, Ve = {
  measureStart: "measure:start",
  measureEnd: "measure:end"
}, ft = {
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
}, ur = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, Et = "omap-measure-marker", ht = "omap-measure-marker-index";
function cr(r) {
  let e = "Point", t = null;
  switch (r) {
    case J.Distance:
      e = ft.LineString;
      break;
    case J.Area:
      e = ft.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
let U = null, N = null, Ee = null, Ft = null, ye = null, _e = [], q = [];
function dr(r, e, t) {
  r === J.Distance ? Ee = e : r === J.Area && (Ft = e), ye = t;
}
function gi(r) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = r, e;
}
function fr(r, e) {
  if (U)
    if (U.children[0].innerHTML = Xe("总长", r), !e || e === "")
      U.children.length > 1 && U.removeChild(U.children[1]);
    else if (U.children.length > 1)
      U.children[1].innerHTML = e;
    else {
      let t = document.createElement("p");
      t.className = "omap-measure-tooltip-text", t.innerHTML = e, U.appendChild(t);
    }
  else {
    let t = document.createElement("div");
    t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(0, 0, 0, 0.5)", t.style.color = "#FFFFFF", t.style.fontSize = "12px";
    let i = document.createElement("p");
    if (i.innerHTML = Xe("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    U = t;
  }
  return U;
}
function Vt(r, e) {
  if (N)
    if (N.children[0].innerHTML = Xe("面积", r), !e || e === "")
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
    if (i.innerHTML = Xe("总长", r), t.appendChild(i), e && e !== "") {
      let s = document.createElement("p");
      s.className = "omap-measure-tooltip-text", s.innerHTML = e, t.appendChild(s);
    }
    N = t;
  }
  return N;
}
function hr(r) {
  let e = document.createElement("span");
  return e.title = "删除", e.innerHTML = "×", e.style.color = "#FFFFFF", e.style.cursor = "pointer", e.addEventListener("click", (t) => {
    n(r) && r();
  }), e;
}
function Ut(r) {
  let e = new fi(r);
  return q.push(e), e;
}
function Nt(r, e) {
  let t = document.createElement("div");
  t.className = `${Et}-${e}`, t.style.padding = "2px 5px", t.style.borderRadius = "5px", t.style.backgroundColor = "rgba(255, 255, 255, 0.8)", t.style.color = "#000000", t.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
  let i = document.createElement("span");
  if (i.style.color = "var(--omap-primary-color)", i.style.margin = "0 5px", i.innerHTML = r, t.appendChild(i), e !== 0) {
    let s = document.createElement("span");
    s.title = "删除", s.innerHTML = "×", s.style.color = "#000000", s.style.cursor = "pointer", t.setAttribute(ht, e.toString()), s.addEventListener("click", (a) => {
      console.log("点击删除");
      let l = t.getAttribute(ht);
      console.log(l), n(l) && gr(Number(l));
    }), t.appendChild(s);
  }
  return _e.push(t), t;
}
function gr(r) {
  if (q.length === 2)
    return Kt(), _e = [], q.forEach((e, t) => {
      Zt(t), t === q.length - 1 && (q = []);
    }), !1;
  Kt(r), _e.splice(r, 1), _e.forEach((e, t) => {
    e.className = `${Et}-${t}`, e.setAttribute(ht, t.toString());
  }), Zt(r), q.splice(r, 1), q.forEach((e, t) => {
    e.id = _t(t);
  }), _r();
}
function Zt(r) {
  if (n(ye)) {
    let e = ye.getPopupById(`omap-measure-marker-${r}`);
    n(e) && ye.removePopup(e);
  }
}
function Kt(r) {
  let e = Ee || Ft;
  if (n(e)) {
    let t = e.getGeometry();
    if (n(t))
      if (n(r)) {
        let i = [];
        (t instanceof w.LineString || t instanceof w.Polygon) && (i = t.getCoordinates()), i.splice(r, 1), (t instanceof w.LineString || t instanceof w.Polygon) && t.setCoordinates(i);
      } else
        t instanceof w.LineString ? t.setCoordinates([]) : t instanceof w.Polygon && t.setCoordinates([]);
  }
}
function _r() {
  if (Ee) {
    let r = Ee.getGeometry().getCoordinates();
    _e.forEach((e, t) => {
      if (t > 0) {
        let i = new vt(r.slice(0, t + 1)), s = ye.getLength(i);
        e.children[0].innerHTML = n(s) ? gt(s) : "-";
      }
    });
  }
}
function gt(r) {
  return (r / 1e3).toFixed(2) + " km";
}
function Wt(r) {
  return (r / 1e6).toFixed(2) + " km²";
}
function _t(r) {
  return `${Et}-${r}`;
}
function Xe(r, e) {
  return `${r}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${e || "-"}</span>`;
}
function mr() {
  _e.forEach((r) => {
    r.remove();
  }), q.forEach((r) => {
    ye.removePopup(r);
  }), Ee = null, Ft = null, setTimeout(() => {
    _e = [], q = [];
  }, 200);
}
class _i {
  constructor(e) {
    c(this, "popup");
    this.initPopup(e || "");
  }
  _isInitialized() {
    return !!n(this.popup);
  }
  initPopup(e) {
    let t = gi(e);
    this.popup = new fi({
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
const te = new _i("单击地图开始测量"), pe = new _i(""), pr = "Measure", Ht = y(pr);
let Yt = null, de = null;
class mt extends j {
  constructor(t, i) {
    if (!Object.values(J).includes(t)) {
      d(Ht("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    c(this, "mode", null);
    c(this, "result", {
      value: 0,
      unit: ""
    });
    let s = null;
    this.layer = new Fe({
      style: ci
    }), s = this.layer.getSource();
    let a = Object.assign({}, lr, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: s,
      features: void 0,
      style: void 0
    });
    this._interaction = new O.Draw({
      ...cr(t),
      ...a
    }), this.mode = t, t === J.Distance ? this.result.unit = "km" : t === J.Area && (this.result.unit = "km²"), this.initInteractionEvent(), this.initMeasureEvent();
  }
  /**
   * 初始化 测量事件
   */
  initMeasureEvent() {
    this._isInitialized("initMeasureEvent") && (this._interaction.on("change:active", (t) => {
      this._interaction.getActive() ? this.onMeasureActive() : this.onMeasureInActive();
    }), this._interaction.on("drawstart", (t) => {
      this.events.emit(Ve.measureStart, {
        target: this,
        type: Ve.measureStart
      }), this.onMeasureStart(t.feature);
    }), this._interaction.on("drawend", (t) => {
      this.onMeasureEnd();
    }));
  }
  onMeasureActive() {
    n(this.map) && (de || (de = this.map._map.on("pointermove", (t) => {
      te.updatePosition(t.coordinate);
    }))), this.result.value = 0;
  }
  onMeasureInActive() {
    de && (At.unByKey(de), de = null);
  }
  /**
   * 测量开始
   * @param feature 测量开始的feature
   */
  onMeasureStart(t) {
    var i;
    if (n(t)) {
      Yt = t, dr(this.mode, t, this.map);
      let s = 0;
      (i = Yt.getGeometry()) == null || i.on("change", (a) => {
        var f, h;
        const { target: l } = a;
        if (n(l)) {
          let I = l instanceof w.LineString ? l.getCoordinates().length : l.getCoordinates()[0].length;
          if (s === 0 && (s = I, l instanceof w.LineString)) {
            let k = Nt("起点", 0), X = Ut({
              id: _t(0),
              element: k,
              offset: new D(0, -10)
            });
            X.setPosition(l.getCoordinates()[0]), this.map.addPopup(X);
          }
          let x;
          if (l instanceof w.LineString ? x = (f = this.map) == null ? void 0 : f.getLength(new vt(new M({
            geometry: l
          }))) : l instanceof w.Polygon && (x = (h = this.map) == null ? void 0 : h.getArea(new hi(new M({
            geometry: l
          })))), n(x) && m(x) && (this.result.value = x), n(x) && m(x) && l instanceof w.LineString) {
            let k = I >= 2 ? fr(gt(x), x === 0 ? "" : "单击继续，双击结束测量") : gi("单击地图开始测量");
            te.setElement(k);
          }
          if (l instanceof w.LineString) {
            if (I > s) {
              let k = I - 1 - 1, X = Nt(gt(x), k), ee = Ut({
                id: _t(k),
                element: X,
                offset: new D(0, -10)
              });
              ee.setPosition(l.getCoordinates()[l.getCoordinates().length - 1]), this.map.addPopup(ee), s = I;
            }
          } else l instanceof w.Polygon && I >= 4 && (this.map.addPopup(pe.getPopup()), pe.setElement(Vt(Wt(x), "单击继续，双击结束测量")), pe.updatePosition(l.getInteriorPoint().getCoordinates()), te.setElement(void 0), te.updatePosition(void 0));
        } else
          o("target is undefined");
      });
    }
  }
  /**
   * 测量结束
   */
  onMeasureEnd() {
    if (this.setActive(!1), n(de) && At.unByKey(de), this.mode, J.Distance, this.mode === J.Area) {
      const t = Vt(Wt(this.result.value));
      t.style.display = "flex", t.style.alignItems = "center", t.appendChild(hr(() => {
        var i;
        pe.updatePosition(void 0), pe.setElement(void 0), (i = this.layer) == null || i.clear();
      })), pe.setElement(t);
    }
    te.updatePosition(void 0), te.setElement(void 0), this.events.emit(Ve.measureEnd, {
      target: this,
      type: Ve.measureEnd
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
    this.map = t, this.map.addPopup(te.getPopup()), this.onMeasureActive();
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(Ht("on", "参数不能为空"));
      return;
    }
    return this.events.on(t, i);
  }
  /**
   * 该移除的都移除掉
   */
  destroy() {
    te.updatePosition(void 0), this.setActive(!1), n(this.layer) && this.layer.clear(), mr();
  }
}
let yr = "VectorLayer", C = y(yr);
class Fe extends R {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = n(t.source) ? t.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((a) => a.getFeature()) : []
    };
    this._layer = new se.Vector({
      source: new ne.Vector(s)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(C(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (n(i) && (this.target instanceof pt || this.target instanceof mt)) {
        let s = oe(i);
        s ? this.features.push(s) : o(C("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
    n(t) && (t instanceof re ? i = t.getStyle() : F(t) && t.every((s) => s instanceof re) ? i = t.map((s) => s.getStyle()) : Ie(t) ? i = (s, a) => {
      let l = g.getUid(s), f = this.features.findIndex((I) => g.getUid(I.getFeature()) === l), h = t(f !== -1 ? this.features[f] : null, a);
      return h ? h.getStyle() : void 0;
    } : o(C("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!n(t)) {
      o(C("setId", "参数id不能为空"));
      return;
    }
    if (!m(t) && !L(t)) {
      o(C("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((s) => n(s.getId()) && s.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!n(t)) {
      o(C("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof z) && !De(t)) {
      o(C("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let s = t instanceof z ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(s), l = [];
    return a.forEach((f) => {
      let h = g.getUid(f), I = this.features.findIndex((x) => g.getUid(x.getFeature()) === h);
      I !== -1 && l.push(this.features[I]);
    }), l;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!n(t)) {
      o(C("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !G(t)) {
      o(C("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof u ? t._lnglat : t;
    const s = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return s.forEach((l) => {
      let f = g.getUid(l), h = this.features.findIndex((I) => g.getUid(I.getFeature()) === f);
      h !== -1 && a.push(this.features[h]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!n(t)) {
        o(C("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!n(t) || !F(t)) {
        o(C("addFeatures", "参数格式有误不能为空"));
        return;
      }
      wt(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!n(t)) {
        o(C("removeFeature", "参数不能为空"));
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
      if (!n(t) || !F(t)) {
        o(C("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      wt(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!n(t) || !Ie(t)) {
        o(C("forEachFeature", "参数格式有误"));
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
        o(C("forEachFeatureInExtent", "callback参数不能为空"));
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
        o(C("forEachFeatureIntersectingExtent", "callback参数不能为空"));
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
      o(C("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof u) && !G(t)) {
      o(C("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let s = t instanceof u ? t._lnglat : t, a = i ? (h) => {
      let I = g.getUid(h), x = this.features.findIndex((k) => g.getUid(k.getFeature()) === I);
      return i(this.features[x]);
    } : void 0;
    const l = this._layer.getSource().getClosestFeatureToCoordinate(s, a);
    let f = this.features.findIndex((h) => g.getUid(h.getFeature()) === g.getUid(l));
    if (f !== -1)
      return this.features[f];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new z(t[0], t[1], t[2], t[3]);
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
        o(C("setStyle", "style参数不能为空"));
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
function Ir(r) {
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
      e = "Circle", t = zi();
      break;
  }
  return { type: e, geometryFunction: t };
}
const vr = "Draw", Ue = y(vr);
class pt extends j {
  constructor(e, t) {
    if (!Object.values(ft).includes(e)) {
      d(Ue("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof Fe ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : o(Ue("init", "layer参数不属于VectorLayer类型"))), n(i) || (this.layer = new Fe({
      style: ci
    }), i = this.layer.getSource());
    let s = Object.assign({}, ur, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new O.Draw({
      ...Ir(e),
      ...s
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, s;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), n(t)) {
        let a = oe(t);
        a ? (this.layer.addFeature(a), console.log((s = this.layer) == null ? void 0 : s.getFeatures())) : o(Ue("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
      o(Ue("appendCoordinates", "coordinates参数不能为空"));
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
let Er = "LayerGroup", Z = y(Er);
class Xt {
  constructor(e, t) {
    /**
     * 图层组id
     * @type {IdType}
     */
    c(this, "id", null);
    c(this, "layers", []);
    c(this, "map", null);
    if (!n(e)) {
      d(Z("constructor", "参数不能为空"));
      return;
    }
    let i = _(t, []);
    m(e) || L(e) ? this.id = e : i = e;
    const s = i.filter((a) => n(a) && n(a.getLayer()) && a instanceof R);
    s.length !== i.length && o(Z("constructor", "图层参数错误，必须为BaseLayer实例，已进行过滤")), s.forEach((a) => {
      he.set(a, {
        groupId: this.id
      });
    }), this.layers = s, s.forEach((a) => {
      he.set(a, {
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
      o(Z("add", "参数layer不能为空"));
      return;
    }
    if (!(e instanceof R)) {
      o(Z("add", "参数layer必须为BaseLayer实例"));
      return;
    }
    if (this.layers.some((i) => g.getUid(i.getLayer()) === g.getUid(e.getLayer()))) {
      o(Z("add", "图层已存在"));
      return;
    }
    this.layers.push(e), he.set(e, {
      groupId: this.id
    }), n(this.map) && this.map.addLayer(e);
  }
  remove(e) {
    if (!n(e)) {
      o(Z("add", "参数layer不能为空"));
      return;
    }
    if (!(e instanceof R)) {
      o(Z("add", "参数layer必须为BaseLayer实例"));
      return;
    }
    let t = this.layers.findIndex((i) => g.getUid(i.getLayer()) === g.getUid(e.getLayer()));
    if (t === -1) {
      o(Z("remove", "图层不存在"));
      return;
    }
    this.layers.splice(t, 1), he.set(e, {
      groupId: null
    }), n(this.map) && this.map.removeLayer(e);
  }
  removeById(e) {
    if (!n(e)) {
      o(Z("removeById", "参数id不能为空"));
      return;
    }
    let t = this.layers.findIndex((s) => n(s.getId()) && s.getId() === e);
    if (t === -1) {
      o(Z("remove", "图层不存在"));
      return;
    }
    let i = this.layers[t];
    he.set(i, {
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
const Fr = {
  onFocusOnly: !1,
  maxDelta: 1,
  duration: 250,
  timeout: 80,
  useAnchor: !0,
  constrainResolution: !1
};
class zr extends j {
  constructor(e) {
    super("MouseWheelZoom"), this._interaction = new O.MouseWheelZoom(Object.assign({}, Fr, e || {})), this.initInteractionEvent();
  }
}
const xr = {
  duration: 250,
  delta: 1
};
class Ar extends j {
  constructor(e) {
    super("DoubleClickZoom"), this._interaction = new O.DoubleClickZoom(Object.assign({}, xr, e || {})), this.initInteractionEvent();
  }
}
const wr = {
  onFocusOnly: !1,
  kinetic: void 0
};
class Pr extends j {
  constructor(e) {
    super("DragPan"), this._interaction = new O.DragPan(Object.assign({}, wr, e || {})), this.initInteractionEvent();
  }
}
const Cr = [
  new zr(),
  new Ar(),
  new Pr()
], Lr = [], Ne = {
  pixelRatio: Ri(),
  layers: [],
  controls: [],
  interactions: Cr,
  popups: Lr
}, qt = {
  hitTolerance: 0,
  checkWrapped: !0
}, nt = {
  linear: xe.linear,
  easeIn: xe.easeIn,
  easeOut: xe.easeOut,
  inAndOut: xe.inAndOut,
  upAndDown: xe.upAndDown
}, Mr = {
  duration: 1e3,
  easing: "linear"
}, st = {
  padding: [0, 0, 0, 0],
  nearest: !1,
  minResolution: 0,
  duration: 1e3,
  easing: "easeOut"
};
function Jt(r) {
  return r && r.startsWith("map:");
}
function Ze(r, e, t) {
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
const Sr = "Map", p = y(Sr);
let hs = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "projection");
    c(this, "layers", []);
    c(this, "layerGroups", []);
    c(this, "interactions", []);
    c(this, "controls", []);
    c(this, "events", null);
    c(this, "popups", []);
    let i = t;
    const s = i.view;
    if (!n(s)) {
      d(p("constructor", "view参数不能为空"));
      return;
    }
    let a = s.projection || new ge("EPSG:3857");
    L(a) && (a = new ge(a)), this.projection = a;
    const l = {
      ...s,
      center: s.center instanceof u ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof z ? s.extent._extent : s.extent,
      projection: a._projection
    }, f = new zt.View(l);
    let h = _(i.interactions, Ne.interactions), I = _(i.controls, Ne.controls), x = _(i.popups, Ne.popups), k = Object.assign({}, Ne, {
      ...i,
      interactions: [],
      overlays: [],
      view: f
    });
    k.target = e;
    const X = new zt.Map(k);
    this._view = f, this._map = X, n(h) && h.length > 0 && h.forEach((ee) => {
      this.addInteraction(ee);
    }), n(I) && I.length > 0 && I.forEach((ee) => {
      this.addControl(ee);
    }), n(x) && x.length > 0 && x.forEach((ee) => {
      this.addPopup(ee);
    }), this.events = new ve(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(p(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new $(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof $ ? e._size : e;
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
      o(p("setCenter", "参数center不能为空"));
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
        o(p("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!m(e)) {
        o(p("setZoom", "参数zoom必须为number类型"));
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
        o(p("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!m(e)) {
        o(p("setResolution", "参数resolution必须为number类型"));
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
        o(p("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!m(e)) {
        o(p("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, s, a] = e;
    return new z(t, i, s, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !m(e)) {
        o(p("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !m(e)) {
        o(p("zoomIn", "参数delta必须为number类型"));
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
      o(p("addLayer", "图层对象不能为空"));
      return;
    }
    if (!(e instanceof R)) {
      o(p("addLayer", "图层对象必须为BaseLayer类型"));
      return;
    }
    const t = e.getId();
    let i = !1;
    if (n(t) ? i = this.getLayerById(t) !== void 0 : i = this.layers.some((s) => g.getUid(s.getLayer()) === g.getUid(e.getLayer())), i) {
      o(p("addLayer", "图层已存在"));
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
        o(p("addLayer", "参数layers不能为空"));
        return;
      }
      if (!F(e)) {
        o(p("addLayers", "参数layers必须为数组类型"));
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
      o(p("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof R && n(i.getId()) && i.getId() === e && (t = i);
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
      o(p("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!n(t))
      return o(p("removeLayerById", `找不到id为${e}(${L(e) ? "string" : "number"})的图层`)), !1;
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
      o(p("addLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(e instanceof Xt)) {
      o(p("addLayerGroup", "参数layerGroup必须为LayerGroup实例"));
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
      o(p("removeLayerGroup", "参数layerGroup不能为空"));
      return;
    }
    if (!(e instanceof Xt)) {
      o(p("removeLayerGroup", "参数layerGroup必须为LayerGroup实例"));
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
      o(p("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!m(e) && !L(e)) {
      o(p("removeLayerGroupById", "参数groupId必须为number或string类型"));
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
      o(p("removeLayerGroupById", "参数groupId不能为空"));
      return;
    }
    if (!m(e) && !L(e)) {
      o(p("removeLayerGroupById", "参数groupId必须为number或string类型"));
      return;
    }
    let t = this.layerGroups.findIndex((i) => n(i.getId()) && i.getId() === e);
    if (t === -1) {
      o(p("getLayerGroupById", "未找到图层组"));
      return;
    }
    return this.layerGroups[t];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(p("on", "参数不能为空"));
      return;
    }
    let i = Jt(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || n(a) && a.length === 0) && (i ? s.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, Ze(this, e, f));
    }) : s.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, Ze(this, e, f));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(p("un", "参数不能为空"));
        return;
      }
      if (!m(e)) {
        o(p("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(p("on", "参数不能为空"));
      return;
    }
    let i = Jt(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || a.length === 0) && (i ? s.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, Ze(this, e, f));
    }) : s.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, Ze(this, e, f));
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
      o(p("setProperties", A.paramsNotDefined("properties")));
      return;
    }
    if (!Y(e)) {
      o(p("setProperties", A.paramsInvaildFormat("properties", "object类型")));
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
      o(p("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof pt || e instanceof mt) {
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
      o(p("removeInteraction", "该交互未添加到地图中"));
      return;
    }
    if (n(e._interaction)) {
      if (this.interactions.splice(t, 1), (i = this._map) == null || i.removeInteraction(e._interaction), e instanceof pt || e instanceof mt) {
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
      o(p("addControl", "该控件已添加到地图中"));
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
      o(p("removeControl", "该控件未添加到地图中"));
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
      o(p("addPopup", "该弹窗已添加到地图中"));
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
      o(p("getPopupById", "参数不能为空"));
      return;
    }
    if (!m(e) && !L(e)) {
      o(p("getPopupById", "参数必须为数字或字符串"));
      return;
    }
    return this.popups.find((i) => n(i.getId()) && i.getId() === e);
  }
  getPopupByProperties(e) {
    if (!this._isInitialized("getPopupByProperties")) return;
    if (!n(e)) {
      o(p("getPopupById", "参数不能为空"));
      return;
    }
    if (!Ie(e)) {
      o(p("getPopupById", "参数必须为数字或字符串"));
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
      o(p("removePopup", "该弹窗未添加到地图中"));
      return;
    }
    n(e.getPopup()) && (this.popups.splice(t, 1), e.setMap && e.setMap(null), this._map.removeOverlay(e.getPopup()));
  }
  /** 几何图形计算 */
  getLength(e) {
    return this._isInitialized("getLength") ? xt.getLength(e.getGeometry(), {
      projection: this._map.getView().getProjection()
    }) : void 0;
  }
  getArea(e) {
    return this._isInitialized("getArea") ? xt.getArea(e.getGeometry(), {
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
    if (!this._isInitialized("forEachFeatureAtPixel") || !ue(e)) return;
    const s = Object.assign({}, qt, i);
    return this._map.forEachFeatureAtPixel(ue(e), (l, f) => {
      let h = null, I = null;
      return this.layers.forEach((x) => {
        g.getUid(x.getLayer()) === g.getUid(f) && (I = x), x instanceof Fe && _(x.getFeatures(), []).forEach((X) => {
          g.getUid(l) === g.getUid(X.getFeature()) && (h = X);
        });
      }), t(h, I);
    }, {
      ...s,
      layerFilter: (l) => {
        if (!n(s.layerFilter)) return !0;
        const f = this.layers.find((h) => g.getUid(h) === g.getUid(l));
        return n(f) ? s.layerFilter(f) : !1;
      }
    });
  }
  getCoordinateFromPixel(e) {
    if (!this._isInitialized("getCoordinateFromPixel") || !ue(e)) return;
    const t = this._map.getCoordinateFromPixel(ue(e));
    return new u(...t);
  }
  getPixelFromCoordinate(e) {
    if (!this._isInitialized("getPixelFromCoordinate") || !v(e)) return;
    const t = this._map.getPixelFromCoordinate(v(e));
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
    if (!this._isInitialized("getFeaturesAtPixel") || !ue(e)) return;
    const i = Object.assign({}, qt, t);
    let s = this._map.getFeaturesAtPixel(ue(e), {
      ...i,
      layerFilter: (f) => {
        if (!n(i.layerFilter)) return !0;
        const h = this.layers.find((I) => g.getUid(I) === g.getUid(f));
        return n(h) ? i.layerFilter(h) : !1;
      }
    }), a = s.map((f) => g.getUid(f));
    if (!n(s)) return [];
    const l = [];
    return this.layers.forEach((f) => {
      f instanceof Fe && _(f.getFeatures(), []).forEach((I) => {
        a.includes(g.getUid(I.getFeature())) && l.push(I);
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
  /**
   * view 视图相关方法
   */
  adjustCenter(e) {
    this._isInitialized("adjustCenter") && n(e) && this._view.adjustCenter(v(e));
  }
  adjustResolution(e, t) {
    this._isInitialized("adjustResolution") && this._view.adjustResolution(e, t ? v(t) : void 0);
  }
  adjustRotation(e, t) {
    this._isInitialized("adjustRotation") && this._view.adjustRotation(e, t ? v(t) : void 0);
  }
  adjustZoom(e, t) {
    this._isInitialized("adjustZoom") && this._view.adjustZoom(e, t ? v(t) : void 0);
  }
  animate(e) {
    if (!this._isInitialized("animate")) return;
    let t = Object.assign({}, Mr, {
      center: e.center ? v(e.center) : void 0,
      resolution: e.resolution,
      rotation: e.rotation,
      zoom: e.zoom,
      anchor: e.anchor ? v(e.anchor) : void 0,
      duration: e.duration,
      easing: n(e.easing) ? nt[e.easing] : void 0
    });
    this._view.animate(t);
  }
  beginInteraction() {
    this._isInitialized("updateSize") && this._view.beginInteraction();
  }
  calculateExtent(e) {
    this._isInitialized("calculateExtent") && this._view.calculateExtent(n(e) ? b(e) : void 0);
  }
  cancelAnimations() {
    this._isInitialized("cancelAnimations") && this._view.cancelAnimations();
  }
  centerOn(e, t, i) {
    if (this._isInitialized("centerOn")) {
      if (!n(e) || !n(t) || !n(i)) {
        o(p("centerOn", A.paramsListHaveNotDefined("coordinate", "size", "position")));
        return;
      }
      this._view.centerOn(
        v(e),
        b(t),
        ue(i)
      );
    }
  }
  changed() {
    this._isInitialized("changed") && this._view.changed();
  }
  endInteraction(e, t, i) {
    this._isInitialized("endInteraction") && this._view.endInteraction(e, t, v(i));
  }
  fit(e, t) {
    if (!this._isInitialized("fit")) return;
    if (!(e instanceof H || e instanceof z)) {
      o(p("setProperties", A.paramsInvaildFormat("featureOrExtent", "BaseFeature或Extent类型")));
      return;
    }
    let i = e instanceof H ? e.getGeometry() : E(e);
    const s = n(t) ? Object.assign({}, st, {
      ...t,
      size: b(t.size),
      easing: n(t.easing) ? nt[t.easing] : void 0,
      padding: n(t.padding) ? m(t.padding) ? [t.padding, t.padding, t.padding, t.padding] : t.padding : [0, 0, 0, 0]
    }) : {
      ...st,
      easing: nt[st.easing],
      padding: [0, 0, 0, 0],
      size: void 0
    };
    this._view.fit(i, s);
  }
  getAnimating() {
    if (this._isInitialized("updateSize"))
      return this._view.getAnimating();
  }
  getInteracting() {
    if (this._isInitialized("getInteracting"))
      return this._view.getInteracting();
  }
  getMaxResolution() {
    if (this._isInitialized("getMaxResolution"))
      return this._view.getMaxResolution();
  }
  getMinResolution() {
    if (this._isInitialized("getMinResolution"))
      return this._view.getMinResolution();
  }
  getMaxZoom() {
    if (this._isInitialized("getMaxZoom"))
      return this._view.getMaxZoom();
  }
  getMinZoom() {
    if (this._isInitialized("getMinZoom"))
      return this._view.getMinZoom();
  }
  getProjection() {
    if (this._isInitialized("getProjection"))
      return this.projection;
  }
  getResolutionForExtent() {
  }
  getResolutionForZoom(e) {
  }
  getZoomForResolution() {
  }
  getResolutions() {
  }
  setConstrainResolution(e) {
    if (this._isInitialized("setConstrainResolution")) {
      if (!It(e)) {
        o(p("setProperties", A.paramsInvaildFormat("enabled", "boolean类型")));
        return;
      }
      return this._view.setConstrainResolution(e);
    }
  }
  setMaxZoom(e) {
    this._isInitialized("setMaxZoom") && this._view.setMaxZoom(e);
  }
  setMinZoom(e) {
    this._isInitialized("setMinZoom") && this._view.setMinZoom(e);
  }
};
function Qt(r) {
  let e = r.some((t) => !(t instanceof u) && !G(t));
  return F(r) && !e;
}
const br = "MultiPoint", fe = y(br);
class _s extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(fe("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("MultiPoint", e);
    else {
      if (!Qt(e)) {
        d(fe("constructor", "坐标格式有误"));
        return;
      }
      super("MultiPoint", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => v(s));
    i && (this._geometry = new w.MultiPoint(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(fe(e, "未正确实例化")), !1) : !0;
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
      d(fe("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Qt(e)) {
      d(fe("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof u ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  appendPoint(e) {
    if (!this._isInitialized("appendPoint") || !n(e)) return;
    let t = null;
    if (e instanceof Te ? t = e.getGeometry() : e instanceof u ? t = new w.Point(e.toArray()) : G(e) && (t = new w.Point(e)), !n(t)) {
      d(fe("appendPoint", "参数格式有误"));
      return;
    }
    this._geometry.appendPoint(t);
  }
  getClosestPoint(e) {
    if (!this._isInitialized("getClosestPoint") || !n(e)) return;
    let t = null;
    if (e instanceof Te ? t = e.getCoordinates().toArray() : e instanceof u ? t = e.toArray() : G(e) && (t = e), !n(t)) return;
    let i = this._geometry.getClosestPoint(t);
    return new u(...i);
  }
  getExtent() {
    if (this._isInitialized("getExtent"))
      return new z(...this._geometry.getExtent());
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
    if (!m(e)) {
      o(fe("getPoint", "参数index格式有误"));
      return;
    }
    let t = this._geometry.getPoint(e);
    return new Te(t.getCoordinates());
  }
  intersectsCoordinate(e) {
    if (!this._isInitialized("intersectsCoordinate") || !n(e)) return;
    let t = v(e);
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
function ei(r) {
  let e = r.some((t) => !F(t) || F(t) && !ut(t));
  return F(r) && !e;
}
const Gr = "MultiLineString", Se = y(Gr);
class ms extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(Se("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("MultiLineString", e);
    else {
      if (!ei(e)) {
        d(Se("constructor", "坐标格式有误"));
        return;
      }
      super("MultiLineString", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => s.map((a) => v(a)));
    i && (this._geometry = new w.MultiLineString(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(Se(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取坐标
   * @returns {Array<Array<Lnglat>>} 坐标
   */
  getCoordinates() {
    return this._isInitialized("getCoordinates") ? this._geometry.getCoordinates().map((i) => i.map((s) => new u(...s))) : void 0;
  }
  /**
   * 设置坐标
   * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
   */
  setCoordinates(e) {
    if (!this._isInitialized("setCoordinates")) return;
    if (!n(e)) {
      d(Se("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ei(e)) {
      d(Se("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i.map((s) => s instanceof u ? s.toArray() : s));
    this._geometry.setCoordinates(t);
  }
}
function ti(r) {
  let e = r.some((t) => !F(t) || F(t) && !ct(t));
  return F(r) && !e;
}
const Tr = "MultiPolygon", be = y(Tr);
class ps extends H {
  constructor(e, t) {
    if (!n(e)) {
      d(be("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof M)
      super("MultiPolygon", e);
    else {
      if (!ti(e)) {
        d(be("constructor", "坐标格式有误"));
        return;
      }
      super("MultiPolygon", e), n(t) && Y(t) && this.setProperties(t);
    }
  }
  _init(e, t) {
    let i = e.map((s) => s.map((a) => a.map((l) => v(l))));
    i && (this._geometry = new w.MultiPolygon(i), this._feature = new M({
      geometry: this._geometry
    }));
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return !n(this._feature) || !n(this._geometry) ? (o(be(e, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取坐标
   * @returns {Array<Array<Array<Lnglat>>>} 坐标
   */
  getCoordinates() {
    return this._isInitialized("getCoordinates") ? this._geometry.getCoordinates().map((i) => i.map((s) => s.map((a) => new u(...a)))) : void 0;
  }
  /**
   * 设置坐标
   * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 坐标
   */
  setCoordinates(e) {
    if (!this._isInitialized("setCoordinates")) return;
    if (!n(e)) {
      d(be("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ti(e)) {
      d(be("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i.map((s) => s.map((a) => a instanceof u ? a.toArray() : a)));
    this._geometry.setCoordinates(t);
  }
}
function ke(r) {
  if (n(r))
    return r instanceof Q ? r.getColor() : r;
}
const ys = {
  Vec: "vec",
  Img: "img",
  Road: "road"
}, Rr = {
  preload: 0,
  cacheSize: 512
}, Dr = {
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
}, kr = {
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
function ii(r) {
  return kr[r];
}
let $r = "GaodeLayer", Br = y($r);
class Is extends R {
  constructor(t, i) {
    super("Gaode", _(i, {}));
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    if (!n(t)) {
      d(Br("GaodeLayer", "type参数不能为空"));
      return;
    }
    let s = Object.assign({}, Rr, {
      ..._(i, {}),
      source: void 0,
      map: void 0
    });
    this.gaodeType = t;
    let a = Object.assign({}, Dr, {
      ..._(i == null ? void 0 : i.source, {})
    }), l;
    if (n(i) && n(i.source)) {
      let f;
      n(a.tileGrid) && (f = new Je.TileGrid({
        ...a.tileGrid,
        extent: E(a.tileGrid.extent),
        origin: v(a.tileGrid.origin),
        origins: n(a.tileGrid.origins) ? a.tileGrid.origins.map((h) => h instanceof u ? v(h) : h) : void 0,
        sizes: n(a.tileGrid.sizes) ? a.tileGrid.sizes.map((h) => h instanceof $ ? b(h) : h) : void 0,
        tileSize: n(a.tileGrid.tileSize) ? m(a.tileGrid.tileSize) ? a.tileGrid.tileSize : b(a.tileGrid.tileSize) : void 0,
        tileSizes: n(a.tileGrid.tileSizes) ? a.tileGrid.tileSizes.map((h) => h instanceof $ ? b(h) : h) : void 0
      })), l = new ne.XYZ({
        ...a,
        urls: ii(this.gaodeType),
        tileGrid: f
      });
    } else
      l = new ne.XYZ({
        ...a,
        urls: ii(this.gaodeType)
      });
    this._layer = new se.Tile({
      ...s,
      extent: n(s.extent) ? E(s.extent) : void 0,
      background: n(s.background) ? ke(s.background) : void 0,
      source: l
    }), this._initLayerEvent();
  }
}
const Or = "ProjUtil", ri = y(Or);
class vs {
  static fromLonLat(e, t) {
    if (!n(e)) {
      o(ri("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? L(t) ? new ge(t) : t : new ge("EPSG:3857"), a = at.fromLonLat(i, s._projection);
    return new u(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!n(e)) {
      o(ri("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof u && (i = e._lnglat);
    let s = n(t) ? L(t) ? new ge(t) : t : new ge("EPSG:3857"), a = at.toLonLat(i, s._projection);
    return new u(a[0], a[1]);
  }
}
const ot = "OMapToken", jr = {
  tdt: null
};
function Vr(r, e) {
  window[ot] || (window[ot] = {}), window[ot][r] = e;
}
const mi = new Proxy(jr, {
  set: function(r, e, t, i) {
    return Vr(e, t), Reflect.set(r, e, t, i);
  }
}), W = {
  GeoJSON: "GeoJSON",
  WKT: "WKT",
  KML: "KML"
}, ae = {};
function Ur(r) {
  return Object.values(W).includes(r);
}
function Nr() {
  return {
    dataProjection: "EPSG:4326",
    extractGeometryName: !1
  };
}
function Zr() {
  return {
    splitCollection: !1
  };
}
function Kr() {
  return {
    extractStyles: !1,
    showPointNames: !1,
    writeStyles: !1,
    crossOrigin: null
  };
}
function Wr(r) {
  switch (r) {
    case W.GeoJSON:
      return Nr();
    case W.WKT:
      return Zr();
    case W.KML:
      return Kr();
    default:
      return {};
  }
}
function Re(r) {
  if (n(r))
    return r instanceof ge ? r.getProjection() : r;
}
function Hr(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return oe(i);
}
function Yr(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => oe(a));
}
function Xr(r, e) {
  return T().writeFeature(r.getFeature(), Object.assign({}, ae, _(e, {})));
}
function qr(r, e) {
  return T().writeFeatureObject(r.getFeature(), Object.assign({}, ae, _(e, {})));
}
function Jr(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ae, _(e, {})));
}
function Qr(r, e) {
  return T().writeFeaturesObject(r.map((s) => s.getFeature()), Object.assign({}, ae, _(e, {})));
}
const en = {
  readFeature: Hr,
  readFeatures: Yr,
  writeFeature: Xr,
  writeFeatureObject: qr,
  writeFeatures: Jr,
  writeFeaturesObject: Qr
};
function tn(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return oe(i);
}
function rn(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => oe(a));
}
function nn(r, e) {
  return T().writeFeature(r.getFeature(), Object.assign({}, ae, _(e, {})));
}
function sn(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ae, _(e, {})));
}
const on = {
  readFeature: tn,
  readFeatures: rn,
  writeFeature: nn,
  writeFeatures: sn
}, an = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: on
}, Symbol.toStringTag, { value: "Module" }));
function ln(r, e) {
  const i = T().readFeature(r, _(e, {}));
  return oe(i);
}
function un(r, e) {
  return T().readFeatures(r, _(e, {})).map((a) => oe(a));
}
function cn(r, e) {
  return T().writeFeatures(r.map((s) => s.getFeature()), Object.assign({}, ae, _(e, {})));
}
function dn(r, e) {
  return T().writeFeaturesObject(r.map((s) => s.getFeature()), Object.assign({}, ae, _(e, {})));
}
const fn = {
  readFeature: ln,
  readFeatures: un,
  writeFeatures: cn,
  writeFeaturesNode: dn
}, hn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fn
}, Symbol.toStringTag, { value: "Module" }));
let pi = null;
function gn(r) {
  pi = r;
}
function T() {
  return pi;
}
function _n(r) {
  let e = null;
  switch (r) {
    case W.GeoJSON:
      e = en;
      break;
    case W.WKT:
      e = an;
      break;
    case W.KML:
      e = hn;
      break;
  }
  return e;
}
function ze(r, e, ...t) {
  const i = _n(r);
  if (n(i) && n(i[e]))
    return i[e](...t);
  d(yt(e, `当前格式化工具不支持${e}方法`));
}
function mn(r, e, t) {
  return ze(r, "readFeature", e, t);
}
function pn(r, e, t) {
  return ze(r, "readFeatures", e, t);
}
function yn(r, e, t) {
  return ze(r, "writeFeature", e, t);
}
function In(r, e, t) {
  return ze(r, "writeFeatureObject", e, t);
}
function vn(r, e, t) {
  return ze(r, "writeFeatures", e, t);
}
function En(r, e, t) {
  return ze(r, "writeFeaturesObject", e, t);
}
const Fn = "Format", yt = y(Fn);
class Es {
  constructor(e, t) {
    c(this, "type");
    c(this, "options");
    c(this, "_format");
    if (!n(e)) {
      d(yt("constructor", "初始化参数有误"));
      return;
    }
    if (!Ur(e)) {
      d(yt("constructor", "初始化参数有误"));
      return;
    }
    this.type = e, this.options = _(Object.assign({}, Wr(e), t), {}), this._initFormat();
  }
  /**
   * 初始化
   */
  _initFormat() {
    switch (this.type) {
      case W.GeoJSON:
        this._format = new et.GeoJSON({
          ...this.options,
          dataProjection: Re(this.options.dataProjection),
          featureProjection: Re(this.options.featureProjection)
        });
        break;
      case W.WKT:
        this._format = new et.WKT({
          ...this.options
        });
        break;
      case W.KML:
        this._format = new et.KML({
          ...this.options,
          defaultStyle: _(Ki(this.options.defaultStyle), void 0)
        });
        break;
    }
    gn(this._format);
  }
  readFeature(e, t) {
    return mn(this.type, e, t);
  }
  readFeatures(e, t) {
    return pn(this.type, e, t);
  }
  writeFeature(e, t) {
    return yn(this.type, e, t);
  }
  writeFeatureObject(e, t) {
    return In(this.type, e, t);
  }
  writeFeatures(e, t) {
    return vn(this.type, e, t);
  }
  writeFeaturesObject(e, t) {
    return En(this.type, e, t);
  }
}
const zn = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function xn(r, e) {
  return zn.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, mi.tdt);
}
let An = "TdtLayer", ni = y(An);
class Fs extends R {
  constructor(t, i) {
    var a, l, f;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!n(mi.tdt)) {
      o(ni("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(t)) {
      d(ni("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    this.tdtType = t, this._layer = new se.Tile({
      ...s,
      extent: n(s.extent) ? (a = s.extent) == null ? void 0 : a._extent : void 0,
      map: n(s.map) ? (l = s.map) == null ? void 0 : l._map : void 0,
      background: n(s.background) ? (f = s.background) == null ? void 0 : f._color : void 0,
      source: new ne.XYZ({
        url: xn(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
const zs = {
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
}, wn = {
  preload: 0,
  useInterimTilesOnError: !0,
  cacheSize: 512
};
let Pn = "TileLayer", Cn = y(Pn);
class xs extends R {
  constructor(e) {
    if (super("Tile", _(e, {})), !n(e.source)) {
      d(Cn("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, {
      ...wn
    }, {
      ...e,
      source: void 0,
      map: void 0
    });
    _(e.source, {}), this._layer = new se.Tile({
      // 以下这些是基础属性赋值
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? ke(t.background) : void 0
    }), this._initLayerEvent();
  }
}
const Ln = {
  preload: 0,
  cacheSize: 512
}, Mn = {
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
let Sn = "TileLayer", bn = y(Sn);
class As extends R {
  constructor(e) {
    if (super("XYZ", _(e, {})), !n(e.source)) {
      d(bn("constructor", "source参数是必须的"));
      return;
    }
    let t = Object.assign({}, Ln, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, Mn, {
      ..._(e.source, {})
    }), s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new Je.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: v(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? v(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof $ ? b(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? m(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof $ ? b(l) : l) : void 0
      })), s = new ne.XYZ({
        ...i,
        tileGrid: a
      });
    }
    this._layer = new se.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? ke(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const Gn = {
  preload: 0,
  cacheSize: 512
}, Tn = {
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
let Rn = "WMTSLayer", Dn = y(Rn);
class ws extends R {
  constructor(e) {
    if (super("WMS", _(e, {})), !n(e.source)) {
      o(Dn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, Gn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, Tn, {
      ..._(e.source, {})
    });
    console.log("_sourceParams"), console.log(i);
    let s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new Je.WMTS({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: v(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? v(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof $ ? b(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? m(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof $ ? b(l) : l) : void 0
      })), s = new ne.WMTS({
        ...i,
        projection: Re(i.projection),
        tileGrid: a
      });
    }
    this._layer = new se.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? ke(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const kn = {
  preload: 0,
  cacheSize: 512
}, $n = {
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
let Bn = "WMSLayer", On = y(Bn);
class Ps extends R {
  constructor(e) {
    if (super("WMS", _(e, {})), !n(e.source)) {
      o(On("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, kn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, $n, {
      ..._(e.source, {})
    }), s;
    if (n(e.source)) {
      let a;
      n(i.tileGrid) && (a = new Je.TileGrid({
        ...i.tileGrid,
        extent: E(i.tileGrid.extent),
        origin: v(i.tileGrid.origin),
        origins: n(i.tileGrid.origins) ? i.tileGrid.origins.map((l) => l instanceof u ? v(l) : l) : void 0,
        sizes: n(i.tileGrid.sizes) ? i.tileGrid.sizes.map((l) => l instanceof $ ? b(l) : l) : void 0,
        tileSize: n(i.tileGrid.tileSize) ? m(i.tileGrid.tileSize) ? i.tileGrid.tileSize : b(i.tileGrid.tileSize) : void 0,
        tileSizes: n(i.tileGrid.tileSizes) ? i.tileGrid.tileSizes.map((l) => l instanceof $ ? b(l) : l) : void 0
      })), s = new ne.TileWMS({
        ...i,
        projection: Re(i.projection),
        tileGrid: a
      });
    }
    this._layer = new se.Tile({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      background: n(t.background) ? ke(t.background) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
const jn = {}, Vn = {
  interpolate: !0,
  imageExtent: new z(0, 0, 0, 0),
  url: ""
};
let Un = "ImageLayer", Nn = y(Un);
class Cs extends R {
  constructor(e) {
    if (super("Image", _(e, {})), !n(e.source)) {
      o(Nn("constructor", "缺少source参数"));
      return;
    }
    let t = Object.assign({}, jn, {
      ...e,
      source: void 0,
      map: void 0
    }), i = Object.assign({}, Vn, {
      ..._(e.source, {})
    }), s;
    n(e.source) && (s = new ne.ImageStatic({
      ...i,
      extent: n(i.imageExtent) ? E(i.imageExtent) : void 0,
      projection: Re(i.projection)
    })), this._layer = new se.Image({
      ...t,
      extent: n(t.extent) ? E(t.extent) : void 0,
      source: s
    }), this._initLayerEvent();
  }
}
function si(r, e, t) {
  return {
    target: r,
    type: e,
    pixel: new D(t.pixel[0], t.pixel[1]),
    coordinate: new u(t.coordinate[0], t.coordinate[1])
  };
}
const Zn = "DragBox", Ke = y(Zn);
class Ls extends j {
  constructor(e) {
    super("DragBox"), this._interaction = new O.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && Ie(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new u(t.coordinate[0], t.coordinate[1]),
          pixel: new D(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new ve(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(Ke("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, si(this, e, a));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(Ke("un", "参数不能为空"));
        return;
      }
      if (!m(e)) {
        o(Ke("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(Ke("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!n(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, si(this, e, a));
    }), this.events.once(e, t);
  }
}
const Kn = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class Ms extends j {
  constructor(e) {
    super("Extent"), this._interaction = new O.Extent(Object.assign({}, Kn, e || {})), this.initInteractionEvent();
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._interaction.getExtent();
    return e ? new z(e[0], e[1], e[2], e[3]) : void 0;
  }
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof z ? e.toArray() : e;
    this._interaction.setExtent(t);
  }
}
function oi(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const Wn = "Modify", ie = y(Wn), Hn = {
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
let Ss = class extends j {
  constructor(t) {
    super("Modify");
    c(this, "records", []);
    let i = null;
    n(t.layer) || d(ie("init", "layer参数不能为空")), n(t.layer) && !(t.layer instanceof Fe) && d(ie("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let s = Object.assign({}, Hn, {
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
      time: Ct(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (s) => {
      let a = s.features.getArray(), l = [];
      a.forEach((f) => {
        let h = this.layer.getFeatures().find((I) => g.getUid(I._feature) === g.getUid(f));
        h && l.push({
          id: h.id,
          originFeatureId: g.getUid(h._feature),
          type: h.type,
          coordinates: h.getCoordinates()
        });
      }), this.records.push({
        time: Ct(),
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
      o(ie("insertPoint", "coordinates参数不能为空"));
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
      o(ie("removePoint", "coordinates参数不能为空"));
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
      o(ie("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, oi(this, t, l));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        o(ie("un", "参数不能为空"));
        return;
      }
      if (!m(t)) {
        o(ie("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(ie("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, oi(this, t, l));
    }), this.events.once(t, i);
  }
}, qe = [], yi = [];
function Yn(r) {
  qe = r;
}
function Xn(r) {
  yi = r, qe = [];
}
function We(r) {
  let e = null;
  if (qe.length)
    for (const t of qe) {
      let i = t.getFeatures().find((s) => g.getUid(s._feature) === r);
      i && (e = i);
    }
  else
    e = yi.find((t) => g.getUid(t._feature) === r);
  return e;
}
function ai(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const qn = "Select", Ge = y(qn), Jn = {
  layers: void 0,
  style: void 0,
  multi: !1,
  // 当为true的时候，支持一次选择n个重叠的要素
  features: void 0,
  filter: void 0,
  hitTolerance: 0
};
class Gs extends j {
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
    n(t == null ? void 0 : t.layers) && (Yn(t.layers), i = t.layers.map((s) => s._layer)), n(t == null ? void 0 : t.features) && Xn(t.features), this._interaction = new O.Select(Object.assign({}, Jn, {
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
    return n(t) && (t instanceof re ? i = t.getStyle() : F(t) && t.every((s) => s instanceof re) ? i = t.map((s) => s.getStyle()) : Ie(t) ? i = (s, a) => {
      let l = g.getUid(s), f = We(l), h = t(f, a);
      return h ? h.getStyle() : void 0;
    } : o(Ge("initStyle", "style格式有误"))), i;
  }
  initFilter(t) {
    if (n(t))
      return (i, s) => {
        var f;
        let a = We(g.getUid(i)), l = (f = this.map) == null ? void 0 : f.getAllLayers().find((h) => g.getUid(h._layer) === g.getUid(s));
        return t(a, l);
      };
  }
  /**
   * 初始化Select事件
   */
  initSelectEvent() {
    this._isInitialized("initSelectEvent") && this._interaction.on("select", (t) => {
      const { selected: i, deselected: s } = t;
      this.selected = i.map((a) => We(g.getUid(a))).filter((a) => a !== null), this.deselected = s.map((a) => We(g.getUid(a))).filter((a) => a !== null);
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
      o(Ge("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      console.log("select", l), this.events.emit(t, Object.assign({}, ai(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!n(t)) {
        o(Ge("un", "参数不能为空"));
        return;
      }
      if (!m(t) && !L(t)) {
        o(Ge("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!n(t) || !n(i)) {
      o(Ge("on", "参数不能为空"));
      return;
    }
    let s = this.events.get(t);
    return (!n(s) || s.length === 0) && this._interaction.on(t, (l) => {
      this.events.emit(t, Object.assign({}, ai(this, t, l), {
        selected: this.selected,
        deselected: this.deselected
      }));
    }), this.events.once(t, i);
  }
}
const Qn = {
  animate: !0,
  params: ["x", "y", "z", "r", "l"],
  replace: !1,
  prefix: ""
};
class Ts extends j {
  constructor(e) {
    super("Link");
    let t = {
      ...e,
      animate: n(e == null ? void 0 : e.animate) && !It(e == null ? void 0 : e.animate) ? {
        ...e.animate,
        center: e.animate.center instanceof u ? e.animate.center.toArray() : e.animate.center
      } : _(e == null ? void 0 : e.animate, !0)
    };
    this._interaction = new O.Link(Object.assign({}, Qn, t)), this.initInteractionEvent();
  }
}
const es = {
  duration: 100,
  delta: 1
};
class Rs extends j {
  constructor(e) {
    super("KeyboardZoom"), this._interaction = new O.KeyboardZoom(Object.assign({}, es, e || {})), this.initInteractionEvent();
  }
}
class Ds {
  constructor() {
  }
}
const li = {
  className: "ol-full-screen",
  activeClassName: "ol-full-screen-true",
  inactiveClassName: "ol-full-screen-false",
  tipLabel: "全屏",
  keys: !1
}, ts = "Control", is = y(ts);
class Ii {
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
    return n(this._control) ? !0 : (o(is(e, "未正确实例化")), !1);
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
const rs = "FullScreen", ns = y(rs);
class ks extends Ii {
  constructor(e, t) {
    super("FullScreen"), n(e) && (m(e) || L(e)) ? (this.id = e, this._control = new Ye.FullScreen(Object.assign({}, li, t))) : this._control = new Ye.FullScreen(Object.assign({}, li, e));
  }
  _isInitialized(e) {
    return n(this._control) ? !0 : (o(ns(e, "未正确实例化")), !1);
  }
}
const ui = {
  duration: 250,
  className: "ol-zoom",
  zoomInLabel: "+",
  zoomOutLabel: "-",
  zoomInTipLabel: "放大",
  zoomOutTipLabel: "缩小",
  zoomInClassName: "ol-zoom-in",
  zoomOutClassName: "ol-zoom-out",
  delta: 1
}, ss = "Zoom", os = y(ss);
class $s extends Ii {
  constructor(e, t) {
    super("Zoom"), n(e) && (m(e) || L(e)) ? (this.id = e, this._control = new Ye.Zoom(Object.assign({}, ui, t))) : this._control = new Ye.Zoom(Object.assign({}, ui, e));
  }
  _isInitialized(e) {
    return n(this._control) ? !0 : (o(os(e, "未正确实例化")), !1);
  }
}
export {
  ar as Circle,
  Q as Color,
  Ar as DoubleClickZoom,
  Ls as DragBox,
  Pr as DragPan,
  Ds as DragZoom,
  pt as Draw,
  ft as DrawMode,
  z as Extent,
  Es as Format,
  W as FormatType,
  $s as FullScreen,
  Is as GaodeLayer,
  ys as GaodeLayerType,
  Cs as ImageLayer,
  Ms as InteractionExtent,
  Rs as KeyboardZoom,
  Xt as LayerGroup,
  vt as LineString,
  rt as LinearRing,
  Ts as Link,
  u as Lnglat,
  hs as Map,
  mi as MapToken,
  mt as Measure,
  J as MeasureMode,
  Ss as Modify,
  zr as MouseWheelZoom,
  ms as MultiLineString,
  _s as MultiPoint,
  ps as MultiPolygon,
  D as Pixel,
  Te as Point,
  hi as Polygon,
  fi as Popup,
  di as PopupPositioning,
  vs as ProjUtil,
  ge as Projection,
  Gs as Select,
  $ as Size,
  re as Style,
  Fs as TdtLayer,
  zs as TdtLayerType,
  xs as TileLayer,
  Fe as VectorLayer,
  Ps as WMSLayer,
  ws as WMTSLayer,
  As as XYZLayer,
  ks as Zoom
};
