import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      return setErrorMessage("Please fill in all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (response.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-7">
        {/*Left Side*/}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span
              className="px-2 py-1 bg-gradient-to-r from-yellow-400
            via-red-400 to-green-500 rounded-lg text-white"
            >
              Muhammad's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to Hamza's Blog! Feel free to sign up and be a part of the
            community. You can sign up with your email and password or Google
            account.
          </p>
        </div>

        {/*Right Side*/}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              gradientDuoTone="tealToLime"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth/>
          </form>

          <div className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
