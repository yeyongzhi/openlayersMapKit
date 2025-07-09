var X = Object.defineProperty;
var J = (r, t, i) => t in r ? X(r, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : r[t] = i;
var l = (r, t, i) => J(r, typeof t != "symbol" ? t + "" : t, i);
import * as M from "ol";
import * as V from "ol/layer";
import * as q from "ol/source";
import * as U from "ol/proj";
function s(r) {
  return r != null;
}
function n(r) {
  console.warn("omap warn", r);
}
function c(r) {
  throw new Error(`omap error ${r}`);
}
function d(r) {
  return (t, i) => `📦${r}【${t}】: ${i}`;
}
const Q = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
function $(r) {
  return Array.isArray(r);
}
function a(r) {
  return typeof r == "number";
}
function g(r) {
  return typeof r == "string";
}
function tt(r) {
  return r === "";
}
function et(r) {
  return typeof r == "boolean";
}
function W(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function it(r) {
  return $(r) && r.length === 2 && a(r[0]) && a(r[1]);
}
function b(r) {
  return $(r) && r.length === 3 && r.every((t) => a(t) && t >= 0 && t <= 255);
}
function rt(r) {
  return g(r) && Q.test(r);
}
function A(r) {
  return a(r) && r >= 0 && r <= 1;
}
function w(r) {
  let t = r.replace("#", "");
  return g(r) && r.startsWith("#") && (t.length === 6 || t.length === 3);
}
function st(r) {
  let t = r.replace("#", "");
  return g(r) && r.startsWith("#") && t.length === 8;
}
function F(r) {
  if (r.charAt(0) !== "#")
    return console.error("Hex color code must start with #"), [0, 0, 0];
  if (r = r.slice(1), r.length === 3)
    r = r.split("").map((o) => o + o).join("");
  else if (r.length !== 6)
    return console.error("Hex color code must be 3 or 6 characters long"), [0, 0, 0];
  const t = parseInt(r.slice(0, 2), 16), i = parseInt(r.slice(2, 4), 16), e = parseInt(r.slice(4, 6), 16);
  return [t, i, e];
}
function v(r) {
  const t = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function nt(r) {
  const t = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/, i = r.match(t);
  if (i)
    return [parseInt(i[1], 10), parseInt(i[2], 10), parseInt(i[3], 10)];
  throw new Error("Invalid RGB format");
}
function ot(r) {
  return (parseInt(r, 16) / 255).toPrecision(2);
}
const at = "Size", y = d(at);
class At {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [20, 15]
     * @private
     */
    l(this, "_size", []);
    (!a(t) || !a(i)) && c(y("constructor", "初始化参数有误")), this._size = [t, i];
  }
  _isInitialized(t) {
    return s(this._size) ? !0 : (n(y(t, "未正确实例化")), !1);
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
      if (!a(t[0]) || !a(t[1])) {
        n(y("setSize", "参数格式有误"));
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
      if (!a(t)) {
        n(y("setWidth", "参数格式有误"));
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
      if (!a(t)) {
        n(y("setHeight", "参数格式有误"));
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
const lt = "Pixel", f = d(lt);
class It {
  constructor(t, i) {
    /**
     * @type {number[]}
     * @example [100, 200]
     * @private
     */
    l(this, "_pixel", []);
    (!a(t) || !a(i)) && c(f("constructor", "初始化参数有误")), this._pixel = [t, i];
  }
  _isInitialized(t) {
    return s(this._pixel) ? !0 : (n(f(t, "未正确实例化")), !1);
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
      if (!a(t[0]) || !a(t[1])) {
        n(f("setPixel", "参数格式有误"));
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
      if (!a(t)) {
        n(f("setX", "参数格式有误"));
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
      if (!a(t)) {
        n(f("setY", "参数格式有误"));
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
      n(f("equals", "参数未正确实例化"));
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
const ut = "Lnglat", m = d(ut);
class h {
  constructor(t, i) {
    /**
     * 经纬度数组
     * @type {number[]}
     * @example [119.26, 28.73]
     * @private
     */
    l(this, "_lnglat");
    (!a(t) || !a(i)) && c(m("constructor", "传入经纬度格式错误")), this._lnglat = [t, i];
  }
  _isInitialized(t) {
    return !s(this._lnglat) || s(this._lnglat) && this._lnglat.length !== 2 ? (n(m(t, "经纬度未正确初始化")), !1) : !0;
  }
  /**
   * 设置经度
   * @param {number} lng 经度
   */
  setLng(t) {
    if (this._isInitialized("setLng")) {
      if (!a(t)) {
        n(m("setLng", "传入经度格式有误"));
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
      if (!a(t)) {
        n(m("setLat", "传入纬度格式有误"));
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
    if (!(t instanceof h)) {
      n(m("equals", "传入经纬度格式错误，必须为Lnglat类型"));
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
    return !this._isInitialized("toString") || !it(this._lnglat) ? "" : `[${(i = this._lnglat[0]) == null ? void 0 : i.toFixed(t)}, ${(e = this._lnglat[1]) == null ? void 0 : e.toFixed(t)}]`;
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
}, ct = "Color", x = d(ct);
class bt {
  constructor(t) {
    l(this, "_color", "");
    this._initColor(t);
  }
  /**
   * 初始化颜色
   * @param {ColorType} color 颜色
   */
  _initColor(t) {
    const i = () => {
      c(x("constructor", "初始化参数有误"));
    };
    if ($(t)) {
      let e = t;
      if (e.length === 3) {
        if (!b(t)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (e.length === 4) {
        if (!b(e.slice(0, 3)) || !A(e[3])) {
          i();
          return;
        }
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
      } else if (e.length === 2) {
        if (!w(e[0]) || !A(e[1])) {
          i();
          return;
        }
        let o = F(t[0]);
        if (!s(o)) {
          i();
          return;
        }
        this._color = `rgba(${o[0]}, ${o[1]}, ${o[2]}, ${e[1]})`;
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
        if (w(e.color)) {
          let o = F(e.color);
          if (!s(o)) {
            i();
            return;
          }
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${o[0]}, ${o[1]}, ${o[2]}, ${e.alpha || e.opacity})` : `rgb(${o[0]}, ${o[1]}, ${o[2]})`;
        }
        if (rt(e.color)) {
          let o = v(e.color).join(", ");
          this._color = s(e.alpha) || s(e.opacity) ? `rgba(${o}, ${e.alpha || e.opacity})` : `rgb(${o})`;
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
    if (g(t)) {
      if (tt(t)) {
        i();
        return;
      }
      if (w(t)) {
        let e = F(t);
        if (!s(e)) {
          i();
          return;
        }
        this._color = `rgb(${e[0]}, ${e[1]}, ${e[2]})`;
      } else if (st(t)) {
        let e = F(t.slice(0, 7));
        if (!s(e)) {
          i();
          return;
        }
        let o = ot(t.slice(6));
        this._color = `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${o})`;
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
    if (!A(t)) {
      c(x("withAlpha", "透明度参数有误"));
      return;
    }
    if (this._color.startsWith("rgb") && !this._color.startsWith("rgba"))
      this._initColor([...v(this._color), t]);
    else if (this._color.startsWith("rgba"))
      this._initColor([...nt(this._color), t]);
    else {
      if (!s(D[this._color])) {
        c(x("withAlpha", "颜色值有误"));
        return;
      }
      let i = F(D[this._color]);
      if (!s(i)) {
        c(x("withAlpha", "颜色值有误"));
        return;
      }
      this._initColor([...i, t]);
    }
  }
}
const ht = "Extent", E = d(ht);
class z {
  constructor(t, i, e, o) {
    l(this, "_extent", []);
    if (!a(t) || !a(i) || !a(e) || !a(o)) {
      c(E("constructor", "初始化参数有误，必须为经纬度数值"));
      return;
    }
    if (e < t || o < i) {
      c(E("constructor", "初始化参数有误"));
      return;
    }
    this._extent = [t, i, e, o];
  }
  _isInitialized(t) {
    return !s(this._extent) || this._extent.length !== 4 ? (n(E(t, "未正确实例化")), !1) : !0;
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
    if (!(t instanceof z) || !(i instanceof h)) {
      n(E("containsCoordinate", "参数格式错误，必须为Extent类型和Lnglat类型"));
      return;
    }
    if (!t._isInitialized("containsCoordinate") || !s(i.toArray())) return;
    const [e, o] = i.toArray();
    return e >= t._extent[0] && e <= t._extent[2] && t._extent[1] <= o && o <= t._extent[3];
  }
  /**
   * 判断是否某个范围包含另一个范围
   * @param extent1 范围1
   * @param extent2 范围2
   * @return 判断结果
   */
  static containsExtent(t, i) {
    if (!(t instanceof z) || !(i instanceof z)) {
      n(E("containsExtent", "参数格式错误，必须为Extent"));
      return;
    }
    if (!(!t._isInitialized("containsExtent") || !i._isInitialized("containsExtent")))
      return t._extent[0] <= i._extent[0] && i._extent[2] <= t._extent[2] && t._extent[1] <= i._extent[1] && i._extent[3] <= t._extent[3];
  }
}
const dt = "Map", p = d(dt);
class wt {
  constructor(t, i) {
    l(this, "_map", null);
    l(this, "_view", null);
    l(this, "layers", []);
    const o = i.view;
    if (!s(o)) {
      c(p("constructor", "view参数不能为空"));
      return;
    }
    let _ = o.projection || new I("EPSG:3857");
    g(_) && (_ = new I(_));
    const H = {
      ...o,
      center: o.center instanceof h ? o.center._lnglat : o.center,
      // 中心点坐标
      extent: o.extent instanceof z ? o.extent._extent : o.extent,
      projection: _._projection
    }, B = new M.View(H), K = new M.Map({
      target: t,
      view: B
    });
    this._view = B, this._map = K;
  }
  _isInitialized(t) {
    return !s(this._map) || !s(this._view) ? (n(p(t, "未正确实例化")), !1) : !0;
  }
  addLayer(t) {
    if (!this._isInitialized("addLayer")) return;
    if (!s(t)) {
      n(p("addLayer", "图层对象不能为空"));
      return;
    }
    const i = t.getId();
    if (!s(i)) {
      n(p("addLayer", "图层id不能为空"));
      return;
    }
    if (this.getLayerById(i)) {
      n(p("addLayer", "图层已存在"));
      return;
    }
    this.layers.push(t), this._map.addLayer(t._layer);
  }
  addLayers(t) {
  }
  getLayerById(t) {
    if (!s(t)) {
      n(p("getLayerById", "图层id不能为空"));
      return;
    }
    return this.layers.find((e) => s(e.getId()) && e.getId() === t);
  }
}
const _t = "Map", R = d(_t);
class I {
  constructor(t) {
    l(this, "_projection", null);
    l(this, "code", "");
    l(this, "units", "degrees");
    let i = "";
    if (g(t))
      i = t.startsWith("EPSG") ? t : "EPSG:" + t;
    else {
      let e = t;
      if (!s(e.code)) {
        c(R("constructor", "初始化参数有误"));
        return;
      }
      i = e.code, i = i.startsWith("EPSG") ? i : "EPSG:" + i;
    }
    if (this.code = i, this._projection = U.get(i), !s(this._projection)) {
      n(R("constructor", "坐标系不存在"));
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
let L = "BaseLayer", u = d(L);
const P = 1, k = !0, T = 0, G = 22, Z = 0, O = 1 / 0, S = 1, N = {};
class Y {
  // 图层属性，用于存储图层相关信息
  constructor(t, i) {
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
    l(this, "opacity", P);
    // 图层透明度，默认1
    l(this, "visible", k);
    // 图层是否可见，默认true
    l(this, "extent", []);
    // 图层范围，默认全局
    l(this, "minZoom", T);
    // 最小缩放级别，默认0
    l(this, "maxZoom", G);
    // 最大缩放级别，默认22
    l(this, "minResolution", Z);
    // 最小分辨率，默认0r
    l(this, "maxResolution", O);
    // 最大分辨率，默认Infinity
    l(this, "zIndex", S);
    // 图层层级，默认0
    l(this, "properties", N);
    let e = i || {};
    this.type = t, L = `${t}Layer`, u = d(L), e.id && (this.id = e.id), this.name = e.name || "", this.className = e.className || "", this.opacity = e.opacity || P, this.visible = e.visible || k, this.extent = e.extent || null, this.minZoom = e.minZoom || T, this.maxZoom = e.maxZoom || G, this.minResolution = e.minResolution || Z, this.maxResolution = e.maxResolution || O, this.zIndex = e.zIndex || S, this.properties = e.properties || N;
  }
  _isInitialized(t) {
    return s(this._layer) ? !0 : (n(u(t, "未正确实例化")), !1);
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
        n(u("setOpacity", "透明度不能为空"));
        return;
      }
      if (!A(t)) {
        n(u("setOpacity", "透明度必须为0~1的数字"));
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
        n(u("setVisible", "可见性不能为空"));
        return;
      }
      if (et(t)) {
        n(u("setVisible", "可见性必须为boolean类型"));
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
        n(u("setMinZoom", "minZoom不能为空"));
        return;
      }
      if (!a(t)) {
        n(u("setMinZoom", "minZoom必须为number类型"));
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
        n(u("setMaxZoom", "maxZoom不能为空"));
        return;
      }
      if (!a(t)) {
        n(u("setMaxZoom", "maxZoom必须为number类型"));
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
        n(u("setMinResolution", "minResolution不能为空"));
        return;
      }
      if (!a(t)) {
        n(u("setMinResolution", "minResolution必须为number类型"));
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
        n(u("setMaxResolution", "maxResolution不能为空"));
        return;
      }
      if (!a(t)) {
        n(u("setMaxResolution", "maxResolution必须为number类型"));
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
        n(u("setZIndex", "zIndex不能为空"));
        return;
      }
      if (!a(t)) {
        n(u("setZIndex", "zIndex必须为number类型"));
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
        n(u("setProperties", "属性不能为空"));
        return;
      }
      if (W(t)) {
        n(u("setProperties", "属性必须为object类型"));
        return;
      }
      this._layer.setProperties(t);
    }
  }
  getProperties() {
    if (this._isInitialized("getProperties"))
      return this._layer.getProperties();
  }
}
const gt = {
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
let Ct = class extends Y {
  constructor(i, e) {
    super("Gaode", e);
    /**
     * 图层类型
     */
    l(this, "gaodeType", null);
    this.gaodeType = i, this._layer = new V.Tile({
      source: new q.XYZ({
        urls: gt[this.gaodeType]
      })
    }), this._initLayerEvent();
  }
};
const ft = "ProjUtil", pt = d(ft);
class $t {
  static fromLonLat(t, i) {
    if (!s(t)) {
      n(pt("fromLonLat", "coordinate参数不能为空"));
      return;
    }
    let e = t;
    t instanceof h && (e = t._lnglat);
    let o = s(i) ? g(i) ? new I(i) : i : new I("EPSG:3857"), _ = U.fromLonLat(e, o._projection);
    return new h(_[0], _[1]);
  }
}
const C = "OMapToken", Ft = {
  tdt: null
};
function yt(r, t) {
  window[C] || (window[C] = {}), window[C][r] = t;
}
const mt = new Proxy(Ft, {
  set: function(r, t, i, e) {
    return yt(t, i), Reflect.set(r, t, i, e);
  }
}), Et = {
  vec: [],
  img: [],
  ter: []
};
let zt = "TdtLayer", j = d(zt);
class Bt extends Y {
  constructor(i, e) {
    super("Tdt", e);
    /**
     * 图层类型
     */
    l(this, "tdtType", null);
    if (!s(mt.tdt)) {
      c(j("constructor", "缺少天地图key，请提前申明"));
      return;
    }
    if (!s(i)) {
      c(j("constructor", "缺少参数天地图图层类型"));
      return;
    }
    this.tdtType = i, this._layer = new V.Tile({
      source: new q.XYZ({
        urls: Et[this.tdtType]
      })
    }), this._initLayerEvent();
  }
}
export {
  bt as Color,
  z as Extent,
  Ct as GaodeLayer,
  h as Lnglat,
  wt as Map,
  mt as MapToken,
  It as Pixel,
  $t as ProjUtil,
  I as Projection,
  At as Size,
  Bt as TdtLayer
};
