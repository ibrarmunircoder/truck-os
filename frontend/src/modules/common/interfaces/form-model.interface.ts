interface IFieldSchema {
  name: string;
  placeholder?: string;
}

export interface IFieldNestedSchema extends IFieldSchema {
  nestedFields?: IFieldSchema[];
}
