import React, { useState } from 'react';
import { applicationsApi } from '../api';
import { DocumentManager } from './ApplicationPortal';

export default function TrackApplication() {
  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [trackedApp, setTrackedApp] = useState<any | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTyped, setSearchTyped] = useState(false);
  const [successAppId, setSuccessAppId] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

  const handleTrackQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTrackingId) return;

    setSearchLoading(true);
    setTrackedApp(null);
    setSearchTyped(true);

    try {
      const res = await applicationsApi.checkStatus(searchTrackingId);
      
      if (res.success && res.data) {
        setTrackedApp(res.data);
        setSuccessAppId(res.data.id || "");
        setUploadedDocuments(res.data.documents || []);
      } else {
        console.warn("Tracking failed");
      }
    } catch (error) {
      console.warn("Tracking failed", error);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24 text-left border-t border-gray-200">
      <div className="max-w-3xl mx-auto flex flex-col gap-8 w-full px-6 lg:px-8 items-center">
        
        <div className="flex flex-col gap-4 text-center">
           <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
             Track Your Application
           </h3>
           <p className="text-gray-600 font-medium leading-relaxed max-w-md mx-auto">
              Check your current admission status and manage your uploaded documents.
           </p>
        </div>

        <div className="w-full flex flex-col gap-6 font-sans">
           <form onSubmit={handleTrackQuery} className="flex flex-col gap-4 p-8 bg-gray-50 border border-gray-200">
              <p className="text-sm font-medium text-gray-600 leading-relaxed mb-2">
                Enter your email address used during your application to check your current admission status.
              </p>
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                 <div className="flex gap-2">
                   <input
                     type="email"
                     required
                     value={searchTrackingId}
                     onChange={(e) => setSearchTrackingId(e.target.value.toLowerCase())}
                     placeholder="name@email.com"
                     className="flex-1 text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors font-mono"
                   />
                   <button
                     type="submit"
                     disabled={searchLoading}
                     className="px-6 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center disabled:opacity-50"
                   >
                     {searchLoading ? "..." : "Track"}
                   </button>
                 </div>
              </div>

              {searchTyped && !searchLoading && !trackedApp && (
                <div className="p-4 bg-red-50 text-[#be123c] border border-red-200 text-xs font-bold leading-relaxed mt-2">
                  No active application found for {searchTrackingId}. Please check the email address or submit a new application.
                </div>
              )}
           </form>

           {trackedApp && (
              <div className="flex flex-col gap-4 p-8 bg-white border border-gray-200 mt-2 shadow-sm">
                 <span className="text-[10px] font-bold uppercase text-[#be123c] tracking-widest pb-3 border-b border-gray-100">Record Found</span>
                 
                 <div className="grid grid-cols-2 gap-4 gap-y-6 pt-2">
                    <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Applicant Name</span>
                       <span className="text-sm font-bold text-[#16233c]">{trackedApp.fullName}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application ID</span>
                       <span className="text-sm font-bold text-[#16233c] font-mono break-all">{trackedApp.id}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2 border-t border-gray-100 pt-4">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selected Program</span>
                       <span className="text-sm font-bold text-[#16233c]">{trackedApp.selectedProgram}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2 md:col-span-1 border-t border-gray-100 pt-4">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Date</span>
                       <span className="text-sm font-bold text-[#16233c]">{new Date(trackedApp.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col gap-1 col-span-2 md:col-span-1 border-t border-gray-100 pt-4">
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Fee Paid</span>
                       <span className="text-sm font-bold text-[#16233c]">{trackedApp.applicationFeePaid ? "Yes" : "No"}</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-between border-t border-red-100 bg-red-50 p-4 mt-4 text-[#be123c]">
                   <span className="text-xs font-bold uppercase tracking-widest">Processing Status</span>
                   <span className="text-xs font-bold uppercase tracking-widest bg-red-100 px-3 py-1 animate-pulse">
                     {trackedApp.status === 0 ? "Pending" : trackedApp.status === 1 ? "Under Review" : trackedApp.status === 2 ? "Approved" : trackedApp.status === 3 ? "Rejected" : "Unknown"}
                   </span>
                 </div>

                 {/* Upload Documents in Tracker */}
                 {(successAppId || searchTrackingId) && trackedApp.status !== 2 && trackedApp.status !== 3 && (
                   <div className="w-full mt-4 flex flex-col gap-6 border-t border-gray-100 pt-6">
                      <h5 className="text-sm font-bold font-serif text-[#16233c] tracking-tight text-left">Manage Documents</h5>
                      <DocumentManager 
                        appId={successAppId || searchTrackingId} 
                        uploadedDocuments={uploadedDocuments} 
                        setUploadedDocuments={setUploadedDocuments} 
                      />
                   </div>
                 )}

              </div>
           )}
        </div>

      </div>
    </div>
  );
}
