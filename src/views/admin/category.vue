<template>
    <div>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(father,i) in allCategory"
          :key="i"
        >
          <v-expansion-panel-header>

            <v-row>
              <v-col>
                {{father.name}}
              </v-col>
              <v-col>
                
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="addCategory(null)"
                  >
                  <i class="el-icon-circle-plus-outline"></i>
                  </v-btn>
                </template>
                <span>新增一级分类</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="addCategory(father)"
                  >
                  <i class="el-icon-circle-plus-outline"></i>
                  </v-btn>
                </template>
                <span>新增子分类</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="removeCategor(null,father)"
                  >
                  <i  class="el-icon-remove-outline" style="font-size: medium;"></i>
                  </v-btn>
                </template>
                <span>删除分类</span>
              </v-tooltip>
              </v-col>
            </v-row>

          </v-expansion-panel-header>
          <v-expansion-panel-content style="margin-top: 10px;">
            <v-row v-for="child in father.children" style="margin-left: 20px; margin-top: 10px;margin-bottom: 5px;">
              <v-col>
                {{child.name}}
              </v-col>
              <v-col>
                
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="addCategory(father)"
                  >
                  <i class="el-icon-circle-plus-outline"></i>
                  </v-btn>
                </template>
                <span>新增二级分类</span>
              </v-tooltip>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="removeCategor(father,child)"
                  >
                  <i  class="el-icon-remove-outline" style="font-size: medium;"></i>
                  </v-btn>
                </template>
                <span>删除分类</span>
              </v-tooltip>
              </v-col>

            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Category',
    data(){
      return{
        categoryMap: {
          Set: function(key, value) { this[key] = value },
          Get: function(key) { return this[key] },
          Contains: function(key) { return this.Get(key) != null },
          Remove: function(key) { delete this[key] }
        },
        category: [],
        allCategory:[],
        categoryChildren: [],
        nowCategory: {},
      }
    },
    created() {
      this.getCategory()
    },
    methods:{
      getCategory() {
        this.$axios({
                   url:"/category/list",
                   method:'get',
                  }).then(re=>{
                      this.allCategory = re.data
                      for(let i = 0 ; i < re.data.length ; i++){
                        const name = re.data[i].name
  
                        this.category.push(name);
                        this.categoryMap.Set(name,re.data[i]);
  
                      }
  
                    }).catch(e=>{
                      return null;
                    })
      },
      removeCategor(father,category){
          let categoryDto = {
            id:null,
            name:null,
            fatherId:null,
            name:null,
            type:2
          }
          categoryDto.id = category.id
          let info = ""
          if(father == null){
            info = "你将要删除一级分类："+category.name+" 它的子分类也会一并被删除，此操作将永久删除分类, 是否继续?"
            categoryDto.fatherId = 0;
          }else{
            info = "你将要删除分类："+category.name+" 此操作将永久删除分类, 是否继续?"
            categoryDto.fatherId = father.id
          }
          

          this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.$axios({
          url:"/category/delete/",
          method:'post',
          data:categoryDto
        }).then(re=>{
          this.getCategory()
          if(re.status == 200){
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }

        }).catch(e=>{
          this.$message({
            type: 'info',
            message: '删除失败'
          });          

          return null
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      },
      addCategory(father){
        let categoryDto = {
            id:null,
            name:null,
            fatherId:null,
            name:null,
            type:2
          }

        console.log("增加分类")
        if(father == null){
          categoryDto.fatherId = 0;
          categoryDto.type = 1
          console.log("父分类")
        }else{
          console.log("子分类")
          categoryDto.fatherId = father.id
          categoryDto.type = 2
        }

        this.$prompt('请输入分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          
        }).then(({ value }) => {
            categoryDto.name = value;
            this.$axios({
          url:"/category/add/",
          method:'post',
          data:categoryDto
        }).then(re=>{
          this.getCategory()
          
          if(re.status == 200){
            this.$message({
            type: 'success',
            message: '增加分类成功!'
          });
          }

        }).catch(e=>{
          this.$message({
            type: 'info',
            message: '增加分类失败'
          });          

          return null
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });

      }

    }
  }
  </script>
  
  <style>
  
  </style>