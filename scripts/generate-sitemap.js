const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bristol.social';
const groupDataPath = path.join(process.cwd(), 'data/groups');
const blogPath = path.join(process.cwd(), 'blog');
const publicPath = path.join(process.cwd(), 'public');

// Utility function to get directories (same as utils.ts)
function getDirectories(source) {
    try {
        return fs
            .readdirSync(source, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
    } catch (error) {
        console.warn(
            `Warning: Could not read directory ${source}:`,
            error.message,
        );
        return [];
    }
}

// Function to get all blog posts (similar to api.ts)
function getAllPosts() {
    try {
        const slugs = fs
            .readdirSync(blogPath)
            .filter((file) => file.endsWith('.md'));

        return (
            slugs
                .map((slug) => {
                    try {
                        const realSlug = slug.replace(/\.md$/, '');
                        const fullPath = path.join(blogPath, slug);
                        const fileContents = fs.readFileSync(fullPath, 'utf8');
                        const { data } = matter(fileContents);

                        // Ensure date is in ISO format
                        const date =
                            data.date instanceof Date
                                ? data.date.toISOString()
                                : data.date;

                        return { ...data, date, slug: realSlug };
                    } catch (error) {
                        console.warn(
                            `Warning: Could not parse blog post ${slug}:`,
                            error.message,
                        );
                        return null;
                    }
                })
                .filter(Boolean) // Remove null entries
                // Sort posts by date in descending order
                .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
        );
    } catch (error) {
        console.warn('Warning: Could not read blog directory:', error.message);
        return [];
    }
}

// Generate sitemap entries
function generateSitemapEntries() {
    const entries = [];

    // Static pages with their SEO metadata
    const staticPages = [
        {
            url: `${baseUrl}/`,
        },
        {
            url: `${baseUrl}/about`,
        },
        {
            url: `${baseUrl}/blog`,
        },
        {
            url: `${baseUrl}/add-a-group`,
        },
        {
            url: `${baseUrl}/feedback`,
        },
        {
            url: `${baseUrl}/more-resources`,
        },
    ];

    entries.push(...staticPages);

    // Dynamic group pages
    const groupSlugs = getDirectories(groupDataPath);

    for (const slug of groupSlugs) {
        try {
            // Get modification time of details.json for lastmod
            const detailsPath = path.join(groupDataPath, slug, 'details.json');

            if (fs.existsSync(detailsPath)) {
                const groupStats = fs.statSync(detailsPath);
                const lastModified = groupStats.mtime.toISOString();

                entries.push({
                    url: `${baseUrl}/groups/${slug}`,
                    lastmod: lastModified,
                });
            } else {
                // Add the group URL without lastmod as fallback
                entries.push({
                    url: `${baseUrl}/groups/${slug}`,
                });
            }
        } catch (error) {
            console.warn(
                `Warning: Could not read details for group ${slug}:`,
                error.message,
            );
            // Add the group URL without lastmod as fallback
            entries.push({
                url: `${baseUrl}/groups/${slug}`,
            });
        }
    }

    // Blog posts
    const posts = getAllPosts();

    for (const post of posts) {
        try {
            // Use post date for lastmod
            const lastModified = new Date(post.date).toISOString();

            entries.push({
                url: `${baseUrl}/blog/${post.slug}`,
                lastmod: lastModified,
            });
        } catch (error) {
            console.warn(
                `Warning: Could not process blog post ${post.slug}:`,
                error.message,
            );
            // Add the blog post URL without lastmod as fallback
            entries.push({
                url: `${baseUrl}/blog/${post.slug}`,
            });
        }
    }

    return entries;
}

// Generate XML sitemap following the sitemap protocol
function generateSitemapXML(entries) {
    const xmlEntries = entries
        .map((entry) => {
            let xml = `  <url>
    <loc>${entry.url}</loc>`;

            if (entry.lastmod) {
                xml += `
    <lastmod>${entry.lastmod}</lastmod>`;
            }

            xml += `
  </url>`;

            return xml;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

// Main function
function generateSitemap() {
    console.log('🗺️  Generating sitemap...');

    try {
        const entries = generateSitemapEntries();
        const sitemapXML = generateSitemapXML(entries);

        // Ensure public directory exists
        if (!fs.existsSync(publicPath)) {
            fs.mkdirSync(publicPath, { recursive: true });
        }

        // Write sitemap to public directory
        const sitemapPath = path.join(publicPath, 'sitemap.xml');
        fs.writeFileSync(sitemapPath, sitemapXML);

        console.log(
            `✅ Sitemap generated successfully with ${entries.length} URLs`,
        );
        console.log(`📁 Saved to: ${sitemapPath}`);

        // Log some sample URLs for verification
        const sampleUrls = entries.slice(0, 5).map((entry) => entry.url);
        console.log('📋 Sample URLs included:');
        sampleUrls.forEach((url) => console.log(`   - ${url}`));

        if (entries.length > 5) {
            console.log(`   ... and ${entries.length - 5} more URLs`);
        }

        // Log breakdown by type
        const staticCount = entries.filter(
            (e) => !e.url.includes('/groups/') && !e.url.includes('/blog/'),
        ).length;
        const groupCount = entries.filter((e) =>
            e.url.includes('/groups/'),
        ).length;
        const blogCount = entries.filter(
            (e) => e.url.includes('/blog/') && e.url !== `${baseUrl}/blog`,
        ).length;

        console.log('📊 URL breakdown:');
        console.log(`   - Static pages: ${staticCount}`);
        console.log(`   - Group pages: ${groupCount}`);
        console.log(`   - Blog posts: ${blogCount}`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    generateSitemap();
}

module.exports = { generateSitemap };
