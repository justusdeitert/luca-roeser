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
