import React, { useState } from "react";
import FullCalendar, { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface MeetingEvent extends EventInput {
  status: "available" | "pending" | "confirmed" | "declined";
  description?: string;
}

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<MeetingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MeetingEvent | null>(null);

  // Add availability slot
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Enter availability title:");
    if (title) {
      setEvents([
        ...events,
        {
          id: String(events.length + 1),
          title,
          start: selectInfo.start,
          end: selectInfo.end,
          color: "blue",
          status: "available",
        },
      ]);
    }
  };

  // Event click actions
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start!,
      end: clickInfo.event.end!,
      color: clickInfo.event.backgroundColor || "blue",
      status: (clickInfo.event.extendedProps.status as MeetingEvent["status"]) || "available",
      description: clickInfo.event.extendedProps.description,
    });
  };

  // Update event status
  const updateEventStatus = (status: MeetingEvent["status"]) => {
    if (!selectedEvent) return;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === selectedEvent.id
          ? { ...ev, status, color: status === "pending" ? "#F59E0B" : status === "confirmed" ? "#10B981" : status === "declined" ? "#EF4444" : "#3B82F6" }
          : ev
      )
    );
    setSelectedEvent(null);
  };

  // Edit event title
  const editEventTitle = () => {
    if (!selectedEvent) return;
    const newTitle = prompt("Edit meeting title:", selectedEvent.title);
    if (newTitle) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === selectedEvent.id ? { ...ev, title: newTitle } : ev))
      );
      setSelectedEvent((prev) => prev && { ...prev, title: newTitle });
    }
  };

  // Delete event
  const deleteEvent = () => {
    if (!selectedEvent) return;
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((ev) => ev.id !== selectedEvent.id));
      setSelectedEvent(null);
    }
  };

  // Send request to investor (dummy)
  const sendRequest = () => {
    if (!selectedEvent) return;
    alert(`Meeting request sent for "${selectedEvent.title}"`);
    updateEventStatus("pending");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Meeting Scheduler</h2>
        <p className="text-gray-500 mb-4">Add availability and manage meetings directly from the calendar.</p>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable
          editable
          select={handleDateSelect}
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          eventColor="inherit"
          eventBackgroundColor={(info) => info.event.extendedProps.color as string}
        />

        {/* Demo Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            onClick={() =>
              setEvents([
                ...events,
                { id: String(events.length + 1), title: "Demo Pending Meeting", start: new Date(), color: "#F59E0B", status: "pending" },
              ])
            }
          >
            Add Demo Pending Meeting
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
            onClick={() =>
              setEvents([
                ...events,
                { id: String(events.length + 1), title: "Demo Confirmed Meeting", start: new Date(), color: "#10B981", status: "confirmed" },
              ])
            }
          >
            Add Demo Confirmed Meeting
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-w-full animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
            <p className="text-gray-600 mt-2">Status: <span className="capitalize font-medium">{selectedEvent.status}</span></p>
            {selectedEvent.description && <p className="text-gray-600 mt-2">{selectedEvent.description}</p>}

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedEvent.status === "available" && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={sendRequest}
                  >
                    Send Request
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={editEventTitle}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={deleteEvent}
                  >
                    Delete
                  </button>
                </>
              )}
              {selectedEvent.status === "pending" && (
                <>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={() => updateEventStatus("confirmed")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
                    onClick={() => updateEventStatus("declined")}
                  >
                    Decline
                  </button>
                </>
              )}
              {selectedEvent.status === "confirmed" && (
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold cursor-not-allowed">
                  Confirmed
                </button>
              )}
            </div>

            <button
              className="mt-4 w-full border border-gray-300 rounded-lg py-2 text-gray-700 font-medium hover:bg-gray-100 transition"
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
