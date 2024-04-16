import { createBrowserRouter } from 'react-router-dom';
import * as paths from './pagePaths';
import App from '../App';
import HomeComponent from '../components/home/HomeComponent';
import CartComponent from '../components/cart/CartComponent';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [{
			path: paths.homePath,
			element: <HomeComponent />,
		},{
			path: paths.cartPath,
			element: <CartComponent />,
		}],
	},
]);
