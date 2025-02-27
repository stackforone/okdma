// pages/profile.js
import { useState } from 'react';
import Head from 'next/head';
import { Calendar, CheckSquare, Clock, BookOpen, Gift, Target, PlusCircle, User, Menu, X, Edit, Camera, Award, TrendingUp, Zap, Heart, Mail, Lock, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ข้อมูลทั่วไป');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'เทส ระบบ',
    email: 'somchai@example.com',
    birthdate: '15 มีนาคม 1990',
    bio: 'นักพัฒนาซอฟต์แวร์ที่ชอบการเรียนรู้สิ่งใหม่ๆ หลงใหลในการอ่านหนังสือและการเดินทาง',
    interests: ['การเขียนโค้ด', 'การอ่านหนังสือ', 'การเดินทาง', 'การออกกำลังกาย'],
    joinDate: '10 มกราคม 2025'
  });
  
  const stats = {
    totalPoints: 384,
    tasksCompleted: 47,
    goalsAchieved: 5,
    journalEntries: 32,
    streak: 7,
    level: 3
  };
  
  const achievements = [
    { id: 1, title: 'เริ่มต้นการเดินทาง', description: 'เข้าสู่ระบบครบ 7 วันติดต่อกัน', icon: <Zap className="h-5 w-5" />, date: '17 มกราคม 2025', color: 'bg-blue-500' },
    { id: 2, title: 'นักเขียนหน้าใหม่', description: 'เขียนบันทึก 10 รายการ', icon: <BookOpen className="h-5 w-5" />, date: '25 มกราคม 2025', color: 'bg-purple-500' },
    { id: 3, title: 'ทำสำเร็จ!', description: 'ทำภารกิจเสร็จครบ 30 รายการ', icon: <CheckSquare className="h-5 w-5" />, date: '5 กุมภาพันธ์ 2025', color: 'bg-green-500' },
    { id: 4, title: 'ผู้พิชิตเป้าหมาย', description: 'บรรลุเป้าหมายระยะสั้น 3 รายการ', icon: <Target className="h-5 w-5" />, date: '15 กุมภาพันธ์ 2025', color: 'bg-amber-500' },
  ];
  
  const recentActivities = [
    { id: 1, action: 'ทำภารกิจเสร็จสิ้น', target: 'อ่านหนังสือ 1 ชั่วโมง', date: '26 กุมภาพันธ์ 2025', time: '18:45', points: 15 },
    { id: 2, action: 'สร้างเป้าหมายใหม่', target: 'เรียนรู้ภาษาใหม่ 1 ภาษา', date: '25 กุมภาพันธ์ 2025', time: '10:30', points: 0 },
    { id: 3, action: 'บันทึกประจำวัน', target: 'เขียนบันทึกความก้าวหน้า', date: '24 กุมภาพันธ์ 2025', time: '21:15', points: 5 },
    { id: 4, action: 'เปิดใช้งานมือถือ', target: 'แอป Life Planner', date: '24 กุมภาพันธ์ 2025', time: '08:10', points: 0 },
  ];
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = (e) => {
    e.preventDefault();
    // ในสถานการณ์จริงควรมีการอัปเดตข้อมูลไปยัง backend
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-prompt">
      <Head>
        <title>โปรไฟล์ | Life Planner</title>
        <meta name="description" content="โปรไฟล์ผู้ใช้ - Life Planner" />
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
              <Link href="/goals" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="/journal" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <Link href="/rewards" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </Link>
            </nav>
            <Link href="/profile" className="flex items-center space-x-1 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition font-medium">
              <User className="h-5 w-5" />
              <span>โปรไฟล์</span>
            </Link>
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
              <Link href="/goals" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="/journal" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <BookOpen className="h-5 w-5" />
                <span>บันทึก</span>
              </Link>
              <Link href="/rewards" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Gift className="h-5 w-5" />
                <span>รางวัล</span>
              </Link>
              <Link href="/profile" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <User className="h-5 w-5" />
                <span>โปรไฟล์</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-40 relative">
            <button className="absolute top-4 right-4 bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition">
              <Camera className="h-5 w-5 text-white" />
            </button>
          </div>
          
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6">
              <div className="bg-white p-1 rounded-full shadow-lg">
                <div className="rounded-full bg-indigo-100 h-24 w-24 flex items-center justify-center text-indigo-600 relative">
                  <User className="h-12 w-12" />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full hover:bg-indigo-700 transition">
                    <Camera className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-4 md:mb-2 flex-1">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <div className="flex flex-wrap items-center text-gray-600 mt-1 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-amber-500" />
                    <span>ระดับ {stats.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span>{stats.totalPoints} แต้ม</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{stats.streak} วันติดต่อกัน</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleEditProfile}
                className="mt-4 md:mt-0 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>{isEditing ? 'ยกเลิก' : 'แก้ไขโปรไฟล์'}</span>
              </button>
            </div>
            
            <div className="mt-2">
              <p className="text-gray-700">{userData.bio}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {userData.interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Stats */}
          <div className="md:col-span-1 space-y-8">
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">สถิติของฉัน</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">คะแนนทั้งหมด</span>
                      <span className="font-medium">{stats.totalPoints} แต้ม</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-500 rounded-full" 
                        style={{ width: `${Math.min((stats.totalPoints % 100) / 100 * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1 text-gray-500">
                      อีก {100 - (stats.totalPoints % 100)} แต้มเพื่อขึ้นระดับถัดไป
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center">
                        <CheckSquare className="h-6 w-6 text-green-500 mb-1" />
                        <p className="text-2xl font-bold">{stats.tasksCompleted}</p>
                        <p className="text-gray-600 text-sm">ภารกิจสำเร็จ</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center">
                        <Target className="h-6 w-6 text-amber-500 mb-1" />
                        <p className="text-2xl font-bold">{stats.goalsAchieved}</p>
                        <p className="text-gray-600 text-sm">เป้าหมายสำเร็จ</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center">
                        <BookOpen className="h-6 w-6 text-blue-500 mb-1" />
                        <p className="text-2xl font-bold">{stats.journalEntries}</p>
                        <p className="text-gray-600 text-sm">บันทึกประจำวัน</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center">
                        <Zap className="h-6 w-6 text-indigo-500 mb-1" />
                        <p className="text-2xl font-bold">{stats.streak}</p>
                        <p className="text-gray-600 text-sm">วันติดต่อกัน</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">กิจกรรมล่าสุด</h2>
                
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start border-b border-gray-100 pb-3">
                      <div className="bg-indigo-100 p-2 rounded-lg">
                        {activity.action.includes('ภารกิจ') ? (
                          <CheckSquare className="h-5 w-5 text-indigo-600" />
                        ) : activity.action.includes('เป้าหมาย') ? (
                          <Target className="h-5 w-5 text-indigo-600" />
                        ) : activity.action.includes('บันทึก') ? (
                          <BookOpen className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-indigo-600" />
                        )}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{activity.action}</p>
                          {activity.points > 0 && (
                            <span className="text-green-600 text-sm font-medium">+{activity.points}</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{activity.target}</p>
                        <p className="text-gray-500 text-xs mt-1">{activity.date} เวลา {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 w-full py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                  ดูทั้งหมด
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile Tabs */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b">
                {['ข้อมูลทั่วไป', 'ความสำเร็จ', 'การตั้งค่า'].map(tab => (
                  <button 
                    key={tab}
                    className={`flex-1 py-3 px-4 font-medium ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* Tab Contents */}
              <div className="p-6">
                {/* ข้อมูลทั่วไป */}
                {activeTab === 'ข้อมูลทั่วไป' && (
                  <>
                    {isEditing ? (
                      <form onSubmit={handleSaveProfile}>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">ชื่อ</label>
                            <input 
                              type="text" 
                              value={userData.name}
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">อีเมล</label>
                            <input 
                              type="email" 
                              value={userData.email}
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">วันเกิด</label>
                            <input 
                              type="text" 
                              value={userData.birthdate}
                              onChange={(e) => setUserData({...userData, birthdate: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">เกี่ยวกับฉัน</label>
                            <textarea 
                              value={userData.bio}
                              onChange={(e) => setUserData({...userData, bio: e.target.value})}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            ></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 font-medium mb-1">ความสนใจ</label>
                            <input 
                              type="text" 
                              value={userData.interests.join(', ')}
                              onChange={(e) => setUserData({...userData, interests: e.target.value.split(', ')})}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <p className="text-gray-500 text-sm mt-1">คั่นแต่ละความสนใจด้วยเครื่องหมายจุลภาค (,)</p>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-4">
                            <button 
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                            >
                              ยกเลิก
                            </button>
                            <button 
                              type="submit"
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                              บันทึก
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-gray-500 text-sm">ชื่อ</h3>
                            <p className="font-medium">{userData.name}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-gray-500 text-sm">อีเมล</h3>
                            <p className="font-medium">{userData.email}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-gray-500 text-sm">วันเกิด</h3>
                            <p className="font-medium">{userData.birthdate}</p>
                          </div>
                          
                          <div>
                            <h3 className="text-gray-500 text-sm">สมัครสมาชิกเมื่อ</h3>
                            <p className="font-medium">{userData.joinDate}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-gray-500 text-sm">เกี่ยวกับฉัน</h3>
                          <p className="mt-1">{userData.bio}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-gray-500 text-sm mb-2">ความสนใจ</h3>
                          <div className="flex flex-wrap gap-2">
                            {userData.interests.map((interest, index) => (
                              <span 
                                key={index} 
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* ความสำเร็จ */}
                {activeTab === 'ความสำเร็จ' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">ความสำเร็จที่ปลดล็อคแล้ว</h2>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {achievements.map(achievement => (
                        <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 flex">
                          <div className={`${achievement.color} text-white p-3 rounded-lg`}>
                            {achievement.icon}
                          </div>
                          
                          <div className="ml-4">
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-gray-600 text-sm">{achievement.description}</p>
                            <p className="text-gray-500 text-xs mt-1">ปลดล็อคเมื่อ {achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">ความสำเร็จที่กำลังจะได้รับ</h3>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="border border-gray-200 rounded-lg p-4 flex opacity-70">
                          <div className="bg-red-500 text-white p-3 rounded-lg">
                            <Heart className="h-5 w-5" />
                          </div>
                          
                          <div className="ml-4">
                            <h3 className="font-medium">ผู้มีสุขภาพดี</h3>
                            <p className="text-gray-600 text-sm">ทำภารกิจออกกำลังกายครบ 10 ครั้ง</p>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>ความคืบหน้า</span>
                                <span>7/10</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full">
                                <div className="h-1.5 bg-red-500 rounded-full w-7/12"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 flex opacity-70">
                          <div className="bg-blue-500 text-white p-3 rounded-lg">
                            <Zap className="h-5 w-5" />
                          </div>
                          
                          <div className="ml-4">
                            <h3 className="font-medium">มุ่งมั่นไม่เลิกรา</h3>
                            <p className="text-gray-600 text-sm">เข้าใช้งานติดต่อกัน 14 วัน</p>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>ความคืบหน้า</span>
                                <span>7/14</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full">
                                <div className="h-1.5 bg-blue-500 rounded-full w-1/2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                ```jsx
                {/* การตั้งค่า */}
                {activeTab === 'การตั้งค่า' && (
                  <div className="space-y-8">
                    {/* Account Settings */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">การตั้งค่าบัญชี</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Mail className="h-5 w-5 text-gray-600" />
                            <span>อีเมล: {userData.email}</span>
                          </div>
                          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                            เปลี่ยนอีเมล
                          </button>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Lock className="h-5 w-5 text-gray-600" />
                              <span>รหัสผ่าน</span>
                            </div>
                            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                              เปลี่ยนรหัสผ่าน
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">อัปเดตรหัสผ่านล่าสุดเมื่อ 15 วันที่แล้ว</p>
                        </div>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">การแจ้งเตือน</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span>การแจ้งเตือนทางอีเมล</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span>การแจ้งเตือนบนมือถือ</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">ความเป็นส่วนตัว</h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-gray-600" />
                            <span>การแสดงโปรไฟล์สาธารณะ</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-500">อนุญาตให้ผู้ใช้อื่นดูโปรไฟล์ของคุณ</p>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-red-600">เขตอันตราย</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-red-700">ลบบัญชีผู้ใช้</p>
                              <p className="text-sm text-red-600">การกระทำนี้ไม่สามารถย้อนกลับได้</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                              ลบบัญชี
                            </button>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {/* Add logout logic here */}}
                          className="w-full flex items-center justify-center space-x-2 p-4 bg-gray-50 text-red-600 rounded-lg hover:bg-red-50 transition"
                        >
                          <LogOut className="h-5 w-5" />
                          <span>ออกจากระบบ</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
