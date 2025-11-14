import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { motion } from 'framer-motion';

const COLORS = ['#1a73e8', '#34a853', '#fbbc05', '#ea4335', '#8ab4f8', '#a142f4'];

export default function EventPopover({ anchor, initial, onClose }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [allDay, setAllDay] = useState(initial.allDay || false);

  // Fill start/end times
  useEffect(() => {
    if (initial.start) {
      setStart(new Date(initial.start).toISOString().slice(0, 16));
    }
    if (initial.end) {
      setEnd(new Date(initial.end).toISOString().slice(0, 16));
    }
  }, [initial]);

  // ⭐ SMART — Auto adjust popover inside screen
  function computePosition() {
    const popWidth = 320;
    const popHeight = 260;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    let x = anchor.x;
    let y = anchor.y;

    // Center horizontally if near edges
    if (x + popWidth / 2 > screenW) {
      x = screenW - popWidth - 20;
    } else if (x - popWidth / 2 < 0) {
      x = 20;
    } else {
      x = x - popWidth / 2;
    }

    // Prevent going off bottom
    if (y + popHeight > screenH) {
      y = screenH - popHeight - 20;
    }

    // Prevent going above top
    if (y < 80) {
      y = 80;
    }

    return { left: x, top: y };
  }

  const position = computePosition();

  async function createEvent() {
    try {
      const payload = {
        title,
        description: '',
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
        allDay,
        color
      };
      await api.post('/events', payload);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Create failed');
    }
  }

  return (
    <div style={{ position: 'absolute', ...position, zIndex: 999 }}>
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="popover"
        style={{ width: 320 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold">Create Event</div>
          <button onClick={onClose} className="text-slate-500">✕</button>
        </div>

        <input
          className="w-full border rounded p-2 mb-2"
          placeholder="Event title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-2 mb-2">
          <input type="datetime-local" className="border rounded p-2"
                 value={start} onChange={e => setStart(e.target.value)} />
          <input type="datetime-local" className="border rounded p-2"
                 value={end} onChange={e => setEnd(e.target.value)} />
        </div>

        <label className="flex items-center gap-2 mb-3">
          <input type="checkbox" checked={allDay} onChange={e => setAllDay(e.target.checked)} />
          All day
        </label>

        <div className="flex gap-2 mb-4">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="w-6 h-6 rounded-full"
              style={{
                background: c,
                border: c === color ? '2px solid #111' : 'none'
              }}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
          <button onClick={createEvent} className="px-3 py-1 rounded create-btn">Create</button>
        </div>

      </motion.div>
    </div>
  );
}
