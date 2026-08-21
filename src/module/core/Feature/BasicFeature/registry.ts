import type BasicFeature from './index'
import type { OlFeatureInstanceType, OlGeometryType, OlRenderFeatureInstanceType } from './type'

type RegisteredFeature = BasicFeature<OlGeometryType>

const featureRegistry = new WeakMap<OlFeatureInstanceType, RegisteredFeature>()
const renderFeatureRegistry = new WeakMap<OlRenderFeatureInstanceType, RegisteredFeature>()

export function getRegisteredFeature(
  feature: OlFeatureInstanceType
): RegisteredFeature | undefined {
  return featureRegistry.get(feature)
}

export function registerFeature(
  feature: OlFeatureInstanceType,
  wrapper: RegisteredFeature
): RegisteredFeature {
  const registered = featureRegistry.get(feature)
  if (registered) return registered
  featureRegistry.set(feature, wrapper)
  return wrapper
}

export function getRegisteredRenderFeature(
  feature: OlRenderFeatureInstanceType
): RegisteredFeature | undefined {
  return renderFeatureRegistry.get(feature)
}

export function registerRenderFeature(
  feature: OlRenderFeatureInstanceType,
  wrapper: RegisteredFeature
): RegisteredFeature {
  const registered = renderFeatureRegistry.get(feature)
  if (registered) return registered
  renderFeatureRegistry.set(feature, wrapper)
  return wrapper
}
