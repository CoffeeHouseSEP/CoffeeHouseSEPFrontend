export type ActionType = {
  content: string
  icon: (data: { [key: string]: any }) => React.ReactNode
  func: Function
}

export type ExampleRowType = {
  id: string
  name: string
  role: string
  status: string
}
