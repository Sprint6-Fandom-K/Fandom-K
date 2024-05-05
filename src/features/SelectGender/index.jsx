import { MenuButton } from "@/shared/ui/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/ui/Container";
import styled from "styled-components";

export const MenuButtonDescription = styled.span`
	color: #ffffff;
	font-size: 14px;
	font-weight: 400;
	line-height: 18px;
	text-align: center;
	letter-spacing: -0.16500002145767212px;
`;

export default function SelectGender({ onChange, gender, isfemale }) {
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
