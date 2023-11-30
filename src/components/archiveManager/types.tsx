interface SelectOption {
  value: string
  label: string
}
interface DataSchema {
  id: string
  name: string
  description: string
  title: string
  width?: number
  inputType?: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea'
  options?: SelectOption[] | Function
  required?: boolean | true
  valueGetter?: Function
  readonly?: boolean
  readonlyIfExist?: boolean
}

export default DataSchema
