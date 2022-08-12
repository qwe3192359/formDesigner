<!--整体区域-->
<template>
    <div style="height: 100%;overflow: hidden;">
        <!--设计器头部-->
        <form-header :api="api"
                     :language="language"
                     :formConfig="formConfig"
                     :opt="opt"
                     @getFormData="getFormData"
                     @create="create">
        </form-header>
        <div style="height: calc(100% - 50px);">
            <el-container style="height: 100%">
                <!--表单选择菜单-->
                <el-aside style="width: 250px;background: #fafafa">
                    <el-container>
                        <el-header height="45px" class="tab">
                            <div class="tab-list"
                                 :class="formConfig && formConfig.type === '01'?'active':''"
                                 @click="toggleFormType('01')">
                                <span>表单</span>
                            </div>
                            <div class="tab-list"
                                 :class="formConfig && formConfig.type === '02'?'active':''"
                                 @click="toggleFormType('02')">
                                <span>列表</span>
                            </div>
                        </el-header>
                        <form-menu :formType="formConfig && formConfig.type" :language="language"></form-menu>
                    </el-container>
                </el-aside>
                <!--表单设计区域-->
                <el-container class="con">
                    <el-main v-if="formConfig"
                             style="position: relative;"
                             :class="{'no-con': formConfig.type ==='01' && formConfig.grids.length === 0}">
                        <template v-if="formConfig.type === '01'">
                            <!--表单-->
                            <design-form ref="formConfig"
                                         :formConfig="formConfig"
                                         :language="language"
                                         :formConfigSelect.sync="formConfigSelect">
                            </design-form>
                        </template>
                        <template v-if="formConfig.type === '02'">
                            <!--列表-->
                            <design-table :tableConfigData="formConfig"
                                          :formConfigSelect.sync="formConfigSelect"
                                          :language="language"
                            >
                            </design-table>
                        </template>

                    </el-main>
                </el-container>
                <!--表单属性配置-->
                <el-aside style="background: #fafafa">
                    <el-container>
                        <el-header height="45px" class="tab">
                            <div class="tab-list"
                                 :class="{active: configTab==='select'}"
                                 @click="configTab = 'select'">
                                <span v-if="formConfig && formConfig.type === '01'">组件设置</span>
                                <span v-if="formConfig && formConfig.type === '02'">列表列设置</span>
                            </div>
                            <div class="tab-list"
                                 :class="{active: configTab==='form'}"
                                 @click="configTab = 'form'">
                                <span v-if="formConfig && formConfig.type === '01'">表单设置</span>
                                <span v-if="formConfig && formConfig.type === '02'">列表设置</span>
                            </div>
                        </el-header>
                        <el-main>
                            <form-item-options
                                    v-if="formConfigSelect"
                                    v-show="configTab==='select'"
                                    :formConfigSelect="formConfigSelect"
                                    :formType="formConfig.type"
                                    :tableColumn="formConfig.head ? formConfig.head.columnConfig : '' "
                            >
                            </form-item-options>
                            <form-options v-if="formConfig"
                                          v-show="configTab==='form'"
                                          :formConfig="formConfig"
                                          :opt="opt"
                                          :formType="formConfig.type"
                                          :tableColumn="formConfig.head ? formConfig.head.columnConfig : '' ">
                            </form-options>
                        </el-main>
                    </el-container>

                </el-aside>
            </el-container>
        </div>
    </div>
</template>

