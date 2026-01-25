(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("ol"), require("ol/layer"), require("ol/source"), require("ol/proj"), require("ol/interaction"), require("ol/util"), require("ol/Feature"), require("ol/Overlay"), require("ol/geom"), require("ol/style"), require("ol/render/Feature"), require("ol/coordinate"), require("ol/sphere"), require("ol/interaction/Draw"), require("ol/tilegrid"), require("ol/format"), require("ol/control"), require("ol/easing"), require("ol/events/Target"), require("ol/events"), require("ol/extent"), require("ol/Observable")) : typeof define === "function" && define.amd ? define(["exports", "ol", "ol/layer", "ol/source", "ol/proj", "ol/interaction", "ol/util", "ol/Feature", "ol/Overlay", "ol/geom", "ol/style", "ol/render/Feature", "ol/coordinate", "ol/sphere", "ol/interaction/Draw", "ol/tilegrid", "ol/format", "ol/control", "ol/easing", "ol/events/Target", "ol/events", "ol/extent", "ol/Observable"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.OMap = {}, global.ol, global.ol.layer, global.ol.source, global.ol.proj, global.ol.interaction, global.ol.util, global.ol.Feature, global.ol.Overlay, global.ol.geom, global.ol.style, global.ol.render.Feature, global.ol.coordinate, global.ol.sphere, global.ol.interaction.Draw, global.ol.tilegrid, global.ol.format, global.ol.control, global.ol.easing, global.ol.events.Target, global.ol.events, global.ol.extent, global.ol.Observable));
})(this, function(exports2, OlPackage, OlLayer, OlSource, OlProj, OlInteraction, OlUtil, OlFeature, OlOverlay, OlGeometry, OlStyle, Feature, coordinate, OlSphere, Draw$1, OlTileGrid, OlFormat, OlControl, OlEasing, Target, events, OlExtent, OlObservable) {
  "use strict";var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (e) {
      for (const k in e) {
        if (k !== "default") {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }
  const OlPackage__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlPackage);
  const OlLayer__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlLayer);
  const OlSource__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlSource);
  const OlProj__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlProj);
  const OlInteraction__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlInteraction);
  const OlUtil__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlUtil);
  const OlGeometry__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlGeometry);
  const OlStyle__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlStyle);
  const OlSphere__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlSphere);
  const OlTileGrid__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlTileGrid);
  const OlFormat__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlFormat);
  const OlControl__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlControl);
  const OlEasing__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlEasing);
  const OlExtent__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlExtent);
  const OlObservable__namespace = /* @__PURE__ */ _interopNamespaceDefault(OlObservable);
  function isDefined(value) {
    return value !== void 0 && value !== null;
  }
  function defaultValue(value, defaultValue2) {
    return isDefined(value) ? value : defaultValue2;
  }
  function warn_(message) {
    console.warn("omap warn", message);
  }
  function error_(message) {
    throw new Error(`omap error ${message}`);
  }
  function getPackageMessage(packageName) {
    return (methodName, message) => {
      return `📦${packageName}【${methodName}】: ${message}`;
    };
  }
  function paramsNotDefined(paramsName) {
    return `参数${paramsName}不能为空`;
  }
  function paramsListHaveNotDefined(...paramsName) {
    return `参数${paramsName.join("、")}均不能为空`;
  }
  function paramsInvaildFormat(paramsName, format) {
    return `参数${paramsName}格式错误` + (format ? `，正确格式为${format}` : "");
  }
  function paramsInvaildEnum(paramsName, enums) {
    return `参数${paramsName}不在合法枚举值内`;
  }
  function paramsListInvaildFormat(...paramsName) {
    return `参数${paramsName.join("、")}格式错误`;
  }
  function haveInvaildDataItem(paramsName) {
    return `参数${paramsName}中存在无效数据，已过滤`;
  }
  const commonMessage = {
    paramsNotDefined,
    paramsListHaveNotDefined,
    paramsInvaildFormat,
    paramsInvaildEnum,
    paramsListInvaildFormat,
    haveInvaildDataItem
  };
  const COLOR_RGB_STRING_REGEX = /^rgb\(\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*,\s*(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\s*\)$/;
  function isFunction(value) {
    return typeof value === "function";
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isEmptyArray(value) {
    return Array.isArray(value) && value.length === 0;
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isEmptyString(value) {
    return value === "";
  }
  function isBoolean(value) {
    return typeof value === "boolean";
  }
  function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function isCoordinatesType(value) {
    return isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1]);
  }
  function isExtentType(value) {
    return isArray(value) && value.length === 4 && isNumber(value[0]) && isNumber(value[1]) && isNumber(value[2]) && isNumber(value[3]);
  }
  function isVaildColorRGB(value) {
    return isArray(value) && value.length === 3 && value.every((item) => isNumber(item) && item >= 0 && item <= 255);
  }
  function isVaildColorRGBString(value) {
    return isString(value) && COLOR_RGB_STRING_REGEX.test(value);
  }
  function isVaildOpacity(value) {
    return isNumber(value) && value >= 0 && value <= 1;
  }
  function isVaildColorHex(value) {
    let _value = value.replace("#", "");
    return isString(value) && value.startsWith("#") && (_value.length === 6 || _value.length === 3);
  }
  function isVaildColorHexWithAlpha(value) {
    let _value = value.replace("#", "");
    return isString(value) && value.startsWith("#") && _value.length === 8;
  }
  function isAllNumberArray(value) {
    const isAllNumber = value.every((v) => isNumber(v));
    return isArray(value) && isAllNumber;
  }
  function ColorhexToRGB(hex) {
    if (hex.charAt(0) !== "#") {
      console.error("Hex color code must start with #");
      return [0, 0, 0];
    }
    hex = hex.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    } else if (hex.length !== 6) {
      console.error("Hex color code must be 3 or 6 characters long");
      return [0, 0, 0];
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }
  function extractRGBValues(rgbString) {
    const regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
    const match = rgbString.match(regex);
    if (match) {
      return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    } else {
      throw new Error("Invalid RGB format");
    }
  }
  function extractRGBAValues(rgbString) {
    const regex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/;
    const match = rgbString.match(regex);
    if (match) {
      return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
    } else {
      throw new Error("Invalid RGB format");
    }
  }
  function opacityHexToNumber(opacityHex) {
    return (parseInt(opacityHex, 16) / 255).toPrecision(2);
  }
  function getCurrentDateTime() {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  }
  function getDevicePixelRatio() {
    return defaultValue(window.devicePixelRatio, 1);
  }
  const PACKAGE_NAME$D = "Size";
  const createMessage$D = getPackageMessage(PACKAGE_NAME$D);
  class Size {
    constructor(...args) {
      /**
       * @type {number[]}
       * @example [20, 15]
       * @private
       */
      __publicField(this, "_size", [0, 0]);
      let value = [0, 0];
      if (args.length === 1 && isArray(args[0])) {
        value = args[0];
      } else if (args.length === 2 && isAllNumberArray(args)) {
        value = [args[0], args[1]];
      } else {
        error_(createMessage$D("constructor", "初始化参数格式有误"));
        return;
      }
      this._size = value;
    }
    _isInitialized(method) {
      if (!isDefined(this._size)) {
        warn_(createMessage$D(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取size
     * @returns {OlSizeType | undefined} size
     */
    getSize() {
      if (!this._isInitialized("getSize")) return void 0;
      return this._size;
    }
    /**
     * 设置size
     * @param {OlSizeType} size
     */
    setSize(size) {
      if (!this._isInitialized("setSize")) return;
      if (!isNumber(size[0]) || !isNumber(size[1])) {
        warn_(createMessage$D("setSize", "参数格式有误"));
        return void 0;
      }
      this._size = size;
    }
    /**
     * 获取Size的width
     * @returns {number | undefined} width
     */
    getWidth() {
      if (!this._isInitialized("getWidth")) return void 0;
      return this._size[0];
    }
    /**
     * 获取Size的height
     * @returns {number} height
     */
    getHeight() {
      if (!this._isInitialized("getHeight")) return void 0;
      return this._size[1];
    }
    /**
     * 设置Size的width
     * @param {number} width
     */
    setWidth(width) {
      if (!this._isInitialized("setWidth")) return;
      if (!isNumber(width)) {
        warn_(createMessage$D("setWidth", "参数格式有误"));
        return;
      }
      this._size[0] = width;
    }
    /**
     * 设置Size的height
     * @param {number} height
     */
    setHeight(height) {
      if (!this._isInitialized("setHeight")) return;
      if (!isNumber(height)) {
        warn_(createMessage$D("setHeight", "参数格式有误"));
        return;
      }
      this._size[1] = height;
    }
    /**
     * 判断两个尺寸是否相等
     * @param {Size} size 
     * @returns {boolean} 判断结果
     */
    equals(size) {
      if (!this._isInitialized("equals")) return;
      return this._size[0] === size._size[0] && this._size[1] === size._size[1];
    }
    /**
     * 转换为数组
     * @returns {OlSizeType | undefined} size
     */
    toArray() {
      if (!this._isInitialized("toArray")) return;
      return this._size;
    }
    /**
     * 以字符串的形式输出尺寸
     * @returns {string} sizeStr
     */
    toString() {
      if (!this._isInitialized("toString")) return "";
      return `[${this._size[0]}, ${this._size[1]}]`;
    }
  }
  const PACKAGE_NAME$C = "Pixel";
  const createMessage$C = getPackageMessage(PACKAGE_NAME$C);
  class Pixel {
    constructor(...args) {
      /**
       * @type {number[]}
       * @example [100, 200]
       * @private
       */
      __publicField(this, "_pixel", []);
      let value = [0, 0];
      if (args.length === 1 && isArray(args[0])) {
        value = args[0];
      } else if (args.length === 2 && isAllNumberArray(args)) {
        value = [args[0], args[1]];
      } else {
        error_(createMessage$C("constructor", "初始化参数格式有误"));
        return;
      }
      this._pixel = value;
    }
    _isInitialized(method) {
      if (!isDefined(this._pixel)) {
        warn_(createMessage$C(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取像素坐标
     * @returns {number[] | undefined} 像素坐标
     */
    getPixel() {
      if (!this._isInitialized("getPixel")) return void 0;
      return this._pixel;
    }
    /**
     * 设置像素坐标
     * @param {number[]} pixel 像素坐标
     */
    setPixel(pixel) {
      if (!this._isInitialized("setPixel")) return;
      if (!isNumber(pixel[0]) || !isNumber(pixel[1])) {
        warn_(createMessage$C("setPixel", "参数格式有误"));
        return;
      }
      this._pixel = pixel;
    }
    /**
     * 获取像素的 x 坐标
     * @returns {number | undefined} x 坐标
     */
    getX() {
      if (!this._isInitialized("getX")) return void 0;
      return this._pixel[0];
    }
    /**
     * 获取像素的 y 坐标
     * @returns {number | undefined} y 坐标
     */
    getY() {
      if (!this._isInitialized("getY")) return void 0;
      return this._pixel[1];
    }
    /**
     * 设置像素的 x 坐标
     * @param {number} x x 坐标
     */
    setX(x) {
      if (!this._isInitialized("setX")) return;
      if (!isNumber(x)) {
        warn_(createMessage$C("setX", "参数格式有误"));
        return;
      }
      this._pixel[0] = x;
    }
    /**
     * 设置像素的 y 坐标
     * @param {number} y y 坐标
     */
    setY(y) {
      if (!this._isInitialized("setY")) return;
      if (!isNumber(y)) {
        warn_(createMessage$C("setY", "参数格式有误"));
        return;
      }
      this._pixel[1] = y;
    }
    /**
     * 判断两个像素坐标是否相等
     * @param {Pixel} pixel 像素对象
     * @returns {boolean | undefined} 判断结果
     */
    equals(pixel) {
      if (!this._isInitialized("equals")) return void 0;
      if (!isDefined(pixel)) {
        warn_(createMessage$C("equals", "参数未正确实例化"));
        return void 0;
      }
      const otherPixel = pixel.getPixel();
      if (!otherPixel) return void 0;
      return this._pixel[0] === otherPixel[0] && this._pixel[1] === otherPixel[1];
    }
    toArray() {
      if (!this._isInitialized("toArray")) return;
      return this._pixel;
    }
    /**
     * 以字符串的形式输出像素坐标
     * @returns {string} 像素坐标字符串
     */
    toString() {
      if (!this._isInitialized("toString")) return "";
      return `[${this._pixel[0]}, ${this._pixel[1]}]`;
    }
  }
  const PACKAGE_NAME$B = "Lnglat";
  const createMessage$B = getPackageMessage(PACKAGE_NAME$B);
  class Lnglat {
    constructor(...args) {
      /**
       * 经纬度数组
       * @type {OlCoordinateType}
       * @example [119.26, 28.73]
       * @private
       */
      __publicField(this, "_lnglat", []);
      let value = [];
      if (args.length === 1 && isArray(args[0])) {
        value = args[0];
      } else if (args.length === 2 && isAllNumberArray(args)) {
        value = args;
      } else {
        error_(createMessage$B("constructor", "初始化参数格式有误"));
        return;
      }
      this._lnglat = value;
    }
    _isInitialized(method) {
      if (!isDefined(this._lnglat) || isDefined(this._lnglat) && this._lnglat.length !== 2) {
        warn_(createMessage$B(method, "经纬度未正确初始化"));
        return false;
      }
      return true;
    }
    /**
     * 设置经度
     * @param {number} lng 经度
     */
    setLng(lng) {
      if (!this._isInitialized("setLng")) return;
      if (!isNumber(lng)) {
        warn_(createMessage$B("setLng", "传入经度格式有误"));
        return;
      }
      this._lnglat[0] = lng;
    }
    /**
     * 设置纬度
     * @param {number} lat 纬度
     */
    setLat(lat) {
      if (!this._isInitialized("setLat")) return;
      if (!isNumber(lat)) {
        warn_(createMessage$B("setLat", "传入纬度格式有误"));
        return;
      }
      this._lnglat[1] = lat;
    }
    /**
     * 获取经度
     * @returns {number | undefined} 经度
     */
    getLng() {
      if (!this._isInitialized("getLng")) return void 0;
      return this._lnglat[0];
    }
    /**
     * 获取纬度
     * @returns {number | undefined} 纬度
     */
    getLat() {
      if (!this._isInitialized("getLat")) return void 0;
      return this._lnglat[1];
    }
    /**
     * 判断两个经纬度是否相等
     * @param {Lnglat} lnglat 经纬度对象
     * @returns {boolean | undefined} 判断结果
     */
    equals(lnglat) {
      if (!this._isInitialized("equals")) return void 0;
      if (!(lnglat instanceof Lnglat)) {
        warn_(createMessage$B("equals", "传入经纬度格式错误，必须为Lnglat类型"));
        return void 0;
      }
      const otherLnglat = lnglat.getLng() !== void 0 && lnglat.getLat() !== void 0 ? [lnglat.getLng(), lnglat.getLat()] : void 0;
      if (!otherLnglat) return void 0;
      return this._lnglat[0] === otherLnglat[0] && this._lnglat[1] === otherLnglat[1];
    }
    /**
     * 以数组形式输出经纬度
     * @returns {OlCoordinateType | undefined} 经纬度数组
     */
    toArray() {
      if (!this._isInitialized("toArray")) return void 0;
      return this._lnglat;
    }
    /**
     * 以字符串的形式输出经纬度
     * @param {number} place 保留的小数位数
     * @returns {string} 经纬度字符串
     */
    toString(place) {
      var _a, _b;
      if (!this._isInitialized("toString")) return "";
      if (!isCoordinatesType(this._lnglat)) {
        return "";
      }
      return `[${(_a = this._lnglat[0]) == null ? void 0 : _a.toFixed(place)}, ${(_b = this._lnglat[1]) == null ? void 0 : _b.toFixed(place)}]`;
    }
  }
  const presetsColor = {
    "aliceblue": "#F0F8FF",
    "antiquewhite": "#FAEBD7",
    "aqua": "#00FFFF",
    "aquamarine": "#7FFFD4",
    "azure": "#F0FFFF",
    "beige": "#F5F5DC",
    "bisque": "#FFE4C4",
    "black": "#000000",
    "blanchedalmond": "#FFEBCD",
    "blue": "#0000FF",
    "blueviolet": "#8A2BE2",
    "brown": "#A52A2A",
    "burlywood": "#DEB887",
    "cadetblue": "#5F9EA0",
    "chartreuse": "#7FFF00",
    "chocolate": "#D2691E",
    "coral": "#FF7F50",
    "cornflowerblue": "#6495ED",
    "cornsilk": "#FFF8DC",
    "crimson": "#DC143C",
    "cyan": "#00FFFF",
    "darkblue": "#00008B",
    "darkcyan": "#008B8B",
    "darkgoldenrod": "#B8860B",
    "darkgray": "#A9A9A9",
    "darkgreen": "#006400",
    "darkkhaki": "#BDB76B",
    "darkmagenta": "#8B008B",
    "darkolivegreen": "#556B2F",
    "darkorange": "#FF8C00",
    "darkorchid": "#9932CC",
    "darkred": "#8B0000",
    "darksalmon": "#E9967A",
    "darkseagreen": "#8FBC8F",
    "darkslateblue": "#483D8B",
    "darkslategray": "#2F4F4F",
    "darkturquoise": "#00CED1",
    "darkviolet": "#9400D3",
    "deeppink": "#FF1493",
    "deepskyblue": "#00BFFF",
    "dimgray": "#696969",
    "dodgerblue": "#1E90FF",
    "firebrick": "#B22222",
    "floralwhite": "#FFFAF0",
    "forestgreen": "#228B22",
    "fuchsia": "#FF00FF",
    "gainsboro": "#DCDCDC",
    "ghostwhite": "#F8F8FF",
    "gold": "#FFD700",
    "goldenrod": "#DAA520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#ADFF2F",
    "honeydew": "#F0FFF0",
    "hotpink": "#FF69B4",
    "indianred": "#CD5C5C",
    "indigo": "#4B0082",
    "ivory": "#FFFFF0",
    "khaki": "#F0E68C",
    "lavender": "#E6E6FA",
    "lavenderblush": "#FFF0F5",
    "lawngreen": "#7CFC00",
    "lemonchiffon": "#FFFACD",
    "lightblue": "#ADD8E6",
    "lightcoral": "#F08080",
    "lightcyan": "#E0FFFF",
    "lightgoldenrodyellow": "#FAFAD2",
    "lightgray": "#D3D3D3",
    "lightgreen": "#90EE90",
    "lightpink": "#FFB6C1",
    "lightsalmon": "#FFA07A",
    "lightseagreen": "#20B2AA",
    "lightskyblue": "#87CEFA",
    "lightslategray": "#778899",
    "lightsteelblue": "#B0C4DE",
    "lightyellow": "#FFFFE0",
    "lime": "#00FF00",
    "limegreen": "#32CD32",
    "linen": "#FAF0E6",
    "magenta": "#FF00FF",
    "maroon": "#800000",
    "mediumaquamarine": "#66CDAA",
    "mediumblue": "#0000CD",
    "mediumorchid": "#BA55D3",
    "mediumpurple": "#9370DB",
    "mediumseagreen": "#3CB371",
    "mediumslateblue": "#7B68EE",
    "mediumspringgreen": "#00FA9A",
    "mediumturquoise": "#48D1CC",
    "mediumvioletred": "#C71585",
    "midnightblue": "#191970",
    "mintcream": "#F5FFFA",
    "mistyrose": "#FFE4E1",
    "moccasin": "#FFE4B5",
    "navajowhite": "#FFDEAD",
    "navy": "#000080",
    "oldlace": "#FDF5E6",
    "olive": "#808000",
    "olivedrab": "#6B8E23",
    "orange": "#FFA500",
    "orangered": "#FF4500",
    "orchid": "#DA70D6",
    "palegoldenrod": "#EEE8AA",
    "palegreen": "#98FB98",
    "paleturquoise": "#AFEEEE",
    "palevioletred": "#DB7093",
    "papayawhip": "#FFEFD5",
    "peachpuff": "#FFDAB9",
    "peru": "#CD853F",
    "pink": "#FFC0CB",
    "plum": "#DDA0DD",
    "powderblue": "#B0E0E6",
    "purple": "#800080",
    "red": "#FF0000",
    "rosybrown": "#BC8F8F",
    "royalblue": "#4169E1",
    "saddlebrown": "#8B4513",
    "salmon": "#FA8072",
    "sandybrown": "#F4A460",
    "seagreen": "#2E8B57",
    "seashell": "#FFF5EE",
    "sienna": "#A0522D",
    "silver": "#C0C0C0",
    "skyblue": "#87CEEB",
    "slateblue": "#6A5ACD",
    "slategray": "#708090",
    "snow": "#FFFAFA",
    "springgreen": "#00FF7F",
    "steelblue": "#4682B4",
    "tan": "#D2B48C",
    "teal": "#008080",
    "thistle": "#D8BFD8",
    "tomato": "#FF6347",
    "turquoise": "#40E0D0",
    "violet": "#EE82EE",
    "wheat": "#F5DEB3",
    "white": "#FFFFFF",
    "whitesmoke": "#F5F5F5",
    "yellow": "#FFFF00",
    "yellowgreen": "#9ACD32"
  };
  const PACKAGE_NAME$A = "Color";
  const createMessage$A = getPackageMessage(PACKAGE_NAME$A);
  class Color {
    constructor(color) {
      /**
       * 颜色值
       * 所有的颜色值均以string的格式输出
       * @type {string}
       */
      __publicField(this, "_color", "");
      this._initColor(color);
    }
    /**
     * 初始化颜色
     * @param {ColorType} color 颜色
     */
    _initColor(color) {
      const errorHandler = () => {
        error_(createMessage$A("constructor", "初始化参数有误"));
      };
      if (isArray(color)) {
        let _colorArr = color;
        if (_colorArr.length === 3) {
          if (!isVaildColorRGB(color)) {
            errorHandler();
            return;
          }
          this._color = `rgb(${_colorArr[0]}, ${_colorArr[1]}, ${_colorArr[2]})`;
        } else if (_colorArr.length === 4) {
          if (!isVaildColorRGB(_colorArr.slice(0, 3)) || !isVaildOpacity(_colorArr[3])) {
            errorHandler();
            return;
          }
          this._color = `rgba(${_colorArr[0]}, ${_colorArr[1]}, ${_colorArr[2]}, ${_colorArr[3]})`;
        } else if (_colorArr.length === 2) {
          if (!isVaildColorHex(_colorArr[0]) || !isVaildOpacity(_colorArr[1])) {
            errorHandler();
            return;
          }
          let colorRGB = ColorhexToRGB(color[0]);
          if (!isDefined(colorRGB)) {
            errorHandler();
            return;
          }
          this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${_colorArr[1]})`;
        } else {
          errorHandler();
          return;
        }
      }
      if (isObject(color)) {
        let _colorObj = color;
        if (!isDefined(_colorObj.color) && !(isDefined(_colorObj.r) && isDefined(_colorObj.g) && isDefined(_colorObj.b))) {
          errorHandler();
          return;
        }
        if (isDefined(_colorObj.color)) {
          if (isVaildColorHex(_colorObj.color)) {
            let colorRGB = ColorhexToRGB(_colorObj.color);
            if (!isDefined(colorRGB)) {
              errorHandler();
              return;
            }
            this._color = isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity) ? `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${_colorObj.alpha || _colorObj.opacity})` : `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`;
          }
          if (isVaildColorRGBString(_colorObj.color)) {
            let rgbValues = extractRGBValues(_colorObj.color).join(", ");
            this._color = isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity) ? `rgba(${rgbValues}, ${_colorObj.alpha || _colorObj.opacity})` : `rgb(${rgbValues})`;
          }
        } else if (isDefined(_colorObj.r) && isDefined(_colorObj.g) && isDefined(_colorObj.b)) {
          if (!isVaildColorRGB([_colorObj.r, _colorObj.g, _colorObj.b])) {
            errorHandler();
            return;
          }
          this._color = isDefined(_colorObj.alpha) || isDefined(_colorObj.opacity) ? `rgba(${_colorObj.r}, ${_colorObj.g}, ${_colorObj.b}, ${_colorObj.alpha || _colorObj.opacity})` : `rgb(${_colorObj.r}, ${_colorObj.g}, ${_colorObj.b})`;
        } else {
          errorHandler();
          return;
        }
      }
      if (isString(color)) {
        if (isEmptyString(color)) {
          errorHandler();
          return;
        }
        if (isVaildColorHex(color)) {
          let colorRGB = ColorhexToRGB(color);
          if (!isDefined(colorRGB)) {
            errorHandler();
            return;
          }
          this._color = `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`;
        } else if (isVaildColorHexWithAlpha(color)) {
          let colorRGB = ColorhexToRGB(color.slice(0, 7));
          if (!isDefined(colorRGB)) {
            errorHandler();
            return;
          }
          let opacity = opacityHexToNumber(color.slice(6));
          this._color = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]}, ${opacity})`;
        } else {
          this._color = color;
        }
      }
    }
    getColor() {
      return this._color;
    }
    /**
     * 设置颜色
     * @param {ColorType} color 颜色值
     */
    setColor(color) {
      this._initColor(color);
    }
    /**
     * 设置透明度
     * @param alpha {number} 透明度，范围0-1
     */
    withAlpha(alpha) {
      if (!isVaildOpacity(alpha)) {
        error_(createMessage$A("withAlpha", "透明度参数有误"));
        return;
      }
      if (this._color.startsWith("rgb") && !this._color.startsWith("rgba")) {
        this._initColor([...extractRGBValues(this._color), alpha]);
      } else if (this._color.startsWith("rgba")) {
        this._initColor([...extractRGBAValues(this._color), alpha]);
      } else {
        if (!isDefined(presetsColor[this._color])) {
          error_(createMessage$A("withAlpha", "颜色值有误"));
          return;
        }
        let colorRGB = ColorhexToRGB(presetsColor[this._color]);
        if (!isDefined(colorRGB)) {
          error_(createMessage$A("withAlpha", "颜色值有误"));
          return;
        }
        this._initColor([...colorRGB, alpha]);
      }
    }
  }
  const OlEvent = {
    listen: events.listen,
    unlistenByKey: events.unlistenByKey
  };
  function handleGetExtentValue(extent) {
    if (isDefined(extent)) {
      return extent instanceof Extent ? extent.getExtent() : extent;
    }
    return void 0;
  }
  function handleGetLnglatValue(coordinates) {
    if (isDefined(coordinates)) {
      return coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
    }
    return void 0;
  }
  const PACKAGE_NAME$z = "Extent";
  const createMessage$z = getPackageMessage(PACKAGE_NAME$z);
  class Extent {
    constructor(...args) {
      /**
       * extent数组
       * @type {OlExtentType}
       * @example [119.26, 28.73, 119.26, 28.73]
       * @private
       */
      __publicField(this, "_extent");
      let value = [];
      if (args.length === 1 && isArray(args[0])) {
        value = args[0];
      } else if (args.length === 4 && isAllNumberArray(args)) {
        value = args;
      } else {
        error_(createMessage$z("constructor", "初始化参数格式有误"));
        return;
      }
      this._extent = value;
    }
    _isInitialized(method) {
      if (!isDefined(this._extent) || this._extent.length !== 4) {
        warn_(createMessage$z(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    getExtent() {
      if (!this._isInitialized("getExtent")) return;
      return this._extent;
    }
    /**
     * 获取边界范围Extent的左上方位置
     * @return {Lnglat} 左上方位置
     */
    getTopLeft() {
      if (!this._isInitialized("getTopLeft")) return;
      return new Lnglat(...OlExtent__namespace.getTopLeft(this._extent));
    }
    /**
     * 获取边界范围Extent的右上方位置
     * @return {Lnglat} 右上方位置
     */
    getTopRight() {
      if (!this._isInitialized("getTopRight")) return;
      return new Lnglat(...OlExtent__namespace.getTopRight(this._extent));
    }
    /**
     * 获取边界范围Extent的左下角位置
     * @return {Lnglat} 左下角位置
     */
    getBottomLeft() {
      if (!this._isInitialized("getBottomLeft")) return;
      return new Lnglat(...OlExtent__namespace.getBottomLeft(this._extent));
    }
    /**
     * 获取边界范围Extent的右下角位置
     * @return {Lnglat} 右下角位置
     */
    getBottomRight() {
      if (!this._isInitialized("getBottomRight")) return;
      return new Lnglat(...OlExtent__namespace.getBottomRight(this._extent));
    }
    /**
     * 获取边界范围Extent的中心点位置
     * @return {Lnglat} 中心点位置
     */
    getCenter() {
      if (!this._isInitialized("getCenter")) return;
      return new Lnglat(...OlExtent__namespace.getCenter(this._extent));
    }
    /**
     * 获取宽度信息
     * @returns {number} 宽度
     */
    getWidth() {
      if (!this._isInitialized("getWidth")) return;
      return OlExtent__namespace.getWidth(this._extent);
    }
    /**
     * 获取高度信息
     * @returns {number} 高度
     */
    getHeight() {
      if (!this._isInitialized("getHeight")) return;
      return OlExtent__namespace.getHeight(this._extent);
    }
    getSize() {
      if (!this._isInitialized("getHeight")) return;
      return new Size(...OlExtent__namespace.getSize(this._extent));
    }
    /**
     * 以字符串的形式输出边界范围
     * @return {string} 边界范围（字符串）
     */
    toString(place) {
      if (!this._isInitialized("toString")) return void 0;
      return `[${this._extent[0].toFixed(place)}, ${this._extent[1].toFixed(place)}, ${this._extent[2].toFixed(place)}, ${this._extent[3].toFixed(place)}]`;
    }
    toArray() {
      if (!this._isInitialized("toString")) return void 0;
      return this._extent;
    }
    /**
     * 构建包含所有给定坐标的范围
     * @param {OMapCoordinateType} coordinates 坐标数组
     * @return {Extent} 边界范围
     */
    static boundingExtent(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$z("boundingExtent", "参数coordinates不能为空"));
        return;
      }
      if (!isArray(coordinates)) {
        error_(createMessage$z("boundingExtent", "参数coordinates格式错误，必须为数组"));
        return;
      }
      let vaildList = coordinates.filter((c) => {
        return c instanceof Lnglat || isCoordinatesType(c);
      });
      if (vaildList.length < coordinates.length) {
        warn_(createMessage$z("boundingExtent", "参数coordinates存在不合法格式，元素必须为Lnglat类型或者坐标数组类型"));
      }
      let positions = vaildList.map((c) => {
        return c instanceof Lnglat ? c.toArray() : c;
      });
      let _extent = OlExtent__namespace.boundingExtent(positions);
      return new Extent(..._extent);
    }
    /**
     * 判断边界范围Extent是否包含某个点
     * @param {OMapExtentType} extent 范围
     * @param {OMapCoordinateType} coordinate 位置
     * @return {boolean} 判断结果
     */
    static containsCoordinate(extent, coordinate2) {
      if (!isDefined(extent) || !isDefined(coordinate2)) return void 0;
      let _extent = handleGetExtentValue(extent);
      let _coordinate = handleGetLnglatValue(coordinate2);
      if (!isDefined(_extent) || !isDefined(_coordinate)) return void 0;
      return OlExtent__namespace.containsCoordinate(_extent, _coordinate);
    }
    /**
     * 判断是否某个范围包含另一个范围
     * @param {OMapExtentType} extent1 范围1
     * @param {OMapExtentType} extent2 范围2
     * @return 判断结果
     */
    static containsExtent(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) return;
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      if (!isDefined(_extent1) || !isDefined(_extent2)) return;
      return OlExtent__namespace.containsExtent(_extent1, _extent2);
    }
    static containsXY(extent, x, y) {
      if (!isDefined(extent) || !isDefined(x) || !isDefined(y)) return;
      let _extent = handleGetExtentValue(extent);
      if (!isDefined(_extent)) return;
      return OlExtent__namespace.containsXY(_extent, x, y);
    }
    static createEmpty() {
      return new Extent(...OlExtent__namespace.createEmpty());
    }
    static equals(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) return;
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      if (!isDefined(_extent1) || !isDefined(_extent2)) return;
      return OlExtent__namespace.equals(_extent1, _extent2);
    }
    static extend(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) return;
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      if (!isDefined(_extent1) || !isDefined(_extent2)) return;
      return new Extent(...OlExtent__namespace.extend(_extent1, _extent2));
    }
    static getArea(extent) {
      if (!isDefined(extent)) return;
      let _extent = handleGetExtentValue(extent);
      if (!isDefined(_extent)) return;
      return OlExtent__namespace.getArea(_extent);
    }
    /**
     * 确定一个范围是否与另一个范围相交
     * @param {OMapExtentType} extent1 
     * @param {OMapExtentType}extent2 
     * @returns {boolean} 判断结果
     */
    static intersects(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) return;
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      if (!isDefined(_extent1) || !isDefined(_extent2)) return;
      return OlExtent__namespace.intersects(_extent1, _extent2);
    }
    static isEmpty(extent) {
      if (!isDefined(extent)) return;
      let _extent = handleGetExtentValue(extent);
      if (!isDefined(_extent)) return;
      return OlExtent__namespace.isEmpty(_extent);
    }
  }
  function handleGetColorValue(color) {
    if (isDefined(color)) {
      return color instanceof Color ? color.getColor() : color;
    }
    return void 0;
  }
  function getOlFillSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    const { color } = options;
    if (isDefined(color)) {
      return new OlStyle__namespace.Fill({
        ...options,
        color: color instanceof Color ? color.getColor() : color
      });
    }
    return void 0;
  }
  function getOlStrokeSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    const { color } = options;
    if (isDefined(color)) {
      return new OlStyle__namespace.Stroke({
        ...options,
        color: color instanceof Color ? color.getColor() : color
      });
    }
    return void 0;
  }
  function getOlCircleSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    const { fill, stroke } = options;
    let _style = new OlStyle__namespace.Circle({
      ...options,
      fill: void 0,
      stroke: void 0
    });
    if (isDefined(fill)) {
      _style.setFill(new OlStyle__namespace.Fill({
        color: fill.color instanceof Color ? fill.color.getColor() : fill.color
      }));
    }
    if (isDefined(stroke)) {
      _style.setStroke(new OlStyle__namespace.Stroke({
        color: stroke.color instanceof Color ? stroke.color.getColor() : stroke.color
      }));
    }
    return _style;
  }
  function getOlIconSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    let _style = new OlStyle__namespace.Icon({
      ...options,
      color: options.color ? options.color instanceof Color ? options.color.getColor() : options.color : void 0,
      offset: isDefined(options.offset) ? options.offset.getPixel() : [0, 0],
      size: isDefined(options.size) ? options.size.getSize() : void 0
    });
    return _style;
  }
  function getOlRegularShapeSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    let _style = new OlStyle__namespace.RegularShape({
      ...options,
      fill: void 0,
      stroke: void 0
    });
    const { fill, stroke } = options;
    if (isDefined(fill)) {
      _style.setFill(new OlStyle__namespace.Fill({
        color: fill.color instanceof Color ? fill.color.getColor() : fill.color
      }));
    }
    if (isDefined(stroke)) {
      _style.setStroke(new OlStyle__namespace.Stroke({
        color: stroke.color instanceof Color ? stroke.color.getColor() : stroke.color
      }));
    }
    return _style;
  }
  const DEFAULT_STYLE = (feature, resolution) => {
    if (!isDefined(feature)) return void 0;
    if (feature.getType() === "Point") {
      return new Style({
        circle: {
          fill: {
            color: "red"
          },
          radius: 10
        }
      });
    } else if (feature.getType() === "LineString") {
      return new Style({
        stroke: {
          color: "red",
          width: 5
        }
      });
    } else if (feature.getType() === "Polygon" || feature.getType() === "Circle") {
      return new Style({
        stroke: {
          color: "red",
          width: 2
        },
        fill: {
          color: new Color({
            color: "#FFFFFF",
            opacity: 0.5
          })
        }
      });
    }
    return void 0;
  };
  function handleGetStyleValue(style) {
    if (isDefined(style)) {
      if (style instanceof Style) {
        return style.getStyle();
      } else if (Array.isArray(style)) {
        return style.map((item) => item.getStyle());
      } else if (isFunction(style)) {
        return void 0;
      }
    }
    return void 0;
  }
  function getOlTextSingleStyle(options) {
    if (!isDefined(options)) {
      return void 0;
    }
    let _style = new OlStyle__namespace.Text({
      ...options,
      fill: void 0,
      stroke: void 0,
      backgroundFill: void 0,
      backgroundStroke: void 0,
      scale: void 0
    });
    const { fill, scale, stroke, backgroundFill, backgroundStroke } = options;
    if (isDefined(fill)) {
      _style.setFill(new OlStyle__namespace.Fill({
        color: handleGetColorValue(fill.color)
      }));
    }
    if (isDefined(stroke)) {
      _style.setStroke(new OlStyle__namespace.Stroke({
        ...stroke,
        color: handleGetColorValue(stroke.color)
      }));
    }
    if (isDefined(backgroundFill)) {
      _style.setBackgroundFill(new OlStyle__namespace.Fill({
        color: handleGetColorValue(backgroundFill.color)
      }));
    }
    if (isDefined(backgroundStroke)) {
      _style.setBackgroundStroke(new OlStyle__namespace.Stroke({
        ...backgroundStroke,
        color: handleGetColorValue(backgroundStroke.color)
      }));
    }
    if (isDefined(scale)) {
      _style.setScale(scale instanceof Size ? scale.getSize() : scale);
    }
    return _style;
  }
  class Style {
    constructor(options) {
      __publicField(this, "_style");
      const { fill, stroke, text, circle, icon, regularShape } = options;
      let _image;
      if (circle) {
        _image = getOlCircleSingleStyle(circle);
      } else if (icon) {
        _image = getOlIconSingleStyle(icon);
      } else if (regularShape) {
        _image = getOlRegularShapeSingleStyle(regularShape);
      }
      let _params = Object.assign({}, options, {
        fill: getOlFillSingleStyle(fill),
        stroke: getOlStrokeSingleStyle(stroke),
        image: _image,
        text: getOlTextSingleStyle(text)
      });
      this._style = new OlStyle__namespace.Style(_params);
    }
    getStyle() {
      return this._style;
    }
  }
  function getConstructorName(target) {
    if (target == null) return void 0;
    const ctor = target.constructor;
    return typeof ctor === "function" ? ctor.name : void 0;
  }
  const PACKAGE_NAME$y = "Event";
  const createMessage$y = getPackageMessage(PACKAGE_NAME$y);
  class Event {
    constructor(target) {
      __publicField(this, "instanceName", "");
      __publicField(this, "localCounter", 0);
      // 本实例内的递增序号
      __publicField(this, "events", /* @__PURE__ */ new Map());
      // 记录事件类型和事件回调
      __publicField(this, "target", null);
      __publicField(this, "total", 0);
      this.events.clear();
      this.target = target;
      this.instanceName = getConstructorName(target) || "";
    }
    generateId() {
      return `${this.instanceName}-event-${++this.localCounter}`;
    }
    on(type, callback, unlisten) {
      let _typeVals = this.events.get(type) || [];
      const id = this.generateId();
      _typeVals.push({
        id,
        target: this.target,
        type,
        callback,
        unlisten
      });
      this.events.set(type, _typeVals);
      return id;
    }
    once(type, callback, unlisten) {
      const list = this.events.get(type) || [];
      const id = this.generateId();
      list.push({
        id,
        target: this.target,
        type,
        callback,
        once: true,
        unlisten
      });
      this.events.set(type, list);
      return id;
    }
    emit(type, ...args) {
      const list = this.events.get(type);
      if (!list || list.length === 0) return this;
      for (let i = 0; i < list.length; ) {
        const item = list[i];
        try {
          item.callback.call(item.target, ...args);
        } catch (e) {
          error_(createMessage$y("emit", `回调异常: ${String(e)}`));
        }
        if (item.once) {
          list.splice(i, 1);
        } else {
          i++;
        }
      }
      if (list.length === 0) this.events.delete(type);
      return this;
    }
    remove(id) {
      for (const [type, list] of this.events.entries()) {
        const idx = list.findIndex((item) => item.id === id);
        if (idx !== -1) {
          const item = list[idx];
          if (isDefined(item.unlisten) && isFunction(item.unlisten)) {
            item.unlisten();
          }
          list.splice(idx, 1);
          if (list.length === 0) this.events.delete(type);
          return this;
        }
      }
      warn_(createMessage$y("remove", `未找到【id=${id}】的监听`));
      return this;
    }
    off(type) {
      if (type === void 0) {
        for (const list of this.events.values()) {
          for (const item of list) {
            if (item.unlisten) OlEvent.unlistenByKey(item.unlisten);
          }
        }
        this.events.clear();
      } else {
        const list = this.events.get(type);
        if (list) {
          for (const item of list) {
            if (item.unlisten) OlEvent.unlistenByKey(item.unlisten);
          }
          this.events.delete(type);
        }
      }
      return this;
    }
    getEventById(id) {
      for (const list of this.events.values()) {
        const found = list.find((item) => item.id === id);
        if (found) return found;
      }
      return void 0;
    }
    get(type) {
      return this.events.get(type) || [];
    }
    listenerCount(type) {
      var _a;
      return ((_a = this.events.get(type)) == null ? void 0 : _a.length) || 0;
    }
  }
  const PopupPositioning = {
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
  function isVaildPopupPositioningType(type) {
    return Object.values(PopupPositioning).includes(type);
  }
  const DEFAULT_POPUP_PARAMS = {
    offset: new Pixel(0, 0),
    positioning: PopupPositioning.bottomCenter,
    stopEvent: true,
    insertFirst: true,
    autoPan: false,
    className: "omap-popup-element"
  };
  const OMapPupupEventTypes = [
    "change:position",
    "change:positioning",
    "change:element",
    "change:offset",
    "change:content",
    "change:properties"
  ];
  function isOMapPopupEventType(value) {
    return isString(value) && OMapPupupEventTypes.includes(value);
  }
  function createDefaultContentElement(content) {
    let div = document.createElement("div");
    div.className = "omap-popup-default-element";
    div.innerHTML = content;
    return div;
  }
  function handlePopupEvent(target, type, e) {
    const { oldValue, key, newValue } = e;
    let result = {
      target,
      type,
      key
    };
    switch (type) {
      case "change:position":
        result.oldValue = new Lnglat(oldValue[0], oldValue[1]);
        result.newValue = target.getPosition();
        break;
      case "change:positioning":
        result.oldValue = oldValue;
        result.newValue = target.getPositioning();
        break;
      case "change:element":
        result.oldValue = oldValue;
        result.newValue = target.getElement();
        break;
      case "change:offset":
        result.oldValue = new Pixel(oldValue[0], oldValue[1]);
        result.newValue = target.getOffset();
        break;
      case "change:properties":
      case "change:content":
        result.oldValue = oldValue;
        result.newValue = newValue;
        break;
    }
    return result;
  }
  const PACKAGE_NAME$x = "Popup";
  const createMessage$x = getPackageMessage(PACKAGE_NAME$x);
  class Popup {
    constructor(params) {
      __publicField(this, "_popup");
      /**
       * Popup 的唯一ID
       */
      __publicField(this, "id", null);
      /**
       * 弹窗所属地图
       */
      __publicField(this, "map", null);
      /**
       * 弹窗内容(不一定有)
       */
      __publicField(this, "content", "");
      /**
       * 弹窗属性
       */
      __publicField(this, "properties", {});
      /**
       * 事件对象
       */
      __publicField(this, "events", new Event());
      var _a;
      if (isDefined(params.id)) {
        this.id = params.id;
      }
      let _params = Object.assign({}, DEFAULT_POPUP_PARAMS, params);
      delete _params.id;
      if (isDefined(_params.content) && isString(_params.content) && !isDefined(_params.element)) {
        this.content = _params.content;
        _params.element = createDefaultContentElement(_params.content);
      }
      if (isDefined(_params.element)) {
        _params.element.classList.add("omap-popup-selectable");
      }
      this._popup = new OlOverlay({
        ..._params,
        offset: (_a = _params.offset) == null ? void 0 : _a.toArray(),
        position: isDefined(_params.position) ? _params.position instanceof Lnglat ? _params.position.toArray() : _params.position : void 0
      });
      this.events = new Event(this);
    }
    /**
     * 初始化弹窗元素事件
     * @todo 暂不需要
     */
    _initElementEvent() {
    }
    _isInitialized(method) {
      if (!isDefined(this._popup)) {
        warn_(createMessage$x(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取弹窗位置
     * @returns {Lnglat | undefined} 弹窗位置
     */
    getPosition() {
      if (!this._isInitialized("getPosition")) return;
      let coordinates = this._popup.getPosition();
      return isDefined(coordinates) ? new Lnglat(coordinates[0], coordinates[1]) : void 0;
    }
    /**
     * 设置弹窗位置
     * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
     */
    setPosition(coordinates) {
      if (!this._isInitialized("setPosition")) return;
      let _coordinates = coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
      this._popup.setPosition(_coordinates);
    }
    getPositioning() {
      if (!this._isInitialized("getPositioning")) return;
      return this._popup.getPositioning();
    }
    setPositioning(positioning) {
      if (!this._isInitialized("setPositioning")) return;
      if (!isVaildPopupPositioningType(positioning)) {
        warn_(createMessage$x("setPositioning", "参数positioning值有误"));
        return;
      }
      this._popup.setPositioning(positioning);
    }
    /**
     * 获取弹窗属性
     * @returns {Record<string, any> | undefined} 弹窗属性
     */
    getProperties() {
      if (!this._isInitialized("getProperties")) return;
      return this.properties;
    }
    /**
     * 设置弹窗属性
     * @param {Record<string, any>} properties 弹窗属性
     */
    setProperties(properties) {
      if (!this._isInitialized("setProperties")) return;
      if (!isDefined(properties)) {
        warn_(createMessage$x("setProperties", "参数不能为空"));
        return;
      }
      this.events.emit("change:properties", handlePopupEvent(this, "change:properties", {
        oldValue: this.getProperties(),
        key: "properties",
        newValue: Object.assign({}, this.properties, properties)
      }));
      this.properties = Object.assign({}, this.properties, properties);
    }
    getElement() {
      if (!this._isInitialized("getElement")) return;
      return this._popup.getElement();
    }
    setElement(element) {
      if (!this._isInitialized("getElement")) return;
      if (!isDefined(element)) return;
      element.classList.add("omap-popup-selectable");
      return this._popup.setElement(element);
    }
    getContent() {
      if (!this._isInitialized("getContent")) return "";
      return this.content;
    }
    setContent(content) {
      if (!this._isInitialized("setContent")) return;
      this.events.emit("change:content", handlePopupEvent(this, "change:content", {
        oldValue: this.getContent(),
        key: "content",
        newValue: content
      }));
      this.content = content;
      this.setElement(createDefaultContentElement(content));
    }
    getOffset() {
      if (!this._isInitialized("getOffset")) return;
      let offset = this._popup.getOffset();
      return new Pixel(offset[0], offset[1]);
    }
    setOffset(offset) {
      if (!this._isInitialized("setOffset")) return;
      let _offset = offset instanceof Pixel ? offset.toArray() : offset;
      this._popup.setOffset(_offset);
    }
    getId() {
      if (!this._isInitialized("getId")) return;
      return this.id;
    }
    setId(id) {
      this.id = id;
    }
    getPopup() {
      return this._popup;
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$x("on", commonMessage.paramsListHaveNotDefined("type or callback")));
        return;
      }
      if (!isOMapPopupEventType(type)) {
        warn_(createMessage$x("on", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$x("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._popup, type, (e) => {
        this.events.emit(type, handlePopupEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$x("on", commonMessage.paramsListHaveNotDefined("type or callback")));
        return;
      }
      if (!isOMapPopupEventType(type)) {
        warn_(createMessage$x("on", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$x("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._popup, type, (e) => {
        this.events.emit(type, handlePopupEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$x("un", commonMessage.paramsNotDefined("id")));
        return;
      }
      this.events.remove(id);
    }
    setMap(map) {
      this.map = map;
      if (isDefined(map)) {
        this._initElementEvent();
      }
    }
  }
  function handleGetSizeValue(size) {
    if (isDefined(size)) {
      return size instanceof Size ? size.toArray() : size;
    }
    return void 0;
  }
  function handleGetPixelValue(pixel) {
    if (isDefined(pixel)) {
      return pixel instanceof Pixel ? pixel.toArray() : pixel;
    }
    return void 0;
  }
  const PACKAGE_NAME$w = "Map";
  const createMessage$w = getPackageMessage(PACKAGE_NAME$w);
  class Projection {
    constructor(proj) {
      __publicField(this, "_projection", null);
      __publicField(this, "code", "");
      __publicField(this, "units", "degrees");
      let result = "";
      if (isString(proj)) {
        result = proj.startsWith("EPSG") ? proj : "EPSG:" + proj;
      } else {
        let _proj = proj;
        if (!isDefined(_proj.code)) {
          error_(createMessage$w("constructor", "初始化参数有误"));
          return;
        }
        result = _proj.code;
        result = result.startsWith("EPSG") ? result : "EPSG:" + result;
      }
      this.code = result;
      this._projection = OlProj__namespace.get(result);
      if (!isDefined(this._projection)) {
        warn_(createMessage$w("constructor", "坐标系不存在"));
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
  const layerState = /* @__PURE__ */ new WeakMap();
  let PACKAGE_NAME$v = "BaseLayer";
  let createMessage$v = getPackageMessage(PACKAGE_NAME$v);
  const DEFAULT_LAYER_OPACITY = 1;
  const DEFAULT_LAYER_VISIBLE = true;
  const DEFAULT_LAYER_MIN_ZOOM = 0;
  const DEFAULT_LAYER_MAX_ZOOM = 22;
  const DEFAULT_LAYER_MIN_RESOLUTION = 0;
  const DEFAULT_LAYER_MAX_RESOLUTION = Infinity;
  const DEFAULT_LAYER_ZINDEX = 1;
  const DEFAULT_LAYER_PROPERTIES = {};
  class BaseLayer {
    constructor(type, options) {
      /**
       * 图层类型
       */
      __publicField(this, "type", null);
      /**
       * 图层实例（ol）
       */
      __publicField(this, "_layer");
      // 底层图层对象，由子类实现具体的图层类型
      /**
       * 图层id，每个图层的唯一主键，用于区分图层
       */
      __publicField(this, "id", null);
      /**
       * 图层名称，用于显示在图层控制栏中
       */
      __publicField(this, "name", "");
      __publicField(this, "className", "");
      // 图层样式类名，用于自定义图层样式，默认无
      __publicField(this, "opacity", DEFAULT_LAYER_OPACITY);
      // 图层透明度，默认1
      __publicField(this, "visible", DEFAULT_LAYER_VISIBLE);
      // 图层是否可见，默认true
      __publicField(this, "extent", null);
      // 图层范围，默认全局
      __publicField(this, "minZoom", DEFAULT_LAYER_MIN_ZOOM);
      // 最小缩放级别，默认0
      __publicField(this, "maxZoom", DEFAULT_LAYER_MAX_ZOOM);
      // 最大缩放级别，默认22
      __publicField(this, "minResolution", DEFAULT_LAYER_MIN_RESOLUTION);
      // 最小分辨率，默认0r
      __publicField(this, "maxResolution", DEFAULT_LAYER_MAX_RESOLUTION);
      // 最大分辨率，默认Infinity
      __publicField(this, "zIndex", DEFAULT_LAYER_ZINDEX);
      // 图层层级，默认0
      __publicField(this, "properties", DEFAULT_LAYER_PROPERTIES);
      // 图层属性，用于存储图层相关信息
      /**
       * 图层所属的地图对象
       */
      __publicField(this, "map", null);
      /**
       * 图层所属的对象
       */
      __publicField(this, "target", null);
      let _options = defaultValue(options, {});
      this.type = type;
      PACKAGE_NAME$v = `${type}Layer`;
      createMessage$v = getPackageMessage(PACKAGE_NAME$v);
      this.id = defaultValue(_options.id, null);
      this.name = defaultValue(_options.name, "");
      this.className = defaultValue(_options.className, "");
      this.opacity = defaultValue(_options.opacity, DEFAULT_LAYER_OPACITY);
      this.visible = defaultValue(_options.visible, DEFAULT_LAYER_VISIBLE);
      this.extent = defaultValue(_options.extent, null);
      this.minZoom = defaultValue(_options.minZoom, DEFAULT_LAYER_MIN_ZOOM);
      this.maxZoom = defaultValue(_options.maxZoom, DEFAULT_LAYER_MAX_ZOOM);
      this.minResolution = defaultValue(_options.minResolution, DEFAULT_LAYER_MIN_RESOLUTION);
      this.maxResolution = defaultValue(_options.maxResolution, DEFAULT_LAYER_MAX_RESOLUTION);
      this.zIndex = defaultValue(_options.zIndex, DEFAULT_LAYER_ZINDEX);
      this.properties = defaultValue(_options.properties, DEFAULT_LAYER_PROPERTIES);
      this.map = defaultValue(_options.map, null);
      layerState.set(this, {
        groupId: null
      });
    }
    _isInitialized(method) {
      if (!isDefined(this._layer)) {
        warn_(createMessage$v(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    _initLayerEvent() {
      if (!this._isInitialized("_initLayerEvent")) return;
      this._layer.on([
        "propertychange"
      ], (e) => {
        if (e.key === "opacity") {
          this.opacity = this.getOpacity();
        } else if (e.key === "visible") {
          this.visible = this.getVisible();
        } else if (e.key === "extent") {
          this.extent = this.getExtent();
        } else if (e.key === "minZoom") {
          this.minZoom = this.getMinZoom();
        } else if (e.key === "maxZoom") {
          this.maxZoom = this.getMaxZoom();
        } else if (e.key === "minResolution") {
          this.minResolution = this.getMinResolution();
        } else if (e.key === "maxResolution") {
          this.maxResolution = this.getMaxResolution();
        } else if (e.key === "zIndex") {
          this.zIndex = this.getZIndex();
        }
      });
    }
    getId() {
      if (!this._isInitialized("getId")) return null;
      return this.id;
    }
    setId(id) {
      if (!this._isInitialized("setId")) return;
      this.id = id;
    }
    getLayer() {
      return this._layer;
    }
    /**
     * 获取图层数据源
     */
    getSource() {
      if (!this._isInitialized("getSource")) return void 0;
      return this._layer.getSource();
    }
    /**
     * 设置图层透明度
     * @param {number} opacity 透明度，0~1
     */
    setOpacity(opacity) {
      if (!this._isInitialized("setOpacity")) return;
      if (!isDefined(opacity)) {
        warn_(createMessage$v("setOpacity", commonMessage.paramsNotDefined("opacity")));
        return;
      }
      if (!isVaildOpacity(opacity)) {
        warn_(createMessage$v("setOpacity", commonMessage.paramsInvaildFormat("opacity", "0~1的数字")));
        return;
      }
      this._layer.setOpacity(opacity);
    }
    /**
     * 获取图层透明度
     * @returns {number} 透明度，0~1
     */
    getOpacity() {
      if (!this._isInitialized("getOpacity")) return;
      return this._layer.getOpacity();
    }
    /**
     * 设置图层可见性
     * @param {boolean} visible 可见性，true/false
     */
    setVisible(visible) {
      if (!this._isInitialized("setVisible")) return;
      if (!isDefined(visible)) {
        warn_(createMessage$v("setVisible", commonMessage.paramsNotDefined("visible")));
        return;
      }
      if (!isBoolean(visible)) {
        warn_(createMessage$v("setVisible", commonMessage.paramsInvaildFormat("visible", "boolean类型")));
        return;
      }
      this._layer.setVisible(visible);
    }
    /**
     * 获取图层可见性
     * @returns {boolean} 可见性，true/false
     */
    getVisible() {
      if (!this._isInitialized("getVisible")) return;
      return this._layer.getVisible();
    }
    /**
     * 获取图层的范围
     * @returns {Extent | undefined} 范围
     */
    getExtent() {
      if (!this._isInitialized("getExtent")) return;
      let extent = this._layer.getExtent();
      return isDefined(extent) ? new Extent(...extent) : void 0;
    }
    /**
     * 设置图层的范围
     * @param {OMapExtentType} extent 范围
     */
    setExtent(extent) {
      if (!this._isInitialized("setExtent")) return;
      if (!isDefined(extent)) {
        warn_(createMessage$v("setExtent", commonMessage.paramsNotDefined("extent")));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        warn_(createMessage$v("setExtent", commonMessage.paramsInvaildFormat("extent", "Extent类型")));
        return;
      }
      this._layer.setExtent(handleGetExtentValue(extent));
    }
    setMinZoom(minZoom) {
      if (!this._isInitialized("setMinZoom")) return;
      if (!isDefined(minZoom)) {
        warn_(createMessage$v("setMinZoom", commonMessage.paramsNotDefined("minZoom")));
        return;
      }
      if (!isNumber(minZoom)) {
        warn_(createMessage$v("setMinZoom", commonMessage.paramsInvaildFormat("minZoom", "number类型")));
        return;
      }
      this._layer.setMinZoom(minZoom);
    }
    getMinZoom() {
      if (!this._isInitialized("getMinZoom")) return;
      return this._layer.getMinZoom();
    }
    setMaxZoom(maxZoom) {
      if (!this._isInitialized("setMaxZoom")) return;
      if (!isDefined(maxZoom)) {
        warn_(createMessage$v("setMaxZoom", commonMessage.paramsNotDefined("maxZoom")));
        return;
      }
      if (!isNumber(maxZoom)) {
        warn_(createMessage$v("setMaxZoom", commonMessage.paramsInvaildFormat("maxZoom", "number类型")));
        return;
      }
      this._layer.setMaxZoom(maxZoom);
    }
    getMaxZoom() {
      if (!this._isInitialized("getMaxZoom")) return;
      return this._layer.getMaxZoom();
    }
    setMinResolution(minResolution) {
      if (!this._isInitialized("setMinResolution")) return;
      if (!isDefined(minResolution)) {
        warn_(createMessage$v("setMinResolution", commonMessage.paramsNotDefined("minResolution")));
        return;
      }
      if (!isNumber(minResolution)) {
        warn_(createMessage$v("setMinResolution", commonMessage.paramsInvaildFormat("minResolution", "number类型")));
        return;
      }
      this._layer.setMinResolution(minResolution);
    }
    getMinResolution() {
      if (!this._isInitialized("getMinResolution")) return;
      return this._layer.getMinResolution();
    }
    setMaxResolution(maxResolution) {
      if (!this._isInitialized("setMaxResolution")) return;
      if (!isDefined(maxResolution)) {
        warn_(createMessage$v("setMaxResolution", commonMessage.paramsNotDefined("maxResolution")));
        return;
      }
      if (!isNumber(maxResolution)) {
        warn_(createMessage$v("setMaxResolution", commonMessage.paramsInvaildFormat("maxResolution", "number类型")));
        return;
      }
      this._layer.setMaxResolution(maxResolution);
    }
    getMaxResolution() {
      if (!this._isInitialized("getMaxResolution")) return;
      return this._layer.getMaxResolution();
    }
    setZIndex(zIndex) {
      if (!this._isInitialized("setZIndex")) return;
      if (!isDefined(zIndex)) {
        warn_(createMessage$v("setZIndex", commonMessage.paramsNotDefined("zIndex")));
        return;
      }
      if (!isNumber(zIndex)) {
        warn_(createMessage$v("setZIndex", commonMessage.paramsInvaildFormat("zIndex", "number类型")));
        return;
      }
      this._layer.setZIndex(zIndex);
    }
    getZIndex() {
      if (!this._isInitialized("getZIndex")) return void 0;
      return this._layer.getZIndex();
    }
    setProperties(properties) {
      if (!this._isInitialized("setProperties")) return;
      if (!isDefined(properties)) {
        warn_(createMessage$v("setProperties", commonMessage.paramsNotDefined("properties")));
        return;
      }
      if (isObject(properties)) {
        warn_(createMessage$v("setProperties", commonMessage.paramsInvaildFormat("properties", "object类型")));
        return;
      }
      let oldProperties = this.getProperties() || {};
      let newProperties = Object.assign({}, oldProperties, properties);
      this._layer.setProperties(newProperties);
      this.properties = newProperties;
    }
    getProperties() {
      if (!this._isInitialized("getProperties")) return;
      return this._layer.getProperties();
    }
    /**
     * 设置图层当前的对象
     * @param {Map | Draw | Modify | Measure} target 图层所属的对象
     */
    setTarget(target) {
      this.target = target;
    }
    /**
     * 获取图层当前的对象
     * @returns {Map | Draw | Modify | Measure | null} 图层所属的对象
     */
    getTarget() {
      if (!this._isInitialized("getProperties")) return;
      return this.target;
    }
    get groupId() {
      var _a;
      return ((_a = layerState.get(this)) == null ? void 0 : _a.groupId) || null;
    }
    getGroupId() {
      return this.groupId;
    }
  }
  const PACKAGE_NAME$u = "BasicFeature";
  const createMessage$u = getPackageMessage(PACKAGE_NAME$u);
  class BasicFeature {
    constructor(type, coordinatesOrFeature, radius) {
      __publicField(this, "id");
      __publicField(this, "type");
      __publicField(this, "_feature");
      __publicField(this, "_geometry");
      this.type = type;
      if (coordinatesOrFeature instanceof OlFeature) {
        this._initByFeature(coordinatesOrFeature);
      } else {
        this._init(coordinatesOrFeature, radius);
      }
    }
    getFeature() {
      if (!this._isInitialized("getFeature")) return;
      return this._feature;
    }
    getGeometry() {
      return this._geometry;
    }
    getProperties() {
      if (!this._isInitialized("getProperties")) return;
      return this._feature.getProperties();
    }
    setProperties(properties) {
      if (!this._isInitialized("setProperties")) return;
      if (!isDefined(properties)) {
        warn_(createMessage$u("setProperties", "参数不能为空"));
        return;
      }
      if (!isObject(properties)) {
        warn_(createMessage$u("setProperties", "参数应为对象类型"));
        return;
      }
      this._feature.setProperties(properties || {});
    }
    setId(id) {
      if (!this._isInitialized("setId")) return;
      if (!isDefined(id)) {
        warn_(createMessage$u("setId", "参数id不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$u("setId", "参数id格式有误"));
        return;
      }
      this.id = id;
    }
    getId() {
      if (!this._isInitialized("getId")) return;
      return this.id;
    }
    getType() {
      return this.type;
    }
  }
  const PACKAGE_NAME$t = "Interaction";
  const createMessage$t = getPackageMessage(PACKAGE_NAME$t);
  class Interaction {
    constructor(type) {
      /**
       * 交互实例id
       */
      __publicField(this, "id", null);
      /**
       * 交互类型
       * @type {OMapInteractionType | null}
       */
      __publicField(this, "type", null);
      /**
       * 交互实例
       * @type {OlInteractionInstanceType}
       */
      __publicField(this, "_interaction");
      /**
       * 交互所需要的图层
       * @type {VectorLayer} layer
       */
      __publicField(this, "layer", null);
      /**
       * 交互属性
       * @type {Record<string, any>} 
       */
      __publicField(this, "properties", {});
      /**
       * 交互是否激活
       * @param type 
       */
      __publicField(this, "active", false);
      /**
       * 交互事件
       * @type {Event}
       */
      __publicField(this, "events", new Event());
      __publicField(this, "map", null);
      this.type = type;
      this.events = new Event(this);
    }
    initInteractionEvent() {
      if (!this._isInitialized("initInteractionEvent")) return;
      this._interaction.on("change:active", (e) => {
        if (e.type === "change:active") {
          this.active = this.getActive();
        }
      });
    }
    _isInitialized(method) {
      if (!isDefined(this._interaction)) {
        warn_(createMessage$t(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    _initInteractionId(id) {
      if (!isDefined(id)) return;
      this.id = id;
    }
    /**
     * 返回当前交互是否处于激活状态
     * @returns 激活状态
     */
    getActive() {
      if (!this._isInitialized("getActive")) return;
      return this._interaction.getActive();
    }
    /**
     * 设置当前交互是否处于激活状态
     * @param active 激活状态
     */
    setActive(active) {
      if (!this._isInitialized("setActive")) return;
      this._interaction.setActive(active);
    }
    /**
     * 获取交互实例
     * @returns 
     */
    getInteraction() {
      if (!this._isInitialized("getInteraction")) return;
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
    setProperties(properties) {
      if (!this._isInitialized("getInteraction")) return;
      this._interaction.setProperties(properties);
      this.properties = properties;
    }
    /**
     * 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。
     * @returns {number | undefined} 指针数
     */
    // getPointerCount(): number | undefined {
    //     if (!this._isInitialized('getInteraction')) return;
    //     return this._interaction.getPointerCount()
    // }
    getLayer() {
      if (!this._isInitialized("getInteraction")) return;
      return this.layer;
    }
    setMap(map) {
      this.map = map;
    }
    /**
     * 关闭交互(但是不移除图层)
     */
    close() {
      this.destroy();
    }
    /**
     * 清空交互图层
     */
    clear() {
      const layer = this.getLayer();
      if (isDefined(layer)) {
        layer.clear();
      }
    }
    /**
     * 销毁交互(包括交互的图层)
     */
    destroy() {
      if (!this._isInitialized("destroy")) return;
      if (isDefined(this.map)) {
        this.map.removeInteraction(this);
      }
    }
    /**
     * 移除交互图层
     */
    _removeInteractionLayer() {
      const layer = this.getLayer();
      if (isDefined(layer) && isDefined(this.map)) {
        this.map.removeLayer(layer);
      }
    }
  }
  const PACKAGE_NAME$s = "Point";
  const createMessage$s = getPackageMessage(PACKAGE_NAME$s);
  class Point extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$s("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("Point", coordinatesOrFeature);
      } else {
        if (!(coordinatesOrFeature instanceof Lnglat) && !isCoordinatesType(coordinatesOrFeature)) {
          error_(createMessage$s("constructor", "坐标格式有误"));
          return;
        }
        super("Point", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = handleGetLnglatValue(coordinates);
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.Point(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$s(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取点的坐标
     * @returns {Lnglat} 点的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    /**
     * 设置点的坐标
     * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
     * @returns {void}
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$s("setCoordinates", "参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        error_(createMessage$s("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
      this._geometry.setCoordinates(_coordinates);
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
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$s("intersectsExtent", "参数extent不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        error_(createMessage$s("intersectsExtent", "坐标格式有误"));
        return;
      }
      let _extent = extent instanceof Extent ? extent.getExtent() : extent;
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function checkLineStringCoordinates(coordinates) {
    let result = true;
    if (!isArray(coordinates)) {
      result = false;
    }
    let isInVaildItem = coordinates.some((c) => {
      return !(c instanceof Lnglat) && !isCoordinatesType(c);
    });
    if (isInVaildItem) {
      result = false;
    }
    return result;
  }
  const PACKAGE_NAME$r = "LineString";
  const createMessage$r = getPackageMessage(PACKAGE_NAME$r);
  class LineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$r("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("LineString", coordinatesOrFeature);
      } else {
        if (!checkLineStringCoordinates(coordinatesOrFeature)) {
          error_(createMessage$r("constructor", "坐标格式有误"));
          return;
        }
        super("LineString", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.LineString(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$r(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取线的坐标
     * @returns {Lnglat[]} 线的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      return coordinates.map((c) => {
        return new Lnglat(c[0], c[1]);
      });
    }
    /**
     * 设置线的坐标
     * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
     * @returns {void}
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$r("setCoordinates", "参数不能为空"));
        return;
      }
      if (!checkLineStringCoordinates(coordinates)) {
        error_(createMessage$r("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c instanceof Lnglat ? c.toArray() : c;
      });
      this._geometry.setCoordinates(_coordinates);
    }
    /**
     * 追加坐标
     * @param {Lnglat | OlCoordinateType} coordinates 坐标
     * @returns 
     */
    appendCoordinate(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$r("setCoordinates", "参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        error_(createMessage$r("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
      this._geometry.appendCoordinate(_coordinates);
    }
    /**
     * 获取线的第一个坐标
     * @returns {Lnglat} 线的第一个坐标
     */
    getFirstCoordinate() {
      let coordinates = this._geometry.getFirstCoordinate();
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    /**
     * 获取线的最后一个坐标
     * @returns {Lnglat} 线的最后一个坐标
     */
    getLastCoordinate() {
      let coordinates = this._geometry.getLastCoordinate();
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    /**
     * 获取线的范围
     * @returns {Extent} 线的范围
     */
    getExtent() {
      let extent = this._geometry.getExtent();
      return new Extent(extent[0], extent[1], extent[2], extent[3]);
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
    getCoordinateAt(fraction, dest) {
      if (!isDefined(fraction)) {
        error_(createMessage$r("getCoordinateAt", "参数不能为空"));
        return;
      }
      if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
        error_(createMessage$r("getCoordinateAt", "参数格式有误"));
        return;
      }
      let result = [];
      let coordinates = this._geometry.getCoordinateAt(fraction, result);
      if (isDefined(dest)) {
        if (dest instanceof Lnglat) {
          dest.setLng(result[0]);
          dest.setLat(result[1]);
        } else {
          dest[0] = result[0];
          dest[1] = result[1];
        }
      }
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    getCoordinateAtM() {
      return null;
    }
    translate(deltaX = 0, deltaY = 0) {
      this._geometry.translate(deltaX, deltaY);
    }
    transform() {
    }
    simplify(tolerance = 0) {
      this._geometry.simplify(tolerance);
    }
    intersectsCoordinate() {
    }
    /**
     * 线是否在extent范围内
     * @param {Extent | OlExtentType} extent 
     * @returns {boolean | undefined}
     */
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$r("intersectsExtent", "参数extent不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        error_(createMessage$r("intersectsExtent", "坐标格式有误"));
        return;
      }
      let _extent = extent instanceof Extent ? extent.getExtent() : extent;
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function checkPolygonCoordinates(coordinates) {
    let result = true;
    if (!isArray(coordinates)) {
      result = false;
    }
    let isInVaildItem = coordinates.some((c) => !isArray(c));
    if (isInVaildItem) {
      result = false;
    }
    coordinates.forEach((c) => {
      c.forEach((c2) => {
        if (!(c2 instanceof Lnglat) && !isCoordinatesType(c2)) {
          result = false;
        }
      });
    });
    return result;
  }
  function checkLinearRingCoordinates(coordinates) {
    let result = true;
    if (!isArray(coordinates)) {
      result = false;
    }
    let isInVaildItem = coordinates.some((c) => {
      return !(c instanceof Lnglat) && !isCoordinatesType(c);
    });
    if (isInVaildItem) {
      result = false;
    }
    return result;
  }
  const PACKAGE_NAME$q = "LinearRing";
  const createMessage$q = getPackageMessage(PACKAGE_NAME$q);
  class LinearRing extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$q("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("LinearRing", coordinatesOrFeature);
      } else {
        if (!checkLinearRingCoordinates(coordinatesOrFeature)) {
          error_(createMessage$q("constructor", "坐标格式有误"));
          return;
        }
        super("LinearRing", coordinatesOrFeature);
        if (properties) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.LinearRing(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$q(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取LinearRing的坐标
     * @returns {Array<Lnglat>} LinearRing的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return new Lnglat(c[0], c[1]);
      });
      return _coordinates;
    }
    /**
     * 设置LinearRing的坐标
     * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$q("setCoordinates", "参数不能为空"));
        return;
      }
      if (!checkLinearRingCoordinates(coordinates)) {
        error_(createMessage$q("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c instanceof Lnglat ? c.toArray() : c;
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  const PACKAGE_NAME$p = "Polygon";
  const createMessage$p = getPackageMessage(PACKAGE_NAME$p);
  class Polygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$p("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("Polygon", coordinatesOrFeature);
      } else {
        if (!checkPolygonCoordinates(coordinatesOrFeature)) {
          error_(createMessage$p("constructor", "坐标格式有误"));
          return;
        }
        super("Polygon", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return handleGetLnglatValue(c2);
        });
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.Polygon(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$p(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取多边形的坐标
     * @param {boolean | undefined} rightHanded 是否右手坐标系
     * @returns {Array<Array<Lnglat>>} 多边形的坐标
     */
    getCoordinates(rightHanded = void 0) {
      let coordinates = this._geometry.getCoordinates(rightHanded);
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return new Lnglat(c2[0], c2[1]);
        });
      });
      return _coordinates;
    }
    /**
     * 设置多边形的坐标
     * @param {OMapPolygonGeometryCoordinatesType} coordinates 多边形的坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$p("setCoordinates", "参数不能为空"));
        return;
      }
      if (!checkPolygonCoordinates(coordinates)) {
        error_(createMessage$p("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2 instanceof Lnglat ? c2.toArray() : c2;
        });
      });
      this._geometry.setCoordinates(_coordinates);
    }
    /**
     * 向Polygon中添加LinearRing（内环）
     * @param {LinearRing | OMapLinearRingGeometryCoordinatesType} linearRing 内环
     */
    appendLinearRing(linearRingParams) {
      if (!isDefined(linearRingParams)) {
        error_(createMessage$p("appendLinearRing", "linearRing参数不能为空"));
        return;
      }
      if (!(linearRingParams instanceof LinearRing) && !checkLinearRingCoordinates(linearRingParams)) {
        error_(createMessage$p("appendLinearRing", "linearRing参数格式有误"));
        return;
      }
      if (linearRingParams instanceof LinearRing) {
        this._geometry.appendLinearRing(linearRingParams._geometry);
      } else {
        let coordinates = linearRingParams.map((l) => {
          return l instanceof Lnglat ? l.toArray() : l;
        });
        this._geometry.appendLinearRing(new LinearRing(coordinates)._geometry);
      }
    }
    /**
     * 获取多边形的第一个坐标（包含内环）
     * @returns {Lnglat} 多边形的第一个坐标
     */
    getFirstCoordinate() {
      let coordinates = this._geometry.getFirstCoordinate();
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    /**
     * 获取多边形的最后一个坐标（包含内环）
     * @returns {Lnglat} 多边形的最后一个坐标
     */
    getLastCoordinate() {
      let coordinates = this._geometry.getLastCoordinate();
      return new Lnglat(coordinates[0], coordinates[1]);
    }
    /**
     * 获取多边形的范围
     * @returns {Extent} 多边形的范围
     */
    getExtent() {
      let extent = this._geometry.getExtent();
      return new Extent(extent[0], extent[1], extent[2], extent[3]);
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
    getClosestPoint(point, closestPoint) {
      let coordinates = point instanceof Lnglat ? point.toArray() : point;
      let result = this._geometry.getClosestPoint(coordinates);
      let _result = new Lnglat(result[0], result[1]);
      return _result;
    }
    /**
     * 返回多边形的内点
     * @returns {Point} 多边形的内点
     */
    getInteriorPoint() {
      let result = this._geometry.getInteriorPoint().getCoordinates();
      return new Point(result);
    }
    /**
     * 如果该几何形状包含指定的坐标，则返回 true。如果坐标位于几何形状的边界上，则返回 false。
     * @param {Lnglat | OlCoordinateType} coordinates 
     * @returns {boolean | undefined}
     */
    intersectsCoordinate(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$p("intersectsCoordinate", "参数coordinates不能为空"));
        return;
      }
      let _coordinates = coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
      return this._geometry.intersectsCoordinate(_coordinates);
    }
    /**
     * 线是否在extent范围内
     * @param {OMapExtentType} extent 
     * @returns {boolean | undefined}
     */
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$p("intersectsExtent", "参数extent不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        error_(createMessage$p("intersectsExtent", "坐标格式有误"));
        return;
      }
      let _extent = extent instanceof Extent ? extent.getExtent() : extent;
      return this._geometry.intersectsExtent(_extent);
    }
    simplify(tolerance = 0) {
      this._geometry.simplify(tolerance);
    }
    transform() {
    }
    translate(deltaX = 0, deltaY = 0) {
      this._geometry.translate(deltaX, deltaY);
    }
  }
  function isVaildConrdinates(coordinates) {
    let isHaveInVaildItem = coordinates.some((item) => {
      return !(item instanceof Lnglat) && !isCoordinatesType(item);
    });
    return isArray(coordinates) && !isHaveInVaildItem;
  }
  const PACKAGE_NAME$o = "MultiPoint";
  const createMessage$o = getPackageMessage(PACKAGE_NAME$o);
  class MultiPoint extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$o("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiPoint", coordinatesOrFeature);
      } else {
        if (!isVaildConrdinates(coordinatesOrFeature)) {
          error_(createMessage$o("constructor", "坐标格式有误"));
          return;
        }
        super("MultiPoint", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.MultiPoint(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$o(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取点的坐标
     * @returns {Lnglat[]} 点的坐标
     */
    getCoordinates() {
      if (!this._isInitialized("getCoordinates")) return;
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return new Lnglat(...c);
      });
      return _coordinates;
    }
    /**
     * 设置点的坐标
     * @param {OMapMultiPointGeometryCoordinatesType} coordinates 点的坐标
     */
    setCoordinates(coordinates) {
      if (!this._isInitialized("setCoordinates")) return;
      if (!isDefined(coordinates)) {
        error_(createMessage$o("setCoordinates", "参数不能为空"));
        return;
      }
      if (!isVaildConrdinates(coordinates)) {
        error_(createMessage$o("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c instanceof Lnglat ? c.toArray() : c;
      });
      this._geometry.setCoordinates(_coordinates);
    }
    appendPoint(pointOrpointCoordinates) {
      if (!this._isInitialized("appendPoint")) return;
      if (!isDefined(pointOrpointCoordinates)) return;
      let _point = null;
      if (pointOrpointCoordinates instanceof Point) {
        _point = pointOrpointCoordinates.getGeometry();
      } else if (pointOrpointCoordinates instanceof Lnglat) {
        _point = new OlGeometry__namespace.Point(pointOrpointCoordinates.toArray());
      } else if (isCoordinatesType(pointOrpointCoordinates)) {
        _point = new OlGeometry__namespace.Point(pointOrpointCoordinates);
      }
      if (!isDefined(_point)) {
        error_(createMessage$o("appendPoint", "参数格式有误"));
        return;
      }
      this._geometry.appendPoint(_point);
    }
    getClosestPoint(pointOrpointCoordinates) {
      if (!this._isInitialized("getClosestPoint")) return;
      if (!isDefined(pointOrpointCoordinates)) return;
      let _point = null;
      if (pointOrpointCoordinates instanceof Point) {
        _point = pointOrpointCoordinates.getCoordinates().toArray();
      } else if (pointOrpointCoordinates instanceof Lnglat) {
        _point = pointOrpointCoordinates.toArray();
      } else if (isCoordinatesType(pointOrpointCoordinates)) {
        _point = pointOrpointCoordinates;
      }
      if (!isDefined(_point)) return;
      let _closestPoint = this._geometry.getClosestPoint(_point);
      return new Lnglat(..._closestPoint);
    }
    getExtent() {
      if (!this._isInitialized("getExtent")) return;
      return new Extent(...this._geometry.getExtent());
    }
    getFirstCoordinate() {
      if (!this._isInitialized("getFirstCoordinate")) return;
      return new Lnglat(...this._geometry.getFirstCoordinate());
    }
    getLastCoordinate() {
      if (!this._isInitialized("getLastCoordinate")) return;
      return new Lnglat(...this._geometry.getLastCoordinate());
    }
    getPoint(index) {
      if (!this._isInitialized("getPoint")) return;
      if (!isDefined(index)) return;
      if (!isNumber(index)) {
        warn_(createMessage$o("getPoint", "参数index格式有误"));
        return;
      }
      let point = this._geometry.getPoint(index);
      return new Point(point.getCoordinates());
    }
    intersectsCoordinate(coordinate2) {
      if (!this._isInitialized("intersectsCoordinate")) return;
      if (!isDefined(coordinate2)) return;
      let _coordinate = handleGetLnglatValue(coordinate2);
      if (!isDefined(_coordinate)) return;
      return this._geometry.intersectsCoordinate(_coordinate);
    }
    intersectsExtent(extent) {
      if (!this._isInitialized("intersectsExtent")) return;
      if (!isDefined(extent)) return;
      let _extent = handleGetExtentValue(extent);
      if (!isDefined(_extent)) return;
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function checkMultiLineStringCoordinates(coordinates) {
    let isHaveInVaildItem = coordinates.some((item) => {
      return !isArray(item) || isArray(item) && !checkLineStringCoordinates(item);
    });
    return isArray(coordinates) && !isHaveInVaildItem;
  }
  const PACKAGE_NAME$n = "MultiLineString";
  const createMessage$n = getPackageMessage(PACKAGE_NAME$n);
  class MultiLineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$n("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiLineString", coordinatesOrFeature);
      } else {
        if (!checkMultiLineStringCoordinates(coordinatesOrFeature)) {
          error_(createMessage$n("constructor", "坐标格式有误"));
          return;
        }
        super("MultiLineString", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return handleGetLnglatValue(c2);
        });
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.MultiLineString(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$n(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取坐标
     * @returns {Array<Array<Lnglat>>} 坐标
     */
    getCoordinates() {
      if (!this._isInitialized("getCoordinates")) return;
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return new Lnglat(...c2);
        });
      });
      return _coordinates;
    }
    /**
     * 设置坐标
     * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
     */
    setCoordinates(coordinates) {
      if (!this._isInitialized("setCoordinates")) return;
      if (!isDefined(coordinates)) {
        error_(createMessage$n("setCoordinates", "参数不能为空"));
        return;
      }
      if (!checkMultiLineStringCoordinates(coordinates)) {
        error_(createMessage$n("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2 instanceof Lnglat ? c2.toArray() : c2;
        });
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  function checkMultiPolygonCoordinates(coordinates) {
    let isHaveInVaildItem = coordinates.some((item) => {
      return !isArray(item) || isArray(item) && !checkPolygonCoordinates(item);
    });
    return isArray(coordinates) && !isHaveInVaildItem;
  }
  const PACKAGE_NAME$m = "MultiPolygon";
  const createMessage$m = getPackageMessage(PACKAGE_NAME$m);
  class MultiPolygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(createMessage$m("constructor", "参数不能为空"));
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiPolygon", coordinatesOrFeature);
      } else {
        if (!checkMultiPolygonCoordinates(coordinatesOrFeature)) {
          error_(createMessage$m("constructor", "坐标格式有误"));
          return;
        }
        super("MultiPolygon", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return handleGetLnglatValue(c3);
          });
        });
      });
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.MultiPolygon(geometryCoordinates);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$m(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 获取坐标
     * @returns {Array<Array<Array<Lnglat>>>} 坐标
     */
    getCoordinates() {
      if (!this._isInitialized("getCoordinates")) return;
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return new Lnglat(...c3);
          });
        });
      });
      return _coordinates;
    }
    /**
     * 设置坐标
     * @param {OMapMultiPolygonGeometryCoordinatesType} coordinates 坐标
     */
    setCoordinates(coordinates) {
      if (!this._isInitialized("setCoordinates")) return;
      if (!isDefined(coordinates)) {
        error_(createMessage$m("setCoordinates", "参数不能为空"));
        return;
      }
      if (!checkMultiPolygonCoordinates(coordinates)) {
        error_(createMessage$m("setCoordinates", "坐标格式有误"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return c3 instanceof Lnglat ? c3.toArray() : c3;
          });
        });
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  const PACKAGE_NAME$l = "Circle";
  const createMessage$l = getPackageMessage(PACKAGE_NAME$l);
  class Circle extends BasicFeature {
    constructor(centerOrFeature, radius, properties) {
      if (!isDefined(centerOrFeature)) {
        error_(createMessage$l("constructor", "参数不能为空"));
        return;
      }
      if (centerOrFeature instanceof OlFeature) {
        super("Circle", centerOrFeature);
      } else {
        if (!(centerOrFeature instanceof Lnglat) && !isCoordinatesType(centerOrFeature)) {
          error_(createMessage$l("constructor", "坐标格式有误"));
          return;
        }
        if (!isDefined(radius)) {
          error_(createMessage$l("constructor", "radius参数不能为空"));
          return;
        }
        if (!isNumber(radius)) {
          error_(createMessage$l("constructor", "radius参数格式有误"));
          return;
        }
        super("Circle", centerOrFeature, radius);
        if (properties) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = handleGetLnglatValue(coordinates);
      if (geometryCoordinates) {
        this._geometry = new OlGeometry__namespace.Circle(geometryCoordinates, radius);
        this._feature = new OlFeature({
          geometry: this._geometry
        });
      }
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    _isInitialized(method) {
      if (!isDefined(this._feature) || !isDefined(this._geometry)) {
        warn_(createMessage$l(method, "未正确实例化"));
        return false;
      }
      return true;
    }
  }
  const OlFeatureTypeObject = {
    Point: "Point",
    LineString: "LineString",
    Polygon: "Polygon",
    MultiPoint: "MultiPoint",
    MultiLineString: "MultiLineString",
    MultiPolygon: "MultiPolygon",
    LinearRing: "LinearRing",
    Circle: "Circle"
  };
  function createBaseFeatureByOlFeature(feature) {
    let geometry = feature.getGeometry();
    if (!geometry) return null;
    switch (geometry.getType()) {
      case OlFeatureTypeObject.Point:
        return new Point(feature);
      case OlFeatureTypeObject.LineString:
        return new LineString(feature);
      case OlFeatureTypeObject.Polygon:
        return new Polygon(feature);
      case OlFeatureTypeObject.MultiPoint:
        return new MultiPoint(feature);
      case OlFeatureTypeObject.MultiLineString:
        return new MultiLineString(feature);
      case OlFeatureTypeObject.MultiPolygon:
        return new MultiPolygon(feature);
      case OlFeatureTypeObject.LinearRing:
        return new LinearRing(feature);
      case OlFeatureTypeObject.Circle:
        return new Circle(feature);
    }
    return null;
  }
  const OMapInteractionCommonParams = {
    active: false
  };
  const OMapInteractionEventTypes = [
    "change",
    "change:active",
    "error",
    "propertychange"
  ];
  const MeasureMode = {
    Distance: "Distance",
    Area: "Area"
  };
  const DRAW_DEFAULT_PARAMS$1 = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
  };
  const MeasureEventType = {
    measureStart: "measure:start",
    measureEnd: "measure:end"
  };
  const OMapInteractionMeasureEventTypes = [...OMapInteractionEventTypes, ...Object.values(MeasureEventType)];
  function isOMapInteractionMeasureEventType(value) {
    return isString(value) && OMapInteractionMeasureEventTypes.includes(value);
  }
  const DrawMode = {
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
  };
  const DRAW_DEFAULT_PARAMS = {
    clickTolerance: 6,
    dragVertexDelay: 500,
    snapTolerance: 12,
    stopClick: false
  };
  const DrawEventType = {
    drawStart: "drawstart",
    drawEnd: "drawend",
    drawAbort: "drawabort"
  };
  const OMapInteractionDrawEventTypes = [...OMapInteractionEventTypes, ...Object.values(DrawEventType)];
  function isOMapInteractionDrawEventType(value) {
    return isString(value) && OMapInteractionDrawEventTypes.includes(value);
  }
  const MeasureMarkerIdSuffix = "omap-measure-marker";
  const MEASURE_MERKER_INDEX_NAME = "omap-measure-marker-index";
  function getOlDrawType$1(mode) {
    let type = "Point";
    let geometryFunction = null;
    switch (mode) {
      case MeasureMode.Distance:
        type = DrawMode.LineString;
        break;
      case MeasureMode.Area:
        type = DrawMode.Polygon;
        break;
    }
    return { type, geometryFunction };
  }
  let distanceElement = null;
  let areaElement = null;
  let distanceFeature = null;
  let areaFeature = null;
  let measureMap = null;
  let measureMarkerElements = [];
  let measureMarkerPopups = [];
  function updateMeasureFeature(mode, feature, map) {
    if (mode === MeasureMode.Distance) {
      distanceFeature = feature;
    } else if (mode === MeasureMode.Area) {
      areaFeature = feature;
    }
    measureMap = map;
  }
  function createMeasureTooltipElement(text) {
    let div = document.createElement("div");
    div.style.padding = "2px 5px";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    div.style.color = "#FFFFFF";
    div.style.fontSize = "12px";
    div.innerHTML = text;
    return div;
  }
  function createMeasureDistanceElement(distance, tooltipText) {
    if (!distanceElement) {
      let div = document.createElement("div");
      div.style.padding = "2px 5px";
      div.style.borderRadius = "5px";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      div.style.color = "#FFFFFF";
      div.style.fontSize = "12px";
      let p = document.createElement("p");
      p.innerHTML = createMeasureValueSpan("总长", distance);
      div.appendChild(p);
      if (tooltipText && tooltipText !== "") {
        let p2 = document.createElement("p");
        p2.className = "omap-measure-tooltip-text";
        p2.innerHTML = tooltipText;
        div.appendChild(p2);
      }
      distanceElement = div;
    } else {
      distanceElement.children[0].innerHTML = createMeasureValueSpan("总长", distance);
      if (!tooltipText || tooltipText === "") {
        if (distanceElement.children.length > 1) {
          distanceElement.removeChild(distanceElement.children[1]);
        }
      } else {
        if (distanceElement.children.length > 1) {
          distanceElement.children[1].innerHTML = tooltipText;
        } else {
          let p2 = document.createElement("p");
          p2.className = "omap-measure-tooltip-text";
          p2.innerHTML = tooltipText;
          distanceElement.appendChild(p2);
        }
      }
    }
    return distanceElement;
  }
  function createMeasureAreaElement(value, tooltipText) {
    if (!areaElement) {
      let div = document.createElement("div");
      div.style.padding = "2px 5px";
      div.style.borderRadius = "5px";
      div.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      div.style.color = "#FFFFFF";
      div.style.fontSize = "12px";
      let p = document.createElement("p");
      p.innerHTML = createMeasureValueSpan("总长", value);
      div.appendChild(p);
      if (tooltipText && tooltipText !== "") {
        let p2 = document.createElement("p");
        p2.className = "omap-measure-tooltip-text";
        p2.innerHTML = tooltipText;
        div.appendChild(p2);
      }
      areaElement = div;
    } else {
      areaElement.children[0].innerHTML = createMeasureValueSpan("面积", value);
      if (!tooltipText || tooltipText === "") {
        if (areaElement.children.length > 1) {
          areaElement.removeChild(areaElement.children[1]);
        }
      } else {
        if (areaElement.children.length > 1) {
          areaElement.children[1].innerHTML = tooltipText;
        } else {
          let p2 = document.createElement("p");
          p2.className = "omap-measure-tooltip-text";
          p2.innerHTML = tooltipText;
          areaElement.appendChild(p2);
        }
      }
    }
    return areaElement;
  }
  function createMeasureAreaCloseElement(callback) {
    let closeElement = document.createElement("span");
    closeElement.title = "删除";
    closeElement.innerHTML = "×";
    closeElement.style.color = "#FFFFFF";
    closeElement.style.cursor = "pointer";
    closeElement.addEventListener("click", (e) => {
      if (isDefined(callback)) {
        callback();
      }
    });
    return closeElement;
  }
  function createMeasureMarkerPopup(params) {
    let popup = new Popup(params);
    measureMarkerPopups.push(popup);
    return popup;
  }
  function createMeasureMarkerElement(distance, index) {
    let div = document.createElement("div");
    div.className = `${MeasureMarkerIdSuffix}-${index}`;
    div.style.padding = "2px 5px";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    div.style.color = "#000000";
    div.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.5)";
    let distanceElement2 = document.createElement("span");
    distanceElement2.style.color = "var(--omap-primary-color)";
    distanceElement2.style.margin = "0 5px";
    distanceElement2.innerHTML = distance;
    div.appendChild(distanceElement2);
    if (index !== 0) {
      let closeElement = document.createElement("span");
      closeElement.title = "删除";
      closeElement.innerHTML = "×";
      closeElement.style.color = "#000000";
      closeElement.style.cursor = "pointer";
      div.setAttribute(MEASURE_MERKER_INDEX_NAME, index.toString());
      closeElement.addEventListener("click", (e) => {
        console.log("点击删除");
        let index2 = div.getAttribute(MEASURE_MERKER_INDEX_NAME);
        console.log(index2);
        if (isDefined(index2)) {
          handleDeleteFn(Number(index2));
        }
      });
      div.appendChild(closeElement);
    }
    measureMarkerElements.push(div);
    return div;
  }
  function handleDeleteFn(index) {
    if (measureMarkerPopups.length === 2) {
      handleDeletePosition();
      measureMarkerElements = [];
      measureMarkerPopups.forEach((_, i) => {
        removeMeasureMarker(i);
        if (i === measureMarkerPopups.length - 1) {
          measureMarkerPopups = [];
        }
      });
      return false;
    }
    handleDeletePosition(index);
    measureMarkerElements.splice(index, 1);
    measureMarkerElements.forEach((item, index2) => {
      item.className = `${MeasureMarkerIdSuffix}-${index2}`;
      item.setAttribute(MEASURE_MERKER_INDEX_NAME, index2.toString());
    });
    removeMeasureMarker(index);
    measureMarkerPopups.splice(index, 1);
    measureMarkerPopups.forEach((item, index2) => {
      item.id = getOMapMeasureMarkerId(index2);
    });
    updateDistance();
  }
  function removeMeasureMarker(index) {
    if (isDefined(measureMap)) {
      let popup = measureMap.getPopupById(`omap-measure-marker-${index}`);
      if (isDefined(popup)) {
        measureMap.removePopup(popup);
      }
    }
  }
  function handleDeletePosition(index) {
    let target = distanceFeature ? distanceFeature : areaFeature;
    if (isDefined(target)) {
      let geometry = target.getGeometry();
      if (isDefined(geometry)) {
        if (isDefined(index)) {
          let coordinates = [];
          if (geometry instanceof OlGeometry__namespace.LineString) {
            coordinates = geometry.getCoordinates();
          } else if (geometry instanceof OlGeometry__namespace.Polygon) {
            coordinates = geometry.getCoordinates();
          }
          coordinates.splice(index, 1);
          if (geometry instanceof OlGeometry__namespace.LineString) {
            geometry.setCoordinates(coordinates);
          } else if (geometry instanceof OlGeometry__namespace.Polygon) {
            geometry.setCoordinates(coordinates);
          }
        } else {
          if (geometry instanceof OlGeometry__namespace.LineString) {
            geometry.setCoordinates([]);
          } else if (geometry instanceof OlGeometry__namespace.Polygon) {
            geometry.setCoordinates([]);
          }
        }
      }
    }
  }
  function updateDistance() {
    if (distanceFeature) {
      let coordinates = distanceFeature.getGeometry().getCoordinates();
      measureMarkerElements.forEach((item, index) => {
        if (index > 0) {
          let calculateFeature = new LineString(coordinates.slice(0, index + 1));
          let length = measureMap.getLength(calculateFeature);
          item.children[0].innerHTML = isDefined(length) ? transformDistance(length) : "-";
        }
      });
    }
  }
  function transformDistance(distance) {
    return (distance / 1e3).toFixed(2) + " km";
  }
  function transformArea(area) {
    return (area / 1e6).toFixed(2) + " km²";
  }
  function getOMapMeasureMarkerId(index) {
    return `${MeasureMarkerIdSuffix}-${index}`;
  }
  function createMeasureValueSpan(name, value) {
    return `${name}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${value || "-"}</span>`;
  }
  function destroy() {
    measureMarkerElements.forEach((item) => {
      item.remove();
    });
    measureMarkerPopups.forEach((item) => {
      measureMap.removePopup(item);
    });
    distanceFeature = null;
    areaFeature = null;
    setTimeout(() => {
      measureMarkerElements = [];
      measureMarkerPopups = [];
    }, 200);
  }
  class TooltipPopup {
    constructor(text) {
      __publicField(this, "popup");
      this.initPopup(text || "");
    }
    _isInitialized() {
      if (!isDefined(this.popup)) {
        return false;
      }
      return true;
    }
    initPopup(text) {
      let div = createMeasureTooltipElement(text);
      this.popup = new Popup({
        id: "omap-measure-popup",
        element: div,
        offset: new Pixel(0, -10)
      });
    }
    getPopup() {
      return this.popup;
    }
    updatePosition(position) {
      if (!this._isInitialized()) return;
      this.popup.setPosition(position);
    }
    setElement(element) {
      if (!this._isInitialized()) return;
      this.popup.setElement(element);
    }
    getElement() {
      if (!this._isInitialized()) return;
      return this.popup.getElement();
    }
  }
  const tooltipPopup = new TooltipPopup("单击地图开始测量");
  const measurePopup = new TooltipPopup("");
  const PACKAGE_NAME$k = "Measure";
  const createMessage$k = getPackageMessage(PACKAGE_NAME$k);
  let measureFeature = null;
  let measureListener = null;
  let pointMoveListener = null;
  class Measure extends Interaction {
    constructor(mode, params) {
      if (!Object.values(MeasureMode).includes(mode)) {
        error_(createMessage$k("constructor", "mode参数有误"));
        return;
      }
      super("Measure");
      __publicField(this, "mode", null);
      __publicField(this, "result", {
        value: 0,
        unit: ""
      });
      let draw_source = null;
      this.layer = new VectorLayer({
        style: DEFAULT_STYLE
      });
      draw_source = this.layer.getSource();
      let _params = Object.assign({}, DRAW_DEFAULT_PARAMS$1, {
        clickTolerance: params == null ? void 0 : params.clickTolerance,
        source: draw_source,
        features: void 0,
        style: void 0
      });
      this._interaction = new OlInteraction__namespace.Draw({
        ...getOlDrawType$1(mode),
        ..._params
      });
      this.mode = mode;
      if (mode === MeasureMode.Distance) {
        this.result.unit = "km";
      } else if (mode === MeasureMode.Area) {
        this.result.unit = "km²";
      }
      this.initInteractionEvent();
    }
    /**
     * 初始化 测量事件
     */
    initMeasureEvent() {
      if (!this._isInitialized("initMeasureEvent")) return;
      this._interaction.on("change:active", (e) => {
        if (this._interaction.getActive()) {
          this.onMeasureActive();
        } else {
          this.onMeasureInActive();
        }
      });
      this._interaction.on("drawstart", (e) => {
        this.events.emit(MeasureEventType.measureStart, {
          target: this,
          type: MeasureEventType.measureStart
        });
        this.onMeasureStart(e.feature);
      });
      this._interaction.on("drawend", (e) => {
        this.onMeasureEnd();
      });
    }
    onMeasureActive() {
      if (isDefined(this.map)) {
        if (!isDefined(pointMoveListener)) {
          pointMoveListener = this.map._map.on("pointermove", (e) => {
            if (isDefined(tooltipPopup)) {
              tooltipPopup.updatePosition(e.coordinate);
            }
          });
        }
      }
      this.result.value = 0;
    }
    onMeasureInActive() {
      if (isDefined(pointMoveListener)) {
        OlObservable__namespace.unByKey(pointMoveListener);
        pointMoveListener = null;
      }
    }
    /**
     * 测量开始
     * @param feature 测量开始的feature
     */
    onMeasureStart(feature) {
      var _a;
      if (isDefined(feature)) {
        measureFeature = feature;
        updateMeasureFeature(this.mode, feature, this.map);
        let lastLength = 0;
        measureListener = (_a = measureFeature.getGeometry()) == null ? void 0 : _a.on("change", (e) => {
          var _a2, _b;
          const { target } = e;
          if (isDefined(target)) {
            let newLength = target instanceof OlGeometry__namespace.LineString ? target.getCoordinates().length : target.getCoordinates()[0].length;
            if (lastLength === 0) {
              lastLength = newLength;
              if (target instanceof OlGeometry__namespace.LineString) {
                let startMarker = createMeasureMarkerElement("起点", 0);
                let popup = createMeasureMarkerPopup({
                  id: getOMapMeasureMarkerId(0),
                  element: startMarker,
                  offset: new Pixel(0, -10)
                });
                popup.setPosition(target.getCoordinates()[0]);
                this.map.addPopup(popup);
              }
            }
            let value = void 0;
            if (target instanceof OlGeometry__namespace.LineString) {
              value = (_a2 = this.map) == null ? void 0 : _a2.getLength(new LineString(new OlFeature({
                geometry: target
              })));
            } else if (target instanceof OlGeometry__namespace.Polygon) {
              value = (_b = this.map) == null ? void 0 : _b.getArea(new Polygon(new OlFeature({
                geometry: target
              })));
            }
            if (isDefined(value) && isNumber(value)) {
              this.result.value = value;
            }
            if (isDefined(value) && isNumber(value)) {
              if (target instanceof OlGeometry__namespace.LineString) {
                let newElement = newLength >= 2 ? createMeasureDistanceElement(transformDistance(value), value === 0 ? "" : "单击继续，双击结束测量") : createMeasureTooltipElement("单击地图开始测量");
                tooltipPopup.setElement(newElement);
              }
            }
            if (target instanceof OlGeometry__namespace.LineString) {
              if (newLength > lastLength) {
                let index = newLength - 1 - 1;
                let marker = createMeasureMarkerElement(transformDistance(value), index);
                let popup = createMeasureMarkerPopup({
                  id: getOMapMeasureMarkerId(index),
                  element: marker,
                  offset: new Pixel(0, -10)
                });
                popup.setPosition(target.getCoordinates()[target.getCoordinates().length - 1]);
                this.map.addPopup(popup);
                lastLength = newLength;
              }
            } else if (target instanceof OlGeometry__namespace.Polygon) {
              if (newLength >= 4) {
                this.map.addPopup(measurePopup.getPopup());
                measurePopup.setElement(createMeasureAreaElement(transformArea(value), "单击继续，双击结束测量"));
                measurePopup.updatePosition(target.getInteriorPoint().getCoordinates());
                tooltipPopup.setElement(void 0);
                tooltipPopup.updatePosition(void 0);
              }
            }
          } else {
            warn_("target is undefined");
          }
        });
      }
    }
    /**
     * 测量结束
     */
    onMeasureEnd() {
      this.setActive(false);
      if (isDefined(pointMoveListener)) {
        OlObservable__namespace.unByKey(pointMoveListener);
        pointMoveListener = null;
      }
      if (isDefined(measureListener)) {
        OlObservable__namespace.unByKey(measureListener);
        OlObservable__namespace.unByKey(measureListener);
        measureListener = null;
      }
      if (this.mode === MeasureMode.Distance) ;
      if (this.mode === MeasureMode.Area) {
        const element = createMeasureAreaElement(transformArea(this.result.value));
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.appendChild(createMeasureAreaCloseElement(() => {
          var _a;
          measurePopup.updatePosition(void 0);
          measurePopup.setElement(void 0);
          (_a = this.layer) == null ? void 0 : _a.clear();
        }));
        measurePopup.setElement(element);
      }
      tooltipPopup.updatePosition(void 0);
      tooltipPopup.setElement(void 0);
      this.events.emit(MeasureEventType.measureEnd, {
        target: this,
        type: MeasureEventType.measureEnd
      });
    }
    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel() {
      if (!this._isInitialized("cancel")) return;
      this._interaction.abortDrawing();
    }
    /**
     * 删除最后一个点
     */
    revoke() {
      if (!this._isInitialized("revoke")) return;
      this._interaction.removeLastPoint();
    }
    /**
     * 结束当前未完成的绘制
     */
    finish() {
      if (!this._isInitialized("finish")) return;
      this._interaction.finishDrawing();
    }
    setMap(map) {
      super.setMap(map);
      if (isDefined(map)) {
        this.initMeasureEvent();
        this.map.addPopup(tooltipPopup.getPopup());
      }
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$k("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionMeasureEventType(type)) {
        warn_(createMessage$k("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$k("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const id = this.events.on(type, callback);
      return id;
    }
    once(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$k("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionMeasureEventType(type)) {
        warn_(createMessage$k("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$k("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const id = this.events.once(type, callback);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$k("un", commonMessage.paramsNotDefined(id)));
        return;
      }
      if (!isString(id)) {
        warn_(createMessage$k("un", commonMessage.paramsInvaildFormat(id, "string")));
        return;
      }
      this.events.remove(id);
    }
    destroy(destroyLayer = true) {
      tooltipPopup.updatePosition(void 0);
      measurePopup.updatePosition(void 0);
      destroy();
      if (destroyLayer && isDefined(this.getLayer())) {
        this._removeInteractionLayer();
      }
      super.destroy();
    }
  }
  let PACKAGE_NAME$j = "VectorLayer";
  let createMessage$j = getPackageMessage(PACKAGE_NAME$j);
  class VectorLayer extends BaseLayer {
    constructor(options = {}) {
      super("Vector", options);
      __publicField(this, "features", []);
      __publicField(this, "style");
      let _sourceOptions = isDefined(options.source) ? options.source : {};
      let _sourceParams = {
        ..._sourceOptions,
        features: _sourceOptions.features ? _sourceOptions.features.map((f) => {
          return f.getFeature();
        }) : []
      };
      this._layer = new OlLayer__namespace.Vector({
        source: new OlSource__namespace.Vector(_sourceParams)
      });
      this.initStyle(options.style);
      this._initLayerEvent();
      this.initVectorLyaerEvent();
    }
    _isInitializedLayer(method) {
      if (!this._isInitialized(method)) {
        warn_(createMessage$j(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    /**
     * 初始化矢量图层事件
     */
    initVectorLyaerEvent() {
      if (!this._isInitializedLayer("initVectorLyaerEvent")) return;
      this._layer.getSource().on("addfeature", (e) => {
        const { feature } = e;
        if (isDefined(feature)) {
          if (this.target instanceof Draw || this.target instanceof Measure) {
            let basicFeature = createBaseFeatureByOlFeature(feature);
            if (basicFeature) {
              this.features.push(basicFeature);
            } else {
              warn_(createMessage$j("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
            }
          }
        }
      });
    }
    /**
     * 初始化样式
     * @param {OMapStyleLike | undefined} style 样式
     */
    initStyle(style) {
      if (!this._isInitializedLayer("initStyle")) return;
      let _style = void 0;
      if (isDefined(style)) {
        if (style instanceof Style) {
          _style = style.getStyle();
        } else if (isArray(style) && style.every((s) => s instanceof Style)) {
          _style = style.map((s) => s.getStyle());
        } else if (isFunction(style)) {
          _style = (feature, resolution) => {
            let uid = OlUtil__namespace.getUid(feature);
            let index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
            let styleFnResult = style(index !== -1 ? this.features[index] : null, resolution);
            return styleFnResult ? styleFnResult.getStyle() : void 0;
          };
        } else {
          warn_(createMessage$j("initStyle", "style格式有误"));
        }
      }
      if (_style) {
        this._layer.setStyle(_style);
        this.style = style;
      }
    }
    getFeatures() {
      if (!this._isInitializedLayer("getFeatures")) return;
      return this.features;
    }
    getFeatureById(id) {
      if (!this._isInitializedLayer("getFeatureById")) return;
      if (!isDefined(id)) {
        warn_(createMessage$j("setId", "参数id不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$j("setId", "参数id格式有误"));
        return;
      }
      let target = this.features.find((f) => {
        return isDefined(f.getId()) && f.getId() === id;
      });
      return target || void 0;
    }
    getFeaturesInExtent(extent, projection) {
      if (!this._isInitializedLayer("getFeaturesInExtent")) return;
      if (!isDefined(extent)) {
        warn_(createMessage$j("getFeaturesInExtent", "extent参数不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        warn_(createMessage$j("getFeaturesInExtent", "extent参数格式有误"));
        return;
      }
      let _extent = extent instanceof Extent ? extent.getExtent() : extent;
      let features = this._layer.getSource().getFeaturesInExtent(_extent);
      let _features = [];
      features.forEach((f) => {
        let uid = OlUtil__namespace.getUid(f);
        let index = this.features.findIndex((f2) => OlUtil__namespace.getUid(f2.getFeature()) === uid);
        if (index !== -1) {
          _features.push(this.features[index]);
        }
      });
      return _features;
    }
    getFeaturesAtCoordinate(coordinates) {
      if (!this._isInitializedLayer("getFeaturesAtCoordinate")) return;
      if (!isDefined(coordinates)) {
        warn_(createMessage$j("getFeaturesAtCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        warn_(createMessage$j("getFeaturesAtCoordinate", "coordinates参数格式有误"));
        return;
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      const features = this._layer.getSource().getFeaturesAtCoordinate(_coordinates);
      let _features = [];
      features.forEach((f) => {
        let uid = OlUtil__namespace.getUid(f);
        let index = this.features.findIndex((f2) => OlUtil__namespace.getUid(f2.getFeature()) === uid);
        if (index !== -1) {
          _features.push(this.features[index]);
        }
      });
      return _features;
    }
    addFeature(feature) {
      if (!this._isInitializedLayer("addFeature")) return;
      if (!isDefined(feature)) {
        warn_(createMessage$j("addFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        this._layer.getSource().addFeature(feature.getFeature());
        this.features.push(feature);
      }
    }
    addFeatures(features) {
      if (!this._isInitializedLayer("addFeatures")) return;
      if (!isDefined(features) || !isArray(features)) {
        warn_(createMessage$j("addFeatures", "参数格式有误不能为空"));
        return;
      }
      if (!isEmptyArray(features)) {
        features.forEach((f) => {
          this.addFeature(f);
        });
      }
    }
    removeFeature(feature) {
      if (!this._isInitializedLayer("removeFeature")) return;
      if (!isDefined(feature)) {
        warn_(createMessage$j("removeFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        let index = this.features.indexOf(feature);
        this._layer.getSource().removeFeature(feature.getFeature());
        this.features.splice(index, 1);
      }
    }
    removeFeatures(features) {
      if (!this._isInitializedLayer("removeFeatures")) return;
      if (!isDefined(features) || !isArray(features)) {
        warn_(createMessage$j("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      if (!isEmptyArray(features)) {
        features.forEach((f) => {
          this.removeFeature(f);
        });
      }
    }
    clear() {
      if (!this._isInitializedLayer("clear")) return;
      if (!this._layer.getSource()) {
        return;
      }
      this._layer.getSource().clear();
      this.features = [];
    }
    forEachFeature(callback) {
      if (!this._isInitializedLayer("forEachFeature")) return;
      if (!isDefined(callback) || !isFunction(callback)) {
        warn_(createMessage$j("forEachFeature", "参数格式有误"));
        return;
      }
      this.features.forEach((f, i) => {
        callback(f, i);
      });
    }
    /**
     * 遍历指定范围的特征
     * @param {Extent} extent 范围
     * @param {Function} callback 回调函数
     * @returns {void}
     */
    forEachFeatureInExtent(extent, callback) {
      if (!this._isInitializedLayer("forEachFeatureInExtent")) return;
      if (!isDefined(callback)) {
        warn_(createMessage$j("forEachFeatureInExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureInExtent(extent.getExtent(), (feature) => {
        let uid = OlUtil__namespace.getUid(feature);
        let index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
        if (isDefined(index) && index !== -1) {
          callback(this.features[index], 0);
        }
      });
    }
    /**
     * 遍历与指定范围相交的特征
     * @param {Extent} extent 范围
     * @param {Function} callback 回调函数
     * @returns {void}
     */
    forEachFeatureIntersectingExtent(extent, callback) {
      if (!this._isInitializedLayer("forEachFeatureIntersectingExtent")) return;
      if (!isDefined(callback)) {
        warn_(createMessage$j("forEachFeatureIntersectingExtent", "callback参数不能为空"));
        return;
      }
      this._layer.getSource().forEachFeatureIntersectingExtent(extent.getExtent(), (feature) => {
        let uid = OlUtil__namespace.getUid(feature);
        let index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
        if (isDefined(index) && index !== -1) {
          callback(this.features[index], 0);
        }
      });
    }
    getClosestFeatureToCoordinate(coordinates, filter) {
      if (!this._isInitializedLayer("getClosestFeatureToCoordinate")) return;
      if (!isDefined(coordinates)) {
        warn_(createMessage$j("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        warn_(createMessage$j("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
        return;
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      let filterFunction = filter ? (feature) => {
        let uid = OlUtil__namespace.getUid(feature);
        let index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
        return filter(this.features[index]);
      } : void 0;
      const re = this._layer.getSource().getClosestFeatureToCoordinate(_coordinates, filterFunction);
      let resuleIndex = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === OlUtil__namespace.getUid(re));
      if (resuleIndex === -1) {
        return void 0;
      }
      return this.features[resuleIndex];
    }
    getSourceExtent() {
      if (!this._isInitializedLayer("getSourceExtent")) return;
      const extent = this._layer.getSource().getExtent();
      return new Extent(extent[0], extent[1], extent[2], extent[3]);
    }
    // 样式管理
    /**
     * 获取样式
     * @returns {OMapStyleLike | undefined} style 样式
     */
    getStyle() {
      if (!this._isInitializedLayer("getStyle")) return;
      return this.style;
    }
    /**
     * 设置图层样式
     * @param {OMapStyleLike} style 新样式
     */
    setStyle(style) {
      if (!this._isInitializedLayer("setStyle")) return;
      if (!isDefined(style)) {
        warn_(createMessage$j("setStyle", "style参数不能为空"));
        return;
      }
      this.initStyle(style);
    }
    /**
     * 设置去重叠功能
     * @param declutter 
     * @returns 
     */
    setDeclutter(declutter) {
      if (!this._isInitializedLayer("setDeclutter")) return;
      this._layer.setDeclutter(declutter);
    }
  }
  function getOlDrawType(mode) {
    let type = "Point";
    let geometryFunction = null;
    switch (mode) {
      case "Point":
      case "LineString":
      case "Polygon":
        type = mode;
        break;
      case "Circle":
        type = "Circle";
        break;
      case "Rectangle":
        type = "Circle";
        geometryFunction = Draw$1.createBox();
        break;
    }
    return { type, geometryFunction };
  }
  function handleInteractionDrawEvent(target, type, e) {
    const layer = target.getLayer();
    let layerFeatures = [];
    if (isDefined(layer)) {
      layerFeatures = defaultValue(layer.getFeatures(), []);
    }
    const { feature } = e;
    let targetFeature = null;
    if (isDefined(feature)) {
      targetFeature = createBaseFeatureByOlFeature(feature);
    }
    return {
      type,
      target,
      features: layerFeatures,
      feature: targetFeature
    };
  }
  const PACKAGE_NAME$i = "Draw";
  const createMessage$i = getPackageMessage(PACKAGE_NAME$i);
  class Draw extends Interaction {
    constructor(mode, params) {
      if (!Object.values(DrawMode).includes(mode)) {
        error_(createMessage$i("constructor", "mode参数有误"));
        return;
      }
      super("Draw");
      let draw_source = null;
      if (params == null ? void 0 : params.layer) {
        if ((params == null ? void 0 : params.layer) instanceof VectorLayer) {
          this.layer = params == null ? void 0 : params.layer;
          draw_source = params == null ? void 0 : params.layer.getSource();
        } else {
          warn_(createMessage$i("init", "layer参数不属于VectorLayer类型"));
        }
      }
      if (!isDefined(draw_source)) {
        this.layer = new VectorLayer({
          style: DEFAULT_STYLE
        });
        draw_source = this.layer.getSource();
      }
      let _params = Object.assign({}, DRAW_DEFAULT_PARAMS, {
        clickTolerance: params == null ? void 0 : params.clickTolerance,
        source: draw_source,
        features: void 0,
        style: void 0
      });
      this._interaction = new OlInteraction__namespace.Draw({
        ...getOlDrawType(mode),
        ..._params
      });
      this.initInteractionEvent();
    }
    initDrawEvent() {
      if (!this._isInitialized("initDrawEvent")) return;
      this._interaction.on("drawend", (e) => {
        const feature = e.feature;
        console.log(feature);
        if (isDefined(feature)) {
          let basicFeature = createBaseFeatureByOlFeature(feature);
          if (basicFeature) {
            this.layer.addFeature(basicFeature);
          } else {
            warn_(createMessage$i("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
          }
        }
      });
    }
    /**
     * 追加坐标
     * @param coordinates 坐标
     */
    appendCoordinates(coordinates) {
      if (!this._isInitialized("appendCoordinates")) return;
      if (!isDefined(coordinates)) {
        warn_(createMessage$i("appendCoordinates", "coordinates参数不能为空"));
        return;
      }
      let _coordinates = coordinates.map((c) => {
        return c instanceof Lnglat ? c.toArray() : c;
      });
      this._interaction.appendCoordinates(_coordinates);
    }
    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel() {
      if (!this._isInitialized("cancel")) return;
      this._interaction.abortDrawing();
    }
    /**
     * 撤销操作（会删除最后一个已经绘制的点位）
     */
    revoke() {
      if (!this._isInitialized("revoke")) return;
      this._interaction.removeLastPoint();
    }
    /**
     * 结束当前未完成的绘制（并自动补全图形）
     */
    finish() {
      if (!this._isInitialized("finish")) return;
      this._interaction.finishDrawing();
    }
    destroy(destroyLayer = true) {
      if (destroyLayer && isDefined(this.getLayer())) {
        this._removeInteractionLayer();
      }
      super.destroy();
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$i("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionDrawEventType(type)) {
        warn_(createMessage$i("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$i("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionDrawEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
  }
  let PACKAGE_NAME$h = "LayerGroup";
  let createMessage$h = getPackageMessage(PACKAGE_NAME$h);
  class LayerGroup {
    constructor(idOrLayers, layers) {
      /**
       * 图层组id
       * @type {IdType}
       */
      __publicField(this, "id", null);
      __publicField(this, "layers", []);
      __publicField(this, "map", null);
      if (!isDefined(idOrLayers)) {
        error_(createMessage$h("constructor", "参数不能为空"));
        return;
      }
      let _layers = defaultValue(layers, []);
      if (isNumber(idOrLayers) || isString(idOrLayers)) {
        this.id = idOrLayers;
      } else {
        _layers = idOrLayers;
      }
      const vaildLayers = _layers.filter((item) => {
        return isDefined(item) && isDefined(item.getLayer()) && item instanceof BaseLayer;
      });
      if (vaildLayers.length !== _layers.length) {
        warn_(createMessage$h("constructor", "图层参数错误，必须为BaseLayer实例，已进行过滤"));
      }
      vaildLayers.forEach((item) => {
        layerState.set(item, {
          groupId: this.id
        });
      });
      this.layers = vaildLayers;
      vaildLayers.forEach((item) => {
        layerState.set(item, {
          groupId: this.id
        });
      });
    }
    /**
     * 添加图层
     * @param {BaseLayer} layer 图层实例
     */
    add(layer) {
      if (!isDefined(layer)) {
        warn_(createMessage$h("add", "参数layer不能为空"));
        return;
      }
      if (!(layer instanceof BaseLayer)) {
        warn_(createMessage$h("add", "参数layer必须为BaseLayer实例"));
        return;
      }
      let isExits = this.layers.some((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (isExits) {
        warn_(createMessage$h("add", "图层已存在"));
        return;
      }
      this.layers.push(layer);
      layerState.set(layer, {
        groupId: this.id
      });
      if (isDefined(this.map)) {
        this.map.addLayer(layer);
      }
    }
    remove(layer) {
      if (!isDefined(layer)) {
        warn_(createMessage$h("add", "参数layer不能为空"));
        return;
      }
      if (!(layer instanceof BaseLayer)) {
        warn_(createMessage$h("add", "参数layer必须为BaseLayer实例"));
        return;
      }
      let index = this.layers.findIndex((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (index === -1) {
        warn_(createMessage$h("remove", "图层不存在"));
        return;
      }
      this.layers.splice(index, 1);
      layerState.set(layer, {
        groupId: null
      });
      if (isDefined(this.map)) {
        this.map.removeLayer(layer);
      }
    }
    removeById(id) {
      if (!isDefined(id)) {
        warn_(createMessage$h("removeById", "参数id不能为空"));
        return;
      }
      let index = this.layers.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === id;
      });
      if (index === -1) {
        warn_(createMessage$h("remove", "图层不存在"));
        return;
      }
      let layer = this.layers[index];
      layerState.set(layer, {
        groupId: null
      });
      if (isDefined(this.map)) {
        this.map.removeLayer(layer);
      }
      this.layers.splice(index, 1);
    }
    clear() {
      if (isDefined(this.map)) {
        this.map.removeLayers(this.layers);
      }
      setTimeout(() => {
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
    setMap(map) {
      this.map = map;
    }
  }
  const defaultMouseWheelZoomOptions = {
    condition: void 0,
    onFocusOnly: false,
    maxDelta: 1,
    duration: 250,
    timeout: 80,
    useAnchor: true,
    constrainResolution: false
  };
  class MouseWheelZoom extends Interaction {
    constructor(params) {
      super("MouseWheelZoom");
      this._interaction = new OlInteraction__namespace.MouseWheelZoom(Object.assign(OMapInteractionCommonParams, defaultMouseWheelZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
  }
  const defaultDoubleClickZoomOptions = {
    duration: 250,
    delta: 1
  };
  class DoubleClickZoom extends Interaction {
    constructor(params) {
      super("DoubleClickZoom");
      this._interaction = new OlInteraction__namespace.DoubleClickZoom(Object.assign(OMapInteractionCommonParams, defaultDoubleClickZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
  }
  const defaultDragPanOptions = {
    onFocusOnly: false,
    kinetic: void 0
  };
  class DragPan extends Interaction {
    constructor(params) {
      super("DragPan");
      this._interaction = new OlInteraction__namespace.DragPan(Object.assign({}, defaultDragPanOptions, params || {}));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
  }
  const defaultMapInteractions = [
    new MouseWheelZoom({ id: "omap_default_mousewheelzoom" }),
    new DoubleClickZoom({ id: "omap_default_doubleclickzoom" }),
    new DragPan({ id: "omap_default_dragpan" })
  ];
  const defaultMapPopups = [];
  const defaultMapOptions = {
    pixelRatio: getDevicePixelRatio(),
    layers: [],
    controls: [],
    interactions: defaultMapInteractions,
    popups: defaultMapPopups
  };
  const OMapMapEventTypes = [
    "map:change:size",
    "map:click",
    "map:dbclick",
    "map:error",
    "map:loadend",
    "map:loadstart",
    "map:moveend",
    "map:movestart",
    "map:pointerdrag",
    "map:pointermove",
    "map:postcompose",
    "map:postrender",
    "map:precompose",
    "map:propertychange",
    "map:rendercomplete",
    "map:singleclick",
    "view:change",
    "view:change:center",
    "view:change:resolution",
    "view:change:rotation",
    "view:error",
    "view:propertychange"
  ];
  const DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS = {
    hitTolerance: 0,
    checkWrapped: true
  };
  const OMapEasing = {
    linear: OlEasing__namespace.linear,
    easeIn: OlEasing__namespace.easeIn,
    easeOut: OlEasing__namespace.easeOut,
    inAndOut: OlEasing__namespace.inAndOut,
    upAndDown: OlEasing__namespace.upAndDown
  };
  const OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS = {
    duration: 1e3,
    easing: "linear"
  };
  const OMAP_VIEW_FIT_DEFAULT_OPTIONS = {
    padding: [0, 0, 0, 0],
    nearest: false,
    minResolution: 0,
    duration: 1e3,
    easing: "easeOut"
  };
  function MapEventTypeIsMap(type) {
    return type && type.startsWith("map:");
  }
  function handleMapOnCallBack(target, type, e) {
    let result = {
      target,
      type
    };
    if (!isDefined(e)) return result;
    switch (type) {
      case "map:click":
      case "map:singleclick":
      case "map:dbclick":
        if (isDefined(e.pixel)) {
          result.pixel = new Pixel(...e.pixel);
        }
        if (isDefined(e.coordinate)) {
          result.coordinate = new Lnglat(...e.coordinate);
        }
        break;
      case "map:propertychange":
        if (e.oldValue) result.oldValue = e.key === "center" ? new Lnglat(...e.oldValue) : e.oldValue;
        if (e.key === "size") {
          result.newValue = e.newValue || target.getSize();
        } else {
          result.newValue = e.newValue;
        }
        result.key = e.key;
        break;
      case "map:moveend":
        if (e.oldCenter) result.oldValue = new Lnglat(...e.oldCenter);
        result.newValue = e.newCenter || target.getCenter();
        break;
      case "view:change:resolution":
        if (e.oldValue) result.oldValue = e.oldValue;
        result.newValue = e.newValue || target.getResolution();
        break;
      case "view:change:center":
        if (e.oldValue) result.oldValue = new Lnglat(...e.oldValue);
        result.newValue = e.newValue || target.getCenter();
        break;
      case "view:change:rotation":
        if (e.oldValue) result.oldValue = e.oldValue;
        result.newValue = e.newValue || target.getRotation();
        break;
      case "view:propertychange":
        if (e.oldValue) result.oldValue = e.key === "center" ? new Lnglat(...e.oldValue) : e.oldValue;
        if (e.key === "center") {
          result.newValue = e.newValue || target.getCenter();
        } else if (e.key === "rotation") {
          result.newValue = e.newValue || target.getRotation();
        } else if (e.key === "resolution") {
          result.newValue = e.newValue || target.getResolution();
        } else {
          result.newValue = e.newValue;
        }
        result.key = e.key;
        break;
    }
    return result;
  }
  function isOMapMapEventType(type) {
    return isString(type) && OMapMapEventTypes.includes(type);
  }
  const PACKAGE_NAME$g = "Map";
  const createMessage$g = getPackageMessage(PACKAGE_NAME$g);
  let Map$1 = class Map {
    constructor(element, options) {
      __publicField(this, "_map");
      __publicField(this, "_view");
      __publicField(this, "projection");
      __publicField(this, "layers", []);
      __publicField(this, "layerGroups", []);
      __publicField(this, "interactions", []);
      __publicField(this, "controls", []);
      __publicField(this, "events", new Event());
      __publicField(this, "popups", []);
      let _options = options;
      const view_options = _options.view;
      if (!isDefined(view_options)) {
        error_(createMessage$g("constructor", "view参数不能为空"));
        return;
      }
      let proj = view_options.projection || new Projection("EPSG:3857");
      if (isString(proj)) {
        proj = new Projection(proj);
      }
      this.projection = proj;
      const view_params = {
        ...view_options,
        center: view_options.center instanceof Lnglat ? view_options.center._lnglat : view_options.center,
        // 中心点坐标
        extent: view_options.extent instanceof Extent ? view_options.extent._extent : view_options.extent,
        projection: proj._projection
      };
      const view = new OlPackage__namespace.View(view_params);
      let mapInteractions = defaultValue(_options.interactions, defaultMapOptions.interactions);
      let mapControls = defaultValue(_options.controls, defaultMapOptions.controls);
      let mapPopups = defaultValue(_options.popups, defaultMapOptions.popups);
      let mapParams = Object.assign({}, defaultMapOptions, {
        ..._options,
        interactions: [],
        overlays: [],
        view
      });
      mapParams.target = element;
      const map = new OlPackage__namespace.Map(mapParams);
      this._view = view;
      this._map = map;
      if (isDefined(mapInteractions) && mapInteractions.length > 0) {
        mapInteractions.forEach((interaction) => {
          this.addInteraction(interaction);
        });
      }
      if (isDefined(mapControls) && mapControls.length > 0) {
        mapControls.forEach((control) => {
          this.addControl(control);
        });
      }
      if (isDefined(mapPopups) && mapPopups.length > 0) {
        mapPopups.forEach((popup) => {
          this.addPopup(popup);
        });
      }
      this.events = new Event(this);
    }
    /** 私有守卫：运行期检查 + 类型收窄 */
    _isInitialized(method) {
      if (this._map == null || this._view == null) {
        warn_(createMessage$g(method, "未正确实例化"));
        return false;
      }
      return true;
    }
    getSize() {
      if (!this._isInitialized("getSize")) return;
      let size = this._map.getSize();
      return new Size(...size);
    }
    setSize(size) {
      if (!this._isInitialized("getSize")) return;
      let _size = size instanceof Size ? size._size : size;
      this._map.setSize(_size);
    }
    // 地图信息相关
    getCenter() {
      if (!this._isInitialized("getCenter")) return;
      let center = this._view.getCenter();
      if (!center) return;
      return new Lnglat(center[0], center[1]);
    }
    setCenter(center) {
      if (!this._isInitialized("setCenter")) return;
      if (!isDefined(center)) {
        warn_(createMessage$g("setCenter", "参数center不能为空"));
        return;
      }
      let _center = center instanceof Lnglat ? center._lnglat : center;
      this._view.setCenter(_center);
    }
    getZoom() {
      if (!this._isInitialized("getZoom")) return;
      return this._view.getZoom();
    }
    setZoom(zoom) {
      if (!this._isInitialized("setZoom")) return;
      if (!isDefined(zoom)) {
        warn_(createMessage$g("setZoom", "参数zoom不能为空"));
        return;
      }
      if (!isNumber(zoom)) {
        warn_(createMessage$g("setZoom", "参数zoom必须为number类型"));
        return;
      }
      this._view.setZoom(zoom);
    }
    getResolution() {
      if (!this._isInitialized("getResolution")) return;
      return this._view.getResolution();
    }
    setResolution(resolution) {
      if (!this._isInitialized("setResolution")) return;
      if (!isDefined(resolution)) {
        warn_(createMessage$g("setResolution", "参数resolution不能为空"));
        return;
      }
      if (!isNumber(resolution)) {
        warn_(createMessage$g("setResolution", "参数resolution必须为number类型"));
        return;
      }
      this._view.setResolution(resolution);
    }
    getRotation() {
      if (!this._isInitialized("getRotation")) return;
      return this._view.getRotation();
    }
    setRotation(rotation) {
      if (!this._isInitialized("setRotation")) return;
      if (!isDefined(rotation)) {
        warn_(createMessage$g("setRotation", "参数rotation不能为空"));
        return;
      }
      if (!isNumber(rotation)) {
        warn_(createMessage$g("setRotation", "参数rotation必须为number类型"));
        return;
      }
      this._view.setRotation(rotation);
    }
    getExtent() {
      if (!this._isInitialized("getExtent")) return;
      let _extent = this._view.calculateExtent();
      let [minX, minY, maxX, maxY] = _extent;
      return new Extent(minX, minY, maxX, maxY);
    }
    zoomIn(delta = 1) {
      if (!this._isInitialized("zoomIn")) return;
      if (isDefined(delta) && !isNumber(delta)) {
        warn_(createMessage$g("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(delta);
    }
    zoomOut(delta = -1) {
      if (!this._isInitialized("zoomIn")) return;
      if (isDefined(delta) && !isNumber(delta)) {
        warn_(createMessage$g("zoomIn", "参数delta必须为number类型"));
        return;
      }
      this._view.adjustZoom(delta);
    }
    /** 图层管理相关 */
    /**
     * 添加图层
     * @param {BaseLayer} layer 图层对象
     */
    addLayer(layer) {
      if (!this._isInitialized("addLayer")) return;
      if (!isDefined(layer)) {
        warn_(createMessage$g("addLayer", "图层对象不能为空"));
        return;
      }
      if (!(layer instanceof BaseLayer)) {
        warn_(createMessage$g("addLayer", "图层对象必须为BaseLayer类型"));
        return;
      }
      const layerId = layer.getId();
      let isExist = false;
      if (isDefined(layerId)) {
        isExist = this.getLayerById(layerId) !== void 0;
      } else {
        isExist = this.layers.some((item) => {
          return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
        });
      }
      if (isExist) {
        warn_(createMessage$g("addLayer", "图层已存在"));
        return;
      }
      if (isDefined(layer.getLayer())) {
        this.layers.push(layer);
        if (!isDefined(layer.getTarget())) {
          layer.setTarget(this);
        }
        this._map.addLayer(layer.getLayer());
      }
    }
    /**
     * 添加多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    addLayers(layers) {
      if (!this._isInitialized("addLayer")) return;
      if (!isDefined(layers)) {
        warn_(createMessage$g("addLayer", "参数layers不能为空"));
        return;
      }
      if (!isArray(layers)) {
        warn_(createMessage$g("addLayers", "参数layers必须为数组类型"));
        return;
      }
      layers.forEach((item) => {
        this.addLayer(item);
      });
    }
    /**
     * 根据id获取图层
     * @param {BaseLayerIdType} id 图层id
     * @returns {BaseLayer | undefined} 图层对象
     */
    getLayerById(id) {
      if (!isDefined(id)) {
        warn_(createMessage$g("getLayerById", "图层id不能为空"));
        return void 0;
      }
      let layer = void 0;
      this.layers.forEach((item) => {
        if (item instanceof BaseLayer) {
          if (isDefined(item.getId()) && item.getId() === id) {
            layer = item;
          }
        }
      });
      return layer;
    }
    /**
     * 移除图层
     * @param {BaseLayer} layer 图层对象
     */
    removeLayer(layer) {
      if (!this._isInitialized("removeLayer")) return;
      let index = this.layers.indexOf(layer);
      if (index !== -1) {
        if (layer._layer) {
          this.layers.splice(index, 1);
          this._map.removeLayer(layer._layer);
        }
      }
    }
    /**
     * 移除多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    removeLayers(layers) {
      if (!this._isInitialized("removeLayers")) return;
      this.layers.forEach((l, index) => {
        if (layers.includes(l)) {
          if (l._layer) {
            this.layers.splice(index, 1);
            this._map.removeLayer(l._layer);
          }
        }
      });
    }
    /**
     * 根据id移除图层
     * @param {BaseLayerIdType} id 图层id
     */
    removeLayerById(id) {
      if (!this._isInitialized("removeLayerById")) return;
      if (!isDefined(id)) {
        warn_(createMessage$g("removeLayerById", "图层id不能为空"));
        return void 0;
      }
      let layer = this.getLayerById(id);
      if (!isDefined(layer)) {
        warn_(createMessage$g("removeLayerById", `找不到id为${id}(${isString(id) ? "string" : "number"})的图层`));
        return false;
      }
      this.removeLayer(layer);
    }
    /**
     * 获取所有图层
     * @returns {Array<BaseLayer>} 图层数组
     */
    getAllLayers() {
      if (!this._isInitialized("getAllLayers")) return [];
      return this.layers;
    }
    /** 图层组管理 */
    /**
     * 添加图层组
     * @param {LayerGroup} group 图层组实例
     */
    addLayerGroup(group) {
      if (!this._isInitialized("addLayerGroup")) return;
      if (!isDefined(group)) {
        warn_(createMessage$g("addLayerGroup", "参数layerGroup不能为空"));
        return;
      }
      if (!(group instanceof LayerGroup)) {
        warn_(createMessage$g("addLayerGroup", "参数layerGroup必须为LayerGroup实例"));
        return;
      }
      let isExist = false;
      if (group.getId()) {
        isExist = this.layerGroups.some((item) => {
          return isDefined(item.getId()) && item.getId() === group.getId();
        });
      }
      if (!isExist) {
        group.setMap(this);
        this.layerGroups.push(group);
        this.addLayers(group.getAllLayers());
      }
    }
    /**
     * 移除图层组
     * @param {LayerGroup} group 图层组实例
     */
    removeLayerGroup(group) {
      if (!this._isInitialized("removeLayerGroup")) return;
      if (!isDefined(group)) {
        warn_(createMessage$g("removeLayerGroup", "参数layerGroup不能为空"));
        return;
      }
      if (!(group instanceof LayerGroup)) {
        warn_(createMessage$g("removeLayerGroup", "参数layerGroup必须为LayerGroup实例"));
        return;
      }
      let index = -1;
      if (group.getId()) {
        index = this.layerGroups.findIndex((item) => {
          return isDefined(item.getId()) && item.getId() === group.getId();
        });
      }
      if (index !== -1) {
        group.setMap(null);
        this.removeLayers(group.getAllLayers());
        this.layerGroups = this.layerGroups.splice(index, 1);
      }
    }
    /**
     * 移除图层组
     * @param {LayerGroupIdType} groupId 图层组id
     */
    removeLayerGroupById(groupId) {
      if (!this._isInitialized("removeLayerGroupById")) return;
      if (!isDefined(groupId)) {
        warn_(createMessage$g("removeLayerGroupById", "参数groupId不能为空"));
        return;
      }
      if (!isNumber(groupId) && !isString(groupId)) {
        warn_(createMessage$g("removeLayerGroupById", "参数groupId必须为number或string类型"));
        return;
      }
      let index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === groupId;
      });
      if (index !== -1) {
        this.layerGroups[index].setMap(null);
        this.removeLayers(this.layerGroups[index].getAllLayers());
        this.layerGroups = this.layerGroups.splice(index, 1);
      }
    }
    /**
     * 获取所有图层组
     * @returns {LayerGroup[]} 所有图层组
     */
    getAllLayerGroups() {
      if (!this._isInitialized("getAllLayerGroups")) return;
      return this.layerGroups;
    }
    /**
     * 获取所有图层组
     * @returns {LayerGroup[]} 所有图层组
     */
    getLayerGroups() {
      return this.getAllLayerGroups();
    }
    getLayerGroupById(groupId) {
      if (!this._isInitialized("getLayerGroupById")) return;
      if (!isDefined(groupId)) {
        warn_(createMessage$g("removeLayerGroupById", "参数groupId不能为空"));
        return;
      }
      if (!isNumber(groupId) && !isString(groupId)) {
        warn_(createMessage$g("removeLayerGroupById", "参数groupId必须为number或string类型"));
        return;
      }
      let index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === groupId;
      });
      if (index === -1) {
        warn_(createMessage$g("getLayerGroupById", "未找到图层组"));
        return;
      }
      return this.layerGroups[index];
    }
    /**
     * 事件管理
     * @param type 
     * @param callback 
     * @returns 
     */
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$g("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapMapEventType(type)) {
        warn_(createMessage$g("on", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$g("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      let isMapTarget = MapEventTypeIsMap(type);
      const target = isMapTarget ? this._map : this._view;
      const unlisten = OlEvent.listen(target, isMapTarget ? type.replace("map:", "") : type.replace("view:", ""), (e) => {
        this.events.emit(type, handleMapOnCallBack(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!this._isInitialized("once")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$g("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapMapEventType(type)) {
        warn_(createMessage$g("once", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$g("once", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      let isMapTarget = MapEventTypeIsMap(type);
      const target = isMapTarget ? this._map : this._view;
      const unlisten = OlEvent.listen(target, isMapTarget ? type.replace("map:", "") : type.replace("view:", ""), (e) => {
        this.events.emit(type, handleMapOnCallBack(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$g("un", commonMessage.paramsNotDefined("id")));
        return;
      }
      this.events.remove(id);
    }
    /** 属性管理 */
    getProperties() {
      if (!this._isInitialized("getProperties")) return;
      return defaultValue(this._map.getProperties(), {});
    }
    setProperties(properties) {
      if (!this._isInitialized("setProperties")) return;
      if (!isDefined(properties)) {
        warn_(createMessage$g("setProperties", commonMessage.paramsNotDefined("properties")));
        return;
      }
      if (!isObject(properties)) {
        warn_(createMessage$g("setProperties", commonMessage.paramsInvaildFormat("properties", "object类型")));
        return;
      }
      const newProperties = Object.assign({}, defaultValue(this.getProperties(), {}), properties);
      this._map.setProperties(newProperties);
    }
    /** 交互管理 */
    /**
     * 添加交互
     * @param {Interaction} interaction 交互对象
     */
    addInteraction(interaction) {
      if (!this._isInitialized("addInteraction")) return;
      let index = this.interactions.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getInteraction()) === OlUtil__namespace.getUid(interaction.getInteraction());
      });
      if (index !== -1) {
        warn_(createMessage$g("addInteraction", "该交互已添加到地图中"));
        return;
      }
      if (interaction instanceof Draw || interaction instanceof Measure) {
        const layer = interaction.getLayer();
        if (isDefined(layer)) {
          layer.setTarget(interaction);
          this.addLayer(layer);
        }
      }
      if (isDefined(interaction.getInteraction())) {
        let olInteractionInstance = interaction.getInteraction();
        this.interactions.push(interaction);
        this._map.addInteraction(olInteractionInstance);
        if (interaction.setMap) {
          interaction.setMap(this);
        }
        interaction.setActive(true);
        olInteractionInstance.dispatchEvent("change:active");
      }
    }
    /**
     * 获取所有交互
     * @returns {Interaction[] | undefined} 交互数组
     */
    getInteractions() {
      if (!this._isInitialized("getInteractions")) return;
      return this.interactions;
    }
    getInteractionById(id) {
      if (!this._isInitialized("addInteraction")) return;
      if (this.interactions.length === 0) return null;
      let index = this.interactions.findIndex((i) => {
        return i.id === id;
      });
      if (index === -1) {
        return null;
      }
      return this.interactions[index];
    }
    /**
     * 移除交互
     * @param {Interaction} interaction 交互对象
     */
    removeInteraction(interaction) {
      if (!this._isInitialized("removeInteraction")) return;
      let index = this.interactions.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getInteraction()) === OlUtil__namespace.getUid(interaction.getInteraction());
      });
      if (index === -1) {
        warn_(createMessage$g("removeInteraction", "该交互未添加到地图中"));
        return;
      }
      if (isDefined(interaction.getInteraction())) {
        this.interactions.splice(index, 1);
        this._map.removeInteraction(interaction.getInteraction());
        interaction.setMap(null);
      }
    }
    /**
     * 控件管理
     */
    /**
     * 添加控件
     * @param {Control} control 控件对象
     */
    addControl(control) {
      if (!this._isInitialized("addControl")) return;
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index !== -1) {
        warn_(createMessage$g("addControl", "该控件已添加到地图中"));
        return;
      }
      if (isDefined(control.getControl())) {
        this.controls.push(control);
        this._map.addControl(control.getControl());
      }
    }
    /**
     * 获取所有控件
     * @returns {Control[] | undefined} 控件数组
     */
    getControls() {
      if (!this._isInitialized("getControls")) return;
      return this.controls;
    }
    /**
     * 根据ID获取控件
     * @param {number | string} id 控件ID
     * @returns {Control | undefined} 控件对象
     */
    getControlById(id) {
      if (!this._isInitialized("getControlById")) return;
      const target = this.controls.find((item) => {
        return item.getId() === id;
      });
      return target;
    }
    /**
     * 移除控件
     * @param {Control} control 控件对象
     */
    removeControl(control) {
      if (!this._isInitialized("removeControl")) return;
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index === -1) {
        warn_(createMessage$g("removeControl", "该控件未添加到地图中"));
        return;
      }
      if (isDefined(control.getControl())) {
        this.controls.splice(index, 1);
        this._map.removeControl(control.getControl());
      }
    }
    // 弹窗管理
    /**
     * 添加弹窗
     * @param popup 
     */
    addPopup(popup) {
      if (!this._isInitialized("addPopup")) return;
      if (!isDefined(popup)) return;
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index !== -1) {
        warn_(createMessage$g("addPopup", "该弹窗已添加到地图中"));
        return;
      }
      if (isDefined(popup.getPopup())) {
        this.popups.push(popup);
        if (popup.setMap) {
          popup.setMap(this);
        }
        this._map.addOverlay(popup.getPopup());
      }
    }
    /**
     * 根据ID获取弹窗
     * @param {number | string} id 弹窗ID
     * @returns {Popup} 弹窗对象
     */
    getPopupById(id) {
      if (!this._isInitialized("getPopupById")) return;
      if (!isDefined(id)) {
        warn_(createMessage$g("getPopupById", "参数不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$g("getPopupById", "参数必须为数字或字符串"));
        return;
      }
      let popup = this.popups.find((popup2) => {
        return isDefined(popup2.getId()) && popup2.getId() === id;
      });
      return popup;
    }
    getPopupByProperties(filter) {
      if (!this._isInitialized("getPopupByProperties")) return;
      if (!isDefined(filter)) {
        warn_(createMessage$g("getPopupById", "参数不能为空"));
        return;
      }
      if (!isFunction(filter)) {
        warn_(createMessage$g("getPopupById", "参数必须为数字或字符串"));
        return;
      }
      const popups = this.popups.filter((p) => {
        if (!isDefined(p.getProperties())) return false;
        return filter(p.getProperties());
      });
      return popups;
    }
    /**
     * 获取所有弹窗
     * @returns {Popup[]} 弹窗数组
     */
    getPopups() {
      if (!this._isInitialized("getPopups")) return;
      return this.popups;
    }
    /**
     * 删除弹窗
     * @param {Popup} popup 弹窗对象
     */
    removePopup(popup) {
      if (!this._isInitialized("removePopup")) return;
      if (!isDefined(popup)) return;
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index == -1) {
        warn_(createMessage$g("removePopup", "该弹窗未添加到地图中"));
        return;
      }
      if (isDefined(popup.getPopup())) {
        this.popups.splice(index, 1);
        if (popup.setMap) {
          popup.setMap(null);
        }
        this._map.removeOverlay(popup.getPopup());
      }
    }
    /** 几何图形计算 */
    getLength(feature) {
      if (!this._isInitialized("getLength")) return;
      let length = OlSphere__namespace.getLength(feature.getGeometry(), {
        projection: this._map.getView().getProjection()
      });
      return length;
    }
    getArea(feature) {
      if (!this._isInitialized("getArea")) return;
      let area = OlSphere__namespace.getArea(feature.getGeometry(), {
        projection: this._map.getView().getProjection()
      });
      return area;
    }
    /**
     * @TODO
     * 遍历地图上指定像素位置的所有特征
     * @param pixel 像素位置
     * @param callback 回调函数
     */
    forEachFeatureAtPixel(pixel, callback, options) {
      if (!this._isInitialized("forEachFeatureAtPixel")) return;
      let _pixel = handleGetPixelValue(pixel);
      if (!isDefined(_pixel)) return;
      const params = Object.assign({}, DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS, options);
      const result = this._map.forEachFeatureAtPixel(_pixel, (feature, layer) => {
        let targetFeature = null;
        let targetLayer = null;
        this.layers.forEach((item) => {
          if (isDefined(layer) && OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer)) {
            targetLayer = item;
          }
          if (item instanceof VectorLayer) {
            let layerFeatures = defaultValue(item.getFeatures(), []);
            layerFeatures.forEach((f) => {
              if (OlUtil__namespace.getUid(feature) === OlUtil__namespace.getUid(f.getFeature())) {
                targetFeature = f;
              }
            });
          }
        });
        return callback(targetFeature, targetLayer);
      }, {
        ...params,
        layerFilter: (layer) => {
          if (!isDefined(params.layerFilter)) return true;
          const targetLayer = this.layers.find((l) => {
            return OlUtil__namespace.getUid(l) === OlUtil__namespace.getUid(layer);
          });
          return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false;
        }
      });
      return result;
    }
    getCoordinateFromPixel(pixel) {
      if (!this._isInitialized("getCoordinateFromPixel")) return;
      if (!handleGetPixelValue(pixel)) return;
      const lnglat = this._map.getCoordinateFromPixel(handleGetPixelValue(pixel));
      return new Lnglat(...lnglat);
    }
    getPixelFromCoordinate(coordinate2) {
      if (!this._isInitialized("getPixelFromCoordinate")) return;
      if (!handleGetLnglatValue(coordinate2)) return;
      const pixel = this._map.getPixelFromCoordinate(handleGetLnglatValue(coordinate2));
      return new Pixel(...pixel);
    }
    getEventCoordinate(event) {
      if (!this._isInitialized("getEventCoordinate")) return;
      return new Lnglat(...this._map.getEventCoordinate(event));
    }
    getEventPixel(event) {
      if (!this._isInitialized("getEventPixel")) return;
      return new Pixel(...this._map.getEventPixel(event));
    }
    getFeaturesAtPixel(pixel, options) {
      if (!this._isInitialized("getFeaturesAtPixel")) return;
      if (!handleGetPixelValue(pixel)) return;
      const params = Object.assign({}, DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS, options);
      let features = this._map.getFeaturesAtPixel(handleGetPixelValue(pixel), {
        ...params,
        layerFilter: (layer) => {
          if (!isDefined(params.layerFilter)) return true;
          const targetLayer = this.layers.find((l) => {
            return OlUtil__namespace.getUid(l) === OlUtil__namespace.getUid(layer);
          });
          return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false;
        }
      });
      let featureIds = features.map((f) => {
        return OlUtil__namespace.getUid(f);
      });
      if (!isDefined(features)) return [];
      const targetFeatures = [];
      this.layers.forEach((layer) => {
        if (layer instanceof VectorLayer) {
          let layerFeatures = defaultValue(layer.getFeatures(), []);
          layerFeatures.forEach((f) => {
            if (featureIds.includes(OlUtil__namespace.getUid(f.getFeature()))) {
              targetFeatures.push(f);
            }
          });
        }
      });
      return targetFeatures;
    }
    hasFeatureAtPixel(pixel, options) {
      const features = this.getFeaturesAtPixel(pixel, options);
      return isDefined(features) && features.length > 0;
    }
    render() {
      if (!this._isInitialized("render")) return;
      this._map.render();
    }
    renderSync() {
      if (!this._isInitialized("renderSync")) return;
      this._map.renderSync();
    }
    updateSize() {
      if (!this._isInitialized("updateSize")) return;
      this._map.updateSize();
    }
    /**
     * view 视图相关方法
     */
    adjustCenter(deltaCoordinates) {
      if (!this._isInitialized("adjustCenter")) return;
      if (!isDefined(deltaCoordinates)) {
        return;
      }
      this._view.adjustCenter(handleGetLnglatValue(deltaCoordinates));
    }
    adjustResolution(ratio, anchor) {
      if (!this._isInitialized("adjustResolution")) return;
      this._view.adjustResolution(ratio, anchor ? handleGetLnglatValue(anchor) : void 0);
    }
    adjustRotation(delta, anchor) {
      if (!this._isInitialized("adjustRotation")) return;
      this._view.adjustRotation(delta, anchor ? handleGetLnglatValue(anchor) : void 0);
    }
    adjustZoom(delta, anchor) {
      if (!this._isInitialized("adjustZoom")) return;
      this._view.adjustZoom(delta, anchor ? handleGetLnglatValue(anchor) : void 0);
    }
    animate(options) {
      if (!this._isInitialized("animate")) return;
      let params = Object.assign({}, OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS, {
        center: options.center ? handleGetLnglatValue(options.center) : void 0,
        resolution: options.resolution,
        rotation: options.rotation,
        zoom: options.zoom,
        anchor: options.anchor ? handleGetLnglatValue(options.anchor) : void 0,
        duration: options.duration,
        easing: isDefined(options.easing) ? OMapEasing[options.easing] : void 0
      });
      this._view.animate(params);
    }
    beginInteraction() {
      if (!this._isInitialized("updateSize")) return;
      this._view.beginInteraction();
    }
    calculateExtent(size) {
      if (!this._isInitialized("calculateExtent")) return;
      this._view.calculateExtent(isDefined(size) ? handleGetSizeValue(size) : void 0);
    }
    cancelAnimations() {
      if (!this._isInitialized("cancelAnimations")) return;
      this._view.cancelAnimations();
    }
    centerOn(coordinate2, size, position) {
      if (!this._isInitialized("centerOn")) return;
      if (!isDefined(coordinate2) || !isDefined(size) || !isDefined(position)) {
        warn_(createMessage$g("centerOn", commonMessage.paramsListHaveNotDefined("coordinate", "size", "position")));
        return;
      }
      this._view.centerOn(
        handleGetLnglatValue(coordinate2),
        handleGetSizeValue(size),
        handleGetPixelValue(position)
      );
    }
    changed() {
      if (!this._isInitialized("changed")) return;
      this._view.changed();
    }
    endInteraction(duration, resolutionDirection, anchor) {
      if (!this._isInitialized("endInteraction")) return;
      this._view.endInteraction(duration, resolutionDirection, handleGetLnglatValue(anchor));
    }
    fit(featureOrExtent, options) {
      if (!this._isInitialized("fit")) return;
      if (!(featureOrExtent instanceof BasicFeature || featureOrExtent instanceof Extent)) {
        warn_(createMessage$g("setProperties", commonMessage.paramsInvaildFormat("featureOrExtent", "BaseFeature或Extent类型")));
        return;
      }
      let target = featureOrExtent instanceof BasicFeature ? featureOrExtent.getGeometry() : handleGetExtentValue(featureOrExtent);
      const _options = isDefined(options) ? Object.assign({}, OMAP_VIEW_FIT_DEFAULT_OPTIONS, {
        ...options,
        size: handleGetSizeValue(options.size),
        easing: isDefined(options.easing) ? OMapEasing[options.easing] : void 0,
        padding: isDefined(options.padding) ? isNumber(options.padding) ? [options.padding, options.padding, options.padding, options.padding] : options.padding : [0, 0, 0, 0]
      }) : {
        ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
        easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing],
        padding: [0, 0, 0, 0],
        size: void 0
      };
      this._view.fit(target, _options);
    }
    getAnimating() {
      if (!this._isInitialized("updateSize")) return;
      return this._view.getAnimating();
    }
    getInteracting() {
      if (!this._isInitialized("getInteracting")) return;
      return this._view.getInteracting();
    }
    getMaxResolution() {
      if (!this._isInitialized("getMaxResolution")) return;
      return this._view.getMaxResolution();
    }
    getMinResolution() {
      if (!this._isInitialized("getMinResolution")) return;
      return this._view.getMinResolution();
    }
    getMaxZoom() {
      if (!this._isInitialized("getMaxZoom")) return;
      return this._view.getMaxZoom();
    }
    getMinZoom() {
      if (!this._isInitialized("getMinZoom")) return;
      return this._view.getMinZoom();
    }
    getProjection() {
      if (!this._isInitialized("getProjection")) return;
      return this.projection;
    }
    getResolutionForExtent() {
    }
    getResolutionForZoom(zoom) {
    }
    getZoomForResolution() {
    }
    getResolutions() {
    }
    setConstrainResolution(enabled) {
      if (!this._isInitialized("setConstrainResolution")) return;
      if (!isBoolean(enabled)) {
        warn_(createMessage$g("setProperties", commonMessage.paramsInvaildFormat("enabled", "boolean类型")));
        return;
      }
      return this._view.setConstrainResolution(enabled);
    }
    setMaxZoom(maxZoom) {
      if (!this._isInitialized("setMaxZoom")) return;
      this._view.setMaxZoom(maxZoom);
    }
    setMinZoom(minZoom) {
      if (!this._isInitialized("setMinZoom")) return;
      this._view.setMinZoom(minZoom);
    }
  };
  const GaodeLayerType = {
    Vec: "vec",
    Img: "img",
    Road: "road"
  };
  const DEFAULT_GAODE_LAYER_PARAMS = {
    preload: 0,
    cacheSize: 512
  };
  const DEFAULT_GAODE_LAYER_SOURCE_PARAMS = {
    attributionsCollapsible: true,
    interpolate: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    maxZoom: 42,
    minZoom: 0,
    tilePixelRatio: 1,
    tileSize: [256, 256],
    gutter: 0,
    wrapX: true,
    transition: 250,
    zDirection: 0
  };
  const GaodeLayerTypeUrls = {
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
  function getGaodeLayerUrlsByType(type) {
    return GaodeLayerTypeUrls[type];
  }
  let PACKAGE_NAME$f = "GaodeLayer";
  let createMessage$f = getPackageMessage(PACKAGE_NAME$f);
  class GaodeLayer extends BaseLayer {
    constructor(type, options) {
      super("Gaode", defaultValue(options, {}));
      /**
       * 图层类型
       */
      __publicField(this, "gaodeType", null);
      if (!isDefined(type)) {
        error_(createMessage$f("GaodeLayer", "type参数不能为空"));
        return;
      }
      let _layerParams = Object.assign({}, DEFAULT_GAODE_LAYER_PARAMS, {
        ...defaultValue(options, {}),
        source: void 0,
        map: void 0
      });
      this.gaodeType = type;
      let _sourceParams = Object.assign({}, DEFAULT_GAODE_LAYER_SOURCE_PARAMS, {
        ...defaultValue(options == null ? void 0 : options.source, {})
      });
      let _source = void 0;
      if (isDefined(options) && isDefined(options.source)) {
        let _tileGrid = void 0;
        if (isDefined(_sourceParams.tileGrid)) {
          _tileGrid = new OlTileGrid__namespace.TileGrid({
            ..._sourceParams.tileGrid,
            extent: handleGetExtentValue(_sourceParams.tileGrid.extent),
            origin: handleGetLnglatValue(_sourceParams.tileGrid.origin),
            origins: isDefined(_sourceParams.tileGrid.origins) ? _sourceParams.tileGrid.origins.map((item) => {
              if (item instanceof Lnglat) {
                return handleGetLnglatValue(item);
              }
              return item;
            }) : void 0,
            sizes: isDefined(_sourceParams.tileGrid.sizes) ? _sourceParams.tileGrid.sizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0,
            tileSize: isDefined(_sourceParams.tileGrid.tileSize) ? isNumber(_sourceParams.tileGrid.tileSize) ? _sourceParams.tileGrid.tileSize : handleGetSizeValue(_sourceParams.tileGrid.tileSize) : void 0,
            tileSizes: isDefined(_sourceParams.tileGrid.tileSizes) ? _sourceParams.tileGrid.tileSizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0
          });
        }
        _source = new OlSource__namespace.XYZ({
          ..._sourceParams,
          urls: getGaodeLayerUrlsByType(this.gaodeType),
          tileGrid: _tileGrid
        });
      } else {
        _source = new OlSource__namespace.XYZ({
          ..._sourceParams,
          urls: getGaodeLayerUrlsByType(this.gaodeType)
        });
      }
      this._layer = new OlLayer__namespace.Tile({
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : void 0,
        source: _source
      });
      this._initLayerEvent();
    }
  }
  const PACKAGE_NAME$e = "ProjUtil";
  const createMessage$e = getPackageMessage(PACKAGE_NAME$e);
  class ProjUtil {
    static fromLonLat(coordinate2, projection) {
      if (!isDefined(coordinate2)) {
        warn_(createMessage$e("fromLonLat", "coordinate参数不能为空"));
        return void 0;
      }
      let _coords = coordinate2;
      if (coordinate2 instanceof Lnglat) {
        _coords = coordinate2._lnglat;
      }
      let _proj = isDefined(projection) ? isString(projection) ? new Projection(projection) : projection : new Projection("EPSG:3857");
      let result = OlProj__namespace.fromLonLat(_coords, _proj._projection);
      return new Lnglat(result[0], result[1]);
    }
    static toLonLat(coordinate2, projection) {
      if (!isDefined(coordinate2)) {
        warn_(createMessage$e("toLonLat", "coordinate参数不能为空"));
        return void 0;
      }
      let _coords = coordinate2;
      if (coordinate2 instanceof Lnglat) {
        _coords = coordinate2._lnglat;
      }
      let _proj = isDefined(projection) ? isString(projection) ? new Projection(projection) : projection : new Projection("EPSG:3857");
      let result = OlProj__namespace.toLonLat(_coords, _proj._projection);
      return new Lnglat(result[0], result[1]);
    }
  }
  const MapTokenName = "OMapToken";
  const MapToken = {
    tdt: null
  };
  function saveToken(key, value) {
    if (!window[MapTokenName]) {
      window[MapTokenName] = {};
    }
    window[MapTokenName][key] = value;
  }
  const MapTokenProxy = new Proxy(MapToken, {
    set: function(target, prop, value, receiver) {
      saveToken(prop, value);
      return Reflect.set(target, prop, value, receiver);
    }
  });
  const OMapFormatType = {
    GeoJSON: "GeoJSON",
    WKT: "WKT",
    KML: "KML"
  };
  const DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS = {};
  function isVaildFormatType(type) {
    return Object.values(OMapFormatType).includes(type);
  }
  function getGeoJSONDefaultOptions() {
    return {
      dataProjection: "EPSG:4326",
      extractGeometryName: false
    };
  }
  function getWKTDefaultOptions() {
    return {
      splitCollection: false
    };
  }
  function getKMLOptionsDefaultOptions() {
    return {
      extractStyles: false,
      showPointNames: false,
      writeStyles: false,
      crossOrigin: null
    };
  }
  function getDefaultOptionsByType(type) {
    switch (type) {
      case OMapFormatType.GeoJSON:
        return getGeoJSONDefaultOptions();
      case OMapFormatType.WKT:
        return getWKTDefaultOptions();
      case OMapFormatType.KML:
        return getKMLOptionsDefaultOptions();
      default:
        return {};
    }
  }
  function handleGetProjectionValue(projection) {
    if (isDefined(projection)) {
      return projection instanceof Projection ? projection.getProjection() : projection;
    }
    return void 0;
  }
  function readFeature$2(source, options) {
    const format = getFormatTool();
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures$2(source, options) {
    const format = getFormatTool();
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeature$1(feature, options) {
    const format = getFormatTool();
    const source = format.writeFeature(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatureObject(feature, options) {
    const format = getFormatTool();
    const source = format.writeFeatureObject(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatures$2(features, options) {
    const format = getFormatTool();
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeaturesObject(features, options) {
    const format = getFormatTool();
    const source = format.writeFeaturesObject(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  const GeoJSON = {
    readFeature: readFeature$2,
    readFeatures: readFeatures$2,
    writeFeature: writeFeature$1,
    writeFeatureObject,
    writeFeatures: writeFeatures$2,
    writeFeaturesObject
  };
  function readFeature$1(source, options) {
    const format = getFormatTool();
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures$1(source, options) {
    const format = getFormatTool();
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeature(feature, options) {
    const format = getFormatTool();
    const source = format.writeFeature(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatures$1(features, options) {
    const format = getFormatTool();
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  const WKT = {
    readFeature: readFeature$1,
    readFeatures: readFeatures$1,
    writeFeature,
    writeFeatures: writeFeatures$1
  };
  const WKT$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: WKT
  }, Symbol.toStringTag, { value: "Module" }));
  function readFeature(source, options) {
    const format = getFormatTool();
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures(source, options) {
    const format = getFormatTool();
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeatures(features, options) {
    const format = getFormatTool();
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeaturesNode(features, options) {
    const format = getFormatTool();
    const source = format.writeFeaturesObject(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  const KML = {
    readFeature,
    readFeatures,
    writeFeatures,
    writeFeaturesNode
  };
  const KML$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    default: KML
  }, Symbol.toStringTag, { value: "Module" }));
  let formatTool = null;
  function updateFormatTool(format) {
    formatTool = format;
  }
  function getFormatTool() {
    return formatTool;
  }
  function getMoudule(type) {
    let module2 = null;
    switch (type) {
      case OMapFormatType.GeoJSON:
        module2 = GeoJSON;
        break;
      case OMapFormatType.WKT:
        module2 = WKT$1;
        break;
      case OMapFormatType.KML:
        module2 = KML$1;
        break;
    }
    return module2;
  }
  function handle(type, key, ...args) {
    const module2 = getMoudule(type);
    if (isDefined(module2) && isDefined(module2[key])) {
      return module2[key](...args);
    } else {
      error_(createMessage$d(key, `当前格式化工具不支持${key}方法`));
      return void 0;
    }
  }
  function handleReadFeature(type, source, options) {
    return handle(type, "readFeature", source, options);
  }
  function handleReadFeatures(type, source, options) {
    return handle(type, "readFeatures", source, options);
  }
  function handleWriteFeature(type, feature, options) {
    return handle(type, "writeFeature", feature, options);
  }
  function handleWriteFeatureObject(type, feature, options) {
    return handle(type, "writeFeatureObject", feature, options);
  }
  function handleWriteFeatures(type, features, options) {
    return handle(type, "writeFeatures", features, options);
  }
  function handleWriteFeaturesObject(type, features, options) {
    return handle(type, "writeFeaturesObject", features, options);
  }
  const PACKAGE_NAME$d = "Format";
  const createMessage$d = getPackageMessage(PACKAGE_NAME$d);
  class Format {
    constructor(type, options) {
      __publicField(this, "type");
      __publicField(this, "options");
      __publicField(this, "_format");
      if (!isDefined(type)) {
        error_(createMessage$d("constructor", "初始化参数有误"));
        return;
      }
      if (!isVaildFormatType(type)) {
        error_(createMessage$d("constructor", "初始化参数有误"));
        return;
      }
      this.type = type;
      this.options = defaultValue(Object.assign({}, getDefaultOptionsByType(type), options), {});
      this._initFormat();
    }
    /**
     * 初始化
     */
    _initFormat() {
      switch (this.type) {
        case OMapFormatType.GeoJSON:
          this._format = new OlFormat__namespace.GeoJSON({
            ...this.options,
            dataProjection: handleGetProjectionValue(this.options.dataProjection),
            featureProjection: handleGetProjectionValue(this.options.featureProjection)
          });
          break;
        case OMapFormatType.WKT:
          this._format = new OlFormat__namespace.WKT({
            ...this.options
          });
          break;
        case OMapFormatType.KML:
          this._format = new OlFormat__namespace.KML({
            ...this.options,
            defaultStyle: defaultValue(handleGetStyleValue(this.options.defaultStyle), void 0)
          });
          break;
      }
      updateFormatTool(this._format);
    }
    readFeature(source, options) {
      return handleReadFeature(this.type, source, options);
    }
    readFeatures(source, options) {
      return handleReadFeatures(this.type, source, options);
    }
    writeFeature(feature, options) {
      return handleWriteFeature(this.type, feature, options);
    }
    writeFeatureObject(feature, options) {
      return handleWriteFeatureObject(this.type, feature, options);
    }
    writeFeatures(features, options) {
      return handleWriteFeatures(this.type, features, options);
    }
    writeFeaturesObject(features, options) {
      return handleWriteFeaturesObject(this.type, features, options);
    }
  }
  const commonUrlTemplate = `http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}`;
  function getTdtServiceUrl(type, proj) {
    return commonUrlTemplate.replace(/\{T\}/g, type + "_" + proj).replace(/\{tk\}/g, MapTokenProxy.tdt);
  }
  let PACKAGE_NAME$c = "TdtLayer";
  let createMessage$c = getPackageMessage(PACKAGE_NAME$c);
  class TdtLayer extends BaseLayer {
    constructor(type, options) {
      var _a, _b, _c;
      super("Tdt", options);
      /**
       * 图层类型
       */
      __publicField(this, "tdtType", null);
      if (!isDefined(MapTokenProxy.tdt)) {
        warn_(createMessage$c("constructor", "缺少天地图key，请提前申明"));
        return;
      }
      if (!isDefined(type)) {
        error_(createMessage$c("constructor", "缺少参数天地图图层类型"));
        return;
      }
      let _layeroptions = options || {};
      this.tdtType = type;
      this._layer = new OlLayer__namespace.Tile({
        ..._layeroptions,
        extent: isDefined(_layeroptions.extent) ? (_a = _layeroptions.extent) == null ? void 0 : _a._extent : void 0,
        map: isDefined(_layeroptions.map) ? (_b = _layeroptions.map) == null ? void 0 : _b._map : void 0,
        background: isDefined(_layeroptions.background) ? (_c = _layeroptions.background) == null ? void 0 : _c._color : void 0,
        source: new OlSource__namespace.XYZ({
          url: getTdtServiceUrl(type, (options == null ? void 0 : options.proj) || "w")
        })
      });
      this._initLayerEvent();
    }
  }
  const TdtLayerType = {
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
  };
  const DEFAULT_TILE_LAYER_PARAMS = {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
  };
  let PACKAGE_NAME$b = "TileLayer";
  let createMessage$b = getPackageMessage(PACKAGE_NAME$b);
  class TileLayer extends BaseLayer {
    constructor(options) {
      super("Tile", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        error_(createMessage$b("constructor", "source参数是必须的"));
        return;
      }
      let _layerParams = Object.assign({}, {
        ...DEFAULT_TILE_LAYER_PARAMS
      }, {
        ...options,
        source: void 0,
        map: void 0
      });
      defaultValue(options.source, {});
      this._layer = new OlLayer__namespace.Tile({
        // 以下这些是基础属性赋值
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : void 0
      });
      this._initLayerEvent();
    }
  }
  const DEFAULT_XYZ_LAYER_PARAMS = {
    preload: 0,
    cacheSize: 512
  };
  const DEFAULT_XYZ_LAYER_SOURCE_PARAMS = {
    attributionsCollapsible: true,
    interpolate: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    maxZoom: 42,
    minZoom: 0,
    tilePixelRatio: 1,
    tileSize: [256, 256],
    gutter: 0,
    wrapX: true,
    transition: 250,
    zDirection: 0
  };
  let PACKAGE_NAME$a = "TileLayer";
  let createMessage$a = getPackageMessage(PACKAGE_NAME$a);
  class XYZLayer extends BaseLayer {
    constructor(options) {
      super("XYZ", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        error_(createMessage$a("constructor", "source参数是必须的"));
        return;
      }
      let _layerParams = Object.assign({}, DEFAULT_XYZ_LAYER_PARAMS, {
        ...options,
        source: void 0,
        map: void 0
      });
      let _sourceParams = Object.assign({}, DEFAULT_XYZ_LAYER_SOURCE_PARAMS, {
        ...defaultValue(options.source, {})
      });
      let _source = void 0;
      if (isDefined(options.source)) {
        let _tileGrid = void 0;
        if (isDefined(_sourceParams.tileGrid)) {
          _tileGrid = new OlTileGrid__namespace.TileGrid({
            ..._sourceParams.tileGrid,
            extent: handleGetExtentValue(_sourceParams.tileGrid.extent),
            origin: handleGetLnglatValue(_sourceParams.tileGrid.origin),
            origins: isDefined(_sourceParams.tileGrid.origins) ? _sourceParams.tileGrid.origins.map((item) => {
              if (item instanceof Lnglat) {
                return handleGetLnglatValue(item);
              }
              return item;
            }) : void 0,
            sizes: isDefined(_sourceParams.tileGrid.sizes) ? _sourceParams.tileGrid.sizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0,
            tileSize: isDefined(_sourceParams.tileGrid.tileSize) ? isNumber(_sourceParams.tileGrid.tileSize) ? _sourceParams.tileGrid.tileSize : handleGetSizeValue(_sourceParams.tileGrid.tileSize) : void 0,
            tileSizes: isDefined(_sourceParams.tileGrid.tileSizes) ? _sourceParams.tileGrid.tileSizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0
          });
        }
        _source = new OlSource__namespace.XYZ({
          ..._sourceParams,
          tileGrid: _tileGrid
        });
      }
      this._layer = new OlLayer__namespace.Tile({
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : void 0,
        source: _source
      });
      this._initLayerEvent();
    }
  }
  const DEFAULT_WMTS_LAYER_PARAMS = {
    preload: 0,
    cacheSize: 512
  };
  const DEFAULT_WMTS_LAYER_SOURCE_PARAMS = {
    attributionsCollapsible: true,
    interpolate: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    requestEncoding: "KVP",
    layer: "",
    style: "",
    tilePixelRatio: 1,
    format: "image/jpeg",
    version: "1.0.0",
    matrixSet: "EPSG:3857",
    wrapX: true,
    transition: 250,
    zDirection: 0
  };
  let PACKAGE_NAME$9 = "WMTSLayer";
  let createMessage$9 = getPackageMessage(PACKAGE_NAME$9);
  class WMTSLayer extends BaseLayer {
    constructor(options) {
      super("WMS", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$9("constructor", "缺少source参数"));
        return;
      }
      let _layerParams = Object.assign({}, DEFAULT_WMTS_LAYER_PARAMS, {
        ...options,
        source: void 0,
        map: void 0
      });
      let _sourceParams = Object.assign({}, DEFAULT_WMTS_LAYER_SOURCE_PARAMS, {
        ...defaultValue(options.source, {})
      });
      console.log("_sourceParams");
      console.log(_sourceParams);
      let _source = void 0;
      if (isDefined(options.source)) {
        let _tileGrid = void 0;
        if (isDefined(_sourceParams.tileGrid)) {
          _tileGrid = new OlTileGrid__namespace.WMTS({
            ..._sourceParams.tileGrid,
            extent: handleGetExtentValue(_sourceParams.tileGrid.extent),
            origin: handleGetLnglatValue(_sourceParams.tileGrid.origin),
            origins: isDefined(_sourceParams.tileGrid.origins) ? _sourceParams.tileGrid.origins.map((item) => {
              if (item instanceof Lnglat) {
                return handleGetLnglatValue(item);
              }
              return item;
            }) : void 0,
            sizes: isDefined(_sourceParams.tileGrid.sizes) ? _sourceParams.tileGrid.sizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0,
            tileSize: isDefined(_sourceParams.tileGrid.tileSize) ? isNumber(_sourceParams.tileGrid.tileSize) ? _sourceParams.tileGrid.tileSize : handleGetSizeValue(_sourceParams.tileGrid.tileSize) : void 0,
            tileSizes: isDefined(_sourceParams.tileGrid.tileSizes) ? _sourceParams.tileGrid.tileSizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0
          });
        }
        _source = new OlSource__namespace.WMTS({
          ..._sourceParams,
          projection: handleGetProjectionValue(_sourceParams.projection),
          tileGrid: _tileGrid
        });
      }
      this._layer = new OlLayer__namespace.Tile({
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : void 0,
        source: _source
      });
      this._initLayerEvent();
    }
  }
  const DEFAULT_WMS_LAYER_PARAMS = {
    preload: 0,
    cacheSize: 512
  };
  const DEFAULT_WMS_LAYER_SOURCE_PARAMS = {
    attributionsCollapsible: true,
    interpolate: true,
    params: {},
    hidpi: true,
    projection: "EPSG:3857",
    reprojectionErrorThreshold: 0.5,
    gutter: 0,
    wrapX: true,
    transition: 250,
    zDirection: 0
  };
  let PACKAGE_NAME$8 = "WMSLayer";
  let createMessage$8 = getPackageMessage(PACKAGE_NAME$8);
  class WMSLayer extends BaseLayer {
    constructor(options) {
      super("WMS", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$8("constructor", "缺少source参数"));
        return;
      }
      let _layerParams = Object.assign({}, DEFAULT_WMS_LAYER_PARAMS, {
        ...options,
        source: void 0,
        map: void 0
      });
      let _sourceParams = Object.assign({}, DEFAULT_WMS_LAYER_SOURCE_PARAMS, {
        ...defaultValue(options.source, {})
      });
      let _source = void 0;
      if (isDefined(options.source)) {
        let _tileGrid = void 0;
        if (isDefined(_sourceParams.tileGrid)) {
          _tileGrid = new OlTileGrid__namespace.TileGrid({
            ..._sourceParams.tileGrid,
            extent: handleGetExtentValue(_sourceParams.tileGrid.extent),
            origin: handleGetLnglatValue(_sourceParams.tileGrid.origin),
            origins: isDefined(_sourceParams.tileGrid.origins) ? _sourceParams.tileGrid.origins.map((item) => {
              if (item instanceof Lnglat) {
                return handleGetLnglatValue(item);
              }
              return item;
            }) : void 0,
            sizes: isDefined(_sourceParams.tileGrid.sizes) ? _sourceParams.tileGrid.sizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0,
            tileSize: isDefined(_sourceParams.tileGrid.tileSize) ? isNumber(_sourceParams.tileGrid.tileSize) ? _sourceParams.tileGrid.tileSize : handleGetSizeValue(_sourceParams.tileGrid.tileSize) : void 0,
            tileSizes: isDefined(_sourceParams.tileGrid.tileSizes) ? _sourceParams.tileGrid.tileSizes.map((item) => {
              if (item instanceof Size) {
                return handleGetSizeValue(item);
              }
              return item;
            }) : void 0
          });
        }
        _source = new OlSource__namespace.TileWMS({
          ..._sourceParams,
          projection: handleGetProjectionValue(_sourceParams.projection),
          tileGrid: _tileGrid
        });
      }
      this._layer = new OlLayer__namespace.Tile({
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        background: isDefined(_layerParams.background) ? handleGetColorValue(_layerParams.background) : void 0,
        source: _source
      });
      this._initLayerEvent();
    }
  }
  const DEFAULT_IMAGE_LAYER_PARAMS = {};
  const DEFAULT_IMAGE_STATIC_SOURCE_PARAMS = {
    interpolate: true,
    imageExtent: new Extent(0, 0, 0, 0),
    url: ""
  };
  let PACKAGE_NAME$7 = "ImageLayer";
  let createMessage$7 = getPackageMessage(PACKAGE_NAME$7);
  class ImageLayer extends BaseLayer {
    constructor(options) {
      super("Image", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$7("constructor", "缺少source参数"));
        return;
      }
      let _layerParams = Object.assign({}, DEFAULT_IMAGE_LAYER_PARAMS, {
        ...options,
        source: void 0,
        map: void 0
      });
      let _sourceParams = Object.assign({}, DEFAULT_IMAGE_STATIC_SOURCE_PARAMS, {
        ...defaultValue(options.source, {})
      });
      let _source = void 0;
      if (isDefined(options.source)) {
        _source = new OlSource__namespace.ImageStatic({
          ..._sourceParams,
          extent: isDefined(_sourceParams.imageExtent) ? handleGetExtentValue(_sourceParams.imageExtent) : void 0,
          projection: handleGetProjectionValue(_sourceParams.projection)
        });
      }
      this._layer = new OlLayer__namespace.Image({
        ..._layerParams,
        extent: isDefined(_layerParams.extent) ? handleGetExtentValue(_layerParams.extent) : void 0,
        source: _source
      });
      this._initLayerEvent();
    }
  }
  function handleDragBoxEvent(target, type, e) {
    let result = {
      target,
      type,
      pixel: new Pixel(e.pixel[0], e.pixel[1]),
      coordinate: new Lnglat(e.coordinate[0], e.coordinate[1])
    };
    return result;
  }
  const DragBoxParamsBoxEndHandle = {
    function: null,
    initFunction: (e) => {
      DragBoxParamsBoxEndHandle.function = e;
    },
    emit: (e) => {
      if (isDefined(DragBoxParamsBoxEndHandle.function)) {
        DragBoxParamsBoxEndHandle.function(e);
      }
    },
    destroy: () => {
      DragBoxParamsBoxEndHandle.function = null;
    }
  };
  const PACKAGE_NAME$6 = "DragBox";
  const createMessage$6 = getPackageMessage(PACKAGE_NAME$6);
  class DragBox extends Interaction {
    constructor(params) {
      super("DragBox");
      __publicField(this, "extent", null);
      if (isDefined(params) && isDefined(params.onBoxEnd) && isFunction(params.onBoxEnd)) {
        DragBoxParamsBoxEndHandle.initFunction(params.onBoxEnd);
      }
      let _params = Object.assign({}, defaultValue(params, {}));
      this._interaction = new OlInteraction__namespace.DragBox(_params);
      this.initInteractionEvent();
      this._initDragBoxEvent();
      this.events = new Event(this);
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
    _initDragBoxEvent() {
      this._interaction.on("boxend", (e) => {
        const extent = this._interaction.getGeometry().getExtent();
        if (isDefined(extent)) {
          this.extent = new Extent(extent);
        }
        DragBoxParamsBoxEndHandle.emit({
          coordinate: new Lnglat(...e.coordinate),
          target: this,
          extent: this.extent
        });
      });
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$6("on", "参数不能为空"));
        return;
      }
      let list = this.events.get(type);
      if (!isDefined(list) || list.length === 0) {
        this._interaction.on(type, (e) => {
          this.events.emit(type, handleDragBoxEvent(this, type, e));
        });
      }
      const id = this.events.on(type, callback);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$6("un", "参数不能为空"));
        return;
      }
      if (!isNumber(id)) {
        warn_(createMessage$6("un", "事件ID应为number类型"));
        return;
      }
      this.events.remove(id);
    }
    once(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$6("on", "参数不能为空"));
        return;
      }
      let list = this.events.get(type);
      if (!isDefined(list) || list.length === 0) {
        this._interaction.once(type, (e) => {
          this.events.emit(type, handleDragBoxEvent(this, type, e));
        });
      }
      const id = this.events.once(type, callback);
      return id;
    }
    destroy() {
      DragBoxParamsBoxEndHandle.destroy();
      super.destroy();
    }
  }
  const OMapInteractionExtentEventTypes = [...OMapInteractionEventTypes, "extentchanged"];
  function isOMapInteractionExtentEventType(value) {
    return typeof value === "string" && OMapInteractionExtentEventTypes.includes(value);
  }
  function handleInteractionExtentEvent(target, type, e) {
    return {
      target,
      type,
      extent: isDefined(e.extent) ? new Extent(e.extent) : null
    };
  }
  const PACKAGE_NAME$5 = "InteractionExtent";
  const createMessage$5 = getPackageMessage(PACKAGE_NAME$5);
  const defaultExtentOptions = {
    condition: void 0,
    extent: void 0,
    boxStyle: void 0,
    pixelTolerance: 10,
    pointerStyle: void 0,
    wrapX: false
  };
  class InteractionExtent extends Interaction {
    constructor(params) {
      super("InteractionExtent");
      let _params = {
        ...defaultValue(params, {})
      };
      if (isDefined(_params.boxStyle)) {
        _params.boxStyle = handleGetStyleValue(_params.boxStyle);
      }
      this._interaction = new OlInteraction__namespace.Extent(Object.assign({}, defaultExtentOptions, defaultValue(_params, {})));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
    /**
     * 获取当前选框范围
     * @returns {Extent | undefined} 当前选框范围
     */
    getExtent() {
      if (!this._isInitialized("getExtent")) return;
      let extent = this._interaction.getExtent();
      return isDefined(extent) ? new Extent(...extent) : void 0;
    }
    /**
     * 设置当前选框范围
     * @param {OMapExtentType} extent 选框范围
     */
    setExtent(extent) {
      if (!this._isInitialized("setExtent")) return;
      if (!isDefined(extent)) {
        warn_(createMessage$5("setExtent", commonMessage.paramsNotDefined("extent")));
        return;
      }
      if (!isExtentType(extent) || !(extent instanceof Extent)) {
        warn_(createMessage$5("setExtent", commonMessage.paramsInvaildFormat("extent", "OMap.Extent 或者 Extent数组")));
        return;
      }
      let _extent = handleGetExtentValue(extent);
      this._interaction.setExtent(_extent);
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$5("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionExtentEventType(type)) {
        warn_(createMessage$5("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$5("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!this._isInitialized("once")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$5("once", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionExtentEventType(type)) {
        warn_(createMessage$5("once", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$5("once", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$5("un", commonMessage.paramsNotDefined(id)));
        return;
      }
      if (!isNumber(id)) {
        warn_(createMessage$5("un", commonMessage.paramsInvaildFormat(id, "string")));
        return;
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionModifyEventTypes = [...OMapInteractionEventTypes, "modifystart", "modifyend"];
  function isOMapInteractionModifyEventType(value) {
    return isString(value) && OMapInteractionModifyEventTypes.includes(value);
  }
  function handleModifyEvent(target, type, e) {
    let result = {
      target,
      type,
      mapBrowserEvent: e.mapBrowserEvent
    };
    return result;
  }
  const PACKAGE_NAME$4 = "Modify";
  const createMessage$4 = getPackageMessage(PACKAGE_NAME$4);
  const defaultModifyOptions = {
    condition: void 0,
    deleteCondition: void 0,
    insertVertexCondition: void 0,
    pixelTolerance: 10,
    style: void 0,
    source: void 0,
    hitDetection: void 0,
    features: void 0,
    wrapX: false,
    snapToPointer: false
  };
  class Modify extends Interaction {
    constructor(params) {
      if (!isDefined(params)) {
        error_(createMessage$4("init", "params参数不能为空"));
      }
      super("Modify");
      __publicField(this, "records", []);
      let modify_source = null;
      if (!isDefined(params.layer)) {
        warn_(createMessage$4("init", "layer参数不能为空"));
      }
      if (isDefined(params.layer) && !(params.layer instanceof VectorLayer)) {
        warn_(createMessage$4("init", "layer参数不属于VectorLayer类型"));
      }
      this.layer = params.layer;
      modify_source = params.layer.getSource();
      let _params = Object.assign({}, defaultModifyOptions, {
        ...params,
        source: modify_source
      });
      this._interaction = new OlInteraction__namespace.Modify(_params);
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
      this._initModifyEvent();
    }
    _initModifyEvent() {
      if (!this._isInitialized("_initModifyEvent")) return;
      let originFeatures = this.layer.getFeatures();
      let originFeaturesList = (originFeatures || []).map((o) => {
        return {
          id: o.id,
          originFeatureId: OlUtil__namespace.getUid(o._feature),
          type: o.type,
          coordinates: o.getCoordinates()
        };
      });
      this.records.push({
        time: getCurrentDateTime(),
        features: originFeaturesList,
        version: 1
      });
      this._interaction.on("modifyend", (e) => {
        let features = e.features.getArray();
        let newList = [];
        features.forEach((f) => {
          let target = this.layer.getFeatures().find((item) => {
            return OlUtil__namespace.getUid(item.getFeature()) === OlUtil__namespace.getUid(f);
          });
          if (target) {
            newList.push({
              id: target.id,
              originFeatureId: OlUtil__namespace.getUid(target._feature),
              type: target.type,
              coordinates: target.getCoordinates()
            });
          }
        });
        this.records.push({
          time: getCurrentDateTime(),
          features: newList,
          version: this.records.length + 1
        });
      });
    }
    canInsertPoint() {
      if (!this._isInitialized("canInsertPoint")) return;
      return this._interaction.canInsertPoint();
    }
    canRemovePoint() {
      if (!this._isInitialized("canRemovePoint")) return;
      return this._interaction.canRemovePoint();
    }
    /**
     * 插入一个点
     * @param {OMapCoordinateType} coordinates 点的坐标
     */
    insertPoint(coordinates) {
      if (!this._isInitialized("insertPoint")) return;
      if (!isDefined(coordinates)) {
        warn_(createMessage$4("insertPoint", "coordinates参数不能为空"));
        return;
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      return this._interaction.insertPoint(_coordinates);
    }
    /**
     * 删除一个点
     * @param {OMapCoordinateType} coordinates 点的坐标
     */
    removePoint(coordinates) {
      if (!this._isInitialized("removePoint")) return;
      if (!isDefined(coordinates)) {
        warn_(createMessage$4("removePoint", "coordinates参数不能为空"));
        return;
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      return this._interaction.removePoint(_coordinates);
    }
    /**
     * 撤销修改
     */
    revoke(step = 1) {
      if (!this._isInitialized("revoke")) return;
      if (this.records.length === 1) return false;
      let nowIndex = this.records.length - 1;
      let targetIndex = nowIndex - step;
      if (targetIndex === 0) {
        this.cancel();
        return false;
      }
      const { features } = this.records[targetIndex];
      features.forEach((f) => {
        let target = this.layer.getFeatures().find((item) => {
          if (f.id) {
            return f.id === item.id;
          }
          return OlUtil__namespace.getUid(item._feature) === f.originFeatureId;
        });
        if (isDefined(target)) {
          target.setCoordinates(f.coordinates);
        }
      });
      this.records.splice(targetIndex + 1);
      return true;
    }
    /**
     * 取消当前全部修改，也就是回到初始状态
     */
    cancel() {
      const { features } = this.records[0];
      features.forEach((f) => {
        let target = this.layer.getFeatures().find((item) => {
          if (f.id) {
            return f.id === item.id;
          }
          return OlUtil__namespace.getUid(item._feature) === f.originFeatureId;
        });
        if (target) {
          target.setCoordinates(f.coordinates);
        }
      });
      this.records = [
        this.records[0]
      ];
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$4("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionModifyEventType(type)) {
        warn_(createMessage$4("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$4("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$4("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionModifyEventType(type)) {
        warn_(createMessage$4("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$4("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$4("un", commonMessage.paramsNotDefined(id)));
        return;
      }
      if (!isString(id)) {
        warn_(createMessage$4("un", commonMessage.paramsInvaildFormat(id, "string")));
        return;
      }
      this.events.remove(id);
    }
  }
  let selectLayers = [];
  let selectFeatures = [];
  function updateSelectLayers(layers) {
    selectLayers = layers;
  }
  function updateSelectFeatures(features) {
    selectFeatures = features;
    selectLayers = [];
  }
  function getTargetFeature(id) {
    let result = null;
    if (selectLayers.length) {
      for (const layer of selectLayers) {
        let target = layer.getFeatures().find((f) => OlUtil__namespace.getUid(f._feature) === id);
        if (target) {
          result = target;
        }
      }
    } else {
      result = selectFeatures.find((f) => OlUtil__namespace.getUid(f._feature) === id);
    }
    return result;
  }
  function handleSelectEvent(target, type, e) {
    let result = {
      target,
      type,
      mapBrowserEvent: e.mapBrowserEvent
    };
    return result;
  }
  const PACKAGE_NAME$3 = "Select";
  const createMessage$3 = getPackageMessage(PACKAGE_NAME$3);
  const defaultSelectOptions = {
    layers: void 0,
    style: void 0,
    multi: false,
    // 当为true的时候，支持一次选择n个重叠的要素
    features: void 0,
    filter: void 0,
    hitTolerance: 0
  };
  class Select extends Interaction {
    constructor(params) {
      super("Select");
      /**
       * 当前选择的要素
       */
      __publicField(this, "selected", []);
      /**
       * 当前未选择的要素
       */
      __publicField(this, "deselected", []);
      let layers = [];
      if (isDefined(params == null ? void 0 : params.layers)) {
        updateSelectLayers(params.layers);
        layers = params.layers.map((l) => l._layer);
      }
      if (isDefined(params == null ? void 0 : params.features)) {
        updateSelectFeatures(params.features);
      }
      this._interaction = new OlInteraction__namespace.Select(Object.assign({}, defaultSelectOptions, {
        ...params,
        layers,
        style: this.initStyle(params == null ? void 0 : params.style),
        filter: this.initFilter(params == null ? void 0 : params.filter)
      }));
      this.initInteractionEvent();
      this.initSelectEvent();
    }
    /**
     * 初始化样式
     * @param {OMapStyleLike | undefined} style 样式
     */
    initStyle(style) {
      let _style = void 0;
      if (isDefined(style)) {
        if (style instanceof Style) {
          _style = style.getStyle();
        } else if (isArray(style) && style.every((s) => s instanceof Style)) {
          _style = style.map((s) => s.getStyle());
        } else if (isFunction(style)) {
          _style = (feature, resolution) => {
            let uid = OlUtil__namespace.getUid(feature);
            let targetFeature = getTargetFeature(uid);
            let styleFnResult = style(targetFeature, resolution);
            return styleFnResult ? styleFnResult.getStyle() : void 0;
          };
        } else {
          warn_(createMessage$3("initStyle", "style格式有误"));
        }
      }
      return _style;
    }
    initFilter(filter) {
      if (isDefined(filter)) {
        return (feature, layer) => {
          var _a;
          let targetFeature = getTargetFeature(OlUtil__namespace.getUid(feature));
          let targetLayer = (_a = this.map) == null ? void 0 : _a.getAllLayers().find((l) => OlUtil__namespace.getUid(l._layer) === OlUtil__namespace.getUid(layer));
          return filter(targetFeature, targetLayer);
        };
      } else {
        return void 0;
      }
    }
    /**
     * 初始化Select事件
     */
    initSelectEvent() {
      if (!this._isInitialized("initSelectEvent")) return;
      this._interaction.on("select", (e) => {
        const { selected, deselected } = e;
        this.selected = selected.map((s) => {
          return getTargetFeature(OlUtil__namespace.getUid(s));
        }).filter((f) => f !== null);
        this.deselected = deselected.map((d) => {
          return getTargetFeature(OlUtil__namespace.getUid(d));
        }).filter((f) => f !== null);
      });
    }
    getSelected() {
      if (!this._isInitialized("getSelected")) return;
      return this.selected;
    }
    getDeselected() {
      if (!this._isInitialized("getDeselected")) return;
      return this.deselected;
    }
    on(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$3("on", "参数不能为空"));
        return;
      }
      let list = this.events.get(type);
      if (!isDefined(list) || list.length === 0) {
        this._interaction.on(type, (e) => {
          this.events.emit(type, Object.assign({}, handleSelectEvent(this, type, e), {
            selected: this.selected,
            deselected: this.deselected
          }));
        });
      }
      const id = this.events.on(type, callback);
      return id;
    }
    un(id) {
      if (!this._isInitialized("un")) return;
      if (!isDefined(id)) {
        warn_(createMessage$3("un", "参数不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$3("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(id);
    }
    once(type, callback) {
      if (!this._isInitialized("on")) return;
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$3("on", "参数不能为空"));
        return;
      }
      let list = this.events.get(type);
      if (!isDefined(list) || list.length === 0) {
        this._interaction.on(type, (e) => {
          this.events.emit(type, Object.assign({}, handleSelectEvent(this, type, e), {
            selected: this.selected,
            deselected: this.deselected
          }));
        });
      }
      const id = this.events.once(type, callback);
      return id;
    }
  }
  const defaultLinkOptions = {
    animate: true,
    params: ["x", "y", "z", "r", "l"],
    replace: false,
    prefix: ""
  };
  class Link extends Interaction {
    constructor(params) {
      super("Link");
      let _params = {
        ...defaultValue(params, {}),
        animate: isDefined(params == null ? void 0 : params.animate) && !isBoolean(params == null ? void 0 : params.animate) ? {
          ...params.animate,
          center: params.animate.center instanceof Lnglat ? params.animate.center.toArray() : params.animate.center
        } : defaultValue(params == null ? void 0 : params.animate, true)
      };
      this._interaction = new OlInteraction__namespace.Link(Object.assign({}, defaultLinkOptions, _params));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
  }
  const defaultKeyboardZoomOptions = {
    duration: 100,
    delta: 1
  };
  class KeyboardZoom extends Interaction {
    constructor(params) {
      super("KeyboardZoom");
      this._interaction = new OlInteraction__namespace.KeyboardZoom(Object.assign({}, defaultKeyboardZoomOptions, params || {}));
      this.initInteractionEvent();
    }
  }
  const defaultDragZoomOptions = {
    className: "omap-dragzoom",
    condition: void 0,
    duration: 200,
    out: false,
    minArea: 64
  };
  class DragZoom extends Interaction {
    constructor(params) {
      super("DragZoom");
      this._interaction = new OlInteraction__namespace.DragZoom(Object.assign({}, defaultDragZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
      if (isDefined(params) && isDefined(params.id)) {
        this._initInteractionId(params.id);
      }
    }
  }
  const InteractionType = {
    DoubleClickZoom: "DoubleClickZoom",
    DragBox: "DragBox",
    DragPan: "DragPan",
    DragZoom: "DragZoom",
    Draw: "Draw",
    KeyboardZoom: "KeyboardZoom",
    Select: "Select",
    Link: "Link",
    Modify: "Modify",
    Measure: "Measure",
    Extent: "Extent",
    MouseWheelZoom: "MouseWheelZoom"
  };
  const DEFAULT_FullScreen_OPTIONS = {
    className: "ol-full-screen",
    activeClassName: "ol-full-screen-true",
    inactiveClassName: "ol-full-screen-false",
    tipLabel: "全屏",
    keys: false
  };
  const PACKAGE_NAME$2 = "Control";
  const createMessage$2 = getPackageMessage(PACKAGE_NAME$2);
  class Control {
    // map: Map | null = null;
    constructor(type) {
      __publicField(this, "id", null);
      /**
       * 交互类型
       * @type {OMapControlType | null}
       */
      __publicField(this, "type", null);
      /**
       * 交互实例
       * @type {OlInteractionInstanceType}
       */
      __publicField(this, "_control");
      /**
       * 交互事件
       * @type {Event}
       */
      __publicField(this, "events", new Event());
      this.type = type;
    }
    _isInitialized(method) {
      if (!isDefined(this._control)) {
        warn_(createMessage$2(method, "未正确实例化"));
        return false;
      }
      return true;
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
    setProperties(properties) {
      this._control.setProperties(properties);
    }
  }
  const PACKAGE_NAME$1 = "FullScreen";
  const createMessage$1 = getPackageMessage(PACKAGE_NAME$1);
  class FullScreen extends Control {
    constructor(idOrOptions, options) {
      super("FullScreen");
      if (isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
        this.id = idOrOptions;
        this._control = new OlControl__namespace.FullScreen(Object.assign({}, DEFAULT_FullScreen_OPTIONS, options));
      } else {
        this._control = new OlControl__namespace.FullScreen(Object.assign({}, DEFAULT_FullScreen_OPTIONS, idOrOptions));
      }
    }
    _isInitialized(method) {
      if (!isDefined(this._control)) {
        warn_(createMessage$1(method, "未正确实例化"));
        return false;
      }
      return true;
    }
  }
  const DEFAULT_ZOOM_OPTIONS = {
    duration: 250,
    className: "ol-zoom",
    zoomInLabel: "+",
    zoomOutLabel: "-",
    zoomInTipLabel: "放大",
    zoomOutTipLabel: "缩小",
    zoomInClassName: "ol-zoom-in",
    zoomOutClassName: "ol-zoom-out",
    delta: 1
  };
  const PACKAGE_NAME = "Zoom";
  const createMessage = getPackageMessage(PACKAGE_NAME);
  class Zoom extends Control {
    constructor(idOrOptions, options) {
      super("Zoom");
      if (isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
        this.id = idOrOptions;
        this._control = new OlControl__namespace.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, options));
      } else {
        this._control = new OlControl__namespace.Zoom(Object.assign({}, DEFAULT_ZOOM_OPTIONS, idOrOptions));
      }
    }
    _isInitialized(method) {
      if (!isDefined(this._control)) {
        warn_(createMessage(method, "未正确实例化"));
        return false;
      }
      return true;
    }
  }
  exports2.Circle = Circle;
  exports2.Color = Color;
  exports2.DoubleClickZoom = DoubleClickZoom;
  exports2.DragBox = DragBox;
  exports2.DragPan = DragPan;
  exports2.DragZoom = DragZoom;
  exports2.Draw = Draw;
  exports2.DrawMode = DrawMode;
  exports2.Extent = Extent;
  exports2.Format = Format;
  exports2.FormatType = OMapFormatType;
  exports2.FullScreen = Zoom;
  exports2.GaodeLayer = GaodeLayer;
  exports2.GaodeLayerType = GaodeLayerType;
  exports2.ImageLayer = ImageLayer;
  exports2.InteractionExtent = InteractionExtent;
  exports2.InteractionType = InteractionType;
  exports2.KeyboardZoom = KeyboardZoom;
  exports2.LayerGroup = LayerGroup;
  exports2.LineString = LineString;
  exports2.LinearRing = LinearRing;
  exports2.Link = Link;
  exports2.Lnglat = Lnglat;
  exports2.Map = Map$1;
  exports2.MapToken = MapTokenProxy;
  exports2.Measure = Measure;
  exports2.MeasureMode = MeasureMode;
  exports2.Modify = Modify;
  exports2.MouseWheelZoom = MouseWheelZoom;
  exports2.MultiLineString = MultiLineString;
  exports2.MultiPoint = MultiPoint;
  exports2.MultiPolygon = MultiPolygon;
  exports2.Pixel = Pixel;
  exports2.Point = Point;
  exports2.Polygon = Polygon;
  exports2.Popup = Popup;
  exports2.PopupPositioning = PopupPositioning;
  exports2.ProjUtil = ProjUtil;
  exports2.Projection = Projection;
  exports2.Select = Select;
  exports2.Size = Size;
  exports2.Style = Style;
  exports2.TdtLayer = TdtLayer;
  exports2.TdtLayerType = TdtLayerType;
  exports2.TileLayer = TileLayer;
  exports2.VectorLayer = VectorLayer;
  exports2.WMSLayer = WMSLayer;
  exports2.WMTSLayer = WMTSLayer;
  exports2.XYZLayer = XYZLayer;
  exports2.Zoom = FullScreen;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
