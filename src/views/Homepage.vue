<template>
  <div
    :style="{ 'background-color': color2 }"
    id="c15D"
    class="not-selectable relative flex h-screen w-full flex-col overflow-hidden bg-[#161616] transition-colors duration-500"
  >
    <!-- dev tools -->
    <div class="absolute left-2 top-2 z-20 bg-black" v-if="false">
      <h1 class="text-white">Pos up: {{ mouseUpPosX }}</h1>
      <h1 class="text-white">Pos down: {{ mouseDownPosX }}</h1>
      <h1 class="text-white">delta: {{ delta }}%</h1>
      <h1 class="text-white">current Index: {{ currentIndex }}</h1>
      <h1 class="text-white">prev Index: {{ prevIndex }}</h1>
      <h1 class="text-white">current Index Nav: {{ currentIndexForNav }}</h1>
      <h1 class="text-white">in Project View: {{ inProjectPreview }}</h1>
      <h1 class="text-white">minmal Move: {{ minimalMove }}</h1>
      <h1 class="text-white">
        current Index while move: {{ currentIndexWhileMove }}
      </h1>
      <h1 class="text-white">
        current Index while move prev: {{ currentIndexWhileMovePrev }}
      </h1>
      <h1 class="text-white">
        current Snapped Index: {{ currentSnappedIndex }}
      </h1>
      <h1 class="text-white">currentIndex {{ currentIndex }}</h1>
      <h1 class="text-white">
        projectText1
        <span v-for="text in projectText1">{{ text }}</span>
      </h1>
      <h1 class="text-white">Shrink title {{ shrinkTitle }}</h1>
    </div>
    <!-- / dev tools -->

    <!-- nav -->
    <div class="z-20 flex w-full items-center justify-between p-6 px-10">
      <h1
        id="c1D"
        :style="{ color: color1 }"
        class="bebas text-[40px] text-[#afafaf] transition-colors duration-500"
      >
        LoremIps
      </h1>

      <div class="relative">
        <div
          id="navForAnimation"
          class="absolute left-1/2 top-[-16px] flex h-8 w-fit -translate-x-1/2 items-center gap-[6px] transition-all duration-500"
          :class="shrinkTitle ? 'opacity-0' : ''"
        >
          <div
            v-for="(_, index) in arrayOfProjects"
            @mouseover="
              currentIndexForNav = index;
              goToHover(index);
            "
            @mouseleave="mouseLeaveForNav"
            class="flex items-center justify-center gap-1 transition-all duration-500"
            :class="index === currentIndex ? 'mx-2' : ''"
          >
            <h1
              id="c2D"
              :style="{ color: color1 }"
              v-if="index === currentIndex"
              class="text-[12px] font-black text-white transition-colors duration-500"
            >
              {{ index + 1 }}
            </h1>

            <div
              :style="{ 'border-color': color3 }"
              class="h-4 border-[1px] border-[#3b3b3b] transition-all duration-500 hover:!border-[white]"
              :class="
                index === currentIndex
                  ? 'w-7 duration-[1s]'
                  : index === currentSnappedIndex && !inProjectPreview
                    ? '!border-[white]'
                    : 'w-[1px] duration-[0.01s]'
              "
              :id="'singleImageNav' + index"
              @click="
                goTo(index, $event, 'open');
                console.log(index === currentIndex);
              "
            ></div>

            <h1
              id="c3D"
              :style="{ color: color1 }"
              v-if="index === currentIndex"
              class="text-[12px] font-black text-white transition-colors duration-500"
            >
              {{ arrayOfProjects.length }}
            </h1>
          </div>
        </div>
        <div
          id="tempBgNav"
          class="absolute left-1/2 top-[-16px] z-20 h-[64px] w-[480px] -translate-x-1/2 duration-0"
          :style="{ backgroundColor: color2 }"
        ></div>
      </div>

      <h1
        @click="router.push('/about')"
        id="c4D"
        :style="{ color: color1 }"
        class="openSans ml-24 cursor-pointer text-[12px] font-black text-[#afafaf] underline underline-offset-4 transition-colors duration-500"
      >
        ABOUT
      </h1>
    </div>

    <div
      class="absolute left-1/2 top-8 flex -translate-x-1/2 flex-col items-center justify-center gap-2 overflow-hidden"
    >
      <div class="relative h-[76px] w-[56px]">
        <div
          class="absolute right-1/2 flex translate-x-1/2 flex-col items-center justify-center gap-0.5 transition-all duration-1000"
          id="projectsBUp"
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
          id="projectsBDown"
          :style="{ color: color1 }"
          class="absolute mb-0.5 text-[12px] font-bold text-[#afafaf] underline underline-offset-4 transition-all duration-1000"
        >
          PROJECTS
        </h1>
      </div>
    </div>

    <!-- / nav -->

    <!-- Img container -->

    <!-- Img carousel -->
    <div
      id="imageContainer"
      class="imageContainer absolute left-1/2 top-[50%] flex -translate-y-1/2 items-center gap-3"
      :style="{
        transform: `translate(${delta}%,-50%) perspective(1000px) !important`,
        'transform-style': 'preserve-3d',
        'transform-origin': `${Math.abs(delta)}%`,
      }"
    >
      <div
        v-for="(project, index) in arrayOfProjects"
        class="h-56 w-16 transition-all"
        @click="goTo(index, $event, 'open')"
        :class="
          shrinkTitle
            ? 'mb-[2000px] !duration-1000'
            : inProjectPreview && currentIndex === index
              ? 'opacity-100 !brightness-[1] !contrast-[1] !grayscale-[0]'
              : inProjectPreview && currentIndex !== index
                ? 'opacity-15 !brightness-[0.6] !contrast-[0.6] !grayscale-[1]'
                : 'opacity-100 !brightness-[0.6] !contrast-[0.6] !grayscale-[1]'
        "
        :id="'singleImage' + index"
        :style="{
          background: `url(${project.mainImg})`,
          'background-size': 'cover',
          transform:
            inProjectPreview && currentIndex === index
              ? 'filter(grayscale(0) brightness(1)) !important'
              : '',
          'transition-duration': inProjectPreview ? '1s' : '0.1s',
        }"
      ></div>
    </div>

    <div
      id="newPage"
      v-if="arrayOfProjects[currentIndex]"
      class="absolute right-1/2 top-[50%] z-20 h-[405px] w-[720px] -translate-y-[50%] translate-x-1/2 bg-white opacity-0"
      :style="{
        background: `url(${arrayOfProjects[Number(lastImgIndex)].mainImg})`,
        'background-size': 'cover',
      }"
    ></div>
    <!-- / Img carousel -->

    <!-- Text overlay -->

    <div
      class="kodeMono duration-250 absolute left-1/2 top-[40%] flex h-[190px] w-[960px] translate-x-[-50%] translate-y-[-50%] flex-col items-start justify-start gap-0 text-[160px] font-bold transition-colors"
      :style="{
        color: color1,
        'text-shadow': '0px 0px 8px ' + color2,
        margin: shrinkTitle || shrinkTitleFrom ? '0px -192px' : '0px -192px',
      }"
      id="c5D"
      :class="currentIndex !== null ? 'opacity-100' : 'hidden opacity-0'"
    >
      <div class="relative -mt-16 flex">
        <div
          v-for="(letter, letterIndex) in projectText1"
          :id="'letter1box' + letterIndex"
          class="relative flex min-h-32 min-w-0 items-center overflow-hidden transition-all duration-1000"
          :class="letter === '' && shrinkTitleFrom ? 'min-w-0' : 'min-w-24'"
        >
          <h1
            :id="'letter1' + letterIndex"
            :style="{
              'animation-delay': `${(letterIndex / (projectText1.length / 1)).toFixed(2)}s`,
            }"
            :class="letter === '' && shrinkTitleFrom ? 'min-w-0' : 'min-w-24'"
            class="duration-250 absolute top-1/2 flex min-h-32 -translate-y-1/2 items-center justify-center transition-all"
          >
            {{ letter }}
          </h1>
        </div>
      </div>

      <div class="relative flex">
        <div
          v-for="(letter, letterIndex) in projectText2"
          :id="'letter2box' + letterIndex"
          class="relative flex min-h-32 items-center overflow-hidden transition-all duration-1000"
          :class="letter === '' && shrinkTitleFrom ? 'min-w-0' : 'min-w-24'"
        >
          <h1
            :id="'letter2' + letterIndex"
            :style="{
              'animation-delay': `${(letterIndex / (projectText1.length / 1)).toFixed(2)}s`,
            }"
            :class="letter === '' && shrinkTitleFrom ? 'min-w-0' : 'min-w-24'"
            class="duration-250 absolute top-1/2 flex min-h-32 -translate-y-1/2 items-center justify-center transition-all"
          >
            {{ letter }}
          </h1>
        </div>
      </div>
    </div>

    <!-- / Text overlay -->
    <div
      id="tempBg"
      class="z-20 h-[605px] w-full duration-0"
      :style="{ backgroundColor: color2 }"
    ></div>

    <!-- / Img container -->

    <div
      class="absolute right-1/2 top-1/2 z-20 flex -translate-y-1/2 translate-x-1/2"
    >
      <img
        @click="goToNoRestriction(currentIndexWhileMove, 'open')"
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
        @click="goToNoRestriction(currentIndex - 1, 'prev')"
        src="../../public/plusIcon2.png"
        class="transition-all duration-1000"
        :class="
          inProjectPreview ? 'size-10 rotate-0' : 'size-4 rotate-180 opacity-0'
        "
      />
      <div class="flex w-full"></div>
      <img
        @click="goToNoRestriction(currentIndex + 1, 'next')"
        src="../../public/plusIcon2.png"
        class="transition-all duration-1000"
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
          id="c6D"
          class="absolute top-0 text-[12px] font-bold text-[#afafaf] underline underline-offset-4 transition-all duration-1000"
          :class="inProjectPreview ? 'goTop opacity-100' : 'goTopL opacity-0'"
          @click="exploreButton()"
        >
          EXPLORE
        </h1>

        <div
          class="absolute bottom-0 right-1/2 flex translate-x-1/2 flex-col items-center justify-center gap-0.5 transition-all duration-1000"
          :class="inProjectPreview ? 'goDown opacity-100' : 'goDownL opacity-0'"
        >
          <div
            id="c7D"
            class="h-12 w-[1px] transition-all duration-1000"
            :style="{ 'background-color': color1 }"
          ></div>
          <h1
            id="c8D"
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
      id="c9D"
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
          id="c10D"
          :style="{ color: color1 }"
          class="-mb-1 text-[10px] font-bold text-[#afafaf] transition-colors duration-500"
        >
          LOREMIPSUML LOREMIPSUM
        </h1>
        <h1
          id="c11D"
          :style="{ color: color1 }"
          class="text-[10px] font-bold text-[#afafaf] transition-colors duration-500"
        >
          LOREMIPSUM LOR. 2023
        </h1>
      </div>

      <div class="flex flex-col items-end justify-center">
        <h1
          id="c12D"
          :style="{ color: color1 }"
          class="-mb-1 text-[11px] font-black text-[#afafaf] transition-colors duration-500"
        >
          EMAIL
        </h1>
        <h1
          id="c13D"
          :style="{ color: color1 }"
          class="-mb-1 text-[11px] font-black text-[#afafaf] transition-colors duration-500"
        >
          INSTAGRAM
        </h1>
        <h1
          id="c14D"
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

