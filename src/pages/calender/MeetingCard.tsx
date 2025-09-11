import React from "react";
import { Meeting, User } from "../../types";

interface Props {
  meeting: Meeting;
  user: User;
  onStatusUpdate: (meetingId: string, status: "accepted" | "declined") => void;
}

export const MeetingCard: React.FC<Props> = ({ meeting, user, onStatusUpdate }) => {
  const isEntrepreneur = user.role === "entrepreneur" && meeting.entrepreneurId === user.id;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 border rounded-lg shadow-sm bg-white">
      {/* Meeting Info */}
      <div className="flex-1">
        <p className="font-semibold text-gray-800 text-sm sm:text-base">{meeting.title}</p>
        <p className="text-xs sm:text-sm text-gray-500">
          {meeting.startTime} - {meeting.endTime}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Status: <span className="capitalize font-medium">{meeting.status}</span>
        </p>
      </div>

      {/* Action Buttons (only entrepreneur) */}
      {isEntrepreneur && meeting.status === "pending" && (
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => onStatusUpdate(meeting.id, "accepted")}
            className="w-full sm:w-auto px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition"
          >
            Accept
          </button>
          <button
            onClick={() => onStatusUpdate(meeting.id, "declined")}
            className="w-full sm:w-auto px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
