import { z } from "zod";

// Base employee schema
export const employeeBaseSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone_number: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
  type: z.enum(["courier", "admin"], {
    required_error: "Pilih tipe karyawan",
  }),
  branch_id: z.coerce.number().min(1, "Pilih cabang"),
});

// Validation schema for creating employee
export const createEmployeeSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib di isi")
    .email("Format email tidak valid"),
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone_number: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit"),
  type: z.enum(["courier", "admin"], {
    required_error: "Tipe karyawan wajib di isi",
    invalid_type_error: "Tipe karyawan harus Kurir atau Admin",
  }),
  role_id: z.coerce.number().min(1, "Role wajib di isi"),
  branch_id: z.coerce.number().min(1, "Branch wajib di isi"),
  password: z
    .string()
    .min(8, "Password minimal 8 digit")
    .max(50, "Password maksimal 50  digit"),
});

// Validation schema for updating employee
export const updateEmployeeSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib di isi")
    .email("Format email tidak valid")
    .optional(),
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter")
    .optional(),
  phone_number: z
    .string()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(15, "Nomor telepon maksimal 15 digit")
    .optional(),
  type: z
    .enum(["courier", "admin"], {
      invalid_type_error: "Tipe karyawan harus Kurir atau Admin",
    })
    .optional(),
  role_id: z.coerce.number().min(1, "Role wajib di isi").optional(),
  branch_id: z.coerce.number().min(1, "Branch wajib di isi").optional(),
  password: z
    .string()
    .min(8, "Password minimal 8 digit")
    .max(50, "Password maksimal 50  digit")
    .optional()
    .or(z.literal("")), // Allow empty string for optional password
});

// Validation schema for employee branch assignment
export const createEmployeeBranchSchema = z.object({
  user_id: z.number().min(1, "User wajib di isi"),
  branch_id: z.number().min(1, "Branch wajib di isi"),
});

// Type interface for form data
export type CreateEmployeeFormData = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeFormData = z.infer<typeof updateEmployeeSchema>;
export type createEmployeeBranchFormData = z.infer<
  typeof createEmployeeBranchSchema
>;
