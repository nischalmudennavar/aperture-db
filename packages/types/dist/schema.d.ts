import { z } from 'zod';
export declare const MountEnum: z.ZodEnum<["Sony E", "Canon RF", "Canon EF", "Nikon Z", "Nikon F", "Fujifilm X", "L-Mount", "PL Mount"]>;
export declare const SensorFormatEnum: z.ZodEnum<["Full Frame", "APS-C", "Micro Four Thirds", "Medium Format", "1-inch"]>;
export declare const HardwareSchema: z.ZodObject<{
    mount: z.ZodEnum<["Sony E", "Canon RF", "Canon EF", "Nikon Z", "Nikon F", "Fujifilm X", "L-Mount", "PL Mount"]>;
    weight_g: z.ZodNumber;
    dimensions: z.ZodObject<{
        width: z.ZodNumber;
        height: z.ZodNumber;
        depth: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        depth: number;
    }, {
        width: number;
        height: number;
        depth: number;
    }>;
    material: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    weather_sealed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    storage_slots: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
    weight_g: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    material: string;
    weather_sealed: boolean;
    storage_slots: string[];
}, {
    mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
    weight_g: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    material?: string | undefined;
    weather_sealed?: boolean | undefined;
    storage_slots?: string[] | undefined;
}>;
export declare const SensorSchema: z.ZodObject<{
    format: z.ZodEnum<["Full Frame", "APS-C", "Micro Four Thirds", "Medium Format", "1-inch"]>;
    resolution_mp: z.ZodNumber;
    width_px: z.ZodNumber;
    height_px: z.ZodNumber;
    physical_width_mm: z.ZodNumber;
    physical_height_mm: z.ZodNumber;
    pixel_pitch_um: z.ZodOptional<z.ZodNumber>;
    diagonal_mm: z.ZodOptional<z.ZodNumber>;
    stabilization_stops: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
    resolution_mp: number;
    width_px: number;
    height_px: number;
    physical_width_mm: number;
    physical_height_mm: number;
    pixel_pitch_um?: number | undefined;
    diagonal_mm?: number | undefined;
    stabilization_stops?: number | undefined;
}, {
    format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
    resolution_mp: number;
    width_px: number;
    height_px: number;
    physical_width_mm: number;
    physical_height_mm: number;
    pixel_pitch_um?: number | undefined;
    diagonal_mm?: number | undefined;
    stabilization_stops?: number | undefined;
}>;
export declare const ExposureSchema: z.ZodObject<{
    iso_native: z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>;
    iso_expanded: z.ZodOptional<z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
    }, {
        min: number;
        max: number;
    }>>;
    shutter_mechanical: z.ZodObject<{
        min_seconds: z.ZodNumber;
        max_denominator: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min_seconds: number;
        max_denominator: number;
    }, {
        min_seconds: number;
        max_denominator: number;
    }>;
    shutter_electronic: z.ZodOptional<z.ZodObject<{
        min_seconds: z.ZodNumber;
        max_denominator: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min_seconds: number;
        max_denominator: number;
    }, {
        min_seconds: number;
        max_denominator: number;
    }>>;
    max_continuous_fps: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    iso_native: {
        min: number;
        max: number;
    };
    shutter_mechanical: {
        min_seconds: number;
        max_denominator: number;
    };
    max_continuous_fps: number;
    iso_expanded?: {
        min: number;
        max: number;
    } | undefined;
    shutter_electronic?: {
        min_seconds: number;
        max_denominator: number;
    } | undefined;
}, {
    iso_native: {
        min: number;
        max: number;
    };
    shutter_mechanical: {
        min_seconds: number;
        max_denominator: number;
    };
    max_continuous_fps: number;
    iso_expanded?: {
        min: number;
        max: number;
    } | undefined;
    shutter_electronic?: {
        min_seconds: number;
        max_denominator: number;
    } | undefined;
}>;
export declare const ConnectivitySchema: z.ZodObject<{
    ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    video_max_resolution: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    ports: string[];
    video_max_resolution: string;
}, {
    ports?: string[] | undefined;
    video_max_resolution?: string | undefined;
}>;
export declare const CameraSchema: z.ZodObject<{
    id: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    hardware: z.ZodObject<{
        mount: z.ZodEnum<["Sony E", "Canon RF", "Canon EF", "Nikon Z", "Nikon F", "Fujifilm X", "L-Mount", "PL Mount"]>;
        weight_g: z.ZodNumber;
        dimensions: z.ZodObject<{
            width: z.ZodNumber;
            height: z.ZodNumber;
            depth: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
            depth: number;
        }, {
            width: number;
            height: number;
            depth: number;
        }>;
        material: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        weather_sealed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        storage_slots: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
        weight_g: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        material: string;
        weather_sealed: boolean;
        storage_slots: string[];
    }, {
        mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
        weight_g: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        material?: string | undefined;
        weather_sealed?: boolean | undefined;
        storage_slots?: string[] | undefined;
    }>;
    sensor: z.ZodObject<{
        format: z.ZodEnum<["Full Frame", "APS-C", "Micro Four Thirds", "Medium Format", "1-inch"]>;
        resolution_mp: z.ZodNumber;
        width_px: z.ZodNumber;
        height_px: z.ZodNumber;
        physical_width_mm: z.ZodNumber;
        physical_height_mm: z.ZodNumber;
        pixel_pitch_um: z.ZodOptional<z.ZodNumber>;
        diagonal_mm: z.ZodOptional<z.ZodNumber>;
        stabilization_stops: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
        resolution_mp: number;
        width_px: number;
        height_px: number;
        physical_width_mm: number;
        physical_height_mm: number;
        pixel_pitch_um?: number | undefined;
        diagonal_mm?: number | undefined;
        stabilization_stops?: number | undefined;
    }, {
        format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
        resolution_mp: number;
        width_px: number;
        height_px: number;
        physical_width_mm: number;
        physical_height_mm: number;
        pixel_pitch_um?: number | undefined;
        diagonal_mm?: number | undefined;
        stabilization_stops?: number | undefined;
    }>;
    exposure: z.ZodObject<{
        iso_native: z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>;
        iso_expanded: z.ZodOptional<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
        }, {
            min: number;
            max: number;
        }>>;
        shutter_mechanical: z.ZodObject<{
            min_seconds: z.ZodNumber;
            max_denominator: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min_seconds: number;
            max_denominator: number;
        }, {
            min_seconds: number;
            max_denominator: number;
        }>;
        shutter_electronic: z.ZodOptional<z.ZodObject<{
            min_seconds: z.ZodNumber;
            max_denominator: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min_seconds: number;
            max_denominator: number;
        }, {
            min_seconds: number;
            max_denominator: number;
        }>>;
        max_continuous_fps: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        iso_native: {
            min: number;
            max: number;
        };
        shutter_mechanical: {
            min_seconds: number;
            max_denominator: number;
        };
        max_continuous_fps: number;
        iso_expanded?: {
            min: number;
            max: number;
        } | undefined;
        shutter_electronic?: {
            min_seconds: number;
            max_denominator: number;
        } | undefined;
    }, {
        iso_native: {
            min: number;
            max: number;
        };
        shutter_mechanical: {
            min_seconds: number;
            max_denominator: number;
        };
        max_continuous_fps: number;
        iso_expanded?: {
            min: number;
            max: number;
        } | undefined;
        shutter_electronic?: {
            min_seconds: number;
            max_denominator: number;
        } | undefined;
    }>;
    connectivity: z.ZodObject<{
        ports: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        video_max_resolution: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        ports: string[];
        video_max_resolution: string;
    }, {
        ports?: string[] | undefined;
        video_max_resolution?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    brand: string;
    model: string;
    hardware: {
        mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
        weight_g: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        material: string;
        weather_sealed: boolean;
        storage_slots: string[];
    };
    sensor: {
        format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
        resolution_mp: number;
        width_px: number;
        height_px: number;
        physical_width_mm: number;
        physical_height_mm: number;
        pixel_pitch_um?: number | undefined;
        diagonal_mm?: number | undefined;
        stabilization_stops?: number | undefined;
    };
    exposure: {
        iso_native: {
            min: number;
            max: number;
        };
        shutter_mechanical: {
            min_seconds: number;
            max_denominator: number;
        };
        max_continuous_fps: number;
        iso_expanded?: {
            min: number;
            max: number;
        } | undefined;
        shutter_electronic?: {
            min_seconds: number;
            max_denominator: number;
        } | undefined;
    };
    connectivity: {
        ports: string[];
        video_max_resolution: string;
    };
}, {
    id: string;
    brand: string;
    model: string;
    hardware: {
        mount: "Sony E" | "Canon RF" | "Canon EF" | "Nikon Z" | "Nikon F" | "Fujifilm X" | "L-Mount" | "PL Mount";
        weight_g: number;
        dimensions: {
            width: number;
            height: number;
            depth: number;
        };
        material?: string | undefined;
        weather_sealed?: boolean | undefined;
        storage_slots?: string[] | undefined;
    };
    sensor: {
        format: "Full Frame" | "APS-C" | "Micro Four Thirds" | "Medium Format" | "1-inch";
        resolution_mp: number;
        width_px: number;
        height_px: number;
        physical_width_mm: number;
        physical_height_mm: number;
        pixel_pitch_um?: number | undefined;
        diagonal_mm?: number | undefined;
        stabilization_stops?: number | undefined;
    };
    exposure: {
        iso_native: {
            min: number;
            max: number;
        };
        shutter_mechanical: {
            min_seconds: number;
            max_denominator: number;
        };
        max_continuous_fps: number;
        iso_expanded?: {
            min: number;
            max: number;
        } | undefined;
        shutter_electronic?: {
            min_seconds: number;
            max_denominator: number;
        } | undefined;
    };
    connectivity: {
        ports?: string[] | undefined;
        video_max_resolution?: string | undefined;
    };
}>;
export type Camera = z.infer<typeof CameraSchema>;
export type Hardware = z.infer<typeof HardwareSchema>;
export type Sensor = z.infer<typeof SensorSchema>;
export type Exposure = z.infer<typeof ExposureSchema>;
export type Connectivity = z.infer<typeof ConnectivitySchema>;
