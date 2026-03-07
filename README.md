# Tic Tac Toe (React.js)

A modern **Tic Tac Toe game with AI opponents and difficulty levels**, built using **React**, **TailwindCSS**, and **Vercel** for deployment.

The project focuses on clean UI, smooth animations, and an AI opponent powered by the **Minimax algorithm** with configurable difficulty levels.

---

## Features

- Play Tic Tac Toe against an AI opponent
- Three AI difficulty levels
- Smart AI using the **Minimax algorithm**
- Smooth UI animations
- Toast notifications using **react-hot-toast**
- Responsive layout
- Deployable on **Vercel**

---

## Tech Stack

- **React**
- **TailwindCSS**
- **React Router**
- **react-hot-toast**
- **Lucide Icons**
- **Motion (Framer Motion)**

---

# How the AI Works

The AI uses the **Minimax algorithm**, a decision-making algorithm commonly used in turn-based games.

Minimax evaluates all possible future board states and assigns scores:

| Result | Score |
|------|------|
| AI wins | +1 |
| Player wins |  -1 |
| Draw |  0 |

The algorithm simulates all possible moves recursively and chooses the move that leads to the **best guaranteed outcome**.

This means:

- The AI **tries to maximize its score**
- It assumes the **player will also play optimally**
- The AI picks the move that results in the **best worst-case scenario**

Because Tic Tac Toe has a very small search space, Minimax can evaluate **the entire game tree instantly**, making the AI extremely strong.

---

# Difficulty Levels

Instead of changing the algorithm itself, the game adjusts the **probability of the AI choosing the optimal Minimax move**. This makes the AI behave more like a human player.

---

## Easy Mode

Easy mode intentionally makes frequent mistakes.

**Move Selection Probabilities**

| Move Type | Probability |
|------|------|
| Random Move | 60% |
| Optimal Minimax Move | 40% |

**Behavior**

- Often ignores winning opportunities
- Frequently fails to block the player
- Best for beginners

---

## Medium Mode

Medium mode balances randomness and strategy.

**Move Selection Probabilities**

| Move Type | Probability |
|------|------|
| Optimal Minimax Move | 65% |
| Random Move | 35% |

**Behavior**

- Usually blocks player wins
- Occasionally makes mistakes
- Provides a fair challenge

---

## Hard Mode

Hard mode always uses the Minimax algorithm.

**Move Selection Probabilities**

| Move Type | Probability |
|------|------|
| Optimal Minimax Move | 100% |

**Behavior**

- Plays perfectly
- Cannot be beaten
- The best possible outcome for the player is a **draw**

---

# Project Structure

```
src
│
├─ components
│   └─ Board.jsx
    └─ Square.jsx
    └─ WinningLine.jsx
│
├─ pages
│   └─ Game.jsx
│
├─ App.jsx
└─ main.jsx
```

---

# Author

Created by **Mosabbir Ahmed**
