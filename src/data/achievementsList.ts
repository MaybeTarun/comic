export type Achievement = {
  id: string;
  title: string;
  description?: string;
  condition: (unlock: (id: string) => void) => void;
};

export const achievementsList: Achievement[] = [
  {
    id: 'first_scroll',
    title: 'Congrats on your first scroll!',
    description: 'You\'re exploring like a pro.',
    condition: (unlock) => {
      const onScroll = () => {
        unlock('first_scroll');
        window.removeEventListener('scroll', onScroll);
      };
      window.addEventListener('scroll', onScroll, { once: true });
    },
  },
  {
    id: 'first_click',
    title: 'First Interaction!',
    description: 'You just clicked something 👀',
    condition: (unlock) => {
      const onClick = () => {
        unlock('first_click');
        window.removeEventListener('click', onClick);
      };
      window.addEventListener('click', onClick, { once: true });
    },
  },
  {
    id: 'visit_projects',
    title: 'Project Explorer',
    description: 'You checked out my projects.',
    condition: (unlock) => {
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href="/projects"]');
        if (link) {
          unlock('visit_projects');
          window.removeEventListener('click', onClick);
        }
      };
      window.addEventListener('click', onClick);
    },
  },
  {
    id: 'visit_simple',
    title: 'Simple Soul',
    description: 'You viewed the simple version of my portfolio.',
    condition: (unlock) => {
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const button = target.closest('button');
        if (button?.textContent?.includes('View Simpler Version')) {
          unlock('visit_simple');
          window.removeEventListener('click', onClick);
        }
      };
      window.addEventListener('click', onClick);
    },
  },
  {
    id: 'play_shooter',
    title: 'Sharp Shooter!',
    description: 'You played the shooter game 🔫',
    condition: (unlock) => {
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const img = target.closest('img[alt="Bug illustration"]');
        if (img) {
          unlock('play_shooter');
          window.removeEventListener('click', onClick);
        }
      };
      window.addEventListener('click', onClick);
    },
  },
  {
    id: 'play_aaargh',
    title: 'Aaargh Adventurer!',
    description: 'You dared to play Aaargh ✈️',
    condition: (unlock) => {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href*="aaargh.vercel.app"]');
        if (link) {
          unlock('play_aaargh');
          window.removeEventListener('click', handleClick);
        }
      };
      window.addEventListener('click', handleClick);
    },
  },
  {
    id: 'project_button_click',
    title: 'Project Investigator',
    description: 'You seem interested in me 😯',
    condition: (unlock) => {
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href][target="_blank"]');
  
        if (link && link.textContent?.trim().includes('View Project')) {
          unlock('project_button_click');
          window.removeEventListener('click', onClick);
        }
      };
  
      window.addEventListener('click', onClick);
    },
  },
  {
    id: 'visit_freelance',
    title: 'Freelance Fan!',
    description: 'You discovered that I freelance too 💼',
    condition: (unlock) => {
      const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[href*="freelance.maybetarun.in"]');
        if (link) {
          unlock('visit_freelance');
          window.removeEventListener('click', onClick);
        }
      };
      window.addEventListener('click', onClick);
    },
  },  
  {
    id: 'time_spent_30s',
    title: 'Staying for a While',
    description: 'You\'ve been here for over 30 seconds — love that ❤️',
    condition: (unlock) => {
      const timer = setTimeout(() => unlock('time_spent_30s'), 30000);
      return () => clearTimeout(timer);
    },
  },
  {
    id: 'return_visit',
    title: 'Welcome Back!',
    description: 'You\'ve returned to the site again — we missed you!',
    condition: (unlock) => {
      const lastVisit = localStorage.getItem('lastVisit');
      const now = Date.now();
      if (lastVisit && now - Number(lastVisit) > 24 * 60 * 60 * 1000) {
        unlock('return_visit');
      }
      localStorage.setItem('lastVisit', now.toString());
    },
  },
];
