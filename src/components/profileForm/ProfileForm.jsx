import {useForm} from "react-hook-form";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";


function ProfileForm({ onSubmit, initialData, error}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: initialData,
    });

    async function handleUpdatingProfile(data) {
        onSubmit(data);
    }

    return (
        <form className='create-profile-form' onSubmit={handleSubmit(handleUpdatingProfile)}>
            <Input
                inputType='text'
                inputName='firstname'
                inputId='firstname-field'
                inputLabel='First name:'
                register={register}
                errors={errors}
            />
            <Input
                inputType='text'
                inputName='lastname'
                inputId='lastname-field'
                inputLabel='Last name:'
                register={register}
                errors={errors}
            />
            <Input
                inputType='textarea'
                inputName='about'
                inputId='about-field'
                inputLabel='About:'
                validationRules={{
                    maxLength: {
                        value: 500,
                        message: 'Please do not exceed 500 characters',
                    }
                }}
                rows={5}
                register={register}
                errors={errors}
            />
            <Button
                buttonType="submit"
                buttonText="Save profile"
                className="profile-submit-button"
            />
            {error && <p>Something went wrong submitting the form, please try again.</p>}
        </form>
    )
}

export default ProfileForm;