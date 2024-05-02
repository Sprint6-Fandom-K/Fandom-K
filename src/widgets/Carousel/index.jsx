import { createContext, useContext, useRef, useState, useEffect, Children, cloneElement } from "react"; import "./index.scss";

import Capsule from "@/shared/models/Capsule";

const Context = createContext();

export default function Carousel({ /* html */ id, style, children, /* props */ columns, sensitivity })
{
	const [count, set_count] = useState(0);
	const [index, set_index] = useState(0);

	return (
		<Context.Provider value={
		{
			props:
			{
				columns,
				sensitivity,
			},
			state:
			{
				count: new Capsule(
				{
					get()
					{
						return count;
					},
					set(value)
					{
						set_count(value);
					},
				}),
				index: new Capsule(
				{
					get()
					{
						return index;
					},
					set(value)
					{
						set_index((value < 0) ? (0) : ((count - columns < value) ? (count - columns): (value))); // clamp (min: 0, max: count - columns)
					},
				}),
			},
		}}>
			<section data-widget="Carousel" id={id} style={style}>
			{
				children
			}
			</section>
		</Context.Provider>
	);
}

Carousel.Item = function Item({ /* html */ id, style, children, /* props */ })
{
	return (
		<section data-widget="Carousel.Item" id={id} style={style}>
		{
			children
		}
		</section>
	);
};

Carousel.Button = function Button({ /* html */ id, style, children, /* props */ to })
{
	const { props, state } = useContext(Context);

	function onClick(event)
	{
		switch (to)
		{
			case "prev":
			{
				state.index.set(event.shiftKey ? -Infinity : state.index.get() - props.columns);
				break;
			}
			case "next":
			{
				state.index.set(event.shiftKey ? +Infinity : state.index.get() + props.columns);
				break;
			}
			default:
			{
				state.index.set(to);
				break;
			}
		}
	}

	return (
		<section data-widget="Carousel.Button" id={id} style={style}
			//
			// events
			//
			onClick={onClick}
		>
		{
			children
		}
		</section>
	);
};

Carousel.Wrapper = function Wrapper({ /* html */ id, style, children, /* props */ gap })
{
	const { props, state } = useContext(Context);

	const cage = useRef(null);

	useEffect(() =>
	{
		state.count.set(Children.toArray(children).filter((child) => child.type === Carousel.Item).length);
	},
	[children]);

	class CSS
	{
		static width()
		{
			return `calc(+${100 / props.columns}% - ${gap * ((props.columns - 1) / props.columns)}px)`;
		}
		static transform(offset)
		{
			return "translateX(" + `calc(-${100 / props.columns * state.index.get()}% - ${(gap / props.columns * state.index.get()) + offset}px)` + ")";
		}
	}
	let [down_x, move_x, up_x] = [null, null, null];
	//
	// handlers
	//
	function handle_down(value)
	{
		down_x = value;
	}
	function handle_move(value)
	{
		if (down_x === null) return;

		move_x = value;

		if (state.index.get() !== (down_x >= move_x ? state.count.get() - props.columns : 0))
		{
			const delta = down_x - move_x;

			if (Math.abs(delta) < props.sensitivity)
			{
				cage.current.style.setProperty("transform", CSS.transform(delta));
			}
			else
			{
				cage.current.style.setProperty("transform", CSS.transform((down_x > move_x) ? (+props.sensitivity) : (-props.sensitivity)));
			}
		}
	}
	function handle_up(value)
	{
		if (down_x === null) return;

		up_x = value;

		if (Math.abs(down_x - up_x) <= props.sensitivity)
		{
			cage.current.style.setProperty("transform", CSS.transform(0));
		}
		else if (down_x >= up_x) // move right
		{
			state.index.set(state.index.get() + props.columns);
		}
		else if (down_x <= up_x) // move left
		{
			state.index.set(state.index.get() - props.columns);
		}
		// reset
		[down_x, move_x, up_x] = [null, null, null];
	}
	//
	// desktop
	//
	function onMouseDown(event)
	{
		handle_down(event.clientX);
	}

	function onMouseMove(event)
	{
		handle_move(event.clientX);
	}

	function onMouseUp(event)
	{
		handle_up(event.clientX);
	}
	//
	// mobile
	//
	function onTouchStart(event)
	{
		handle_down(event.touches[0].clientX);
	}

	function onTouchMove(event)
	{
		handle_move(event.changedTouches[0].clientX);
	}

	function onTouchEnd(event)
	{
		handle_up(event.changedTouches[0].clientX);
	}

	return (
		<section data-widget="Carousel.Wrapper" id={id} style={style}
			//
			// events
			//
			onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
			onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
		>
			<div ref={cage} class="cage" style={{ gap: gap, transform: CSS.transform(0) }}>
			{
				Children.toArray(children).filter((child) => child.type === Carousel.Item).map((child) =>
				{
					return cloneElement(child, { style: { ...child.props.style, width: CSS.width() } });
				})
			}
			</div>
		</section>
	);
};
