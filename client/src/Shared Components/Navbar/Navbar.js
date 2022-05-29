import React from 'react'
import styles from './Navbar.module.css'
import { Link } from "react-router-dom"
import { logout } from "../../http/Http"
import { useDispatch, useSelector } from "react-redux"
import { setAuth } from "../../Store/AuthSlice"

export const Navbar = () => {

    const dispatch = useDispatch()

    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };

    const logoutUser = async () => {

        try {
            const { data } = await logout();
            dispatch(setAuth(data))
        } catch (error) {
            console.log(error)
        }
    }

    const { isAuth, user } = useSelector((state) => state.user)

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <span className={styles.logoText}>Watch Prime</span>
            </Link>
            <div className={styles.navRight}>
                {user?.activated && (<><h3>Hey {user?.name} !</h3>
                </>)}

                {isAuth && (<button
                    className={styles.logoutButton}
                    onClick={logoutUser}
                >
                    logout
                </button>)}
            </div>
        </nav>
    )
}
