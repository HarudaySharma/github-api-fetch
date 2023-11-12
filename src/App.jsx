import React, { useEffect, useState } from 'react';

import Header from "./components/header"
import Body from "./components/body"


// async functions returns promises
async function fetchUserDetails(url) {
    let response = await fetch(url);
    return await response.json();
}

function App() {
    const [requestUrl, setRequestUrl] = useState('');
    const [responseObj, setResponseObj] = useState(null);

    useEffect(() => {
        if (requestUrl != '') {
            fetchUserDetails(requestUrl)
                .then(userObj => setResponseObj(userObj));
        }
    }, [requestUrl]);

    useEffect(() => {
        console.log(responseObj);
    }, [responseObj])


    function handleUsernameChange(username) {
        setRequestUrl(`https://api.github.com/users/${username}`)
    }

    return (
        <div className="parent-container">
            <Header handleUsernameChange={handleUsernameChange} />
            {responseObj && <Body userData={responseObj} />}
        </div>
    )
}

export default App

