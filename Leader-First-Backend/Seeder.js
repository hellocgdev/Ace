// seed.js
import mongoose from "mongoose";

// 1. Define Schema
const PostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String },
  author: { type: String },
  metaTitle: { type: String },
  content: { type: String, required: true },
  rawContent: { type: String },
  contentType: { type: String, enum: ["html", "text", "unsupported"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Post = mongoose.model("Post", PostSchema);

// 2. Dummy Data
const posts = [
  {
    slug: "blog-post-satya",
    category: "Leadership",
    title: "Satya Nadella's Transformational Leadership",
    excerpt: "How Empathy and Vision Redesigned Microsoft's Success Story.",
    imageUrl:
      "https://www.techspot.com/images2/news/bigimage/2021/06/2021-06-17-image-6.jpg",
    author: "By The Leaders First",
    metaTitle: "5 Tips to build successful company like Satya Nadella",
    content: `
<div>
  <h2>Key takeaways</h2>
  <ul>
    <li><strong>Empathy-Driven Leadership:</strong> Nadella's focus on empathy transformed Microsoft's culture.</li>
    <li><strong>Growth Mindset Culture:</strong> Microsoft's shift to a learn-it-all mindset encouraged experimentation.</li>
    <li><strong>Strategic Vision:</strong> Empowering all, prioritizing Azure and key acquisitions, grew Microsoft’s value from $300B to $3T.</li>
  </ul>
</div>
`,
    rawContent: "<div>...original HTML content...</div>",
    contentType: "html",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "blog-post-ambani",
    category: "Business",
    title:
      "From Humble Threads to Trillion-Dollar Empire: Mukesh Ambani's Blueprint",
    excerpt:
      "Scale beats speed. Integration creates moats. Purpose amplifies profit. A look into Ambani’s framework for building lasting fortune.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/MukeshAmbani.jpg",
    author: "By The Leaders First",
    metaTitle: "The Ambani Way Forward",
    content: `
<div>
  <h2>Summary Takeaways</h2>
  <ol>
    <li><strong>Scale beats speed:</strong> Patient, high-leverage plays create long-term value.</li>
    <li><strong>Integration creates moats:</strong> Controlling your ecosystem turns volatility into value.</li>
    <li><strong>Purpose amplifies profit:</strong> Aligning business with societal goals ensures enduring wealth.</li>
  </ol>
  <blockquote>Institutions last longer than individuals. Build for eras, not elections.</blockquote>
</div>
`,
    rawContent: "<div>...original HTML content...</div>",
    contentType: "html",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    slug: "blog-post-ai-boom",
    category: "Technology",
    title: "AI Boom in America: The Human Story of Transformational Change",
    excerpt:
      "The impact of AI is reshaping roles, favoring high-skill AI-enabled professionals.",
    imageUrl:
      "https://fizzdesigns.co.uk/wp-content/uploads/2024/08/AI-Future-Trends-for-2025-1024x675.webp",
    author: "By The Leaders First",
    metaTitle: "How AI is Reshaping Jobs",
    content: `
<div>
  <h2>Summary Points</h2>
  <ol>
    <li><strong>Job Transformation:</strong> AI favors high-skill, AI-enabled professionals, not just displacement.</li>
    <li><strong>Startup Engine:</strong> U.S. leads in global AI investment and venture growth.</li>
    <li><strong>Super-Agent Era:</strong> AI tools amplify, not replace, human work.</li>
  </ol>
</div>
`,
    rawContent: "<div>...original HTML content...</div>",
    contentType: "html",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 3. Seed Logic
mongoose.connect(
  "mongodb+srv://rahul_123:rahul_123@cluster0.uqzrhnx.mongodb.net/leader-first",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function seedPosts() {
  await Post.deleteMany();
  await Post.insertMany(posts);
  console.log("Seeded posts successfully!");
  mongoose.connection.close();
}

seedPosts();
