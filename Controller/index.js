import { Customer } from "../Models/Customer.js"
import { Employee } from "../Models/Employee.js"
import { ListPerson } from "../Models/ListPerson.js"
import { Student } from "../Models/Student.js"

let tableStudent = document.querySelector('#tableStudent')
let tableEmployee = document.querySelector('#tableEmployee')
let tableCustomer = document.querySelector('#tableCustomer')
 
let listPerson = new ListPerson();
// --------GET LOCALSTORAGE----------
listPerson.getLocalStoreListStudent();
listPerson.getLocalStoreListEmployee();
listPerson.getLocalStoreListCustomer();
// ---------RENDER TABLE--------------
listPerson.renderTableStudent('#tableStudentInfo','#showTableStudent');
listPerson.renderTableEmployee('#tableEmployeeInfo','#showTableEmployee');
listPerson.renderTableCustomer('#tableCustomerInfo','#showTableCustomer');


document.querySelector('#showTableStudent').onclick = function () {
    tableStudent.classList.remove('d-none')
    tableEmployee.classList.add('d-none')
    tableCustomer.classList.add('d-none')
}
document.querySelector('#showTableEmployee').onclick = function () {
    tableStudent.classList.add('d-none')
    tableEmployee.classList.remove('d-none')
    tableCustomer.classList.add('d-none')
}
document.querySelector('#showTableCustomer').onclick = function () {
    tableStudent.classList.add('d-none')
    tableEmployee.classList.add('d-none')
    tableCustomer.classList.remove('d-none')
}



let tagSelectedObject = document.querySelector("#chooseUserObject");

tagSelectedObject.addEventListener("change", (event) => {
    const showFormInputStudent = document.querySelector("#FormInputStudent");
    const showFormInputEmployee = document.querySelector("#FormInputEmployee");
    const showFormInputCustomer = document.querySelector("#FormInputCustomer")

    console.log("event.target.value", event.target.value);
    if (event.target.value === "student") {
        showFormInputStudent.classList.remove('d-none');
        showFormInputEmployee.classList.add('d-none');
        showFormInputCustomer.classList.add('d-none');
    } else if (event.target.value === "employee") {
        showFormInputStudent.classList.add("d-none")
        showFormInputEmployee.classList.remove("d-none")
        showFormInputCustomer.classList.add("d-none")
    } else if (event.target.value === "customer") {
        showFormInputStudent.classList.add('d-none');
        showFormInputEmployee.classList.add('d-none');
        showFormInputCustomer.classList.remove('d-none');

    } else {
        showFormInputStudent.classList.add('d-none');
        showFormInputEmployee.classList.add('d-none');
        showFormInputCustomer.classList.add('d-none');
    }
})


document.querySelector("#btnAdd").onclick = function () {

    // input: Student, Employee, Customer
    var student = new Student();
    var employee = new Employee();
    var customer = new Customer();

    let objectSelected = document.getElementById('chooseUserObject').value

    if (objectSelected === "student"){
        var arrStudent = document.querySelectorAll('.modal-body input');
        // console.log(arrStudent);
        for (let input of arrStudent) {
            // console.log(input)
            let { id, value } = input;
            student[id] = value
        }
        console.log('id', student)
        listPerson.addStudent(student);
        listPerson.renderTableStudent('#tableStudentInfo','#showTableStudent');
        listPerson.saveLocalStoreListStudent();
        // Close model
        document.querySelector('button[data-dismiss]').click();
    }

    if (objectSelected === 'employee'){
        var arrEmployee = document.querySelectorAll('.modal-body input');
        for (let input of arrEmployee) {
            let { id, value } = input;
            employee[id] = value
        }
        listPerson.addEmployee(employee)
        listPerson.renderTableEmployee('#tableEmployeeInfo','#showTableEmployee');
        listPerson.saveLocalStoreListEmployee();
        // Close model
        document.querySelector('button[data-dismiss]').click();
    }

    if (objectSelected === 'customer'){
        var arrCustomer = document.querySelectorAll('.modal-body input');
        for (let input of arrCustomer) {
            let { id, value } = input;
            customer[id] = value
        }
        listPerson.addCustomer(customer)
        listPerson.renderTableCustomer('#tableCustomerInfo','#showTableCustomer');
        listPerson.saveLocalStoreListCustomer();
        // Close model
        document.querySelector('button[data-dismiss]').click();
    }


}

// --------------DELETE------------------
window.deleteStudent = function(code){
    listPerson.deleteStudent(code)
    // Render table student
    listPerson.renderTableStudent('#tableStudentInfo','#showTableStudent');
    listPerson.saveLocalStoreListStudent();
}

window.deleteEmployee = function(code){
    listPerson.deleteEmployee(code)
    // Render table employee
    listPerson.renderTableEmployee('#tableEmployeeInfo','#showTableEmployee');
    listPerson.saveLocalStoreListEmployee();
}

window.deleteCustomer = function(code){
    listPerson.deleteCustomer(code)
    // Render table customer
    listPerson.renderTableCustomer('#tableCustomerInfo','#showTableCustomer');
    listPerson.saveLocalStoreListCustomer();
}


