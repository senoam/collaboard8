import React from "react";

function BoardPlusIcon(props) {
    // Icon: https://www.svgrepo.com/svg/2087/plus
    // Moving svg rainbow gradient https://codepen.io/hujambo-dunia/pen/jaxLZw
    return (
        <svg
            className={props.class}
            version="1.1"
            x="0px"
            y="0px"
            width="45.402px"
            height="45.402px"
            viewBox="0 0 45.402 45.402"
            style={{ enableBackground: "new 0 0 45.402 45.402" }}
        >
            {props.onHoverGradient && (
                <defs>
                    <linearGradient id="PlusIcon-gradient" x1="0%" y1="0%" x2="100%" y2="0">
                        <stop offset="0%" style={{ stopColor: "#f38d6e" }} />
                        <stop offset="25%" style={{ stopColor: "#fa68a0" }} />
                        <stop offset="50%" style={{ stopColor: "#4dc0eb" }} />
                        <stop offset="75%" style={{ stopColor: "#81ecd3" }} />
                        <stop offset="100%" style={{ stopColor: "#f38d6e" }} />
                    </linearGradient>
                    <pattern
                        id="PlusIcon-pattern"
                        x="0"
                        y="0"
                        width="400%"
                        height="400%"
                        patternUnits="userSpaceOnUse"
                    >
                        <rect x="0" y="0" width="250%" height="100%" fill="url(#PlusIcon-gradient)">
                            <animate
                                attributeType="XML"
                                attributeName="x"
                                from="0"
                                to="300%"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </rect>
                        <rect
                            x="-250%"
                            y="0"
                            width="300%"
                            height="100%"
                            fill="url(#PlusIcon-gradient)"
                        >
                            <animate
                                attributeType="XML"
                                attributeName="x"
                                from="-300%"
                                to="0"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </rect>
                    </pattern>
                </defs>
            )}

            <path
                d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141
        c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27
        c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435
        c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                fill={props.onHoverGradient ? "url(#PlusIcon-pattern)" : "#797b84"}
            />
        </svg>
    );
}

export default BoardPlusIcon;
