# 📷 ApertureDB

ApertureDB is an open-source, edge-native static API providing hardware specifications for cameras and lenses. It follows a **"Git-as-a-Database"** model, where raw data is managed in Git, validated via TypeScript, and served as a high-performance static REST API.

## 🏗️ System Architecture

- **Source Data**: Raw JSON files stored in `data/cameras` and `data/lenses`.
- **Validation**: Strict [Zod](https://zod.dev/) schemas in `packages/types` ensure data integrity.
- **Compiler**: A Node.js pipeline in `apps/compiler` that:
  - Validates raw data against schemas.
  - Derives missing physical properties (e.g., Pixel Pitch) using physics math.
  - Outputs a minified, static JSON API to `dist/api/v1/`.

## 🚀 Getting Started

### Prerequisites
- **Bun 1.1+** (Primary runtime and task runner)
- Node.js 20+ (Optional, for npm compatibility)
- npm 9+

### Installation
```bash
npm install
```

### Build the API
This command validates the data, runs the compiler, and generates the `dist` folder. It uses Bun internally for high-performance processing.
```bash
npm run build
```

## 📖 API Reference (v1)

The API is served as static JSON files. All endpoints are relative to the deployment root.

### 1. Discovery Index
Returns an array of all available camera IDs.
- **Endpoint**: `/api/v1/index.json`
- **Format**: 
  ```json
  {
    "cameras": ["sony-a7iv", "canon-eos-r6"],
    "count": 2,
    "updated_at": "2026-02-19T00:00:00.000Z"
  }
  ```

### 2. Camera Details
Returns full specifications for a specific camera.
- **Endpoint**: `/api/v1/cameras/{id}.json`
- **Example**: `/api/v1/cameras/sony-a7iv.json`
- **Schema Highlights**:
  - `pixel_pitch_um`: Automatically derived if not provided in source.
  - `sensor`: Includes physical dimensions in mm and pixel resolution.

## ✍️ Contributing Data

To add a new camera, create a JSON file in `data/cameras/`.

**Example: `data/cameras/fujifilm-x-t5.json`**
```json
{
  "id": "fujifilm-x-t5",
  "brand": "Fujifilm",
  "model": "X-T5",
  "sensor": {
    "width_mm": 23.5,
    "height_mm": 15.7,
    "resolution_px_width": 7728,
    "resolution_px_height": 5152
  },
  "mount": "Fujifilm X",
  "weight_g": 557
}
```

> **Note**: You don't need to calculate `pixel_pitch_um`. The compiler handles the math:
> `Pixel Pitch (µm) = (Sensor Width (mm) / Horizontal Resolution) * 1000`

## 🛠️ Development

- **`packages/types`**: Define the data contracts.
- **`apps/compiler`**: Modify the transformation logic or API output structure.
- **`data/`**: The source of truth for all hardware specs.

## 📜 License
MIT