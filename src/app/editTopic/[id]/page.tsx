import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'
const apiUrl = process.env.API_URL

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${apiUrl}/api/topics/${id}`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error('Topic을 읽어오지 못했습니다')
    }
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function EditTopicPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { topic } = await getTopicById(id)
  const { title, description } = topic

  return <EditTopicForm id={id} title={title} description={description} />
}
