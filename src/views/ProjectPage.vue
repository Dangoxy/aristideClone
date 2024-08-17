<template>
  <div
    :style="{ 'background-color': color2 }"
    class="not-selectable relative flex h-screen w-full flex-col overflow-hidden bg-[#161616] transition-colors duration-500"
  >
    <!-- nav -->
    <div class="flex w-full items-center justify-between p-6 px-10">
      <h1
        @click="goToHome"
        :style="{ color: color1 }"
        class="bebas text-[40px] text-[#afafaf] transition-colors duration-500"
      >
        LoremIps
      </h1>

      <div class="relative">
        <div
          class="absolute -top-[999px] left-1/2 flex h-8 -translate-x-1/2 items-center gap-[6px] transition-all duration-500"
          :class="shrinkTitle ? 'animateUpNav' : ''"
        >
          <div
            v-for="(_, index) in arrayOfProjects"
            class="flex items-center justify-center gap-1 transition-all duration-500"
            :class="index === Number(currentIndex) ? 'mx-2' : ''"
          >
            <h1
              :style="{ color: color1 }"
              v-if="index === Number(currentIndex)"
              class="text-[12px] font-black text-white transition-colors duration-500"
            >
              {{ index + 1 }}
            </h1>

            <div
              :style="{ 'border-color': color3 }"
              class="h-4 border-[1px] border-[#3b3b3b] transition-all duration-500 hover:!border-[white]"
              :class="
                index === Number(currentIndex)
                  ? 'w-7 duration-[1s]'
                  : index === Number(currentIndex) && !inProjectPreview
                    ? '!border-[white]'
                    : 'w-[1px] duration-[0.01s]'
              "
            ></div>

            <h1
              :style="{ color: color1 }"
              v-if="index === Number(currentIndex)"
              class="text-[12px] font-black text-white transition-colors duration-500"
            >
              {{ arrayOfProjects.length }}
            </h1>
          </div>
        </div>
      </div>

      <h1
        @click="router.push('/about')"
        :style="{ color: color1 }"
        class="openSans ml-24 cursor-pointer text-[12px] font-black text-[#afafaf] underline underline-offset-4 transition-colors duration-500"
      >
        ABOUT
      </h1>
    </div>

    <div
      @click="goToHome()"
      class="absolute left-1/2 top-8 z-30 flex -translate-x-1/2 flex-col items-center justify-center gap-2 overflow-hidden"
    >
      <div class="relative h-[76px] w-[57px]">
        <div
          class="absolute right-1/2 top-0 flex translate-x-1/2 flex-col items-center justify-center gap-0.5 transition-all duration-1000"
          :class="inProjectPreview ? 'goTop opacity-100' : 'goTopL opacity-0'"
        >
          <h1
            :style="{ color: color1 }"
            class="font-black transition-all duration-1000"
          >
            +
          </h1>
          <div
            class="h-6 w-[1px] transition-all duration-1000"
            :style="{ 'background-color': color1 }"
          ></div>
        </div>

        <h1
          :style="{ color: color1 }"
          class="absolute bottom-0 mb-0.5 text-[12px] font-bold text-[#afafaf] underline underline-offset-4 transition-all duration-1000"
          :class="inProjectPreview ? 'goDown opacity-100' : 'goDownL opacity-0'"
        >
          PROJECTS
        </h1>
      </div>
    </div>
    <!-- / nav -->

    <!-- Img container -->

    <!-- Img carousel -->
    <div
      class="animateUp absolute left-1/2 top-[-50%] flex -translate-y-1/2 items-center gap-3 transition-all duration-1000"
      :style="{
        transform: `translate(${delta}%,-50%)`,
        'transform-style': 'preserve-3d',
        'transform-origin': `${Math.abs(delta)}%`,
      }"
    >
      <div
        v-for="(project, index) in arrayOfProjects"
        class="h-[320px] w-16 transition-all"
        :class="
          shrinkTitle && Number(currentIndex) === index
            ? 'mb-[0px] !h-[405px] w-[720px] !duration-1000'
            : Number(currentIndex) === index
              ? 'opacity-100 !brightness-[1] !grayscale-[0]'
              : Number(currentIndex) !== index
                ? 'opacity-15 !brightness-[0.5] !grayscale-[1]'
                : 'opacity-100 !brightness-[0.5] !grayscale-[1]'
        "
        :style="{
          background: `url(${project.mainImg})`,
          'background-size': 'cover',
          transform:
            inProjectPreview && Number(currentIndex) === index
              ? 'filter(grayscale(0) brightness(1)) !important'
              : '',
          'transition-duration': inProjectPreview ? '1s' : '0.1s',
          'background-position': -delta + '%' + 'center ',
        }"
      ></div>
    </div>

    <div
      class="animateUpMain absolute right-1/2 top-[50%] z-20 h-[100%] w-[720px] -translate-y-[50%] translate-x-1/2 overflow-hidden"
    >
      <div
        class="overflow flex h-[100%] w-[720px] flex-col gap-[5%] transition-all duration-1000"
        :style="{
          transform: `translateY(-${imgIndex * 100 + (imgIndex / 9) * 45}%)`,
        }"
      >
        <div
          class="flex h-full items-center justify-center"
          v-for="(img, index) in arrayOfProjects.slice(0, 10)"
        >
          <div
            class="mb-[50%] mt-[50%] min-h-[405px] min-w-[720px] transition-all duration-1000"
            :class="index === imgIndex ? 'opacity-100' : 'opacity-25'"
            :style="{
              background: `url(${img.mainImg})`,
              'background-size': 'cover',
            }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="animateUpMain absolute right-[5%] top-[50%] -translate-y-[50%] overflow-hidden"
    >
      <div
        class="relative flex flex-col gap-4 p-2 transition-all duration-1000"
      >
        <div
          v-for="(img, index) in arrayOfProjects.slice(0, 10)"
          class="min-h-[36px] min-w-[64px] cursor-pointer"
          @click="imgIndex = index"
          :class="index % 3 === 0 ? 'mb-8' : ''"
          :style="{
            background: `url(${img.mainImg})`,
            'background-size': 'cover',
          }"
        ></div>

        <div
          class="absolute left-1/2 min-h-[52px] min-w-[80px] -translate-x-1/2 rounded-[0px] border-2 bg-transparent transition-all duration-1000"
          :style="{
            'border-color': color1,
            top: `${imgIndex * 52}px`,
            'margin-top': `${imgIndex % 3 === 0 ? Math.floor(imgIndex / 3) * 32 : (Math.floor(imgIndex / 3) + 1) * 32}px`,
          }"
        ></div>
      </div>
    </div>

    <!-- / Img carousel -->

    <!-- Text overlay -->
    <div
      class="transformLeft kodeMono duration-250 absolute left-1/2 top-[51.3%] flex h-[405px] w-[960px] translate-x-[-70%] translate-y-[-50%] flex-col items-start justify-start gap-0 text-[160px] font-bold transition-colors"
      :style="{
        color: color1,
        'text-shadow': '0px 0px 8px ' + color2,
        margin: shrinkTitle ? '0px -192px' : '0px -192px',
      }"
      :class="currentIndex !== null ? 'opacity-100' : 'hidden opacity-0'"
    >
      <div class="relative -mt-16 flex">
        <div
          v-for="(letter, letterIndex) in projectText1"
          class="relative flex min-h-32 items-center overflow-hidden transition-all duration-1000"
          :class="
            shrinkTitle && letter === ''
              ? 'animateShrink min-w-0'
              : shrinkTitle
                ? 'animateShrinkMargin -mx-2 min-w-28'
                : ''
          "
        >
          <h1
            :style="{
              'animation-delay': `${(letterIndex / (projectText1.length / 1)).toFixed(2)}s`,
            }"
            :class="
              shrinkTitle && letter === ''
                ? 'animateShrink -mx-2 min-w-0'
                : shrinkTitle
                  ? '-mx-2 min-w-28'
                  : ''
            "
            class="absolute top-1/2 flex min-h-32 -translate-y-1/2 items-center justify-center transition-all duration-1000"
          >
            {{ letter }}
          </h1>
        </div>
      </div>

      <div class="relative flex">
        <div
          v-for="(letter, letterIndex) in projectText2"
          class="relative flex min-h-32 items-center overflow-hidden transition-all duration-1000"
          :class="
            shrinkTitle && letter === ''
              ? 'animateShrink min-w-0'
              : shrinkTitle
                ? 'animateShrinkMargin -mx-2 min-w-24'
                : ''
          "
        >
          <h1
            :style="{
              'animation-delay': `${(letterIndex / (projectText1.length / 1)).toFixed(2)}s`,
            }"
            :class="
              shrinkTitle && letter === ''
                ? 'animateShrink -mx-2 min-w-0'
                : shrinkTitle
                  ? '-mx-2 min-w-24'
                  : ''
            "
            class="absolute top-1/2 flex min-h-32 -translate-y-1/2 items-center justify-center transition-all duration-1000"
          >
            {{ letter }}
          </h1>
        </div>
      </div>
    </div>
    <!-- Text overlay -->

    <!-- / Img container -->

    <div
      class="absolute right-1/2 top-1/2 z-20 flex -translate-y-1/2 translate-x-1/2"
    >
      <img
        src="../../public/plusIcon2.png"
        class="transition-all duration-1000"
        :class="
          inProjectPreview ? 'size-4 -rotate-180 opacity-0' : 'size-10 rotate-0'
        "
      />
    </div>

    <div
      class="absolute right-1/2 top-1/2 flex w-[848px] -translate-y-1/2 translate-x-1/2"
    >
      <img
        src="../../public/plusIcon2.png"
        class="shrinkPlus h-0 w-0 opacity-0 transition-all duration-1000"
        :class="
          inProjectPreview ? 'size-10 rotate-0' : 'size-4 rotate-180 opacity-0'
        "
      />
      <div class="flex w-full"></div>

      <img
        src="../../public/plusIcon2.png"
        class="shrinkPlus h-0 w-0 opacity-0 transition-all duration-1000"
        :class="
          inProjectPreview ? 'size-10 rotate-0' : 'size-4 rotate-180 opacity-0'
        "
      />
    </div>

    <!-- Footer -->
    <div
      class="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 overflow-hidden"
    >
      <div class="relative h-[106px] w-[52px]">
        <h1
          :style="{ color: color1 }"
          class="goTopExp absolute top-[-48px] text-[12px] font-bold text-[#afafaf] underline underline-offset-4 transition-all duration-1000"
        >
          EXPLORE
        </h1>

        <div
          class="goBottomExp absolute bottom-[-96px] right-1/2 flex translate-x-1/2 flex-col items-center justify-center gap-0.5 transition-all duration-1000"
        >
          <div
            class="h-12 w-[1px] transition-all duration-1000"
            :style="{ 'background-color': color1 }"
          ></div>
          <h1
            :style="{ color: color1 }"
            class="font-black transition-all duration-1000"
          >
            +
          </h1>
        </div>
      </div>
    </div>

    <div
      class="openSansNoSpace absolute bottom-8 left-1/2 hidden w-full -translate-x-1/2 items-end justify-center gap-80 font-bold xl:flex"
      :style="{ color: color1 }"
    >
      <div class="flex gap-8">
        <div class="flex flex-col justify-around text-[8px]">
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-100'
                  : 'goDownSmallL opacity-0 delay-100'
              "
              class="absolute transition-all duration-500"
            >
              A
            </h1>
            <h1 class="opacity-0 transition-all duration-500">A</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-200'
                  : 'goDownSmallL opacity-0 delay-200'
              "
              class="absolute transition-all duration-500"
            >
              B
            </h1>
            <h1 class="opacity-0 transition-all duration-500">B</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-300'
                  : 'goDownSmallL opacity-0 delay-300'
              "
              class="absolute transition-all duration-500"
            >
              C
            </h1>
            <h1 class="opacity-0 transition-all duration-500">C</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-500'
                  : 'goDownSmallL opacity-0 delay-500'
              "
              class="absolute transition-all duration-500"
            >
              D
            </h1>
            <h1 class="opacity-0 transition-all duration-500">D</h1>
          </div>
        </div>

        <div class="text-[10px]">
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-100'
                  : 'goDownSmallL opacity-0 delay-100'
              "
              class="absolute transition-all duration-500"
            >
              COMPLETED
            </h1>
            <h1 class="opacity-0 transition-all duration-500">COMPLETED</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-200'
                  : 'goDownSmallL opacity-0 delay-200'
              "
              class="absolute transition-all duration-500"
            >
              TYPE
            </h1>
            <h1 class="opacity-0 transition-all duration-500">TYPE</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-300'
                  : 'goDownSmallL opacity-0 delay-300'
              "
              class="absolute transition-all duration-500"
            >
              ROLE
            </h1>
            <h1 class="opacity-0 transition-all duration-500">ROLE</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-500'
                  : 'goDownSmallL opacity-0 delay-500'
              "
              class="absolute transition-all duration-500"
            >
              CLIENT
            </h1>
            <h1 class="opacity-0 transition-all duration-500">CLIENT</h1>
          </div>
        </div>

        <div class="text-[10px]">
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-100'
                  : 'goDownSmallL opacity-0 delay-100'
              "
              class="absolute transition-all duration-500"
            >
              LOREMIPSUM 2022
            </h1>
            <h1 class="opacity-0 transition-all duration-500">
              LOREMIPSUM 2022
            </h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-200'
                  : 'goDownSmallL opacity-0 delay-200'
              "
              class="absolute transition-all duration-500"
            >
              LOREMIPSUMLOR
            </h1>
            <h1 class="opacity-0 transition-all duration-500">LOREMIPSUMLOR</h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-300'
                  : 'goDownSmallL opacity-0 delay-300'
              "
              class="absolute transition-all duration-500"
            >
              LOREMIPSUMLOREMIPSUM
            </h1>
            <h1 class="opacity-0 transition-all duration-500">
              LOREMIPSUMLOREMIPSUM
            </h1>
          </div>
          <div class="relative overflow-hidden">
            <h1
              :class="
                inProjectPreview
                  ? 'goDownSmall opacity-100 delay-500'
                  : 'goDownSmallL opacity-0 delay-500'
              "
              class="absolute transition-all duration-500"
            >
              LOREMIPSUMLOREMIPSUMLO
            </h1>
            <h1 class="opacity-0 transition-all duration-500">
              LOREMIPSUMLOREMIPSUMLO
            </h1>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden">
        <h1
          :class="
            inProjectPreview
              ? 'goDownSmall opacity-100 delay-100'
              : 'goDownSmallL opacity-0 delay-100'
          "
          class="absolute max-w-56 text-[10px] transition-all duration-500"
        >
          LOREM IPSUM LOREM IPSUMLO REMI PSUM LOREMIPSU MLOREMIPSU
        </h1>
        <h1 class="max-w-56 text-[10px] opacity-0 transition-all duration-500">
          LOREM IPSUM LOREM IPSUMLO REMI PSUM LOREMIPSU MLOREMIPSU
        </h1>
      </div>
    </div>

    <div
      class="absolute bottom-0 flex w-full items-center justify-between p-6 px-12"
    >
      <div class="">
        <h1
          :style="{ color: color1 }"
          class="-mb-1 text-[10px] font-bold text-[#afafaf] transition-colors duration-500"
        >
          LOREMIPSUML LOREMIPSUM
        </h1>
        <h1
          :style="{ color: color1 }"
          class="text-[10px] font-bold text-[#afafaf] transition-colors duration-500"
        >
          LOREMIPSUM LOR. 2023
        </h1>
      </div>

      <div class="flex flex-col items-end justify-center">
        <h1
          :style="{ color: color1 }"
          class="-mb-1 text-[11px] font-black text-[#afafaf] transition-colors duration-500"
        >
          EMAIL
        </h1>
        <h1
          :style="{ color: color1 }"
          class="-mb-1 text-[11px] font-black text-[#afafaf] transition-colors duration-500"
        >
          INSTAGRAM
        </h1>
        <h1
          :style="{ color: color1 }"
          class="text-[11px] font-black text-[#afafaf] transition-colors duration-500"
        >
          TWITTER
        </h1>
      </div>
    </div>
    <!-- / Footer -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import arrayOfProjects from "../data";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
