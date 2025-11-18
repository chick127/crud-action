'use client'

import { createTopic } from '@/actions/topicActions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddTopicForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createTopic(title, description)
      router.push('/') // 생성 후 메인 페이지로 이동
    } catch (error) {
      console.error('토픽 생성 중 오류:', error)
      alert('토픽 생성 중 오류가 발생했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border border-slate-500 p-4"
        type="text"
        placeholder="토픽 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border border-slate-500 p-4 h-32"
        placeholder="토픽 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="bg-green-800 font-bold text-white py-3 px-6 w-fit rounded-md"
      >
        토픽 추가하기
      </button>
    </form>
  )
}
