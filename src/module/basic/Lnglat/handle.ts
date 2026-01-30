import { type OMapCoordinateType, type OlCoordinateType } from "./type";
import { isDefined } from "../../../utils/define";
import Lnglat from "./index";

export function handleGetLnglatValue(
  extent: OMapCoordinateType,
): OlCoordinateType;
export function handleGetLnglatValue(extent?: undefined): undefined;

export function handleGetLnglatValue(
  coordinates?: OMapCoordinateType,
): OlCoordinateType | undefined {
  if (isDefined(coordinates)) {
    return coordinates instanceof Lnglat
      ? (coordinates.toArray() as OlCoordinateType)
      : (coordinates as OlCoordinateType);
  }
  return undefined;
}