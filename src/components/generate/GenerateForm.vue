<!--预览整体-->
<template>
    <div>
        <!--表单-->
        <el-form
                ref="generateForm"
                :model="models"
                :rules="rules"
                :label-position="formConfig.labelPosition"
                :label-width="formConfig.type === '01' ? '100px':'0'">
            <template v-for="grid in formConfig.grids" v-if="formConfig.type==='01'">
                <!--栅格-->
                <template v-if="grid.type === 'grid'">
                    <el-row
                            :key="grid.key"
                            type="flex"
                            :gutter="grid.options.gutter ? grid.options.gutter : 0"
                            :justify="grid.options.justify"
                            :align="grid.options.align"
                    >
                        <el-col v-for="(column, colIndex) in grid.columns" :key="colIndex" :span="column.span">
                            <template v-for="element in column.elements">
                                <generate-form-item :key="element.key"
                                                    v-if="formShowType === 'form'"
                                                    :models.sync="models"
                                                    :formData="formData"
                                                    :rules="rules"
                                                    :element="element"
                                                    :formConfig="formConfig"
                                                    :formShowType="formShowType"
                                                    :language="language"
                                                    :dictUrl="dictUrl"
                                                    v-on:myEvent="myEvent"
                                >
                                </generate-form-item>
                                <!--表单反写-->
                                <generate-form-item-text :key="element.key"
                                                         v-else
                                                         :formData="textFormData"
                                                         :widget="element"
                                                         :language="language"
                                                         :dictUrl="dictUrl"
                                                         :formStyle="formStyle"
                                >
                                </generate-form-item-text>
                            </template>


                        </el-col>
                    </el-row>
                </template>
            </template>
            <!--列表-->
            <template v-if="formConfig.type==='02'">
                <generate-table :formConfig="formConfig"
                                :tableData="tableData"
                                :pageTotal="pageTotal"
                                :pageSize="pageSize"
                                :language="language"
                                :currentPage="currentPage"

                                :dictUrl="dictUrl"
                                :formStyle="formStyle"

                                @data-change="dataChange"
                >

                </generate-table>

            </template>
        </el-form>

    </div>
</template>

