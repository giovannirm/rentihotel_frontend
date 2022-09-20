export default {
	mode: "universal",
	/*
	 ** Headers of the page
	 */
	head: {
		title: process.env.npm_package_name || "",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		script: [
			// src="https://checkout.culqi.com/js/v3    --> culqi checkout
			// https://checkout.culqi.com/v2 ---> culqi js
			{
				hid: "culqui-lib",
				src: "https://checkout.culqi.com/js/v3",
				defer: true
			},
			{
				src: "https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"
			},
			{ src: "https://apis.google.com/js/api:client.js" },
			{
				src:
					"https://maps.googleapis.com/maps/api/js?key=AIzaSyDeoP9FljDObVRrv70OlokkvzRwCvjMcD8&callback=initMap",
				defer: true
			}
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: "~/components/loading.vue",
	/*
	 ** Global CSS
	 */
	css: ["element-ui/lib/theme-chalk/index.css"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: "@/plugins/axios" },
		{ src: "@/plugins/element-ui" },
		{ src: "@/plugins/vue-glide" },
		{ src: "@/plugins/viewer" },
		{ src: "@/plugins/vuelidate" },
		{ src: "@/plugins/v-calendar", mode: "client" }
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/auth",
		"@nuxtjs/pwa",
		[
			"nuxt-fontawesome",
			{
				imports: [
					{
						set: "@fortawesome/free-solid-svg-icons",
						icons: ["fas"]
					},
					{
						set: "@fortawesome/free-brands-svg-icons",
						icons: ["fab"]
					}
				]
			}
		]
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */

	axios: {
		baseURL: "https://apirenti.com/v1/api/"
	},

	fontawesome: {
		imports: [
			{
				set: "@fortawesome/free-solid-svg-icons",
				icons: [
					"fas",
					"bars",
					"ellipsis-v",
					"gem",
					"tv",
					"coffee",
					"wifi",
					"toilet",
					"times",
					"chevron-down",
					"male",
					"child",
					"check-circle",
					"exclamation-circle",
					"check"
				]
			},
			{
				set: "@fortawesome/free-brands-svg-icons",
				icons: [
					"fab",
					"facebook-messenger",
					"facebook-f",
					"fa-whatsapp",
					"fa-instagram",
					"fa-google"
				]
			}
		]
	},

	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: "account/login",
						method: "post",
						propertyName: "token"
					},
					user: {
						url: "user/user",
						method: "get",
						propertyName: false
					},
					logout: {
						url: "account/logout",
						method: "post",
						propertyName: false
					},

					// false // { url: "user/", method: "get", propertyName: null}
				},
				tokenRequired: true,
				tokenType: "bearer"
			}
		},
		rewriteRedirects: true
	},
	// https://apirenti.com/v1/api/user/
	// https://apirenti.com/v1/api/user/
	/*
	 ** Build configuration
	 */
	build: {
		transpile: [/^element-ui/],
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
};
