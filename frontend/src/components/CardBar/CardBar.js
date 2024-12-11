import { Component } from "react";

class CardBar extends Component {
  render() {
    return (
      <section className="body__section py-10">
        <div className="grid place-items-center mt-5">
          <p className="text-3xl font-bold text-center text-gray-900 uppercase mb-2">
            HOW  AgroSense Solutions HELPS
          </p>
          <p className="text-xl font-medium text-center text-gray-500 ">
            Being a part of  AgroSense Solutions, these are our mainstays
          </p>
        </div>
      </section>
    );
  }
}

export default CardBar;