let params = route.params;
const router = useRouter();
let allparams = String(params.projectidname).split("-");
let currentIndex =
  allparams[0].length > 1
    ? allparams[0][0] == "0"
      ? allparams[0][1]
      : allparams[0]
    : allparams[0];
let inProjectPreview = currentIndex;
let title = allparams[1] + " " + allparams[2];
let shrinkTitle = true;
let projectText1 = arrayOfProjects[Number(currentIndex)].titlelist1;
let projectText2 = arrayOfProjects[Number(currentIndex)].titlelist2;
let delta =
  -((Number(currentIndex) * 100) / (arrayOfProjects.length + 8.75)) +
  -(
    12 / (arrayOfProjects.length + 8.75) +
    1.1 +
    Number(currentIndex) / (arrayOfProjects.length + 8.75) / 2
  ) +
  -11;
console.log(params);
console.log(allparams);
console.log(currentIndex);
console.log(title);
let color1 = ref(arrayOfProjects[Number(currentIndex)].color1);
let color2 = ref(arrayOfProjects[Number(currentIndex)].color2);
let color3 = ref(arrayOfProjects[Number(currentIndex)].color3);
/* let color4 = ref(arrayOfProjects[Number(currentIndex)].color4); */

let imgIndex = ref(0);

window.onmousemove = () => {};
window.onmousedown = () => {};
window.onmouseup = () => {};

