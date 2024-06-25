import Button from "components/Button";
import Loading from "components/Loading";
import Nav from "components/Nav";
import Postcode from "components/Postcode";
import { useScroll, useSpring, motion } from "framer-motion";
import { useGetPlaces } from "libs/place/usecase/getPlaces";

function App() {
  const { data, error, isLoading } = useGetPlaces();

  if (error) return <div>Error: {error.message}</div>;
  // const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="top-0 sticky h-1">
        <motion.div
          className="bg-zinc-900 h-full origin-left"
          style={{ scaleX }}
        />
      </div>

      <div className="flex-auto">
        {/* <Loading isOpen={isLoading} /> */}
        {JSON.stringify(data)}
        <Button>dawdaw</Button>
        {/* <Postcode /> */}
      </div>
      <Nav />
    </div>
  );
}

export default App;
