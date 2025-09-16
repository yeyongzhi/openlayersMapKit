import TooltipPopup from './tooltipPopup'

/**
 * 用于鼠标悬浮的信息Popup
 */
export const tooltipPopup = new TooltipPopup("单击地图开始测量")

/**
 * 用于测量结束后需要展示在地图上的Popup
 * MeasureMode.Area的时候需要使用
 */
export const measurePopup = new TooltipPopup("")