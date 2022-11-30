import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import createUser from '../../utils/api';
import { signIn } from 'next-auth/client';
import classes from './auth-form.module.css';

export default function AuthForm() {
	const [isLogin, setIsLogin] = useState(true);
	const router = useRouter();
	const userEmailRef = useRef();
	const userPasswordRef = useRef();

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	async function submitHandler(event) {
		event.preventDefault();

		const enteredEmail = userEmailRef.current.value;
		const enteredPassword = userPasswordRef.current.value;

		if (isLogin) {
			const result = await signIn('credentials', {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});
			console.log(result);

			if (!result.error) {
				router.replace('/profile');
			}
		} else {
			try {
				const result = await createUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" ref={userEmailRef} id="email" required />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input type="password" ref={userPasswordRef} id="password" required />
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
}


