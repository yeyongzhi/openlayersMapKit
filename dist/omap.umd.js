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
  const PACKAGE_NAME$F = "Size";
  const createMessage$F = getPackageMessage(PACKAGE_NAME$F);
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
            createMessage$F(
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
            createMessage$F(
              "constructor",
              commonMessage.paramsInvaildFormat("size")
            )
          );
        }
      } else {
        error_(
          createMessage$F("constructor", commonMessage.paramsInvaildFormat("size"))
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
  const PACKAGE_NAME$E = "Pixel";
  const createMessage$E = getPackageMessage(PACKAGE_NAME$E);
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
            createMessage$E(
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
            createMessage$E(
              "constructor",
              commonMessage.paramsInvaildFormat("pixel")
            )
          );
        }
      } else {
        error_(
          createMessage$E(
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
        error_(createMessage$E("equals", commonMessage.paramsNotDefined("pixel")));
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
  const PACKAGE_NAME$D = "Lnglat";
  const createMessage$D = getPackageMessage(PACKAGE_NAME$D);
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
            createMessage$D(
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
            createMessage$D(
              "constructor",
              commonMessage.paramsInvaildFormat("lnglat")
            )
          );
        }
      } else {
        error_(
          createMessage$D(
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
        error_(createMessage$D("setLng", commonMessage.paramsNotDefined("lng")));
      }
      if (!isNumber(lng)) {
        error_(createMessage$D("setLng", commonMessage.paramsInvaildFormat("lng")));
      }
      this._lnglat[0] = lng;
    }
    /**
     * 设置纬度
     * @param {number} lat 纬度
     */
    setLat(lat) {
      if (!isDefined(lat)) {
        error_(createMessage$D("setLat", commonMessage.paramsNotDefined("lat")));
      }
      if (!isNumber(lat)) {
        error_(createMessage$D("setLat", commonMessage.paramsInvaildFormat("lat")));
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
        error_(createMessage$D("equals", commonMessage.paramsNotDefined("lnglat")));
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
  const PACKAGE_NAME$C = "Color";
  const createMessage$C = getPackageMessage(PACKAGE_NAME$C);
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
        error_(createMessage$C("constructor", "初始化参数有误"));
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
        error_(createMessage$C("withAlpha", "透明度参数有误"));
        return;
      }
      if (this._color.startsWith("rgb") && !this._color.startsWith("rgba")) {
        this._initColor([...extractRGBValues(this._color), alpha]);
      } else if (this._color.startsWith("rgba")) {
        this._initColor([...extractRGBAValues(this._color), alpha]);
      } else {
        if (!isDefined(presetsColor[this._color])) {
          error_(createMessage$C("withAlpha", "颜色值有误"));
          return;
        }
        let colorRGB = ColorhexToRGB(presetsColor[this._color]);
        if (!isDefined(colorRGB)) {
          error_(createMessage$C("withAlpha", "颜色值有误"));
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
  const PACKAGE_NAME$B = "Extent";
  const createMessage$B = getPackageMessage(PACKAGE_NAME$B);
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
            createMessage$B(
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
            createMessage$B(
              "constructor",
              commonMessage.paramsInvaildFormat("extent")
            )
          );
        }
      } else {
        error_(
          createMessage$B(
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
          createMessage$B(
            "boundingExtent",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isArray(coordinates)) {
        error_(
          createMessage$B("boundingExtent", "参数coordinates格式错误，必须为数组")
        );
      }
      let vaildList = coordinates.filter((c) => {
        return isValidCoordinate(c);
      });
      if (vaildList.length < coordinates.length) {
        warn_(
          createMessage$B(
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
          createMessage$B(
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
          createMessage$B(
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
          createMessage$B(
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
          createMessage$B(
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
          createMessage$B("getArea", commonMessage.paramsNotDefined("extent"))
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
          createMessage$B(
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
          createMessage$B("isEmpty", commonMessage.paramsNotDefined("extent"))
        );
      }
      let _extent = handleGetExtentValue(extent);
      return OlExtent__namespace.isEmpty(_extent);
    }
  }
  function isVaildStyle(value) {
    return value instanceof Style;
  }
  function isVaildArrayStyle(value) {
    return Array.isArray(value) && value.every((item) => isVaildStyle(item));
  }
  function isVaildFunctionStyle(value) {
    return isFunction(value);
  }
  const PACKAGE_NAME$A = "BasicFeature";
  const createMessage$A = getPackageMessage(PACKAGE_NAME$A);
  class BasicFeature {
    constructor(type, coordinatesOrFeature, radius) {
      __publicField(this, "id", null);
      __publicField(this, "type");
      // 非空断言操作符 !（推荐用于抽象类）
      __publicField(this, "_feature");
      __publicField(this, "_geometry");
      __publicField(this, "style");
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
        error_(createMessage$A("setId", "参数id不能为空"));
      }
      if (!isNumber(id) && !isString(id)) {
        error_(createMessage$A("setId", "参数id格式有误"));
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
    dispatchEvent(event) {
      return this._feature.dispatchEvent(event);
    }
    clone() {
      const FeatureCtor = this.constructor;
      const clonedFeature = this._feature.clone();
      const cloned = new FeatureCtor(clonedFeature);
      if (isDefined(this.id)) {
        cloned.setId(this.id);
      }
      if (isDefined(this.style)) {
        cloned.setStyle(this.style);
      }
      return cloned;
    }
    get(key) {
      if (!isDefined(key)) {
        error_(createMessage$A("get", commonMessage.paramsNotDefined("key")));
      }
      if (!isString(key)) {
        error_(createMessage$A("get", commonMessage.paramsInvaildFormat("key", "string")));
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
      return this._feature.getGeometryName();
    }
    getKeys() {
      return this._feature.getKeys();
    }
    getStyle() {
      return this.style;
    }
    setStyle(style) {
      let _style = handleGetStyleValue(style);
      this._feature.setStyle(_style);
      this.style = style;
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
        error_(createMessage$A("setProperties", commonMessage.paramsInvaildFormat("properties", "object")));
      }
      this._feature.setProperties(properties);
    }
  }
  function isValidExtent(value) {
    if (value instanceof Extent) {
      return true;
    }
    return isExtentType(value);
  }
  const PACKAGE_NAME$z = "Point";
  const createMessage$z = getPackageMessage(PACKAGE_NAME$z);
  class Point extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$z(
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
            createMessage$z(
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
          createMessage$z(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidCoordinate(coordinates)) {
        error_(
          createMessage$z(
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
          createMessage$z(
            "intersectsExtent",
            commonMessage.paramsNotDefined("extent")
          )
        );
      }
      if (!isValidExtent(extent)) {
        error_(
          createMessage$z(
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
  const PACKAGE_NAME$y = "LineString";
  const createMessage$y = getPackageMessage(PACKAGE_NAME$y);
  class LineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$y(
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
            createMessage$y(
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
          createMessage$y(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidLineStringCoordinates(coordinates)) {
        error_(
          createMessage$y(
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
          createMessage$y(
            "appendCoordinate",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        error_(
          createMessage$y(
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
        error_(createMessage$y("getCoordinateAt", "参数不能为空"));
      }
      if (!(isNumber(fraction) && fraction >= 0 && fraction <= 1)) {
        error_(createMessage$y("getCoordinateAt", "参数格式有误"));
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
        error_(createMessage$y("intersectsExtent", "参数extent不能为空"));
      }
      if (!isValidExtent(extent)) {
        error_(createMessage$y("intersectsExtent", "坐标格式有误"));
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
  const PACKAGE_NAME$x = "LinearRing";
  const createMessage$x = getPackageMessage(PACKAGE_NAME$x);
  class LinearRing extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$x(
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
            createMessage$x(
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
          createMessage$x(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidLinearRingCoordinates(coordinates)) {
        error_(
          createMessage$x(
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
  const PACKAGE_NAME$w = "Polygon";
  const createMessage$w = getPackageMessage(PACKAGE_NAME$w);
  class Polygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$w(
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
            createMessage$w(
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
          createMessage$w(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidPolygonCoordinates(coordinates)) {
        error_(
          createMessage$w(
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
          createMessage$w(
            "appendLinearRing",
            commonMessage.paramsNotDefined("linearRingParams")
          )
        );
      }
      if (!(linearRingParams instanceof LinearRing && isValidLinearRingCoordinates(linearRingParams))) {
        error_(
          createMessage$w(
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
          createMessage$w(
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
          createMessage$w(
            "intersectsExtent",
            commonMessage.paramsNotDefined("extent")
          )
        );
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        error_(
          createMessage$w(
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
  const PACKAGE_NAME$v = "MultiPoint";
  const createMessage$v = getPackageMessage(PACKAGE_NAME$v);
  class MultiPoint extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$v(
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
            createMessage$v(
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
          createMessage$v(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!coordinates.every((item) => isValidCoordinate(item))) {
        error_(
          createMessage$v(
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
          createMessage$v(
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
          createMessage$v(
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
          createMessage$v("getPoint", commonMessage.paramsNotDefined("index"))
        );
      }
      if (!isNumber(index)) {
        error_(
          createMessage$v(
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
          createMessage$v(
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
          createMessage$v(
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
  const PACKAGE_NAME$u = "MultiLineString";
  const createMessage$u = getPackageMessage(PACKAGE_NAME$u);
  class MultiLineString extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$u(
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
            createMessage$u(
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
          createMessage$u(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidMultiLineStringCoordinates(coordinates)) {
        error_(
          createMessage$u(
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
  const PACKAGE_NAME$t = "MultiPolygon";
  const createMessage$t = getPackageMessage(PACKAGE_NAME$t);
  class MultiPolygon extends BasicFeature {
    constructor(coordinatesOrFeature, properties) {
      if (!isDefined(coordinatesOrFeature)) {
        error_(
          createMessage$t(
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
            createMessage$t(
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
          createMessage$t(
            "setCoordinates",
            commonMessage.paramsNotDefined("coordinates")
          )
        );
      }
      if (!isValidMultiPolygonCoordinates(coordinates)) {
        error_(
          createMessage$t(
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
  const PACKAGE_NAME$s = "Circle";
  const createMessage$s = getPackageMessage(PACKAGE_NAME$s);
  class Circle extends BasicFeature {
    constructor(centerOrFeature, radius, properties) {
      if (!isDefined(centerOrFeature)) {
        error_(
          createMessage$s(
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
            createMessage$s(
              "constructor",
              commonMessage.paramsInvaildFormat("centerOrFeature")
            )
          );
        }
        if (!(isDefined(radius) && isNumber(radius))) {
          error_(
            createMessage$s(
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
          createMessage$s("setCenter", commonMessage.paramsNotDefined("center"))
        );
      }
      if (!isValidCoordinate(center)) {
        error_(
          createMessage$s(
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
          createMessage$s("setRadius", commonMessage.paramsNotDefined("radius"))
        );
      }
      if (!isNumber(radius)) {
        error_(
          createMessage$s(
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
          createMessage$s(
            "setCenterAndRadius",
            commonMessage.paramsListHaveNotDefined("center", "radius")
          )
        );
      }
      if (!isValidCoordinate(center)) {
        error_(
          createMessage$s(
            "setCenterAndRadius",
            commonMessage.paramsInvaildFormat("center")
          )
        );
      }
      if (!isNumber(radius)) {
        error_(
          createMessage$s(
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
  function createBaseFeatureByOlRenderFeature(feature) {
    let olFeature = Feature.toFeature(feature);
    return createBaseFeatureByOlFeature(olFeature);
  }
  function handleGetColorValue(color) {
    if (isDefined(color)) {
      return color instanceof Color ? color.getColor() : color;
    }
    return void 0;
  }
  function getOlGeometryStyle(geometry) {
    if (isString(geometry)) {
      return geometry;
    }
    if (isFunction(geometry)) {
      return (feature) => {
        let OMapFeature = feature instanceof OlFeature ? createBaseFeatureByOlFeature(feature) : createBaseFeatureByOlRenderFeature(feature);
        return isDefined(OMapFeature) ? geometry(OMapFeature).getGeometry() : void 0;
      };
    }
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
  function handleGetStyleValue(style, featureResolver) {
    if (!isDefined(style)) {
      return void 0;
    }
    if (isVaildStyle(style)) {
      return style.getStyle();
    } else if (isVaildArrayStyle(style)) {
      return style.map((item) => item.getStyle());
    } else if (isVaildFunctionStyle(style)) {
      return (feature, resolution) => {
        const _feature = createBaseFeatureByOlFeature(feature);
        const _style = style(_feature, resolution);
        if (isVaildArrayStyle(_style)) {
          return _style.map((item) => item.getStyle());
        } else if (isVaildStyle(_style)) {
          return _style.getStyle();
        }
        return void 0;
      };
    }
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
  const PACKAGE_NAME$r = "Style";
  const createMessage$r = getPackageMessage(PACKAGE_NAME$r);
  class Style {
    constructor(options) {
      __publicField(this, "_style");
      if (!isDefined(options)) {
        error_(createMessage$r("constructor", commonMessage.paramsNotDefined("options")));
      }
      const { geometry, fill, stroke, text, circle, icon, regularShape } = options;
      let _image;
      if (circle) {
        _image = getOlCircleSingleStyle(circle);
      } else if (icon) {
        _image = getOlIconSingleStyle(icon);
      } else if (regularShape) {
        _image = getOlRegularShapeSingleStyle(regularShape);
      }
      let _params = Object.assign({}, options, {
        geometry: isDefined(geometry) ? getOlGeometryStyle(geometry) : void 0,
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
  const PACKAGE_NAME$q = "Event";
  const createMessage$q = getPackageMessage(PACKAGE_NAME$q);
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
          error_(createMessage$q("emit", `回调异常: ${String(e)}`));
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
          this.disposeUnlisten(item.unlisten);
          list.splice(idx, 1);
          if (list.length === 0) this.events.delete(type);
          return this;
        }
      }
      warn_(createMessage$q("remove", `未找到【id=${id}】的监听`));
      return this;
    }
    off(type) {
      if (type === void 0) {
        for (const list of this.events.values()) {
          for (const item of list) {
            this.disposeUnlisten(item.unlisten);
          }
        }
        this.events.clear();
      } else {
        const list = this.events.get(type);
        if (list) {
          for (const item of list) {
            this.disposeUnlisten(item.unlisten);
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
    disposeUnlisten(unlisten) {
      if (!isDefined(unlisten)) return;
      if (isFunction(unlisten)) {
        unlisten();
        return;
      }
      if (Array.isArray(unlisten)) {
        unlisten.forEach((item) => OlEvent.unlistenByKey(item));
        return;
      }
      OlEvent.unlistenByKey(unlisten);
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
  const PACKAGE_NAME$p = "Popup";
  const createMessage$p = getPackageMessage(PACKAGE_NAME$p);
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
        offset: isDefined(_params.offset) ? handleGetPixelValue(_params.offset) : void 0,
        position: isDefined(_params.position) ? handleGetLnglatValue(_params.position) : void 0
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
      return isDefined(coordinates) ? new Lnglat(coordinates) : void 0;
    }
    /**
     * 设置弹窗位置
     * @param {Lnglat | OlCoordinateType} coordinates 弹窗位置
     */
    setPosition(coordinates) {
      let _coordinates = handleGetLnglatValue(coordinates);
      this._popup.setPosition(_coordinates);
    }
    getPositioning() {
      return this._popup.getPositioning();
    }
    setPositioning(positioning) {
      if (!isVaildPopupPositioningType(positioning)) {
        error_(createMessage$p("setPositioning", "参数positioning值有误"));
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
        error_(createMessage$p("setProperties", "参数不能为空"));
      }
      this.events.emit(
        "change:properties",
        handlePopupEvent(this, "change:properties", {
          oldValue: this.getProperties(),
          key: "properties",
          newValue: Object.assign({}, this.properties, properties)
        })
      );
      this.properties = Object.assign({}, this.properties, properties);
    }
    getElement() {
      return this._popup.getElement();
    }
    setElement(element) {
      if (!isDefined(element)) {
        error_(createMessage$p("setElement", "参数不能为空"));
      }
      element.classList.add("omap-popup-selectable");
      return this._popup.setElement(element);
    }
    getContent() {
      return this.content;
    }
    setContent(content) {
      this.events.emit(
        "change:content",
        handlePopupEvent(this, "change:content", {
          oldValue: this.getContent(),
          key: "content",
          newValue: content
        })
      );
      this.content = content;
      this.setElement(createDefaultContentElement(content));
    }
    getOffset() {
      let offset = this._popup.getOffset();
      return new Pixel(offset);
    }
    setOffset(offset) {
      let _offset = handleGetPixelValue(offset);
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
        warn_(
          createMessage$p(
            "on",
            commonMessage.paramsListHaveNotDefined("type or callback")
          )
        );
        return;
      }
      if (!isOMapPopupEventType(type)) {
        warn_(createMessage$p("on", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(
          createMessage$p(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
        return;
      }
      const unlisten = OlEvent.listen(
        this._popup,
        type,
        (e) => {
          this.events.emit(type, handlePopupEvent(this, type, e));
        }
      );
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        warn_(
          createMessage$p(
            "on",
            commonMessage.paramsListHaveNotDefined("type or callback")
          )
        );
        return;
      }
      if (!isOMapPopupEventType(type)) {
        warn_(createMessage$p("on", commonMessage.paramsInvaildEnum("type")));
        return;
      }
      if (!isFunction(callback)) {
        warn_(
          createMessage$p(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
        return;
      }
      const unlisten = OlEvent.listen(
        this._popup,
        type,
        (e) => {
          this.events.emit(type, handlePopupEvent(this, type, e));
        }
      );
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        warn_(createMessage$p("un", commonMessage.paramsNotDefined("id")));
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
  function isValidPixel(value) {
    if (value instanceof Pixel) {
      return true;
    }
    return isArrayLength2(value) && value.every((item) => isNumber(item));
  }
  const PACKAGE_NAME$o = "Map";
  const createMessage$o = getPackageMessage(PACKAGE_NAME$o);
  class Projection {
    constructor(proj) {
      __publicField(this, "_projection");
      __publicField(this, "code", "");
      __publicField(this, "units", "degrees");
      let result = "";
      if (isString(proj)) {
        result = proj.startsWith("EPSG") ? proj : "EPSG:" + proj;
      } else {
        let _proj = proj;
        if (!isDefined(_proj.code)) {
          error_(createMessage$o("constructor", "初始化参数有误"));
        }
        result = _proj.code;
        result = result.startsWith("EPSG") ? result : "EPSG:" + result;
      }
      this.code = result;
      this._projection = OlProj__namespace.get(result);
      if (!isDefined(this._projection)) {
        warn_(createMessage$o("constructor", "坐标系不存在"));
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
  const DEFAULT_LAYER_OPACITY = 1;
  const DEFAULT_LAYER_VISIBLE = true;
  const DEFAULT_LAYER_MIN_ZOOM = 0;
  const DEFAULT_LAYER_MAX_ZOOM = 22;
  const DEFAULT_LAYER_MIN_RESOLUTION = 0;
  const DEFAULT_LAYER_MAX_RESOLUTION = Infinity;
  class BaseLayer {
    constructor(type, options) {
      /**
       * 图层类型
       */
      __publicField(this, "type", null);
      /**
       * 包名（用于日志输出）
       */
      __publicField(this, "_packageName", "BaseLayer");
      /**
       * 日志消息生成函数
       */
      __publicField(this, "_createMessage");
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
      __publicField(this, "extent");
      // 图层范围，默认全局
      __publicField(this, "minZoom", DEFAULT_LAYER_MIN_ZOOM);
      // 最小缩放级别，默认0
      __publicField(this, "maxZoom", DEFAULT_LAYER_MAX_ZOOM);
      // 最大缩放级别，默认22
      __publicField(this, "minResolution", DEFAULT_LAYER_MIN_RESOLUTION);
      // 最小分辨率，默认0
      __publicField(this, "maxResolution", DEFAULT_LAYER_MAX_RESOLUTION);
      // 最大分辨率，默认Infinity
      __publicField(this, "zIndex");
      // 图层层级
      __publicField(this, "properties", {});
      // 图层属性，用于存储图层相关信息
      /**
       * 图层所属的图层组id，由 LayerGroup 管理
       */
      __publicField(this, "groupId", null);
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
      this._packageName = `${type}Layer`;
      this._createMessage = getPackageMessage(this._packageName);
      this.id = defaultValue(_options.id, null);
      this.name = defaultValue(_options.name, "");
      this.className = defaultValue(_options.className, "");
      this.opacity = defaultValue(_options.opacity, DEFAULT_LAYER_OPACITY);
      this.visible = defaultValue(_options.visible, DEFAULT_LAYER_VISIBLE);
      this.extent = defaultValue(_options.extent, void 0);
      this.minZoom = defaultValue(_options.minZoom, DEFAULT_LAYER_MIN_ZOOM);
      this.maxZoom = defaultValue(_options.maxZoom, DEFAULT_LAYER_MAX_ZOOM);
      this.minResolution = defaultValue(_options.minResolution, DEFAULT_LAYER_MIN_RESOLUTION);
      this.maxResolution = defaultValue(_options.maxResolution, DEFAULT_LAYER_MAX_RESOLUTION);
      this.zIndex = defaultValue(_options.zIndex, void 0);
      this.properties = defaultValue(_options.properties, {});
      this.map = defaultValue(_options.map, null);
      this.groupId = null;
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
     * @returns {BaseLayerIdType} 图层id
     */
    getId() {
      return this.id;
    }
    /**
     * 设置图层id
     * @param {BaseLayerIdType} id 图层id
     */
    setId(id) {
      this.id = id;
    }
    /**
     * 获取图层名称
     * @returns {string} 图层名称
     */
    getName() {
      return this.name;
    }
    /**
     * 设置图层名称
     * @param {string} name 图层名称
     */
    setName(name) {
      if (!isDefined(name)) {
        error_(this._createMessage("setName", commonMessage.paramsNotDefined("name")));
      }
      if (!isString(name)) {
        error_(this._createMessage("setName", commonMessage.paramsInvaildFormat("name", "string类型")));
      }
      this.name = name;
    }
    /**
     * 获取图层样式类名
     * @returns {string} 样式类名
     */
    getClassName() {
      return this.className;
    }
    /**
     * 设置图层样式类名
     * @param {string} className 样式类名
     */
    setClassName(className) {
      if (!isDefined(className)) {
        error_(this._createMessage("setClassName", commonMessage.paramsNotDefined("className")));
      }
      if (!isString(className)) {
        error_(this._createMessage("setClassName", commonMessage.paramsInvaildFormat("className", "string类型")));
      }
      this.className = className;
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
     * @returns 图层数据源实例
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
        error_(this._createMessage("setOpacity", commonMessage.paramsNotDefined("opacity")));
      }
      if (!isVaildOpacity(opacity)) {
        error_(this._createMessage("setOpacity", commonMessage.paramsInvaildFormat("opacity", "0~1的数字")));
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
        error_(this._createMessage("setVisible", commonMessage.paramsNotDefined("visible")));
      }
      if (!isBoolean(visible)) {
        error_(this._createMessage("setVisible", commonMessage.paramsInvaildFormat("visible", "boolean类型")));
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
        error_(this._createMessage("setExtent", commonMessage.paramsNotDefined("extent")));
      }
      if (!isValidExtent(extent)) {
        error_(this._createMessage("setExtent", commonMessage.paramsInvaildFormat("extent", "Extent类型")));
      }
      this._layer.setExtent(handleGetExtentValue(extent));
    }
    setMinZoom(minZoom) {
      if (!isDefined(minZoom)) {
        error_(this._createMessage("setMinZoom", commonMessage.paramsNotDefined("minZoom")));
      }
      if (!isNumber(minZoom)) {
        error_(this._createMessage("setMinZoom", commonMessage.paramsInvaildFormat("minZoom", "number类型")));
      }
      this._layer.setMinZoom(minZoom);
    }
    getMinZoom() {
      return this._layer.getMinZoom();
    }
    setMaxZoom(maxZoom) {
      if (!isDefined(maxZoom)) {
        error_(this._createMessage("setMaxZoom", commonMessage.paramsNotDefined("maxZoom")));
      }
      if (!isNumber(maxZoom)) {
        error_(this._createMessage("setMaxZoom", commonMessage.paramsInvaildFormat("maxZoom", "number类型")));
      }
      this._layer.setMaxZoom(maxZoom);
    }
    getMaxZoom() {
      return this._layer.getMaxZoom();
    }
    setMinResolution(minResolution) {
      if (!isDefined(minResolution)) {
        error_(this._createMessage("setMinResolution", commonMessage.paramsNotDefined("minResolution")));
      }
      if (!isNumber(minResolution)) {
        error_(this._createMessage("setMinResolution", commonMessage.paramsInvaildFormat("minResolution", "number类型")));
      }
      this._layer.setMinResolution(minResolution);
    }
    getMinResolution() {
      return this._layer.getMinResolution();
    }
    setMaxResolution(maxResolution) {
      if (!isDefined(maxResolution)) {
        error_(this._createMessage("setMaxResolution", commonMessage.paramsNotDefined("maxResolution")));
      }
      if (!isNumber(maxResolution)) {
        error_(this._createMessage("setMaxResolution", commonMessage.paramsInvaildFormat("maxResolution", "number类型")));
      }
      this._layer.setMaxResolution(maxResolution);
    }
    getMaxResolution() {
      return this._layer.getMaxResolution();
    }
    setZIndex(zIndex) {
      if (!isDefined(zIndex)) {
        error_(this._createMessage("setZIndex", commonMessage.paramsNotDefined("zIndex")));
      }
      if (!isNumber(zIndex)) {
        error_(this._createMessage("setZIndex", commonMessage.paramsInvaildFormat("zIndex", "number类型")));
      }
      this._layer.setZIndex(zIndex);
    }
    getZIndex() {
      return this._layer.getZIndex();
    }
    setProperties(properties, silent) {
      if (!isDefined(properties)) {
        error_(this._createMessage("setProperties", commonMessage.paramsNotDefined("properties")));
      }
      if (!isObject(properties)) {
        error_(this._createMessage("setProperties", commonMessage.paramsInvaildFormat("properties", "object类型")));
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
     * @param {Map | OMapLayerTarget} target 图层所属的对象
     */
    setTarget(target) {
      this.target = target;
    }
    /**
     * 获取图层当前的对象
     * @returns {Map | OMapLayerTarget | null} 图层所属的对象
     */
    getTarget() {
      return this.target;
    }
  }
  const PACKAGE_NAME$n = "Interaction";
  const createMessage$n = getPackageMessage(PACKAGE_NAME$n);
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
        warn_(createMessage$n("_initInteractionId", commonMessage.paramsNotDefined("id")));
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
        warn_(createMessage$n("setActive", commonMessage.paramsInvaildFormat("active", "boolean")));
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
  const OMapInteractionCommonEventTypes = [
    "change",
    "change:active",
    "error",
    "propertychange"
  ];
  function isVaildInteraction(value) {
    return value instanceof Interaction;
  }
  class Control {
    constructor(type) {
      __publicField(this, "id", null);
      /**
       * 交互类型
       * @type {OMapControlTypeType}
       */
      __publicField(this, "type");
      /**
       * 交互实例
       * @type {T}
       */
      __publicField(this, "_control");
      /**
       * 交互事件
       * @type {Event}
       */
      __publicField(this, "events", new Event());
      this.type = type;
    }
    /**
     * 获取控制实例
     */
    getControl() {
      return this._control;
    }
    /**
     * 获取控制ID
     * @returns {OMapControlIdType} 控制ID
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
  const PACKAGE_NAME$m = "Source";
  const createMessage$m = getPackageMessage(PACKAGE_NAME$m);
  class Source {
    constructor(source) {
      __publicField(this, "_source");
      if (!isDefined(source)) {
        error_(createMessage$m("constructor", "source不能为空"));
      }
      this._source = source;
    }
    /**
     * 获取原生 OpenLayers Source 实例
     */
    getSource() {
      return this._source;
    }
    /**
     * 子类初始化具体 Source 时使用
     */
    setSource(source) {
      if (!isDefined(source)) {
        error_(createMessage$m("setSource", "source不能为空"));
      }
      this._source = source;
    }
    changed() {
      this._source.changed();
    }
    dispatchEvent(event) {
      return this._source.dispatchEvent(event);
    }
    get(key) {
      if (!isString(key)) {
        warn_(createMessage$m("get", "key必须是字符串"));
        return void 0;
      }
      return this._source.get(key);
    }
    set(key, value, silent) {
      if (!isString(key)) {
        warn_(createMessage$m("set", "key必须是字符串"));
        return;
      }
      this._source.set(key, value, silent);
    }
    unset(key, silent) {
      if (!isString(key)) {
        warn_(createMessage$m("unset", "key必须是字符串"));
        return;
      }
      this._source.unset(key, silent);
    }
    getAttributions() {
      return this._source.getAttributions();
    }
    getAttributionsCollapsible() {
      return this._source.getAttributionsCollapsible();
    }
    getKeys() {
      return this._source.getKeys();
    }
    getProjection() {
      const projection = this._source.getProjection();
      return projection ? new Projection(projection.getCode()) : void 0;
    }
    getRevision() {
      return this._source.getRevision();
    }
    getState() {
      return this._source.getState();
    }
    getWrapX() {
      return this._source.getWrapX();
    }
    getInterpolate() {
      return this._source.getInterpolate();
    }
    getResolutions(projection) {
      return this._source.getResolutions(projection == null ? void 0 : projection.getProjection());
    }
    getView() {
      return this._source.getView();
    }
    getProperties() {
      return this._source.getProperties();
    }
    refresh() {
      this._source.refresh();
    }
    setAttributions(attributions) {
      this._source.setAttributions(attributions);
    }
    setState(state) {
      this._source.setState(state);
    }
    setProperties(properties, silent) {
      this._source.setProperties(properties, silent);
    }
    // on(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('on', 'type或listener参数格式有误'));
    //     }
    //     return this._source.on(type, listener);
    // }
    // once(type: string | string[], listener: ListenerFunction): EventsKey | EventsKey[] {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('once', 'type或listener参数格式有误'));
    //     }
    //     return this._source.once(type, listener);
    // }
    // un(type: string | string[], listener: ListenerFunction) {
    //     if ((!isString(type) && !Array.isArray(type)) || !isDefined(listener)) {
    //         error_(createMessage('un', 'type或listener参数格式有误'));
    //     }
    //     this._source.un(type, listener);
    // }
    // unByKey(key: EventsKey | EventsKey[]) {
    //     if (Array.isArray(key)) {
    //         key.forEach(item => OlEvent.unlistenByKey(item))
    //     } else {
    //         OlEvent.unlistenByKey(key)
    //     }
    // }
  }
  const VECTOR_SOURCE_EVENT_TYPES = {
    addFeature: "addfeature",
    changeFeature: "changefeature",
    clear: "clear",
    removeFeature: "removefeature",
    featuresLoadStart: "featuresloadstart",
    featuresLoadEnd: "featuresloadend",
    featuresLoadError: "featuresloaderror"
  };
  const DEFAULT_VECTOR_SOURCE_PARAMS = {
    features: [],
    overlaps: true,
    useSpatialIndex: true,
    wrapX: true
  };
  function handleGetVectorSourceParams(params = {}) {
    var _a;
    return {
      ...params,
      features: (_a = params.features) == null ? void 0 : _a.map((feature) => feature.getFeature())
    };
  }
  const PACKAGE_NAME$l = "VectorSource";
  const createMessage$l = getPackageMessage(PACKAGE_NAME$l);
  class VectorSource extends Source {
    constructor(params = {}) {
      var _a;
      const sourceParams = handleGetVectorSourceParams({
        ...DEFAULT_VECTOR_SOURCE_PARAMS,
        ...params
      });
      super(new OlSource__namespace.Vector(sourceParams));
      __publicField(this, "featureCache", /* @__PURE__ */ new Map());
      (_a = params.features) == null ? void 0 : _a.forEach((feature) => this.cacheFeature(feature));
    }
    addFeature(feature) {
      this.cacheFeature(feature);
      this._source.addFeature(this.getOlFeature(feature, "addFeature"));
    }
    addFeatures(features) {
      if (!Array.isArray(features)) {
        error_(createMessage$l("addFeatures", "features必须是Feature数组"));
      }
      features.forEach((feature) => this.cacheFeature(feature));
      this._source.addFeatures(features.map((feature) => this.getOlFeature(feature, "addFeatures")));
    }
    removeFeature(feature) {
      this._source.removeFeature(this.getOlFeature(feature, "removeFeature"));
      this.deleteFeatureCache(feature);
    }
    removeFeatures(features) {
      if (!Array.isArray(features)) {
        error_(createMessage$l("removeFeatures", "features必须是Feature数组"));
      }
      this._source.removeFeatures(features.map((feature) => this.getOlFeature(feature, "removeFeatures")));
      features.forEach((feature) => this.deleteFeatureCache(feature));
    }
    clear(fast) {
      this._source.clear(fast);
      this.featureCache.clear();
    }
    forEachFeature(callback) {
      this.validateCallback(callback, "forEachFeature");
      return this._source.forEachFeature((feature) => {
        const omapFeature = this.createOMapFeature(feature);
        return omapFeature ? callback(omapFeature) : void 0;
      });
    }
    forEachFeatureInExtent(extent, callback) {
      this.validateCallback(callback, "forEachFeatureInExtent");
      return this._source.forEachFeatureInExtent(
        this.getOlExtent(extent, "forEachFeatureInExtent"),
        (feature) => {
          const omapFeature = this.createOMapFeature(feature);
          return omapFeature ? callback(omapFeature) : void 0;
        }
      );
    }
    forEachFeatureIntersectingExtent(extent, callback) {
      this.validateCallback(callback, "forEachFeatureIntersectingExtent");
      return this._source.forEachFeatureIntersectingExtent(
        this.getOlExtent(extent, "forEachFeatureIntersectingExtent"),
        (feature) => {
          const omapFeature = this.createOMapFeature(feature);
          return omapFeature ? callback(omapFeature) : void 0;
        }
      );
    }
    getFeatures() {
      return this._source.getFeatures().map((feature) => this.createOMapFeature(feature)).filter(isDefined);
    }
    getFeatureByOlFeature(feature) {
      return this.createOMapFeature(feature);
    }
    getFeaturesCollection() {
      return this._source.getFeaturesCollection();
    }
    getFeaturesAtCoordinate(coordinate2) {
      return this._source.getFeaturesAtCoordinate(this.getOlCoordinate(coordinate2, "getFeaturesAtCoordinate")).map((feature) => this.createOMapFeature(feature)).filter(isDefined);
    }
    getFeaturesInExtent(extent, projection) {
      return this._source.getFeaturesInExtent(
        this.getOlExtent(extent, "getFeaturesInExtent"),
        projection == null ? void 0 : projection.getProjection()
      ).map((feature) => this.createOMapFeature(feature)).filter(isDefined);
    }
    getClosestFeatureToCoordinate(coordinate2, filter) {
      const olFilter = filter ? (feature2) => {
        const omapFeature = this.createOMapFeature(feature2);
        return omapFeature ? filter(omapFeature) : false;
      } : void 0;
      const feature = this._source.getClosestFeatureToCoordinate(
        this.getOlCoordinate(coordinate2, "getClosestFeatureToCoordinate"),
        olFilter
      );
      return feature ? this.createOMapFeature(feature) : void 0;
    }
    getExtent(extent) {
      const targetExtent = isDefined(extent) ? this.getOlExtent(extent, "getExtent") : void 0;
      return new Extent(this._source.getExtent(targetExtent));
    }
    getFeatureById(id) {
      if (!isString(id) && !isNumber(id)) {
        error_(createMessage$l("getFeatureById", "id必须是字符串或数字"));
      }
      const feature = this._source.getFeatureById(id);
      return feature ? this.createOMapFeature(feature) : void 0;
    }
    getFormat() {
      return this._source.getFormat();
    }
    getOverlaps() {
      return this._source.getOverlaps();
    }
    getUrl() {
      return this._source.getUrl();
    }
    hasFeature(feature) {
      return this._source.hasFeature(this.getOlFeature(feature, "hasFeature"));
    }
    isEmpty() {
      return this._source.isEmpty();
    }
    loadFeatures(extent, resolution, projection) {
      if (!isNumber(resolution) || !(projection instanceof Projection)) {
        error_(createMessage$l("loadFeatures", "resolution或projection参数格式有误"));
      }
      this._source.loadFeatures(
        this.getOlExtent(extent, "loadFeatures"),
        resolution,
        projection.getProjection()
      );
    }
    removeLoadedExtent(extent) {
      this._source.removeLoadedExtent(this.getOlExtent(extent, "removeLoadedExtent"));
    }
    setLoader(loader) {
      if (!isFunction(loader)) {
        error_(createMessage$l("setLoader", "loader必须是函数"));
      }
      this._source.setLoader(loader);
    }
    setUrl(url) {
      if (!isString(url) && !isFunction(url)) {
        error_(createMessage$l("setUrl", "url必须是字符串或函数"));
      }
      this._source.setUrl(url);
    }
    setOverlaps(overlaps) {
      this._source.setOverlaps(overlaps);
    }
    onVector(type, listener) {
      if (!Object.values(VECTOR_SOURCE_EVENT_TYPES).includes(type) || !isFunction(listener)) {
        error_(createMessage$l("onVector", "type或listener参数格式有误"));
      }
      return this._source.on(type, listener);
    }
    onAddFeature(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.addFeature, listener);
    }
    onChangeFeature(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.changeFeature, listener);
    }
    onRemoveFeature(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.removeFeature, listener);
    }
    onClear(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.clear, listener);
    }
    onFeaturesLoadStart(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadStart, listener);
    }
    onFeaturesLoadEnd(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadEnd, listener);
    }
    onFeaturesLoadError(listener) {
      return this.onVector(VECTOR_SOURCE_EVENT_TYPES.featuresLoadError, listener);
    }
    createOMapFeature(feature) {
      const uid = OlUtil__namespace.getUid(feature);
      const cachedFeature = this.featureCache.get(uid);
      if (cachedFeature) {
        return cachedFeature;
      }
      const omapFeature = createBaseFeatureByOlFeature(feature);
      if (omapFeature) {
        this.cacheFeature(omapFeature);
      }
      return omapFeature || void 0;
    }
    getOlFeature(feature, methodName) {
      if (!isDefined(feature) || !isFunction(feature.getFeature)) {
        error_(createMessage$l(methodName, "feature参数格式有误"));
      }
      return feature.getFeature();
    }
    getOlExtent(extent, methodName) {
      const olExtent = handleGetExtentValue(extent);
      if (!isDefined(olExtent)) {
        error_(createMessage$l(methodName, "extent参数格式有误"));
      }
      return olExtent;
    }
    getOlCoordinate(coordinate2, methodName) {
      const olCoordinate = handleGetLnglatValue(coordinate2);
      if (!isDefined(olCoordinate)) {
        error_(createMessage$l(methodName, "coordinate参数格式有误"));
      }
      return olCoordinate;
    }
    validateCallback(callback, methodName) {
      if (!isFunction(callback)) {
        error_(createMessage$l(methodName, "callback必须是函数"));
      }
    }
    cacheFeature(feature) {
      this.featureCache.set(OlUtil__namespace.getUid(this.getOlFeature(feature, "cacheFeature")), feature);
    }
    deleteFeatureCache(feature) {
      this.featureCache.delete(OlUtil__namespace.getUid(this.getOlFeature(feature, "deleteFeatureCache")));
    }
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
  function isVaildDrawMode(mode) {
    return Object.values(DrawMode).includes(mode);
  }
  const OMAP_DRAW_DEFAULT_PARAMS = {
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
  const OMapInteractionDrawEventTypes = [...OMapInteractionCommonEventTypes, ...Object.values(DrawEventType)];
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
      targetFeature = layerFeatures.find((f) => {
        return OlUtil__namespace.getUid(f.getFeature()) === OlUtil__namespace.getUid(feature);
      }) || createBaseFeatureByOlFeature(feature);
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
  function isOMapMeasureMode(value) {
    return isString(value) && Object.values(MeasureMode).includes(value);
  }
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
  const OMapInteractionMeasureEventTypes = [
    ...OMapInteractionCommonEventTypes,
    ...Object.values(MeasureEventType)
  ];
  function isOMapInteractionMeasureEventType(value) {
    return isString(value) && OMapInteractionMeasureEventTypes.includes(value);
  }
  function getOlDrawType(mode) {
    return {
      type: mode === MeasureMode.Area ? DrawMode.Polygon : DrawMode.LineString
    };
  }
  function formatDistance(distance) {
    return `${(distance / 1e3).toFixed(2)} km`;
  }
  function formatArea(area) {
    return `${(area / 1e6).toFixed(2)} km²`;
  }
  function getMeasureUnit(mode) {
    return mode === MeasureMode.Area ? "km²" : "km";
  }
  function getGeometryPointCount(geometry) {
    var _a;
    if (geometry instanceof OlGeometry__namespace.LineString) {
      return geometry.getCoordinates().length;
    }
    if (geometry instanceof OlGeometry__namespace.Polygon) {
      return ((_a = geometry.getCoordinates()[0]) == null ? void 0 : _a.length) || 0;
    }
    return 0;
  }
  function createBox(className) {
    const div = document.createElement("div");
    div.className = className;
    div.style.padding = "2px 5px";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "#FFFFFF";
    div.style.color = "#000000";
    div.style.fontSize = "12px";
    div.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.25)";
    return div;
  }
  function createTooltipElement(text) {
    const div = createBox("omap-measure-tooltip");
    div.innerHTML = text;
    return div;
  }
  function createResultElement(label, value, helperText) {
    const div = createBox("omap-measure-result");
    div.innerHTML = `${label}：<span style="color: var(--omap-primary-color);margin: 0 5px;font-weight: bolder;">${value || "-"}</span>`;
    if (helperText) {
      const helper = document.createElement("p");
      helper.className = "omap-measure-helper";
      helper.style.margin = "2px 0 0";
      helper.innerHTML = helperText;
      div.appendChild(helper);
    }
    return div;
  }
  function createMarkerElement(text, onClose) {
    const div = document.createElement("div");
    div.className = "omap-measure-marker";
    div.style.padding = "2px 5px";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "#FFFFFF";
    div.style.color = "#000000";
    div.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.35)";
    const value = document.createElement("span");
    value.style.color = "var(--omap-primary-color)";
    value.style.margin = "0 5px";
    value.innerHTML = text;
    div.appendChild(value);
    if (onClose) {
      const close = document.createElement("span");
      close.title = "删除";
      close.innerHTML = "×";
      close.style.color = "#000000";
      close.style.cursor = "pointer";
      close.addEventListener("click", onClose);
      div.appendChild(close);
    }
    return div;
  }
  function createCloseElement(onClose) {
    const close = document.createElement("span");
    close.title = "删除";
    close.innerHTML = "×";
    close.style.color = "#000000";
    close.style.cursor = "pointer";
    close.style.marginLeft = "5px";
    close.addEventListener("click", onClose);
    return close;
  }
  const PACKAGE_NAME$k = "Measure";
  const createMessage$k = getPackageMessage(PACKAGE_NAME$k);
  class Measure extends Interaction {
    constructor(mode, params = {}) {
      if (!isDefined(mode)) {
        error_(createMessage$k("constructor", commonMessage.paramsNotDefined("mode")));
      }
      if (!isOMapMeasureMode(mode)) {
        error_(createMessage$k("constructor", commonMessage.paramsInvaildEnum(mode)));
      }
      super("Measure", { id: params.id });
      __publicField(this, "mode");
      __publicField(this, "result");
      __publicField(this, "tooltipPopup");
      __publicField(this, "resultPopup");
      __publicField(this, "markerPopups", []);
      __publicField(this, "drawFeature", null);
      __publicField(this, "geometryListener", null);
      __publicField(this, "pointerMoveListener", null);
      __publicField(this, "eventInitialized", false);
      this.mode = mode;
      this.result = {
        value: 0,
        unit: getMeasureUnit(mode)
      };
      this.layer = new VectorLayer({
        style: params.style || DEFAULT_STYLE
      });
      this._interaction = new OlInteraction__namespace.Draw({
        ...DRAW_DEFAULT_PARAMS,
        ...params,
        ...getOlDrawType(mode),
        source: this.layer.getSource(),
        features: void 0,
        style: void 0
      });
      this.tooltipPopup = this.createPopup("omap-measure-tooltip", createTooltipElement("单击地图开始测量"));
      this.resultPopup = this.createPopup("omap-measure-result", createTooltipElement(""));
      this.initInteractionEvent();
    }
    initMeasureEvent() {
      if (this.eventInitialized) {
        return;
      }
      this.eventInitialized = true;
      this._interaction.on("change:active", () => {
        if (this._interaction.getActive()) {
          this.onMeasureActive();
        } else {
          this.onMeasureInactive();
        }
      });
      this._interaction.on("drawstart", (event) => {
        this.events.emit(MeasureEventType.measureStart, {
          target: this,
          type: MeasureEventType.measureStart
        });
        this.onMeasureStart(event.feature);
      });
      this._interaction.on("drawend", (event) => {
        this.onMeasureEnd(event.feature);
      });
    }
    onMeasureActive() {
      this.result.value = 0;
      this.showTooltip("单击地图开始测量");
      this.bindPointerMove();
    }
    onMeasureInactive() {
      this.unbindPointerMove();
    }
    onMeasureStart(feature) {
      this.clearMeasurement();
      this.drawFeature = feature;
      this.bindGeometryChange(feature);
    }
    onMeasureEnd(feature) {
      this.drawFeature = feature;
      this.unbindPointerMove();
      this.unbindGeometryChange();
      this.hideTooltip();
      this.renderFinalResult();
      this.completeAfterDrawEnd();
    }
    completeAfterDrawEnd() {
      setTimeout(() => {
        if (this.getActive()) {
          this.setActive(false);
        }
        this.events.emit(MeasureEventType.measureEnd, {
          target: this,
          type: MeasureEventType.measureEnd
        });
      }, 0);
    }
    bindPointerMove() {
      if (!this.map || this.pointerMoveListener) {
        return;
      }
      this.pointerMoveListener = this.map.getMap().on("pointermove", (event) => {
        this.tooltipPopup.setPosition(event.coordinate);
      });
    }
    unbindPointerMove() {
      if (this.pointerMoveListener) {
        OlObservable__namespace.unByKey(this.pointerMoveListener);
        this.pointerMoveListener = null;
      }
    }
    bindGeometryChange(feature) {
      const geometry = feature.getGeometry();
      if (!geometry) {
        return;
      }
      this.geometryListener = geometry.on("change", (event) => {
        this.updateByGeometry(event.target);
      });
    }
    unbindGeometryChange() {
      if (this.geometryListener) {
        OlObservable__namespace.unByKey(this.geometryListener);
        this.geometryListener = null;
      }
    }
    updateByGeometry(geometry) {
      if (geometry instanceof OlGeometry__namespace.LineString) {
        this.updateDistance(geometry);
        return;
      }
      if (geometry instanceof OlGeometry__namespace.Polygon) {
        this.updateArea(geometry);
      }
    }
    updateDistance(geometry) {
      var _a;
      const value = ((_a = this.map) == null ? void 0 : _a.getLength(new LineString(new OlFeature({ geometry })))) || 0;
      this.result.value = value;
      const pointCount = getGeometryPointCount(geometry);
      const text = pointCount >= 2 ? formatDistance(value) : "单击地图开始测量";
      const helper = pointCount >= 2 ? "单击继续，双击结束测量" : void 0;
      this.tooltipPopup.setElement(createResultElement("总长", text, helper));
      this.renderDistanceMarkers(geometry);
    }
    updateArea(geometry) {
      var _a;
      const value = ((_a = this.map) == null ? void 0 : _a.getArea(new Polygon(new OlFeature({ geometry })))) || 0;
      this.result.value = value;
      if (getGeometryPointCount(geometry) < 4) {
        this.showTooltip("单击继续绘制");
        this.setPopupPosition(this.resultPopup);
        return;
      }
      this.setPopupPosition(this.tooltipPopup);
      this.setPopupElement(this.tooltipPopup);
      this.resultPopup.setElement(createResultElement("面积", formatArea(value), "单击继续，双击结束测量"));
      this.resultPopup.setPosition(geometry.getInteriorPoint().getCoordinates());
    }
    renderDistanceMarkers(geometry) {
      this.clearMarkerPopups();
      const coordinates = geometry.getCoordinates();
      coordinates.forEach((coordinate2, index) => {
        const text = index === 0 ? "起点" : formatDistance(this.getDistanceToIndex(coordinates, index));
        const popup = this.createPopup(
          `omap-measure-marker-${index}`,
          createMarkerElement(text, index === 0 ? void 0 : () => this.removeDistancePoint(index))
        );
        popup.setPosition(coordinate2);
        this.addPopup(popup);
        this.markerPopups.push(popup);
      });
    }
    renderFinalResult() {
      if (!this.drawFeature) {
        return;
      }
      const geometry = this.drawFeature.getGeometry();
      if (geometry instanceof OlGeometry__namespace.Polygon) {
        const element = createResultElement("面积", formatArea(this.result.value));
        element.style.display = "flex";
        element.style.alignItems = "center";
        element.appendChild(createCloseElement(() => this.clearMeasurement()));
        this.resultPopup.setElement(element);
        this.resultPopup.setPosition(geometry.getInteriorPoint().getCoordinates());
        return;
      }
      if (geometry instanceof OlGeometry__namespace.LineString) {
        this.renderDistanceMarkers(geometry);
      }
    }
    removeDistancePoint(index) {
      var _a;
      const geometry = (_a = this.drawFeature) == null ? void 0 : _a.getGeometry();
      if (!(geometry instanceof OlGeometry__namespace.LineString)) {
        return;
      }
      const coordinates = geometry.getCoordinates();
      coordinates.splice(index, 1);
      if (coordinates.length < 2) {
        this.unbindGeometryChange();
        this.clearMeasurement();
        geometry.setCoordinates(coordinates);
      } else {
        geometry.setCoordinates(coordinates);
        this.updateDistance(geometry);
      }
    }
    getDistanceToIndex(coordinates, index) {
      if (!this.map) {
        return 0;
      }
      return this.map.getLength(new LineString(coordinates.slice(0, index + 1)));
    }
    showTooltip(text) {
      this.tooltipPopup.setElement(createTooltipElement(text));
    }
    hideTooltip() {
      this.setPopupPosition(this.tooltipPopup);
      this.setPopupElement(this.tooltipPopup);
    }
    createPopup(id, element) {
      return new Popup({
        id,
        element,
        offset: new Pixel(0, -10)
      });
    }
    addPopup(popup) {
      if (this.map) {
        this.map.addPopup(popup);
      }
    }
    removePopup(popup) {
      if (this.map) {
        this.map.removePopup(popup);
        this.map.getMap().removeOverlay(popup.getPopup());
      }
    }
    clearMarkerPopups() {
      this.markerPopups.forEach((popup) => this.removePopup(popup));
      this.markerPopups = [];
    }
    clearMeasurement(clearLayer = true) {
      var _a;
      this.clearMarkerPopups();
      this.setPopupPosition(this.resultPopup);
      this.setPopupElement(this.resultPopup);
      if (clearLayer) {
        (_a = this.layer) == null ? void 0 : _a.clear();
        this.drawFeature = null;
        this.result.value = 0;
      }
    }
    setPopupPosition(popup, coordinate2) {
      popup.getPopup().setPosition(coordinate2);
    }
    setPopupElement(popup, element) {
      popup.getPopup().setElement(element);
    }
    cancel() {
      this._interaction.abortDrawing();
    }
    revoke() {
      this._interaction.removeLastPoint();
    }
    finish() {
      this._interaction.finishDrawing();
    }
    setMap(map) {
      if (!map) {
        this.unbindPointerMove();
        this.unbindGeometryChange();
        this.clearMeasurement(false);
        this.removePopup(this.tooltipPopup);
        this.removePopup(this.resultPopup);
        super.setMap(null);
        return;
      }
      super.setMap(map);
      this.initMeasureEvent();
      this.addPopup(this.tooltipPopup);
      this.addPopup(this.resultPopup);
    }
    on(type, callback) {
      this.validateEvent(type, callback, "on");
      return this.events.on(type, callback);
    }
    once(type, callback) {
      this.validateEvent(type, callback, "once");
      return this.events.once(type, callback);
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$k("un", commonMessage.paramsNotDefined("id")));
      }
      this.events.remove(id);
    }
    validateEvent(type, callback, methodName) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$k(methodName, commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionMeasureEventType(type)) {
        error_(createMessage$k(methodName, commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$k(methodName, commonMessage.paramsInvaildFormat("callback", "function")));
      }
    }
    destroy() {
      if (this.map) {
        super.destroy();
        return;
      }
      this.unbindPointerMove();
      this.unbindGeometryChange();
      this.clearMeasurement(false);
    }
  }
  let PACKAGE_NAME$j = "VectorLayer";
  let createMessage$j = getPackageMessage(PACKAGE_NAME$j);
  class VectorLayer extends BaseLayer {
    constructor(options = {}) {
      super("Vector", options);
      __publicField(this, "vectorSource");
      __publicField(this, "features", []);
      __publicField(this, "style");
      let _sourceOptions = isDefined(options.source) ? options.source : {};
      this.vectorSource = new VectorSource(_sourceOptions);
      this.features = _sourceOptions.features ? [..._sourceOptions.features] : [];
      this._layer = new OlLayer__namespace.Vector({
        source: this.vectorSource.getSource()
      });
      this.initStyle(options.style);
      this._initLayerEvent();
      this.initVectorLyaerEvent();
    }
    getVectorSource() {
      return this.vectorSource;
    }
    /**
     * 初始化矢量图层事件
     */
    initVectorLyaerEvent() {
      this._layer.getSource().on("addfeature", (e) => {
        const { feature } = e;
        if (isDefined(feature)) {
          if (this.target instanceof Draw || this.target instanceof Measure) {
            const basicFeature = this.syncFeatureFromOlFeature(feature);
            if (!basicFeature) {
              warn_(createMessage$j("syncFeatureFromOlFeature", "根据olFeature同步BasicFeature出错"));
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
            const omapFeature = feature instanceof OlFeature ? this.syncFeatureFromOlFeature(feature) : void 0;
            let styleFnResult = style(omapFeature || null, resolution);
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
      this.syncFeaturesFromSource();
      return this.features;
    }
    getFeatureById(id) {
      if (!isDefined(id)) {
        warn_(createMessage$j("setId", "参数id不能为空"));
        return;
      }
      if (!isNumber(id) && !isString(id)) {
        warn_(createMessage$j("setId", "参数id格式有误"));
        return;
      }
      return this.vectorSource.getFeatureById(id);
    }
    getFeaturesInExtent(extent, projection) {
      if (!isDefined(extent)) {
        warn_(createMessage$j("getFeaturesInExtent", "extent参数不能为空"));
        return;
      }
      if (!(extent instanceof Extent) && !isExtentType(extent)) {
        warn_(createMessage$j("getFeaturesInExtent", "extent参数格式有误"));
        return;
      }
      return this.vectorSource.getFeaturesInExtent(extent, projection);
    }
    getFeaturesAtCoordinate(coordinates) {
      if (!isDefined(coordinates)) {
        warn_(createMessage$j("getFeaturesAtCoordinate", "coordinates参数不能为空"));
        return;
      }
      if (!(coordinates instanceof Lnglat) && !isCoordinatesType(coordinates)) {
        warn_(createMessage$j("getFeaturesAtCoordinate", "coordinates参数格式有误"));
        return;
      }
      return this.vectorSource.getFeaturesAtCoordinate(coordinates);
    }
    addFeature(feature) {
      if (!isDefined(feature)) {
        warn_(createMessage$j("addFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        const uid = OlUtil__namespace.getUid(feature.getFeature());
        const index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
        if (!this.vectorSource.hasFeature(feature)) {
          this.vectorSource.addFeature(feature);
        }
        if (index === -1) {
          this.features.push(feature);
        }
      }
    }
    addFeatures(features) {
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
      if (!isDefined(feature)) {
        warn_(createMessage$j("removeFeature", "参数不能为空"));
        return;
      }
      if (this._layer.getSource()) {
        let index = this.features.indexOf(feature);
        this.vectorSource.removeFeature(feature);
        if (index !== -1) {
          this.features.splice(index, 1);
        }
      }
    }
    removeFeatures(features) {
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
      if (!this._layer.getSource()) {
        return;
      }
      this.vectorSource.clear();
      this.features = [];
    }
    forEachFeature(callback) {
      if (!isDefined(callback) || !isFunction(callback)) {
        warn_(createMessage$j("forEachFeature", "参数格式有误"));
        return;
      }
      this.getFeatures().forEach((f, i) => {
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
      return this.vectorSource.getExtent();
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
      this._layer.setDeclutter(declutter);
    }
    syncFeatureFromOlFeature(feature) {
      const basicFeature = this.vectorSource.getFeatureByOlFeature(feature);
      if (!basicFeature) return void 0;
      const uid = OlUtil__namespace.getUid(basicFeature.getFeature());
      const index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
      if (index === -1) {
        this.features.push(basicFeature);
      } else {
        this.features[index] = basicFeature;
      }
      return basicFeature;
    }
    removeFeatureByOlFeature(feature) {
      const uid = OlUtil__namespace.getUid(feature);
      const index = this.features.findIndex((f) => OlUtil__namespace.getUid(f.getFeature()) === uid);
      if (index !== -1) {
        this.features.splice(index, 1);
      }
    }
    syncFeaturesFromSource() {
      this.features = this.vectorSource.getFeatures();
    }
  }
  const PACKAGE_NAME$i = "Draw";
  const createMessage$i = getPackageMessage(PACKAGE_NAME$i);
  class Draw extends Interaction {
    constructor(mode, params) {
      if (!isDefined(mode)) {
        error_(createMessage$i("constructor", commonMessage.paramsNotDefined("mode")));
      }
      if (!isVaildDrawMode(mode)) {
        error_(createMessage$i("constructor", commonMessage.paramsInvaildFormat("mode")));
      }
      let _params = defaultValue(params, {});
      const { id, active, layer, style, ...drawOptions } = _params;
      super("Draw", { id });
      let draw_source = null;
      if (isDefined(layer)) {
        if (layer instanceof VectorLayer) {
          this.layer = layer;
          draw_source = layer.getSource();
        } else {
          warn_(createMessage$i("init", commonMessage.paramsInvaildFormat("layer", "VectorLayer")));
        }
      }
      if (!isDefined(draw_source)) {
        this.layer = new VectorLayer({
          style: style || DEFAULT_STYLE
        });
        draw_source = this.layer.getSource();
      }
      let drawParams = Object.assign({}, OMAP_DRAW_DEFAULT_PARAMS, {
        ...drawOptions,
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
    /**
     * 追加坐标
     * @param coordinates 坐标
     */
    appendCoordinates(coordinates) {
      if (!isDefined(coordinates)) {
        error_(createMessage$i("appendCoordinates", commonMessage.paramsNotDefined("coordinates")));
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
      let layer = this.getLayer();
      if (!isDefined(layer)) {
        return [];
      }
      return defaultValue(layer.getFeatures(), []);
    }
    on(type, callback) {
      this.validateEvent(type, callback, "on");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        if (type !== DrawEventType.drawEnd) {
          this.events.emit(type, handleInteractionDrawEvent(this, type, e));
        }
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      this.validateEvent(type, callback, "once");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        if (type !== DrawEventType.drawEnd) {
          this.events.emit(type, handleInteractionDrawEvent(this, type, e));
        }
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    validateEvent(type, callback, methodName) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$i(methodName, commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionDrawEventType(type)) {
        error_(createMessage$i(methodName, commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$i(methodName, commonMessage.paramsInvaildFormat("callback", "function")));
      }
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$i("un", commonMessage.paramsNotDefined(id)));
      }
      this.events.remove(id);
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
        item.groupId = this.id;
      });
      this.layers = vaildLayers;
      vaildLayers.forEach((item) => {
        item.groupId = this.id;
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
      layer.groupId = this.id;
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
      layer.groupId = null;
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
      layer.groupId = null;
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
  const OMapInteractionMouseWheelZoomEventTypes = [
    ...OMapInteractionCommonEventTypes
  ];
  function isOMapInteractionMouseWheelZoomEventType(value) {
    return isString(value) && OMapInteractionMouseWheelZoomEventTypes.includes(value);
  }
  function handleInteractionMouseWheelZoomEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME$g = "MouseWheelZoom";
  const createMessage$g = getPackageMessage(PACKAGE_NAME$g);
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
      this._interaction = new OlInteraction__namespace.MouseWheelZoom(
        Object.assign(
          OMAP_INTERACTION_DEFAULT_PARAMS,
          defaultMouseWheelZoomOptions,
          defaultValue(params, {})
        )
      );
      this.initInteractionEvent();
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$g("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionMouseWheelZoomEventType(type)) {
        error_(createMessage$g("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$g(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionMouseWheelZoomEvent(this, type, e)
        );
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$g("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionMouseWheelZoomEventType(type)) {
        error_(createMessage$g("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$g(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionMouseWheelZoomEvent(this, type, e)
        );
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$g("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$g(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionDoubleClickZoomEventTypes = [
    ...OMapInteractionCommonEventTypes
  ];
  function isOMapInteractionDoubleClickZoomEventType(value) {
    return isString(value) && OMapInteractionDoubleClickZoomEventTypes.includes(value);
  }
  function handleInteractionDoubleClickZoomEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME$f = "DoubleClickZoom";
  const createMessage$f = getPackageMessage(PACKAGE_NAME$f);
  const defaultDoubleClickZoomOptions = {
    duration: 250,
    delta: 1
  };
  class DoubleClickZoom extends Interaction {
    constructor(params) {
      super("DoubleClickZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.DoubleClickZoom(
        Object.assign(
          OMAP_INTERACTION_DEFAULT_PARAMS,
          defaultDoubleClickZoomOptions,
          defaultValue(params, {})
        )
      );
      this.initInteractionEvent();
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$f("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDoubleClickZoomEventType(type)) {
        error_(createMessage$f("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$f(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionDoubleClickZoomEvent(this, type, e)
        );
      });
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
      if (!isOMapInteractionDoubleClickZoomEventType(type)) {
        error_(createMessage$f("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$f(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionDoubleClickZoomEvent(this, type, e)
        );
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$f("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$f(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionDragPanEventTypes = [
    ...OMapInteractionCommonEventTypes
  ];
  function isOMapInteractionDragPanEventType(value) {
    return isString(value) && OMapInteractionDragPanEventTypes.includes(value);
  }
  function handleInteractionDragPanEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME$e = "DragPan";
  const createMessage$e = getPackageMessage(PACKAGE_NAME$e);
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
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$e("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragPanEventType(type)) {
        error_(createMessage$e("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$e(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionDragPanEvent(this, type, e)
        );
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$e("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragPanEventType(type)) {
        error_(createMessage$e("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$e(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(
          type,
          handleInteractionDragPanEvent(this, type, e)
        );
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$e("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$e(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
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
  const PACKAGE_NAME$d = "Map";
  const createMessage$d = getPackageMessage(PACKAGE_NAME$d);
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
          createMessage$d("constructor", commonMessage.paramsNotDefined("element"))
        );
      }
      let _options = defaultValue(options, {});
      const view_options = _options.view;
      if (!isDefined(view_options)) {
        error_(
          createMessage$d("constructor", commonMessage.paramsNotDefined("view"))
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
        error_(createMessage$d("setSize", commonMessage.paramsNotDefined("size")));
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
          createMessage$d("setCenter", commonMessage.paramsNotDefined("center"))
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
        error_(createMessage$d("setZoom", commonMessage.paramsNotDefined("zoom")));
      }
      if (!isNumber(zoom)) {
        error_(
          createMessage$d("setZoom", commonMessage.paramsInvaildFormat("zoom"))
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
          createMessage$d(
            "setResolution",
            commonMessage.paramsNotDefined("resolution")
          )
        );
      }
      if (!isNumber(resolution)) {
        error_(
          createMessage$d(
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
          createMessage$d(
            "setRotation",
            commonMessage.paramsNotDefined("rotation")
          )
        );
      }
      if (!isNumber(rotation)) {
        error_(
          createMessage$d(
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
          createMessage$d(
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
          createMessage$d(
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
          createMessage$d("addLayer", commonMessage.paramsInvaildFormat("layer"))
        );
      }
      let isExist = false;
      const layerId = layer.getId();
      isExist = isDefined(layerId) ? isDefined(this.getLayerById(layerId)) : this.layers.some((item) => {
        return OlUtil__namespace.getUid(item.getLayer()) === OlUtil__namespace.getUid(layer.getLayer());
      });
      if (isExist) {
        warn_(createMessage$d("addLayer", "图层已存在"));
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
          createMessage$d("addLayers", commonMessage.paramsNotDefined("layers"))
        );
      }
      if (!isArray(layers)) {
        error_(
          createMessage$d(
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
            createMessage$d(
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
          createMessage$d("removeLayer", commonMessage.paramsNotDefined("layer"))
        );
      }
      if (!(layer instanceof BaseLayer)) {
        error_(
          createMessage$d(
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
        warn_(createMessage$d("removeLayer", "图层不存在"));
      }
    }
    /**
     * 移除多个图层
     * @param {Array<BaseLayer>} layers 图层数组
     */
    removeLayers(layers) {
      if (!isDefined(layers)) {
        error_(
          createMessage$d("removeLayers", commonMessage.paramsNotDefined("layers"))
        );
      }
      if (!isArray(layers)) {
        error_(
          createMessage$d(
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
            createMessage$d(
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
          createMessage$d(
            "removeLayerById",
            commonMessage.paramsNotDefined("layerId")
          )
        );
      }
      let layer = this.getLayerById(layerId);
      if (!isDefined(layer)) {
        warn_(createMessage$d("removeLayerById", `找不到id为${layerId}的图层`));
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
          createMessage$d(
            "addLayerGroup",
            commonMessage.paramsNotDefined("layerGroup")
          )
        );
      }
      if (!isVaildLayerGroup(group)) {
        error_(
          createMessage$d(
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
          createMessage$d(
            "removeLayerGroup",
            commonMessage.paramsNotDefined("layerGroup")
          )
        );
      }
      if (!isVaildLayerGroup(group)) {
        error_(
          createMessage$d(
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
        this.layerGroups.splice(index, 1);
      } else {
        warn_(createMessage$d("removeLayerGroup", "图层组不存在"));
      }
    }
    /**
     * 移除图层组
     * @param {LayerGroupIdType} groupId 图层组id
     */
    removeLayerGroupById(groupId) {
      if (!isDefined(groupId)) {
        error_(
          createMessage$d(
            "removeLayerGroupById",
            commonMessage.paramsNotDefined("groupId")
          )
        );
      }
      if (!isVaildGroupId(groupId)) {
        error_(
          createMessage$d(
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
        this.layerGroups.splice(index, 1);
      } else {
        warn_(createMessage$d("removeLayerGroupById", "图层组不存在"));
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
          createMessage$d(
            "removeLayerGroupById",
            commonMessage.paramsNotDefined("groupId")
          )
        );
      }
      if (!isVaildGroupId(groupId)) {
        error_(
          createMessage$d(
            "removeLayerGroupById",
            commonMessage.paramsInvaildFormat("groupId", "number或string类型")
          )
        );
      }
      let index = this.layerGroups.findIndex((item) => {
        return isDefined(item.getId()) && item.getId() === groupId;
      });
      if (index === -1) {
        warn_(createMessage$d("getLayerGroupById", "未找到图层组"));
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
          createMessage$d("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapMapEventType(type)) {
        error_(createMessage$d("on", commonMessage.paramsInvaildEnum("type")));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$d(
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
          createMessage$d(
            "once",
            commonMessage.paramsNotDefined("type or callback")
          )
        );
      }
      if (!isOMapMapEventType(type)) {
        error_(createMessage$d("once", commonMessage.paramsInvaildEnum("type")));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$d(
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
        error_(createMessage$d("un", commonMessage.paramsNotDefined("id")));
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
          createMessage$d(
            "setProperties",
            commonMessage.paramsNotDefined("properties")
          )
        );
      }
      if (!isObject(properties)) {
        error_(
          createMessage$d(
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
          createMessage$d(
            "addInteraction",
            commonMessage.paramsNotDefined("interaction")
          )
        );
      }
      if (!isVaildInteraction(interaction)) {
        error_(
          createMessage$d(
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
        warn_(createMessage$d("addInteraction", "该交互已添加到地图中"));
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
          createMessage$d(
            "addInteraction",
            commonMessage.paramsNotDefined("interaction")
          )
        );
      }
      if (!isVaildInteraction(interaction)) {
        error_(
          createMessage$d(
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
        warn_(createMessage$d("removeInteraction", "该交互未添加到地图中"));
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
          createMessage$d("addControl", commonMessage.paramsNotDefined("control"))
        );
      }
      if (!isVaildControl(control)) {
        error_(
          createMessage$d(
            "addControl",
            commonMessage.paramsInvaildFormat("control", "Control类型")
          )
        );
      }
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index !== -1) {
        warn_(createMessage$d("addControl", "该控件已添加到地图中"));
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
          createMessage$d("getControlById", commonMessage.paramsNotDefined("id"))
        );
      }
      if (!isNumber(id) && !isString(id)) {
        error_(
          createMessage$d(
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
          createMessage$d("addControl", commonMessage.paramsNotDefined("control"))
        );
      }
      if (!isVaildControl(control)) {
        error_(
          createMessage$d(
            "addControl",
            commonMessage.paramsInvaildFormat("control", "Control类型")
          )
        );
      }
      let index = this.controls.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getControl()) === OlUtil__namespace.getUid(control.getControl());
      });
      if (index === -1) {
        warn_(createMessage$d("removeControl", "该控件未添加到地图中"));
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
          createMessage$d("addPopup", commonMessage.paramsNotDefined("popup"))
        );
      }
      if (!isVaildPopup(popup)) {
        error_(
          createMessage$d(
            "addPopup",
            commonMessage.paramsInvaildFormat("popup", "Popup类型")
          )
        );
      }
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index !== -1) {
        warn_(createMessage$d("addPopup", "该弹窗已添加到地图中"));
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
          createMessage$d("getPopupById", commonMessage.paramsNotDefined("id"))
        );
      }
      if (!isVaildPopupId(id)) {
        error_(
          createMessage$d(
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
          createMessage$d("getPopupById", commonMessage.paramsNotDefined("filter"))
        );
      }
      if (!isFunction(filter)) {
        error_(
          createMessage$d(
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
          createMessage$d("addPopup", commonMessage.paramsNotDefined("popup"))
        );
      }
      if (!isVaildPopup(popup)) {
        error_(
          createMessage$d(
            "addPopup",
            commonMessage.paramsInvaildFormat("popup", "Popup类型")
          )
        );
      }
      let index = this.popups.findIndex((i) => {
        return OlUtil__namespace.getUid(i.getPopup()) === OlUtil__namespace.getUid(popup.getPopup());
      });
      if (index == -1) {
        warn_(createMessage$d("removePopup", "该弹窗未添加到地图中"));
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
          createMessage$d(
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
          createMessage$d(
            "getCoordinateFromPixel",
            commonMessage.paramsNotDefined("pixel")
          )
        );
      }
      if (!isValidPixel(pixel)) {
        error_(
          createMessage$d(
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
          createMessage$d(
            "getPixelFromCoordinate",
            commonMessage.paramsNotDefined("coordinate")
          )
        );
      }
      if (!isValidCoordinate(coordinate2)) {
        error_(
          createMessage$d(
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
          createMessage$d(
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
          createMessage$d(
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
          createMessage$d("fit", commonMessage.paramsNotDefined("featureOrExtent"))
        );
      }
      if (!(featureOrExtent instanceof BasicFeature) && !isValidExtent(featureOrExtent)) {
        error_(
          createMessage$d(
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
          createMessage$d(
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
  const DEFAULT_TILE_LAYER_PARAMS = {
    preload: 0,
    useInterimTilesOnError: true,
    cacheSize: 512
  };
  function handleGetBaseLayerParams(params) {
    let _params = {
      ...params,
      extent: isDefined(params.extent) ? handleGetExtentValue(params.extent) : void 0,
      background: isDefined(params.background) ? handleGetColorValue(params.background) : void 0,
      map: isDefined(params.map) ? params.map.getMap() : void 0
    };
    delete _params.id;
    delete _params.name;
    return _params;
  }
  class TileLayer extends BaseLayer {
    constructor(options) {
      super("Tile", options);
      let params = Object.assign({}, DEFAULT_TILE_LAYER_PARAMS, handleGetBaseLayerParams(options));
      this._layer = new OlLayer__namespace.Tile(params);
      this._initLayerEvent();
    }
  }
  function handleGetProjectionValue(projection) {
    if (isDefined(projection)) {
      return projection instanceof Projection ? projection.getProjection() : projection;
    }
    return void 0;
  }
  const TILE_SOURCE_EVENT_TYPES = {
    tileLoadStart: "tileloadstart",
    tileLoadEnd: "tileloadend",
    tileLoadError: "tileloaderror"
  };
  const DEFAULT_TILE_SOURCE_PARAMS = {
    attributionsCollapsible: true,
    interpolate: false,
    wrapX: false,
    zDirection: 0
  };
  function handleGetTileGridParams(params) {
    var _a, _b, _c;
    return {
      ...params,
      extent: params.extent ? handleGetExtentValue(params.extent) : void 0,
      origin: params.origin ? handleGetLnglatValue(params.origin) : void 0,
      origins: (_a = params.origins) == null ? void 0 : _a.map((item) => handleGetLnglatValue(item)),
      sizes: (_b = params.sizes) == null ? void 0 : _b.map((item) => handleGetSizeValue(item)),
      tileSize: typeof params.tileSize === "number" ? params.tileSize : params.tileSize ? handleGetSizeValue(params.tileSize) : void 0,
      tileSizes: (_c = params.tileSizes) == null ? void 0 : _c.map((item) => typeof item === "number" ? item : handleGetSizeValue(item))
    };
  }
  function handleGetTileGrid(tileGrid) {
    if (!tileGrid) {
      return void 0;
    }
    if (tileGrid instanceof OlTileGrid__namespace.TileGrid) {
      return tileGrid;
    }
    return new OlTileGrid__namespace.TileGrid(handleGetTileGridParams(tileGrid));
  }
  function handleGetTileSourceParams(params = {}) {
    return {
      ...params,
      projection: handleGetProjectionValue(params.projection),
      tileGrid: handleGetTileGrid(params.tileGrid)
    };
  }
  const PACKAGE_NAME$c = "TileSource";
  const createMessage$c = getPackageMessage(PACKAGE_NAME$c);
  class TileSource extends Source {
    constructor(source) {
      super(source);
      __publicField(this, "_tileGrid");
      this._tileGrid = source.getTileGrid() || void 0;
    }
    clear() {
      this._source.clear();
    }
    getGutterForProjection(projection) {
      if (!(projection instanceof Projection)) {
        error_(createMessage$c("getGutterForProjection", "projection参数格式有误"));
      }
      return this._source.getGutterForProjection(projection.getProjection());
    }
    getKey() {
      return this._source.getKey();
    }
    getTile(z, x, y, pixelRatio, projection) {
      if (!isNumber(z) || !isNumber(x) || !isNumber(y) || !isNumber(pixelRatio) || !(projection instanceof Projection)) {
        error_(createMessage$c("getTile", "z、x、y、pixelRatio或projection参数格式有误"));
      }
      return this._source.getTile(z, x, y, pixelRatio, projection.getProjection());
    }
    getTileGrid() {
      return this._source.getTileGrid();
    }
    getTileGridForProjection(projection) {
      if (!(projection instanceof Projection)) {
        error_(createMessage$c("getTileGridForProjection", "projection参数格式有误"));
      }
      return this._source.getTileGridForProjection(projection.getProjection());
    }
    getTilePixelRatio(pixelRatio) {
      if (!isNumber(pixelRatio)) {
        error_(createMessage$c("getTilePixelRatio", "pixelRatio必须是数字"));
      }
      return this._source.getTilePixelRatio(pixelRatio);
    }
    getTilePixelSize(z, pixelRatio, projection) {
      if (!isNumber(z) || !isNumber(pixelRatio) || !(projection instanceof Projection)) {
        error_(createMessage$c("getTilePixelSize", "z、pixelRatio或projection参数格式有误"));
      }
      return this._source.getTilePixelSize(z, pixelRatio, projection.getProjection());
    }
    getTileCoordForTileUrlFunction(tileCoord, projection) {
      if (!this.isTileCoord(tileCoord)) {
        error_(createMessage$c("getTileCoordForTileUrlFunction", "tileCoord参数格式有误"));
      }
      if (isDefined(projection) && !(projection instanceof Projection)) {
        error_(createMessage$c("getTileCoordForTileUrlFunction", "projection参数格式有误"));
      }
      return this._source.getTileCoordForTileUrlFunction(tileCoord, projection == null ? void 0 : projection.getProjection());
    }
    onTile(type, listener) {
      if (!Object.values(TILE_SOURCE_EVENT_TYPES).includes(type) || !isFunction(listener)) {
        error_(createMessage$c("onTile", "type或listener参数格式有误"));
      }
      return this._source.on(type, listener);
    }
    onTileLoadStart(listener) {
      return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadStart, listener);
    }
    onTileLoadEnd(listener) {
      return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadEnd, listener);
    }
    onTileLoadError(listener) {
      return this.onTile(TILE_SOURCE_EVENT_TYPES.tileLoadError, listener);
    }
    isTileCoord(tileCoord) {
      return Array.isArray(tileCoord) && tileCoord.length === 3 && tileCoord.every((item) => isNumber(item));
    }
  }
  const DEFAULT_XYZ_SOURCE_PARAMS = {
    ...DEFAULT_TILE_SOURCE_PARAMS,
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
  function handleGetXYZSourceParams(params = {}) {
    return {
      ...handleGetTileSourceParams(params),
      tileSize: typeof params.tileSize === "number" ? params.tileSize : params.tileSize ? handleGetSizeValue(params.tileSize) : void 0
    };
  }
  class XYZSource extends TileSource {
    constructor(params = {}) {
      super(new OlSource__namespace.XYZ(handleGetXYZSourceParams({
        ...DEFAULT_XYZ_SOURCE_PARAMS,
        ...params
      })));
    }
  }
  const GaodeLayerType = {
    Vec: "vec",
    Img: "img",
    Road: "road"
  };
  function isValidGaodeLayerType(type) {
    return Object.values(GaodeLayerType).includes(type);
  }
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
    if (!isDefined(type)) return [];
    return GaodeLayerTypeUrls[type];
  }
  let PACKAGE_NAME$b = "GaodeLayer";
  let createMessage$b = getPackageMessage(PACKAGE_NAME$b);
  class GaodeLayer extends TileLayer {
    constructor(type, options) {
      if (!isValidGaodeLayerType(type)) {
        error_(
          createMessage$b("constructor", commonMessage.paramsInvaildEnum("type"))
        );
      }
      const urls = getGaodeLayerUrlsByType(type);
      const xyzSourceParams = Object.assign(
        {},
        DEFAULT_XYZ_SOURCE_PARAMS,
        options,
        {
          urls
        }
      );
      const xyzSource = new XYZSource(xyzSourceParams);
      const gaodeParams = Object.assign({}, options, {
        source: xyzSource.getSource()
      });
      super(gaodeParams);
      /**
       * 图层类型
       */
      __publicField(this, "gaodeType");
      this.gaodeType = type;
      this._initLayerEvent();
    }
  }
  const PACKAGE_NAME$a = "ProjUtil";
  const createMessage$a = getPackageMessage(PACKAGE_NAME$a);
  class ProjUtil {
    static fromLonLat(coordinate2, projection) {
      if (!isDefined(coordinate2)) {
        warn_(createMessage$a("fromLonLat", "coordinate参数不能为空"));
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
        warn_(createMessage$a("toLonLat", "coordinate参数不能为空"));
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
  function readFeature$2(format, source, options) {
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures$2(format, source, options) {
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeature$1(format, feature, options) {
    const source = format.writeFeature(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatureObject(format, feature, options) {
    const source = format.writeFeatureObject(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatures$2(format, features, options) {
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeaturesObject(format, features, options) {
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
  function readFeature$1(format, source, options) {
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures$1(format, source, options) {
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeature(format, feature, options) {
    const source = format.writeFeature(feature.getFeature(), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeatures$1(format, features, options) {
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  const WKT = {
    readFeature: readFeature$1,
    readFeatures: readFeatures$1,
    writeFeature,
    writeFeatures: writeFeatures$1
  };
  function readFeature(format, source, options) {
    const feature = format.readFeature(source, defaultValue(options, {}));
    const _feature = createBaseFeatureByOlFeature(feature);
    return _feature;
  }
  function readFeatures(format, source, options) {
    const features = format.readFeatures(source, defaultValue(options, {}));
    const _features = features.map((feature) => {
      return createBaseFeatureByOlFeature(feature);
    });
    return _features;
  }
  function writeFeatures(format, features, options) {
    const source = format.writeFeatures(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  function writeFeaturesNode(format, features, options) {
    const source = format.writeFeaturesNode(features.map((feature) => feature.getFeature()), Object.assign({}, DEFAULT_FORMAT_WRITE_FEATURE_OPTIONS, defaultValue(options, {})));
    return source;
  }
  const KML = {
    readFeature,
    readFeatures,
    writeFeatures,
    writeFeaturesNode
  };
  function getMoudule(type) {
    let module2 = null;
    switch (type) {
      case OMapFormatType.GeoJSON:
        module2 = GeoJSON;
        break;
      case OMapFormatType.WKT:
        module2 = WKT;
        break;
      case OMapFormatType.KML:
        module2 = KML;
        break;
    }
    return module2;
  }
  function handle(format, type, key, ...args) {
    const module2 = getMoudule(type);
    if (isDefined(module2) && isDefined(module2[key])) {
      return module2[key](format, ...args);
    } else {
      error_(createMessage$9(key, `当前格式化工具不支持${key}方法`));
      return void 0;
    }
  }
  function handleReadFeature(format, type, source, options) {
    return handle(format, type, "readFeature", source, options);
  }
  function handleReadFeatures(format, type, source, options) {
    return handle(format, type, "readFeatures", source, options);
  }
  function handleWriteFeature(format, type, feature, options) {
    return handle(format, type, "writeFeature", feature, options);
  }
  function handleWriteFeatureObject(format, type, feature, options) {
    return handle(format, type, "writeFeatureObject", feature, options);
  }
  function handleWriteFeatures(format, type, features, options) {
    return handle(format, type, "writeFeatures", features, options);
  }
  function handleWriteFeaturesObject(format, type, features, options) {
    return handle(format, type, "writeFeaturesObject", features, options);
  }
  function handleWriteFeaturesNode(format, type, features, options) {
    return handle(format, type, "writeFeaturesNode", features, options);
  }
  const PACKAGE_NAME$9 = "Format";
  const createMessage$9 = getPackageMessage(PACKAGE_NAME$9);
  class Format {
    constructor(type, options) {
      __publicField(this, "type");
      __publicField(this, "options");
      __publicField(this, "_format");
      if (!isDefined(type)) {
        error_(createMessage$9("constructor", "初始化参数有误"));
        return;
      }
      if (!isVaildFormatType(type)) {
        error_(createMessage$9("constructor", "初始化参数有误"));
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
    }
    readFeature(source, options) {
      return handleReadFeature(this._format, this.type, source, options);
    }
    readFeatures(source, options) {
      return handleReadFeatures(this._format, this.type, source, options);
    }
    writeFeature(feature, options) {
      return handleWriteFeature(this._format, this.type, feature, options);
    }
    writeFeatureObject(feature, options) {
      return handleWriteFeatureObject(this._format, this.type, feature, options);
    }
    writeFeatures(features, options) {
      return handleWriteFeatures(this._format, this.type, features, options);
    }
    writeFeaturesObject(features, options) {
      return handleWriteFeaturesObject(this._format, this.type, features, options);
    }
    writeFeaturesNode(features, options) {
      return handleWriteFeaturesNode(this._format, this.type, features, options);
    }
  }
  const commonUrlTemplate = `http://t{0-7}.tianditu.com/DataServer?T={T}&tk={tk}&x={x}&y={y}&l={z}`;
  function getTdtServiceUrl(type, proj) {
    return commonUrlTemplate.replace(/\{T\}/g, type + "_" + proj).replace(/\{tk\}/g, MapTokenProxy.tdt);
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
  function isValidTdtLayerType(type) {
    return Object.values(TdtLayerType).includes(type);
  }
  let PACKAGE_NAME$8 = "TdtLayer";
  let createMessage$8 = getPackageMessage(PACKAGE_NAME$8);
  class TdtLayer extends TileLayer {
    constructor(type, proj, options) {
      if (!isDefined(MapTokenProxy.tdt)) {
        error_(createMessage$8("constructor", "缺少天地图key，请提前申明"));
      }
      if (!isValidTdtLayerType(type)) {
        error_(
          createMessage$8("constructor", commonMessage.paramsInvaildEnum("type"))
        );
      }
      const url = getTdtServiceUrl(type, proj);
      const xyzSourceParams = Object.assign(
        {},
        DEFAULT_XYZ_SOURCE_PARAMS,
        options,
        {
          url
        }
      );
      const xyzSource = new XYZSource(xyzSourceParams);
      const tdtParams = Object.assign({}, options, {
        source: xyzSource.getSource()
      });
      super(tdtParams);
      /**
       * 图层类型
       */
      __publicField(this, "tdtType");
      this.tdtType = type;
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
  let PACKAGE_NAME$7 = "TileLayer";
  let createMessage$7 = getPackageMessage(PACKAGE_NAME$7);
  class XYZLayer extends BaseLayer {
    constructor(options) {
      super("XYZ", defaultValue(options, {}));
      if (!isDefined(options.source)) {
        error_(createMessage$7("constructor", "source参数是必须的"));
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
  const OMapInteractionDragBoxEventTypes = [
    ...OMapInteractionCommonEventTypes,
    "boxcancel",
    "boxdrag",
    "boxend",
    "boxstart"
  ];
  function isOMapInteractionDragBoxEventType(value) {
    return isString(value) && OMapInteractionDragBoxEventTypes.includes(value);
  }
  function handleInteractionDragBoxEvent(target, type, e) {
    let result = {
      target,
      type,
      pixel: new Pixel(e.pixel),
      coordinate: new Lnglat(e.coordinate)
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
      super("DragBox", { id: params == null ? void 0 : params.id });
      __publicField(this, "extent", null);
      if (isDefined(params) && isDefined(params.onBoxEnd) && isFunction(params.onBoxEnd)) {
        DragBoxParamsBoxEndHandle.initFunction(params.onBoxEnd);
      }
      let _params = Object.assign({}, defaultValue(params, {}));
      this._interaction = new OlInteraction__namespace.DragBox(_params);
      this.initInteractionEvent();
      this._initDragBoxEvent();
      this.events = new Event(
        this
      );
    }
    _initDragBoxEvent() {
      this._interaction.on("boxend", (e) => {
        const extent = this._interaction.getGeometry().getExtent();
        this.extent = isDefined(extent) ? new Extent(extent) : null;
        DragBoxParamsBoxEndHandle.emit({
          coordinate: new Lnglat(e.coordinate),
          target: this,
          extent: this.extent
        });
      });
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$6("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragBoxEventType(type)) {
        error_(createMessage$6("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$6(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionDragBoxEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$6("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragBoxEventType(type)) {
        error_(createMessage$6("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$6(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionDragBoxEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$6("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$6(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
    destroy() {
      DragBoxParamsBoxEndHandle.destroy();
      super.destroy();
    }
  }
  const OMAP_EXTENT_DEFAULT_PARAMS = {
    condition: void 0,
    extent: void 0,
    boxStyle: void 0,
    pixelTolerance: 10,
    pointerStyle: void 0,
    wrapX: false
  };
  const OMapInteractionExtentEventTypes = [...OMapInteractionCommonEventTypes, "extentchanged"];
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
  class InteractionExtent extends Interaction {
    constructor(params) {
      super("InteractionExtent", { id: params == null ? void 0 : params.id });
      let _params = defaultValue(params, {});
      if (isDefined(_params.boxStyle)) {
        _params.boxStyle = handleGetStyleValue(_params.boxStyle);
      }
      this._interaction = new OlInteraction__namespace.Extent(Object.assign({}, OMAP_EXTENT_DEFAULT_PARAMS, defaultValue(_params, {})));
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
        error_(createMessage$5("setExtent", commonMessage.paramsNotDefined("extent")));
      }
      if (!isValidExtent(extent)) {
        error_(createMessage$5("setExtent", commonMessage.paramsInvaildFormat("extent", "OMap.Extent 或者 Extent数组")));
      }
      let _extent = handleGetExtentValue(extent);
      this._interaction.setExtent(_extent);
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$5("on", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionExtentEventType(type)) {
        error_(createMessage$5("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$5("on", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$5("once", commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionExtentEventType(type)) {
        error_(createMessage$5("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$5("once", commonMessage.paramsInvaildFormat("callback", "function")));
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionExtentEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$5("un", commonMessage.paramsNotDefined(id)));
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionModifyEventTypes = [
    ...OMapInteractionCommonEventTypes,
    "modifystart",
    "modifyend"
  ];
  function isOMapInteractionModifyEventType(value) {
    return isString(value) && OMapInteractionModifyEventTypes.includes(
      value
    );
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
        error_(createMessage$4("init", commonMessage.paramsNotDefined("params")));
      }
      const { id, active, layer, ...modifyOptions } = params;
      super("Modify", { id });
      __publicField(this, "records", []);
      let modify_source = null;
      if (!isDefined(layer)) {
        error_(createMessage$4("init", "layer参数不能为空"));
      }
      if (isDefined(layer) && !(layer instanceof VectorLayer)) {
        error_(createMessage$4("init", "layer参数不属于VectorLayer类型"));
      }
      this.layer = layer;
      modify_source = layer.getSource();
      let _params = Object.assign({}, defaultModifyOptions, {
        ...modifyOptions,
        source: modify_source
      });
      this._interaction = new OlInteraction__namespace.Modify(_params);
      this.initInteractionEvent();
      this._initModifyEvent();
    }
    _initModifyEvent() {
      this.pushRecord(this.layer.getFeatures());
      this._interaction.on("modifyend", (e) => {
        const modifiedFeatures = e.features.getArray().map((feature) => this.findFeatureByOlFeature(feature)).filter(isDefined);
        this.pushRecord(modifiedFeatures);
      });
    }
    createSnapshot(features) {
      return features.map((feature) => {
        return {
          id: feature.getId(),
          originFeatureId: OlUtil__namespace.getUid(feature.getFeature()),
          type: feature.type,
          coordinates: feature.getCoordinates()
        };
      });
    }
    pushRecord(features) {
      this.records.push({
        time: getCurrentDateTime(),
        features: this.createSnapshot(features),
        version: this.records.length + 1
      });
    }
    findFeatureByOlFeature(feature) {
      return this.layer.getFeatures().find((item) => {
        return OlUtil__namespace.getUid(item.getFeature()) === OlUtil__namespace.getUid(feature);
      });
    }
    findFeatureByRecord(record) {
      return this.layer.getFeatures().find((item) => {
        if (record.id) {
          return record.id === item.id;
        }
        return OlUtil__namespace.getUid(item.getFeature()) === record.originFeatureId;
      });
    }
    restoreSnapshot(features) {
      features.forEach((feature) => {
        const record = feature;
        const target = this.findFeatureByRecord(record);
        if (isDefined(target)) {
          target.setCoordinates(record.coordinates);
        }
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
        error_(createMessage$4("insertPoint", commonMessage.paramsNotDefined("coordinates")));
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
        error_(createMessage$4("removePoint", commonMessage.paramsNotDefined("coordinates")));
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
      this.restoreSnapshot(this.records[targetIndex].features);
      this.records.splice(targetIndex + 1);
      return true;
    }
    /**
     * 取消当前全部修改，也就是回到初始状态
     */
    cancel() {
      this.restoreSnapshot(this.records[0].features);
      this.records = [
        this.records[0]
      ];
    }
    on(type, callback) {
      this.validateEvent(type, callback, "on");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      this.validateEvent(type, callback, "once");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleModifyEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    validateEvent(type, callback, methodName) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(createMessage$4(methodName, commonMessage.paramsNotDefined("type or callback")));
      }
      if (!isOMapInteractionModifyEventType(type)) {
        error_(createMessage$4(methodName, commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(createMessage$4(methodName, commonMessage.paramsInvaildFormat("callback", "function")));
      }
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$4("un", commonMessage.paramsNotDefined(id)));
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionSelectEventTypes = [
    ...OMapInteractionCommonEventTypes,
    "select"
  ];
  function isOMapInteractionSelectEventType(value) {
    return isString(value) && OMapInteractionSelectEventTypes.includes(value);
  }
  function handleInteractionSelectEvent(target, type, e) {
    let result = {
      target,
      type,
      selected: target.getSelected(),
      deselected: target.getDeselected()
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
      const { id, active, layers: inputLayers, features, style, filter, ...selectOptions } = params || {};
      super("Select", { id });
      __publicField(this, "layers", []);
      __publicField(this, "features", []);
      /**
       * 当前选择的要素
       */
      __publicField(this, "selected", []);
      /**
       * 当前未选择的要素
       */
      __publicField(this, "deselected", []);
      let layers = [];
      if (isDefined(inputLayers)) {
        this.layers = inputLayers;
        layers = inputLayers.map((l) => l.getLayer());
      }
      if (isDefined(features)) {
        this.features = features;
        this.layers = [];
      }
      this._interaction = new OlInteraction__namespace.Select(
        Object.assign({}, defaultSelectOptions, {
          ...selectOptions,
          layers: layers.length ? layers : void 0,
          style: this.initStyle(style),
          filter: this.initFilter(filter)
        })
      );
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
          _style = style.map(
            (s) => s.getStyle()
          );
        } else if (isFunction(style)) {
          _style = (feature, resolution) => {
            let uid = OlUtil__namespace.getUid(feature);
            let targetFeature = this.getTargetFeature(uid);
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
      if (isDefined(filter) || this.features.length) {
        return (feature, layer) => {
          var _a;
          let targetFeature = this.getTargetFeature(OlUtil__namespace.getUid(feature));
          if (!targetFeature) {
            return false;
          }
          if (!isDefined(filter)) {
            return true;
          }
          let targetLayer = (_a = this.map) == null ? void 0 : _a.getAllLayers().find((l) => OlUtil__namespace.getUid(l.getLayer()) === OlUtil__namespace.getUid(layer));
          return filter(
            targetFeature,
            targetLayer
          );
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
          return this.getTargetFeature(
            OlUtil__namespace.getUid(s)
          );
        }).filter((f) => f !== null);
        this.deselected = deselected.map((d) => {
          return this.getTargetFeature(
            OlUtil__namespace.getUid(d)
          );
        }).filter((f) => f !== null);
      });
    }
    getTargetFeature(id) {
      if (this.layers.length) {
        for (const layer of this.layers) {
          const target = layer.getFeatures().find((feature) => {
            return OlUtil__namespace.getUid(feature.getFeature()) === id;
          });
          if (target) {
            return target;
          }
        }
        return null;
      }
      if (!this.features.length && this.map) {
        for (const layer of this.map.getAllLayers()) {
          if (!(layer instanceof VectorLayer)) {
            continue;
          }
          const target = layer.getFeatures().find((feature) => {
            return OlUtil__namespace.getUid(feature.getFeature()) === id;
          });
          if (target) {
            return target;
          }
        }
        return null;
      }
      return this.features.find((feature) => {
        return OlUtil__namespace.getUid(feature.getFeature()) === id;
      }) || null;
    }
    getSelected() {
      return this.selected;
    }
    getDeselected() {
      return this.deselected;
    }
    on(type, callback) {
      this.validateEvent(type, callback, "on");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionSelectEvent(this, type));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      this.validateEvent(type, callback, "once");
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionSelectEvent(this, type));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    validateEvent(type, callback, methodName) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$3(methodName, commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionSelectEventType(type)) {
        error_(createMessage$3(methodName, commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$3(
            methodName,
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$3("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$3(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionLinkEventTypes = [...OMapInteractionCommonEventTypes];
  function isOMapInteractionLinkEventType(value) {
    return typeof value === "string" && OMapInteractionLinkEventTypes.includes(value);
  }
  function handleInteractionLinkEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME$2 = "Link";
  const createMessage$2 = getPackageMessage(PACKAGE_NAME$2);
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
      this._interaction = new OlInteraction__namespace.Link(
        Object.assign({}, defaultLinkOptions, _params)
      );
      this.initInteractionEvent();
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$2("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionLinkEventType(type)) {
        error_(createMessage$2("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$2(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionLinkEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$2("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionLinkEventType(type)) {
        error_(createMessage$2("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$2(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionLinkEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$2("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$2(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
  }
  const OMapInteractionKeyboardZoomEventTypes = [
    ...OMapInteractionCommonEventTypes
  ];
  function isOMapInteractionKeyboardZoomEventType(value) {
    return isString(value) && OMapInteractionKeyboardZoomEventTypes.includes(value);
  }
  function handleInteractionKeyboardZoomEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME$1 = "KeyboardZoom";
  const createMessage$1 = getPackageMessage(PACKAGE_NAME$1);
  const defaultKeyboardZoomOptions = {
    duration: 100,
    delta: 1
  };
  class KeyboardZoom extends Interaction {
    constructor(params) {
      super("KeyboardZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.KeyboardZoom(
        Object.assign({}, defaultKeyboardZoomOptions, params || {})
      );
      this.initInteractionEvent();
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$1("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionKeyboardZoomEventType(type)) {
        error_(createMessage$1("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$1(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionKeyboardZoomEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage$1("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionKeyboardZoomEventType(type)) {
        error_(createMessage$1("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage$1(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionKeyboardZoomEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage$1("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage$1(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
    }
  }
  const defaultDragZoomOptions = {
    className: "omap-dragzoom",
    condition: void 0,
    duration: 200,
    out: false,
    minArea: 64
  };
  const OMapInteractionDragZoomEventTypes = [
    ...OMapInteractionCommonEventTypes
  ];
  function isOMapInteractionDragZoomEventType(value) {
    return isString(value) && OMapInteractionDragZoomEventTypes.includes(value);
  }
  function handleInteractionDragZoomEvent(target, type, e) {
    const { key, oldValue } = e;
    let obj = {
      target,
      type
    };
    if (isDefined(key)) {
      obj.key = key;
    }
    if (key === "active") {
      if (isDefined(oldValue)) {
        obj.oldValue = oldValue;
        obj.newValue = target.getActive();
      } else {
        obj.value = target.getActive();
      }
    }
    return obj;
  }
  const PACKAGE_NAME = "DragZoom";
  const createMessage = getPackageMessage(PACKAGE_NAME);
  class DragZoom extends Interaction {
    constructor(params) {
      super("DragZoom", { id: params == null ? void 0 : params.id });
      this._interaction = new OlInteraction__namespace.DragZoom(
        Object.assign({}, defaultDragZoomOptions, defaultValue(params, {}))
      );
      this.initInteractionEvent();
    }
    on(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage("on", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragZoomEventType(type)) {
        error_(createMessage("on", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage(
            "on",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionDragZoomEvent(this, type, e));
      });
      const id = this.events.on(type, callback, unlisten);
      return id;
    }
    once(type, callback) {
      if (!isDefined(type) || !isDefined(callback)) {
        error_(
          createMessage("once", commonMessage.paramsNotDefined("type or callback"))
        );
      }
      if (!isOMapInteractionDragZoomEventType(type)) {
        error_(createMessage("once", commonMessage.paramsInvaildEnum(type)));
      }
      if (!isFunction(callback)) {
        error_(
          createMessage(
            "once",
            commonMessage.paramsInvaildFormat("callback", "function")
          )
        );
      }
      const unlisten = OlEvent.listen(this._interaction, type, (e) => {
        this.events.emit(type, handleInteractionDragZoomEvent(this, type, e));
      });
      const id = this.events.once(type, callback, unlisten);
      return id;
    }
    un(id) {
      if (!isDefined(id)) {
        error_(createMessage("un", commonMessage.paramsNotDefined(id)));
      }
      if (!isString(id)) {
        error_(
          createMessage(
            "un",
            commonMessage.paramsInvaildFormat(id, "EventIdType")
          )
        );
      }
      this.events.remove(id);
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
  const DEFAULT_FULLSCREEN_OPTIONS = {
    className: "ol-full-screen",
    activeClassName: "ol-full-screen-true",
    inactiveClassName: "ol-full-screen-false",
    tipLabel: "全屏",
    keys: false
  };
  class FullScreen extends Control {
    constructor(idOrOptions, options) {
      super("FullScreen");
      if (isDefined(idOrOptions) && (isNumber(idOrOptions) || isString(idOrOptions))) {
        this.id = idOrOptions;
        this._control = new OlControl__namespace.FullScreen(Object.assign({}, DEFAULT_FULLSCREEN_OPTIONS, options));
      } else {
        this._control = new OlControl__namespace.FullScreen(Object.assign({}, DEFAULT_FULLSCREEN_OPTIONS, idOrOptions));
      }
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
  exports2.FullScreen = FullScreen;
  exports2.GaodeLayer = GaodeLayer;
  exports2.GaodeLayerType = GaodeLayerType;
  exports2.InteractionExtent = InteractionExtent;
  exports2.InteractionType = InteractionType;
  exports2.KeyboardZoom = KeyboardZoom;
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
  exports2.XYZLayer = XYZLayer;
  exports2.Zoom = Zoom;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
