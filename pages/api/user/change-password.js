import { getSession } from 'next-auth/client';
import { dbConnection } from '../../../utils/db';
import { verifyPassword, hashPassword } from '../../../utils/auth';

export default async function userHandler(req, res) {
	const session = await getSession({ req: req });
	if (req.method !== 'PATCH') return;

	const userEmail = session.user.email;
	const oldPassword = req.body.oldPassword;
	const newPassword = req.body.newPassword;
	const newHashedPassword = await hashPassword(newPassword);

	const client = await dbConnection();
	const userCollection = client.db().collection('user');
	const user = await userCollection.findOne({ email: userEmail });

	if (!user) {
		res.status(404).json({ message: 'User not found' });
		client.close();
		return;
	}

	const currentPassword = user.password;
	const passwordEqual = await verifyPassword(currentPassword, oldPassword);

	if (!passwordEqual) {
		res.status(403).json({ message: 'wrong password' });
		client.close();
		return;
	}

	userCollection.updateOne(
		{ email: user.email },
		{ $set: { password: newHashedPassword } },
	);

	client.close();
	res.status(200).json({ message: 'password updated' });
}
