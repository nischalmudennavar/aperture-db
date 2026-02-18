import { describe, expect, it } from "bun:test";
import { CameraSchema } from "./index.js";

describe("CameraSchema", () => {
  it("validates a correct camera object", () => {
    const validCamera = {
      id: "test-camera",
      brand: "TestBrand",
      model: "TestModel",
      sensor: {
        width_mm: 36,
        height_mm: 24,
        resolution_px_width: 6000,
        resolution_px_height: 4000,
      },
      mount: "TestMount",
      weight_g: 500,
    };

    const result = CameraSchema.safeParse(validCamera);
    expect(result.success).toBe(true);
  });

  it("fails on invalid camera object", () => {
    const invalidCamera = {
      id: "test-camera",
      // missing brand
      model: "TestModel",
      sensor: {
        width_mm: -10, // invalid negative width
        height_mm: 24,
        resolution_px_width: 6000,
        resolution_px_height: 4000,
      },
      mount: "TestMount",
      weight_g: 500,
    };

    const result = CameraSchema.safeParse(invalidCamera);
    expect(result.success).toBe(false);
  });
});
