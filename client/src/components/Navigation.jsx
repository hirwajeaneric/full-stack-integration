import { Link, NavLink } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [userInfo, setUserInfo] = useState({});

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    window.location.replace('/signin');
  };
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
    setUserInfo(user);
  },[])

  return (
    <nav className="w-full bg-slate-400 flex flex-col justify-center items-center">
        <div className="md:max-w-4xl w-11/12 flex justify-between py-2 items-center">
            <h1><Link className='cursor-pointer text-3xl font-bold'>Contacts</Link></h1>
            <NavLink to={'/'} className='cursor-pointer'>Home</NavLink>
            <div className="flex gap-3 items-center bg-slate-500 px-2 py-1 rounded-xl">
                <FaRegUserCircle className="text-4xl" />
                <Link to={'/account'}>
                  <p className="text-white">{userInfo.fullName} {userInfo.lastName}</p>
                  <p className="text-white">{userInfo.email}</p>
                </Link>
                <button onClick={signOut} className="px-4 py-2 cursor-pointer bg-black text-white rounded-lg">Sign out</button>
            </div>
        </div>
    </nav>
  )
}

export default Navigation