import { Link, NavLink } from "react-router-dom"

const Navigation = () => {
  return (
    <nav className="w-full bg-slate-400 flex flex-col justify-center items-center">
        <div className="md:max-w-4xl w-11/12 flex justify-between py-6">
            <h1><Link className='cursor-pointer'>Contacts</Link></h1>
            <div>
                <NavLink to={'/'} className='cursor-pointer'>Home</NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navigation