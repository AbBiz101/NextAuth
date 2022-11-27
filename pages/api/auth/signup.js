import { dbConnection } from '../../../utils/db';
import hashPassword from '../../../utils/auth';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, password } = req.body;

		if (!email || !password) {
			res.status(422).json({ message: 'invalid input' });
		}
		const hashedPassword = await hashPassword(password);
		const client = await dbConnection();
		const db = client.db();

		const findUser = await db.collection('user').findOne({ email: email });
		if (!findUser) {
			const result = await db
				.collection('user')
				.insertOne({ email: email, password: hashedPassword });

			res.status(201).json({ message: 'user created' });
			db.close();
		} else {
			res.status(422).json({ message: 'user exists' });
			db.close();
		}
	}
}
