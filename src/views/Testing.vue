<template>
  <div
    class="not-selectable relative flex h-screen w-full flex-col overflow-hidden bg-[#161616]"
  >
    <!-- <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[960px] h-[405px] 
        text-[160px] font-bold kodeMono flex flex-col justify-start items-center gap-0"
        :style="{'color': 'black', 'text-shadow': '0px 0px 8px rgba(128,128,128,0.5)'}"
        :class="currentIndex !== null ? 'opacity-100' : 'opacity-0'">

            <div class="flex -mt-16 relative">
                    
                <div v-for="letter,letterIndex in projectText1"
                class="relative min-h-32 min-w-24 flex items-center overflow-hidden"
                >
                    <h1 
                    :id="'letter1'+letterIndex"
                    :style="{'animation-delay': `${(letterIndex/(projectText1.length/1)).toFixed(2)}s`}"
                    
                    class="min-h-32 min-w-24 flex justify-center items-center transition-all duration-250
                    absolute top-1/2 -translate-y-1/2">{{ letter }}</h1>
                </div>

            </div>

            <div class="flex relative">
                    
                    <div v-for="letter,letterIndex in projectText2"
                    class="relative min-h-32 min-w-24 flex items-center overflow-hidden"
                    >
                        <h1 
                        :id="'letter2'+letterIndex"
                        :style="{'animation-delay': `${(letterIndex/(projectText1.length/1)).toFixed(2)}s`}"
                        
                        class="min-h-32 min-w-24 flex justify-center items-center transition-all duration-250
                        absolute top-1/2 -translate-y-1/2">{{ letter }}</h1>
                    </div>
    
                </div>

        </div> -->

    <!-- <div class="absolute left-0 top-0 text-[#fafafa]">
      <h1>delta: {{ delta }}</h1>
      <h1>currentIndexOn: {{ currentIndexOn }}</h1>
    </div> -->

    <div
      id="carouselContainerForImages"
      class="absolute left-1/2 top-1/2 flex -translate-y-1/2 gap-2 !will-change-transform"
      :style="{
        transform: `translate(${delta}%,-50%) perspective(10000px) `,
        'transform-style': 'preserve-3d',
        'transform-origin': `${Math.abs(delta)}%`,
      }"
    >
      <div
        v-for="(project, index) in arrayOfProjects"
        :id="`carouselContainerForImages${index}`"
        class="translateZ(0px) h-72 min-w-20 transition-all duration-1000 !will-change-transform"
        :style="{
          background: `url(${project.mainImg})`,
          'background-size': 'cover',
          filter: 'grayscale(1) contrast(0.5) brightness(0.5)',
        }"
      ></div>
    </div>

    <!-- <img
      src="../../public/plusIcon2.png"
      class="absolute left-1/2 top-1/2 size-4 -translate-y-1/2 translate-x-1/2"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import arrayOfProjects from "../data";
import { useRouter } from "vue-router";

let router = useRouter();
let delta = ref(0);
let prevPosition = ref(0);
let downPosX = ref(0);
let currentIndexOn = ref(0);
let timestamp = 0;
let mX = 0;

window.onmousedown = (e) => {
  downPosX.value = e.clientX;
};

