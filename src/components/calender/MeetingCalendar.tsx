import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";

interface Meeting {
  id: string;
  title: string;
  date: string;
}

interface MeetingCalendarProps {
  meetings: Meeting[];
  onAddMeeting: (meeting: Meeting) => void;
  onAddAvailability: (slot: { start: string; end: string }) => void;
  onDeleteMeeting: (id: string) => void;
}

export const MeetingCalendar: React.FC<MeetingCalendarProps> = ({
  meetings,
  onAddMeeting,
  onAddAvailability,
  onDeleteMeeting,
}) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="100%"
      events={meetings}
      selectable={true}
      editable={true}
      dateClick={(info) => {
        const title = prompt("Enter meeting title:");
        if (title) {
          const newMeeting: Meeting = {
            id: String(Date.now()),
            title,
            date: info.dateStr,
          };

          // 🔹 Save in localStorage
          const existingMeetings =
            JSON.parse(localStorage.getItem("meetings") || "[]");
          const updatedMeetings = [...existingMeetings, newMeeting];
          localStorage.setItem("meetings", JSON.stringify(updatedMeetings));

          // 🔹 Update parent state
          onAddMeeting(newMeeting);

          toast.success(`Meeting "${title}" added! 🎉`);
        }
      }}
      select={(info) => {
        onAddAvailability({ start: info.startStr, end: info.endStr });
        toast.info(
          `Availability added from ${info.startStr} to ${info.endStr}`
        );
      }}
      eventClick={(info) => {
        const confirmDelete = window.confirm(
          `Delete meeting: "${info.event.title}" ?`
        );
        if (confirmDelete) {
          // 🔹 Remove from localStorage
          const existingMeetings =
            JSON.parse(localStorage.getItem("meetings") || "[]");
          const updatedMeetings = existingMeetings.filter(
            (m: Meeting) => m.id !== info.event.id
          );
          localStorage.setItem("meetings", JSON.stringify(updatedMeetings));

          // 🔹 Update parent state
          onDeleteMeeting(info.event.id);

          // 🔹 Remove from calendar UI
          info.event.remove();

          toast.error(`Meeting "${info.event.title}" deleted! ❌`);
        }
      }}
    />
  );
};
