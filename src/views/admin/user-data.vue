<template>
    <div>
      <h2>用户数据</h2>
      	<!-- 内容 -->
		<div class="main">
			

			<v-card elevation="14" style="margin-right: 100px; margin-top: 20px;">
				<v-card-title>网站 UV</v-card-title>
				<div style="margin-left: 20px;margin-bottom: 10px; ">
					<v-row>
						<v-col
						cols="12"
						sm="6"
						md="4"
					  >
						<v-menu
						  ref="menu"
						  v-model="menu"
						  :close-on-content-click="false"
						  :return-value.sync="date"
						  transition="scale-transition"
						  offset-y
						  min-width="auto"
						>
						  <template v-slot:activator="{ on, attrs }">
							<v-text-field
							  v-model="dateRangeText"
							  label="请选择查询的日期范围"
							  prepend-icon="mdi-calendar"
							  readonly
							  v-bind="attrs"
							  v-on="on"
							></v-text-field>
						  </template>
						  <v-date-picker
							no-title
							scrollable
							v-model="dates"
							range
						  >
							<v-spacer></v-spacer>
							<v-btn
							  text
							  color="primary"
							  @click="menu = false"
							>
							  Cancel
							</v-btn>
							<v-btn
							  text
							  color="primary"
							  @click="$refs.menu.save(date)"
							>
							  OK
							</v-btn>
						  </v-date-picker>
						</v-menu>
					  </v-col>
					  <v-col cols="5">
						<v-btn
						depressed
						color="primary"
						@click="getUV()"
					  >
						查询网站UV
					  </v-btn>
					  </v-col>
					</v-row>
					<v-row>
						<div style="margin-bottom: 20px;margin-left: 35px;">统计结果： 访问UV为 <i style="color: crimson;">{{UVNum}}</i></div>
					</v-row>
				</div>
			</v-card>

			<v-card elevation="14" style="margin-right: 100px;margin-top: 20px;">
				<v-card-title>网站 UV</v-card-title>
				<div style="margin-left: 20px;margin-bottom: 10px; ">
					<v-row>
						<v-col
						cols="12"
						sm="6"
						md="4"
					  >
						<v-menu
						  ref="menu"
						  v-model="menu"
						  :close-on-content-click="false"
						  :return-value.sync="date"
						  transition="scale-transition"
						  offset-y
						  min-width="auto"
						>
						  <template v-slot:activator="{ on, attrs }">
							<v-text-field
							  v-model="dateRangeText"
							  label="请选择查询的日期范围"
							  prepend-icon="mdi-calendar"
							  readonly
							  v-bind="attrs"
							  v-on="on"
							></v-text-field>
						  </template>
						  <v-date-picker
							no-title
							scrollable
							v-model="dates"
							range
						  >
							<v-spacer></v-spacer>
							<v-btn
							  text
							  color="primary"
							  @click="menu = false"
							>
							  Cancel
							</v-btn>
							<v-btn
							  text
							  color="primary"
							  @click="$refs.menu.save(date)"
							>
							  OK
							</v-btn>
						  </v-date-picker>
						</v-menu>
					  </v-col>
					  <v-col cols="5">
						<v-btn
						depressed
						color="primary"
						@click="getDAU()"
					  >
						查询网站用户活跃量
					  </v-btn>
					  </v-col>
					</v-row>
					<v-row>
						<div style="margin-bottom: 20px;margin-left: 35px;">统计结果： 用户活跃DAU为 <i style="color: crimson;">{{DAUNum}}</i></div>
					</v-row>
				</div>
			</v-card>				
		</div>
    </div>
  </template>
  
<script>
	export default {
		name: 'UserData',
	  data: () => ({
		dates: ['2019-09-10', '2019-09-20'],
		UVNum:0,
		DAUNum:0
	  }),
	  computed: {
		dateRangeText () {
		  return this.dates.join(' ~ ')
		},
	  },
	  methods:{
		getUV(){
			let dateDto = {
				"start":this.dates[0],
				"end":this.dates[1]
			}
			console.log(dateDto)
			this.$axios({
                   url:"/data/uv",
                   method:'post',
				   data:dateDto
                  }).then(re=>{
                      this.UVNum = re.uv
                    
                    }).catch(e=>{
                      return null;
                    })

		},
		getDAU(){
			let dateDto = {
				"start":this.dates[0],
				"end":this.dates[1]
			}
			console.log(dateDto)
			this.$axios({
                   url:"/data/dau",
                   method:'post',
				   data:dateDto
                  }).then(re=>{
                      this.DAUNum = re.dau
                    
                    }).catch(e=>{
                      return null;
                    })

		},

	  }
	}
  </script>
  
  
  <style>
  
  </style>