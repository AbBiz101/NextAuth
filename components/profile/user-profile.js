import ProfileForm from './profile-form';
import classes from './user-profile.module.css';

export default function UserProfile() {
	// import { getSession } from 'next-auth/client';
	// import { useState, useEffect } from 'react';
	// Redirect away if NOT auth
	// const [loading, setLoading] = useState(true);
	// const [session, setSession] = useState();

	// useEffect(() => {
	// 	getSession().then((session) => {
	// 		if (!session) {
	// 			window.location.href = '/auth';
	// 		} else {
	// 			setLoading(false);
	// 		}
	// 	});
	// }, []);

	// if (loading) {
	// 	return <h2 className={classes.profile}>Loading...</h2>;
	// }

	async function changePasswordHandler(passwordData) {
		console.log(passwordData);
		const req = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await req.json();
		console.log(data);
	}

	return (
		<section className={classes.profile}>
			<h1>Your User Profile</h1>
			<ProfileForm onChangePassword={changePasswordHandler} />
		</section>
	);
}
