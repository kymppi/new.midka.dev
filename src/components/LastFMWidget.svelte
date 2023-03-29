<script lang="ts">
    import type { LastFMTrack } from "../lib/LastFM.client";

    export let data: {
        track?: LastFMTrack;
        user: string;
    };
</script>


{#if data.track}
	<p>{data.track.name}</p>
{:else}
	<p>Could not load...</p>
{/if}