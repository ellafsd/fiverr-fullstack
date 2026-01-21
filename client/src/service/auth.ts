//All API req. related to authentication

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse, ILoginData, IRegisterData } from "../types";
import api from "./axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authService = {
  login: (body: ILoginData) => api.post<AuthResponse>("/auth/login", body),
  register: (body: IRegisterData) =>
    api.post<AuthResponse>("/auth/register", body, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  logout: () => api.post("/auth/logout"),
  profile: () => api.get<AuthResponse>("/auth/profile"),
};

// Mutation for login Request
export const useLogin = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: authService.login,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
      navigate("/");
      toast.success("Login successful.");
    },
    onError: () => {
      toast.error("Login failed. Please try again.");
    },
  });
};

// Mutation for register Request
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: authService.register,
    onSuccess: () => {
      navigate("/login");
      toast.success("Your account has been created. You can now log in.");
    },
    onError: () => {
      toast.error("An error occurred during the registration process.");
    },
  });
};

// Mutation for logout Request
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear cached profile data
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ["profile"] })
        .forEach((query) => query.setData(undefined));

      queryClient.invalidateQueries({ queryKey: ["profile"] });

      navigate("/login");
      toast.success("You have been logged out.");
    },
    onError: () => {
      toast.error("An error occurred while logging out.");
    },
  });
};

//Mutation for profile Request
export const useProfile = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.profile,
    staleTime: 0,
    select: (res) => res.data.user,
    retry: false,
  });

  return { isLoading, error, user: data };
};
