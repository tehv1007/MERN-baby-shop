import InputCard from "./Dashboard/InputCard";
import Layout from "../../components/layouts/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../validation/userSchema";
import { changePassword } from "../../hooks/useUser";

const ChangePassword = ({ user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const mutation = changePassword(reset);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Layout>
      <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
        <h2 className="text-xl font-semibold mb-5">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:grid-cols-6 md:gap-6">
            <div className="md:mt-0 md:col-span-6">
              <div className="lg:mt-6 bg-white">
                <div className="grid grid-cols-6 gap-6">
                  <InputCard
                    layout="sm:col-span-6"
                    placeholder="Your Current Password"
                    name="currentPassword"
                    type="password"
                    title="Current Password"
                    register={register}
                    errors={errors.currentPassword}
                  />
                  <InputCard
                    layout="sm:col-span-6"
                    placeholder="Your New Password"
                    name="newPassword"
                    type="password"
                    title="New Password"
                    register={register}
                    errors={errors.newPassword}
                  />
                  <InputCard
                    layout="sm:col-span-6"
                    placeholder="Your New Password"
                    name="confirmPassword"
                    type="password"
                    title="Confirm New Password"
                    register={register}
                    errors={errors.confirmPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <button
              type="submit"
              className="cursor-pointer transition ease-in-out duration-300 font-medium text-center rounded-md bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm w-full sm:w-auto"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
