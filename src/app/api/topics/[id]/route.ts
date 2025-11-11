import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

interface ParamsPromise {
  params: Promise<{
    id: string
  }>
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { newTitle: title, newDescription: description } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title 과 description이 필요합니다.' },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Topic을 업데이트 해야합니다.', topic: updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectMongoDB()
    const topic = await Topic.findOne({ _id: id })

    if (!topic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
