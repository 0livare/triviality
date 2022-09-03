<script lang="ts">
  import { GenericEvents, TriviaEvents } from 'triviality-shared'
  import Button from '$lib/button.svelte'
  import { goto } from '$app/navigation'
  import { teamName } from '$lib/stores'
  import { connect, determineHost } from '~/helpers'
  import type { Question, User } from '~/types'
  import { v4 as uuid } from 'uuid'
  import { page } from '$app/stores'

  let questionIndex: number | null = null

  const gameCode = $page.params.gameCode
  const { socket } = connect()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionIndex!]

  let participants: User[] = []
  let submitCount = 0

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
    if (questionNumber != null) {
      questionIndex = questionNumber - 1
    } else {
      questionIndex = null
    }
  })
  socket.emit(TriviaEvents.GetCurrentQuestionNumber)

  socket.on(TriviaEvents.GetQuestionData, (questionData: Question[]) => {
    questions = questionData
  })
  socket.emit(TriviaEvents.GetQuestionData)

  socket.on(TriviaEvents.SubmitCount, (_submitCount) => {
    console.log('_submitCount', _submitCount)
    submitCount = _submitCount
  })

  function handleNext() {
    socket.emit(TriviaEvents.NextQuestion)
    setTimeout(() => {
      submitCount = 0
    }, 250)
  }

  function handleReset() {
    socket.emit(TriviaEvents.ResetGame)
  }

  function handleStartGame() {
    socket.emit(TriviaEvents.StartGame)
  }
</script>

<div class="p-4 flex flex-col gap-4 text-white">
  {#if questionIndex != null}
    <p>
      <strong>Current quetsion:</strong>
      {question?.prompt}
    </p>

    <p>{submitCount}/{participants.length} submitted</p>
  {/if}

  {#if questionIndex == null}
    <Button on:click={handleStartGame}>Start game</Button>
  {/if}

  {#if questionIndex != null}
    <Button on:click={handleNext}>Go to next question</Button>
  {/if}

  <Button on:click={handleReset} class="mt-8">Reset game</Button>
  <Button href={`/trivia/${gameCode}/scoreboard`}>Go to scoreboard</Button>
</div>
