import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div style={{fontSize: 100, color: 'red'}}>
        页面发生了错误！
        点击<Link to='/'>我</Link>回到主页
    </div>
  )
}
