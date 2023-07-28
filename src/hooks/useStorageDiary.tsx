'use client'

import { useEffect, useMemo, useState } from 'react'
import { useDiaryUpdate } from '~/hooks/Diary'
import { localStorage } from '~/utils/locastorage'
import { DIARY_STORAGE_KEY } from '../constants'
import { Diary } from '../interface/diary'

const updateStorageDiary = (diary: Diary[]) => localStorage.set(DIARY_STORAGE_KEY, diary)
export const useStorageDiary = () => {
    const setDiary = useDiaryUpdate()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const diaryActions = useMemo(
        () => ({
            remove: (removeId: string) => {
                setDiary((prev) => {
                    const removedDiary = prev.filter(({ id }) => id !== removeId)
                    if (mounted) updateStorageDiary(removedDiary)
                    return removedDiary
                })
            },
            add: (newDiary: Omit<Diary, 'views'>) => {
                const initialView = 1
                if (mounted) {
                    setDiary((prev) => {
                        const withViews = { ...newDiary, views: initialView }
                        const updatedDiary = [...prev, withViews]
                        updateStorageDiary(updatedDiary)
                        return updatedDiary
                    })
                }
            },
            update: (updateId: string, updateDiary: Diary) => {
                if (mounted) {
                    setDiary((prev) => {
                        const targetDiary = prev.find(({ id }) => id === updateId)
                        if (!targetDiary) return prev

                        const updatedDiary = prev.map((diary) => (diary.id === updateId ? updateDiary : diary))
                        updateStorageDiary(updatedDiary)
                        return updatedDiary
                    })
                }
            },
        }),
        []
    )

    return diaryActions
}
