/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Bell,
  Calendar as CalendarIcon,
  TrendingUp,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getRequestsForEntrepreneur } from "../../data/collaborationRequests";
import { investors } from "../../data/users";
import { CollaborationRequestCard } from "../../components/collaboration/CollaborationRequestCard";
import { InvestorCard } from "../../components/investor/InvestorCard";

// UI components
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { MeetingCalendar } from "../../components/calender/MeetingCalendar";

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [collaborationRequests, setCollaborationRequests] = useState<any[]>([]);
  const [recommendedInvestors] = useState(
    investors.slice(0, 3)
  );

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [meetings, setMeetings] = useState<any[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }

    // outside click close
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [user]);

  const handleRequestStatusUpdate = (
    requestId: string,
    status: "accepted" | "rejected"
  ) => {
    setCollaborationRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status } : req))
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(
    (req) => req.status === "pending"
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            👋 Welcome, {user.name}
          </h1>
          <p className="text-gray-600">
            Here's your startup's activity and meetings overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Calendar Button */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 rounded-full border bg-white hover:bg-gray-50 shadow-sm"
          >
            <CalendarIcon size={20} className="text-gray-700" />
          </button>

          {/* Find Investors */}
          <Link to="/investors">
            <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
          </Link>

          {/* Calendar Popup */}
          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute top-20 right-8 bg-white shadow-2xl rounded-2xl p-4 z-50"
              style={{ width: "420px", height: "450px" }}
            >
              <MeetingCalendar
                meetings={meetings}
                onAddMeeting={(m) => setMeetings([...meetings, m])}
                onAddAvailability={(slot) =>
                  console.log("Availability added:", slot)
                }
                onDeleteMeeting={(id) =>
                  setMeetings(meetings.filter((meeting) => meeting.id !== id))
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending */}
        <Card className="bg-primary-50 border border-primary-200 shadow-sm hover:shadow-md transition">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Bell size={22} className="text-primary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-700">
                Pending Requests
              </p>
              <h3 className="text-2xl font-bold text-primary-900">
                {pendingRequests.length}
              </h3>
            </div>
          </CardBody>
        </Card>

        {/* Connections */}
        <Card className="bg-secondary-50 border border-secondary-200 shadow-sm hover:shadow-md transition">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-secondary-100 rounded-full">
              <Users size={22} className="text-secondary-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary-700">
                Connections
              </p>
              <h3 className="text-2xl font-bold text-secondary-900">
                {
                  collaborationRequests.filter(
                    (req) => req.status === "accepted"
                  ).length
                }
              </h3>
            </div>
          </CardBody>
        </Card>

        {/* Meetings */}
        <Card className="bg-accent-50 border border-accent-200 shadow-sm hover:shadow-md transition">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-accent-100 rounded-full">
              <CalendarIcon size={22} className="text-accent-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-accent-700">
                Upcoming Meetings
              </p>
              <h3 className="text-2xl font-bold text-accent-900">
                {meetings.length}
              </h3>
            </div>
          </CardBody>
        </Card>

        {/* Views */}
        <Card className="bg-green-50 border border-green-200 shadow-sm hover:shadow-md transition">
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp size={22} className="text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">
                Profile Views
              </p>
              <h3 className="text-2xl font-bold text-green-900">24</h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Requests + Investors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration Requests */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Collaboration Requests
              </h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map((request) => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle size={28} className="text-gray-500" />
                  </div>
                  <p className="text-gray-600">No collaboration requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Once investors are interested, requests will appear here.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Recommended Investors */}
        <div>
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Recommended Investors
              </h2>
              <Link
                to="/investors"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map((investor) => (
                <InvestorCard
                  key={investor.id}
                  investor={investor}
                  showActions={false}
                />
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
