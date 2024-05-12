import React, { useState } from "react";

function Header({ handleUsernameChange }) {
    const [username, setUsername] = useState('');

    function handleUsernameInput(uname) {
        setUsername(uname);
    }

    function handleButtonClick(e) {
        if (e.key === undefined || e.key === 'Enter') {
            handleUsernameChange(username);
            setUsername('');
        }
    }

    return (
        <div className="container-one container-styling">
            <h1>Github API</h1>
            <input onKeyDown={handleButtonClick} placeholder="Username.." type="text" name="github_username" value={username} onChange={(e) => handleUsernameInput(e.target.value)} />
            <button type="button" onClick={handleButtonClick}>Pull User Data</button>
        </div>
    )

}

export default Header;
