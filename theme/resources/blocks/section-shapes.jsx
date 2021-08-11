/**
 * Use The Clip Path Converter to generate Clip Path SVGs for Header
 */
import classnames from 'classnames';

export const slope = (position = 'top', sectionHeight = '100px', sectionClass = 'normal', sectionFill = false) => {

    let sectionStyles = {height: sectionHeight};

    if (sectionFill) {
        sectionStyles.fill = sectionFill;
    }

    return (
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `shape-${position}`, `shape-${sectionClass}`)} style={sectionStyles}>
            <path d="M0 0 1200 0 1200 100 0 16z" />
        </svg>
    )
}

export const curves = (position = 'top', sectionHeight = '100px', sectionClass = 'normal', sectionFill = false) => {

    let sectionStyles = {height: sectionHeight};

    if (sectionFill) {
        sectionStyles.fill = sectionFill;
    }

    return (
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className={classnames("section-shape", `shape-${position}`, `shape-${sectionClass}`)} style={sectionStyles}>
            <path d="M1200,52.4671729 L1200,0.306140965 L0,0.306140965 L0,74.4514906 C122.5,48.0703094 282.59125,62.9273113 410.9375,80.6803806 C554.49875,100.538082 954.6875,122.450584 1200,52.4671729 Z" />
        </svg>
    )
}

