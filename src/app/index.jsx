import {} from "react"; import "./index.scss";
import LandingPage from "@/pages/LandingPage/ui/LandingPage";
import MyPage from "@/pages/MyPage/ui/MyPage";
import ListPage from "@/pages/ListPage";

export default function App()
{
	return <>
		<LandingPage/>
	<MyPage />
	<ListPage></ListPage>
	</>;
}
