<template>
  <div class="flex flex-col bg-slate-50">
    <div class="home-bg">
      <aside
        class="flex flex-col items-start px-10 py-15 w-[45vw] float-right gap-2"
      >
        <h1 class="text-xl notHomeBg font-semibold text-orange-100">
          Welcome to Barberamania
        </h1>
        <h2 class="text-5xl text-white font-bold notHomeBg">
          We will make your style of your dreams
        </h2>
        <h5 class="text-orange-100 notHomeBg w-[35vw] mt-10">
          A small rivere named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradisematic country, in which
          roasted parts of sentences fly into your mouth .
        </h5>

        <button class="z-10 my-5 btn btn-outline-light">
          <a href="/about"> Learn more about us </a>
        </button>
      </aside>
    </div>

    <div class="">
      <About />
    </div>

    <div class="">
      <TerminVue />
    </div>

    <div>
      <Team />
      <hr class="my-6" />
    </div>

    <div>
      <Gallery />
      <hr class="my-6" />
    </div>

    <div>
      <Kontakt />
      <hr class="my-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from './About.vue';
import TerminVue from './Termin.vue';
import Team from './Team.vue';
import Kontakt from './Contact.vue';
import Gallery from './Gallery.vue';
</script>
