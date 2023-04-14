export const DOM = {
    // --------------------table-----------------------
    tableStudent: document.querySelector('#tableStudent'),
    tableEmployee: document.querySelector('#tableEmployee'),
    tableCustomer: document.querySelector('#tableCustomer'),

    // ------------------tagselected--------------------
    tagSelectedObject: document.querySelector("#chooseUserObject"),
    objectSelected: document.getElementById('chooseUserObject'),

    // -------------------Form input---------------------
    showFormInputStudent: document.querySelector("#FormInputStudent"),
    showFormInputEmployee: document.querySelector("#FormInputEmployee"),
    showFormInputCustomer: document.querySelector("#FormInputCustomer"),

    // -------------------array object-------------------
    arrStudent: document.querySelectorAll('.modal-body input'),
    arrEmployee: document.querySelectorAll('.modal-body input'),
    arrCustomer: document.querySelectorAll('.modal-body input'),
    arrFormInput: document.querySelectorAll('.modal-body input, .modal-body select'),

    // ------------------form input code------------------
    formInputCode: document.getElementById('code'),

    // -----------------------button----------------------
    btnAddUser: document.querySelector("#btnAddUser"),
    btnUpdate: document.querySelector("#btnUpdate"),
    btnAdd: document.querySelector("#btnAdd"),
    btnClose: document.querySelector('button[data-dismiss]'),

    btnShowTableStudent: document.querySelector('#showTableStudent'),
    btnShowTableEmployee: document.querySelector('#showTableEmployee'),
    btnShowTableCustomer: document.querySelector('#showTableCustomer'),

    // ----------------------Validation info---------------
    validationInfo: document.querySelectorAll('.modal-body span'),
    invalidObjectInfo: document.querySelector("#invalidObject"),
}