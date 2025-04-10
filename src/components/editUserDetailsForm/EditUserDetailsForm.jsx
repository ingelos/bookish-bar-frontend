import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";

function EditUserDetailsForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm()

    async function editUserDetails(data) {
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(editUserDetails)} className="form-container">
            <h4 className="form-title">Change Account Details</h4>
            <Input
                inputType='text'
                inputName='username'
                inputId='username-field'
                inputLabel='Username: '
                validationRules={{
                    minLength: {
                        value: 3,
                        message: 'Please enter a username that is at least 3 characters long'
                    },
                }}
                register={register}
                errors={errors}
            />            <Input
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
                inputName='currentPassword'
                inputId='currentPassword-field'
                inputLabel='Current password: *'
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
                buttonText="Save details"
                className="button"
            />
        </form>
    )
}

export default EditUserDetailsForm;