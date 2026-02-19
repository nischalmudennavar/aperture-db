import { z } from 'zod';

export const MountEnum = z.enum([
  "Sony E",
  "Canon RF",
  "Canon EF",
  "Nikon Z",
  "Nikon F",
  "Fujifilm X",
  "L-Mount",
  "PL Mount"
]);

export const SensorFormatEnum = z.enum([
  "Full Frame",
  "APS-C",
  "Micro Four Thirds",
  "Medium Format",
  "1-inch"
]);

export const HardwareSchema = z.object({
  mount: MountEnum,
  weight_g: z.number().positive(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    depth: z.number().positive(),
  }),
  material: z.string().optional().default("Unknown"),
  weather_sealed: z.boolean().optional().default(false),
  storage_slots: z.array(z.string()).optional().default([]),
});

export const SensorSchema = z.object({
  format: SensorFormatEnum,
  resolution_mp: z.number().positive(),
  width_px: z.number().int().positive(),
  height_px: z.number().int().positive(),
  physical_width_mm: z.number().positive(),
  physical_height_mm: z.number().positive(),
  pixel_pitch_um: z.number().positive().optional(),
  diagonal_mm: z.number().positive().optional(),
  stabilization_stops: z.number().nonnegative().optional(),
});

export const ExposureSchema = z.object({
  iso_native: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }),
  iso_expanded: z.object({
    min: z.number().int().positive(),
    max: z.number().int().positive(),
  }).optional(),
  shutter_mechanical: z.object({
    min_seconds: z.number().positive(),
    max_denominator: z.number().int().positive(),
  }),
  shutter_electronic: z.object({
    min_seconds: z.number().positive(),
    max_denominator: z.number().int().positive(),
  }).optional(),
  max_continuous_fps: z.number().positive(),
});

export const ConnectivitySchema = z.object({
  ports: z.array(z.string()).optional().default([]),
  video_max_resolution: z.string().optional().default("Unknown"),
});

export const CameraSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).describe('Strict kebab-case ID'),
  brand: z.string(),
  model: z.string(),
  hardware: HardwareSchema,
  sensor: SensorSchema,
  exposure: ExposureSchema,
  connectivity: ConnectivitySchema,
});

export type Camera = z.infer<typeof CameraSchema>;
export type Hardware = z.infer<typeof HardwareSchema>;
export type Sensor = z.infer<typeof SensorSchema>;
export type Exposure = z.infer<typeof ExposureSchema>;
export type Connectivity = z.infer<typeof ConnectivitySchema>;
