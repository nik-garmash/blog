const {
  TOKEN_TEXT,
  TOKEN_OPEN_TAG_START,
  TOKEN_OPEN_TAG_END,
  TOKEN_CLOSE_TAG
} = require('../../../../lib/constants/token-types')

module.exports = [
  {
    type: TOKEN_TEXT,
    content: 'opening text\n\n',
    startPosition: 0,
    endPosition: 13
  },
  {
    type: TOKEN_OPEN_TAG_START,
    content: '<div'
  },
  {
    type: TOKEN_OPEN_TAG_END,
    content: '>'
  },
  {
    type: TOKEN_CLOSE_TAG,
    content: '</div>'
  },
  {
    type: TOKEN_TEXT,
    content: '\n\nclosing text\n',
    startPosition: 25,
    endPosition: 39
  }
]