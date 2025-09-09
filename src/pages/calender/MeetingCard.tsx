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
    <div className="flex justify-between items-center p-2 border rounded">
      <div>
        <p className="font-semibold">{meeting.title}</p>
        <p className="text-sm text-gray-500">{meeting.startTime} - {meeting.endTime}</p>
        <p className="text-sm text-gray-500">Status: {meeting.status}</p>
      </div>
      {isEntrepreneur && meeting.status === "pending" && (
        <div className="flex gap-2">
          <button
            onClick={() => onStatusUpdate(meeting.id, "accepted")}
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={() => onStatusUpdate(meeting.id, "declined")}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};
