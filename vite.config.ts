import { defineApplicationConfig } from '@vben/vite-config';
import zipPack from 'vite-plugin-zip-pack';
import { name as packageName } from './package.json';
import { resolve } from 'node:path';

export const r = (...args) => resolve(__dirname, '.', ...args);
const getZipFileName = () => {
  return `${packageName}_${new Date().toLocaleString().replace(/\/|:/g, '').replace(/\s/g, '_')}`;
};

export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {
      include: [
        'echarts/core',
        'echarts/charts',
        'echarts/components',
        'echarts/renderers',
        'qrcode',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    server: {
      proxy: {
        '/basic-api': {
          target: 'http://localhost:8089',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/basic-api`), ''),
        },
      },
      open: false, // 项目启动后，自动打开
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    plugins: [
      zipPack({ outDir: 'out', outFileName: `${getZipFileName()}.zip`, pathPrefix: 'dist' }),
    ],
  },
});
