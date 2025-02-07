// sanityClient.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: "5q8erzvb", // Replace with your project ID
  dataset: 'production',        // Or your dataset name
  apiVersion: '2024-01-04',     // Today's date or latest API version
  useCdn: false,                // Disable CDN for real-time updates
  token: "skByVTxZKXxtWJnz77XOyGiIgq4UG3FfNPKOa1k7Fmn9ti98LYXJQ3poetEwnrUMlYUGPpeOcLYHYGI4RaehDHdoXYRS9XKhU43JPiEF9uSiXFqUiCgQ1JmdVURWgbfXqNVrEAJhDTH5iUjGDRwSLvyF3he9zomI0ROirIqRQ2jrF0KVAY3l",
});




