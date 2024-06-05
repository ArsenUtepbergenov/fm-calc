import './styles.css'

const container = document.getElementById('container')

const numbers = document.querySelectorAll('.number')
const outputText = document.getElementById('output-text')
const plusKey = document.getElementById('plus')
const minusKey = document.getElementById('minus')
const delKey = document.getElementById('del')
const dotKey = document.getElementById('dot')
const divisionKey = document.getElementById('division')
const multiplicationKey = document.getElementById('multiplication')
const resetKey = document.getElementById('reset')
const resultKey = document.getElementById('result')
const bufferText = document.getElementById('buffer')

let buffer = ''
let operation = ''
let secondOperand = ''
let isError = false

multiplicationKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'multiplication')) return
  if (possibleCalc()) result()

  saveBufferAndOperation('*')
  addBufferText()
})

divisionKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'division')) return
  if (possibleCalc()) result()

  saveBufferAndOperation('/')
  addBufferText()
})

minusKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'minus')) return
  if (possibleCalc()) result()

  saveBufferAndOperation('-')
  addBufferText()
})

plusKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'plus')) return
  if (possibleCalc()) result()

  saveBufferAndOperation('+')
  addBufferText()
})

delKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'del')) return

  del()
})

dotKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'dot')) return
  if (hasDot()) return

  outputText.innerHTML += '.'
  if (!emptyBuffer()) secondOperand += '.'
})

numbers.forEach(node => {
  node.addEventListener('click', ({ target }) => {
    if (checkNodeKey(target, 'number')) return
    if (isError) reset()

    if (!emptyBuffer()) {
      secondOperand += target.innerHTML
      outputText.innerHTML = secondOperand
      return
    }

    outputText.innerHTML += target.innerHTML
  })
})

resultKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'result')) return
  if (!possibleCalc()) return

  result()

  return
})

resetKey.addEventListener('click', ({ target }) => {
  if (checkNodeKey(target, 'reset')) return

  reset()

  return
})

function possibleCalc() {
  if (emptyBuffer() || !hasOperation() || !hasSecondOperand()) return false
  return true
}

function checkNodeKey(target, key) {
  return target.tagName === 'DIV' && !target.classList.contains(key)
}

function addBufferText() {
  bufferText.innerHTML = `${buffer} ${operation}`
}

function dotAtEnd() {
  if (!hasDot()) return false

  return outputText.innerHTML.endsWith('.')
}

function hasDot() {
  return outputText.innerHTML.includes('.')
}

function hasSecondOperand() {
  return secondOperand !== ''
}

function hasOperation() {
  return operation !== ''
}

function emptyBuffer() {
  return buffer === ''
}

function add(a, b) {
  return Number.parseFloat(a) + Number.parseFloat(b)
}

function divide(a, b) {
  if (Number.parseFloat(b) === 0) {
    isError = true
    disableOperations()
    return 'Error: division by zero'
  }

  return Number.parseFloat(a) / Number.parseFloat(b)
}

function subtract(a, b) {
  return Number.parseFloat(a) - Number.parseFloat(b)
}

function multiply(a, b) {
  return Number.parseFloat(a) * Number.parseFloat(b)
}

function reset() {
  clear()
  outputText.innerHTML = ''
  bufferText.innerHTML = ''
  undisableOperations()
  isError = false
}

function del() {
  if (isError) {
    reset()
    return
  }

  let temp = outputText.innerHTML

  if (temp === '') return

  outputText.innerHTML = temp.slice(0, temp.length - 1)
  if (!emptyBuffer()) secondOperand = outputText.innerHTML
}

function result() {
  if (isError) {
    reset()
    return
  }

  switch (operation) {
    case '+':
      outputText.innerHTML = add(buffer, outputText.innerHTML)
      break
    case '-':
      outputText.innerHTML = subtract(buffer, outputText.innerHTML)
      break
    case '/':
      outputText.innerHTML = divide(buffer, outputText.innerHTML)
      break
    case '*':
      outputText.innerHTML = multiply(buffer, outputText.innerHTML)
      break
  }

  clear()
  bufferText.innerHTML = ''
}

function clear() {
  buffer = ''
  operation = ''
  secondOperand = ''
}

function saveBufferAndOperation(o) {
  operation = o
  buffer = outputText.innerHTML
}

for (let elem of document.querySelectorAll('input[type="radio"][name="theme"]')) {
  elem.addEventListener('input', event => {
    switch (event.target.value) {
      case '1':
        removeClass(container, 'theme-2')
        removeClass(container, 'theme-3')
        addClass(container, 'theme-1')
        break
      case '2':
        removeClass(container, 'theme-1')
        removeClass(container, 'theme-3')
        addClass(container, 'theme-2')
        break
      case '3':
        removeClass(container, 'theme-1')
        removeClass(container, 'theme-2')
        addClass(container, 'theme-3')
        break
    }
  })
}

function disableOperations() {
  addClass(plusKey, 'disable')
  addClass(minusKey, 'disable')
  addClass(multiplicationKey, 'disable')
  addClass(divisionKey, 'disable')
  addClass(dotKey, 'disable')
}

function undisableOperations() {
  removeClass(plusKey, 'disable')
  removeClass(minusKey, 'disable')
  removeClass(multiplicationKey, 'disable')
  removeClass(divisionKey, 'disable')
  removeClass(dotKey, 'disable')
}

function removeClass(node, _class = '') {
  node.classList.remove(_class)
}

function addClass(node, _class = '') {
  node.classList.add(_class)
}
