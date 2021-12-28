import React from "react";
import "../styles/ProgressBar.css";

const ProgressBar = (props) => {
	const [style, setStyle] = React.useState({});

	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: (props.nbCompleted / props.nbTotal * 100) + '%'
		}
		setStyle(newStyle);
	}, 200);

	return(
		<div className="progressBar-Bar">
			<div className="progressBar-progress" style={style}/>
			<div className="progressBar-progressMessage">
				{props.nbCompleted} Tasks Completed
			</div>
		</div>
	);
}

export {ProgressBar};