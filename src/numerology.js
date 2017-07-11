class Rule {
    constructor(condition, callback) {
        this.condition = condition
        this.callback = callback
    }

    acomplishCondition() {
        return this.condition(...arguments);
    }

    executeCallback() {
        return this.callback(...arguments);
    }
}

function generateArray(value, length) {
    let array = [];

    for(let i = 0; i < length; i++) {
        array.push(value);
    }
    
    return array;
}

let NineReplaceByTwoTens = new Rule(
    number => {
        return number === 9; 
    },
    (index, numbers) => {
        return generateArray(10, 2);
    }
);

let TwoReplacesByTheNumberOfLeftElements = new Rule(
    number => {
        return number === 2
    },
    (index, numbers) => {
        let numElements = parseInt(numbers[index-1]);
        return generateArray(1, numElements);
    }
)

let SixReplacesByTheNumberOfElementsOfRightByThree = new Rule(
    number => {
        return number === 6
    },
    (index, numbers) => {
        let numElements = numbers.length - (index + 1);
        return generateArray(3, numElements);
    }
);

let ThreeReplacesByFiveIfFiveIsNotTheNextNumber = new Rule(
    (number, index, numbers) => {
        return (number === 3 && parseInt(numbers[index + 1]) !== 5);
    },
    () => (5)
);

let FourReplacesByThreeIfFiveIsNotThePreviousNumber = new Rule(
    (number, index, numbers) => {
        return (number === 4 && parseInt(numbers[index - 1]) !== 5);
    },
    () => (3)
);

function regularize(numbers, rules) {
    let numbersArray = numbers.split(',');
    let numbersList = numbersArray.map(function(element, index) {
        number = parseInt(element)
        // if (number === 9) {
        //     return generateArray(10, 2);
        // }

        // if (number === 2) {
        //     let numElements = parseInt(numbersArray[index-1]);
        //     return generateArray(1, numElements);
        // }

        // if (number === 6) {
        //     let numElements = numbersArray.length - (index + 1);
        //     return generateArray(3, numElements);
        // }
        // console.log(rules);
        
        for ( ruleIndex in rules ) {
            if (rules[ruleIndex].acomplishCondition(number, index, numbersArray)) {
                return rules[ruleIndex].executeCallback(index, numbersArray)
            }
        }
        return number;
    });
    
    return [].concat(...numbersList).join(',');
}

module.exports = {
    regularize,
    NineReplaceByTwoTens,
    TwoReplacesByTheNumberOfLeftElements,
    SixReplacesByTheNumberOfElementsOfRightByThree,
    ThreeReplacesByFiveIfFiveIsNotTheNextNumber,
    FourReplacesByThreeIfFiveIsNotThePreviousNumber
}