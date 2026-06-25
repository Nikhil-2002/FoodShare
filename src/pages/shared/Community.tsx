import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Tabs } from '@/components/ui/Tabs';
import { Reveal } from '@/components/ui/Reveal';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { useCommunity } from '@/api/queries';
import { timeAgo } from '@/lib/utils';
import type { CommunityPost } from '@/types';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Success Story', label: 'Success' },
  { id: 'Food Rescue', label: 'Rescues' },
  { id: 'Volunteer Highlight', label: 'Volunteers' },
  { id: 'NGO Spotlight', label: 'NGOs' },
];

function PostCard({ post, delay }: { post: CommunityPost; delay: number }) {
  const [liked, setLiked] = useState(false);
  return (
    <Reveal delay={delay}>
      <Card hover className="overflow-hidden p-0">
        <img src={post.image} alt="" className="h-52 w-full object-cover" />
        <div className="p-5">
          <div className="flex items-center gap-3">
            <Avatar src={post.avatar} name={post.author} size="sm" ring />
            <div className="flex-1">
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-xs text-slate-400">{timeAgo(post.time)}</p>
            </div>
            <Badge tone="warm">{post.category}</Badge>
          </div>
          <h3 className="mt-3 font-display text-lg font-bold">{post.title}</h3>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{post.body}</p>
          <div className="mt-4 flex items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800">
            <button onClick={() => setLiked((v) => !v)} className="flex items-center gap-1.5 transition-colors hover:text-rose-500">
              <motion.span animate={{ scale: liked ? [1, 1.4, 1] : 1 }}><Heart className={`h-5 w-5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} /></motion.span>
              {post.likes + (liked ? 1 : 0)}
            </button>
            <span className="flex items-center gap-1.5"><MessageCircle className="h-5 w-5" /> {post.comments}</span>
            <button className="ml-auto flex items-center gap-1.5 transition-colors hover:text-brand-500"><Share2 className="h-5 w-5" /> Share</button>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

export default function Community() {
  const { data: posts = [], isLoading } = useCommunity();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader title="Community" subtitle="Stories of impact from across the FoodShare family. ❤️" />
      <div className="mb-6"><Tabs tabs={FILTERS} active={filter} onChange={setFilter} /></div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => <PostCard key={p.id} post={p} delay={i * 0.08} />)}
        </div>
      )}
    </>
  );
}
