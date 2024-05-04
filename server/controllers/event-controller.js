const Event = require("../models/Event");

async function getUserEvents(req, res) {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ user: userId });

    if (!events.length) {
      return res.status(200).json({ message: "No events found", events: [] }); 
    }

    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: error.message, events: [] }); 
  }
}

module.exports = {
  getUserEvents,
};
