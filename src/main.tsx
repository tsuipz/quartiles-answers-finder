import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import TailwindCSS styles
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query
import { Provider } from 'react-redux'; // Import Redux Provider
import { store } from './stores'; // Import the Redux store
import App from './App'; // Import the App component

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		{/* Provide the QueryClient to the entire app */}
		<QueryClientProvider client={queryClient}>
			{/* Provide the Redux store to the entire app */}
			<Provider store={store}>
				<App /> {/* Render the main App component */}
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
);
