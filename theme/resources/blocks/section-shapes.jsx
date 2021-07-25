/**
 * Use The Clip Path Converter to generate Clip Path SVGs for Header
 */
import {getCssVariable} from './utility'
import classnames from 'classnames';



export const slope = (color = getCssVariable('--custom-body-background-color'), position = 'top', sectionHeight = '100px', sectionClass = 'normal') => {
    return (
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `shape-${position}`, `shape-${sectionClass}`)} style={{height: sectionHeight}}>
            <path fill={color} d="M0 0 1200 0 1200 100 0 16z" />
        </svg>
    )
}

export const curves = (color = getCssVariable('--custom-body-background-color'), position = 'top', sectionHeight = '100px', sectionClass = 'normal') => {
    return (
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `shape-${position}`, `shape-${sectionClass}`)} style={{height: sectionHeight}}>
            <path fill={color} d="M1200,52.4671729 L1200,0.306140965 L0,0.306140965 L0,74.4514906 C122.5,48.0703094 282.59125,62.9273113 410.9375,80.6803806 C554.49875,100.538082 954.6875,122.450584 1200,52.4671729 Z" />
        </svg>
    )
}

// export const caro = (color = getCssVariable('--custom-body-background-color'), position = 'top') => {
//     return (
//         <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `section-shape--${position}`)}>
//             <g stroke="none" fill="none" fill-rule="evenodd">
//                 <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//                     <polygon fill={color}  points="834.885075 100 834.885075 57.168107 784.100844 57.168107 784.100844 100 730.015398 100 730.015398 57.168107 678.181759 57.168107 678.181759 100 626.1478 100 626.1478 57.168107 573.562389 57.168107 573.562389 100 521.431753 100 521.431753 57.168107 469.570882 57.168107 469.570882 100 417.566602 100 417.566602 57.168107 364.740243 57.168107 364.740243 100 313.376428 100 313.376428 57.168107 260.241107 57.168107 260.241107 100 208.571362 100 208.571362 57.168107 156.710124 57.168107 156.710124 100 104.129526 100 104.129526 57.168107 52.3020024 57.168107 52.3020024 100 0 100 0 3.01147995e-13 1200 3.01147995e-13 1200 100 1148.63619 100 1148.63619 57.168107 1095.50086 57.168107 1095.50086 100 1043.83112 100 1043.83112 57.168107 991.969882 57.168107 991.969882 100 939.389283 100 939.389283 57.168107 887.56176 57.168107 887.56176 100"></polygon>
//                 </g>
//             </g>
//         </svg>
//     )
// }

// export const waves = (color = getCssVariable('--custom-body-background-color'), position = 'top') => {
//     return (
//         <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `section-shape--${position}`)}>
//             <path fill={color} d="M1.79194848,86.8904062 C56.1760982,96.0138035 105.784383,100.575502 150.616802,100.575502 C195.449221,100.575502 247.46045,95.078872 306.65049,84.0856118 C357.874582,77.7730241 419.875966,80.5213391 492.654644,92.330557 C565.433321,104.139775 651.608119,102.326391 751.179036,86.8904062 C802.037996,77.4061534 869.774552,79.219537 954.388705,92.330557 C1039.00286,105.441577 1121.20662,101.272667 1201,79.8238287 L1201,0.575502175 L1,0.575502175 L1.79194848,86.8904062 Z" />
//         </svg>
//     )
// }