window.onmousemove = (e) => {
  if (downPosX.value !== 0) {
    let temp =
      prevPosition.value +
      -((downPosX.value - e.clientX) / 2.5 / window.innerWidth) * 100;

    currentIndexOn.value = Math.floor(
      (Math.abs(delta.value) / 100) * arrayOfProjects.length,
    );

    if (0 < temp) {
      delta.value = 0;
      temp = 0;
    } else if (-100 > temp) {
      delta.value = -100;
      temp = -100;
    } else if (0 >= temp && temp >= -100) {
      delta.value = temp;
      document
        .getElementById("carouselContainerForImages")
        ?.animate(
          { transform: `translate(${delta.value}%,-50%) perspective(15000px)` },
          { duration: 1000, fill: "both" },
        );
      for (let i = 0; i < arrayOfProjects.length; i++) {
        document
          .getElementById(`carouselContainerForImages${i}`)
          ?.animate(
            { backgroundPosition: `${Math.abs(delta.value)}%` },
            { duration: 1000, fill: "both" },
          );
      }

      let now = Date.now();
      let currentmY = e.clientX;
      let dt = now - timestamp;
      let distance = Math.abs(currentmY - mX);
      let speed = Math.round((distance / dt) * 1000);
      /* console.log(speed); */
      mX = currentmY;
      timestamp = now;
      speed > 2250 ? (speed = 2250) : speed;
      for (let i = -5; i < 6; i++) {
        let tempTransZ =
          i === 0
            ? (500 * (1.3336 / 16) * speed) / 15
            : (500 * (1 / Math.abs(i) / 16) * speed) / 15;
        let tempRotateY = i === 0 ? 0 : (i * 2 * (speed > 1125 ? 90 : 45)) / 5;

        /* console.log(tempTransZ);
        console.log(tempRotateY); */
        console.log(speed);
        let imgElement = document.getElementById(
          `carouselContainerForImages${currentIndexOn.value + i}`,
        );
        /* console.log(i === 0 ? 1 : Math.abs(1 / i / 2.5)); */
        /* console.log(i === 0 ? 0.5 : Math.abs(1 / i / 2.5)); */

        imgElement?.animate(
          {
            transform: `translate3d(0,0,${tempTransZ}px) rotateY(${tempRotateY}deg)`,
          },
          { duration: 500, easing: "ease-out", fill: "none" },
        );
        imgElement?.animate(
          {
            transform: `translate3d(0,0,0px) rotateY(0deg)`,
          },
          { duration: 500, easing: "ease-in", fill: "none" },
        );

        imgElement?.animate(
          {
            filter: [
              `grayscale(${i === 0 ? 1 : Math.abs(1 / i / 2.5)}) contrast(${i === 0 ? 1 : 0.5 + Math.abs(1 / i / 2.5)}) brightness(${i === 0 ? 1 : 0.5 + Math.abs(1 / i / 2.5)})`,
              "grayscale(1) contrast(0.5) brightness(0.5)",
            ],
          },
          { duration: 2000, easing: "ease", fill: "none" },
        );
      }
    }

    /* translateZ rotateY */
  }
};

window.onmouseup = () => {
  downPosX.value = 0;
  prevPosition.value = delta.value;
};

/* let shrink = ref(false);
let currentIndex = <any>ref(null);
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
function openCard(index: any) {
  if (currentIndex.value < arrayOfProjects.length) {
    currentIndex.value = index;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outIn");
      element2!.classList.remove("outIn");
      element1!.classList.remove("inOut");
      element2!.classList.remove("inOut");
      element1!.classList.add("inOut");
      element2!.classList.add("inOut");
      let delay = (i / (letterList1.length / 1)).toFixed(2);
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

          element1!.classList.remove("inOut");
          element2!.classList.remove("inOut");
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
    

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outIn");
      element2!.classList.remove("outIn");
      element1!.classList.remove("inOut");
      element2!.classList.remove("inOut");
      element1!.classList.add("inOut");
      element2!.classList.add("inOut");
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
function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    let letterList1 = arrayOfProjects[currentIndex.value].titlelist1;
    let letterList2 = arrayOfProjects[currentIndex.value].titlelist2;
    

    for (let i = 0; i < letterList1.length; i++) {
      let element1 = document.getElementById("letter1" + i);
      let element2 = document.getElementById("letter2" + i);
      element1!.classList.remove("outInToRight");
      element2!.classList.remove("outInToRight");
      element1!.classList.remove("inOutToRight");
      element2!.classList.remove("inOutToRight");
      element1!.classList.add("inOutToRight");
      element2!.classList.add("inOutToRight");
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
} */

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
.not-selectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-backface-visibility: hidden;
  -webkit-perspective: 20000;
  backface-visibility: hidden;
  perspective: 20000;
}
</style>
