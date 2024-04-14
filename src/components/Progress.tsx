import React from "react";
import './Progress.scss';
type TTime = {
    progress: number;
}
type TProps = {
    progress: TTime;
}
const ProgressBar = (props: TProps) => {
    return (
        <div className="progress_bar">
             <div className="progress" style={{width: `${props.progress.progress}%`}} id="progress"></div>
        </div>
    )
}
export default ProgressBar;