// API route to fetch OG image URL from IsThereADropToday.com
export default async function handler(req, res) {
  try {
    // Fetch the homepage HTML
    const response = await fetch('https://isthereadroptoday.com/');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Parse the og:image meta tag
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    
    if (ogImageMatch && ogImageMatch[1]) {
      const ogImageUrl = ogImageMatch[1];
      res.status(200).json({ ogImageUrl });
    } else {
      // Fallback to default OG image path if not found
      res.status(200).json({ ogImageUrl: 'https://isthereadroptoday.com/api/og/Error' });
    }
  } catch (error) {
    console.error('Error fetching OG image:', error);
    // Fallback on error
    res.status(200).json({ ogImageUrl: 'https://isthereadroptoday.com/api/og/Error' });
  }
}
