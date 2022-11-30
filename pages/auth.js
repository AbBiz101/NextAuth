import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/auth-form';

export default function AuthPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getSession().then((session) => {
			if (session) {
				router.replace('/');
			} else {
				setLoading(false);
			}
		});
	}, [router]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return <AuthForm />;
}
