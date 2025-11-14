import React, { useState } from "react";
import { MdOutlineSearch, MdAccountCircle } from "react-icons/md";

export default function Topbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  }

  return (
    <header className="topbar relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left: Calendar Icon + App Name */}
        <div className="flex items-center gap-3">
          <img
            src="https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png"
            alt="logo"
            style={{ width: 28 }}
          />
          <div className="text-lg font-semibold">GCal Clone</div>
        </div>

        {/* Right: Search + Profile */}
        <div className="flex items-center gap-3">

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full border px-3 py-1 shadow-sm">
            <MdOutlineSearch size={18} className="text-slate-500" />
            <input
              className="ml-2 outline-none text-sm bg-transparent"
              placeholder="Search events"
              value={query}
              onChange={handleSearch}
            />
          </div>

          {/* Profile button */}
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <MdAccountCircle size={20} className="text-slate-600" />
            </div>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md p-2 z-50 text-sm">
                <div className="px-3 py-2 hover:bg-slate-100 rounded cursor-pointer">
                  View Profile
                </div>
                <div className="px-3 py-2 hover:bg-slate-100 rounded cursor-pointer">
                  Settings
                </div>
                <div className="px-3 py-2 hover:bg-slate-100 rounded cursor-pointer">
                  Logout
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
