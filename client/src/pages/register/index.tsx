import { Link } from "react-router-dom";
import Input from "../../components/form/input.js";
import Toggle from "../../components/form/toggle";
import { useState, type FormEvent } from "react";
import { useRegister } from "../../service/auth";
import type { IRegisterData } from "../../types";

const Register = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { mutate, isPending } = useRegister();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // create a FormData instance
    const formData = new FormData(e.currentTarget);

    // get all input values
    const userData = Object.fromEntries(
      formData.entries()
    ) as unknown as IRegisterData;

    // add seller account info to the payload
    userData.isSeller = isChecked;

    // send register request to the API
    mutate(userData);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="title">Create an Account</h1>

          <Input label="Name" name="username" />
          <Input label="Email" name="email" type="email" />
          <Input label="Profile Picture" name="profilePicture" type="file" />
          <Input label="Country" name="country" />
          <Input label="Password" name="password" type="password" />
        </div>

        <div>
          <h1 className="title">I Want to Become a Seller</h1>

          <Toggle setIsChecked={setIsChecked} />

          <Input
            label="Phone"
            name="phone"
            disabled={!isChecked}
            required={!isChecked}
          />
          <Input
            label="Description"
            name="description"
            disabled={!isChecked}
            required={!isChecked}
            type="textarea"
          />

          <button 
          //disabled={isPending} 
          type="submit" 
          className="form-button">
            Sign Up
          </button>

          <p className="mt-5 text-gray-500">
            Already have an account?
            <Link to="/login" className="ms-3 text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