let prevIndex = <any>ref(null);
let currentIndex = <any>ref(null);
let currentIndexForNav = <any>ref(null);
let currentIndexWhileMove = <any>ref(null);
let currentIndexWhileMovePrev = <any>ref(null);
let inProjectPreview = <any>ref(false);
let currentSnappedIndex = <any>ref(null);

let route = useRoute();

let fromIndex = ref(route.query.from ? route.query.from : null);
let lastImgIndex = ref(
  route.query.lastImgIndex ? route.query.lastImgIndex : null,
);

console.log(fromIndex.value);

let color1 = ref("#afafaf");
let color2 = ref("#161616");
let color3 = ref("#3b3b3b");
let color4 = ref();

let title1 = ref("");
let title2 = ref("");
let title3 = ref("");
let title4 = ref("");

let shrinkTitle = ref(false);

let projectText1 = ref(
  arrayOfProjects[0].titlelist1.map(() => {
    return "";
  }),
);
let projectText2 = ref(
  arrayOfProjects[0].titlelist1.map(() => {
    return "";
  }),
);
let timeoutForText = <any>null;

const router = useRouter();

function exploreButton() {
  shrinkTitle.value = !shrinkTitle.value;
  let index = currentIndex.value;
  let currentProject = arrayOfProjects[index];
  let title = "";
  for (let i = 0; i < currentProject.titlelist1.length; i++) {
    title += currentProject.titlelist1[i];
  }
  title += "-";
  for (let i = 0; i < currentProject.titlelist2.length; i++) {
    title += currentProject.titlelist2[i];
  }

  router.push(
    "/" + (String(index).length > 1 ? index : "0" + index) + "-" + title,
  );
}

