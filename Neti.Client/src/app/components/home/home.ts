import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  // Recent activity data
  recentActivity = [
    {
      id: 'FORM-2049',
      name: 'Q3 Financial Summary',
      icon: 'description',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-primary',
      lastEdited: '2 hours ago',
      status: 'Draft',
      statusClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      actionIcon: 'edit'
    },
    {
      id: 'FORM-1982',
      name: 'Marketing Budget Request',
      icon: 'payments',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
      lastEdited: 'Yesterday',
      status: 'Submitted',
      statusClass: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      actionIcon: 'visibility'
    },
    {
      id: 'FORM-1855',
      name: 'Client Satisfaction Survey',
      icon: 'forum',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      lastEdited: '3 days ago',
      status: 'In Review',
      statusClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      actionIcon: 'history'
    }
  ];

  // Template cards data
  templates = [
    {
      title: 'Monthly Report',
      description: 'Standard EOM reporting structure for departments.',
      icon: 'description',
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-primary'
    },
    {
      title: 'Expense Claim',
      description: 'Reimburse employee travel and hardware expenses.',
      icon: 'payments',
      iconBg: 'bg-green-50 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Feedback Survey',
      description: 'Collect anonymous user feedback post-launch.',
      icon: 'forum',
      iconBg: 'bg-purple-50 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: 'IT Request',
      description: 'Hardware replacement or software access help.',
      icon: 'desktop_windows',
      iconBg: 'bg-orange-50 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];
}
