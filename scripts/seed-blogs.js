const fs = require('fs');
const path = require('path');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const techTopics = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Tailwind CSS',
  'PostgreSQL', 'Supabase', 'Serverless', 'Microservices', 'WebAssembly',
  'Rust', 'Go', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Machine Learning',
  'AI', 'Data Science', 'Python', 'Web3', 'Blockchain', 'Cybersecurity'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMarkdownContent(topic, index) {
  return `
# The Future of ${topic} in 2026

Welcome to this comprehensive guide on **${topic}**. In this post, we'll dive deep into the ecosystem, explore best practices, and look at what the future holds.

## Introduction to ${topic}

${topic} has revolutionized the way we build applications. As a developer, understanding its core concepts is crucial for modern software engineering. It provides a robust foundation for building scalable, maintainable, and high-performance systems.

### Key Benefits
- **Performance**: Optimized for speed and efficiency.
- **Developer Experience**: Excellent tooling and community support.
- **Ecosystem**: A vast array of libraries and integrations.

## Deep Dive: Advanced Concepts

Let's look at a quick example of how you might structure a basic implementation in this domain:

\`\`\`javascript
// Example implementation for ${topic}
class ${topic.replace(/[^a-zA-Z]/g, '')}Manager {
  constructor() {
    this.initialized = false;
    this.data = new Map();
  }

  async initialize() {
    console.log('Initializing ${topic} services...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.initialized = true;
    return 'Success';
  }

  process(payload) {
    if (!this.initialized) throw new Error('Not initialized');
    return { status: 'processed', payload, timestamp: Date.now() };
  }
}

const manager = new ${topic.replace(/[^a-zA-Z]/g, '')}Manager();
manager.initialize().then(() => console.log('Ready!'));
\`\`\`

## Real-world Applications

In enterprise environments, ${topic} is often used in conjunction with other modern technologies to create resilient architectures. Companies are adopting these patterns to reduce technical debt and improve deployment velocity.

> "The adoption of ${topic} has increased our team's productivity by over 40%." - Leading Tech Executive

## Conclusion

As we look towards the horizon, it's clear that ${topic} will continue to play a pivotal role in shaping the software landscape. Whether you are a seasoned architect or a junior developer, mastering these concepts will undoubtedly elevate your career.

Stay tuned for more updates and tutorials on this topic!
`;
}

async function seedBlogs() {
  console.log('Starting to seed 50 blogs...');
  
  const blogsToInsert = [];
  
  for (let i = 1; i <= 50; i++) {
    const topic = getRandomItem(techTopics);
    const imageUrl = `https://picsum.photos/seed/${topic.replace(/[^a-zA-Z]/g, '')}${i}/800/400`;
    const title = `Mastering ${topic}: A Complete Guide (Part ${i})`;
    const slug = `mastering-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-part-${i}`;
    
    blogsToInsert.push({
      title: title,
      slug: slug,
      description: `An in-depth look at ${topic}, exploring its core concepts, advanced patterns, and how it shapes the future of modern software development.`,
      content: generateMarkdownContent(topic, i),
      author: `Tech Author ${Math.floor(Math.random() * 10) + 1}`,
      featured_image: imageUrl,
      published: true, // Mark all as published so they show up
      created_at: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(), // Random past dates
      updated_at: new Date().toISOString()
    });
  }

  try {
    // Insert in batches of 10 to avoid any potential limits
    for (let i = 0; i < blogsToInsert.length; i += 10) {
      const batch = blogsToInsert.slice(i, i + 10);
      const response = await fetch(`${supabaseUrl}/rest/v1/blogs`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(batch)
      });
      
      if (!response.ok) {
        const error = await response.text();
        console.error('Error inserting batch:', error);
      } else {
        console.log(`Inserted blogs ${i + 1} to ${Math.min(i + 10, blogsToInsert.length)}`);
      }
    }
    console.log('Successfully seeded 50 blogs!');
  } catch (err) {
    console.error('Failed to seed blogs:', err);
  }
}

seedBlogs();
