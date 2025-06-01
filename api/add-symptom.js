import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { date, type, intensity } = req.body;

    if (!date || !type || !intensity) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const filePath = path.join(process.cwd(), 'symptoms.json');
    const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

    data.push({ date, type, intensity });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ message: 'Symptom saved!' });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
