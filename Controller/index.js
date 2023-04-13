import { Customer } from "../Models/Customer.js"
import { DOM } from "../Models/DOM.js"
import { Employee } from "../Models/Employee.js"
import { ListPerson } from "../Models/ListPerson.js"
import { Student } from "../Models/Student.js"
import { Validation } from "../Utility/Validation.js"


let listPerson = new ListPerson();
let validation = new Validation();

// --------GET LOCALSTORAGE----------
listPerson.getLocalStoreListStudent();
listPerson.getLocalStoreListEmployee();
listPerson.getLocalStoreListCustomer();
// ---------RENDER TABLE--------------
listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');


document.querySelector('#showTableStudent').onclick = function () {
    DOM.tableStudent.classList.remove('d-none')
    DOM.tableEmployee.classList.add('d-none')
    DOM.tableCustomer.classList.add('d-none')
}
document.querySelector('#showTableEmployee').onclick = function () {
    DOM.tableStudent.classList.add('d-none')
    DOM.tableEmployee.classList.remove('d-none')
    DOM.tableCustomer.classList.add('d-none')
}
document.querySelector('#showTableCustomer').onclick = function () {
    DOM.tableStudent.classList.add('d-none')
    DOM.tableEmployee.classList.add('d-none')
    DOM.tableCustomer.classList.remove('d-none')
}



// let tagSelectedObject = document.querySelector("#chooseUserObject");

DOM.tagSelectedObject.addEventListener("change", (event) => {
    console.log("event.target.value", event.target.value);
    if (event.target.value === "student") {
        DOM.showFormInputStudent.classList.remove('d-none');
        DOM.showFormInputEmployee.classList.add('d-none');
        DOM.showFormInputCustomer.classList.add('d-none');
    } else if (event.target.value === "employee") {
        DOM.showFormInputStudent.classList.add("d-none")
        DOM.showFormInputEmployee.classList.remove("d-none")
        DOM.showFormInputCustomer.classList.add("d-none")
    } else if (event.target.value === "customer") {
        DOM.showFormInputStudent.classList.add('d-none');
        DOM.showFormInputEmployee.classList.add('d-none');
        DOM.showFormInputCustomer.classList.remove('d-none');

    } else {
        DOM.showFormInputStudent.classList.add('d-none');
        DOM.showFormInputEmployee.classList.add('d-none');
        DOM.showFormInputCustomer.classList.add('d-none');
    }
})


DOM.btnAdd.onclick = function () {
    // input: Student, Employee, Customer
    var student = new Student();
    var employee = new Employee();
    var customer = new Customer();

    if (DOM.tagSelectedObject.value === "student") {
        for (let input of DOM.arrStudent) {
            let { id, value } = input;
            student[id] = value
        }
        listPerson.addStudent(student);
        listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
        listPerson.saveLocalStoreListStudent();
        // Close model
        DOM.btnClose.click();
    }

    if (DOM.tagSelectedObject.value === 'employee') {
        for (let input of DOM.arrEmployee) {
            let { id, value } = input;
            employee[id] = value
        }
        listPerson.addEmployee(employee)
        listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
        listPerson.saveLocalStoreListEmployee();
        // Close model
        DOM.btnClose.click();
    }

    if (DOM.tagSelectedObject.value === 'customer') {
        for (let input of DOM.arrCustomer) {
            let { id, value } = input;
            customer[id] = value
        }
        listPerson.addCustomer(customer)
        listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');
        listPerson.saveLocalStoreListCustomer();
        // Close model
        DOM.btnClose.click();
    }


}

// --------------DELETE------------------
window.deleteStudent = function (code) {
    listPerson.deleteStudent(code)
    // Render table student
    listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
    listPerson.saveLocalStoreListStudent();
}

window.deleteEmployee = function (code) {
    listPerson.deleteEmployee(code)
    // Render table employee
    listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
    listPerson.saveLocalStoreListEmployee();
}

window.deleteCustomer = function (code) {
    listPerson.deleteCustomer(code)
    // Render table customer
    listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');
    listPerson.saveLocalStoreListCustomer();
}


// -----------------EDIT------------------
window.editStudent = function (code) {
    DOM.btnAddUser.click()
    DOM.tagSelectedObject.value = "student";
    DOM.objectSelected.disabled = true;
    DOM.formInputCode.disabled = true;
    DOM.showFormInputStudent.classList.remove('d-none');
    DOM.showFormInputEmployee.classList.add('d-none');
    DOM.showFormInputCustomer.classList.add('d-none');
    DOM.btnUpdate.classList.remove('d-none');
    DOM.btnAdd.classList.add('d-none');

    let studentNeedEdit = listPerson.getInfoStudent(code);
    if (studentNeedEdit) {
        for (let input of DOM.arrStudent) {
            let { id } = input;
            input.value = studentNeedEdit[id];
        }
    }
}


window.editEmployee = function (code) {
    DOM.btnAddUser.click()
    DOM.tagSelectedObject.value = "employee";
    DOM.objectSelected.disabled = true;
    DOM.formInputCode.disabled = true;
    DOM.showFormInputStudent.classList.add('d-none');
    DOM.showFormInputEmployee.classList.remove('d-none');
    DOM.showFormInputCustomer.classList.add('d-none');
    DOM.btnUpdate.classList.remove('d-none');
    DOM.btnAdd.classList.add('d-none');

    let employeeNeedEdit = listPerson.getInfoEmployee(code);
    if (employeeNeedEdit) {
        for (let input of DOM.arrEmployee) {
            let { id } = input;
            input.value = employeeNeedEdit[id];
        }
    }
}


