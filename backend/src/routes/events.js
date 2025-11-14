const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events?start=&end=
router.get('/', async (req, res) => {
  try {
    const { start, end } = req.query;
    let filter = {};
    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      filter = { $and: [{ start: { $lte: e } }, { end: { $gte: s } }] };
    }
    const events = await Event.find(filter).sort({ start: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ev = await Event.findById(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, start, end, allDay, color } = req.body;
    if (!title || !start || !end) return res.status(400).json({ error: 'Missing fields' });
    const startD = new Date(start);
    const endD = new Date(end);
    if (endD <= startD) return res.status(400).json({ error: 'End must be after start' });

    const newEvent = await Event.create({
      title, description, start: startD, end: endD, allDay: !!allDay, color
    });

    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.start) updates.start = new Date(updates.start);
    if (updates.end) updates.end = new Date(updates.end);
    updates.updatedAt = Date.now();
    const ev = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json(ev);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ev = await Event.findByIdAndDelete(req.params.id);
    if (!ev) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
