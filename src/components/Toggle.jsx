import React from "react";

const ToggleSwitch = ({ label, onClick }) => {
return (
	<div className="container">
		<h2>Settings</h2>
		<div className="mode-container">
			<div className="mode-hard">
				<span className="mode">{label}{" "}</span>
			</div>
			<div className="toggle-switch">
				<input type="checkbox" className="checkbox"
					name={label} id={label} onClick={onClick} />
				<label className="label" htmlFor={label}>
				<span className="inner" />
				<span className="switch" />
				</label>
			</div>
		</div>
	</div>
);
};

export default ToggleSwitch;
