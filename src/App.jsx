import React, { useCallback, useEffect, useState } from 'react';
import "./App.css"

import Header from "./components/header"
import Body from "./components/body"



// async functions returns promises
async function fetchUserDetails(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            if (data.message === "Not Found") {
                alert('user not found');
                return null
            }
            console.log(res);
        }
        return data;
    }
    catch (err) {
        throw err;
    }
}

function App() {
    const [requestUrl, setRequestUrl] = useState('');
    const [responseObj, setResponseObj] = useState(null);

    useEffect(() => {
        if (requestUrl != '') {
            fetchUserDetails(requestUrl)
                .then(userObj => {
                    setResponseObj(userObj)
                    setRequestUrl('');
                })
                .catch(err => {
                    alert('try again');
                    console.log(err)
                    setResponseObj(null);
                });
        }
    }, [requestUrl]);

    useEffect(() => {
        console.log(responseObj);
    }, [responseObj])


    const handleUsernameChange = useCallback(function(username) {
        setRequestUrl(`https://api.github.com/users/${username}`)
    }, []);

    return (
        <div className="parent-container">
            <Header handleUsernameChange={handleUsernameChange} />
            {responseObj && <Body userData={responseObj} />}
        </div>
    )
}

export default App

