import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Initialize react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // Fetch logged-in user
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        // Pre-fill form with fetched user data
        reset({
          firstName: res.data.fullName.firstName,
          lastName: res.data.fullName.lastName,
          oldpassword: "",
          newpassword: "",
        });
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, reset]);

  // Form submit
 const onSubmit = async (data) => {
  // Check if any field changed compared to current user data
  const isChanged =
    data.firstName !== user.fullName.firstName ||
    data.lastName !== user.fullName.lastName ||
    (data.newpassword && data.newpassword.length > 0);

  if (!isChanged) {
    setMessage("You did not change anything!");
    return; // Stop submission
  }

  try {
    const res = await axios.patch(
      "http://localhost:3000/api/auth/profile/update",
      data,
      { withCredentials: true }
    );
    setMessage(res.data.message);
    setUser(res.data.user);
    reset({ ...data, oldpassword: "", newpassword: "" });
  } catch (error) {
    setMessage(error.response?.data?.message || "Update failed!");
    console.log(error);
  }
};


  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen px-2">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6 text-gray-900 dark:text-gray-200"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">
          Update Profile
        </h2>

        {/* First Name */}
        <div>
          <label className="block text-base font-medium mb-1">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-base font-medium mb-1">Last Name</label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Old Password */}
        <div>
          <label className="block text-base font-medium mb-1">Old Password</label>
          <input
            type="password"
            {...register("oldpassword")}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter old password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-base font-medium mb-1">New Password</label>
          <input
            type="password"
            {...register("newpassword")}
            className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg mt-4"
        >
          Update
        </button>

        {message && <div className="text-green-600 text-center mt-2">{message}</div>}
      </form>
    </div>
  );
};

export default UpdateProfile;
