import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "", 
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // --- LOGIKA TAMBAHAN: CEK USER DARI REGISTER (LOCALSTORAGE) ---
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    // Jika username & password cocok dengan yang ada di localStorage
    if (savedUser && dataForm.username === savedUser.username && dataForm.password === savedUser.password) {
      // Simulasi sukses login
      const fakeResponse = {
        accessToken: "simulated-token-for-" + savedUser.username,
        username: savedUser.username,
        firstName: savedUser.workshopName || "User",
        image: "https://robohash.org/set_set4/user.png"
      };

      localStorage.setItem("token", fakeResponse.accessToken);
      localStorage.setItem("user", JSON.stringify(fakeResponse));

      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 1000); // Delay dikit biar keren ada loadingnya
      return; // Berhenti di sini, jangan lanjut ke API
    }
    // -------------------------------------------------------------

    // Jika tidak ada di localStorage, baru coba tembak API DummyJSON
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: dataForm.username,
        password: dataForm.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Username atau Password salah.");
      } else {
        setError("Gagal terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-center text-xl font-bold text-[#1A1C1E] mb-8">
        Login to your account
      </h2>

      {error && (
        <div className="bg-red-100 mb-5 p-4 text-sm text-red-700 rounded-2xl flex items-center border border-red-200">
          <BsFillExclamationDiamondFill className="me-2 text-lg" />
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <input
            name="username"
            type="text"
            required
            onChange={handleChange}
            className="w-full rounded-2xl bg-[#F8F9FA] border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#D4E34A]/50 focus:bg-white text-[#1A1C1E] placeholder:text-slate-400 transition-all"
            placeholder="Username (e.g: emilys)"
          />
        </div>
        <div className="relative">
          <input
            name="password"
            type="password"
            required
            onChange={handleChange}
            className="w-full rounded-2xl bg-[#F8F9FA] border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#D4E34A]/50 focus:bg-white text-[#1A1C1E] placeholder:text-slate-400 transition-all"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-[#1A1C1E] font-semibold">
            <input
              type="checkbox"
              className="accent-[#D4E34A] w-4 h-4 rounded"
            />{" "}
            Remember me
          </label>
          <Link to="/forgot" className="text-[#A8B330] font-bold hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center items-center rounded-2xl bg-[#D4E34A] py-4 font-black text-[#1A1C1E] shadow-lg shadow-[#D4E34A]/20 transition-all hover:opacity-90 active:scale-[0.98] disabled:bg-gray-300"
        >
          {loading ? (
            <ImSpinner2 className="animate-spin text-xl" />
          ) : (
            "Sign in with email"
          )}
        </button>

        <div className="relative py-4 flex items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            Or login with
          </span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#1A1C1E] transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt=""
            />{" "}
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#1A1C1E] transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475633/apple-color.svg"
              className="w-5 h-5"
              alt=""
            />{" "}
            Apple
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-slate-500 font-medium">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-[#A8B330] hover:underline">
          Get Started
        </Link>
      </p>
    </div>
  );
}