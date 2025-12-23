import { useEffect } from 'react'
import { auth } from '@/lib/instant'

export default function InstantAuthSync() {
  useEffect(() => {
    console.log('InstantAuthSync component mounted')
  }, [])

  return null
}
