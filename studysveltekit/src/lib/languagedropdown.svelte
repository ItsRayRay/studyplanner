<script>
    let expanded = false;
  
    function toggleDropdown() {
      expanded = !expanded;
      const dropdown = document.getElementById('languageDropdown');
      dropdown.setAttribute('aria-expanded', expanded);
    }



  </script>
  
  <main>
    <div class="relative inline-block text-left">
      <div>
        <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" 
                id="languageDropdown" 
                aria-haspopup="true" 
                aria-expanded={expanded}
                on:click={toggleDropdown}>
          🌐 Language
        </button>
      </div>
      <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" 
           role="menu" 
           aria-orientation="vertical" 
           aria-labelledby="languageDropdown"
           style="display: {expanded ? 'block' : 'none'}">
        <div class="py-1">
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected UK")} role="menuitem"><span>🇬🇧</span> English (UK)</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected BR")} role="menuitem"><span>🇧🇷</span> Brazilian Portuguese</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected FR")} role="menuitem"><span>🇫🇷</span> French</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected NL")} role="menuitem"><span>🇳🇱</span> Dutch</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected ES")} role="menuitem"><span>🇪🇸</span> Spanish</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" on:click={() => console.log("selected DE")} role="menuitem"><span>🇩🇪</span> German</a>
      </div>
    </div>
  </main>