<!--预览表单组件-->
<template>
    <el-form-item :label="label"
                  :prop="element.model" v-if="isShow" class="yyf-form">
        <!--输入框-->
        <template v-if="element.type === 'input'">
            <div @dblclick="event('dblclick',element)">
                <el-input :type="element.options.isPassword ? 'password' : 'text'"
                          v-model="models[element.model]"
                          :placeholder="element.options.placeholders[language]"
                          :readonly="element.options.readonly"
                          :disabled="element.options.disabled"
                          :suffix-icon="element.options.suffixIcon? element.options.suffixIcon+ ' iconfont':''"
                          :prefix-icon="element.options.prefixIcon? element.options.suffixIcon+ ' iconfont':''"
                          :clearable="element.options.clearable"
                          @change="event('change',element)"
                          @focus="event('focus',element)"
                          @blur="event('blur',element)"
                >
                    <template slot="append" v-if="element.options.units[language]">{{element.options.units[language]}}</template>
                </el-input>
            </div>
        </template>
        <!--文本域-->
        <template v-if="element.type === 'textarea'">
            <el-input type="textarea"
                      v-model="models[element.model]"
                      :rows="2"
                      :placeholder="element.options.placeholders[language]"
                      :readonly="element.options.readonly"
                      :disabled="element.options.disabled"
                      :autosize="autosize"
                      @change="event('change',element)"
            ></el-input>
        </template>
        <!--下拉选择器-->
        <template v-if="element.type === 'select'">
            <el-select
                    v-model="models[element.model]"
                    :disabled="element.options.disabled"
                    :multiple="element.options.multiple"
                    :clearable="element.options.clearable"
                    :placeholder="element.options.placeholders[language]"
                    :style="{width: element.options.width}"
                    @change="event('change',element)"
            >
                <el-option
                        v-for="item in options"
                        :key="element.model + item.value"
                        :value="item.value"
                        :label="item.label">
                </el-option>
            </el-select>
        </template>
        <!--级联选择器-->
        <template v-if="element.type === 'cascader'">
            <el-cascader
                    v-model="models[element.model]"
                    :disabled="element.options.disabled"
                    :placeholder="element.options.placeholders[language]"
                    :clearable="element.options.clearable"
                    :show-all-levels="element.options.showAllLevels"
                    :props="props"
            >
            </el-cascader>
        </template>
        <!--单选-->
        <template v-if="element.type === 'radio'">
            <el-radio-group v-model="models[element.model]"
                            :disabled="element.options.disabled"
                            @change="event('change',element)"
            >
                <el-radio
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        v-for="(item, index) in (options)"
                        :label="item.value"
                        :key="element.model+index"
                >{{item.label}}

                </el-radio>
            </el-radio-group>
        </template>
        <!--多选-->
        <template v-if="element.type === 'checkbox'">
            <el-checkbox-group v-model="models[element.model]"
                               :disabled="element.options.disabled"
                               @change="event('change',element)"
            >
                <el-checkbox
                        :style="{display: element.options.inline ? 'inline-block' : 'block'}"
                        v-for="(item, index) in options"
                        :label="item.value"
                        :key="element.model+index"
                >{{item.label}}

                </el-checkbox>
            </el-checkbox-group>
        </template>
        <!--时间选择器-->
        <template v-if="element.type === 'time'">
            <el-time-picker
                    v-model="models[element.model]"
                    :is-range="element.options.range"
                    :placeholder="element.options.placeholders[language]"
                    :start-placeholder="element.options.startPlaceholders[language]"
                    :end-placeholder="element.options.endPlaceholders[language]"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :arrowControl="element.options.arrowControl"
                    value-format="HH:mm:ss"
                    @change="event('change',element)"
            >
            </el-time-picker>
        </template>
        <!--日期选择器-->
        <template v-if="element.type === 'date'">
            <el-date-picker
                    v-model="models[element.model]"
                    :type="element.options.dateType"
                    :placeholder="element.options.placeholders[language]"
                    :start-placeholder="element.options.startPlaceholders[language]"
                    :end-placeholder="element.options.endPlaceholders[language]"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :editable="element.options.editable"
                    :clearable="element.options.clearable"
                    :value-format="element.options.dateType | format"

                    :style="{width: element.options.width}"
                    @change="event('change',element)"
            >
            </el-date-picker>
        </template>
        <!--树形控件-->
        <template v-if="element.type === 'tree'">
            <el-tree
                    :data="element.options.remote ? treeDate:[]"
                    :props="element.options.props"
                    :show-checkbox="element.options.showCheckbox"
                    :default-expand-all="element.options.defaultExpandAll"
                    :accordion="element.options.accordion"

                    :load="loadNode"
                    :lazy="!element.options.remote"
            >
            </el-tree>
        </template>
        <!--评分-->
        <template v-if="element.type === 'rate'">
            <el-rate v-model.number="models[element.model]"
                     :max="element.options.max"
                     :disabled="element.options.disabled"
                     :allow-half="element.options.allowHalf"
                     @change="event('change',element)"
            ></el-rate>
        </template>
        <!--颜色选择器-->
        <template v-if="element.type === 'color'">
            <el-color-picker
                    v-model="models[element.model]"
                    :disabled="element.options.disabled"
                    :show-alpha="element.options.showAlpha"
                    @change="event('change',element)"
            ></el-color-picker>
        </template>
        <!--开关-->
        <template v-if="element.type === 'switch'">
            <el-switch
                    v-model="models[element.model]"
                    :disabled="element.options.disabled"
                    @change="event('change',element)"
            >
            </el-switch>
        </template>
        <!--滑块-->
        <template v-if="element.type === 'slider'">
            <el-slider
                    v-model.number="models[element.model]"
                    :min="element.options.min"
                    :max="element.options.max"
                    :disabled="element.options.disabled"
                    :step="element.options.step"
                    :show-input="element.options.showInput"
                    :range="element.options.range"
                    @change="event('change',element)"
            ></el-slider>
        </template>
        <!--计数器-->
        <template v-if="element.type === 'number'">
            <el-input-number
                    v-model.number="models[element.model]"
                    :step="element.options.step"
                    :readonly="element.options.readonly"
                    :disabled="element.options.disabled"
                    :min="element.options.min"
                    :max="element.options.max"
                    @change="event('change',element)"
            ></el-input-number>
        </template>
        <!--复合输入框-->
        <template v-if="element.type === 'compound'">
            <el-input v-model="models[element.columns[1].model]"
                      :type="element.columns[1].options.fieldType"
                      :placeholder="element.columns[1].options.placeholders[language]"
                      :readonly="element.columns[1].options.readonly"
                      :disabled="element.columns[1].options.disabled"
                      :clearable="element.columns[1].options.clearable"
                      @change="event('change',element)"
                      @focus="event('focus',element)"
                      @blur="event('blur',element)"
                      class="input-with-select">
                <el-select
                        class="w130"
                        slot="prepend"
                        v-model="models[element.columns[0].model]"
                        :disabled="element.columns[0].options.disabled"
                        :multiple="element.columns[0].options.multiple"
                        :clearable="element.columns[0].options.clearable"
                        :placeholder="element.columns[0].options.placeholder"
                        :style="{width: element.columns[0].options.width}"
                        @change="event('change',element)"
                >
                    <!--远端数据-->
                    <template v-if="element.columns[0].options.remote">
                        <el-option
                                v-for="item in options"
                                :key="element.columns[0].model + item.code"
                                :value="item.code"
                                :label="item.name">
                        </el-option>
                    </template>
                    <!--静态数据-->
                    <template v-else>
                        <el-option
                                v-for="item in element.columns[0].options.options"
                                :key="element.columns[0].model + item.value"
                                :value="item.value"
                                :label="item.label">
                        </el-option>
                    </template>
                </el-select>
            </el-input>
        </template>
    </el-form-item>
