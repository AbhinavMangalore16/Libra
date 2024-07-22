import { cn } from "@/lib/utils";
import { Icon } from "lucide-react";

interface HeadingProp {
  title: string;
  description: string;
  icon: any;
  textColor?: string;
  iconColor?: string;
  backgroundColor?: string;
}

const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  textColor,
  backgroundColor,
}: HeadingProp) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-4 mb-6">
        <div className={cn("p-2 w-fit rounded-md", backgroundColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className={cn("text-2xl font-bold",textColor)}>
            {title}
          </h2>
          <p className={cn("text-sm", textColor)}>
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Heading;
