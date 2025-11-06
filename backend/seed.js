const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Sample data for seeding
const practiceRoundsData = [
  {
    name: "Aptitude Test",
    type: "aptitude",
    description: "Quantitative, Logical Reasoning, Verbal Ability",
    difficulty: "Medium",
    duration: 60,
    questions: [
      {
        question: "If a train running at 72 km/hr crosses a pole in 7 seconds, what is the length of the train?",
        options: ["120 meters", "140 meters", "160 meters", "180 meters"],
        correctAnswer: "140 meters",
        type: "mcq"
      },
      {
        question: "What is the time complexity of binary search algorithm on a sorted array of size n?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correctAnswer: "O(log n)",
        type: "mcq"
      },
      {
        question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "46"],
        correctAnswer: "42",
        type: "mcq"
      },
      {
        question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
        options: ["True", "False", "Cannot be determined", "None of the above"],
        correctAnswer: "True",
        type: "mcq"
      },
      {
        question: "Choose the word closest in meaning to 'EPHEMERAL':",
        options: ["Permanent", "Temporary", "Eternal", "Lasting"],
        correctAnswer: "Temporary",
        type: "mcq"
      },
      {
        question: "A shopkeeper marks his goods 40% above cost price but allows a discount of 20%. What is his gain percent?",
        options: ["10%", "12%", "15%", "20%"],
        correctAnswer: "12%",
        type: "mcq"
      },
      {
        question: "If today is Monday, what day will it be 100 days from now?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correctAnswer: "Tuesday",
        type: "mcq"
      },
      {
        question: "The ratio of boys to girls in a class is 3:2. If there are 15 boys, how many girls are there?",
        options: ["8", "10", "12", "15"],
        correctAnswer: "10",
        type: "mcq"
      },
      {
        question: "Which number should come next: 1, 4, 9, 16, 25, ?",
        options: ["30", "32", "34", "36"],
        correctAnswer: "36",
        type: "mcq"
      },
      {
        question: "If COMPUTER is coded as RFUVQNPC, how is MEDICINE coded?",
        options: ["EOJDJEFM", "NFEJDJOF", "MFEJDJOF", "NFEDJJOF"],
        correctAnswer: "EOJDJEFM",
        type: "mcq"
      }
    ]
  },
  {
    name: "Coding Challenge",
    type: "coding",
    description: "Data Structures, Algorithms, Problem Solving",
    difficulty: "Hard",
    duration: 90,
    questions: [
      {
        question: "What is the output of the following code?\n```python\ndef func(x):\n    return x * 2\nprint(func(5))\n```",
        options: ["5", "10", "25", "Error"],
        correctAnswer: "10",
        type: "mcq"
      },
      {
        question: "Which data structure is best for implementing a browser's back button?",
        options: ["Queue", "Stack", "Tree", "Graph"],
        correctAnswer: "Stack",
        type: "mcq"
      },
      {
        question: "What is the time complexity of inserting an element at the beginning of a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(1)",
        type: "mcq"
      },
      {
        question: "In a binary search tree, which traversal gives nodes in sorted order?",
        options: ["Preorder", "Inorder", "Postorder", "Level order"],
        correctAnswer: "Inorder",
        type: "mcq"
      },
      {
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correctAnswer: "O(n²)",
        type: "mcq"
      },
      {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: ["DFS", "BFS", "Dijkstra's", "Prim's"],
        correctAnswer: "Dijkstra's",
        type: "mcq"
      },
      {
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(n)",
        type: "mcq"
      },
      {
        question: "Which data structure allows insertion and deletion at both ends?",
        options: ["Stack", "Queue", "Deque", "Priority Queue"],
        correctAnswer: "Deque",
        type: "mcq"
      },
      {
        question: "What is the height of a balanced binary tree with n nodes?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)",
        type: "mcq"
      },
      {
        question: "Which technique is used in dynamic programming?",
        options: ["Divide and Conquer", "Greedy", "Memoization", "Backtracking"],
        correctAnswer: "Memoization",
        type: "mcq"
      }
    ]
  },
  {
    name: "HR & Behavioral",
    type: "hr",
    description: "Situational Questions, STAR Method, Company Culture",
    difficulty: "Easy",
    duration: 45,
    questions: [
      {
        question: "Tell me about a time you had to handle a difficult stakeholder. How did you manage the situation?",
        options: [
          "I avoided the stakeholder",
          "I escalated immediately to my manager",
          "I listened to their concerns and found a middle ground",
          "I ignored their feedback"
        ],
        correctAnswer: "I listened to their concerns and found a middle ground",
        type: "mcq"
      },
      {
        question: "Why do you want to work for our company?",
        options: [
          "For the salary",
          "Because you have a great work culture and innovative projects",
          "It's close to my home",
          "I need a job"
        ],
        correctAnswer: "Because you have a great work culture and innovative projects",
        type: "mcq"
      },
      {
        question: "Describe a situation where you had to work under pressure with tight deadlines.",
        options: [
          "I panicked and missed the deadline",
          "I prioritized tasks and communicated with stakeholders",
          "I worked overtime without informing anyone",
          "I blamed team members"
        ],
        correctAnswer: "I prioritized tasks and communicated with stakeholders",
        type: "mcq"
      },
      {
        question: "What is your greatest strength?",
        options: [
          "I'm perfect at everything",
          "Problem-solving and adaptability",
          "I don't have any weaknesses",
          "I work alone always"
        ],
        correctAnswer: "Problem-solving and adaptability",
        type: "mcq"
      },
      {
        question: "How do you handle conflict with team members?",
        options: [
          "I avoid them",
          "I address it directly and professionally",
          "I complain to management",
          "I ignore it"
        ],
        correctAnswer: "I address it directly and professionally",
        type: "mcq"
      },
      {
        question: "Where do you see yourself in 5 years?",
        options: [
          "I don't know",
          "In a leadership role contributing to company growth",
          "Doing the same job",
          "At another company"
        ],
        correctAnswer: "In a leadership role contributing to company growth",
        type: "mcq"
      },
      {
        question: "What motivates you at work?",
        options: [
          "Only money",
          "Solving challenging problems and learning",
          "Getting praise",
          "Leaving early"
        ],
        correctAnswer: "Solving challenging problems and learning",
        type: "mcq"
      },
      {
        question: "Tell me about a time you failed.",
        options: [
          "I never fail",
          "I failed but learned valuable lessons from it",
          "It wasn't my fault",
          "I quit the project"
        ],
        correctAnswer: "I failed but learned valuable lessons from it",
        type: "mcq"
      },
      {
        question: "How do you prioritize tasks when everything is urgent?",
        options: [
          "I do them randomly",
          "I assess impact and dependencies to prioritize",
          "I do the easiest first",
          "I wait for someone to tell me"
        ],
        correctAnswer: "I assess impact and dependencies to prioritize",
        type: "mcq"
      },
      {
        question: "What are your salary expectations?",
        options: [
          "As much as possible",
          "Based on market standards and my experience",
          "Whatever you offer",
          "Double the industry average"
        ],
        correctAnswer: "Based on market standards and my experience",
        type: "mcq"
      }
    ]
  }
];

