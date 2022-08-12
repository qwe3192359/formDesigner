<template>
    <div>
        <div style="padding: 20px"
             class="widget-grid ">
            <!--搜索-->
            <el-row style="padding: 10px 0" v-if="formConfig.head.filters.length > 0">
                <el-col :span="6" :offset="18">
                    <el-input placeholder="请输入内容" v-model="searchValue">
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!--表格-->
            <el-table
                    class="yyyy"
                    ref="generateTable"
                    :data="tableData"
                    :stripe="formConfig.head.stripe"
                    :border="formConfig.head.border"
                    :max-height="formConfig.head.height"
                    @sort-change="sort"
                    :default-sort="{prop: '', order: ''}"
                    row-key="id"

                    @row-click="rowClick"

                    lazy
                    :load="load"
                    style="width: 100%">
                <!--多选-->
                <el-table-column
                        v-if="formConfig.head.isSelect"
                        type="selection"
                        width="55">
                </el-table-column>


                <el-table-column v-for="(item,num) in formConfig.head.columnConfig"
                                 :key="'table'+num"
                                 :prop="item.model"
                                 :sortable="item.sortable | sortable"
                >
                    <template slot="header" slot-scope="scope">
                        <span>{{item.names[language]}}</span>
                    </template>
                    <template slot-scope="scope">
                        <template v-if="isAdd && isEndRow(scope.$index)">
<!--                            <el-input v-model="scope.row[item.model]" placeholder="请输入内容"></el-input>-->
                            <generate-form-item

                                                :models.sync="models"

                                                :rules="rules"
                                                :formConfig="formConfig"
                                                :element="item.addTypeoptions"

                                                :language="language"
                                                :dictUrl="dictUrl"
                                                v-on:myEvent="myEvent"
                            >
                            </generate-form-item>
