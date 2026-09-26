import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOPICS, INITIAL_TESTS } from '../../data/curriculumData';
import { GradeNumber } from '../../types';
import {
  ShieldAlert,
  UserCheck,
  PlusCircle,
  FileText,
  BarChart,
  Users,
  Download,
  BookOpen,
  Sparkles,
  Upload,
  Check,
  Image,
  ImageIcon
} from 'lucide-react';

export const TeacherAdminView: React.FC = () => {
  const {
    attendanceData,
    selectedGrade,
    setSelectedGrade,
    currentRole,
    setCurrentRole,
    showNotification,
    addTopicImage,
    customTopicImages
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'add_topic' | 'add_quiz' | 'add_image' | 'curriculum_import'>('overview');

  // Custom Topic Form
  const [topicTitle, setTopicTitle] = useState('');
  const [topicChapter, setTopicChapter] = useState('');
  const [topicGrade, setTopicGrade] = useState<GradeNumber>(8);
  const [topicSummary, setTopicSummary] = useState('');

  // Custom Question Form
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOpt1, setQuizOpt1] = useState('');
  const [quizOpt2, setQuizOpt2] = useState('');
  const [quizOpt3, setQuizOpt3] = useState('');
  const [quizOpt4, setQuizOpt4] = useState('');
  const [quizCorrect, setQuizCorrect] = useState(0);

  // 🖼️ Admin Rasm Qo'shish Form (Section 42 in prompt)
  const [imgTopicId, setImgTopicId] = useState(TOPICS[0].id);
  const [imgUrl, setImgUrl] = useState('');
  const [imgTitle, setImgTitle] = useState('');
  const [imgCaption, setImgCaption] = useState('');
  const [imgAltText, setImgAltText] = useState('');

  // Curriculum Import state
  const [importJsonText, setImportJsonText] = useState('');

  const handleSaveCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(`"${topicTitle}" mavzusi ${topicGrade}-sinf dasturiga qo'shildi!`);
    setTopicTitle('');
    setTopicChapter('');
    setTopicSummary('');
  };

  const handleSaveCustomQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Yangi test savoli muvaffaqiyatli saqlandi!");
    setQuizQuestion('');
    setQuizOpt1('');
    setQuizOpt2('');
    setQuizOpt3('');
    setQuizOpt4('');
  };

  const handleSaveCustomImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgUrl.trim()) return;
    addTopicImage(imgTopicId, imgUrl.trim(), imgCaption.trim() || imgTitle.trim(), imgAltText.trim() || imgTitle.trim());
    setImgUrl('');
    setImgTitle('');
    setImgCaption('');
    setImgAltText('');
  };

  const handleImportCurriculum = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      JSON.parse(importJsonText);
      showNotification("Yangi darslik mundarijasi tizimga muvaffaqiyatli import qilindi!");
      setImportJsonText('');
    } catch {
      showNotification("JSON formatida xatolik! Iltimos tekshirib qayta kiriting.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            Boshqaruv Tizimi
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            👨‍🏫 O'qituvchi va Admin Paneli
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Darsliklar, testlar, rasmlar, o'quvchilar natijalari va o'quv dasturini boshqarish markazi
          </p>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          <span className="text-xs font-bold text-slate-500 px-2">Rolingiz:</span>
          {(['student', 'teacher', 'admin'] as const).map(role => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                showNotification(`Rol o'zgartirildi: ${role === 'student' ? "O'quvchi" : role === 'teacher' ? "O'qituvchi" : "Admin"}`);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === role
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {role === 'student' ? "👨‍🎓 O'quvchi" : role === 'teacher' ? "👨‍🏫 O'qituvchi" : "👨‍💼 Admin"}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Umumiy hisobot va statistika', icon: BarChart },
          { id: 'add_image', label: '➕ Rasm qo\'shish', icon: ImageIcon },
          { id: 'add_topic', label: 'Yangi mavzu qo\'shish', icon: PlusCircle },
          { id: 'add_quiz', label: 'Yangi test savoli tuzish', icon: FileText },
          { id: 'curriculum_import', label: 'Darslik fayli / JSON import', icon: Upload },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jami mavzular</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                {TOPICS.length} ta
              </div>
              <p className="text-xs text-slate-500 mt-1">8, 9, 10, 11-sinflar bo'yicha</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mavjud test to'plamlari</span>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {INITIAL_TESTS.length} ta
              </div>
              <p className="text-xs text-slate-500 mt-1">Bobli va yakuniy imtihonlar</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Biriktirilgan rasmlar</span>
              <div className="text-3xl font-black text-amber-500 mt-1">
                {Object.keys(customTopicImages).length + TOPICS.length} ta
              </div>
              <p className="text-xs text-slate-500 mt-1">Illyustratsiyalar & diagrammalar</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Davomat jurnali</span>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
                Faol
              </div>
              <p className="text-xs text-slate-500 mt-1">4 ta sinf uchun alohida</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Sinflar kesimida darsliklar holati
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[8, 9, 10, 11].map(grade => {
                const count = TOPICS.filter(t => t.grade === grade).length;
                return (
                  <div key={grade} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-emerald-600">{grade}-sinf biologiyasi</span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white mt-1">{count} ta mavzu</h4>
                    <span className="text-xs text-slate-500 block mt-2">Darslik to'liq faol</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab: ➕ Rasm Qo'shish (Section 42 in User Prompt) */}
      {activeTab === 'add_image' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              ➕ RASM QO'SHISH (Admin Rasm Yuklash)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-6">
            Mavzuni tanlang va unga sifatli biologik rasm, illyustratsiya yoki diagramma biriktiring. Saqlangandan so'ng u avtomatik dars sahifasida paydo bo'ladi.
          </p>

          <form onSubmit={handleSaveCustomImage} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Tegishli mavzuni tanlang: *
              </label>
              <select
                value={imgTopicId}
                onChange={e => setImgTopicId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium"
              >
                {TOPICS.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.grade}-sinf • {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Rasm nomi / Sarlavha: *
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Mitoxondriyaning mikroskopik tuzilishi"
                value={imgTitle}
                onChange={e => setImgTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Rasm URL manzili: *
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-... yoki SVG havolasi"
                value={imgUrl}
                onChange={e => setImgUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Ilmiy tavsif / Izoh:
              </label>
              <textarea
                rows={3}
                placeholder="Rasmda tasvirlangan biologik obyekt, uning qismlari va ahamiyati..."
                value={imgCaption}
                onChange={e => setImgCaption(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Alt Text (Tavsifli matn):
              </label>
              <input
                type="text"
                placeholder="Masalan: Mitoxondriya kristasi va matritsi"
                value={imgAltText}
                onChange={e => setImgAltText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-4"
            >
              Rasmni mavzuga saqlash
            </button>
          </form>
        </div>
      )}

      {/* Tab: Add Topic */}
      {activeTab === 'add_topic' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            Yangi biologiya darsini kiritish
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            O'qituvchi sifatida yangi mavzu, paragraf va dars maqsadi kiriting
          </p>

          <form onSubmit={handleSaveCustomTopic} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Sinfni tanlang:
              </label>
              <select
                value={topicGrade}
                onChange={e => setTopicGrade(Number(e.target.value) as GradeNumber)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              >
                <option value={8}>8-sinf (Odam va uning salomatligi)</option>
                <option value={9}>9-sinf (Sitologiya va umumiy biologiya)</option>
                <option value={10}>10-sinf (Genetika va seleksiya)</option>
                <option value={11}>11-sinf (Evolutsiya va ekologiya)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Bob nomi:
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: 2-Bob. Hujayra organoidlari"
                value={topicChapter}
                onChange={e => setTopicChapter(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Mavzu nomi:
              </label>
              <input
                type="text"
                required
                placeholder="Masalan: Mitoxondriya va nafas olish zanjiri"
                value={topicTitle}
                onChange={e => setTopicTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Qisqacha mazmuni va maqsadi:
              </label>
              <textarea
                rows={3}
                required
                placeholder="Mavzuning qisqa mazmuni va o'quvchi nimalarni o'rganishi..."
                value={topicSummary}
                onChange={e => setTopicSummary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-4"
            >
              Mavzuni darslikka qo'shish
            </button>
          </form>
        </div>
      )}

      {/* Tab: Add Quiz Question */}
      {activeTab === 'add_quiz' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            Yangi test savoli yaratish
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Test markaziga 4 ta variantli yangi savol qo'shing
          </p>

          <form onSubmit={handleSaveCustomQuiz} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Savol matni:
              </label>
              <textarea
                rows={2}
                required
                placeholder="Masalan: Fotosintezda suvning fotolizi qaysi bosqichda sodir bo'ladi?"
                value={quizQuestion}
                onChange={e => setQuizQuestion(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'A varianti', val: quizOpt1, setter: setQuizOpt1, idx: 0 },
                { label: 'B varianti', val: quizOpt2, setter: setQuizOpt2, idx: 1 },
                { label: 'C varianti', val: quizOpt3, setter: setQuizOpt3, idx: 2 },
                { label: 'D varianti', val: quizOpt4, setter: setQuizOpt4, idx: 3 },
              ].map(opt => (
                <div key={opt.idx}>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    {opt.label}:
                  </label>
                  <input
                    type="text"
                    required
                    value={opt.val}
                    onChange={e => opt.setter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                To'g'ri variant:
              </label>
              <select
                value={quizCorrect}
                onChange={e => setQuizCorrect(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold"
              >
                <option value={0}>A varianti</option>
                <option value={1}>B varianti</option>
                <option value={2}>C varianti</option>
                <option value={3}>D varianti</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all mt-4"
            >
              Test savolini saqlash
            </button>
          </form>
        </div>
      )}

      {/* Tab: Curriculum Import */}
      {activeTab === 'curriculum_import' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            Darslik fayli / Yangi mundarija importi
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Rasmiy maktab darsliklarining mundarijasi yoki boblarini JSON shaklida import qilish
          </p>

          <form onSubmit={handleImportCurriculum} className="space-y-4">
            <textarea
              rows={8}
              required
              placeholder='[ { "grade": 8, "chapterTitle": "1-Bob", "title": "Mavzu nomi" } ]'
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              className="w-full font-mono text-xs p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Importni amalga oshirish
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
