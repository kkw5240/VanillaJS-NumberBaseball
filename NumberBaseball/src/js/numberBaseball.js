;'use strict';

export default class NumberBaseball {
    constructor() {
        this.candidates = [];

        for (let i=1; i<10; i++) {
            for (let j=1; j<10; j++) {
                for (let k=1; k<10; k++) {
                    if (i === j || j === k || i === k) continue;
                    this.candidates.push(`${i}${j}${k}`);
                }
            }
        }
    }

    playInningWith(inningData) {
        this.candidates = this.candidates.filter((candidate, index) => {
            if (Array.isArray(inningData)) {
                return inningData.map(({numbers, strikeCount, ballCount}) => {
                    let checkedStrikeCount = this.checkStrike(numbers, candidate);
                    let checkedBallCount = this.checkBall(numbers, candidate) - checkedStrikeCount;

                    return ballCount === checkedBallCount && strikeCount === checkedStrikeCount;

                }).every(v => v === true);

            } else {
                let {numbers, strikeCount, ballCount} = inningData;
                let checkedStrikeCount = this.checkStrike(numbers, candidate);
                let checkedBallCount = this.checkBall(numbers, candidate) - checkedStrikeCount;

                return ballCount === checkedBallCount && strikeCount === checkedStrikeCount;
            }

        });
        console.log(this.candidates);

        return this.candidates;
    }

    checkBall(numbers, candidate) {
        let ballCount = 0;

        candidate.split('').forEach(v => {
            const ballCountRegExp = new RegExp(v, 'gi');
            ballCount += ballCountRegExp.test('' + numbers);
        });

        return ballCount;
    }

    checkStrike(numbers, candidate) {
        let strikeCount = 0;

        candidate.split('').forEach((v, i) => {
            strikeCount += (''+numbers).split('')[i] === v;
        })

        return strikeCount;
    }
}

