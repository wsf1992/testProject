<template>
	<div class="vercode">
		<canvas id="canva" width="100%" height="42px" @click="recanva"></canvas>
	</div>
</template>
<script>
	import vue from "vue"
	import state from "../../vuex/state"
	export default {
		data() {
			return {
				canvas: "",
				width: "",
				height: '',
				ctx: "",
			}
		},
		mounted() {
			var that = this;
			that.canvas = document.getElementById("canva");
			that.width = that.canvas.width;
			that.height = that.canvas.height;
			that.ctx = that.canvas.getContext("2d");
			that.ctx.textBaseLine = "bottom";
			that.getax(that.getcan)
			
		},
		methods: {
			recanva() {
				var that = this
				that.getax(that.getcan)
			},
			getax(fn) {
				this.$axios({
					url:state.url.baseurl+state.url.getcode,									
					method: "get",
				}).then(function(result) {
					fn(result.data.data.verify)
				})
			},
			num(min, max) {
				return Math.floor(Math.random() * (max - min) + min)
			},
			color(min, max) {
				return 'rgb(' + this.num(min, max) + ',' + this.num(min, max) + ',' + this.num(min, max) + ')'
			},
			getcan(txt) {
				var that = this;
				that.ctx.fillStyle = that.color(0, 255);
				that.ctx.fillRect(0, 0, that.width, that.height);
				//写文字
				for(var i = 0; i < 4; i++) {
					that.ctx.fillStyle = that.color(0, 255);
					that.ctx.font = that.num(20, 30) + "px Asial";
					var x = 25 * i + 5;
					var y = that.num(25, 35)
					var returntxt = txt[i];
					that.ctx.fillText(returntxt, x, y)
				}
				//画干扰线
//				for(var i = 0; i < 8; i++) {
//					that.ctx.strokeStyle = that.color(0, 255);
//					that.ctx.beginPath();
//					that.ctx.moveTo(that.num(0, that.width), that.num(0, that.height))
//					that.ctx.lineTo(that.num(0, that.width), that.num(0, that.height))
//					that.ctx.stroke();
//					that.ctx.closePath()
//				}
				//画干扰的泡泡
				for(var i = 0; i < 50; i++) {
					that.ctx.fillStyle = that.color(0, 255);
					that.ctx.beginPath();
					that.ctx.arc(that.num(0, that.width), that.num(0, that.height), that.num(0, 2), 0, Math.PI * 2)
					that.ctx.fill()
					that.ctx.closePath()
				}
			}
		}
	}
</script>
<style>
	
</style>