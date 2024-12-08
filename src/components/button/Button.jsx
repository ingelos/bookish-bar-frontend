import './Button.css';

function Button({ children, id, onClick, disabled, type, className }) {
    return (
        <button
            type={type}
            id={id}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {children}
        </button>
    );
}

export default Button;