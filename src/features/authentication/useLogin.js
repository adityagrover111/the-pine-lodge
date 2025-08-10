import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth.js";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success(`Welcome ${data.user.user_metadata.fullName}`);
      navigate("/dashboard", { replace: "true" });
    },

    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
