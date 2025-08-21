var be = Object.defineProperty;
var ee = (r) => {
  throw TypeError(r);
};
var Me = (r, e, t) => e in r ? be(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var u = (r, e, t) => Me(r, typeof e != "symbol" ? e + "" : e, t), te = (r, e, t) => e.has(r) || ee("Cannot " + t);
var ie = (r, e, t) => (te(r, e, "read from private field"), t ? t.call(r) : e.get(r)), re = (r, e, t) => e.has(r) ? ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), ne = (r, e, t, i) => (te(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
import * as se from "ol";
import * as Y from "ol/layer";
import * as X from "ol/source";
import * as H from "ol/proj";
import * as p from "ol/util";
import $e from "ol/Feature";
import * as N from "ol/geom";
import * as x from "ol/style";
import "ol/render/Feature";
import "ol/coordinate";
function n(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function f(r) {
  throw new Error(`omap error ${r}`);
}
function y(r) {
  return (e, t) => `📦${r}【${e}】: ${t}`;
}
const Se = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function oe(r) {
  return typeof r == "function";
}
function z(r) {
  return Array.isArray(r);
}
function ae(r) {
  return Array.isArray(r) && r.length === 0;
}
function l(r) {
  return typeof r == "number";
}
function E(r) {
  return typeof r == "string";
}
function Pe(r) {
  return r === "";
}
function ke(r) {
  return typeof r == "boolean";
}
function J(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function w(r) {
  return z(r) && r.length === 2 && l(r[0]) && l(r[1]);
}
function Ce(r) {
  return z(r) && r.length === 4 && l(r[0]) && l(r[1]) && l(r[2]) && l(r[3]);
}
function j(r) {
  return z(r) && r.length === 3 && r.every((e) => l(e) && e >= 0 && e <= 255);
}
function Be(r) {
  return E(r) && Se.test(r);
}
function O(r) {
  return l(r) && r >= 0 && r <= 1;
}
function q(r) {
  let e = r.replace("#", "");
  return E(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function Re(r) {
  let e = r.replace("#", "");
  return E(r) && r.startsWith("#") && e.length === 8;
}
function S(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function le(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function De(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Ve(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const Te = "Size", P = y(Te);
class ue {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    u(this, "_size");
    (!l(e) || !l(t)) && f(P("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return n(this._size) ? !0 : (o(P(e, "未正确实例化")), !1);
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
      if (!l(e[0]) || !l(e[1])) {
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
      if (!l(e)) {
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
      if (!l(e)) {
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
const Ge = "Pixel", b = y(Ge);
class Oe {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    u(this, "_pixel", []);
    (!l(e) || !l(t)) && f(b("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return n(this._pixel) ? !0 : (o(b(e, "未正确实例化")), !1);
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
      if (!l(e[0]) || !l(e[1])) {
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
      if (!l(e)) {
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
      if (!l(e)) {
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
    if (!n(e)) {
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
const Ze = "Lnglat", k = y(Ze);
class c {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {OlCoordinateType}
     * @example [119.26, 28.73]
     * @private
     */
    u(this, "_lnglat");
    (!l(e) || !l(t)) && f(k("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(k(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!l(e)) {
        o(k("setLng", "传入经度格式有误"));
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
      if (!l(e)) {
        o(k("setLat", "传入纬度格式有误"));
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
    if (!(e instanceof c)) {
      o(k("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
const ce = {
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
}, Ue = "Color", V = y(Ue);
class C {
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
      f(V("constructor", "初始化参数有误"));
    };
    if (z(e)) {
      let i = e;
      if (i.length === 3) {
        if (!j(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!j(i.slice(0, 3)) || !O(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!q(i[0]) || !O(i[1])) {
          t();
          return;
        }
        let s = S(e[0]);
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
    if (J(e)) {
      let i = e;
      if (!n(i.color) && !(n(i.r) && n(i.g) && n(i.b))) {
        t();
        return;
      }
      if (n(i.color)) {
        if (q(i.color)) {
          let s = S(i.color);
          if (!n(s)) {
            t();
            return;
          }
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i.alpha || i.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (Be(i.color)) {
          let s = le(i.color).join(", ");
          this._color = n(i.alpha) || n(i.opacity) ? `rgba(${s}, ${i.alpha || i.opacity})` : `rgb(${s})`;
        }
      } else if (n(i.r) && n(i.g) && n(i.b)) {
        if (!j([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = n(i.alpha) || n(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (E(e)) {
      if (Pe(e)) {
        t();
        return;
      }
      if (q(e)) {
        let i = S(e);
        if (!n(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (Re(e)) {
        let i = S(e.slice(0, 7));
        if (!n(i)) {
          t();
          return;
        }
        let s = Ve(e.slice(6));
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
    if (!O(e)) {
      f(V("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...le(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...De(this._color), e]);
    else {
      if (!n(ce[this._color])) {
        f(V("withAlpha", "颜色值有误"));
        return;
      }
      let t = S(ce[this._color]);
      if (!n(t)) {
        f(V("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const Ne = "Extent", B = y(Ne);
class I {
  constructor(e, t, i, s) {
    /**
     * extent数组
     * @type {OlExtentType}
     * @example [119.26, 28.73, 119.26, 28.73]
     * @private
     */
    u(this, "_extent");
    if (!l(e) || !l(t) || !l(i) || !l(s)) {
      f(B("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < e || s < t) {
      f(B("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [e, t, i, s];
  }
  _isInitialized(e) {
    return !n(this._extent) || this._extent.length !== 4 ? (o(B(e, "未正确实例化")), !1) : !0;
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
      return new c(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new c(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new c(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new c(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new c(
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
    if (!(e instanceof I) || !(t instanceof c)) {
      o(B("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!e._isInitialized("containsCoordinate") || !n(t.toArray())) return;
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
    if (!(e instanceof I) || !(t instanceof I)) {
      o(B("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function je(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new x.Fill({
      ...r,
      color: e instanceof C ? e.getColor() : e
    });
}
function qe(r) {
  if (!n(r))
    return;
  const { color: e } = r;
  if (n(e))
    return new x.Stroke({
      ...r,
      color: e instanceof C ? e.getColor() : e
    });
}
function Ke(r) {
  if (!n(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new x.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return n(e) && i.setFill(new x.Fill({
    color: e.color instanceof C ? e.color.getColor() : e.color
  })), n(t) && i.setStroke(new x.Stroke({
    color: t.color instanceof C ? t.color.getColor() : t.color
  })), i;
}
function He(r) {
  return n(r) ? new x.Icon({
    ...r,
    color: r.color ? r.color instanceof C ? r.color.getColor() : r.color : void 0,
    offset: n(r.offset) ? r.offset.getPixel() : [0, 0],
    size: n(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function We(r) {
  if (!n(r))
    return;
  let e = new x.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return n(t) && e.setFill(new x.Fill({
    color: t.color instanceof C ? t.color.getColor() : t.color
  })), n(i) && e.setStroke(new x.Stroke({
    color: i.color instanceof C ? i.color.getColor() : i.color
  })), e;
}
class he {
  constructor(e) {
    u(this, "_style");
    const { fill: t, stroke: i, text: s, circle: a, icon: h, regularShape: d } = e;
    let F;
    a ? F = Ke(a) : h ? F = He(h) : d && (F = We(d)), this._style = new x.Style({
      fill: je(t),
      stroke: qe(i),
      image: F
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
let W = "BaseLayer", _ = y(W);
const fe = 1, de = !0, ge = 0, _e = 22, ye = 0, Fe = 1 / 0, me = 1, pe = {};
var D;
class Z {
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
    u(this, "opacity", fe);
    // 图层透明度，默认1
    u(this, "visible", de);
    // 图层是否可见，默认true
    u(this, "extent", null);
    // 图层范围，默认全局
    u(this, "minZoom", ge);
    // 最小缩放级别，默认0
    u(this, "maxZoom", _e);
    // 最大缩放级别，默认22
    u(this, "minResolution", ye);
    // 最小分辨率，默认0r
    u(this, "maxResolution", Fe);
    // 最大分辨率，默认Infinity
    u(this, "zIndex", me);
    // 图层层级，默认0
    u(this, "properties", pe);
    // 图层属性，用于存储图层相关信息
    re(this, D, null);
    let i = t || {};
    this.type = e, W = `${e}Layer`, _ = y(W), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || fe, this.visible = i.visible || de, this.extent = i.extent || null, this.minZoom = i.minZoom || ge, this.maxZoom = i.maxZoom || _e, this.minResolution = i.minResolution || ye, this.maxResolution = i.maxResolution || Fe, this.zIndex = i.zIndex || me, this.properties = i.properties || pe;
  }
  _isInitialized(e) {
    return n(this._layer) ? !0 : (o(_(e, "未正确实例化")), !1);
  }
  _initLayerEvent() {
    this._isInitialized("setOpacity") && this._layer.on([
      "propertychange"
    ], (e) => {
      e.key === "opacity" && (this.opacity = this.getOpacity());
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
  setOpacity(e) {
    if (this._isInitialized("setOpacity")) {
      if (!n(e)) {
        o(_("setOpacity", "透明度不能为空"));
        return;
      }
      if (!O(e)) {
        o(_("setOpacity", "透明度必须为0~1的数字"));
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
        o(_("setVisible", "可见性不能为空"));
        return;
      }
      if (ke(e)) {
        o(_("setVisible", "可见性必须为boolean类型"));
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
  setExtent() {
  }
  getExtent() {
  }
  setMinZoom(e) {
    if (this._isInitialized("setMinZoom")) {
      if (!n(e)) {
        o(_("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!l(e)) {
        o(_("setMinZoom", "minZoom必须为number类型"));
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
        o(_("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!l(e)) {
        o(_("setMaxZoom", "maxZoom必须为number类型"));
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
        o(_("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!l(e)) {
        o(_("setMinResolution", "minResolution必须为number类型"));
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
        o(_("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!l(e)) {
        o(_("setMaxResolution", "maxResolution必须为number类型"));
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
        o(_("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!l(e)) {
        o(_("setZIndex", "zIndex必须为number类型"));
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
      if (!n(e)) {
        o(_("setProperties", "属性不能为空"));
        return;
      }
      if (J(e)) {
        o(_("setProperties", "属性必须为object类型"));
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
      return ie(this, D);
  }
  // TODO
  setGroupId(e) {
    ne(this, D, e);
  }
}
D = new WeakMap();
const Ye = "Event", Ie = y(Ye);
class Xe {
  constructor(e) {
    u(this, "events", /* @__PURE__ */ new Map());
    u(this, "target", null);
    u(this, "total", 0);
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
      } catch (h) {
        f(Ie("emit", `回调异常: ${String(h)}`));
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
    return o(Ie("remove", `未找到 id=${e} 的监听`)), this;
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
function Ee(r) {
  return r.startsWith("map:");
}
function T(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new Oe(...t.pixel)), t.coordinate && (i.coordinate = new c(...t.coordinate));
      break;
    case "map:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new c(...t.oldValue) : t.oldValue), t.key === "size" ? i.newValue = t.newValue || r.getSize() : i.newValue = t.newValue, i.key = t.key;
      break;
    case "view:change:resolution":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getResolution();
      break;
    case "view:change:center":
      t.oldValue && (i.oldValue = new c(...t.oldValue)), i.newValue = t.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getRotation();
      break;
    case "view:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new c(...t.oldValue) : t.oldValue), t.key === "center" ? i.newValue = t.newValue || r.getCenter() : t.key === "rotation" ? i.newValue = t.newValue || r.getRotation() : t.key === "resolution" ? i.newValue = t.newValue || r.getResolution() : i.newValue = t.newValue, i.key = t.key;
      break;
  }
  return i;
}
const Je = "Map", g = y(Je);
let pt = class {
  constructor(e, t) {
    u(this, "_map");
    u(this, "_view");
    u(this, "layers", []);
    u(this, "events", null);
    const s = t.view;
    if (!n(s)) {
      f(g("constructor", "view参数不能为空"));
      return;
    }
    let a = s.projection || new $("EPSG:3857");
    E(a) && (a = new $(a));
    const h = {
      ...s,
      center: s.center instanceof c ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof I ? s.extent._extent : s.extent,
      projection: a._projection
    }, d = new se.View(h), F = new se.Map({
      target: e,
      view: d
    });
    this._view = d, this._map = F, this.events = new Xe(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(g(e, "未正确实例化")), !1) : !0;
  }
  getSize() {
    if (!this._isInitialized("getSize")) return;
    let e = this._map.getSize();
    return new ue(...e);
  }
  setSize(e) {
    if (!this._isInitialized("getSize")) return;
    let t = e instanceof ue ? e._size : e;
    this._map.setSize(t);
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let e = this._view.getCenter();
    if (e)
      return new c(e[0], e[1]);
  }
  setCenter(e) {
    if (!this._isInitialized("setCenter")) return;
    if (!n(e)) {
      o(g("setCenter", "参数center不能为空"));
      return;
    }
    let t = e instanceof c ? e._lnglat : e;
    this._view.setCenter(t);
  }
  getZoom() {
    if (this._isInitialized("getZoom"))
      return this._view.getZoom();
  }
  setZoom(e) {
    if (this._isInitialized("setZoom")) {
      if (!n(e)) {
        o(g("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!l(e)) {
        o(g("setZoom", "参数zoom必须为number类型"));
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
        o(g("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!l(e)) {
        o(g("setResolution", "参数resolution必须为number类型"));
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
        o(g("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!l(e)) {
        o(g("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, s, a] = e;
    return new I(t, i, s, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !l(e)) {
        o(g("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(e) && !l(e)) {
        o(g("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  // 图层管理相关
  addLayer(e) {
    if (!this._isInitialized("addLayer")) return;
    if (!n(e)) {
      o(g("addLayer", "图层对象不能为空"));
      return;
    }
    if (e instanceof gt)
      return e.getId(), e.getAll().forEach((i) => {
        i._layer && (this.layers.push(i), this._map.addLayer(i._layer));
      }), !1;
    const t = e.getId();
    if (n(t) && this.getLayerById(t)) {
      o(g("addLayer", "图层已存在"));
      return;
    }
    e._layer && (this.layers.push(e), this._map.addLayer(e._layer));
  }
  addLayers(e) {
  }
  getLayerById(e) {
    if (!n(e)) {
      o(g("getLayerById", "图层id不能为空"));
      return;
    }
    let t;
    return this.layers.forEach((i) => {
      i instanceof Z && n(i.getId()) && i.getId() === e && (t = i);
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
      o(g("removeLayerById", "图层id不能为空"));
      return;
    }
    let t = this.getLayerById(e);
    if (!n(t))
      return o(g("removeLayerById", `找不到id为${e}(${E(e) ? "string" : "number"})的图层`)), !1;
    this.removeLayer(t);
  }
  getAllLayers() {
    return this._isInitialized("getAllLayers") ? this.layers : [];
  }
  // 事件管理
  on(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(g("on", "参数不能为空"));
      return;
    }
    let i = Ee(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || a.length === 0) && (i ? s.on(e.replace("map:", ""), (d) => {
      this.events.emit(e, T(this, e, d));
    }) : s.on(e.replace("view:", ""), (d) => {
      this.events.emit(e, T(this, e, d));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!n(e)) {
        o(g("un", "参数不能为空"));
        return;
      }
      if (!l(e)) {
        o(g("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(e);
    }
  }
  once(e, t) {
    if (!this._isInitialized("on")) return;
    if (!n(e) || !n(t)) {
      o(g("on", "参数不能为空"));
      return;
    }
    let i = Ee(e);
    const s = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!n(a) || a.length === 0) && (i ? s.on(e.replace("map:", ""), (d) => {
      this.events.emit(e, T(this, e, d));
    }) : s.on(e.replace("view:", ""), (d) => {
      this.events.emit(e, T(this, e, d));
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
        o(g("setProperties", "参数不能为空"));
        return;
      }
      this._map.setProperties(e);
    }
  }
};
const Qe = "Map", xe = y(Qe);
class $ {
  constructor(e) {
    u(this, "_projection", null);
    u(this, "code", "");
    u(this, "units", "degrees");
    let t = "";
    if (E(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!n(i.code)) {
        f(xe("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = H.get(t), !n(this._projection)) {
      o(xe("constructor", "坐标系不存在"));
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
const et = "Feature", R = y(et);
class Q {
  constructor(e, t) {
    u(this, "id");
    u(this, "type");
    u(this, "_feature");
    u(this, "_geometry");
    this.type = e, this._init(t);
  }
  _init(e) {
    switch (this.type) {
      case "Point":
        let t = e;
        this._geometry = new N.Point(t instanceof c ? t._lnglat : t);
        break;
      case "LineString":
        let i = e.map((a) => a instanceof c ? a._lnglat : a);
        this._geometry = new N.LineString(i);
        break;
      case "Polygon":
        let s = e.map((a) => a.map((h) => h instanceof c ? h._lnglat : h));
        this._geometry = new N.Polygon(s);
        break;
    }
    this._feature = new $e({
      geometry: this._geometry
    });
  }
  _isInitialized(e) {
    return this._feature == null ? (o(R(e, "未正确实例化")), !1) : !0;
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
      if (!n(e)) {
        o(R("setProperties", "参数不能为空"));
        return;
      }
      if (!J(e)) {
        o(R("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!n(e)) {
        o(R("setId", "参数id不能为空"));
        return;
      }
      if (!l(e) && !E(e)) {
        o(R("setId", "参数id格式有误"));
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
const tt = "Point", M = y(tt);
class Et extends Q {
  constructor(e, t) {
    if (!n(e)) {
      f(M("constructor", "参数不能为空"));
      return;
    }
    if (!(e instanceof c) && !w(e)) {
      f(M("constructor", "坐标格式有误"));
      return;
    }
    super("Point", e), t && this.setProperties(t);
  }
  /**
   * 获取点的坐标
   * @returns {Lnglat} 点的坐标
   */
  getCoordinates() {
    let e = this._geometry.getCoordinates();
    return new c(e[0], e[1]);
  }
  /**
   * 设置点的坐标
   * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!n(e)) {
      f(M("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof c) && !w(e)) {
      f(M("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof c ? e.toArray() : e;
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
      f(M("intersectsExtent", "参数extent不能为空"));
      return;
    }
    if (!(e instanceof I) && !Ce(e)) {
      f(M("intersectsExtent", "坐标格式有误"));
      return;
    }
    let t = e instanceof I ? e.getExtent() : e;
    return this._geometry.intersectsExtent(t);
  }
}
function ze(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !(i instanceof c) && !w(i)) && (e = !1), e;
}
const it = "Point", A = y(it);
class xt extends Q {
  constructor(e, t) {
    if (!n(e)) {
      f(A("constructor", "参数不能为空"));
      return;
    }
    if (!ze(e)) {
      f(A("constructor", "坐标格式有误"));
      return;
    }
    super("LineString", e), t && this.setProperties(t);
  }
  /**
   * 获取线的坐标
   * @returns {Lnglat[]} 线的坐标
   */
  getCoordinates() {
    return this._geometry.getCoordinates().map((t) => new c(t[0], t[1]));
  }
  /**
   * 设置线的坐标
   * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
   * @returns {void}
   */
  setCoordinates(e) {
    if (!n(e)) {
      f(A("setCoordinates", "参数不能为空"));
      return;
    }
    if (!ze(e)) {
      f(A("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e.map((i) => i instanceof c ? i.toArray() : i);
    this._geometry.setCoordinates(t);
  }
  /**
   * 追加坐标
   * @param {Lnglat | OlCoordinateType} coordinates 坐标
   * @returns 
   */
  appendCoordinate(e) {
    if (!n(e)) {
      f(A("setCoordinates", "参数不能为空"));
      return;
    }
    if (!(e instanceof c) && !w(e)) {
      f(A("setCoordinates", "坐标格式有误"));
      return;
    }
    let t = e instanceof c ? e.toArray() : e;
    this._geometry.appendCoordinate(t);
  }
  /**
   * 获取线的第一个坐标
   * @returns {Lnglat} 线的第一个坐标
   */
  getFirstCoordinate() {
    let e = this._geometry.getFirstCoordinate();
    return new c(e[0], e[1]);
  }
  /**
   * 获取线的最后一个坐标
   * @returns {Lnglat} 线的最后一个坐标
   */
  getLastCoordinate() {
    let e = this._geometry.getLastCoordinate();
    return new c(e[0], e[1]);
  }
  /**
   * 获取线的范围
   * @returns {Extent} 线的范围
   */
  getExtent() {
    let e = this._geometry.getExtent();
    return new I(e[0], e[1], e[2], e[3]);
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
      f(A("getCoordinateAt", "参数不能为空"));
      return;
    }
    if (!(l(e) && e >= 0 && e <= 1)) {
      f(A("getCoordinateAt", "参数格式有误"));
      return;
    }
    let i = [], s = this._geometry.getCoordinateAt(e, i);
    return n(t) && (t instanceof c ? (t.setLng(i[0]), t.setLat(i[1])) : (t[0] = i[0], t[1] = i[1])), new c(s[0], s[1]);
  }
  getCoordinateAtM() {
    return null;
  }
  translate(e = 0, t = 0) {
    this._geometry.translate(e, t), console.log(this._geometry.getCoordinates());
  }
}
function rt(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !z(i)) && (e = !1), r.forEach((i) => {
    i.forEach((s) => {
      !(s instanceof c) && !w(s) && (e = !1);
    });
  }), e;
}
const nt = "Point", ve = y(nt);
class zt extends Q {
  constructor(e, t) {
    if (!n(e)) {
      f(ve("constructor", "参数不能为空"));
      return;
    }
    if (!rt(e)) {
      f(ve("constructor", "坐标格式有误"));
      return;
    }
    super("Polygon", e), t && this.setProperties(t);
  }
}
const st = {
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
class vt extends Z {
  constructor(t, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    u(this, "gaodeType", null);
    this.gaodeType = t, this._layer = new Y.Tile({
      source: new X.XYZ({
        urls: st[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const ot = "ProjUtil", Ae = y(ot);
class At {
  static fromLonLat(e, t) {
    if (!n(e)) {
      o(Ae("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof c && (i = e._lnglat);
    let s = n(t) ? E(t) ? new $(t) : t : new $("EPSG:3857"), a = H.fromLonLat(i, s._projection);
    return new c(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!n(e)) {
      o(Ae("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof c && (i = e._lnglat);
    let s = n(t) ? E(t) ? new $(t) : t : new $("EPSG:3857"), a = H.toLonLat(i, s._projection);
    return new c(a[0], a[1]);
  }
}
const K = "OMapToken", at = {
  tdt: null
};
function lt(r, e) {
  window[K] || (window[K] = {}), window[K][r] = e;
}
const Le = new Proxy(at, {
  set: function(r, e, t, i) {
    return lt(e, t), Reflect.set(r, e, t, i);
  }
}), ut = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function ct(r, e) {
  return ut.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, Le.tdt);
}
let ht = "TdtLayer", we = y(ht);
class wt extends Z {
  constructor(t, i) {
    var a, h, d;
    super("Tdt", i);
    /**
     * 图层类型
     */
    u(this, "tdtType", null);
    if (!n(Le.tdt)) {
      f(we("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(t)) {
      f(we("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = i || {};
    delete s.source, s.map, this.tdtType = t, this._layer = new Y.Tile({
      ...s,
      extent: n(s.extent) ? (a = s.extent) == null ? void 0 : a._extent : void 0,
      map: n(s.map) ? (h = s.map) == null ? void 0 : h._map : void 0,
      background: n(s.background) ? (d = s.background) == null ? void 0 : d._color : void 0,
      source: new X.XYZ({
        url: ct(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let ft = "VectorLayer", m = y(ft);
class Ct extends Z {
  constructor(t = {}) {
    super("Vector", t);
    u(this, "features", []);
    let i = n(t.source) ? t.source : {}, s = {
      ...i,
      features: i.features ? i.features.map((h) => h.getFeature()) : []
    }, a;
    n(t.style) && (t.style instanceof he ? a = t.style.getStyle() : z(t.style) && t.style.every((h) => h instanceof he) ? a = t.style.map((h) => h.getStyle()) : oe(t.style) && (a = (h, d) => {
      let F = p.getUid(h), v = this.features.findIndex((U) => p.getUid(U.getFeature()) === F), L = t.style(v !== -1 ? this.features[v] : null, d);
      return L ? L.getStyle() : void 0;
    })), this._layer = new Y.Vector({
      source: new X.Vector(s),
      style: a
    }), this._initLayerEvent();
  }
  _isInitializedLayer(t) {
    return this._isInitialized(t) ? !0 : (o(m(t, "未正确实例化")), !1);
  }
  getFeatures() {
    if (this._isInitializedLayer("getFeatures"))
      return this.features;
  }
  getFeatureById(t) {
    if (!this._isInitializedLayer("getFeatureById")) return;
    if (!n(t)) {
      o(m("setId", "参数id不能为空"));
      return;
    }
    if (!l(t) && !E(t)) {
      o(m("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((s) => n(s.getId()) && s.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
    if (!this._isInitializedLayer("getFeaturesInExtent")) return;
    if (!n(t)) {
      o(m("getFeaturesInExtent", "extent参数不能为空"));
      return;
    }
    if (!(t instanceof I) && !Ce(t)) {
      o(m("getFeaturesInExtent", "extent参数格式有误"));
      return;
    }
    let s = t instanceof I ? t.getExtent() : t, a = this._layer.getSource().getFeaturesInExtent(s), h = [];
    return a.forEach((d) => {
      let F = p.getUid(d), v = this.features.findIndex((L) => p.getUid(L.getFeature()) === F);
      v !== -1 && h.push(this.features[v]);
    }), h;
  }
  getFeaturesAtCoordinate(t) {
    if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
    if (!n(t)) {
      o(m("getFeaturesAtCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof c) && !w(t)) {
      o(m("getFeaturesAtCoordinate", "coordinates参数格式有误"));
      return;
    }
    let i = t instanceof c ? t._lnglat : t;
    const s = this._layer.getSource().getFeaturesAtCoordinate(i);
    let a = [];
    return s.forEach((h) => {
      let d = p.getUid(h), F = this.features.findIndex((v) => p.getUid(v.getFeature()) === d);
      F !== -1 && a.push(this.features[F]);
    }), a;
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!n(t)) {
        o(m("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!n(t) || !z(t)) {
        o(m("addFeatures", "参数格式有误不能为空"));
        return;
      }
      ae(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!n(t)) {
        o(m("removeFeature", "参数不能为空"));
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
        o(m("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      ae(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!n(t) || !oe(t)) {
        o(m("forEachFeature", "参数格式有误"));
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
        o(m("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (s) => {
        let a = p.getUid(s), h = this.features.findIndex((d) => p.getUid(d.getFeature()) === a);
        n(h) && h !== -1 && i(this.features[h], 0);
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
        o(m("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(t.getExtent(), (s) => {
        let a = p.getUid(s), h = this.features.findIndex((d) => p.getUid(d.getFeature()) === a);
        n(h) && h !== -1 && i(this.features[h], 0);
      });
    }
  }
  getClosestFeatureToCoordinate(t, i) {
    if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
    if (!n(t)) {
      o(m("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
      return;
    }
    if (!(t instanceof c) && !w(t)) {
      o(m("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
      return;
    }
    let s = t instanceof c ? t._lnglat : t, a = i ? (F) => {
      let v = p.getUid(F), L = this.features.findIndex((U) => p.getUid(U.getFeature()) === v);
      return i(this.features[L]);
    } : void 0;
    const h = this._layer.getSource().getClosestFeatureToCoordinate(s, a);
    let d = this.features.findIndex((F) => p.getUid(F.getFeature()) === p.getUid(h));
    if (d !== -1)
      return this.features[d];
  }
  getExtent() {
    if (!this._isInitializedLayer("getExtent")) return;
    const t = this._layer.getSource().getExtent();
    return new I(t[0], t[1], t[2], t[3]);
  }
}
let dt = "LayerGroup", G = y(dt);
class gt {
  constructor(e, t) {
    u(this, "id", null);
    u(this, "layers", []);
    if (!n(e)) {
      f(G("constructor", "参数不能为空"));
      return;
    }
    let i, s = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (s = e, !n(t)) {
        f(G("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    n(s) && (this.id = s), this.layers = i;
  }
  add(e) {
    if (!n(e)) {
      f(G("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (n(t) && this.layers.find((s) => s.getId() && s.getId() === t)) {
      o(G("add", "图层已存在"));
      return;
    }
    this.layers.push(e);
  }
  remove(e) {
    if (l(e)) {
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
export {
  C as Color,
  I as Extent,
  vt as GaodeLayer,
  gt as LayerGroup,
  xt as LineString,
  c as Lnglat,
  pt as Map,
  Le as MapToken,
  Oe as Pixel,
  Et as Point,
  zt as Polygon,
  At as ProjUtil,
  $ as Projection,
  ue as Size,
  he as Style,
  wt as TdtLayer,
  Ct as VectorLayer
};
