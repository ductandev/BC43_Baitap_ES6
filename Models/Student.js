import { Person } from "./Person.js";

export class Student extends Person {
    scoreMath = '';
    scorePhysics = '';
    scoreChemistry = '';
    averageScore() {
        let resultAverageScore = (Number(this.scoreMath) + Number(this.scorePhysics) + Number(this.scoreChemistry)) / 3
        return resultAverageScore;
    }
}