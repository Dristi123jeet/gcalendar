import React from 'react';
import { FaStickyNote, FaCheckCircle, FaUser, FaMapMarkedAlt, FaPlus } from 'react-icons/fa';

export default function RightVerticalBar(){
  return (
    <div
      className="right-vertical hidden md:flex flex-col items-center px-2 gap-4"
      style={{ width: 56 }}
    >
      <div className="icon-btn"><FaStickyNote /></div>
      <div className="icon-btn"><FaCheckCircle /></div>
      <div className="icon-btn"><FaUser /></div>
      <div className="icon-btn"><FaMapMarkedAlt /></div>
      <div className="icon-btn"><FaPlus /></div>
    </div>
  );
}
