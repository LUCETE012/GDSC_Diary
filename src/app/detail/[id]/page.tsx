'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDiaryValue } from '~/hooks/Diary'
import { useStorageDiary } from '~/hooks/useStorageDiary'
import { Diary } from '~/interface/diary'

export default function DiaryDetailPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()

    const diary: Diary | undefined = useDiaryValue().find((diary) => diary.id === id)
    // const diary: Diary = useDiaryValue()

    const [initId, setInitId] = useState<string>('')
    const [initDate, setInitDate] = useState<Date>(new Date())
    const [initTitle, setInitTitle] = useState<string>('')
    const [initContent, setInitContent] = useState<string>('')
    const [initEmotion, setInitEmotion] = useState<string>('')
    const [initWeather, setInitWeather] = useState<string>('')
    const [initViews, setInitViews] = useState<number>(0)

    const initDiary: Diary = {
        id: initId,
        date: initDate,
        title: initTitle,
        content: initContent,
        emotion: 'soso',
        weather: 'cloud',
        views: 0,
    }

    const { remove, update } = useStorageDiary()
    const removeDiary = () => {
        remove(id)
        router.push('/')
    }

    // if(diary === undefined) router.push('/')
    if (diary === undefined) throw Error('No Diary')
    const parsedDate = typeof diary.date === 'string' ? new Date(diary.date) : diary.date

    const formattedDate = Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(parsedDate)

    useEffect(() => {
        setInitId('0')
        setInitDate(new Date())
        setInitTitle('')
        setInitContent('')
        setInitEmotion('')
        setInitWeather('')
        setInitViews(0)
        update(id, { ...diary, views: diary.views + 1 })
    }, [])

    return (
        <div className="flex h-screen max-h-screen min-h-screen w-full justify-center bg-white ">
            <div className="h-full w-2/4 py-20">
                <h1 className="flex text-3xl font-bold">{diary.title}</h1>
                <div className="my-9 flex flex-row justify-between gap-2">
                    <div className="flex w-full justify-center rounded-xl border border-gray-100 bg-gray-100 p-2 text-sm text-gray-500 hover:border-gray-500">
                        {' '}
                        {formattedDate}{' '}
                    </div>
                    <div className="flex w-full justify-center rounded-xl border border-gray-100 bg-gray-100 p-2 text-sm text-gray-500 hover:border-gray-500">
                        {' '}
                        {diary.weather}{' '}
                    </div>
                    <Link
                        href={`/emotions/${diary.emotion}`}
                        className="flex w-full justify-center rounded-xl border border-gray-100 bg-gray-100 p-2 text-sm text-gray-500 hover:border-gray-500"
                    >
                        {' '}
                        {diary.emotion}{' '}
                    </Link>
                </div>
                <div className="h-2/3 text-base text-gray-800">{diary.content}</div>
                <div className="flex flex-row justify-between">
                    <Link
                        href="/"
                        className="m-1 flex w-full justify-center rounded-xl border border-emerald-100 bg-emerald-100 p-2 text-emerald-500 hover:border-emerald-500"
                    >
                        새로운 일기 작성하기
                    </Link>
                    <button
                        onClick={removeDiary}
                        className=" m-1 flex w-full justify-center rounded-xl border border-red-100 bg-red-100 p-2 text-red-500 hover:border-red-500"
                    >
                        현재 일기 삭제하기
                    </button>
                </div>
            </div>
        </div>
    )
}
