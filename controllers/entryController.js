const Entry = require('../models/Entry');

// 1. CREATE ENTRY
exports.createEntry = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Create the entry using the Model
        const newEntry = await Entry.create({
            title,
            description,
            userId: req.userData.userId // <--- CRITICAL: Link entry to the logged-in user
        });

        res.status(200).json({
            status: 200,
            message: 'entry successfully created',
            data: newEntry
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 2. GET ALL ENTRIES (Sorted Descending)
exports.getAllEntries = async (req, res) => {
    try {
        // Find entries where "userId" matches the logged-in user.
        // .sort({ createdOn: -1 }) means Newest First.
        const entries = await Entry.find({ userId: req.userData.userId })
                                   .sort({ createdOn: -1 });

        res.status(200).json({
            status: 200,
            data: entries
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 3. GET SPECIFIC ENTRY
exports.getEntryById = async (req, res) => {
    try {
        const entryId = req.params.id; // Get ID from URL

        // Find entry that matches BOTH the ID and the Owner
        const entry = await Entry.findOne({ _id: entryId, userId: req.userData.userId });

        if (!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(200).json({
            status: 200,
            data: entry
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 4. MODIFY ENTRY
exports.updateEntry = async (req, res) => {
    try {
        const entryId = req.params.id;
        const { title, description } = req.body;

        // Update matches ID and Owner. { new: true } returns the updated version.
        const updatedEntry = await Entry.findOneAndUpdate(
            { _id: entryId, userId: req.userData.userId },
            { title, description },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.status(200).json({
            status: 200,
            message: 'entry successfully edited',
            data: updatedEntry
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// 5. DELETE ENTRY
exports.deleteEntry = async (req, res) => {
    try {
        const entryId = req.params.id;

        const deletedEntry = await Entry.findOneAndDelete({ _id: entryId, userId: req.userData.userId });

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        // 204 means "No Content" (Success, but I have nothing to show you)
        res.status(204).json({
            status: 204,
            data: { message: 'entry successfully deleted' }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};