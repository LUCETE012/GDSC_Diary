'use client'

import { createContext, useContext, useState } from 'react'
import { DIARY_STORAGE_KEY } from '~/constants/index'
import { Diary } from '~/interface/diary'
import { localStorage } from '~/utils/locastorage'

const DiaryValueContext = createContext<Diary[] | undefined>(undefined)
type DiaryUpdate = React.Dispatch<React.SetStateAction<Diary[]>>
const DiaryUpdateContext = createContext<DiaryUpdate | undefined>(undefined)

const DiaryProvider = ({ children }: React.PropsWithChildren) => {

    const [diaries, updateDiaries] = useState<Diary[]>(() => localStorage.get<Diary[]>(DIARY_STORAGE_KEY) ?? [])

    return (
        <DiaryValueContext.Provider value={diaries}>
            <DiaryUpdateContext.Provider value={updateDiaries}>{children}</DiaryUpdateContext.Provider>
        </DiaryValueContext.Provider>
    )
}

const useDiaryValue = (): Diary[] => {
    const diary = useContext(DiaryValueContext)
    if (diary === undefined) {
        throw new Error('useDiaryValue must be used within a <DiaryProvider>')
    }
    return diary
}

const useDiaryUpdate = (): DiaryUpdate => {
    const updateDiary = useContext(DiaryUpdateContext)
    if (updateDiary === undefined) {
        throw new Error('useDiaryUpdate must be used within a <DiaryProvider>')
    }
    return updateDiary
}

const useDiary = (): [Diary[], DiaryUpdate] => {
    return [useDiaryValue(), useDiaryUpdate()]
}

export { DiaryProvider, useDiaryUpdate, useDiaryValue, useDiary }
