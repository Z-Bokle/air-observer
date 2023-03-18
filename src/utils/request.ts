import type { Options } from "ky"
import ky from 'ky'
import qs from "qs"
import { useEffect, useState } from "react"

export async function jsonGet<T>(url: string, options?: Options) {
  const res = await ky.get(url, options)
  return res.json<T>()
}

export async function jsonPost<T>(url: string, options?: Options) {
  const res = await ky.get(url, options)
  return res.json<T>()
}

const joinParams = (url: string, params?: object) => {
  return `${url}?${qs.stringify(params)}`
}

export function useGet<T>(url: string, params?: object) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setData(undefined)
    setIsLoading(true)
    jsonGet<T>(joinParams(url, params))
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .finally(() => {

      })
  }, [url, params])

  return { data, isLoading }
}
