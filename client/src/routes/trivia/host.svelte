<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import Button from '$lib/button.svelte'
  import { teamName } from '$lib/stores'
  import { connect } from '~/helpers'
  import type { Question } from '~/types'

  let questionIndex = 0

  const socket = connect()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionIndex]

  let teams: string[] = []
  $: isHost = teams.indexOf($teamName || '') === 0

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: string[]) => {
    teams = users
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

<div class="p-4 flex flex-col gap-4">
  <p>
    <strong>Current quetsion:</strong>
    {question?.prompt}
  </p>
  <Button on:click={handleStartGame}>Start game</Button>
  <Button on:click={handleNext}>Go to next question</Button>
  <Button on:click={handleReset}>Reset game</Button>
</div>
