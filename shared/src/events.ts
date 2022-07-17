export enum TriviaEvents {
  AddUser = 'trivia--add user',
  GetUsers = 'trivia--get users',
  GetCurrentQuestionNumber = 'trivia--get current question number',
  GetQuestionData = 'trivia--get question data',
  StartGame = 'trivia--start game',
  ResetGame = 'trivia--reset game',
  NextQuestion = 'trivia--next question',
  SubmitAnswer = 'trivia--submit answer',
  GetGameResult = 'trivia--get game result',
}

export enum BuzzEvents {
  AddUser = 'buzz--add user',
  GetUsers = 'buzz--get users',
  StartGame = 'buzz--start game',
  ResetGame = 'buzz--reset game',
}

export enum GenericEvents {
  JoinRoom = 'join room',
  JoinedRoom = 'joined room',
  HostRoom = 'host room',
}
