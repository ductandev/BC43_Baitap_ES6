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


DOM.btnShowTableStudent.onclick = function () {
    DOM.tableStudent.classList.remove('d-none')
    DOM.tableEmployee.classList.add('d-none')
    DOM.tableCustomer.classList.add('d-none')
}
DOM.btnShowTableEmployee.onclick = function () {
    DOM.tableStudent.classList.add('d-none')
    DOM.tableEmployee.classList.remove('d-none')
    DOM.tableCustomer.classList.add('d-none')
}
DOM.btnShowTableCustomer.onclick = function () {
    DOM.tableStudent.classList.add('d-none')
    DOM.tableEmployee.classList.add('d-none')
    DOM.tableCustomer.classList.remove('d-none')
}


DOM.tagSelectedObject.addEventListener("change", (event) => {
    DOM.invalidObjectInfo.innerHTML = "";
    clearInfoValidation();
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
        // ----------------Validation-Student------------------
        // Đặt cờ
        var valid = true;
        // Kiểm tra Validation dữ liệu nhập
        valid = validation.kiemTraRong(student.scoreMath, 'invalidScoreMath', 'Điểm toán') & validation.kiemTraRong(student.scorePhysics, 'invalidScorePhysics', 'Điểm lý') & validation.kiemTraRong(student.scoreChemistry, 'invalidScoreChemistry', 'Điểm hóa');
        // Kiểm tra rỗng các trường họ tên, email, mã, Email và chi tiết từng trường
        valid = valid & checkValidationObject(student, valid);
        // kiểm tra điểm số
        valid = valid & validation.kiemTraDiemSo(student.scoreMath, 'invalidScoreMath-letter', 'Điểm', 0, 10)
        valid = valid & validation.kiemTraDiemSo(student.scorePhysics, 'invalidScorePhysics-letter', 'Điểm', 0, 10)
        valid = valid & validation.kiemTraDiemSo(student.scoreChemistry, 'invalidScoreChemistry-letter', 'Điểm', 0, 10)
        
        if (!valid) {
            return;
        }
        // -----------------------------------------
        listPerson.addStudent(student);
        listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
        listPerson.saveLocalStoreListStudent();
        // Close model
        DOM.btnClose.click();
    }

    else if (DOM.tagSelectedObject.value === 'employee') {
        for (let input of DOM.arrEmployee) {
            let { id, value } = input;
            employee[id] = value
        }
        // ----------------Validation-employee------------------
        // Đặt cờ
        var valid = true;
        // Kiểm tra Validation dữ liệu nhập
        valid = validation.kiemTraRong(employee.dayWorking, 'invalidDayWorking', 'Số ngày làm việc') & validation.kiemTraRong(employee.dailyWage, 'invalidDailyWage', 'Lương theo ngày');
        // Kiểm tra rỗng các trường họ tên, email, mã, Email và chi tiết từng trường
        valid = valid & checkValidationObject(employee, valid);
        // kiểm Số ngày làm việc
        valid = valid & validation.kiemTraSoNgayLamViec(employee.dayWorking, 'invalidDayWorking-letter', 'Số ngày làm việc', 30)
        // kiểm tra lương theo ngày
        valid = valid & validation.kiemTraLuongCB(employee.dailyWage, 'invalidDailyWage-letter', 'lương theo ngày', 1000, 20000)
        
        if (!valid) {
            return;
        }
        // ------------------------------------------------------
        listPerson.addEmployee(employee)
        listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
        listPerson.saveLocalStoreListEmployee();
        // Close model
        DOM.btnClose.click();
    }

    else if (DOM.tagSelectedObject.value === 'customer') {
        for (let input of DOM.arrCustomer) {
            let { id, value } = input;
            customer[id] = value
        }
        // ----------------Validation-customer------------------
        // Đặt cờ
        var valid = true;
        // Kiểm tra Validation dữ liệu nhập
        valid = validation.kiemTraRong(customer.nameCompany, 'invalidNameCompany', 'Tên công ty') & validation.kiemTraRong(customer.invoiceValue, 'invalidInvoiceValue', 'Trị giá hóa đơn') & validation.kiemTraRong(customer.evaluate, 'invalidEvaluate', 'Đánh giá');
        // Kiểm tra rỗng các trường họ tên, email, mã, Email và chi tiết từng trường
        valid = valid & checkValidationObject(customer, valid);
        // kiểm tra trị giá hóa đơn
        valid = valid & validation.kiemTraDiemSo(customer.invoiceValue, 'invalidInvoiceValue-letter', 'Trị giá hóa đơn', 1000, 200000)
        
        if (!valid) {
            return;
        }
        // -----------------------------------------        
        listPerson.addCustomer(customer)
        listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');
        listPerson.saveLocalStoreListCustomer();
        // Close model
        DOM.btnClose.click();
    }

    else{
        valid = validation.kiemTraChucVu("", 'invalidObject', 'đối tượng')
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

    //-----------CLEAR-FORM-------------
    for (let input of DOM.arrFormInput) {
        input.value = ""
    }
    clearInfoValidation();
}


// --------CLEAR INFO VALIDATION----------
function clearInfoValidation(){
    for (let info of DOM.validationInfo){
        info.innerHTML = ""
    }
}


// --------VALIDATION SAME-----------------
function checkValidationObject(object, valid){
        valid = valid & validation.kiemTraRong(object.name, 'invalidName', 'Họ và tên') & validation.kiemTraRong(object.address, 'invalidAdrress', 'Địa chỉ') & validation.kiemTraRong(object.code, 'invalidCode', 'Mã') & validation.kiemTraRong(object.email, 'invalidEmail', 'Email')
        // Kiểm tra tên
        valid = valid & validation.kiemTraTen(object.name, 'invalidName-letter', 'Họ và tên');
        // Kiểm tra email
        valid = valid & validation.kiemTraEmail(object.email, 'invalidEmail-letter', 'Email');
        // Kiểm tra mã
        valid = valid & validation.kiemTraDoDaiVaKySo(object.code, 'invalidCode-letter', 'Mã', 4, 6);

    return valid;
}

// -------------------------SEARCH-------------------------------
document.getElementById('searchAddress').oninput = function () {
    if (DOM.tableStudent.classList.value === 'table-responsive-lg wrapper'){
        var tuKhoa = document.getElementById('searchAddress').value;
        tuKhoa = validation.stringToslug(tuKhoa);
        var mangXepLoaiTimKiem = [];
        for (var index = 0; index < listPerson.listStudent.length; index++) {
            //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
            var nv = listPerson.listStudent[index];
            // Biến đổi xếp loại nhân viên thành chữ không dấu
            var xepLoai = validation.stringToslug(nv.address);
            //Lấy ra tên so sánh với từ khoá
            if (xepLoai.search(tuKhoa) !== -1) {
                //tìm thấy
                mangXepLoaiTimKiem.push(nv);
            }
        }
        listPerson.listStudent = mangXepLoaiTimKiem;
        if(tuKhoa === ''){
            listPerson.getLocalStoreListStudent();
        }
        listPerson.renderTableStudent('#tableStudentInfo', '#showTableStudent');
    }

    else if (DOM.tableEmployee.classList.value === 'table-responsive-lg wrapper'){
        var tuKhoa = document.getElementById('searchAddress').value;
        tuKhoa = validation.stringToslug(tuKhoa);
        var mangXepLoaiTimKiem = [];
        for (var index = 0; index < listPerson.listEmployee.length; index++) {
            //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
            var nv = listPerson.listEmployee[index];
            // Biến đổi xếp loại nhân viên thành chữ không dấu
            var xepLoai = validation.stringToslug(nv.address);
            //Lấy ra tên so sánh với từ khoá
            if (xepLoai.search(tuKhoa) !== -1) {
                //tìm thấy
                mangXepLoaiTimKiem.push(nv);
            }
        }
        listPerson.listEmployee = mangXepLoaiTimKiem;
        if(tuKhoa === ''){
            listPerson.getLocalStoreListEmployee();
        }
        listPerson.renderTableEmployee('#tableEmployeeInfo', '#showTableEmployee');
    }

    else if (DOM.tableCustomer.classList.value === 'table-responsive-lg wrapper'){
        var tuKhoa = document.getElementById('searchAddress').value;
        tuKhoa = validation.stringToslug(tuKhoa);
        var mangXepLoaiTimKiem = [];
        for (var index = 0; index < listPerson.listCustomer.length; index++) {
            //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
            var nv = listPerson.listCustomer[index];
            // Biến đổi xếp loại nhân viên thành chữ không dấu
            var xepLoai = validation.stringToslug(nv.address);
            //Lấy ra tên so sánh với từ khoá
            if (xepLoai.search(tuKhoa) !== -1) {
                //tìm thấy
                mangXepLoaiTimKiem.push(nv);
            }
        }
        listPerson.listCustomer = mangXepLoaiTimKiem;
        if(tuKhoa === ''){
            listPerson.getLocalStoreListCustomer();
        }
        listPerson.renderTableCustomer('#tableCustomerInfo', '#showTableCustomer');
    }
}



