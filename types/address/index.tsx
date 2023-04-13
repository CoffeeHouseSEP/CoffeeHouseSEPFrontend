export interface ProvinceResponse {
  provinces: {
    code: string
    name: string
  }[]
}

export interface DistrictResponse {
  districts: {
    name: string
    pre: string
    ward: {
      name: string
      pre: string
    }[]
    street: string[]
  }[]
}
