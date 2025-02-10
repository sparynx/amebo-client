import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
  </div>
  )
}

export default Loader