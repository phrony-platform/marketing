import fs from 'node:fs';
import path from 'node:path';

import { PHRONY_RUNTIME_IMAGE } from '@/lib/project-urls';

const composePath = path.join(process.cwd(), 'src/content/runtime/docker-compose.yml');

export const RUNTIME_DOCKER_COMPOSE_PATH = '/runtime/docker-compose.yml';

export const RUNTIME_DOCKER_COMPOSE = fs.readFileSync(composePath, 'utf8');

export { PHRONY_RUNTIME_IMAGE };
