/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/collhub",
        permanent: true,
      },
      {
        source: "/sdk",
        destination: "https://www.npmjs.com/package/collhub",
        permanent: true,
      },
      {
        source: "/npm",
        destination: "https://www.npmjs.com/package/collhub",
        permanent: true,
      },
      {
        source: "/svelte",
        destination: "https://github.com/tglide/collhub-svelte",
        permanent: false,
      },
      {
        source: "/vue",
        destination: "https://github.com/naveennaidu/collhub-vue",
        permanent: false,
      },
      {
        source: "/vscode",
        destination:
          "https://marketplace.visualstudio.com/items?itemName=bennykok.collhub-vscode",
        permanent: false,
      },
      {
        source: "/feedback",
        destination: "https://github.com/steven-tey/collhub/issues",
        permanent: true,
      },
      {
        source: "/deploy",
        destination: "https://vercel.com/templates/next.js/collhub",
        permanent: true,
      },
    ];
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
