<script lang="ts">
    import EquipmentHeader from "./EquipmentHeader.svelte";

    export let category: any
</script>

Hello I'm a console

{category}
<EquipmentHeader categoryName={"Console"}>
    <slot/>
</EquipmentHeader>