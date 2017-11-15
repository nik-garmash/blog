let {
  addToken,
  update,
  calculateTokenCharactersRange
} = require('../helpers')

const {
  TOKEN_ATTRIBUTE_VALUE_WRAPPER_START
} = require('../constants/token-types')
const {
  ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
  ATTRIBUTE_VALUE_WRAPPED_FACTORY
} = require('../constants/tokenizer-context-factories')

const syntaxHandlers = {
  wrapper (state, tokens, contextFactories, options) {
    let updatedState = state
    let updatedTokens = tokens
    const attributeValueWrappedContext = contextFactories[ATTRIBUTE_VALUE_WRAPPED_FACTORY](
      contextFactories,
      options
    )
    const range = calculateTokenCharactersRange(state, { keepBuffer: true })

    updatedTokens = addToken(tokens, {
      type: TOKEN_ATTRIBUTE_VALUE_WRAPPER_START,
      content: state.decisionBuffer,
      startPosition: range.startPosition,
      endPosition: range.endPosition
    })

    updatedState = update(state, {
      accumulatedContent: '',
      decisionBuffer: '',
      currentContext: attributeValueWrappedContext
    })

    return { updatedState, updatedTokens }
  }
}

function parseSyntax (chars, syntaxHandlers, contextFactories, options) {
  if (chars === options.wrapper) {
    return (state, tokens) => syntaxHandlers.wrapper(
      state,
      tokens,
      contextFactories,
      options
    )
  }
}

module.exports = function attributeValueWrappedStartContextFactory (
  contextFactories,
  options
) {
  return {
    factoryName: ATTRIBUTE_VALUE_WRAPPED_START_FACTORY,
    parseSyntax: (chars) => parseSyntax(
      chars,
      syntaxHandlers,
      contextFactories,
      options
    )
  }
}