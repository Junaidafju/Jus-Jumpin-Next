export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  authorName?: string;
  featuredImageUrl?: string;
  categoriesList?: { id: number; name: string; slug: string }[];
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url: string }[];
    "wp:term"?: { id: number; name: string; slug: string }[][];
  };
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
}

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://www.jusjumpin.com/wp-json/wp/v2";

// Custom local fallback mock posts matching the "Jus Jumpin" brand and layout
const MOCK_CATEGORIES: WPCategory[] = [
  { id: 1, name: "Parenting Tips", slug: "parenting-tips", count: 3, description: "Tips and guides for parents", link: "#" },
  { id: 2, name: "Health & Fitness", slug: "health-fitness", count: 2, description: "Physical health benefits of play", link: "#" },
  { id: 3, name: "Parties & Events", slug: "parties-events", count: 2, description: "Guides for booking and managing birthdays", link: "#" },
  { id: 4, name: "Safety & Design", slug: "safety-design", count: 1, description: "Our safety standards and park layouts", link: "#" },
];

const MOCK_POSTS: WPPost[] = [
  {
    id: 101,
    date: "2026-08-10T10:00:00",
    slug: "reasons-why-trampoline-play-great-kids-development",
    link: "/blogs/reasons-why-trampoline-play-great-kids-development",
    title: { rendered: "10 Reasons Why Trampoline Play is Great for Kid's Development" },
    excerpt: { rendered: "Trampoline jumping isn't just about fun; it boosts motor skills, cardiovascular fitness, and balance. Read on to see the developmental benefits of bounce play..." },
    content: {
      rendered: `
        <p>Jumping on a trampoline is one of the most exciting activities for kids. But did you know it also plays a massive role in their developmental health? Studies show that active jumping, like the experience we offer at Jus Jumpin, offers multiple physical, mental, and social benefits.</p>
        
        <h2>1. Enhances Balance and Coordination</h2>
        <p>Jumping changes a child's center of gravity constantly. Kids must quickly adjust their balance, stimulating the brain and vestibular system to align posture and movement.</p>
        
        <h2>2. Cardiovascular Health</h2>
        <p>Just 10 minutes of jumping on a trampoline is equivalent to a 30-minute run. It increases the heart rate and helps build strong cardiovascular systems without putting heavy pressure on joints.</p>

        <h2>3. Strengthens Core Muscles</h2>
        <p>The bouncing motion requires constant engagement of abdominal and back muscles. Regular jumping naturally builds core strength, which is vital for day-to-day coordination.</p>

        <blockquote>
          "Active play is the cornerstone of healthy child development. Indoor trampoline parks provide a safe, climate-controlled environment to let kids push their physical boundaries."
        </blockquote>

        <h2>4. Boosts Confidence and Self-Esteem</h2>
        <p>Learning new moves, like bouncing higher or doing controlled landings, builds a feeling of success and self-confidence that translates directly into classroom settings.</p>
      `
    },
    authorName: "Sarah Jenkins (Child Development Specialist)",
    featuredImageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    categoriesList: [
      { id: 2, name: "Health & Fitness", slug: "health-fitness" },
      { id: 1, name: "Parenting Tips", slug: "parenting-tips" }
    ]
  },
  {
    id: 102,
    date: "2026-08-05T14:30:00",
    slug: "plan-ultimate-birthday-party-hassle-free-guide",
    link: "/blogs/plan-ultimate-birthday-party-hassle-free-guide",
    title: { rendered: "How to Plan the Ultimate Birthday Party: The Hassle-Free Guide" },
    excerpt: { rendered: "Planning a birthday party can be stressful. We break down the ultimate guide to booking a stress-free, high-energy party at Jus Jumpin trampoline parks..." },
    content: {
      rendered: `
        <p>Every parent wants their child's birthday to be memorable, but organizing it can feel like coordinating a logistics mission. From catering to decorations and keeping 15 energetic kids entertained, the details add up quickly.</p>
        
        <h2>The Formula for a Stress-Free Party</h2>
        <p>The secret is simple: outsource the high-energy entertainment. When you book a party at Jus Jumpin, we handle the activities, dedicated party hosts, safety supervisions, and clean-up, leaving you to enjoy the celebration.</p>
        
        <h3>Key Tips for Party Success:</h3>
        <ul>
          <li><strong>Send invites early:</strong> 2-3 weeks ahead ensures maximum RSVPs.</li>
          <li><strong>Pick a theme:</strong> Coordinate table settings with bright neon themes to match the neon vibe.</li>
          <li><strong>Plan for hydration:</strong> After an hour of jumping, kids will need plenty of water and juice before cake-cutting!</li>
        </ul>

        <h2>Dedicated Party Hosts</h2>
        <p>Our packages include certified hosts who organize games like dodgeball, relay races, and jump-offs, ensuring every kid stays involved and active.</p>
      `
    },
    authorName: "Amit Sharma (Event Coordinator)",
    featuredImageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    categoriesList: [
      { id: 3, name: "Parties & Events", slug: "parties-events" },
      { id: 1, name: "Parenting Tips", slug: "parenting-tips" }
    ]
  },
  {
    id: 103,
    date: "2026-07-28T09:15:00",
    slug: "safety-first-trampoline-park-maintenance",
    link: "/blogs/safety-first-trampoline-park-maintenance",
    title: { rendered: "Safety First: Behind the Scenes of Our Trampoline Park Maintenance" },
    excerpt: { rendered: "At Jus Jumpin, your child's safety is our number one priority. Discover our daily inspection routines, high-quality padding materials, and trained court monitors..." },
    content: {
      rendered: `
        <p>Parents often ask us: <em>"How do you ensure kids stay safe while jumping so high?"</em> We are incredibly proud of our safety record. Here is an exclusive behind-the-scenes look at the extreme measures we take daily to maintain safe operations.</p>
        
        <h2>1. Commercial-Grade Materials</h2>
        <p>All springs, trampolines, and landing bags at Jus Jumpin are engineered to meet strict international safety standards. Our padding is 2 inches thick, fire-resistant, and covers all metal frames completely.</p>
        
        <h2>2. Daily Inspections & Sanitization</h2>
        <p>Before the doors open every single morning, our court engineers inspect every trampoline bed, tension spring, and wall attachment. Simultaneously, we perform complete surface sanitizations of all soft play zones.</p>

        <blockquote>
          "We treat safety as a continuous daily standard. Our court monitors are trained in first aid and active supervision, keeping children safe while they enjoy high-flying play."
        </blockquote>

        <h2>3. Active Court Monitors</h2>
        <p>Our court monitors are strategically placed throughout the park. They ensure children play in appropriate zones matched to their age/size and enforce our simple, clear safety rules (like one bouncer per trampoline mat).</p>
      `
    },
    authorName: "Vikram Rathore (Safety Director)",
    featuredImageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    categoriesList: [
      { id: 4, name: "Safety & Design", slug: "safety-design" }
    ]
  },
  {
    id: 104,
    date: "2026-07-15T16:00:00",
    slug: "interactive-play-vs-screen-time-active-kids",
    link: "/blogs/interactive-play-vs-screen-time-active-kids",
    title: { rendered: "Interactive Play vs. Screen Time: Keeping Kids Active This Summer" },
    excerpt: { rendered: "Struggling to detach your kids from their screens? Learn how indoor adventure play builds social skills and provides the physical activity they need..." },
    content: {
      rendered: `
        <p>With smartphones, tablets, and gaming consoles, screen time has reached record highs. While digital media can be educational, physical play is essential to clear brain fatigue and build social skills.</p>
        
        <h2>The Screen-Time Challenge</h2>
        <p>Excessive sedentary screen time is linked to sleep disruption, shorter attention spans, and lack of core physical strength. Physical play, by contrast, releases endorphins, reduces stress, and fosters healthy sleep patterns.</p>
        
        <h2>Indoor Adventure Play to the Rescue</h2>
        <p>Trampoline parks and indoor play areas provide the dynamic stimulus that screens can't match: sensory-rich, multi-directional physical feedback. Crawling, climbing, jumping, and chasing friends develop situational awareness and peer-to-peer communication.</p>

        <h3>Simple Steps to Transition to Active Play:</h3>
        <ul>
          <li><strong>Set strict screen-free hours:</strong> e.g., no devices after 6 PM.</li>
          <li><strong>Make exercise a group event:</strong> Join your child in active spaces!</li>
          <li><strong>Celebrate physical achievements:</strong> Give positive reinforcement when kids try new climbing walls or complete ninja warrior courses.</li>
        </ul>
      `
    },
    authorName: "Dr. Nisha Patel (Pediatrician)",
    featuredImageUrl: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80",
    categoriesList: [
      { id: 1, name: "Parenting Tips", slug: "parenting-tips" },
      { id: 2, name: "Health & Fitness", slug: "health-fitness" }
    ]
  }
];

