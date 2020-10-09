import React from "react";
import Lottie from "react-lottie";

import animationData from "../../assets/loading.json";

class Loading extends React.Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return <Lottie options={defaultOptions} height={"100%"} width={"100%"} />;
  }
}

export default Loading;
