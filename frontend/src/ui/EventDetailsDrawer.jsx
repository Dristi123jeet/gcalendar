import React from 'react';
import { motion } from 'framer-motion';
import { api } from '../api';

export default function EventDetailsDrawer({ event, onClose }) {
  if (!event) return null;

  async function deleteEvent() {
    if (!confirm('Delete?')) return;
    try {
      await api.delete(`/events/${event.id}`);
      onClose();
    } catch (err) {
      alert('Delete failed');
    }
  }

  return (
    <>
      <div className="fixed inset-0 drawer-backdrop z-40" onClick={onClose}></div>

      <motion.aside initial={{ x: 400 }} animate={{ x: 0 }} className="fixed right-6 top-24 w-[360px] bg-white rounded-lg shadow-lg p-5 z-50">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{event.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()}</p>
          </div>
          <div style={{ background: event.color || '#1a73e8' }} className="w-10 h-10 rounded-md" />
        </div>

        <div className="mt-4 text-sm text-slate-700">Description and details can be edited here.</div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
          <button onClick={deleteEvent} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
        </div>
      </motion.aside>
    </>
  );
}
