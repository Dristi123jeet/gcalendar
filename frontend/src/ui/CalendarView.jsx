import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { api } from '../api';
import EventPopover from './EventPopover';

function EventContent(arg) {
  const searchQuery = arg.view.calendar.getOption("searchQuery") || "";
  const isMatch = arg.event.title.toLowerCase().includes(searchQuery.toLowerCase());

  const style = {
    background: arg.event.backgroundColor || arg.event.extendedProps.color || "#1a73e8",
    borderRadius: 8,
    padding: "6px 8px",
    color: "#fff",
    fontWeight: 600,
    outline: isMatch ? "3px solid #000" : "none"
  };

  return (
    <div style={style} data-event-id={arg.event.id}>
      <div style={{ fontSize: 13 }}>{arg.event.title}</div>
    </div>
  );
}

export default function CalendarView({ onOpenEvent, searchQuery }) {
  const calendarRef = useRef(null);

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [popover, setPopover] = useState(null);
  const [range, setRange] = useState({ start: null, end: null });

  async function fetchEvents(start, end) {
    try {
      const params = {};
      if (start && end) {
        params.start = start.toISOString();
        params.end = end.toISOString();
      }

      const res = await api.get('/events', { params });
      const mapped = res.data.map(e => ({
        id: e._id,
        title: e.title,
        start: e.start,
        end: e.end,
        color: e.color || '#1a73e8',
        backgroundColor: e.color || '#1a73e8',
        allDay: e.allDay
      }));

      setEvents(mapped);
    } catch (err) {
      console.error('fetchEvents', err);
    }
  }

  useEffect(() => {
    if (!searchQuery) {
      setFilteredEvents(events);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matched = events.filter(ev =>
      ev.title.toLowerCase().includes(q)
    );

    setFilteredEvents(matched);

    if (matched.length > 0) {
      setTimeout(() => {
        const el = document.querySelector(`[data-event-id="${matched[0].id}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
    }

  }, [searchQuery, events]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    fetchEvents(start, end);
  }, []);

  function handleDatesSet(info) {
    setRange({ start: info.start, end: info.end });
    fetchEvents(info.start, info.end);
  }

  function handleDateClick(info) {
    setPopover({
      anchor: { x: info.jsEvent.clientX, y: info.jsEvent.clientY },
      initial: { start: info.dateStr, end: info.dateStr, allDay: info.allDay }
    });
  }

  function handleSelect(selectInfo) {
    setPopover({
      anchor: { x: 350, y: 150 },
      initial: { start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay }
    });
  }

  function handleEventClick(clickInfo) {
    const ev = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      color: clickInfo.event.backgroundColor
    };
    onOpenEvent(ev);
  }

  async function handleEventDrop(dropInfo) {
    try {
      await api.put(`/events/${dropInfo.event.id}`, {
        start: dropInfo.event.start.toISOString(),
        end: dropInfo.event.end.toISOString()
      });
    } catch (err) {}
  }

  async function handleEventResize(resizeInfo) {
    try {
      await api.put(`/events/${resizeInfo.event.id}`, {
        start: resizeInfo.event.start.toISOString(),
        end: resizeInfo.event.end.toISOString()
      });
    } catch (err) {}
  }

  return (
    <div className="calendar-container" style={{ position: 'relative' }}>
      
      {/* No results Found */}
      {searchQuery && filteredEvents.length === 0 && (
        <div className="absolute right-4 top-4 bg-white shadow px-3 py-2 rounded-md text-sm font-medium text-slate-700 z-50">
          No events found
        </div>
      )}

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        selectable
        select={handleSelect}
        dateClick={handleDateClick}
        events={filteredEvents}
        eventClick={handleEventClick}
        eventContent={EventContent}
        datesSet={handleDatesSet}
        editable
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height="auto"
        nowIndicator
        searchQuery={searchQuery}
      />

      {popover && (
        <EventPopover
          anchor={popover.anchor}
          initial={popover.initial}
          onClose={() => { setPopover(null); fetchEvents(range.start, range.end); }}
        />
      )}

    </div>
  );
}
