var Analyzer = require('../../../index').analyzer;
var tokenize = require('../../support/tokenize');
var assert = require('assert');

describe('Analyzer ::', function() {
  describe('WHERE NOT IN statements', function() {
    it('should generate a valid group', function() {
      var tokens = tokenize({
        select: ['name'],
        from: 'users',
        where: {
          not: {
            id: {
              in: [1, 2, 3]
            }
          }
        }
      });

      var result = Analyzer(tokens);

      assert.deepEqual(result, [
        [
          { type: 'IDENTIFIER', value: 'SELECT' },
          { type: 'VALUE', value: 'name' }
        ],
        [
          { type: 'IDENTIFIER', value: 'FROM' },
          { type: 'VALUE', value: 'users' }
        ],
        [
          { type: 'IDENTIFIER', value: 'WHERE' },
          { type: 'CONDITION', value: 'NOT' },
          { type: 'KEY', value: 'id' },
          { type: 'CONDITION', value: 'IN' },
          { type: 'VALUE', value: [1, 2, 3] }
        ]
      ]);
    });

    it('should generate a valid group when in an OR statement', function() {
      var tokens = tokenize({
        select: ['name'],
        from: 'users',
        where: {
          or: [
            {
              not: {
                id: {
                  in: [1, 2, 3]
                }
              }
            },
            {
              not: {
                id: {
                  in: [4, 5, 6]
                }
              }
            }
          ]
        }
      });

      var result = Analyzer(tokens);

      assert.deepEqual(result, [
        [
          { type: 'IDENTIFIER', value: 'SELECT' },
          { type: 'VALUE', value: 'name' }
        ],
        [
          { type: 'IDENTIFIER', value: 'FROM' },
          { type: 'VALUE', value: 'users' }
        ],
        [
          { type: 'IDENTIFIER', value: 'WHERE' },
          [
            { type: 'CONDITION', value: 'NOT' },
            { type: 'KEY', value: 'id' },
            { type: 'CONDITION', value: 'IN' },
            { type: 'VALUE', value: [1, 2, 3] }
          ],
          [
            { type: 'CONDITION', value: 'NOT' },
            { type: 'KEY', value: 'id' },
            { type: 'CONDITION', value: 'IN' },
            { type: 'VALUE', value: [4, 5, 6] }
          ]
        ]
      ]);
    });
  });
});