function openCardInstant(index: any) {
  if (currentIndex.value < arrayOfProjects.length) {
    currentIndex.value = index;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;
    /*  */

    if (timeoutForText !== null) {
      clearTimeout(timeoutForText);
    }
    timeoutForText = setTimeout(() => {
      projectText1.value = letterList1;
      projectText2.value = letterList2;
      for (let i = 0; i < letterList1.length; i++) {
        let element1 = document.getElementById("letter1" + i);
        let element2 = document.getElementById("letter2" + i);

        setTimeout(() => {
          element1!.style.left = "0px";
          element2!.style.left = "0px";
        }, 0);
      }
    }, 0);
  }
}

function openCard(index: any) {
  if (currentIndex.value < arrayOfProjects.length) {
    currentIndex.value = index;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;
    /*  */

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outIn");
      element2!.classList.remove("outIn");
      element1!.classList.remove("inOutToRight");
      element2!.classList.remove("inOutToRight");
      element1!.classList.add("inOut");
      element2!.classList.add("inOut");
      /* element1!.style.left = '-96px' */
      /* let delay = (i / (letterList1.length / 1)).toFixed(2); */
      setTimeout(() => {
        element1!.style.left = "-96px";
        element2!.style.left = "-96px";
      }, 0);
    }
    if (timeoutForText !== null) {
      clearTimeout(timeoutForText);
    }
    timeoutForText = setTimeout(
      () => {
        projectText1.value = letterList1;
        projectText2.value = letterList2;
        for (let i = 0; i < letterList1.length; i++) {
          let element1 = document.getElementById("letter1" + i);
          let element2 = document.getElementById("letter2" + i);
          let delay = (i / (letterList1.length / 1)).toFixed(2);

          element1!.classList.remove("inOutToRight");
          element2!.classList.remove("inOutToRight");
          element1!.classList.add("outIn");
          element2!.classList.add("outIn");

          setTimeout(
            () => {
              element1!.style.left = "0px";
              element2!.style.left = "0px";
            },
            Number(delay) * 1000,
          );
        }
      },
      currentIndex.value === null ? 0 : 930,
    );
  }
}

function next() {
  if (currentIndex.value < arrayOfProjects.length - 1) {
    currentIndex.value == null
      ? (currentIndex.value = 0)
      : currentIndex.value++;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;
    /*  */

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outInToRight");
      element2!.classList.remove("outInToRight");
      element1!.classList.remove("inOut");
      element2!.classList.remove("inOut");
      element1!.classList.add("inOut");
      element2!.classList.add("inOut");
      /* element1!.style.left = '-96px' */
      let delay = (i / (letterList1.length / 1)).toFixed(2);
      setTimeout(
        () => {
          element1!.style.left = "-96px";
          element2!.style.left = "-96px";
        },
        Number(delay) * 1000,
      );
    }
    if (timeoutForText !== null) {
      clearTimeout(timeoutForText);
    }
    timeoutForText = setTimeout(() => {
      projectText1.value = letterList1;
      projectText2.value = letterList2;
      for (let i = 0; i < letterList1.length; i++) {
        let element1 = document.getElementById("letter1" + i);
        let element2 = document.getElementById("letter2" + i);
        let delay = (i / (letterList1.length / 1)).toFixed(2);

        element1!.classList.remove("inOut");
        element2!.classList.remove("inOut");
        element1!.classList.add("outInToRight");
        element2!.classList.add("outInToRight");

        setTimeout(
          () => {
            element1!.style.left = "0px";
            element2!.style.left = "0px";
          },
          Number(delay) * 1000,
        );
      }
    }, 930);
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;
    /*  */

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outInToRight");
      element2!.classList.remove("outInToRight");
      element1!.classList.remove("inOut");
      element2!.classList.remove("inOut");
      element1!.classList.add("inOutToRight");
      element2!.classList.add("inOutToRight");
      /* element1!.style.left = '-96px' */
      let delay = (i / (letterList1.length / 1)).toFixed(2);
      setTimeout(
        () => {
          element1!.style.left = "96px";
          element2!.style.left = "96px";
        },
        Number(delay) * 1000,
      );
    }
    if (timeoutForText !== null) {
      clearTimeout(timeoutForText);
    }
    timeoutForText = setTimeout(() => {
      projectText1.value = letterList1;
      projectText2.value = letterList2;
      for (let i = 0; i < letterList1.length; i++) {
        let element1 = document.getElementById("letter1" + i);
        let element2 = document.getElementById("letter2" + i);
        let delay = (i / (letterList1.length / 1)).toFixed(2);

        element1!.classList.remove("inOutToRight");
        element2!.classList.remove("inOutToRight");
        element1!.classList.add("outIn");
        element2!.classList.add("outIn");

        setTimeout(
          () => {
            element1!.style.left = "0px";
            element2!.style.left = "0px";
          },
          Number(delay) * 1000,
        );
      }
    }, 930);
  }
}

