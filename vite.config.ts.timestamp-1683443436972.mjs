// vite.config.ts
import { defineConfig } from "file:///D:/%E5%AD%A6%E4%B9%A0/2022-2023/%E5%88%9B%E6%96%B0%E5%AE%9E%E8%B7%B5%E4%B8%8B/air-observer/node_modules/.pnpm/registry.npmmirror.com+vite@4.2.0_cjr6shcfhu7mk6dmispzab7gzy/node_modules/vite/dist/node/index.js";
import react from "file:///D:/%E5%AD%A6%E4%B9%A0/2022-2023/%E5%88%9B%E6%96%B0%E5%AE%9E%E8%B7%B5%E4%B8%8B/air-observer/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-react@3.1.0_vite@4.2.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\\u5B66\u4E60\\2022-2023\\\u521B\u65B0\u5B9E\u8DF5\u4E0B\\air-observer";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      find: "@",
      replacement: path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/charts/": {
        changeOrigin: true,
        target: "http://192.168.210.93:5000/"
      },
      "/aliyunRegion/": {
        changeOrigin: true,
        target: "https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json",
        headers: {
          referer: ""
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTVCNjZcdTRFNjBcXFxcMjAyMi0yMDIzXFxcXFx1NTIxQlx1NjVCMFx1NUI5RVx1OERGNVx1NEUwQlxcXFxhaXItb2JzZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1NUI2Nlx1NEU2MFxcXFwyMDIyLTIwMjNcXFxcXHU1MjFCXHU2NUIwXHU1QjlFXHU4REY1XHU0RTBCXFxcXGFpci1vYnNlcnZlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU1JUFEJUE2JUU0JUI5JUEwLzIwMjItMjAyMy8lRTUlODglOUIlRTYlOTYlQjAlRTUlQUUlOUUlRTglQjclQjUlRTQlQjglOEIvYWlyLW9ic2VydmVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgZmluZDogJ0AnLFxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2NoYXJ0cy8nOiB7XG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMjEwLjkzOjUwMDAvJ1xuICAgICAgfSxcbiAgICAgICcvYWxpeXVuUmVnaW9uLyc6IHtcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICB0YXJnZXQ6ICdodHRwczovL2d3LmFsaXBheW9iamVjdHMuY29tL29zL2FsaXNpcy9nZW8tZGF0YS12MC4xLjEvYWRtaW5pc3RyYXRpdmUtZGF0YS9hcmVhLWxpc3QuanNvbicsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICByZWZlcmVyOiAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLG9CQUFvQjtBQUN2WCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsUUFDVixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsUUFDaEIsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFVBQ1AsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
