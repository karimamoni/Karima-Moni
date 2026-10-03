import { CmsDatabase } from '../types';

export const initialCmsData: CmsDatabase = {
  homepage: {
    brandName: 'KARIMA MONI',
    professionalTitle: 'Digital Marketing Specialist',
    positioning: 'Digital Marketing | Paid Ads | Creative Content',
    tagline: 'Connect. Create. Grow.',
    heroHeadline: 'Digital Marketing & Creative Content That Move Your Business Forward.',
    heroSubheadline:
      'I help businesses turn their online presence into a clearer, more consistent and more effective customer journey through paid advertising, social media and creative content.',
    heroImage: 'images/karima_hero_portrait_1790992143360.jpg',
    heroCtaPrimaryText: 'View My Work',
    heroCtaSecondaryText: "Let's Work Together",
    heroCtaCvText: 'Download My CV',
    quickIntroHeading: 'Clear Strategy. Strong Creative. Better Digital Presence.',
    quickIntroText:
      'Every business has a story. My goal is to help you tell that story to the right audience through the right platform, strategy and content.',
    focusCards: [
      {
        id: 'focus-1',
        number: '01',
        title: 'Strategy',
        description: 'Data-driven and goal-focused digital marketing strategies.',
      },
      {
        id: 'focus-2',
        number: '02',
        title: 'Creativity',
        description: 'Creative visuals and content that make brands stand out.',
      },
      {
        id: 'focus-3',
        number: '03',
        title: 'Social Growth',
        description: 'Building meaningful connections between brands and audiences.',
      },
      {
        id: 'focus-4',
        number: '04',
        title: 'Business Growth',
        description: 'Turning digital presence into real business opportunities.',
      },
    ],
    aboutHeading: 'About Karima Moni',
    aboutSubtitle: 'Digital Marketing Specialist · Paid Ads · Creative Content',
    aboutContent:
      "Assalamu Alaikum! I'm Karima Moni, a passionate Digital Marketing Specialist dedicated to helping businesses grow in the digital world.\n\nI work with digital marketing, social media, graphic design and AI-powered creative content to help brands create a professional online presence and connect with their target audience.\n\nI believe successful digital marketing is not just about posting content or running advertisements. It is about understanding the audience, creating the right message and using the right strategy at the right time.",
    aboutMission:
      'To help businesses grow online through creative, strategic and result-focused digital solutions.',
    aboutImage: 'images/karima_hero_portrait_1790992143360.jpg',
    aboutCapabilities: [
      'Meta & Google Ads',
      'Social Media Marketing',
      'Content Strategy & Creation',
      'Brand & Social Media Design',
      'Short-form Video',
      'AI-assisted Creative Workflows',
    ],
    whyChooseHeading: 'Why Work With Me?',
    whyChooseCards: [
      {
        id: 'why-1',
        title: 'Goal Focused',
        description: 'Every project starts with a clear objective and targeted milestones.',
      },
      {
        id: 'why-2',
        title: 'Creative Approach',
        description: 'I combine visual creativity with digital marketing strategy.',
      },
      {
        id: 'why-3',
        title: 'Strategy Driven',
        description: 'I focus on the right audience, compelling content, and optimal platforms.',
      },
      {
        id: 'why-4',
        title: 'Client Focused',
        description: 'Clear communication and understanding requirements always come first.',
      },
      {
        id: 'why-5',
        title: 'Professional Commitment',
        description: 'I value punctuality, transparent reporting, and high execution quality.',
      },
      {
        id: 'why-6',
        title: 'Continuous Learning',
        description: 'I continuously improve my skills and explore modern digital tools and AI trends.',
      },
    ],
    ctaBannerHeading: 'Have a Project in Mind?',
    ctaBannerSubheading: "Let's Turn Your Idea Into Digital Growth.",
    ctaBannerText:
      "Have a business goal, campaign or content challenge? Let's discuss what you need and choose the right next step.",
  },

  serviceCategories: [
    {
      id: 'cat-digital-marketing',
      name: 'Performance Marketing',
      slug: 'performance-marketing',
      badge: 'Core Service 01',
      description: 'Focused paid advertising and social media support built around clear business goals.',
      order: 1,
    },
    {
      id: 'cat-graphic-design',
      name: 'Creative Content',
      slug: 'creative-content',
      badge: 'Core Service 02',
      description: 'Brand visuals, social creatives and AI-assisted content that keep your online presence consistent.',
      order: 2,
    },
  ],

  services: [
    // Digital Marketing
    {
      id: 'srv-fb-ads',
      categoryId: 'cat-digital-marketing',
      title: 'Facebook Ads',
      slug: 'facebook-ads',
      shortDescription: 'Conversion-driven paid advertising campaigns with precision audience targeting and A/B ad creative testing.',
      overview: 'End-to-end Facebook and Instagram advertising strategy to maximize return on ad spend (ROAS) and capture qualified leads.',
      deliverables: [
        'Campaign Objective & Structure Setup',
        'In-depth Audience Research & Custom Audiences',
        'Ad Creative Strategy & Copywriting',
        'Meta Pixel & Conversion API Setup',
        'Continuous Budget & Bid Optimization',
        'Weekly Performance & ROAS Reports',
      ],
      process: [
        { step: '01', title: 'Audit & Objective', description: 'Review previous ad performance and define clear target metrics.' },
        { step: '02', title: 'Creative & Audience', description: 'Formulate bespoke copy, creative variations, and laser-targeted demographic sets.' },
        { step: '03', title: 'Launch & Testing', description: 'Deploy campaigns with strict budget pacing and multi-ad split testing.' },
        { step: '04', title: 'Scaling & Optimization', description: 'Scale high-performing ad sets while pruning underperforming variables.' },
      ],
      tools: ['Meta Business Suite', 'Facebook Ads Manager', 'Meta Pixel', 'Canva Pro'],
      ctaText: 'View Ads Projects',
      published: true,
      order: 1,
    },
    {
      id: 'srv-google-ads',
      categoryId: 'cat-digital-marketing',
      title: 'Google Ads',
      slug: 'google-ads',
      shortDescription: 'High-intent Search, Display, and Performance Max campaigns that capture active buyers.',
      overview: 'Target users at the exact moment they search for your products or services with structured keyword grouping and high-converting ad copy.',
      deliverables: [
        'Keyword Intent Research & Negative Keywords',
        'Search & Display Campaign Architecture',
        'Compelling Ad Extensions & Responsive Ads',
        'Google Tag Manager & Conversion Tracking',
        'Quality Score Optimization',
      ],
      process: [
        { step: '01', title: 'Intent Mapping', description: 'Identify transactional and commercial keywords with high purchase intent.' },
        { step: '02', title: 'Ad Copywriting', description: 'Draft compelling headlines and descriptions with matching landing page alignment.' },
        { step: '03', title: 'Bid Strategy', description: 'Implement smart bidding strategies tailored to your target CPA/ROAS.' },
      ],
      tools: ['Google Ads', 'Google Keyword Planner', 'Google Analytics 4', 'Google Tag Manager'],
      ctaText: 'Hire for Google Ads',
      published: true,
      order: 2,
    },
    {
      id: 'srv-smm',
      categoryId: 'cat-digital-marketing',
      title: 'Social Media Management',
      slug: 'social-media-management',
      shortDescription: 'Consistent brand presence across Meta, Instagram, and LinkedIn with cohesive editorial calendars.',
      overview: 'Turn silent social channels into active community touchpoints through strategic scheduling, engaging copy, and community moderation.',
      deliverables: [
        'Monthly Content Calendar & Theme Planning',
        'Post Graphic Design & Captions',
        'Community Engagement & Response Protocol',
        'Hashtag & Trend Research',
        'Monthly Growth Insights',
      ],
      process: [
        { step: '01', title: 'Brand Voice Discovery', description: 'Define the visual tone, messaging pillars, and posting rhythm.' },
        { step: '02', title: 'Content Batching', description: 'Produce and schedule all graphics, reels, and carousel copy in advance.' },
        { step: '03', title: 'Active Moderation', description: 'Engage with comments, DMs, and target community accounts.' },
      ],
      tools: ['Meta Business Suite', 'Canva', 'CapCut', 'Notion'],
      ctaText: 'Explore Social Projects',
      published: true,
      order: 3,
    },
    {
      id: 'srv-youtube',
      categoryId: 'cat-digital-marketing',
      title: 'YouTube Marketing',
      slug: 'youtube-marketing',
      shortDescription: 'Channel optimization, high-CTR thumbnail strategy, and video metadata SEO for organic audience reach.',
      overview: 'Position long-form and Shorts content to rank in YouTube Search and Suggested feeds with keyword-optimized metadata.',
      deliverables: [
        'Channel Audit & Branding Refresh',
        'High-CTR Thumbnail Design',
        'Video Title & Description SEO Optimization',
        'Tags, Cards & End Screen Strategy',
        'YouTube Shorts Strategy',
      ],
      process: [
        { step: '01', title: 'Channel Assessment', description: 'Analyze watch time, click-through rates, and audience retention drop-offs.' },
        { step: '02', title: 'Metadata Optimization', description: 'Incorporate search volume keywords into titles, descriptions, and timestamps.' },
      ],
      tools: ['YouTube Studio', 'Canva', 'VidIQ / TubeBuddy', 'CapCut'],
      ctaText: 'View YouTube Portfolio',
      published: true,
      order: 4,
    },
    {
      id: 'srv-seo',
      categoryId: 'cat-digital-marketing',
      title: 'SEO & Content Marketing',
      slug: 'seo-content-marketing',
      shortDescription: 'On-page search engine optimization and value-packed articles to earn organic rankings.',
      overview: 'Build lasting organic authority with structured keyword research, meta tags, and audience-first educational content.',
      deliverables: [
        'Keyword Research & Competitor Analysis',
        'On-page Meta Titles, Descriptions & Headers',
        'SEO-Optimized Article Writing',
        'Internal Linking Strategy',
        'Google Search Console Monitoring',
      ],
      process: [
        { step: '01', title: 'Keyword Mapping', description: 'Select high-intent long-tail keywords with achievable competition scores.' },
        { step: '02', title: 'Content Drafting', description: 'Structure articles with clear H2/H3 tags, actionable takeaways, and internal links.' },
      ],
      tools: ['Google Search Console', 'Google Analytics', 'Ahrefs / Ubersuggest', 'Google Docs'],
      ctaText: 'Discuss SEO Plan',
      published: true,
      order: 5,
    },
    {
      id: 'srv-email-marketing',
      categoryId: 'cat-digital-marketing',
      title: 'Email Marketing & Lead Gen',
      slug: 'email-marketing-lead-gen',
      shortDescription: 'Automated nurture sequences, newsletter broadcasts, and lead capture funnels that build customer loyalty.',
      overview: 'Develop targeted email newsletters and welcome workflows that turn subscribers into repeat clients.',
      deliverables: [
        'Lead Magnet & Landing Page Strategy',
        'Automated Welcome & Nurture Sequences',
        'Promotional Newsletter Design',
        'List Segmentation & Hygiene',
      ],
      process: [
        { step: '01', title: 'Funnel Design', description: 'Map out the subscriber journey from lead magnet download to checkout.' },
        { step: '02', title: 'Copy & Automation', description: 'Write conversion copy and configure drip trigger automations.' },
      ],
      tools: ['Mailchimp', 'MailerLite', 'Canva', 'Google Workspace'],
      ctaText: 'Start Email Marketing',
      published: true,
      order: 6,
    },

    // Graphic Design
    {
      id: 'srv-brand-identity',
      categoryId: 'cat-graphic-design',
      title: 'Brand Identity & Logo Design',
      slug: 'brand-identity-logo-design',
      shortDescription: 'Memorable visual identities, logos, color palettes, and stationery that project premium professionalism.',
      overview: 'Create an enduring brand mark accompanied by comprehensive visual guidelines for unified offline and online collateral.',
      deliverables: [
        'Primary & Secondary Logo Marks',
        'Color Palette & Typography System',
        'Business Card & Stationery Layouts',
        'Vector Master Files (SVG, EPS, PNG, PDF)',
        'Brand Style Guide Document',
      ],
      process: [
        { step: '01', title: 'Discovery & Moodboard', description: 'Explore brand personality, market competitors, and aesthetic directions.' },
        { step: '02', title: 'Concept Sketches', description: 'Develop distinct vector concepts and typography pairings.' },
        { step: '03', title: 'Refinement & Delivery', description: 'Finalize chosen identity and export print-ready assets.' },
      ],
      tools: ['Adobe Illustrator / Photoshop', 'Canva Pro', 'Figma'],
      ctaText: 'View Branding Work',
      published: true,
      order: 7,
    },
    {
      id: 'srv-social-graphics',
      categoryId: 'cat-graphic-design',
      title: 'Social Media Post & Banner Design',
      slug: 'social-media-post-banner-design',
      shortDescription: 'Eye-catching carousel graphics, promotional banners, and social posts that stop the scroll.',
      overview: 'Elevate your feed with visually cohesive templates, promotional banners, flyers, and advertising creative.',
      deliverables: [
        'High-Resolution Feed Graphics (1:1 & 4:5)',
        'Multi-Slide Educational Carousels',
        'Header Banners for Facebook, LinkedIn & YouTube',
        'Promotional Event Flyers & Posters',
      ],
      process: [
        { step: '01', title: 'Briefing', description: 'Review post copy and visual hierarchy requirements.' },
        { step: '02', title: 'Design & Review', description: 'Apply brand colors, dynamic typography, and clear calls to action.' },
      ],
      tools: ['Canva Pro', 'Photoshop', 'Figma'],
      ctaText: 'View Social Designs',
      published: true,
      order: 8,
    },
    {
      id: 'srv-print-marketing',
      categoryId: 'cat-graphic-design',
      title: 'Flyer, Card & Packaging Design',
      slug: 'flyer-card-packaging-design',
      shortDescription: 'Print-ready marketing collateral including business cards, product inserts, and promotional flyers.',
      overview: 'Ensure your physical brand touchpoints reflect the exact same sophistication as your digital platforms.',
      deliverables: [
        'Double-Sided Business Card Layouts',
        'A4/A5 Marketing Flyers & Brochures',
        'Product Label & Packaging Graphics',
        'CMYK Print-Ready PDF Files with Bleeds',
      ],
      process: [
        { step: '01', title: 'Specifications', description: 'Confirm print dimensions, paper stock, and finish requirements.' },
        { step: '02', title: 'Print Prep', description: 'Export color-calibrated CMYK files with crop marks and safety margins.' },
      ],
      tools: ['Illustrator', 'Photoshop', 'Canva Pro'],
      ctaText: 'Request Print Collateral',
      published: true,
      order: 9,
    },

    // AI Services
    {
      id: 'srv-ai-content',
      categoryId: 'cat-ai-services',
      title: 'AI Content Creation & Copywriting',
      slug: 'ai-content-creation-copywriting',
      shortDescription: 'Accelerated content workflows leveraging custom AI prompts for blogs, scripts, captions, and outlines.',
      overview: 'Combine the speed of generative AI with meticulous human editorial review to produce authentic, high-value written content at scale.',
      deliverables: [
        'Custom Prompt Engineering for Brand Voice',
        'SEO Blog Article Outlines & Drafts',
        'Social Media Video Scripts & Hooks',
        'Human Polish & Fact-Verification',
      ],
      process: [
        { step: '01', title: 'Knowledge Base Setup', description: 'Feed brand tone guidelines, target audience data, and stylistic rules.' },
        { step: '02', title: 'Generation & Human Polish', description: 'Generate structured drafts and edit for genuine human nuance and voice.' },
      ],
      tools: ['ChatGPT / Claude', 'Google Gemini', 'Notion AI'],
      ctaText: 'Explore AI Content',
      published: true,
      order: 10,
    },
    {
      id: 'srv-ai-video',
      categoryId: 'cat-graphic-design',
      title: 'AI Video Creation & Editing',
      slug: 'ai-video-creation-editing',
      shortDescription: 'AI-assisted short-form video production, voice synthesis, captions, and dynamic visual transitions for Reels and TikTok.',
      overview: 'Produce viral-style vertical short videos using AI voice narration, smart auto-captions, and modern video pacing.',
      deliverables: [
        'Short-Form Video Scripting & Pacing',
        'AI Voiceover Generation & Syncing',
        'Dynamic Animated Subtitles & B-Roll',
        'Vertical 9:16 Video Export for Reels/Shorts/TikTok',
      ],
      process: [
        { step: '01', title: 'Script & Hook', description: 'Craft a high-retention 3-second hook and concise story arc.' },
        { step: '02', title: 'Visual Assembly', description: 'Blend generated imagery, motion graphics, and audio.' },
      ],
      tools: ['CapCut', 'ElevenLabs', 'Runway / Pika', 'Canva'],
      ctaText: 'View Video Work',
      published: true,
      order: 11,
    },
    {
      id: 'srv-ai-automation',
      categoryId: 'cat-ai-services',
      title: 'AI Automation & Workflow Support',
      slug: 'ai-automation-workflow-support',
      shortDescription: 'Streamline repetitive marketing tasks with smart AI tool integrations and automated social scheduling.',
      overview: 'Reduce manual operational overhead by setting up connected tools for lead logging, auto-replies, and content syndication.',
      deliverables: [
        'Marketing Workflow Audit',
        'Automated Lead Intake & Notification Sync',
        'Social Media Auto-Repurposing Flows',
        'Custom ChatGPT Assistant Instructions',
      ],
      process: [
        { step: '01', title: 'Process Mapping', description: 'Identify repetitive bottleneck tasks across marketing operations.' },
        { step: '02', title: 'Integration & Testing', description: 'Connect apps and test automated triggers for reliability.' },
      ],
      tools: ['Make / Zapier', 'ChatGPT Plus', 'Google Sheets / Workspace'],
      ctaText: 'Automate Workflows',
      published: true,
      order: 12,
    },
  ],

  projects: [
    {
      id: 'proj-1',
      name: 'E-Commerce Growth & Meta Ads Strategy',
      client: 'Retail & Fashion Client',
      category: 'Performance Marketing',
      subCategory: 'Facebook Ads',
      service: 'Facebook Ads',
      date: 'March 2026',
      thumbnail: 'images/marketing_campaign_showcase_1790992154996.jpg',
      gallery: [
        'images/marketing_campaign_showcase_1790992154996.jpg',
        'images/brand_identity_design_1790992165631.jpg',
      ],
      shortDescription: 'Full-funnel Meta advertising campaign featuring custom audience prospecting, retargeting sets, and creative split-testing.',
      description: 'Planned and deployed high-converting Facebook and Instagram ad campaigns tailored to seasonal apparel demand. Conducted rigorous A/B creative testing with multiple headline and visual variations.',
      role: 'Lead Digital Marketing Specialist',
      toolsUsed: ['Meta Business Suite', 'Facebook Ads Manager', 'Canva Pro', 'Google Analytics 4'],
      challenge: 'The client faced stagnant online store traffic and high acquisition costs from unsegmented broad targeting.',
      goal: 'Restructure the ad account into dedicated Top-of-Funnel prospecting and Bottom-of-Funnel catalog retargeting to maximize return on ad spend.',
      strategy: 'Segmented custom lookalikes based on past customer purchase value, designed product showcase carousels, and implemented dynamic product ads.',
      workDone: [
        'Audit of existing Meta Pixel and conversion tracking',
        'Creative design of 12 distinct ad visual variations',
        'Copywriting focusing on value propositions and social proof',
        'Daily bid monitoring and budget reallocation',
      ],
      result: 'Delivered steady qualified traffic, reduced cost per acquisition, and established a scalable advertising framework for future product launches.',
      isCaseStudy: true,
      featured: true,
      status: 'Published',
      order: 1,
    },
    {
      id: 'proj-2',
      name: 'Luxury Brand Identity & Visual System',
      client: 'Boutique Lifestyle Brand',
      category: 'Creative Content',
      subCategory: 'Brand Identity',
      service: 'Brand Identity & Logo Design',
      date: 'February 2026',
      thumbnail: 'images/brand_identity_design_1790992165631.jpg',
      gallery: [
        'images/brand_identity_design_1790992165631.jpg',
      ],
      shortDescription: 'Comprehensive visual brand guidelines, logo suite, gold foil stationery, and social media aesthetic templates.',
      description: 'Developed an elegant brand identity embodying timeless sophistication with deep royal blue and gold accents, balanced typography, and cohesive collateral for digital and print.',
      role: 'Brand Identity Designer',
      toolsUsed: ['Adobe Illustrator', 'Photoshop', 'Canva Pro'],
      challenge: 'The brand lacked a cohesive visual language across packaging, business cards, and social channels, diluting perceived value.',
      goal: 'Design a unified, premium visual system with full brand identity guidelines and production-ready print collateral.',
      strategy: 'Crafted a distinct monogram mark, curated a high-contrast serif and geometric sans font pairing, and created clean guidelines for consistent color use.',
      workDone: [
        'Logo suite (Primary, Secondary, Submark, Favicon)',
        'Color palette specification (CMYK, RGB, HEX, Pantone)',
        'Double-sided business card with gold foil treatment',
        'Social media banner and template kit',
      ],
      result: 'Successfully revitalized brand perception, enabling the client to confidently pitch higher-tier corporate partnerships.',
      isCaseStudy: true,
      featured: true,
      status: 'Published',
      order: 2,
    },
    {
      id: 'proj-3',
      name: 'AI-Generated Vertical Video Campaign',
      client: 'Tech & Lifestyle Creator',
      category: 'Creative Content',
      subCategory: 'AI Video',
      service: 'AI Video Creation & Editing',
      date: 'January 2026',
      thumbnail: 'images/ai_creative_production_1790992176708.jpg',
      gallery: [
        'images/ai_creative_production_1790992176708.jpg',
      ],
      shortDescription: 'Production of short-form educational Reels utilizing AI scripting, natural voiceover synthesis, and dynamic kinetic subtitles.',
      description: 'Streamlined short-form video output by integrating generative AI tools into the script-to-screen workflow, delivering engaging, high-retention content for Reels and Shorts.',
      role: 'Creative AI Content Producer',
      toolsUsed: ['CapCut', 'ElevenLabs', 'ChatGPT', 'Canva Pro'],
      challenge: 'Producing regular vertical video content was taking too many hours of manual recording and editing.',
      goal: 'Establish an agile production workflow capable of delivering 4 high-quality vertical videos per week without sacrificing quality.',
      strategy: 'Implemented structured AI prompt templates for script formulation, paired with realistic voice synthesis and animated B-roll styling.',
      workDone: [
        'Script structuring with 3-second hook formulas',
        'AI voiceover generation and audio mastering',
        'Kinetic typography subtitles and sound effect design',
        'Multi-platform optimization for Instagram Reels and YouTube Shorts',
      ],
      result: 'Significantly shortened video turnaround time while achieving consistent engagement and organic follower reach.',
      isCaseStudy: true,
      featured: true,
      status: 'Published',
      order: 3,
    },
    {
      id: 'proj-4',
      name: 'YouTube Channel Optimization & Thumbnail Refresh',
      client: 'Educational Content Channel',
      category: 'Creative Content',
      subCategory: 'YouTube Marketing',
      service: 'YouTube Marketing',
      date: 'March 2026',
      thumbnail: 'images/marketing_campaign_showcase_1790992154996.jpg',
      gallery: ['images/marketing_campaign_showcase_1790992154996.jpg'],
      shortDescription: 'End-to-end channel SEO audit, keyword-optimized titles and descriptions, and high-CTR custom thumbnail system.',
      description: 'Audited the channel to uncover organic search opportunities. Redesigned thumbnails using bold typography and high-contrast facial expressions to capture more clicks.',
      role: 'YouTube Strategy Specialist',
      toolsUsed: ['YouTube Studio', 'Canva', 'Photoshop'],
      challenge: 'Great video content that suffered from low click-through rates due to cluttered thumbnails and unoptimized titles.',
      goal: 'Improve click-through rate (CTR) and establish searchable metadata for evergreen video topics.',
      strategy: 'Designed simplified, high-contrast thumbnail templates and rewrote titles around search queries with proven audience demand.',
      workDone: [
        'Redesign of 10 video thumbnails',
        'Keyword research for video tags and descriptions',
        'End-screen and playlist organization',
      ],
      result: 'Measurable uplift in initial click-through rate on updated videos and higher organic search impressions.',
      isCaseStudy: false,
      featured: false,
      status: 'Published',
      order: 4,
    },
  ],

  caseStudies: [
    {
      id: 'cs-1',
      projectId: 'proj-1',
      title: 'Scaling Paid Customer Acquisition via Targeted Meta Funnels',
      client: 'Retail & Fashion Client',
      category: 'Performance Marketing',
      service: 'Facebook & Instagram Ads',
      thumbnail: 'images/marketing_campaign_showcase_1790992154996.jpg',
      overview: 'A complete campaign restructuring designed to eliminate ad spend waste and capture high-intent buyers through segmented creative testing.',
      challenge: 'The client had been running boosted posts with no conversion tracking, resulting in high clicks but minimal verified purchases.',
      goal: 'Build a sustainable sales funnel on Meta platforms with precise audience targeting and reliable conversion tracking.',
      strategy: 'Implemented Meta Pixel with custom purchase events, developed a 3-tier audience hierarchy (Cold Prospecting, Warm Engagers, Cart Abandoners), and designed eye-catching ad visuals.',
      execution: 'Launched split tests across multiple creative formats (Carousels, Static Benefits, Testimonial cards), managed daily bids, and pruned fatigued creatives.',
      result: 'Campaign delivered consistent qualified traffic, successfully lowered cost-per-lead, and generated measurable conversions throughout the active campaign window.',
      finalOutcome: 'The client now has an established evergreen advertising infrastructure that continues to generate reliable customer inquiries.',
      featured: true,
      status: 'Published',
      date: 'March 2026',
      order: 1,
    },
    {
      id: 'cs-2',
      projectId: 'proj-2',
      title: 'From Generic to Iconic: Complete Brand Identity Refresh',
      client: 'Boutique Lifestyle Brand',
      category: 'Creative Content',
      service: 'Brand Identity & Logo Design',
      thumbnail: 'images/brand_identity_design_1790992165631.jpg',
      overview: 'Transforming an outdated, inconsistent visual presence into an elevated luxury brand identity that inspires customer confidence.',
      challenge: 'Disjointed logos across different social handles and low-resolution print materials were hurting customer trust and preventing premium pricing.',
      goal: 'Create an authoritative, cohesive visual system reflecting quality, reliability, and timeless design.',
      strategy: 'Conducted brand positioning workshops, formulated a color palette with deep royal blue and gold accents, and designed versatile logo variations for digital and print formats.',
      execution: 'Created master vector assets, designed physical stationery mockups with gold foil highlights, and produced a clear brand guidelines document.',
      result: 'The client launched their rebranded collateral across digital channels, earning praise from existing customers and successfully raising their average order value.',
      finalOutcome: 'A complete, production-ready design asset library that ensures every future marketing campaign remains perfectly on-brand.',
      featured: true,
      status: 'Published',
      date: 'February 2026',
      order: 2,
    },
  ],

  reviews: [
    {
      id: 'rev-1',
      clientName: 'Shahinur Rahman',
      role: 'Managing Director',
      company: 'Apex Digital Ventures',
      review: 'Karima Moni handled our social media branding and ad campaigns with utmost dedication. Her strategic clarity and prompt communication made working together effortless. She truly understands audience behavior.',
      rating: 5,
      date: 'March 2026',
      service: 'Digital Marketing & Social Media',
      featured: true,
      status: 'Draft',
      order: 1,
    },
    {
      id: 'rev-2',
      clientName: 'Farhana Akhter',
      role: 'Founder',
      company: 'Lumière Lifestyle',
      review: 'The brand identity design Karima created for our boutique exceeded our expectations. The deep royal blue and gold palette she recommended gave our brand the exact high-end look we wanted.',
      rating: 5,
      date: 'February 2026',
      service: 'Brand Identity & Graphic Design',
      featured: true,
      status: 'Draft',
      order: 2,
    },
    {
      id: 'rev-3',
      clientName: 'Tanvir Hossain',
      role: 'Content Creator',
      company: 'Tech Pulse Channel',
      review: 'Her understanding of YouTube thumbnail design and AI-assisted video workflows has been a game-changer for our channel. Fast turnaround, great eye for detail, and very professional.',
      rating: 5,
      date: 'January 2026',
      service: 'YouTube Marketing & AI Content',
      featured: true,
      status: 'Draft',
      order: 3,
    },
  ],

  blogPosts: [
    {
      id: 'blog-1',
      title: 'What Is Digital Marketing? A Complete Beginner’s Guide',
      slug: 'what-is-digital-marketing-guide',
      coverImage: 'images/marketing_campaign_showcase_1790992154996.jpg',
      category: 'Digital Marketing',
      excerpt: 'Understand the fundamental pillars of digital marketing, from search engines to social media, and how modern businesses leverage them to grow.',
      content: `Digital marketing is the practice of promoting products, services, or brands through digital channels such as search engines, social media platforms, email, and websites. Unlike traditional marketing methods like print advertisements or billboards, digital marketing allows businesses to measure performance in real time, target exact audience demographics, and adjust campaigns dynamically.

### The Core Pillars of Digital Marketing

1. **Search Engine Marketing (SEO & SEM)**: Ensuring your business appears when potential customers search for answers or products online.
2. **Social Media Marketing**: Building authentic relationships with communities on platforms like Facebook, Instagram, LinkedIn, and YouTube.
3. **Content Marketing**: Providing genuine value through educational articles, guides, and videos that build trust before asking for a sale.
4. **Email Marketing**: Direct, personalized communication with subscribers who have explicitly opted in to hear from you.

### Why Digital Marketing Matters Today
Every consumer begins their buying journey online. A clear, cohesive digital strategy ensures you meet potential clients at every stage of their decision-making process.`,
      author: 'Karima Moni',
      readTime: '4 min read',
      tags: ['Digital Marketing', 'Strategy', 'Beginner Guide'],
      seoTitle: 'What Is Digital Marketing? Comprehensive Guide by Karima Moni',
      seoDescription: 'Learn what digital marketing is and how to use search, social media, and content to grow your business online.',
      publishDate: 'March 25, 2026',
      status: 'Published',
      featured: true,
      order: 1,
    },
    {
      id: 'blog-2',
      title: 'Why Does Every Business Need Social Media Marketing?',
      slug: 'why-businesses-need-social-media-marketing',
      coverImage: 'images/marketing_campaign_showcase_1790992154996.jpg',
      category: 'Digital Marketing',
      excerpt: 'Discover why active social media channels are essential for brand credibility, customer engagement, and consistent lead generation.',
      content: `Social media is no longer just a place to share casual photos; it is the modern storefront and customer service desk of every reputable business. When a prospective customer hears about your company, their immediate instinct is to look you up on Facebook, Instagram, or LinkedIn.

### 1. Instant Credibility & Trust
An active social profile with recent posts, customer testimonials, and clear contact information signals that your business is active, reliable, and responsive.

### 2. Direct Audience Connection
Social media enables direct two-way conversations through comments and direct messages, providing immediate insights into what your target market truly wants.

### 3. Cost-Effective Targeted Reach
Compared to traditional advertising channels, social platforms allow you to test concepts, refine messaging, and target specific geographic or interest groups with precision budgets.`,
      author: 'Karima Moni',
      readTime: '5 min read',
      tags: ['Social Media', 'Branding', 'Business Growth'],
      seoTitle: 'Why Every Business Needs Social Media Marketing in 2026',
      seoDescription: 'Explore the key business benefits of active social media marketing for brand trust and customer acquisition.',
      publishDate: 'March 20, 2026',
      status: 'Published',
      featured: true,
      order: 2,
    },
    {
      id: 'blog-3',
      title: 'Facebook Ads vs Google Ads: Which One Is Better for Your Business?',
      slug: 'facebook-ads-vs-google-ads-comparison',
      coverImage: 'images/marketing_campaign_showcase_1790992154996.jpg',
      category: 'Digital Marketing',
      excerpt: 'A clear breakdown of intent-based search advertising versus demand-generation social advertising, and how to choose the right platform.',
      content: `One of the most common questions entrepreneurs ask is: "Should I invest my budget in Facebook Ads or Google Ads?" The truth is that both platforms excel at different stages of the buyer journey.

### Google Ads: Capturing Active Intent
Google Ads is intent-driven. When someone searches for "best graphic designer near me" or "hire digital marketing specialist," they already have a problem and are actively seeking a solution. Google Ads captures this high-intent demand.

### Facebook Ads: Generating Latent Demand
Facebook and Instagram ads are visual and interest-driven. Users are not searching for your service; instead, your creative visual interrupts their feed, captures their curiosity, and introduces them to a solution they didn’t know existed.

### The Ideal Strategy
For fast direct sales with existing search volume, Google Ads is king. For building brand awareness, showcasing visual transformations, and nurturing a community, Facebook Ads is unmatched. A balanced strategy often uses Facebook for prospecting and Google for capturing brand searches.`,
      author: 'Karima Moni',
      readTime: '6 min read',
      tags: ['Facebook Ads', 'Google Ads', 'PPC Strategy'],
      seoTitle: 'Facebook Ads vs Google Ads Comparison – Karima Moni',
      seoDescription: 'Compare Facebook Ads and Google Ads to find the right advertising channel for your budget and growth goals.',
      publishDate: 'March 15, 2026',
      status: 'Published',
      order: 3,
    },
    {
      id: 'blog-4',
      title: 'What Is SEO & Why Is Keyword Research Critical?',
      slug: 'what-is-seo-and-keyword-research',
      coverImage: 'images/brand_identity_design_1790992165631.jpg',
      category: 'SEO',
      excerpt: 'How search engine optimization works and why choosing the right keyword targets makes or breaks your website traffic.',
      content: `Search Engine Optimization (SEO) is the science and art of increasing organic visibility on search engines like Google. Good SEO means your website appears when users search for topics relevant to your services.

### The Foundation: Keyword Research
Keyword research isn't just about finding words with high search volume. It is about understanding **search intent**:
- **Informational Intent**: "What is digital marketing?" (User wants to learn)
- **Commercial Intent**: "Best social media tools 2026" (User is comparing options)
- **Transactional Intent**: "Hire digital marketing specialist in Bangladesh" (User is ready to hire)

Targeting transactional keywords ensures that your website visitors are people genuinely looking for your expertise, not casual browsers.`,
      author: 'Karima Moni',
      readTime: '4 min read',
      tags: ['SEO', 'Keyword Research', 'Organic Growth'],
      seoTitle: 'What Is SEO & Why Keyword Research Matters – Karima Moni',
      seoDescription: 'Understand the power of SEO and targeted keyword research to drive organic leads to your website.',
      publishDate: 'March 10, 2026',
      status: 'Published',
      order: 4,
    },
    {
      id: 'blog-5',
      title: '5 Tips for Better Short Videos & Engaging Reels',
      slug: '5-tips-better-short-videos-engaging-reels',
      coverImage: 'images/ai_creative_production_1790992176708.jpg',
      category: 'Video Editing',
      excerpt: 'Practical techniques to craft high-retention vertical videos that hook viewers in the first 3 seconds.',
      content: `Short-form vertical video is currently the fastest way to gain organic reach on Instagram, TikTok, and YouTube. Here are 5 practical rules for creating reels that hold viewer attention:

1. **The 3-Second Hook**: Open with an engaging visual action or a provocative question. Do not start with a slow intro or logo sting.
2. **Dynamic Kinetic Captions**: Over 60% of users watch videos on mute. Bold, high-contrast subtitles ensure your message is delivered regardless of audio settings.
3. **Pacing and Micro-Cuts**: Remove breaths, long pauses, and filler words. Keep the visual rhythm brisk with subtle zooms and B-roll transitions.
4. **Deliver on the Promise**: If your title promises "3 Tools to Grow Your Business," dive straight into tool #1 without rambling.
5. **Clear Call-to-Action**: End with a single, clear directive (e.g., "Save this for your next campaign" or "Comment 'GUIDE' to receive the PDF").`,
      author: 'Karima Moni',
      readTime: '4 min read',
      tags: ['Video Editing', 'Reels', 'Shorts'],
      seoTitle: '5 Tips for Engaging Short Videos & Reels by Karima Moni',
      seoDescription: 'Master the art of high-retention short videos and Instagram Reels with these 5 actionable editing tips.',
      publishDate: 'March 05, 2026',
      status: 'Published',
      order: 5,
    },
    {
      id: 'blog-6',
      title: 'AI Video Creation for Beginners: Getting Started with Generative Tools',
      slug: 'ai-video-creation-for-beginners',
      coverImage: 'images/ai_creative_production_1790992176708.jpg',
      category: 'AI',
      excerpt: 'A beginner-friendly overview of how generative AI simplifies video scriptwriting, voiceovers, and asset creation.',
      content: `Artificial intelligence has transformed video production from an expensive studio-bound process into an accessible creative discipline.

### How Beginners Can Leverage AI Today:
- **Ideation & Outlining**: Use tools like ChatGPT or Gemini to brainstorm video concepts, title variations, and conversational scripts.
- **Voiceover Synthesis**: Modern AI voice engines provide warm, natural narration that saves hours of microphone setup and retakes.
- **Automated Captioning & Cut Detection**: Video editors like CapCut utilize AI to automatically transcribe speech, generate subtitles, and identify silence.

### The Golden Rule: Human Touch
AI provides speed, but human judgment provides authenticity. Always review and personalize AI-generated scripts to reflect your personal voice and genuine values.`,
      author: 'Karima Moni',
      readTime: '5 min read',
      tags: ['AI Video', 'Generative AI', 'Video Production'],
      seoTitle: 'AI Video Creation for Beginners – Guide by Karima Moni',
      seoDescription: 'Discover how beginners can use modern generative AI tools to accelerate video production workflows.',
      publishDate: 'February 28, 2026',
      status: 'Published',
      order: 6,
    },
    {
      id: 'blog-7',
      title: 'Visual Identity & Graphic Design: Why Cohesive Branding Drives Conversions',
      slug: 'visual-identity-graphic-design-branding',
      coverImage: 'images/brand_identity_design_1790992165631.jpg',
      category: 'Graphic Design',
      excerpt: 'Discover why consistent typography, color palettes, and polished social visuals significantly elevate customer trust and conversion rates.',
      content: `Visual communication is the silent ambassador of your brand. Before a prospective customer reads a single paragraph of your copy or examines your pricing table, they have already made subconscious judgments about your credibility based on visual design.

### 1. Consistent Color & Brand Recall
Using consistent primary brand colors (such as deep royal blue and gold) across logos, social carousels, and landing pages increases brand recognition by up to 80%. When customers see your palette consistently, it signals stability and attention to detail.

### 2. Typographic Hierarchy
Good typography is invisible; bad typography is glaring. Proper type hierarchy guides the reader's eye effortlessly from the headline to the core benefit, ensuring key value propositions are absorbed instantly.

### 3. High-Converting Social Assets
Clean, uncrowded graphics with deliberate contrast stop the endless social feed scroll. A thoughtful combination of authentic photography, clean negative space, and clear typography consistently outperforms generic templated visuals.`,
      author: 'Karima Moni',
      readTime: '5 min read',
      tags: ['Graphic Design', 'Branding', 'Visual Identity'],
      seoTitle: 'Visual Identity & Graphic Design Guide by Karima Moni',
      seoDescription: 'Learn why cohesive graphic design and brand identity are critical for customer trust and digital conversions.',
      publishDate: 'February 20, 2026',
      status: 'Published',
      order: 7,
    },
  ],

  skills: [
    // Digital Marketing
    { id: 'sk-1', name: 'Facebook Ads', category: 'Digital Marketing', order: 1 },
    { id: 'sk-2', name: 'Google Ads', category: 'Digital Marketing', order: 2 },
    { id: 'sk-3', name: 'Social Media Marketing', category: 'Digital Marketing', order: 3 },
    { id: 'sk-4', name: 'YouTube Marketing', category: 'Digital Marketing', order: 4 },
    { id: 'sk-5', name: 'SEO', category: 'Digital Marketing', order: 5 },
    { id: 'sk-6', name: 'Content Writing', category: 'Digital Marketing', order: 6 },
    { id: 'sk-7', name: 'Email Marketing', category: 'Digital Marketing', order: 7 },
    { id: 'sk-8', name: 'Lead Generation', category: 'Digital Marketing', order: 8 },
    { id: 'sk-9', name: 'Content Marketing', category: 'Digital Marketing', order: 9 },

    // Creative
    { id: 'sk-10', name: 'Graphic Design', category: 'Creative', order: 10 },
    { id: 'sk-11', name: 'Social Media Design', category: 'Creative', order: 11 },
    { id: 'sk-12', name: 'Branding', category: 'Creative', order: 12 },
    { id: 'sk-13', name: 'Content Creation', category: 'Creative', order: 13 },
    { id: 'sk-14', name: 'Logo Design', category: 'Creative', order: 14 },
    { id: 'sk-15', name: 'Brand Identity', category: 'Creative', order: 15 },

    // AI & Video
    { id: 'sk-16', name: 'Video Editing', category: 'AI & Video', order: 16 },
    { id: 'sk-17', name: 'Short-form Video', category: 'AI & Video', order: 17 },
    { id: 'sk-18', name: 'Product Video', category: 'AI & Video', order: 18 },
    { id: 'sk-19', name: 'AI Video Creation', category: 'AI & Video', order: 19 },
    { id: 'sk-20', name: 'AI Image Generation', category: 'AI & Video', order: 20 },
    { id: 'sk-21', name: 'AI Content Creation', category: 'AI & Video', order: 21 },
    { id: 'sk-22', name: 'AI Automation', category: 'AI & Video', order: 22 },
    { id: 'sk-23', name: 'ChatGPT Support', category: 'AI & Video', order: 23 },
  ],

  tools: [
    { id: 'tool-1', name: 'Meta Business Suite', category: 'Marketing', order: 1 },
    { id: 'tool-2', name: 'Facebook Ads Manager', category: 'Advertising', order: 2 },
    { id: 'tool-3', name: 'Google Ads', category: 'Advertising', order: 3 },
    { id: 'tool-4', name: 'Google Analytics', category: 'Analytics', order: 4 },
    { id: 'tool-5', name: 'Google Search Console', category: 'SEO', order: 5 },
    { id: 'tool-6', name: 'Canva Pro', category: 'Design', order: 6 },
    { id: 'tool-7', name: 'CapCut', category: 'Video', order: 7 },
    { id: 'tool-8', name: 'AI Generative Tools', category: 'AI', order: 8 },
    { id: 'tool-9', name: 'Google Workspace', category: 'Productivity', order: 9 },
  ],

  experience: [
    {
      id: 'exp-1',
      role: 'Digital Marketing Specialist',
      period: '2026 – Present',
      description: 'Working on digital marketing strategy, social media campaigns, content calendars, and targeted online growth projects for brands and businesses.',
      highlights: [
        'Strategic planning and execution of paid Meta and Google ad campaigns',
        'Audience research, custom audience segmentation, and retargeting workflows',
        'Performance tracking and conversion rate optimization',
      ],
      order: 1,
    },
    {
      id: 'exp-2',
      role: 'Graphic Design & Creative Content',
      period: '2026 – Present',
      description: 'Creating professional social media graphics, branding materials, promotional collateral, and high-impact visual presentations.',
      highlights: [
        'Developing unified visual identities and brand guidelines',
        'Designing scroll-stopping social media carousels and promotional posters',
        'Exporting print-ready stationery and digital marketing assets',
      ],
      order: 2,
    },
    {
      id: 'exp-3',
      role: 'Video Editing & AI Content Creation',
      period: '2026 – Present',
      description: 'Creating short-form vertical videos, promotional reels, and AI-assisted content production pipelines for digital platforms.',
      highlights: [
        'Producing high-retention Reels, TikToks, and YouTube Shorts',
        'Leveraging AI voice synthesis, prompt engineering, and automated captioning',
        'Optimizing video pacing with kinetic typography and sound design',
      ],
      order: 3,
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'Digital Marketing Institute & Professional Academy',
      course: 'Advanced Digital Marketing & Performance Advertising Certification',
      skills: ['Meta Ads', 'Google Ads', 'Analytics', 'Conversion Funnels', 'SEO'],
      date: '2025 – 2026',
      certificateUrl: '',
      order: 1,
    },
    {
      id: 'edu-2',
      institution: 'Creative Media Academy',
      course: 'Graphic Design Masterclass & Brand Identity Systems',
      skills: ['Brand Identity', 'Typography', 'Color Theory', 'Canva Pro', 'Photoshop'],
      date: '2025 – 2026',
      certificateUrl: '',
      order: 2,
    },
    {
      id: 'edu-3',
      institution: 'Modern AI Studio Lab',
      course: 'Generative AI Workflows for Marketing & Video Creation',
      skills: ['AI Content', 'AI Video', 'Prompt Engineering', 'Workflow Automation'],
      date: '2026',
      certificateUrl: '',
      order: 3,
    },
  ],

  resumes: [
    {
      id: 'cv-active',
      version: 'v2026.1',
      date: 'October 2026',
      title: 'Karima Moni – Professional CV (Digital Marketing Specialist)',
      fileUrl: 'cv/karima_moni_cv_2026.pdf',
      fileName: 'Karima_Moni_CV_2026.pdf',
      fileSize: '420 KB',
      isActive: true,
      notes: 'Current CV available for download.',
    },
  ],

  socialLinks: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    whatsapp: 'https://wa.me/8801714810035',
    pinterest: '',
    x: '',
    tiktok: '',
  },

  contactInfo: {
    phone: '01714-810035',
    whatsappNumber: '01714-810035',
    email: 'digitalkarimamoni@gmail.com',
    location: 'Dhaka, Bangladesh · Remote Worldwide',
    workingHours: 'Saturday – Thursday: 9:00 AM – 8:00 PM',
  },

  seoSettings: {
    siteTitle: 'Karima Moni – Digital Marketing Specialist',
    metaDescription: 'Karima Moni is a digital marketing specialist helping businesses with paid advertising, social media and creative content.',
    ogImage: 'images/karima_hero_portrait_1790992143360.jpg',
    keywords: '',
    canonicalUrl: 'https://karimamoni.github.io/Karima-Moni/',
  },

  leads: [],

  mediaLibrary: [
    {
      id: 'media-1',
      name: 'Karima Moni Studio Portrait',
      url: 'images/karima_hero_portrait_1790992143360.jpg',
      type: 'image',
      size: '280 KB',
      uploadedAt: '2026-10-02',
    },
    {
      id: 'media-2',
      name: 'Marketing Campaign Dashboard',
      url: 'images/marketing_campaign_showcase_1790992154996.jpg',
      type: 'image',
      size: '340 KB',
      uploadedAt: '2026-10-02',
    },
    {
      id: 'media-3',
      name: 'Luxury Brand Identity Mockup',
      url: 'images/brand_identity_design_1790992165631.jpg',
      type: 'image',
      size: '310 KB',
      uploadedAt: '2026-10-02',
    },
    {
      id: 'media-4',
      name: 'AI Video Production Workspace',
      url: 'images/ai_creative_production_1790992176708.jpg',
      type: 'image',
      size: '390 KB',
      uploadedAt: '2026-10-02',
    },
  ],

  settings: {
    cvButtonsEnabled: true,
    stickyCtaEnabled: true,
  },
};
