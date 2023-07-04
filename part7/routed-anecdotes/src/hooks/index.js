import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    } //nhung ma cai nay chi dung cho 1 cai thi lam kieu gi nhi 
  
    return {
      value,
      reset,
      props: {
        type,
        value,
        onChange
      } //cai nay la can gop lai thoi 
    }
  }