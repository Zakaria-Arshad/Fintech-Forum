import React from "react";
import ReactLoading from "react-loading";

function Loading() {
    return (
        <ReactLoading 
        type="spin" 
        color="#748e63"
        height={100}
        width={50} />
    )
}

export default Loading;