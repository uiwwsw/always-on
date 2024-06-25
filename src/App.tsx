// import { useState } from "react";
// import reactLogo from "$/react.svg";
// import viteLogo from "/vite.svg";
import Loading from "components/Loading";
import Nav from "components/Nav";
import Postcode from "components/Postcode";
import { useGetPlaces } from "libs/place/usecase/getPlaces";

function App() {
  const { data, error, isLoading } = useGetPlaces();

  if (error) return <div>Error: {error.message}</div>;
  // const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-auto">
        {/* <Loading isOpen={isLoading} /> */}
        {JSON.stringify(data)}
        {/* <Postcode /> */}
      </div>
      <Nav />
    </div>
  );
}

export default App;
