import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function MiniCalendar() {
  return (
    <div className="mini-calendar">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        height={220}
        showNonCurrentDates={false}
        dayMaxEventRows={0}
        fixedWeekCount={false}
        dayCellClassNames={() => 'text-sm'}
      />
    </div>
  );
}
