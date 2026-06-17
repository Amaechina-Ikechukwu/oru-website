/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INSTITUTION_INFO, EMAIL_INTRO_TEMPLATE } from '../data';
import { MapPin, Phone, Mail, Send, CheckCircle, MessageSquarePlus, Copy, MessagesSquare, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !text) return;

    setLoading(true);
    setSuccess(false);

    try {
      const payload = {
        senderName: name,
        senderEmail: email,
        senderPhone: phone,
        text: text,
        recipient: 'admin-inbox',
        createdAt: new Date()
      };

      console.info("Simulated API submission: Contact Message", payload);
      await new Promise(resolve => setTimeout(resolve, 800));

      setName("");
      setEmail("");
      setPhone("");
      setText("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24 text-left" id="contact-section-container">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 w-full px-6 lg:px-8">
        
        {/* 1-Column layout: Info Cards, Contact Form */}
        <div className="flex flex-col gap-16 lg:gap-24 items-start">
          
          {/* Column 1: Info Contacts list */}
          <div className="flex flex-col gap-8 text-left w-full">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
                Office Details
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                 Reach out directly for any inquiries regarding our academic programs, admissions, or administrative support.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 p-8 bg-gray-50 border border-gray-200">
               <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Study Center Location</span>
                  <p className="text-[#16233c] font-medium leading-relaxed">{INSTITUTION_INFO.address}</p>
               </div>
               
               <div className="pt-6 border-t border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Hotline Desk</span>
                  <div className="flex flex-col gap-1">
                    {INSTITUTION_INFO.phones.map((p, idx) => (
                      <span key={idx} className="font-mono text-base text-[#16233c]">{p}</span>
                    ))}
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Enquiries Official Mail</span>
                  <p className="text-base font-semibold text-[#16233c] mb-1">{INSTITUTION_INFO.emails.admissions}</p>
               </div>
            </div>



          </div>

          {/* Column 2: Send Message Form */}
          <div className="flex flex-col gap-8 text-left w-full">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
                Request Assistance
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Send a swift memorandum to our Registrar team. We strive to reply within 24 working hours.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="flex flex-col gap-6 p-8 bg-gray-50 border border-gray-200 block">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Deacon Caleb"
                  className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
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
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 XXX..."
                    className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Enquiry Details</label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="How can we assist you?"
                  className="w-full text-sm p-4 rounded-none border border-gray-200 focus:outline-none focus:border-[#16233c] bg-white transition-colors resize-none"
                />
              </div>

              {success && (
                <div className="p-4 bg-green-50 text-green-700 text-sm font-bold border border-green-200 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Enquiry submitted securely to Admissions Office.</span>
                </div>
              )}

              <button
                id="submit-contact-enquiry"
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-2 bg-[#16233c] hover:bg-black text-white font-bold text-xs uppercase tracking-widest rounded-none transition flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Deliver Message"}
              </button>
            </form>
          </div>

        </div>

        {/* Map Section: Custom SVG Styled Street Map */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start pt-16 border-t border-gray-200">
          <div className="flex flex-col gap-8 text-left lg:w-1/3 shrink-0">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">
                Port Harcourt Map
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Custom interactive blueprint of the Mbonu & Ohaeto street junction in D/Line.
              </p>
            </div>


          </div>

          <div className="lg:w-2/3 w-full">
            {/* Vector SVG Map Blueprint */}
            <div className="relative w-full aspect-square md:aspect-auto md:h-96 bg-gray-50 border border-gray-200 rounded-none overflow-hidden flex flex-col items-center justify-center p-2">
                
                {/* Visual grid street lines */}
                <svg className="absolute inset-0 w-full h-full text-red-200 stroke-2 opacity-80" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20%" y1="0%" x2="20%" y2="100%" stroke="currentColor" strokeWidth="8" />
                  <line x1="80%" y1="0%" x2="80%" y2="100%" stroke="currentColor" strokeWidth="8" />
                  <line x1="0%" y1="40%" x2="100%" y2="40%" stroke="currentColor" strokeWidth="16" />
                  <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="8" strokeDasharray="6 6" />
                </svg>

                {/* Road labels */}
                <div className="absolute top-1/2 left-[5%] -translate-y-6 text-[9px] font-bold uppercase text-[#16233c] select-none tracking-widest rotate-270 bg-white/50 px-1 rounded-none">
                  Mbonu Street
                </div>
                <div className="absolute top-1/2 right-[5%] -translate-y-6 text-[9px] font-bold uppercase text-[#16233c] select-none tracking-widest rotate-270 bg-white/50 px-1 rounded-none">
                  Ohaeto Street
                </div>
                <div className="absolute top-[30%] left-1/3 text-[10px] font-black uppercase text-[#16233c] tracking-wider bg-white/60 px-2 py-0.5 rounded-none shadow-sm">
                  OLU OBASANJO ROAD
                </div>

                {/* Pin element */}
                <div className="absolute bottom-[20%] left-[10%] sm:left-[12%] flex flex-col items-center gap-1 group">
                  <div className="w-4 h-4 bg-[#16233c] border-2 border-[#be123c] rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-[#16233c] border-2 border-[#be123c] rounded-full z-10 flex items-center justify-center shadow-lg">
                    <span className="w-1.5 h-1.5 bg-[#be123c] rounded-full"></span>
                  </div>
                  <div className="bg-[#16233c] text-white px-3 py-1.5 rounded-none text-[9px] font-sans font-bold shadow-xl tracking-wide whitespace-nowrap z-20 border border-white/20 mt-1">
                    Methodist Church Premises
                  </div>
                </div>

                {/* Map description labels */}
                <div className="absolute bottom-3 right-3 bg-white border border-gray-200 px-3 py-1.5 rounded-none shadow-sm text-[10px] font-sans font-bold text-[#16233c] flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#be123c] rounded-full"></span>
                  <span>Center Site</span>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}
