// Author : omar besbes
// Component displays list of members to choose from to add to project

import '../styles/popup.css';

function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-background"/>
            <div className="popup-inner">
                {props.children}
                <button className="btn-close" onClick={() => props.setTrigger(false)}>
                    Close
                </button>
            </div>
        </div>
    ) : "";
}

export {Popup};