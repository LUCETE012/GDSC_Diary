export const localStorage = {
    set: <T>(id: string, value: T) => {
        const stringifyValue = JSON.stringify(value)
        if (typeof window !== 'undefined') window.localStorage.setItem(id, stringifyValue)
    },
    get: <T>(id: string): T | null => {
        if (typeof window !== 'undefined') {
            const value = window.localStorage.getItem(id)
            if (value) {
                return JSON.parse(value) as T
            }
            return null
        }
        return null
    },
    reset: () => {
        if (typeof window !== 'undefined') window.localStorage.clear()
    },
}
