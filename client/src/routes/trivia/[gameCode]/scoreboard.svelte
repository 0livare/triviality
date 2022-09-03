<script lang="ts">
  import { TriviaEvents } from 'triviality-shared'
  import cs from 'classnames'
  import { goto } from '$app/navigation'
  import { teamName, userId } from '$lib/stores'

  import { connect } from '~/helpers'
  import type { Question, User } from '~/types'

  const { socket } = connect()
  let teamsWithPoints: Array<{ id: string; points: number }>
  let questions: Question[] | undefined

  let participants: User[] | undefined

  socket.emit(TriviaEvents.GetUsers)
  socket.on(TriviaEvents.GetUsers, (users: User[]) => {
    participants = users
  })

  socket.on(TriviaEvents.GetGameResult, (pointsByTeam) => {
    const _teamsWithPoints = Object.keys(pointsByTeam).map((teamId) => ({
      id: teamId,
      points: pointsByTeam[teamId],
    }))

    teamsWithPoints = _teamsWithPoints.sort((t1, t2) => t2.points - t1.points)
  })
  socket.emit(TriviaEvents.GetGameResult)

  socket.on(TriviaEvents.GetQuestionData, (_questions) => {
    questions = _questions
  })
  socket.emit(TriviaEvents.GetQuestionData)

  socket.on(TriviaEvents.GetUsers, (users) => {
    participants = users
  })
  socket.emit(TriviaEvents.GetUsers)

  socket.on(TriviaEvents.ResetGame, () => {
    goto('/trivia')
  })
</script>

<div class="p-4 text-white">
  {#if teamsWithPoints && questions && participants}
    <h1 class="font-bold text-3xl mb-4 w-52">Results</h1>
    <ul class="py-2">
      {#each teamsWithPoints as teamWithScore}
        <li
          class={cs(
            $userId === teamWithScore.id && 'bg-white/20 rounded py-2 my-2',
            'flex justify-between px-2',
          )}
        >
          <strong>
            {participants.find((p) => p?.id === teamWithScore.id)?.teamName}:
          </strong>
          {teamWithScore.points}
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}

  <!-- {#if isHost}
    <Button on:click={resetGame} class="mt-16">Start a new game</Button>
  {/if} -->
</div>
