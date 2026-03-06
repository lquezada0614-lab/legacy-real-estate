interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : ""} ${className}`}
    >
      <div
        className={`flex items-center gap-4 mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {align === "center" && <span className="h-px w-12 bg-gold/30" />}
        <span className="text-editorial text-gold">
          {title}
        </span>
        {align === "center" && <span className="h-px w-12 bg-gold/30" />}
      </div>
      {subtitle && (
        <h2 className="font-serif font-normal text-gold-gradient text-4xl md:text-6xl lg:text-7xl tracking-tighter">
          {subtitle}
        </h2>
      )}
    </div>
  );
}
