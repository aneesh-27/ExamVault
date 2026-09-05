// Central mock data store for StudyAI — swap these for real API calls later.
import {
  LayoutDashboard, FileText, MessageSquare, HelpCircle, BookOpen, Layers,
  ClipboardList, Calendar, TrendingUp, Settings as SettingsIcon,
} from "lucide-react";

const DOCUMENTS = [
  {
    id: "doc1", name: "Engineering Mathematics.pdf", type: "PDF", pages: 86,
    topicsDetected: 8, uploadedAt: "2 hours ago", progress: 68,
    topics: [
      { name: "Linear Algebra", mastery: 82 },
      { name: "Differential Equations", mastery: 55 },
      { name: "Laplace Transforms", mastery: 40 },
      { name: "Complex Analysis", mastery: 70 },
    ],
  },
  {
    id: "doc2", name: "Computer Networks.pdf", type: "PDF", pages: 86,
    topicsDetected: 6, uploadedAt: "1 day ago", progress: 45,
    topics: [
      { name: "OSI Model", mastery: 90 },
      { name: "TCP/IP", mastery: 60 },
      { name: "Network Topologies", mastery: 75 },
      { name: "Routing Algorithms", mastery: 30 },
      { name: "Transport Layer", mastery: 85 },
      { name: "Application Layer", mastery: 65 },
    ],
  },
  {
    id: "doc3", name: "Operating Systems.pdf", type: "PDF", pages: 64,
    topicsDetected: 5, uploadedAt: "3 days ago", progress: 22,
    topics: [
      { name: "Processes", mastery: 50 },
      { name: "Memory Management", mastery: 20 },
      { name: "Scheduling", mastery: 35 },
      { name: "Deadlocks", mastery: 15 },
      { name: "File Systems", mastery: 40 },
    ],
  },
  {
    id: "doc4", name: "Data Structures.pdf", type: "PPTX", pages: 120,
    topicsDetected: 6, uploadedAt: "5 days ago", progress: 91,
    topics: [
      { name: "Arrays", mastery: 95 },
      { name: "Linked Lists", mastery: 88 },
      { name: "Trees", mastery: 92 },
      { name: "Graphs", mastery: 80 },
    ],
  },
];

const QUIZ_BANK = [
  { q: "Which OSI layer is responsible for routing packets between networks?", options: ["Data Link", "Network", "Transport", "Session"], correct: 1, topic: "OSI Model", explanation: "The Network layer (Layer 3) handles logical addressing and routing between different networks." },
  { q: "What does TCP guarantee that UDP does not?", options: ["Lower latency", "Ordered, reliable delivery", "Smaller header size", "Multicast support"], correct: 1, topic: "TCP/IP", explanation: "TCP is connection-oriented and guarantees ordered, reliable delivery via acknowledgements and retransmission." },
  { q: "In a star topology, what happens if the central node fails?", options: ["Only one device is affected", "The entire network goes down", "Nothing, it self-heals", "Only new connections are blocked"], correct: 1, topic: "Network Topologies", explanation: "Because every device connects through the central hub/switch, its failure takes down the whole network." },
  { q: "Which routing algorithm uses the Bellman-Ford equation?", options: ["Link State", "Distance Vector", "Path Vector", "Flooding"], correct: 1, topic: "Routing Algorithms", explanation: "Distance Vector routing (e.g. RIP) computes shortest paths using the Bellman-Ford equation." },
  { q: "Which layer is responsible for end-to-end flow control?", options: ["Physical", "Network", "Transport", "Presentation"], correct: 2, topic: "Transport Layer", explanation: "The Transport layer manages flow control and reliable end-to-end delivery between hosts." },
  { q: "HTTP operates primarily at which OSI layer?", options: ["Transport", "Session", "Application", "Presentation"], correct: 2, topic: "Application Layer", explanation: "HTTP is an application-layer protocol used for web communication." },
  { q: "What is the primary purpose of subnetting?", options: ["Increase bandwidth", "Divide a network into smaller segments", "Encrypt traffic", "Compress packets"], correct: 1, topic: "TCP/IP", explanation: "Subnetting divides a larger network into smaller, more manageable segments for efficiency and security." },
  { q: "Which device operates at the Data Link layer?", options: ["Router", "Switch", "Hub", "Repeater"], correct: 1, topic: "OSI Model", explanation: "Switches use MAC addresses to forward frames, operating at Layer 2 (Data Link)." },
  { q: "In mesh topology, connections between n nodes require how many links?", options: ["n", "n log n", "n(n-1)/2", "2n"], correct: 2, topic: "Network Topologies", explanation: "A fully connected mesh needs n(n-1)/2 links so every node connects directly to every other node." },
  { q: "Link State routing floods information about:", options: ["Only neighbor costs", "The entire network topology", "Only the destination", "Nothing, it uses static tables"], correct: 1, topic: "Routing Algorithms", explanation: "Link State protocols (e.g. OSPF) flood topology information so each router builds a full map of the network." },
];

