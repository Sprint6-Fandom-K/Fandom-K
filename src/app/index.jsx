import { useEffect, useState } from "react";
import "./index.scss";

import { Outlet } from "react-router-dom";

export default function App() {
	const [modal, set_modal] = useState(null);

	useEffect(() => {
		Modal.addEventListener((event) => {
			set_modal(event.detail);
		});
	}, []);

	return (
		<>
			<Outlet></Outlet>

			<div
				id="modal"
				onClick={(event) => {
					if (event.target === event.currentTarget) {
						Modal.close();
					}
				}}
			>
				{modal?.element}
			</div>
		</>
	);
}

export class Modal {
	static #self = new EventTarget();

	static open(element) {
		Modal.#self.dispatchEvent(
			new CustomEvent(Modal.name, { detail: { element } }),
		);
	}

	static close() {
		Modal.#self.dispatchEvent(
			new CustomEvent(Modal.name, { detail: { element: null } }),
		);
	}

	static addEventListener(callback) {
		Modal.#self.addEventListener(Modal.name, callback);
	}

	static removeEventListener(callback) {
		Modal.#self.removeEventListener(Modal.name, callback);
	}
}
