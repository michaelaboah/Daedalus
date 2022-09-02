<script lang="ts">
  import { handleEquipment } from "../stores/Store";

  $: gear = handleEquipment();
  console.log()  
</script>
