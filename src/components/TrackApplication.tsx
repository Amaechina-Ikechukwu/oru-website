import React, { useState } from 'react';
import { applicationsApi } from '../api';
import { DocumentManager } from './ApplicationPortal';
import { AlertTriangle, Upload, X, Building } from 'lucide-react';
import { toast } from 'sonner';

const ReceiptModal = ({ isOpen, onClose, appId, onSuccess }: { isOpen: boolean, onClose: () => void, appId: string, onSuccess: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file as Blob);
      const res = await applicationsApi.submitReceipt(appId, formData);
      if (res.success) {
        toast.success("Receipt uploaded successfully!");
        onSuccess();
        onClose();
      } else {
        toast.error(res.message || "Failed to upload receipt");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload receipt");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 font-sans">
      <div className="bg-white max-w-lg w-full flex flex-col shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 border-b border-gray-100 flex flex-col gap-2">
          <h3 className="text-xl font-bold font-serif text-[#16233c]">Submit Application Fee Receipt</h3>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
             <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-yellow-900 leading-relaxed">
                  <strong>Action Required:</strong> Admin won't see your application unless you pay the application fee and upload the receipt here.
                </p>
             </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 p-4 shrink-0 col-span-2">
             <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Bank Details</span>
             </div>
             <div className="flex flex-col gap-0.5">
                <span className="font-bold text-[#16233c] text-base">Southern Bible College</span>
                <span className="font-mono font-bold text-lg text-[#be123c]">6599302258</span>
                <span className="text-sm font-medium text-gray-600">Moniepoint MFB</span>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <div className="flex items-center gap-2">
                <label
                  htmlFor="receipt-upload"
                  className="flex-1 flex flex-col items-center justify-center gap-2 text-sm p-6 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="font-medium text-gray-600">
                    {file ? file.name : "Select Receipt (PDF or Image)"}
                  </span>
                </label>
                <input
                  type="file"
                  id="receipt-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
             </div>
             
             <button
                type="submit"
                disabled={!file || uploading}
                className="w-full py-4 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center disabled:opacity-50"
             >
                {uploading ? "Uploading..." : "Submit Receipt"}
             </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default function TrackApplication() {
  const [searchTrackingId, setSearchTrackingId] = useState("");
  const [trackedApp, setTrackedApp] = useState<any | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTyped, setSearchTyped] = useState(false);
  const [successAppId, setSuccessAppId] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const handleTrackQuery = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24 text-left border-t border-gray-200 relative">
      <ReceiptModal 
        isOpen={showReceiptModal} 
        onClose={() => setShowReceiptModal(false)} 
        appId={successAppId}
        onSuccess={() => {
          handleTrackQuery(); // Refresh tracking data to show 'Yes' for fee paid
        }}
      />
      
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
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</span>
                       <span className="text-sm font-bold text-[#16233c] font-mono break-all">{trackedApp.email || searchTrackingId}</span>
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
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application Fee Status</span>
                       <span className="text-sm font-bold text-[#16233c]">
                         {trackedApp.applicationFeePaid 
                           ? "Paid" 
                           : trackedApp.applicationFeeReceiptUrl 
                             ? "Receipt Uploaded (Under Review)" 
                             : "Unpaid"}
                       </span>
                    </div>
                 </div>

                 {/* Warning and Modal Trigger */}
                 {!trackedApp.applicationFeePaid && !trackedApp.applicationFeeReceiptUrl && trackedApp.status !== 3 && (
                   <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-yellow-200 bg-yellow-50 p-4 mt-2 gap-4">
                     <div className="flex items-start gap-3 flex-1">
                       <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                       <div className="text-sm font-medium text-yellow-900">
                         <p><strong>Pending Payment:</strong> Upload your application fee receipt to proceed with processing.</p>
                       </div>
                     </div>
                     <button
                       onClick={() => setShowReceiptModal(true)}
                       className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0 text-center"
                     >
                       Submit Receipt
                     </button>
                   </div>
                 )}

                 <div className="flex items-center justify-between border-t border-red-100 bg-red-50 p-4 mt-4 text-[#be123c]">
                   <span className="text-xs font-bold uppercase tracking-widest">Processing Status</span>
                   <span className="text-xs font-bold uppercase tracking-widest bg-red-100 px-3 py-1 animate-pulse">
                     {trackedApp.status === 0 ? "Pending" : trackedApp.status === 1 ? "Under Review" : trackedApp.status === 2 ? "Approved" : trackedApp.status === 3 ? "Rejected" : "Unknown"}
                   </span>
                 </div>

                 {/* Upload Documents in Tracker */}
                 {(successAppId) && trackedApp.status !== 2 && trackedApp.status !== 3 && (
                   <div className="w-full mt-4 flex flex-col gap-6 border-t border-gray-100 pt-6">
                      <h5 className="text-sm font-bold font-serif text-[#16233c] tracking-tight text-left">Manage Documents</h5>
                      <DocumentManager 
                        appId={successAppId} 
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
