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
export declare const CameraSchema: z.ZodObject<{
    id: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    sensor: z.ZodObject<{
        width_mm: z.ZodNumber;
        height_mm: z.ZodNumber;
        resolution_px_width: z.ZodNumber;
        resolution_px_height: z.ZodNumber;
        pixel_pitch_um: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        width_mm: number;
        height_mm: number;
        resolution_px_width: number;
        resolution_px_height: number;
        pixel_pitch_um?: number | undefined;
    }, {
        width_mm: number;
        height_mm: number;
        resolution_px_width: number;
        resolution_px_height: number;
        pixel_pitch_um?: number | undefined;
    }>;
    mount: z.ZodString;
    weight_g: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    brand: string;
    model: string;
    sensor: {
        width_mm: number;
        height_mm: number;
        resolution_px_width: number;
        resolution_px_height: number;
        pixel_pitch_um?: number | undefined;
    };
    mount: string;
    weight_g: number;
}, {
    id: string;
    brand: string;
    model: string;
    sensor: {
        width_mm: number;
        height_mm: number;
        resolution_px_width: number;
        resolution_px_height: number;
        pixel_pitch_um?: number | undefined;
    };
    mount: string;
    weight_g: number;
}>;
/**
 * Lens Schema
 *
 * Optical properties and mechanical specifications.
 */
export declare const LensSchema: z.ZodObject<{
    id: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    focal_length_mm: z.ZodNumber;
    max_aperture: z.ZodNumber;
    mount: z.ZodString;
    weight_g: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    brand: string;
    model: string;
    mount: string;
    weight_g: number;
    focal_length_mm: number;
    max_aperture: number;
}, {
    id: string;
    brand: string;
    model: string;
    mount: string;
    weight_g: number;
    focal_length_mm: number;
    max_aperture: number;
}>;
export type Camera = z.infer<typeof CameraSchema>;
export type Lens = z.infer<typeof LensSchema>;
