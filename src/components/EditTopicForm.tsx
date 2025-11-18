'use client'

import { updateTopic } from '@/actions/topicActions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EditTopicFormProps {
  id: string
  initialTitle: string
  initialDescription: string
}

export default function EditTopicForm({
  id,
  initialTitle,
  initialDescription,
}: EditTopicFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateTopic(id, title, description)
      router.push('/') // 수정 후 메인 페이지로 이동
    } catch (error) {
      console.error('토픽 수정 중 오류:', error)
      alert('토픽 수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="토픽 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border border-slate-500 px-8 py-2"
        placeholder="토픽 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        수정하기
      </button>
    </form>
  )
}
