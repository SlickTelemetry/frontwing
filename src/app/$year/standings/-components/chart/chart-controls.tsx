import { Toggle } from '@/components/toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const ChartControls = ({
  showTooltip,
  toggleTooltip,
  showPointsPerRound,
  togglePointsPerRound,
  showAvailablePoints,
  toggleAvailablePoints,
  toggleVisibility,
}: {
  showTooltip: boolean;
  toggleTooltip: () => void;
  showPointsPerRound: boolean;
  togglePointsPerRound: () => void;
  showAvailablePoints: boolean;
  toggleAvailablePoints: () => void;
  toggleVisibility: (string: 'all' | 'none') => void;
}) => (
  <div className='flex items-center gap-4 p-4'>
    <Button variant='outline' size='sm' onClick={() => toggleVisibility('all')}>
      Select All
    </Button>
    <Button
      variant='outline'
      size='sm'
      onClick={() => toggleVisibility('none')}
    >
      Clear All
    </Button>

    <div className='ml-auto flex w-fit items-center gap-4'>
      <Toggle id='htt' toggle={toggleTooltip} checked={showTooltip}>
        Tooltip
      </Toggle>
      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />
      <Toggle
        id='hap'
        toggle={toggleAvailablePoints}
        checked={showAvailablePoints}
      >
        Available Points
      </Toggle>
      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />
      <Toggle
        id='ppr'
        toggle={togglePointsPerRound}
        checked={showPointsPerRound}
      >
        Points Per Round
      </Toggle>
    </div>
  </div>
);
