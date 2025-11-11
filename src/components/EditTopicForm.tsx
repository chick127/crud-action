'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
interface EditTopicFormProps {
  id: string
  title: string
  description: string
}
export default function EditTopicForm({
  id,
  title,
  description,
}: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      })
      if (!res.ok) {
        throw new Error('Failed to update topic')
      }
      router.push('/')
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="flex flex-col gap-3">
      <input
        type="text"
        className="border border-slate-500 p-4"
        placeholder="Topic Title"
        value={newTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTitle(e.target.value)
        }
      />
      <textarea
        className="border border-slate-500 p-4"
        placeholder="Topic Description"
      ></textarea>
      <button className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-2xl">
        Update Topic
      </button>
    </form>
  )
}
