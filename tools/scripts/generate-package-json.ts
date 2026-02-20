import { readCachedProjectGraph } from '@nx/devkit';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const projectName = process.argv[2];

if (!projectName) {
  console.error('Usage: tsx tools/scripts/generate-package-json.ts <project-name>');
  process.exit(1);
}

const graph = readCachedProjectGraph();
const project = graph.nodes[projectName];

if (!project) {
  console.error(`Project "${projectName}" not found`);
  process.exit(1);
}

// Read root package.json
const rootPackageJson = JSON.parse(readFileSync('package.json', 'utf-8'));

// Get all dependencies (direct and transitive) for this project
const projectDeps = new Set<string>();

function collectDependencies(nodeName: string, visited = new Set<string>()) {
  if (visited.has(nodeName)) return;
  visited.add(nodeName);

  const deps = graph.dependencies[nodeName] || [];
  for (const dep of deps) {
    // External npm dependencies start with 'npm:'
    if (dep.target.startsWith('npm:')) {
      const packageName = dep.target.replace('npm:', '');
      projectDeps.add(packageName);
    } else {
      // Internal project dependency - recurse
      collectDependencies(dep.target, visited);
    }
  }
}

collectDependencies(projectName);

// Build minimal package.json with only required dependencies
const dependencies: Record<string, string> = {};

for (const dep of projectDeps) {
  if (rootPackageJson.dependencies?.[dep]) {
    dependencies[dep] = rootPackageJson.dependencies[dep];
  } else if (rootPackageJson.devDependencies?.[dep]) {
    // Some runtime deps might be in devDependencies (like prisma)
    dependencies[dep] = rootPackageJson.devDependencies[dep];
  }
}

const outputPath = join('dist', 'apps', projectName);
const outputPackageJson = {
  name: projectName,
  version: '1.0.0',
  private: true,
  dependencies,
};

// Ensure output directory exists
mkdirSync(outputPath, { recursive: true });

writeFileSync(
  join(outputPath, 'package.json'),
  JSON.stringify(outputPackageJson, null, 2)
);

console.log(`Generated package.json for ${projectName} with ${Object.keys(dependencies).length} dependencies`);
console.log(`Output: ${outputPath}/package.json`);