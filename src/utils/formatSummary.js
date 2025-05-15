export function formatSummary(raw) {
  return raw
    .replace(/^🎯\s*TITLE:\s*(.+)$/m, '# 🎯 $1')
    .replace(/^🔑\s*Key Points:$/m, '## 🔑 Key Points')
    .replace(/^💡\s*Takeaways:$/m, '## 💡 Takeaways')
    .replace(/^🔄\s*Future Implications:$/m, '## 🔄 Future Implications')
    .trim();
}