// -----------------EDIT------------------
window.editStudent = function(code){
    document.querySelector("#btnAddUser").click()
    document.querySelector("#chooseUserObject").value = "student";
    document.getElementById('chooseUserObject').disabled = true;
    document.getElementById('code').disabled = true;
    document.querySelector("#FormInputStudent").classList.remove('d-none');
    document.querySelector("#FormInputEmployee").classList.add('d-none');
    document.querySelector("#FormInputCustomer").classList.add('d-none');
    document.querySelector("#btnUpdate").classList.remove('d-none');
    document.querySelector("#btnAdd").classList.add('d-none');

    let studentNeedEdit = listPerson.getInfoStudent(code);
    if (studentNeedEdit){
        var arrStudent = document.querySelectorAll('.modal-body input');
        for (let input of arrStudent){
            let {id} = input;
            input.value = studentNeedEdit[id];
        }
    }
}


window.editEmployee = function(code){
    document.querySelector("#btnAddUser").click()
    document.querySelector("#chooseUserObject").value = "employee";
    document.getElementById('chooseUserObject').disabled = true;
    document.getElementById('code').disabled = true;
    document.querySelector("#FormInputStudent").classList.add('d-none');
    document.querySelector("#FormInputEmployee").classList.remove('d-none');
    document.querySelector("#FormInputCustomer").classList.add('d-none');
    document.querySelector("#btnUpdate").classList.remove('d-none');
    document.querySelector("#btnAdd").classList.add('d-none');

    let employeeNeedEdit = listPerson.getInfoEmployee(code);
    if (employeeNeedEdit){
        var arrEmployee = document.querySelectorAll('.modal-body input');
        for (let input of arrEmployee){
            let {id} = input;
            input.value = employeeNeedEdit[id];
        }
    }
}


window.editCustomer = function(code){
    document.querySelector("#btnAddUser").click()
    document.querySelector("#chooseUserObject").value = "customer";
    document.getElementById('chooseUserObject').disabled = true;
    document.getElementById('code').disabled = true;
    document.querySelector("#FormInputStudent").classList.add('d-none');
    document.querySelector("#FormInputEmployee").classList.add('d-none');
    document.querySelector("#FormInputCustomer").classList.remove('d-none');
    document.querySelector("#btnUpdate").classList.remove('d-none');
    document.querySelector("#btnAdd").classList.add('d-none');

    let customerNeedEdit = listPerson.getInfoCustomer(code);
    if (customerNeedEdit){
        var arrCustomer = document.querySelectorAll('.modal-body input');
        for (let input of arrCustomer){
            let {id} = input;
            input.value = customerNeedEdit[id];
        }
    }
}


document.querySelector("#btnUpdate").onclick = function () {
    // input: Student, Employee, Customer
    var studentUpdate = new Student();
    var employeeUpdate = new Employee();
    var customerUpdate = new Customer();

    let objectSelected = document.getElementById('chooseUserObject').value

    if (objectSelected === "student"){
        var arrStudent = document.querySelectorAll('.modal-body input');
        for (let input of arrStudent) {
            let { id, value } = input;
            studentUpdate[id] = value
        }

        listPerson.updateStudent(studentUpdate);
        listPerson.renderTableStudent('#tableStudentInfo','#showTableStudent');
        listPerson.saveLocalStoreListStudent();
        document.querySelector("#btnClose").click();
    }

    if (objectSelected === 'employee'){
        var arrEmployee = document.querySelectorAll('.modal-body input');
        for (let input of arrEmployee) {
            let { id, value } = input;
            employeeUpdate[id] = value
        }

        listPerson.updateEmployee(employeeUpdate);
        listPerson.renderTableEmployee('#tableEmployeeInfo','#showTableEmployee');
        listPerson.saveLocalStoreListEmployee();
        document.querySelector("#btnClose").click();
    }

    if (objectSelected === 'customer'){
        var arrCustomer = document.querySelectorAll('.modal-body input');
        for (let input of arrCustomer) {
            let { id, value } = input;
            customerUpdate[id] = value
        }
        listPerson.updateCustomer(customerUpdate)
        listPerson.renderTableCustomer('#tableCustomerInfo','#showTableCustomer');
        listPerson.saveLocalStoreListCustomer();
        document.querySelector("#btnClose").click();
    }

}


document.getElementById('btnAddUser').onclick = function(){
    document.querySelector("#FormInputStudent").classList.add('d-none');
    document.querySelector("#FormInputEmployee").classList.add('d-none');
    document.querySelector("#FormInputCustomer").classList.add('d-none');
    document.querySelector("#btnUpdate").classList.add("d-none")
    document.querySelector("#btnAdd").classList.remove("d-none")
    document.getElementById('chooseUserObject').disabled = false;
    document.getElementById('code').disabled = false;

    //------------------------CLEAR-FORM--------------------------------
    var arrStudent = document.querySelectorAll('.modal-body input, .modal-body select');
    for (let input of arrStudent) {
        input.value = ""
    }
}


// console.table(arr);