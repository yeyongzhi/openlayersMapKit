var we = Object.defineProperty;
var X = (r) => {
  throw TypeError(r);
};
var be = (r, e, t) => e in r ? we(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => be(r, typeof e != "symbol" ? e + "" : e, t), J = (r, e, t) => e.has(r) || X("Cannot " + t);
var Q = (r, e, t) => (J(r, e, "read from private field"), t ? t.call(r) : e.get(r)), ee = (r, e, t) => e.has(r) ? X("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), te = (r, e, t, i) => (J(r, e, "write to private field"), i ? i.call(r, t) : e.set(r, t), t);
import * as ie from "ol";
import * as U from "ol/layer";
import * as q from "ol/source";
import * as N from "ol/proj";
import * as k from "ol/util";
import Ce from "ol/Feature";
import * as T from "ol/geom";
import * as p from "ol/style";
import "ol/render/Feature";
function s(r) {
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
const Le = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function re(r) {
  return typeof r == "function";
}
function z(r) {
  return Array.isArray(r);
}
function se(r) {
  return Array.isArray(r) && r.length === 0;
}
function u(r) {
  return typeof r == "number";
}
function F(r) {
  return typeof r == "string";
}
function Me(r) {
  return r === "";
}
function $e(r) {
  return typeof r == "boolean";
}
function K(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function P(r) {
  return z(r) && r.length === 2 && u(r[0]) && u(r[1]);
}
function G(r) {
  return z(r) && r.length === 3 && r.every((e) => u(e) && e >= 0 && e <= 255);
}
function Pe(r) {
  return F(r) && Le.test(r);
}
function D(r) {
  return u(r) && r >= 0 && r <= 1;
}
function O(r) {
  let e = r.replace("#", "");
  return F(r) && r.startsWith("#") && (e.length === 6 || e.length === 3);
}
function ke(r) {
  let e = r.replace("#", "");
  return F(r) && r.startsWith("#") && e.length === 8;
}
function w(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const e = parseInt(r.slice(0, 2), 16), t = parseInt(r.slice(2, 4), 16), i = parseInt(r.slice(4, 6), 16);
  return [e, t, i];
}
function ne(r) {
  const e = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Be(r) {
  const e = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, t = r.match(e);
  if (t)
    return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3], 10)];
  throw new Error("Invalid RGB format");
}
function Re(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const Se = "Size", b = y(Se);
class yt {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    l(this, "_size", []);
    (!u(e) || !u(t)) && f(b("constructor", "初始化参数有误")), this._size = [e, t];
  }
  _isInitialized(e) {
    return s(this._size) ? !0 : (o(b(e, "未正确实例化")), !1);
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
  setSize(e) {
    if (this._isInitialized("setSize")) {
      if (!u(e[0]) || !u(e[1])) {
        o(b("setSize", "参数格式有误"));
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
      if (!u(e)) {
        o(b("setWidth", "参数格式有误"));
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
      if (!u(e)) {
        o(b("setHeight", "参数格式有误"));
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
const De = "Pixel", E = y(De);
class Ve {
  constructor(e, t) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    l(this, "_pixel", []);
    (!u(e) || !u(t)) && f(E("constructor", "初始化参数有误")), this._pixel = [e, t];
  }
  _isInitialized(e) {
    return s(this._pixel) ? !0 : (o(E(e, "未正确实例化")), !1);
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
      if (!u(e[0]) || !u(e[1])) {
        o(E("setPixel", "参数格式有误"));
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
      if (!u(e)) {
        o(E("setX", "参数格式有误"));
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
      if (!u(e)) {
        o(E("setY", "参数格式有误"));
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
      o(E("equals", "参数未正确实例化"));
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
const Te = "Lnglat", C = y(Te);
class h {
  constructor(e, t) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    l(this, "_lnglat");
    (!u(e) || !u(t)) && f(C("constructor", "传入经纬度格式错误")), this._lnglat = [e, t];
  }
  _isInitialized(e) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (o(C(e, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(e) {
    if (this._isInitialized("setLng")) {
      if (!u(e)) {
        o(C("setLng", "传入经度格式有误"));
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
      if (!u(e)) {
        o(C("setLat", "传入纬度格式有误"));
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
    if (!(e instanceof h)) {
      o(C("equals", "传入经纬度格式错误，必须为Lnglat类型"));
      return;
    }
    const t = e.getLng() !== void 0 && e.getLat() !== void 0 ? [e.getLng(), e.getLat()] : void 0;
    if (t)
      return this._lnglat[0] === t[0] && this._lnglat[1] === t[1];
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
  toString(e) {
    var t, i;
    return !this._isInitialized("toString") || !P(this._lnglat) ? "" : `[${(t = this._lnglat[0]) == null ? void 0 : t.toFixed(e)}, ${(i = this._lnglat[1]) == null ? void 0 : i.toFixed(e)}]`;
  }
}
const oe = {
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
}, Ge = "Color", B = y(Ge);
class v {
  constructor(e) {
    l(this, "_color", "");
    this._initColor(e);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(e) {
    const t = () => {
      f(B("constructor", "初始化参数有误"));
    };
    if (z(e)) {
      let i = e;
      if (i.length === 3) {
        if (!G(e)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (i.length === 4) {
        if (!G(i.slice(0, 3)) || !D(i[3])) {
          t();
          return;
        }
        this._color = `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${i[3]})`;
      } else if (i.length === 2) {
        if (!O(i[0]) || !D(i[1])) {
          t();
          return;
        }
        let n = w(e[0]);
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
    if (K(e)) {
      let i = e;
      if (!s(i.color) && !(s(i.r) && s(i.g) && s(i.b))) {
        t();
        return;
      }
      if (s(i.color)) {
        if (O(i.color)) {
          let n = w(i.color);
          if (!s(n)) {
            t();
            return;
          }
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${i.alpha || i.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (Pe(i.color)) {
          let n = ne(i.color).join(", ");
          this._color = s(i.alpha) || s(i.opacity) ? `rgba(${n}, ${i.alpha || i.opacity})` : `rgb(${n})`;
        }
      } else if (s(i.r) && s(i.g) && s(i.b)) {
        if (!G([i.r, i.g, i.b])) {
          t();
          return;
        }
        this._color = s(i.alpha) || s(i.opacity) ? `rgba(${i.r}, ${i.g}, ${i.b}, ${i.alpha || i.opacity})` : `rgb(${i.r}, ${i.g}, ${i.b})`;
      } else {
        t();
        return;
      }
    }
    if (F(e)) {
      if (Me(e)) {
        t();
        return;
      }
      if (O(e)) {
        let i = w(e);
        if (!s(i)) {
          t();
          return;
        }
        this._color = `rgb(${i[0]}, ${i[1]}, ${i[2]})`;
      } else if (ke(e)) {
        let i = w(e.slice(0, 7));
        if (!s(i)) {
          t();
          return;
        }
        let n = Re(e.slice(6));
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
    if (!D(e)) {
      f(B("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...ne(this._color), e]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...Be(this._color), e]);
    else {
      if (!s(oe[this._color])) {
        f(B("withAlpha", "颜色值有误"));
        return;
      }
      let t = w(oe[this._color]);
      if (!s(t)) {
        f(B("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...t, e]);
    }
  }
}
const Oe = "Extent", L = y(Oe);
class A {
  constructor(e, t, i, n) {
    l(this, "_extent", []);
    if (!u(e) || !u(t) || !u(i) || !u(n)) {
      f(L("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (i < e || n < t) {
      f(L("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [e, t, i, n];
  }
  _isInitialized(e) {
    return !s(this._extent) || this._extent.length !== 4 ? (o(L(e, "未正确实例化")), !1) : !0;
  }
  getExtent() {
    if (this._isInitialized("getTopLeft"))
      return this._extent;
  }
  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft() {
    if (this._isInitialized("getTopLeft"))
      return new h(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new h(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new h(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new h(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new h(
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
    if (!(e instanceof A) || !(t instanceof h)) {
      o(L("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
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
    if (!(e instanceof A) || !(t instanceof A)) {
      o(L("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!e._isInitialized("containsExtent") || !t._isInitialized("containsExtent")))
      return e._extent[0] <= t._extent[0] && t._extent[2] <= e._extent[2] && e._extent[1] <= t._extent[1] && t._extent[3] <= e._extent[3];
  }
}
function Ze(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new p.Fill({
      ...r,
      color: e instanceof v ? e.getColor() : e
    });
}
function Ne(r) {
  if (!s(r))
    return;
  const { color: e } = r;
  if (s(e))
    return new p.Stroke({
      ...r,
      color: e instanceof v ? e.getColor() : e
    });
}
function je(r) {
  if (!s(r))
    return;
  const { fill: e, stroke: t } = r;
  let i = new p.Circle({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  return s(e) && i.setFill(new p.Fill({
    color: e.color instanceof v ? e.color.getColor() : e.color
  })), s(t) && i.setStroke(new p.Stroke({
    color: t.color instanceof v ? t.color.getColor() : t.color
  })), i;
}
function Ue(r) {
  return s(r) ? new p.Icon({
    ...r,
    color: r.color ? r.color instanceof v ? r.color.getColor() : r.color : void 0,
    offset: s(r.offset) ? r.offset.getPixel() : [0, 0],
    size: s(r.size) ? r.size.getSize() : void 0
  }) : void 0;
}
function qe(r) {
  if (!s(r))
    return;
  let e = new p.RegularShape({
    ...r,
    fill: void 0,
    stroke: void 0
  });
  const { fill: t, stroke: i } = r;
  return s(t) && e.setFill(new p.Fill({
    color: t.color instanceof v ? t.color.getColor() : t.color
  })), s(i) && e.setStroke(new p.Stroke({
    color: i.color instanceof v ? i.color.getColor() : i.color
  })), e;
}
class ae {
  constructor(e) {
    l(this, "_style");
    const { fill: t, stroke: i, text: n, circle: a, icon: c, regularShape: g } = e;
    let I;
    a ? I = je(a) : c ? I = Ue(c) : g && (I = qe(g)), console.log("------------"), console.log(I), this._style = new p.Style({
      fill: Ze(t),
      stroke: Ne(i),
      image: I
    });
  }
  _isInitialized(e) {
  }
  getStyle() {
    return this._style;
  }
}
let j = "BaseLayer", _ = y(j);
const le = 1, ue = !0, ce = 0, he = 22, fe = 0, de = 1 / 0, ge = 1, _e = {};
var $;
class V {
  // 图层所属组ID，默认null
  constructor(e, t) {
    /**
     * 图层类型
     */
    l(this, "type", null);
    /**
     * 图层实例（ol）
     */
    l(this, "_layer");
    // 底层图层对象，由子类实现具体的图层类型
    /**
     * 图层id，每个图层的唯一主键，用于区分图层
     */
    l(this, "id", null);
    /**
     * 图层名称，用于显示在图层控制栏中
     */
    l(this, "name", "");
    l(this, "className", "");
    // 图层样式类名，用于自定义图层样式，默认无
    l(this, "opacity", le);
    // 图层透明度，默认1
    l(this, "visible", ue);
    // 图层是否可见，默认true
    l(this, "extent", null);
    // 图层范围，默认全局
    l(this, "minZoom", ce);
    // 最小缩放级别，默认0
    l(this, "maxZoom", he);
    // 最大缩放级别，默认22
    l(this, "minResolution", fe);
    // 最小分辨率，默认0r
    l(this, "maxResolution", de);
    // 最大分辨率，默认Infinity
    l(this, "zIndex", ge);
    // 图层层级，默认0
    l(this, "properties", _e);
    // 图层属性，用于存储图层相关信息
    ee(this, $, null);
    let i = t || {};
    this.type = e, j = `${e}Layer`, _ = y(j), i.id && (this.id = i.id), this.name = i.name || "", this.className = i.className || "", this.opacity = i.opacity || le, this.visible = i.visible || ue, this.extent = i.extent || null, this.minZoom = i.minZoom || ce, this.maxZoom = i.maxZoom || he, this.minResolution = i.minResolution || fe, this.maxResolution = i.maxResolution || de, this.zIndex = i.zIndex || ge, this.properties = i.properties || _e;
  }
  _isInitialized(e) {
    return s(this._layer) ? !0 : (o(_(e, "未正确实例化")), !1);
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
      if (!s(e)) {
        o(_("setOpacity", "透明度不能为空"));
        return;
      }
      if (!D(e)) {
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
      if (!s(e)) {
        o(_("setVisible", "可见性不能为空"));
        return;
      }
      if ($e(e)) {
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
      if (!s(e)) {
        o(_("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!u(e)) {
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
      if (!s(e)) {
        o(_("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!u(e)) {
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
      if (!s(e)) {
        o(_("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!u(e)) {
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
      if (!s(e)) {
        o(_("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!u(e)) {
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
      if (!s(e)) {
        o(_("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!u(e)) {
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
      if (!s(e)) {
        o(_("setProperties", "属性不能为空"));
        return;
      }
      if (K(e)) {
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
      return Q(this, $);
  }
  // TODO
  setGroupId(e) {
    te(this, $, e);
  }
}
$ = new WeakMap();
const Ke = "Event", ye = y(Ke);
class He {
  constructor(e) {
    l(this, "events", /* @__PURE__ */ new Map());
    l(this, "target", null);
    l(this, "total", 0);
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
      } catch (c) {
        f(ye("emit", `回调异常: ${String(c)}`));
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
    return o(ye("remove", `未找到 id=${e} 的监听`)), this;
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
function me(r) {
  return r.startsWith("map:");
}
function R(r, e, t) {
  let i = {
    target: r,
    type: e
  };
  switch (e) {
    case "map:click":
    case "map:singleclick":
    case "map:dbclick":
      t.pixel && (i.pixel = new Ve(...t.pixel)), t.coordinate && (i.coordinate = new h(...t.coordinate));
      break;
    case "map:propertychange":
      i.key = t.key, i.oldValue = t.oldValue;
      let n = r.getProperties();
      i.newValue = s(n) ? n[t.key] : void 0;
      break;
    case "view:change:resolution":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getResolution();
      break;
    case "view:change:center":
      t.oldValue && (i.oldValue = new h(...t.oldValue)), i.newValue = t.newValue || r.getCenter();
      break;
    case "view:change:rotation":
      t.oldValue && (i.oldValue = t.oldValue), i.newValue = t.newValue || r.getRotation();
      break;
    case "view:propertychange":
      t.oldValue && (i.oldValue = t.key === "center" ? new h(...t.oldValue) : t.oldValue), t.key === "center" ? i.newValue = t.newValue || r.getCenter() : t.key === "rotation" ? i.newValue = t.newValue || r.getRotation() : t.key === "resolution" && (i.newValue = t.newValue || r.getResolution());
      break;
  }
  return i;
}
const We = "Map", d = y(We);
let mt = class {
  constructor(e, t) {
    l(this, "_map");
    l(this, "_view");
    l(this, "layers", []);
    l(this, "events", null);
    const n = t.view;
    if (!s(n)) {
      f(d("constructor", "view参数不能为空"));
      return;
    }
    let a = n.projection || new x("EPSG:3857");
    F(a) && (a = new x(a));
    const c = {
      ...n,
      center: n.center instanceof h ? n.center._lnglat : n.center,
      // 中心点坐标
      extent: n.extent instanceof A ? n.extent._extent : n.extent,
      projection: a._projection
    }, g = new ie.View(c), I = new ie.Map({
      target: e,
      view: g
    });
    this._view = g, this._map = I, this.events = new He(this);
  }
  /** 私有守卫：运行期检查 + 类型收窄 */
  _isInitialized(e) {
    return this._map == null || this._view == null ? (o(d(e, "未正确实例化")), !1) : !0;
  }
  // 地图信息相关
  getCenter() {
    if (!this._isInitialized("getCenter")) return;
    let e = this._view.getCenter();
    return new h(...e);
  }
  setCenter(e) {
    if (!this._isInitialized("setCenter")) return;
    if (!s(e)) {
      o(d("setCenter", "参数center不能为空"));
      return;
    }
    let t = e instanceof h ? e._lnglat : e;
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
      if (!u(e)) {
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
      if (!u(e)) {
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
      if (!u(e)) {
        o(d("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(e);
    }
  }
  getExtent() {
    if (!this._isInitialized("getExtent")) return;
    let e = this._view.calculateExtent(), [t, i, n, a] = e;
    return new A(t, i, n, a);
  }
  zoomIn(e = 1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !u(e)) {
        o(d("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(e);
    }
  }
  zoomOut(e = -1) {
    if (this._isInitialized("zoomIn")) {
      if (s(e) && !u(e)) {
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
    if (e instanceof ft)
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
      i instanceof V && s(i.getId()) && i.getId() === e && (t = i);
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
      return o(d("removeLayerById", `找不到id为${e}(${F(e) ? "string" : "number"})的图层`)), !1;
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
    let i = me(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (g) => {
      this.events.emit(e, R(this, e, g));
    }) : n.on(e.replace("view:", ""), (g) => {
      this.events.emit(e, R(this, e, g));
    })), this.events.on(e, t);
  }
  un(e) {
    if (this._isInitialized("un")) {
      if (!s(e)) {
        o(d("un", "参数不能为空"));
        return;
      }
      if (!u(e)) {
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
    let i = me(e);
    const n = i ? this._map : this._view;
    let a = this.events.get(e);
    return (!s(a) || a.length === 0) && (i ? n.on(e.replace("map:", ""), (g) => {
      this.events.emit(e, R(this, e, g));
    }) : n.on(e.replace("view:", ""), (g) => {
      this.events.emit(e, R(this, e, g));
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
};
const Ye = "Map", Fe = y(Ye);
class x {
  constructor(e) {
    l(this, "_projection", null);
    l(this, "code", "");
    l(this, "units", "degrees");
    let t = "";
    if (F(e))
      t = e.startsWith("EPSG") ? e : "EPSG:" + e;
    else {
      let i = e;
      if (!s(i.code)) {
        f(Fe("constructor", "初始化参数有误"));
        return;
      }
      t = i.code, t = t.startsWith("EPSG") ? t : "EPSG:" + t;
    }
    if (this.code = t, this._projection = N.get(t), !s(this._projection)) {
      o(Fe("constructor", "坐标系不存在"));
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
const Xe = "Feature", M = y(Xe);
class H {
  constructor(e, t) {
    l(this, "id");
    l(this, "type");
    l(this, "_feature");
    l(this, "_geometry");
    this.type = e, this._init(t);
  }
  _init(e) {
    switch (this.type) {
      case "Point":
        let t = e;
        this._geometry = new T.Point(t instanceof h ? t._lnglat : t);
        break;
      case "LineString":
        let i = e.map((a) => a instanceof h ? a._lnglat : a);
        this._geometry = new T.LineString(i);
        break;
      case "Polygon":
        let n = e.map((a) => a.map((c) => c instanceof h ? c._lnglat : c));
        this._geometry = new T.Polygon(n);
        break;
    }
    this._feature = new Ce({
      geometry: this._geometry
    });
  }
  _isInitialized(e) {
    return this._feature == null ? (o(M(e, "未正确实例化")), !1) : !0;
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
        o(M("setProperties", "参数不能为空"));
        return;
      }
      if (!K(e)) {
        o(M("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(e || {});
    }
  }
  setId(e) {
    if (this._isInitialized("setId")) {
      if (!s(e)) {
        o(M("setId", "参数id不能为空"));
        return;
      }
      if (!u(e) && !F(e)) {
        o(M("setId", "参数id格式有误"));
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
const Je = "Point", pe = y(Je);
class pt extends H {
  constructor(e, t) {
    if (!s(e)) {
      f(pe("constructor", "参数不能为空"));
      return;
    }
    if (!(e instanceof h) && !P(e)) {
      f(pe("constructor", "坐标格式有误"));
      return;
    }
    super("Point", e), t && this.setProperties(t);
  }
}
function Qe(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !(i instanceof h) && !P(i)) && (e = !1), e;
}
const et = "Point", Ie = y(et);
class It extends H {
  constructor(e, t) {
    if (!s(e)) {
      f(Ie("constructor", "参数不能为空"));
      return;
    }
    if (!Qe(e)) {
      f(Ie("constructor", "坐标格式有误"));
      return;
    }
    super("LineString", e), t && this.setProperties(t);
  }
}
function tt(r) {
  let e = !0;
  return z(r) || (e = !1), r.some((i) => !z(i)) && (e = !1), r.forEach((i) => {
    i.forEach((n) => {
      !(n instanceof h) && !P(n) && (e = !1);
    });
  }), e;
}
const it = "Point", ze = y(it);
class zt extends H {
  constructor(e, t) {
    if (!s(e)) {
      f(ze("constructor", "参数不能为空"));
      return;
    }
    if (!tt(e)) {
      f(ze("constructor", "坐标格式有误"));
      return;
    }
    super("Polygon", e), t && this.setProperties(t);
  }
}
const rt = {
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
class vt extends V {
  constructor(t, i) {
    super("Gaode", i);
    /**
     * 图层类型
     */
    l(this, "gaodeType", null);
    this.gaodeType = t, this._layer = new U.Tile({
      source: new q.XYZ({
        urls: rt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
}
const st = "ProjUtil", ve = y(st);
class Et {
  static fromLonLat(e, t) {
    if (!s(e)) {
      o(ve("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof h && (i = e._lnglat);
    let n = s(t) ? F(t) ? new x(t) : t : new x("EPSG:3857"), a = N.fromLonLat(i, n._projection);
    return new h(a[0], a[1]);
  }
  static toLonLat(e, t) {
    if (!s(e)) {
      o(ve("toLonLat", "coordinate参数不能为空"));
      return;
    }
    let i = e;
    e instanceof h && (i = e._lnglat);
    let n = s(t) ? F(t) ? new x(t) : t : new x("EPSG:3857"), a = N.toLonLat(i, n._projection);
    return new h(a[0], a[1]);
  }
}
const Z = "OMapToken", nt = {
  tdt: null
};
function ot(r, e) {
  window[Z] || (window[Z] = {}), window[Z][r] = e;
}
const xe = new Proxy(nt, {
  set: function(r, e, t, i) {
    return ot(e, t), Reflect.set(r, e, t, i);
  }
}), at = "http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}";
function lt(r, e) {
  return at.replace(/\{T\}/g, r + "_" + e).replace(/\{tk\}/g, xe.tdt);
}
let ut = "TdtLayer", Ee = y(ut);
class xt extends V {
  constructor(t, i) {
    var a, c, g;
    super("Tdt", i);
    /**
     * 图层类型
     */
    l(this, "tdtType", null);
    if (!s(xe.tdt)) {
      f(Ee("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(t)) {
      f(Ee("constructor", "缺少参数天地图图层类型"));
      return;
    }
    let n = i || {};
    delete n.source, n.map, this.tdtType = t, this._layer = new U.Tile({
      ...n,
      extent: s(n.extent) ? (a = n.extent) == null ? void 0 : a._extent : void 0,
      map: s(n.map) ? (c = n.map) == null ? void 0 : c._map : void 0,
      background: s(n.background) ? (g = n.background) == null ? void 0 : g._color : void 0,
      source: new q.XYZ({
        url: lt(t, (i == null ? void 0 : i.proj) || "w")
      })
    }), this._initLayerEvent();
  }
}
let ct = "VectorLayer", m = y(ct);
class At extends V {
  constructor(t = {}) {
    super("Vector", t);
    l(this, "features", []);
    let i = s(t.source) ? t.source : {}, n = {
      ...i,
      features: i.features ? i.features.map((c) => c.getFeature()) : []
    }, a;
    s(t.style) && (t.style instanceof ae ? a = t.style.getStyle() : z(t.style) && t.style.every((c) => c instanceof ae) ? a = t.style.map((c) => c.getStyle()) : re(t.style) && (a = (c, g) => {
      let I = k.getUid(c), W = this.features.findIndex((Ae) => k.getUid(Ae.getFeature()) === I), Y = t.style(W !== -1 ? this.features[W] : null, g);
      return Y ? Y.getStyle() : void 0;
    })), this._layer = new U.Vector({
      source: new q.Vector(n),
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
    if (!s(t)) {
      o(m("setId", "参数id不能为空"));
      return;
    }
    if (!u(t) && !F(t)) {
      o(m("setId", "参数id格式有误"));
      return;
    }
    return this.features.find((n) => s(n.getId()) && n.getId() === t) || void 0;
  }
  getFeaturesInExtent(t, i) {
  }
  addFeature(t) {
    if (this._isInitializedLayer("addFeature")) {
      if (!s(t)) {
        o(m("addFeature", "参数不能为空"));
        return;
      }
      this._layer.getSource() && (this._layer.getSource().addFeature(t.getFeature()), this.features.push(t));
    }
  }
  addFeatures(t) {
    if (this._isInitializedLayer("addFeatures")) {
      if (!s(t) || !z(t)) {
        o(m("addFeatures", "参数格式有误不能为空"));
        return;
      }
      se(t) || t.forEach((i) => {
        this.addFeature(i);
      });
    }
  }
  removeFeature(t) {
    if (this._isInitializedLayer("removeFeature")) {
      if (!s(t)) {
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
      if (!s(t) || !z(t)) {
        o(m("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      se(t) || t.forEach((i) => {
        this.removeFeature(i);
      });
    }
  }
  clear() {
    this._isInitializedLayer("clear") && this._layer.getSource() && (this._layer.getSource().clear(), this.features = []);
  }
  forEachFeature(t) {
    if (this._isInitializedLayer("forEachFeature")) {
      if (!s(t) || !re(t)) {
        o(m("forEachFeature", "参数格式有误"));
        return;
      }
      this.features.forEach((i, n) => {
        t(i, n);
      });
    }
  }
  forEachFeatureInExtent(t, i) {
    if (this._isInitializedLayer("forEachFeatureInExtent")) {
      if (!s(i)) {
        o(m("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      console.log(t.getExtent()), this._layer.getSource().forEachFeatureInExtent(t.getExtent(), (n) => {
        let a = k.getUid(n), c = this.features.findIndex((g) => k.getUid(g.getFeature()) === a);
        s(c) && c !== -1 && i(this.features[c], 0);
      });
    }
  }
  forEachFeatureIntersectingExtent(t, i) {
  }
  getClosestFeatureToCoordinate(t, i) {
    if (this._isInitializedLayer("getClosestFeatureToCoordinate")) {
      if (!s(t)) {
        o(m("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(t instanceof h) && !P(t)) {
        o(m("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
        return;
      }
      t instanceof h && t._lnglat;
    }
  }
}
let ht = "LayerGroup", S = y(ht);
class ft {
  constructor(e, t) {
    l(this, "id", null);
    l(this, "layers", []);
    if (!s(e)) {
      f(S("constructor", "参数不能为空"));
      return;
    }
    let i, n = null;
    if (Array.isArray(e))
      i = e;
    else {
      if (n = e, !s(t)) {
        f(S("constructor", "layers 参数不能为空"));
        return;
      }
      i = t;
    }
    s(n) && (this.id = n), this.layers = i;
  }
  add(e) {
    if (!s(e)) {
      f(S("add", "图层不能为空"));
      return;
    }
    let t = e.getId();
    if (s(t) && this.layers.find((n) => n.getId() && n.getId() === t)) {
      o(S("add", "图层已存在"));
      return;
    }
    this.layers.push(e);
  }
  remove(e) {
    if (u(e)) {
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
  v as Color,
  A as Extent,
  vt as GaodeLayer,
  ft as LayerGroup,
  It as LineString,
  h as Lnglat,
  mt as Map,
  xe as MapToken,
  Ve as Pixel,
  pt as Point,
  zt as Polygon,
  Et as ProjUtil,
  x as Projection,
  yt as Size,
  ae as Style,
  xt as TdtLayer,
  At as VectorLayer
};
