import Image from "next/image";
import { useTheme } from "next-themes";

const LOGO_DARK = "/boltlogo/white_bolt.png";
const LOGO_LIGHT = "/boltlogo/black_bolt.png";

export default function LogoCircle() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-lg">
      <Image
        src={logoSrc}
        alt="Logo"
        width={106}
        height={106}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
} 