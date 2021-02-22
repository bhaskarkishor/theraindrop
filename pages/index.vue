<template>
	<v-row>
		<v-col class="col-0 col-sm-4 accent">
		</v-col>
		<v-col class="col-12 col-sm-8 height-100 d-flex align-center ">
			<div class="text-center">
			    <p class="text-center text-h1">
			      Welcome to Your Online journal
			    </p>

			    <v-btn to="home" class="v-btn primary">
			    	
			    	Write about today
			    </v-btn>
			</div>
		</v-col>
	</v-row>

</template>

<script>
export default {
	layout:'login'	
};
</script>

<style>
.height-100{
	height:100vh;
}
</style>