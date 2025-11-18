import { getTopic } from '@/actions/topicActions'
import EditTopicForm from '@/components/EditTopicForm'

export default async function EditTopic({
  params,
}: {
  params: { id: string }
}) {
  const { topic } = await getTopic(params.id)

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">토픽 수정</h1>
      <EditTopicForm
        id={topic._id}
        initialTitle={topic.title}
        initialDescription={topic.description}
      />
    </div>
  )
}
