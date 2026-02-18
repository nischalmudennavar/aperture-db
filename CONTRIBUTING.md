# 🤝 Contributing to ApertureDB

Thank you for your interest in contributing! ApertureDB relies on community-maintained data to remain the most accurate hardware database for cinematography and photography.

## 📐 Data Philosophy
We prioritize **physical accuracy** over marketing fluff. Every piece of data in this repository must be verifiable via manufacturer whitepapers or technical specifications.

---

## 🛠️ Getting Started

### 1. Setup Your Environment
You will need [Bun](https://bun.sh/) installed.
```bash
git clone https://github.com/your-username/aperture-db.git
cd aperture-db
npm install
```

### 2. Local Validation
Run the compiler in watch mode while you add data. It will immediately tell you if your JSON is invalid.
```bash
npm run dev
```

---

## 📸 Adding a Camera
Create a new file in `data/cameras/{slug}.json`.

### Schema Requirements
- **ID**: Must be a URL-safe slug (e.g., `sony-a7rv`).
- **Sensor Dimensions**: Must be in millimeters (`width_mm`, `height_mm`).
- **Resolution**: Total pixel count, not effective megapixels.

### Example Template
```json
{
  "id": "canon-eos-r5",
  "brand": "Canon",
  "model": "EOS R5",
  "sensor": {
    "width_mm": 36.0,
    "height_mm": 24.0,
    "resolution_px_width": 8192,
    "resolution_px_height": 5464
  },
  "mount": "Canon RF",
  "weight_g": 738
}
```

> **Physics Note**: Do NOT manually calculate `pixel_pitch_um`. Our compiler derives this mathematically from the sensor width and resolution to ensure 100% precision.

---

## 🔍 Validation Rules
Our CI/CD pipeline enforces strict rules. Your PR will fail if:
1. **Schema Mismatch**: Missing required fields or wrong data types.
2. **Physical Impossibility**: Sensor height cannot be greater than width.
3. **Duplicate ID**: Every hardware piece must have a unique slug.
4. **Negative Values**: Weights and dimensions must be positive numbers.

---

## 🚀 Workflow
1. **Fork** the repository.
2. **Create a branch** for your hardware entry (`data/add-fujifilm-x100vi`).
3. **Commit** your JSON file.
4. **Verify** locally using `npm run build` and `npm test`.
5. **Open a Pull Request**.

## 📜 Code of Conduct
ApertureDB is a collaborative technical resource. Please ensure all discussions in PRs remain professional and focused on data accuracy.
