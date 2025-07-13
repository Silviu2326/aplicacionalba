

import React from 'react';

interface AddToCalendarProps {
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
}

const AddToCalendar: React.FC<AddToCalendarProps> = ({ title, startTime, endTime, location, description }) => {
  const formatGoogleCalendarUrl = () => {
    const formatDate = (date: Date) => date.toISOString().replace(/-|:|.\d{3}/g, '');
    const url = new URL('https://www.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', title);
    url.searchParams.append('dates', `${formatDate(startTime)}/${formatDate(endTime)}`);
    url.searchParams.append('details', description);
    url.searchParams.append('location', location);
    return url.toString();
  };

  const generateIcsContent = () => {
    const formatDate = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TheraFlow//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@theraflow.com`,
      `DTSTAMP:${formatDate(new Date())}`,
      `DTSTART:${formatDate(startTime)}`,
      `DTEND:${formatDate(endTime)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  const handleDownloadIcs = () => {
    const link = document.createElement('a');
    link.href = generateIcsContent();
    link.download = 'cita-theraflow.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-2xl font-bold text-text mb-4">Cita Confirmada</h3>
      <p className="text-textSecondary mb-6">Añade la cita a tu calendario personal para no olvidarla.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href={formatGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Añadir a Google Calendar
        </a>
        <button
          onClick={handleDownloadIcs}
          className="bg-secondary hover:bg-secondaryHover text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
        >
          Descargar .ics (Outlook, iCal)
        </button>
      </div>
    </div>
  );
};

export default AddToCalendar;
