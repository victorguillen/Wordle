import React from 'react'
import { AiOutlineClose } from "react-icons/ai"

interface Props {
  children: React.ReactNode,
  open: boolean,
  onClose: () => void
}

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  
  if (open) {
    return (
      <div className='modal'>
        <div className='modal-content'>
          <button className='icons modal-close' onClick={onClose}>
            <AiOutlineClose size={22}/>
          </button>
          {children}
        </div>
      </div>
    )
  }
  return null
}

export default Modal