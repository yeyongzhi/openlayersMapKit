var tt = Object.defineProperty;
var Ie = (r) => {
  throw TypeError(r);
};
var it = (r, e, t) => e in r ? tt(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var u = (r, e, t) => it(r, typeof e != "symbol" ? e + "" : e, t), Fe = (r, e, t) => e.has(r) || Ie("Cannot " + t);
var ve = (r, e, t) => (Fe(r, e, "read from private field"), t ? t.call(r) : e.get(r)), Ee = (r, e, t) => e.has(r) ? Ie("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), xe = (r, e, t, i) => (Fe(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
import * as ze from "ol";
import * as _e from "ol/layer";
import * as ye from "ol/source";
import * as ue from "ol/proj";
import * as D from "ol/interaction";
import * as y from "ol/util";
import b from "ol/Feature";
import rt from "ol/Overlay";
import * as R from "ol/geom";
import * as w from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import { createBox as nt } from "ol/interaction/Draw";
function s(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function c(r) {
  throw new Error(`omap error ${r}`);
}
function _(r) {
  return (e, t) => `📦${r}【${e}】: ${t}`;
}
const st = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function ce(r) {
  return typeof r == "function";
}
function E(r) {
  return Array.isArray(r);
}
function we(r) {
  return Array.isArray(r) && r.length === 0;
}
function h(r) {
  return typeof r == "number";
}
function x(r) {
  return typeof r == "string";
}
function ot(r) {
  return r === "";
}
function at(r) {
  return typeof r == "boolean";
}
function pe(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function A(r) {
  return E(r) && r.length === 2 && h(r[0]) && h(r[1]);
}
function ie(r) {
  return E(r) && r.length === 4 && h(r[0]) && h(r[1]) && h(r[2]) && h(r[3]);
}
function se(r) {
  return E(r) && r.length === 3 && r.every((e) => h(e) && e >= 0 && e <= 255);
}
function lt(r) {
  return x(r) && st.test(r);
}
function ee(r) {
  return h(r) && r >= 0 && r <= 1;
}
function oe(r) {
  let e = r.replace("#", "");
  return x(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function ut(r) {
  let e = r.replace("#", "");
  return x(r) && r.startsWith("#") && e.length === 8;
}
function B(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function Ae(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function ct(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function ht(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
function Ce() {
  const r = /* @__PURE__ */ new Date(), e = r.getFullYear(), t = String(r.getMonth() + 1).padStart(2, "0"), i = String(r.getDate()).padStart(2, "0"), n = String(r.getHours()).padStart(2, "0"), a = String(r.getMinutes()).padStart(2, "0"), d = String(r.getSeconds()).padStart(2, "0");
  return `${e}-${t}-${i} ${n}:${a}:${d}`;
}
const dt = "Size", T = _(dt);
class Pe {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    u(this, "_size");
    (!h(e) || !h(t)) && c(T("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return s(this._size) ? !0 : (o(T(e, "未正确实例化")), !1);
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
      if (!h(e[0]) || !h(e[1])) {
        o(T("setSize", "参数格式有误"));
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
      if (!h(e)) {
        o(T("setWidth", "参数格式有误"));
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
      if (!h(e)) {
        o(T("setHeight", "参数格式有误"));
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
const ft = "Pixel", M = _(ft);
class re {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    u(this, "_pixel", []);
    (!h(e) || !h(t)) && c(M("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return s(this._pixel) ? !0 : (o(M(e, "未正确实例化")), !1);
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
      if (!h(e[0]) || !h(e[1])) {
        o(M("setPixel", "参数格式有误"));
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
      if (!h(e)) {
        o(M("setX", "参数格式有误"));
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
      if (!h(e)) {
        o(M("setY", "参数格式有误"));
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
      o(M("equals", "参数未正确实例化"));
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
const gt = "Lnglat", V = _(gt);
class l {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    u(this, "_lnglat");
    (!h(e) || !h(t)) && c(V("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (o(V(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!h(e)) {
        o(V("setLng", "传入经度格式有误"));
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
      if (!h(e)) {
        o(V("setLat", "传入纬度格式有误"));
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
    if (!(e instanceof l)) {
      o(V("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !A(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const Le = {
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
}, _t = "Color", K = _(_t);
class L {
  constructor(e) {
    u(this, "_color", "");
    this._initColor(e);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(e) {
    const t = () => {
      c(K("constructor", "初始化参数有误"));
    };
    if (E(e)) {
      let i = e;
      if (i.length === 3) {
        if (!se(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!se(i.slice(0, 3)) || !ee(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!oe(i[0]) || !ee(i[1])) {
          t();
          return;
        }
        let n = B(e[0]);
        if (!s(n)) {
          t();
          return;
        }
        this._color = `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i[1]})`;
      } else {
        t();
        return;
      }
    }
    if (pe(e)) {
      let i = e;
      if (!s(i.color) && !(s(i.r) && s(i.g) && s(i.b))) {
        t();
        return;
      }
      if (s(i.color)) {
        if (oe(i.color)) {
          let n = B(i.color);
          if (!s(n)) {
            t();
            return;
          }
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i.alpha || i.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (lt(i.color)) {
          let n = Ae(i.color).join(", ");
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n}, ${i.alpha || i.opacity})` : `rgb(${n})`;
        }
      } else if (s(i.r) && s(i.g) && s(i.b)) {
        if (!se([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = s(i.alpha) || s(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (x(e)) {
      if (ot(e)) {
        t();
        return;
      }
      if (oe(e)) {
        let i = B(e);
        if (!s(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (ut(e)) {
        let i = B(e.slice(0, 7));
        if (!s(i)) {
          t();
          return;
        }
        let n = ht(e.slice(6));
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${n})`;
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
    if (!ee(e)) {
      c(K("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...Ae(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...ct(this._color), e]);
    else {
      if (!s(Le[this._color])) {
        c(K("withAlpha", "颜色值有误"));
        return;
      }
      let t = B(Le[this._color]);
      if (!s(t)) {
        c(K("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const yt = "Extent", G = _(yt);
class m {
  constructor(e, t, i, n) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    u(this, "_extent");
    if (!h(e) || !h(t) || !h(i) || !h(n)) {
      c(G("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < e || n < t) {
      c(G("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [e, t, i, n];
  }
  _isInitialized(e) {
    return !s(this._extent) || this._extent.length !== 4 ? (o(G(e, "未正确实例化")), !1) : !0;
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
      return new l(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new l(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new l(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new l(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new l(
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
    if (!(e instanceof m) || !(t instanceof l)) {
      o(G("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!e._isInitialized("containsCoordinate") || !s(t.toArray())) return;
    const [i, n] = t.toArray();
    return i >= e._extent[0] && i <= e._extent[2] && e._extent[1] <= n && n <= e._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(e, t) {
    if (!(e instanceof m) || !(t instanceof m)) {
      o(G("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function pt(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new w.Fill({
      ...r,
      color: e instanceof L ? e.getColor() : e
    });
}
function mt(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new w.Stroke({
      ...r,
      color: e instanceof L ? e.getColor() : e
    });
}
function It(r) {
  if (!s(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new w.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return s(e) && i.setFill(new w.Fill({
    color: e.color instanceof L ? e.color.getColor() : e.color
  })), s(t) && i.setStroke(new w.Stroke({
    color: t.color instanceof L ? t.color.getColor() : t.color
  })), i;
}
function Ft(r) {
  return s(r) ? new w.Icon({
    ...r,
    color: r.color ? r.color instanceof L ? r.color.getColor() : r.color : void 0,
    offset: s(r.offset) ? r.offset.getPixel() : [0, 0],
    size: s(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function vt(r) {
  if (!s(r))
    return;
  let e = new w.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return s(t) && e.setFill(new w.Fill({
    color: t.color instanceof L ? t.color.getColor() : t.color
  })), s(i) && e.setStroke(new w.Stroke({
    color: i.color instanceof L ? i.color.getColor() : i.color
  })), e;
}
const He = (r, e) => {
  if (s(r)) {
    if (r.getType() === "Point")
      return new U({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (r.getType() === "LineString")
      return new U({
        stroke: {
          color: "red",
          width: 5
        }
      });
    if (r.getType() === "Polygon" || r.getType() === "Circle")
      return new U({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new L({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
  }
};
class U {
  constructor(e) {
    u(this, "_style");
    const { fill: t, stroke: i, text: n, circle: a, icon: d, regularShape: f } = e;
    let g;
    a ? g = It(a) : d ? g = Ft(d) : f && (g = vt(f)), this._style = new w.Style({
      fill: pt(t),
      stroke: mt(i),
      image: g
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
const Et = {
  bottomCenter: "bottom-center"
}, xt = "Popup", be = _(xt), zt = {
  offset: new re(0, 0),
  position: void 0,
  positioning: Et.bottomCenter,
  stopEvent: !0,
  autoPan: !1,
  className: "ol-overlay-container ol-selectable"
};
class wt {
  constructor(e) {
    u(this, "_popup");
    var i;
    let t = Object.assign({}, zt, e);
    this._popup = new rt({
      ...t,
      offset: (i = t.offset) == null ? void 0 : i.toArray(),
      position: s(t.position) ? t.position instanceof l ? t.position.toArray() : t.position : void 0
    });
  }
  _isInitialized(e) {
    return s(this._popup) ? !0 : (o(be(e, "未正确实例化")), !1);
  }
  /**
   * 获取弹窗位置
   * @returns {Lnglat | undefined} 弹窗位置
   */
  getPosition() {
    if (!this._isInitialized("getPosition")) return;
    let e = this._popup.getPosition();
    return s(e) ? new l(e[0], e[1]) : void 0;
  }
  /**
   * 设置弹窗位置
   * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
   */
  setPosition(e) {
    if (!this._isInitialized("setPosition")) return;
    let t = e instanceof l ? e.toArray() : e;
    this._popup.setPosition(t);
  }
  /**
   * 设置弹窗属性
   * @param {Record<string, any>} properties 弹窗属性
   */
  setProperties(e) {
    if (this._isInitialized("setProperties")) {
      if (!s(e)) {
        o(be("setProperties", "参数不能为空"));
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
}
let he = "BaseLayer", F = _(he);
const Me = 1, Se = !0, ke = 0, De = 22, $e = 0, Re = 1 / 0, Be = 1, Te = {};
var N;
class O {
  // 图层所属组ID，默认null
  constructor(e, t) {
    /**
     * 图层类型
     */
    u(this, "type", null);
    /**
     * 图层实例（ol）
     */
    u(this, "_layer");
    // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    u(this, "id", null);
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    u(this, "name", "");
    u(this, "className", "");
    // 图层样式类名，用于自定义图层样式，默认无
    u(this, "opacity", Me);
    // 图层透明度，默认1
    u(this, "visible", Se);
    // 图层是否可见，默认true
    u(this, "extent", null);
    // 图层范围，默认全局
    u(this, "minZoom", ke);
    // 最小缩放级别，默认0
    u(this, "maxZoom", De);
    // 最大缩放级别，默认22
    u(this, "minResolution", $e);
    // 最小分辨率，默认0r
    u(this, "maxResolution", Re);
    // 最大分辨率，默认Infinity
    u(this, "zIndex", Be);
    // 图层层级，默认0
    u(this, "properties", Te);
    // 图层属性，用于存储图层相关信息
    /**
     * 图层所属的对象
     */
    u(this, "target", null);
    Ee(this, N, null);
    let i = t || {};
    this.type = e, he = `${e}Layer`, F = _(he), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || Me, this.visible = i.visible || Se, this.extent = i.extent || null, this.minZoom = i.minZoom || ke, this.maxZoom = i.maxZoom || De, this.minResolution = i.minResolution || $e, this.maxResolution = i.maxResolution || Re, this.zIndex = i.zIndex || Be, this.properties = i.properties || Te;
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
      if (!ee(e)) {
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
      if (at(e)) {
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
    let t = e instanceof m ? e.getExtent() : e;
    this._layer.setExtent(t);
  }
  /**
   * 获取图层的范围
   */
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._layer.getExtent();
    if (e)
      return new m(e[0], e[1], e[2], e[3]);
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!s(e)) {
        o(F("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!h(e)) {
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
      if (!h(e)) {
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
      if (!h(e)) {
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
      if (!h(e)) {
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
      if (!h(e)) {
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
      if (pe(e)) {
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
      return ve(this, N);
  }
  // TODO
  setGroupId(e) {
    xe(this, N, e);
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
N = new WeakMap();
const At = "Event", Ve = _(At);
class me {
  constructor(e) {
    u(this, "events", /* @__PURE__ */ new Map());
    u(this, "target", null);
    u(this, "total", 0);
    this.events.clear(), this.target = e;
  }
  on(e, t) {
    let i = this.events.get(e) || [], n = ++this.total;
    return i.push({
      id: n,
      target: this.target,
      type: e,
      callback: t
    }), this.events.set(e, i), n;
  }
  once(e, t) {
    const i = this.events.get(e) || [], n = ++this.total;
    return i.push({
      id: n,
      target: this.target,
      type: e,
      callback: t,
      once: !0
    }), this.events.set(e, i), n;
  }
  emit(e, ...t) {
    const i = this.events.get(e);
    if (!i || i.length === 0) return this;
    for (let n = 0; n < i.length; ) {
      const a = i[n];
      try {
        a.callback.call(a.target, ...t);
      } catch (d) {
        c(Ve("emit", `回调异常: ${String(d)}`));
      }
      a.once ? i.splice(n, 1) : n++;
    }
    return i.length === 0 && this.events.delete(e), this;
  }
  remove(e) {
    for (const [t, i] of this.events.entries()) {
      const n = i.findIndex((a) => a.id === e);
      if (n !== -1)
        return i.splice(n, 1), i.length === 0 && this.events.delete(t), this;
    }
    return o(Ve("remove", `未找到 id=${e} 的监听`)), this;
  }
  off(e) {
    return e === void 0 ? this.events.clear() : this.events.delete(e), this;
  }
  getEventById(e) {
    for (const t of this.events.values()) {
      const i = t.find((n) => n.id === e);
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
const Ct = "Interaction", Pt = _(Ct);
class $ {
  constructor(e) {
    /**
     * 交互类型
     * @type {OMapInteractionType | null}
     */
    u(this, "type", null);
    /**
     * 交互实例
     * @type {OlInteractionInstanceType}
     */
    u(this, "_interaction");
    /**
     * 交互所需要的图层
     * @type {VectorLayer} layer
     */
    u(this, "layer", null);
    /**
     * 交互属性
     * @type {Record<string, any>} 
     */
    u(this, "properties", {});
    /**
     * 交互是否激活
     * @param type 
     */
    u(this, "active", !1);
    /**
     * 交互事件
     * @type {Event}
     */
    u(this, "events", new me());
    u(this, "map");
    this.type = e;
  }
  initInteractionEvent() {
    this._isInitialized("initInteractionEvent") && this._interaction.on("change:active", (e) => {
      e.type === "change:active" && (this.active = this.getActive());
    });
  }
  _isInitialized(e) {
    return s(this._interaction) ? !0 : (o(Pt(e, "未正确实例化")), !1);
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
const Lt = "Feature", Z = _(Lt);
class j {
  constructor(e, t, i) {
    u(this, "id");
    u(this, "type");
    u(this, "_feature");
    u(this, "_geometry");
    this.type = e, t instanceof b ? this._initByFeature(t) : this._init(t, i);
  }
  _init(e, t) {
    switch (this.type) {
      case "Point":
        let i = e;
        this._geometry = new R.Point(i instanceof l ? i._lnglat : i);
        break;
      case "LineString":
        let n = e.map((g) => g instanceof l ? g._lnglat : g);
        this._geometry = new R.LineString(n);
        break;
      case "Polygon":
        let a = e.map((g) => g.map((v) => v instanceof l ? v._lnglat : v));
        this._geometry = new R.Polygon(a);
        break;
      case "LinearRing":
        let d = e.map((g) => g instanceof l ? g._lnglat : g);
        this._geometry = new R.LinearRing(d);
        break;
      case "Circle":
        let f = e;
        this._geometry = new R.Circle(f instanceof l ? f._lnglat : f, t);
        break;
    }
    this._feature = new b({
      geometry: this._geometry
    });
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return this._feature == null ? (o(Z(e, "未正确实例化")), !1) : !0;
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
        o(Z("setProperties", "参数不能为空"));
        return;
      }
      if (!pe(e)) {
        o(Z("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!s(e)) {
        o(Z("setId", "参数id不能为空"));
        return;
      }
      if (!h(e) && !x(e)) {
        o(Z("setId", "参数id格式有误"));
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
const bt = "Point", S = _(bt);
class We extends j {
  constructor(e, t) {
    if (!s(e)) {
      c(S("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof b)
      super("Point", e);
    else {
      if (!(e instanceof l) && !A(e)) {
        c(S("constructor", "坐标格式有误"));
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
    return new l(e[0], e[1]);
  }
  /**
   * 设置点的坐标
   * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!s(e)) {
      c(S("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof l) && !A(e)) {
      c(S("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof l ? e.toArray() : e;
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
      c(S("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof m) && !ie(e)) {
      c(S("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof m ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Ge(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !(i instanceof l) && !A(i)) && (e = !1), e;
}
const Mt = "Point", z = _(Mt);
class St extends j {
  constructor(e, t) {
    if (!s(e)) {
      c(z("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof b)
      super("LineString", e);
    else {
      if (!Ge(e)) {
        c(z("constructor", "坐标格式有误"));
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
    return this._geometry.getCoordinates().map((t) => new l(t[0], t[1]));
  }
  /**
   * 设置线的坐标
   * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!s(e)) {
      c(z("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Ge(e)) {
      c(z("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof l ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  /**
   * 追加坐标
   * @param {Lnglat | OlCoordinateType} coordinates 坐标
   * @returns 
   */
  appendCoordinate(e) {
    if (!s(e)) {
      c(z("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof l) && !A(e)) {
      c(z("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof l ? e.toArray() : e;
    this._geometry.appendCoordinate(t);
  }
  /**
   * 获取线的第一个坐标
   * @returns {Lnglat} 线的第一个坐标
   */
  getFirstCoordinate() {
    let e = this._geometry.getFirstCoordinate();
    return new l(e[0], e[1]);
  }
  /**
   * 获取线的最后一个坐标
   * @returns {Lnglat} 线的最后一个坐标
   */
  getLastCoordinate() {
    let e = this._geometry.getLastCoordinate();
    return new l(e[0], e[1]);
  }
  /**
   * 获取线的范围
   * @returns {Extent} 线的范围
   */
  getExtent() {
    let e = this._geometry.getExtent();
    return new m(e[0], e[1], e[2], e[3]);
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
      c(z("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(h(e) && e >= 0 && e <= 1)) {
      c(z("getCoordinateAt", "参数格式有误"));
      return;
    }
    let i = [], n = this._geometry.getCoordinateAt(e, i);
    return s(t) && (t instanceof l ? (t.setLng(i[0]), t.setLat(i[1])) : (t[0] = i[0], t[1] = i[1])), new l(n[0], n[1]);
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
      c(z("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof m) && !ie(e)) {
      c(z("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof m ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Ze(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !E(i)) && (e = !1), r.forEach((i) => {
    i.forEach((n) => {
      !(n instanceof l) && !A(n) && (e = !1);
    });
  }), e;
}
function de(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !(i instanceof l) && !A(i)) && (e = !1), e;
}
const kt = "Point", C = _(kt);
class Dt extends j {
  constructor(e, t) {
    if (!s(e)) {
      c(C("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof b)
      super("Polygon", e);
    else {
      if (!Ze(e)) {
        c(C("constructor", "坐标格式有误"));
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
    return this._geometry.getCoordinates(e).map((n) => n.map((a) => new l(a[0], a[1])));
  }
  /**
   * 设置多边形的坐标
   * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
   */
  setCoordinates(e) {
    if (!s(e)) {
      c(C("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Ze(e)) {
      c(C("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i.map((n) => n instanceof l ? n.toArray() : n));
    this._geometry.setCoordinates(t);
  }
  /**
   * 向Polygon中添加LinearRing（内环）
   * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
   */
  appendLinearRing(e) {
    if (!s(e)) {
      c(C("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof ae) && !de(e)) {
      c(C("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof ae)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof l ? i.toArray() : i);
      this._geometry.appendLinearRing(new ae(t)._geometry);
    }
  }
  /**
   * 获取多边形的第一个坐标（包含内环）
   * @returns {Lnglat} 多边形的第一个坐标
   */
  getFirstCoordinate() {
    let e = this._geometry.getFirstCoordinate();
    return new l(e[0], e[1]);
  }
  /**
   * 获取多边形的最后一个坐标（包含内环）
   * @returns {Lnglat} 多边形的最后一个坐标
   */
  getLastCoordinate() {
    let e = this._geometry.getLastCoordinate();
    return new l(e[0], e[1]);
  }
  /**
   * 获取多边形的范围
   * @returns {Extent} 多边形的范围
   */
  getExtent() {
    let e = this._geometry.getExtent();
    return new m(e[0], e[1], e[2], e[3]);
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
    let i = e instanceof l ? e.toArray() : e, n = this._geometry.getClosestPoint(i);
    return new l(n[0], n[1]);
  }
  /**
   * 返回多边形的内点
   * @returns {Point} 多边形的内点
   */
  getInteriorPoint() {
    let e = this._geometry.getInteriorPoint().getCoordinates();
    return new We(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!s(e)) {
      c(C("intersectsCoordinate", "参数coordinates不能为空"));
      return;
    }
    let t = e instanceof l ? e.toArray() : e;
    return this._geometry.intersectsCoordinate(t);
  }
  /**
   * 线是否在extent范围内
   * @param {Extent | OlExtentType} extent 
   * @returns {boolean | undefined}
   */
  intersectsExtent(e) {
    if (!s(e)) {
      c(C("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof m) && !ie(e)) {
      c(C("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof m ? e.getExtent() : e;
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
const $t = "Circle", q = _($t);
class Rt extends j {
  constructor(e, t, i) {
    if (!s(e)) {
      c(q("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof b)
      super("Circle", e);
    else {
      if (!(e instanceof l) && !A(e)) {
        c(q("constructor", "坐标格式有误"));
        return;
      }
      if (!s(t)) {
        c(q("constructor", "radius参数不能为空"));
        return;
      }
      if (!h(t)) {
        c(q("constructor", "radius参数格式有误"));
        return;
      }
      super("Circle", e, t), i && this.setProperties(i);
    }
  }
}
const H = {
  Point: "Point",
  LineString: "LineString",
  Polygon: "Polygon",
  Circle: "Circle"
};
function Ye(r) {
  let e = null, t = r.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case H.Point:
      e = new We(r);
      break;
    case H.LineString:
      e = new St(r);
      break;
    case H.Polygon:
      e = new Dt(r);
      break;
    case H.Circle:
      e = new Rt(r);
      break;
  }
  return e;
}
const fe = {
  Distance: "Distance",
  Area: "Area"
}, Bt = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
}, ge = {
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
}, Tt = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
};
function Vt(r) {
  let e = "Point", t = null;
  switch (r) {
    case fe.Distance:
      e = ge.LineString;
      break;
    case fe.Area:
      e = ge.Polygon;
      break;
  }
  return { type: e, geometryFunction: t };
}
function Gt(r) {
  let e = document.createElement("div");
  return e.style.padding = "2px 5px", e.style.borderRadius = "5px", e.style.backgroundColor = "rgba(0, 0, 0, 0.5)", e.style.color = "#FFFFFF", e.style.fontSize = "12px", e.innerHTML = r, e;
}
const Zt = "Measure", Ut = _(Zt);
class Xe extends $ {
  constructor(t, i) {
    if (!Object.values(fe).includes(t)) {
      c(Ut("constructor", "mode参数有误"));
      return;
    }
    super("Measure");
    u(this, "_popup", null);
    let n = null;
    this.layer = new te({
      style: He
    }), n = this.layer.getSource();
    let a = Object.assign({}, Bt, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: n,
      features: void 0,
      style: void 0
    });
    this._interaction = new D.Draw({
      ...Vt(t),
      ...a
    }), this.initInteractionEvent();
  }
  initMeasureEvent() {
    if (this._isInitialized("initDrawEvent")) {
      if (console.log(this.map), !this._popup) {
        let t = Gt("单击地图开始测量");
        this._popup = new wt({
          id: "omap-measure-popup",
          element: t
        }), this.map.addPopup(this._popup);
      }
      this.map._map.on("pointermove", (t) => {
        console.log(t), this._popup && this._popup.setPosition(t.coordinate);
      }), this._interaction.on("drawstart", (t) => {
        console.log(t);
      });
    }
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
    this.map = t, this.initMeasureEvent();
  }
}
let Ot = "VectorLayer", I = _(Ot);
class te extends O {
  constructor(t = {}) {
    super("Vector", t);
    u(this, "features", []);
    u(this, "style");
    let i = s(t.source) ? t.source : {}, n = {
      ...i,
      features: i.features ? i.features.map((a) => a.getFeature()) : []
    };
    this._layer = new _e.Vector({
      source: new ye.Vector(n)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(I(t, "未正确实例化")), !1);
  }
  /**
   * 初始化矢量图层事件
   */
  initVectorLyaerEvent() {
    this._isInitializedLayer("initVectorLyaerEvent") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (s(i) && (this.target instanceof Je || this.target instanceof Xe)) {
        let n = Ye(i);
        n ? this.features.push(n) : o(I("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
    s(t) && (t instanceof U ? i = t.getStyle() : E(t) && t.every((n) => n instanceof U) ? i = t.map((n) => n.getStyle()) : ce(t) ? i = (n, a) => {
      let d = y.getUid(n), f = this.features.findIndex((v) => y.getUid(v.getFeature()) === d), g = t(f !== -1 ? this.features[f] : null, a);
      return g ? g.getStyle() : void 0;
    } : o(I("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!s(t)) {
      o(I("setId", "参数id不能为空"));
      return;
    }
    if (!h(t) && !x(t)) {
      o(I("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((n) => s(n.getId()) && n.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!s(t)) {
      o(I("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof m) && !ie(t)) {
      o(I("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let n = t instanceof m ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(n), d = [];
    return a.forEach((f) => {
      let g = y.getUid(f), v = this.features.findIndex((ne) => y.getUid(ne.getFeature()) === g);
      v !== -1 && d.push(this.features[v]);
    }), d;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!s(t)) {
      o(I("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof l) && !A(t)) {
      o(I("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof l ? t._lnglat : t;
    const n = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return n.forEach((d) => {
      let f = y.getUid(d), g = this.features.findIndex((v) => y.getUid(v.getFeature()) === f);
      g !== -1 && a.push(this.features[g]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!s(t)) {
        o(I("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!s(t) || !E(t)) {
        o(I("addFeatures", "参数格式有误不能为空"));
        return;
      }
      we(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!s(t)) {
        o(I("removeFeature", "参数不能为空"));
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
      if (!s(t) || !E(t)) {
        o(I("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      we(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!s(t) || !ce(t)) {
        o(I("forEachFeature", "参数格式有误"));
        return;
      }
      this.features.forEach((i, n) => {
        t(i, n);
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
        o(I("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (n) => {
        let a = y.getUid(n), d = this.features.findIndex((f) => y.getUid(f.getFeature()) === a);
        s(d) && d !== -1 && i(this.features[d], 0);
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
        o(I("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (n) => {
        let a = y.getUid(n), d = this.features.findIndex((f) => y.getUid(f.getFeature()) === a);
        s(d) && d !== -1 && i(this.features[d], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!s(t)) {
      o(I("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof l) && !A(t)) {
      o(I("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let n = t instanceof l ? t._lnglat : t, a = i ? (g) => {
      let v = y.getUid(g), ne = this.features.findIndex((et) => y.getUid(et.getFeature()) === v);
      return i(this.features[ne]);
    } : void 0;
    const d = this._layer.getSource().getClosestFeatureToCoordinate(n, a);
    let f = this.features.findIndex((g) => y.getUid(g.getFeature()) === y.getUid(d));
    if (f !== -1)
      return this.features[f];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new m(t[0], t[1], t[2], t[3]);
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
        o(I("setStyle", "style参数不能为空"));
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
function Nt(r) {
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
      e = "Circle", t = nt();
      break;
  }
  return { type: e, geometryFunction: t };
}
const jt = "Draw", W = _(jt);
class Je extends $ {
  constructor(e, t) {
    if (!Object.values(ge).includes(e)) {
      c(W("constructor", "mode参数有误"));
      return;
    }
    super("Draw");
    let i = null;
    t != null && t.layer && ((t == null ? void 0 : t.layer) instanceof te ? (this.layer = t == null ? void 0 : t.layer, i = t == null ? void 0 : t.layer.getSource()) : o(W("init", "layer参数不属于VectorLayer类型"))), s(i) || (this.layer = new te({
      style: He
    }), i = this.layer.getSource());
    let n = Object.assign({}, Tt, {
      clickTolerance: t == null ? void 0 : t.clickTolerance,
      source: i,
      features: void 0,
      style: void 0
    });
    this._interaction = new D.Draw({
      ...Nt(e),
      ...n
    }), this.initInteractionEvent();
  }
  initDrawEvent() {
    this._isInitialized("initDrawEvent") && this._interaction.on("drawend", (e) => {
      var i, n;
      const { feature: t } = e;
      if (console.log((i = this.layer) == null ? void 0 : i.getFeatures()), s(t)) {
        let a = Ye(t);
        a ? (this.layer.addFeature(a), console.log((n = this.layer) == null ? void 0 : n.getFeatures())) : o(W("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
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
      o(W("appendCoordinates", "coordinates参数不能为空"));
      return;
    }
    let t = e.map((i) => i instanceof l ? i.toArray() : i);
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
function Ue(r) {
  return r.startsWith("map:");
}
function Y(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new re(...t.pixel)), t.coordinate && (i.coordinate = new l(...t.coordinate));
      break;
    case "map:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new l(...t.oldValue) : t.oldValue), t.key === "size" ? i.newValue = t.newValue || r.getSize() : i.newValue = t.newValue, i.key = t.key;
      break;
    case "view:change:resolution":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getResolution();
      break;
    case "view:change:center":
      t.oldValue && (i.oldValue = new l(...t.oldValue)), i.newValue = t.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getRotation();
      break;
    case "view:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new l(...t.oldValue) : t.oldValue), t.key === "center" ? i.newValue = t.newValue || r.getCenter() : t.key === "rotation" ? i.newValue = t.newValue || r.getRotation() : t.key === "resolution" ? i.newValue = t.newValue || r.getResolution() : i.newValue = t.newValue, i.key = t.key;
      break;
  }
  return i;
}
const Kt = "Map", p = _(Kt);
let _i = class {
  constructor(e, t) {
    u(this, "_map");
    u(this, "_view");
    u(this, "layers", []);
    u(this, "interactions", []);
    u(this, "events", null);
    u(this, "popups", []);
    const n = t.view;
    if (!s(n)) {
      c(p("constructor", "view参数不能为空"));
      return;
    }
    let a = n.projection || new k("EPSG:3857");
    x(a) && (a = new k(a));
    const d = {
      ...n,
      center: n.center instanceof l ? n.center._lnglat : n.center,
      // 中心点坐标
      extent: n.extent instanceof m ? n.extent._extent : n.extent,
      projection: a._projection
    }, f = new ze.View(d), g = new ze.Map({
      target: e,
      view: f
    });
    this._view = f, this._map = g, this.events = new me(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(p(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new Pe(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof Pe ? e._size : e;
    this._map.setSize(t);
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let e = this._view.getCenter();
    if (e)
      return new l(e[0], e[1]);
  }
  setCenter(e) {
    if (!this._isInitialized("setCenter")) return;
    if (!s(e)) {
      o(p("setCenter", "参数center不能为空"));
      return;
    }
    let t = e instanceof l ? e._lnglat : e;
    this._view.setCenter(t);
  }
  getZoom() {
    if (this._isInitialized("getZoom"))
      return this._view.getZoom();
  }
  setZoom(e) {
    if (this._isInitialized("setZoom")) {
      if (!s(e)) {
        o(p("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!h(e)) {
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
      if (!s(e)) {
        o(p("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!h(e)) {
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
      if (!s(e)) {
        o(p("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!h(e)) {
        o(p("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, n, a] = e;
    return new m(t, i, n, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !h(e)) {
        o(p("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !h(e)) {
        o(p("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(e)) {
      o(p("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof ri)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (s(t) && this.getLayerById(t)) {
      o(p("addLayer", "图层已存在"));
      return;
    }
    s(e._layer) && (this.layers.push(e), e instanceof O && (s(e.getTarget()) || e.setTarget(this)), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!s(e)) {
      o(p("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof O && s(i.getId()) && i.getId() === e && (t = i);
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
      o(p("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!s(t))
      return o(p("removeLayerById", `找不到id为${e}(${x(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(p("on", "参数不能为空"));
      return;
    }
    let i = Ue(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, Y(this, e, f));
    }) : n.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, Y(this, e, f));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(p("un", "参数不能为空"));
        return;
      }
      if (!h(e)) {
        o(p("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(p("on", "参数不能为空"));
      return;
    }
    let i = Ue(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (f) => {
      this.events.emit(e, Y(this, e, f));
    }) : n.on(e.replace("view:", ""), (f) => {
      this.events.emit(e, Y(this, e, f));
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
        o(p("setProperties", "参数不能为空"));
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
    if (this.interactions.findIndex((n) => y.getUid(n._interaction) === y.getUid(e._interaction)) !== -1) {
      o(p("addInteraction", "该交互已添加到地图中"));
      return;
    }
    if (e instanceof Je || e instanceof Xe) {
      const n = e.getLayer();
      s(n) && (n.setTarget(e), this.addLayer(n));
    }
    s(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction), e.setMap && e.setMap(this), e.setActive(!0));
  }
  getInteraction() {
  }
  removeInteraction() {
  }
  // 弹窗管理
  /**
   * 添加弹窗
   * @param popup 
   * @returns 
   */
  addPopup(e) {
    if (!this._isInitialized("addPopup")) return;
    if (this.popups.findIndex((i) => y.getUid(i._popup) === y.getUid(e._popup)) !== -1) {
      o(p("addPopup", "该弹窗已添加到地图中"));
      return;
    }
    s(e._popup) && (this.popups.push(e), this._map.addOverlay(e._popup));
  }
  removePopup() {
  }
};
const qt = "Map", Oe = _(qt);
class k {
  constructor(e) {
    u(this, "_projection", null);
    u(this, "code", "");
    u(this, "units", "degrees");
    let t = "";
    if (x(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!s(i.code)) {
        c(Oe("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = ue.get(t), !s(this._projection)) {
      o(Oe("constructor", "坐标系不存在"));
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
const Ht = "LinearRing", X = _(Ht);
class ae extends j {
  constructor(e, t) {
    if (!s(e)) {
      c(X("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof b)
      super("LinearRing", e);
    else {
      if (!de(e)) {
        c(X("constructor", "坐标格式有误"));
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
    return this._geometry.getCoordinates().map((i) => new l(i[0], i[1]));
  }
  /**
   * 设置LinearRing的坐标
   * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
   */
  setCoordinates(e) {
    if (!s(e)) {
      c(X("setCoordinates", "参数不能为空"));
      return;
    }
    if (!de(e)) {
      c(X("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof l ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const Wt = {
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
class pi extends O {
  constructor(t, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    u(this, "gaodeType", null);
    this.gaodeType = t, this._layer = new _e.Tile({
      source: new ye.XYZ({
        urls: Wt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const Yt = "ProjUtil", Ne = _(Yt);
class mi {
  static fromLonLat(e, t) {
    if (!s(e)) {
      o(Ne("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof l && (i = e._lnglat);
    let n = s(t) ? x(t) ? new k(t) : t : new k("EPSG:3857"), a = ue.fromLonLat(i, n._projection);
    return new l(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!s(e)) {
      o(Ne("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof l && (i = e._lnglat);
    let n = s(t) ? x(t) ? new k(t) : t : new k("EPSG:3857"), a = ue.toLonLat(i, n._projection);
    return new l(a[0], a[1]);
  }
}
const le = "OMapToken", Xt = {
  tdt: null
};
function Jt(r, e) {
  window[le] || (window[le] = {}), window[le][r] = e;
}
const Qe = new Proxy(Xt, {
  set: function(r, e, t, i) {
    return Jt(e, t), Reflect.set(r, e, t, i);
  }
}), Qt = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function ei(r, e) {
  return Qt.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, Qe.tdt);
}
let ti = "TdtLayer", je = _(ti);
class Ii extends O {
  constructor(t, i) {
    var a, d, f;
    super("Tdt", i);
    /**
     * 图层类型
     */
    u(this, "tdtType", null);
    if (!s(Qe.tdt)) {
      c(je("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(t)) {
      c(je("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let n = i || {};
    delete n.source, n.map, this.tdtType = t, this._layer = new _e.Tile({
      ...n,
      extent: s(n.extent) ? (a = n.extent) == null ? void 0 : a._extent : void 0,
      map: s(n.map) ? (d = n.map) == null ? void 0 : d._map : void 0,
      background: s(n.background) ? (f = n.background) == null ? void 0 : f._color : void 0,
      source: new ye.XYZ({
        url: ei(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let ii = "LayerGroup", J = _(ii);
class ri {
  constructor(e, t) {
    u(this, "id", null);
    u(this, "layers", []);
    if (!s(e)) {
      c(J("constructor", "参数不能为空"));
      return;
    }
    let i, n = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (n = e, !s(t)) {
        c(J("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    s(n) && (this.id = n), this.layers = i;
  }
  add(e) {
    if (!s(e)) {
      c(J("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (s(t) && this.layers.find((n) => n.getId() && n.getId() === t)) {
      o(J("add", "图层已存在"));
      return;
    }
    this.layers.push(e);
  }
  remove(e) {
    if (h(e)) {
      this.layers.splice(e, 1);
      return;
    }
    let t = e.getId();
    if (s(t)) {
      let i = this.layers.find((n) => n.getId() && n.getId() === t);
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
function Ke(r, e, t) {
  return {
    target: r,
    type: e,
    pixel: new re(t.pixel[0], t.pixel[1]),
    coordinate: new l(t.coordinate[0], t.coordinate[1])
  };
}
const ni = "DragBox", Q = _(ni);
class Fi extends $ {
  constructor(e) {
    super("DragBox"), this._interaction = new D.DragBox({
      ...e || {},
      // boxEndCondition: (mapBrowserEvent, startPixel, endPixel) => {
      //     console.log(mapBrowserEvent)
      //     console.log(startPixel, endPixel)
      //     return false
      // },
      onBoxEnd: (t) => {
        e && e.onBoxEnd && ce(e.onBoxEnd) && e.onBoxEnd({
          coordinate: new l(t.coordinate[0], t.coordinate[1]),
          pixel: new re(t.pixel[0], t.pixel[1])
        });
      }
    }), this.initInteractionEvent(), this.events = new me(this);
  }
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(Q("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!s(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, Ke(this, e, a));
    }), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(Q("un", "参数不能为空"));
        return;
      }
      if (!h(e)) {
        o(Q("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(Q("on", "参数不能为空"));
      return;
    }
    let i = this.events.get(e);
    return (!s(i) || i.length === 0) && this._interaction.on(e, (a) => {
      this.events.emit(e, Ke(this, e, a));
    }), this.events.once(e, t);
  }
}
const si = {
  onFocusOnly: !1,
  kinetic: void 0
};
class vi extends $ {
  constructor(e) {
    super("DragPan"), this._interaction = new D.DragPan(Object.assign({}, si, e || {})), this.initInteractionEvent();
  }
}
const oi = {
  condition: void 0,
  extent: void 0,
  boxStyle: void 0,
  pixelTolerance: 10,
  pointerStyle: void 0,
  wrapX: !1
};
class Ei extends $ {
  constructor(e) {
    super("Extent"), this._interaction = new D.Extent(Object.assign({}, oi, e || {})), this.initInteractionEvent();
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._interaction.getExtent();
    return e ? new m(e[0], e[1], e[2], e[3]) : void 0;
  }
  setExtent(e) {
    if (!this._isInitialized("setExtent")) return;
    let t = e instanceof m ? e.toArray() : e;
    this._interaction.setExtent(t);
  }
}
function qe(r, e, t) {
  return {
    target: r,
    type: e,
    mapBrowserEvent: t.mapBrowserEvent
  };
}
const ai = "Modify", P = _(ai), li = {
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
class xi extends $ {
  constructor(t) {
    super("Modify");
    u(this, "records", []);
    let i = null;
    s(t.layer) || c(P("init", "layer参数不能为空")), s(t.layer) && !(t.layer instanceof te) && c(P("init", "layer参数不属于VectorLayer类型")), this.layer = t.layer, i = t.layer.getSource();
    let n = Object.assign({}, li, {
      ...t,
      source: i
    });
    this._interaction = new D.Modify(n), this.initInteractionEvent(), this.initModifyEvent();
  }
  initModifyEvent() {
    if (!this._isInitialized("initModifyEvent")) return;
    let i = (this.layer.getFeatures() || []).map((n) => ({
      id: n.id,
      originFeatureId: y.getUid(n._feature),
      type: n.type,
      coordinates: n.getCoordinates()
    }));
    this.records.push({
      time: Ce(),
      features: i,
      version: 1
    }), this._interaction.on("modifyend", (n) => {
      let a = n.features.getArray(), d = [];
      a.forEach((f) => {
        let g = this.layer.getFeatures().find((v) => y.getUid(v._feature) === y.getUid(f));
        g && d.push({
          id: g.id,
          originFeatureId: y.getUid(g._feature),
          type: g.type,
          coordinates: g.getCoordinates()
        });
      }), this.records.push({
        time: Ce(),
        features: d,
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
      o(P("insertPoint", "coordinates参数不能为空"));
      return;
    }
    let i = t instanceof l ? t.toArray() : t;
    return this._interaction.insertPoint(i);
  }
  /**
   * 删除一个点
   * @param {Lnglat | OlCoordinateType} coordinates 点的坐标
   */
  removePoint(t) {
    if (!this._isInitialized("removePoint")) return;
    if (!s(t)) {
      o(P("removePoint", "coordinates参数不能为空"));
      return;
    }
    let i = t instanceof l ? t.toArray() : t;
    return this._interaction.removePoint(i);
  }
  /**
   * 撤销修改
   */
  revoke(t = 1) {
    if (!this._isInitialized("revoke")) return;
    if (this.records.length === 1) return !1;
    let n = this.records.length - 1 - t;
    if (n === 0)
      return this.cancel(), !1;
    const { features: a } = this.records[n];
    return a.forEach((d) => {
      let f = this.layer.getFeatures().find((g) => d.id ? d.id === g.id : y.getUid(g._feature) === d.originFeatureId);
      f && f.setCoordinates(d.coordinates);
    }), this.records.splice(n + 1), !0;
  }
  /**
   * 取消当前全部修改，也就是回到初始状态
   */
  cancel() {
    const { features: t } = this.records[0];
    t.forEach((i) => {
      let n = this.layer.getFeatures().find((a) => i.id ? i.id === a.id : y.getUid(a._feature) === i.originFeatureId);
      n && n.setCoordinates(i.coordinates);
    }), this.records = [
      this.records[0]
    ];
  }
  on(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(P("on", "参数不能为空"));
      return;
    }
    let n = this.events.get(t);
    return (!s(n) || n.length === 0) && this._interaction.on(t, (d) => {
      this.events.emit(t, qe(this, t, d));
    }), this.events.on(t, i);
  }
  un(t) {
    if (this._isInitialized("un")) {
      if (!s(t)) {
        o(P("un", "参数不能为空"));
        return;
      }
      if (!h(t)) {
        o(P("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(t);
    }
  }
  once(t, i) {
    if (!this._isInitialized("on")) return;
    if (!s(t) || !s(i)) {
      o(P("on", "参数不能为空"));
      return;
    }
    let n = this.events.get(t);
    return (!s(n) || n.length === 0) && this._interaction.on(t, (d) => {
      this.events.emit(t, qe(this, t, d));
    }), this.events.once(t, i);
  }
}
export {
  L as Color,
  Fi as DragBox,
  vi as DragPan,
  Je as Draw,
  ge as DrawMode,
  m as Extent,
  pi as GaodeLayer,
  Ei as InteractionExtent,
  ri as LayerGroup,
  St as LineString,
  ae as LinearRing,
  l as Lnglat,
  _i as Map,
  Qe as MapToken,
  Xe as Measure,
  xi as Modify,
  re as Pixel,
  We as Point,
  Dt as Polygon,
  wt as Popup,
  mi as ProjUtil,
  k as Projection,
  Pe as Size,
  U as Style,
  Ii as TdtLayer,
  te as VectorLayer
};
