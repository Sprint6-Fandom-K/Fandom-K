import { useEffect, useState } from "react"

export default function useLocalStorage(key, init)
{
	function read()
	{
		return JSON.parse(window.localStorage[key] ?? JSON.stringify({ ["value"]: init }))["value"];
	}

	function write(value)
	{
		window.localStorage[key] = JSON.stringify({ ["value"]: value });
	}

	const [value, set_value] = useState(read());

	function setter(new_value)
	{
		switch (new_value)
		{
			case null: case undefined:
			{
				delete window.localStorage[key];
				break;
			}
			default:
			{
				write(new_value);
				break;
			}
		}
		const [before, after] = [JSON.stringify({ value: value }), JSON.stringify({ value: new_value })];

		window.dispatchEvent(new StorageEvent("local-storage", { key, storageArea: window.localStorage, oldValue: before, newValue: after }));

		set_value(new_value);
	}

	function onStorage(event)
	{
		if (key === event.key && event.oldValue !== event.newValue && event.storageArea === window.localStorage)
		{
			set_value(read());
		}
	}

	useEffect(() =>
	{
		console.log(value)
	},
	[value])

	useEffect(() =>
	{
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	},
	[onStorage]);

	useEffect(() =>
	{
		window.addEventListener("local-storage", onStorage);
		return () => window.removeEventListener("local-storage", onStorage);
	},
	[onStorage]);

	return [value, setter];
}
