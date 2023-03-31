<script lang="ts">
  import type { LastFMTrack } from "../lib/LastFM.client";

  export let data: {
    track?: LastFMTrack;
    user: string;
  };
</script>

<div class="wrapper flex">
  {#if data.track}
    {#if data.track.image[3]}
      <img src={data.track.image[3].uri} alt={`Cover for ${data.track.name}`} />
    {/if}

    <div class="info flex">
      {#if "currentlyPlaying" in data.track && data.track.currentlyPlaying}
        <p>Currently playing:</p>
      {:else}
        <p>Recently played:</p>
      {/if}
      <p>{data.track.name} by {data.track.artist.name}</p>
    </div>
  {:else}
    <p>Could not load data...</p>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
    height: 100%;

    p {
      margin: 0;
      padding: 0;
      font-size: 0.9rem;
    }

    img {
      object-fit: contain;
      aspect-ratio: 1/1;
      border-radius: 0.5rem;
    }
  }

  .info {
    --gap: 0.1em;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 0 0.5em;
  }
</style>
