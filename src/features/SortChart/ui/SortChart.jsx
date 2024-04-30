// <SortChart onChange={setGender} gender={gender} />;

import { MenuButton } from "@/shared/Button";
import { FlexContainer, FlexItemContainer } from "@/shared/Container/Container";
import { MenuButtonDescription } from "@/shared/typo/typo";

export const SortChart = ({ onChange, gender }) => {
	const isMale = gender == "male";

	return (
		<FlexContainer>
			<FlexItemContainer $flex="1">
				<MenuButton onClick={() => onChange("female")} $isactive={`${!isMale}`}>
					<MenuButtonDescription>이달의 여자 아이돌</MenuButtonDescription>
				</MenuButton>
			</FlexItemContainer>
			<FlexItemContainer $flex="1">
				<MenuButton onClick={() => onChange("male")} $isactive={`${isMale}`}>
					<MenuButtonDescription>이달의 남자 아이돌</MenuButtonDescription>
				</MenuButton>
			</FlexItemContainer>
		</FlexContainer>
	);
};
