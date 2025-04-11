import Main from "../../components/pages/home/main";
import Row from "../../components/pages/home/rows";
import requests from "../../request";
import { useAuth } from "../../context/authContext"; // Import the context

const Home = () => {
  const { user } = useAuth(); // Access the user from the context

  return (
    <>
      <Main />
      <Row
        rowID="1"
        title="UpComing"
        fetchURL={requests.requestUpcoming}
        user={user}
      />
      <Row
        rowID="2"
        title="Popular"
        fetchURL={requests.requestPopular}
        user={user}
      />
      <Row
        rowID="3"
        title="Trending"
        fetchURL={requests.requestTrending}
        user={user}
      />
      <Row
        rowID="4"
        title="Top Rated"
        fetchURL={requests.requestTopRated}
        user={user}
      />
      <Row
        rowID="5"
        title="Horror"
        fetchURL={requests.requestHorror}
        user={user}
      />
    </>
  );
};

export default Home;
