<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Button from '$lib/button.svelte'
  import { userId } from '$lib/stores'
  import { connectToTriviaGame } from '~/helpers'
  import type { Question, User } from '~/types'
  import CorrectAnswerPopup from '$lib/correct-answer-popup.svelte'
  import cs from 'classnames'

  let questionNumber = -1
  const gameCode = $page.params.gameCode

  const socket = connectToTriviaGame()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionNumber - 1]

  let isSubmitted = false
  let previousAnswer: { forNumber: number; answer: string }
  let answer: string
  let participants: User[] = []

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: User[]) => {
    participants = users
  })

  socket.on(TriviaEvents.GetCurrentQuestionNumber, (q) => {
    if (answer && q !== questionNumber) {
      socket.emit(TriviaEvents.SubmitAnswer, {
        userId: $userId,
        questionNumber,
        answer,
      })

      isSubmitted = false
    }

    previousAnswer = {
      forNumber: questionNumber,
      answer,
    }

    if (q == null) {
      setTimeout(() => {
        goto(`/trivia/${gameCode}/scoreboard`)
      }, 3000)
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

  socket.on(TriviaEvents.ResetGame, () => {
    goto('/trivia')
  })

  socket.on(
    TriviaEvents.GetIsSubmitted,
    ({ isSubmitted: submitted, answer: _answer }: any) => {
      isSubmitted = submitted
      answer = _answer
    },
  )
  socket.emit(TriviaEvents.GetIsSubmitted, { userId: $userId })

  function handleNext() {
    socket.emit(TriviaEvents.NextQuestion)
  }

  function handleSubmit() {
    if (!answer) return
    isSubmitted = true
    socket.emit(TriviaEvents.SubmitAnswer, {
      userId: $userId,
      questionNumber,
      answer,
    })
  }
</script>

<div class="p-4 text-center text-white">
  {#if question}
    <p class="text-sm text-center mb-4">
      Question {questionNumber}
    </p>
    <p class=" text-4xl font-bold mb-12">{question.prompt}</p>
    <div role="radiogroup" class="flex flex-col">
      {#each question.choices as choice}
        <label
          class={cs(
            'w-64 text-left mx-auto p-4 my-2 border border-white/50  cursor-pointer ',
            answer === choice ? 'bg-white/30' : 'hover:bg-white/10',
          )}
        >
          <input
            type="radio"
            bind:group={answer}
            name="answer"
            value={choice}
            disabled={isSubmitted}
            class="mr-8 peer"
          />
          {choice}
        </label>
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}

  <Button on:click={handleSubmit} class="mt-8" disabled={isSubmitted}>
    Submit
  </Button>

  <!-- {#if answer && isHost}
    <Button on:click={handleNext} class="mt-8">Go to next question</Button>
  {/if} -->
</div>

<CorrectAnswerPopup
  correctAnswer={questions?.[previousAnswer?.forNumber - 1]?.answer}
  theirAnswer={previousAnswer?.answer}
/>

<style>
</style>
