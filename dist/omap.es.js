var M = Object.defineProperty;
var P = (r, t, i) => t in r ? M(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[t] = i;
var a = (r, t, i) => P(r, typeof t != "symbol" ? t + "" : t, i);
import * as B from "ol";
import * as N from "ol/layer";
import * as q from "ol/source";
function s(r) {
  return r != null;
}
function l(r) {
  console.warn("omap warn", r);
}
function c(r) {
  throw new Error(`omap error ${r}`);
}
function h(r) {
  return (t, i) => `📦${r}【${t}】: ${i}`;
}
const H = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function C(r) {
  return Array.isArray(r);
}
function o(r) {
  return typeof r == "number";
}
function A(r) {
  return typeof r == "string";
}
function U(r) {
  return r === "";
}
function W(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function Y(r) {
  return C(r) && r.length === 2 && o(r[0]) && o(r[1]);
}
function b(r) {
  return C(r) && r.length === 3 && r.every((t) => o(t) && t >= 0 && t <= 255);
}
function V(r) {
  return A(r) && H.test(r);
}
function z(r) {
  return o(r) && r >= 0 && r <= 1;
}
function x(r) {
  let t = r.replace("#", "");
  return A(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function Z(r) {
  let t = r.replace("#", "");
  return A(r) && r.startsWith("#") && t.length === 8;
}
function g(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), i = parseInt(r.slice(2, 4), 16), e = parseInt(r.slice(4, 6), 16);
  return [t, i, e];
}
function D(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function j(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function K(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const X = "Size", _ = h(X);
class ot {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    a(this, "_size", []);
    (!o(t) || !o(i)) && c(_("constructor", "初始化参数有误")), this._size = [t, i];
  }
  _isInitialized(t) {
    return s(this._size) ? !0 : (l(_(t, "未正确实例化")), !1);
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
      if (!o(t[0]) || !o(t[1])) {
        l(_("setSize", "参数格式有误"));
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
      if (!o(t)) {
        l(_("setWidth", "参数格式有误"));
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
      if (!o(t)) {
        l(_("setHeight", "参数格式有误"));
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
const J = "Pixel", d = h(J);
class lt {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    a(this, "_pixel", []);
    (!o(t) || !o(i)) && c(d("constructor", "初始化参数有误")), this._pixel = [t, i];
  }
  _isInitialized(t) {
    return s(this._pixel) ? !0 : (l(d(t, "未正确实例化")), !1);
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
      if (!o(t[0]) || !o(t[1])) {
        l(d("setPixel", "参数格式有误"));
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
      if (!o(t)) {
        l(d("setX", "参数格式有误"));
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
      if (!o(t)) {
        l(d("setY", "参数格式有误"));
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
      l(d("equals", "参数未正确实例化"));
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
const Q = "Lnglat", F = h(Q);
class u {
  constructor(t, i) {
    /**
     * 经纬度数组
     * @type {LnglatType}
     * @example [119.26, 28.73]
     * @private
     */
    a(this, "_lnglat");
    (!o(t) || !o(i)) && c(F("constructor", "传入经纬度格式错误")), this._lnglat = [t, i];
  }
  _isInitialized(t) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (l(F(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!o(t)) {
        l(F("setLng", "传入经度格式有误"));
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
      if (!o(t)) {
        l(F("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof u)) {
      l(F("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !Y(this._lnglat) ? "" : `[${(i = this._lnglat[0]) == null ? void 0 : i.toFixed(t)}, ${(e = this._lnglat[1]) == null ? void 0 : e.toFixed(t)}]`;
  }
}
const $ = {
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
}, tt = "Color", y = h(tt);
class ut {
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
      c(y("constructor", "初始化参数有误"));
    };
    if (C(t)) {
      let e = t;
      if (e.length === 3) {
        if (!b(t)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (e.length === 4) {
        if (!b(e.slice(0, 3)) || !z(e[3])) {
          i();
          return;
        }
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
      } else if (e.length === 2) {
        if (!x(e[0]) || !z(e[1])) {
          i();
          return;
        }
        let n = g(t[0]);
        if (!s(n)) {
          i();
          return;
        }
        this._color = `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${e[1]})`;
      } else {
        i();
        return;
      }
    }
    if (W(t)) {
      let e = t;
      if (!s(e.color) && !(s(e.r) && s(e.g) && s(e.b))) {
        i();
        return;
      }
      if (s(e.color)) {
        if (x(e.color)) {
          let n = g(e.color);
          if (!s(n)) {
            i();
            return;
          }
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${e.alpha || e.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (V(e.color)) {
          let n = D(e.color).join(", ");
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${n}, ${e.alpha || e.opacity})` : `rgb(${n})`;
        }
      } else if (s(e.r) && s(e.g) && s(e.b)) {
        if (!b([e.r, e.g, e.b])) {
          i();
          return;
        }
        this._color = s(e.alpha) || s(e.opacity) ? `rgba(${e.r}, ${e.g}, ${e.b}, ${e.alpha || e.opacity})` : `rgb(${e.r}, ${e.g}, ${e.b})`;
      } else {
        i();
        return;
      }
    }
    if (A(t)) {
      if (U(t)) {
        i();
        return;
      }
      if (x(t)) {
        let e = g(t);
        if (!s(e)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (Z(t)) {
        let e = g(t.slice(0, 7));
        if (!s(e)) {
          i();
          return;
        }
        let n = K(t.slice(6));
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${n})`;
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
    if (!z(t)) {
      c(y("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...D(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...j(this._color), t]);
    else {
      if (!s($[this._color])) {
        c(y("withAlpha", "颜色值有误"));
        return;
      }
      let i = g($[this._color]);
      if (!s(i)) {
        c(y("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...i, t]);
    }
  }
}
const et = "Extent", p = h(et);
class E {
  constructor(t, i, e, n) {
    a(this, "_extent", []);
    if (!o(t) || !o(i) || !o(e) || !o(n)) {
      c(p("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (e < t || n < i) {
      c(p("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, i, e, n];
  }
  _isInitialized(t) {
    return !s(this._extent) || this._extent.length !== 4 ? (l(p(t, "未正确实例化")), !1) : !0;
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
    if (!(t instanceof E) || !(i instanceof u)) {
      l(p("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!t._isInitialized("containsCoordinate") || !s(i.toArray())) return;
    const [e, n] = i.toArray();
    return e >= t._extent[0] && e <= t._extent[2] && t._extent[1] <= n && n <= t._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(t, i) {
    if (!(t instanceof E) || !(i instanceof E)) {
      l(p("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !i._isInitialized("containsExtent")))
      return t._extent[0] <= i._extent[0] && i._extent[2] <= t._extent[2] && t._extent[1] <= i._extent[1] && i._extent[3] <= t._extent[3];
  }
}
const it = "Map", f = h(it), rt = {
  center: [120.2, 30.3],
  // 中心点坐标
  zoom: 8
};
class ct {
  constructor(t, i) {
    a(this, "_map", null);
    a(this, "_view", null);
    a(this, "layers", []);
    let e = i || rt;
    const n = new B.View({
      center: e.center instanceof u ? e.center._lnglat : e.center,
      // 中心点坐标
      zoom: e.zoom
    }), T = new B.Map({
      target: t,
      view: n
    });
    this._view = n, this._map = T;
  }
  _isInitialized(t) {
    return !s(this._map) || !s(this._view) ? (l(f(t, "未正确实例化")), !1) : !0;
  }
  addLayer(t) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(t)) {
      l(f("addLayer", "图层对象不能为空"));
      return;
    }
    const i = t.getId();
    if (!s(i)) {
      l(f("addLayer", "图层id不能为空"));
      return;
    }
    if (this.getLayerById(i)) {
      l(f("addLayer", "图层已存在"));
      return;
    }
    this.layers.push(t), this._map.addLayer(t._layer);
  }
  addLayers(t) {
  }
  getLayerById(t) {
    if (!s(t)) {
      l(f("getLayerById", "图层id不能为空"));
      return;
    }
    return this.layers.find((e) => s(e.getId()) && e.getId() === t);
  }
}
let I = "BaseLayer", m = h(I);
const w = 1, L = !0, v = 0, R = 22, k = 0, O = 1 / 0, G = 1, S = {};
class st {
  // 图层属性，用于存储图层相关信息
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
    a(this, "opacity", w);
    // 图层透明度，默认1
    a(this, "visible", L);
    // 图层是否可见，默认true
    a(this, "extent", []);
    // 图层范围，默认全局
    a(this, "minZoom", v);
    // 最小缩放级别，默认0
    a(this, "maxZoom", R);
    // 最大缩放级别，默认22
    a(this, "minResolution", k);
    // 最小分辨率，默认0r
    a(this, "maxResolution", O);
    // 最大分辨率，默认Infinity
    a(this, "zIndex", G);
    // 图层层级，默认0
    a(this, "properties", S);
    let e = i || {};
    this.type = t, I = `${t}Layer`, m = h(I), e.id && (this.id = e.id), this.name = e.name || "", this.className = e.className || "", this.opacity = e.opacity || w, this.visible = e.visible || L, this.extent = e.extent || null, this.minZoom = e.minZoom || v, this.maxZoom = e.maxZoom || R, this.minResolution = e.minResolution || k, this.maxResolution = e.maxResolution || O, this.zIndex = e.zIndex || G, this.properties = e.properties || S;
  }
  _isInitialized(t) {
    return s(this._layer) ? !0 : (l(m(t, "未正确实例化")), !1);
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
  setOpacity(t) {
    if (this._isInitialized("setOpacity")) {
      if (!s(t)) {
        l(m("setOpacity", "透明度不能为空"));
        return;
      }
      if (!z(t)) {
        l(m("setOpacity", "透明度必须为0~1的数字"));
        return;
      }
      this._layer.setOpacity(t);
    }
  }
  getOpacity() {
    if (this._isInitialized("getOpacity"))
      return this._layer.getOpacity();
  }
}
const nt = {
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
class ht extends st {
  constructor(i, e) {
    super("Gaode", e);
    /**
     * 图层类型
     */
    a(this, "gaodeType", null);
    this.gaodeType = i, this._layer = new N.Tile({
      source: new q.XYZ({
        urls: nt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
export {
  ut as Color,
  E as Extent,
  ht as GaodeLayer,
  u as Lnglat,
  ct as Map,
  lt as Pixel,
  ot as Size
};
