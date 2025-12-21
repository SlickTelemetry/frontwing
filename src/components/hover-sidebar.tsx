'use client';

import { PanelLeftIcon } from 'lucide-react';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SIDEBAR_KEYBOARD_SHORTCUT } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';

type HoverSidebarProps = React.ComponentProps<typeof Sidebar>;

type SidebarHoverContextValue = {
  openLocked: boolean;
  setOpenLocked: (open: boolean) => void;
  cancelHoverTimeout: () => void;
  scheduleHoverClose: () => void;
};

const SidebarHoverContext = createContext<SidebarHoverContextValue | null>(
  null,
);

export function useSidebarHover() {
  const ctx = useContext(SidebarHoverContext);
  if (!ctx) {
    throw new Error('useSidebarHover must be used within SidebarHoverProvider');
  }
  return ctx;
}

export function SidebarHoverProvider({ children }: { children: ReactNode }) {
  const { open, setOpen, isMobile, toggleSidebar } = useSidebar();
  const [openLocked, setOpenLocked] = useState(open);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const scheduleHoverClose = useCallback(() => {
    cancelHoverTimeout();
    if (openLocked || !open || isMobile) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  }, [cancelHoverTimeout, openLocked, open, isMobile, setOpen]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
        setOpenLocked((prev) => !prev);
        cancelHoverTimeout();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cancelHoverTimeout, toggleSidebar]);

  return (
    <SidebarHoverContext.Provider
      value={{
        openLocked,
        setOpenLocked,
        cancelHoverTimeout,
        scheduleHoverClose,
      }}
    >
      {children}
    </SidebarHoverContext.Provider>
  );
}

export function HoverSidebar(props: HoverSidebarProps) {
  const { isMobile } = useSidebar();
  const {
    openLocked: hoverLocked,
    cancelHoverTimeout,
    scheduleHoverClose,
  } = useSidebarHover();

  const handleMouseEnter: HoverSidebarProps['onMouseEnter'] = (event) => {
    if (!isMobile) {
      cancelHoverTimeout();
    }
    props.onMouseEnter?.(event);
  };

  const handleMouseLeave: HoverSidebarProps['onMouseLeave'] = (event) => {
    if (!isMobile && !hoverLocked) {
      scheduleHoverClose();
    }
    props.onMouseLeave?.(event);
  };

  return (
    <Sidebar
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}

export function SidebarHoverTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setOpen } = useSidebar();
  const {
    openLocked: hoverLocked,
    setOpenLocked: setHoverLocked,
    cancelHoverTimeout,
    scheduleHoverClose,
  } = useSidebarHover();

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    cancelHoverTimeout();
    // Open sidebar on hover
    setOpen(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);
    setOpen(!hoverLocked);
    setHoverLocked(!hoverLocked);
  };

  return (
    <Button
      data-sidebar='trigger'
      data-slot='sidebar-trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7 hover:cursor-pointer', className)}
      onClick={handleClick}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e);
        handleMouseEnter();
      }}
      onMouseLeave={(e) => {
        props.onMouseLeave?.(e);
        scheduleHoverClose();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
}
