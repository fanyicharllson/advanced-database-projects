import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-foreground">
        E-commerce <span className="text-primary">Purple</span> Theme
      </h1>

      <div className="flex gap-4">
        {/* The Standard Primary Purple Button */}
        <Button size="lg" className="cursor-pointer">Primary Button</Button>

        {/* The Secondary (Light Purple) Button */}
        <Button variant="secondary" size="lg" className="cursor-pointer">
          Secondary Action
        </Button>

        {/* Outline version using the border-primary color */}
        <Button
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/10 cursor-pointer"
        >
          Outline Action
        </Button>
      </div>

      <p className="text-muted-foreground text-sm">
        Testing colors for background, foreground, and primary actions.
      </p>
    </div>
  );
}
