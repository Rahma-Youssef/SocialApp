export function handleCreateAt(createAt) {
    const date = new Date(createAt);
    const now = new Date();
    const diffMs = now - date;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return ` ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return ` ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
}