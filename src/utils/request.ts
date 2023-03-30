import { message } from "antd"
import type { Options } from "ky"
import ky from 'ky'
import qs from "qs"
import { useEffect, useState } from "react"

interface Body<T> {
  data: T
  status: number
  msg: string
}

export async function jsonGet<T>(url: string, options?: Options) {
  const res = await ky.get(url, options).json<Body<T>>()
  if (res.status !== 0) {
    message.error(res.msg)
    return null
  }
  return res.data
}

export async function jsonPost<T>(url: string, options?: Options) {
  const res = await ky.get(url, options).json<Body<T>>()
  if (res.status !== 0) {
    message.error(res.msg)
    return null
  }
  return res.data
}

export const joinParams = (url: string, params?: object) => {
  return `${url}?${qs.stringify(params)}`
}