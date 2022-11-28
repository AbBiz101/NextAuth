import classes from './profile-form.module.css';
import { useRef } from 'react';

export default function ProfileForm(props) {
	const newPasswordRef = useRef();
	const oldPasswordRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const newPassword = newPasswordRef.current.value;
		const oldPassword = oldPasswordRef.current.value;
		props.onChangePassword({
			newPassword: newPassword,
			oldPassword: oldPassword,
		});

		
	}

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input ref={newPasswordRef} type="password" id="new-password" />
			</div>
			<div className={classes.control}>
				<label htmlFor="old-password">Old Password</label>
				<input ref={oldPasswordRef} type="password" id="old-password" />
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
}
