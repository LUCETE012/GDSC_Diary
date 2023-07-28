'use client'

import Link from 'next/link'
import { EMOTION_LIST } from '~/constants/index'
import { Diary } from '../../interface/diary'

interface EmotionCardProps {
    emotion: Diary['emotion']
    emoji: string
    description: string
    color: string
}

const EmotionCard = ({ color, emoji, emotion, description }: EmotionCardProps) => {
    const upperEmotion = emotion[0].toUpperCase() + emotion.slice(1, emotion.length)
    return (
        <Link
            href={`/emotions/${emotion}`}
            className="group flex w-full flex-row items-center justify-between gap-4 rounded-3xl border border-gray-50 p-4  hover:scale-105 hover:border-transparent hover:shadow-2xl"
        >
            <div
                className={`flex h-24 min-h-[6rem] w-24 min-w-[6rem] justify-center rounded-2xl border border-${color}-100 bg-${color}-50 text-6xl group-hover:bg-${color}-100 group-hover:shadow-inner`}
            >
                {emoji}
            </div>
            <div className="flex w-full flex-col items-start justify-center">
                <h1 className="flex items-start justify-center text-2xl font-bold">{upperEmotion}</h1>
                <span className="flex items-start justify-center text-gray-400"> {description} </span>
            </div>
        </Link>
    )
}

export default function EmotionLinkPage() {
    return (
        <div className="flex h-screen max-h-screen min-h-screen w-full items-center justify-center bg-white">
            <div className="flex flex-col items-start justify-center gap-10">
                <div className="flex flex-col items-start justify-center gap-3">
                    <h1 className="text-3xl font-bold">감정 상자</h1>
                    <span className="text-gray-500">나만의 감정을 돌아보고 생각에 잠겨보아요 :)</span>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 items-start justify-center gap-5">
                    {EMOTION_LIST.map((emotion) => (
                        <EmotionCard key={emotion.description} {...emotion} />
                    ))}
                </div>
            </div>
        </div>
    )
}
