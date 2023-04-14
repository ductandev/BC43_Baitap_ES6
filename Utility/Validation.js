export class Validation {
    kiemTraRong(value, idError, name) {
        try {
            if (value.trim() === '') {
                document.getElementById(idError).innerHTML = `${name} không được bỏ trống !`;
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        catch {
            // Bắt lỗi xem thằng nào bị lỗi
            console.log(name)
        }
    }

    // KIỂM TRA CHỨC VỤ
    kiemTraChucVu = function (value, idError, name) {
        if (value === "") {
            document.getElementById(idError).innerHTML = `Vui lòng chọn ${name}!`
            return false;
        }
        document.getElementById(idError).innerHTML = '';
        return true;
    }

    // KIỂM TRA TÊN
    kiemTraTen = function (value, idError, name) {
        // Để khoản trống vì tên người có khoản trống mới hợp lệ.
        var regexLetter = /^[A-Z a-z áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/;
        // Nếu chuỗi định dạng test thành công value thì true
        if (regexLetter.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} tất cả phải là chữ`;
        return false;
    }

    // KIỂM TRA Mã
    kiemTraDoDaiVaKySo = function (value, idError, name, minLength, maxLength) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            // 'abcd'.length = 4
            if (value.length < minLength || value.length > maxLength) {
                document.getElementById(idError).innerHTML = `${name} tối đa từ ${minLength} đến ${maxLength} số!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ. Mã là số tối đa từ ${minLength} đến ${maxLength} số!`
        document.getElementById(idError).style.display = 'block'
        return false;
    }

    // KIỂM TRA EMAIL
    kiemTraEmail = function (value, idError, name) {
        var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regexEmail.test(value)) {
            document.getElementById(idError).innerHTML = '';
            return true
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ !`
        document.getElementById(idError).style.display = 'block'
        return false;
    }

    // KIỂM TRA ĐIỂM SỐ
    kiemTraDiemSo = function (value, idError, name, minValue, maxValue) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9.]+$/;
        if (regexNumber.test(value)) {
            // Kiểm tra giá trị
            if (Number(value) < minValue || Number(value) > maxValue) {
                document.getElementById(idError).innerHTML = `${name} phải từ ${minValue} đến ${maxValue} !`
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }

        document.getElementById(idError).innerHTML = `${name} không hợp lệ !`
        return false;
    }

    // KIỂM TRA SỐ NGÀY LÀM VIỆC
    kiemTraSoNgayLamViec = function(value, idError, name, minValue){
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9.]+$/;
        if(regexNumber.test(value)){
            // Kiểm tra giá trị
            if(Number(value) < minValue){
                document.getElementById(idError).innerHTML = `${name} phải từ ${minValue} trở lên !`
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }

        document.getElementById(idError).innerHTML = `${name} không hợp lệ !`
        return false;
    }

    // KIỂM TRA LƯƠNG CƠ BẢN
    kiemTraLuongCB = function (value, idError, name, minLength, maxLength) {
        // Muốn để số thập phân thì để thêm dấu '.'
        var regexNumber = /^[0-9]+$/;
        if (regexNumber.test(value)) {
            // 'abcd'.length = 4
            if (value < minLength || value > maxLength) {
                document.getElementById(idError).innerHTML = `${name} tối đa từ ${minLength} đến ${maxLength}!`
                document.getElementById(idError).style.display = 'block'
                return false;
            }
            document.getElementById(idError).innerHTML = '';
            return true;
        }
        document.getElementById(idError).innerHTML = `${name} không hợp lệ. Vui lòng chỉ nhập số. Tối đa từ ${minLength} đến ${maxLength} !`
        document.getElementById(idError).style.display = 'block'
        return false;
    }


    stringToslug(title) {
        //Đổi chữ hoa thành chữ thường
        let slug = title.toLowerCase();

        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
    }
} 