function goToHome() {
  router.push({
    name: "home",
    query: { from: currentIndex, lastImgIndex: imgIndex.value },
  });
}

let windowWidth = ref(window.innerWidth);
let windowHeight = ref(window.innerHeight);
window.onresize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  console.log(windowWidth);
  console.log(windowHeight);
};

function smallWindowGoABout() {
  if (windowWidth.value < 1750 || windowHeight.value < 720) {
    router.push("/about");
  }
}
smallWindowGoABout();
watch(windowWidth, () => {
  smallWindowGoABout();
});
watch(windowHeight, () => {
  smallWindowGoABout();
});
</script>

<style scoped>
.animateUpMain {
  animation: animateUpMain 1s ease 1;
}

@keyframes animateUpMain {
  0% {
    top: 150%;
  }
  100% {
    top: 50%;
  }
}

.shrinkPlus {
  animation: shrinkPlus 1s ease 1;
}

@keyframes shrinkPlus {
  0% {
    width: 24px;
    height: 24px;
    opacity: 1;
    rotate: -180deg;
  }
  100% {
    width: 0px;
    height: 0px;
    opacity: 0;
    rotate: 180deg;
  }
}

.goTopExp {
  animation: goTopgoTopExp 1s ease 1;
}

@keyframes goTopgoTopExp {
  0% {
    top: 0px;
  }
  100% {
    top: -48px;
  }
}

