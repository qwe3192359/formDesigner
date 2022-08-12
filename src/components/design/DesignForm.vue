<!--中间内容显示区域-->
<template>
    <div class="form-con">
        <!--表单-->
        <el-form :label-position="formConfig.labelPosition"
                 label-width="100px">
            <vue-draggable
                    class="form-list"
                    v-model="formConfig.grids"
                    v-bind="getVueDraggableOptionsGrid()"
                    @add="addGrid"
            >
                <template v-for="(grid, gridIndex) in formConfig.grids" v-if="formConfig.grids.length > 0">
                    <!--栅格模块-->
                    <template v-if="grid.type === 'grid'">
                        <div :key="grid.model"
                             style="position: relative;margin-bottom:2px;">
                            <el-row class="select-box "
                                    :class="isSelect(grid.model)"
                                    @click.native="selectGrid(gridIndex)">
                                <!--子表单-->
                                <template v-for="(column, columnIndex) in grid.columns">
                                    <el-col :span="column.span ? column.span : 0" :key="column.model">
                                        <div style="border: 1px dashed #999;padding: 5px;margin-left: 1px;">
                                            <vue-draggable
                                                    style="min-height: 50px;"
                                                    v-model="column.elements"
                                                    v-bind="getVueDraggableOptionsItem(column)"
                                                    @add="addFormItem($event, grid, columnIndex)"
                                            >
                                                <template v-for="(element,elementIndex) in column.elements">
                                                    <!--复合输入框-->
                                                    <template v-if="element.type === 'compound'">
                                                        <div style="padding: 5px;border: 1px solid #ccc"
                                                             class="select-box"
                                                             :key="element.model"
                                                             :class="isSelect(element.compoundItems[1].model)"
                                                             @click.stop="selectCompound(gridIndex,columnIndex,elementIndex)">

                                                            <span class="compound-text" :style="compoundTextStyle">{{element.compoundItems[1].names[language]}}</span>
                                                            <template
                                                                    v-for="(compoundItem,compoundItemIndex) in element.compoundItems">
                                                                <div class="compound-box"
                                                                     :key="'compound' + elementIndex + compoundItemIndex"
                                                                >
                                                                    <design-form-item
                                                                            class="select-box shade"
                                                                            :key="compoundItem.model"
                                                                            wrapType="compound"
                                                                            :element="compoundItem"
                                                                            :formConfigSelect="formConfigSelect"
                                                                            :language="language"
                                                                            :elementIndex="elementIndex"
                                                                            :elements="column.elements"
                                                                            @updateFormConfigSelect="updateFormConfigSelect"
                                                                    >
                                                                    </design-form-item>


                                                                </div>
                                                            </template>
                                                            <el-button title="复制"
                                                                       style="bottom: -20px;"
                                                                       @click.stop="cloneCompound(gridIndex,columnIndex,elementIndex)"
                                                                       class="btn-clone"
                                                                       v-if="formConfigSelect && element.compoundItems[1].model === formConfigSelect.model"
                                                                       circle plain type="primary">
                                                                <i class="iconfont icon-fuzhi"
                                                                   style="width: 12px;height: 12px;padding: 0"></i>
                                                            </el-button>
                                                            <el-button title="删除"
                                                                       style="bottom: -20px;"
                                                                       @click.stop="delCompound(gridIndex,columnIndex,elementIndex)"
                                                                       class="btn-del"
                                                                       v-if="formConfigSelect && element.compoundItems[1].model === formConfigSelect.model"
                                                                       circle
                                                                       plain
                                                                       type="danger">
                                                                <i class="iconfont icon-shanchu"
                                                                   style="width: 12px;height: 12px;padding: 0"></i>
                                                            </el-button>

                                                        </div>

                                                    </template>
                                                    <!--其他表单-->
                                                    <template v-else>
                                                        <template v-if="element.model">
                                                            <design-form-item
                                                                    class="select-box shade"
                                                                    :key="element.model"
                                                                    :element="element"
                                                                    :formConfigSelect="formConfigSelect"
                                                                    :language="language"
                                                                    :elementIndex="elementIndex"
                                                                    :elements="column.elements"
                                                                    @updateFormConfigSelect="updateFormConfigSelect">
                                                            </design-form-item>
                                                        </template>

                                                    </template>

                                                </template>
                                            </vue-draggable>
                                        </div>

                                    </el-col>
                                </template>


                            </el-row>
                            <el-button title="复制"
                                       style="bottom: -20px;"
                                       @click.stop="cloneGrid(gridIndex)"
                                       class="btn-clone"
                                       v-if="formConfigSelect && grid.model === formConfigSelect.model"
                                       circle plain type="primary">
                                <i class="iconfont icon-fuzhi" style="width: 12px;height: 12px;padding: 0"></i>
                            </el-button>
                            <el-button title="删除"
                                       style="bottom: -20px;"
                                       @click.stop="delGrid(gridIndex)"
                                       class="btn-del"
                                       v-if="formConfigSelect && grid.model === formConfigSelect.model"
                                       circle
                                       plain
                                       type="danger">
                                <i class="iconfont icon-shanchu" style="width: 12px;height: 12px;padding: 0"></i>
                            </el-button>
                        </div>
                    </template>
                </template>
            </vue-draggable>
        </el-form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueDraggable from 'vuedraggable'
    import DesignFormItem from './DesignFormItem'


    import {deepClone,getModel} from '../../util/common'

    export default {
        name: 'design-form',
        components: {
            VueDraggable,
            DesignFormItem
        },
        props: ['formConfig', 'formConfigSelect', 'language'],
        data() {
            return {}
        },
        computed: {
            //复合输入框的标签对齐方式
            compoundTextStyle() {
                if (this.formConfig.labelPosition === 'top') {
                    return {
                        display: 'block'
                    }
                } else if (this.formConfig.labelPosition === 'left') {
                    return {
                        'text-align': 'left'
                    }
                } else if (this.formConfig.labelPosition === 'right') {
                    return {
                        'text-align': 'right'
                    }
                }
            }
        },
        methods: {
            //选中的表单显示边框
            isSelect(model) {
                if (this.formConfigSelect && this.formConfigSelect.model && model === this.formConfigSelect.model) {
                    return 'active'
                } else {
                    return ''
                }
            },
            //生成Draggable插件的外层区域的配置，只允许拖动栅格
            getVueDraggableOptionsGrid(column) {
                return {group: 'grid', animation: 300}
            },
            //生成Draggable插件的栅格区域的配置，只允许拖动表单
            getVueDraggableOptionsItem(column) {
                let is = column.elements.length <= 0;
                return {group: {name: 'item'}}
            },
            //选中当前栅格
            selectGrid(index) {
                this.updateFormConfigSelect(this.formConfig.grids[index])
            },
            //选中当前复合选择器
            selectCompound(index, colIndex, i) {
                this.updateFormConfigSelect(this.formConfig.grids[index].columns[colIndex].elements[i].compoundItems[1])
            },
            //选中当前列表头
            selectTableCol(index) {
                this.updateFormConfigSelect(this.formConfig.head.columnConfig[index])
            },
            //拖动栅格到设计器
            addGrid(evt) {
                console.log(evt)
                //当前栅格的位置
                const newIndex = evt.newIndex;
                //复制原有属性，为拖拽到容器的元素添加唯一model
                let newGrid = this.deepClone(this.formConfig.grids[newIndex]);
                newGrid.model = getModel('grid');
                //删除多余属性
                delete newGrid.icon;
                //将新增的栅格添加到formConfig和formConfigSelect上
                this.updateFormConfigSelect(newGrid);
                this.$set(this.formConfig.grids, newIndex, newGrid);
            },
            //表单拖动到栅格里
            addFormItem($event, row, colIndex) {
                console.log(row)
                //嵌入栅格内部
                //$event移动的元素
                //row表单数据
                //colIndex新列表
                let newIndex = $event.newIndex;
                //复制原有属性
                let cloneData = this.deepClone(row.columns[colIndex].elements[newIndex]);
                //表单赋值model
                cloneData.model = getModel(cloneData.type);
                //复合表单添加子表单添加model
                if (cloneData.type === 'compound') {
                    cloneData.compoundItems[0].model = getModel(cloneData.compoundItems[0].type);
                    cloneData.compoundItems[1].model = cloneData.model;
                }

                this.$set(row.columns[colIndex].elements, newIndex, cloneData);

                //删除多余属性
                Vue.delete(cloneData, 'icon');

                //赋值到formConfigSelect
                if (cloneData.type === 'compound') {
                    this.updateFormConfigSelect(cloneData.compoundItems[1]);
                } else {
                    this.updateFormConfigSelect(cloneData);
                }

            },

            //删除行（栅格）
            delGrid(index) {

                this.$nextTick(() => {
                    this.formConfig.grids.splice(index, 1)
                })

                //只有一行栅格
                if(this.formConfig.grids.length === 1){
                    this.updateFormConfigSelect(null)
                }
                //删除最后一行
                else if(index + 1 === this.formConfig.grids.length){
                    this.updateFormConfigSelect(this.formConfig.grids[index - 1])
                }
                //
                else{
                    this.updateFormConfigSelect(this.formConfig.grids[index + 1])
                }

            },
            //复制行（栅格）
            cloneGrid(index) {

                let cloneData = this.deepClone(this.formConfig.grids[index]);
                cloneData.model = getModel(cloneData.type);
                cloneData.columns.forEach(column => {
                    column.elements.forEach(element => {
                        if(element.type === 'compound'){
                            element.compoundItems[0].model = getModel(element.compoundItems[0].type);
                            element.compoundItems[1].model = element.model = getModel('compound');
                        }
                        else{
                            element.model = getModel(element.type);
                        }
                    })

                });

                this.formConfig.grids.splice(index + 1, 0, cloneData);
                this.$nextTick(() => {
                    this.updateFormConfigSelect(this.formConfig.grids[index + 1])
                })
            },

            //删除复合选择框
            delCompound(gridIndex, columnIndex, elementIndex) {
                this.$nextTick(() => {
                    this.formConfig.grids[gridIndex].columns[columnIndex].elements.splice(elementIndex-1, 1)
                })
                this.updateFormConfigSelect(this.formConfig.grids[gridIndex]);
            },
            //复制复合选择框
            cloneCompound(gridIndex, columnIndex, elementIndex) {

                let cloneData = this.deepClone(this.formConfig.grids[gridIndex].columns[columnIndex].elements[elementIndex]);

                cloneData.compoundItems[1].model = cloneData.model = getModel('compound');
                cloneData.compoundItems[0].model = getModel(cloneData.compoundItems[0].type);
                this.formConfig.grids[gridIndex].columns[columnIndex].elements.splice(elementIndex + 1, 0, cloneData);

                //this.updateFormConfigSelect(cloneData)

                this.$nextTick(() => {
                    this.updateFormConfigSelect(this.formConfig.grids[gridIndex].columns[columnIndex].elements[elementIndex + 1].compoundItems[1])
                })
            },

            //选择表单并更改父级的formConfigSelect数据
            updateFormConfigSelect(data) {
                this.$emit('update:formConfigSelect', data)
            },
            //拷贝对象
            deepClone,
            //随机生成model
            getModel
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/index';

    .form-con {
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;

        .form-list {
            padding-bottom: 150px;

            li {
                list-style: none;
            }
        }
    }

    .btn-del {
        position: absolute;
        right: 20px;
        bottom: -35px;
        z-index: 1009;
    }

    .btn-clone {
        position: absolute;
        right: 70px;
        bottom: -35px;
        z-index: 1009;
    }


    .compound-box {
        display: inline-block;
        width: 30%;
        margin-right: 2px;
    }

    .compound-box /deep/ .el-form-item__content {
        margin-left: 0 !important;
    }

    .compound-text {
        font-size: 14px;
        color: #606266;
        width: 100px;
        display: inline-block;
        padding-right: 12px;
        line-height: 32px;
    }

    .select-box {
        background: #F4F6FC;
        position: relative;
        border-left: 5px solid transparent;
        padding: 10px;
        margin: 0;

        &.active {
            outline: 2px solid $primary-color;
        }
    }


    /* 遮罩层，防止设计区域的表单被点击 */

    .shade {
        position: relative;

        &::after {
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }


</style>
