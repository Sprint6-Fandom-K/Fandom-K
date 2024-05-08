import {} from "react";
import "./index.scss";
import widget from "@/shared/utilities/widget";

import logo_png from "@/shared/assets/images/logo.png";
import avatar_png from "@/shared/assets/images/avatar.png";
import { Link, useNavigate } from "react-router-dom";

export default function Header(
	props = {
		/* html */ id: null,
		class: [],
		style: {},
		children: null /* props */,
	},
) {
	const navigate = useNavigate();
	return (
		<section {...widget("Header", props)}>
			<div className="container">
				<div className="left">{/* spacer */}</div>
				<img className="logo" src={logo_png} alt="logo" onClick={()=>navigate('/')} />
				<Link to="/mypage" className="right">
					<img className="avatar" src={avatar_png} alt="avatar"></img>
				</Link>
			</div>
		</section>
	);
}
