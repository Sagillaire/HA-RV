import { queryClient } from './infrastructure/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './presentation/navigation/AppRoutes';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
