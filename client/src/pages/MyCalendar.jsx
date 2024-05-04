// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';

// const localizer = momentLocalizer(moment);

// const MyCalendar = () => {
//   const [events, setEvents] = useState([]);

//   return (
//     <div style={{ height: '500px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//       />
//     </div>
//   );
// };

// export default MyCalendar;
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGlobalContext } from '../hooks/useGlobalContext';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const { fetchUserEvents } = useGlobalContext();
  const [message, setMessage] = useState('');

  // Load user's events from API or local storage
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetchUserEvents(userId); 
    //   if (response.message) {
    //     setMessage(response.message);
    //   }
    console.log("response is",response);
      setEvents(Array.isArray(response.events) ? response.events : []); // Ensure it's an array
    };
    fetchEvents();
  }, [userId]);

  // Handle selecting a time slot
  const handleSelectSlot = ({ start, end }) => {
    const newEvent = {
      title: 'Available', // Customize as needed
      start,
      end,
      allDay: false
    };
    setEvents([...events, newEvent]);
    saveEvent(userId, newEvent); // Save the new event
  };

  // Handle editing an existing event
  const handleSelectEvent = (event) => {
    // Implement editing logic, for now, just log the event
    console.log('Selected event:', event);
  };

  return (
    <>
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable // Enable selecting slots
        onSelectSlot={handleSelectSlot} // Handle slot selection
        onSelectEvent={handleSelectEvent} // Handle event selection
        style={{ height: '100%' }}
      />
    </div>
    </>
  );
};

export default MyCalendar;
