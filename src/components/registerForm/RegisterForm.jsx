import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";
import {useForm} from "react-hook-form";



function RegisterForm({onSubmit, error}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    });

    async function handleRegistration(data) {
        onSubmit(data);
    }

    return (
        <form className='register-form' onSubmit={handleSubmit(handleRegistration)}>
            {error && <p className='error-message-register'>{error}</p>}
            <Input
                inputType='text'
                inputName='username'
                inputId='username-field'
                inputLabel='Username: *'
                validationRules={{
                    required: 'Username is required',
                    minLength: {
                        value: 3,
                        message: 'Please enter a username that is at least 3 characters long'
                    },
                }}
                register={register}
                errors={errors}
            />
            <Input
                inputType='email'
                inputName='email'
                inputId='email-field'
                inputLabel='Email: *'
                validationRules={{
                    required: 'Email is required',
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
                inputId='password-field'
                inputLabel='Password: *'
                validationRules={{
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'A password requires a minimum of 6 characters'
                    }
                }}
                register={register}
                errors={errors}
            />
            <p>* required</p>
            <Button
                buttonType='submit'
                className='button submit-button'
                buttonText="Create Account"
            />
        </form>
    )
}

export default RegisterForm;