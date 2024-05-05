import React, { useState, useEffect } from "react";
import { useParams,useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGlobalContext } from "../hooks/useGlobalContext";
import EditEventModel from "./EditEventModel";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const location = useLocation();
  const { userId } = useParams();
  const { patientId, patientName,doctorId } = location.state || {};
  console.log("Patient Name",doctorId);
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const { getEvents, createEvent, updateEvent, deleteEvent, lastUpdated } =
    useGlobalContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [eventStatus, setEventStatus] = useState("available");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [countAvailable, setCountAvailable] = useState(0);
  const [countUnavailable, setCountUnavailable] = useState(0);
  const [view, setView] = useState("month");
  const fetchEvents = async () => {
    try {
      const response = await getEvents(userId);
      if (response && Array.isArray(response)) {
        const parsedEvents = response.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          status: event.status || "available",
        }));
        setEvents(parsedEvents);
        updateCounts(parsedEvents);
      } else {
        console.error("No events found");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [lastUpdated]);

  const eventPropGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    if (event.status === "available") {
      backgroundColor = "green";
    } else if (event.status === "unavailable") {
      backgroundColor = "red";
    } else if (event.status === "patient_assigned") { 
      backgroundColor = "blue";
    }

    return {
      style: {
        backgroundColor,
        color: "white",
      },
    };
  };
  const updateCounts = (eventsArray) => {
    const availableCount = eventsArray.filter(
      (event) => event.status === "available"
    ).length;
    const unavailableCount = eventsArray.filter(
      (event) => event.status === "unavailable"
    ).length;

    // Log changes
    console.log("Count before updating:", {
      available: countAvailable,
      unavailable: countUnavailable,
    });
    console.log("Count after updating:", {
      available: availableCount,
      unavailable: unavailableCount,
    });

    setCountAvailable(availableCount);
    setCountUnavailable(unavailableCount);
  };
  const handleViewChange = (newView) => {
    setView(newView);
  };
  useEffect(() => {
    fetchEvents();
  }, [userId]);

  const handleSelectSlot = async ({ start, end }) => {
    if (userId === user.id){
    const newEvent = {
      title: eventStatus === "available" ? "Available" : "Unavailable",
      start: new Date(start),
      end: new Date(end),
      allDay: false,
      userId,
      status: eventStatus,
    };
  
    try {
      const response = await createEvent(newEvent);
      if (response && response.event) {
        const eventWithDates = {
          ...response.event,
          start: new Date(response.event.start),
          end: new Date(response.event.end),
          status: response.event.status,
        };
        setEvents([...events, eventWithDates]);
      } else {
        console.error("Error saving event");
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  };
  const handleSelectEvent = (event) => {
    if ((user.isAdmin && event.status === "available") || userId === user.id || (user.isAdmin && (event.status === "patient_assigned"))) {
      setSelectedEvent(event);
      setShowModal(true);
  };
  };
  const handleDateChange = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };
  const handleEditEvent = async (updatedEvent) => {
    console.log("handle edit one");
    if (user.isAdmin && userId!==user.id) {
      updatedEvent.status = "patient_assigned"; 
    }
    try {
      const response = await updateEvent(updatedEvent);
      if (response && response.event) {
        const eventWithDates = {
          ...response.event,
          start: new Date(response.event.start),
          end: new Date(response.event.end),
          status: response.event.status,
        };
        setEvents((prevEvents) =>
          prevEvents.map((e) =>
            e._id === updatedEvent._id ? eventWithDates : e
          )
        );
        setTimestamp(Date.now());
        
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
    setShowModal(false);
  };

  const handleDeleteEvent = async (event) => {
    try {
      console.log("Event",event);
      // If the admin is deleting a patient-assigned event, change its status back to available
      console.log("Event coming",user.isAdmin,userId,user.id,event.status);
      if (user.isAdmin && userId !== user.id && event.status === "patient_assigned") {
        const updatedEvent = {
          ...event,
          title: "Available", 
          status: "available", 
        };
        const response = await updateEvent(updatedEvent);
        if (response && response.event) {
          const eventWithDates = {
            ...response.event,
            start: new Date(response.event.start),
            end: new Date(response.event.end),
            status: response.event.status,
          };
          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e._id === event._id ? eventWithDates : e
            )
          );
        }
      } else if (userId===user.id) {
        console.log("here or where");
        await deleteEvent(event._id);
        setEvents(events.filter((e) => e._id !== event._id));
      }
    } catch (error) {
      console.error("Error deleting or updating event:", error);
    }
    setShowModal(false);
    fetchEvents();
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
  <div className="bg-[#CAD6FF] p-8 rounded-lg shadow-lg w-full md:w-[80%] min-h-[600px]">
    <div style={{ height: "100vh" ,display: "flex", flexDirection: "column" }}>
      <div style={{marginBottom: "10px" }}>
        <label>
          Month:
          <input
            type="number"
            value={month}
            min={1}
            max={12}
            onChange={(e) => setMonth(parseInt(e.target.value, 10))}
            className="w-14 h-8 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={year}
            min={1900}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            style={{ marginRight: "10px" }}
          />
        </label>
        <select
          value={eventStatus}
          onChange={(e) => setEventStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <button onClick={handleDateChange} style={{ padding: "7px 10px" }}>
          Go
        </button>
        <p>Available Events: {countAvailable}</p>
        <p>Unavailable Events: {countUnavailable}</p>
      </div>
      <Calendar
        key={JSON.stringify(events)}
        localizer={localizer}
        events={events}
        view={view}
        onView={handleViewChange}
        startAccessor="start"
        endAccessor="end"
        selectable={userId === user.id}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        date={currentDate}
        onNavigate={setCurrentDate}
        style={{ height: "100%" }}
        eventPropGetter={eventPropGetter}
      />
      {showModal && (
        <EditEventModel
          event={selectedEvent}
          onSave={handleEditEvent}
          userId={userId}
          currentOwner={user.id}
          userAdmin={user.isAdmin}
          onDelete={() => handleDeleteEvent(selectedEvent)}
          onClose={() => setShowModal(false)}
          patientName={patientName}
          doctorId={doctorId}
          patientId={patientId}
        />
      )}
      </div>
      </div>
    </div>
  );
};
export default MyCalendar;
