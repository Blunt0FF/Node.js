import React, { useState } from 'react';

export default function Info() {
    const [userInfo, setUserInfo] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        if (data) {
            setData(null); // Если данные уже загружены — очищаем их
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/data');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            setData(result); // Сохраняем массив данных
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleClick = async () => {
        if (userInfo) {
            setUserInfo(null); // Если данные уже загружены — очищаем их
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setUserInfo(data); // Сохраняем данные пользователя
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <>
            <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', height: '12rem', width: '20rem'}}>
                <h3>Info</h3>
                <button onClick={handleClick}>
                    {userInfo ? 'Hide User Info' : 'Get User Info'}
                </button>
                {userInfo && (
                    <div>
                        <p>Name: {userInfo.name}</p>
                        <p>Age: {userInfo.age}</p>
                    </div>
                )}
            </div>
            <br />
            <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', height: '12rem', width: '20rem'}}>
                <h3>Data List</h3>
                <button onClick={fetchData}>
                    {data ? 'Hide Data' : 'Load Data'}
                </button>
                {data && (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <strong>{item.title}</strong>: {item.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}