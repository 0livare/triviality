<script lang="ts">
  import { goto } from '$app/navigation'
  import Button from '$lib/button.svelte'
  import { teamName } from '$lib/stores'

  import { connect } from '~/helpers'
  import type { GameResult, Question } from '~/types'

  const socket = connect()
  let resultsByQuestionByTeam: GameResult
  let questions: Question[] | undefined
  let teams: string[] | undefined
  $: isHost = teams?.indexOf($teamName || '') === 0

  socket.emit('get users')
  socket.on('get users', (users: string[]) => {
    teams = users
  })

  socket.on('get game result', (_results) => {
    resultsByQuestionByTeam = _results
  })
  socket.emit('get game result')

  socket.on('get question data', (_questions) => {
    questions = _questions
  })
  socket.emit('get question data')

  socket.on('get users', (users) => {
    teams = users
  })
  socket.emit('get users')

  socket.on('reset game', () => {
    goto('/')
  })
  function resetGame() {
    socket.emit('reset game')
  }
</script>

<div class="p-4">
  {#if resultsByQuestionByTeam && questions && teams}
    <h1 class="font-bold text-3xl mb-4">Results</h1>
    <ul>
      {#each questions as question, questionIndex}
        <li class="my-10">
          <strong>{question.prompt}</strong>
          <ul class="list-disc ml-8 py-2">
            {#each teams as teamName}
              <li>
                <strong>{teamName}:</strong>
                {resultsByQuestionByTeam[questionIndex][teamName]?.received || '-'}
                {resultsByQuestionByTeam[questionIndex][teamName]?.isCorrect ? '✅' : '❌'}
              </li>
            {/each}
          </ul>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}

  {#if isHost}
    <Button on:click={resetGame} class="mt-16">Start a new game</Button>
  {/if}
</div>
