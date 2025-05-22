import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import Skeleton from "react-loading-skeleton";
import "./style/movieSkeleton.css";

const MovieSkeleton = ({ count = 8 }) => {
    return (
        <SkeletonTheme
            baseColor="var(--card-color)"
            highlightColor="var(--bg-color)"
        >
            <div className="boss-container">
                <Skeleton
                    height={350}
                    borderRadius={16}
                    className="skel-banner"
                />
                
                <div className="movie-list">
                    {Array(count)
                        .fill(0)
                        .map((_, i) => (
                            <div className="movie-card skeleton-card" key={i}>
                                <Skeleton height={250} borderRadius={10} />
                                <div className="skeleton-text">
                                    <Skeleton height={20} width="80%" />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default MovieSkeleton;
