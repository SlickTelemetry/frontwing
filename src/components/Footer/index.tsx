'use client';

import { Mail } from 'lucide-react';

import { AboutUs } from '@/components/Footer/AboutUs';
import { TOS } from '@/components/Footer/TOS';
import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import packageJson from '../../../package.json';

function Footer() {
  const appVersion = packageJson.version;

  return (
    <div className='border-foreground mt-auto grid flex-col items-center justify-center border-t px-4 pb-4 md:grid-cols-3 md:flex-row md:py-6 lg:px-6'>
      <div className='mt-4 text-center md:mt-0 md:text-left'>
        <p>Copyright © 2025, Slick Telemetry</p>
        <p className='text-xs'>
          This website is not associated in with any Formula&nbsp;1 companies
        </p>
      </div>
      <div className='mt-4 text-center md:mt-0'>
        <p className='text-xs' data-cy='app-version'>
          v{appVersion}
        </p>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-x-4 md:justify-end'>
        <a className='italic' href='mailto:contact@slicktelemetry.com'>
          <Mail />
        </a>
        <a
          href='https://github.com/SlickTelemetry'
          target='_blank'
          rel='noreferrer'
        >
          <GitHubIcon />
        </a>
        <Dialog>
          <DialogTrigger className='cursor-pointer hover:underline'>
            Terms of Service
          </DialogTrigger>
          <DialogContent className='max-h-[400px] overflow-scroll py-8 sm:max-h-[600px]'>
            <DialogHeader className='text-left'>
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogDescription>
                <p>Last updated: April 16, 2025</p>
              </DialogDescription>
            </DialogHeader>
            <TOS />
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button
                  data-cy='dialog-close-toc'
                  type='button'
                  variant='secondary'
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger className='cursor-pointer hover:underline'>
            About Us
          </DialogTrigger>
          <DialogContent className='max-h-[400px] overflow-scroll py-8 sm:max-h-[600px]'>
            <DialogHeader className='text-left'>
              <DialogTitle>About Slick Telemetry</DialogTitle>
              <DialogDescription>
                {/* You can add a brief tagline or date here if needed */}
              </DialogDescription>
            </DialogHeader>
            <AboutUs />
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button
                  data-cy='dialog-close-about-us'
                  type='button'
                  variant='secondary'
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <a
          className='hover:underline'
          href='https://status.slicktelemetry.com/'
          target='_blank'
          rel='noreferrer'
        >
          Status
        </a>
      </div>
    </div>
  );
}

export { Footer };
