import { useEffect } from "react"; import "./index.scss";

import ReactDOM from "react-dom";

const modal = document.getElementById("modal");

export default function Modal(props = { children: null, onClickOutSide: null })
{
	useEffect(() =>
	{
		function onClick(event)
		{
			if (event.target === modal)
			{
				props.onClickOutSide?.(event);
			}
		}
		modal.addEventListener("click", onClick);
		return () => modal.removeEventListener("click", onClick);
	},
	[]);

	return ReactDOM.createPortal(props.children, modal);
}
