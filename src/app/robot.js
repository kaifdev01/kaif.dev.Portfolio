export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: "https://kaif-dev.vercel.app/sitemap.xml",
    };
}