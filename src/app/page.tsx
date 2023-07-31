'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDiaryUpdate, useDiaryValue } from '~/hooks/Diary'
import { localStorage } from '~/utils/locastorage'
import { DIARY_STORAGE_KEY } from '../constants'
import { Diary } from '../interface/diary'

const emotionEmoji: Record<Diary['emotion'], string> = {
    awesome: '😎',
    great: '😃',
    good: '😙',
    soso: '😗',
    bad: '🤬',
}

const weatherEmoji: Record<Diary['weather'], string> = {
    sunny: '☀️',
    cloud: '☁️',
    rain: '🌧',
    snow: '❄️',
}

const DiaryWriter = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [emotion, setEmotion] = useState<Diary['emotion'] | undefined>()
    const [weather, setWeather] = useState<Diary['weather'] | undefined>()
    const [isValid, setIsValid] = useState(false)
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        const isNotValidDiary =
            emotion === undefined || weather === undefined || title.length <= 2 || content.length <= 5
        setIsValid(!isNotValidDiary)
        setMounted(true)
    }, [title, content, emotion, weather])

    const setDairy = useDiaryUpdate()

    const saveDiary = () => {
        if (isValid === false) return

        const newDiary = {
            id: window.crypto.randomUUID(),
            title: title,
            content: content,
            date: new Date(),
            emotion: emotion!,
            weather: weather!,
        }

        if (mounted) {
            setDairy((prev) => {
                const initialView = 1
                const withView = { ...newDiary, views: initialView }
                const updatedDiary = [...prev, withView]
                localStorage.set(DIARY_STORAGE_KEY, updatedDiary)
                return updatedDiary
            })
        }
        resetDiary()
    }

    const resetDiary = () => {
        setTitle('')
        setContent('')
        setEmotion(undefined)
        setWeather(undefined)
    }

    const color = isValid ? 'emerald' : 'gray'
    return (
        <div className="flex h-2/3 min-h-[20rem] w-full flex-col gap-4 rounded-lg border border-gray-100 bg-white p-4">
            <input
                type="text"
                className="my-3 w-full rounded-md p-2 text-2xl text-gray-900 ring-gray-100 focus:outline-none focus:ring-1"
                id="title"
                value={title}
                placeholder="제목을 적어보세요"
                onChange={(event) => {
                    setTitle(event.target.value)
                }}
            />
            <div>
                <div className="flex flex-row">
                    <button
                        onClick={() => setEmotion('bad')}
                        className={
                            emotion === 'bad'
                                ? ' mb-3 mr-2 flex items-center justify-center rounded-lg border bg-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-500 hover:border-emerald-500 hover:text-emerald-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        bad
                    </button>
                    <button
                        onClick={() => setEmotion('soso')}
                        className={
                            emotion === 'soso'
                                ? ' mb-3 mr-2 flex items-center justify-center rounded-lg border bg-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-500 hover:border-emerald-500 hover:text-emerald-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium  text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        soso
                    </button>
                    <button
                        onClick={() => setEmotion('good')}
                        className={
                            emotion === 'good'
                                ? 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-500 hover:border-emerald-500 hover:text-emerald-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        good
                    </button>
                    <button
                        onClick={() => setEmotion('great')}
                        className={
                            emotion === 'great'
                                ? 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-500 hover:border-emerald-500 hover:text-emerald-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        great
                    </button>
                    <button
                        onClick={() => setEmotion('awesome')}
                        className={
                            emotion === 'awesome'
                                ? ' mb-3 mr-2 flex items-center justify-center rounded-lg border bg-emerald-200 px-3 py-1.5 text-sm font-medium text-emerald-500 hover:border-emerald-500 hover:text-emerald-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-2 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:bg-emerald-200 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        awesome
                    </button>
                </div>
                <div className="flex flex-row">
                    <button
                        onClick={() => setWeather('cloud')}
                        className={
                            weather === 'cloud'
                                ? 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-blue-200 px-3 py-1.5 text-sm font-medium text-blue-500 hover:border-blue-500 hover:text-blue-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:outline-none active:translate-y-[1px]'
                        }
                    >
                        cloud
                    </button>
                    <button
                        onClick={() => setWeather('rain')}
                        className={
                            weather === 'rain'
                                ? 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-blue-200 px-3 py-1.5 text-sm font-medium text-blue-500 hover:border-blue-500 hover:text-blue-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:outline-none active:translate-y-[1px]'
                        }
                    >
                        rain
                    </button>
                    <button
                        onClick={() => setWeather('snow')}
                        className={
                            weather === 'snow'
                                ? 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-blue-200 px-3 py-1.5 text-sm font-medium text-blue-500 hover:border-blue-500 hover:text-blue-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:outline-none active:translate-y-[1px] '
                        }
                    >
                        snow
                    </button>
                    <button
                        onClick={() => setWeather('sunny')}
                        className={
                            weather === 'sunny'
                                ? 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-blue-200 px-3 py-1.5 text-sm font-medium text-blue-500 hover:border-blue-500 hover:text-blue-500 focus:outline-none active:translate-y-[1px]'
                                : 'mb-3 mr-3 flex items-center justify-center rounded-lg border bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500 hover:border-gray-900 hover:text-gray-900 focus:outline-none active:translate-y-[1px]'
                        }
                    >
                        sunny
                    </button>
                </div>
            </div>
            <textarea
                id="content"
                rows={4}
                value={content}
                onChange={(event) => {
                    setContent(event.target.value)
                }}
                className="resize-none rounded-lg p-1.5 text-gray-900 ring-gray-300 focus:outline-none focus:ring-1"
                placeholder="오늘 당신의 하루는 어땠나요?"
            ></textarea>
            <button
                className={`rounded-lg border border-gray-100 p-1 bg-${color}-100 text-${color}-500 hover:border-gray-700 active:translate-y-[1px]`}
                onClick={saveDiary}
                disabled={!isValid}
            >
                {isValid ? '일기를 저장해보아요' : '일기를 더 자세히 적어볼까요?'}
            </button>
        </div>
    )
}

const DiaryViewer = ({ diary }: { diary: Diary[] }) => {
    const isDiaryExist = diary.length > 0

    return (
        <>
            {isDiaryExist ? (
                <div className="flex flex-col">
                    {diary.map((props) => {
                        const parsedDate = typeof props.date === 'string' ? new Date(props.date) : props.date

                        const formattedDate = Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(parsedDate)

                        return (
                            <Link
                                href={`/detail/${props.id}`}
                                key={props.id}
                                className="my-1 flex flex-col rounded-l border border-gray-100 p-3 hover:bg-gray-50"
                            >
                                <h1> {props.title} </h1>
                                <div className="flex w-full flex-row items-center justify-between gap-1">
                                    <span className="text-gray-500"> {formattedDate} </span>
                                    <div className="flex flex-row">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border p-1">
                                            {emotionEmoji[props.emotion]}
                                        </div>
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full border p-1">
                                            {weatherEmoji[props.weather]}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            ) : (
                <div> 일기를 적어보세요 </div>
            )}
        </>
    )
}

export default function DiaryHomePage() {
    return (
        <div className="flex h-screen max-h-screen min-h-screen w-full justify-center bg-white">
            <div className="flex h-full flex-col items-center justify-center gap-10 md:grid md:w-4/5 md:grid-cols-[3fr,2fr] md:grid-rows-1 lg:w-2/3">
                <DiaryWriter />
                <div className="flex h-2/3 min-h-[20rem] w-full flex-col items-start justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4">
                    <h1 className="mt-5 text-xl text-emerald-600">기록된 일기</h1>
                    <div className="flex max-h-96 w-full flex-col gap-2 overflow-y-auto">
                        <DiaryViewer diary={useDiaryValue()} />
                    </div>
                    <Link
                        href="/emotions"
                        className="flex w-full items-center justify-center rounded-lg border border-emerald-200 bg-emerald-200 py-3 text-emerald-600 hover:border-emerald-600 active:translate-y-[1px]"
                    >
                        {' '}
                        감정 모아보기{' '}
                    </Link>
                </div>
            </div>
        </div>
    )
}
