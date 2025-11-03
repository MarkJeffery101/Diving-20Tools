interface SvgIconProps {
  id: string;
  className?: string;
}

export default function SvgIcon({ id, className = "w-6 h-6" }: SvgIconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <use href={`/icons.html#${id}`} />
    </svg>
  );
}