<script>
    import GenerateFormItem from './GenerateFormItem'
    import GenerateFormItemText from './GenerateFormItemText'
    import request from '../../util/request'
    import distShow from '../common/distShow.vue'
    import GenerateTable from './GenerateTable.vue'

    export default {
        name: 'generate-form',
        components: {
            GenerateFormItem,
            GenerateFormItemText,
            distShow,
            GenerateTable
        },
        props: {
            //表单配置数据
            formConfig: null,
            //表单数据
            formData: null,
            //表单显示类型form表单、text反写
            formShowType: {
                type: String,
                default: 'form'
            },
            //语言:简体中文zh_CN;繁体zh_HK英语en_US
            language: {
                type: String,
                default: 'zh_CN'
            },

            //列表数据
            tableData: {
                type: Array,
                default: null
            },
            //数据总条目
            pageTotal: {
                type: null,
                default: 100
            },
            //每页数据
            pageSize: {
                type: null,
                default: 10
            },
            //当前页数
            currentPage: {
                type: null,
                default: 1
            },
            //数据字典接口
            dictUrl: {
                type: null,
                default: '/biz/system/dict'
            },
            //表单反写样式
            formStyle: null,
            //树形控件默认接口
            treeUrl: {
                type: null,
                default: '/biz/system/tree'
            }
        },
        data() {
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
                textFormData: this.formData
            }
        },
        filters: {
            //数据字典
            dict(value) {
                request.get(this.dictUrl + '?dict=' + this.widget.options.dict)
                    .then(data => {
                        console.log(data)
                        //this.widget.options.remoteOptions = data.data;
                        this.options = data.data;
                        console.log(this.options)
                    });
            }
        },
        created() {
            if (this.formConfig.type === '01') {
                this.generateModle(this.formConfig.grids)
            } else if (this.formConfig.type === '02') {
                //列表获取数据字典值
                this.formConfig.head.columnConfig.forEach(item => {
                    if (item.type === 'dict') {
                        this.getCode(item.param)
                    }
                })
            }
        },
        methods: {
            //传入的数据+表单配置默认值生成表单初始数据
            generateModle(genList) {
                genList.forEach((item) => {
                    if (item.type === 'grid') {
                        item.columns.forEach(item => {
                            this.generateModle(item.elements)
                        })
                    } else if (item.type === 'compound') {
                        this.models[item.columns[0].model] = item.columns[0].options.defaultValue;
                        this.models[item.columns[1].model] = item.columns[1].options.defaultValue;
                        this.appendRules(item.columns[1]);
                    } else {
                        //更改数据值
                        if (item.options.hasOwnProperty("defaults")) {
                            this.models[item.model] = item.options.defaults[this.language]
                        } else {
                            this.models[item.model] = item.options.defaultValue
                        }
                        this.models = {
                            ...this.models,
                            ...this.formData
                        }

                        //增加表单验证rules
                        this.appendRules(item);
                    }
                })
            },

            //增加表单验证rules
            appendRules(data) {
                this.rules[data.model] = [];
                //是否必填
                if (data.options.validator.required) {
                    this.rules[data.model].push({
                        required: true,
                        message: '不能为空'
                    })
                }
                //格式
                if (data.options.validator.dataType) {
                    this.rules[data.model].push({
                        pattern: this.validatorType(data.options.validator.dataType),
                        message: this.validatorTypeMes(data.options.validator.dataType, this.language),
                    })
                }
                //范围
                if (data.options.validator.min && data.options.validator.max) {
                    this.rules[data.model].push({
                        min: data.options.validator.min,
                        max: data.options.validator.max,
                        message: `长度在${data.options.validator.min}到${data.options.validator.max}个字符`
                    })
                }

            },

            //获取列表数据字典值
            getCode(val) {
                request.get(this.dictUrl + '?dict=' + val)
                    .then(data => {
                        this.$set(this.dict, val, data.data);
                    });

            },


            //监听分页变化,预览使用
            dataChange(type, val) {
                this.$emit('data-change', type, val);
            },


            tableClick(val) {
                console.log(val)
                console.log('列表事件')
            },

            //获取表单数据
            getData() {
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
            resetFields() {
                this.$refs.generateForm.resetFields()
            },
            //清除表单检验结果
            clearValidate() {
                this.$refs.generateForm.clearValidate()
            },

            //正则集合
            validatorType(value) {
                let regs = {
                    text: '',
                    number: /^[0-9]*$/g,
                    url: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
                    email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    phoneNo: '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$',
                    tel: ''
                };
                if (regs[value]) {
                    return regs[value]
                }

            },
            //正则提示信息
            validatorTypeMes(value, language) {
                let mes = {
                    'zh_CN': {
                        text: '格式错误',
                        number: '格式错误',
                        url: 'URL链接格式不正确',
                        email: '邮箱格式不正确',
                        phoneNo: '手机号格式不正确',
                        tel: '固定电话格式不正确'
                    },
                    'zh_HK': {
                        text: '格式錯誤',
                        number: '格式錯誤',
                        url: 'URL鏈接格式不正確',
                        email: '郵箱格式不正確',
                        phoneNo: '手機號格式不正確',
                        tel: '固定電話格式不正確'
                    },
                    'en_US': {
                        text: '格式错误',
                        number: '格式错误',
                        url: 'URL链接格式不正确',
                        email: '邮箱格式不正确',
                        phoneNo: '手机号格式不正确',
                        tel: '固定电话格式不正确'
                    }
                };
                if (mes[language][value]) {
                    return mes[language][value]
                }

            },
            //清除排序
            clearSort() {
                this.$refs.generateTable.clearSort()
            },

            //监听表单触发的事件
            myEvent(eventName, option) {
                this.$emit('myEvent', eventName, option)
            }
        },
        watch: {
            //表单数据发生变化
            formData: {
                deep: true,
                handler(val) {
                    this.models = {...this.models, ...val};
                    this.textFormData = val;
                }
            },
            //表单显示类型改变
            formShowType(val) {
                if (val === 'text') {
                    this.textFormData = this.models
                }
            }

        }
    }
</script>
