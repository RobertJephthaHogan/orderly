import React from "react"
import {Routes, Route} from "react-router-dom"

import PublicRoutes from './PublicRoutes'
import ProtectedRoutes from './ProtectedRoutes'

import Homepage from "../pages/Homepage"
import UserTasks from "../pages/UserTasks"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import { About } from "../pages/About"
import { UserProjects } from "../pages/UserProjects"
import { MyLayout } from "../layouts/MyLayout"
import { UserDashboard } from "../pages/UserDashboard"
import { UserNotes } from "../pages/UserNotes"
import { UserEvents } from "../pages/UserEvents"


const AppRouter: React.FC = () => {
	return (
	
		<Routes>

			<Route path="/" element={<PublicRoutes />}>
				<Route path="/" element={<Homepage />} />	
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/about" element={<About />} />
			</Route>

			<Route path="/" element={<ProtectedRoutes roleRequired="user"/>}>
				<Route path="/" element={<MyLayout />}>
					<Route path="/events" element={<UserEvents />} />
					<Route path="/tasks" element={<UserTasks />} />
					<Route path="/projects" element={<UserProjects />} />
					<Route path="/notes" element={<UserNotes />} />
					<Route path="/dashboard" element={<UserDashboard />} />
				</Route>
			</Route>

			{/* Permission denied route */}
		</Routes>
	)
}


export default AppRouter
