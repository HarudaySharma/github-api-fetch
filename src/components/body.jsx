import React, { useEffect, useState } from "react";

function Body({ userData }) {
    const [reposArray, setReposArray] = useState([]);

    useEffect(() => {

        async function fetchUserRepos(username) {
            try {
                console.log(username);
                let res = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!res.ok) {
                    console.log(res);
                    return;
                }
                const data = await res.json()
                if (Array.isArray(data)) {
                    setReposArray(data);
                    return;
                }
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchUserRepos(userData.login)

        return () => {
            setReposArray([]);
        }

    }, [userData]);

    function DisplayReposList() {

        function Repo({ url, name }) {
            return (
                <a href={url} target="_blank">{name}</a>
            )
        }

        return (
            <div className="repo-list">
                {reposArray.length == 0 && <p>no public repos</p>}
                {Array.isArray(reposArray) && reposArray.map((repo) => <Repo key={repo.html_url} url={repo.html_url} name={repo.name} />)}
            </div>
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
                <p className="followers meta-styling">Followers : {followers}</p>
                <p className="following meta-styling">Following : {following}</p>
                <p className="repo meta-styling">Repos : {public_repos} </p>
            </div>
        )
    }


    return (
        <div className="container-two container-styling">
            <h2>{userData.name} ({userData.login})</h2>
            <div className="user-info">
                <UserImg url={userData.avatar_url} />
                <UserMetaData followers={userData.followers} following={userData.following} public_repos={userData.public_repos} />
            </div>
            <div className="repos">
                <h3>Repo list</h3>
                <DisplayReposList />
            </div>
        </div >
    )
}
export default Body;