<script>
    import FormHeader from '../components/FormHeader.vue'
    import FormMenu from '../components/FormMenu.vue'
    import FormOptions from '../components/options/FormOptions'
    import FormItemOptions from '../components/options/FormItemOptions'
    import DesignForm from '../components/design/DesignForm'
    import DesignTable from '../components/design/DesignTable.vue'


    import {
        basicFormConfig,
        layoutFormConfig,
        GenerateTableColumnConfig,
        formConfig,
        tableConfig
    } from '../form-config/formConfig.js'
    import {deepClone} from '../util/common'
    import {loadJs, loadCss} from '../util/load.js'
    import request from '../util/request.js'
    import api from '../api'

    export default {
        name: 'making-form',
        components: {
            FormHeader,
            FormMenu,
            FormOptions,
            FormItemOptions,
            DesignForm,
            DesignTable,
        },
        props: {
            //表单列表接口
            api: {
                type: null,
                default: function () {
                    return {
                        ...api
                    }
                }
            },
            //语言
            language: {
                type: null,
                default: 'zh_CN'
            },

        },
        data() {
            return {
                //表单数据
                formConfig: null,
                //当前选择的表单属性数据
                formConfigSelect: null,

                //当前表单类型，01表单，02列表

                //判断新增（insert）或修改（update）
                opt: 'insert',
                //表单、字段tab切换
                configTab: 'select',
            }
        },
        mounted() {
            //阿里云图标
            loadCss('//at.alicdn.com/t/font_1218265_evjd7tivwco.css');
            //美化json
            loadJs('https://cdn.bootcdn.net/ajax/libs/ace/1.8.1/ace.min.js');
            //初始化表单
            this.initForm();
        },
        methods: {
            //搜索框选项选中获取，将旧的表单配置缺少的补上
            getFormData(value, searchType) {
                request.get(`${this.api.formDataUrl}?id=${value}&type=${searchType}`).then(
                    res => {
                        this.formConfig = res.data;
                        this.opt = 'update';
                        if (res.data.type === '01') {
                            //组合表单数据
                            this.formConfig = this.updateKeys(formConfig, this.formConfig);
                            this.formConfig.grids.forEach(grid => {
                                //组合栅格数据
                                grid = this.updateKeys(layoutFormConfig[0], grid)
                                grid.columns.forEach(column => {
                                    column.elements.forEach((element) => {
                                        basicFormConfig.forEach(item => {
                                            if (item.type === element.type) {
                                                //去除多余表单数据参数
                                                element = this.updateKeys(item, element);
                                            }
                                        });
                                    })
                                })
                            });
                            this.formConfigSelect = res.data.grids[0];
                        } else {
                            //去除多余列表数据参数
                            this.formConfig = this.updateKeys(tableConfig, this.formConfig);
                            this.formConfig.head = this.updateKeys(tableConfig.head, this.formConfig.head);
                            this.formConfig.head.columnConfig.forEach((item, index) => {
                                
                                //initData.model = Date.now() + '_' + Math.ceil(Math.random() * 99999);
                                item = this.updateKeys(new GenerateTableColumnConfig(), item)
                            });
                            this.formConfigSelect = res.data.head;
                        }

                    }
                );
            },
            //切换表单和列表
            toggleFormType(value) {
                this.$confirm('此操作将重置已编辑内容, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (value === '01') {
                        this.initForm();
                    } else if (value === '02') {
                        //初始化列表配置
                        this.initTable();
                    }
                    this.$message({
                        type: 'success',
                        message: '成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });

            },
            //初始化表单
            initForm() {
                this.formConfig = this.deepClone(formConfig);
                this.opt = 'insert';
                this.formConfigSelect = null;
            },
            //初始化列表
            initTable() {
                this.formConfig = this.deepClone(tableConfig);
                this.opt = 'insert';
                this.formConfigSelect = this.formConfig.head.columnConfig[0];
            },

            //新建表单,子组件调用
            create() {
                if (this.formConfig.type === '01') {
                    this.initForm()
                } else {
                    this.initTable()
                }
            },

            //生成新的表单配置
            //表单、栅格、复合组件、列表、列表-列
            updateKeys(initData, data) {
                initData = deepClone(initData);
                let keys = Object.keys(initData);
                keys.forEach(item => {

                    if (data.hasOwnProperty(item)) {
                        if (item === 'grids' || item === 'columns ' || item === 'elements') {

                        } else if (item === 'options') {
                            initData.options = {
                                ...initData.options,
                                ...data.options
                            }
                        } else {
                            initData[item] = data[item]
                        }

                    } else {
                        data[item] = this.deepClone(initData[item])
                    }
                });
                return data

            },
            //深拷贝对象
            deepClone
        },

    }
</script>

<style lang="scss" scoped>
    @import '../styles/index';

    .no-con {
        background: url('../assets/form_empty.png') no-repeat;
        background-position: 50%;
    }

    .con {
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
    }

    .tab {
        height: 45px;
        border-bottom: solid 2px #e4e7ed;
        padding: 0 5px;
        display: flex;

        .tab-list {
            line-height: 45px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            position: relative;
            cursor: pointer;
            flex-grow: 1;

            &.active {
                border-bottom: solid 2px $primary-color;
                color: $primary-color;
            }
        }

    }

</style>

