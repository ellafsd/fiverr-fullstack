
import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
  FaHeart,
} from "react-icons/fa";
import type { ICategory, IInfo, IInput } from "../types";

export const categories: ICategory[] = [
  { name: "Programming & Technology", icon: <FaCode /> },
  { name: "Graphic Design", icon: <FaPaintBrush /> },
  { name: "Digital Marketing", icon: <FaBullhorn /> },
  { name: "Writing & Translation", icon: <FaPenFancy /> },
  { name: "Video & Animation", icon: <FaVideo /> },
  { name: "AI Services", icon: <FaRobot /> },
  { name: "Music & Audio", icon: <FaMusic /> },
  { name: "Business", icon: <FaBriefcase /> },
  { name: "Consulting", icon: <FaUserTie /> },
  { name: "Photography", icon: <FaHeart /> },
];


export const items: IInfo[] = [
  {
    title: "Expert hiring advisors",
    text: "Rely on a dedicated account manager to help you find the right talent and meet every project requirement.",
  },
  {
    title: "Satisfaction guarantee",
    text: "Order with confidence thanks to guaranteed refunds for incomplete deliveries.",
  },
  {
    title: "Advanced management tools",
    text: "Seamlessly integrate freelancers into your teams and projects.",
  },
  {
    title: "Flexible payment options",
    text: "Pay per project or choose hourly rates for long-term collaborations.",
  },
];


export const inputs: IInput[] = [
  {
    label: "Title",
    name: "title",
    required: true,
  },
  {
    label: "Cover Image",
    name: "coverImage",
    required: true,
    type: "file",
  },
  {
    label: "Images",
    name: "images",
    required: true,
    type: "file",
    multiple: true,
  },
  {
    label: "Number of Revisions",
    name: "packageRevisions",
    required: true,
    type: "number",
    min: 1,
  },
  {
    label: "Features (separate with commas)",
    name: "packageFeatures",
    required: true,
    type: "textarea",
  },
  {
    label: "Description",
    name: "description",
    required: true,
    type: "textarea",
  },
  {
    label: "Package Description",
    name: "packageDescription",
    required: true,
  },
  {
    label: "Package Title",
    name: "packageTitle",
    required: true,
  },
  {
    label: "Delivery Time (days)",
    name: "packageDuration",
    required: true,
    type: "number",
    min: 1,
    max: 90,
  },
  {
    label: "Price ($)",
    name: "packagePrice",
    type: "number",
    required: true,
    min: 1,
  },
];