// Normalize a WP Post object to extract embedded media and terms
function normalizePost(post: any): WPPost {
  let authorName = "Jus Jumpin Team";
  let featuredImageUrl = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"; // fallback
  let categoriesList: { id: number; name: string; slug: string }[] = [];

  // Extract author
  if (post._embedded?.author && post._embedded.author.length > 0) {
    authorName = post._embedded.author[0].name;
  } else if (post.authorName) {
    authorName = post.authorName;
  }

  // Extract featured media
  if (post._embedded?.["wp:featuredmedia"] && post._embedded["wp:featuredmedia"].length > 0) {
    featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url;
  } else if (post.featuredImageUrl) {
    featuredImageUrl = post.featuredImageUrl;
  }

  // Extract categories
  if (post._embedded?.["wp:term"] && post._embedded["wp:term"].length > 0) {
    // Find the category term array (usually the first one)
    const terms = post._embedded["wp:term"];
    for (const termArray of terms) {
      if (termArray.length > 0 && (termArray[0] as any).taxonomy === "category") {
        categoriesList = termArray.map((t: any) => ({
          id: t.id,
          name: t.name,
          slug: t.slug,
        }));
        break;
      }
    }
  } else if (post.categoriesList) {
    categoriesList = post.categoriesList;
  }

  return {
    ...post,
    authorName,
    featuredImageUrl,
    categoriesList,
  };
}

