import { Link } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import './Error.css';

export const Error = ({ user }) => {
    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <div className='error-popup'>
                <Link to='/'><h1>Home</h1></Link>
                <img src='https://media.giphy.com/media/YQitE4YNQNahy/giphy-downsized-large.gif' alt='Not found' />
            </div>
        </div>
    )
}