<script lang="ts">
  import { connect } from '~/helpers'
  import type { GameResult, Question } from '~/types'

  const socket = connect()
  let resultsByQuestionByTeam: GameResult
  let questions: Question[] | undefined
  let teams: string[] | undefined

  socket.on('get game result', (_results) => {
    resultsByQuestionByTeam = _results
    console.log('got game result', _results)
  })
  socket.emit('get game result')

  socket.on('get question data', (_questions) => {
    questions = _questions
    console.log('got questions', questions)
  })
  socket.emit('get question data')

  socket.on('get users', (users) => {
    teams = users
    console.log('got teams', teams)
  })
  socket.emit('get users')
</script>

{#if resultsByQuestionByTeam && questions && teams}
  <h1>Results</h1>
  <ul>
    {#each questions as question, questionIndex}
      <li>
        <strong>{question.prompt}:</strong>
        <ul>
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
