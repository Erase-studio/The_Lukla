// Re-mounts on every navigation, so each page fades in briefly. It's plain CSS, so the content
// is in the server HTML and shows without waiting for JavaScript.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
