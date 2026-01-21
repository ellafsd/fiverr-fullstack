import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetAllGigsParams, GetAllGigsResponse, GetOneGigResponse } from "../types";
import api from "./axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// All API requests related to gigs
const gigService = {
  getAll: (params?: GetAllGigsParams) => api.get<GetAllGigsResponse>("/gigs", { params }),
  getOne: (id: string) => api.get<GetOneGigResponse>(`/gigs/${id}`),
  create: (body: FormData) => api.post<GetOneGigResponse>(`/gigs`, body),
  delete: (id: string) => api.delete(`/gigs/${id}`),
};


// Fetch all gigs
const useGetAllGigs = (params: GetAllGigsParams) =>
  useQuery({
    queryKey: ["gigs", params],
    queryFn: () => gigService.getAll(params),
    select: (res) => res.data.gigs,
  });


// Fetch a single gig
const useGetOneGig = (id: string) =>
  useQuery({
    queryKey: ["gig"],
    queryFn: () => gigService.getOne(id),
    select: (res) => res.data.gig,
  });


// Create a new gig
const useCreateGig = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createGig"],
    mutationFn: (body: FormData) => gigService.create(body),
    onSuccess: (res) => {
      navigate(`/detail/${res.data.gig._id}`);
      toast.success("Service created successfully");
    },
    onError(error) {
      console.log(error);
      toast.error("An error occurred while creating the service");
    },
  });
};


// Delete a gig
const useDeleteGig = (id: string) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["deleteGig"],
    mutationFn: () => gigService.delete(id),
    onSuccess: () => {
      toast.success("Service deleted successfully");
      // Re-triggers the useGetAllGigs query
      client.invalidateQueries({ queryKey: ["gigs"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("An error occurred while deleting the service");
    },
  });
};

export { gigService, useGetAllGigs, useGetOneGig, useCreateGig, useDeleteGig };
