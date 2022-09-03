<script lang="ts">
  import { GenericEvents, TriviaEvents } from 'triviality-shared'
  import Button from '$lib/button.svelte'
  import { teamName } from '$lib/stores'
  import { connect, determineHost } from '~/helpers'
  import type { Question, User } from '~/types'
  import { v4 as uuid } from 'uuid'
  import { page } from '$app/stores'

  let questionIndex = 0

  const gameCode = $page.params.gameCode
  const { socket } = connect()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionIndex]

  let participants: User[] = []

  socket.emit(GenericEvents.JoinRoom, {
    teamName: 'host',
    gameCode,
    userId: uuid(),
  })

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: User[]) => {
    participants = users
  })

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (questionNumber) => {
    questionIndex = questionNumber - 1
  })

  socket.emit(TriviaEvents.GetCurrentQuestionNumber)

  socket.on(TriviaEvents.GetQuestionData, (questionData: Question[]) => {
    questions = questionData
  })
  socket.emit(TriviaEvents.GetQuestionData)

  function handleNext() {
    socket.emit(TriviaEvents.NextQuestion)
  }

  function handleReset() {
    socket.emit(TriviaEvents.ResetGame)
  }

  function handleStartGame() {
    socket.emit(TriviaEvents.StartGame)
  }
</script>

<div class="p-4 flex flex-col gap-4 text-white">
  <p>
    <strong>Current quetsion:</strong>
    {question?.prompt}
  </p>
  <Button on:click={handleStartGame}>Start game</Button>
  <Button on:click={handleNext}>Go to next question</Button>
  <Button on:click={handleReset}>Reset game</Button>
</div>
