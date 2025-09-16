// src/app/(protected)/dashboard/@content/default.jsx
export default function Default() {
  // When no explicit @content route is active, render nothing.
  // Your layout already does: {content || children}, so it will fall back to {children}.
  return null;
}
