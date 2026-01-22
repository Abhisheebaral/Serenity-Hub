import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(2, { message: "Name should be at least 2 characters" }),

    username: z
      .string()
      .nonempty({ message: "Username is required" })
      .min(3, { message: "Username should be at least 3 characters" }),

    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Email should be valid" }),

    phone: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(/^\d{10}$/, { message: "Phone must be 10 digits" }),

    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password should be at least 6 characters" }),

    confirmPassword: z.string().nonempty({ message: "Confirm Password is required" }),

    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
