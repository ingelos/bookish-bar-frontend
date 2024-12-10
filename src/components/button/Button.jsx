import './Button.css';

function Button({ buttonText, id, onClick, disabled, buttonType, className }) {
    return (
        <button
            type={buttonType}
            id={id}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {buttonText}
        </button>
    );
}

export default Button;