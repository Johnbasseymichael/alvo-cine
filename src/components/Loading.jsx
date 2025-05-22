import React from "react";
import { BallTriangle } from "react-loader-spinner";
import './style/loading.css'

function Loading() {
    return (
        <div className="loading-wrapper">
            <BallTriangle
                height={150}
                width={150}
                radius={5}
                color="var(--red)"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <p className="italic ">Loading...</p>
        </div>
    );
}

export default Loading;
