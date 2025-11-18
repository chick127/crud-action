import AddTopicForm from '@/components/AddTopicForm'
export default function AddTopic() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">새 토픽 추가</h1>
      <AddTopicForm />
    </div>
  )
}
