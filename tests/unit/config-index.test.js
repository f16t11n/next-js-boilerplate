/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const fs = require('fs');


describe('config/index.js', () => {
  let originalEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
  });
  afterEach(() => {
    process.env = originalEnv;
    jest.resetModules();
  });

  it('deepMerge merges nested objects', () => {
    const config = require('../../config/index.js');
    const a = { foo: { bar: 1, baz: 2 }, arr: [1, 2] };
    const b = { foo: { baz: 3 }, arr: [3] };
    const result = config.deepMerge({ ...a }, b);
    expect(result.foo.bar).toBe(1);
    expect(result.foo.baz).toBe(3);
    expect(result.arr).toEqual([3]);
  });

  it('loads base config if no env config exists', () => {
    process.env.NODE_ENV = 'notreal';
    jest.resetModules();
    const config = require('../../config/index.js');
    expect(config.env).toBe('notreal');
  });

  it('loads env config if present', () => {
    // Create a fake env config file
    const envFile = path.join(__dirname, '../../config/config.testenv.js');
    fs.writeFileSync(envFile, 'module.exports = { testKey: 42 }');
    process.env.NODE_ENV = 'testenv';
    jest.resetModules();
    const config = require('../../config/index.js');
    expect(config.testKey).toBe(42);
    fs.unlinkSync(envFile);
  });
});
