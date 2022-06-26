<script lang="ts">
  import { goto } from '$app/navigation'

  import { getStores, navigating, page, session, updated } from '$app/stores'
  import Counter from '$lib/Counter.svelte'
  import { connect } from '~/helpers'
  import type { Question } from '~/types'

  const questionNumber = Number($page.params.questionNumber)

  const socket = connect()
  let questions: null | Question[] = null
  let question: Question | undefined
  $: question = questions?.[questionNumber - 1]

  socket.on('get current question number', (q) => {
    if (q !== questionNumber) {
      goto(`/question/${q}`)
    }
  })

  socket.emit('get current question number')

  socket.on('get question data', (questionData: Question[]) => {
    console.log('questionData', questionData)
    questions = questionData
  })
  socket.emit('get question data')
</script>

<div class="p-4">
  {#if question}
    <p class="mb-4">{question.question}</p>
    <div role="radiogroup" class="flex flex-col">
      {#each question.answers as answer}
        <label>
          <input type="radio" name="answer" value={answer} />
          {answer}
        </label>
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
