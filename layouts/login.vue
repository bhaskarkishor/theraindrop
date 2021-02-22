<template>
	<v-app>
		<v-row>
			<v-col class="col-0 col-sm-4 secondary ">
			<div class="left-side-box"></div>
			</v-col>
			<v-col class="col-12 col-sm-8 right-side-box">
		<v-main>
		<nuxt/>
		</v-main>
			</v-col>
		</v-row>
	</v-app>
</template>
<style >
@media only screen and (min-width: 600px){
  .left-side-box {
    height: 100vh;
  }
}
.left-side-box{
  position: fixed;
  top:0;
  left:0;
  z-index: 1;
  width:400px;
}
</style>