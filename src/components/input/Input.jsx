import './Input.css'

function Input({ inputId, inputLabel, inputType, inputName, rows, min, max, validationRules, register, errors }) {

    return (
        <>
            <label htmlFor={inputId}>{inputLabel}
                {inputType === 'textarea' ? (
                    <textarea
                        id={inputId}
                        name={inputName}
                        {...register(inputName, validationRules)}
                        rows={rows}
                    />
                ) : (
                <input
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                    min={min}
                    max={max}
                />
                    )}
            </label>
            {errors[inputName] && <p className='input-error-message'>{errors[inputName].message}</p>}
        </>
    )
}

export default Input;