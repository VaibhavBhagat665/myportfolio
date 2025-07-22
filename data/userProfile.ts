export const userProfile = {
  name: "Vaibhav Bhagat",
  age: 20,
  college: "Indian Institute of Information Technology (IIIT) Sonepat",
  branch: "Information Technology",
  year: "1st year (2024-2028)",
  
  personality: "Vaibhav is a curious and self-driven learner with a passion for building real things using code. He prefers practical knowledge over pure theory and loves working on innovative projects, especially in AI, ML, and web development. He's also grounded, direct, and prefers honest, no-fluff conversations.",

  skills: {
    languages: ["Python (main ML language)", "JavaScript (web dev)", "C++ (academic)", "HTML/CSS (frontend basics)"],
    machineLearning: [
      "Regression, Classification, Support Vector Machines",
      "Scikit-learn",
      "Tried XGBoost and Decision Trees",
      "Comfortable analyzing and cleaning data",
      "Reinforcement Learning basics (Q-learning)"
    ],
    tools: ["Git & GitHub", "VS Code", "Firebase (used in personal projects)"],
    webDev: ["React", "Tailwind CSS", "Basic DOM & Event Handling"],
    other: ["Prompt Engineering", "Basic Project Management", "Portfolio Design"]
  },

  learningJourney: "Started with Python and C++, then built ML models with scikit-learn. Explored regression/classification, and created some ML-based games and price predictors. Recently got into web development using React and Tailwind, and built a storytelling app with Firebase for data storage. Also learning about GenAI and chatbot integrations.",

  projects: [
    {
      name: "Interactive Storytelling App",
      description: "A web app that lets users read and explore story paths by making choices, similar to 'choose your own adventure'. Used Firebase to store branching logic. It was made to learn how to combine frontend with real-time backend.",
      stack: ["HTML", "CSS", "JavaScript", "Firebase"]
    },
    {
      name: "Tic-Tac-Toe Q-learning Agent",
      description: "Built a reinforcement learning agent that learns how to play Tic-Tac-Toe optimally. Helped understand value updates, exploration vs exploitation, and the idea of learning through trial.",
      stack: ["Python"]
    },
    {
      name: "Real Estate Price Prediction",
      description: "Used regression models to predict prices based on features. The project helped sharpen Vaibhav's skills in data preprocessing, encoding, and model evaluation.",
      stack: ["Python", "scikit-learn"]
    }
  ],

  certifications: [
    {
      name: "Machine Learning A-Z",
      platform: "Udemy",
      by: "SuperDataScience",
      year: "2024"
    }
  ],

  aspirations: "Vaibhav is aiming to become an AI Engineer or Research Intern by the 2nd or 3rd year. He’s also open to research labs or startups where he can apply GenAI, NLP, or ML-based decision systems. Eventually, he’s interested in working on systems that blend human creativity with machine intelligence.",

  preferences: {
    tone: "Direct, honest, not overly formal",
    likesAnswerStyle: "Gives solutions with reasoning; doesn’t like vague replies",
    language: "Mostly English but casual tone is okay",
    favoriteTopics: ["GenAI", "Chatbots", "ML Projects", "Coding Challenges", "Clean UI Design"],
    personalityKeywords: ["curious", "builder", "efficient", "realistic"]
  },

  extras: {
    hometown: "Haryana, India",
    likes: ["Coding late night", "Exploring AI tools", "Listening to music while working", "Lifting dumbbells in hostel"],
    habits: ["Sometimes self-releases stress through self-talk or writing", "Feels most productive when focused and not multitasking"],
    beliefs: ["Prefers human-AI collaboration", "Believes AI should assist humans without replacing creativity"]
  }
};
