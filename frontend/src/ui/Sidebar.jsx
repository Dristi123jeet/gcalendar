import React from 'react';
import MiniCalendar from './MiniCalendar';
import { FaSquare } from 'react-icons/fa';

const COLORS = [
  { name: 'Primary', color: '#1a73e8' },
  { name: 'Personal', color: '#34a853' },
  { name: 'Work', color: '#fbbc05' },
  { name: 'Birthday', color: '#ea4335' },
];

export default function Sidebar({ onCreateClick }) {

  return (
    <aside className="sidebar">
      <div className="sidebar-card">
        <div className="flex items-center justify-between">
         <button className="create-btn" onClick={onCreateClick}>
  <span className="material-icons">add</span> Create
</button>

        </div>

        <div className="mt-4">
          <MiniCalendar />
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">My calendars</h4>
          <ul className="space-y-3">
            {COLORS.map(c => (
              <li key={c.name} className="flex items-center gap-3">
                <FaSquare style={{ color: c.color }} />
                <span className="text-sm">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-sm text-slate-500">Other calendars</div>
      </div>
    </aside>
  );
}
