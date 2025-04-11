import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";

function ChangeUsernameForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function editUsername(data) {
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(editUsername)} className="form-container">
            <h4 className="form-title">Change Username</h4>
            <Input
                inputType='text'
                inputName='username'
                inputId='editUsername-field'
                inputLabel='Username: '
                validationRules={{
                    minLength: {
                        value: 3,
                        message: 'Please enter a username that is at least 3 characters long'
                    },
                }}
                register={register}
                errors={errors}
                />

            <Input
                inputType='password'
                inputName='password'
                inputId='passwordUsername-field'
                inputLabel='Password: *'
                validationRules={{
                    required: 'Password is required',
                    minLength: {
                        value: 8,
                        message: 'A password requires a minimum of 8 characters'
                    }
                }}
                register={register}
                errors={errors}
            />
            <Button
                buttonType="submit"
                buttonText="Save username"
                className="button"
            />
        </form>
    )
}

export default ChangeUsernameForm;