import React, { useState, useEffect } from 'react'

export const LoadingContext = React.createContext()

export const LoadingProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  useEffect(() => {
    startLoading()
    return () => {
      stopLoading()
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, startLoading, stopLoading }}>
      {props.children}
    </LoadingContext.Provider>
  )
}
