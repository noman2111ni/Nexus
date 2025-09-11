import React from "react";
import { AvailabilitySlot, User } from "../../types";

interface Props {
  slot: AvailabilitySlot;
  user: User;
  onRequest: (slot: AvailabilitySlot) => void;
}

export const AvailabilitySlotCard: React.FC<Props> = ({ slot, user, onRequest }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 border rounded-lg shadow-sm bg-white">
      {/* Time */}
      <span className="text-gray-700 font-medium text-sm sm:text-base">
        {slot.startTime} - {slot.endTime}
      </span>

      {/* Button for investors */}
      {user.role === "investor" && (
        <button
          onClick={() => onRequest(slot)}
          className="w-full sm:w-auto px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
        >
          Request Meeting
        </button>
      )}
    </div>
  );
};
