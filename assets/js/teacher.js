// Teacher Portal Logic - Gautam Teaching Center
import { db } from './firebase-config.js';

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("teacherLoggedIn") !== "true") {
        window.location.href = "index.html";
    }
    renderDashboard();
});

window.handleLogout = function() {
    localStorage.removeItem("teacherLoggedIn");
    window.location.href = "index.html";
}

function getStudents() {
    let students = localStorage.getItem("gtc_students");
    if (!students) {
        students = [
            { id: "1", name: "ABC Kumar", fatherName: "XYZ Sharma", phone: "9999999999", admissionDate: "1/1/2026", monthlyFee: 150, paidCycles: 2, balance: 1500, transactions: [] }
        ];
        localStorage.setItem("gtc_students", JSON.stringify(students));
    }
    return JSON.parse(students);
}

function renderDashboard() {
    const students = getStudents();
    const tbody = document.getElementById('students-table-body');
    if (!tbody) return;

    let html = "";
    let totalDues = 0;
    let advanceCount = 0;

    students.forEach((s) => {
        if (s.balance > 0) totalDues += s.balance;
        if (s.balance < 0) advanceCount++;

        html += `
            <tr class="hover:bg-slate-50/80 transition-all">
                <td class="p-4 flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 overflow-hidden flex items-center justify-center font-bold">
                        ${s.name.charAt(0)}
                    </div>
                    <div>
                        <p class="font-bold text-slate-900">${s.name}</p>
                        <p class="text-xs text-slate-400">Mob: ${s.phone}</p>
                    </div>
                </td>
                <td class="p-4 font-medium text-slate-600">${s.fatherName}</td>
                <td class="p-4 text-slate-500">${s.admissionDate}</td>
                <td class="p-4 font-semibold text-slate-900">₹${s.monthlyFee}/mo</td>
                <td class="p-4 text-slate-600">${s.paidCycles} / 12 Cycles</td>
                <td class="p-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold ${s.balance < 0 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}">
                        ${s.balance < 0 ? `+₹${Math.abs(s.balance)} Advance` : `Due: ₹${s.balance}`}
                    </span>
                </td>
                <td class="p-4 text-right space-x-1">
                    <button onclick="openPaymentModal('${s.id}')" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all">Pay</button>
                    <button onclick="deleteStudent('${s.id}')" class="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all">Delete</button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    const totalCountEl = document.getElementById('total-students-count');
    const advCountEl = document.getElementById('advance-students-count');
    const duesEl = document.getElementById('total-pending-dues');

    if (totalCountEl) totalCountEl.innerText = `${students.length} Active`;
    if (advCountEl) advCountEl.innerText = `${advanceCount} Students`;
    if (duesEl) duesEl.innerText = `₹${totalDues}`;
}