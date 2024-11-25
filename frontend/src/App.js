import React, { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await window.electronAPI.fetchData({ name: 'Mundo' });
            setMessage(response.message);
        };

        fetchData();
    }, []);

    return <div>{message}</div>;
}

export default App;
