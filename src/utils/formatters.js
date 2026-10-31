/**
 * Date and general formatters
 */
export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  const options = { month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export function getPriorityMeta(priority) {
  switch (priority?.toLowerCase()) {
    case 'urgent':
      return {
        label: 'Urgent',
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/60',
        dotClass: 'bg-rose-500'
      };
    case 'high':
      return {
        label: 'High',
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60',
        dotClass: 'bg-amber-500'
      };
    case 'medium':
      return {
        label: 'Medium',
        badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60',
        dotClass: 'bg-blue-500'
      };
    case 'low':
    default:
      return {
        label: 'Low',
        badgeClass: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
        dotClass: 'bg-slate-400'
      };
  }
}

export function getStatusMeta(status) {
  switch (status) {
    case 'backlog':
      return { label: 'Backlog', badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
    case 'todo':
      return { label: 'To Do', badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' };
    case 'in_progress':
      return { label: 'In Progress', badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' };
    case 'review':
      return { label: 'In Review', badgeClass: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400' };
    case 'done':
      return { label: 'Completed', badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' };
    default:
      return { label: status, badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' };
  }
}

