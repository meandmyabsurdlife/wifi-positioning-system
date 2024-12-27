import './App.css'
import PredictionPage from './pages/PredictionPage';

function App() {

  return (
		<div className='flex max-w-6xl mx-auto'>
			{/* Common component, bc it's not wrapped with Routes */}
			<PredictionPage/>
		</div>
	);
}

export default App;
