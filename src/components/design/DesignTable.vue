<template>
    <div class="" style="padding: 30px;">
        <div class="select-box"
             style="padding: 20px"
             v-if="tableConfigData.head"
        >
            <vue-draggable v-model="tableConfigData.head.columnConfig"
                       v-bind="getOptions()"
                       class="form-table-box"
            >
                <div v-for="(item,index) in tableConfigData.head.columnConfig"
                     :key="item.model"
                     class="list"
                     :class="{active: formConfigSelect.model === item.model}"
                     @click.stop="selectTableCol(index)"
                >
                    <div class="head">
                        <div style="padding: 10px"
                             class="select-box"
                             scope="col">
                            <div style="line-height: 1;height: 16px">{{ item.names[language] }}</div>
                        </div>
                        <el-button title="删除列"
                                   style="bottom: -18px;right: -18px;position: absolute;"
                                   @click.stop="delCols(index)" class="btn-del"
                                   v-if="formConfigSelect.model === item.model"
                                   circle
                                   plain
                                   type="danger">
                            <i class="iconfont icon-shanchu" style="width: 12px;height: 12px;padding: 0"></i>
                        </el-button>

                    </div>
                    <div class="content">数据{{index}}</div>
                    <div class="content">数据{{index}}</div>
                    <div class="content">数据{{index}}</div>
                    <div class="content">数据{{index}}</div>
                </div>


            </vue-draggable>
            <el-button title="新增列"
                       style="border-radius: 4px"
                       @click.stop="addCols"
                       class="btn-add"
                       circle plain type="success">新增一列
                <i class="el-icon-circle-plus"></i>

            </el-button>

        </div>
        <!--分页-->
        <div style="text-align: center">
            <el-pagination
                    style="display: inline-block"
                    v-if="tableConfigData.head.pageConfig.paging"
                    :layout="tableConfigData.head.pageConfig.layout | pageLayout"
                    :pager-count="7"
                    :background="tableConfigData.head.pageConfig.background"
                    :total="1000"

                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="10"
            >
            </el-pagination>
        </div>

    </div>
</template>
<script>
    import {GenerateTableColumnConfig} from '../../form-config/formConfig.js'
    import VueDraggable from "vuedraggable";

    export default {
        name: 'design-table',
        components: {
            VueDraggable
        },
        props: {
            tableConfigData: null,
            formConfigSelect: null,
            language: null
        },
        data () {
            return {
                currentPage: 1,
            }
        },
        filters: {
            //分页显示属性
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
            }
        },
        created () {
        },
        methods: {

            //生成Draggable插件的配置
            getOptions(){
                return {group:'item', ghostClass: 'ghost'}
            },
            //选中当前列表头
            selectTableCol(index){
                this.updateFormConfigSelect(this.tableConfigData.head.columnConfig[index]);
            },
            //列表新增一列
            addCols(){
                this.tableConfigData.head.columnConfig.push(new GenerateTableColumnConfig())
            },
            //列表删除本列
            delCols(index){
                if(this.tableConfigData.head.columnConfig.length <2 ){
                    this.$message({
                        message: '只剩一列不能删除',
                        type: 'warning'
                    });
                }
                else{
                    if(index === 0){
                        index = 1
                    }
                    this.tableConfigData.head.columnConfig.splice(index, 1);
                    this.updateFormConfigSelect(this.tableConfigData.head.columnConfig[index-1]);
                }
            },
            //每页条数发生变化
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            //当前页发生变化
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },

            //选择表单并更改父级的formConfigSelect数据
            updateFormConfigSelect(data) {
                this.$emit('update:formConfigSelect', data)
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/index';

    .form-con{
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        .form-list{
            padding-bottom: 150px;
            li{
                list-style: none;
            }
        }
    }

    .btn-del{
        position: absolute;
        right: 20px;
        bottom: -35px;
        z-index: 1009;
    }
    .btn-add{
        position: absolute;
        bottom: -30px;
        right: 20px;
        border-radius: 4px;
        z-index: 1009;
    }

    .form-table-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        border-left: 1px solid #ccc;
        .list{
            flex-grow: 1;
            cursor: move;
            position: relative;
            margin-left: 1px;
            &:hover{
                outline: 1px dashed $primary-color;
                z-index: 1;

            }
        }
        .list.active{
            outline: 1px solid $primary-color;
            z-index: 9;
        }

        .head {
            border: 1px solid #ccc;
            text-align: center;
            padding: 10px;
            margin-left: -1px;
            margin-top: -1px;
            background: #f7f7f7;
        }
        .content{
            border: 1px solid #ccc;
            text-align: center;
            padding: 10px;
            margin-left: -1px;
            margin-top: -1px;
        }
        .ghost{
            outline: 2px dashed $primary-color;
            cursor: move;
        }
    }

    .compound-box{
        display: inline-block;
        width: 30%;
        margin-right: 2px;
    }
    .compound-box /deep/ .el-form-item__content{
        margin-left: 0 !important;
    }
    .compound-text{
        font-size: 14px;
        color: #606266;
        width: 100px;
        display: inline-block;
        padding-right: 12px;
        line-height: 32px;
    }

    .select-box{
        position: relative;
    }



    /* 遮罩层，防止设计区域的表单被点击 */

    .shade{
        position: relative;
        &::after{
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }


</style>
