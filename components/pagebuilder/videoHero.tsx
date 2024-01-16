'use client';
import { Button } from '@/components/ui/button';
import MuxPlayer from '@mux/mux-player-react';
import Link from 'next/link';

export const VideoHero = ({ module }: { module: any }) => {
  console.log(module);

  return (
    <div className="relative flex h-[calc(100vh-76px)] min-h-full w-full flex-col justify-center align-middle text-white md:h-[calc(100vh-91px)]">
      <MuxPlayer
        autoPlay={'muted'}
        loop={true}
        className="--media [--media-object-fit: contain] absolute h-full object-contain"
        streamType="on-demand"
        playbackId={module.playbackId}
        metadata={{
          video_id: module.playbackId,
          video_title: 'Test video title',
          viewer_user_id: 'user-id-007'
        }}
      />
      <div className="z-10 flex h-full w-full flex-row justify-center gap-4 bg-black p-8 opacity-50 md:p-16">
        <div className="z-20 flex flex-col justify-end gap-4">
          <h1 className="z-30 text-6xl font-bold uppercase tracking-wider md:text-4xl">
            Let Hair Be Hair
          </h1>
          <Link className="w-full" href={'/search'}>
            <Button className="w-full rounded-none bg-white text-black ">Shop Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
