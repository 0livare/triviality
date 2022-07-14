const CODE_LENGTH = 4

function generateGameCode(existingCameCodes) {
  let chars = []
  for (let i = 0; i < CODE_LENGTH; ++i) {
    chars.push(generateGameCodeChar())
  }

  let gameCode = chars.join('')
  let codeAlreadyInUse = existingCameCodes?.includes(gameCode)
  return codeAlreadyInUse ? generateGameCode(existingCameCodes) : gameCode
}

let validChars = generateValidChars()
function generateGameCodeChar() {
  let randomIndex = Math.floor(Math.random() * validChars.length)
  return validChars[randomIndex]
}

function generateValidChars() {
  const letters = getNextChars('A', 25)
  let numbers = getNextChars('0', 9)
  let validChars = [...numbers, ...letters]

  let ambiguousChars = ['0', '1', 'I', 'L', 'O', 'Q', 'U', 'V']
  ambiguousChars.forEach((char) => {
    validChars.splice(validChars.indexOf(char), 1)
  })

  return validChars

  function getNextChars(char, count) {
    let chars = [char]
    let start = char.charCodeAt(0)

    for (let i = 1; i <= count; ++i) {
      let nextChar = String.fromCharCode(start + i)
      chars.push(nextChar)
    }
    return chars
  }
}

module.exports = generateGameCode
