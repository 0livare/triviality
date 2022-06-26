<script>
  import { getStores, navigating, page, session, updated } from '$app/stores'
  import { connect } from '~/helpers'

  console.log('page', page)

  const socket = connect()

  socket.on('get current question number', (questionNumber) => {
    console.log('current question number is: ', questionNumber)
  })

  socket.emit('get current question number')
</script>

<p>Show a question here!</p>
