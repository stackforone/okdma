// pages/journal.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Calendar, CheckSquare, Clock, BookOpen, Gift, Target, PlusCircle, User, Menu, X, 
  ArrowLeft, Edit, Trash2, AlertCircle, Award, Search, Bookmark, Heart, Coffee, Moon, Sun, 
  Cloud, CloudRain, Smile, Frown, Meh } from 'lucide-react';

export default function Journal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAddEntryForm, setShowAddEntryForm] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryMood, setNewEntryMood] = useState('neutral');
  const [currentDate, setCurrentDate] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  
  const moodOptions = [
    { id: 'happy', icon: <Smile className="h-6 w-6" />, label: 'มีความสุข', color: 'bg-yellow-500' },
    { id: 'neutral', icon: <Meh className="h-6 w-6" />, label: 'เฉยๆ', color: 'bg-blue-500' },
    { id: 'sad', icon: <Frown className="h-6 w-6" />, label: 'เศร้า', color: 'bg-indigo-500' },
    { id: 'stressed', icon: <CloudRain className="h-6 w-6" />, label: 'เครียด', color: 'bg-purple-500' },
    { id: 'relaxed', icon: <Coffee className="h-6 w-6" />, label: 'ผ่อนคลาย', color: 'bg-green-500' },
  ];

  const [entries, setEntries] = useState([
    {
      id: 1,
      title: 'วันนี้รู้สึกมีพลัง',
      content: `วันนี้ตื่นเช้ามาพร้อมกับความรู้สึกสดชื่น ได้เริ่มต้นวันด้วยการวิ่งเบาๆ และทานอาหารเช้าที่มีประโยชน์ รู้สึกว่าวันนี้มีพลังเต็มเปี่ยม สามารถทำงานได้อย่างมีประสิทธิภาพมาก

อยากจดบันทึกความรู้สึกนี้ไว้ เพราะรู้สึกว่าการเริ่มต้นวันด้วยการดูแลร่างกายช่วยให้จิตใจแจ่มใสตามไปด้วย`,
      date: '26 ก.พ. 2025',
      time: '08:32',
      mood: 'happy',
      tags: ['สุขภาพ', 'ความสุข', 'กิจวัตร'],
      isFavorite: true
    },
    {
      id: 2,
      title: 'ความกังวลเรื่องงาน',
      content: `งานที่ออฟฟิศตึงเครียดมากๆ ในช่วงนี้ มีโปรเจกต์ใหญ่ที่ต้องส่งภายในสิ้นเดือน แต่ยังมีปัญหาหลายอย่างที่ยังแก้ไม่ตก

รู้สึกกดดันมากๆ บางครั้งก็นอนไม่หลับเพราะคิดถึงแต่งาน ต้องหาวิธีจัดการความเครียดนี้แล้ว หายใจเข้าลึกๆ ไว้...`,
      date: '25 ก.พ. 2025',
      time: '22:15',
      mood: 'stressed',
      tags: ['การทำงาน', 'ความเครียด'],
      isFavorite: false
    },
    {
      id: 3,
      title: 'ความทรงจำวันหยุด',
      content: `วันหยุดสุดสัปดาห์ที่ผ่านมาได้ไปเที่ยวทะเลกับเพื่อนๆ รู้สึกผ่อนคลายมากๆ ได้ใช้เวลาอยู่กับธรรมชาติ ไกลจากความวุ่นวายในเมือง

ได้นั่งมองพระอาทิตย์ตกที่ชายหาด เสียงคลื่น กลิ่นทะเล ช่างเป็นความทรงจำที่มีค่า บางทีชีวิตเราก็ต้องการช่วงเวลาแบบนี้เพื่อชาร์จพลังให้ตัวเอง`,
      date: '24 ก.พ. 2025',
      time: '18:40',
      mood: 'relaxed',
      tags: ['การพักผ่อน', 'ความสุข', 'เพื่อน'],
      isFavorite: true
    },
    {
      id: 4,
      title: 'สิ่งที่ได้เรียนรู้จากความผิดพลาด',
      content: `วันนี้ทำผิดพลาดในการประชุมสำคัญ นำเสนอข้อมูลผิดต่อหน้าทีมและหัวหน้า รู้สึกอับอายมาก แต่ทุกคนก็เข้าใจและให้โอกาส

จากเหตุการณ์นี้ ทำให้ได้เรียนรู้ว่าการเตรียมตัวให้พร้อมเป็นสิ่งสำคัญ และถึงแม้จะผิดพลาด ก็ต้องกล้ายอมรับและแก้ไข ไม่ใช่พยายามปกปิดหรือหาคนมารับผิดแทน นี่คงเป็นบทเรียนที่มีค่ามากๆ`,
      date: '23 ก.พ. 2025',
      time: '21:05',
      mood: 'neutral',
      tags: ['การทำงาน', 'บทเรียนชีวิต'],
      isFavorite: false
    },
    {
      id: 5,
      title: 'ความรู้สึกหลังจากอ่านหนังสือจบ',
      content: `เพิ่งอ่านหนังสือ "เมื่อลมหายใจกลายเป็นอากาศ" จบ รู้สึกสะเทือนใจมากๆ เป็นมุมมองของหมอที่กำลังป่วยเป็นมะเร็งระยะสุดท้าย

หนังสือเล่มนี้ทำให้ฉันตระหนักถึงความไม่แน่นอนของชีวิต และความสำคัญของการใช้เวลาที่มีอยู่อย่างมีความหมาย อยากจะเริ่มใส่ใจกับความสัมพันธ์กับคนรอบข้างให้มากขึ้น และทำในสิ่งที่รักโดยไม่ผัดวันประกันพรุ่ง`,
      date: '22 ก.พ. 2025',
      time: '16:20',
      mood: 'sad',
      tags: ['หนังสือ', 'ความคิด', 'บทเรียนชีวิต'],
      isFavorite: true
    },
  ]);

  useEffect(() => {
    // Set current date in Thai format when component mounts
    const now = new Date();
    const day = now.getDate();
    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];
    const month = months[now.getMonth()];
    const year = now.getFullYear() + 543; // Christian era to Buddhist era
    const formattedDate = `${day} ${month} ${year}`;
    setCurrentDate(formattedDate);
  }, []);

  const addEntry = (e) => {
    e.preventDefault();
    if (newEntryTitle.trim() && newEntryContent.trim()) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;

      const newEntry = {
        id: Date.now(),
        title: newEntryTitle,
        content: newEntryContent,
        date: currentDate,
        time: time,
        mood: newEntryMood,
        tags: ['ทั่วไป'],
        isFavorite: false
      };
      
      setEntries([newEntry, ...entries]);
      setNewEntryTitle('');
      setNewEntryContent('');
      setNewEntryMood('neutral');
      setShowAddEntryForm(false);
    }
  };

  const deleteEntry = (id) => {
    if (window.confirm('คุณต้องการลบบันทึกนี้หรือไม่?')) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const toggleFavorite = (id) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        return {...entry, isFavorite: !entry.isFavorite};
      }
      return entry;
    }));
  };

  // Get all unique tags for filter
  const allTags = ['all', ...new Set(entries.flatMap(entry => entry.tags))];

  // Filter entries based on selected tag
  const filteredEntries = filterTag === 'all' 
    ? entries 
    : entries.filter(entry => entry.tags.includes(filterTag));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-prompt">
      <Head>
        <title>บันทึกประจำวัน | Life Planner</title>
        <meta name="description" content="บันทึกความคิด ความรู้สึก และประสบการณ์ของคุณ" />
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
              <Link href="/journal" className="flex items-center space-x-1 text-white bg-indigo-700 px-3 py-1 rounded-md">
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
              <Link href="/goals" className="flex items-center space-x-2 text-white hover:text-indigo-200 transition py-2">
                <Target className="h-5 w-5" />
                <span>เป้าหมาย</span>
              </Link>
              <Link href="/journal" className="flex items-center space-x-2 text-white bg-indigo-800 rounded px-2 py-2">
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
              <span className="text-gray-700">บันทึกประจำวัน</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <span>บันทึกความคิดและความรู้สึก</span>
            </h1>
          </div>

          {/* Current Date Display */}
          <div className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow px-4 py-3 text-white">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6" />
              <div>
                <div className="text-xs opacity-80">วันนี้</div>
                <div className="text-xl font-bold">{currentDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons for journal management */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setShowAddEntryForm(true)} 
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>เขียนบันทึกใหม่</span>
          </button>

          <Link 
            href="#" 
            className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <Bookmark className="h-5 w-5 text-indigo-500" />
            <span>บันทึกที่ชื่นชอบ</span>
          </Link>

          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาบันทึก..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Add Entry Form */}
        {showAddEntryForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">บันทึกความคิดและความรู้สึกใหม่</h2>
              <button 
                onClick={() => setShowAddEntryForm(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={addEntry}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">หัวข้อ</label>
                  <input
                    type="text"
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="หัวข้อบันทึกของวันนี้"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">อารมณ์/ความรู้สึก</label>
                  <div className="flex flex-wrap gap-3">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.id}
                        type="button"
                        onClick={() => setNewEntryMood(mood.id)}
                        className={`flex flex-col items-center p-2 rounded-lg border transition 
                          ${newEntryMood === mood.id 
                            ? `border-2 border-${mood.color.split('-')[1]}-500 ${mood.color} text-white` 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <span className="mb-1">{mood.icon}</span>
                        <span className="text-xs">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เนื้อหา</label>
                  <textarea
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="เขียนความคิด ความรู้สึก หรือประสบการณ์ของคุณ..."
                    rows="8"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">เพิ่มแท็ก (คั่นด้วยเครื่องหมายคอมม่า)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="เช่น ความคิด, ความทรงจำ, ความฝัน"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddEntryForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter by tags */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium transition
                  ${filterTag === tag 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {tag === 'all' ? 'ทั้งหมด' : `#${tag}`}
              </button>
            ))}
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                        ${entry.mood === 'happy' ? 'bg-yellow-500' :
                          entry.mood === 'neutral' ? 'bg-blue-500' :
                          entry.mood === 'sad' ? 'bg-indigo-500' :
                          entry.mood === 'stressed' ? 'bg-purple-500' : 'bg-green-500'}`}>
                        {entry.mood === 'happy' ? <Smile className="h-6 w-6" /> :
                          entry.mood === 'neutral' ? <Meh className="h-6 w-6" /> :
                          entry.mood === 'sad' ? <Frown className="h-6 w-6" /> :
                          entry.mood === 'stressed' ? <CloudRain className="h-6 w-6" /> :
                          <Coffee className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> {entry.date} • {entry.time}
                        </div>
                        <h3 className="font-medium text-lg">{entry.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className={`p-1 rounded-full ${entry.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      <Heart className="h-5 w-5" fill={entry.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                  
                  <div className="mt-4 whitespace-pre-line text-gray-700">
                    {entry.content.length > 300 
                      ? `${entry.content.substring(0, 300)}...` 
                      : entry.content}
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
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
                      onClick={() => deleteEntry(entry.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <button 
                    className="bg-indigo-100 text-indigo-700 rounded-lg px-3 py-1 text-sm flex items-center space-x-1 hover:bg-indigo-200 transition"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>อ่านเพิ่มเติม</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
                <BookOpen className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">ไม่พบบันทึก</h3>
              <p className="mt-2 text-gray-500">ยังไม่มีบันทึกในหมวดหมู่นี้ ลองสร้างบันทึกใหม่หรือเลือกหมวดหมู่อื่น</p>
              <button
                onClick={() => setFilterTag('all')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                ดูบันทึกทั้งหมด
              </button>
            </div>
          )}
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
