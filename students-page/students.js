function emailIsValid(email) {
    return /^[^\s@+]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function save() {
    // get data
    let fullname = document.getElementById('fullname').value;
    let id = document.getElementById('studentid').value;
    let birthdate = document.getElementById('birthdate').value;
    let classs = document.getElementById('class').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;

    // Get data gender from select element
    var select = document.getElementById('gender');
    var gender = select.options[select.selectedIndex].value;
    
    // ---------------Validate form-----------------
    // name
    if (_.isEmpty(fullname)) {
        fullname = '';
        document.getElementById('fullname-check').innerHTML = 'Không được để trống mục này';   
    } else if (fullname.length <= 2) {
        fullname = '';
        document.getElementById('fullname-check').innerHTML = 'Không được nhỏ hơn 2 ký tự';
    }
    else {
        document.getElementById('fullname-check').innerHTML = '';   
    }

    // id student
    if (_.isEmpty(id)) {
        id = '';
        document.getElementById('studentid-check').innerHTML = 'Không được để trống mục này';   
    }
    else {
        document.getElementById('studentid-check').innerHTML = '';   
    }

    // birthdate
    if (_.isEmpty(birthdate)) {
        birthdate = '';
        document.getElementById('birthdate-check').innerHTML = 'Không được để trống mục này';   
    }
    else {
        document.getElementById('birthdate-check').innerHTML = '';   
    }

    // class
    if (_.isEmpty(classs)) {
        classs = '';
        document.getElementById('class-check').innerHTML = 'Không được để trống mục này';
    }
    else {
        document.getElementById('class-check').innerHTML = '';
    }

    // phonenumber
    if (_.isEmpty(phonenumber)) {
        phonenumber = '';
        document.getElementById('phonenumber-check').innerHTML = 'Không được để trống mục này';
    } else if (phonenumber < 10) {
        phonenumber = '';
        document.getElementById('phonenumber-check').innerHTML = 'Không được nhỏ hơn 10 chữ số';
    }
    else {
        document.getElementById('phonenumber-check').innerHTML = '';
    }

    // email
    if (_.isEmpty(email)) {
        email = '';
        document.getElementById('email-check').innerHTML = 'Không được để trống mục này';
    }
    else if (!emailIsValid(email)) {
        email = '';
        document.getElementById('email-check').innerHTML = "Email không đúng định dạng";
    }
    else {
        document.getElementById('email-check').innerHTML = '';
    }

    // address
    if (_.isEmpty(address)) {
        address = '';
        document.getElementById('address-check').innerHTML = 'Không được để trống mục này';   
    }
    else {
        document.getElementById('address-check').innerHTML = '';   
    }

    //----------------Mảng đưa data sv vào bảng------------------
    if (fullname && id && birthdate && classs && phonenumber && email && address && gender ) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            id: id,
            birthdate: birthdate,
            classs: classs,
            phonenumber: phonenumber,
            email: email,
            address: address,
            gender: gender
        });

        localStorage.setItem('students', JSON.stringify(students));

        this.writeListStudents();
    }
}

// Đọc và lưu data sviên trên Local Storage
function writeListStudents() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

    if (students.length === 0) {
        document.getElementById('student-table').style.display = 'none';
        return false;
    }
    document.getElementById('student-table').style.display = 'block';

    let tableContent = 
            `<tr>
                <td>Họ và tên</td>
                <td>ID</td>
                <td>Ngày sinh</td>
                <td>Lớp</td>
                <td>Số điện thoại</td>
                <td>Email</td>
                <td>Địa chỉ</td>
                <td>Giới tính</td>
                <td>Thao tác</td>
            </tr>`;
    students.forEach((student, index) => {
        index++;
            tableContent += 
                `<tr>
                    <td>${student.fullname}</td>
                    <td>${student.id}</td>
                    <td>${student.birthdate}</td>
                    <td>${student.classs}</td>
                    <td>${student.phonenumber}</td>
                    <td>${student.email}</td>
                    <td>${student.address}</td>
                    <td>${student.gender}</td>
                    <td>
                        <a href="#">Edit</a> | <a href="#" onclick='deleteStudent(id)'>Delete</a>
                    </td>
                </tr>`
            })
    document.getElementById('table-student').innerHTML = tableContent;
} 

// xóa sinh viên
function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id, 1);
    localStorage.setItem('students', JSON.stringify(students));
    writeListStudents();
}

// edit sinh viên
// var dataList = [];
// var student = {
//     'fullname': fullname,
//     'id': id,
//     'birthdate': birthdate,
//     'classs': classs,
//     'phonenumber': phonenumber,
//     'email': email,
//     'address': address,
//     'gender': gender
// };
// dataList.push(student);