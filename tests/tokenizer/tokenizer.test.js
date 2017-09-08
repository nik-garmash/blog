const fs = require('fs')
const test = require('tape')

const tokenize = require('../../lib/tokenize')

const testCases = {
  'Opening and closing text': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/opening-closing-text.html'), 'utf8'),
    output: require('./stubs/outputs/opening-closing-text')
  },
  'Nested tags': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/nested-tags.html'), 'utf8'),
    output: require('./stubs/outputs/nested-tags')
  },
  'Custom elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/custom-elements.html'), 'utf8'),
    output: require('./stubs/outputs/custom-elements')
  },
  'Script elements': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/script-elements.html'), 'utf8'),
    output: require('./stubs/outputs/script-elements')
  },
  'Attributes (quotes)': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/attributes-quote.html'), 'utf8'),
    output: require('./stubs/outputs/attributes-quote')
  },
  'Script elements attributes (quotes)': {
    input: fs.readFileSync(require.resolve('./stubs/inputs/script-elements-attributes-quote.html'), 'utf8'),
    output: require('./stubs/outputs/script-elements-attribute-quote')
  }
}

test('Tokenizer Syntax', (t) => {
  Object.keys(testCases).forEach((testCaseKey) => {
    const testCase = testCases[testCaseKey]
    const { tokens } = tokenize(testCase.input)

    t.deepEqual(tokens, testCase.output, testCaseKey)
  })

  t.end()
})

