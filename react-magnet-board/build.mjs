#!/usr/bin/env zx
import { $ } from 'zx';

// eslint-disable-next-line @typescript-eslint/no-var-requires
let { name: packageName, version: packageVersion } = require(`./package.json`);

const BUILD_TIMESTAMP = new Date().toISOString();
await $`export BUILD_NUMBER`;
const buildNumberOutput = await $`echo $BUILD_NUMBER`;
const BUILD_NUMBER = buildNumberOutput.stdout.replace('\n', '');

const printBuildInfo = async () => {
  console.log('==== export HOME environment variable ====');
  console.log('> export HOME=/home/ci');
  await $`export HOME=/home/ci`;
  console.log('========== Build information 시작 ==========');
  const npmPublishRegistryOutput = await $`yarn config get npmPublishRegistry`;
  console.table({
    NPM_PUBLISH_REGISTY: npmPublishRegistryOutput.stdout.replace('\n', ''),
    PACKAGE_NAME: packageName,
    PACKAGE_VERSION: packageVersion,
    BUILD_NUMBER: BUILD_NUMBER,
    BUILD_TIMESTAMP: BUILD_TIMESTAMP,
  });
  console.log('========== Build information 완료 ==========');
};

const publish = async () => {
  console.log('========== projcet 빌드 시작 ==========');
  await $`yarn build`;
  console.log('========== project 빌드 완료 ==========');

  console.log('========== publish 시작 ==========');
  await $`yarn npm publish`;
  console.log('========== publish 완료 ==========');
};

try {
  console.time();
  await printBuildInfo();
  await publish();
  console.timeEnd();
} catch (e) {
  console.error('[에러 발생] : ', e.message);
  await $`exit 1`;
}
