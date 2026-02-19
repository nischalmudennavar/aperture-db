import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { CameraSchema } from '@aperturedb/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../../../');
const DATA_CAMERAS = path.join(ROOT, 'data/cameras');
const OUTPUT_DIR = path.join(ROOT, 'dist/api/v1');
const CAMERAS_OUTPUT_DIR = path.join(OUTPUT_DIR, 'cameras');

async function compile() {
  console.log('🚀 Starting ApertureDB compilation (Agnostic Schema)...');

  // Ensure output directories exist
  await fs.mkdir(CAMERAS_OUTPUT_DIR, { recursive: true });

  const files = await fs.readdir(DATA_CAMERAS);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  const cameraIds: string[] = [];

  for (const file of jsonFiles) {
    const rawData = await fs.readFile(path.join(DATA_CAMERAS, file), 'utf-8');
    const json = JSON.parse(rawData);

    // Validate against the new schema
    const validationResult = CameraSchema.safeParse(json);
    if (!validationResult.success) {
      console.error(`❌ Validation failed for ${file}:`, JSON.stringify(validationResult.error.format(), null, 2));
      process.exit(1);
    }

    const camera = validationResult.data;

    // --- Physics Derivations ---

    // 1. Pixel Pitch (µm) = (Sensor Width (mm) / Horizontal Resolution) * 1000
    if (!camera.sensor.pixel_pitch_um) {
      camera.sensor.pixel_pitch_um = (camera.sensor.physical_width_mm / camera.sensor.width_px) * 1000;
      console.log(`✨ Derived pixel_pitch_um for ${camera.id}: ${camera.sensor.pixel_pitch_um.toFixed(2)}µm`);
    }

    // 2. Sensor Diagonal (mm) = sqrt(width^2 + height^2)
    if (!camera.sensor.diagonal_mm) {
      camera.sensor.diagonal_mm = Math.sqrt(
        Math.pow(camera.sensor.physical_width_mm, 2) + 
        Math.pow(camera.sensor.physical_height_mm, 2)
      );
      console.log(`📏 Derived diagonal_mm for ${camera.id}: ${camera.sensor.diagonal_mm.toFixed(2)}mm`);
    }

    // Write to output (Minified)
    const outputPath = path.join(CAMERAS_OUTPUT_DIR, `${camera.id}.json`);
    await fs.writeFile(outputPath, JSON.stringify(camera));
    cameraIds.push(camera.id);
    console.log(`✅ Compiled ${camera.id}`);
  }

  // Generate Master Index
  const masterIndex = {
    cameras: cameraIds,
    count: cameraIds.length,
    updated_at: new Date().toISOString(),
  };

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(masterIndex));
  console.log(`📦 Master index generated with ${cameraIds.length} cameras.`);
  console.log('🏁 Compilation complete!');
}

// Initial compile
await compile();

// Dev server
if (process.env.NODE_ENV === 'development') {
  const PORT = 3000;
  console.log(`🌐 Dev server running at http://localhost:${PORT}`);
  
  // @ts-ignore
  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      if (pathname === '/' || pathname === '/api/v1' || pathname === '/api/v1/') {
        pathname = '/api/v1/index.json';
      }

      if (!pathname.endsWith('.json')) {
        pathname += '.json';
      }

      const filePath = path.join(ROOT, 'dist', pathname);
      
      try {
        // @ts-ignore
        const file = Bun.file(filePath);
        if (await file.exists()) {
          return new Response(file, {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' 
            }
          });
        }
        
        return new Response(JSON.stringify({ error: 'Not Found', path: url.pathname }), { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    },
  });
}
