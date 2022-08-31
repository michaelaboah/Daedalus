<script lang="ts">
    import { handleEquipment } from "../stores/Store";

    $: gear = handleEquipment()
    
</script>


