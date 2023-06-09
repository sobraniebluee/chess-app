import React from "react";

interface IconProps {
    width: number,
    height: number,
    styles?: React.CSSProperties
}

export const CrossIcon: React.FC<IconProps> = ({width, height, styles}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon"
             width={width}
             height={height}
             style={styles}
             viewBox="0 0 1024 1024" version="1.1">
            <path
                d="M62.5371425 96.45714312A34.28571469 34.28571469 0 0 1 111.08571406 48.00000031l845.71428563 845.71428563a34.28571469 34.28571469 0 0 1-48.45714281 48.45714281L62.5371425 96.45714312z"
                fill="#515151"/>
            <path
                d="M908.25142812 48.00000031a34.28571469 34.28571469 0 0 1 48.50285719 48.45714281l-845.71428562 845.71428563a34.28571469 34.28571469 0 0 1-48.45714281-48.45714281l845.71428562-845.71428563z"
                fill="#515151"/>
        </svg>
    );
}