// Đối tượng Sinh Viên
class Student {
    constructor(id, code, name, gender, dob, hometown) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

// Lớp Quản Lý Sinh Viên
class StudentManager {
    constructor() {
        // Lấy danh sách sinh viên từ Local Storage
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    saveToLocalStorage() {
        // Lưu danh sách sinh viên vào Local Storage
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    addStudent(student) {
        this.students.push(student);
        this.saveToLocalStorage();
    }

    editStudent(index, student) {
        this.students[index] = student;
        this.saveToLocalStorage();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.saveToLocalStorage();
    }

    displayStudents() {
        const studentTable = document.querySelector('#sinhvien tbody');
        studentTable.innerHTML = '';

        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    }

    generateStudentCode() {
        return `SV${this.students.length + 1}`.padStart(5, '0');
    }
}

// Khởi tạo đối tượng quản lý sinh viên
const studentManager = new StudentManager();
studentManager.displayStudents();

// Xử lý khi nhấn nút "Thêm Sinh Viên"
function themsinhvien() {
    document.getElementById('studentForm').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Thêm Sinh Viên';
    document.getElementById('studentId').value = '';
    document.getElementById('studentCode').value = studentManager.generateStudentCode(); // Tạo mã sinh viên mới
    document.getElementById('name').value = '';
    document.getElementById('gender').value = 'Nam';
    document.getElementById('dob').value = '';
    document.getElementById('hometown').value = '';
}

// Lưu sinh viên khi nhấn nút "Lưu"
function saveStudent() {
    const id = document.getElementById('studentId').value || Date.now();
    const code = document.getElementById('studentCode').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, code, name, gender, dob, hometown);
    const index = document.getElementById('studentId').value;

    if (index) {
        // Sửa sinh viên
        const studentIndex = studentManager.students.findIndex(s => s.id == index);
        studentManager.editStudent(studentIndex, student);
    } else {
        // Thêm sinh viên mới
        studentManager.addStudent(student);
    }

    document.getElementById('studentForm').style.display = 'none';
    studentManager.displayStudents();
}

// Hủy thêm hoặc sửa sinh viên
function cancelForm() {
    document.getElementById('studentForm').style.display = 'none';
}

// Chỉnh sửa sinh viên khi nhấn nút "Edit"
function editStudent(index) {
    const student = studentManager.students[index];
    document.getElementById('studentForm').style.display = 'block';
    document.getElementById('formTitle').innerText = 'Sửa Sinh Viên';
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentCode').value = student.code;
    document.getElementById('name').value = student.name;
    document.getElementById('gender').value = student.gender;
    document.getElementById('dob').value = student.dob;
    document.getElementById('hometown').value = student.hometown;
}

// Xóa sinh viên khi nhấn nút "Delete"
function deleteStudent(index) {
    studentManager.deleteStudent(index);
    studentManager.displayStudents();
}
S