</template>

<script>
    import request from '../../util/request'

    export default {
        name: 'generate-form-item',
        props: {
            element: null,
            models: null,
            formData: null,
            formConfig: null,
            rules: null,
            remote: null,
            formShowType: null,
            language: null,
            dictUrl: {
                type: null,
                default: '/biz/system/dict'
            },
            treeUrl: {
                type: null,
                default: '/biz/system/tree'
            }
        },
        data() {
            return {

                //数据字典数据
                options: [],
                //级联配置选项
                props: null,
                //树形控件数据
                treeDate: []
            }
        },
        computed: {

            //文本域高度
            autosize() {
                if (this.element.options.autosize) {
                    return {minRows: 2, maxRows: 10}
                } else {
                    return false
                }
            },
            //表单label值
            label() {
                if(this.formConfig.type === '02'){
                    return ''
                }
                if (this.element.type === 'compound') {
                    return this.element.columns[1].names[this.language];
                } else {
                    return this.element.names[this.language];
                }
            },
            //关联数据是否显示
            isShow() {
                return true
                if (this.element.type === 'compound' && this.element.columns[1].options.bindKey && this.element.columns[1].options.bindFun) {
                    let newData = this.element.columns[1].options.bindFun.replace(this.element.columns[1].options.bindKey, 'this.models[this.element.columns[1].options.bindKey]');
                    return eval(newData);
                } else if (this.element.options && this.element.options.bindKey && this.element.options.bindFun) {
                    let newData = this.element.options.bindFun.replace(this.element.options.bindKey, 'this.models[this.element.options.bindKey]');
                    return eval(newData);
                } else {
                    return true
                }

            }
        },
        filters: {
            //日期格式
            format(value) {
                if (value === 'year') {
                    return 'yyyy'
                } else if (value === 'month') {
                    return 'yyyy-MM'
                } else if (value === 'date') {
                    return 'yyyy-MM-dd'
                } else if (value === 'week') {
                    return 'yyyy-MM-dd'
                } else if (value === 'dates') {
                    return 'yyyy-MM-dd'
                } else if (value === 'daterange') {
                    return 'yyyy-MM-dd'
                } else if (value === 'datetime') {
                    return 'yyyy-MM-dd HH:mm:ss'
                } else if (value === 'datetimerange') {
                    return 'yyyy-MM-dd HH:mm:ss'
                } else if (value === 'monthrange') {
                    return 'yyyy-MM'
                }
            }
        },
        created() {
            if(!this.element){
                return
            }
            console.log(this.element)
            //设置级联配置
            if (this.element.type === 'cascader') {
                this.props = {
                    expandTrigger: this.element.options.trigger,
                    lazy: true,
                    lazyLoad: this.lazyLoad,
                    checkStrictly: this.element.options.checkStrictly,
                    value: 'code',
                    label: 'name',
                }
            }

            //下载数据字典数据
            if(this.element.options.dataSources){
                if (this.element.options.dataSources === 'local') {
                    this.options = this.element.options.options;
                }
                else if (this.element.options.dataSources === 'dict') {
                    console.log('数据字典')
                    request.get(this.dictUrl + '?dict=' + this.element.options.dict)
                        .then(data => {
                            console.log(data)
                            data.data.forEach(item => {
                                this.options.push({
                                    value: item.code,
                                    label: item.name
                                })
                            })
                        });
                }
                else if (this.element.options.dataSources === 'internet') {
                    console.log('外网')
                    request.get(this.element.options.internet)
                        .then(data => {
                            console.log(data)
                            data.data.forEach(item => {
                                this.options.push({
                                    value: item[this.element.options.value],
                                    label: item[this.element.options.label]
                                })
                            })
                        });
                }
            }




            //获取树形控件数据
            if (this.element.type === 'tree') {
                request.get(this.treeUrl + '?tree=' + '')
                    .then(data => {
                        console.log(data)
                        this.treeDate = data.data;
                    });
            }

        },
        methods: {
            //级联动态请求
            lazyLoad(node, resolve) {
                //控制层级
                if (node.level < this.element.options.maxLevel) {
                    request.get(this.dictUrl + '?dict=')
                        .then(data => {
                            resolve(data.data)
                        });
                } else {
                    resolve([])
                }
            },
            //树形组件请求
            loadNode(node, resolve) {
                request.get(this.treeUrl + '?dict=')
                    .then(data => {
                        resolve(data.data)
                    });

            },
            //监听触发的事件
            event(type, data) {
                console.log(type)
                console.log(data)
                if (data.options.events) {
                    data.options.events.forEach(item => {
                        if (item.type === type) {
                            this.$emit('myEvent', item.name, data)
                        }
                    });
                }

            }
        },
        watch: {}
    }
</script>
<style lang="scss">
    .w130 .el-input {
        width: 130px;
    }

    .yyf-form .el-select,
    .yyf-form .el-date-editor,
    .yyf-form .el-cascader {
        width: 100%;
    }

    .yyf-form .el-radio {
        line-height: 32px;
    }
</style>
