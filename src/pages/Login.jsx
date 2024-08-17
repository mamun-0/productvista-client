import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
    }
  }
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="p-1 border border-slate-400 focus:border-slate-600"
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="p-1 border border-slate-400 focus:border-slate-600"
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="p-2 bg-yellow-500 rounded-md my-2" type="submit">Login</button>
      </form>
      <div>
        <button className="p-2 bg-red-500 rounded-md my-2" onClick={signInWithGoogle}>Login with Google</button>
      </div>
    </div>
  );
}
