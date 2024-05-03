import { MenuButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { MenuButtonDescription } from "@/shared/typo/typo";

export default function ({ onChange, gender, isfemale }) {
	const handleMenuClick = (e) => {
		if (gender === e.currentTarget.name) return;
		onChange(e.currentTarget.name);
	};
	return (
		<FlexContainer>
			<FlexItemContainer $flex="1">
				<MenuButton
					name="female"
					onClick={handleMenuClick}
					$isactive={`${!isfemale}`}
				>
					<MenuButtonDescription>이달의 여자 아이돌</MenuButtonDescription>
				</MenuButton>
			</FlexItemContainer>
			<FlexItemContainer $flex="1">
				<MenuButton
					name="male"
					onClick={handleMenuClick}
					$isactive={`${isfemale}`}
				>
					<MenuButtonDescription>이달의 남자 아이돌</MenuButtonDescription>
				</MenuButton>
			</FlexItemContainer>
		</FlexContainer>
	);
}
