import "./main.scss";

import App from "@/app";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListPage from "@/pages/ListPage";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App/>}>
					{/* <Route index element={<LandingPage/>}/> */}
					<Route index element={<ListPage/>}/>
					{/* <Route path="/mypage" element={<MyPage/>}/> */}
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
