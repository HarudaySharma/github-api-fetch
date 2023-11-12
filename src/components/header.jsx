import React, { useState } from "react";

function Header({ handleUsernameChange }) {
    const [username, setUsername] = useState('');

    function handleUsernameInput(uname) {
        setUsername(uname);
    }

    function handleButtonClick() {
        console.log(username);
        
        handleUsernameChange(username);
    }

    return (
        <div className="container-one">
            <h1>Github API</h1>
            <input type="text" name="github_username" value={username} onChange={(e) => handleUsernameInput(e.target.value)} />
            <button type="button" onClick={handleButtonClick}>Pull User Data</button>
        </div>
    )

}

export default Header;