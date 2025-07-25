// src/components/add-device/utils.js
import { z } from 'zod'; // Impor Zod

// Definisi skema validasi untuk data perangkat/kamera
export const deviceSchema = z.object({
  // Bidang 'deviceName':
  // - Harus berupa string
  // - Minimal 2 karakter
  // - Maksimal 50 karakter
  deviceName: z.string().min(2, "Nama perangkat minimal 2 karakter.").max(50, "Nama perangkat maksimal 50 karakter."),

  // Bidang 'streamUrl':
  // - Opsional (bisa ada atau tidak)
  // - Jika ada, harus berupa URL yang valid
  // - `.or(z.literal(''))`: Memungkinkan bidang ini juga berupa string kosong jika tidak diisi,
  //   selain menjadi URL yang valid atau undefined. Ini berguna untuk input opsional.
  streamUrl: z.string().url("URL stream tidak valid.").optional().or(z.literal('')),

  // Bidang 'cameraType':
  // - Opsional (bisa ada atau tidak)
  // - Harus berupa string
  cameraType: z.string().optional(),
});

// Anda bisa menambahkan skema atau fungsi utilitas lain yang relevan dengan perangkat di sini.