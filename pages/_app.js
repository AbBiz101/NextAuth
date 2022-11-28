import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import Layout from '../components/layout/layout';

export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