const FLASHCARDS = [
  { q: "What is mutual induction?", a: "The phenomenon in which a change in current in one coil induces an EMF in a neighboring coil, due to the changing magnetic flux linking both coils.", topic: "Engineering Mathematics" },
  { q: "Define the OSI Model.", a: "A 7-layer conceptual framework (Physical, Data Link, Network, Transport, Session, Presentation, Application) that standardizes how different systems communicate over a network.", topic: "Computer Networks" },
  { q: "What is a deadlock?", a: "A state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the set.", topic: "Operating Systems" },
  { q: "What is the time complexity of binary search?", a: "O(log n), since the search space is halved on every comparison.", topic: "Data Structures" },
  { q: "What is the Laplace Transform used for?", a: "It converts a differential equation in the time domain into an algebraic equation in the frequency (s) domain, making it easier to solve linear systems.", topic: "Engineering Mathematics" },
  { q: "Differentiate TCP and UDP.", a: "TCP is connection-oriented, reliable, and ordered. UDP is connectionless, faster, and does not guarantee delivery or order.", topic: "Computer Networks" },
  { q: "What is virtual memory?", a: "A memory management technique that gives an application the illusion of a large, contiguous address space by mapping it to physical memory and disk.", topic: "Operating Systems" },
  { q: "What is a self-balancing binary search tree?", a: "A BST that automatically keeps its height small (e.g. AVL, Red-Black trees) by rebalancing after insertions/deletions, keeping operations at O(log n).", topic: "Data Structures" },
];

const WEEKLY_ACTIVITY = [
  { day: "Mon", hours: 1.5 }, { day: "Tue", hours: 2.2 }, { day: "Wed", hours: 0.8 },
  { day: "Thu", hours: 2.8 }, { day: "Fri", hours: 1.1 }, { day: "Sat", hours: 3.4 }, { day: "Sun", hours: 2.0 },
];
const SCORE_TREND = [
  { attempt: "Quiz 1", score: 55 }, { attempt: "Quiz 2", score: 62 }, { attempt: "Quiz 3", score: 58 },
  { attempt: "Quiz 4", score: 71 }, { attempt: "Quiz 5", score: 68 }, { attempt: "Quiz 6", score: 78 },
];
const TOPIC_MASTERY_RADAR = [
  { topic: "OSI Model", value: 90 }, { topic: "TCP/IP", value: 60 }, { topic: "Topologies", value: 75 },
  { topic: "Routing", value: 30 }, { topic: "Transport", value: 85 }, { topic: "Application", value: 65 },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "documents", label: "My Documents", icon: FileText },
  { id: "chat", label: "AI Chat", icon: MessageSquare },
  { id: "quiz-setup", label: "Quiz", icon: HelpCircle },
  { id: "summary", label: "Summaries", icon: BookOpen },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "mock-exam", label: "Mock Exams", icon: ClipboardList },
  { id: "planner", label: "Study Planner", icon: Calendar },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];


const SUMMARY_CONTENT = {
  "OSI Model": {
    overview: "The OSI Model is a 7-layer conceptual framework that standardizes how different computer systems communicate over a network, from physical transmission up to the application the user interacts with.",
    concepts: ["Each layer serves the layer above it and is served by the layer below.", "Data is encapsulated with headers as it moves down the stack on the sender's side.", "The mnemonic 'Please Do Not Throw Sausage Pizza Away' recalls the 7 layers in order."],
    definitions: [["Encapsulation", "The process of wrapping data with protocol-specific headers as it passes down through each layer."], ["Protocol Data Unit (PDU)", "The name given to data at each layer — e.g. segment (Transport), packet (Network), frame (Data Link)."]],
    formulas: [],
    examTips: ["Layer order (top to bottom) is a very common 2-mark question — memorize both the name and number.", "Be ready to map real devices (router, switch, hub) to their OSI layer."],
  },
  "TCP/IP": {
    overview: "TCP/IP is the practical 4-layer protocol suite that the modern internet actually runs on, condensing the OSI model's 7 layers into Application, Transport, Internet, and Network Access.",
    concepts: ["TCP provides reliable, ordered, connection-oriented delivery via a 3-way handshake.", "UDP is connectionless and faster, used where speed matters more than reliability (e.g. video streaming).", "IP addressing and routing happen at the Internet layer."],
    definitions: [["Three-way handshake", "The SYN, SYN-ACK, ACK exchange TCP uses to establish a reliable connection before data transfer."], ["Port number", "A 16-bit value identifying a specific process or service on a host."]],
    formulas: [],
    examTips: ["Be prepared to compare TCP vs UDP in a table format — a frequent exam pattern.", "Know common port numbers: HTTP (80), HTTPS (443), FTP (21), DNS (53)."],
  },
};

const MOCK_AI_RESPONSES = {
  transformer: `### Transformer — Working
**Basic Principle**
A transformer works on the principle of mutual electromagnetic induction.
**Working**
1. AC is supplied to the primary winding.
2. Alternating magnetic flux is produced.
3. The flux links with the secondary winding.
4. EMF is induced in the secondary winding.
FORMULA: E = 4.44 f N Φm
TIP: Remember that a transformer requires alternating magnetic flux — it cannot step up or down a pure DC supply.`,
  default: `### {TOPIC}
**Basic Principle**
Here's a structured breakdown grounded in your uploaded document.
**Working**
1. The concept builds on the fundamentals covered earlier in the chapter.
2. Each step follows logically from the underlying definition.
3. Worked examples in the document illustrate the typical exam pattern.
- Commonly tested in 5-mark and 10-mark questions
- Often paired with a labeled diagram
FORMULA: See the highlighted formula box on page 34 of your document
TIP: Practice at least two past-paper variations of this question before your exam.`,
};

export {
  DOCUMENTS,
  QUIZ_BANK,
  FLASHCARDS,
  WEEKLY_ACTIVITY,
  SCORE_TREND,
  TOPIC_MASTERY_RADAR,
  NAV_ITEMS,
  SUMMARY_CONTENT,
  MOCK_AI_RESPONSES,
};
