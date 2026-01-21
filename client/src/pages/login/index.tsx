import { Link } from "react-router-dom";
import Input from "../../components/form/input";
import type { FormEvent } from "react";
import type { ILoginData } from "../../types";
import { useLogin } from "../../service/auth";

const Login = () => {
  const { mutate, isPending } = useLogin();

  // handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(
      formData.entries()
    ) as unknown as ILoginData;

    mutate(userData);
  };

  return (
    <div className="pt-24 max-w-[500px] mx-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="title mb-10">Sign In to Your Account</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Username" name="username" />
        <Input label="Password" name="password" type="password" />

        <button disabled={isPending} className="form-button">
          Sign In
        </button>
      </form>

      <p className="mt-5 text-gray-500">
        Don't have an account?
        <Link to="/register" className="ms-3 text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
