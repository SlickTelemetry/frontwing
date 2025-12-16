import { Loader } from '@/components/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type BaseSelectorProps = {
  value?: string;
  placeholder: string;
  items: { label: React.ReactNode; value: string }[];
  onChange: (val: string) => void;
  width: string;
};

export function BaseSelector({
  value,
  placeholder,
  items,
  onChange,
  width,
}: BaseSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className='*:[span]:last:w-full'
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// for loading / disabled cases
export const SelectorSkeleton = ({ width }: { width: string }) => (
  <Select disabled>
    <SelectTrigger className={width}>
      <SelectValue placeholder={<Loader size={24} />} />
    </SelectTrigger>
  </Select>
);

export const SelectorDisabled = ({
  placeholder,
  width,
}: {
  placeholder: string;
  width: string;
}) => (
  <Select disabled>
    <SelectTrigger className={width}>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
  </Select>
);
