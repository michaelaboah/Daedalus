<style>
  .zone {
    background-color: #eeeeee;
    padding: var(--theme-pad);
    border: 2px solid #dddddd;
  }
  .droppable {
    border-color: #1f79ff;
  }
  h3 {
    margin: 0px;
  }
</style>

<script lang="ts">
  import { FileDrop } from "svelte-droplet";
  import { Box, Center, Image, InputWrapper, SimpleGrid, Text, TextInput, Title } from "@svelteuidev/core";
  import { project } from "../stores/Store";
  import { onDestroy } from "svelte/internal";
  let { showImage } = $project;
  let droppedFiles: File[] = [];
  let style: string | undefined;
  function handleFiles(files: File[]) {
    droppedFiles = files;
    if (showImage) {
      URL.revokeObjectURL(showImage);
    }
    showImage = URL.createObjectURL(files[0]);
    style = "0.5vw";
  }
  const acceptedMimes = ["image/webp", "image/jpeg", "image/png", "image/gif", "image/svg+xml"];

  onDestroy(() => () => {
    if (showImage) {
      URL.revokeObjectURL(showImage);
    }
  });
</script>

<Box>
  <Title>Project Configuration</Title>
  <SimpleGrid cols="{2}">
    <InputWrapper label="{''}" labelElement="{undefined}">
      <TextInput placeholder="Mary Poppins" label="Production or Show name: " bind:value="{$project.name}" />
    </InputWrapper>

    <Box ml="xl" css="{{ p: '$6', borderColor: '$black', borderBlockStyle: 'solid', bc: 'LightGrey' }}">
      <Text align="right" size="xl" weight="{'semibold'}" mb="{'md'}">Production Image</Text>

      <FileDrop max="{1}" let:droppable handleFiles="{handleFiles}" acceptedMimes="{acceptedMimes}">
        <div class="zone" class:droppable style="--theme-pad: {style ? style : '4vw'}">
          {#if showImage}
            {#each droppedFiles as item}
              <Center>
                <Image bind:src="{showImage}" fit="contain" width="{400}" height="{300}" alt="{item.name}" />
              </Center>
            {/each}
          {:else}
            <!-- <Center inline="{false}"></Center> -->
            <Text align="center" size="xl">Drag and Drop 1 Image</Text>
          {/if}
        </div>
      </FileDrop>
    </Box>
  </SimpleGrid>
</Box>
