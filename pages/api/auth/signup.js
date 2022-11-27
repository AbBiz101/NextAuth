import { dbConnection } from '../../../utils/db';

export default async function handler(req, res) {

	const client = await dbConnection();
    const db = client.db();
    
}
