import { z } from 'zod';

/**
 * Camera Schema
 * 
 * Physical constraints and sensor specifications.
 * 
 * Physics Math:
 * - Pixel Pitch (µm) = (Sensor Width (mm) / Horizontal Resolution) * 1000
 * - This describes the distance between the center of two pixels. 
 * - Larger pixel pitch generally results in better low-light performance (higher SNR).
 */
export const CameraSchema = z.object({
  id: z.string().describe('Unique identifier (slug)'),
  brand: z.string(),
  model: z.string(),
  sensor: z.object({
    width_mm: z.number().positive().describe('Sensor width in millimeters'),
    height_mm: z.number().positive().describe('Sensor height in millimeters'),
    resolution_px_width: z.number().int().positive().describe('Horizontal pixel count'),
    resolution_px_height: z.number().int().positive().describe('Vertical pixel count'),
    pixel_pitch_um: z.number().positive().optional().describe('Derived pixel pitch in micrometers'),
  }),
  mount: z.string(),
  weight_g: z.number().positive(),
});

/**
 * Lens Schema
 * 
 * Optical properties and mechanical specifications.
 */
export const LensSchema = z.object({
  id: z.string().describe('Unique identifier (slug)'),
  brand: z.string(),
  model: z.string(),
  focal_length_mm: z.number().positive(),
  max_aperture: z.number().positive(),
  mount: z.string(),
  weight_g: z.number().positive(),
});

export type Camera = z.infer<typeof CameraSchema>;
export type Lens = z.infer<typeof LensSchema>;
