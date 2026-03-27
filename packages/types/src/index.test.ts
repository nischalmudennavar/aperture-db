import { describe, expect, it } from "bun:test";
import { CameraSchema } from "./index.js";

describe("CameraSchema", () => {
  it("validates a correct camera object", () => {
    const validCamera = {
      id: "test-camera",
      brand: "TestBrand",
      model: "TestModel",
      hardware: {
        mount: "Sony E",
        weight_g: 500,
        dimensions: {
          width: 100,
          height: 70,
          depth: 50
        }
      },
      sensor: {
        format: "Full Frame",
        resolution_mp: 24,
        width_px: 6000,
        height_px: 4000,
        physical_width_mm: 36,
        physical_height_mm: 24
      },
      exposure: {
        iso_native: {
          min: 100,
          max: 32000
        },
        shutter_mechanical: {
          min_seconds: 30,
          max_denominator: 8000
        },
        max_continuous_fps: 10
      },
      connectivity: {
        ports: ["USB-C"],
        video_max_resolution: "4K"
      }
    };

    const result = CameraSchema.safeParse(validCamera);
    if (!result.success) {
      console.error(JSON.stringify(result.error.format(), null, 2));
    }
    expect(result.success).toBe(true);
  });

  it("fails on invalid camera object", () => {
    const invalidCamera = {
      id: "Test Camera", // invalid kebab-case
      brand: "TestBrand",
      model: "TestModel",
      hardware: {
        mount: "Invalid Mount", // invalid enum
        weight_g: -500, // invalid negative
        dimensions: {
          width: 100,
          height: 70,
          depth: 50
        }
      },
      sensor: {
        format: "Full Frame",
        resolution_mp: 24,
        width_px: 6000,
        height_px: 4000,
        physical_width_mm: 36,
        physical_height_mm: 24
      },
      exposure: {
        iso_native: {
          min: 100,
          max: 32000
        },
        shutter_mechanical: {
          min_seconds: 30,
          max_denominator: 8000
        },
        max_continuous_fps: 10
      },
      connectivity: {
        ports: ["USB-C"],
        video_max_resolution: "4K"
      }
    };

    const result = CameraSchema.safeParse(invalidCamera);
    expect(result.success).toBe(false);
  });
});
