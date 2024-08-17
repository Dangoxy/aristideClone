<template>
  <div
    class="not-selectable relative flex h-screen w-full flex-col justify-between overflow-hidden bg-[#161616] p-12 text-[#b3caca] transition-all duration-1000"
  >
    <div
      class="flex flex-row items-start justify-center text-[64px] font-black sm:justify-between sm:text-[96px]"
    >
      <div class="kodeMono">
        <div class="-my-7 flex">
          <div v-for="(letter, index) in 'ARISTIDE'">
            <div class="relative h-36 w-[36px] overflow-hidden sm:w-[52px]">
              <h1 :id="'about1' + index" class="absolute left-[-56px]">
                {{ letter }}
              </h1>
            </div>
          </div>
        </div>

        <div class="-mt-[72px] flex">
          <div v-for="(letter, index) in 'CLONE'">
            <div class="relative h-36 w-[36px] overflow-hidden sm:w-[52px]">
              <h1 :id="'about2' + index" class="absolute left-[-56px]">
                {{ letter }}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="windowWidth >= 1750 && windowHeight >= 720"
        class="relative hidden h-[18px] w-[38px] overflow-hidden sm:flex"
      >
        <a
          @click="router.push('/')"
          class="openSans animateDownUp absolute cursor-pointer text-[12px] font-black underline underline-offset-2"
          >CLOSE</a
        >
      </div>
    </div>

    <div
      class="flex flex-col gap-2"
      v-if="windowWidth < 1750 || windowHeight < 720"
    >
      <h1 class="openSans text-[16px] font-bold">
        {{
          "You seem to be using a phone or the window side is too small, to view the website please use a bigger screen,".toUpperCase()
        }}
      </h1>
      <h1 class="openSans text-[16px] font-bold">
        {{
          "For ideal viewing please use a 1920x1080 screen thanks :)".toUpperCase()
        }}
      </h1>
    </div>

    <div class="relative h-[105px] w-full overflow-hidden">
      <p
        class="openSans animateFromLeft absolute max-w-[416px] text-justify text-[10px] font-bold"
      >
        {{
          `This website is an inspired fusion of Aristide 
                Benoist and Camille Mormal's portfolios, 
                combining striking visuals from one and with the 
                dynamic JavaScript magic of both. The result 
                is seamless animations, smooth transitions, and 
                an engaging user experience. Developed by Ammar 
                Abdelwadoud, this project reflects a deep 
                appreciation for the innovative design and 
                functionality of both portfolios.`.toUpperCase()
        }}
      </p>
    </div>

    <div class="openSans flex flex-col text-[10px] font-bold">
      <!-- <h1 class="text-[12px] underline underline-offset-2 mb-2">LINKS</h1> -->
      <div class="relative h-4 w-full overflow-hidden">
        <a
          href="https://ammarabdelwadoudv2.netlify.app"
          target="_blank"
          class="animateUpDown absolute flex cursor-pointer"
        >
          MY PORTFOLIO
          <div class="size-4 -rotate-45">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
                fill="#ddfcfc"
              />
            </svg>
          </div>
        </a>
      </div>
      <div class="relative h-4 w-full overflow-hidden">
        <a
          href="https://github.com/Dangoxy"
          target="_blank"
          class="animateUpDown absolute flex cursor-pointer"
        >
          GITHUB
          <div class="size-4 -rotate-45">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
                fill="#ddfcfc"
              />
            </svg>
          </div>
        </a>
      </div>
      <div class="relative h-4 w-full overflow-hidden">
        <a
          href="https://www.linkedin.com/in/ammar-abdelw</div>adoud-20457a272/"
          target="_blank"
          class="animateUpDown absolute flex cursor-pointer"
        >
          LINKEDIN
          <div class="size-4 -rotate-45">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
                fill="#ddfcfc"
              />
            </svg>
          </div>
        </a>
      </div>
      <br />
      <div class="relative h-4 w-full overflow-hidden">
        <a
          href="https://aristidebenoist.com/"
          target="_b</div>lank"
          class="animateUpDown absolute flex cursor-pointer"
        >
          ARISTIDE BENOIST
          <div class="size-4 -rotate-45">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
                fill="#ddfcfc"
              />
            </svg>
          </div>
        </a>
      </div>
      <div class="relative h-4 w-full overflow-hidden">
        <a
          href="https://camillemormal.com/"
          target="_blank"
          class="animateUpDown absolute flex cursor-pointer"
        >
          CAMILLE MORMAL
          <div class="size-4 -rotate-45">
            <svg
              clip-rule="evenodd"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fill-rule="nonzero"
                fill="#ddfcfc"
              />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
setTimeout(() => {
  for (let i = 0; i < "ARISTIDE".length; i++) {
    setTimeout(
      () => {
        document
          .getElementById("about1" + i)
          ?.animate({ left: "0px" }, { duration: 1000, easing: "ease" });
      },
      Number(i / "ARISTIDE".length) * 1000,
    );

    setTimeout(
      () => {
        document.getElementById("about1" + i)?.classList.remove("left-[-56px]");
      },
      1000 + Number(i / "ARISTIDE".length) * 1000,
    );
  }
  for (let i = 0; i < "CLONE".length; i++) {
    setTimeout(
      () => {
        document
          .getElementById("about2" + i)
          ?.animate({ left: "0px" }, { duration: 1000, easing: "ease" });
      },
      Number(i / "CLONE".length) * 1000,
    );

    setTimeout(
      () => {
        document.getElementById("about2" + i)?.classList.remove("left-[-56px]");
      },
      1000 + Number(i / "CLONE".length) * 1000,
    );
  }
}, 1);

window.onmousemove = () => {};
window.onmousedown = () => {};
window.onmouseup = () => {};

let windowWidth = ref(window.innerWidth);
let windowHeight = ref(window.innerHeight);
window.onresize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  console.log(windowWidth);
  console.log(windowHeight);
};
</script>

<style scoped>
.animateDownUp {
  animation: animateDownUp 1s ease;
}
@keyframes animateDownUp {
  0% {
    bottom: -16px;
    opacity: 0;
  }
  100% {
    bottom: 0px;
    opacity: 1;
  }
}

.animateUpDown {
  animation: animateUpDown 1s ease;
}
@keyframes animateUpDown {
  0% {
    top: -16px;
    opacity: 0;
  }
  100% {
    top: 0px;
    opacity: 1;
  }
}

.animateFromLeft {
  animation: animateFromLeft 1s ease;
}
@keyframes animateFromLeft {
  0% {
    left: -56px;
    opacity: 0;
  }
  100% {
    left: 0px;
    opacity: 1;
  }
}

.kodeMono {
  font-family: "Kode Mono", monospace;
  font-optical-sizing: auto;

  font-style: normal;
  letter-spacing: -6px;
}
.bebas {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.openSans {
  font-family: "Open Sans", sans-serif;
}
</style>
