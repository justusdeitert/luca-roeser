/**
 * Use The Clip Path Converter to generate Clip Path SVGs for Header
 * @link https://yoksel.github.io/relative-clip-path/
 * @type {JSX.Element}
 */

// export const slope =
//     <svg width="0" height="0" className="clip-path-svg">
//         <clipPath id="clipPolygon" clipPathUnits="objectBoundingBox">
//             <polygon points="0,0 0,0.93 1,1 1,0" />
//         </clipPath>
//     </svg>

// export const curves =
//     <svg width="0" height="0" className="clip-path-svg">
//         <clipPath id="clipPolygon" clipPathUnits="objectBoundingBox">
//             <path d="M0.418,0.88 C0.592,0.929,0.798,1,1,0.964 L1,0 L0,0 L0,0.964 C0,0.964,0.244,0.83,0.418,0.88"></path>
//         </clipPath>
//     </svg>
//
// export const curves_02 =
//     <svg width="0" height="0" className="clip-path-svg">
//         <clipPath id="clipPolygon" clipPathUnits="objectBoundingBox">
//             <path d="M1,0.931 L1,0 L0,0 L0,0.963 C0.102,0.925,0.235,0.946,0.342,0.972 C0.462,1,0.796,1,1,0.931"></path>
//         </clipPath>
//     </svg>


export const slope = (clipPathId) => {
    return (
        <svg width="0" height="0" className="clip-path-svg">
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                <polygon points="0,0 0,0.93 1,1 1,0" />
            </clipPath>
        </svg>
    )
}

export const curves = (clipPathId) => {
    return (
        <svg width="0" height="0" className="clip-path-svg">
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                <path d="M0.418,0.88 C0.592,0.929,0.798,1,1,0.964 L1,0 L0,0 L0,0.964 C0,0.964,0.244,0.83,0.418,0.88"></path>
            </clipPath>
        </svg>
    )
}

export const curves_02 = (clipPathId) => {
    return (
        <svg width="0" height="0" className="clip-path-svg">
            <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                <path d="M1,0.931 L1,0 L0,0 L0,0.963 C0.102,0.925,0.235,0.946,0.342,0.972 C0.462,1,0.796,1,1,0.931"></path>
            </clipPath>
        </svg>
    )
}

export const waves = (clipPathId, variation = 'bottom_top') => {
    switch (variation) {
        case 'bottom':
            return (
                <svg className="clip-path-svg">
                    <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                        <path d="M0.001,0.958 C0.046,0.987,0.088,1,0.125,1 C0.162,1,0.206,0.984,0.255,0.949 C0.298,0.928,0.349,0.937,0.41,0.975 C0.471,1,0.543,1,0.626,0.958 C0.668,0.927,0.724,0.933,0.795,0.975 C0.865,1,0.934,1,1,0.935 L1,0.002 L0,0.002 L0.001,0.958"></path>
                    </clipPath>
                </svg>
            )
        case 'bottom_top':
            return (
                <svg className="clip-path-svg">
                    <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                        <path d="M1,0.933 C0.934,1,0.866,1,0.795,0.974 C0.724,0.931,0.668,0.925,0.626,0.956 C0.543,1,0.471,1,0.41,0.974 C0.349,0.935,0.298,0.926,0.255,0.947 C0.206,0.983,0.162,1,0.125,1 C0.087,1,0.046,0.986,0.001,0.956 L0.001,0.024 C0.046,0.054,0.087,0.069,0.125,0.069 C0.162,0.069,0.206,0.051,0.255,0.015 C0.298,-0.006,0.349,0.003,0.41,0.042 C0.471,0.08,0.543,0.074,0.626,0.024 C0.668,-0.007,0.724,-0.001,0.795,0.042 C0.866,0.084,0.934,0.071,1,0.001 L1,0.933"></path>
                    </clipPath>
                </svg>
            )
        case 'bottom_top_sides':
            return (
                <svg className="clip-path-svg">
                    <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                        <path d="M0.409,0.038 C0.47,0.077,0.542,0.071,0.626,0.02 C0.668,-0.011,0.725,-0.005,0.796,0.038 C0.864,0.079,0.93,0.068,0.994,0.005 C0.992,0.038,0.988,0.072,0.985,0.108 C0.969,0.254,0.971,0.427,0.992,0.626 C1,0.709,1,0.814,0.993,0.941 C0.929,1,0.863,1,0.796,0.973 C0.725,0.93,0.668,0.924,0.626,0.955 C0.542,1,0.47,1,0.409,0.973 C0.348,0.934,0.297,0.925,0.254,0.946 C0.204,0.982,0.161,1,0.123,1 C0.09,1,0.054,0.989,0.015,0.966 C0.023,0.884,0.027,0.807,0.027,0.737 C0.027,0.647,0.019,0.543,0.004,0.424 C-0.004,0.321,0,0.197,0.016,0.051 C0.016,0.045,0.017,0.038,0.018,0.032 C0.056,0.054,0.091,0.065,0.123,0.065 C0.161,0.065,0.204,0.047,0.254,0.011 C0.297,-0.01,0.348,-0.001,0.409,0.038"></path>
                    </clipPath>
                </svg>
            )
    }
}
