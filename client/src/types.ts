export type Question = {
  prompt: string
  choices: string[]
  answer: string
}

export type QuestionResult = {
  expected: string | number
  received: string | number
  isCorrect: boolean
}

/** Where the key is the team name */
export type GameResult = Record<string, QuestionResult>[]

export type User = {
  id: string
  teamName: string
}
