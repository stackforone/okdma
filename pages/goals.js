// pages/goals.js
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, CheckSquare, Clock, BookOpen, Gift, Target, PlusCircle, User, Menu, X, ArrowLeft, Edit, Trash2, AlertCircle, Award } from 'lucide-react';

export default function Goals() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddGoalForm, setShowAddGoalForm] = useState(false);
  const [points, setPoints] = useState(45);
  const [goalType, setGoalType] = useState('short');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      title: 'ออกกำลังกายอย่างน้อย 3 วันต่อสัปดาห์', 
      progress: 1, 
      target: 3, 
      type: 'short',
      deadline: '29 ก.พ. 2025',
      category: 'สุขภาพ',
      created: '22 ก.พ. 2025'
    },
    { 
      id: 2, 
      title: 'อ่านหนังสือ 12 เล่มในปีนี้', 
      progress: 2, 
      target: 12, 
      type: 'long',
      deadline: '31 ธ.ค. 2025',
      category: 'การเรียนรู้',
      created: '15 ม.ค. 2025'
    },
    { 
      id: 3, 
      title: 'เรียนรู้ทักษะใหม่ 1 อย่างทุกเดือน', 
      progress: 2, 
      target: 12, 
      type: 'long',
      deadline: '31 ธ.ค. 2025',
      category: 'การพัฒนาตนเอง',
      created: '1 ม.ค. 2025'
    },
    { 
      id: 4, 
      title: 'ประหยัดเงิน 100,000 บาท', 
      progress: 25000, 
      target: 100000, 
      type: 'long',
      deadline: '31 ธ.ค. 2025',
      category: 'การเงิน',
      created: '15 ม.ค. 2025'
    },
    { 
      id: 5, 
      title: 'ดื่มน้ำอย่างน้อยวันละ 2 ลิตร', 
      progress: 5, 
      target: 7, 
      type: 'short',
      deadline: '2 มี.ค. 2025',
      category: 'สุขภาพ',
      created: '24 ก.พ. 2025'
    }
  ]);

  const addGoal = (e) => {
    e.preventDefault();
    if (newGoalTitle.trim() && newGoalTarget.trim() && newGoalDeadline.trim()) {
      const newGoal = {
        id: Date.now(),
        title: newGoalTitle,
        progress: 0,
        target: parseInt(newGoalTarget),
        type: goalType,
        deadline: newGoalDeadline,
        category: 'ทั่วไป',
        created: '26 ก.พ. 2025'
      };
      
      setGoals([...goals, newGoal]);
      setNewGoalTitle('');
      setNewGoalTarget('');
      setNewGoalDeadline('');
      setShowAddGoalForm(false);
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const incrementProgress = (id) => {
    setGoals(goals.map(goal => {
      if (goal.id === id && goal.progress < goal.target) {
        setPoints(prev => prev + 5); // Add points when making progress
        return {...goal, progress: goal.progress + 1};
      }
      return goal;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-prompt">
      <Head>
        <title>เป้าหมาย | Life Planner</title>
        <meta name="description" content="จัดการเป้าหมายระยะสั้นและระยะยาวของคุณ" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <h1 className="text-xl md:text-2xl font-bold">Life Planner</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6">
              <Link href="/" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Clock className="h-5 w-5" />
                <span>ตารางเวลา</span>
              </Link>
              <Link href="/goals" className="flex items-center space-x-1 text-white bg-indigo-700 px-3 py-1 rounded-md">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="journal" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <Link href="#" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </Link>
            </nav>
            <button className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition font-medium">
              <User className="h-5 w-5" />
              <span>โปรไฟล์</span>
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-indigo-700 px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Clock className="h-5 w-5" />
                <span>ตารางเวลา</span>
              </Link>
              <Link href="/goals" className="flex items-center space-x-2 text-white bg-indigo-800 rounded px-2 py-2">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <User className="h-5 w-5" />
                <span>โปรไฟล์</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page header with breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-indigo-600">หน้าหลัก</Link>
              <span>/</span>
              <span className="text-gray-700">เป้าหมาย</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center space-x-2">
              <Target className="h-6 w-6 text-indigo-600" />
              <span>เป้าหมายของฉัน</span>
            </h1>
          </div>

          {/* Points display */}
          <div className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow px-4 py-3 text-white">
            <div className="flex items-center space-x-3">
              <Award className="h-6 w-6" />
              <div>
                <div className="text-xs opacity-80">คะแนนทั้งหมดของคุณ</div>
                <div className="text-xl font-bold">{points} แต้ม</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons for goals management */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setShowAddGoalForm(true)} 
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>เพิ่มเป้าหมายใหม่</span>
          </button>

          <Link 
            href="#" 
            className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <Clock className="h-5 w-5" />
            <span>เป้าหมายที่กำลังดำเนินการ</span>
          </Link>

          <Link 
            href="#" 
            className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <CheckSquare className="h-5 w-5" />
            <span>เป้าหมายที่สำเร็จแล้ว</span>
          </Link>
        </div>

        {/* Add Goal Form */}
        {showAddGoalForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">เพิ่มเป้าหมายใหม่</h2>
              <button 
                onClick={() => setShowAddGoalForm(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addGoal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อเป้าหมาย</label>
                    <input
                      type="text"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="เช่น ออกกำลังกายสัปดาห์ละ 3 วัน"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทเป้าหมาย</label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="short-term"
                          name="goal-type"
                          value="short"
                          checked={goalType === 'short'}
                          onChange={(e) => setGoalType(e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="short-term" className="ml-2 text-sm text-gray-700">เป้าหมายระยะสั้น</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="long-term"
                          name="goal-type"
                          value="long"
                          checked={goalType === 'long'}
                          onChange={(e) => setGoalType(e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="long-term" className="ml-2 text-sm text-gray-700">เป้าหมายระยะยาว</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>ทั่วไป</option>
                      <option>สุขภาพ</option>
                      <option>การเงิน</option>
                      <option>การเรียนรู้</option>
                      <option>อาชีพ</option>
                      <option>ครอบครัว</option>
                      <option>การพัฒนาตนเอง</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เป้าหมาย (จำนวน)</label>
                    <input
                      type="number"
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="เช่น 3 ครั้ง"
                      required
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">กำหนดเสร็จสิ้น</label>
                    <input
                      type="text"
                      value={newGoalDeadline}
                      onChange={(e) => setNewGoalDeadline(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="เช่น 31 มี.ค. 2025"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">บันทึกเพิ่มเติม</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="รายละเอียดเพิ่มเติมของเป้าหมาย (ไม่จำเป็น)"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddGoalForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  บันทึกเป้าหมาย
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Goals Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">เป้าหมายทั้งหมด</h3>
            <p className="text-3xl font-bold mt-2">{goals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">เป้าหมายที่สำเร็จแล้ว</h3>
            <p className="text-3xl font-bold mt-2">2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <h3 className="text-gray-500 text-sm font-medium">กำลังดำเนินการ</h3>
            <p className="text-3xl font-bold mt-2">{goals.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">เลยกำหนด</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        {/* Goals Sections */}
        <div className="space-y-6">
          {/* Short-term goals */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">ระยะสั้น</span>
              <span>เป้าหมายระยะสั้น</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.filter(goal => goal.type === 'short').map(goal => (
                <div key={goal.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div className="p-5">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">สร้างเมื่อ {goal.created}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">{goal.category}</span>
                    </div>
                    <h3 className="font-medium text-lg mt-2">{goal.title}</h3>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>ความคืบหน้า</span>
                        <span className="font-medium">{goal.progress}/{goal.target}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>กำหนดเสร็จ: {goal.deadline}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-indigo-600" title="แก้ไข">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-red-600" 
                        title="ลบ"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <button 
                      className="bg-blue-100 text-blue-700 rounded-lg px-3 py-1 text-sm flex items-center space-x-1 hover:bg-blue-200 transition"
                      onClick={() => incrementProgress(goal.id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>เพิ่มความคืบหน้า</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Long-term goals */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <span className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-medium">ระยะยาว</span>
              <span>เป้าหมายระยะยาว</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.filter(goal => goal.type === 'long').map(goal => (
                <div key={goal.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <div className="p-5">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">สร้างเมื่อ {goal.created}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">{goal.category}</span>
                    </div>
                    <h3 className="font-medium text-lg mt-2">{goal.title}</h3>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>ความคืบหน้า</span>
                        <span className="font-medium">
                          {goal.category === 'การเงิน' 
                            ? `${goal.progress.toLocaleString()}/${goal.target.toLocaleString()} บาท`
                            : `${goal.progress}/${goal.target}`
                          }
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-purple-500 rounded-full" 
                          style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-3 text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>กำหนดเสร็จ: {goal.deadline}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-indigo-600" title="แก้ไข">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-gray-600 hover:text-red-600" 
                        title="ลบ"
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <button 
                      className="bg-purple-100 text-purple-700 rounded-lg px-3 py-1 text-sm flex items-center space-x-1 hover:bg-purple-200 transition"
                      onClick={() => incrementProgress(goal.id)}
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>เพิ่มความคืบหน้า</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Life Planner</span>
              </h3>
              <p className="text-gray-400">แอปพลิเคชันที่ช่วยให้คุณวางแผนชีวิต จัดการเวลา ตั้งเป้าหมาย และบันทึกความก้าวหน้าของตัวเองได้อย่างมีประสิทธิภาพ</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">เมนูหลัก</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition">ตารางเวลา</Link></li>
                <li><Link href="/goals" className="text-gray-400 hover:text-white transition">เป้าหมาย</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">บันทึกประจำวัน</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition">รางวัลและความสำเร็จ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
              <p className="text-gray-400 mb-2">มีคำถามหรือข้อเสนอแนะ? ติดต่อเราได้ที่</p>
              <a href="mailto:contact@lifeplanner.com" className="text-indigo-400 hover:text-indigo-300 transition">contact@lifeplanner.com</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
            &copy; 2025 Life Planner. สงวนลิขสิทธิ์.
          </div>
        </div>
      </footer>
    </div>
  );
}
