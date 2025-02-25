import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface FullCalendarComponentProps {
  onDateClick: (date: Date) => void;
}

const FullCalendarComponent: React.FC<FullCalendarComponentProps> = ({ onDateClick }) => {
  const handleDateClick = (arg: any) => {
    onDateClick(arg.date);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={[]} // Vous pouvez ajouter des événements ici si nécessaire
    />
  );
};

export default FullCalendarComponent;
