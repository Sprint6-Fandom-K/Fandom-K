import { createContext, useContext, useRef, useState, useEffect, Children, cloneElement, forwardRef } from "react"; import "./index.scss"; import widget from "@/shared/utilities/widget";

import Capsule from "@/shared/models/Capsule";

const Context = createContext();

const Carousel = forwardRef(function Carousel(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ columns: 1, threshold: 100 }, ref)
{
	const [count, set_count] = useState(0);
	const [index, set_index] = useState(0);

	return (
		<Context.Provider value={
		{
			props:
			{
				columns: props.columns,
				threshold: props.threshold,
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
						set_index((value < 0) ? (0) : ((count - props.columns < value) ? (count - props.columns): (value))); // clamp (min: 0, max: count - columns)
					},
				}),
			},
		}}>
			<section ref={ref} { ...widget("Carousel", props) }>
			{
				props.children
			}
			</section>
		</Context.Provider>
	);
});

Carousel.Item = forwardRef(function Item(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ }, ref)
{
	return (
		<section ref={ref} { ...widget("Carousel.Item", props) }>
		{
			props.children
		}
		</section>
	);
});

Carousel.Button = forwardRef(function Button(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ to: null }, ref)
{
	const ctx = useContext(Context);

	function onClick(event)
	{
		switch (props.to)
		{
			case "prev":
			{
				ctx.state.index.set(event.shiftKey ? -Infinity : ctx.state.index.get() - ctx.props.columns);
				break;
			}
			case "next":
			{
				ctx.state.index.set(event.shiftKey ? +Infinity : ctx.state.index.get() + ctx.props.columns);
				break;
			}
			default:
			{
				ctx.state.index.set(props.to);
				break;
			}
		}
	}
	// omit if (index === first_index)
	if (props.to === "prev" && ctx.state.index.get() === 0)
	{
		return null;
	}
	// omit if (index === last_index)
	if (props.to === "next" && ctx.state.index.get() === ctx.state.count.get() - ctx.props.columns)
	{
		return null;
	}

	return (
		<section ref={ref} { ...widget("Carousel.Button", props) }
			//
			// events
			//
			onClick={onClick}
		>
		{
			props.children
		}
		</section>
	);
});

Carousel.Wrapper = forwardRef(function Wrapper(props = { /* html */ id: null, class: [], style: {}, children: null, /* props */ gap: 0 }, ref)
{
	const ctx = useContext(Context);

	const cage = useRef(null);

	useEffect(() =>
	{
		ctx.state.count.set(Children.toArray(props.children).filter((child) => child.type === Carousel.Item).length);
	},
	[props.children]);

	class CSS
	{
		static width()
		{
			return `calc(+${100 / ctx.props.columns}% - ${props.gap * ((ctx.props.columns - 1) / ctx.props.columns)}px)`;
		}
		static transform(offset)
		{
			return "translateX(" + `calc(-${100 / ctx.props.columns * ctx.state.index.get()}% - ${(props.gap / ctx.props.columns * ctx.state.index.get()) + offset}px)` + ")";
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

		if (ctx.state.index.get() !== (down_x >= move_x ? ctx.state.count.get() - ctx.props.columns : 0))
		{
			const delta = down_x - move_x;

			if (Math.abs(delta) < ctx.props.threshold)
			{
				cage.current.style.setProperty("transform", CSS.transform(delta));
			}
			else
			{
				cage.current.style.setProperty("transform", CSS.transform((down_x > move_x) ? (+ctx.props.threshold) : (-ctx.props.threshold)));
			}
		}
	}
	function handle_up(value)
	{
		if (down_x === null) return;

		up_x = value;

		if (Math.abs(down_x - up_x) <= ctx.props.threshold)
		{
			cage.current.style.setProperty("transform", CSS.transform(0));
		}
		else if (down_x >= up_x) // move right
		{
			ctx.state.index.set(ctx.state.index.get() + ctx.props.columns);
		}
		else if (down_x <= up_x) // move left
		{
			ctx.state.index.set(ctx.state.index.get() - ctx.props.columns);
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
		<section ref={ref} { ...widget("Carousel.Wrapper", props) }
			//
			// events
			//
			onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}
			onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
		>
			<div ref={cage} class="cage" style={{ "gap": props.gap, "transform": CSS.transform(0) }}>
			{
				Children.toArray(props.children).filter((child) => child.type === Carousel.Item).map((child) =>
				{
					return cloneElement(child, { ...child.props, style: { ...child.props.style, "width": CSS.width() } });
				})
			}
			</div>
		</section>
	);
});

export default Carousel;
