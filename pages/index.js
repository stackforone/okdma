// pages/index.js
import { useState } from 'react';
import Head from 'next/head';
import { Calendar, CheckSquare, Clock, BookOpen, Gift, Target, PlusCircle, User, Menu, X } from 'lucide-react';
import Link from 'next/link'; // นำเข้า Link จาก next/link

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('daily');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'เขียนบันทึกประจำวัน', completed: true, points: 5 },
    { id: 2, title: 'ออกกำลังกาย 30 นาที', completed: false, points: 10 },
    { id: 3, title: 'อ่านหนังสือ 1 ชั่วโมง', completed: false, points: 15 },
  ]);
  const [newTask, setNewTask] = useState('');
  const [points, setPoints] = useState(5);

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        if (!task.completed) {
          setPoints(prev => prev + task.points);
        } else {
          setPoints(prev => prev - task.points);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        completed: false,
        points: 10,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-prompt">
      <Head>
        <title>Life Planner | วางแผนชีวิตและจัดการเวลา</title>
        <meta name="description" content="แอปพลิเคชันวางแผนชีวิตและจัดการเวลา" />
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
              <a href="#" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Clock className="h-5 w-5" />
                <span>ตารางเวลา</span>
              </a>
              <Link href="/goals" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="/่journal" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <a href="#" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </a>
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
              <a href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Clock className="h-5 w-5" />
                <span>ตารางเวลา</span>
              </a>
              <Link href="/goals" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="/่journal" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <a href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <User className="h-5 w-5" />
                <span>โปรไฟล์</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Point display */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium opacity-90">คะแนนของคุณ</h2>
              <p className="text-3xl font-bold">{points} แต้ม</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <Gift className="h-8 w-8" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-3 bg-white bg-opacity-20 rounded-full">
              <div 
                className="h-3 bg-white rounded-full" 
                style={{ width: `${Math.min(points / 100 * 100, 100)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-right">อีก {100 - points} แต้มเพื่อปลดล็อกรางวัลถัดไป</p>
          </div>
        </div>

        {/* Schedule tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === 'daily' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('daily')}
            >
              รายวัน
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === 'weekly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('weekly')}
            >
              รายสัปดาห์
            </button>
            <button 
              className={`flex-1 py-3 px-4 font-medium ${activeTab === 'monthly' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveTab('monthly')}
            >
              รายเดือน
            </button>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {activeTab === 'daily' ? 'ตารางประจำวัน' : activeTab === 'weekly' ? 'ตารางประจำสัปดาห์' : 'ตารางประจำเดือน'}
            </h3>
            
            <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                >
                  <div className="flex items-center space-x-3">
                    <button 
                      className={`h-6 w-6 rounded border flex items-center justify-center ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed && <CheckSquare className="h-5 w-5" />}
                    </button>
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                  </div>
                  <span className="text-sm font-medium text-indigo-600">{task.points} แต้ม</span>
                </div>
              ))}
            </div>
            
            {/* Add new task form */}
            <form onSubmit={addTask} className="mt-6 flex items-center space-x-2">
              <input
                type="text"
                placeholder="เพิ่มภารกิจใหม่..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition flex items-center space-x-1"
              >
                <PlusCircle className="h-5 w-5" />
                <span>เพิ่ม</span>
              </button>
            </form>
          </div>
        </div>
        
        {/* Goals and Journal sections */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Goals section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-4 px-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>เป้าหมายของฉัน</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">ออกกำลังกายอย่างน้อย 3 วันต่อสัปดาห์</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 rounded-full px-3 py-1">ระยะสั้น</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>ความคืบหน้า</span>
                      <span>1/3 วัน</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">อ่านหนังสือ 12 เล่มในปีนี้</h3>
                    <span className="text-sm bg-purple-100 text-purple-800 rounded-full px-3 py-1">ระยะยาว</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>ความคืบหน้า</span>
                      <span>2/12 เล่ม</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full w-1/6"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition flex items-center justify-center space-x-1">
                <PlusCircle className="h-5 w-5" />
                <span>เพิ่มเป้าหมายใหม่</span>
              </button>
            </div>
          </div>
          
          {/* Journal section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-500 py-4 px-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>บันทึกประจำวัน</span>
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-700 mb-2">26 กุมภาพันธ์ 2025</h3>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="เขียนความรู้สึกและสิ่งที่ได้เรียนรู้วันนี้..."
                ></textarea>
              </div>
              
              <button className="mt-2 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-1">
                <CheckSquare className="h-5 w-5" />
                <span>บันทึก</span>
              </button>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">บันทึกล่าสุด</h3>
                <div className="space-y-2">
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">25 กุมภาพันธ์ 2025</span>
                      <span className="text-xs text-gray-500">เมื่อวาน</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">วันนี้รู้สึกมีพลังมาก ทำงานเสร็จก่อนเวลา และได้ไปวิ่งในสวนสาธารณะ...</p>
                  </a>
                  <a href="#" className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">24 กุมภาพันธ์ 2025</span>
                      <span className="text-xs text-gray-500">2 วันที่แล้ว</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">รู้สึกเหนื่อยจากการทำงานวันนี้ แต่ได้พบกับเพื่อนเก่าที่ไม่ได้เจอกันนาน...</p>
                  </a>
                </div>
              </div>
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
                <li><a href="#" className="text-gray-400 hover:text-white transition">ตารางเวลา</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">เป้าหมาย</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">บันทึกประจำวัน</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">รางวัลและความสำเร็จ</a></li>
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