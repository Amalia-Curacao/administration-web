import { ReactElement } from "react";

export default function Icon(): ReactElement {
    return(<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"}} width={"200px"} height={"200px"} viewBox={"0 0 100 100"} preserveAspectRatio="xMidYMid">
        <rect x="15" y="25" width="20" height="50" fill="#afe1af">
        <animate attributeName="y" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="12.5;25;25" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.26666666666666666s"/>
        <animate attributeName="height" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="75;50;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.26666666666666666s"/>
        </rect>
        <rect x="40" y="25" width="20" height="50" fill="#f7f1a6">
        <animate attributeName="y" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="15.625;25;25" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.13333333333333333s"/>
        <animate attributeName="height" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="68.75;50;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.13333333333333333s"/>
        </rect>
        <rect x="65" y="25" width="20" height="50" fill="#f7b4a6">
        <animate attributeName="y" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="15.625;25;25" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"/>
        <animate attributeName="height" repeatCount="indefinite" dur="1.3333333333333333s" calcMode="spline" keyTimes="0;0.5;1" values="68.75;50;50" keySplines="0 0.5 0.5 1;0 0.5 0.5 1"/>
        </rect>
    </svg>);
}