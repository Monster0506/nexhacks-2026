<script lang="ts">
  import TicketBoard from './src/lib/components/ticket-board.svelte';
  import TicketDetail from './src/lib/components/ticket-detail.svelte';
  import Header from './src/lib/components/header.svelte';
  import { tickets, type Ticket } from './src/lib/stores/tickets.ts';

  let selectedTicketId: string | null = $state(null);
  let selectedTicket: Ticket | null = $state(null);

  function handleSelectTicket(event: { id: string }) {
    selectedTicketId = event.id;
    selectedTicket = $tickets.find(t => t.id === selectedTicketId) || null;
  }

  function handleCloseDetail() {
    selectedTicketId = null;
    selectedTicket = null;
  }
</script>

<div class="min-h-screen bg-background">
  <Header />
  
  <main class="flex h-[calc(100vh-60px)]">
    <div class="flex-1 overflow-hidden transition-all duration-300 {selectedTicket ? 'pr-[480px]' : ''}">
      <TicketBoard 
        {selectedTicketId}
        onselectTicket={handleSelectTicket}
      />
    </div>
    
    {#if selectedTicket}
      <TicketDetail 
        ticket={selectedTicket} 
        dismiss={handleCloseDetail}
      />
    {/if}
  </main>
</div>
