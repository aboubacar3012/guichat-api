const express = require("express");
const router = express.Router();
const Room = require("../model/room.model");
// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const middleware = require("../utils/middleware");
const Pusher = require("pusher");

// Create room
router.post("/", async (req, res) => {
  const { roomName, username } = req.body;

  const room = new Room({
    roomName: roomName.trim(),
    roomMembers: [{ username: username.trim() }],
  });

  await room.save();
  res.json(room);
});

// Join room
router.post("/join", async (req, res) => {
  const { roomId, username } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (room.roomMembers.find((member) => member.username === username)) {
    return res.status(200).json(room);
  }

  room.roomMembers.push({ username });

  await room.save();
  res.status(200).json(room);
});

// Send message
router.post("/message", async (req, res) => {
  const pusher = new Pusher({
    // @ts-ignore
    appId: process.env.PUSHER_APP_ID,
    // @ts-ignore
    key: process.env.PUSHER_KEY,
    // @ts-ignore
    secret: process.env.PUSHER_SECRET,
    cluster: "eu",
    useTLS: true
  });



  const { roomId, message, username } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  const timestamp = new Date();
  room.roomMessages.push({ message, username, timestamp });

  await room.save().finally(async () => {
    // @ts-ignore
    await pusher.trigger(roomId, "incoming-message", {
      // @ts-ignore
      message: message,
      // @ts-ignore
      username: username,
      // @ts-ignore
      timestamp: timestamp,
    });
  });
  res.status(200).json(room);
});

// Get all rooms
// @ts-ignore
router.get("/", async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
});

// Get room by id
router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.json(room);
});



module.exports = router;
