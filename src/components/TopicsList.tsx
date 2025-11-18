'use client'

import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import { Topic } from '@/types/topic'

interface TopicsListProps {
  topics: Topic[]
}

export default function TopicsList({ topics }: TopicsListProps) {
  return (
    <>
      {topics.map((topic: Topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between items-start gap-5"
        >
          <div>
            <h2 className="text-2xl font-bold"> {topic.title} </h2>
            <div> {topic.description} </div>
            <div className="flex gap-4">
              <p>Created: {new Date(topic.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(topic.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}