window.editCustomer = function (code) {
    DOM.btnAddUser.click()
    DOM.tagSelectedObject.value = "customer";
    DOM.objectSelected.disabled = true;
    DOM.formInputCode.disabled = true;
    DOM.showFormInputStudent.classList.add('d-none');
    DOM.showFormInputEmployee.classList.add('d-none');
    DOM.showFormInputCustomer.classList.remove('d-none');
    DOM.btnUpdate.classList.remove('d-none');
    DOM.btnAdd.classList.add('d-none');

    let customerNeedEdit = listPerson.getInfoCustomer(code);
    if (customerNeedEdit) {
        for (let input of DOM.arrCustomer) {
            let { id } = input;
            input.value = customerNeedEdit[id];
        }
    }
}


DOM.btnUpdate.onclick = function () {
    // input: Student, Employee, Customer
    var studentUpdate = new Student();
    var employeeUpdate = new Employee();
    var customerUpdate = new Customer();

    if (DOM.objectSelected.value === "student") {
        for (let input of DOM.arrStudent) {
            let { id, value } = input;
            studentUpdate[id] = value
        }

        listPerson.updateStudent(studentUpdate);
        listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
        listPerson.saveLocalStoreListStudent();
        DOM.btnClose.click();
    }

    if (DOM.objectSelected.value === 'employee') {
        for (let input of DOM.arrEmployee) {
            let { id, value } = input;
            employeeUpdate[id] = value
        }

        listPerson.updateEmployee(employeeUpdate);
        listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
        listPerson.saveLocalStoreListEmployee();
        DOM.btnClose.click();
    }

    if (DOM.objectSelected.value === 'customer') {
        for (let input of DOM.arrCustomer) {
            let { id, value } = input;
            customerUpdate[id] = value
        }
        listPerson.updateCustomer(customerUpdate)
        listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');
        listPerson.saveLocalStoreListCustomer();
        DOM.btnClose.click();
    }

}


DOM.btnAddUser.onclick = function () {
    DOM.showFormInputStudent.classList.add('d-none');
    DOM.showFormInputEmployee.classList.add('d-none');
    DOM.showFormInputCustomer.classList.add('d-none');
    DOM.btnUpdate.classList.add("d-none")
    DOM.btnAdd.classList.remove("d-none")
    DOM.objectSelected.disabled = false;
    DOM.formInputCode.disabled = false;

    //------------------------CLEAR-FORM--------------------------------
    for (let input of DOM.arrFormInput) {
        input.value = ""
    }
    // console.table(arr);
}


// Kiểm tra validation 
function checkValidationStudent(dataStudent){
    // Kiểm tra rỗng
    valid = kiemtra.kiemTraRong(dataStudent.name, 'tbTKNV', 'Tài khoản') & kiemtra.kiemTraRong(dataStudent.hoVaTen, 'tbTen', 'Họ và tên') & kiemtra.kiemTraRong(dataStudent.email, 'tbEmail', 'Email') & kiemtra.kiemTraRong(dataStudent.matKhau, 'tbMatKhau', 'Mật khẩu') & kiemtra.kiemTraRong(dataStudent.ngayLam, 'tbNgay', 'Ngày làm') & kiemtra.kiemTraRong(dataStudent.luongCoBan, 'tbLuongCB', 'Lương cơ bản') & kiemtra.kiemTraRong(dataStudent.gioLam, 'tbGiolam', 'Giờ làm');
    // // Kiểm tra Tài khoản tối đa 4-6 "ký số"
    // valid = valid & kiemtra.kiemTraDoDaiVaKySo(dataStudent.taiKhoan, 'error-min-max-length-taiKhoan', 'Tài khoản', 4, 6)
    // // Kiểm tra định dạng ký tự họ và tên
    // valid = valid & kiemtra.kiemTraKyTu(dataStudent.hoVaTen, 'error-allLetter-tenNhanVien', 'Họ và tên');
    // // Kiểm tra email
    // valid = valid & kiemtra.kiemTraEmail(dataStudent.email, 'error-allLetter-email', 'Email');
    // // Kiểm tra mật khẩu
    // valid = valid & kiemtra.kiemTraPassword(dataStudent.matKhau, 'error-min-max-length-allLetter-matKhau', 'Mật khẩu', 6, 10)
    // // Kiểm tra lương cơ bản
    // valid = valid & kiemtra.kiemTraLuongCB(dataStudent.luongCoBan, 'error-min-max-luongCB', 'Lương cơ bản', 1000000, 20000000)
    // // Kiểm tra chức vụ
    // valid = valid & kiemtra.kiemTraChucVu(dataStudent.chucVu, 'error-ChucVu', 'chức vụ')
    // // Kiểm tra số giờ làm
    // valid = valid & kiemtra.kiemTraSoGioLam(dataStudent.gioLam, 'error-min-max-soGioLam', 'Số giờ làm', 80, 200)

    return valid;
}

