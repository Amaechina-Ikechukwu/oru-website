/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PROGRAMS } from '../data';
import { ApplicationStatus } from '../types';
import { CheckCircle, Search, AlertTriangle, ChevronRight, GraduationCap, Building, Wallet, Calendar, Copy, ChevronDown, Plus, X, FileText, Upload, Info } from 'lucide-react';
import { PDF_CURRICULUM, PAYMENT_ACCOUNTS } from '../curriculumData';
import { applicationsApi } from '../api';
import { toast } from 'sonner';

const CustomSelect = ({ 
  value, 
  options, 
  onChange, 
  placeholder 
}: { 
  value: string | number; 
  options: {value: string | number, label: string}[]; 
  onChange: (val: any) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => String(opt.value) === String(value));

  return (
    <div className="relative w-full font-sans" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors flex justify-between items-center"
      >
        <span className={selectedOption ? 'text-black' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`p-3 text-sm cursor-pointer transition-colors ${String(option.value) === String(value) ? 'bg-[#16233c] text-white font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Document Manager Shared Component
export const DocumentManager = ({ appId, uploadedDocuments, setUploadedDocuments }: { appId: string, uploadedDocuments: any[], setUploadedDocuments: any }) => {
  const [uploading, setUploading] = useState(false);
  const [replacingId, setReplacingId] = useState<string | null>(null);

  const [pendingDocs, setPendingDocs] = useState<{ id: string; name: string; files: File[] }[]>([
    { id: Date.now().toString(), name: "", files: [] }
  ]);

  const handleUploadPending = async () => {
    const validDocs = pendingDocs.filter(d => d.name.trim() && d.files.length > 0);
    if (validDocs.length === 0) {
      toast.error("Please provide a name and select files for pending documents.");
      return;
    }
    setUploading(true);
    let allSuccess = true;
    try {
      for (const doc of validDocs) {
        const formData = new FormData();
        doc.files.forEach(f => formData.append("files", f as Blob));
        
        const res = await applicationsApi.uploadDocuments(appId, doc.name.trim(), formData);
        if (res.success && res.data) {
          toast.success(`${doc.name} uploaded successfully!`);
          setUploadedDocuments((prev: any) => {
            const newDocs = res.data.filter((newDoc: any) => !prev.find((oldDoc: any) => oldDoc.id === newDoc.id));
            return [...prev, ...newDocs];
          });
        } else {
          allSuccess = false;
          toast.error(res.message || `Failed to upload ${doc.name}`);
        }
      }
      if (allSuccess) {
        setPendingDocs([{ id: Date.now().toString(), name: "", files: [] }]);
      }
    } catch (err: any) {
      toast.error(err.message || `Failed to upload documents`);
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
     if (!e.target.files || e.target.files.length === 0) return;
     setUploading(true);
     setReplacingId(docId);
     try {
       const formData = new FormData();
       formData.append("file", e.target.files[0] as Blob);
       const res = await applicationsApi.replaceDocument(appId, docId, formData);
       if (res.success && res.data) {
         toast.success("Document replaced");
         setUploadedDocuments((prev: any) => prev.map((d: any) => d.id === docId ? res.data : d));
       } else {
         toast.error(res.message || "Failed to replace");
       }
     } catch(err: any) {
       toast.error("Replace failed");
     } finally {
       setUploading(false);
       setReplacingId(null);
       e.target.value = '';
     }
  };

  const handleDelete = async (docId: string) => {
    try {
       const res = await applicationsApi.deleteDocument(appId, docId);
       if (res.success) {
         toast.success("Document deleted");
         setUploadedDocuments((prev: any) => prev.filter((d: any) => d.id !== docId));
       } else {
         toast.error(res.message || "Failed to delete");
       }
    } catch {
       toast.error("Failed to delete");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* List Existing Documents */}
      {uploadedDocuments.length > 0 && (
        <div className="flex flex-col gap-2">
          <h6 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Uploaded Documents</h6>
          {uploadedDocuments.map(d => (
            <div key={d.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 p-3 gap-2 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                  <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#16233c]">{d.name}</span>
                    <span className="text-xs text-gray-500 truncate">{d.fileName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:self-center self-end">
                  <label className="text-[10px] bg-gray-50 border border-gray-300 px-3 py-1.5 cursor-pointer hover:bg-gray-100 text-gray-700 uppercase font-bold tracking-widest transition-colors">
                      {replacingId === d.id ? '...' : 'Replace'}
                      <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" disabled={uploading} onChange={(e) => handleReplace(e, d.id)} />
                  </label>
                  <button type="button" onClick={() => handleDelete(d.id)} className="text-[10px] bg-white text-red-500 hover:text-red-700 uppercase font-bold tracking-widest transition-colors">
                    Delete
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload New Documents */}
      <div className="flex flex-col gap-3 bg-gray-50 border border-gray-200 p-4 shadow-sm relative">
          <h6 className="text-[10px] font-bold text-[#16233c] uppercase tracking-widest mb-1">Add New Documents</h6>
          <div className="flex flex-col gap-4">
            {pendingDocs.map((doc, idx) => (
              <div key={doc.id} className="flex flex-col gap-3 p-3 border border-gray-200 bg-white relative">
                {pendingDocs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setPendingDocs(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="w-full pr-6">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Document Name</label>
                  <input
                    type="text"
                    value={doc.name}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setPendingDocs(prev => prev.map((d, i) => i === idx ? { ...d, name: newVal } : d));
                    }}
                    placeholder="e.g. Transcript, ID Card"
                    className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                  />
                </div>
                <div className="w-full">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 block">Select Files</label>
                  <div className="flex flex-col gap-2">
                    {doc.files.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-1">
                        {doc.files.map((f, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-1 text-xs">
                            <span className="truncate max-w-[120px]">{f.name}</span>
                            <button 
                              type="button" 
                              onClick={() => {
                                setPendingDocs(prev => prev.map((d, i) => i === idx ? { ...d, files: d.files.filter((_, fi) => fi !== fIndex) } : d));
                              }}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center h-10">
                      <label
                        htmlFor={`pending-doc-${doc.id}`}
                        className="flex-1 flex items-center justify-center gap-2 text-sm px-4 h-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
                      >
                        <Upload className="w-4 h-4" />
                        Choose Files
                      </label>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        id={`pending-doc-${doc.id}`}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            const newFiles = Array.from(e.target.files);
                            setPendingDocs(prev => prev.map((d, i) => i === idx ? { ...d, files: [...d.files, ...newFiles] } : d));
                          }
                          e.target.value = '';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setPendingDocs(prev => [...prev, { id: Date.now().toString(), name: "", files: [] }])}
              className="text-[#16233c] hover:text-black font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Document Slot
            </button>
            <button
              onClick={handleUploadPending}
              disabled={uploading}
              className="py-2.5 px-5 bg-[#16233c] hover:bg-black text-white font-bold text-[10px] uppercase tracking-widest transition-colors disabled:bg-opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploading ? "Uploading..." : "Upload All"}
            </button>
          </div>
      </div>
    </div>
  );
};

interface ApplicationPortalProps {
  initialProgram: string;
}

export default function ApplicationPortal({ initialProgram }: ApplicationPortalProps) {
  const [loading, setLoading] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [successAppId, setSuccessAppId] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [program, setProgram] = useState(initialProgram || PROGRAMS[0].title);
  const [studyLevelId, setStudyLevelId] = useState<number>(3); // Default to Undergraduate
  const [studyLevels, setStudyLevels] = useState<{value: number, label: string}[]>([]);
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);

  useEffect(() => {
    const fetchStudyLevels = async () => {
      try {
        const res = await applicationsApi.getStudyLevels();
        if (res.success && res.data) {
          setStudyLevels(res.data);
        } else {
          setStudyLevels([
            { value: 1, label: "Professional Certifications & Short-Term Courses" },
            { value: 2, label: "Diploma Programs (2 years)" },
            { value: 3, label: "Undergraduate / Bachelor's Degree (4 years)" },
            { value: 4, label: "Postgraduate Diploma (PGDE, PDE)" },
            { value: 5, label: "Master's Degree (M.Ed., etc.)" }
          ]);
        }
      } catch (err) {
        setStudyLevels([
            { value: 1, label: "Professional Certifications & Short-Term Courses" },
            { value: 2, label: "Diploma Programs (2 years)" },
            { value: 3, label: "Undergraduate / Bachelor's Degree (4 years)" },
            { value: 4, label: "Postgraduate Diploma (PGDE, PDE)" },
            { value: 5, label: "Master's Degree (M.Ed., etc.)" }
          ]);
      }
    };
    fetchStudyLevels();
  }, []);
  
  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      toast.error("Please fill out all personal details completely.");
      return;
    }
    
    if (!paymentReceipt) {
      toast.error("Payment receipt must be uploaded before submitting the application.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        address,
        selectedProgram: program,
        studyLevelId,
      };

      const result = await applicationsApi.submitApplication(payload);
      
      if (result.success && result.data?.id) {
        // Now upload the payment receipt
        const formData = new FormData();
        formData.append("file", paymentReceipt as Blob);
        
        try {
          const uploadRes = await applicationsApi.submitReceipt(result.data.id, formData);
          if (uploadRes.success) {
            toast.success("Payment receipt submitted successfully!");
          } else {
            toast.warning("Application submitted, but failed to upload payment receipt.");
          }
        } catch (uploadErr) {
          console.error("Receipt upload error:", uploadErr);
          toast.warning("Application submitted, but failed to upload payment receipt.");
        }

        toast.success("Application submitted successfully!");
        setSuccessEmail(email); 
        setSuccessAppId(result.data.id);
        if (!uploadedDocuments.length && result.data.documents) {
          setUploadedDocuments(result.data.documents);
        }
      } else {
        toast.error(result.message || "An error occurred. Please try again.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToTrack = () => {
    // If we're rendering this via App.tsx tab router, we could use that.
    // However, since handleTabChange is not passed down, we might need to handle navigation via window.location 
    // or just pass a prop. Let's just use window.history for now or pass a prop.
    // Actually, setting window location is fine, but it will reload.
    // It's better to stick to standard URL since we have `handleTabChange` in `App.tsx` which looks at `window.location.pathname`.
    window.location.href = '/track-application';
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSuccessEmail("");
    setSuccessAppId("");
    setUploadedDocuments([]);
    setUploadSuccess(false);
    setPaymentReceipt(null);
    navigateToTrack();
  };

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24 text-left border-t border-gray-200">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 w-full px-6 lg:px-8 items-start">
        
        {/* Left Column: Curriculum & Payments */}
        <div className="lg:w-1/2 flex flex-col gap-12 w-full">
          <div className="flex flex-col gap-4">
             <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
               Academic Curriculum
             </h3>
             <p className="text-gray-600 font-medium leading-relaxed">
                Review our comprehensive list of degree and certificate programs.
             </p>
          </div>

          <div className="flex flex-col gap-8">
            {PDF_CURRICULUM.map((section, idx) => (
               <div key={idx} className="flex flex-col gap-4">
                  <div className="bg-[#16233c] text-white px-4 py-2 text-xs uppercase tracking-widest font-bold font-sans">
                    {section.level}
                  </div>
                  <div className="flex flex-col gap-4 pl-4 border-l border-gray-200">
                     {section.programs.map((prog: any, pidx) => (
                        <div key={pidx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 group border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                           <span className="text-[#16233c] font-medium font-sans flex items-center gap-2">
                             <GraduationCap className="w-4 h-4 text-gray-400 group-hover:text-[#be123c] transition-colors" />
                             {prog.name}
                           </span>
                           <div className="flex flex-wrap items-center gap-2">
                             <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest bg-gray-50 px-2 py-1 flex items-center gap-1.5 w-fit">
                               <Calendar className="w-3 h-3" />
                               {prog.duration}
                             </span>
                             {prog.price && (
                               <span className="text-[10px] uppercase font-bold text-[#be123c] tracking-widest bg-red-50/50 px-2 py-1 flex items-center gap-1.5 w-fit hidden sm:flex">
                                 {prog.price}
                               </span>
                             )}
                           </div>
                           {prog.price && (
                             <span className="text-[10px] uppercase font-bold text-[#be123c] tracking-widest bg-red-50/50 px-2 py-1 flex items-center gap-1.5 w-fit sm:hidden mt-2">
                               {prog.price}
                             </span>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 mt-6 border-t border-gray-200 pt-10">
             <h4 className="text-xl font-bold font-serif text-[#16233c] flex items-center gap-2">
               <Wallet className="w-5 h-5 text-[#be123c]" />
               Approved Payment Accounts
             </h4>
             <p className="text-sm text-gray-600 leading-relaxed font-medium">
               All payments in respect to Application Forms, Tuition fees, or Awards must be strictly made into the approved accounts below. Please secure your teller/receipt for verification at the administrative office.
             </p>
             <div className="flex flex-col gap-4">
                {PAYMENT_ACCOUNTS.map((acc, idx) => (
                   <div key={idx} className="bg-gray-50 p-5 border border-gray-200 font-sans">
                      <div className="flex items-center gap-2 mb-3">
                         <Building className="w-4 h-4 text-gray-500" />
                         <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">Bank Details</span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <span className="text-xl font-bold text-[#16233c] tracking-tight">{acc.bank}</span>
                         <span className="text-sm font-medium text-gray-700">Name: <span className="text-[#be123c] font-bold">{acc.accountName}</span></span>
                         <div className="flex flex-col mt-2 gap-1 gap-y-1">
                            {acc.accountNumbers.map((num, i) => (
                               <span key={i} className="font-mono text-[#16233c] bg-white border border-gray-200 px-3 py-1.5 w-fit text-sm">{num}</span>
                            ))}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Application Form & Status Checker */}
        <div className="lg:w-1/2 flex flex-col gap-8 w-full sticky top-10">
           
           <div className="bg-[#16233c] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans border-b-4 border-[#be123c]">
               <div className="flex flex-col gap-1">
                   <h4 className="text-lg font-bold tracking-tight">Already applied?</h4>
                   <p className="text-xs text-white/70 font-medium">Click here to track your application status and upload documents.</p>
               </div>
               <button 
                type="button"
                onClick={navigateToTrack}
                className="bg-[#be123c] hover:bg-[#9f0f32] px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors flex-shrink-0"
               >
                 Track Status
               </button>
           </div>

              <div className="flex flex-col gap-6">
                 {!successAppId ? (
                   <form onSubmit={handleSubmitApplication} className="flex flex-col gap-6 p-8 bg-gray-50 border border-gray-200 font-sans">
                     
                     {/* Dynamic Fee & Document Information Header */}
                     <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-2">
                       <div className="flex items-start">
                         <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                         <div className="flex flex-col">
                           <h5 className="font-bold text-yellow-800 text-sm mb-1">Required Verification Documents</h5>
                           
                           <div className="text-xs text-yellow-800 space-y-2">
                             <div>
                               <p className="font-bold border-b border-yellow-200 pb-1 mb-1">1. General Requirements (All Applicants)</p>
                               <ul className="list-disc list-inside space-y-1">
                                 <li><strong>Payment Receipt:</strong> Proof of registration fee payment (Strictly required below).</li>
                                 <li><strong>Past Certificates:</strong> SSCE, NECO, GCE, or equivalent credentials.</li>
                                 <li><strong>Photographs:</strong> Two recent passport-sized photographs.</li>
                               </ul>
                             </div>
                             
                             <div>
                               <p className="font-bold border-b border-yellow-200 pb-1 mb-1 mt-3">2. Degree-Specific Requirements ({studyLevels.find(l => l.value === studyLevelId)?.label})</p>
                               <ul className="list-disc list-inside space-y-1">
                                 {(studyLevelId === 1 || studyLevelId === 2) && (
                                   <>
                                     <li><strong>Registration Fee:</strong> ₦10,000</li>
                                     <li><strong>Academic Documents:</strong> Tertiary school certificate (if applicable) OR a formal letter of recommendation from your local assembly/church.</li>
                                   </>
                                 )}
                                 {studyLevelId === 3 && (
                                   <>
                                     <li><strong>Registration Fee:</strong> ₦40,000</li>
                                     <li><strong>Academic Documents:</strong> O'Level certificates showing a minimum of 5 credits. Must include English Language and Mathematics, alongside course-specific subjects.</li>
                                   </>
                                 )}
                                 {(studyLevelId === 4 || studyLevelId === 5) && (
                                   <>
                                     <li><strong>Registration Fee:</strong> ₦70,000</li>
                                     <li><strong>Academic Documents:</strong> Previous Bachelor's degree certificates or transcripts, along with baseline O'Level credits required for university entry.</li>
                                   </>
                                 )}
                               </ul>
                             </div>
                           </div>
                           
                           <p className="mt-3 text-xs font-bold text-yellow-900 border-t border-yellow-200 pt-2">
                             Note: Before this application is submitted, you must upload your payment receipt below. Other documents will be uploaded after submitting the initial form.
                           </p>
                         </div>
                       </div>
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Candidate Full Name</label>
                       <input
                         type="text"
                         required
                         value={fullName}
                         onChange={(e) => setFullName(e.target.value)}
                         placeholder="Surname Firstname Middlename"
                         className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                       <input
                         type="email"
                         required
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="name@email.com"
                         className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                       <input
                         type="text"
                         required
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                         placeholder="+234 XXX..."
                         className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Address</label>
                       <input
                         type="text"
                         required
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                         placeholder="123 Main St, City, Country"
                         className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                       />
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Intended Program</label>
                       <CustomSelect
                         value={program}
                         onChange={(val) => setProgram(val)}
                         options={PROGRAMS.map(p => ({ value: p.title, label: p.title }))}
                         placeholder="Select a Program"
                       />
                     </div>

                     <div className="flex flex-col gap-2">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Study Level</label>
                       <CustomSelect
                         value={studyLevelId}
                         onChange={(val) => setStudyLevelId(Number(val))}
                         options={studyLevels}
                         placeholder="Select Study Level"
                       />
                     </div>

                     <div className="flex flex-col gap-2 mt-4 border-t border-gray-200 pt-6">
                       <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Payment Receipt File <span className="text-red-500">*</span></label>
                       <p className="text-xs text-gray-500 mb-2">Upload your proof of registration payment. Applications without a valid receipt cannot be processed.</p>
                       <div className="flex items-center">
                         <label
                           htmlFor="payment-receipt-upload"
                           className="flex items-center justify-center gap-2 text-sm px-6 h-12 border border-gray-300 bg-white text-[#16233c] hover:bg-gray-50 cursor-pointer transition-colors shadow-sm w-full md:w-auto"
                         >
                           <Upload className="w-4 h-4" />
                           {paymentReceipt ? paymentReceipt.name : "Select Receipt File"}
                         </label>
                         <input
                           type="file"
                           id="payment-receipt-upload"
                           className="hidden"
                           accept=".pdf,.jpg,.jpeg,.png"
                           onChange={(e) => {
                             if (e.target.files && e.target.files.length > 0) {
                               setPaymentReceipt(e.target.files[0]);
                             }
                           }}
                         />
                       </div>
                     </div>

                     <button
                       type="submit"
                       disabled={loading}
                       className="w-full py-4 mt-2 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                     >
                       {loading ? "Processing..." : "Submit Application Form"}
                     </button>
                   </form>
                 ) : (
                   <div className="flex flex-col gap-6 p-8 bg-green-50 border border-green-200 font-sans text-center items-center">
                      {!uploadSuccess ? (
                        <>
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-green-200 mb-2">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <h4 className="text-2xl font-bold font-serif text-[#16233c] tracking-tight">Application Received</h4>
                          <p className="text-sm text-gray-700 leading-relaxed max-w-sm font-medium">
                             Your application details have been submitted.
                          </p>
                          <div className="bg-white px-6 py-4 border border-green-300 w-full mt-2">
                             <span className="text-[10px] font-bold uppercase text-green-700 tracking-widest block mb-1">Email Used</span>
                             <span className="font-mono text-xl font-black text-[#16233c] tracking-widest">{successEmail}</span>
                          </div>
                          
                          <div className="w-full mt-4 flex flex-col gap-6 border-t border-green-200 pt-6">
                            <h5 className="text-lg font-bold font-serif text-[#16233c] tracking-tight text-left">Manage Documents</h5>
                            <p className="text-sm text-gray-600 text-left font-medium">
                               Upload required documents. You can replace or delete them later if needed.
                            </p>

                            <DocumentManager 
                              appId={successAppId} 
                              uploadedDocuments={uploadedDocuments} 
                              setUploadedDocuments={setUploadedDocuments} 
                            />

                            <button
                              onClick={handleReset}
                              className="py-3 px-6 mt-4 border border-[#16233c] text-[#16233c] font-bold text-xs uppercase tracking-widest hover:bg-[#16233c] hover:text-white transition-colors"
                            >
                               Finish & View Status
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-green-200 mb-2">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                          </div>
                          <h4 className="text-2xl font-bold font-serif text-[#16233c] tracking-tight">Documents Uploaded</h4>
                          <p className="text-sm text-gray-700 leading-relaxed max-w-sm font-medium">
                             Your application and documents have been successfully submitted. We will review them shortly.
                          </p>
                          <button
                            onClick={handleReset}
                            className="py-3 px-6 mt-4 border border-[#16233c] text-[#16233c] font-bold text-xs uppercase tracking-widest hover:bg-[#16233c] hover:text-white transition-colors"
                          >
                             Finish
                          </button>
                        </>
                      )}
                   </div>
                 )}
              </div>

        </div>

      </div>
    </div>
  );
}
