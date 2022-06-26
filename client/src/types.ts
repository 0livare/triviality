export type Question = {
  prompt: string
  choices: string[]
  answer: number
}

export type QuestionResult = {
  expected: string | number
  received: string | number
  isCorrect: boolean
}

/** Where the key is the team name */
export type GameResult = Record<string, QuestionResult>[]
