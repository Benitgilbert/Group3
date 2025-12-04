const express = require('express');
const router = express.Router();

// Import the Controller (The Worker)
const entryController = require('../controllers/entryController');

// Import the Middleware (The Security Guard)
const checkAuth = require('../middleware/authMiddleware');

// PROTECT ALL ROUTES BELOW THIS LINE
// This tells Express: "For any route listed after this point, check the token first."
router.use(checkAuth);

// 1. Create a new entry
// URL: POST /api/v1/entries
router.post('/', entryController.createEntry);

// 2. Get all entries (for the logged-in user)
// URL: GET /api/v1/entries
router.get('/', entryController.getAllEntries);

// 3. Get a specific entry
// URL: GET /api/v1/entries/:id
router.get('/:id', entryController.getEntryById);

// 4. Update an entry
// URL: PATCH /api/v1/entries/:id
router.patch('/:id', entryController.updateEntry);

// 5. Delete an entry
// URL: DELETE /api/v1/entries/:id
router.delete('/:id', entryController.deleteEntry);

module.exports = router;