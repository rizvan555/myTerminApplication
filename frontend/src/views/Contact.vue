<template>
  <div class="flex justify-between gap-3 py-10 px-4">
    <ul class="contact px-4 py-4 text-[17px] leading-10 w-[30vw]">
      <li class="flex justify-start items-start">
        <p class="font-semibold w-[8vw]">Adresse:</p>
        <p class="w-[14vw]">Grüner Graben 1, 67655 Kaiseerslautern</p>
      </li>
      <li class="flex justify-start items-center gap-1">
        <p class="font-semibold w-[8vw]">Telephone:</p>
        <p class="w-[14vw]">+49 151 1515115</p>
      </li>
      <li class="flex justify-start items-center">
        <p class="font-semibold w-[8vw]">E-Mail:</p>
        <p class="w-[14vw]">barberamania@gmail.com</p>
      </li>
    </ul>

    <div>
      <iframe
        src="https://maps.app.goo.gl/7FLqpxpo6J7jssb47"
        style="border: 0"
        aria-hidden="true"
        tabindex="0"
        class="w-[70vw] h-[50vh] map"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
