<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Button from '$lib/button.svelte'
  import { teamName } from '$lib/stores'
  import { connectToTriviaGame, determineHost } from '~/helpers'
  import type { Question, User } from '~/types'

  let questionNumber = -1
  const gameCode = $page.params.gameCode

  const socket = connectToTriviaGame()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionNumber - 1]

  let answer: string
  let participants: User[] = []
  $: isHost = determineHost(participants)

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: User[]) => {
    participants = users
  })

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    if (answer && q !== questionNumber) {
      socket.emit(TriviaEvents.SubmitAnswer, $teamName, questionNumber, answer)
    }

    if (q == null) {
      goto(`/trivia/${gameCode}/scoreboard`)
    } else {
      // window.location.href = `/trivia/${gameCode}/question/${q}`
      questionNumber = q
      answer = ''
    }
  })

  socket.emit(TriviaEvents.GetCurrentQuestionNumber)

  socket.on(TriviaEvents.GetQuestionData, (questionData: Question[]) => {
    questions = questionData
  })
  socket.emit(TriviaEvents.GetQuestionData)

  function handleNext() {
    socket.emit(TriviaEvents.NextQuestion)
  }

  socket.on(TriviaEvents.ResetGame, () => {
    goto('/trivia')
  })
</script>

<div class="p-4">
  {#if question}
    <p class="mb-4">{question.prompt}</p>
    <div role="radiogroup" class="flex flex-col">
      {#each question.choices as choice}
        <label>
          <input type="radio" bind:group={answer} name="answer" value={choice} />
          {choice}
        </label>
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}

  {#if answer && isHost}
    <Button on:click={handleNext}>Go to next question</Button>
  {/if}
</div>
