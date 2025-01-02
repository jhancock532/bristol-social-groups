import express from 'express';
import path from 'path';
import { createGroup } from './new-group.js';

const app = express();
const port = 3001; // Different from Next.js default port

// Set up EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'scripts', 'views'));

// Parse request bodies
app.use(express.urlencoded({ extended: true }));

// Serve the form
app.get('/', (req, res) => {
    res.render('new-group-form');
});

// Handle form submission
app.post('/create-group', async (req, res) => {
    try {
        const { groupSlug, additionalInfo } = req.body;
        await createGroup(groupSlug, additionalInfo);
        res.render('success', { groupSlug });
    } catch (err) {
        const error =
            err instanceof Error ? err.message : 'An unknown error occurred';
        res.render('error', { error });
    }
});

app.listen(port, () => {
    console.log(`Admin server running at http://localhost:${port}`);
});
