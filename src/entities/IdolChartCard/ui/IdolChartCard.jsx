export const IdolChartCard = ({ item }) => {
	const { group, name, profilePicture, totalVotes } = item;
	return <div>{group + name + profilePicture + totalVotes}</div>;
};
