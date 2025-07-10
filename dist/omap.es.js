var nt = Object.defineProperty;
var R = (r) => {
  throw TypeError(r);
};
var ot = (r, t, e) => t in r ? nt(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var a = (r, t, e) => ot(r, typeof t != "symbol" ? t + "" : t, e), k = (r, t, e) => t.has(r) || R("Cannot " + e);
var P = (r, t, e) => (k(r, t, "read from private field"), e ? e.call(r) : t.get(r)), T = (r, t, e) => t.has(r) ? R("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), G = (r, t, e, i) => (k(r, t, "write to private field"), i ? i.call(r, e) : t.set(r, e), e);
import * as S from "ol";
import * as Q from "ol/layer";
import * as tt from "ol/source";
import * as et from "ol/proj";
import "ol/util";
function s(r) {
  return r != null;
}
function o(r) {
  console.warn("omap warn", r);
}
function c(r) {
  throw new Error(`omap error ${r}`);
}
function h(r) {
  return (t, e) => `📦${r}【${t}】: ${e}`;
}
const at = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function $(r) {
  return Array.isArray(r);
}
function l(r) {
  return typeof r == "number";
}
function g(r) {
  return typeof r == "string";
}
function lt(r) {
  return r === "";
}
function ut(r) {
  return typeof r == "boolean";
}
function it(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function ct(r) {
  return $(r) && r.length === 2 && l(r[0]) && l(r[1]);
}
function w(r) {
  return $(r) && r.length === 3 && r.every((t) => l(t) && t >= 0 && t <= 255);
}
function ht(r) {
  return g(r) && at.test(r);
}
function I(r) {
  return l(r) && r >= 0 && r <= 1;
}
function v(r) {
  let t = r.replace("#", "");
  return g(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function dt(r) {
  let t = r.replace("#", "");
  return g(r) && r.startsWith("#") && t.length === 8;
}
function p(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), e = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [t, e, i];
}
function O(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function _t(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, e = r.match(t);
  if (e)
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  throw new Error("Invalid RGB format");
}
function gt(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const ft = "Size", F = h(ft);
class Bt {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    a(this, "_size", []);
    (!l(t) || !l(e)) && c(F("constructor", "初始化参数有误")), this._size = [t, e];
  }
  _isInitialized(t) {
    return s(this._size) ? !0 : (o(F(t, "未正确实例化")), !1);
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
        o(F("setSize", "参数格式有误"));
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
        o(F("setWidth", "参数格式有误"));
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
        o(F("setHeight", "参数格式有误"));
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
const pt = "Pixel", f = h(pt);
class Rt {
  constructor(t, e) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    a(this, "_pixel", []);
    (!l(t) || !l(e)) && c(f("constructor", "初始化参数有误")), this._pixel = [t, e];
  }
  _isInitialized(t) {
    return s(this._pixel) ? !0 : (o(f(t, "未正确实例化")), !1);
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
        o(f("setPixel", "参数格式有误"));
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
        o(f("setX", "参数格式有误"));
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
        o(f("setY", "参数格式有误"));
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
    if (!s(t)) {
      o(f("equals", "参数未正确实例化"));
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
const Ft = "Lnglat", y = h(Ft);
class d {
  constructor(t, e) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    a(this, "_lnglat");
    (!l(t) || !l(e)) && c(y("constructor", "传入经纬度格式错误")), this._lnglat = [t, e];
  }
  _isInitialized(t) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (o(y(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!l(t)) {
        o(y("setLng", "传入经度格式有误"));
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
        o(y("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof d)) {
      o(y("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !ct(this._lnglat) ? "" : `[${(e = this._lnglat[0]) == null ? void 0 : e.toFixed(t)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(t)}]`;
  }
}
const Z = {
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
}, yt = "Color", A = h(yt);
class kt {
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
      c(A("constructor", "初始化参数有误"));
    };
    if ($(t)) {
      let i = t;
      if (i.length === 3) {
        if (!w(t)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!w(i.slice(0, 3)) || !I(i[3])) {
          e();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!v(i[0]) || !I(i[1])) {
          e();
          return;
        }
        let n = p(t[0]);
        if (!s(n)) {
          e();
          return;
        }
        this._color = `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i[1]})`;
      } else {
        e();
        return;
      }
    }
    if (it(t)) {
      let i = t;
      if (!s(i.color) && !(s(i.r) && s(i.g) && s(i.b))) {
        e();
        return;
      }
      if (s(i.color)) {
        if (v(i.color)) {
          let n = p(i.color);
          if (!s(n)) {
            e();
            return;
          }
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i.alpha || i.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (ht(i.color)) {
          let n = O(i.color).join(", ");
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n}, ${i.alpha || i.opacity})` : `rgb(${n})`;
        }
      } else if (s(i.r) && s(i.g) && s(i.b)) {
        if (!w([i.r, i.g, i.b])) {
          e();
          return;
        }
        this._color = s(i.alpha) || s(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        e();
        return;
      }
    }
    if (g(t)) {
      if (lt(t)) {
        e();
        return;
      }
      if (v(t)) {
        let i = p(t);
        if (!s(i)) {
          e();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (dt(t)) {
        let i = p(t.slice(0, 7));
        if (!s(i)) {
          e();
          return;
        }
        let n = gt(t.slice(6));
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${n})`;
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
    if (!I(t)) {
      c(A("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...O(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([..._t(this._color), t]);
    else {
      if (!s(Z[this._color])) {
        c(A("withAlpha", "颜色值有误"));
        return;
      }
      let e = p(Z[this._color]);
      if (!s(e)) {
        c(A("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...e, t]);
    }
  }
}
const mt = "Extent", m = h(mt);
class z {
  constructor(t, e, i, n) {
    a(this, "_extent", []);
    if (!l(t) || !l(e) || !l(i) || !l(n)) {
      c(m("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < t || n < e) {
      c(m("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, e, i, n];
  }
  _isInitialized(t) {
    return !s(this._extent) || this._extent.length !== 4 ? (o(m(t, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft() {
    if (this._isInitialized("getTopLeft"))
      return new d(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new d(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new d(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new d(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new d(
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
  static containsCoordinate(t, e) {
    if (!(t instanceof z) || !(e instanceof d)) {
      o(m("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!t._isInitialized("containsCoordinate") || !s(e.toArray())) return;
    const [i, n] = e.toArray();
    return i >= t._extent[0] && i <= t._extent[2] && t._extent[1] <= n && n <= t._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(t, e) {
    if (!(t instanceof z) || !(e instanceof z)) {
      o(m("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !e._isInitialized("containsExtent")))
      return t._extent[0] <= e._extent[0] && e._extent[2] <= t._extent[2] && t._extent[1] <= e._extent[1] && e._extent[3] <= t._extent[3];
  }
}
let D = "BaseLayer", u = h(D);
const N = 1, j = !0, V = 0, q = 22, U = 0, H = 1 / 0, W = 1, Y = {};
var E;
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
    a(this, "opacity", N);
    // 图层透明度，默认1
    a(this, "visible", j);
    // 图层是否可见，默认true
    a(this, "extent", null);
    // 图层范围，默认全局
    a(this, "minZoom", V);
    // 最小缩放级别，默认0
    a(this, "maxZoom", q);
    // 最大缩放级别，默认22
    a(this, "minResolution", U);
    // 最小分辨率，默认0r
    a(this, "maxResolution", H);
    // 最大分辨率，默认Infinity
    a(this, "zIndex", W);
    // 图层层级，默认0
    a(this, "properties", Y);
    // 图层属性，用于存储图层相关信息
    T(this, E, null);
    let i = e || {};
    this.type = t, D = `${t}Layer`, u = h(D), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || N, this.visible = i.visible || j, this.extent = i.extent || null, this.minZoom = i.minZoom || V, this.maxZoom = i.maxZoom || q, this.minResolution = i.minResolution || U, this.maxResolution = i.maxResolution || H, this.zIndex = i.zIndex || W, this.properties = i.properties || Y;
  }
  _isInitialized(t) {
    return s(this._layer) ? !0 : (o(u(t, "未正确实例化")), !1);
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
      if (!s(t)) {
        o(u("setOpacity", "透明度不能为空"));
        return;
      }
      if (!I(t)) {
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
      if (!s(t)) {
        o(u("setVisible", "可见性不能为空"));
        return;
      }
      if (ut(t)) {
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
      if (!s(t)) {
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
      if (!s(t)) {
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
      if (!s(t)) {
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
      if (!s(t)) {
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
      if (!s(t)) {
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
      if (!s(t)) {
        o(u("setProperties", "属性不能为空"));
        return;
      }
      if (it(t)) {
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
      return P(this, E);
  }
  setGroupId(t) {
    G(this, E, t);
  }
}
E = new WeakMap();
const xt = "Map", x = h(xt);
class Pt {
  constructor(t, e) {
    a(this, "_map", null);
    a(this, "_view", null);
    a(this, "layers", []);
    const n = e.view;
    if (!s(n)) {
      c(x("constructor", "view参数不能为空"));
      return;
    }
    let _ = n.projection || new b("EPSG:3857");
    g(_) && (_ = new b(_));
    const rt = {
      ...n,
      center: n.center instanceof d ? n.center._lnglat : n.center,
      // 中心点坐标
      extent: n.extent instanceof z ? n.extent._extent : n.extent,
      projection: _._projection
    }, B = new S.View(rt), st = new S.Map({
      target: t,
      view: B
    });
    this._view = B, this._map = st;
  }
  _isInitialized(t) {
    return !s(this._map) || !s(this._view) ? (o(x(t, "未正确实例化")), !1) : !0;
  }
  addLayer(t) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(t)) {
      o(x("addLayer", "图层对象不能为空"));
      return;
    }
    if (t instanceof J)
      return t.getId(), t.getAll().forEach((i) => {
        this.layers.push(i), this._map.addLayer(i._layer);
      }), !1;
    const e = t.getId();
    if (s(e) && this.getLayerById(e)) {
      o(x("addLayer", "图层已存在"));
      return;
    }
    this.layers.push(t), this._map.addLayer(t._layer);
  }
  addLayers(t) {
  }
  getLayerById(t) {
    if (!s(t)) {
      o(x("getLayerById", "图层id不能为空"));
      return;
    }
    let e;
    return this.layers.forEach((i) => {
      i instanceof J && i.getAll().forEach((n) => {
        s(n.getId()) && n.getId() === t && (e = n);
      }), i instanceof M && s(i.getId()) && i.getId() === t && (e = i);
    }), e;
  }
}
const zt = "Map", K = h(zt);
class b {
  constructor(t) {
    a(this, "_projection", null);
    a(this, "code", "");
    a(this, "units", "degrees");
    let e = "";
    if (g(t))
      e = t.startsWith("EPSG") ? t : "EPSG:" + t;
    else {
      let i = t;
      if (!s(i.code)) {
        c(K("constructor", "初始化参数有误"));
        return;
      }
      e = i.code, e = e.startsWith("EPSG") ? e : "EPSG:" + e;
    }
    if (this.code = e, this._projection = et.get(e), !s(this._projection)) {
      o(K("constructor", "坐标系不存在"));
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
const Et = {
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
class Tt extends M {
  constructor(e, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    a(this, "gaodeType", null);
    this.gaodeType = e, this._layer = new Q.Tile({
      source: new tt.XYZ({
        urls: Et[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const At = {
  vec: "http://t{0-7}.tianditu.com/DataServer?T=vec_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}",
  img: "http://t{0-7}.tianditu.com/DataServer?T=img_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}",
  ter: "http://t{0-7}.tianditu.com/DataServer?T=ter_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}",
  cva: "http://t{0-7}.tianditu.com/DataServer?T=cva_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}",
  cia: "http://t{0-7}.tianditu.com/DataServer?T=cia_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}",
  cta: "http://t{0-7}.tianditu.com/DataServer?T=cta_w&tk=4774ca01d665a06c9e494ca5f29dba10&x={x}&y={y}&l={z}"
}, It = "ProjUtil", bt = h(It);
class Gt {
  static fromLonLat(t, e) {
    if (!s(t)) {
      o(bt("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = t;
    t instanceof d && (i = t._lnglat);
    let n = s(e) ? g(e) ? new b(e) : e : new b("EPSG:3857"), _ = et.fromLonLat(i, n._projection);
    return new d(_[0], _[1]);
  }
}
const C = "OMapToken", wt = {
  tdt: null
};
function vt(r, t) {
  window[C] || (window[C] = {}), window[C][r] = t;
}
const Ct = new Proxy(wt, {
  set: function(r, t, e, i) {
    return vt(t, e), Reflect.set(r, t, e, i);
  }
});
let Lt = "TdtLayer", X = h(Lt);
class St extends M {
  constructor(e, i) {
    super("Tdt", i);
    /**
     * 图层类型
     */
    a(this, "tdtType", null);
    if (!s(Ct.tdt)) {
      c(X("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(e)) {
      c(X("constructor", "缺少参数天地图图层类型"));
      return;
    }
    this.tdtType = e, this._layer = new Q.Tile({
      // TODO 这里不一定是XYZ
      source: new tt.XYZ({
        url: At[e]
      })
    }), this._initLayerEvent();
  }
}
let Dt = "LayerGroup", L = h(Dt);
class J {
  constructor(t, e) {
    a(this, "id", null);
    a(this, "layers", []);
    if (!s(e)) {
      c(L("constructor", "参数不能为空"));
      return;
    }
    s(t) && (this.id = t), this.layers = e;
  }
  add(t) {
    if (!s(t)) {
      c(L("add", "图层不能为空"));
      return;
    }
    let e = t.getId();
    if (s(e) && this.layers.find((n) => n.getId() && n.getId() === e)) {
      o(L("add", "图层已存在"));
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
    if (s(e)) {
      let i = this.layers.find((n) => n.getId() && n.getId() === e);
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
  kt as Color,
  z as Extent,
  Tt as GaodeLayer,
  J as LayerGroup,
  d as Lnglat,
  Pt as Map,
  Ct as MapToken,
  Rt as Pixel,
  Gt as ProjUtil,
  b as Projection,
  Bt as Size,
  St as TdtLayer
};
