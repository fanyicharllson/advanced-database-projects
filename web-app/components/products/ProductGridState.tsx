interface ProductGridStateProps {
  title: string;
  description: string;
}

export function ProductGridState({
  title,
  description,
}: ProductGridStateProps) {
  return (
    <div className="rounded-[2rem] border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
