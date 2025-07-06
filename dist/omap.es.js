var y = Object.defineProperty;
var w = (r, t, i) => t in r ? y(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[t] = i;
var h = (r, t, i) => w(r, typeof t != "symbol" ? t + "" : t, i);
import * as m from "ol";
import "ol/proj";
function s(r) {
  return r != null;
}
function l(r) {
  console.warn("omap warn", r);
}
function u(r) {
  throw new Error(`omap error ${r}`);
}
function f(r) {
  return (t, i) => `📦${r}【${t}】: ${i}`;
}
const x = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function z(r) {
  return Array.isArray(r);
}
function o(r) {
  return typeof r == "number";
}
function E(r) {
  return typeof r == "string";
}
function v(r) {
  return r === "";
}
function k(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function L(r) {
  return z(r) && r.length === 2 && o(r[0]) && o(r[1]);
}
function C(r) {
  return z(r) && r.length === 3 && r.every((t) => o(t) && t >= 0 && t <= 255);
}
function G(r) {
  return E(r) && x.test(r);
}
function b(r) {
  return o(r) && r >= 0 && r <= 1;
}
function B(r) {
  let t = r.replace("#", "");
  return E(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function S(r) {
  let t = r.replace("#", "");
  return E(r) && r.startsWith("#") && t.length === 8;
}
function F(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((n) => n + n).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), i = parseInt(r.slice(2, 4), 16), e = parseInt(r.slice(4, 6), 16);
  return [t, i, e];
}
function $(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function R(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function P(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const q = "Size", g = f(q);
class T {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    h(this, "_size", []);
    (!o(t) || !o(i)) && u(g("constructor", "初始化参数有误")), this._size = [t, i];
  }
  _isInitialized(t) {
    return s(this._size) ? !0 : (l(g(t, "未正确实例化")), !1);
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
        l(g("setSize", "参数格式有误"));
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
        l(g("setWidth", "参数格式有误"));
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
        l(g("setHeight", "参数格式有误"));
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
const M = "Pixel", c = f(M);
class K {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    h(this, "_pixel", []);
    (!o(t) || !o(i)) && u(c("constructor", "初始化参数有误")), this._pixel = [t, i];
  }
  _isInitialized(t) {
    return s(this._pixel) ? !0 : (l(c(t, "未正确实例化")), !1);
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
        l(c("setPixel", "参数格式有误"));
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
        l(c("setX", "参数格式有误"));
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
        l(c("setY", "参数格式有误"));
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
      l(c("equals", "参数未正确实例化"));
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
const H = "Lnglat", d = f(H);
class a {
  constructor(t, i) {
    /**
     * 经纬度数组
     * @type {LnglatType}
     * @example [119.26, 28.73]
     * @private
     */
    h(this, "_lnglat");
    (!o(t) || !o(i)) && u(d("constructor", "传入经纬度格式错误")), this._lnglat = [t, i];
  }
  _isInitialized(t) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (l(d(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!o(t)) {
        l(d("setLng", "传入经度格式有误"));
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
        l(d("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof a)) {
      l(d("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !L(this._lnglat) ? "" : `[${(i = this._lnglat[0]) == null ? void 0 : i.toFixed(t)}, ${(e = this._lnglat[1]) == null ? void 0 : e.toFixed(t)}]`;
  }
}
const D = {
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
}, W = "Color", p = f(W);
class X {
  constructor(t) {
    h(this, "_color", "");
    this._initColor(t);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(t) {
    const i = () => {
      u(p("constructor", "初始化参数有误"));
    };
    if (z(t)) {
      let e = t;
      if (e.length === 3) {
        if (!C(t)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (e.length === 4) {
        if (!C(e.slice(0, 3)) || !b(e[3])) {
          i();
          return;
        }
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
      } else if (e.length === 2) {
        if (!B(e[0]) || !b(e[1])) {
          i();
          return;
        }
        let n = F(t[0]);
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
    if (k(t)) {
      let e = t;
      if (!s(e.color) && !(s(e.r) && s(e.g) && s(e.b))) {
        i();
        return;
      }
      if (s(e.color)) {
        if (B(e.color)) {
          let n = F(e.color);
          if (!s(n)) {
            i();
            return;
          }
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${e.alpha || e.opacity})` : `rgb(${n[0]}, ${n[1]}, ${n[2]})`;
        }
        if (G(e.color)) {
          let n = $(e.color).join(", ");
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${n}, ${e.alpha || e.opacity})` : `rgb(${n})`;
        }
      } else if (s(e.r) && s(e.g) && s(e.b)) {
        if (!C([e.r, e.g, e.b])) {
          i();
          return;
        }
        this._color = s(e.alpha) || s(e.opacity) ? `rgba(${e.r}, ${e.g}, ${e.b}, ${e.alpha || e.opacity})` : `rgb(${e.r}, ${e.g}, ${e.b})`;
      } else {
        i();
        return;
      }
    }
    if (E(t)) {
      if (v(t)) {
        i();
        return;
      }
      if (B(t)) {
        let e = F(t);
        if (!s(e)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (S(t)) {
        let e = F(t.slice(0, 7));
        if (!s(e)) {
          i();
          return;
        }
        let n = P(t.slice(6));
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
    if (!b(t)) {
      u(p("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...$(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...R(this._color), t]);
    else {
      if (!s(D[this._color])) {
        u(p("withAlpha", "颜色值有误"));
        return;
      }
      let i = F(D[this._color]);
      if (!s(i)) {
        u(p("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...i, t]);
    }
  }
}
const j = "Extent", _ = f(j);
class A {
  constructor(t, i, e, n) {
    h(this, "_extent", []);
    if (!o(t) || !o(i) || !o(e) || !o(n)) {
      u(_("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (e < t || n < i) {
      u(_("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, i, e, n];
  }
  _isInitialized(t) {
    return !s(this._extent) || this._extent.length !== 4 ? (l(_(t, "未正确实例化")), !1) : !0;
  }
  /**
   * 获取边界范围Extent的左上方位置
   * @return {Lnglat} 左上方位置
   */
  getTopLeft() {
    if (this._isInitialized("getTopLeft"))
      return new a(this._extent[0], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的右上方位置
   * @return {Lnglat} 右上方位置
   */
  getTopRight() {
    if (this._isInitialized("getTopRight"))
      return new a(this._extent[2], this._extent[3]);
  }
  /**
   * 获取边界范围Extent的左下角位置
   * @return {Lnglat} 左下角位置
   */
  getBottomLeft() {
    if (this._isInitialized("getBottomLeft"))
      return new a(this._extent[0], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的右下角位置
   * @return {Lnglat} 右下角位置
   */
  getBottomRight() {
    if (this._isInitialized("getBottomRight"))
      return new a(this._extent[2], this._extent[1]);
  }
  /**
   * 获取边界范围Extent的中心点位置
   * @return {Lnglat} 中心点位置
   */
  getCenter() {
    if (this._isInitialized("getCenter"))
      return new a(
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
    if (!(t instanceof A) || !(i instanceof a)) {
      l(_("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
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
    if (!(t instanceof A) || !(i instanceof A)) {
      l(_("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !i._isInitialized("containsExtent")))
      return t._extent[0] <= i._extent[0] && i._extent[2] <= t._extent[2] && t._extent[1] <= i._extent[1] && i._extent[3] <= t._extent[3];
  }
}
const O = {
  center: [120.2, 30.3],
  // 中心点坐标
  zoom: 8
};
class Y {
  constructor(t, i) {
    h(this, "_map", null);
    h(this, "_view", null);
    let e = i || O;
    const n = new m.View({
      center: e.center instanceof a ? e.center._lnglat : e.center,
      // 中心点坐标
      zoom: e.zoom,
      projection: "EPSG:4326"
      // 坐标系
    }), I = new m.Map({
      target: t,
      view: n
    });
    this._view = n, this._map = I;
  }
}
export {
  X as Color,
  A as Extent,
  a as Lnglat,
  Y as Map,
  K as Pixel,
  T as Size
};
