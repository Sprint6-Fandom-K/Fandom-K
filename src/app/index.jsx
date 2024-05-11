import { useEffect, useState } from "react"; import "./index.scss";

import { Outlet } from "react-router-dom";
import { BASE_URL } from "@/common/constant/constant";

export default function App()
{
	const [modal, set_modal] = useState(null);

	// const deleteIdols = async(id)=>{
	// 	const data = await fetch(`${BASE_URL}/donations/${id}`,{method:"DELETE",mode: "cors"});
	// 	const response = await data.json();
	// 	console.log(id+"삭제 완료");
	// }

	// const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

	// async function recursive(cursor)
	// {
	// 	const array = [];
	// 	const req = await fetch(cursor ? `${BASE_URL}/donations?pageSize=10&cursor=${cursor}` : `${BASE_URL}/donations?pageSize=10`, { mode:'cors' });
	// 	const json = await req.json();

	// 	array.push(...json.list);

	// 	if (json.nextCursor)
	// 	{
	// 		array.push(...(await recursive(json.nextCursor)));
	// 	}

	// 	return array;
	// }

	// recursive().then(async (response) =>
	// {
	// 	for (const idol of response)
	// 	{
	// 		deleteIdols(idol.id);
	// 		console.log("delete", idol);
	// 		await sleep(1000);
	// 	}
	// })


	useEffect(() =>
	{
		Modal.addEventListener((event) =>
		{
			set_modal(event.detail);
		});
	},
	[])

	return (
		<>
			<Outlet></Outlet>

			<section id="modal"
				//
				// events
				//
				onClick={(event) =>
				{
					if (event.target === event.currentTarget)
					{
						modal?.["onClickOutSide"]?.();
					}
				}}
			>
			{
				modal?.["element"]
			}
			</section>
		</>
	);
}

export class Modal
{
	static #self = new EventTarget(); static #timeout = null;

	static open(element, onClickOutSide)
	{
		// prevent scroll
		document.body.style.setProperty("overflow", "hidden");

		Modal.#self.dispatchEvent(new CustomEvent(Modal.name, { detail: { ["element"]: element, ["onClickOutSide"]: onClickOutSide } }));
	}

	static close()
	{
		// allow scroll
		document.body.style.setProperty("overflow", "unset");

		Modal.#self.dispatchEvent(new CustomEvent(Modal.name, { detail: { ["element"]: null, ["onClickOutSide"]: null } }));
	}

	static shake()
	{
		Modal.#timeout = clearTimeout(Modal.#timeout);

		document.getElementById("modal").classList.add("shake");

		Modal.#timeout = setTimeout(() => document.getElementById("modal").classList.remove("shake"), 1000);
	}

	static addEventListener(callback)
	{
		Modal.#self.addEventListener(Modal.name, callback);
	}

	static removeEventListener(callback)
	{
		Modal.#self.removeEventListener(Modal.name, callback);
	}
}
