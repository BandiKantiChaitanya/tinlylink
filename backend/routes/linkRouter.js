const express=require('express')
const Links=require('../models/Link')
const validateUrl = require('../utils/validateUrl');
const router = express.Router();


// GET to list all links
router.get('/links', async (req, res) => {
  try {
    const links = await Links.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create short link
router.post('/links', async (req, res) => {
  const { originalUrl, shortCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  if (!validateUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL. Must be a valid http(s) URL.' });
  }

  if (!shortCode) {
    return res.status(400).json({ error: 'Short code is required' });
  }

  // Validate code format
  if (!/^[A-Za-z0-9]{6,8}$/.test(shortCode)) {
    return res.status(400).json({ error: 'Short code must be 6–8 alphanumeric characters.' });
  }

  const code = shortCode.trim()

  // Ensure uniqueness
  const exists = await Links.findOne({ shortCode:code });
  if (exists) {
    return res.status(409).json({ error: 'Short code already in use. Please choose another.' });
  }

  try {
    const link = new Links({ originalUrl, shortCode:code });
    await link.save();
    res.status(201).json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a link
router.delete('/links/:code', async (req, res) => {
  try {
    const link = await Links.findOneAndDelete({ shortCode: req.params.code });
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET code stats
router.get('/links/:code', async (req, res) => {
  try {
    const link = await Links.findOne({ shortCode: req.params.code });
    if (!link) return res.status(404).json({ message: 'Not found' });
    res.json({link,message:'Active'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;