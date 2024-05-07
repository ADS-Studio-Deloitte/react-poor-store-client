import { Navigate, createBrowserRouter } from 'react-router-dom';
import * as paths from './pagePaths';
import App from '../App';
import ProductCatalogueComponent from '../components/product-catalogue/ProductCatalogueComponent';
import CartComponent from '../components/cart/CartComponent';
import LoginComponent from '../components/login/LoginComponent';
import SetNewPasswordComponent from '../components/set-new-password/SetNewPasswordComponent';
import ProtectedRoute from './routes/ProtectedRoute';


export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [{
			element: <ProtectedRoute />,
			children: [{
				path: '/',
				element: <Navigate to={paths.productCataloguePath} />,
			},{
				path: paths.productCataloguePath,
				element: <ProductCatalogueComponent />,
			},{
				path: paths.cartPath,
				element: <CartComponent />,
			}]
		},{
			path: paths.loginPath,
			element: <LoginComponent />,
		},{
			path: paths.setNewPasswordPath,
			element: <SetNewPasswordComponent />,
		}],
	},
]);


