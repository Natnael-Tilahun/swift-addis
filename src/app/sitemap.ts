import type { MetadataRoute } from 'next'
import { fetchServices } from '@/services/api';
import type { Service, BlogPost } from '@/types/type';
import { blogPosts } from '@/lib/blog-posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const services = await fetchServices();

    const serviceUrls: MetadataRoute.Sitemap = services.map((service: Service) => ({
        url: `${baseUrl}/services/${service._id}`,
        lastModified: new Date(service.updatedAt),
        changeFrequency: 'weekly',
    }));


    const blogUrls: MetadataRoute.Sitemap = blogPosts.map((blog: BlogPost) => ({
      url: `${baseUrl}/blogs/${blog.id}`,
      lastModified: new Date(blog.publishedAt),
      changeFrequency: 'weekly',
    }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...serviceUrls,
    ...blogUrls,
  ]
}