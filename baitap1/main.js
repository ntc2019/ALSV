const showInfoBtn = document.querySelector('#show-info-button');
const spanTenSVElement = document.querySelector('#spanTenSV');
const spanMaSVElement = document.querySelector('#spanMaSV');
const spanLoaiSVElement = document.querySelector('#spanLoaiSV');
const spanDTBElement = document.querySelector('#spanDTB');
const spanXepLoaiElement = document.querySelector('#spanXepLoai');
const loaiSVObject = {
    '1': {
        text: 'Nghèo',
        mul: 1,
    },
    '2': {
        text: 'Bình thường',
        mul: 1,
    },
    '3': {
        text: 'Giàu',
        mul: 1,
    },
}
function xeploai(diem) {
    if (diem > 8) {
        return 'Gioi';
    } else if (diem > 6) {
        return 'Kha';
    } else if (diem > 4) {
        return 'Trung Binh';
    }
    return 'Yeu';
}
function handleError(element) {
    const nextElement = element.nextElementSibling;
    if (!element.value) {
        nextElement.innerText = element.previousElementSibling.innerText + ' Can not be empty';
        nextElement.style.display = 'block';
        return true;
    }
    nextElement.style.display = 'none';
    return false;
}
function handleShowInfo() {
    const txtMaSV = document.querySelector('#txtMaSV');
    const txtTenSv = document.querySelector('#txtTenSV');
    const loaiSV = document.querySelector('#loaiSV');
    const txtDiemToan = document.querySelector('#txtDiemToan');
    const txtDiemVan = document.querySelector('#txtDiemVan');
    // console.log(txtMaSV, txtTenSv, loaiSV, txtDiemToan, txtDiemVan);
    let error = false;
    const inputArr = [txtMaSV, txtTenSv, txtDiemToan, txtDiemVan];
    inputArr.forEach(element => {
        if (handleError(element)) {
            error = true;
        }
    })
    if (error) {
        return;
    }
    // 
    spanMaSVElement.innerText = txtMaSV.value;
    spanLoaiSVElement.innerText = loaiSVObject[loaiSV.value].text;
    const diem = (+txtDiemToan.value + +txtDiemVan.value) / 2 * loaiSVObject[loaiSV.value].mul;
    spanDTBElement.innerText = diem;
    spanXepLoaiElement.innerText = xeploai(diem);
    spanTenSVElement.innerText = txtTenSv.value;
}
showInfoBtn.addEventListener('click', () => {
    handleShowInfo();
})