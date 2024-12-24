import { SignupInput } from "@chakbindra/common-medium";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Auth = ({type}:{type:"signup" | "signin"}) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">
              {type==="signin"?"Don't have an account":"Already have an account?"}
              <Link className="underline" to={type==="signin"?"/signup":"/signin"}>
                {" "}
                {type==="signin"?"SignUp":"SignIn"}
              </Link>
            </div>
          </div>

          <div>
            <LabelledInput
              label="Name"
              placeholder="Indra"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Username"
              placeholder="indra@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Passsword"
              type={"password"}
              placeholder="password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <button type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign Up":"Sign In"}</button>
        </div>
      </div>
      
    </div>
  );
};

interface LabelledInput {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInput) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg foucus:ring-blue-500 foucus:border-blue-500 black-w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
