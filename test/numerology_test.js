var assert = require('assert'),
    chai = require('chai'),
    Numerology = require('../src/numerology');

suite('Numerology', function(){
    test('replaces all 9\'s by two tens', function() {

      let rules = [
        Numerology.NineReplaceByTwoTens  
      ];
      
      assert.equal('1,2,3,4,5,6,7,8,10,10,10', Numerology.regularize('1,2,3,4,5,6,7,8,9,10', rules));
    });

    test('replaces all 2\'s by ones as left number', function() {
      let rules = [
        Numerology.TwoReplacesByTheNumberOfLeftElements  
      ];

      assert.equal('3,1,1,1,3,4,5', Numerology.regularize('3,2,3,4,5', rules));
    });

    test('replaces all 6\'s by 3\'s as the number of right positions', function() {
        let rules = [
            Numerology.SixReplacesByTheNumberOfElementsOfRightByThree  
        ];

        assert.equal('1,3,3,3,3,4,5', Numerology.regularize('1,6,3,4,5', rules));
    })

    test('replaces all 3s for 5 if the it is not preceded by 5', function() {
        let rules = [
            Numerology.ThreeReplacesByFiveIfFiveIsNotTheNextNumber  
        ];

        assert.equal('3,5', Numerology.regularize('3,5', rules));
        assert.equal('5,15', Numerology.regularize('3,15', rules));
    });

     test('replaces all 4s for 3 if the it is not succed by 5', function() {
        let rules = [
            Numerology.FourReplacesByThreeIfFiveIsNotThePreviousNumber  
        ];

        assert.equal('5,4', Numerology.regularize('5,4', rules));
        assert.equal('15,3', Numerology.regularize('15,4', rules));
    });
});