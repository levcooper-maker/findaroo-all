import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Palette, 
  TrendingUp, 
  Heart, 
  GraduationCap,
  ShoppingBag,
  Building2,
  Wrench
} from "lucide-react";

export const industries = [
  { id: "all", name: "All Industries", icon: Building2 },
  { id: "technology", name: "Technology", icon: Code },
  { id: "design", name: "Design & Creative", icon: Palette },
  { id: "marketing", name: "Marketing & Sales", icon: TrendingUp },
  { id: "healthcare", name: "Healthcare", icon: Heart },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "retail", name: "Retail & E-commerce", icon: ShoppingBag },
  { id: "engineering", name: "Engineering", icon: Wrench },
] as const;

interface IndustryTabsProps {
  selectedIndustry: string;
  onIndustryChange: (industry: string) => void;
}

export const IndustryTabs = ({ selectedIndustry, onIndustryChange }: IndustryTabsProps) => {
  return (
    <Tabs value={selectedIndustry} onValueChange={onIndustryChange} className="w-full">
      <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-card p-2">
        {industries.map((industry) => {
          const Icon = industry.icon;
          return (
            <TabsTrigger
              key={industry.id}
              value={industry.id}
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{industry.name}</span>
              <span className="sm:hidden">{industry.name.split(" ")[0]}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};
