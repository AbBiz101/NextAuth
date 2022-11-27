import { hash } from 'bcryptjs';

export default async function hashPassword(password) {
	return await hash(password, 12);
}
