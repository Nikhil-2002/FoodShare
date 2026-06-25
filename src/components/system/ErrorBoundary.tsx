import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error) {
    console.error('FoodShare error boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-gradient-mesh p-6">
          <div className="card max-w-md text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-rose-100 text-rose-500 dark:bg-rose-900/40">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-500">{this.state.message ?? 'An unexpected error occurred.'}</p>
            <Button className="mt-6" onClick={() => window.location.assign('/')}>
              Back to safety
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
