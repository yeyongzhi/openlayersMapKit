var ot = Object.defineProperty;
var k = (r) => {
  throw TypeError(r);
};
var at = (r, t, i) => t in r ? ot(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[t] = i;
var a = (r, t, i) => at(r, typeof t != "symbol" ? t + "" : t, i), P = (r, t, i) => t.has(r) || k("Cannot " + i);
var Z = (r, t, i) => (P(r, t, "read from private field"), i ? i.call(r) : t.get(r)), T = (r, t, i) => t.has(r) ? k("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, i), G = (r, t, i, e) => (P(r, t, "write to private field"), e ? e.call(r, i) : t.set(r, i), i);
import * as O from "ol";
import * as tt from "ol/layer";
import * as et from "ol/source";
import * as it from "ol/proj";
import "ol/util";
function n(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function h(r) {
  throw new Error(`omap error ${r}`);
}
function g(r) {
  return (t, i) => `📦${r}【${t}】: ${i}`;
}
const lt = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function D(r) {
  return Array.isArray(r);
}
function l(r) {
  return typeof r == "number";
}
function f(r) {
  return typeof r == "string";
}
function ut(r) {
  return r === "";
}
function ht(r) {
  return typeof r == "boolean";
}
function rt(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function ct(r) {
  return D(r) && r.length === 2 && l(r[0]) && l(r[1]);
}
function M(r) {
  return D(r) && r.length === 3 && r.every((t) => l(t) && t >= 0 && t <= 255);
}
function dt(r) {
  return f(r) && lt.test(r);
}
function w(r) {
  return l(r) && r >= 0 && r <= 1;
}
function L(r) {
  let t = r.replace("#", "");
  return f(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function gt(r) {
  let t = r.replace("#", "");
  return f(r) && r.startsWith("#") && t.length === 8;
}
function y(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((s) => s + s).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), i = parseInt(r.slice(2, 4), 16), e = parseInt(r.slice(4, 6), 16);
  return [t, i, e];
}
function S(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function _t(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function ft(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const pt = "Size", m = g(pt);
class Rt {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    a(this, "_size", []);
    (!l(t) || !l(i)) && h(m("constructor", "初始化参数有误")), this._size = [t, i];
  }
  _isInitialized(t) {
    return n(this._size) ? !0 : (o(m(t, "未正确实例化")), !1);
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
        o(m("setSize", "参数格式有误"));
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
        o(m("setWidth", "参数格式有误"));
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
        o(m("setHeight", "参数格式有误"));
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
const Ft = "Pixel", p = g(Ft);
class kt {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    a(this, "_pixel", []);
    (!l(t) || !l(i)) && h(p("constructor", "初始化参数有误")), this._pixel = [t, i];
  }
  _isInitialized(t) {
    return n(this._pixel) ? !0 : (o(p(t, "未正确实例化")), !1);
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
        o(p("setPixel", "参数格式有误"));
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
        o(p("setX", "参数格式有误"));
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
        o(p("setY", "参数格式有误"));
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
      o(p("equals", "参数未正确实例化"));
      return;
    }
    const i = t.getPixel();
    if (i)
      return this._pixel[0] === i[0] && this._pixel[1] === i[1];
  }
  /**
   * 以字符串的形式输出像素坐标
   * @returns {string} 像素坐标字符串
   */
  toString() {
    return this._isInitialized("toString") ? `[${this._pixel[0]}, ${this._pixel[1]}]` : "";
  }
}
const yt = "Lnglat", z = g(yt);
class c {
  constructor(t, i) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    a(this, "_lnglat");
    (!l(t) || !l(i)) && h(z("constructor", "传入经纬度格式错误")), this._lnglat = [t, i];
  }
  _isInitialized(t) {
    return !n(this._lnglat) || n(this._lnglat) && this._lnglat.length !== 2 ? (o(z(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!l(t)) {
        o(z("setLng", "传入经度格式有误"));
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
        o(z("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof c)) {
      o(z("equals", "传入经纬度格式错误，必须为Lnglat类型"));
      return;
    }
    const i = t.getLng() !== void 0 && t.getLat() !== void 0 ? [t.getLng(), t.getLat()] : void 0;
    if (i)
      return this._lnglat[0] === i[0] && this._lnglat[1] === i[1];
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
    var i, e;
    return !this._isInitialized("toString") || !ct(this._lnglat) ? "" : `[${(i = this._lnglat[0]) == null ? void 0 : i.toFixed(t)}, ${(e = this._lnglat[1]) == null ? void 0 : e.toFixed(t)}]`;
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
}, mt = "Color", b = g(mt);
class Pt {
  constructor(t) {
    a(this, "_color", "");
    this._initColor(t);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(t) {
    const i = () => {
      h(b("constructor", "初始化参数有误"));
    };
    if (D(t)) {
      let e = t;
      if (e.length === 3) {
        if (!M(t)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (e.length === 4) {
        if (!M(e.slice(0, 3)) || !w(e[3])) {
          i();
          return;
        }
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
      } else if (e.length === 2) {
        if (!L(e[0]) || !w(e[1])) {
          i();
          return;
        }
        let s = y(t[0]);
        if (!n(s)) {
          i();
          return;
        }
        this._color = `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${e[1]})`;
      } else {
        i();
        return;
      }
    }
    if (rt(t)) {
      let e = t;
      if (!n(e.color) && !(n(e.r) && n(e.g) && n(e.b))) {
        i();
        return;
      }
      if (n(e.color)) {
        if (L(e.color)) {
          let s = y(e.color);
          if (!n(s)) {
            i();
            return;
          }
          this._color = n(e.alpha) || n(e.opacity) ? `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${e.alpha || e.opacity})` : `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
        }
        if (dt(e.color)) {
          let s = S(e.color).join(", ");
          this._color = n(e.alpha) || n(e.opacity) ? `rgba(${s}, ${e.alpha || e.opacity})` : `rgb(${s})`;
        }
      } else if (n(e.r) && n(e.g) && n(e.b)) {
        if (!M([e.r, e.g, e.b])) {
          i();
          return;
        }
        this._color = n(e.alpha) || n(e.opacity) ? `rgba(${e.r}, ${e.g}, ${e.b}, ${e.alpha || e.opacity})` : `rgb(${e.r}, ${e.g}, ${e.b})`;
      } else {
        i();
        return;
      }
    }
    if (f(t)) {
      if (ut(t)) {
        i();
        return;
      }
      if (L(t)) {
        let e = y(t);
        if (!n(e)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (gt(t)) {
        let e = y(t.slice(0, 7));
        if (!n(e)) {
          i();
          return;
        }
        let s = ft(t.slice(6));
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${s})`;
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
    if (!w(t)) {
      h(b("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...S(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([..._t(this._color), t]);
    else {
      if (!n(N[this._color])) {
        h(b("withAlpha", "颜色值有误"));
        return;
      }
      let i = y(N[this._color]);
      if (!n(i)) {
        h(b("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...i, t]);
    }
  }
}
const zt = "Extent", E = g(zt);
class I {
  constructor(t, i, e, s) {
    a(this, "_extent", []);
    if (!l(t) || !l(i) || !l(e) || !l(s)) {
      h(E("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (e < t || s < i) {
      h(E("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, i, e, s];
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
  toString() {
    if (this._isInitialized("toString"))
      return `[${this._extent[0]}, ${this._extent[1]}, ${this._extent[2]}, ${this._extent[3]}]`;
  }
  /**
   * 判断边界范围Extent是否包含某个点
   * @param extent 范围
   * @param position 位置
   * @return 判断结果
   */
  static containsCoordinate(t, i) {
    if (!(t instanceof I) || !(i instanceof c)) {
      o(E("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!t._isInitialized("containsCoordinate") || !n(i.toArray())) return;
    const [e, s] = i.toArray();
    return e >= t._extent[0] && e <= t._extent[2] && t._extent[1] <= s && s <= t._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(t, i) {
    if (!(t instanceof I) || !(i instanceof I)) {
      o(E("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !i._isInitialized("containsExtent")))
      return t._extent[0] <= i._extent[0] && i._extent[2] <= t._extent[2] && t._extent[1] <= i._extent[1] && i._extent[3] <= t._extent[3];
  }
}
let B = "BaseLayer", u = g(B);
const j = 1, V = !0, q = 0, U = 22, H = 0, W = 1 / 0, Y = 1, K = {};
var x;
class R {
  // 图层所属组ID，默认null
  constructor(t, i) {
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
    a(this, "opacity", j);
    // 图层透明度，默认1
    a(this, "visible", V);
    // 图层是否可见，默认true
    a(this, "extent", null);
    // 图层范围，默认全局
    a(this, "minZoom", q);
    // 最小缩放级别，默认0
    a(this, "maxZoom", U);
    // 最大缩放级别，默认22
    a(this, "minResolution", H);
    // 最小分辨率，默认0r
    a(this, "maxResolution", W);
    // 最大分辨率，默认Infinity
    a(this, "zIndex", Y);
    // 图层层级，默认0
    a(this, "properties", K);
    // 图层属性，用于存储图层相关信息
    T(this, x, null);
    let e = i || {};
    this.type = t, B = `${t}Layer`, u = g(B), e.id && (this.id = e.id), this.name = e.name || "", this.className = e.className || "", this.opacity = e.opacity || j, this.visible = e.visible || V, this.extent = e.extent || null, this.minZoom = e.minZoom || q, this.maxZoom = e.maxZoom || U, this.minResolution = e.minResolution || H, this.maxResolution = e.maxResolution || W, this.zIndex = e.zIndex || Y, this.properties = e.properties || K;
  }
  _isInitialized(t) {
    return n(this._layer) ? !0 : (o(u(t, "未正确实例化")), !1);
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
        o(u("setOpacity", "透明度不能为空"));
        return;
      }
      if (!w(t)) {
        o(u("setOpacity", "透明度必须为0~1的数字"));
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
        o(u("setVisible", "可见性不能为空"));
        return;
      }
      if (ht(t)) {
        o(u("setVisible", "可见性必须为boolean类型"));
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
        o(u("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!l(t)) {
        o(u("setMinZoom", "minZoom必须为number类型"));
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
        o(u("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!l(t)) {
        o(u("setMaxZoom", "maxZoom必须为number类型"));
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
        o(u("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!l(t)) {
        o(u("setMinResolution", "minResolution必须为number类型"));
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
        o(u("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!l(t)) {
        o(u("setMaxResolution", "maxResolution必须为number类型"));
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
        o(u("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!l(t)) {
        o(u("setZIndex", "zIndex必须为number类型"));
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
        o(u("setProperties", "属性不能为空"));
        return;
      }
      if (rt(t)) {
        o(u("setProperties", "属性必须为object类型"));
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
      return Z(this, x);
  }
  // TODO
  setGroupId(t) {
    G(this, x, t);
  }
}
x = new WeakMap();
const Et = "Map", _ = g(Et);
let Zt = class {
  constructor(t, i) {
    a(this, "_map", null);
    a(this, "_view", null);
    a(this, "layers", []);
    const s = i.view;
    if (!n(s)) {
      h(_("constructor", "view参数不能为空"));
      return;
    }
    let d = s.projection || new C("EPSG:3857");
    f(d) && (d = new C(d));
    const A = {
      ...s,
      center: s.center instanceof c ? s.center._lnglat : s.center,
      // 中心点坐标
      extent: s.extent instanceof I ? s.extent._extent : s.extent,
      projection: d._projection
    }, F = new O.View(A), nt = new O.Map({
      target: t,
      view: F
    });
    this._view = F, this._map = nt;
  }
  _isInitialized(t) {
    return !n(this._map) || !n(this._view) ? (o(_(t, "未正确实例化")), !1) : !0;
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let t = this._view.getCenter();
    return new c(...t);
  }
  setCenter(t) {
    if (!this._isInitialized("setCenter")) return;
    if (!n(t)) {
      o(_("setCenter", "参数center不能为空"));
      return;
    }
    let i = t instanceof c ? t._lnglat : t;
    this._view.setCenter(i);
  }
  getZoom() {
    if (this._isInitialized("getZoom"))
      return this._view.getZoom();
  }
  setZoom(t) {
    if (this._isInitialized("setZoom")) {
      if (!n(t)) {
        o(_("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!l(t)) {
        o(_("setZoom", "参数zoom必须为number类型"));
        return;
      }
      this._view.setZoom(t);
    }
  }
  zoomIn(t = 1) {
    if (this._isInitialized("zoomIn")) {
      if (n(t) && !l(t)) {
        o(_("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(t);
    }
  }
  zoomOut(t = -1) {
    if (this._isInitialized("zoomIn")) {
      if (n(t) && !l(t)) {
        o(_("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(t);
    }
  }
  // 图层管理相关
  addLayer(t) {
    if (!this._isInitialized("addLayer")) return;
    if (!n(t)) {
      o(_("addLayer", "图层对象不能为空"));
      return;
    }
    if (t instanceof Q)
      return t.getId(), t.getAll().forEach((e) => {
        this.layers.push(e), this._map.addLayer(e._layer);
      }), !1;
    const i = t.getId();
    if (n(i) && this.getLayerById(i)) {
      o(_("addLayer", "图层已存在"));
      return;
    }
    this.layers.push(t), this._map.addLayer(t._layer);
  }
  addLayers(t) {
  }
  getLayerById(t) {
    if (!n(t)) {
      o(_("getLayerById", "图层id不能为空"));
      return;
    }
    let i;
    return this.layers.forEach((e) => {
      e instanceof Q && e.getAll().forEach((s) => {
        n(s.getId()) && s.getId() === t && (i = s);
      }), e instanceof R && n(e.getId()) && e.getId() === t && (i = e);
    }), i;
  }
  removeLayer() {
  }
  removeLayers() {
  }
  removeLayerById() {
  }
  getAllLayers() {
  }
  // 事件管理
  on() {
  }
  un() {
  }
  once() {
  }
};
const It = "Map", X = g(It);
class C {
  constructor(t) {
    a(this, "_projection", null);
    a(this, "code", "");
    a(this, "units", "degrees");
    let i = "";
    if (f(t))
      i = t.startsWith("EPSG") ? t : "EPSG:" + t;
    else {
      let e = t;
      if (!n(e.code)) {
        h(X("constructor", "初始化参数有误"));
        return;
      }
      i = e.code, i = i.startsWith("EPSG") ? i : "EPSG:" + i;
    }
    if (this.code = i, this._projection = it.get(i), !n(this._projection)) {
      o(X("constructor", "坐标系不存在"));
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
class Gt extends R {
  constructor(i, e) {
    super("Gaode", e);
    /**
     * 图层类型
     */
    a(this, "gaodeType", null);
    this.gaodeType = i, this._layer = new tt.Tile({
      source: new et.XYZ({
        urls: xt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const At = "ProjUtil", bt = g(At);
class Ot {
  static fromLonLat(t, i) {
    if (!n(t)) {
      o(bt("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let e = t;
    t instanceof c && (e = t._lnglat);
    let s = n(i) ? f(i) ? new C(i) : i : new C("EPSG:3857"), d = it.fromLonLat(e, s._projection);
    return new c(d[0], d[1]);
  }
}
const $ = "OMapToken", vt = {
  tdt: null
};
function wt(r, t) {
  window[$] || (window[$] = {}), window[$][r] = t;
}
const st = new Proxy(vt, {
  set: function(r, t, i, e) {
    return wt(t, i), Reflect.set(r, t, i, e);
  }
});
class St {
  constructor(t) {
    a(this, "events", /* @__PURE__ */ new Map());
    a(this, "target", null);
    a(this, "total", 0);
    this.events.clear(), this.target = t;
  }
  add(t, i) {
    let e = this.events.get(t) || [], s = this.total + 1;
    return e.push({
      id: s,
      target: this.target,
      type: t,
      callback: i
    }), this.events.set(t, e), this.total++, s;
  }
  remove(t) {
    this.events.keys().forEach((i) => {
      let e = this.events.get(i);
      n(e) && e.length > 0 && (e.forEach((s, d) => {
        s.id === t && e.splice(d, 1);
      }), this.events.set(i, e));
    });
  }
  get(t) {
    return this.events.get(t) || [];
  }
  clear(t) {
    n(t) ? this.events.delete(t) : this.events.clear();
  }
}
const Ct = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function Mt(r, t) {
  return Ct.replace(/\{T\}/g, r + "_" + t).replace(/\{tk\}/g, st.tdt);
}
let Lt = "TdtLayer", J = g(Lt);
class Nt extends R {
  constructor(i, e) {
    var d, A, F;
    super("Tdt", e);
    /**
     * 图层类型
     */
    a(this, "tdtType", null);
    if (!n(st.tdt)) {
      h(J("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!n(i)) {
      h(J("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let s = e || {};
    delete s.source, s.map, this.tdtType = i, this._layer = new tt.Tile({
      ...s,
      extent: n(s.extent) ? (d = s.extent) == null ? void 0 : d._extent : void 0,
      map: n(s.map) ? (A = s.map) == null ? void 0 : A._map : void 0,
      background: n(s.background) ? (F = s.background) == null ? void 0 : F._color : void 0,
      source: new et.XYZ({
        url: Mt(i, (e == null ? void 0 : e.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let $t = "LayerGroup", v = g($t);
class Q {
  constructor(t, i) {
    a(this, "id", null);
    a(this, "layers", []);
    if (!n(t)) {
      h(v("constructor", "参数不能为空"));
      return;
    }
    let e, s = null;
    if (Array.isArray(t))
      e = t;
    else {
      if (s = t, !n(i)) {
        h(v("constructor", "layers 参数不能为空"));
        return;
      }
      e = i;
    }
    n(s) && (this.id = s), this.layers = e;
  }
  add(t) {
    if (!n(t)) {
      h(v("add", "图层不能为空"));
      return;
    }
    let i = t.getId();
    if (n(i) && this.layers.find((s) => s.getId() && s.getId() === i)) {
      o(v("add", "图层已存在"));
      return;
    }
    this.layers.push(t);
  }
  remove(t) {
    if (l(t)) {
      this.layers.splice(t, 1);
      return;
    }
    let i = t.getId();
    if (n(i)) {
      let e = this.layers.find((s) => s.getId() && s.getId() === i);
      e && this.layers.splice(this.layers.indexOf(e), 1);
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
  Pt as Color,
  St as Event,
  I as Extent,
  Gt as GaodeLayer,
  Q as LayerGroup,
  c as Lnglat,
  Zt as Map,
  st as MapToken,
  kt as Pixel,
  Ot as ProjUtil,
  C as Projection,
  Rt as Size,
  Nt as TdtLayer
};
