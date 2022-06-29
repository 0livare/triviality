<script lang="ts">
  import { goto } from '$app/navigation'

  import { page } from '$app/stores'
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

  socket.emit('get users')
  socket.on('get users', (users: string[]) => {
    teams = users
  })

  socket.on('get current question number', (questionNumber) => {
    questionIndex = questionNumber - 1
  })

  socket.emit('get current question number')

  socket.on('get question data', (questionData: Question[]) => {
    questions = questionData
  })
  socket.emit('get question data')

  function handleNext() {
    socket.emit('next question')
  }

  function handleReset() {
    socket.emit('reset game')
  }

  function handleStartGame() {
    socket.emit('start game')
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
