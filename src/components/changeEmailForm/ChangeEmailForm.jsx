import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";

function ChangeEmailForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function editEmail(data) {
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(editEmail)} className="form-container">
            <h4 className="form-title">Change Email</h4>
            <Input
                inputType='email'
                inputName='email'
                inputId='newEmail-field'
                inputLabel='Email: '
                validationRules={{
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email address',
                    }
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='password'
                inputName='password'
                inputId='passwordEmail-field'
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
                buttonText="Save email"
                className="button"
            />
        </form>
    )
}

export default ChangeEmailForm;