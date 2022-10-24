import { createContext, useContext, useEffect, useState } from "react";

const MigoContext = createContext();

export default function StateContext({ children }) {
	const [minimized, setMinimized] = useState(false);
	const [employees, setEmployees] = useState([]);

	const [timelogs, setTimeLogs] = useState([]);
	const [isFetchingTimeLogs, setIsFetchingTimeLogs] = useState(true);

	const [user, setUser] = useState({ username: "", password: "" });
	const [isFetchingEmployees, setIsFetchingEmployees] = useState(true);
	const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

	const getEmployees = async () => {
		const res = await fetch("https://localhost:7241/Employee");
		const data = await res.json();
		setEmployees(data);
	};
	const getTimeLogs = async () => {
		const res = await fetch("https://localhost:7241/api/EmployeeTimeLog");
		const data = await res.json();
		setTimeLogs(data);
	};
	useEffect(() => {
		getEmployees();
		setIsFetchingEmployees(false);
		
		getTimeLogs();
		setIsFetchingTimeLogs(false);
	}, []);

	return (
		<MigoContext.Provider
			value={{
				user,
				setUser,
				minimized,
				setMinimized,
				employees,
				isFetchingEmployees,
				getEmployees,
				timelogs,
				isFetchingTimeLogs,
				getTimeLogs,
				jwt,
				setJwt,
			}}
		>
			{children}
		</MigoContext.Provider>
	);
}

export const useStateContext = () => useContext(MigoContext);
