// let sinhVienList = [
//     {
//         msv: 'MSV-0001',
//         tensv: 'ABC',
//         email: '00@gmail.com',
//         matKhau: 'asoih123',
//         ngaySinh: '2001-09-10',
//         khoaHoc: '1',
//         diemToan: 2.2,
//         diemLy: 1.0,
//         diemHoa: 5.0,
//     },
//     {
//         msv: 'MSV-0002',
//         tensv: 'ABC',
//         email: '00@gmail.com',
//         matKhau: 'asoih123',
//         ngaySinh: '2001-09-10',
//         khoaHoc: '1',
//         diemToan: 2.2,
//         diemLy: 1.0,
//         diemHoa: 5.0,
//     },
//     {
//         msv: 'MSV-0003',
//         tensv: 'ABC',
//         email: '00@gmail.com',
//         matKhau: 'asoih123',
//         ngaySinh: '2001-09-10',
//         khoaHoc: '1',
//         diemToan: 2.2,
//         diemLy: 1.0,
//         diemHoa: 5.0,
//     }
// ]
// get element
const txtMaSV = document.querySelector('#txtMaSV');
const txtTenSV = document.querySelector('#txtTenSV');
const txtEmail = document.querySelector('#txtEmail');
const txtPass = document.querySelector('#txtPass');
const txtNgaySinh = document.querySelector('#txtNgaySinh');
const khSV = document.querySelector('#khSV');
const txtDiemToan = document.querySelector('#txtDiemToan');
const txtDiemLy = document.querySelector('#txtDiemLy');
const txtDiemHoa = document.querySelector('#txtDiemHoa');
const svForm = document.querySelector('#add-sv-form');
const tbodySinhVien = document.querySelector('#tbodySinhVien');

const saveBtn = document.querySelector('#saveBtn');
// 
const inputArrObj = {
    msv: txtMaSV,
    tensv: txtTenSV,
    email: txtEmail,
    matKhau: txtPass,
    ngaySinh: txtNgaySinh,
    khoaHoc: khSV,
    diemToan: txtDiemToan,
    diemLy: txtDiemLy,
    diemHoa: txtDiemHoa,
}
const inputArr = [txtTenSV, txtEmail, txtPass, khSV, txtDiemToan, txtDiemLy, txtDiemHoa];
const INPUT_ATT = {
    STRING: 'string',
    NUMBER: 'number',
    SELECT: 'select',
}
// 
let isEditing = '';
let currMSVNum = 1;
function updateMSV(add = 0) {
    currMSVNum += add;
    const msv = `MSV-${currMSVNum.toString().padStart(4, '0')}`;
    txtMaSV.value = msv;
}
currMSVNum = Number(localStorage.getItem('currMSVNum')) ? Number(localStorage.getItem('currMSVNum')) : 1;
updateMSV();
// let sinhVienList = [];
// sinhVienList = JSON.parse(localStorage.getItem('sinhVienList'))
const localSinhVienList = JSON.parse(localStorage.getItem('sinhVienList'));
// console.log(localSinhVienList);
const sinhVienList = localSinhVienList ? localSinhVienList : [];
function buildSinhVienElement(sinhVienObject) {
    const sinhVienTemplate = document.querySelector('#sinh-vien-template');
    const clone = sinhVienTemplate.content.cloneNode('true');
    const sinhVienElement = clone.querySelector('.sinh-vien');
    // get td
    const msvElement = sinhVienElement.querySelector('.msv');
    const tensvElement = sinhVienElement.querySelector('.tensv');
    const emailElement = sinhVienElement.querySelector('.email');
    const ngaySinhElement = sinhVienElement.querySelector('.ngay-sinh');
    const khoaHocElement = sinhVienElement.querySelector('.khoa-hoc');
    const diemTBElement = sinhVienElement.querySelector('.diem-tb');
    const editBtn = sinhVienElement.querySelector('.edit-btn');
    const removeBtn = sinhVienElement.querySelector('.remove-btn');
    sinhVienElement.setAttribute('id', sinhVienObject.msv);

    // 

    msvElement.innerText = sinhVienObject.msv;
    tensvElement.innerText = sinhVienObject.tensv;
    emailElement.innerText = sinhVienObject.email;
    ngaySinhElement.innerText = sinhVienObject.ngaySinh;
    khoaHocElement.innerText = sinhVienObject.khoaHoc;
    diemTBElement.innerText = ((sinhVienObject.diemToan + sinhVienObject.diemLy + sinhVienObject.diemHoa) / 3).toFixed(1);
    // add button click event
    editBtn.addEventListener('click', () => {
        handleEditBtnClick(sinhVienObject.msv);
    })
    removeBtn.addEventListener('click', () => {
        handleRemoveBtnClick(sinhVienObject.msv);
    })
    return sinhVienElement;

}
if (sinhVienList) {

    sinhVienList.forEach(sinhVienObject => {
        const sinhVienElement = buildSinhVienElement(sinhVienObject);
        tbodySinhVien.appendChild(sinhVienElement);
    })
}
function checkInput() {
    let isValid = true;
    inputArr.forEach(element => {
        const elementType = element.getAttribute('data-type');
        const elementName = element.getAttribute('data-name');
        if (elementType == INPUT_ATT.STRING) {
            if (!element.value || element.value.length < 4) {
                isValid = false;
                element.nextElementSibling.innerText = `${elementName} is not valid`;
                element.nextElementSibling.style.display = 'block';
            } else {
                element.nextElementSibling.style.display = 'none';

            }
        }
        if (elementType == INPUT_ATT.NUMBER) {
            if (!element.value || !Number(element.value) || Number(element.value) > 10 ||
                Number(element.value) < 0) {
                isValid = false;
                element.nextElementSibling.innerText = `${elementName} is not valid`;
                element.nextElementSibling.style.display = 'block';

            } else {
                element.nextElementSibling.style.display = 'none';

            }
        }
        if (elementType == INPUT_ATT.SELECT) {
            if (!element.value) {
                isValid = false;
                element.nextElementSibling.style.display = 'block';
                element.nextElementSibling.innerText = `${elementName} is not valid`;
            } else {
                element.nextElementSibling.style.display = 'none';

            }
        }
    })
    return isValid;
}


