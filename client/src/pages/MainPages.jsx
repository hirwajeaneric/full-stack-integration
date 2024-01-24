import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"

const MainPages = () => {
  return (
    <div>
        <Navigation />
        <Outlet />
    </div>
  )
}

export default MainPages