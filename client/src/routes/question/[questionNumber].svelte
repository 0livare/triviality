<script lang="ts">
  import { goto } from '$app/navigation'

  import { page } from '$app/stores'
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

  socket.emit('get users')
  socket.on('get users', (users: string[]) => {
    teams = users
  })

  socket.on('get current question number', (q) => {
    if (answer) {
      socket.emit('submit answer', $teamName, questionNumber, answer)
    }

    if (q == null) {
      goto('/scoreboard')
    } else if (q !== questionNumber) {
      window.location.href = `/question/${q}`
    }
  })

  socket.emit('get current question number')

  socket.on('get question data', (questionData: Question[]) => {
    console.log('questionData', questionData)
    questions = questionData
  })
  socket.emit('get question data')

  function handleNext() {
    socket.emit('next question')
  }
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
    <button
      on:click={handleNext}
      class="p-4 border border-purple-500 mt-4 hover:bg-purple-200 hover:dark:bg-purple-900"
      >Go to next question</button
    >
  {/if}
</div>
