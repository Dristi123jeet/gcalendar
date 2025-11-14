import React, { useState } from 'react';
import Topbar from '../ui/Topbar';
import Sidebar from '../ui/Sidebar';
import CalendarView from '../components/CalendarView';
import EventDetailsDrawer from '../ui/EventDetailsDrawer';
import RightVerticalBar from '../ui/RightVerticalBar';
import EventPopover from '../ui/EventPopover';

export default function CalendarPage() {
  const [drawerEvent, setDrawerEvent] = useState(null);
  const [createPopover, setCreatePopover] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">

      {/* Topbar with search */}
      <Topbar onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-6 items-start">

        {/* Sidebar with Create Button */}
        <Sidebar
          onCreateClick={() =>
            setCreatePopover({
              anchor: { x: 350, y: 150 },
              initial: {
                start: new Date().toISOString(),
                end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                allDay: false
              }
            })
          }
        />

        {/* Calendar */}
        <div className="flex-1">
          <CalendarView
            onOpenEvent={(ev) => setDrawerEvent(ev)}
            searchQuery={searchQuery}
          />
        </div>

        {/* Drawer */}
        <EventDetailsDrawer
          event={drawerEvent}
          onClose={() => setDrawerEvent(null)}
        />

        <RightVerticalBar />
      </div>

      {/* Create Popover */}
      {createPopover && (
        <EventPopover
          anchor={createPopover.anchor}
          initial={createPopover.initial}
          onClose={() => setCreatePopover(null)}
        />
      )}

    </div>
  );
}
