import React from "react";
import { AvailabilitySlot, User } from "../../types";

interface Props {
  slot: AvailabilitySlot;
  user: User;
  onRequest: (slot: AvailabilitySlot) => void;
}

export const AvailabilitySlotCard: React.FC<Props> = ({ slot, user, onRequest }) => {
  return (
    <div className="flex justify-between items-center p-2 border rounded">
      <span>{slot.startTime} - {slot.endTime}</span>
      {user.role === "investor" && (
        <button
          onClick={() => onRequest(slot)}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Request Meeting
        </button>
      )}
    </div>
  );
};
