import React, {useEffect} from "react";
import "../styles/ProgressBari.css";

const ProgressBari = (props) => {
	const [style, setStyle] = React.useState({});


	useEffect(() => {
		setTimeout(() => {
			const newStyle = {
				opacity: 1,
				width: (props.nbCompleted / props.nbTotal * 100) + '%'
			}
			setStyle(newStyle);
		}, 100);
	}, []);

	return(
		<div className="progressBari-Bar">
			<div className="progressBari-progress" style={style}/>
			<div className="progressBari-progressMessage">
				{props.nbCompleted} Tasks Completed
			</div>
		</div>
	);
}

export {ProgressBari};