function goTo(index: any, e: any, indicator: any) {
  /* delta.value = -(((index)*100) / arrayOfProjects.length) + (-((12/arrayOfProjects.length)+(1.02)+((index/arrayOfProjects.length)/2))) */
  console.log("goTo clicked");
  if (currentIndex.value !== index && minimalMove.value) {
    if (indicator === "open") {
      openCard(index);
    } else if (indicator === "next") {
      next();
    } else if (indicator === "prev") {
      prev();
    }

    e.stopPropagation();
    inProjectPreview.value = true;
    delta.value =
      -((index * 100) / (arrayOfProjects.length + 8.75)) +
      -(
        12 / (arrayOfProjects.length + 8.75) +
        1.1 +
        index / (arrayOfProjects.length + 8.75) / 2
      ) +
      -11;
    prevIndex.value = currentIndex.value;
    currentIndex.value = index;

    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${delta.value}%, -50%)` },
        { duration: 500, fill: "forwards", easing: "ease" },
      );

    console.log(delta.value);
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .animate(
          { backgroundPosition: `${Math.abs(delta.value)}%` },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
      document
        .getElementById("singleImage" + i)!
        .animate(
          { width: `64px` },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
      document
        .getElementById("singleImage" + i)!
        .animate(
          { height: "320px" },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
    }
    document
      .getElementById("singleImage" + index)!
      .animate(
        { width: `720px` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
    document
      .getElementById("singleImage" + index)!
      .animate(
        { height: `405px` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
  }
}
function goToNoRestriction(index: any, indicator: any) {
  /* delta.value = -(((index)*100) / arrayOfProjects.length) + (-((12/arrayOfProjects.length)+(1.02)+((index/arrayOfProjects.length)/2))) */
  console.log("ALO");
  if (indicator === "open") {
    openCard(index);
  } else if (indicator === "next") {
    next();
  } else if (indicator === "prev") {
    prev();
  }
  inProjectPreview.value = true;
  delta.value =
    -((index * 100) / (arrayOfProjects.length + 8.75)) +
    -(
      12 / (arrayOfProjects.length + 8.75) +
      1.1 +
      index / (arrayOfProjects.length + 8.75) / 2
    ) +
    -11;
  prevIndex.value = currentIndex.value;
  currentIndex.value = index;

  document
    .getElementById("imageContainer")!
    .animate(
      { transform: `translate(${delta.value}%, -50%)` },
      { duration: 500, fill: "forwards", easing: "ease" },
    );

  console.log(delta.value);
  for (let i = 0; i < arrayOfProjects.length; i++) {
    document
      .getElementById("singleImage" + i)!
      .animate(
        { backgroundPosition: `${Math.abs(delta.value)}%` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
    document
      .getElementById("singleImage" + i)!
      .animate(
        { width: `64px` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
    document
      .getElementById("singleImage" + i)!
      .animate(
        { height: "320px" },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
  }
  document
    .getElementById("singleImage" + index)!
    .animate(
      { width: `720px` },
      { duration: 1500, fill: "forwards", easing: "ease" },
    );
  document
    .getElementById("singleImage" + index)!
    .animate(
      { height: `405px` },
      { duration: 1500, fill: "forwards", easing: "ease" },
    );
}
function goToHover(index: any) {
  console.log("HOVER ACTIVE");
  if (currentIndex.value == null) {
    let temp =
      -((index * 100) / arrayOfProjects.length) +
      -(
        12 / arrayOfProjects.length +
        1.02 +
        index / arrayOfProjects.length / 2
      );
    delta.value = temp;

    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${temp}%,-50%)` },
        { duration: 100, fill: "forwards", easing: "ease" },
      );
  }
  if (!inProjectPreview.value) {
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .classList.remove(
          "singleImage",
          "singleImager1",
          "singleImager2",
          "singleImager3",
          "singleImagel1",
          "singleImagel2",
          "singleImagel3",
        );
      document
        .getElementById("singleImageNav" + i)!
        .classList.remove(
          "singleImageNav",
          "singleImageNavr1",
          "singleImageNavr2",
          "singleImageNavr3",
          "singleImageNavl1",
          "singleImageNavl2",
          "singleImageNavl3",
        );
    }
    console.log("changed classes");
    document
      .getElementById("singleImage" + index)
      ?.classList.add("singleImage");
    document
      .getElementById("singleImage" + (index + 1))
      ?.classList.add("singleImager1");
    document
      .getElementById("singleImage" + (index + 2))
      ?.classList.add("singleImager2");
    document
      .getElementById("singleImage" + (index + 3))
      ?.classList.add("singleImager3");
    document
      .getElementById("singleImage" + (index - 1))
      ?.classList.add("singleImagel1");
    document
      .getElementById("singleImage" + (index - 2))
      ?.classList.add("singleImagel2");
    document
      .getElementById("singleImage" + (index - 3))
      ?.classList.add("singleImagel3");

    document
      .getElementById("singleImageNav" + index)
      ?.classList.add("singleImageNav");
    document
      .getElementById("singleImageNav" + (index + 1))
      ?.classList.add("singleImageNavr1");
    document
      .getElementById("singleImageNav" + (index + 2))
      ?.classList.add("singleImageNavr2");
    document
      .getElementById("singleImageNav" + (index + 3))
      ?.classList.add("singleImageNavr3");
    document
      .getElementById("singleImageNav" + (index - 1))
      ?.classList.add("singleImageNavl1");
    document
      .getElementById("singleImageNav" + (index - 2))
      ?.classList.add("singleImageNavl2");
    document
      .getElementById("singleImageNav" + (index - 3))
      ?.classList.add("singleImageNavl3");
  }
}
function goToProximity(newDelta: any) {
  console.log(newDelta);

  if (currentIndex.value == null) {
    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${newDelta}%, -50%)` },
        { duration: 500, fill: "forwards", easing: "ease" },
      );
  }

  console.log("SNAPPED");
}
function goToMouseMove(index: any) {
  /* delta.value = -(((index)*100) / arrayOfProjects.length) + (-((12/arrayOfProjects.length)+(1.02)+((index/arrayOfProjects.length)/2))) */
  if (currentIndex.value !== index) {
    if (currentIndex.value > index) {
      prev();
    } else if (currentIndex.value < index) {
      next();
    }
    delta.value =
      -((index * 100) / (arrayOfProjects.length + 8.75)) +
      -(
        12 / (arrayOfProjects.length + 8.75) +
        1.1 +
        index / (arrayOfProjects.length + 8.75) / 2
      ) +
      -11;
    currentIndex.value = index;

    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${delta.value}%, -50%)` },
        { duration: 500, fill: "forwards", easing: "ease" },
      );

    console.log(delta.value);
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .animate(
          { backgroundPosition: `${Math.abs(delta.value)}%` },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
      document
        .getElementById("singleImage" + i)!
        .animate(
          { width: `64px` },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
      document
        .getElementById("singleImage" + i)!
        .animate(
          { height: "320px" },
          { duration: 1500, fill: "forwards", easing: "ease" },
        );
    }
    document
      .getElementById("singleImage" + index)!
      .animate(
        { width: `720px` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
    document
      .getElementById("singleImage" + index)!
      .animate(
        { height: `405px` },
        { duration: 1500, fill: "forwards", easing: "ease" },
      );
  }
}
function reset() {
  for (let i = 0; i < arrayOfProjects.length; i++) {
    document
      .getElementById("singleImage" + i)!
      .animate(
        { backgroundPosition: `${Math.abs(delta.value)}%` },
        { duration: 500, fill: "forwards" },
      );
    document
      .getElementById("singleImage" + i)!
      .animate({ width: `64px` }, { duration: 500, fill: "forwards" });
    document
      .getElementById("singleImage" + i)!
      .animate({ height: "224px" }, { duration: 250, fill: "forwards" });
  }

  if (currentIndex !== null) {
    delta.value =
      -((currentIndex.value! * 100) / arrayOfProjects.length) +
      -(
        12 / arrayOfProjects.length +
        1.02 +
        currentIndex.value! / arrayOfProjects.length / 2
      );
    let temp =
      -((currentIndex.value! * 100) / arrayOfProjects.length) +
      -(
        12 / arrayOfProjects.length +
        1.02 +
        currentIndex.value! / arrayOfProjects.length / 2
      );
    console.log(temp);
    setTimeout(() => {
      document
        .getElementById("imageContainer")!
        .animate(
          { transform: `translate(${temp}%, -50%)` },
          { duration: 500, fill: "forwards", easing: "ease" },
        );
    }, 1000);
  }
  currentIndex.value = null;
}

function mouseLeaveForNav() {
  currentIndexForNav.value = null;
  let timeout;
  if (timeout) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      for (let i = 0; i < arrayOfProjects.length; i++) {
        document
          .getElementById("singleImage" + i)!
          .classList.remove(
            "singleImage",
            "singleImager1",
            "singleImager2",
            "singleImager3",
            "singleImagel1",
            "singleImagel2",
            "singleImagel3",
          );
        document
          .getElementById("singleImageNav" + i)!
          .classList.remove(
            "singleImageNav",
            "singleImageNavr1",
            "singleImageNavr2",
            "singleImageNavr3",
            "singleImageNavl1",
            "singleImageNavl2",
            "singleImageNavl3",
          );
      }
    }, 10);
  } else {
    timeout = setTimeout(() => {
      for (let i = 0; i < arrayOfProjects.length; i++) {
        document
          .getElementById("singleImage" + i)!
          .classList.remove(
            "singleImage",
            "singleImager1",
            "singleImager2",
            "singleImager3",
            "singleImagel1",
            "singleImagel2",
            "singleImagel3",
          );
        document
          .getElementById("singleImageNav" + i)!
          .classList.remove(
            "singleImageNav",
            "singleImageNavr1",
            "singleImageNavr2",
            "singleImageNavr3",
            "singleImageNavl1",
            "singleImageNavl2",
            "singleImageNavl3",
          );
      }
    }, 10);
  }
}
let mouseDownPosX = ref(0);
let mouseUpPosX = ref(0);

