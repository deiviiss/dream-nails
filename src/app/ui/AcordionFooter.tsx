'use client'
import Link from 'next/link'
import { useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'

interface ItemEnlace {
  id: number
  title: string
  url: string
  target: string | undefined
}

interface Item {
  id: number
  title: string
  enlaces: ItemEnlace[]
}

interface AccordionProps {
  items: Item[]
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  activeItem: number | null
}

export default function AccordionFooter({
  items
}: AccordionProps): JSX.Element {
  const [activeItem, setActiveItem] = useState<number | null>(null)

  const handleItemClick = (itemId: number): void => {
    setActiveItem((prevActiveItem) =>
      prevActiveItem === itemId ? null : itemId
    )
  }

  const AccordionItem = ({
    activeItem,
    ...rest
  }: AccordionItemProps): JSX.Element => (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className='flex flex-col w-full p-4 border-x-0 border-[1px]'
          {...rest}
        >
          <div
            className='w-full flex justify-between'
            onClick={() => {
              handleItemClick(item.id)
            }}
          >
            <h1 className='font-medium text-lg'>{item.title}</h1>
            <BsPlusLg
              className={`ml-auto transition-all duration-1000 ease-in-out transform ${item.id === activeItem ? 'rotate-45' : ''
                }`}
              size={25}
              color='#fff'
            />
          </div>
          <div
            className={`transition-all duration-1000 ease-in-out ${item.id === activeItem ? '' : 'hidden'
              }`}
          >
            {item.enlaces.map((enlace) => (
              <ul key={enlace.id}>
                <li className='py-1'>
                  <Link target={enlace.target} href={enlace.url}>
                    {enlace.title}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className='w-full'>
      <AccordionItem activeItem={activeItem} />
    </div>
  )
}
