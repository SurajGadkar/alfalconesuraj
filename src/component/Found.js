import React from "react";

function Found({ planet, status, time }) {
  return (
    <div>
      {status === "success" ? (
        <h1>Congratulations!, King is mighty pleased..</h1>
      ) : (
        <h1>Oops!</h1>
      )}
      {status === "success" ? (
        <h4>{`Al Falcone is found on ${planet} planet`}</h4>
      ) : (
        <h4>{`Al Falcone is not found on any selected planets`}</h4>
      )}
    </div>
  );
}

export default Found;