let mouseDownPosY = ref(0);
let mouseUpPosY = ref(0);

let minimalMove = <any>ref();

let delta = ref(-1.4);
let prevPosition = ref(-1.4);

window.onmousedown = (e) => {
  mouseDownPosX.value = e.clientX;
  mouseDownPosY.value = e.clientY;
  mouseUpPosX.value = 0;
  mouseUpPosY.value = 0;
};
window.onmousemove = (e) => {
  e.preventDefault();

  if (
    mouseDownPosX.value !== 0 &&
    mouseUpPosX.value === 0 &&
    currentIndex.value == null
  ) {
    /* if(delta.value === 0){
            delta.value = (((mouseDownPosX.value - e.clientX) / window.innerWidth)*100)
            console.log(delta)
        }  */
    /* else  */
    if (-1.4 >= delta.value && delta.value >= -98.6) {
      let temp =
        prevPosition.value +
        -((mouseDownPosX.value - e.clientX) / 1 / window.innerWidth) * 100;
      console.log(temp);
      if (-1.4 >= temp && temp >= -98.6) {
        delta.value = temp;
        document
          .getElementById("imageContainer")!
          .animate(
            { transform: `translate(${delta.value}%, -50%)` },
            { duration: 1000, fill: "forwards" },
          );

        for (let i = 0; i < arrayOfProjects.length; i++) {
          document
            .getElementById("singleImage" + i)!
            .animate(
              { backgroundPosition: `${Math.abs(delta.value)}%` },
              { duration: 1000, fill: "forwards" },
            );
        }
      } else if (-1.4 <= temp) {
        temp = -1.4;
        delta.value = temp;
        document
          .getElementById("imageContainer")!
          .animate(
            { transform: `translate(${delta.value}%, -50%)` },
            { duration: 1000, fill: "forwards" },
          );

        for (let i = 0; i < arrayOfProjects.length; i++) {
          document
            .getElementById("singleImage" + i)!
            .animate(
              { backgroundPosition: `${Math.abs(delta.value)}%` },
              { duration: 1000, fill: "forwards" },
            );
        }
      } else if (temp <= -98.6) {
        temp = -98.6;
        delta.value = temp;
        document
          .getElementById("imageContainer")!
          .animate(
            { transform: `translate(${delta.value}%, -50%)` },
            { duration: 1000, fill: "forwards" },
          );

        for (let i = 0; i < arrayOfProjects.length; i++) {
          document
            .getElementById("singleImage" + i)!
            .animate(
              { backgroundPosition: `${Math.abs(delta.value)}%` },
              { duration: 1000, fill: "forwards" },
            );
        }
      }

      /* console.log(document.getElementById('imageContainer')) */
    }
  } else if (
    mouseDownPosX.value !== 0 &&
    mouseUpPosX.value === 0 &&
    currentIndex.value !== null
  ) {
    console.log(mouseDownPosX.value - e.clientX);
    if (mouseDownPosX.value - e.clientX > 100) {
      if (currentIndex.value + 1 < arrayOfProjects.length) {
        mouseDownPosX.value = 0;
        /* currentIndex.value -= 1 */
        goToMouseMove(currentIndex.value + 1);
      }
    } else if (mouseDownPosX.value - e.clientX < -100) {
      if (currentIndex.value - 1 > -1) {
        mouseDownPosX.value = 0;
        /* currentIndex.value += 1 */
        goToMouseMove(currentIndex.value - 1);
      }
    }
  }

  if (
    mouseDownPosY.value !== 0 &&
    mouseUpPosY.value === 0 &&
    currentIndex.value !== null
  ) {
    let mouseYDiff = mouseDownPosY.value - e.clientY;
    console.log(mouseYDiff);
    if (mouseYDiff > 50) {
      reset();
      inProjectPreview.value = false;
    }
  }

  let numbersArray = [];
  for (let index = 0; index < arrayOfProjects.length; index++) {
    let temp =
      -((index * 100) / arrayOfProjects.length) +
      -(
        12 / arrayOfProjects.length +
        1.02 +
        index / arrayOfProjects.length / 2
      );

    numbersArray.push(temp);
  }
  let tempSnapValue = numbersArray[0];
  let tempIndex = 0;
  for (let i = 0; i < numbersArray.length; i++) {
    if (
      Math.abs(delta.value - numbersArray[i]) <
      Math.abs(delta.value - tempSnapValue)
    ) {
      tempSnapValue = numbersArray[i];

      tempIndex = i;
    }
  }
  /* console.log(tempIndex, tempSnapValue) */
  currentIndexWhileMovePrev.value = currentIndexWhileMove.value;
  currentIndexWhileMove.value = tempIndex;

  if (
    currentIndexWhileMovePrev.value !== currentIndexWhileMove.value &&
    !inProjectPreview.value &&
    currentIndexWhileMove.value !== null &&
    mouseDownPosX.value !== 0
  ) {
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .classList.remove(
          "singleImage",
          "singleImager1",
          "singleImager2",
          "singleImager3",
          "singleImagel1",
          "singleImagel2",
          "singleImagel3",
        );
      document
        .getElementById("singleImageNav" + i)!
        .classList.remove(
          "singleImageNav",
          "singleImageNavr1",
          "singleImageNavr2",
          "singleImageNavr3",
          "singleImageNavl1",
          "singleImageNavl2",
          "singleImageNavl3",
        );
    }
    console.log("changed classes");
    document
      .getElementById("singleImage" + tempIndex)
      ?.classList.add("singleImage");
    document
      .getElementById("singleImage" + (tempIndex + 1))
      ?.classList.add("singleImager1");
    document
      .getElementById("singleImage" + (tempIndex + 2))
      ?.classList.add("singleImager2");
    document
      .getElementById("singleImage" + (tempIndex + 3))
      ?.classList.add("singleImager3");
    document
      .getElementById("singleImage" + (tempIndex - 1))
      ?.classList.add("singleImagel1");
    document
      .getElementById("singleImage" + (tempIndex - 2))
      ?.classList.add("singleImagel2");
    document
      .getElementById("singleImage" + (tempIndex - 3))
      ?.classList.add("singleImagel3");

    document
      .getElementById("singleImageNav" + tempIndex)
      ?.classList.add("singleImageNav");
    document
      .getElementById("singleImageNav" + (tempIndex + 1))
      ?.classList.add("singleImageNavr1");
    document
      .getElementById("singleImageNav" + (tempIndex + 2))
      ?.classList.add("singleImageNavr2");
    document
      .getElementById("singleImageNav" + (tempIndex + 3))
      ?.classList.add("singleImageNavr3");
    document
      .getElementById("singleImageNav" + (tempIndex - 1))
      ?.classList.add("singleImageNavl1");
    document
      .getElementById("singleImageNav" + (tempIndex - 2))
      ?.classList.add("singleImageNavl2");
    document
      .getElementById("singleImageNav" + (tempIndex - 3))
      ?.classList.add("singleImageNavl3");
  }
};
window.onmouseup = (e) => {
  mouseUpPosX.value = e.clientX;
  mouseUpPosY.value = e.clientY;

  let tempMinimalMove = Math.abs(
    Math.abs(mouseDownPosX.value) -
      Math.abs(mouseUpPosX.value) +
      (Math.abs(mouseDownPosY.value) - Math.abs(mouseUpPosY.value)),
  );
  if (tempMinimalMove > 25) {
    minimalMove.value = false;
  } else {
    minimalMove.value = true;
  }
  console.log(tempMinimalMove);

  if (delta.value > -1.4) {
    delta.value = -1.4;
    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${delta.value}%, -50%)` },
        { duration: 500, fill: "forwards" },
      );
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .animate(
          { backgroundPosition: `${Math.abs(delta.value)}%` },
          { duration: 1000, fill: "forwards" },
        );
    }
  } else if (delta.value < -98.6) {
    delta.value = -98.6;
    document
      .getElementById("imageContainer")!
      .animate(
        { transform: `translate(${delta.value}%, -50%)` },
        { duration: 500, fill: "forwards" },
      );
    for (let i = 0; i < arrayOfProjects.length; i++) {
      document
        .getElementById("singleImage" + i)!
        .animate(
          { backgroundPosition: `${Math.abs(delta.value)}%` },
          { duration: 1000, fill: "forwards" },
        );
    }
  }

  prevPosition.value = delta.value;

  let numbersArray = [];
  for (let index = 0; index < arrayOfProjects.length; index++) {
    let temp =
      -((index * 100) / arrayOfProjects.length) +
      -(
        12 / arrayOfProjects.length +
        1.02 +
        index / arrayOfProjects.length / 2
      );

    numbersArray.push(temp);
  }
  let tempSnapValue = numbersArray[0];
  let tempIndex = 0;
  for (let i = 0; i < numbersArray.length; i++) {
    if (
      Math.abs(delta.value - numbersArray[i]) <
      Math.abs(delta.value - tempSnapValue)
    ) {
      tempSnapValue = numbersArray[i];

      tempIndex = i;
    }
  }

  if (!inProjectPreview.value) {
    goToProximity(tempIndex);
    currentSnappedIndex.value = tempIndex;
    delta.value = tempSnapValue;
  }

  let timeout;
  if (timeout) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      for (let i = 0; i < arrayOfProjects.length; i++) {
        document
          .getElementById("singleImage" + i)!
          .classList.remove(
            "singleImage",
            "singleImager1",
            "singleImager2",
            "singleImager3",
            "singleImagel1",
            "singleImagel2",
            "singleImagel3",
          );
        document
          .getElementById("singleImageNav" + i)!
          .classList.remove(
            "singleImageNav",
            "singleImageNavr1",
            "singleImageNavr2",
            "singleImageNavr3",
            "singleImageNavl1",
            "singleImageNavl2",
            "singleImageNavl3",
          );
      }
    }, 10);
  } else {
    timeout = setTimeout(() => {
      for (let i = 0; i < arrayOfProjects.length; i++) {
        document
          .getElementById("singleImage" + i)!
          .classList.remove(
            "singleImage",
            "singleImager1",
            "singleImager2",
            "singleImager3",
            "singleImagel1",
            "singleImagel2",
            "singleImagel3",
          );
        document
          .getElementById("singleImageNav" + i)!
          .classList.remove(
            "singleImageNav",
            "singleImageNavr1",
            "singleImageNavr2",
            "singleImageNavr3",
            "singleImageNavl1",
            "singleImageNavl2",
            "singleImageNavl3",
          );
      }
    }, 10);
  }
};

let shrinkTitleFrom = ref(false);
if (fromIndex.value !== null) {
  router.replace({ query: {} });
  let tempIndex = Number(fromIndex.value);
  currentIndex.value = tempIndex;
  inProjectPreview.value = true;
  currentIndexWhileMove.value = tempIndex;
  currentIndexWhileMovePrev.value = tempIndex;
  currentSnappedIndex.value = tempIndex;
  delta.value =
    -((Number(tempIndex) * 100) / (arrayOfProjects.length + 8.75)) +
    -(
      12 / (arrayOfProjects.length + 8.75) +
      1.1 +
      Number(tempIndex) / (arrayOfProjects.length + 8.75) / 2
    ) +
    -11;
  console.log(fromIndex);
  /* goToNoRestriction(tempIndex,'open') */
  /* document.getElementById('singleImage'+tempIndex)!.animate(
            {width: `720px`},
            {duration:1500, fill:"forwards",easing:"ease"})
    document.getElementById('singleImage'+tempIndex)!.animate(
        {height: `405px`},
        {duration:1500, fill:"forwards",easing:"ease"}) */

  color1.value = arrayOfProjects[tempIndex].color1;
  color2.value = arrayOfProjects[tempIndex].color2;
  color3.value = arrayOfProjects[tempIndex].color3;
  color4.value = arrayOfProjects[tempIndex].color4;

  console.log(document.getElementById("singleImage" + tempIndex));

  setTimeout(() => {
    document
      .getElementById("newPage")
      ?.animate({ top: "150%" }, { duration: 1000, easing: "ease" });
    document.getElementById("newPage")?.classList.remove("opacity-0");
    document.getElementById("newPage")?.classList.add("opacity-100");
    document.getElementById("newPage")?.classList.add("top-[50%]");
    setTimeout(() => {
      document.getElementById("newPage")?.classList.remove("top-[50%]");
      document.getElementById("newPage")?.classList.add("top-[150%]");
    }, 1000);

    document.getElementById("tempBg")?.classList.remove("h-[605px]");
    document
      .getElementById("tempBg")
      ?.animate({ height: "0px" }, { duration: 1000 });

    document.getElementById("tempBgNav")?.classList.remove("h-[64px]");
    document
      .getElementById("tempBgNav")
      ?.animate({ height: "0px" }, { duration: 1000 });

    document.getElementById("c5D")?.classList.remove("translate-x-[-50%]");
    document.getElementById("c5D")?.classList.add("translate-x-[-70%]");
    /* document.getElementById('c5D')?.animate({transform: 'translateX(-70%) translateY(-50%)'},{duration:1}) */
    document
      .getElementById("c5D")
      ?.animate(
        { transform: "translateX(-50%) translateY(-50%)" },
        { duration: 1000, easing: "ease" },
      );
    /* document.getElementById('c5D')?.classList.add('translate-x-[-50%]') */
    setTimeout(() => {
      document.getElementById("c5D")?.classList.add("translate-x-[-50%]");
      document.getElementById("c5D")?.classList.remove("translate-x-[-70%]");
    }, 1000);

    /* document.getElementById('projectsBUp')?.classList.remove('top-0')
            document.getElementById('projectsBDown')?.classList.remove('bottom-0') */

    /* document.getElementById('projectsBUp')?.animate({top:'0px'},{duration:1, easing:'ease'})
            document.getElementById('projectsBDown')?.animate({bottom:'0px'},{duration:1, easing:'ease'}) */
    document.getElementById("projectsBUp")?.classList.add("top-0");
    document.getElementById("projectsBDown")?.classList.add("bottom-0");
    document
      .getElementById("projectsBUp")
      ?.animate({ top: "-56px" }, { duration: 1000, easing: "ease" });
    document
      .getElementById("projectsBDown")
      ?.animate({ bottom: "-56px" }, { duration: 1000, easing: "ease" });
    console.log(document.getElementById("projectsBDown"));
    setTimeout(() => {
      document.getElementById("projectsBUp")?.classList.remove("top-0");
      document.getElementById("projectsBDown")?.classList.remove("bottom-0");
      document.getElementById("projectsBUp")?.classList.add("-top-14");
      document.getElementById("projectsBDown")?.classList.add("-bottom-14");
    }, 1000);

    /* setTimeout(() => {
                document.getElementById('projectsBUp')?.classList.remove('top-0')
                document.getElementById('projectsBDown')?.classList.remove('bottom-0')
                document.getElementById('projectsBUp')?.classList.add('-top-14')
                document.getElementById('projectsBDown')?.classList.add('-bottom-14')
            }, 1000); */

    /* document.getElementById('navForAnimation')?.classList.remove("-top-[64px]") */
    /* document.getElementById('navForAnimation')?.classList.add("-top-[64px]") */
    document.getElementById("navForAnimation")?.classList.remove("top-[-16px]");
    document.getElementById("navForAnimation")?.classList.add("top-[-128px]");
    document
      .getElementById("navForAnimation")
      ?.animate({ top: "-16px" }, { duration: 1000, easing: "ease" });

    console.log(document.getElementById("navForAnimation"));
    /* document.getElementById('navForAnimation')?.animate({top:'-16px'},{duration:1000}) */
    setTimeout(() => {
      document.getElementById("navForAnimation")?.classList.add("top-[-16px]");
      document
        .getElementById("navForAnimation")
        ?.classList.remove("top-[-128px]");
    }, 990);

    /* document.getElementById('navForAnimation')?.classList.remove("-top-[64px]") */

    for (let i = 1; i < 16; i++) {
      document.getElementById("c" + i + "D")!.classList.add("duration-0");
    }

    document
      .getElementById("singleImage" + tempIndex)!
      .animate(
        { width: `720px` },
        { duration: 1, fill: "forwards", easing: "ease" },
      );
    document
      .getElementById("singleImage" + tempIndex)!
      .animate(
        { height: `405px` },
        { duration: 1, fill: "forwards", easing: "ease" },
      );

    document.getElementById("imageContainer")?.classList.remove("top-[50%]");
    document.getElementById("imageContainer")?.classList.add("top-[-50%]");

    document
      .getElementById("imageContainer")!
      .animate({ top: "50%" }, { duration: 1000, easing: "ease" });
    console.log("animated");

    setTimeout(() => {
      document.getElementById("imageContainer")?.classList.add("top-[50%]");
      document.getElementById("imageContainer")?.classList.remove("top-[-50%]");
      console.log("removed");
    }, 950);

    openCardInstant(tempIndex);
    shrinkTitleFrom.value = true;

    for (let i = 0; i < projectText2.value.length; i++) {
      document
        .getElementById("letter1" + i)!
        .animate({ minWidth: "96px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter1box" + i)!
        .animate({ minWidth: "96px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter1" + i)!
        .animate({ margin: "0px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter1box" + i)!
        .animate({ margin: "0px" }, { duration: 1000, easing: "ease" });

      document
        .getElementById("letter2" + i)!
        .animate({ minWidth: "96px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter2box" + i)!
        .animate({ minWidth: "96px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter2" + i)!
        .animate({ margin: "0px" }, { duration: 1000, easing: "ease" });
      document
        .getElementById("letter2box" + i)!
        .animate({ margin: "0px" }, { duration: 1000, easing: "ease" });
      setTimeout(() => {
        document.getElementById("letter1box" + i)?.classList.add("min-w-24");

        document.getElementById("letter1box" + i)?.classList.remove("min-w-0");

        document.getElementById("letter2box" + i)?.classList.add("min-w-24");

        document.getElementById("letter2box" + i)?.classList.remove("min-w-0");
      }, 1000);

      setTimeout(() => {
        shrinkTitleFrom.value = false;
      }, 900);

      setTimeout(() => {
        for (let i = 1; i < 16; i++) {
          document
            .getElementById("c" + i + "D")!
            .classList.remove("duration-0");
        }
      }, 1);
    }
  }, 1);
}
setTimeout(() => {
  if (shrinkTitleFrom.value === false) {
    document
      .getElementById("tempBg")
      ?.animate({ height: "0px" }, { duration: 1 });
    document.getElementById("tempBg")?.classList.remove("h-[605px]");

    document.getElementById("tempBgNav")?.classList.remove("h-[64px]");
    document
      .getElementById("tempBgNav")
      ?.animate({ height: "0px" }, { duration: 1 });

    document.getElementById("projectsBUp")?.classList.add("-top-24");
    document.getElementById("projectsBDown")?.classList.add("-bottom-24");

    /* document.getElementById('newPage')?.classList.add('top-[150%]')
            console.log(document.getElementById('newPage')) */
  }
}, 100);

watch(currentIndex, (newIndex) => {
  /* if(currentIndex.value < currentIndexWhileMove.value){
            next()
        }
        else if(currentIndex.value > currentIndexWhileMove.value){
            prev()
        } */

  if (currentIndex.value === null) {
    projectText1.value = arrayOfProjects[0].titlelist1.map(() => {
      return "";
    });
    projectText2.value = arrayOfProjects[0].titlelist1.map(() => {
      return "";
    });
  }

  console.log(currentIndex.value);
  console.log(newIndex);
  if (newIndex === null) {
    color1.value = "#afafaf";
    color2.value = "#161616";
    color3.value = "#3b3b3b";
    color4.value = "";
    title1.value = "";
    title2.value = "";
    title3.value = "";
    title4.value = "";
  } else {
    color4.value = "";
    console.log(arrayOfProjects[newIndex]);
    color1.value = arrayOfProjects[newIndex].color1;
    color2.value = arrayOfProjects[newIndex].color2;
    color3.value = arrayOfProjects[newIndex].color3;
    color4.value = arrayOfProjects[newIndex].color4;
    title1.value = arrayOfProjects[newIndex].title1;
    title2.value = arrayOfProjects[newIndex].title2;
    title3.value = arrayOfProjects[newIndex].title3;
    title4.value = arrayOfProjects[newIndex].title4;
  }
});

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
@keyframes outIn {
  0% {
    left: -96px;
  }

  100% {
    left: 0px;
  }
}
.outIn {
  animation: outIn 0.25s ease 1;
}
@keyframes inOut {
  0% {
    left: 0px;
  }

  100% {
    left: -96px;
  }
}
.inOut {
  animation: inOut 0.25s ease 1;
}

@keyframes outInToRight {
  0% {
    left: 96px;
  }

  100% {
    left: 0px;
  }
}
.outInToRight {
  animation: outInToRight 0.25s ease 1;
}
@keyframes inOutToRight {
  0% {
    left: 0px;
  }

  100% {
    left: 96px;
  }
}
.inOutToRight {
  animation: inOutToRight 0.25s ease 1;
}

.kodeMono {
  font-family: "Kode Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
}

.goTop {
  animation: goTop 1s ease 1;
}
@keyframes goTop {
  0% {
    top: -20px;
  }
  50% {
    top: -20px;
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
  100% {
    top: -20px;
  }
}

.goDownL {
  animation: goDownL 1s ease 1;
}
@keyframes goDownL {
  0% {
    bottom: 0px;
  }

  100% {
    bottom: -64px;
  }
}

.goTopSmall {
  animation: goTopSmall 1s ease 1;
}

@keyframes goTopSmall {
  0% {
    top: 0px;
  }
  100% {
    top: -10px;
  }
}

.goDownSmall {
  animation: goDownSmall 1s ease 1;
}

@keyframes goDownSmall {
  0% {
    top: -12px;
  }
  100% {
    top: 0px;
  }
}

.goDownSmallL {
  animation: goDownSmallL 1s ease 1;
}

@keyframes goDownSmallL {
  0% {
    top: 0px;
  }
  100% {
    top: -12px;
  }
}

.not-selectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.transitionAll {
  -webkit-transition: all 1s ease;
  transition: all 1s ease;
}

.imageContainer {
  transform: perspective(1000px);
}
.singleImage {
  transform: perspective(1000px);

  transition-duration: 10ms;
  /* 'filter': (index === currentIndex ?'brightness(1) grayscale(0)':'grayscale(1) brightness(0.4)'); */
  transform: translateZ(150px);
  filter: grayscale(0.3) brightness(0.5) !important;
}

.singleImager1 {
  transform: translateZ(100px) rotateY(45deg);
  filter: grayscale(0.15) brightness(0.3) !important;
}
.singleImager2 {
  transform: translateZ(50px) rotateY(35deg);
  filter: grayscale(0.1) brightness(0.3) !important;
}
.singleImager3 {
  transform: translateZ(25px) rotateY(25deg);
  filter: grayscale(0.05) brightness(0.3) !important;
}

.singleImagel1 {
  transform: translateZ(100px) rotateY(-45deg);
  filter: grayscale(0.15) brightness(0.3) !important;
}
.singleImagel2 {
  transform: translateZ(50px) rotateY(-35deg);
  filter: grayscale(0.1) brightness(0.3) !important;
}
.singleImagel3 {
  transform: translateZ(25px) rotateY(-25deg);
  filter: grayscale(0.05) brightness(0.3) !important;
}

.singleImageNav {
  height: 32px !important;
}

.singleImageNavr1 {
  height: 28px;
}
.singleImageNavr2 {
  height: 24px;
}
.singleImageNavr3 {
  height: 20px;
}

.singleImageNavl1 {
  height: 28px;
}
.singleImageNavl2 {
  height: 24px;
}
.singleImageNavl3 {
  height: 20px;
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
.textAnimationFromRight {
  animation: textAnimationFromRight 2s ease 1;
}
.textAnimationFromRightPrev {
  animation: textAnimationFromRightPrev 1s ease 1;
}
@keyframes textAnimationFromRight {
  0% {
    width: 0px;
  }
  50% {
    width: 0px;
  }
  100% {
    width: 72px;
  }
}
@keyframes textAnimationFromRightPrev {
  0% {
    width: 72px;
  }
  100% {
    width: 0px;
  }
}
.kodeMono {
  font-family: "Kode Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
}
.animateUp {
  animation: animateUp 1s ease 1;
}
@keyframes animateDown {
  0% {
    top: -50%;
  }
  100% {
    top: 50%;
  }
}
.noTransitionDelay {
  transition-delay: 0s;
}
</style>
