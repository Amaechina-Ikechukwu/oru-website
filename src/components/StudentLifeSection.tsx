/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Flame, HeartHandshake, Speech, Users, Smile, HelpCircle, Heart, Star, CheckCircle, PlusCircle, Sparkles } from 'lucide-react';

export default function StudentLifeSection() {
  const [wallSubmissions, setWallSubmissions] = useState<any[]>([
    { name: "John O.", text: "Pray for our upcoming Computer Science semester exams, that everyone would receive exceptional wisdom.", type: "Prayer Request", likes: 12 },
    { name: "Sister Adaeze", text: "Praise report! I secured a job in IT right here in Port Harcourt during my second year in Leadership! God is faithful.", type: "Testimony", likes: 24 },
    { name: "Min. David", text: "Pray for the Methodist Church Premises Fellowship next weekend. Let there be a fresh spiritual outpouring.", type: "Prayer Request", likes: 8 }
  ]);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formText, setFormText] = useState("");
  const [formType, setFormType] = useState("Prayer Request");
  const [wallLoading, setWallLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(false);

  // Load from Simulated Call
  useEffect(() => {
    async function loadWall() {
      // Simulate API load
    }
    loadWall();
  }, []);

  const handleSubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formText || !formEmail) return;

    setWallLoading(true);
    setActionSuccess(false);

    try {
      const payload = {
        senderName: formName,
        senderEmail: formEmail,
        senderPhone: formType, 
        text: formText,
        recipient: 'prayer-wall',
        createdAt: new Date()
      };

      console.info("Simulated API submission: Prayer Wall", payload);
      await new Promise(resolve => setTimeout(resolve, 600));

      setWallSubmissions([
        { name: formName, text: formText, type: formType, likes: 0 },
        ...wallSubmissions
      ]);

      setFormName("");
      setFormEmail("");
      setFormText("");
      setFormType("Prayer Request");
      setActionSuccess(true);
      setTimeout(() => setActionSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setWallLoading(false);
    }
  };

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24" id="student-life-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 w-full px-6 lg:px-8">

        {/* 1. Quad-columns Student Life highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12" id="student-life-grid">
          
          <div className="flex flex-col gap-6 text-left pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 text-[#16233c]" />
              <h4 className="text-base font-bold font-serif text-[#16233c] tracking-tight">Spiritual Chapels</h4>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Experience daily praise assemblies, corporate Bible study intervals, and dedicated days of fast to raise spiritual sensitivity and power in God.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-left pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-4 h-4 text-[#16233c]" />
              <h4 className="text-base font-bold font-serif text-[#16233c] tracking-tight">Worship Fellowships</h4>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Join joint student fellowships arranged inside the Methodist Church Premises in fellowship with active local assemblies in Rivers State.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-left pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Speech className="w-4 h-4 text-[#16233c]" />
              <h4 className="text-base font-bold font-serif text-[#16233c] tracking-tight">Leadership Circles</h4>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Form local study squads, theological discussion roundtables and participate in community cleaning and charity outreaches.
            </p>
          </div>

          <div className="flex flex-col gap-6 text-left pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4 text-[#16233c]" />
              <h4 className="text-base font-bold font-serif text-[#16233c] tracking-tight">Student Services</h4>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Receive career consulting, academic counseling, local-currency scholarship advice, and CCU transcript evaluation assistances.
            </p>
          </div>

        </div>

        {/* 2. Interactive Spiritual Prayer & Testimony Wall */}
        <div className="flex flex-col gap-16 items-start" id="fellowship-prayer-wall">
          
          {/* Wall post form */}
          <div className="flex flex-col gap-8 text-left w-full">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
                Spiritual Wall
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Write your prayer requests or submit testimonies of what God is doing in your study cohort. The community and our campus chaplains join you in intercessions.
              </p>
            </div>

            <form onSubmit={handleSubSubmit} className="flex flex-col gap-6 p-8 bg-gray-50 border border-gray-200 block">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Min. Daniel"
                    className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sharing Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                  >
                    <option value="Prayer Request">🙏 Prayer Request</option>
                    <option value="Testimony">🔥 Testimony</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Official Email</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@email.com (kept private)"
                  className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Request Details</label>
                <textarea
                  required
                  rows={4}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Share details here..."
                  className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors resize-none"
                />
              </div>

              {actionSuccess && (
                <div className="p-4 bg-green-50 text-green-700 text-sm font-bold border border-green-200 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Successfully posted to the Spiritual Wall.</span>
                </div>
              )}

              <button
                id="submit-prayer-form"
                type="submit"
                disabled={wallLoading}
                className="w-full py-4 mt-2 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-none transition flex items-center justify-center gap-2"
              >
                {wallLoading ? "Publishing..." : "Publish to Wall"}
              </button>
            </form>
          </div>

          {/* Wall posts list scroll browser */}
          <div className="flex flex-col pt-4 lg:pt-0 w-full">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
              <span className="text-xs uppercase font-bold text-[#16233c] tracking-widest text-left">
                Active Postings ({wallSubmissions.length})
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-h-[660px] overflow-y-auto pr-4 text-left">
              {wallSubmissions.map((sub, idx) => {
                const isTestimony = sub.type === "Testimony";
                return (
                  <div 
                    key={idx} 
                    className="flex flex-col gap-4 p-8 border border-gray-200 bg-white hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 ${
                        isTestimony ? 'bg-red-50 text-[#be123c]' : 'bg-red-50 text-[#be123c]'
                      }`}>
                        {sub.type}
                      </span>
                      <button 
                        id={`like-btn-${idx}`}
                        className="flex items-center gap-2 hover:text-[#be123c] transition duration-150 group"
                        onClick={() => {
                          const updated = [...wallSubmissions];
                          updated[idx].likes += 1;
                          setWallSubmissions(updated);
                        }}
                      >
                        <span className="font-bold text-[#16233c] text-sm group-hover:text-[#be123c]">{sub.likes}</span>
                        <Heart className="w-4 h-4 fill-gray-200 text-gray-200 group-hover:fill-red-400 group-hover:text-red-400 transition-colors shrink-0" />
                      </button>
                    </div>

                    <p className="text-lg text-[#16233c] font-serif italic leading-relaxed">
                      "{sub.text}"
                    </p>

                    <div className="pt-4 mt-auto border-t border-gray-100 flex items-center">
                      <span className="font-bold text-gray-500 text-sm">~ {sub.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
