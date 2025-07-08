// 假设原始类型如下
type OriginalType = {
    prop1: string;
    prop2: Array<import('../module/layer/index').GaodeLayer>;
    prop3: boolean;
    prop4: string;
    prop5: number;
    prop6: boolean;
    prop7: string;
    prop8: import('../index').Color | import('../index').Extent;
    prop9: boolean;
    prop10: string | number | boolean;
  };
  
  // 要忽略的属性名称
  type KeysToOmit = 'prop1' | 'prop3' | 'prop5' | 'prop9';
  
  // 使用 Omit 排除这些属性
  type OmitOriginal = Omit<OriginalType, KeysToOmit>;
  
  // 自定义这5个属性的类型，并增加新属性
  type CustomProps = {
    prop1: number; // 自定义 prop1 的类型为 number
    prop3: string; // 自定义 prop3 的类型为 string
    prop5: boolean; // 自定义 prop5 的类型为 boolean
    prop9: string; // 自定义 prop9 的类型为 string
    newProp1: string; // 增加新属性 newProp1
    newProp2: number; // 增加新属性 newProp2
    newProp3: boolean; // 增加新属性 newProp3
  };
  
  // 合并类型，得到最终的类型
  type FinalType = OmitOriginal;

  (obj as FinalType).prop2