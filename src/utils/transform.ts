export function ColorhexToRGB(hex: string) {
  // 检查输入是否以 # 开头
  if (hex.charAt(0) !== '#') {
    console.error('Hex color code must start with #');
    return [0, 0, 0];
  }

  // 去掉 # 符号
  hex = hex.slice(1);

  // 检查十六进制颜色代码的长度（6位或3位）
  if (hex.length === 3) {
    // 如果是3位十六进制代码，如 #f00，需要扩展为6位
    hex = hex.split('').map(char => char + char).join('');
  } else if (hex.length !== 6) {
    console.error('Hex color code must be 3 or 6 characters long');
    return [0, 0, 0];
  }

  // 提取 R、G、B 的十六进制值
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 返回 RGB 格式
  return [r, g, b];
}

export function extractRGBValues(rgbString: string) {
  const regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;
  const match = rgbString.match(regex);

  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)]
  } else {
    throw new Error("Invalid RGB format");
  }
}

export function extractRGBAValues(rgbString: string) {
  const regex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)/;
  const match = rgbString.match(regex);

  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)]
  } else {
    throw new Error("Invalid RGB format");
  }
}

/**
 * 将透明度的十六进制值转换为数字格式。
 * @param opacityHex 透明度的十六进制值，例如："FF"
 * @returns {number} 透明度的数字值，范围在 0 到 1 之间。
 */
export function opacityHexToNumber(opacityHex: string) {
  return (parseInt(opacityHex, 16) / 255).toPrecision(2);
}