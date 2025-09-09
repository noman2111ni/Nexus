import { AvailabilitySlot, Meeting } from "../types";

const availabilityKey = "availabilitySlots";
const meetingsKey = "meetings";

export const getAvailabilityForUser = (userId: string): AvailabilitySlot[] => {
  const slots = JSON.parse(localStorage.getItem(availabilityKey) || "[]");
  return slots.filter((s: AvailabilitySlot) => s.userId === userId);
};

export const addAvailabilitySlot = (slot: AvailabilitySlot) => {
  const slots = JSON.parse(localStorage.getItem(availabilityKey) || "[]");
  slots.push(slot);
  localStorage.setItem(availabilityKey, JSON.stringify(slots));
};

export const getMeetingsForUser = (userId: string): Meeting[] => {
  const meetings = JSON.parse(localStorage.getItem(meetingsKey) || "[]");
  return meetings.filter(
    (m: Meeting) => m.investorId === userId || m.entrepreneurId === userId
  );
};

export const addMeeting = (meeting: Meeting) => {
  const meetings = JSON.parse(localStorage.getItem(meetingsKey) || "[]");
  meetings.push(meeting);
  localStorage.setItem(meetingsKey, JSON.stringify(meetings));
  return meeting;
};

export const updateMeetingStatus = (meetingId: string, status: "accepted" | "declined") => {
  const meetings = JSON.parse(localStorage.getItem(meetingsKey) || "[]");
  const updated = meetings.map((m: Meeting) =>
    m.id === meetingId ? { ...m, status } : m
  );
  localStorage.setItem(meetingsKey, JSON.stringify(updated));
  return updated;
};
