import { useEffect, useState } from 'react';
import AuthForm from '../components/auth/auth-form';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

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
