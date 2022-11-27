import { MongoClient } from 'mongodb';

export async function dbConnection() {
	const client = await MongoClient.connect(
		`mongodb+srv://abNextJS:JZkkU57MAyHpN3Jj@abcluster.vqjrw.mongodb.net/NextAuth?retryWrites=true&w=majority`,
	);
	return client;
}
