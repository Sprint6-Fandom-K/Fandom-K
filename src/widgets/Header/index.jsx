import {} from "react"; import "./index.scss"; import widget from "@/shared/utilities/widget";

import Logo from "@/shared/assets/icons/Logo";

import avatar_png from "@/shared/assets/images/avatar.png";

export default function Header(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ })
{
	return (
		<section { ...widget("Header", props) }>
			<div class="container">
				<div class="left">
					{/* spacer */}
				</div>
				<Logo></Logo>
				<div class="right">
					<img class="avatar" src={avatar_png} alt="avatar"></img>
				</div>
			</div>
		</section>
	);
}
