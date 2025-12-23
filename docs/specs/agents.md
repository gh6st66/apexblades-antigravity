# Browser Subagent Optimization Guide

This document explains why the browser subagent operates at its current speed and how to optimize its performance for different tasks.

## Why it operates at this speed

The browser subagent is an **autonomous agent** rather than a simple automation script. It follows a continuous loop for every action:

1.  **State Analysis**: It captures the DOM and screenshots to understand the current page state.
2.  **Autonomous Reasoning**: It passes this state to an LLM to decide the next best action based on the task prompt.
3.  **Action Execution**: It performs the interaction (click, type, scroll, etc.).
4.  **Verification**: It re-evaluates the page to ensure the action had the intended effect.
5.  **Recording**: It generates media (screenshots/video) for auditability.

Since each step involves a full LLM inference cycle, it is inherently slower than traditional, hard-coded scripts but significantly more robust on dynamic websites.

---

## Optimization Strategies

### 1. Tool Selection
*   **Use `read_url_content` for Speed**: If you only need to extract text or data from a public URL that doesn't require login or complex JavaScript interaction, use `read_url_content`. It is nearly instantaneous.
*   **Use Browser Subagent for Interaction**: Reserve the browser tool for things that require clicking, logging in, or interacting with a "Stateful" UI (like a calculator or dashboard).

### 2. Prompting for Performance
When I (Antigravity) prompt the subagent, I can use these techniques to speed things up:
*   **Provide IDs**: Naming specific CSS selectors or HTML IDs reduces the "search and think" time.
*   **Batch Instructions**: I can instruct the agent to "Perform buttons A, B, and C before verifying state," reducing the number of reasoning loops.
*   **Coordinate-Based Actions**: For stable layouts, using pixel-perfect coordinates is faster than element discovery.

### 3. Environment Stability
*   **Targeted URLS**: Directly navigating to the deepest relevant URL avoids unnecessary clicks and transitions.
*   **Local Testing**: Testing against local files (like `file://`) is generally faster than remote URLs due to lack of network latency and ads.

---

## Technical Constraints
*   **Model Latency**: The primary bottleneck is the generation time of the underlying model.
*   **No Global Speed Settings**: There are no persistent user settings to " overclock" the agent; performance is optimized on a per-task basis through prompt engineering.
