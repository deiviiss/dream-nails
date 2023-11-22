import { type ReactNode } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface ModalProps {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
}
const Modal = ({ children, open, setOpen, title = 'Modal' }: ModalProps): JSX.Element => {
  return (
    <>
      {open && (
        <aside className="absolute top-0 rigth-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 bg-black bg-opacity-25 z-20 rounded-md">
          <section className="w-full max-w-lg flex flex-col items-center justify-items-center p-5 pt-4 border-2 border-secondary bg-white rounded-lg">
            <header className="w-full text-2xl px-2 relative">
              <AiOutlineClose onClick={() => { setOpen(false) }} className='absolute right-0 top-0 text-lg hover:opacity-75 cursor-pointer' />
              <h3>{title}</h3>
            </header>
            {children}
          </section>
        </aside>
      )}
    </>
  )
}

export default Modal
