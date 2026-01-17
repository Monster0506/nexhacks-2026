<script lang="ts">
  import { tickets, type Ticket } from '../stores/tickets.ts';
  
  let ticketList: Ticket[] = $tickets;
  
  let stats: { total: number; open: number; inProgress: number; critical: number } = {
    total: ticketList.length,
    open: ticketList.filter(t => t.status === 'open').length,
    inProgress: ticketList.filter(t => t.status === 'in_progress').length,
    critical: ticketList.filter(t => t.priority === 'critical').length
  };
</script>

<header class="h-[60px] border-b border-border bg-card px-6 flex items-center justify-between">
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <svg class="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <span class="font-semibold text-foreground">DevSwarm</span>
      <span class="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Tickets</span>
    </div>
  </div>
  
  <div class="flex items-center gap-6">
    <div class="flex items-center gap-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-muted-foreground"></span>
        <span class="text-muted-foreground">{stats.total} Total</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        <span class="text-muted-foreground">{stats.open} Open</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-warning"></span>
        <span class="text-muted-foreground">{stats.inProgress} In Progress</span>
      </div>
      {#if stats.critical > 0}
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-destructive animate-pulse"></span>
          <span class="text-destructive">{stats.critical} Critical</span>
        </div>
      {/if}
    </div>
    
    <div class="flex items-center gap-2">
      <button class="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Search">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button class="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Add ticket">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </div>
</header>