function handleSaveBtn() {

    if (checkInput()) {

        const sinhVienObject = {};
        sinhVienObject.msv = txtMaSV.value;
        sinhVienObject.tensv = txtTenSV.value;
        sinhVienObject.email = txtEmail.value;
        sinhVienObject.matKhau = txtPass.value;
        sinhVienObject.ngaySinh = txtNgaySinh.value;
        sinhVienObject.khoaHoc = khSV.value;
        sinhVienObject.diemToan = +txtDiemToan.value;
        sinhVienObject.diemLy = +txtDiemLy.value;
        sinhVienObject.diemHoa = +txtDiemHoa.value;
        const sinhVienElement = buildSinhVienElement(sinhVienObject);
        // console.log(sinhVienObject);
        if (!isEditing) {
            sinhVienList.push(sinhVienObject);
            updateMSV(1);

            tbodySinhVien.appendChild(sinhVienElement);
        } else {
            const oldSinhVien = document.querySelector(`#${isEditing}`);
            oldSinhVien.replaceWith(sinhVienElement);
            const oldSinhVienIndex = sinhVienList.findIndex(element => element.msv == isEditing);
            sinhVienList.splice(oldSinhVienIndex, 1, sinhVienObject);
            saveBtn.innerText = 'Them Sinh Vien';
            isEditing = '';
            txtMaSV.style.color = 'black';
        }


        localStorage.setItem('sinhVienList', JSON.stringify(sinhVienList));
        localStorage.setItem('currMSVNum', JSON.stringify(currMSVNum));
        svForm.reset();
        txtMaSV.value = `MSV-${currMSVNum.toString().padStart(4, '0')}`;
    }

}
saveBtn.addEventListener('click', (event) => {
    event.preventDefault();
    handleSaveBtn();
})

function handleEditBtnClick(id) {
    const sinhVienObject = sinhVienList.find(element => {
        return element.msv == id;
    })
    // const sinhVienElement = document.querySelector(`#${id}`);
    for (const key in inputArrObj) {
        inputArrObj[key].value = sinhVienObject[key];
    }
    saveBtn.innerText = 'Sua thong tin Sinh Vien';
    isEditing = id;
    txtMaSV.style.color = 'blue';
}

function handleRemoveBtnClick(id) {
    const sinhVienElement = document.querySelector(`#${id}`);
    sinhVienElement.remove();
    const sinhVienObjectIndex = sinhVienList.findIndex(element => element.msv === id);
    sinhVienList.splice(sinhVienObjectIndex, 1);
    console.log(sinhVienList);
    localStorage.setItem('sinhVienList', JSON.stringify(sinhVienList));
    localStorage.setItem('currMSVNum', JSON.stringify(currMSVNum));
}
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    console.log(scroll);
})