<!--                            -->
<!--                            :formShowType="formShowType"-->
<!--                            :dictUrl="dictUrl"-->
                        </template>
                        <template v-else>
                            <span style="min-height:15px" >
                            <!--文字-->
                            <template v-if="item.type === 'text'">
                                <span @click="aaa(scope,formConfig.head.columnConfig)">{{ scope.row[item.model]}}</span>
                            </template>
                                <!--链接-->
                            <template v-else-if="item.type === 'link'">
                                <a :href="scope.row.param" target="_blank">
                                    {{ scope.row[item.model]}}
                                    </a>
                            </template>
                                <!--事件-->
                            <template v-else-if="item.type === 'btn'">
                                    <span @click="myEvent('click',scope.row)">
                                        {{ scope.row[item.model]}}
                                    </span>
                            </template>
                                <!--按钮-->
                            <template v-else-if="item.type === 'button'">
                                <div>
                                    <template v-for="(list,index) in item.btns">
                                        <div :key="'btn'+index">
                                            <el-button v-if="list.type === 'primary'" type="primary" size="mini"
                                                       @click="myEvent('click',scope.row)">
                                                <span>编辑</span>
                                            </el-button>
                                            <el-button v-else-if="list.type === 'success'" type="success"
                                                       size="mini"
                                                       @click="myEvent('click',scope.row)">
                                                <span>新增</span>
                                            </el-button>
                                            <el-button v-else-if="list.type === 'danger'" type="danger" size="mini"
                                                       @click="myEvent('click',scope.row)">
                                                <span>删除</span>
                                            </el-button>
                                        </div>

                                    </template>
                                </div>

                            </template>
                                <!--数据字典-->
                            <template v-else-if="item.type === 'dict'">
                                <dist-show :dict="dict" :param="item.param" :val="scope.row[item.model]">
                                </dist-show>
                            </template>

                            </span>
                        </template>

                    </template>

                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button type="success" @click="save" v-if="isAdd">保存</el-button>
        </div>
        <div>
            <el-button type="primary" @click="addRow">新增</el-button>
        </div>
        <!--分页-->
        <div style="text-align: center">
            <el-pagination
                    v-if="formConfig.head.pageConfig.paging"
                    :layout="formConfig.head.pageConfig.layout | pageLayout"
                    :pager-count="7"
                    :background="formConfig.head.pageConfig.background"
                    :total="pageTotal"
                    :current-page="currentPage"

                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"

                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="pageSize"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>

    import {deepClone} from '../../util/common'
    import request from '../../util/request'
    import distShow from '../common/distShow.vue'
    import GenerateFormItem from './GenerateFormItem'
    export default {
        name: 'generate-table',
        components: {
            distShow,
            GenerateFormItem
        },
        props: {
            formConfig: null,
            tableData: null,
            pageTotal: null,    //总页数
            pageSize: null,     //每页显示个数
            currentPage: null,  //当前页数
            language: null,      //语言
            dictUrl: null,
            formStyle: null
        },
        data () {
            return {
                //表单最终数据（结合表单配置数据和表单数据）
                models: {},
                //表单验证
                rules: {},

                //列表搜索
                searchValue: '',
                //列表数据字典值
                dict: {},
                //反写数据
                textFormData: this.formData,
                isAdd: false
            }
        },
        computed: {

        },
        filters: {
            //分页配置
            pageLayout(value){
                if (!value) {
                    return ''
                }
                else if (value === '01') {
                    return 'prev, pager, next'
                }
                else if (value === '02') {
                    return 'total, sizes, prev, pager, next, jumper'
                }
                else if (value === '03') {
                    return 'total'
                }
            },
            //本列排序
            sortable(value){
                if (value) {
                    return 'custom'
                }
                else {
                    return false
                }
            },
            //数据字典
            dict(value){
                request.get(this.dictUrl + '?dict=' + this.widget.options.dict)
                    .then(data => {
                        console.log(data)
                        //this.widget.options.remoteOptions = data.data;
                        this.options = data.data;
                        console.log(this.options)
                    });
            }
        },
        created () {
            if (this.formConfig.type === '01') {
                this.generateModle(this.formConfig.grids)
            }
            else if (this.formConfig.type === '02') {
                //列表获取数据字典值
                this.formConfig.head.columnConfig.forEach(item => {
                    if (item.type === 'dict') {
                        this.getCode(item.param)
                    }
                })
            }


        },
        mounted(){
            let dom = document.querySelector('.el-table__body-wrapper');
            dom.addEventListener("scroll", ()=> {
                const scrollDistance =dom.scrollHeight - dom.scrollTop - dom.clientHeight;
                if(scrollDistance <=0){//等于0证明已经到底，可以请求接口
                    this.$emit('data-change', 'sizeChange', this.pageSize+1);
                }
            });
            console.log(dom)

        },
        methods: {
            aaa(value,item){
              console.log(1111)
              console.log(value)
              console.log(item)
            },
            //新增一行
            addRow(){

                this.tableData.push(deepClone(this.tableData[0]));
                console.log(this.tableData)
                //键值
                this.tableData[this.tableData.length-1].id = this.tableData.length+1;
                this.isAdd = true
                console.log(this.tableData)

            },
            //保存行
            save(){
                this.isAdd = false
            },
            //判断是否是最后一行
            isEndRow(index){
                return index === this.tableData.length + 1
            },
            //获取列表数据字典值
            getCode(val){
                request.get(this.dictUrl + '?dict=' + val)
                    .then(data => {
                        this.$set(this.dict, val, data.data);
                    });

            },
            //根据数据字典改变值
            valueCode(val, dict){
                let name = '';
                if (this.dict[dict]) {
                    this.dict[dict].forEach(item => {
                        if (item.code === val) {
                            name = item.name
                        }
                    });
                }
                return name
            },
            //行点击事件
            rowClick(row,column,event){
                console.log(row)
                console.log(column)
                console.log(event)
                this.$emit('data-change', 'rowClick', row);
            },
            //每页数据条数改变
            handleSizeChange(val) {
                this.$emit('data-change', 'sizeChange', val);
            },
            //当前页改变
            handleCurrentChange(val) {
                this.$emit('data-change', 'currentChange', val);
            },
            //排序
            sort(data){
                this.$emit('data-change', 'sort', data);
            },
            //搜索
            search(){
                this.$emit('data-change', 'search', this.searchValue);
            },
            //懒加载
            load(tree, treeNode, resolve){
                request.get('/biz/system/tableTree')
                    .then(data => {
                        console.log(data)
                        resolve(data.data)
                    });
            },


            tableClick(val){
                console.log(val)
                console.log('列表事件')
            },

            //获取表单数据
            getData () {
                return new Promise((resolve, reject) => {
                    this.$refs.generateForm.validate(valid => {
                        if (valid) {
                            resolve(this.models)
                        } else {
                            reject(new Error('表单数据校验失败').message)
                        }
                    })
                })
            },
            //重置数据
            resetFields(){
                this.$refs.generateForm.resetFields()
            },
            //清除排序
            clearSort(){
                this.$refs.generateTable.clearSort()
            },

            //监听表单触发的事件
            myEvent(eventName, option){
                this.$emit('myEvent', eventName, option)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .list {
        width: 100px;
        margin-right: 10px;
    }
</style>
