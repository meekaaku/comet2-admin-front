<script lang="ts">
import { img_placeholder } from '$lib/constants';
    let { 
        src, 
        alt = '', 
        fallbackSrc = img_placeholder,
        class: className = '', // renamed to avoid conflict with reserved word
        style = ''
    } = $props();
    
    
    let currentSrc = $state(src ? src : fallbackSrc);
    let hasError = $state(false);

    function handleError(e: any) {
        hasError = true;
        currentSrc = fallbackSrc;
    }
</script>

<img 
  src={currentSrc} 
  {alt}
  onerror={handleError}
  class={`${className}`}
  {style}
/>