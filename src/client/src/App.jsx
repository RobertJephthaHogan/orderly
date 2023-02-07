
import {  Spin } from 'antd'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppRouter from './router';
import { store } from './redux/store';

import './styles/App.css';
import './styles/css/style.css';


function App() {
    const [loading, setLoading] = useState(true)
    const settings = useSelector((state) => state.settings)

	useEffect(() => {
        setLoading(settings.loading)
    }, [settings.loading])

	return (
		<div>
			{loading && (
				<div className="loading_container">
					<Spin />
				</div>
			)}
			<AppRouter/>
		</div>
	);
}

export default App;