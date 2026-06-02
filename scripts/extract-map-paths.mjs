import fs from "fs";

const svg = fs.readFileSync("public/assets/quem_somos/mapa_norte1.svg", "utf8");
const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
console.log("count", paths.length);
