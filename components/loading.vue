<template lang="html">
  <div class="loading-page" v-if="loading">
    <i class="el-icon-loading"></i>
		<!-- <div class="container">
			<span>R</span>
			<span>E</span>
			<span>N</span>
			<span>T</span>
			<span>I</span>
		</div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="stylus">



@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap')
.loading-page
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  // background rgba(255, 255, 255, 0.8)
  background rgba(0, 0, 0, 0.8)
  text-align center
  padding-top 200px
  font-size 30px
  font-family sans-serif
  z-index 3000

i
  color #7B2DEB
  font-size 5rem

// body
// 	height: 100vh
// 	margin: 0
// 	background-color: #008080
// 	display: flex
// 	justify-content: center
// 	align-items: center
// 	font-family: 'Poppins', sans-serif
// 	font-size: 48px

// 	span
// 		animation-name: fontSize
// 		animation-duration: 2s
// 		animation-iteration-count: infinite
// 		animation-timing-function: ease
// 		&:nth-child(1)
// 			color: #7B2DEB
// 			animation-delay: -2s
// 		&:nth-child(2)
// 			color: #7B2DEB
// 			animation-delay: -1.8s
// 		&:nth-child(3)
// 			color: #7B2DEB
// 			animation-delay: -1.6s
// 		&:nth-child(4)
// 			color: #7B2DEB
// 			animation-delay: -1.4s
// 		&:nth-child(5)
// 			color: #7B2DEB
// 			animation-delay: -1.2s
// 		&:nth-child(6)
// 			color: #7B2DEB
// 			animation-delay: -1s

// @keyframes fontSize
// 	0%
// 		font-size: 78px
// 	100%
// 		font-size: 48px
</style>
