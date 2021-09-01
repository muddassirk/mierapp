import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../firebase'

import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'

const Chats = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    console.log("user from chats", user)

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data], "userPhoto.jpeg", { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!user) {
            history.push("/")
            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email ,
                "user-secret": user.uid
            }
        }).then((res) => {
            console.log("response from axios req", res);
            setLoading(false)
        }).catch(() => {
            let formdata = new FormData()
            // formdata.append('email ', user.email )
            formdata.append('email', user.email )
            // formdata.append('username', user.displayName)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)
            //44:03

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name)

                    // axios.post('https://api.chatengine.io/users/',
                    axios.post("https://api.chatengine.io/users/",
                        formdata,
                        { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                    ).then(() => setLoading(false)
                    ).catch((error) => console.log("error from axios post req", error))
                })
        })
    }, [user, history])

    const handleLogout = async () => {
        await auth.signOut()
        history.push("/")
    }

    if(!user || loading) return "Loading..."

    return (
        <div className='chats-page'>
            <div className="nav-bar">
                <div className="logo-tab">
                    MierApp
                </div>
                <div
                    className="logout-tab"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                // userName={user.displayName }
                userName={user.email }
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats
