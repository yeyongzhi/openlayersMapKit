/** Common lifecycle contract for wrappers that own native OpenLayers resources. */
export interface Disposable {
  /** Permanently releases listeners and native resources. Safe to call repeatedly. */
  dispose(): void
  /** Reports whether permanent release has already happened. */
  isDisposed(): boolean
}

/** A mounted object that can be detached without preventing later reuse. */
export interface Removable {
  remove(): void
}
