import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Default() {
  const navigate = useNavigate()
  navigate('/spacetime')
  return null
}
