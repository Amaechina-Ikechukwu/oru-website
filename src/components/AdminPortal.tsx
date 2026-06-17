/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnnouncementCategory, ApplicationStatus } from '../types';
import { adminApi, authApi, setAuthToken, removeAuthToken } from '../api';
import { Check, X, FileText, Send, Sparkles, Megaphone, HelpCircle, MessageCircle, RefreshCw, Bookmark, Calendar, AlertCircle, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  
  // Announcement creation form state
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annCategory, setAnnCategory] = useState<AnnouncementCategory>(AnnouncementCategory.NEWS);
  const [annLoading, setAnnLoading] = useState(false);

  // Confirmation modal state
  const [confirmAction, setConfirmAction] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Document preview modal state
  const [previewDocument, setPreviewDocument] = useState<{url: string, name: string, type?: string} | null>(null);

  // Common administration flags
  const [activeAdminSubTab, setActiveAdminSubTab] = useState("applications"); // 'applications', 'broadcasts', 'inbound'
  const [appFilter, setAppFilter] = useState("all"); // 'all', 'pending', 'approved'
  const [adminLoading, setAdminLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    setLoginLoading(true);
    try {
      const res = await authApi.adminLogin({ email: loginEmail, password: loginPassword });
      if (res.success && res.data?.token) {
        setAuthToken(res.data.token);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        loadAdminMetrics();
      } else {
        toast.error(res.message || "Invalid credentials");
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setIsLoggedIn(false);
    setApplications([]);
    setMessages([]);
  };

  // Load data from DB
  const loadAdminMetrics = async () => {
    setAdminLoading(true);
    try {
      // 1. Applications query - fetch all applications without status filter
      const appsRes = await adminApi.listApplications(undefined, 1, 100);
      
      if (appsRes.success && appsRes.data && appsRes.data.items) {
        setApplications(appsRes.data.items);
      } else {
        setApplications([]);
      }

      // 2. Mock Messages/Inquiries query
      const localAppsList = JSON.parse(localStorage.getItem('oru_local_apps') || '[]');
      setMessages(localAppsList);

    } catch (e: any) {
      console.warn("Could not query administrative databases.", e);
      if (e.message && e.message.includes('401')) {
        handleLogout();
      }
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    // If token exists, try to load data directly
    const token = typeof window !== 'undefined' ? localStorage.getItem('oru_auth_token') : null;
    if (token) {
      setIsLoggedIn(true);
      loadAdminMetrics();
    }
  }, []);

  const handleUpdateAppStatus = async (appId: string, targetStatus: ApplicationStatus | number) => {
    try {
      const statusValue = typeof targetStatus === 'number' ? targetStatus : 
                          targetStatus === ApplicationStatus.APPROVED ? 2 : 
                          targetStatus === ApplicationStatus.REJECTED ? 3 : 1; 
      
      const res = await adminApi.updateApplicationStatus(appId, statusValue);

      if (res.success) {
        toast.success("Status updated successfully!");
        setApplications(applications.map(app => 
          app.id === appId ? { ...app, status: statusValue } : app
        ));
      } else {
        toast.error("Failed to update status");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
      if (err.message && err.message.includes('401')) {
        handleLogout();
      }
    }
  };

  const handleAdmitStudent = async (appId: string) => {
    try {
      const res = await adminApi.admitStudent(appId);
      if (res.success) {
        toast.success(res.message || "Student admitted successfully!");
        setApplications(applications.map(app => 
           app.id === appId ? { ...app, status: 4 } : app // 4 means Enrolled/Admitted for display
        ));
      } else {
        toast.error(res.message || "Failed to admit student");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to admit student");
    }
  };

  const submitBroadcast = async () => {
    setAnnLoading(true);
    try {
      const catMapping: Record<string, number> = {
        'News': 0, 'Event': 1, 'Seminar': 2, 'Academic': 3, 'Gallery': 4
      };

      await adminApi.createAnnouncement({
        title: annTitle,
        content: annContent,
        category: catMapping[annCategory] || 0
      });

      setAnnTitle("");
      setAnnContent("");
      setAnnCategory(AnnouncementCategory.NEWS);
      toast.success("Notice published successfully in News & Events channel!");
    } catch (error: any) {
      toast.error(error.message || "Failed to publish notice");
    } finally {
      setAnnLoading(false);
    }
  };

  const handlePublishBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;
    
    setConfirmAction({
      title: "Publish Announcement",
      message: "Are you sure you want to broadcast this announcement? It will be visible to everyone immediately.",
      onConfirm: submitBroadcast
    });
  };

  const handleDeleteMessage = async (msgId: string) => {
    try {
      setMessages(messages.filter(m => m.id !== msgId));
      localStorage.setItem('oru_local_apps', JSON.stringify(messages.filter(m => m.id !== msgId)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredApps = applications.filter((app) => {
    if (appFilter === "all") return true;
    const isPending = app.status === ApplicationStatus.PENDING || app.status === 0;
    const isReviewing = app.status === 1;
    const isApproved = app.status === ApplicationStatus.APPROVED || app.status === ApplicationStatus.ENROLLED || app.status === 2 || app.status === 4;
    const isRejected = app.status === ApplicationStatus.REJECTED || app.status === 3;

    if (appFilter === "pending") return isPending;
    if (appFilter === "reviewing") return isReviewing;
    if (appFilter === "approved") return isApproved;
    if (appFilter === "rejected") return isRejected;
    return true;
  });

  if (!isLoggedIn) {
    return (
      <div className="w-full flex-grow flex items-center justify-center p-8 bg-gray-50 flex-col font-sans py-24 border-t border-gray-200">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold font-serif tracking-tight text-[#16233c] text-left">Admin Portal Login</h2>
            <p className="text-sm text-gray-500 font-medium text-left">Enter your administrative credentials.</p>
          </div>
          <div className="flex flex-col gap-4 text-left">
             <div className="flex flex-col gap-1.5">
               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
               <input
                 type="email"
                 required
                 value={loginEmail}
                 onChange={(e) => setLoginEmail(e.target.value)}
                 className="p-3 text-sm border border-gray-300 focus:outline-none focus:border-[#16233c] transition font-mono bg-gray-50"
               />
             </div>
             <div className="flex flex-col gap-1.5">
               <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
               <input
                 type="password"
                 required
                 value={loginPassword}
                 onChange={(e) => setLoginPassword(e.target.value)}
                 className="p-3 text-sm border border-gray-300 focus:outline-none focus:border-[#16233c] transition font-mono bg-gray-50"
               />
             </div>
             <button
               type="submit"
               disabled={loginLoading}
               className="mt-2 w-full py-4 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center disabled:opacity-50"
             >
               {loginLoading ? "Authenticating..." : "Login"}
             </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full font-sans flex flex-col py-16 px-8 bg-gray-50 text-left border-t border-gray-200" id="admin-panel-viewport">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 w-full">
        
        {/* Section title header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="text-left flex flex-col gap-2">
             <h2 className="text-2xl font-bold font-serif tracking-tight text-[#16233c]">Administrative Dashboard</h2>
             <p className="text-sm text-gray-500 font-medium">Manage admissions, announcements, and university records.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-reload-btn"
              onClick={loadAdminMetrics}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0 shadow-sm bg-white"
            >
              <RefreshCw className={`w-4 h-4 shrink-0 text-[#be123c] ${adminLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
            <button
              id="admin-logout-btn"
              onClick={() => setConfirmAction({
                title: "Confirm Sign Out",
                message: "Are you sure you want to sign out of the Admin Portal?",
                onConfirm: handleLogout
              })}
              className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0 shadow-sm border border-red-200"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Admin sub-tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto overflow-y-hidden">
          {[
            { id: 'applications', label: 'Admissions Applications', icon: FileText },
            { id: 'broadcasts', label: 'Broadcast Announcements', icon: Megaphone },
            { id: 'inbound', label: 'Inbound Support Desk', icon: MessageCircle },
          ].map((sub) => {
            const Icon = sub.icon;
            const isActive = activeAdminSubTab === sub.id;
            return (
              <button
                id={`admin-sub-tab-${sub.id}`}
                key={sub.id}
                onClick={() => setActiveAdminSubTab(sub.id)}
                className={`py-4 px-6 text-sm font-bold uppercase tracking-wider transition flex items-center gap-2 border-b-2 whitespace-nowrap ${
                  isActive
                    ? 'border-[#16233c] text-[#16233c]'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>

        {/* SUB TAB 1: Manage Admissions Applications */}
        {activeAdminSubTab === "applications" && (
          <div className="flex flex-col gap-6" id="admin-apps-tab">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200">
              <div className="text-left flex flex-col gap-1">
                <span className="text-base font-bold text-[#16233c]">Total Admission Entries: {applications.length} Records</span>
                <span className="text-xs text-gray-500 block">Applications submitted through the online admissions portal.</span>
              </div>

              {/* Status filtering */}
              <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-1.5 rounded-none border border-gray-200 text-xs shadow-sm">
                {['all', 'pending', 'reviewing', 'approved', 'rejected'].map((f) => (
                  <button
                    id={`filter-app-${f}`}
                    key={f}
                    onClick={() => setAppFilter(f)}
                    className={`px-4 py-2 font-bold transition uppercase tracking-wider text-[10px] ${
                      appFilter === f
                        ? 'bg-white text-[#16233c] border border-gray-200 shadow-sm'
                        : 'text-gray-500 hover:text-[#16233c]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List browser */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredApps.length === 0 ? (
                <div className="p-10 text-center bg-white border border-dashed border-gray-300 md:col-span-2 shadow-sm">
                  <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <span className="text-sm font-medium text-gray-500 block">No application records match this criteria yet.</span>
                </div>
              ) : (
                filteredApps.map((app) => (
                  <div key={app.id} className="text-left flex flex-col justify-between gap-5 relative p-6 border border-gray-200 bg-white hover:border-[#16233c] hover:shadow-sm transition group">
                    
                    <div className="flex flex-col gap-4 relative z-10">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                        <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest break-all line-clamp-1">{app.id}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 ${
                          (app.status === 'enrolled' || app.status === 4) ? 'bg-[#16233c] text-white' :
                          (app.status === 'approved' || app.status === 2) ? 'bg-green-100 text-green-800' :
                          (app.status === 'rejected' || app.status === 3) ? 'bg-red-100 text-red-800' :
                          (app.status === 1) ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {app.status === 0 ? "Pending" : app.status === 1 ? "Under Review" : app.status === 2 ? "Approved" : app.status === 3 ? "Rejected" : app.status === 4 ? "Enrolled" : app.status}
                        </span>
                      </div>

                      <div className="flex flex-col leading-snug">
                        <strong className="text-lg font-serif font-bold text-[#16233c] tracking-tight">{app.fullName}</strong>
                        <span className="text-xs text-gray-500 font-medium mt-1">{app.email} • {app.phone}</span>
                      </div>

                      <div className="text-sm">
                        <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-widest mb-1.5">Selected Major</span>
                        <strong className="text-[#be123c] font-bold block">{app.selectedProgram || app.program}</strong>
                      </div>

                      <div className="text-sm border-t border-gray-50 pt-3 flex items-center justify-between">
                         <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-widest">Application Date</span>
                         <span className="text-gray-800 text-xs font-medium">{new Date(app.submittedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {app.documents && app.documents.length > 0 && (
                        <div className="text-sm border-t border-gray-50 pt-3">
                           <span className="text-gray-400 block text-[9px] uppercase font-bold tracking-widest mb-2">Documents Uploaded ({app.documents.length})</span>
                           <div className="flex flex-col gap-1 bg-gray-50 p-2 border border-gray-100 min-h-[60px] max-h-[100px] overflow-y-auto">
                              {app.documents.map((doc: any) => (
                                 <button key={doc.id} onClick={(e) => { e.preventDefault(); setPreviewDocument({url: doc.fileUrl, name: doc.name, type: doc.contentType || (doc.fileName && doc.fileName.toLowerCase().endsWith('.pdf') ? 'application/pdf' : doc.fileName && doc.fileName.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) ? 'image/jpeg' : undefined)}); }} className="w-full text-left text-xs text-[#16233c] font-medium hover:text-[#be123c] hover:underline flex items-center gap-1.5 truncate border-0 bg-transparent cursor-pointer py-1 p-0">
                                   <FileText className="w-3 h-3 text-gray-400 shrink-0" />
                                   {doc.name} - {Math.round(doc.fileSize / 1024)}KB
                                 </button>
                              ))}
                           </div>
                        </div>
                      )}
                    </div>

                    {/* Admin actions status setter */}
                    {(app.status === ApplicationStatus.PENDING || app.status === 0 || app.status === 1) && (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2 pt-4 border-t border-gray-100 relative z-10">
                        <button
                          onClick={() => setConfirmAction({
                            title: "Reject Application",
                            message: `Are you sure you want to reject the application for ${app.fullName}?`,
                            onConfirm: () => handleUpdateAppStatus(app.id, ApplicationStatus.REJECTED)
                          })}
                          className="flex-1 py-3 bg-red-50 hover:bg-red-100 text-red-700 text-[9px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 border border-red-100 transition"
                        >
                          <X className="w-3 h-3 shrink-0" />
                          <span>Reject</span>
                        </button>
                        {app.status === 0 && (
                          <button
                            onClick={() => setConfirmAction({
                              title: "Mark Under Review",
                              message: `Are you sure you want to mark the application for ${app.fullName} as Under Review?`,
                              onConfirm: () => handleUpdateAppStatus(app.id, 1)
                            })}
                            className="flex-1 py-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-200 text-[9px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition"
                          >
                            <FileText className="w-3 h-3 shrink-0" />
                            <span>Review</span>
                          </button>
                        )}
                        <button
                          onClick={() => setConfirmAction({
                            title: "Approve Application",
                            message: `Are you sure you want to approve the application for ${app.fullName}?`,
                            onConfirm: () => handleUpdateAppStatus(app.id, ApplicationStatus.APPROVED)
                          })}
                          className="flex-1 py-3 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-[9px] uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 transition"
                        >
                          <Check className="w-3 h-3 shrink-0" />
                          <span>Approve</span>
                        </button>
                      </div>
                    )}
                    {(app.status === ApplicationStatus.APPROVED || app.status === 2) && (
                      <div className="grid grid-cols-1 gap-3 mt-2 pt-4 border-t border-gray-100 relative z-10">
                        <button
                          onClick={() => setConfirmAction({
                            title: "Admit Student",
                            message: `Are you sure you want to admit ${app.fullName} to the institution? This will create a student account.`,
                            onConfirm: () => handleAdmitStudent(app.id)
                          })}
                          className="py-3 bg-[#16233c] hover:bg-black text-white text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition shadow-sm"
                        >
                          <Sparkles className="w-3 h-3 shrink-0 text-[#be123c]" />
                          <span>Admit to Institution (Create Student Account)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SUB TAB 2: Publish News Announcements */}
        {activeAdminSubTab === "broadcasts" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="admin-news-tab">
            
            {/* Publish Form */}
            <form onSubmit={handlePublishBroadcast} className="lg:col-span-6 flex flex-col gap-5 text-left bg-white p-8 border border-gray-200 shadow-sm">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-base font-serif font-bold text-[#16233c] tracking-tight flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-[#be123c]" />
                  Publish Academic Notice
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  Announcements go live instantly inside the public <strong>News & Events</strong> tab.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Notice Title / Subject</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g., Exam Postponement or Cohort Induction"
                  className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:border-[#16233c] font-sans bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Classification Group</label>
                <select
                  value={annCategory}
                  onChange={(e) => setAnnCategory(e.target.value as AnnouncementCategory)}
                  className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:border-[#16233c] bg-gray-50 font-sans"
                >
                  <option value={AnnouncementCategory.NEWS}>📰 Campus News Notice</option>
                  <option value={AnnouncementCategory.EVENT}>📅 Special Event Reception</option>
                  <option value={AnnouncementCategory.SEMINAR}>🔥 Conference & Lecture Seminar</option>
                  <option value={AnnouncementCategory.ACADEMIC}>🏫 Official Academic Calendar Update</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Notice Content Details</label>
                <textarea
                  required
                  rows={6}
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Draft news bullet points or dates here..."
                  className="w-full text-sm p-3 border border-gray-300 focus:outline-none focus:border-[#16233c] resize-none bg-gray-50 font-sans"
                />
              </div>

              <button
                id="publish-news-submit"
                type="submit"
                disabled={annLoading}
                className="w-full py-4 mt-2 bg-[#16233c] hover:bg-[#0d1629] text-white font-bold text-[10px] uppercase tracking-widest transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{annLoading ? "Broadcasting Bulletin..." : "Publish Broadcast Bulletin"}</span>
              </button>
            </form>

            <div className="lg:col-span-6 flex flex-col gap-4 text-left">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Guidelines for Broadcasters
              </span>
              <div className="pt-4 border-t border-gray-300 leading-relaxed text-sm text-gray-700 bg-white p-6 border shadow-sm">
                <div className="relative z-10">
                  <p className="font-bold font-serif text-[#16233c] mb-3 text-lg">Publishing Ethics:</p>
                   As a study center administrator representing <strong className="text-gray-900">Oral Roberts University</strong>, please ensure all bulletins reflect high academic standards, Christian integrity, and accurate Port Harcourt localized calendar timings. Avoid drafts containing typo abbreviations.
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUB TAB 3: Messages and Inquiries Support Desk */}
        {activeAdminSubTab === "inbound" && (
          <div className="flex flex-col gap-6" id="admin-msg-tab">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2">Inbound Inquiries & Support Wall submissions</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.length === 0 ? (
                <div className="p-10 text-center bg-white border border-dashed border-gray-300 sm:col-span-2 lg:col-span-3 shadow-sm">
                  <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <span className="text-sm font-medium text-gray-500 block">Support mail inbox is presently clean and empty.</span>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="text-left flex flex-col justify-between gap-4 relative p-6 bg-white border border-gray-200">
                    <button
                      id={`delete-msg-${m.id}`}
                      onClick={() => setConfirmAction({
                        title: "Delete Message",
                        message: "Are you sure you want to permanently delete this message?",
                        onConfirm: () => handleDeleteMessage(m.id)
                      })}
                      className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-[#be123c] hover:opacity-80 transition"
                      title="Archive message"
                    >
                      Delete
                    </button>

                    <div className="flex flex-col gap-3 pr-8">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3">
                        <Calendar className="w-3 h-3 text-[#be123c] shrink-0" />
                        <span className="truncate">Sender: {m.senderName}</span>
                      </div>

                      {m.recipient === 'prayer-wall' && (
                        <span className="text-[9px] bg-[#16233c] text-white px-2 py-1 rounded-none self-start font-bold uppercase tracking-wider mt-1">
                          Tag: Spiritual Wall
                        </span>
                      )}

                      <p className="text-sm text-gray-800 leading-relaxed mt-1 whitespace-pre-wrap">
                        "{m.text}"
                      </p>
                      <span className="text-[10px] text-[#16233c] font-medium mt-1 truncate block">{m.senderEmail}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* Document Preview Modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setPreviewDocument(null)}>
          <div className="bg-white w-full max-w-4xl h-[85vh] shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-sm font-bold font-serif tracking-tight text-[#16233c] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#be123c]" />
                Document Preview: {previewDocument.name}
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href={previewDocument.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-[10px] uppercase tracking-widest transition"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center relative">
              {previewDocument.type?.includes("image") || previewDocument.url.split('?')[0].match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={previewDocument.url} alt={previewDocument.name} className="max-w-full max-h-full object-contain p-4" />
              ) : previewDocument.type?.includes("pdf") || previewDocument.url.split('?')[0].match(/\.pdf$/i) ? (
                <iframe src={previewDocument.url} className="w-full h-full border-0" title={previewDocument.name} />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-500 mb-4">Preview not available for this file type.</p>
                  <a href={previewDocument.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#16233c] text-white hover:bg-black font-bold text-[10px] uppercase tracking-widest transition shadow-sm">
                    Download File
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal Overlay */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full p-8 shadow-xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
             <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold font-serif tracking-tight text-[#16233c]">{confirmAction.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{confirmAction.message}</p>
             </div>
             <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  onClick={() => setConfirmAction(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-[10px] uppercase tracking-widest transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmAction.onConfirm();
                    setConfirmAction(null);
                  }}
                  className="px-6 py-3 bg-[#be123c] text-white hover:bg-[#9f0f32] font-bold text-[10px] uppercase tracking-widest transition shadow-sm"
                >
                  Confirm Action
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}
