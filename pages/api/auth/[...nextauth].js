import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { dbConnection } from '../../../utils/db';
import { verifyPassword } from '../../../utils/auth';

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const client = await dbConnection();
				const collection = client.db().collection('user');
				const user = await collection.findOne({ email: credentials.email });
				if (!user) {
					client.close();
					throw new Error('No user');
				}
				const isValid =await verifyPassword(credentials.password, user.password);
				if (!isValid) {
					client.close();
					throw new Error('Wrong password');
				}
				client.close();
				return {
					email: user.email,
				};
			},
		}),
	],
});
