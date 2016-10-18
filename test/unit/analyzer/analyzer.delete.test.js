var Analyzer = require('../../../index').analyzer;
var tokenize = require('../../support/tokenize');
var assert = require('assert');

describe('Analyzer ::', function() {
  describe('DELETE statements', function() {
    it('should generate a valid group for DELETE statements', function() {
      var tokens = tokenize({
        del: true,
        from: 'accounts',
        where: {
          activated: false
        }
      });

      var result = Analyzer(tokens);

      assert.deepEqual(result, [
        [
          { type: 'IDENTIFIER', value: 'DELETE' }
        ],
        [
          { type: 'IDENTIFIER', value: 'FROM' },
          { type: 'VALUE', value: 'accounts' }
        ],
        [
          { type: 'IDENTIFIER', value: 'WHERE' },
          { type: 'KEY', value: 'activated' },
          { type: 'VALUE', value: false }
        ]
      ]);
    });
  });
});