.goBottomExp {
  animation: goBottomExp 1s ease 1;
}

@keyframes goBottomExp {
  0% {
    bottom: 0px;
  }
  100% {
    bottom: -96px;
  }
}

.transformLeft {
  animation: transformLeft 1s ease 1;
}
@keyframes transformLeft {
  0% {
    transform: translateX(-50%) translateY(-50%);
  }
  100% {
    transform: translateX(-70%) translateY(-50%);
  }
}

.animateShrink {
  animation: animateShrink 1s ease 1;
}
.animateShrinkMargin {
  animation: animateShrinkMargin 1s ease 1;
}
@keyframes animateShrink {
  0% {
    min-width: 96px;
  }
  100% {
    min-width: 0px;
  }
}
@keyframes animateShrinkMargin {
  0% {
    margin: 0px -0px;
  }
  100% {
    margin: 0px -8px;
  }
}
.animateUp {
  animation: animateUp 1s ease 1;
}
@keyframes animateUp {
  0% {
    top: 50%;
  }
  100% {
    top: -50%;
  }
}

.animateUpNav {
  animation: animateUpNav 1s ease 1;
}
@keyframes animateUpNav {
  0% {
    top: -16px;
  }
  100% {
    top: -999px;
  }
}

.goTop {
  animation: goTop 1s ease 1;
}
@keyframes goTop {
  0% {
    top: -56px;
  }
  50% {
    top: -56px;
  }
  100% {
    top: 0px;
  }
}

.goDown {
  animation: goDown 1s ease 1;
}
@keyframes goDown {
  0% {
    bottom: -64px;
  }
  50% {
    bottom: -64px;
  }
  100% {
    bottom: 0px;
  }
}

.goTopL {
  animation: goTopL 1s ease 1;
}
@keyframes goTopL {
  0% {
    top: 0px;
  }
  50% {
    top: 0px;
  }
  100% {
    top: -56px;
  }
}

.goDownL {
  animation: goDownL 1s ease 1;
}
@keyframes goDownL {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 0px;
  }
  100% {
    bottom: -64px;
  }
}

.kodeMono {
  font-family: "Kode Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
}
.bebas {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: -2px;
}
.openSans {
  font-family: "Open Sans", sans-serif;
  letter-spacing: -1px;
}
.openSansNoSpace {
  font-family: "Open Sans", sans-serif;
}
.openSansClose {
  font-family: "Open Sans", sans-serif;
  letter-spacing: -5px;
}
</style>
