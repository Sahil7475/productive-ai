import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LOGO_DARK = "/boltlogo/white_bolt.png";
const LOGO_LIGHT = "/boltlogo/black_bolt.png";

export default function LogoCircle() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const logoSrc = currentTheme === "dark" ? LOGO_DARK : LOGO_LIGHT;

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