import React, { useState, useEffect } from 'react';
import { COURSES } from '../data';
import { Student, StudentStatus } from '../types';
import { GraduationCap, Bookmark, CreditCard, Download, Edit, User, RefreshCw, LogOut, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';
import { authApi, studentApi } from '../api';

interface StudentPortalProps {
  currentStudent: Student | null;
  setCurrentStudent: (student: Student | null) => void;
}

export default function StudentPortal({ currentStudent, setCurrentStudent }: StudentPortalProps) {
  // Login input states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginId, setLoginId] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard Nav State
  const [activeTab, setActiveTab] = useState<"info" | "courses" | "payment">("info");
  const [showIDModal, setShowIDModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Semester course states
  const [enrolledList, setEnrolledList] = useState<string[]>([]);
  const [coursesSaved, setCoursesSaved] = useState(false);
  const [savingCourses, setSavingCourses] = useState(false);

  // Student photo upload state simulation
  const [studentPhoto, setStudentPhoto] = useState("https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=200&auto=format&fit=crop");

  // Tuition payment state
  const [tuitionPayAmount, setTuitionPayAmount] = useState<number | "">("");
  const [tuitionInstallmentNumber, setTuitionInstallmentNumber] = useState(1);
  const [tuitionNotes, setTuitionNotes] = useState("");
  const [tuitionReceiptFile, setTuitionReceiptFile] = useState<File | null>(null);
  
  const [installments, setInstallments] = useState<any[]>([]);
  const [financials, setFinancials] = useState<any>(null);
  const [payingTuition, setPayingTuition] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  
  const loadFinancials = async () => {
    try {
      const [finRes, instRes] = await Promise.all([
        studentApi.getFinancials(),
        studentApi.getInstallments()
      ]);
      if (finRes.success) setFinancials(finRes.data);
      if (instRes.success) setInstallments(instRes.data);
    } catch (err) {
      console.error("Failed to load financials:", err);
    }
  };

  // Load registered list on student update
  useEffect(() => {
    if (currentStudent) {
      setEnrolledList(currentStudent.enrolledCourses || []);
      loadFinancials();
    }
  }, [currentStudent]);

  // Demo Simulation trigger
  const handleSimulateActiveStudent = async () => {
    const demoStudent: Student = {
      id: "STUD-DEMO-99",
      fullName: "Andy Amaechi",
      email: "amaechinaikechukwu6@gmail.com",
      matricNumber: "ORU/PH/2026/0295",
      program: "Computer Science",
      status: StudentStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledCourses: ["CSC-101", "CSC-105", "GEN-101"],
      paidTuition: 150000
    };
    setCurrentStudent(demoStudent);
  };

  // Login handler
  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginId) {
      setLoginError("Please provide both matric number/email and password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await authApi.studentLogin({
        matricNumberOrEmail: loginEmail, // We use loginEmail field for the input in UI
        password: loginId // Using loginId form field as the password/matric
      });

      if (res.success && res.data) {
        // Fetch detailed profile after login
        const profileRes = await studentApi.getProfile();
        if (profileRes.success && profileRes.data) {
           setCurrentStudent({
             id: profileRes.data.id,
             fullName: profileRes.data.fullName,
             email: profileRes.data.email,
             matricNumber: profileRes.data.matricNumber,
             program: profileRes.data.program,
             status: profileRes.data.status,
             createdAt: new Date(),
             updatedAt: new Date(),
             enrolledCourses: [],
             paidTuition: 0
           });
           
           // You would also fetch academics and financial to complete the scope if needed
        } else {
           throw new Error("Could not fetch student profile.");
        }
      } else {
        throw new Error(res.message || "Invalid credentials");
      }

    } catch (err: any) {
      setLoginError(err.message || "Could not login. Please verify details.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Checkbox toggle courses
  const handleToggleCourse = (courseCode: string) => {
    if (enrolledList.includes(courseCode)) {
      setEnrolledList(enrolledList.filter(c => c !== courseCode));
    } else {
      setEnrolledList([...enrolledList, courseCode]);
    }
    setCoursesSaved(false);
  };

  // Save courses back to local/DB
  const handleSaveCourses = async () => {
    if (!currentStudent) return;
    setSavingCourses(true);
    setCoursesSaved(false);

    try {
      // Simulate API saving course list or you can fetch/update to student API if needed.
      console.info("Simulated saving of courses to API", enrolledList);
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentStudent({
        ...currentStudent,
        enrolledCourses: enrolledList
      });

      setCoursesSaved(true);
      setTimeout(() => setCoursesSaved(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingCourses(false);
    }
  };

  // Tuition Payment Checkout
  const handlePayTuition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tuitionPayAmount || !tuitionReceiptFile) return;

    setPayingTuition(true);
    setPaySuccess(false);

    const formData = new FormData();
    formData.append("amount", tuitionPayAmount.toString());
    formData.append("installmentNumber", tuitionInstallmentNumber.toString());
    if (tuitionNotes) {
      formData.append("notes", tuitionNotes);
    }
    formData.append("files", tuitionReceiptFile as Blob);

    try {
      const res = await studentApi.submitInstallment(formData);
      if (res.success) {
        setPaySuccess(true);
        setTuitionPayAmount("");
        setTuitionNotes("");
        setTuitionReceiptFile(null);
        await loadFinancials();
        setTimeout(() => {
          setPaySuccess(false);
          setShowPaymentModal(false);
        }, 3000);
      } else {
        alert(res.message || "Failed to submit receipt.");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred.");
    } finally {
      setPayingTuition(false);
    }
  };

  // Browser interactive printable action
  const handlePrintBadge = () => {
    window.print();
  };

  const filteredCourses = currentStudent
    ? COURSES.filter(c => c.program === currentStudent.program || c.program === "All Programs")
    : [];

  return (
    <div className="w-full font-sans bg-gray-50 min-h-screen flex flex-col text-left">
      
      {/* LOGGED OUT VIEW: Login Portal */}
      {!currentStudent ? (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-gray-200 shadow-xl p-10 md:p-14"
          >
            <div className="flex flex-col items-center mb-10 text-center">
              <img src="/oru-logo.png" alt="ORU Logo" className="w-16 h-16 object-contain mb-6" />
              <h1 className="text-2xl font-serif font-bold text-[#16233c] tracking-tight mb-2">Student Login</h1>
              <p className="text-gray-500 text-xs tracking-widest uppercase font-medium">Authentication required</p>
            </div>

            <form onSubmit={handlePortalLogin} className="flex flex-col gap-6">
              {loginError && (
                <div className="p-4 bg-red-50 text-[#be123c] border border-red-100 text-xs font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#16233c] uppercase tracking-widest">Registered Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full text-sm p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] transition bg-gray-50/50 rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#16233c] uppercase tracking-widest">Full Name (Tracking Target)</label>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="E.g. John Doe"
                  className="w-full text-sm p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] transition bg-gray-50/50 rounded-none"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-4 mt-2 bg-[#16233c] hover:bg-[#0d1629] text-white font-bold text-xs uppercase tracking-widest transition flex justify-center items-center gap-2 rounded-none"
              >
                {loginLoading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> Authenticating...</>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={handleSimulateActiveStudent}
                className="text-[10px] font-bold text-[#be123c] uppercase tracking-widest hover:text-[#9f0f32] transition flex items-center justify-center gap-2 mx-auto rounded-none"
              >
                <ShieldCheck className="w-3 h-3" />
                Demo: Login as Student
              </button>
            </div>
          </motion.div>
        </div>
      ) : (
        
        /* LOGGED IN VIEW: Student Dashboard with Sidebar */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden"
        >
          {/* Default Sidebar */}
          <div className="w-full md:w-64 bg-[#16233c] text-white flex flex-col flex-shrink-0">
            {/* Sidebar Branding & Profile */}
            <div className="p-8 border-b border-white/10 flex flex-col items-center">
              <img src="/oru-logo.png" alt="ORU Logo" className="w-12 h-12 object-contain mb-4" />
              <div className="relative group mb-4">
                <img
                  src={studentPhoto}
                  alt="Student"
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 border-2 border-white/20 object-cover shadow-md rounded-none"
                />
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#be123c] text-white flex items-center justify-center cursor-pointer hover:bg-[#9f1239] border border-[#16233c] transition-colors rounded-none">
                  <Edit className="w-3 h-3" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setStudentPhoto(url);
                      }
                    }}
                  />
                </label>
              </div>
              <h2 className="font-serif font-bold tracking-widest text-center text-sm mb-1 uppercase">{currentStudent.fullName}</h2>
              <span className="text-[10px] text-gray-400 font-mono">{currentStudent.matricNumber}</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto">
              <button 
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition rounded-none border ${activeTab === 'info' ? 'bg-[#be123c] border-[#be123c] text-white' : 'border-transparent text-gray-300 hover:border-white/20 hover:bg-white/5 hover:text-white'}`}
              >
                <User className="w-4 h-4" /> Student Info
              </button>
              <button 
                onClick={() => setActiveTab('courses')}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition rounded-none border ${activeTab === 'courses' ? 'bg-[#be123c] border-[#be123c] text-white' : 'border-transparent text-gray-300 hover:border-white/20 hover:bg-white/5 hover:text-white'}`}
              >
                <Bookmark className="w-4 h-4" /> Courses
              </button>
              <button 
                onClick={() => setActiveTab('payment')}
                className={`flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition rounded-none border ${activeTab === 'payment' ? 'bg-[#be123c] border-[#be123c] text-white' : 'border-transparent text-gray-300 hover:border-white/20 hover:bg-white/5 hover:text-white'}`}
              >
                <CreditCard className="w-4 h-4" /> Payment
              </button>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => setCurrentStudent(null)}
                className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-white/20 text-white hover:bg-white/10 transition text-[10px] font-bold uppercase tracking-widest rounded-none"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col p-6 md:p-12">
            
            {/* Tab Views */}
            <div className="flex-1 max-w-5xl">
              
              {/* === INFO TAB === */}
              {activeTab === 'info' && (
                <div className="flex flex-col gap-8 items-start w-full">
                  <div className="w-full flex flex-col gap-8">
                    <div className="bg-white p-8 border border-gray-200 shadow-md">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                        <h3 className="font-bold text-[#16233c] text-sm uppercase tracking-widest">Profile Details</h3>
                        <button
                          onClick={() => setShowIDModal(true)}
                          className="py-2 px-6 bg-[#be123c] hover:bg-[#9f0f32] text-white font-bold text-[10px] uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2 rounded-none"
                        >
                          <User className="w-3 h-3" /> View ID Card
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Full Name</span>
                          <span className="font-bold text-[#16233c] truncate">{currentStudent.fullName}</span>
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Email Address</span>
                          <span className="font-bold text-[#16233c] truncate" title={currentStudent.email}>{currentStudent.email}</span>
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Matriculation Number</span>
                          <span className="font-mono text-[#be123c] font-bold">{currentStudent.matricNumber}</span>
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">Study Program</span>
                          <span className="font-bold text-[#16233c] truncate">{currentStudent.program}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* === COURSES TAB === */}
              {activeTab === 'courses' && (
                <div className="bg-white p-8 border border-gray-200 shadow-md flex flex-col">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                    <h3 className="font-bold text-[#16233c] text-sm uppercase tracking-widest">Available Modules</h3>
                    {coursesSaved && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 rounded-none border border-green-200">
                        <ShieldCheck className="w-3 h-3" /> Saved
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredCourses.map((c) => {
                      const isChecked = enrolledList.includes(c.code);
                      return (
                        <label 
                          key={c.id} 
                          className={`flex items-start gap-4 p-5 border cursor-pointer transition-colors rounded-none ${
                            isChecked 
                              ? 'bg-[#f8fafc] border-[#16233c]' 
                              : 'bg-white border-gray-200 hover:border-gray-400'
                          }`}
                        >
                          <div className={`mt-0.5 flex items-center justify-center w-5 h-5 border ${isChecked ? 'bg-[#16233c] border-[#16233c]' : 'bg-white border-gray-400'} shrink-0 rounded-none transition-colors`}>
                            {isChecked && <ShieldCheck className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                              <span className="font-bold text-sm tracking-tight text-[#16233c]">{c.title}</span>
                              <span className="font-mono text-[10px] font-bold border border-gray-200 px-2 py-1 inline-block text-[#16233c] rounded-none bg-white">{c.code}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium">{c.credits} Credits • Core Requirement</span>
                          </div>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleCourse(c.code)}
                            className="hidden"
                          />
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={handleSaveCourses}
                      disabled={savingCourses}
                      className="px-8 py-3 bg-[#be123c] hover:bg-[#9f0f32] text-white font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 rounded-none"
                    >
                      <RefreshCw className={`w-4 h-4 ${savingCourses ? 'animate-spin' : ''}`} />
                      {savingCourses ? "Saving..." : "Save Selection"}
                    </button>
                  </div>
                </div>
              )}

              {/* === PAYMENT TAB === */}
              {activeTab === 'payment' && (
                <div className="flex flex-col gap-8">
                  <div className="bg-white p-8 border border-gray-200 shadow-md">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                      <h3 className="font-bold text-[#16233c] text-sm uppercase tracking-widest">Financial Records</h3>
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="py-2 px-6 bg-[#be123c] hover:bg-[#9f0f32] text-white font-bold text-[10px] uppercase tracking-widest transition shadow-sm flex items-center justify-center gap-2 rounded-none"
                      >
                        <CreditCard className="w-3 h-3" /> Upload Receipt
                      </button>
                    </div>

                    {financials && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4 border-b border-gray-100 pb-8">
                        <div className="flex flex-col gap-1 border border-gray-200 p-4 bg-gray-50 text-center">
                          <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Total Tuition Due</span>
                          <span className="font-mono font-bold text-lg text-[#16233c]">₦{financials.totalTuitionDue?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex flex-col gap-1 border border-gray-200 p-4 bg-green-50 text-center border-green-200">
                          <span className="text-[10px] uppercase text-green-700 font-bold tracking-widest">Total Amount Paid</span>
                          <span className="font-mono font-bold text-lg text-green-700">₦{financials.totalAmountPaid?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex flex-col gap-1 border border-gray-200 p-4 bg-red-50 text-center border-red-200">
                          <span className="text-[10px] uppercase text-[#be123c] font-bold tracking-widest">Outstanding Balance</span>
                          <span className="font-mono font-bold text-lg text-[#be123c]">₦{financials.outstandingBalance?.toLocaleString() || 0}</span>
                        </div>
                      </div>
                    )}

                    <h4 className="font-bold text-[#16233c] text-xs uppercase tracking-widest border-b border-gray-100 pb-2 mb-4">Installment Submissions</h4>
                    <div className="flex flex-col gap-3">
                      {installments.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No installment submissions found.</p>
                      ) : (
                        installments.map((inst, idx) => (
                          <div key={idx} className="border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition rounded-none">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-[#16233c] text-sm uppercase tracking-wide">Installment #{inst.installmentNumber}</span>
                              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                <span>{new Date(inst.submittedAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span className={`font-mono px-2 py-0.5 rounded-none text-white ${inst.status === 0 ? 'bg-yellow-500' : inst.status === 1 ? 'bg-green-600' : 'bg-red-600'}`}>
                                  {inst.status === 0 ? 'Pending' : inst.status === 1 ? 'Approved' : 'Rejected'}
                                </span>
                              </div>
                              {inst.notes && <p className="text-xs text-gray-600 mt-1">{inst.notes}</p>}
                            </div>
                            <span className="font-mono font-bold text-[#16233c] border border-gray-200 bg-white px-3 py-1.5 text-sm shrink-0 rounded-none">
                              ₦{inst.amount?.toLocaleString()}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      )}

      {/* ID Card Modal */}
      {showIDModal && currentStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16233c]/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-sm w-full p-8 shadow-2xl relative border-2 border-[#16233c]"
          >
            <button 
              onClick={() => setShowIDModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#be123c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="printable-area bg-white relative overflow-hidden text-center isolate">
              <div className="absolute top-0 left-0 right-0 h-20 bg-[#be123c] -z-10"></div>
              
              <div className="flex flex-col items-center pt-6">
                <div className="bg-white p-2 mb-4 rounded-none border border-gray-200 shadow-md">
                  <img
                    src={studentPhoto}
                    alt="Student"
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 object-cover rounded-none border-2 border-gray-100"
                  />
                </div>
                
                <h3 className="font-serif font-bold text-xl leading-tight uppercase text-[#16233c] tracking-widest mb-1 mt-2">
                  {currentStudent.fullName}
                </h3>
                <span className="text-[10px] font-bold uppercase text-[#be123c] tracking-widest mb-6">
                  {currentStudent.program}
                </span>
                
                <div className="w-full border-t border-gray-200 pt-5 flex flex-col items-center gap-1 uppercase">
                  <span className="text-[9px] text-gray-400 font-bold tracking-widest">Student Identifier</span>
                  <span className="font-mono text-sm font-bold text-[#16233c]">{currentStudent.matricNumber}</span>
                </div>
                
                <div className="mt-8 mb-2 w-full flex items-center justify-center gap-2 opacity-30 pointer-events-none">
                   <div className="h-6 w-32 border-l-2 border-r-2 border-[#16233c] flex items-center space-x-1 justify-center px-1">
                     <div className="h-full w-1 border-l-2 border-[#16233c]"></div>
                     <div className="h-full w-2 border-l-4 border-[#16233c]"></div>
                     <div className="h-full w-1.5 border-l-[3px] border-[#16233c]"></div>
                     <div className="h-full w-1 border-l-[1px] border-[#16233c]"></div>
                     <div className="h-full w-3 border-l-2 border-r-2 border-[#16233c]"></div>
                     <div className="h-full w-1.5 border-l-[2px] border-[#16233c]"></div>
                     <div className="h-full w-2 border-l-[3px] border-[#16233c]"></div>
                     <div className="h-full w-1 border-l-2 border-[#16233c]"></div>
                     <div className="h-full w-0.5 border-l-[1px] border-[#16233c]"></div>
                   </div>
                </div>
                <span className="text-[8px] font-mono tracking-widest text-[#16233c] w-full text-center mb-6">AS-VALID-2026-X</span>
              </div>
            </div>

            <button
              onClick={handlePrintBadge}
              className="w-full mt-6 py-4 bg-white border border-[#16233c] hover:bg-[#16233c] hover:text-white text-[#16233c] font-bold text-[10px] uppercase tracking-widest transition flex items-center justify-center gap-2 rounded-none"
            >
              <Download className="w-4 h-4" /> Download Statement
            </button>
          </motion.div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && currentStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16233c]/80 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-lg w-full p-8 shadow-2xl relative border-2 border-[#16233c]"
          >
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#be123c] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-[#16233c] text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Upload Tuition Receipt</h3>
            <form onSubmit={handlePayTuition} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Installment Number</label>
                <select
                  value={tuitionInstallmentNumber}
                  onChange={(e) => setTuitionInstallmentNumber(Number(e.target.value))}
                  className="w-full p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] bg-white text-sm transition rounded-none"
                >
                  <option value={1}>1st Installment (or Full Payment)</option>
                  <option value={2}>2nd Installment</option>
                  <option value={3}>3rd Installment</option>
                  <option value={4}>4th Installment</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount Paid (₦)</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={tuitionPayAmount}
                  onChange={(e) => setTuitionPayAmount(Number(e.target.value))}
                  placeholder="e.g., 50000"
                  className="w-full font-mono p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] bg-white text-sm tracking-widest transition rounded-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Optional Notes</label>
                <textarea
                  value={tuitionNotes}
                  onChange={(e) => setTuitionNotes(e.target.value)}
                  placeholder="Any additional details..."
                  className="w-full font-mono p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] bg-white text-sm tracking-widest transition rounded-none resize-none h-20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Receipt Upload (Image)</label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setTuitionReceiptFile(e.target.files[0]);
                  }}
                  className="w-full font-mono p-4 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#16233c] bg-white text-sm tracking-widest transition rounded-none"
                />
              </div>

              <button
                type="submit"
                disabled={payingTuition || !tuitionPayAmount || !tuitionReceiptFile}
                className="w-full py-4 mt-2 bg-[#16233c] hover:bg-[#0d1629] text-white font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {payingTuition ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  "Submit Receipt"
                )}
              </button>
              {paySuccess && <p className="text-[10px] font-bold text-green-600 text-center uppercase tracking-widest mt-2 border border-green-200 bg-green-50 py-2 rounded-none">Receipt Submitted Successfully!</p>}
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
