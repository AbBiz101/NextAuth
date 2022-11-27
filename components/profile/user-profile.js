import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';

function UserProfile() {
	// Redirect away if NOT auth
	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState();

	useEffect(() => {
		getSession().then((session) => {
			if (!session) {
				window.location.href = '/auth';
			} else {
				setLoading(false);
			}
		});
	}, []);

	if (loading) {
		return <h2 className={classes.profile}>Loading...</h2>;
	}

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm />
		</section>
	);
}

export default UserProfile;
