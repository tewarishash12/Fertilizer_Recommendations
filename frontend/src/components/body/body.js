import "../../index.css";
import "./body.css";
import CardBar from "../CardBar/CardBar";

const Body = () => {
  return (
    <div className="body">
      <div className="background-image grid place-items-center my-6">
        <div className="">
          <p className="text-2xl  font-bold text-center text-white uppercase mb-4">
            Farmers' Help Center
          </p>
          <p className="text-6xl font-medium text-center text-green-600 max-w-md mb-4">
          AgroSense Solutions
          </p>
          <p className="text-2xl font-bold text-center text-white">
            #WeAreFarmers'Voice
          </p>
        </div>
      </div>
      <CardBar />
    </div>
  );
};

export default Body;
