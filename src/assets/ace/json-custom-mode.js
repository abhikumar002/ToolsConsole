import * as ace from 'ace-builds/src-noconflict/ace';

ace.define('ace/mode/json_custom', ['require', 'exports', 'ace/lib/oop', 'ace/mode/json', 'ace/mode/text'], function(require, exports, oop, jsonMode, textMode) {
  'use strict';

  var CustomJsonMode = function() {
    jsonMode.Mode.call(this);
  };

  oop.inherits(CustomJsonMode, jsonMode.Mode);

  (function() {
    this.$id = 'ace/mode/json_custom';
    this.lineCommentStart = '//';
    this.blockComment = { start: '/*', end: '*/' };

    this.getTokenizer = function() {
      return {
        start: [
          { token: 'string.key.json', regex: /"[^"]*":/, next: 'value' },
          { token: 'string.value.json', regex: /"[^"]*"/ },
          { token: 'constant.language.json', regex: /\b(?:true|false|null)\b/ },
          { token: 'paren.lparen', regex: /[\[\{]/ },
          { token: 'paren.rparen', regex: /[\]\}]/ },
          { token: 'text', regex: /\s+/ }
        ],
        value: [
          { token: 'string.value.json', regex: /"[^"]*"/, next: 'start' },
          { token: 'constant.language.json', regex: /\b(?:true|false|null)\b/, next: 'start' },
          { token: 'paren.lparen', regex: /[\[\{]/, next: 'start' },
          { token: 'paren.rparen', regex: /[\]\}]/, next: 'start' },
          { token: 'text', regex: /\s+/ }
        ]
      };
    };
  }).call(CustomJsonMode.prototype);

  exports.Mode = CustomJsonMode;
});
