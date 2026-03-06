interface GoldDividerProps {
  className?: string;
}

export default function GoldDivider({ className = "" }: GoldDividerProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
