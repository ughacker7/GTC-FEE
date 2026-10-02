// Student Portal Logic - Gautam Teaching Center
import { db } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
    const phone = localStorage.getItem("studentPhone");
    if (!phone) {
        window.location.href = "index.html";
        return;
    }
    fetchStudentPortalData(phone);
});

window.handleLogout = function() {
    localStorage.removeItem("studentPhone");
    window.location.href = "index.html";
}

function fetchStudentPortalData(phone) {
    let students = localStorage.getItem("gtc_students");
    if (!students) return;
    students = JSON.parse(students);
    const student = students.find(s => s.phone === phone);

    if (!student) {
        alert("Student record not found!");
        window.location.href = "index.html";
        return;
    }

    const nameEl = document.getElementById('header-student-name');
    if (nameEl) nameEl.innerText = student.name;
    
    const profileName = document.getElementById('profile-name');
    if (profileName) profileName.innerText = student.name;

    const profileFather = document.getElementById('profile-father');
    if (profileFather) profileFather.innerText = student.fatherName;

    const profilePhone = document.getElementById('profile-phone');
    if (profilePhone) profilePhone.innerText = student.phone;
}