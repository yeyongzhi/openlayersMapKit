import { warn_, error_, getPackageMessage } from '../../../../utils/index'
import TileSource from '../index'

const PACKAGE_NAME = 'ImageTile';
const createMessage = getPackageMessage(PACKAGE_NAME);

/**
 * OMap ImageTile 类
 * @class
 * @classdesc ImageTile
 * @author Aurora
 * @version 1.0.0
 * @createDate 2025/10/2
 * @updateDate 2025/10/2
 */

export default class ImageTileSource extends TileSource {

    constructor(params: any) {
        super(params);
        
    }

}