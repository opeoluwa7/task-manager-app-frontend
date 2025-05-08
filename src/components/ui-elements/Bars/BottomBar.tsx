import { Link } from "react-router-dom"


const BottomNavBar = () => {
    return (
        <nav className="bg-white h-[3rem] w-full z-50 fixed bottom-0 flex flex-row items-center justify-evenly">
            <Link to="/homepage">Home</Link>
            <Link to="/create-task">Add</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    )
}

export default BottomNavBar
