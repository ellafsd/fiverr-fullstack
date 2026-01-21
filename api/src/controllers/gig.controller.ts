import type { Request, Response, NextFunction } from "express";
import e from "../utils/error.js";
import c from "../utils/catch-async.js";
import upload from "../utils/cloudinary.js";
import type { ExtendedFiles, Filters, Query } from "../types/index.js";
import { Gig } from "../models/gig.model.js";

// Function that converts filters coming from query parameters
// into a Mongoose-compatible filter object
const buildFilters = (query: Query): Filters => {
  const filters: Filters = {};

  if (query.category) filters.category = query.category;
  if (query.userId) filters.user = query.userId;
  if (query.min || query.max) {
    filters.packagePrice = {};

    if (query.min) filters.packagePrice.$gte = Number(query.min);
    if (query.max) filters.packagePrice.$lte = Number(query.max);
  }

  // Case-insensitive search (uppercase/lowercase insensitive)
  if (query.search) filters.title = { $regex: query.search, $options: "i" };

  return filters;
};

export const getAllGigs = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const filters = buildFilters(req.query);

    //console.log({filters1: req.query, filters2:filters})

    const gigs = await Gig.find(filters).populate(
      "user",
      "username profilePicture",
    );

    if (gigs.length === 0) {
      return next(e(404, "No services found matching the specified criteria"));
    }

    res.status(200).json({
      message: "Service data retrieved successfully",
      results: gigs.length,
      gigs,
    });
  },
);



export const createGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // If the requester is not a seller, return an error
    if (!req.isSeller) {
      return next(e(403, "Only seller accounts can create services"));
    }

    // Set the TypeScript type for uploaded files
    const files = req.files as unknown as ExtendedFiles;

    //  Check if files exist
    if (!files || !files.coverImage || !files.coverImage[0]) {
      return next(e(400, "Cover image is required"));
    }

    if (!files.images || files.images.length === 0) {
      return next(e(400, "At least one gig image is required"));
    }


    // Upload the cover image to Cloudinary
    const coverImage = await upload(
      next,
      files.coverImage[0].path,
      "gig-images",
      900,
      600,
      "fill",
      "80",
    );


//   // CLOUDINARY UPLOAD TEST LOGS 
// console.log("COVER IMAGE RESULT:", coverImage);
// console.log("COVER IMAGE URL:", coverImage.secure_url);



    // Create promises for uploading the remaining images
    const promises = files.images.map((image) =>
      upload(next, image.path, "gig-images", 900, 600, "fill", "80"),
    );

    // Upload all images at once and get the results
    const images = await Promise.all(promises);

    // Attach image URLs to req.body
    req.body.coverImage = coverImage.secure_url;
    req.body.images = images.map((image) => image.secure_url);

    // Convert package features string into an array
    req.body.packageFeatures = req.body.packageFeatures.split(",");

    // Create a new gig document
    const savedGig = await Gig.create({
      ...req.body,
      user: req.userId,
    });

    res.status(201).json({
      message: "Service created successfully",
      gig: savedGig,
    });
  },
);



export const getGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const gig = await Gig.findById(req.params.id).populate("user");

    if (!gig) return next(e(404, "The requested service was not found."));

    res.status(200).json({
      message: "Service data retrieved successfully.",
      gig,
    });
  }
);



export const updateGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedGig) {
      res.status(404).json({ message: "Gig not found" });
      return;
    }

    res.status(200).json({
      message: "Service data updated successfully",
      gig: updatedGig,
    });
  }
);



export const deleteGig = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Find the service
    const gig = await Gig.findById(req.params.id);

    // If not found, throw an error
    if (!gig) return next(e(404, "The requested service was not found"));

    // Check if the requester is the owner of the service
    if (String(gig?.user) !== req.userId)
      return next(e(403, "You are not authorized to perform this action"));

    // Delete the service
    await Gig.findByIdAndDelete(req.params.id);

    // Send response to the client
    res.status(200).json({
      message: "Service has been successfully deleted",
    });
  }
);

