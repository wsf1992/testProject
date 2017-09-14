<template>
	<div class="index_box">
		<div class="nav">
			<Tree v-once></Tree>
		</div>
		<div class="contentbox" id="contentbox">
			<Headers></Headers>
			<div class="mycontent">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Tree from "./treecomponent"
	import Headers from "./header"
	export default {
		data() {
			return {

			}
		},
		methods: {
			
		},
		components: {
			Tree,
			Headers,
		},
		mounted() {

		}
	}
</script>

<style>
	.index_box {
		display: flex;
	}	
	.index_box>.nav {
		max-width: 260px;
		background-color: rgb(238, 241, 246)
	}
	
	.index_box>.contentbox {
		width: 100%;
	}
</style>