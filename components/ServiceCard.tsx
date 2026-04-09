type ServiceCardProps = {
  title: string;
  description: string;
  features: string[];
};

export function ServiceCard({ title, description, features }: ServiceCardProps) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </article>
  );
}
