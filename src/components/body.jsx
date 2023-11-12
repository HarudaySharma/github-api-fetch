import React, { useState } from "react";

async function fetchUserRepos(username) {
    let res = await fetch(`https://api.github.com/users/${username}/repos`);
    return await res.json();
}

function Body({ userData }) {

    function DisplayReposList({ login }) {
        const [reposArray, setReposArray] = useState([]);

        function Repo({ url, name }) {
            return (
                <a href={url} target="_blank">{name}</a>
            )
        }
        fetchUserRepos(login)
            .then((repos) => setReposArray(repos));
        return (
            <>
                {reposArray.length == 0 && <p>no public repos</p>}
                {reposArray && reposArray.map((repo) => <Repo url={repo.html_url} name={repo.name} />)}
            </>
        )

    }
    function UserImg({ url }) {
        return (
            <img className="avatar" src={url} alt="userImg" />
        )
    }
    function UserMetaData({ followers, following, public_repos }) {
        return (
            <div className="u_meta">
                <p>followers :{followers} | following: {following}</p>
                <p>Repos: {public_repos} </p>
            </div>
        )
    }


    return (
        <div className="container-two">
            <h2>{userData.name} ({userData.login})</h2>
            <div className="user-info">
                <UserImg url={userData.avatar_url} />
                <UserMetaData followers={userData.followers} following={userData.following} public_repos={userData.public_repos} />
            </div>
            <div className="repo-list">
                Repo list
                <DisplayReposList login={userData.login} />
            </div>
        </div >
    )
}
export default Body;