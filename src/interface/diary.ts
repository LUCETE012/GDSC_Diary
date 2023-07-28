export type Diary = {
    id: string
    date: Date
    title: string
    content: string
    emotion: 'bad' | 'soso' | 'good' | 'great' | 'awesome'
    weather: 'sunny' | 'cloud' | 'rain' | 'snow'
    views: number
}
