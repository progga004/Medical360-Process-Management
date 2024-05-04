import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useGlobalContext } from "../hooks/useGlobalContext";
import EditEventModel from "./EditEventModel";
import moment from "moment";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId }) => {
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

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    console.log("Selected evemt");
    setShowModal(true);
  };

  const handleDateChange = () => {
    const newDate = new Date(year, month - 1, 1);
    setCurrentDate(newDate);
  };
  const handleEditEvent = async (updatedEvent) => {
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

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
    setShowModal(false);
  };

  return (
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
        selectable
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
          onDelete={() => handleDeleteEvent(selectedEvent._id)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MyCalendar;