const courseTopicsData = [
  // Arrays & Hashing
  { category: "Arrays & Hashing", name: "Two Pointers", description: "Use two pointers to solve array problems efficiently", difficulty: "Easy" },
  { category: "Arrays & Hashing", name: "Sliding Window", description: "Efficiently find subarrays by sliding a window", difficulty: "Medium" },
  { category: "Arrays & Hashing", name: "Valid Anagram", description: "Determine if two strings are anagrams", difficulty: "Easy" },
  
  // Linked Lists
  { category: "Linked Lists", name: "Reverse Linked List", description: "Learn to traverse and modify linear data structures", difficulty: "Easy" },
  { category: "Linked Lists", name: "Merge Two Sorted Lists", description: "Combine sorted lists maintaining order", difficulty: "Easy" },
  { category: "Linked Lists", name: "Detect Cycle", description: "Find cycles in linked lists using Floyd's algorithm", difficulty: "Medium" },
  
  // Stacks & Queues
  { category: "Stacks & Queues", name: "Valid Parentheses", description: "Check balanced brackets using stack", difficulty: "Easy" },
  { category: "Stacks & Queues", name: "Min Stack", description: "Design a stack with O(1) min operation", difficulty: "Medium" },
  
  // Trees & Graphs
  { category: "Trees & Graphs", name: "Binary Tree Traversal", description: "Master preorder, inorder, postorder", difficulty: "Medium" },
  { category: "Trees & Graphs", name: "Graph BFS/DFS", description: "Explore graphs using breadth-first and depth-first search", difficulty: "Medium" },
  { category: "Trees & Graphs", name: "Lowest Common Ancestor", description: "Find LCA in binary trees", difficulty: "Medium" }
];

// Seed function
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding');

    // Import models
    const PracticeRound = require('./models/PracticeRound');
    const CourseTopic = require('./models/CourseTopic');

    // Clear existing data
    await PracticeRound.deleteMany({});
    await CourseTopic.deleteMany({});
    console.log('Cleared existing data');

    // Insert practice rounds
    await PracticeRound.insertMany(practiceRoundsData);
    console.log('Practice rounds seeded successfully');

    // Insert course topics
    await CourseTopic.insertMany(courseTopicsData);
    console.log('Course topics seeded successfully');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();

