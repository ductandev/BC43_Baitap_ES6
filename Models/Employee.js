import { Person } from "./Person.js";

export class Employee extends Person {
    dayWorking = '';
    dailyWage = '';
    salary() {
        let resultSalary = this.dayWorking * this.dailyWage
        return resultSalary;
    }
}