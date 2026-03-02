# 🚀 Cache Replacement Policy Simulator

A professional, modern cache replacement policy simulator built with Next.js 16, TypeScript, and Framer Motion. Features stunning dark theme UI with real-time animations, perfect for OS mini project presentations.

![Cache Simulator](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=for-the-badge)

## ✨ Features

### Cache Replacement Policies
- **FIFO** (First-In-First-Out)
- **LRU** (Least Recently Used)
- **RANDOM** (Random Replacement)

### Professional UI Components
- **Control Panel** - Intuitive controls with policy badges and step-by-step mode
- **CPU Block** - Animated CPU visualization with glow effects
- **Cache Visualizer** - Vertical memory frames with hit/miss indicators
- **Animated Arrow** - Flowing data visualization between CPU and cache
- **Stats Panel** - Real-time statistics with progress bars and performance metrics

### Advanced Features
- ✅ Real-time hit/miss animation with color-coded indicators (Green = Hit, Red = Miss)
- ✅ Progress bar showing simulation progress
- ✅ Dynamic frame count (1-8 frames)
- ✅ Step-by-step mode toggle
- ✅ Show current page being accessed
- ✅ Display evicted pages
- ✅ Hit rate percentage with performance rating
- ✅ Glassmorphism effects and modern gradients
- ✅ Smooth Framer Motion animations
- ✅ Fully responsive layout (mobile-friendly)
- ✅ Professional dark theme (slate/zinc)

## 🎨 Design Highlights

- **Modern Dark Theme** - Slate/zinc color palette with gradient accents
- **Glassmorphism** - Backdrop blur and semi-transparent panels
- **Smooth Animations** - Framer Motion powered transitions
- **Visual Feedback** - Color-coded hit (green) and miss (red) states
- **Professional Typography** - Gradient headings and clear hierarchy
- **Shadow Effects** - Soft shadows and glow effects
- **Responsive Design** - Adapts to desktop and mobile screens

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd cache-simulator

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
cache-simulator/
├── app/
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Simulator.tsx        # Main simulator orchestrator
│   ├── ControlPanel.tsx     # Left side control panel
│   ├── CpuBlock.tsx         # CPU visualization
│   ├── CacheVisualizer.tsx  # Cache memory frames
│   ├── AnimatedArrow.tsx    # Data flow arrow
│   └── StatsPanel.tsx       # Statistics and metrics
└── public/                  # Static assets
```

## 🎯 Usage

1. **Enter Reference String** - Input page numbers separated by commas (e.g., `7,0,1,2,0,3,0,4,2,3,0,3,2`)
2. **Select Cache Frames** - Use the slider to choose number of frames (1-8)
3. **Choose Policy** - Select FIFO, LRU, or RANDOM
4. **Toggle Step Mode** - Enable for manual stepping (optional)
5. **Run Simulation** - Click "Run Simulation" to start
6. **View Results** - Watch animated visualization and check statistics

## 📊 Component Details

### ControlPanel
- Reference string input
- Frame count slider
- Policy selection buttons
- Step-by-step toggle
- Run/Reset buttons
- Active policy badge

### CpuBlock
- Animated CPU icon
- Current page display
- Pulsing glow effect
- Corner decorations

### CacheVisualizer
- Vertical memory frames
- Hit/Miss indicators
- Active frame highlighting
- Evicted page notifications
- Shimmer effects

### StatsPanel
- Hit/Miss counters
- Progress bar
- Hit rate percentage
- Performance rating
- Animated progress updates

## 🛠️ Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animation library
- **React 19** - UI library

## 🎓 Educational Value

This simulator helps visualize and understand:
- How different cache replacement policies work
- The concept of cache hits and misses
- Performance comparison between policies
- Impact of frame count on hit rate
- Real-time cache state management

## 📝 License

MIT License - feel free to use for educational purposes

## 👨‍💻 Development

Built with clean, modular code following best practices:
- Component-based architecture
- TypeScript for type safety
- Reusable utility components
- Proper state management
- Smooth animations with Framer Motion
- Responsive design principles

---

**Perfect for OS mini project presentations!** 🎓

