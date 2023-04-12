import { Customer } from "./Customer.js";
import { Employee } from "./Employee.js";
import { Student } from "./Student.js";

export class ListPerson {
    listStudent = [];
    listEmployee = [];
    listCustomer = [];

    addStudent(student) {
        this.listStudent.push(student);
    }
    addEmployee(employee) {
        this.listEmployee.push(employee);
    }
    addCustomer(customer) {
        this.listCustomer.push(customer);
    }

    renderTableStudent(selectorTbodyStudent, tableStudent) {
        let htmlContentStudent = '';
        for (let student of this.listStudent) {
            let studentNew = new Student();
            // merge object store
            Object.assign(studentNew, student);

            htmlContentStudent += `
                <tr>
                    <td>${studentNew.name}</td>
                    <td>${studentNew.address}</td>
                    <td class="text-center">${studentNew.code}</td>
                    <td>${studentNew.email}</td>
                    <td class="text-center">${studentNew.scoreMath}</td>
                    <td class="text-center">${studentNew.scorePhysics}</td>
                    <td class="text-center">${studentNew.scoreChemistry}</td>
                    <td class="text-center">${studentNew.averageScore().toLocaleString()}</td>
                    <td class="text-center">
                        <button class="btn btn-danger" onclick="deleteStudent('${studentNew.code}')">X</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary" onclick="editStudent('${studentNew.code}')"><i class="fa fa-edit"></i></button>
                    </td>
                </tr>`;
        }

        document.querySelector(selectorTbodyStudent).innerHTML = htmlContentStudent;
        document.querySelector(tableStudent).click();
        return htmlContentStudent;
    }

    renderTableEmployee(selectorTbodyEmployee, tableEmployee) {
        let htmlContentEmployee = '';
        for (let employee of this.listEmployee) {
            let employeeNew = new Employee();
            // merge object store
            Object.assign(employeeNew, employee);

            htmlContentEmployee += `
                <tr>
                    <td>${employeeNew.name}</td>
                    <td>${employeeNew.address}</td>
                    <td class="text-center">${employeeNew.code}</td>
                    <td>${employeeNew.email}</td>
                    <td class="text-center">${employeeNew.dayWorking}</td>
                    <td class="text-center">${employeeNew.dailyWage}</td>
                    <td class="text-center">${employeeNew.salary()}</td>
                    <td class="text-center">
                        <button class="btn btn-danger" onclick="deleteEmployee('${employeeNew.code}')">X</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary" onclick="editEmployee('${employeeNew.code}')"><i class="fa fa-edit"></i></button>
                    </td>
                </tr>`;
        }

        document.querySelector(selectorTbodyEmployee).innerHTML = htmlContentEmployee;
        document.querySelector(tableEmployee).click();
        return htmlContentEmployee;
    }


    renderTableCustomer(selectorTbodyCustomer, tableCustomer) {
        let htmlContentCustomer = '';
        for (let customer of this.listCustomer) {
            let customerNew = new Customer();
            Object.assign(customerNew, customer);

            htmlContentCustomer += `
                <tr>
                    <td>${customerNew.name}</td>
                    <td>${customerNew.address}</td>
                    <td class="text-center">${customerNew.code}</td>
                    <td>${customerNew.email}</td>
                    <td class="text-center">${customerNew.nameCompany}</td>
                    <td class="text-center">${customerNew.invoiceValue}</td>
                    <td class="text-center">${customerNew.evaluate}</td>
                    <td class="text-center">
                        <button class="btn btn-danger" onclick="deleteCustomer('${customerNew.code}')">X</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-primary" onclick="editCustomer('${customerNew.code}')"><i class="fa fa-edit"></i></button>
                    </td>                    
                </tr>`;
        }

        document.querySelector(selectorTbodyCustomer).innerHTML = htmlContentCustomer;
        document.querySelector(tableCustomer).click();
        return htmlContentCustomer;
    }

    // -------------SAVE LOCAL STORAGE-----------------------
    saveLocalStoreListStudent() {
        let stringStudent = JSON.stringify(this.listStudent)
        localStorage.setItem('Student', stringStudent);
    }
    saveLocalStoreListEmployee() {
        let stringEmployee = JSON.stringify(this.listEmployee)
        localStorage.setItem('Employee', stringEmployee);
    }
    saveLocalStoreListCustomer() {
        let stringCustomer = JSON.stringify(this.listCustomer)
        localStorage.setItem('Customer', stringCustomer);
    }


    getLocalStoreListStudent() {
        if (localStorage.getItem('Student')) {
            let stringStudent = localStorage.getItem('Student');
            this.listStudent = JSON.parse(stringStudent)
        }
    }
    getLocalStoreListEmployee() {
        if (localStorage.getItem('Employee')) {
            let stringEmployee = localStorage.getItem('Employee');
            this.listEmployee = JSON.parse(stringEmployee)
        }
    }
    getLocalStoreListCustomer() {
        if (localStorage.getItem('Customer')) {
            let stringCustomer = localStorage.getItem('Customer');
            this.listCustomer = JSON.parse(stringCustomer)
        }
    }

    // --------------------DELETE-----------------------------
    deleteStudent(code) {
        for (let index in this.listStudent) {
            if (this.listStudent[index].code === code) {
                this.listStudent.splice(index, 1);
                break;
            }
        }
    }
    deleteEmployee(code) {
        for (let index in this.listEmployee) {
            if (this.listEmployee[index].code === code) {
                this.listEmployee.splice(index, 1);
                break;
            }
        }
    }
    deleteCustomer(code) {
        for (let index in this.listCustomer) {
            if (this.listCustomer[index].code === code) {
                this.listCustomer.splice(index, 1);
                break;
            }
        }
    }

    // --------------------GET INFO-----------------------------
    getInfoStudent(code) {
        for (let student of this.listStudent) {
            if (student.code === code) {
                return student;
            }
        }
        return undefined;
    }

    getInfoEmployee(code) {
        for (let employee of this.listEmployee) {
            if (employee.code === code) {
                return employee;
            }
        }
        return undefined;
    }

    getInfoCustomer(code) {
        for (let customer of this.listCustomer) {
            if (customer.code === code) {
                return customer;
            }
        }
        return undefined;
    }

    // --------------------UPDATE EDITED------------------------
    updateStudent(studentUpdate) {
        for (let student of this.listStudent) {
            if (student.code === studentUpdate.code) {
                for (let key in student) {
                    student[key] = studentUpdate[key];
                }
            }
        }
    }
    updateEmployee(employeeUpdate){
        for (let employee of this.listEmployee) {
            if (employee.code === employeeUpdate.code) {
                for (let key in employee) {
                    employee[key] = employeeUpdate[key];
                }
            }
        }
    }
    updateCustomer(customerUpdate){
        for (let customer of this.listCustomer) {
            if (customer.code === customerUpdate.code) {
                for (let key in customer) {
                    customer[key] = customerUpdate[key];
                }
            }
        }
    }




}