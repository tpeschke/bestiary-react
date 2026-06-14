export default function highlight(text: string, query: string) {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());

  if (index === -1) return <span>{text}</span>;
  
  return (
    <span>
      {text.slice(0, index)}
      <strong>{text.slice(index, index + query.length)}</strong>
      {text.slice(index + query.length)}
    </span>
  );
}