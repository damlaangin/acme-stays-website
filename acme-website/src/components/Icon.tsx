import {
  LuSparkles, LuClock, LuShieldCheck, LuKey, LuChartLine, LuCamera, LuWrench, LuFileText, LuHouse,
  LuCheck, LuStar, LuBed, LuBath, LuUsers, LuMapPin, LuPhone, LuMail, LuPlus, LuSearch, LuArrowRight,
  LuArrowLeft, LuChevronLeft, LuChevronRight, LuWifi, LuUtensils, LuSnowflake, LuWashingMachine, LuCar,
  LuTv, LuSun, LuWaves, LuTrees, LuLaptop, LuArrowUpDown, LuFlame, LuMountain, LuThermometer,
} from "react-icons/lu";
import type { IconType } from "react-icons";

const ICONS: Record<string, IconType> = {
  sparkles: LuSparkles, clock: LuClock, shield: LuShieldCheck, key: LuKey, chart: LuChartLine,
  camera: LuCamera, wrench: LuWrench, report: LuFileText, home: LuHouse, check: LuCheck, star: LuStar,
  bed: LuBed, bath: LuBath, users: LuUsers, pin: LuMapPin, phone: LuPhone, mail: LuMail, plus: LuPlus,
  search: LuSearch, arrow: LuArrowRight, back: LuArrowLeft, left: LuChevronLeft, right: LuChevronRight,
  wifi: LuWifi, kitchen: LuUtensils, ac: LuSnowflake, washer: LuWashingMachine, parking: LuCar,
  tv: LuTv, balcony: LuSun, pool: LuWaves, garden: LuTrees, workspace: LuLaptop, elevator: LuArrowUpDown,
  bbq: LuFlame, view: LuMountain, heating: LuThermometer,
};

export function Icon({ name, size, className }: { name: string; size?: number; className?: string }) {
  const Cmp = ICONS[name] ?? LuCheck;
  return <Cmp size={size} className={className} aria-hidden="true" />;
}
