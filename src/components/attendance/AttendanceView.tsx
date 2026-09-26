import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GradeNumber, AttendanceRecord } from '../../types';
import {
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  Download,
  Filter,
  BarChart2,
  Edit2,
  Trash2,
  UserPlus,
  Search,
  Check
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const {
    selectedGrade,
    setSelectedGrade,
    attendanceData,
    updateAttendance,
    addAttendanceDate,
    addStudent,
    editStudent,
    deleteStudent,
    currentRole
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showAddDateModal, setShowAddDateModal] = useState(false);

  // Form states for Add Student
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState<GradeNumber>(selectedGrade);
  const [newStudentCustomId, setNewStudentCustomId] = useState('');

  // Form states for Edit Student
  const [editingStudent, setEditingStudent] = useState<AttendanceRecord | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');

  // Delete student target
  const [deletingStudent, setDeletingStudent] = useState<AttendanceRecord | null>(null);

  // Add date input
  const [newDateInput, setNewDateInput] = useState('');

  const rawStudents = attendanceData[selectedGrade] || [];

  // Filter students by search term
  const students = rawStudents.filter(st =>
    st.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Extract all unique dates from all students in current grade
  const allDatesSet = new Set<string>();
  rawStudents.forEach(st => {
    Object.keys(st.dates).forEach(d => allDatesSet.add(d));
  });
  const dateColumns = Array.from(allDatesSet).sort();

  // Status cycling helper
  const nextStatusMap: { [key: string]: 'present' | 'absent' | 'excused' | 'late' } = {
    present: 'absent',
    absent: 'excused',
    excused: 'late',
    late: 'present'
  };

  const getStatusBadge = (status: 'present' | 'absent' | 'excused' | 'late') => {
    switch (status) {
      case 'present':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">🟢 Bor</span>;
      case 'absent':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">🔴 Yo'q</span>;
      case 'excused':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold">🟡 Sababli</span>;
      case 'late':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold">🔵 Kechikdi</span>;
    }
  };

  // Calculate statistics
  let totalPresences = 0;
  let totalEntries = 0;
  rawStudents.forEach(st => {
    Object.values(st.dates).forEach(status => {
      totalEntries++;
      if (status === 'present' || status === 'late') {
        totalPresences++;
      }
    });
  });
  const overallPercentage = totalEntries > 0 ? Math.round((totalPresences / totalEntries) * 100) : 100;

  // Handlers
  const handleSaveNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) return;
    addStudent(newStudentGrade, newFirstName, newLastName, newStudentCustomId);
    setNewFirstName('');
    setNewLastName('');
    setNewStudentCustomId('');
    setShowAddStudentModal(false);
  };

  const handleOpenEdit = (student: AttendanceRecord) => {
    setEditingStudent(student);
    const parts = student.studentName.split(' ');
    setEditLastName(parts[0] || '');
    setEditFirstName(parts.slice(1).join(' ') || '');
    setShowEditStudentModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editFirstName.trim() || !editLastName.trim()) return;
    editStudent(selectedGrade, editingStudent.studentId, editFirstName, editLastName);
    setShowEditStudentModal(false);
    setEditingStudent(null);
  };

  const handleOpenDelete = (student: AttendanceRecord) => {
    setDeletingStudent(student);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingStudent) {
      deleteStudent(selectedGrade, deletingStudent.studentId);
      setShowDeleteConfirmModal(false);
      setDeletingStudent(null);
    }
  };

  const handleAddNewDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDateInput) return;
    addAttendanceDate(selectedGrade, newDateInput);
    setNewDateInput('');
    setShowAddDateModal(false);
  };

  const exportCSV = () => {
    let csv = `ID,O'quvchi,Sinf,${dateColumns.join(',')},Davomat Foizi\n`;
    rawStudents.forEach(st => {
      const studentPresences = dateColumns.filter(d => st.dates[d] === 'present' || st.dates[d] === 'late').length;
      const pct = dateColumns.length > 0 ? Math.round((studentPresences / dateColumns.length) * 100) : 100;
      const datesVals = dateColumns.map(d => st.dates[d] || 'present').join(',');
      csv += `"${st.studentId}","${st.studentName}",${selectedGrade}-sinf,${datesVals},${pct}%\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedGrade}_sinf_davomat.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            Maktab Ta'lim Nazorati
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            📅 Davomat Daftarchasi
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Har bir sinf o'quvchilari uchun kunlik, haftalik va oylik interaktiv davomat jurnali
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          {([8, 9, 10, 11] as GradeNumber[]).map(grade => (
            <button
              key={grade}
              onClick={() => {
                setSelectedGrade(grade);
                setNewStudentGrade(grade);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {grade}-sinf
            </button>
          ))}
        </div>
      </div>

      {/* Prominent Action Bar with ➕ O'QUVCHI QO'SHISH Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 dark:from-emerald-950/40 dark:via-teal-950/40 dark:to-sky-950/40 p-5 rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md">
            👨‍🎓
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedGrade}-SINF DAVOMATI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Jami o'quvchilar: {rawStudents.length} nafar • Dars kunlari: {dateColumns.length} kun
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* ➕ O'QUVCHI QO'SHISH Button */}
          <button
            onClick={() => {
              setNewStudentGrade(selectedGrade);
              setShowAddStudentModal(true);
            }}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center gap-2 active:scale-98"
          >
            <UserPlus className="w-4 h-4" />
            ➕ O'QUVCHI QO'SHISH
          </button>

          {/* Sana Qo'shish */}
          <button
            onClick={() => setShowAddDateModal(true)}
            className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            Sana qo'shish
          </button>

          {/* Export CSV */}
          <button
            onClick={exportCSV}
            className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-blue-500" />
            CSV yuklash
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Sinf o'quvchilari
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {rawStudents.length} nafar
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            O'tkazilgan darslar
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {dateColumns.length} kun
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Davomat foizi
          </span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {overallPercentage}%
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Jurnal holati
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            Saqlangan 💾
          </div>
        </div>
      </div>

      {/* Search & Legend Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="O'quvchini qidirish..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
          <span className="font-bold text-slate-800 dark:text-slate-200">Belgilar:</span>
          <span>🟢 Bor</span>
          <span>🔴 Yo'q</span>
          <span>🟡 Sababli</span>
          <span>🔵 Kechikdi</span>
          <span className="text-slate-400 hidden lg:inline">• Katak ustiga bosib holatni o'zgartiring</span>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-4 w-10 text-center">#</th>
                <th className="px-5 py-4 min-w-[220px]">O'quvchi (Familiya Ism)</th>
                {dateColumns.map(d => (
                  <th key={d} className="px-3 py-4 text-center min-w-[95px] whitespace-nowrap">
                    {d}
                  </th>
                ))}
                <th className="px-5 py-4 text-center min-w-[80px]">Foiz</th>
                <th className="px-4 py-4 text-center min-w-[100px]">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={dateColumns.length + 4} className="text-center py-12 text-slate-400">
                    Ushbu sinfda o'quvchilar topilmadi. "➕ O'quvchi qo'shish" tugmasi orqali yangi o'quvchi qo'shing.
                  </td>
                </tr>
              ) : (
                students.map((st, idx) => {
                  const studentPresences = dateColumns.filter(d => st.dates[d] === 'present' || st.dates[d] === 'late').length;
                  const studentPct = dateColumns.length > 0 ? Math.round((studentPresences / dateColumns.length) * 100) : 100;

                  return (
                    <tr key={st.studentId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3.5 text-center text-xs font-mono text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{st.studentName}</span>
                          {st.studentId && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 font-mono">
                              {st.studentId}
                            </span>
                          )}
                        </div>
                      </td>
                      {dateColumns.map(dateStr => {
                        const status = st.dates[dateStr] || 'present';
                        return (
                          <td key={dateStr} className="px-3 py-3.5 text-center">
                            <button
                              onClick={() => {
                                const nextStatus = nextStatusMap[status] || 'present';
                                updateAttendance(selectedGrade, st.studentId, dateStr, nextStatus);
                              }}
                              className="hover:scale-105 active:scale-95 transition-transform"
                              title="Holatni almashtirish uchun bosing"
                            >
                              {getStatusBadge(status)}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-5 py-3.5 text-center font-bold font-mono text-xs">
                        <span className={`px-2 py-1 rounded-lg ${
                          studentPct >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          studentPct >= 70 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {studentPct}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* ✏️ Tahrirlash */}
                          <button
                            onClick={() => handleOpenEdit(st)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Tahrirlash"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {/* 🗑️ O'chirish */}
                          <button
                            onClick={() => handleOpenDelete(st)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ➕ Modal: O'quvchi Qo'shish */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              Yangi o'quvchi qo'shish
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              O'quvchi ma'lumotlarini kiriting. Saqlangandan so'ng u darhol {selectedGrade}-sinf davomat jadvalida aks etadi.
            </p>

            <form onSubmit={handleSaveNewStudent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Familiya: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Karimova"
                  value={newLastName}
                  onChange={e => setNewLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ism: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Nilufar"
                  value={newFirstName}
                  onChange={e => setNewFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Sinf:
                </label>
                <select
                  value={newStudentGrade}
                  onChange={e => setNewStudentGrade(Number(e.target.value) as GradeNumber)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold"
                >
                  <option value={8}>8-sinf</option>
                  <option value={9}>9-sinf</option>
                  <option value={10}>10-sinf</option>
                  <option value={11}>11-sinf</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  O'quvchi ID (ixtiyoriy):
                </label>
                <input
                  type="text"
                  placeholder="Masalan: ID-805"
                  value={newStudentCustomId}
                  onChange={e => setNewStudentCustomId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  BEKOR QILISH
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase shadow-md transition-all"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✏️ Modal: O'quvchini Tahrirlash */}
      {showEditStudentModal && editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-emerald-600" />
              O'quvchi ma'lumotlarini tahrirlash
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {editingStudent.studentName} ma'lumotlarini yangilang
            </p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Familiya:
                </label>
                <input
                  type="text"
                  required
                  value={editLastName}
                  onChange={e => setEditLastName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Ism:
                </label>
                <input
                  type="text"
                  required
                  value={editFirstName}
                  onChange={e => setEditFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditStudentModal(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100"
                >
                  BEKOR QILISH
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase shadow-md"
                >
                  SAQLASH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗑️ Modal: O'chirishni Tasdiqlash */}
      {showDeleteConfirmModal && deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 mx-auto flex items-center justify-center text-2xl mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              O'quvchini o'chirish
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Haqiqatan ham <strong>"{deletingStudent.studentName}"</strong>ni {selectedGrade}-sinf davomat jurnali ro'yxatidan o'chirmoqchimisiz?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase shadow-md"
              >
                Ha, o'chirilsin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📅 Modal: Sana Qo'shish */}
      {showAddDateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Yangi dars sanasi qo'shish
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {selectedGrade}-sinf davomat ro'yxatiga yangi dars sanasi ustunini kiriting
            </p>
            <form onSubmit={handleAddNewDate} className="space-y-4">
              <input
                type="date"
                required
                value={newDateInput}
                onChange={e => setNewDateInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
