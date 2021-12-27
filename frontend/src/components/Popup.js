// Author : omar besbes
// Component displays list of members to choose from to add to project

import '../styles/Popup.css';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup-window">
            <div className="popup-background"/>
            <div className="popup-inner">
                {props.children}
                <button className="popup-closeButton" onClick={() => props.setTrigger(false)}>
                    Close
                </button>
            </div>
        </div>
    ) : "";
}

export {Popup};