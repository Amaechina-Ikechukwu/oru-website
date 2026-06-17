import React from 'react';
import { Building, GraduationCap, Users, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeSection({ setCurrentTab }: HomeSectionProps) {
  return (
    <div className="w-full flex flex-col font-sans" id="home-section-container">
      
      {/* 1. Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="relative h-[600px] w-full bg-slate-900 overflow-hidden flex items-center"
      >
        {/* Abstract background graphics / Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center brightness-75"></div>
        
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-serif mb-6">
              Empowering Leaders for Global Kingdom Impact
            </h1>
            
            <p className="text-lg text-gray-200 mb-8 font-medium leading-relaxed">
              Experience world-class, Christ-centered education right here in Port Harcourt. Equip yourself with the knowledge, skills, and spiritual foundation to lead in your chosen field.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setCurrentTab('programs')}
                className="bg-[#be123c] hover:bg-[#9f0f32] text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition"
              >
                Explore Programs
              </button>
              <button 
                onClick={() => setCurrentTab('admissions')}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider transition backdrop-blur-sm"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. Why Choose Us section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-24 px-8 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="flex flex-col">
            <div className="text-left max-w-xl mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#16233c] mb-6 tracking-tight leading-tight">Why Choose Our Study Center?</h2>
              <p className="text-gray-600 leading-relaxed text-sm font-medium">
                Our unique partnership brings the excellence of Oral Roberts University to Port Harcourt through Peace land University Enugu.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full">
              {/* Card 1 */}
              <div className="group relative bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(37,99,235,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start text-left">
                  <div className="w-14 h-14 bg-red-50 text-[#be123c] flex items-center justify-center rounded-none shadow-sm border border-red-100 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-[#16233c] tracking-tight mb-2">Accredited Excellence</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      Earn globally recognized qualifications backed by ORU and approved locally by Peace land University Enugu for uncompromising academic standards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-white p-8 rounded-none border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(190,18,60,0.1)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start text-left">
                  <div className="w-14 h-14 bg-rose-50 text-[#be123c] flex items-center justify-center rounded-none shadow-sm border border-rose-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shrink-0">
                    <Users className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-[#16233c] tracking-tight mb-2">Christ-Centered Community</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      Develop holistically in an environment that prioritizes spiritual growth, moral integrity, and vibrant Christian fellowship.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-[#16233c] p-8 rounded-none border border-[#1e2e4f] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start text-left">
                  <div className="w-14 h-14 bg-white/10 text-white flex items-center justify-center rounded-none shadow-sm border border-white/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                    <Building className="w-7 h-7" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">Flexible Learning</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                      Enjoy versatile study options including weekend modules and hybrid evenings designed to accommodate busy professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="relative h-[80vh] sm:h-[600px] lg:h-full w-[100vw] lg:w-full left-1/2 lg:left-auto right-1/2 lg:right-auto -ml-[50vw] lg:ml-0 -mr-[50vw] lg:mr-0 min-h-[400px] lg:min-h-[600px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center border-y border-gray-200 lg:border lg:shadow-xl"></div>
            {/* Decorative block */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-48 h-48 bg-[#be123c] -z-10"></div>
          </div>
        </div>
      </motion.section>

      {/* 3. Quick Links Band (4 Columns) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col md:flex-row h-auto md:h-[250px]"
      >
        {/* Box 1 */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer h-[250px] md:h-auto" onClick={() => setCurrentTab('student-life')}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#0d1629]/80 group-hover:bg-[#0d1629]/70 transition-colors duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full text-white text-center">
            <Building size={32} className="mb-4 text-gray-300 transform group-hover:-translate-y-2 transition-transform duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-1">University Life</h3>
            <p className="text-xs text-red-300 font-medium tracking-wide">Overall in here</p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer h-[250px] md:h-auto" onClick={() => setCurrentTab('programs')}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494112-071d16940d14?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#881337]/80 group-hover:bg-[#881337]/70 transition-colors duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full text-white text-center">
            <GraduationCap size={32} className="mb-4 text-gray-300 transform group-hover:-translate-y-2 transition-transform duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Graduation</h3>
            <p className="text-xs text-red-200 font-medium tracking-wide">Getting Diploma</p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer h-[250px] md:h-auto" onClick={() => setCurrentTab('student-life')}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#27272a]/80 group-hover:bg-[#27272a]/70 transition-colors duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full text-white text-center">
            <Users size={32} className="mb-4 text-gray-300 transform group-hover:-translate-y-2 transition-transform duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Athletics</h3>
            <p className="text-xs text-gray-400 font-medium tracking-wide">Sport Clubs</p>
          </div>
        </div>

        {/* Box 4 */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer h-[250px] md:h-auto" onClick={() => setCurrentTab('about')}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-[#3f3f46]/80 group-hover:bg-[#3f3f46]/70 transition-colors duration-300"></div>
          <div className="relative z-10 flex flex-col items-center justify-center p-8 h-full text-white text-center">
            <Navigation size={32} className="mb-4 text-gray-300 transform group-hover:-translate-y-2 transition-transform duration-300" />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Social</h3>
            <p className="text-xs text-gray-300 font-medium tracking-wide">Overall in here</p>
          </div>
        </div>
      </motion.section>

      {/* 3. About Block (Navy) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#16233c] text-white py-24 px-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-16">
          {/* Logo Column */}
          <div className="flex flex-col items-center flex-shrink-0 md:w-1/3">
            <img src="/oru-logo.png" alt="ORU Logo" className="w-28 h-28 object-contain mb-6" />
            <h2 className="text-2xl font-serif tracking-widest uppercase mb-4 text-center">
              ORAL ROBERTS<br/>UNIVERSITY
            </h2>
            <button 
              onClick={() => setCurrentTab('about')}
              className="text-sm font-semibold tracking-wider hover:text-red-300 transition uppercase"
            >
              About our university
            </button>
          </div>
          
          {/* Text Column */}
          <div className="flex flex-col flex-1 gap-8 pt-4">
            <p className="text-lg leading-relaxed text-red-50 font-medium">
              We are one of the largest, most diverse university in the USA with over 60,000 student in USA, and further 20,000 studying across 120 countries for ORU University.
            </p>
            <p className="text-sm leading-relaxed text-red-100/70">
              Nestled in the University of North Florida's thousand-acre nature preserve, the Adam W. Herbert University Center offers a quiet sanctuary in a convenient location. Offering extensive audiovisual services, exclusive catering with on-site chef, wireless internet access and meeting rooms with individual climate and lighting controls, our facility can accommodate groups of 10 to 700.
            </p>
            <div>
              <button 
                onClick={() => setCurrentTab('about')}
                className="text-sm tracking-wider font-semibold hover:text-red-300 transition"
              >
                Read more...
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. White Section - Celebrates */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-white py-24 px-8 text-center text-[#16233c] border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto border border-gray-200 p-12 sm:p-20 relative bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 bg-white px-6">
            <h2 className="text-3xl font-serif font-bold text-[#16233c]">ORU Celebrates</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto mt-4">
            The University of ORU is home to some of the world's top faculty, students,
            alumni and staff. ORU Celebrates recognizes their award-winning
            accomplishments.
          </p>
          
          <button 
            onClick={() => setCurrentTab('programs')}
            className="text-xs font-bold uppercase tracking-widest text-[#16233c] hover:text-red-600 transition"
          >
            RESEARCH & INNOVATION
          </button>
        </div>
      </motion.section>

      {/* Track Application Full Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-gray-50 py-16 px-8 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="flex flex-col text-left max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#16233c] mb-4 tracking-tight leading-tight">Track Your Admission Status</h2>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">
              Already submitted your application? Check your current status, view next steps, and manage your uploaded documents seamlessly.
            </p>
          </div>
          <button 
            onClick={() => setCurrentTab('track-application')}
            className="flex-shrink-0 bg-[#be123c] hover:bg-[#9f0f32] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition"
          >
            Track Application
          </button>
        </div>
      </motion.section>

    </div>
  );
}
