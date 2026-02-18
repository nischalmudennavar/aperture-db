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
  console.log('🚀 Starting ApertureDB compilation...');

  // Ensure output directories exist
  await fs.mkdir(CAMERAS_OUTPUT_DIR, { recursive: true });

  const files = await fs.readdir(DATA_CAMERAS);
  const jsonFiles = files.filter(f => f.endsWith('.json'));

  const cameraIds: string[] = [];

  for (const file of jsonFiles) {
    const rawData = await fs.readFile(path.join(DATA_CAMERAS, file), 'utf-8');
    const json = JSON.parse(rawData);

    // Validate
    const validationResult = CameraSchema.safeParse(json);
    if (!validationResult.success) {
      console.error(`❌ Validation failed for ${file}:`, validationResult.error.format());
      process.exit(1);
    }

    const camera = validationResult.data;

    // Transformation Logic: Derive pixel_pitch_um if missing
    if (!camera.sensor.pixel_pitch_um) {
      /**
       * Pixel Pitch (µm) = (Sensor Width (mm) / Horizontal Resolution) * 1000
       */
      camera.sensor.pixel_pitch_um = (camera.sensor.width_mm / camera.sensor.resolution_px_width) * 1000;
      console.log(`✨ Derived pixel_pitch_um for ${camera.id}: ${camera.sensor.pixel_pitch_um.toFixed(2)}µm`);
    }

    // Write to output
    const outputPath = path.join(CAMERAS_OUTPUT_DIR, `${camera.id}.json`);
    await fs.writeFile(outputPath, JSON.stringify(camera, null, 2));
    cameraIds.push(camera.id);
    console.log(`✅ Compiled ${camera.id}`);
  }

  // Generate Master Index
  const masterIndex = {
    cameras: cameraIds,
    count: cameraIds.length,
    updated_at: new Date().toISOString(),
  };

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(masterIndex, null, 2));
  console.log(`📦 Master index generated with ${cameraIds.length} cameras.`);
  console.log('🏁 Compilation complete!');
}

// Initial compile
await compile();

// If running in Bun, we can also start a simple static file server for dev
// We only do this if explicitly asked or in non-CI environments
if (process.env.NODE_ENV === 'development') {
  const PORT = 3000;
  console.log(`🌐 Dev server running at http://localhost:${PORT}`);
  
  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);
      let pathname = url.pathname;

      // Default root to the API index
      if (pathname === '/' || pathname === '/api/v1' || pathname === '/api/v1/') {
        pathname = '/api/v1/index.json';
      }

      // Automatically append .json if missing (for clean URLs)
      if (!pathname.endsWith('.json')) {
        pathname += '.json';
      }

      // The dist folder is our static root
      // dist/api/v1/index.json
      // dist/api/v1/cameras/sony-a7iv.json
      const filePath = path.join(ROOT, 'dist', pathname);
      
      try {
        const file = Bun.file(filePath);
        if (await file.exists()) {
          return new Response(file, {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' // Enable CORS for local testing
            }
          });
        }
        
        console.warn(`[404] ${url.pathname} -> Tried: ${filePath}`);
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
