import { useState, useEffect } from 'react'

const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'
const paginate = (followers: any) => {
  const itemsPerPage = 9
  const numberOfPages = Math.ceil(followers.length / itemsPerPage)

  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage
    return followers.slice(start, start + itemsPerPage)
  })

  return newFollowers
}
export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>([])

  const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setData(paginate(data))
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return { loading, data }
}
