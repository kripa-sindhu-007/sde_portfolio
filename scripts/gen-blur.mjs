/**
 * Generates a blur placeholder for every blog cover.
 *
 * next/image can derive these automatically from *statically imported* images,
 * but covers are referenced by path (the slug decides the file), so they have to
 * be precomputed. Output is committed, so the build stays deterministic and no
 * image work happens at request time.
 *
 *   node scripts/gen-blur.mjs      # after adding or changing a cover
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BLOG_PUBLIC = path.join(process.cwd(), "public", "blog");
// lives inside blog-kit so the component can import it relatively and the kit
// stays self-contained when copied between repos
const OUT = path.join(process.cwd(), "src", "blog-kit", "blur.generated.json");

const map = {};

if (existsSync(BLOG_PUBLIC)) {
  for (const slug of await readdir(BLOG_PUBLIC)) {
    const dir = path.join(BLOG_PUBLIC, slug);
    for (const file of await readdir(dir)) {
      if (!file.endsWith(".png")) continue;
      const buf = await readFile(path.join(dir, file));
      // 16px wide is enough: it is displayed blurred and scaled up
      const tiny = await sharp(buf).resize(16).jpeg({ quality: 40 }).toBuffer();
      map[`/blog/${slug}/${file}`] = `data:image/jpeg;base64,${tiny.toString("base64")}`;
    }
  }
}

await mkdir(path.dirname(OUT), { recursive: true });
await writeFile(OUT, JSON.stringify(map, null, 2) + "\n");

const kb = (s) => (s.length / 1024).toFixed(1);
console.log(`wrote ${Object.keys(map).length} placeholders → src/blog-kit/blur.generated.json`);
for (const [k, v] of Object.entries(map)) console.log(`  ${k}  ${kb(v)} KB`);
