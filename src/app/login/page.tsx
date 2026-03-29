"use client";

import { login } from "@/actions/login";
import useFeedbackText from "@/hooks/feedback";

export default function Page() {
  const [feedbackText, changeFeedbackText] = useFeedbackText();

  const onSubmit = async (formData: FormData) => {
    const response = await login(formData);
    changeFeedbackText(response);
  };

  return (
    <>
      <h1 className="text-3xl text-center mb-10 font-bold mt-5">Log in</h1>
      <form action={onSubmit} className="w-175 max-w-full mx-auto text-center">
        <input
          className="mb-3 w-full border border-zinc-600 bg-zinc-900 rounded-md p-1 text-xl"
          name="username"
          type="text"
          required
          placeholder="Username"
        />
        <input
          className="mb-3 w-full border border-zinc-600 bg-zinc-900 rounded-md p-1 text-xl"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <button
          className="text-xl bg-zinc-900 py-2 px-6 border border-zinc-600 cursor-pointer rounded-md hover:bg-zinc-800"
          type="submit"
        >Login</button>
      </form>
      <p className="text-center mt-2 text-red-400">{feedbackText}</p>
    </>
  )
}