export async function fetchWordPress<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!WP_API_URL) {
    throw new Error("WordPress API URL not configured.");
  }
  const cleanBase = WP_API_URL.endsWith("/") ? WP_API_URL.slice(0, -1) : WP_API_URL;
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const res = await fetch(`${cleanBase}${cleanEndpoint}`, {
    ...options,
    next: { revalidate: 3600, ...options.next }, // Cache for 1 hour by default
  });

  if (!res.ok) {
    throw new Error(`WordPress API returned status ${res.status}`);
  }
  return res.json();
}

export async function getPosts(params: {
  page?: number;
  perPage?: number;
  search?: string;
  categoryId?: number;
} = {}): Promise<{ posts: WPPost[]; totalPosts: number; totalPages: number }> {
  const { page = 1, perPage = 6, search = "", categoryId } = params;

  if (!WP_API_URL) {
    // Filter Mock Posts for preview
    let filtered = [...MOCK_POSTS];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.rendered.toLowerCase().includes(s) ||
          p.content.rendered.toLowerCase().includes(s) ||
          p.excerpt.rendered.toLowerCase().includes(s)
      );
    }
    if (categoryId) {
      filtered = filtered.filter((p) =>
        p.categoriesList?.some((cat) => cat.id === categoryId)
      );
    }

    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    return {
      posts: paginated,
      totalPosts: filtered.length,
      totalPages: Math.ceil(filtered.length / perPage) || 1,
    };
  }

  try {
    let query = `/posts?_embed&page=${page}&per_page=${perPage}`;
    if (search) {
      query += `&search=${encodeURIComponent(search)}`;
    }
    if (categoryId) {
      query += `&categories=${categoryId}`;
    }

    const cleanBase = WP_API_URL.endsWith("/") ? WP_API_URL.slice(0, -1) : WP_API_URL;
    const fullUrl = `${cleanBase}${query}`;

    const res = await fetch(fullUrl, {
      next: { revalidate: 300 }, // 5 minutes caching
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status}`);
    }

    const totalPosts = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
    const rawPosts = await res.json();

    return {
      posts: rawPosts.map(normalizePost),
      totalPosts: totalPosts || rawPosts.length,
      totalPages: totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching WordPress posts, falling back to mock data:", error);
    // Dynamic mock fallback
    let filtered = [...MOCK_POSTS];
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.rendered.toLowerCase().includes(s) ||
          p.content.rendered.toLowerCase().includes(s) ||
          p.excerpt.rendered.toLowerCase().includes(s)
      );
    }
    if (categoryId) {
      filtered = filtered.filter((p) =>
        p.categoriesList?.some((cat) => cat.id === categoryId)
      );
    }
    const start = (page - 1) * perPage;
    const paginated = filtered.slice(start, start + perPage);

    return {
      posts: paginated,
      totalPosts: filtered.length,
      totalPages: Math.ceil(filtered.length / perPage) || 1,
    };
  }
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  if (!WP_API_URL) {
    const post = MOCK_POSTS.find((p) => p.slug === slug);
    return post ? normalizePost(post) : null;
  }

  try {
    const query = `/posts?slug=${encodeURIComponent(slug)}&_embed`;
    const posts = await fetchWordPress<any[]>(query);
    if (!posts || posts.length === 0) {
      // Check in mock fallback just in case
      const mockPost = MOCK_POSTS.find((p) => p.slug === slug);
      if (mockPost) return normalizePost(mockPost);
      return null;
    }
    return normalizePost(posts[0]);
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}", checking mock fallback:`, error);
    const mockPost = MOCK_POSTS.find((p) => p.slug === slug);
    return mockPost ? normalizePost(mockPost) : null;
  }
}

export async function getCategories(): Promise<WPCategory[]> {
  if (!WP_API_URL) {
    return MOCK_CATEGORIES;
  }

  try {
    // Categories endpoint
    const categories = await fetchWordPress<any[]>("/categories?per_page=50&hide_empty=true");
    return categories.map((cat: any) => ({
      id: cat.id,
      count: cat.count,
      description: cat.description,
      link: cat.link,
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error("Error fetching WordPress categories, falling back to mock data:", error);
    return MOCK_CATEGORIES;
  }
}

export async function getRecentPosts(limit = 4): Promise<WPPost[]> {
  if (!WP_API_URL) {
    return MOCK_POSTS.slice(0, limit).map(normalizePost);
  }

  try {
    const query = `/posts?_embed&per_page=${limit}&page=1`;
    const rawPosts = await fetchWordPress<any[]>(query);
    return rawPosts.map(normalizePost);
  } catch (error) {
    console.error("Error fetching recent posts, falling back to mock data:", error);
    return MOCK_POSTS.slice(0, limit).map(normalizePost);
  }
}
