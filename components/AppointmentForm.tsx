import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Phone } from 'lucide-react';

const AppointmentForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '09:00 AM',
    reason: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipient = 'adedamolaisrael4777@gmail.com';
    const subject = `New Appointment Request: ${formData.name}`;
    const body = `
New Appointment Request via Cymedic AI Website

--------------------------------
PATIENT DETAILS
--------------------------------
Name: ${formData.name}
Phone: ${formData.phone}

--------------------------------
REQUESTED APPOINTMENT
--------------------------------
Date: ${formData.date}
Time: ${formData.time}

--------------------------------
REASON FOR VISIT
--------------------------------
${formData.reason}
    `.trim();

    // Create the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the email client
    window.location.href = mailtoLink;

    // Show success message
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto glass-card p-12 rounded-3xl text-center">
        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarIcon size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Booking Request Generated!</h3>
        <p className="text-gray-400 mb-8">
          Your email client has been opened with the appointment details. Please click <strong>Send</strong> to finalize your booking request to our clinic.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-indigo-400 hover:text-indigo-300 font-medium">
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Book an Appointment</h2>
        <p className="text-gray-400">Select a time that works for you. Our doctors are available 24/7 for AI triage and 9-5 for consultations.</p>
      </div>

      <form className="glass-card p-8 rounded-3xl space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors" 
                placeholder="John Doe" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors" 
                placeholder="+1 (555) 000-0000" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Preferred Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="date" 
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]" 
                required 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <select 
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              >
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Reason for Visit</label>
            <textarea 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors h-32" 
              placeholder="Describe your symptoms or reason for checking in..."
              required
            ></textarea>
        </div>

        <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;