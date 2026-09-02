import { OMapErrorCode } from '../../../error'
import { error_, getPackageMessage } from '../../../utils/message'

/** Throws the shared lifecycle error used by permanently disposed wrappers. */
export function assertNotDisposed(
  disposed: boolean,
  objectName: string,
  operationName: string
): void {
  if (!disposed) return
  error_(
    getPackageMessage(objectName)(operationName, '对象已永久释放，不能再执行该操作'),
    OMapErrorCode.Disposed
  )
}
