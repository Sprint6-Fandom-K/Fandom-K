import {} from "react"; import "./index.scss";

import { Outlet } from "react-router-dom";

export default function App()
{
	return (
		<>
			<Outlet/>
		</>
	);
}
