# 📄 Project Context: ApertureDB

## 🎯 Mission
ApertureDB is an open-source, edge-native hardware database for the photography and cinematography industry. Its goal is to provide a highly accessible, programmatically valid, and community-maintained source of truth for camera and lens specifications.

## 🏗️ Architectural Philosophy: "Git-as-a-Database"
The project rejects traditional relational databases in favor of a static, compiled pipeline.

### Why Static?
1. **Performance**: API responses are pre-compiled JSON files served via CDN edges (Vercel, Cloudflare, etc.), resulting in sub-10ms response times.
2. **Version Control**: Every hardware spec change is tracked via Git commits, providing a full audit log of data changes.
3. **Validation**: Unlike a traditional DB where "garbage in" is common, ApertureDB uses a TypeScript/Zod compilation step. If the data doesn't match the physics-based schema, the "database" (the build) fails.
4. **Zero Cost**: Hosting static files is virtually free, ensuring the longevity of the open-source project.

## 🛠️ Technical Stack
- **Runtime**: [Bun](https://bun.sh/) (Selected for extreme performance in I/O and compilation).
- **Type System**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled, NodeNext module resolution).
- **Validation**: [Zod](https://zod.dev/) (Used for schema enforcement and type inference).
- **Workspace**: NPM Workspaces (Mono-repo structure).
- **CI/CD**: GitHub Actions (Automated compilation and deployment on PR).

## 📂 Repository Structure
- `data/`: The raw JSON "Database".
  - `/cameras`: Raw specs for camera bodies.
  - `/lenses`: Raw specs for glass.
- `packages/types`: The core data contracts. This package defines exactly what a "Camera" or "Lens" is.
- `apps/compiler`: The transformation engine. It reads `data/`, validates it, performs physics calculations (e.g., pixel pitch derivation), and outputs the static API.
- `dist/api/v1/`: The public-facing static API structure.

## 🧪 Data Governance & Math
The compiler doesn't just copy files; it enhances them.

### Physics Calculations
To reduce manual data entry errors, the compiler derives missing physical properties:
- **Pixel Pitch (µm)**: Calculated using `(Sensor Width (mm) / Horizontal Resolution) * 1000`.
- **Validation Logic**: A camera cannot be compiled if its sensor height is greater than its width (Landscape constraint) or if weights are negative.

### Development Standards
- **Testing**: Bun's native test runner (`bun test`) is used for unit testing schemas and compiler logic.
- **Build Hygiene**: Test files (`*.test.ts`) are excluded from the `tsc` build to keep `dist` clean.
- **ESM Compliance**: Due to `NodeNext` module resolution, relative imports in TypeScript must include the `.js` extension (e.g., `import { Foo } from "./foo.js"`).
- **Compiler behavior**: The compiler in `apps/compiler` runs once by default. The dev server only starts if `NODE_ENV` is set to `development`.

## 🌐 API Design (v1)
The API is designed to be REST-compliant but statically served.
- **Root**: `index.json` (Discovery endpoint).
- **Entities**: `/cameras/{id}.json`.
- **Extensions**: The dev server handles extension-less URLs, but the physical files exist as `.json`.

## 📈 Roadmap & Purpose
ApertureDB is intended to power:
1. **E-commerce**: Comparison engines for camera stores.
2. **Calculators**: Depth-of-field and Field-of-View calculators for cinematographers.
3. **EXIF Tooling**: Mapping internal metadata to physical hardware specs.
