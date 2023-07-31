import { Helmet } from "react-helmet-async";
import Container from "../../components/Container";
import Banner from "./Banner";
import Classes from "./Classes";
import Instructors from "./Instructors";
import Introductions from "./Introductions";

const Home = () => {
      return (
            <div className="py-28">
                  <Helmet><title>Dream View | Home</title></Helmet>

                  <Container>
                        <Banner />
                        <Classes />
                        <Instructors />
                        <Introductions/>
                  </Container>
            </div>
      );
};

export default Home;