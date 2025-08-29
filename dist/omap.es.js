var Be = Object.defineProperty;
var oe = (r) => {
  throw TypeError(r);
};
var De = (r, e, t) => e in r ? Be(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var c = (r, e, t) => De(r, typeof e != "symbol" ? e + "" : e, t), ae = (r, e, t) => e.has(r) || oe("Cannot " + t);
var le = (r, e, t) => (ae(r, e, "read from private field"), t ? t.call(r) : e.get(r)), ue = (r, e, t) => e.has(r) ? oe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), ce = (r, e, t, i) => (ae(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
import * as he from "ol";
import * as re from "ol/layer";
import * as ne from "ol/source";
import * as Q from "ol/proj";
import * as Ve from "ol/interaction";
import * as I from "ol/util";
import ee from "ol/Feature";
import * as T from "ol/geom";
import * as v from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
import { createBox as Te } from "ol/interaction/Draw";
function s(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function u(r) {
  throw new Error(`omap error ${r}`);
}
function _(r) {
  return (e, t) => `📦${r}【${e}】: ${t}`;
}
const Ge = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function fe(r) {
  return typeof r == "function";
}
function E(r) {
  return Array.isArray(r);
}
function ge(r) {
  return Array.isArray(r) && r.length === 0;
}
function h(r) {
  return typeof r == "number";
}
function x(r) {
  return typeof r == "string";
}
function Ze(r) {
  return r === "";
}
function Oe(r) {
  return typeof r == "boolean";
}
function se(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function w(r) {
  return E(r) && r.length === 2 && h(r[0]) && h(r[1]);
}
function j(r) {
  return E(r) && r.length === 4 && h(r[0]) && h(r[1]) && h(r[2]) && h(r[3]);
}
function Y(r) {
  return E(r) && r.length === 3 && r.every((e) => h(e) && e >= 0 && e <= 255);
}
function Ue(r) {
  return x(r) && Ge.test(r);
}
function N(r) {
  return h(r) && r >= 0 && r <= 1;
}
function H(r) {
  let e = r.replace("#", "");
  return x(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function Ne(r) {
  let e = r.replace("#", "");
  return x(r) && r.startsWith("#") && e.length === 8;
}
function k(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function de(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function je(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Ke(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const qe = "Size", P = _(qe);
class _e {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    c(this, "_size");
    (!h(e) || !h(t)) && u(P("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return s(this._size) ? !0 : (o(P(e, "未正确实例化")), !1);
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
        o(P("setSize", "参数格式有误"));
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
        o(P("setWidth", "参数格式有误"));
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
        o(P("setHeight", "参数格式有误"));
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
const We = "Pixel", b = _(We);
class Ye {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    c(this, "_pixel", []);
    (!h(e) || !h(t)) && u(b("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return s(this._pixel) ? !0 : (o(b(e, "未正确实例化")), !1);
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
        o(b("setPixel", "参数格式有误"));
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
        o(b("setX", "参数格式有误"));
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
        o(b("setY", "参数格式有误"));
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
      o(b("equals", "参数未正确实例化"));
      return;
    }
    const t = e.getPixel();
    if (t)
      return this._pixel[0] === t[0] && this._pixel[1] === t[1];
  }
  /**
   * 以字符串的形式输出像素坐标
   * @returns {string} 像素坐标字符串
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._pixel[0]}, ${this._pixel[1]}]` : "";
  }
}
const He = "Lnglat", R = _(He);
class l {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    c(this, "_lnglat");
    (!h(e) || !h(t)) && u(R("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (o(R(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!h(e)) {
        o(R("setLng", "传入经度格式有误"));
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
        o(R("setLat", "传入纬度格式有误"));
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
      o(R("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !w(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const ye = {
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
}, Xe = "Color", G = _(Xe);
class L {
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
      u(G("constructor", "初始化参数有误"));
    };
    if (E(e)) {
      let i = e;
      if (i.length === 3) {
        if (!Y(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!Y(i.slice(0, 3)) || !N(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!H(i[0]) || !N(i[1])) {
          t();
          return;
        }
        let n = k(e[0]);
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
    if (se(e)) {
      let i = e;
      if (!s(i.color) && !(s(i.r) && s(i.g) && s(i.b))) {
        t();
        return;
      }
      if (s(i.color)) {
        if (H(i.color)) {
          let n = k(i.color);
          if (!s(n)) {
            t();
            return;
          }
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i.alpha || i.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (Ue(i.color)) {
          let n = de(i.color).join(", ");
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n}, ${i.alpha || i.opacity})` : `rgb(${n})`;
        }
      } else if (s(i.r) && s(i.g) && s(i.b)) {
        if (!Y([i.r, i.g, i.b])) {
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
      if (Ze(e)) {
        t();
        return;
      }
      if (H(e)) {
        let i = k(e);
        if (!s(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (Ne(e)) {
        let i = k(e.slice(0, 7));
        if (!s(i)) {
          t();
          return;
        }
        let n = Ke(e.slice(6));
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
    if (!N(e)) {
      u(G("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...de(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...je(this._color), e]);
    else {
      if (!s(ye[this._color])) {
        u(G("withAlpha", "颜色值有误"));
        return;
      }
      let t = k(ye[this._color]);
      if (!s(t)) {
        u(G("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const Je = "Extent", $ = _(Je);
class y {
  constructor(e, t, i, n) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    c(this, "_extent");
    if (!h(e) || !h(t) || !h(i) || !h(n)) {
      u($("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < e || n < t) {
      u($("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [e, t, i, n];
  }
  _isInitialized(e) {
    return !s(this._extent) || this._extent.length !== 4 ? (o($(e, "未正确实例化")), !1) : !0;
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
  /**
   * 判断边界范围Extent是否包含某个点
   * @param extent 范围
   * @param position 位置
   * @return 判断结果
   */
  static containsCoordinate(e, t) {
    if (!(e instanceof y) || !(t instanceof l)) {
      o($("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
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
    if (!(e instanceof y) || !(t instanceof y)) {
      o($("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function Qe(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new v.Fill({
      ...r,
      color: e instanceof L ? e.getColor() : e
    });
}
function et(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new v.Stroke({
      ...r,
      color: e instanceof L ? e.getColor() : e
    });
}
function tt(r) {
  if (!s(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new v.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return s(e) && i.setFill(new v.Fill({
    color: e.color instanceof L ? e.color.getColor() : e.color
  })), s(t) && i.setStroke(new v.Stroke({
    color: t.color instanceof L ? t.color.getColor() : t.color
  })), i;
}
function it(r) {
  return s(r) ? new v.Icon({
    ...r,
    color: r.color ? r.color instanceof L ? r.color.getColor() : r.color : void 0,
    offset: s(r.offset) ? r.offset.getPixel() : [0, 0],
    size: s(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function rt(r) {
  if (!s(r))
    return;
  let e = new v.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return s(t) && e.setFill(new v.Fill({
    color: t.color instanceof L ? t.color.getColor() : t.color
  })), s(i) && e.setStroke(new v.Stroke({
    color: i.color instanceof L ? i.color.getColor() : i.color
  })), e;
}
const nt = (r, e) => {
  if (console.log(r), !!s(r)) {
    if (r.getType() === "Point")
      return new D({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    if (r.getType() === "LineString")
      return new D({
        stroke: {
          color: "#13c2c2",
          width: 10
        }
      });
    if (r.getType() === "Polygon")
      return new D({
        stroke: {
          color: "#000000",
          width: 2
        },
        fill: {
          color: new L({
            color: "#1890FF",
            opacity: 0.5
          })
        }
      });
  }
};
class D {
  constructor(e) {
    c(this, "_style");
    const { fill: t, stroke: i, text: n, circle: a, icon: f, regularShape: g } = e;
    let m;
    a ? m = tt(a) : f ? m = it(f) : g && (m = rt(g)), this._style = new v.Style({
      fill: Qe(t),
      stroke: et(i),
      image: m
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
let te = "BaseLayer", F = _(te);
const me = 1, Fe = !0, pe = 0, Ie = 22, Ee = 0, xe = 1 / 0, ze = 1, ve = {};
var V;
class K {
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
    c(this, "opacity", me);
    // 图层透明度，默认1
    c(this, "visible", Fe);
    // 图层是否可见，默认true
    c(this, "extent", null);
    // 图层范围，默认全局
    c(this, "minZoom", pe);
    // 最小缩放级别，默认0
    c(this, "maxZoom", Ie);
    // 最大缩放级别，默认22
    c(this, "minResolution", Ee);
    // 最小分辨率，默认0r
    c(this, "maxResolution", xe);
    // 最大分辨率，默认Infinity
    c(this, "zIndex", ze);
    // 图层层级，默认0
    c(this, "properties", ve);
    // 图层属性，用于存储图层相关信息
    ue(this, V, null);
    let i = t || {};
    this.type = e, te = `${e}Layer`, F = _(te), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || me, this.visible = i.visible || Fe, this.extent = i.extent || null, this.minZoom = i.minZoom || pe, this.maxZoom = i.maxZoom || Ie, this.minResolution = i.minResolution || Ee, this.maxResolution = i.maxResolution || xe, this.zIndex = i.zIndex || ze, this.properties = i.properties || ve;
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
      if (!N(e)) {
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
      if (Oe(e)) {
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
    let t = e instanceof y ? e.getExtent() : e;
    this._layer.setExtent(t);
  }
  /**
   * 获取图层的范围
   */
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._layer.getExtent();
    if (e)
      return new y(e[0], e[1], e[2], e[3]);
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
      if (se(e)) {
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
      return le(this, V);
  }
  // TODO
  setGroupId(e) {
    ce(this, V, e);
  }
}
V = new WeakMap();
const st = "Interaction", ot = _(st);
class at {
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
    this.type = e;
  }
  _isInitialized(e) {
    return s(this._interaction) ? !0 : (o(ot(e, "未正确实例化")), !1);
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
}
const lt = {
  clickTolerance: 6,
  dragVertexDelay: 500,
  snapTolerance: 12,
  stopClick: !1
};
function ut(r) {
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
      e = "Polygon", t = Te();
      break;
  }
  return { type: e, geometryFunction: t };
}
const ct = "Draw", ht = _(ct);
class ft extends at {
  constructor(t, i) {
    super("Draw");
    c(this, "_layer");
    let n = null;
    i != null && i.layer && ((i == null ? void 0 : i.layer) instanceof ke ? (this._layer = i == null ? void 0 : i.layer, n = i == null ? void 0 : i.layer.getSource()) : o(ht("init", "layer参数不属于VectorLayer类型"))), s(n) || (this._layer = new ke({
      style: nt
    }), n = this._layer.getSource());
    let a = Object.assign(lt, {
      clickTolerance: i == null ? void 0 : i.clickTolerance,
      source: n
      // features: undefined,
      // style: undefined
    });
    console.log(a), this._interaction = new Ve.Draw({
      ...ut(t),
      ...a
    });
  }
}
const gt = "Event", Ae = _(gt);
class dt {
  constructor(e) {
    c(this, "events", /* @__PURE__ */ new Map());
    c(this, "target", null);
    c(this, "total", 0);
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
      } catch (f) {
        u(Ae("emit", `回调异常: ${String(f)}`));
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
    return o(Ae("remove", `未找到 id=${e} 的监听`)), this;
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
function we(r) {
  return r.startsWith("map:");
}
function Z(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new Ye(...t.pixel)), t.coordinate && (i.coordinate = new l(...t.coordinate));
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
const _t = "Map", d = _(_t);
let Vt = class {
  constructor(e, t) {
    c(this, "_map");
    c(this, "_view");
    c(this, "layers", []);
    c(this, "interactions", []);
    c(this, "events", null);
    const n = t.view;
    if (!s(n)) {
      u(d("constructor", "view参数不能为空"));
      return;
    }
    let a = n.projection || new M("EPSG:3857");
    x(a) && (a = new M(a));
    const f = {
      ...n,
      center: n.center instanceof l ? n.center._lnglat : n.center,
      // 中心点坐标
      extent: n.extent instanceof y ? n.extent._extent : n.extent,
      projection: a._projection
    }, g = new he.View(f), m = new he.Map({
      target: e,
      view: g
    });
    this._view = g, this._map = m, this.events = new dt(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(d(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new _e(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof _e ? e._size : e;
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
      o(d("setCenter", "参数center不能为空"));
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
        o(d("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!h(e)) {
        o(d("setZoom", "参数zoom必须为number类型"));
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
        o(d("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!h(e)) {
        o(d("setResolution", "参数resolution必须为number类型"));
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
        o(d("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!h(e)) {
        o(d("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, n, a] = e;
    return new y(t, i, n, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !h(e)) {
        o(d("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !h(e)) {
        o(d("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(e)) {
      o(d("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof kt)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (s(t) && this.getLayerById(t)) {
      o(d("addLayer", "图层已存在"));
      return;
    }
    e._layer && (this.layers.push(e), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!s(e)) {
      o(d("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof K && s(i.getId()) && i.getId() === e && (t = i);
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
      o(d("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!s(t))
      return o(d("removeLayerById", `找不到id为${e}(${x(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(d("on", "参数不能为空"));
      return;
    }
    let i = we(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (g) => {
      this.events.emit(e, Z(this, e, g));
    }) : n.on(e.replace("view:", ""), (g) => {
      this.events.emit(e, Z(this, e, g));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(d("un", "参数不能为空"));
        return;
      }
      if (!h(e)) {
        o(d("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!s(e) || !s(t)) {
      o(d("on", "参数不能为空"));
      return;
    }
    let i = we(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (g) => {
      this.events.emit(e, Z(this, e, g));
    }) : n.on(e.replace("view:", ""), (g) => {
      this.events.emit(e, Z(this, e, g));
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
        o(d("setProperties", "参数不能为空"));
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
    if (this.interactions.findIndex((n) => I.getUid(n._interaction) === I.getUid(e._interaction)) !== -1) {
      o(d("addInteraction", "该交互已添加到地图中"));
      return;
    }
    e instanceof ft && e._layer && this.addLayer(e._layer), s(e._interaction) && (this.interactions.push(e), (i = this._map) == null || i.addInteraction(e._interaction));
  }
  getInteraction() {
  }
  removeInteraction() {
  }
};
const yt = "Map", Ce = _(yt);
class M {
  constructor(e) {
    c(this, "_projection", null);
    c(this, "code", "");
    c(this, "units", "degrees");
    let t = "";
    if (x(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!s(i.code)) {
        u(Ce("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = Q.get(t), !s(this._projection)) {
      o(Ce("constructor", "坐标系不存在"));
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
const mt = "Feature", B = _(mt);
class q {
  constructor(e, t) {
    c(this, "id");
    c(this, "type");
    c(this, "_feature");
    c(this, "_geometry");
    this.type = e, t instanceof ee ? this._initByFeature(t) : this._init(t);
  }
  _init(e) {
    switch (this.type) {
      case "Point":
        let t = e;
        this._geometry = new T.Point(t instanceof l ? t._lnglat : t);
        break;
      case "LineString":
        let i = e.map((f) => f instanceof l ? f._lnglat : f);
        this._geometry = new T.LineString(i);
        break;
      case "Polygon":
        let n = e.map((f) => f.map((g) => g instanceof l ? g._lnglat : g));
        this._geometry = new T.Polygon(n);
        break;
      case "LinearRing":
        let a = e.map((f) => f instanceof l ? f._lnglat : f);
        this._geometry = new T.LinearRing(a);
        break;
    }
    this._feature = new ee({
      geometry: this._geometry
    });
  }
  _initByFeature(e) {
    this._feature = e, this._geometry = e.getGeometry();
  }
  _isInitialized(e) {
    return this._feature == null ? (o(B(e, "未正确实例化")), !1) : !0;
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
        o(B("setProperties", "参数不能为空"));
        return;
      }
      if (!se(e)) {
        o(B("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!s(e)) {
        o(B("setId", "参数id不能为空"));
        return;
      }
      if (!h(e) && !x(e)) {
        o(B("setId", "参数id格式有误"));
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
}
const Ft = "Point", S = _(Ft);
class Pe extends q {
  constructor(e, t) {
    if (!s(e)) {
      u(S("constructor", "参数不能为空"));
      return;
    }
    if (e instanceof ee)
      super("Point", e);
    else {
      if (!(e instanceof l) && !w(e)) {
        u(S("constructor", "坐标格式有误"));
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
      u(S("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof l) && !w(e)) {
      u(S("setCoordinates", "坐标格式有误"));
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
      u(S("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof y) && !j(e)) {
      u(S("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof y ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function Le(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !(i instanceof l) && !w(i)) && (e = !1), e;
}
const pt = "Point", z = _(pt);
class Gt extends q {
  constructor(e, t) {
    if (!s(e)) {
      u(z("constructor", "参数不能为空"));
      return;
    }
    if (!Le(e)) {
      u(z("constructor", "坐标格式有误"));
      return;
    }
    super("LineString", e), t && this.setProperties(t);
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
      u(z("setCoordinates", "参数不能为空"));
      return;
    }
    if (!Le(e)) {
      u(z("setCoordinates", "坐标格式有误"));
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
      u(z("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof l) && !w(e)) {
      u(z("setCoordinates", "坐标格式有误"));
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
    return new y(e[0], e[1], e[2], e[3]);
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
      u(z("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(h(e) && e >= 0 && e <= 1)) {
      u(z("getCoordinateAt", "参数格式有误"));
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
      u(z("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof y) && !j(e)) {
      u(z("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof y ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function be(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !E(i)) && (e = !1), r.forEach((i) => {
    i.forEach((n) => {
      !(n instanceof l) && !w(n) && (e = !1);
    });
  }), e;
}
function ie(r) {
  let e = !0;
  return E(r) || (e = !1), r.some((i) => !(i instanceof l) && !w(i)) && (e = !1), e;
}
const It = "Point", A = _(It);
class Zt extends q {
  constructor(e, t) {
    if (!s(e)) {
      u(A("constructor", "参数不能为空"));
      return;
    }
    if (!be(e)) {
      u(A("constructor", "坐标格式有误"));
      return;
    }
    super("Polygon", e), t && this.setProperties(t);
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
      u(A("setCoordinates", "参数不能为空"));
      return;
    }
    if (!be(e)) {
      u(A("setCoordinates", "坐标格式有误"));
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
      u(A("appendLinearRing", "linearRing参数不能为空"));
      return;
    }
    if (!(e instanceof X) && !ie(e)) {
      u(A("appendLinearRing", "linearRing参数格式有误"));
      return;
    }
    if (e instanceof X)
      this._geometry.appendLinearRing(e._geometry);
    else {
      let t = e.map((i) => i instanceof l ? i.toArray() : i);
      this._geometry.appendLinearRing(new X(t)._geometry);
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
    return new y(e[0], e[1], e[2], e[3]);
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
    return new Pe(e);
  }
  /**
   * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
   * @param {Lnglat | OlCoordinateType} coordinates 
   * @returns {boolean | undefined}
   */
  intersectsCoordinate(e) {
    if (!s(e)) {
      u(A("intersectsCoordinate", "参数coordinates不能为空"));
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
      u(A("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof y) && !j(e)) {
      u(A("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof y ? e.getExtent() : e;
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
const Et = "LinearRing", O = _(Et);
class X extends q {
  constructor(e, t) {
    if (!s(e)) {
      u(O("constructor", "参数不能为空"));
      return;
    }
    if (!ie(e)) {
      u(O("constructor", "坐标格式有误"));
      return;
    }
    super("LinearRing", e), t && this.setProperties(t);
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
      u(O("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ie(e)) {
      u(O("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof l ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
}
const xt = {
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
class Ot extends K {
  constructor(t, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    c(this, "gaodeType", null);
    this.gaodeType = t, this._layer = new re.Tile({
      source: new ne.XYZ({
        urls: xt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const zt = "ProjUtil", Se = _(zt);
class Ut {
  static fromLonLat(e, t) {
    if (!s(e)) {
      o(Se("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof l && (i = e._lnglat);
    let n = s(t) ? x(t) ? new M(t) : t : new M("EPSG:3857"), a = Q.fromLonLat(i, n._projection);
    return new l(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!s(e)) {
      o(Se("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof l && (i = e._lnglat);
    let n = s(t) ? x(t) ? new M(t) : t : new M("EPSG:3857"), a = Q.toLonLat(i, n._projection);
    return new l(a[0], a[1]);
  }
}
const J = "OMapToken", vt = {
  tdt: null
};
function At(r, e) {
  window[J] || (window[J] = {}), window[J][r] = e;
}
const Re = new Proxy(vt, {
  set: function(r, e, t, i) {
    return At(e, t), Reflect.set(r, e, t, i);
  }
}), wt = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function Ct(r, e) {
  return wt.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, Re.tdt);
}
let Lt = "TdtLayer", Me = _(Lt);
class Nt extends K {
  constructor(t, i) {
    var a, f, g;
    super("Tdt", i);
    /**
     * 图层类型
     */
    c(this, "tdtType", null);
    if (!s(Re.tdt)) {
      u(Me("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(t)) {
      u(Me("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let n = i || {};
    delete n.source, n.map, this.tdtType = t, this._layer = new re.Tile({
      ...n,
      extent: s(n.extent) ? (a = n.extent) == null ? void 0 : a._extent : void 0,
      map: s(n.map) ? (f = n.map) == null ? void 0 : f._map : void 0,
      background: s(n.background) ? (g = n.background) == null ? void 0 : g._color : void 0,
      source: new ne.XYZ({
        url: Ct(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
function bt(r) {
  let e = null, t = r.getGeometry();
  if (!t) return null;
  switch (t.getType()) {
    case "Point":
      e = new Pe(r);
      break;
  }
  return e;
}
let St = "VectorLayer", p = _(St);
class ke extends K {
  constructor(t = {}) {
    super("Vector", t);
    c(this, "features", []);
    c(this, "style");
    let i = s(t.source) ? t.source : {}, n = {
      ...i,
      features: i.features ? i.features.map((a) => a.getFeature()) : []
    };
    this._layer = new re.Vector({
      source: new ne.Vector(n)
    }), this.initStyle(t.style), this._initLayerEvent(), this.initVectorLyaerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(p(t, "未正确实例化")), !1);
  }
  initVectorLyaerEvent() {
    this._isInitializedLayer("initStyle") && this._layer.getSource().on("addfeature", (t) => {
      const { feature: i } = t;
      if (s(i)) {
        let n = bt(i);
        n && this.features.push(n);
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
    s(t) && (t instanceof D ? i = t.getStyle() : E(t) && t.every((n) => n instanceof D) ? i = t.map((n) => n.getStyle()) : fe(t) ? i = (n, a) => {
      let f = I.getUid(n), g = this.features.findIndex((C) => I.getUid(C.getFeature()) === f), m = t(g !== -1 ? this.features[g] : null, a);
      return m ? m.getStyle() : void 0;
    } : o(p("initStyle", "style格式有误"))), i && (this._layer.setStyle(i), this.style = t);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!s(t)) {
      o(p("setId", "参数id不能为空"));
      return;
    }
    if (!h(t) && !x(t)) {
      o(p("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((n) => s(n.getId()) && n.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!s(t)) {
      o(p("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof y) && !j(t)) {
      o(p("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let n = t instanceof y ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(n), f = [];
    return a.forEach((g) => {
      let m = I.getUid(g), C = this.features.findIndex((W) => I.getUid(W.getFeature()) === m);
      C !== -1 && f.push(this.features[C]);
    }), f;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!s(t)) {
      o(p("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof l) && !w(t)) {
      o(p("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof l ? t._lnglat : t;
    const n = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return n.forEach((f) => {
      let g = I.getUid(f), m = this.features.findIndex((C) => I.getUid(C.getFeature()) === g);
      m !== -1 && a.push(this.features[m]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!s(t)) {
        o(p("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!s(t) || !E(t)) {
        o(p("addFeatures", "参数格式有误不能为空"));
        return;
      }
      ge(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!s(t)) {
        o(p("removeFeature", "参数不能为空"));
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
        o(p("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      ge(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!s(t) || !fe(t)) {
        o(p("forEachFeature", "参数格式有误"));
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
        o(p("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (n) => {
        let a = I.getUid(n), f = this.features.findIndex((g) => I.getUid(g.getFeature()) === a);
        s(f) && f !== -1 && i(this.features[f], 0);
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
        o(p("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (n) => {
        let a = I.getUid(n), f = this.features.findIndex((g) => I.getUid(g.getFeature()) === a);
        s(f) && f !== -1 && i(this.features[f], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!s(t)) {
      o(p("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof l) && !w(t)) {
      o(p("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let n = t instanceof l ? t._lnglat : t, a = i ? (m) => {
      let C = I.getUid(m), W = this.features.findIndex(($e) => I.getUid($e.getFeature()) === C);
      return i(this.features[W]);
    } : void 0;
    const f = this._layer.getSource().getClosestFeatureToCoordinate(n, a);
    let g = this.features.findIndex((m) => I.getUid(m.getFeature()) === I.getUid(f));
    if (g !== -1)
      return this.features[g];
  }
  getSourceExtent() {
    if (!this._isInitializedLayer("getSourceExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new y(t[0], t[1], t[2], t[3]);
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
        o(p("setStyle", "style参数不能为空"));
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
let Mt = "LayerGroup", U = _(Mt);
class kt {
  constructor(e, t) {
    c(this, "id", null);
    c(this, "layers", []);
    if (!s(e)) {
      u(U("constructor", "参数不能为空"));
      return;
    }
    let i, n = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (n = e, !s(t)) {
        u(U("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    s(n) && (this.id = n), this.layers = i;
  }
  add(e) {
    if (!s(e)) {
      u(U("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (s(t) && this.layers.find((n) => n.getId() && n.getId() === t)) {
      o(U("add", "图层已存在"));
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
export {
  L as Color,
  ft as Draw,
  y as Extent,
  Ot as GaodeLayer,
  kt as LayerGroup,
  Gt as LineString,
  X as LinearRing,
  l as Lnglat,
  Vt as Map,
  Re as MapToken,
  Ye as Pixel,
  Pe as Point,
  Zt as Polygon,
  Ut as ProjUtil,
  M as Projection,
  _e as Size,
  D as Style,
  Nt as TdtLayer,
  ke as VectorLayer
};
