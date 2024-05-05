export default function widget(name, props)
{
	return { ["data-widget"]: name, ["id"]: props.id, ["class"]: props.class?.join("\u0020"), ["style"]: props.style };
}
