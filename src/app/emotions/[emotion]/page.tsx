'use client'

import Link from "next/link"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EMOTION_DATA } from '~/constants/index'
import { DIARY_STORAGE_KEY } from "~/constants/index"
import { useDiaryUpdate, useDiaryValue } from '~/hooks/Diary'
import { localStorage } from "~/utils/locastorage"
import { Diary } from '../../../interface/diary'

const DiaryTable = ({
    diary,
    setRemoveSelected,
} : {
    diary: Diary
    setRemoveSelected: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const { id, date, title, views } = diary
    const parsedDate = typeof date === 'string' ? new Date(date) : date
    const formattedDate = Intl.DateTimeFormat('ko-KR',
        {dateStyle: 'medium'}
    ).format(parsedDate)
    return (
        <div key={id} className="flex w-full flex-row items-center justify-between gap-4 rounded-lg border border-gray-100 p-2"> 
            <input type="checkbox" className="m-4 h-4 accent-gray-50"
            onChange={({target: {checked}}) => {
                if (checked) {
                    setRemoveSelected((selected) => [...(selected ?? []), diary.id])
                } else {
                    setRemoveSelected((selected) => selected?.filter((id) => id !== diary.id))
                }
            }}/>
            <Link href={`/detail/${id}`} className="flex w-full flex-row items-center justify-between">
                <div>{title}</div>
                <div className="flex flex-row gap-2">
                    <div className="flex items-center justify-center text-gray-400">{formattedDate}</div>
                    <div className="flex items-center justify-center text-gray-400">조회수: {views}</div>
                </div>

            </Link>
        </div>
    )

}

export default function EmotionPage() {
    const  { emotion }  = useParams() as { emotion: Diary['emotion'] }
    if (emotion === undefined) throw Error("undefined")

    const emotionDiary = useDiaryValue().filter((diary) => diary.emotion === emotion)
    const isEmotionDiaryExists = emotionDiary.length > 0
    const [removeSelected, setRemoveSelected] = useState<string[]>([])
    const isRemoveSelected = removeSelected.length > 0
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    const setDiary = useDiaryUpdate()
    const remove = (removeId: string) => {
        if (mounted)
        {
            setDiary((prev) => {
                const removedDiary = prev.filter(({id}) => id !== removeId)
                localStorage.set(DIARY_STORAGE_KEY, removedDiary)
                return removedDiary
            })
        }


    }

    const removeSelectDiary = () => {
        removeSelected.forEach((id) => remove(id))
    }
    
    const color = EMOTION_DATA[emotion].color
    const buttonColor = isRemoveSelected ? "red" : "gray"
    return (
        <div className="flex h-full w-full items-center justify-center bg-white">
             <div className="flex w-full flex-col items-start gap-10 md:w-2/3">
                <div className="flex w-full flex-row items-center justify-start gap-5">
                    {/* <div className={`flex justify-center border border-${color}-100 bg-${color}-50 w-24 h-24 min-h-[6rem] min-w-[6rem] rounded-2xl text-6xl group-hover:shadow-inner group-hover:bg-${color}-100`}>{EMOTION_DATA[emotion].emoji}</div> */}
                    <div className={`flex h-24 min-h-[6rem] w-24 min-w-[6rem] justify-center rounded-2xl border border-red-100 bg-red-50 text-6xl group-hover:bg-red-100 group-hover:shadow-inner`}>{EMOTION_DATA[emotion].emoji}</div>
                    <h1 className="flex items-center justify-center text-3xl font-medium"> {EMOTION_DATA[emotion].description} </h1>
                </div>
                {
                    isEmotionDiaryExists ? (
                        <>
                        {emotionDiary.map((diary) => (
                            <DiaryTable key={diary.id} diary={diary} setRemoveSelected={setRemoveSelected} />
                        )
                        )} 
                        <button disabled={!isRemoveSelected} onClick={removeSelectDiary} className={`flex w-full justify-center rounded-xl border border-red-100 bg-red-100 p-2 text-red-500 hover:border-red-500`}>
                            {isRemoveSelected ? `선택된 ${removeSelected.length}개의 일기를 삭제 합니다`
                            : '선택된 일기가 없습니다'}
                        </button>
                        </>
                    ) :
                    (
                        <div className="text-gray-500"> 아직 적지 않았어요! </div>
                    )
                }
            </div>
        </div>
        
    )
}
