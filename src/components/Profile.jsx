import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const {user, isAuthenticated} =useAuth0();

    return(
        isAuthenticated && 
            (<article className="column">
                {user?.picture && <img sec={user.picture}/>}
                <h2>{user?.given_name}</h2>
                {/* <ul>
                    {Object.keys(user).map((objKey, i)=> <li key={i}>{objKey}: {user[objKey]}</li>)}
                </ul> */}
            </article>)
        
    )
}

export default Profile