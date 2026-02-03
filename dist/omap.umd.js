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
    console.warn("🐞OMap Warn", message);
  }
  function error_(message) {
    throw new Error(`⚠️OMap Error ${message}`);
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
  function isArrayLength2(value) {
    return isArray(value) && value.length === 2;
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
  function handleGetSizeValue(size) {
    if (isDefined(size)) {
      return size instanceof Size ? size.toArray() : size;
    }
    return void 0;
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
      if (args.length === 2) {
        const [x, y] = args;
        if (isNumber(x) && isNumber(y)) {
          value = [x, y];
        } else {
          error_(
            createMessage$D(
              "constructor",
              commonMessage.paramsInvaildFormat("size")
            )
          );
        }
      } else if (args.length === 1) {
        const [arr] = args;
        if (Array.isArray(arr) && arr.length >= 2 && isAllNumberArray(arr)) {
          value = [arr[0], arr[1]];
        } else {
          error_(
            createMessage$D(
              "constructor",
              commonMessage.paramsInvaildFormat("size")
            )
          );
        }
      } else {
        error_(
          createMessage$D("constructor", commonMessage.paramsInvaildFormat("size"))
        );
      }
      this._size = value;
    }
    /**
     * 获取size
     * @returns {OlSizeType} size
     */
    getSize() {
      return this._size;
    }
    /**
     * 设置size
     * @param {OMapSizeType} size
     */
    setSize(size) {
      this._size = handleGetSizeValue(size);
    }
    /**
     * 获取Size的width
     * @returns {number} width
     */
    getWidth() {
      return this._size[0];
    }
    /**
     * 获取Size的height
     * @returns {number} height
     */
    getHeight() {
      return this._size[1];
    }
    /**
     * 设置Size的width
     * @param {number} width
     */
    setWidth(width) {
      this._size[0] = width;
    }
    /**
     * 设置Size的height
     * @param {number} height
     */
    setHeight(height) {
      this._size[1] = height;
    }
    /**
     * 判断两个尺寸是否相等
     * @param {OMapSizeType} size
     * @returns {boolean} 判断结果
     */
    equals(size) {
      let _size = handleGetSizeValue(size);
      return this._size[0] === _size[0] && this._size[1] === _size[1];
    }
    /**
     * 转换为数组
     * @returns {OlSizeType} size
     */
    toArray() {
      return this._size;
    }
    /**
     * 以字符串的形式输出尺寸
     * @returns {string} sizeStr
     */
    toString() {
      return `[${this._size[0]}, ${this._size[1]}]`;
    }
  }
  function handleGetPixelValue(pixel) {
    if (isDefined(pixel)) {
      return pixel instanceof Pixel ? pixel.toArray() : pixel;
    }
    return void 0;
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
      __publicField(this, "_pixel", [0, 0]);
      let value = [0, 0];
      if (args.length === 2) {
        const [x, y] = args;
        if (isNumber(x) && isNumber(y)) {
          value = [x, y];
        } else {
          error_(
            createMessage$C(
              "constructor",
              commonMessage.paramsInvaildFormat("pixel")
            )
          );
        }
      } else if (args.length === 1) {
        const [arr] = args;
        if (Array.isArray(arr) && arr.length >= 2 && isAllNumberArray(arr)) {
          value = [arr[0], arr[1]];
        } else {
          error_(
            createMessage$C(
              "constructor",
              commonMessage.paramsInvaildFormat("pixel")
            )
          );
        }
      } else {
        error_(
          createMessage$C(
            "constructor",
            commonMessage.paramsInvaildFormat("pixel")
          )
        );
      }
      this._pixel = value;
    }
    /**
     * 获取像素坐标
     * @returns {number[] | undefined} 像素坐标
     */
    getPixel() {
      return this._pixel;
    }
    /**
     * 设置像素坐标
     * @param {number[]} pixel 像素坐标
     */
    setPixel(pixel) {
      this._pixel = pixel;
    }
    /**
     * 获取像素的 x 坐标
     * @returns {number} x 坐标
     */
    getX() {
      return this._pixel[0];
    }
    /**
     * 获取像素的 y 坐标
     * @returns {number} y 坐标
     */
    getY() {
      return this._pixel[1];
    }
    /**
     * 设置像素的 x 坐标
     * @param {number} x x 坐标
     */
    setX(x) {
      this._pixel[0] = x;
    }
    /**
     * 设置像素的 y 坐标
     * @param {number} y y 坐标
     */
    setY(y) {
      this._pixel[1] = y;
    }
    /**
     * 判断两个像素坐标是否相等
     * @param {Pixel} pixel 像素对象
     * @returns {boolean | undefined} 判断结果
     */
    equals(pixel) {
      if (!isDefined(pixel)) {
        error_(createMessage$C("equals", commonMessage.paramsNotDefined("pixel")));
      }
      const otherPixel = handleGetPixelValue(pixel);
      return this._pixel[0] === otherPixel[0] && this._pixel[1] === otherPixel[1];
    }
    toArray() {
      return this._pixel;
    }
    /**
     * 以字符串的形式输出像素坐标
     * @returns {string} 像素坐标字符串
     */
    toString() {
      return `[${this._pixel[0]}, ${this._pixel[1]}]`;
    }
  }
  function handleGetLnglatValue(coordinates) {
    if (isDefined(coordinates)) {
      return coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
    }
    return void 0;
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
      let value = [0, 0];
      if (args.length === 2) {
        const [x, y] = args;
        if (isNumber(x) && isNumber(y)) {
          value = [x, y];
        } else {
          error_(
            createMessage$B(
              "constructor",
              commonMessage.paramsInvaildFormat("lnglat")
            )
          );
        }
      } else if (args.length === 1) {
        const [arr] = args;
        if (Array.isArray(arr) && arr.length >= 2 && isAllNumberArray(arr)) {
          value = [arr[0], arr[1]];
        } else {
          error_(
            createMessage$B(
              "constructor",
              commonMessage.paramsInvaildFormat("lnglat")
            )
          );
        }
      } else {
        error_(
          createMessage$B(
            "constructor",
            commonMessage.paramsInvaildFormat("lnglat")
          )
        );
      }
      this._lnglat = value;
    }
    /**
     * 设置经度
     * @param {number} lng 经度
     */
    setLng(lng) {
      if (!isDefined(lng)) {
        error_(createMessage$B("setLng", commonMessage.paramsNotDefined("lng")));
      }
      if (!isNumber(lng)) {
        error_(createMessage$B("setLng", commonMessage.paramsInvaildFormat("lng")));
      }
      this._lnglat[0] = lng;
    }
    /**
     * 设置纬度
     * @param {number} lat 纬度
     */
    setLat(lat) {
      if (!isDefined(lat)) {
        error_(createMessage$B("setLat", commonMessage.paramsNotDefined("lat")));
      }
      if (!isNumber(lat)) {
        error_(createMessage$B("setLat", commonMessage.paramsInvaildFormat("lat")));
      }
      this._lnglat[1] = lat;
    }
    /**
     * 获取经度
     * @returns {number} 经度
     */
    getLng() {
      return this._lnglat[0];
    }
    /**
     * 获取纬度
     * @returns {number} 纬度
     */
    getLat() {
      return this._lnglat[1];
    }
    /**
     * 判断两个经纬度是否相等
     * @param {OMapCoordinateType} lnglat 经纬度对象
     * @returns {boolean} 判断结果
     */
    equals(lnglat) {
      if (!isDefined(lnglat)) {
        error_(createMessage$B("equals", commonMessage.paramsNotDefined("lnglat")));
      }
      const otherLnglat = handleGetLnglatValue(lnglat);
      return this._lnglat[0] === otherLnglat[0] && this._lnglat[1] === otherLnglat[1];
    }
    /**
     * 以数组形式输出经纬度
     * @returns {OlCoordinateType} 经纬度数组
     */
    toArray() {
      return this._lnglat;
    }
    /**
     * 以字符串的形式输出经纬度
     * @param {number} place? 保留的小数位数
     * @returns {string} 经纬度字符串
     */
    toString(place) {
      var _a, _b;
      let _place = defaultValue(place, 3);
      return `[${(_a = this._lnglat[0]) == null ? void 0 : _a.toFixed(_place)}, ${(_b = this._lnglat[1]) == null ? void 0 : _b.toFixed(_place)}]`;
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
  function isValidCoordinate(value) {
    if (value instanceof Lnglat) {
      return true;
    }
    return isCoordinatesType(value);
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
      let value = [0, 0, 0, 0];
      if (args.length === 4) {
        const [minX, minY, maxX, maxY] = args;
        if (isNumber(minX) && isNumber(minY) && isNumber(maxX) && isNumber(maxY)) {
          value = [minX, minY, maxX, maxY];
        } else {
          error_(
            createMessage$z(
              "constructor",
              commonMessage.paramsInvaildFormat("extent")
            )
          );
        }
      } else if (args.length === 1) {
        const [arr] = args;
        if (Array.isArray(arr) && arr.length >= 4 && isAllNumberArray(arr)) {
          value = [arr[0], arr[1], arr[2], arr[3]];
        } else {
          error_(
            createMessage$z(
              "constructor",
              commonMessage.paramsInvaildFormat("extent")
            )
          );
        }
      } else {
        error_(
          createMessage$z(
            "constructor",
            commonMessage.paramsInvaildFormat("extent")
          )
        );
      }
      this._extent = value;
    }
    getExtent() {
      return this._extent;
    }
    /**
     * 获取边界范围Extent的左上方位置
     * @return {Lnglat} 左上方位置
     */
    getTopLeft() {
      return new Lnglat(OlExtent__namespace.getTopLeft(this._extent));
    }
    /**
     * 获取边界范围Extent的右上方位置
     * @return {Lnglat} 右上方位置
     */
    getTopRight() {
      return new Lnglat(OlExtent__namespace.getTopRight(this._extent));
    }
    /**
     * 获取边界范围Extent的左下角位置
     * @return {Lnglat} 左下角位置
     */
    getBottomLeft() {
      return new Lnglat(OlExtent__namespace.getBottomLeft(this._extent));
    }
    /**
     * 获取边界范围Extent的右下角位置
     * @return {Lnglat} 右下角位置
     */
    getBottomRight() {
      return new Lnglat(OlExtent__namespace.getBottomRight(this._extent));
    }
    /**
     * 获取边界范围Extent的中心点位置
     * @return {Lnglat} 中心点位置
     */
    getCenter() {
      return new Lnglat(OlExtent__namespace.getCenter(this._extent));
    }
    /**
     * 获取宽度信息
     * @returns {number} 宽度
     */
    getWidth() {
      return OlExtent__namespace.getWidth(this._extent);
    }
    /**
     * 获取高度信息
     * @returns {number} 高度
     */
    getHeight() {
      return OlExtent__namespace.getHeight(this._extent);
    }
    getSize() {
      return new Size(OlExtent__namespace.getSize(this._extent));
    }
    /**
     * 以字符串的形式输出边界范围
     * @return {string} 边界范围（字符串）
     */
    toString(place) {
      let _place = defaultValue(place, 3);
      return `[${this._extent[0].toFixed(_place)}, ${this._extent[1].toFixed(_place)}, ${this._extent[2].toFixed(_place)}, ${this._extent[3].toFixed(_place)}]`;
    }
    toArray() {
      return this._extent;
    }
    /**
     * 构建包含所有给定坐标的范围
     * @param {OMapCoordinateType} coordinates 坐标数组
     * @return {Extent} 边界范围
     */
    static boundingExtent(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$z(
            "boundingExtent",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isArray(coordinates)) {
        error_(
          createMessage$z("boundingExtent", "参数coordinates格式错误，必须为数组")
        );
      }
      let vaildList = coordinates.filter((c) => {
        return isValidCoordinate(c);
      });
      if (vaildList.length < coordinates.length) {
        warn_(
          createMessage$z(
            "boundingExtent",
            commonMessage.haveInvaildDataItem("coordinates")
          )
        );
      }
      let positions = vaildList.map((c) => {
        return handleGetLnglatValue(c);
      });
      let _extent = OlExtent__namespace.boundingExtent(positions);
      return new Extent(_extent);
    }
    /**
     * 判断边界范围Extent是否包含某个点
     * @param {OMapExtentType} extent 范围
     * @param {OMapCoordinateType} coordinate 位置
     * @return {boolean} 判断结果
     */
    static containsCoordinate(extent, coordinate2) {
      if (!isDefined(extent) || !isDefined(coordinate2)) {
        error_(
          createMessage$z(
            "containsCoordinate",
            commonMessage.paramsNotDefined("extent or coordinate")
          )
        );
      }
      let _extent = handleGetExtentValue(extent);
      let _coordinate = handleGetLnglatValue(coordinate2);
      return OlExtent__namespace.containsCoordinate(_extent, _coordinate);
    }
    /**
     * 判断是否某个范围包含另一个范围
     * @param {OMapExtentType} extent1 范围1
     * @param {OMapExtentType} extent2 范围2
     * @return 判断结果
     */
    static containsExtent(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) {
        error_(
          createMessage$z(
            "containsExtent",
            commonMessage.paramsNotDefined("extent1 or extent2")
          )
        );
      }
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      return OlExtent__namespace.containsExtent(_extent1, _extent2);
    }
    static containsXY(extent, x, y) {
      if (!isDefined(extent) || !isDefined(x) || !isDefined(y)) return;
      let _extent = handleGetExtentValue(extent);
      if (!isDefined(_extent)) return;
      return OlExtent__namespace.containsXY(_extent, x, y);
    }
    static createEmpty() {
      return new Extent(OlExtent__namespace.createEmpty());
    }
    static equals(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) {
        error_(
          createMessage$z(
            "equals",
            commonMessage.paramsNotDefined("extent1 or extent2")
          )
        );
      }
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      return OlExtent__namespace.equals(_extent1, _extent2);
    }
    static extend(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) {
        error_(
          createMessage$z(
            "extend",
            commonMessage.paramsNotDefined("extent1 or extent2")
          )
        );
      }
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      return new Extent(OlExtent__namespace.extend(_extent1, _extent2));
    }
    static getArea(extent) {
      if (!isDefined(extent)) {
        error_(
          createMessage$z("getArea", commonMessage.paramsNotDefined("extent"))
        );
      }
      let _extent = handleGetExtentValue(extent);
      return OlExtent__namespace.getArea(_extent);
    }
    /**
     * 确定一个范围是否与另一个范围相交
     * @param {OMapExtentType} extent1
     * @param {OMapExtentType}extent2
     * @returns {boolean} 判断结果
     */
    static intersects(extent1, extent2) {
      if (!isDefined(extent1) || !isDefined(extent2)) {
        error_(
          createMessage$z(
            "intersects",
            commonMessage.paramsNotDefined("extent1 or extent2")
          )
        );
      }
      let _extent1 = handleGetExtentValue(extent1);
      let _extent2 = handleGetExtentValue(extent2);
      return OlExtent__namespace.intersects(_extent1, _extent2);
    }
    static isEmpty(extent) {
      if (!isDefined(extent)) {
        error_(
          createMessage$z("isEmpty", commonMessage.paramsNotDefined("extent"))
        );
      }
      let _extent = handleGetExtentValue(extent);
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
  function isVaildPopupId(value) {
    return isString(value) || isNumber(value);
  }
  function isVaildPopup(value) {
    return value instanceof Popup;
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
    /**
     * 获取弹窗位置
     * @returns {Lnglat | undefined} 弹窗位置
     */
    getPosition() {
      let coordinates = this._popup.getPosition();
      return isDefined(coordinates) ? new Lnglat(coordinates[0], coordinates[1]) : void 0;
    }
    /**
     * 设置弹窗位置
     * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
     */
    setPosition(coordinates) {
      let _coordinates = coordinates instanceof Lnglat ? coordinates.toArray() : coordinates;
      this._popup.setPosition(_coordinates);
    }
    getPositioning() {
      return this._popup.getPositioning();
    }
    setPositioning(positioning) {
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
      return this.properties;
    }
    /**
     * 设置弹窗属性
     * @param {Record<string, any>} properties 弹窗属性
     */
    setProperties(properties) {
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
      return this._popup.getElement();
    }
    setElement(element) {
      if (!isDefined(element)) return;
      element.classList.add("omap-popup-selectable");
      return this._popup.setElement(element);
    }
    getContent() {
      return this.content;
    }
    setContent(content) {
      this.events.emit("change:content", handlePopupEvent(this, "change:content", {
        oldValue: this.getContent(),
        key: "content",
        newValue: content
      }));
      this.content = content;
      this.setElement(createDefaultContentElement(content));
    }
    getOffset() {
      let offset = this._popup.getOffset();
      return new Pixel(offset[0], offset[1]);
    }
    setOffset(offset) {
      let _offset = offset instanceof Pixel ? offset.toArray() : offset;
      this._popup.setOffset(_offset);
    }
    getId() {
      return this.id;
    }
    setId(id) {
      this.id = id;
    }
    getPopup() {
      return this._popup;
    }
    on(type, callback) {
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
  function isValidExtent(value) {
    if (value instanceof Extent) {
      return true;
    }
    return isExtentType(value);
  }
  function isValidPixel(value) {
    if (value instanceof Pixel) {
      return true;
    }
    return isArrayLength2(value) && value.every((item) => isNumber(item));
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
    _initLayerEvent() {
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
    /**
     * 获取图层id
     * @returns {BaseLayerIdType | null} 图层id
     */
    getId() {
      return this.id;
    }
    /**
     * 设置图层id
     * @param {BaseLayerIdType | null} id 图层id
     */
    setId(id) {
      this.id = id;
    }
    /**
     * 获取图层实例对象
     * @returns {T} 图层对象
     */
    getLayer() {
      return this._layer;
    }
    /**
     * 获取图层数据源
     */
    getSource() {
      return this._layer.getSource();
    }
    /**
     * 设置图层透明度
     * @param {number} opacity 透明度，0~1
     */
    setOpacity(opacity) {
      if (!isDefined(opacity)) {
        error_(createMessage$v("setOpacity", commonMessage.paramsNotDefined("opacity")));
      }
      if (!isVaildOpacity(opacity)) {
        error_(createMessage$v("setOpacity", commonMessage.paramsInvaildFormat("opacity", "0~1的数字")));
      }
      this._layer.setOpacity(opacity);
    }
    /**
     * 获取图层透明度
     * @returns {number} 透明度，0~1
     */
    getOpacity() {
      return this._layer.getOpacity();
    }
    /**
     * 设置图层可见性
     * @param {boolean} visible 可见性，true/false
     */
    setVisible(visible) {
      if (!isDefined(visible)) {
        error_(createMessage$v("setVisible", commonMessage.paramsNotDefined("visible")));
      }
      if (!isBoolean(visible)) {
        error_(createMessage$v("setVisible", commonMessage.paramsInvaildFormat("visible", "boolean类型")));
      }
      this._layer.setVisible(visible);
    }
    /**
     * 获取图层可见性
     * @returns {boolean} 可见性，true/false
     */
    getVisible() {
      return this._layer.getVisible();
    }
    /**
     * 获取图层的范围
     * @returns {Extent | undefined} 范围
     */
    getExtent() {
      let extent = this._layer.getExtent();
      return isDefined(extent) ? new Extent(extent) : void 0;
    }
    /**
     * 设置图层的范围
     * @param {OMapExtentType} extent 范围
     */
    setExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$v("setExtent", commonMessage.paramsNotDefined("extent")));
      }
      if (!isValidExtent(extent)) {
        error_(createMessage$v("setExtent", commonMessage.paramsInvaildFormat("extent", "Extent类型")));
      }
      this._layer.setExtent(handleGetExtentValue(extent));
    }
    setMinZoom(minZoom) {
      if (!isDefined(minZoom)) {
        error_(createMessage$v("setMinZoom", commonMessage.paramsNotDefined("minZoom")));
      }
      if (!isNumber(minZoom)) {
        error_(createMessage$v("setMinZoom", commonMessage.paramsInvaildFormat("minZoom", "number类型")));
      }
      this._layer.setMinZoom(minZoom);
    }
    getMinZoom() {
      return this._layer.getMinZoom();
    }
    setMaxZoom(maxZoom) {
      if (!isDefined(maxZoom)) {
        error_(createMessage$v("setMaxZoom", commonMessage.paramsNotDefined("maxZoom")));
      }
      if (!isNumber(maxZoom)) {
        error_(createMessage$v("setMaxZoom", commonMessage.paramsInvaildFormat("maxZoom", "number类型")));
      }
      this._layer.setMaxZoom(maxZoom);
    }
    getMaxZoom() {
      return this._layer.getMaxZoom();
    }
    setMinResolution(minResolution) {
      if (!isDefined(minResolution)) {
        error_(createMessage$v("setMinResolution", commonMessage.paramsNotDefined("minResolution")));
      }
      if (!isNumber(minResolution)) {
        error_(createMessage$v("setMinResolution", commonMessage.paramsInvaildFormat("minResolution", "number类型")));
      }
      this._layer.setMinResolution(minResolution);
    }
    getMinResolution() {
      return this._layer.getMinResolution();
    }
    setMaxResolution(maxResolution) {
      if (!isDefined(maxResolution)) {
        error_(createMessage$v("setMaxResolution", commonMessage.paramsNotDefined("maxResolution")));
      }
      if (!isNumber(maxResolution)) {
        error_(createMessage$v("setMaxResolution", commonMessage.paramsInvaildFormat("maxResolution", "number类型")));
      }
      this._layer.setMaxResolution(maxResolution);
    }
    getMaxResolution() {
      return this._layer.getMaxResolution();
    }
    setZIndex(zIndex) {
      if (!isDefined(zIndex)) {
        error_(createMessage$v("setZIndex", commonMessage.paramsNotDefined("zIndex")));
      }
      if (!isNumber(zIndex)) {
        error_(createMessage$v("setZIndex", commonMessage.paramsInvaildFormat("zIndex", "number类型")));
      }
      this._layer.setZIndex(zIndex);
    }
    getZIndex() {
      return this._layer.getZIndex();
    }
    setProperties(properties, silent) {
      if (!isDefined(properties)) {
        error_(createMessage$v("setProperties", commonMessage.paramsNotDefined("properties")));
      }
      if (isObject(properties)) {
        error_(createMessage$v("setProperties", commonMessage.paramsInvaildFormat("properties", "object类型")));
      }
      let oldProperties = defaultValue(this.properties, {});
      let newProperties = Object.assign({}, oldProperties, properties);
      this._layer.setProperties(newProperties, silent);
      this.properties = newProperties;
    }
    getProperties() {
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
      __publicField(this, "id", null);
      __publicField(this, "type");
      // 非空断言操作符 !（推荐用于抽象类）
      __publicField(this, "_feature");
      __publicField(this, "_geometry");
      this.type = type;
      if (coordinatesOrFeature instanceof OlFeature) {
        this._initByFeature(coordinatesOrFeature);
      } else {
        this._init(coordinatesOrFeature, radius);
      }
    }
    /**
     * 获取原生的Openlayers Feature对象
     * @returns {OlFeatureInstanceType} 原生的Openlayers Feature对象
     */
    getFeature() {
      return this._feature;
    }
    setId(id) {
      if (!isDefined(id)) {
        error_(createMessage$u("setId", "参数id不能为空"));
      }
      if (!isNumber(id) && !isString(id)) {
        error_(createMessage$u("setId", "参数id格式有误"));
      }
      this.id = id;
    }
    getId() {
      return this.id;
    }
    getType() {
      return this.type;
    }
    changed() {
      this._feature.changed();
    }
    dispatchEvent() {
    }
    clone() {
    }
    get(key) {
      if (!isDefined(key)) {
        error_(createMessage$u("get", commonMessage.paramsNotDefined("key")));
      }
      if (!isString(key)) {
        error_(createMessage$u("get", commonMessage.paramsInvaildFormat("key", "string")));
      }
      return this._feature.get(key);
    }
    /**
     * 获取原生的Openlayers Geometry对象
     * @returns {T} 原生的Openlayers Geometry对象
     */
    getGeometry() {
      return this._geometry;
    }
    getGeometryName() {
    }
    getKeys() {
      return this._feature.getKeys();
    }
    getStyle() {
    }
    setStyle(style) {
      let _style = handleGetStyleValue(style);
      if (isDefined(_style)) {
        this._feature.setStyle(_style);
      }
    }
    /**
     * 获取要素的范围
     * @returns {Extent | undefined} 要素的范围
     */
    getExtent() {
      let extent = this._geometry.getExtent();
      return new Extent(extent);
    }
    getProperties() {
      return this._feature.getProperties();
    }
    setProperties(properties) {
      if (!isDefined(properties)) {
        return false;
      }
      if (!isObject(properties)) {
        error_(createMessage$u("setProperties", commonMessage.paramsInvaildFormat("properties", "object")));
      }
      this._feature.setProperties(properties);
    }
  }
  const PACKAGE_NAME$t = "Interaction";
  const createMessage$t = getPackageMessage(PACKAGE_NAME$t);
  class Interaction {
    constructor(type, params) {
      /**
       * 交互实例id
       */
      __publicField(this, "id", null);
      /**
       * 交互类型
       * @type {OMapInteractionTypeEnum | null}
       */
      __publicField(this, "type", null);
      /**
       * 交互实例
       * @type {T}
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
      if (isDefined(params) && isDefined(params.id)) {
        this.setId(params.id);
      }
      this.events = new Event(this);
    }
    initInteractionEvent() {
      this.getInteraction().on("change:active", (e) => {
        if (e.type === "change:active") {
          this.active = this.getActive();
        }
      });
    }
    /**
     * 获取交互实例id
     * @returns {OMapInteractionIdType} 交互实例id
     */
    getId() {
      return this.id;
    }
    setId(id) {
      if (!isDefined(id)) {
        warn_(createMessage$t("_initInteractionId", commonMessage.paramsNotDefined("id")));
        return;
      }
      this.id = id;
    }
    /**
     * 返回当前交互是否处于激活状态
     * @returns {boolean} 激活状态
     */
    getActive() {
      return this._interaction.getActive();
    }
    /**
     * 设置当前交互是否处于激活状态
     * @param {boolean} active 激活状态
     */
    setActive(active) {
      if (!isBoolean(active)) {
        warn_(createMessage$t("setActive", commonMessage.paramsInvaildFormat("active", "boolean")));
        return;
      }
      this._interaction.setActive(active);
    }
    /**
     * 获取交互实例
     * @returns {T} 交互实例
     */
    getInteraction() {
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
      this._interaction.setProperties(properties);
      this.properties = properties;
    }
    /**
     * 返回交互中涉及的当前指针数，例如，当使用两个手指时为 2。
     * @returns {number} 指针数
     */
    // getPointerCount(): number {
    //     return this._interaction.getPointerCount()
    // }
    getLayer() {
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
  const OMAP_INTERACTION_DEFAULT_PARAMS = {
    active: false
  };
  const OMapInteractionEventTypes = [
    "change",
    "change:active",
    "error",
    "propertychange"
  ];
  function isVaildInteraction(value) {
    return value instanceof Interaction;
  }
  const PACKAGE_NAME$s = "Control";
  const createMessage$s = getPackageMessage(PACKAGE_NAME$s);
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
        warn_(createMessage$s(method, "未正确实例化"));
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
  function isVaildControl(value) {
    return value instanceof Control;
  }
  const PACKAGE_NAME$r = "Point";
  const createMessage$r = getPackageMessage(PACKAGE_NAME$r);
  class Point extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$r(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("Point", coordinatesOrFeature);
      } else {
        if (!isValidCoordinate(coordinatesOrFeature)) {
          error_(
            createMessage$r(
              "constructor",
              commonMessage.paramsInvaildFormat(
                "coordinatesOrFeature",
                "Lnglat or [x, y]"
              )
            )
          );
        }
        super("Point", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
      let geometryCoordinates = handleGetLnglatValue(coordinates);
      this._geometry = new OlGeometry__namespace.Point(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取点的坐标
     * @returns {Lnglat} 点的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      return new Lnglat(coordinates);
    }
    /**
     * 设置点的坐标
     * @param {OMapPointGeometryCoordinatesType} coordinates 点的坐标
     * @returns {void}
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$r(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidCoordinate(coordinates)) {
        error_(
          createMessage$r(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates", "Lnglat or [x, y]")
          )
        );
      }
      let _coordinates = handleGetLnglatValue(coordinates);
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
        error_(
          createMessage$r(
            "intersectsExtent",
            commonMessage.paramsNotDefined("extent")
          )
        );
      }
      if (!isValidExtent(extent)) {
        error_(
          createMessage$r(
            "intersectsExtent",
            commonMessage.paramsInvaildFormat(
              "extent",
              "Extent or [xmin, ymin, xmax, ymax]"
            )
          )
        );
      }
      let _extent = handleGetExtentValue(extent);
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function isValidLineStringCoordinates(value) {
    return isArray(value) && value.every((item) => isValidCoordinate(item));
  }
  const PACKAGE_NAME$q = "LineString";
  const createMessage$q = getPackageMessage(PACKAGE_NAME$q);
  class LineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$q(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("LineString", coordinatesOrFeature);
      } else {
        if (!isValidLineStringCoordinates(coordinatesOrFeature)) {
          error_(
            createMessage$q(
              "constructor",
              commonMessage.paramsInvaildFormat("coordinatesOrFeature")
            )
          );
        }
        super("LineString", coordinatesOrFeature);
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
      let geometryCoordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._geometry = new OlGeometry__namespace.LineString(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取线的坐标
     * @returns {Array<Lnglat>} 线的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      return coordinates.map((c) => {
        return new Lnglat(c);
      });
    }
    /**
     * 设置线的坐标
     * @param {OMapLineStringGeometryCoordinatesType} coordinates 线的坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$q(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidLineStringCoordinates(coordinates)) {
        error_(
          createMessage$q(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._geometry.setCoordinates(_coordinates);
    }
    /**
     * 追加坐标
     * @param {OMapPointGeometryCoordinatesType} coordinates 坐标
     */
    appendCoordinate(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$q(
            "appendCoordinate",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        error_(
          createMessage$q(
            "appendCoordinate",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      this._geometry.appendCoordinate(_coordinates);
    }
    /**
     * 获取线的第一个坐标
     * @returns {Lnglat} 线的第一个坐标
     */
    getFirstCoordinate() {
      let coordinates = this._geometry.getFirstCoordinate();
      return new Lnglat(coordinates);
    }
    /**
     * 获取线的最后一个坐标
     * @returns {Lnglat} 线的最后一个坐标
     */
    getLastCoordinate() {
      let coordinates = this._geometry.getLastCoordinate();
      return new Lnglat(coordinates);
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
        error_(createMessage$q("getCoordinateAt", "参数不能为空"));
      }
      if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
        error_(createMessage$q("getCoordinateAt", "参数格式有误"));
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
      return new Lnglat(coordinates);
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
     * @param {OMapExtentType} extent
     * @returns {boolean}
     */
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$q("intersectsExtent", "参数extent不能为空"));
      }
      if (!isValidExtent(extent)) {
        error_(createMessage$q("intersectsExtent", "坐标格式有误"));
      }
      let _extent = handleGetExtentValue(extent);
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function isValidPolygonCoordinates(value) {
    return isArray(value) && value.every((item) => isValidLineStringCoordinates(item));
  }
  function isValidLinearRingCoordinates(value) {
    return isArray(value) && value.every((item) => isValidCoordinate(item));
  }
  const PACKAGE_NAME$p = "LinearRing";
  const createMessage$p = getPackageMessage(PACKAGE_NAME$p);
  class LinearRing extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$p(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
        return;
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("LinearRing", coordinatesOrFeature);
      } else {
        if (!isValidLinearRingCoordinates(coordinatesOrFeature)) {
          error_(
            createMessage$p(
              "constructor",
              commonMessage.paramsInvaildFormat("coordinatesOrFeature")
            )
          );
        }
        super("LinearRing", coordinatesOrFeature);
        if (properties) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
      let geometryCoordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._geometry = new OlGeometry__namespace.LinearRing(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取LinearRing的坐标
     * @returns {Array<Lnglat>} LinearRing的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      return coordinates.map((c) => {
        return new Lnglat(c);
      });
    }
    /**
     * 设置LinearRing的坐标
     * @param {OMapLinearRingGeometryCoordinatesType} coordinates LinearRing的坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$p(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidLinearRingCoordinates(coordinates)) {
        error_(
          createMessage$p(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  const PACKAGE_NAME$o = "Polygon";
  const createMessage$o = getPackageMessage(PACKAGE_NAME$o);
  class Polygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$o(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("Polygon", coordinatesOrFeature);
      } else {
        if (!isValidPolygonCoordinates(coordinatesOrFeature)) {
          error_(
            createMessage$o(
              "constructor",
              commonMessage.paramsInvaildFormat("coordinatesOrFeature")
            )
          );
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
      this._geometry = new OlGeometry__namespace.Polygon(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取多边形的坐标
     * @param {boolean} rightHanded 是否右手坐标系
     * @returns {Array<Array<Lnglat>>} 多边形的坐标
     */
    getCoordinates(rightHanded) {
      let coordinates = this._geometry.getCoordinates(rightHanded);
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return new Lnglat(c2);
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
        error_(
          createMessage$o(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidPolygonCoordinates(coordinates)) {
        error_(
          createMessage$o(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return handleGetLnglatValue(c2);
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
        error_(
          createMessage$o(
            "appendLinearRing",
            commonMessage.paramsNotDefined("linearRingParams")
          )
        );
      }
      if (!(linearRingParams instanceof LinearRing && isValidLinearRingCoordinates(linearRingParams))) {
        error_(
          createMessage$o(
            "appendLinearRing",
            commonMessage.paramsInvaildFormat("linearRingParams")
          )
        );
      }
      if (linearRingParams instanceof LinearRing) {
        this._geometry.appendLinearRing(linearRingParams.getGeometry());
      } else {
        let coordinates = linearRingParams.map((l) => {
          return handleGetLnglatValue(l);
        });
        this._geometry.appendLinearRing(
          new LinearRing(coordinates).getGeometry()
        );
      }
    }
    /**
     * 获取多边形的第一个坐标（包含内环）
     * @returns {Lnglat} 多边形的第一个坐标
     */
    getFirstCoordinate() {
      let coordinates = this._geometry.getFirstCoordinate();
      return new Lnglat(coordinates);
    }
    /**
     * 获取多边形的最后一个坐标（包含内环）
     * @returns {Lnglat} 多边形的最后一个坐标
     */
    getLastCoordinate() {
      let coordinates = this._geometry.getLastCoordinate();
      return new Lnglat(coordinates);
    }
    /**
     * 获取多边形的范围
     * @returns {Extent} 多边形的范围
     */
    getExtent() {
      let extent = this._geometry.getExtent();
      return new Extent(extent);
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
     * @param {OMapCoordinateType} point 传递点
     * @param {OMapCoordinateType} closestPoint 最近点
     * @returns {Lnglat} 最近点
     */
    getClosestPoint(point, closestPoint) {
      let coordinates = handleGetLnglatValue(point);
      let result = this._geometry.getClosestPoint(coordinates);
      let _result = new Lnglat(result);
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
     * @param {OMapCoordinateType} coordinates
     * @returns {boolean}
     */
    intersectsCoordinate(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$o(
            "intersectsCoordinate",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      return this._geometry.intersectsCoordinate(_coordinates);
    }
    /**
     * 线是否在extent范围内
     * @param {OMapExtentType} extent
     * @returns {boolean}
     */
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(
          createMessage$o(
            "intersectsExtent",
            commonMessage.paramsNotDefined("extent")
          )
        );
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        error_(
          createMessage$o(
            "intersectsExtent",
            commonMessage.paramsInvaildFormat("extent")
          )
        );
      }
      let _extent = handleGetExtentValue(extent);
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
  const PACKAGE_NAME$n = "MultiPoint";
  const createMessage$n = getPackageMessage(PACKAGE_NAME$n);
  class MultiPoint extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$n(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiPoint", coordinatesOrFeature);
      } else {
        if (!coordinatesOrFeature.every((item) => isValidCoordinate(item))) {
          error_(
            createMessage$n(
              "constructor",
              commonMessage.paramsInvaildFormat(
                "coordinatesOrFeature",
                "Array<Lnglat or [x, y]>"
              )
            )
          );
        }
        super(
          "MultiPoint",
          coordinatesOrFeature
        );
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
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
    /**
     * 获取点的坐标
     * @returns {Lnglat[]} 点的坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return new Lnglat(c);
      });
      return _coordinates;
    }
    /**
     * 设置点的坐标
     * @param {OMapMultiPointGeometryCoordinatesType} coordinates 点的坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$n(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!coordinates.every((item) => isValidCoordinate(item))) {
        error_(
          createMessage$n(
            "setCoordinates",
            commonMessage.paramsInvaildFormat(
              "coordinates",
              "Array<Lnglat or [x, y]>"
            )
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._geometry.setCoordinates(_coordinates);
    }
    appendPoint(pointOrpointCoordinates) {
      if (!isDefined(pointOrpointCoordinates)) {
        error_(
          createMessage$n(
            "appendPoint",
            commonMessage.paramsNotDefined("pointOrpointCoordinates")
          )
        );
      }
      let _point = null;
      if (pointOrpointCoordinates instanceof Point) {
        _point = pointOrpointCoordinates.getGeometry();
      } else {
        _point = new OlGeometry__namespace.Point(
          handleGetLnglatValue(pointOrpointCoordinates)
        );
      }
      this._geometry.appendPoint(_point);
    }
    getClosestPoint(pointOrpointCoordinates) {
      if (!isDefined(pointOrpointCoordinates)) {
        error_(
          createMessage$n(
            "getClosestPoint",
            commonMessage.paramsNotDefined("pointOrpointCoordinates")
          )
        );
      }
      let _point = null;
      if (pointOrpointCoordinates instanceof Point) {
        _point = pointOrpointCoordinates.getCoordinates().toArray();
      } else {
        _point = handleGetLnglatValue(pointOrpointCoordinates);
      }
      let _closestPoint = this._geometry.getClosestPoint(_point);
      return new Lnglat(_closestPoint);
    }
    getFirstCoordinate() {
      return new Lnglat(...this._geometry.getFirstCoordinate());
    }
    getLastCoordinate() {
      return new Lnglat(...this._geometry.getLastCoordinate());
    }
    getPoint(index) {
      if (!isDefined(index)) {
        error_(
          createMessage$n("getPoint", commonMessage.paramsNotDefined("index"))
        );
      }
      if (!isNumber(index)) {
        error_(
          createMessage$n(
            "getPoint",
            commonMessage.paramsInvaildFormat("index", "number")
          )
        );
      }
      let point = this._geometry.getPoint(index);
      return new Point(point.getCoordinates());
    }
    intersectsCoordinate(coordinate2) {
      if (!isDefined(coordinate2)) {
        error_(
          createMessage$n(
            "intersectsCoordinate",
            commonMessage.paramsNotDefined("coordinate")
          )
        );
      }
      let _coordinate = handleGetLnglatValue(coordinate2);
      return this._geometry.intersectsCoordinate(_coordinate);
    }
    intersectsExtent(extent) {
      if (!isDefined(extent)) {
        error_(
          createMessage$n(
            "intersectsExtent",
            commonMessage.paramsNotDefined("extent")
          )
        );
      }
      let _extent = handleGetExtentValue(extent);
      return this._geometry.intersectsExtent(_extent);
    }
  }
  function isValidMultiLineStringCoordinates(value) {
    return isArray(value) && value.every((item) => isValidLineStringCoordinates(item));
  }
  const PACKAGE_NAME$m = "MultiLineString";
  const createMessage$m = getPackageMessage(PACKAGE_NAME$m);
  class MultiLineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$m(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiLineString", coordinatesOrFeature);
      } else {
        if (!isValidMultiLineStringCoordinates(coordinatesOrFeature)) {
          error_(
            createMessage$m(
              "constructor",
              commonMessage.paramsInvaildFormat("coordinatesOrFeature")
            )
          );
          return;
        }
        super(
          "MultiLineString",
          coordinatesOrFeature
        );
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
      let geometryCoordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return handleGetLnglatValue(c2);
        });
      });
      this._geometry = new OlGeometry__namespace.MultiLineString(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取坐标
     * @returns {Array<Array<Lnglat>>} 坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return new Lnglat(c2);
        });
      });
      return _coordinates;
    }
    /**
     * 设置坐标
     * @param {OMapMultiLineStringGeometryCoordinatesType} coordinates 坐标
     */
    setCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(
          createMessage$m(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidMultiLineStringCoordinates(coordinates)) {
        error_(
          createMessage$m(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return handleGetLnglatValue(c2);
        });
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  function isValidMultiPolygonCoordinates(value) {
    return isArray(value) && value.every((item) => isValidPolygonCoordinates(item));
  }
  const PACKAGE_NAME$l = "MultiPolygon";
  const createMessage$l = getPackageMessage(PACKAGE_NAME$l);
  class MultiPolygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$l(
            "constructor",
            commonMessage.paramsNotDefined("coordinatesOrFeature")
          )
        );
      }
      if (coordinatesOrFeature instanceof OlFeature) {
        super("MultiPolygon", coordinatesOrFeature);
      } else {
        if (!isValidMultiPolygonCoordinates(coordinatesOrFeature)) {
          error_(
            createMessage$l(
              "constructor",
              commonMessage.paramsInvaildFormat("coordinatesOrFeature")
            )
          );
        }
        super(
          "MultiPolygon",
          coordinatesOrFeature
        );
        if (isDefined(properties) && isObject(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates) {
      let geometryCoordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return handleGetLnglatValue(c3);
          });
        });
      });
      this._geometry = new OlGeometry__namespace.MultiPolygon(geometryCoordinates);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    /**
     * 获取坐标
     * @returns {OMapMultiPolygonGeometryCoordinatesType``} 坐标
     */
    getCoordinates() {
      let coordinates = this._geometry.getCoordinates();
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return new Lnglat(c3);
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
      if (!isDefined(coordinates)) {
        error_(
          createMessage$l(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidMultiPolygonCoordinates(coordinates)) {
        error_(
          createMessage$l(
            "setCoordinates",
            commonMessage.paramsInvaildFormat("coordinates")
          )
        );
      }
      let _coordinates = coordinates.map((c) => {
        return c.map((c2) => {
          return c2.map((c3) => {
            return handleGetLnglatValue(c3);
          });
        });
      });
      this._geometry.setCoordinates(_coordinates);
    }
  }
  const PACKAGE_NAME$k = "Circle";
  const createMessage$k = getPackageMessage(PACKAGE_NAME$k);
  class Circle extends BasicFeature {
    constructor(centerOrFeature, radius, properties) {
      if (!isDefined(centerOrFeature)) {
        error_(
          createMessage$k(
            "constructor",
            commonMessage.paramsNotDefined("centerOrFeature")
          )
        );
      }
      if (centerOrFeature instanceof OlFeature) {
        super("Circle", centerOrFeature);
      } else {
        if (!isValidCoordinate(centerOrFeature)) {
          error_(
            createMessage$k(
              "constructor",
              commonMessage.paramsInvaildFormat("centerOrFeature")
            )
          );
        }
        if (!(isDefined(radius) && isNumber(radius))) {
          error_(
            createMessage$k(
              "constructor",
              commonMessage.paramsInvaildFormat("radius")
            )
          );
        }
        super(
          "Circle",
          centerOrFeature,
          radius
        );
        if (isDefined(properties)) {
          this.setProperties(properties);
        }
      }
    }
    _init(coordinates, radius) {
      let geometryCoordinates = handleGetLnglatValue(
        coordinates
      );
      this._geometry = new OlGeometry__namespace.Circle(geometryCoordinates, radius);
      this._feature = new OlFeature({
        geometry: this._geometry
      });
    }
    _initByFeature(feature) {
      this._feature = feature;
      this._geometry = feature.getGeometry();
    }
    getCenter() {
      let center = this._geometry.getCenter();
      return new Lnglat(center);
    }
    setCenter(center) {
      if (!isDefined(center)) {
        error_(
          createMessage$k("setCenter", commonMessage.paramsNotDefined("center"))
        );
      }
      if (!isValidCoordinate(center)) {
        error_(
          createMessage$k(
            "setCenter",
            commonMessage.paramsInvaildFormat("center", "coordinates")
          )
        );
      }
      let _center = handleGetLnglatValue(center);
      this._geometry.setCenter(_center);
    }
    getRadius() {
      return this._geometry.getRadius();
    }
    setRadius(radius) {
      if (!isDefined(radius)) {
        error_(
          createMessage$k("setRadius", commonMessage.paramsNotDefined("radius"))
        );
      }
      if (!isNumber(radius)) {
        error_(
          createMessage$k(
            "setRadius",
            commonMessage.paramsInvaildFormat("radius", "number")
          )
        );
      }
      this._geometry.setRadius(radius);
    }
    /**
     * 获取坐标
     */
    getCoordinates() {
      return this.getCenter();
    }
    /**
     * 设置线的坐标
     */
    setCoordinates(center) {
      this.setCenter(center);
    }
    setCenterAndRadius(center, radius) {
      if (!isDefined(center) || !isDefined(radius)) {
        error_(
          createMessage$k(
            "setCenterAndRadius",
            commonMessage.paramsListHaveNotDefined("center", "radius")
          )
        );
      }
      if (!isValidCoordinate(center)) {
        error_(
          createMessage$k(
            "setCenterAndRadius",
            commonMessage.paramsInvaildFormat("center")
          )
        );
      }
      if (!isNumber(radius)) {
        error_(
          createMessage$k(
            "setCenterAndRadius",
            commonMessage.paramsInvaildFormat("radius", "number")
          )
        );
      }
      let _center = handleGetLnglatValue(center);
      this._geometry.setCenterAndRadius(_center, radius);
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
  const DRAW_DEFAULT_PARAMS$1 = {
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
  function getOlDrawType$1(mode) {
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
  const MeasureMode = {
    Distance: "Distance",
    Area: "Area"
  };
  const DRAW_DEFAULT_PARAMS = {
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
  const MeasureMarkerIdSuffix = "omap-measure-marker";
  const MEASURE_MERKER_INDEX_NAME = "omap-measure-marker-index";
  function getOlDrawType(mode) {
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
      this.popup.setPosition(position);
    }
    setElement(element) {
      this.popup.setElement(element);
    }
    getElement() {
      return this.popup.getElement();
    }
  }
  const tooltipPopup = new TooltipPopup("单击地图开始测量");
  const measurePopup = new TooltipPopup("");
  const PACKAGE_NAME$j = "Measure";
  const createMessage$j = getPackageMessage(PACKAGE_NAME$j);
  let measureFeature = null;
  let measureListener = null;
  let pointMoveListener = null;
  class Measure extends Interaction {
    constructor(mode, params) {
      if (!Object.values(MeasureMode).includes(mode)) {
        error_(createMessage$j("constructor", "mode参数有误"));
        return;
      }
      super("Measure", { id: params == null ? void 0 : params.id });
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
          pointMoveListener = this.map.getMap().on("pointermove", (e) => {
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
      this._interaction.abortDrawing();
    }
    /**
     * 删除最后一个点
     */
    revoke() {
      this._interaction.removeLastPoint();
    }
    /**
     * 结束当前未完成的绘制
     */
    finish() {
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
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$j("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionMeasureEventType(type)) {
        warn_(createMessage$j("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$j("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const id = this.events.on(type, callback);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$j("once", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionMeasureEventType(type)) {
        warn_(createMessage$j("once", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$j("once", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const id = this.events.once(type, callback);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        warn_(createMessage$j("un", commonMessage.paramsNotDefined(id)));
        return;
      }
      if (!isString(id)) {
        warn_(createMessage$j("un", commonMessage.paramsInvaildFormat(id, "string")));
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
  let PACKAGE_NAME$i = "VectorLayer";
  let createMessage$i = getPackageMessage(PACKAGE_NAME$i);
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
    /**
     * 初始化矢量图层事件
     */
    initVectorLyaerEvent() {
      this._layer.getSource().on("addfeature", (e) => {
        const { feature } = e;
        console.log("添加feature事件");
        console.log(feature);
        console.log(this.target);
        if (isDefined(feature)) {
          if (this.target instanceof Draw || this.target instanceof Measure) {
            let basicFeature = createBaseFeatureByOlFeature(feature);
            if (basicFeature) {
              this.features.push(basicFeature);
            } else {
              warn_(createMessage$i("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
            }
            if (this.target instanceof Draw && this.target.getActive()) {
              this.target.events.emit(DrawEventType.drawEnd, handleInteractionDrawEvent(this.target, DrawEventType.drawEnd, { feature }));
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
          warn_(createMessage$i("initStyle", "style格式有误"));
        }
      }
      if (_style) {
        this._layer.setStyle(_style);
        this.style = style;
      }
    }
    getFeatures() {
      return this.features;
    }
    getFeatureById(id) {
      if (!isDefined(id)) {
        warn_(createMessage$i("setId", "参数id不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$i("setId", "参数id格式有误"));
        return;
      }
      let target = this.features.find((f) => {
        return isDefined(f.getId()) && f.getId() === id;
      });
      return target || void 0;
    }
    getFeaturesInExtent(extent, projection) {
      if (!isDefined(extent)) {
        warn_(createMessage$i("getFeaturesInExtent", "extent参数不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        warn_(createMessage$i("getFeaturesInExtent", "extent参数格式有误"));
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
      if (!isDefined(coordinates)) {
        warn_(createMessage$i("getFeaturesAtCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        warn_(createMessage$i("getFeaturesAtCoordinate", "coordinates参数格式有误"));
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
      if (!isDefined(feature)) {
        warn_(createMessage$i("addFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        this._layer.getSource().addFeature(feature.getFeature());
        this.features.push(feature);
      }
    }
    addFeatures(features) {
      if (!isDefined(features) || !isArray(features)) {
        warn_(createMessage$i("addFeatures", "参数格式有误不能为空"));
        return;
      }
      if (!isEmptyArray(features)) {
        features.forEach((f) => {
          this.addFeature(f);
        });
      }
    }
    removeFeature(feature) {
      if (!isDefined(feature)) {
        warn_(createMessage$i("removeFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        let index = this.features.indexOf(feature);
        this._layer.getSource().removeFeature(feature.getFeature());
        this.features.splice(index, 1);
      }
    }
    removeFeatures(features) {
      if (!isDefined(features) || !isArray(features)) {
        warn_(createMessage$i("removeFeatures", "参数格式有误不能为空"));
        return;
      }
      if (!isEmptyArray(features)) {
        features.forEach((f) => {
          this.removeFeature(f);
        });
      }
    }
    clear() {
      if (!this._layer.getSource()) {
        return;
      }
      this._layer.getSource().clear();
      this.features = [];
    }
    forEachFeature(callback) {
      if (!isDefined(callback) || !isFunction(callback)) {
        warn_(createMessage$i("forEachFeature", "参数格式有误"));
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
      if (!isDefined(callback)) {
        warn_(createMessage$i("forEachFeatureInExtent", "callback参数不能为空"));
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
      if (!isDefined(callback)) {
        warn_(createMessage$i("forEachFeatureIntersectingExtent", "callback参数不能为空"));
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
      if (!isDefined(coordinates)) {
        warn_(createMessage$i("getClosestFeatureToCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        warn_(createMessage$i("getClosestFeatureToCoordinate", "coordinates参数格式有误"));
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
      const extent = this._layer.getSource().getExtent();
      return new Extent(extent);
    }
    // 样式管理
    /**
     * 获取样式
     * @returns {OMapStyleLike | undefined} style 样式
     */
    getStyle() {
      return this.style;
    }
    /**
     * 设置图层样式
     * @param {OMapStyleLike} style 新样式
     */
    setStyle(style) {
      if (!isDefined(style)) {
        warn_(createMessage$i("setStyle", "style参数不能为空"));
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
      this._layer.setDeclutter(declutter);
    }
  }
  const PACKAGE_NAME$h = "Draw";
  const createMessage$h = getPackageMessage(PACKAGE_NAME$h);
  class Draw extends Interaction {
    constructor(mode, params) {
      let _params = defaultValue(params, {});
      if (!Object.values(DrawMode).includes(mode)) {
        error_(createMessage$h("constructor", commonMessage.paramsInvaildFormat("mode")));
      }
      super("Draw", { id: params == null ? void 0 : params.id });
      let draw_source = null;
      if (isDefined(_params.layer)) {
        if (_params.layer instanceof VectorLayer) {
          this.layer = _params.layer;
          draw_source = _params.layer.getSource();
        } else {
          warn_(createMessage$h("init", commonMessage.paramsInvaildFormat("layer", "VectorLayer")));
        }
      }
      if (!isDefined(draw_source)) {
        this.layer = new VectorLayer({
          style: DEFAULT_STYLE
        });
        draw_source = this.layer.getSource();
      }
      let drawParams = Object.assign({}, DRAW_DEFAULT_PARAMS$1, {
        clickTolerance: _params.clickTolerance,
        source: draw_source,
        features: void 0,
        style: void 0
      });
      this._interaction = new OlInteraction__namespace.Draw({
        ...getOlDrawType$1(mode),
        ...drawParams
      });
      this.initInteractionEvent();
    }
    initDrawEvent() {
      this._interaction.on("drawend", (e) => {
        const feature = e.feature;
        console.log(feature);
        if (isDefined(feature)) {
          let basicFeature = createBaseFeatureByOlFeature(feature);
          if (basicFeature) {
            this.layer.addFeature(basicFeature);
          } else {
            warn_(createMessage$h("createBaseFeatureByOlFeature", "根据olFeature创建BasicFeature出错"));
          }
        }
      });
    }
    /**
     * 追加坐标
     * @param coordinates 坐标
     */
    appendCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$h("appendCoordinates", commonMessage.paramsNotDefined("coordinates")));
      }
      let _coordinates = coordinates.map((c) => {
        return handleGetLnglatValue(c);
      });
      this._interaction.appendCoordinates(_coordinates);
    }
    /**
     * 取消绘制，并结束当前未完成的绘制
     */
    cancel() {
      this._interaction.abortDrawing();
    }
    /**
     * 撤销操作（会删除最后一个已经绘制的点位）
     */
    revoke() {
      this._interaction.removeLastPoint();
    }
    /**
     * 结束当前未完成的绘制（并自动补全图形）
     */
    finish() {
      this._interaction.finishDrawing();
    }
    destroy(destroyLayer = true) {
      if (destroyLayer && isDefined(this.getLayer())) {
        this._removeInteractionLayer();
      }
      super.destroy();
    }
    /**
     * 获取当前绘制的所有特征
     * @returns 特征数组
     */
    getFeatures() {
      if (!isDefined(this.getLayer())) {
        return [];
      }
      return defaultValue(this.getLayer().getFeatures(), []);
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$h("on", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionDrawEventType(type)) {
        error_(createMessage$h("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$h("on", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        if (type !== DrawEventType.drawEnd) {
          this.events.emit(type, handleInteractionDrawEvent(this, type, e));
        }
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$h("once", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionDrawEventType(type)) {
        error_(createMessage$h("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$h("once", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        if (type !== DrawEventType.drawEnd) {
          this.events.emit(type, handleInteractionDrawEvent(this, type, e));
        }
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$h("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(createMessage$h("un", commonMessage.paramsInvaildFormat(id, "string")));
      }
      this.events.remove(id);
    }
  }
  let PACKAGE_NAME$g = "LayerGroup";
  let createMessage$g = getPackageMessage(PACKAGE_NAME$g);
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
        error_(createMessage$g("constructor", "参数不能为空"));
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
        warn_(createMessage$g("constructor", "图层参数错误，必须为BaseLayer实例，已进行过滤"));
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
        warn_(createMessage$g("add", "参数layer不能为空"));
        return;
      }
      if (!(layer instanceof BaseLayer)) {
        warn_(createMessage$g("add", "参数layer必须为BaseLayer实例"));
        return;
      }
      let isExits = this.layers.some((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (isExits) {
        warn_(createMessage$g("add", "图层已存在"));
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
        warn_(createMessage$g("add", "参数layer不能为空"));
        return;
      }
      if (!(layer instanceof BaseLayer)) {
        warn_(createMessage$g("add", "参数layer必须为BaseLayer实例"));
        return;
      }
      let index = this.layers.findIndex((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (index === -1) {
        warn_(createMessage$g("remove", "图层不存在"));
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
        warn_(createMessage$g("removeById", "参数id不能为空"));
        return;
      }
      let index = this.layers.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === id;
      });
      if (index === -1) {
        warn_(createMessage$g("remove", "图层不存在"));
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
  function isVaildGroupId(value) {
    return isNumber(value) || isString(value);
  }
  function isVaildLayerGroup(value) {
    return value instanceof LayerGroup;
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
      super("MouseWheelZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.MouseWheelZoom(Object.assign(OMAP_INTERACTION_DEFAULT_PARAMS, defaultMouseWheelZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
    }
  }
  const defaultDoubleClickZoomOptions = {
    duration: 250,
    delta: 1
  };
  class DoubleClickZoom extends Interaction {
    constructor(params) {
      super("DoubleClickZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.DoubleClickZoom(Object.assign(OMAP_INTERACTION_DEFAULT_PARAMS, defaultDoubleClickZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
    }
  }
  const defaultDragPanOptions = {
    onFocusOnly: false,
    kinetic: void 0
  };
  class DragPan extends Interaction {
    constructor(params) {
      super("DragPan", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.DragPan(Object.assign({}, defaultDragPanOptions, params || {}));
      this.initInteractionEvent();
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
  const OMapMapInteractionIgnoreEventTypes = [
    "map:click",
    "map:dbclick",
    "map:singleclick"
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
    easing: "inAndOut",
    size: void 0
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
          result.pixel = new Pixel(e.pixel);
        }
        if (isDefined(e.coordinate)) {
          result.coordinate = new Lnglat(e.coordinate);
        }
        break;
      case "map:propertychange":
        if (e.oldValue) result.oldValue = e.key === "center" ? new Lnglat(e.oldValue) : e.oldValue;
        if (e.key === "size") {
          result.newValue = e.newValue || target.getSize();
        } else {
          result.newValue = e.newValue;
        }
        result.key = e.key;
        break;
      case "map:moveend":
        if (e.oldCenter) result.oldValue = new Lnglat(e.oldCenter);
        result.newValue = e.newCenter || target.getCenter();
        break;
      case "view:change:resolution":
        if (e.oldValue) result.oldValue = e.oldValue;
        result.newValue = e.newValue || target.getResolution();
        break;
      case "view:change:center":
        if (e.oldValue) result.oldValue = new Lnglat(e.oldValue);
        result.newValue = e.newValue || target.getCenter();
        break;
      case "view:change:rotation":
        if (e.oldValue) result.oldValue = e.oldValue;
        result.newValue = e.newValue || target.getRotation();
        break;
      case "view:propertychange":
        if (e.oldValue) result.oldValue = e.key === "center" ? new Lnglat(e.oldValue) : e.oldValue;
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
  function isMapDrawing(mapInteractions) {
    return mapInteractions.some((interaction) => {
      return isDefined(interaction) && interaction instanceof Draw && interaction.getActive();
    });
  }
  function isMapMeasuring(mapInteractions) {
    return mapInteractions.some((interaction) => {
      return isDefined(interaction) && interaction instanceof Measure && interaction.getActive();
    });
  }
  const PACKAGE_NAME$f = "Map";
  const createMessage$f = getPackageMessage(PACKAGE_NAME$f);
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
      if (!isDefined(element)) {
        error_(
          createMessage$f("constructor", commonMessage.paramsNotDefined("element"))
        );
      }
      let _options = defaultValue(options, {});
      const view_options = _options.view;
      if (!isDefined(view_options)) {
        error_(
          createMessage$f("constructor", commonMessage.paramsNotDefined("view"))
        );
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
      let mapInteractions = defaultValue(
        _options.interactions,
        defaultMapOptions.interactions
      );
      let mapControls = defaultValue(
        _options.controls,
        defaultMapOptions.controls
      );
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
        mapInteractions.forEach(
          (interaction) => {
            this.addInteraction(interaction);
          }
        );
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
    getMap() {
      return this._map;
    }
    getView() {
      return this._view;
    }
    getSize() {
      let size = this._map.getSize();
      return isDefined(size) ? new Size(size) : void 0;
    }
    setSize(size) {
      if (!isDefined(size)) {
        error_(createMessage$f("setSize", commonMessage.paramsNotDefined("size")));
      }
      let _size = handleGetSizeValue(size);
      this._map.setSize(_size);
    }
    // 地图信息相关
    getCenter() {
      let center = this._view.getCenter();
      return isDefined(center) ? new Lnglat(center) : void 0;
    }
    setCenter(center) {
      if (!isDefined(center)) {
        error_(
          createMessage$f("setCenter", commonMessage.paramsNotDefined("center"))
        );
      }
      let _center = handleGetLnglatValue(center);
      this._view.setCenter(_center);
    }
    getZoom() {
      return this._view.getZoom();
    }
    setZoom(zoom) {
      if (!isDefined(zoom)) {
        error_(createMessage$f("setZoom", commonMessage.paramsNotDefined("zoom")));
      }
      if (!isNumber(zoom)) {
        error_(
          createMessage$f("setZoom", commonMessage.paramsInvaildFormat("zoom"))
        );
      }
      this._view.setZoom(zoom);
    }
    getResolution() {
      return this._view.getResolution();
    }
    setResolution(resolution) {
      if (!isDefined(resolution)) {
        error_(
          createMessage$f(
            "setResolution",
            commonMessage.paramsNotDefined("resolution")
          )
        );
      }
      if (!isNumber(resolution)) {
        error_(
          createMessage$f(
            "setResolution",
            commonMessage.paramsInvaildFormat("resolution")
          )
        );
      }
      this._view.setResolution(resolution);
    }
    getRotation() {
      return this._view.getRotation();
    }
    setRotation(rotation) {
      if (!isDefined(rotation)) {
        error_(
          createMessage$f(
            "setRotation",
            commonMessage.paramsNotDefined("rotation")
          )
        );
      }
      if (!isNumber(rotation)) {
        error_(
          createMessage$f(
            "setRotation",
            commonMessage.paramsInvaildFormat("rotation")
          )
        );
      }
      this._view.setRotation(rotation);
    }
    getExtent() {
      let _extent = this._view.calculateExtent();
      return new Extent(_extent);
    }
    zoomIn(delta = 1) {
      if (isDefined(delta) && !isNumber(delta)) {
        error_(
          createMessage$f(
            "zoomIn",
            commonMessage.paramsInvaildFormat("delta", "number")
          )
        );
      }
      this._view.adjustZoom(delta);
    }
    zoomOut(delta = -1) {
      if (isDefined(delta) && !isNumber(delta)) {
        error_(
          createMessage$f(
            "zoomOut",
            commonMessage.paramsInvaildFormat("delta", "number")
          )
        );
      }
      this._view.adjustZoom(delta);
    }
    /** 图层管理相关 */
    /**
     * 添加图层
     * @param {BaseLayer} layer 图层对象
     */
    addLayer(layer) {
      if (!(layer instanceof BaseLayer)) {
        error_(
          createMessage$f("addLayer", commonMessage.paramsInvaildFormat("layer"))
        );
      }
      let isExist = false;
      const layerId = layer.getId();
      isExist = isDefined(layerId) ? isDefined(this.getLayerById(layerId)) : this.layers.some((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (isExist) {
        warn_(createMessage$f("addLayer", "图层已存在"));
      } else {
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
      if (!isDefined(layers)) {
        error_(
          createMessage$f("addLayers", commonMessage.paramsNotDefined("layers"))
        );
      }
      if (!isArray(layers)) {
        error_(
          createMessage$f(
            "addLayers",
            commonMessage.paramsInvaildFormat("layers", "数组类型")
          )
        );
      }
      layers.forEach((item) => {
        if (item instanceof BaseLayer) {
          this.addLayer(item);
        } else {
          warn_(
            createMessage$f(
              "addLayers",
              commonMessage.haveInvaildDataItem("layers")
            )
          );
        }
      });
    }
    /**
     * 根据id获取图层
     * @param {BaseLayerIdType} id 图层id
     * @returns {BaseLayer<OMapBaseLayerCommonType> | undefined} 图层对象
     */
    getLayerById(id) {
      let layer = this.layers.find((item) => {
        return isDefined(item.getId()) && item.getId() === id;
      });
      return layer;
    }
    /**
     * 移除图层
     * @param {BaseLayer<OMapBaseLayerCommonType>} layer 图层对象
     */
    removeLayer(layer) {
      if (!isDefined(layer)) {
        error_(
          createMessage$f("removeLayer", commonMessage.paramsNotDefined("layer"))
        );
      }
      if (!(layer instanceof BaseLayer)) {
        error_(
          createMessage$f(
            "removeLayer",
            commonMessage.paramsInvaildFormat("layer", "BaseLayer实例")
          )
        );
      }
      let index = this.layers.indexOf(layer);
      if (index !== -1) {
        this.layers.splice(index, 1);
        layer.setTarget(null);
        this._map.removeLayer(layer.getLayer());
      } else {
        warn_(createMessage$f("removeLayer", "图层不存在"));
      }
    }
    /**
     * 移除多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    removeLayers(layers) {
      if (!isDefined(layers)) {
        error_(
          createMessage$f("removeLayers", commonMessage.paramsNotDefined("layers"))
        );
      }
      if (!isArray(layers)) {
        error_(
          createMessage$f(
            "removeLayers",
            commonMessage.paramsInvaildFormat("layers", "数组类型")
          )
        );
      }
      layers.forEach((item) => {
        if (item instanceof BaseLayer) {
          this.removeLayer(item);
        } else {
          warn_(
            createMessage$f(
              "removeLayers",
              commonMessage.haveInvaildDataItem("layers")
            )
          );
        }
      });
    }
    /**
     * 根据id移除图层
     * @param {BaseLayerIdType} id 图层id
     */
    removeLayerById(layerId) {
      if (!isDefined(layerId)) {
        error_(
          createMessage$f(
            "removeLayerById",
            commonMessage.paramsNotDefined("layerId")
          )
        );
      }
      let layer = this.getLayerById(layerId);
      if (!isDefined(layer)) {
        warn_(createMessage$f("removeLayerById", `找不到id为${layerId}的图层`));
      } else {
        this.removeLayer(layer);
      }
    }
    /**
     * 获取所有图层
     * @returns {Array<BaseLayer>} 图层数组
     */
    getAllLayers() {
      return this.layers;
    }
    /** 图层组管理 */
    /**
     * 添加图层组
     * @param {LayerGroup} group 图层组实例
     */
    addLayerGroup(group) {
      if (!isDefined(group)) {
        error_(
          createMessage$f(
            "addLayerGroup",
            commonMessage.paramsNotDefined("layerGroup")
          )
        );
      }
      if (!isVaildLayerGroup(group)) {
        error_(
          createMessage$f(
            "addLayerGroup",
            commonMessage.paramsInvaildFormat("layerGroup", "LayerGroup实例")
          )
        );
      }
      let isExist = false;
      let groupId = group.getId();
      isExist = isDefined(groupId) ? this.layerGroups.some((item) => {
        return isDefined(item.getId()) && item.getId() === group.getId();
      }) : this.layerGroups.some((item) => {
        return item === group;
      });
      if (!isExist) {
        group.setMap(this);
        this.layerGroups = [...this.layerGroups, group];
        this.addLayers(group.getAllLayers());
      }
    }
    /**
     * 移除图层组
     * @param {LayerGroup} group 图层组实例
     */
    removeLayerGroup(group) {
      if (!isDefined(group)) {
        error_(
          createMessage$f(
            "removeLayerGroup",
            commonMessage.paramsNotDefined("layerGroup")
          )
        );
      }
      if (!isVaildLayerGroup(group)) {
        error_(
          createMessage$f(
            "removeLayerGroup",
            commonMessage.paramsInvaildFormat("layerGroup", "LayerGroup实例")
          )
        );
      }
      let index = -1;
      let groupId = group.getId();
      index = isDefined(groupId) ? this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === group.getId();
      }) : this.layerGroups.findIndex((item) => {
        return item === group;
      });
      if (index !== -1) {
        group.setMap(null);
        this.removeLayers(group.getAllLayers());
        this.layerGroups = this.layerGroups.splice(index, 1);
      } else {
        warn_(createMessage$f("removeLayerGroup", "图层组不存在"));
      }
    }
    /**
     * 移除图层组
     * @param {LayerGroupIdType} groupId 图层组id
     */
    removeLayerGroupById(groupId) {
      if (!isDefined(groupId)) {
        error_(
          createMessage$f(
            "removeLayerGroupById",
            commonMessage.paramsNotDefined("groupId")
          )
        );
      }
      if (!isVaildGroupId(groupId)) {
        error_(
          createMessage$f(
            "removeLayerGroupById",
            commonMessage.paramsInvaildFormat("groupId", "number或string类型")
          )
        );
      }
      let index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === groupId;
      });
      if (index !== -1) {
        this.layerGroups[index].setMap(null);
        this.removeLayers(this.layerGroups[index].getAllLayers());
        this.layerGroups = this.layerGroups.splice(index, 1);
      } else {
        warn_(createMessage$f("removeLayerGroupById", "图层组不存在"));
      }
    }
    /**
     * 获取所有图层组
     * @returns {LayerGroup[]} 所有图层组
     */
    getAllLayerGroups() {
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
      if (!isDefined(groupId)) {
        error_(
          createMessage$f(
            "removeLayerGroupById",
            commonMessage.paramsNotDefined("groupId")
          )
        );
      }
      if (!isVaildGroupId(groupId)) {
        error_(
          createMessage$f(
            "removeLayerGroupById",
            commonMessage.paramsInvaildFormat("groupId", "number或string类型")
          )
        );
      }
      let index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === groupId;
      });
      if (index === -1) {
        warn_(createMessage$f("getLayerGroupById", "未找到图层组"));
        return null;
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
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$f("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapMapEventType(type)) {
        error_(createMessage$f("on", commonMessage.paramsInvaildEnum("type")));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$f(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      let isMapTarget = MapEventTypeIsMap(type);
      const target = isMapTarget ? this._map : this._view;
      const unlisten = OlEvent.listen(
        target,
        isMapTarget ? type.replace("map:", "") : type.replace("view:", ""),
        (e) => {
          let isInteracting = isMapMeasuring(defaultValue(this.getInteractions(), [])) || isMapDrawing(defaultValue(this.getInteractions(), []));
          if (isInteracting && OMapMapInteractionIgnoreEventTypes.includes(type)) {
            return false;
          }
          this.events.emit(type, handleMapOnCallBack(this, type, e));
        }
      );
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$f(
            "once",
            commonMessage.paramsNotDefined("type or callback")
          )
        );
      }
      if (!isOMapMapEventType(type)) {
        error_(createMessage$f("once", commonMessage.paramsInvaildEnum("type")));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$f(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      let isMapTarget = MapEventTypeIsMap(type);
      const target = isMapTarget ? this._map : this._view;
      const unlisten = OlEvent.listen(
        target,
        isMapTarget ? type.replace("map:", "") : type.replace("view:", ""),
        (e) => {
          let isInteracting = isMapMeasuring(defaultValue(this.getInteractions(), [])) || isMapDrawing(defaultValue(this.getInteractions(), []));
          if (isInteracting && OMapMapInteractionIgnoreEventTypes.includes(type)) {
            return false;
          }
          this.events.emit(type, handleMapOnCallBack(this, type, e));
        },
        target,
        true
      );
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$f("un", commonMessage.paramsNotDefined("id")));
      }
      this.events.remove(id);
    }
    /** 属性管理 */
    /**
     * 获取地图属性
     * @returns {Record<string, any>} 地图属性
     */
    getProperties() {
      return defaultValue(this._map.getProperties(), {});
    }
    /**
     * 设置地图属性
     * @param {Record<string, any>} properties 地图属性
     */
    setProperties(properties) {
      if (!isDefined(properties)) {
        error_(
          createMessage$f(
            "setProperties",
            commonMessage.paramsNotDefined("properties")
          )
        );
      }
      if (!isObject(properties)) {
        error_(
          createMessage$f(
            "setProperties",
            commonMessage.paramsInvaildFormat("properties", "object类型")
          )
        );
      }
      const newProperties = Object.assign(
        {},
        defaultValue(this.getProperties(), {}),
        properties
      );
      this._map.setProperties(newProperties);
    }
    /** 交互管理 */
    /**
     * 添加交互
     * @param {Interaction} interaction 交互对象
     */
    addInteraction(interaction) {
      if (!isDefined(interaction)) {
        error_(
          createMessage$f(
            "addInteraction",
            commonMessage.paramsNotDefined("interaction")
          )
        );
      }
      if (!isVaildInteraction(interaction)) {
        error_(
          createMessage$f(
            "addInteraction",
            commonMessage.paramsInvaildFormat("interaction", "Interaction类型")
          )
        );
      }
      let index = this.interactions.findIndex((i) => {
        if (isDefined(interaction.getId())) {
          return interaction.getId() === i.getId();
        }
        return OlUtil__namespace.getUid(i.getInteraction()) === OlUtil__namespace.getUid(interaction.getInteraction());
      });
      if (index !== -1) {
        warn_(createMessage$f("addInteraction", "该交互已添加到地图中"));
      } else {
        if (interaction instanceof Draw || interaction instanceof Measure) {
          const layer = interaction.getLayer();
          if (isDefined(layer)) {
            layer.setTarget(interaction);
            this.addLayer(layer);
          }
        }
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
     * @returns {Interaction<OMapInteractionCommonType>[]} 交互数组
     */
    getInteractions() {
      return this.interactions;
    }
    getInteractionById(id) {
      if (this.interactions.length === 0) return null;
      let index = this.interactions.findIndex((i) => {
        return i.getId() === id;
      });
      if (index === -1) {
        return null;
      }
      return this.interactions[index];
    }
    /**
     * 移除交互
     * @param {Interaction<OMapInteractionCommonType>} interaction 交互对象
     */
    removeInteraction(interaction) {
      if (!isDefined(interaction)) {
        error_(
          createMessage$f(
            "addInteraction",
            commonMessage.paramsNotDefined("interaction")
          )
        );
      }
      if (!isVaildInteraction(interaction)) {
        error_(
          createMessage$f(
            "addInteraction",
            commonMessage.paramsInvaildFormat("interaction", "Interaction类型")
          )
        );
      }
      let index = this.interactions.findIndex((i) => {
        if (isDefined(interaction.getId())) {
          return interaction.getId() === i.getId();
        }
        return OlUtil__namespace.getUid(i.getInteraction()) === OlUtil__namespace.getUid(interaction.getInteraction());
      });
      if (index === -1) {
        warn_(createMessage$f("removeInteraction", "该交互未添加到地图中"));
      } else {
        if (interaction instanceof Draw || interaction instanceof Measure) {
          const layer = interaction.getLayer();
          if (isDefined(layer)) {
            layer.setTarget(null);
            this.removeLayer(layer);
          }
        }
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
      if (!isDefined(control)) {
        error_(
          createMessage$f("addControl", commonMessage.paramsNotDefined("control"))
        );
      }
      if (!isVaildControl(control)) {
        error_(
          createMessage$f(
            "addControl",
            commonMessage.paramsInvaildFormat("control", "Control类型")
          )
        );
      }
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index !== -1) {
        warn_(createMessage$f("addControl", "该控件已添加到地图中"));
        return;
      }
      if (isDefined(control.getControl())) {
        this.controls.push(control);
        this._map.addControl(control.getControl());
      }
    }
    /**
     * 获取所有控件
     * @returns {Control[]} 控件数组
     */
    getControls() {
      return this.controls;
    }
    /**
     * 根据ID获取控件
     * @param {OMapControlIdType} id 控件ID
     * @returns {Control | null} 控件对象
     */
    getControlById(id) {
      if (!isDefined(id)) {
        error_(
          createMessage$f("getControlById", commonMessage.paramsNotDefined("id"))
        );
      }
      if (!isNumber(id) && !isString(id)) {
        error_(
          createMessage$f(
            "getControlById",
            commonMessage.paramsInvaildFormat("id", "OMapControlIdType类型")
          )
        );
      }
      const target = this.controls.find((item) => {
        return item.getId() === id;
      });
      return isDefined(target) ? target : null;
    }
    /**
     * 移除控件
     * @param {Control} control 控件对象
     */
    removeControl(control) {
      if (!isDefined(control)) {
        error_(
          createMessage$f("addControl", commonMessage.paramsNotDefined("control"))
        );
      }
      if (!isVaildControl(control)) {
        error_(
          createMessage$f(
            "addControl",
            commonMessage.paramsInvaildFormat("control", "Control类型")
          )
        );
      }
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index === -1) {
        warn_(createMessage$f("removeControl", "该控件未添加到地图中"));
        return;
      }
      if (isDefined(control.getControl())) {
        this.controls.splice(index, 1);
        this._map.removeControl(control.getControl());
      }
    }
    /**
     * 弹窗管理
     */
    /**
     * 添加弹窗
     * @param popup
     */
    addPopup(popup) {
      if (!isDefined(popup)) {
        error_(
          createMessage$f("addPopup", commonMessage.paramsNotDefined("popup"))
        );
      }
      if (!isVaildPopup(popup)) {
        error_(
          createMessage$f(
            "addPopup",
            commonMessage.paramsInvaildFormat("popup", "Popup类型")
          )
        );
      }
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index !== -1) {
        warn_(createMessage$f("addPopup", "该弹窗已添加到地图中"));
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
     * @param {OMapPopupIdType} id 弹窗ID
     * @returns {Popup | null} 弹窗对象
     */
    getPopupById(id) {
      if (!isDefined(id)) {
        error_(
          createMessage$f("getPopupById", commonMessage.paramsNotDefined("id"))
        );
      }
      if (!isVaildPopupId(id)) {
        error_(
          createMessage$f(
            "getPopupById",
            commonMessage.paramsInvaildFormat("id", "OMapPopupIdType类型")
          )
        );
      }
      let popup = this.popups.find((popup2) => {
        return isDefined(popup2.getId()) && popup2.getId() === id;
      });
      return defaultValue(popup, null);
    }
    getPopupByProperties(filter) {
      if (!isDefined(filter)) {
        error_(
          createMessage$f("getPopupById", commonMessage.paramsNotDefined("filter"))
        );
      }
      if (!isFunction(filter)) {
        error_(
          createMessage$f(
            "getPopupById",
            commonMessage.paramsInvaildFormat("filter", "函数类型")
          )
        );
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
      return this.popups;
    }
    /**
     * 删除弹窗
     * @param {Popup} popup 弹窗对象
     */
    removePopup(popup) {
      if (!isDefined(popup)) {
        error_(
          createMessage$f("addPopup", commonMessage.paramsNotDefined("popup"))
        );
      }
      if (!isVaildPopup(popup)) {
        error_(
          createMessage$f(
            "addPopup",
            commonMessage.paramsInvaildFormat("popup", "Popup类型")
          )
        );
      }
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index == -1) {
        warn_(createMessage$f("removePopup", "该弹窗未添加到地图中"));
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
    /**
     * 计算几何图形的长度
     * @returns {number} 长度
     */
    getLength(feature) {
      let length = OlSphere__namespace.getLength(feature.getGeometry(), {
        projection: this._map.getView().getProjection()
      });
      return length;
    }
    /**
     * 计算几何图形的面积
     * @returns {number} 面积
     */
    getArea(feature) {
      let area = OlSphere__namespace.getArea(feature.getGeometry(), {
        projection: this._map.getView().getProjection()
      });
      return area;
    }
    /**
     * 遍历地图上指定像素位置的所有特征
     * @param {OMapPixelType} pixel 像素位置
     * @param callback 回调函数
     */
    forEachFeatureAtPixel(pixel, callback, options) {
      if (!isDefined(pixel)) {
        error_(
          createMessage$f(
            "forEachFeatureAtPixel",
            commonMessage.paramsNotDefined("pixel")
          )
        );
      }
      let _pixel = handleGetPixelValue(pixel);
      const params = Object.assign(
        {},
        DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
        defaultValue(options, {})
      );
      const result = this._map.forEachFeatureAtPixel(
        _pixel,
        (feature, layer) => {
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
        },
        {
          ...params,
          layerFilter: (layer) => {
            if (!isDefined(params.layerFilter)) return true;
            const targetLayer = this.layers.find((l) => {
              return OlUtil__namespace.getUid(l) === OlUtil__namespace.getUid(layer);
            });
            return isDefined(targetLayer) ? params.layerFilter(targetLayer) : false;
          }
        }
      );
      return result;
    }
    /**
     * 获取地图上指定像素位置的坐标位置
     * @param {OMapPixelType} pixel 像素位置
     * @returns {Lnglat} 坐标位置
     */
    getCoordinateFromPixel(pixel) {
      if (!isDefined(pixel)) {
        error_(
          createMessage$f(
            "getCoordinateFromPixel",
            commonMessage.paramsNotDefined("pixel")
          )
        );
      }
      if (!isValidPixel(pixel)) {
        error_(
          createMessage$f(
            "getCoordinateFromPixel",
            commonMessage.paramsInvaildFormat("pixel", "OMapPixelType类型")
          )
        );
      }
      const lnglat = this._map.getCoordinateFromPixel(handleGetPixelValue(pixel));
      return new Lnglat(lnglat);
    }
    /**
     * 获取地图上指定坐标位置的像素位置
     * @param {OMapCoordinateType} coordinate 坐标位置
     * @returns {Pixel} 像素位置
     */
    getPixelFromCoordinate(coordinate2) {
      if (!isDefined(coordinate2)) {
        error_(
          createMessage$f(
            "getPixelFromCoordinate",
            commonMessage.paramsNotDefined("coordinate")
          )
        );
      }
      if (!isValidCoordinate(coordinate2)) {
        error_(
          createMessage$f(
            "getPixelFromCoordinate",
            commonMessage.paramsInvaildFormat(
              "coordinate",
              "OMapCoordinateType类型"
            )
          )
        );
      }
      const pixel = this._map.getPixelFromCoordinate(
        handleGetLnglatValue(coordinate2)
      );
      return new Pixel(pixel);
    }
    getEventCoordinate(event) {
      return new Lnglat(this._map.getEventCoordinate(event));
    }
    getEventPixel(event) {
      return new Pixel(this._map.getEventPixel(event));
    }
    /**
     * 获取地图上指定像素位置的所有特征
     * @param {OMapPixelType} pixel 像素位置0
     * @param {OMapForEachFeatureAtPixelOptionsType} options? 遍历选项
     * @returns {Array<BaseFeature<OlGeometry.Geometry>>} 特征数组
     */
    getFeaturesAtPixel(pixel, options) {
      if (!isDefined(pixel)) {
        error_(
          createMessage$f(
            "getFeaturesAtPixel",
            commonMessage.paramsNotDefined("pixel")
          )
        );
      }
      const params = Object.assign(
        {},
        DEFAULT_OMAP_FOREACHFEATURE_AT_PIXEL_OPTIONS,
        defaultValue(options, {})
      );
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
      if (!isDefined(features) || features.length === 0) return [];
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
    /**
     * 判断地图上指定像素位置是否有特征
     * @param {OMapPixelType} pixel 像素位置0
     * @param {OMapForEachFeatureAtPixelOptionsType} options? 遍历选项
     * @returns {boolean} 是否有特征
     */
    hasFeatureAtPixel(pixel, options) {
      const features = this.getFeaturesAtPixel(
        handleGetPixelValue(pixel),
        options
      );
      return isDefined(features) && features.length > 0;
    }
    render() {
      this._map.render();
    }
    renderSync() {
      this._map.renderSync();
    }
    updateSize() {
      this._map.updateSize();
    }
    /**
     * view 视图相关方法
     */
    adjustCenter(deltaCoordinates) {
      if (!isDefined(deltaCoordinates)) {
        return;
      }
      this._view.adjustCenter(handleGetLnglatValue(deltaCoordinates));
    }
    adjustResolution(ratio, anchor) {
      this._view.adjustResolution(
        ratio,
        anchor ? handleGetLnglatValue(anchor) : void 0
      );
    }
    adjustRotation(delta, anchor) {
      this._view.adjustRotation(
        delta,
        anchor ? handleGetLnglatValue(anchor) : void 0
      );
    }
    adjustZoom(delta, anchor) {
      this._view.adjustZoom(
        delta,
        anchor ? handleGetLnglatValue(anchor) : void 0
      );
    }
    animate(options) {
      let _options = defaultValue(options, {});
      let params = Object.assign({}, OMAP_VIEW_ANIMATE_DEFAULT_OPTIONS, {
        center: handleGetLnglatValue(_options.center),
        resolution: _options.resolution,
        rotation: _options.rotation,
        zoom: _options.zoom,
        anchor: handleGetLnglatValue(_options.anchor),
        duration: _options.duration,
        easing: isDefined(_options.easing) ? defaultValue(
          OMapEasing[_options.easing],
          void 0
        ) : void 0
      });
      this._view.animate(params);
    }
    beginInteraction() {
      this._view.beginInteraction();
    }
    calculateExtent(size) {
      let extent = this._view.calculateExtent(
        isDefined(size) ? handleGetSizeValue(size) : void 0
      );
      return new Extent(extent);
    }
    cancelAnimations() {
      this._view.cancelAnimations();
    }
    centerOn(coordinate2, size, position) {
      if (!isDefined(coordinate2) || !isDefined(size) || !isDefined(position)) {
        warn_(
          createMessage$f(
            "centerOn",
            commonMessage.paramsListHaveNotDefined(
              "coordinate",
              "size",
              "position"
            )
          )
        );
      }
      this._view.centerOn(
        handleGetLnglatValue(coordinate2),
        handleGetSizeValue(size),
        handleGetPixelValue(position)
      );
    }
    changed() {
      this._view.changed();
    }
    endInteraction(duration, resolutionDirection, anchor) {
      this._view.endInteraction(
        duration,
        resolutionDirection,
        isDefined(anchor) ? handleGetLnglatValue(anchor) : void 0
      );
    }
    fit(featureOrExtent, options) {
      if (!isDefined(featureOrExtent)) {
        error_(
          createMessage$f("fit", commonMessage.paramsNotDefined("featureOrExtent"))
        );
      }
      if (!(featureOrExtent instanceof BasicFeature) && !isValidExtent(featureOrExtent)) {
        error_(
          createMessage$f(
            "fit",
            commonMessage.paramsInvaildFormat("featureOrExtent")
          )
        );
      }
      let target = featureOrExtent instanceof BasicFeature ? featureOrExtent.getGeometry() : handleGetExtentValue(featureOrExtent);
      const _options = isDefined(options) ? Object.assign({}, OMAP_VIEW_FIT_DEFAULT_OPTIONS, {
        ...options,
        size: isDefined(options.size) ? handleGetSizeValue(options.size) : void 0,
        easing: isDefined(options.easing) ? OMapEasing[options.easing] : void 0
      }) : {
        ...OMAP_VIEW_FIT_DEFAULT_OPTIONS,
        size: void 0,
        easing: OMapEasing[OMAP_VIEW_FIT_DEFAULT_OPTIONS.easing]
      };
      this._view.fit(target, _options);
    }
    getAnimating() {
      return this._view.getAnimating();
    }
    getInteracting() {
      return this._view.getInteracting();
    }
    getMaxResolution() {
      return this._view.getMaxResolution();
    }
    getMinResolution() {
      return this._view.getMinResolution();
    }
    getMaxZoom() {
      return this._view.getMaxZoom();
    }
    getMinZoom() {
      return this._view.getMinZoom();
    }
    getProjection() {
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
      if (!isBoolean(enabled)) {
        warn_(
          createMessage$f(
            "setProperties",
            commonMessage.paramsInvaildFormat("enabled", "boolean类型")
          )
        );
        return;
      }
      return this._view.setConstrainResolution(enabled);
    }
    setMaxZoom(maxZoom) {
      this._view.setMaxZoom(maxZoom);
    }
    setMinZoom(minZoom) {
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
  let PACKAGE_NAME$e = "GaodeLayer";
  let createMessage$e = getPackageMessage(PACKAGE_NAME$e);
  class GaodeLayer extends BaseLayer {
    constructor(type, options) {
      super("Gaode", defaultValue(options, {}));
      /**
       * 图层类型
       */
      __publicField(this, "gaodeType", null);
      if (!isDefined(type)) {
        error_(createMessage$e("GaodeLayer", "type参数不能为空"));
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
  const PACKAGE_NAME$d = "ProjUtil";
  const createMessage$d = getPackageMessage(PACKAGE_NAME$d);
  class ProjUtil {
    static fromLonLat(coordinate2, projection) {
      if (!isDefined(coordinate2)) {
        warn_(createMessage$d("fromLonLat", "coordinate参数不能为空"));
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
        warn_(createMessage$d("toLonLat", "coordinate参数不能为空"));
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
      error_(createMessage$c(key, `当前格式化工具不支持${key}方法`));
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
  const PACKAGE_NAME$c = "Format";
  const createMessage$c = getPackageMessage(PACKAGE_NAME$c);
  class Format {
    constructor(type, options) {
      __publicField(this, "type");
      __publicField(this, "options");
      __publicField(this, "_format");
      if (!isDefined(type)) {
        error_(createMessage$c("constructor", "初始化参数有误"));
        return;
      }
      if (!isVaildFormatType(type)) {
        error_(createMessage$c("constructor", "初始化参数有误"));
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
  let PACKAGE_NAME$b = "TdtLayer";
  let createMessage$b = getPackageMessage(PACKAGE_NAME$b);
  class TdtLayer extends BaseLayer {
    constructor(type, options) {
      var _a, _b, _c;
      super("Tdt", options);
      /**
       * 图层类型
       */
      __publicField(this, "tdtType", null);
      if (!isDefined(MapTokenProxy.tdt)) {
        warn_(createMessage$b("constructor", "缺少天地图key，请提前申明"));
        return;
      }
      if (!isDefined(type)) {
        error_(createMessage$b("constructor", "缺少参数天地图图层类型"));
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
  let PACKAGE_NAME$a = "TileLayer";
  let createMessage$a = getPackageMessage(PACKAGE_NAME$a);
  class TileLayer extends BaseLayer {
    constructor(options) {
      super("Tile", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        error_(createMessage$a("constructor", "source参数是必须的"));
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
  let PACKAGE_NAME$9 = "TileLayer";
  let createMessage$9 = getPackageMessage(PACKAGE_NAME$9);
  class XYZLayer extends BaseLayer {
    constructor(options) {
      super("XYZ", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        error_(createMessage$9("constructor", "source参数是必须的"));
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
  let PACKAGE_NAME$8 = "WMTSLayer";
  let createMessage$8 = getPackageMessage(PACKAGE_NAME$8);
  class WMTSLayer extends BaseLayer {
    constructor(options) {
      super("WMS", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$8("constructor", "缺少source参数"));
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
  let PACKAGE_NAME$7 = "WMSLayer";
  let createMessage$7 = getPackageMessage(PACKAGE_NAME$7);
  class WMSLayer extends BaseLayer {
    constructor(options) {
      super("WMS", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$7("constructor", "缺少source参数"));
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
  let PACKAGE_NAME$6 = "ImageLayer";
  let createMessage$6 = getPackageMessage(PACKAGE_NAME$6);
  class ImageLayer extends BaseLayer {
    constructor(options) {
      super("Image", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        warn_(createMessage$6("constructor", "缺少source参数"));
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
  const PACKAGE_NAME$5 = "DragBox";
  const createMessage$5 = getPackageMessage(PACKAGE_NAME$5);
  class DragBox extends Interaction {
    constructor(params) {
      super("DragBox", { id: params == null ? void 0 : params.id });
      __publicField(this, "extent", null);
      if (isDefined(params) && isDefined(params.onBoxEnd) && isFunction(params.onBoxEnd)) {
        DragBoxParamsBoxEndHandle.initFunction(params.onBoxEnd);
      }
      let _params = Object.assign({}, defaultValue(params, {}));
      this._interaction = new OlInteraction__namespace.DragBox(_params);
      this.initInteractionEvent();
      this._initDragBoxEvent();
      this.events = new Event(this);
    }
    _initDragBoxEvent() {
      this._interaction.on("boxend", (e) => {
        const extent = this._interaction.getGeometry().getExtent();
        if (isDefined(extent)) {
          this.extent = new Extent(extent);
        }
        DragBoxParamsBoxEndHandle.emit({
          coordinate: new Lnglat(e.coordinate),
          target: this,
          extent: this.extent
        });
      });
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$5("on", commonMessage.paramsListHaveNotDefined("type", "callback")));
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
      if (!isDefined(id)) {
        error_(createMessage$5("un", "参数不能为空"));
      }
      this.events.remove(id);
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$5("on", "参数不能为空"));
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
  const PACKAGE_NAME$4 = "InteractionExtent";
  const createMessage$4 = getPackageMessage(PACKAGE_NAME$4);
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
      super("InteractionExtent", { id: params == null ? void 0 : params.id });
      let _params = {
        ...defaultValue(params, {})
      };
      if (isDefined(_params.boxStyle)) {
        _params.boxStyle = handleGetStyleValue(_params.boxStyle);
      }
      this._interaction = new OlInteraction__namespace.Extent(Object.assign({}, defaultExtentOptions, defaultValue(_params, {})));
      this.initInteractionEvent();
    }
    /**
     * 获取当前选框范围
     * @returns {Extent} 当前选框范围
     */
    getExtent() {
      let extent = this._interaction.getExtent();
      return new Extent(extent);
    }
    /**
     * 设置当前选框范围
     * @param {OMapExtentType} extent 选框范围
     */
    setExtent(extent) {
      if (!isDefined(extent)) {
        error_(createMessage$4("setExtent", commonMessage.paramsNotDefined("extent")));
      }
      if (!isValidExtent(extent)) {
        error_(createMessage$4("setExtent", commonMessage.paramsInvaildFormat("extent", "OMap.Extent 或者 Extent数组")));
      }
      let _extent = handleGetExtentValue(extent);
      this._interaction.setExtent(_extent);
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$4("on", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionExtentEventType(type)) {
        error_(createMessage$4("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$4("on", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$4("once", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionExtentEventType(type)) {
        error_(createMessage$4("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$4("once", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$4("un", commonMessage.paramsNotDefined(id)));
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
  const PACKAGE_NAME$3 = "Modify";
  const createMessage$3 = getPackageMessage(PACKAGE_NAME$3);
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
        error_(createMessage$3("init", "params参数不能为空"));
      }
      super("Modify", { id: params.id });
      __publicField(this, "records", []);
      let modify_source = null;
      if (!isDefined(params.layer)) {
        warn_(createMessage$3("init", "layer参数不能为空"));
      }
      if (isDefined(params.layer) && !(params.layer instanceof VectorLayer)) {
        warn_(createMessage$3("init", "layer参数不属于VectorLayer类型"));
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
      let originFeatures = this.layer.getFeatures();
      let originFeaturesList = (originFeatures || []).map((o) => {
        return {
          id: o.getId(),
          originFeatureId: OlUtil__namespace.getUid(o.getFeature()),
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
              id: target.getId(),
              originFeatureId: OlUtil__namespace.getUid(target.getFeature()),
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
      return this._interaction.canInsertPoint();
    }
    canRemovePoint() {
      return this._interaction.canRemovePoint();
    }
    /**
     * 插入一个点
     * @param {OMapCoordinateType} coordinates 点的坐标
     */
    insertPoint(coordinates) {
      if (!isDefined(coordinates)) {
        warn_(createMessage$3("insertPoint", "coordinates参数不能为空"));
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
      if (!isDefined(coordinates)) {
        warn_(createMessage$3("removePoint", "coordinates参数不能为空"));
        return;
      }
      let _coordinates = handleGetLnglatValue(coordinates);
      return this._interaction.removePoint(_coordinates);
    }
    /**
     * 撤销修改
     */
    revoke(step = 1) {
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
          return OlUtil__namespace.getUid(item.getFeature()) === f.originFeatureId;
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
          return OlUtil__namespace.getUid(item.getFeature()) === f.originFeatureId;
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
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$3("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionModifyEventType(type)) {
        warn_(createMessage$3("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$3("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$3("on", commonMessage.paramsNotDefined("type or callback")));
        return;
      }
      if (!isOMapInteractionModifyEventType(type)) {
        warn_(createMessage$3("on", commonMessage.paramsInvaildEnum(type)));
        return;
      }
      if (!isFunction(callback)) {
        warn_(createMessage$3("on", commonMessage.paramsInvaildFormat("callback", "function")));
        return;
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        warn_(createMessage$3("un", commonMessage.paramsNotDefined(id)));
        return;
      }
      if (!isString(id)) {
        warn_(createMessage$3("un", commonMessage.paramsInvaildFormat(id, "string")));
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
  const PACKAGE_NAME$2 = "Select";
  const createMessage$2 = getPackageMessage(PACKAGE_NAME$2);
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
      super("Select", { id: params == null ? void 0 : params.id });
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
        layers = params.layers.map((l) => l.getLayer());
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
          warn_(createMessage$2("initStyle", "style格式有误"));
        }
      }
      return _style;
    }
    initFilter(filter) {
      if (isDefined(filter)) {
        return (feature, layer) => {
          var _a;
          let targetFeature = getTargetFeature(OlUtil__namespace.getUid(feature));
          let targetLayer = (_a = this.map) == null ? void 0 : _a.getAllLayers().find((l) => OlUtil__namespace.getUid(l.getLayer()) === OlUtil__namespace.getUid(layer));
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
      return this.selected;
    }
    getDeselected() {
      return this.deselected;
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$2("on", "参数不能为空"));
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
      if (!isDefined(id)) {
        warn_(createMessage$2("un", "参数不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$2("un", "事件ID应为number或string类型"));
        return;
      }
      this.events.remove(id);
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(createMessage$2("on", "参数不能为空"));
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
      super("Link", { id: params == null ? void 0 : params.id });
      let _params = {
        ...defaultValue(params, {}),
        animate: isDefined(params == null ? void 0 : params.animate) && !isBoolean(params == null ? void 0 : params.animate) ? {
          ...params.animate,
          center: params.animate.center instanceof Lnglat ? params.animate.center.toArray() : params.animate.center
        } : defaultValue(params == null ? void 0 : params.animate, true)
      };
      this._interaction = new OlInteraction__namespace.Link(Object.assign({}, defaultLinkOptions, _params));
      this.initInteractionEvent();
    }
  }
  const defaultKeyboardZoomOptions = {
    duration: 100,
    delta: 1
  };
  class KeyboardZoom extends Interaction {
    constructor(params) {
      super("KeyboardZoom", { id: params == null ? void 0 : params.id });
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
      super("DragZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.DragZoom(Object.assign({}, defaultDragZoomOptions, defaultValue(params, {})));
      this.initInteractionEvent();
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
