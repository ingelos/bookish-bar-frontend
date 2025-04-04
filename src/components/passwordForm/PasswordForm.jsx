import {useForm} from "react-hook-form";
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";

function PasswordForm( { onSubmit }) {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();
    const newPassword = watch("newPassword");

    async function editPassword(data) {
        onSubmit(data);
    }

    return (
        <form onSubmit={handleSubmit(editPassword)} className="form-container">
            <Input inputType="password"
                   inputName="newPassword"
                   inputId="newPassword-field"
                   inputLabel="New Password: *"
                   validationRules={{
                       required: "Password is required",
                       minLength: {
                           value: 8,
                           message: "Passwords require a minimum of 8 characters"
                       }
                   }}
                   register={register}
                   errors={errors}
                   />
            <Input inputType="password"
                   inputName="confirmPassword"
                   inputId="confirmPassword-field"
                   inputLabel="Confirm Password: *"
                   validationRules={{
                       required: "Confirming password is required",
                       validate: (value) => value === newPassword || "Passwords do not match"
                   }}
                   register={register}
                   errors={errors}
            />
            <Button buttonType="submit"
                    buttonText="Save password"
                    className="button"
                    />
        </form>
    )
}

export default PasswordForm;