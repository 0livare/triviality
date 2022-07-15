<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Button from '$lib/button.svelte'
  import { teamName } from '$lib/stores'
  import { connect } from '~/helpers'
  import type { Question } from '~/types'

  const questionNumber = Number($page.params.questionNumber)

  const socket = connect()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionNumber - 1]

  let answer: string
  let teams: string[] = []
  $: isHost = teams.indexOf($teamName || '') === 0

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: string[]) => {
    teams = users
  })

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    if (answer) {
      socket.emit(TriviaEvents.SubmitAnswer, $teamName, questionNumber, answer)
    }

    if (q == null) {
      goto('/trivia/scoreboard')
    } else if (q !== questionNumber) {
      window.location.href = `/trivia/question/${q}`
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
