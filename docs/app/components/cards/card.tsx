import { FC } from 'react'
import CardItem from './cardItem'
import { exampleData } from './data'

interface cardProps {}

const Card: FC<cardProps> = ({}) => {
  return (
    <>
      {exampleData.map((data) => {
        return (
          <div
            key={data.title}
            className="border border-neutral-300 hover:border-neutral-400  hover:bg-neutral-100 dark:border-slate-800 dark:hover:border-slate-600 dark:hover:bg-black hover:cursor-pointer rounded-lg p-5"
          >
            <CardItem
              href={data.href}
              title={data.title}
              description={data.description}
            />
          </div>
        )
      })}
    </>
  )
}

export default Card
